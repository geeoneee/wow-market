import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const InfoContent = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    univ: "",
  });
  useEffect(() => {
    axios.interceptors.request.use((config) => {
      const userAccessToken = localStorage.getItem("accessToken");
      if (userAccessToken) {
        config.headers["X-ACCESS-TOKEN"] = `${userAccessToken}`;
      }
      return config;
    });

    axios
      .get("https://www.wowmkt.kr/mypage/myinfo")
      .then((res) => {
        const data = res.data; // 예시: { name: "김와우", email: "wow1234@mail.com", univ: "와우대학교" }
        setUserInfo(data); // 상태 업데이트
      })
      .catch((err) => {
        alert("마이페이지 로딩 실패!");
      });
  }, []);

  return (
    <div className="MyInfo">
      <div className="InfoContent">
        <div className="MyInfoContent">
          <div className="title">나의 정보</div>
          <div className="info_space">
            <div className="check_space">
              <div className="name_subtitle">이름</div>
              <div className="mail_subtitle">이메일</div>
              <div className="univ_subtitle">소속학교</div>
            </div>
            <div className="info">
              <div className="name">{userInfo.name}</div>
              <div className="email">{userInfo.email}</div>
              <div className="univ">{userInfo.univ}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoContent;
