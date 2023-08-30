import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const TempPw = () => {
  const [pw, setPw] = useState("");
  const [pwCk, setPwCk] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const user_id = searchParams.get("user_id");

  const navigate = useNavigate();
  let body = {
    email: user_id,
    password: pw,
  };

  const submitResetPw = () => {
    console.log("임시비밀번호 서버 전송");
    axios.post(`https://www.wowmkt.kr/users/resetPw`, body).catch((err) => {
      alert("비밀번호 재설정 실패!");
    });
    alert("비밀번호 재설정 성공! 로그인 하세요");
    navigate("/users/login");
  };

  const [button, setButton] = useState(true);

  useEffect(() => {
    pw.length >= 5 && pw === pwCk ? setButton(false) : setButton(true);
  }, [pw, pwCk]);

  return (
    <div className="TempPw">
      <div className="title"> 비밀번호 재설정 </div>

      <div className="input_body">
        <div className="subtitle">이메일 주소</div>
        <div className="input_box">{user_id}</div>
      </div>

      <div className="input_tail">
        <div className="subtitle">비밀번호</div>
        <input
          placeholder="새로운 비밀번호를 입력해주세요"
          className="input_box"
          onChange={(e) => {
            setPw(e.target.value);
          }}
        />
        <br />
        <input
          placeholder="새로운 비밀번호를 확입합니다"
          className="input_check"
          onChange={(e) => {
            setPwCk(e.target.value);
          }}
        />
      </div>

      <div>
        <button className="resetPw" disabled={button} onClick={submitResetPw}>
          비밀번호 재설정하기
        </button>
      </div>
    </div>
  );
};

export default TempPw;
