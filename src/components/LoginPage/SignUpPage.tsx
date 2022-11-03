import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UrlContext } from "../../App";

type SingUp = {
  email: string;
  username: string;
  password: string;
};

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [guide, setGuide] = useState(false);
  const [code, setCode] = useState<string | null>(null);

  const baseUrl = useContext(UrlContext);
  const navigate = useNavigate();

  const signup = () => {
    if (email == "") {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (username == "") {
      alert("닉네임을 입력해주세요.");
      return;
    }
    if (password == "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (password != passwordCheck) {
      alert("비밀번호가 맞지 않습니다.");
      return;
    }
    axios
      .post(baseUrl + `/api/user/signup`, {
        email: email,
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.code === 10010) {
          setCode("이미 가입된 이메일입니다.");
        } else {
          localStorage.setItem("userId", response.data.data.userId);
          localStorage.setItem("username", response.data.data.userName);
          navigate("/")
          window.location.reload();
        }
      });
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onPasswordCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
    console.log(password + "~");
    console.log(passwordCheck + "~check");
  };

  useEffect(() => {
    if (password != passwordCheck) {
      setGuide(true);
    }
    if (password == passwordCheck) {
      setGuide(false);
    }
  }, [passwordCheck]);

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded text-black w-full">
          <h1 className="mb-8 text-3xl font-bold text-center">회원가입</h1>

          <input
            type="email"
            className="block border border-grey-light w-full p-3 rounded-md mb-4"
            name="email"
            placeholder="이메일"
            onChange={onEmailChange}
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded-md mb-4"
            name="username"
            placeholder="닉네임"
            onChange={onUsernameChange}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded-md mb-4"
            name="password"
            placeholder="비밀번호"
            onChange={onPasswordChange}
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded-md mb-4"
            name="confirm_password"
            placeholder="비밀번호 확인"
            onChange={onPasswordCheckChange}
          />

          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={signup}
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
            Create Account
          </button>
        </div>

        {guide == true ? (
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-red-600">
              비밀번호가 맞지 않습니다.
            </div>
          </div>
        ) : (
          <></>
        )}

        {code == null ? (
          <></>
        ) : (
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-red-600">
              {code}
            </div>
          </div>
        )}

        <div className="text-grey-dark mt-6">
          계정이 있으신가요?
          <a
            className="no-underline border-b border-blue text-indigo-600 hover:text-indigo-500"
            href="/login"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
