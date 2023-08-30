import React, { useEffect, useState } from "react";

import { keyboard } from "@testing-library/user-event/dist/keyboard";

const ProjectList = ({ list, pageType, setPageType }) => {
  const getThirdDivText = () => {
    if (pageType === "selling_register" || pageType === "demand_register") {
      return "등록일";
    } else if (pageType === "selling_order") {
      return "제출일";
    } else {
      return "---"; // 기본값 설정
    }
  };

  return (
    <div className="List">
      <div className="list_space">
        <div className="header">
          <div className="first">번호</div>
          <div className="second">프로젝트 제목</div>
          <div className="third">{getThirdDivText()}</div>
          <div className="last">비고</div>
        </div>
        {list.map((list, index) => {
          const orderDate = new Date(list.createdtime);
          const formattedDate = orderDate.toISOString().split("T")[0];

          return (
            <div className="content" key={list.id}>
              <div className="order_num">{index + 1}</div>
              <div className="order_title">{list.name}</div>
              <div className="order_date">{formattedDate}</div>
              <div className="order_memo">{list.status}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProjectList;
