import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function Kakao() {
  const [searchParams, setSearchParams] = useSearchParams();

  const code = searchParams.get("code");
  const navigate = useNavigate();
  console.log(code);

  axios
    .post(`https://www.wowmkt.kr/users/kakao/login?code=${code}`, {})
    .then((res) => {
      console.log(res.data);
      const { accessToken } = res.data.accessToken;
      axios.defaults.headers.common["X-ACCESS-TOKEN"] = `${accessToken}`;
      navigate(`/`);
    })
    .catch((err) => {
      alert("카카오 로그인 오류! 다시 시도하세요");
    });

  return <div className="Kakao"></div>;
}

export default Kakao;
