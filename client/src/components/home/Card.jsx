import React from "react";
import "../../styles/card.scss";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";

export default function Card({ name, img, latitude, longitude }) {
  const navigate = useNavigate();
  const divName = async () => {
    try {
      // const res = await axios.post("http://localhost:4000/data/getdata/", {
      //   END_POINT: name,
      // });
      localStorage.setItem("END_POINT", name);
      localStorage.setItem("latitude", latitude);
      localStorage.setItem("longitude", longitude);
      // localStorage.setItem("location", location);

      // 데이터 처리 로직
      navigate("/blog");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="main-card col" onClick={divName}>
        <img className="img" src={img}></img>
        <div className="seoul_end_point">
          <span className="left">{name}</span>
        </div>
        <span>Seoul</span>
      </div>
    </>
  );
}
