import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChatroomPage from '../ChatPage/ChatroomPage';

function LandingPage() {
  const [count, setCount] = useState<number>(0);
  const onIncrease = () => setCount(count + 1);
  const onDecrease = () => setCount(count - 1);
  return (
    <div>
      <ChatroomPage />
      {/* <div>
        <Link to="/chatroom">
          <button>채팅목록</button>
        </Link>
      </div>
      <div>
        <Link to="/login">
          <button>로그인</button>
        </Link>
      </div>

      <div>
        <Link to="/signUp">
          <button>회원가입</button>
        </Link>
      </div>

      <div>
        <Link to="/chat">
          <button>채팅</button>
        </Link>
      </div> */}
    </div>
  );
}

export default LandingPage;