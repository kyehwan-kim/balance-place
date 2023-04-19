import React from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

export default function MainCard() {
  const navigate = useNavigate();
  const arr = [1, 2, 3, 4];

  return (
    <>
      <div className="container">
        <div className="row">
          {arr.map((name, index) => {
            return (
              <Card
                onClick={() => {
                  navigate("/blog");
                }}
                name={name}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
