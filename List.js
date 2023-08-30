import React, { useEffect, useState } from "react";

import { keyboard } from "@testing-library/user-event/dist/keyboard";

const List = ({ orderList }) => {
  const [pageType, setPageType] = useState("");
  const getThirdDivText = () => {
    if (pageType === "register" || pageType === "demand") {
      return "등록일";
    } else if (pageType === "order" || pageType === "selling") {
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
        {orderList.map((order, index) => {
          const orderDate = new Date(order.createdtime);
          const formattedDate = orderDate.toISOString().split("T")[0];

          return (
            <div className="content" key={order.orderid}>
              <div className="order_num">{index + 1}</div>
              <div className="order_title">{order.name}</div>
              <div className="order_date">{formattedDate}</div>
              <div className="order_memo">{order.status}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default List;
