import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Menubar() {
  const [isLogin, setLogin] = useState<string | null>(null);
  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("rooms");
    window.location.reload();
  };

  useEffect(() => {
    setLogin(localStorage.getItem("userId"));
  }, []);

  return (
    <nav className="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
      <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
        <Link to="/">
          <div className="px-16 flex text-indigo-500 md:order-1">
            <div className="px-1 py-2 text-lg font-bold">유챗</div>
            <svg
              className="h-10 w-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              ></path>
            </svg>
          </div>
        </Link>
        <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
          <ul className="flex font-semibold justify-between">
            <Link to="/">
              <li className="md:px-4 md:py-2 text-indigo-500">Chat List</li>
            </Link>
            <Link to="/">
              <li className="md:px-4 md:py-2 hover:text-indigo-400">My Chat</li>
            </Link>
            <Link to="/about">
              <li className="md:px-4 md:py-2 hover:text-indigo-400">
                <a href="#">About</a>
              </li>
            </Link>
          </ul>
        </div>
        <div className="order-2 md:order-3">
          {isLogin == null ? (
            <div className="flex">
              <Link to="/signup">
                <button className="px-4 py-2 mr-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>회원가입</span>
                </button>
              </Link>
              <Link to="/login">
                <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>로그인</span>
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex">
              <div className="px-4 py-2 text-indigo-500 font-bold">
                {username}님
              </div>
              <button
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2"
                onClick={logout}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>로그아웃</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
