import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UrlContext } from "../../App";

export default function AddRoomPage() {
  const [title, setTitle] = useState("");
  const userId = localStorage.getItem("userId");

  const baseUrl = useContext(UrlContext);

  const navigate = useNavigate();

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const addRoom = () => {
    axios
      .post(baseUrl + `/api/chatroom/save/${userId}`, {
        name: title,
      })
      .then((response) => {
        var rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
        rooms.push(response.data.roomId);
        localStorage.setItem("rooms", JSON.stringify(rooms));
        navigate(`/chat/${response.data.roomId}`, {
          state: {
            id: response.data.roomId,
            name: title,
          },
        });
      });
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-2/5 min-w-fit max-w-lg my-6 mx-auto">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start text-right justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">채팅방 만들기</h3>
            </div>
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                방 제목을 입력해주세요.
              </p>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded-md mb-4"
                name="username"
                placeholder="제목을 입력하세요"
                onChange={onTitleChange}
              />
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-indigo-400 background-transparent font-bold uppercase px-6 py-2 text-m outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  navigate("/");
                }}
              >
                취소
              </button>
              <button
                className="bg-indigo-400 text-white font-bold uppercase text-m px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={addRoom}
              >
                생성하기
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
