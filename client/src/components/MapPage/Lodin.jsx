import React from "react";
import Spinner from "../../assets/spinner.gif";
import "../../styles/loding.scss";

function Loding() {
  return (
    <div className="loding_wrapper">
      <div className="loding_container">
        <h2 className="loding_text">정보를 가져오는 중입니다.</h2>
        <img src={Spinner} alt="스피너" />
      </div>
    </div>
  );
}

export default Loding;
