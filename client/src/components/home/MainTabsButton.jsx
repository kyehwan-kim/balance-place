import React, { useEffect, useState } from 'react';
import '../../styles/main-tabs-button.scss';
import Card from './Card';
import axios from 'axios';

window.addEventListener('scroll', () => {
  const tabListWrap = document.querySelector('.main-tab-top');
  const tabListUl = document.querySelector('.tab-list');

  let scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치

  if (!tabListUl || !tabListWrap) return;

  if (scrollLocation > 860) {
    tabListWrap?.classList.add('scrollTab');
    tabListUl?.classList.add('scrollTabUl');
  } else if (scrollLocation < 860) {
    tabListWrap?.classList.remove('scrollTab');
    tabListUl?.classList.remove('scrollTabUl');
  }
});

export default function MainTabsButton() {
  const [allDataBase, setAllDataBase] = useState([]);
  const [allData, setAllData] = useState();
  const [allImgData, setAllImgData] = useState();
  const [allLatitudeData, setAllLatitudeData] = useState();
  const [allLongitudeData, setAllLongitudeData] = useState();
  const [toggleState, setToggleState] = useState(0);

  const getData = async () => {
    const res = await axios.get('http://localhost:4000/nameData');
    if (res.status !== 200) console.log('데이터 수신 실패');

    // 전체 분류 데이터
    const allDataBase = res.data.Arr;
    // // 첫번째 전체 데이터
    const firstNameData = res.data.Arr[0].name;
    const firstImgData = res.data.Arr[0].img;
    const firstLatitudeData = res.data.Arr[0].latitude;
    const firstLogitudeData = res.data.Arr[0].longitude;

    setAllDataBase((cur) => allDataBase);
    setAllData((cur) => firstNameData);
    setAllImgData((cur) => firstImgData);
    setAllLatitudeData((cur) => firstLatitudeData);
    setAllLongitudeData((cur) => firstLogitudeData);
  };

  useEffect(() => {
    getData();
  }, []);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
      <div className="container main-tab-wrap">
        <div className="row main-tab-top">
          <ul className="tab-list">
            <li className="tab-item">
              <button
                className={toggleState === 0 ? 'nav-link active' : 'nav-link'}
                onClick={() => {
                  toggleTab(0);
                }}
              >
                전체보기
              </button>
            </li>
            <li className="tab-item">
              <button
                className={toggleState === 1 ? 'nav-link active' : 'nav-link'}
                onClick={() => {
                  toggleTab(1);
                }}
              >
                특구
              </button>
            </li>
            <li className="tab-item">
              <button
                className={toggleState === 2 ? 'nav-link active' : 'nav-link'}
                onClick={() => {
                  toggleTab(2);
                }}
              >
                지하철
              </button>
            </li>
            <li className="tab-item">
              <button
                className={toggleState === 3 ? 'nav-link active' : 'nav-link'}
                onClick={() => {
                  toggleTab(3);
                }}
              >
                공원
              </button>
            </li>
          </ul>
        </div>
        <div className="row" style={{ height: '500px' }}>
          <div className="tab-contents-wrap">
            <div className={toggleState === 0 ? 'tab-content1' : 'tab-content'}>
              {allData?.map((el, idx) => {
                return (
                  <Card
                    name={el}
                    key={idx}
                    img={allImgData[idx]}
                    latitude={allLatitudeData[idx]}
                    longitude={allLongitudeData[idx]}
                    location={[allLatitudeData, allLongitudeData]}
                  />
                );
              })}
            </div>
            <div className={toggleState === 1 ? 'tab-content2' : 'tab-content'}>
              {allDataBase[toggleState]?.name?.map((el, idx) => {
                return (
                  <Card
                    key={idx}
                    name={el}
                    img={allDataBase[toggleState]?.img[idx]}
                    latitude={allDataBase[toggleState]?.latitude[idx]}
                    longitude={allDataBase[toggleState]?.longitude[idx]}
                    // location={[allLatitudeData, allLongitudeData]}
                  />
                );
              })}
            </div>
            <div className={toggleState === 2 ? 'tab-content3' : 'tab-content'}>
              {allDataBase[toggleState]?.name?.map((el, idx) => {
                return (
                  <Card
                    key={idx}
                    name={el}
                    img={allDataBase[toggleState]?.img[idx]}
                    latitude={allDataBase[toggleState]?.latitude[idx]}
                    longitude={allDataBase[toggleState]?.longitude[idx]}
                    // location={[allLatitudeData, allLongitudeData]}
                  />
                );
              })}
            </div>
            <div className={toggleState === 3 ? 'tab-content4' : 'tab-content'}>
              {allDataBase[toggleState]?.name?.map((el, idx) => {
                return (
                  <Card
                    key={idx}
                    name={el}
                    img={allDataBase[toggleState]?.img[idx]}
                    latitude={allDataBase[toggleState]?.latitude[idx]}
                    longitude={allDataBase[toggleState]?.longitude[idx]}
                    // location={[allLatitudeData, allLongitudeData]}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
