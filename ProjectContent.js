import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProjectList from "./ProjectList";

const ProjectContent = ({ pageType, setPageType }) => {
  //axios연동
  const [projectList, setProjectList] = useState([]); // 주문 데이터를 저장할 상태
  const [pageNo, setPageNo] = useState("1");
  const [footerText, setFooterText] = useState([]);

  //selling_register
  let url = `https://www.wowmkt.kr/mypage/myproject?page=${pageNo}`;

  useEffect(() => {
    if (pageType === "selling_register") {
      url = `https://www.wowmkt.kr/mypage/myproject?page=${pageNo}`;
      setFooterText([
        "비고란의 종료하기 버튼을 누르면 진행중인 판매 프로젝트를 종료할 수 있습니다.",
        "프로젝트 종료시 다시 진행상태로 변경할 수 없으니 신중하게 진행하시기 바랍니다.",
      ]);
    } else if (pageType === "selling_order") {
      url = `https://www.wowmkt.kr/mypage/myproject/order?page=${pageNo}`;
      setFooterText([
        "프로젝트 제목을 클릭하면 주문폼 내용을 확인할 수 있습니다.",
        "‘취소 완료’된 주문폼은 환불 처리 후 ‘환불 완료’ 상태로 반드시 변경해주시기 바랍니다.",
      ]);
    } else if (pageType === "demand_register") {
      url = `https://www.wowmkt.kr/mypage/myproject/demand?page=${pageNo}`;
      setFooterText([
        "비고란의 종료하기 버튼을 누르면 진행중인 수요조사 프로젝트를 종료할 수 있습니다.",
        "프로젝트 종료시 다시 진행상태로 변경할 수 없으니 신중하게 변경하시기 바랍니다.",
      ]);
    }
    axios.interceptors.request.use((config) => {
      const userAccessToken = localStorage.getItem("accessToken");
      if (userAccessToken) {
        console.log(userAccessToken);
        config.headers["X-ACCESS-TOKEN"] = `${userAccessToken}`;
      }
      return config;
    });

    axios
      .get(url)
      .then((res) => {
        const responseData = res.data;
        console.log(`목록 데이터 ${responseData.list}`);
        setProjectList(responseData.list);
      })
      .catch((err) => {
        alert("나의 주문폼 로딩 실패!");
      });

    //footer멘트변경
  }, [pageType]);

  return (
    <div className="MyOrder">
      <div className="MyOrderContent">
        <div className="header">
          <select
            className="title"
            onChange={(e) => {
              setPageType(e.target.value);
            }}
          >
            <option value="selling_register">나의 판매 등록폼</option>
            <option value="selling_order">나의 판매 주문폼</option>
            <option value="demand_register">나의 수요조사 등록폼</option>
          </select>
        </div>
        <div className="order_space">
          <ProjectList
            list={projectList}
            pageType={pageType}
            setPageType={setPageType}
          />
        </div>
        <div className="footer">
          <div>{footerText[0]}</div>
          <div>{footerText[1]}</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectContent;
