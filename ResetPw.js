import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPw = () => {
  const [button, setButton] = useState(true);
  const [mailId, setMailId] = useState("");

  const navigate = useNavigate();

  const submitTempPw = () => {
    //입력메일 유효성 검사
    if (mailId.includes("@")) {
      console.log("이메일주소 유효");
      axios
        .post(`https://www.wowmkt.kr/users/sendTempPw?email=${mailId}`, {})
        .catch((err) => {
          alert("비밀번호 재설정 실패! 이메일 주소를 확인해주세요");
          navigate(`/users/resetPw`);
        });
      alert("임시 비밀번호 발송 완료! 이메일에서 확인 후 로그인하세요");
      navigate(`/users/login`);
    } else {
      alert("이메일 주소를 확인해주세요!");
    }
  };

  return (
    <div className="ResetPw">
      <div className="title">비밀번호 재설정</div>

      <div className="input_body">
        <div className="subtitle">이메일 주소</div>
        <div>
          <input
            placeholder="가입하신 이메일 주소를 입력해주세요"
            name="address"
            className="address"
            value={mailId}
            onChange={(e) => {
              setMailId(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="temp_pw">
        <button className="temp_pw_button" onClick={submitTempPw}>
          임시 비밀번호 받기
        </button>
      </div>

      <div className="tail">이메일로 전송된 임시 비밀번호를 확인해주세요.</div>
    </div>
  );
};

export default ResetPw;
