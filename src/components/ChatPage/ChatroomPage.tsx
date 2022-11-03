import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UrlContext } from "../../App";
import axios from "axios";

type DataType = {
  roomId: number;
  name: string;
};

export default function ChatroomPage() {
  const [rooms, setRooms] = useState<DataType[]>([]);
  const [isLogin, setLogin] = useState<string | null>(null);
  const username = localStorage.getItem("username");

  const myRooms = JSON.parse(localStorage.getItem("rooms") || "[]");

  function isMyRoom(roomId: number): boolean {
    const idx = myRooms.indexOf(roomId);
    if (idx == -1) {
      return false;
    } else {
      return true;
    }
  }

  const baseUrl = useContext(UrlContext);

  useEffect(() => {
    setLogin(localStorage.getItem("userId"));
  }, []);

  const getRoomList = () => {
    axios
      .get(baseUrl + `/api/chatroom`)
      .then((response) => {
        setRooms(response.data.data.rooms);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  useEffect(getRoomList, []);
  return (
    <div className="mt-32">
      <div className="px-4 sm:px-8 max-w-5xl m-auto">
        <h1 className="text-4xl text-center font-semibold">채팅방 목록</h1>
        {isLogin == null ? (
          <>
            <p className="mt-2 text-center text-s mb-4 text-gray-500">
              채팅을 원하시면 로그인해주세요
            </p>
          </>
        ) : (
          <>
            <p className="mt-2 text-center text-s tracking-wide mb-4 text-gray-500">
              <span className="font-bold text-indigo-500">{username}</span>님,
              원하는 방을 클릭하여 입장해주세요
            </p>
            <div className="text-right">
              <Link to={`/addroom`} state={{ open: true }}>
                <button className="inline-flex text-sm mb-3 font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-full text-center px-3 py-2 shadow-lg focus:outline-none focus-visible:ring-2">
                  <svg
                    className="w-3 h-3 fill-current text-indigo-300 flex-shrink-0 mr-2"
                    viewBox="0 0 12 12"
                  >
                    <path d="M11.866.146a.5.5 0 0 0-.437-.139c-.26.044-6.393 1.1-8.2 2.913a4.145 4.145 0 0 0-.617 5.062L.305 10.293a1 1 0 1 0 1.414 1.414L7.426 6l-2 3.923c.242.048.487.074.733.077a4.122 4.122 0 0 0 2.933-1.215c1.81-1.809 2.87-7.94 2.913-8.2a.5.5 0 0 0-.139-.439Z" />
                  </svg>
                  <span>New Chat</span>
                </button>
              </Link>
            </div>
          </>
        )}

        <ul className="border border-gray-200 rounded overflow-hidden shadow-md">
          {isLogin
            ? rooms.map((room, index) =>
                !isMyRoom(room.roomId) ? (
                  <Link
                    to={`/enterRoom`}
                    state={{ name: room.name, id: room.roomId }}
                  >
                    <li className="px-4 py-4 bg-white hover:bg-indigo-100 hover:text-indigo-900 border-b border-gray-200 cursor-pointer transition-all duration-300 ease-in-out">
                      {room.name}
                    </li>
                  </Link>
                ) : (
                  <Link
                    to={`/chat/${room.roomId}`}
                    state={{
                      name: room.name,
                      id: room.roomId,
                    }}
                  >
                    <li className="px-4 py-4 bg-white hover:bg-indigo-100 hover:text-indigo-900 border-b border-gray-200 cursor-pointer transition-all duration-300 ease-in-out">
                      {room.name}
                    </li>
                  </Link>

                  // getRoomInfo({id: room.roomId, name: room.name});
                  // <Link
                  //   to={`/enterRoom`}
                  //   state={{ name: room.name, id: room.roomId }}
                  // >
                  //   <li
                  //     className="px-4 py-4 bg-white hover:bg-indigo-100 hover:text-indigo-900 border-b border-gray-200 cursor-pointer transition-all duration-300 ease-in-out"
                  //   >
                  //     {room.name}
                  //   </li>
                  // </Link>
                )
              )
            : rooms.map((room, index) => (
                <Link to="/login">
                  <li className="px-4 py-4 bg-white hover:bg-indigo-100 hover:cursor-pointer hover:text-indigo-900 border-b border-gray-200 transition-all duration-300 ease-in-out">
                    {room.name}
                  </li>
                </Link>
              ))}
        </ul>
      </div>
    </div>
  );
}
