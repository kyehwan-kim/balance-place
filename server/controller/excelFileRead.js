// seoulData.js
const xlsxFile = require("read-excel-file/node");

async function seoulData(req, res) {
  try {
    const sheets = await xlsxFile("./seoulData.xlsx");

    // 프론트에서 요청한 데이터 가공
    const dataIndex = [];
    const dataLink = [];
    const dataLatitude = [];
    const dataLongitude = [];
    const dataLatitude_STZ = [];
    const dataLongitude_STZ = [];
    const dataLatitude_Park = [];
    const dataLongitude_Park = [];
    const dataLatitude_Station = [];
    const dataLongitude_Station = [];
    const dataNmae_STZ = [];
    const dataNmae_Station = [];
    const dataNmae_Park = [];
    const dataLink_STZ = [];
    const dataLink_Park = [];
    const dataLink_Station = [];

    // 전체 데이터 이름, img, 위도, 경도 정리
    for (let i = 1; i < sheets.length; i++) {
      dataIndex.push(sheets[i][1]);
      dataLink.push(sheets[i][2]);
      dataLatitude.push(sheets[i][3]);
      dataLongitude.push(sheets[i][4]);
    }
    // 특구, 공원 ,역 데이터 정리
    sheets.filter((el) => {
      if (el[0] === 1) {
        dataNmae_STZ.push(el[1]);
        dataLink_STZ.push(el[2]);
        dataLatitude_STZ.push(el[3]);
        dataLongitude_STZ.push(el[4]);
      }
      if (el[0] === 2) {
        dataNmae_Park.push(el[1]);
        dataLink_Park.push(el[2]);
        dataLatitude_Park.push(el[3]);
        dataLongitude_Park.push(el[4]);
      }
      if (el[0] === 3) {
        dataNmae_Station.push(el[1]);
        dataLink_Station.push(el[2]);
        dataLatitude_Station.push(el[3]);
        dataLongitude_Station.push(el[4]);
      }
    });

    const Arr = [
      {
        // 전체 데이터
        id: 1,
        name: dataIndex,
        img: dataLink,
        latitude: dataLatitude,
        longitude: dataLongitude,
      },
      {
        // 특구 데이터
        id: 2,
        name: dataNmae_STZ,
        img: dataLink_STZ,
        latitude: dataLatitude_STZ,
        longitude: dataLongitude_STZ,
      },
      {
        // 역 데이터
        id: 3,
        name: dataNmae_Station,
        img: dataLink_Station,
        latitude: dataLatitude_Station,
        longitude: dataLongitude_Station,
      },
      {
        // 공원 데이터
        id: 4,
        name: dataNmae_Park,
        img: dataLink_Park,
        latitude: dataLatitude_Park,
        longitude: dataLongitude_Park,
      },
    ];

    res.status(200).json({ Arr });
  } catch (err) {
    console.error(err);
  }
}

module.exports = { seoulData };
