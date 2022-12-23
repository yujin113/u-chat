import React, { useState, useContext, useEffect } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UrlContext } from "../../App";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState<string | null>(null);

  const baseUrl = useContext(UrlContext);
  const navigate = useNavigate();

  const login = async () => {
    await axios
      .post(
        baseUrl + "/api/user/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        if (response.data.code == 1000) {
          setCode("유저를 찾을 수 없습니다.");
        } else if (response.data.code == 10030) {
          setCode("잘못된 비밀번호입니다.");
        } else {
          localStorage.setItem("userId", response.data.data.userId);
          localStorage.setItem("username", response.data.data.userName);
          localStorage.setItem(
            "rooms",
            JSON.stringify(response.data.data.rooms)
          );
          navigate("/");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onClickEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      login();
    }
  };

  return (
    <>
      <div
        className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        onKeyDown={onClickEnter}
      >
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              로그인하기
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="이메일"
                  onChange={onEmailChange}
                  value={email}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="비밀번호"
                  onChange={onPasswordChange}
                  value={password}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={login}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                로그인
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                <Link to="/signup">계정이 없으신가요?</Link>
              </div>
            </div>

            {code == null ? (
              <></>
            ) : (
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-red-600">{code}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
