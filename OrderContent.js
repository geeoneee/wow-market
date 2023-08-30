import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavigationBar from "./NavigationBar";
import List from "./List";

const MyOrder = () => {
  const [orderList, setOrderList] = useState([]); // 주문 데이터를 저장할 상태
  const page = 1;
  useEffect(() => {
    axios.interceptors.request.use((config) => {
      const userAccessToken = localStorage.getItem("accessToken");
      if (userAccessToken) {
        console.log(userAccessToken);
        config.headers["X-ACCESS-TOKEN"] = `${userAccessToken}`;
      }
      return config;
    });

    axios
      .get(`https://www.wowmkt.kr/mypage/myorder?page=${page}`)
      .then((res) => {
        const responseData = res.data;
        setOrderList(responseData.orderList);
      })
      .catch((err) => {
        alert("나의 주문폼 로딩 실패!");
      });
  }, []);
  return (
    <div className="MyOrder">
      <div className="MyOrderContent">
        <div className="title">나의 주문폼</div>

        <div className="order_space">
          <List orderList={orderList} />
        </div>

        <div className="footer">
          <div> 프로젝트 제목을 클릭하면 주문폼 내용을 확인할 수 있습니다.</div>
          <div> 확정 대기 상태에서는 주문폼 수정 및 주문취소가 가능합니다.</div>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
