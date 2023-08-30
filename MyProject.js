import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/MyPage/NavigationBar";
import axios from "axios";

const MyProject = () => {
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
      .get(`https://www.wowmkt.kr/mypage/myproject?page=${page}`)
      .then((res) => {
        const responseData = res.data;
        setProjectList(responseData.orderList);
      })
      .catch((err) => {
        alert("나의 프로젝트-판매 등록폼 로딩 실패");
      });
  }, []);

  return (
    <div className="MyOrder">
      <NavigationBar />
      <div className="MyOrderContent">
        <div className="title">나의 판매 등록폼 </div>
        <div className="order_space">
          <div className="header">
            <div className="first">번호</div>
            <div className="second">프로젝트 제목</div>
            <div className="third">제출일</div>
            <div className="last">비고</div>
          </div>
          {projectList && projectList.length > 0 ? (
            projectList.map((project, index) => {
              const projectDate = new Date(project.createdtime);
              const formattedDate = projectDate.toISOString().split("T")[0];

              return (
                <div className="content" key={project.projectid}>
                  <div className="project_num">{index + 1}</div>
                  <div className="project_title">{project.name}</div>
                  <div className="project_date">{formattedDate}</div>
                  <div className="project_memo">{project.status}</div>
                </div>
              );
            })
          ) : (
            <p>등록한 수요조사폼이 없습니다.</p>
          )}
        </div>

        <div className="footer">
          <div> 비고란의 종료하기 버튼을 누르면 진행중인 판매 프로젝트를 종료할 수 있습니다.</div>
          <div> 프로젝트 종료시 다시 진행상태로 변경할 수 없으니 신중하게 진행하시기 바랍니다.</div>
        </div>
      </div>
    </div>
  );
};

export default MyProject;
