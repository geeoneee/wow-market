import { useParams } from "react-router-dom";
import { Link, Route, Switch } from "react-router-dom";
import React, { useState } from "react"; // useState를 추가
import { useLocation } from "react-router-dom";

const NavigationBar = ({ pageType, setPageType }) => {
  const [showDropdown, setShowDropdown] = useState(false); // 드롭다운 메뉴의 상태 추가

  return (
    <div className="NavigationBar">
      <div className="title">마이페이지</div>
      <div className="nav_box">
        <button
          className={`myInfo ${pageType === "info" ? "active" : ""}`}
          onClick={() => {
            setPageType("info");
          }}
        >
          나의 정보
        </button>
        <button
          className={`myOrder ${pageType === "order" ? "active" : ""}`}
          onClick={() => {
            setPageType("order");
          }}
        >
          나의 주문폼
        </button>
        <div
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button
            className={`myProject ${
              pageType === "selling_register" ||
              pageType === "selling_order" ||
              pageType === "demand_order"
                ? "active"
                : ""
            }`}
            onClick={() => {
              setPageType("selling_register");
            }}
          >
            나의 프로젝트
          </button>
          {/* {showDropdown && (
            <div className="dropdown-menu">
              <button
                onClick={() => {
                  setPageType("project_selling_register");
                }}
                className="dropdown-content"
              >
                판매 등록폼 관리
              </button>
              <button
                onClick={() => {
                  setPageType("project_selling_order");
                }}
                className="dropdown-content"
              >
                판매 주문폼 관리
              </button>
              <button
                onClick={() => {
                  setPageType("project_demand_order");
                }}
                className="dropdown-content"
              >
                수요조사 등록폼 관리
              </button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
