import React, { Component, useEffect, useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { useGlobalContext } from "./Context";
import styles from "../../styles/mp-home.scss";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { TbMapPin, TbMapPinFilled } from "react-icons/tb";
import { BsClipboard, BsClipboardFill } from "react-icons/bs";

const Home = () => {
  const { openSidebar, isNeedMyLocation } = useGlobalContext();
  const [activeCategory, setActiveCategory] = useState();

  useEffect(() => {
    openSidebar("information");
  }, []);

  const isCategoryClick = (category) => {
    setActiveCategory(category);
    openSidebar(category);
  };

  const isCategory = (category) => {
    switch (category) {
      case "information":
        return activeCategory === "information" ? (
          <TbMapPinFilled />
        ) : (
          <TbMapPin />
        );
      case "board":
        return activeCategory === "board" ? (
          <BsClipboardFill />
        ) : (
          <BsClipboard />
        );
      case "bookmark":
        return activeCategory === "bookmark" ? (
          <FaBookmark />
        ) : (
          <FaRegBookmark />
        );

      default:
        return null;
    }
  };

  return (
    <main>
      <div className="wrap-container">
        <div className="menubar">
          {/* 지역, 인구밀집, 날씨  */}
          <button
            className="sidebar-information"
            onClick={() => isCategoryClick("information")}
          >
            {isCategory("information")}
          </button>

          {/* 게시판 */}
          <button
            className="sidebar-board"
            onClick={() => isCategoryClick("board")}
          >
            {isCategory("board")}
          </button>

          {/* 북마크 */}
          <button
            className="sidebar-bookmark"
            onClick={() => isCategoryClick("bookmark")}
          >
            {isCategory("bookmark")}
          </button>

          {/* 현재 위치 */}
          <button
            className="my-location"
            onClick={() => {
              setActiveCategory("category"); // activeCategory를 강제로 변경
              isNeedMyLocation();
            }}
          >
            <BiCurrentLocation />
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
