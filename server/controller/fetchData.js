const fs = require('fs');
const path = require('path');
const { parseString } = require('xml2js');
const { DATA_API_KEY } = process.env;

const FILE_NAME = 'coordinates.csv';
const csvPath = path.join(__dirname, '../../client/public', 'data', FILE_NAME);

async function fetchData(req, res) {
  const csv = fs.readFileSync(csvPath, "utf-8");
  const csvData = csv.split("\n"); //맥 사용자의 경우는 \n으로 바꿀것
  const locationData = csvData.map((el) => el.split(","));
  let newLocation = [];

  const newLocation = locationData.slice(1, -1);

  //프론트에서 요청body에 담아 보낸 지역엔드포인트를 변수에 저장
  //마커 클릭으로 받아오는 지역엔드포인트는 문자 앞에 공백이 하나 있기때문에 trim()을 통해 공백제거
  const END_POINT = req.body.point.trim();

  console.log(END_POINT);

  const AREA_END_POINT = `http://openapi.seoul.go.kr:8088/${DATA_API_KEY}/xml/citydata/1/5/${END_POINT}`;

  try {
    const response = await fetch(AREA_END_POINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/xml',
      },
    });

    const rawData = await response.text();

    const result = await new Promise((resolve, reject) => {
      parseString(rawData, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
    //KT의 실시간 인구밀도 데이터
    const liveData =
      result['SeoulRtd.citydata']['CITYDATA'][0].LIVE_PPLTN_STTS[0]
        .LIVE_PPLTN_STTS[0];
    //지역 이름
    const areaName = result['SeoulRtd.citydata']['CITYDATA'][0].AREA_NM;
    //당일 전체적인 날씨
    const dayWeather =
      result['SeoulRtd.citydata']['CITYDATA'][0].WEATHER_STTS[0]
        .WEATHER_STTS[0];
    //당일 시간별 날씨
    const timeWeather =
      result['SeoulRtd.citydata']['CITYDATA'][0].WEATHER_STTS[0].WEATHER_STTS[0]
        .FCST24HOURS[0];

    //프론트에서 필요한 데이터만 추린 모델
    const model = {
      area_name: areaName[0],
      live_data: liveData,
    };

    const weatherModel = {
      temperature: dayWeather.TEMP[0],
      sen_temperature: dayWeather.SENSIBLE_TEMP[0],
      min_temperature: dayWeather.MIN_TEMP[0],
      max_temperature: dayWeather.MAX_TEMP[0],
      pcp_msg: dayWeather.PCP_MSG[0],
      air_idx: dayWeather.AIR_IDX[0],
      fcst_24hours: timeWeather,
    };

    res.status(200).json({ model, weatherModel, newLocation });
  } catch (err) {
    console.error('something went wrong in fetchingData file', err);
    res.status(500);
  }
}

module.exports = { fetchData };
