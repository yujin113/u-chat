import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { UrlContext } from "../../App";

interface RoomInfo {
  id: number;
  name: string;
}

type Message = {
  messageId: number;
  username: string;
  sender: boolean;
  content: string;
  createdAt: string;
};

export default function ChatPage() {
  const [count, setCount] = useState(0);
  const [participants, setParticipants] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  const baseUrl = useContext(UrlContext);

  const navigate = useNavigate();
  const location = useLocation();
  const room = location.state as RoomInfo;

  const getMessageInfo = () => {
    axios
      .get(baseUrl + `/api/chatroom/chats/${room.id}/${userId}`)
      .then((response) => {
        setMessages(response.data.data.messages);
      });
  };
  const getRoomInfo = () => {
    axios.get(baseUrl + `/api/chatroom/info/${room.id}`).then((response) => {
      setCount(response.data.data.count);
      const people: string[] = [];
      response.data.data.users.map((user: string, index: number) => {
        people.push(user);
      });
      setParticipants(people);
    });
  };

  const leaveRoom = () => {
    axios
      .get(baseUrl + `/api/chatroom/leave/${room.id}/${userId}`)
      .then((response) => {
        var rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
        rooms.splice(rooms.indexOf(room.id), 1);
        localStorage.setItem("rooms", JSON.stringify(rooms));
        navigate("/");
      });
  };

  useEffect(() => {
    getRoomInfo();
    getMessageInfo();
  }, [room]);

  return (
    <div className="flex px-4 h-[calc(100vh-7rem)] md:h-[calc(100vh-4rem)] antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
              <svg
                className="w-6 h-6"
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
            <div className="ml-2 font-bold text-2xl">{room.name}</div>
          </div>
          {/* <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
            <div className="h-20 w-20 rounded-full border overflow-hidden">
              <img
                src="https://avatars3.githubusercontent.com/u/2763884?s=128"
                alt="Avatar"
                className="h-full w-full"
              />
            </div>
            <div className="text-sm font-semibold mt-2">Aminos Co.</div>
            <div className="text-xs text-gray-500">Lead UI/UX Designer</div>
            <div className="flex flex-row items-center mt-3">
              <div className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
                <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
              </div>
              <div className="leading-none ml-1 text-xs">Active</div>
            </div>
          </div> */}
          <div className="flex flex-col mt-8">
            <div className="flex flex-row items-center justify-between text-s">
              <span className="font-bold">참가자</span>
              <span className="flex items-center justify-center bg-gray-300 h-5 w-5 rounded-full">
                {count}
              </span>
            </div>
            <div className="flex flex-col space-y-1 mt-4 -mx-2 h-100 overflow-y-auto">
              {participants.map(
                (participant, index) =>
                  // <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                  index == 0 ? (
                    <div className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                      <div className="flex items-center justify-center h-8 w-8 bg-orange-200 rounded-full">
                        {participant.substring(0, 1)}
                      </div>
                      <div className="ml-2 text-m font-semibold">
                        {participant} (방장)
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                      <div className="flex items-center justify-center h-8 w-8 bg-pink-200 rounded-full">
                        {participant.substring(0, 1)}
                      </div>
                      <div className="ml-2 text-m font-semibold">
                        {participant}
                      </div>
                    </div>
                  )

                // </button>
              )}
            </div>

            <button
              onClick={leaveRoom}
              className="absolute bottom-5 px-20 py-2 mr-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl text-center items-center"
            >
              <span>방 나가기</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  {messages.map((message, index) =>
                    message.sender == true ? (
                      <div className="col-start-6 col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-400 flex-shrink-0">
                            {message.username.substring(0, 1)}
                          </div>
                          <div className="relative mr-3 text-sm min-w-[5rem] bg-indigo-100 py-2 px-4 shadow rounded-xl">
                            <div className="text-center">{message.content}</div>
                            <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                              {message.createdAt}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-400 flex-shrink-0">
                            {message.username.substring(0, 1)}
                          </div>
                          <div className="relative ml-3 text-sm min-w-[5rem] bg-white py-2 px-4 shadow rounded-xl">
                            <div className="text-center">{message.content}</div>
                            <div className="absolute text-xs bottom-0 left-0 -mb-5 mr-2 text-gray-500">
                              {message.createdAt}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <div>
                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  />
                  <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="ml-4">
                <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                  <span>Send</span>
                  <span className="ml-2">
                    <svg
                      className="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
