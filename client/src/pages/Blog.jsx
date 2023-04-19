import React, { useEffect, useState } from 'react';
import NaverMaps from '../components/MapPage/NaverMaps';
import { Container as MapDiv } from 'react-naver-maps';
import Sidebar from '../components/MapPage/Sidebar';
import Home from '../components/MapPage/Home';
import axios from 'axios';
import '../styles/mp-blog.scss';
import { useGlobalContext } from '../components/MapPage/Context';

export default function Blog({ isLogin, setIsLogin }) {
  const [areaData, setAreaData] = useState();
  const [data, setData] = useState();
  const [weatherData, setWeatherData] = useState();
  const [latlngData, setLatLngData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { endPoint } = useGlobalContext();

  const point = localStorage.getItem('END_POINT');

  const getData = async () => {
    setIsLoading(true); // 로딩중임을 알림
    try {
      const res = await axios.post('http://localhost:4000/data/getdata', {
        point,
      });

      const allData = res.data;
      setAreaData((cur) => allData.model.area_name);
      setData((cur) => allData.model.live_data);
      setWeatherData((cur) => allData.weatherModel);
      setLatLngData((cur) => allData.newLocation);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false); // 로딩 완료를 알림
  };

  useEffect(() => {
    getData();
    //10분마다 데이터 갱신 시키기
    const reNew = setInterval(() => {
      getData();
      console.log('데이터 갱신 완료');
    }, 600000);
    return () => clearInterval(reNew); // unmount 시 interval 해제
  }, [endPoint]);

  return (
    <>
      {/* <Header
        name="container-fluid"
        style={{
          borderBottom: "1px solid #e1e1e1",
        }}
      /> */}
      <MapDiv
        style={{
          width: '100%',
          height: '90vh',
        }}
      >
        <Home />
        <Sidebar
          area={areaData}
          data={data}
          weather={weatherData}
          isLoading={isLoading}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          locationData={latlngData}
        />
        <NaverMaps locationData={latlngData} data={data} isLogin={isLogin} />
      </MapDiv>
    </>
  );
}
