import { useParams } from "react-router-dom";

const MyPage = () => {
  const { user_id } = useParams();
  return (
    <div className="MyPage">
      <div>{user_id}번 사용자</div>
      <div>마이페이지</div>
    </div>
  );
};

export default MyPage;
