import React from "react";
import mainBanner from "../../assets/mainBanner@2x.png";
import "../../styles/main_banner.scss";
import weatherImg from "../../assets/weather.png";
import peopleImg from "../../assets/people.png";
import peopleImg2 from "../../assets/people2.png";
import notice from "../../assets/notice.png";

export default function MainBanner() {
  return (
    <>
      <div className="main-banner container">
        <div className="box">
          <div className="row">
            <div className="col-md-7">
              <h2>
                서울시 인구 현황과 날씨를 <br /> Balance Place에서
                <br />
                한번에 확인하자!
              </h2>
            </div>
            <div className="col-md-5">
              <img src={mainBanner} alt="지도 이미지" />
            </div>
          </div>
        </div>
      </div>
      <div className="sub-banner container">
        <div className="row">
          <div className="col-md-4">
            <div className="banner-1">
              <div className="row">
                <div className="col-7 text">
                  <h4>
                    실시간 날씨
                    <br />
                    확인하기
                  </h4>
                </div>
                <div className="col-5">
                  <img className="img" src={weatherImg} alt="날씨 이미지" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="banner-2">
              <div className="row">
                <div className="col-7 text">
                  <h4>
                    실시간 인구
                    <br />
                    확인하기
                  </h4>
                </div>
                <div className="col-5">
                  <img className="img" src={peopleImg2} alt="사람 이미지" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="banner-3">
              <div className="row">
                <div className="col-7 text">
                  <h4>
                    실시간 인구
                    <br />
                    알림받기
                  </h4>
                </div>
                <div className="col-5">
                  <img className="img" src={notice} alt="알림 이미지" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
