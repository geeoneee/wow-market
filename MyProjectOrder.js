import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/MyPage/NavigationBar";
import axios from "axios";

const MyProjectOrder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectList, setProjectList] = useState([]); // 주문 데이터를 저장할 상태
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
      .get(`https://www.wowmkt.kr/mypage/myproject/order?page=${page}`)
      .then((res) => {
        const responseData = res.data;
        setProjectList(responseData.orderList);
      })
      .catch((err) => {
        alert("나의 판매 주문폼 로딩 실패");
      });
  }, []);

  return (
    <div className="MyOrder">
      <NavigationBar />
      <div className="MyOrderContent">
        <div className="title">나의 판매 주문폼 </div>

        <div className="footer">
          <div> 프로젝트 제목을 클릭하면 주문폼 내용을 확인할 수 있습니다.</div>
          <div> ‘취소 완료’된 주문폼은 환불 처리 후 ‘환불 완료’ 상태로 반드시 변경해주시기 바랍니다.</div>
        </div>
      </div>
    </div>
  );
};

export default MyProjectOrder;
