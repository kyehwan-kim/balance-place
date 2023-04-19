import React, { useState, useEffect } from 'react';
import { useGlobalContext } from './Context';
import Loding from './Lodin';
import '../../styles/mp-sidebar.scss';
import { FaBookmark, FaRegBookmark, FaTimes } from 'react-icons/fa';
import { BiChevronRight } from 'react-icons/bi';
import celsius from '../../../src/assets/celsius.png';
import todayWeather from '../../../src/assets/todayWeather.png';
import MainComment from './MainComment';

const Sidebar = ({
  area,
  data,
  weather,
  isLoading,
  isLogin,
  setIsLogin,
  onInsert,
  locationData,
}) => {
  const { isSidebarOpen, closeSidebar, sidebarCategory } = useGlobalContext();

  const [timer, setTimer] = useState('00:00:00');
  // const level = data?.AREA_CONGEST_LVL[0];
  const [bookMarkIcon, setbookMarkIcon] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  // 현재 시간 출력
  const currentTimer = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    setTimer(`${hours}:${minutes}:${seconds}`);
  };

  const startTimer = () => {
    setInterval(currentTimer, 1000);
  };
  startTimer();

  // 북마크
  const endPoint = window.localStorage.getItem('END_POINT');
  useEffect(() => {
    setbookMarkIcon(false); // endPoint 값이 변경될 때마다 bookMarkIcon 값을 false로 초기화
  }, [endPoint]);

  // console.log(endPoint);
  const bookmarkClick = () => {
    const newBookmark = { area, data, weather };
    const existingBookmark = bookmarks.find(
      (bookmark) =>
        bookmark.area === newBookmark.area &&
        bookmark.data === newBookmark.data &&
        bookmark.weather === newBookmark.weather
    );

    // 이미 존재하는 북마크일 경우, 알림 메시지 표시
    if (existingBookmark) {
      alert('이미 북마크된 지역입니다.');
      return;
    }
    setbookMarkIcon(false); // 다른 지역을 클릭하면 북마크 초기화
    setbookMarkIcon(!bookMarkIcon); //토글 버튼
    setBookmarks([...bookmarks, newBookmark]);

    // 북마크가 완료되었다는 알림 메시지 표시
    alert(`${endPoint}가 북마크에 저장되었습니다.`);
  };

  // 북마크 삭제
  const handleBookmarkDelete = (idx) => {
    const newBookmarks = [...bookmarks];
    newBookmarks.splice(idx, 1);
    setBookmarks(newBookmarks);
    // 삭제버튼이 눌리면 북마크 아이콘 초기화
    if (bookMarkIcon) {
      setbookMarkIcon(false);
    }
  };

  return (
    <aside className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'} `}>
      {isLoading ? (
        <Loding /> // 로딩중인 동안 렌더링되는 로딩컴포넌트
      ) : (
        <div className="information-wrap">
          {sidebarCategory === 'information' && (
            <div className="detail-content">
              <div className="sidebar-header">
                {/* 현재 시간 */}
                <p>
                  현재 시간 <span>{timer}</span> 기준
                </p>
                {/* 현재 위치 */}
                <h1>{area}</h1>
                {/* 닫기 버튼 */}
                <button className="close-btn" onClick={closeSidebar}>
                  <FaTimes />
                </button>
                {/* 북마크 */}
                <button className="bookmark-btn" onClick={bookmarkClick}>
                  {bookMarkIcon ? <FaBookmark /> : <FaRegBookmark />}
                </button>
              </div>
              <div className="detail-information">
                {/* 인구밀집도 */}
                <div className="report-population">
                  <h3>
                    실시간 인구 <BiChevronRight />
                  </h3>
                  <h2>
                    현재 인구 혼잡도는{' '}
                    <span // 붐빔도 레벨로 컬러 색상 지정
                      className={`report-crowded ${
                        data?.AREA_CONGEST_LVL[0] === '여유'
                          ? 'green'
                          : data?.AREA_CONGEST_LVL[0] === '보통'
                          ? 'yellow'
                          : data?.AREA_CONGEST_LVL[0] === '약간 붐빔'
                          ? 'orange'
                          : 'red'
                      }`}
                    >
                      {data?.AREA_CONGEST_LVL[0]}
                    </span>{' '}
                    입니다.
                  </h2>
                  <br />
                  <div className="report-crowded-msg">
                    <span>{data?.AREA_CONGEST_MSG[0]}</span>
                  </div>
                </div>

                {/* 날씨 데이터  */}
                <div className="report-weather">
                  <div className="report-live-weather">
                    <h3 style={{ cursor: 'pointer' }}>
                      실시간 날씨 상황 <BiChevronRight />
                    </h3>
                  </div>
                  <div className="today-weather-wrap">
                    <div className="today-weather">
                      <img
                        className="img"
                        src={todayWeather}
                        alt="todayWeather"
                      />
                      <p>오늘의 날씨는 {weather?.pcp_msg}</p>
                    </div>
                  </div>
                  <div className="today-weather-detail">
                    {/* 온도계 이미지 */}
                    <div className="temperature-img">
                      <img className="img" src={celsius} alt="temperature" />
                    </div>

                    {/* 최고,최저 기온 메세지 */}
                    <p>
                      오늘 최고 기온은 {weather?.max_temperature}도 <br />
                      최저 기온은 {weather?.min_temperature}도 입니다. <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {sidebarCategory === 'emergency' && (
            <div className="detail-emergency"></div>
          )}
          {sidebarCategory === 'bookmark' && bookmarkClick && (
            <div className="detail-bookmark">
              <h3>북마크된 지역</h3>
              <button className="close-btn" onClick={closeSidebar}>
                <FaTimes />
              </button>
              <ul>
                {bookmarks.length > 0 ? (
                  bookmarks.map((el, idx) => (
                    <li key={idx}>
                      <div>
                        <div>{el?.area}</div>
                        <div>실시간 날씨🌤️ - {el?.weather?.pcp_msg}</div>
                        <div>
                          실시간 인구 혼잡도 👥 -{' '}
                          <span // 붐빔도 레벨로 컬러 색상 지정
                            style={{ fontSize: '18px' }}
                            className={`report-crowded ${
                              el?.data?.AREA_CONGEST_LVL[0] === '여유'
                                ? 'green'
                                : el?.data?.AREA_CONGEST_LVL[0] === '보통'
                                ? 'yellow'
                                : el?.data?.AREA_CONGEST_LVL[0] === '약간 붐빔'
                                ? 'orange'
                                : 'red'
                            }`}
                          >
                            {data?.AREA_CONGEST_LVL[0]}
                          </span>{' '}
                        </div>
                        <button onClick={() => handleBookmarkDelete(idx)}>
                          삭제
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  // 북마크 없을때 예외처리
                  <ul>
                    <li>
                      <p className="bookmark-text">
                        북마크된 지역이 없습니다 😮
                      </p>
                    </li>
                  </ul>
                )}
              </ul>
            </div>
          )}
          {sidebarCategory === 'board' && (
            <>
              <MainComment
                area={area}
                isLogin={isLogin}
                setIsLogin={setIsLogin}
              />
            </>
          )}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
