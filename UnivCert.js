import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UnivCert() {
  const [univName, setUnivName] = useState("");
  const [univMail, setUnivMail] = useState("");
  const [certNum, setCertNum] = useState("");

  const selectUnivNameHandler = (e) => {
    setUnivName(e.currentTarget.value);
  };

  //인증가능대학 하드코딩
  const dummyOptions = [
    { key: "홍익대학교", value: "홍익대학교" },
    { key: "이화여자대학교", value: "이화여자대학교" },
  ];

  const navigate = useNavigate();

  const handleNavitgateToReturn = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const submitUnivData = (e) => {
    let body = {
      univ_name: univName,
      univ_email: univMail,
    };
    console.log(`${univName},${univMail}`);

    axios.interceptors.request.use((config) => {
      /* JWT 토큰 */
      const userAccessToken = localStorage.getItem("accessToken");
      if (userAccessToken) {
        console.log(userAccessToken);
        config.headers["X-ACCESS-TOKEN"] = `${userAccessToken}`;
      }

      return config;
    });

    axios
      .post("https://www.wowmkt.kr/users/univCert", body)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          alert("학교인증코드 발송 성공!");
        } else {
          alert("학교인증코드 발송 실패! 이메일 주소를 확인하세요");
        }
      })
      .catch((err) => {
        alert("학교인증코드 발송 실패! 이메일 주소를 확인하세요");
      });
  };

  const submitCertCode = (e) => {
    let code_body = {
      univ_name: univName,
      univ_email: univMail,
      code: certNum,
    };
    console.log(`인증번호 확인 데이터:${code_body}`);

    axios
      .post("https://www.wowmkt.kr/users/univCert/code", code_body)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          alert("학교인증 성공!");
          localStorage.setItem("univCert", univName);
        } else {
          alert("학교인증 실패! 인증코드를 확인하세요");
        }
      })
      .catch((err) => {
        alert("학교인증 실패! 인증코드를 확인하세요");
      });
  };

  return (
    <div className="UnivCert">
      <div className="title">학교 인증</div>

      <div className="input_body">
        <div className="subtitle">대학명</div>
        <select
          className="input_box"
          onChange={selectUnivNameHandler}
          value={univName}
        >
          {dummyOptions.map((item, index) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <div className="subtitle">학교 이메일</div>
        <div className="input_body_small">
          <input
            placeholder="학교 이메일을 입력해주세요"
            className="input_box_small"
            onChange={(e) => {
              setUnivMail(e.target.value);
            }}
          />
          <button className="small_but" onClick={submitUnivData}>
            인증번호 발송
          </button>
        </div>

        <div className="input_body_small">
          <input
            placeholder="인증번호를 입력해주세요"
            className="input_box_small"
            onChange={(e) => {
              setCertNum(e.target.value);
            }}
          />
          <button className="small_but" onClick={submitCertCode}>
            인증번호 확인
          </button>
        </div>
      </div>

      <div className="input_footer">
        <button className="navigation" onClick={handleNavitgateToReturn}>
          다음에 인증하기
        </button>
      </div>
    </div>
  );
}

export default UnivCert;
