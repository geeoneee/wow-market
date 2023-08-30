import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/MyPage/NavigationBar";
import axios from "axios";

const MyProjectDemand = () => {
  const [demandList, setDemandList] = useState([]); // 주문 데이터를 저장할 상태
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
      .get(`https://www.wowmkt.kr/mypage/myproject/demand?page=${page}`)
      .then((res) => {
        const responseData = res.data;
        console.log(responseData);
        setDemandList(responseData.demandList);
      })
      .catch((err) => {
        alert("나의 프로젝트-수요조사 등록폼 로딩 실패");
      });
  }, []);

//MyOrder로 css 만들어 두신거 쓰면 좋을 것 같아 우선 class 동일하게 했습니다.
//추후에 다른 페이지들에서도 재사용이 가능하도록 클래스명을 변경하면 좋을것 같습니다.
  return (
    <div className="MyOrder">
      <NavigationBar />
      <div className="MyOrderContent">
        <div className="title">나의 수요조사 등록폼 </div>

        <div className="order_space">
          <div className="header">
            <div className="first">번호</div>
            <div className="second">프로젝트 제목</div>
            <div className="third">제출일</div>
            <div className="last">비고</div>
          </div>
          {demandList && demandList.length > 0 ? (
            demandList.map((demand, index) => {
              const demandDate = new Date(demand.createdtime);
              const formattedDate = demandDate.toISOString().split("T")[0];

              return (
                <div className="content" key={demand.demandid}>
                  <div className="demand_num">{index + 1}</div>
                  <div className="demand_title">{demand.name}</div>
                  <div className="demand_date">{formattedDate}</div>
                  <div className="demand_memo">{demand.status}</div>
                </div>
              );
            })
          ) : (
            <p>등록한 수요조사폼이 없습니다.</p>
          )}
        </div>

        <div className="footer">
          <div>
            {" "}
            비고란의 종료하기 버튼을 누르면 진행중인 수요조사 프로젝트를 종료할
            수 있습니다.
          </div>
          <div>
            {" "}
            프로젝트 종료시 다시 진행상태로 변경할 수 없으니 신중하게 진행하시기
            바랍니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProjectDemand;
