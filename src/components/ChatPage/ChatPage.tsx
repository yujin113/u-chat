import React from "react";
import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { UrlContext } from "../../App";
import * as StompJS from "@stomp/stompjs";

interface RoomInfo {
  id: number;
  name: string;
  isEnter: boolean;
}

type Message = {
  username: string;
  sender: boolean;
  content: string;
  createdAt: string;
  type: string;
};

interface User {
  userId: number;
  username: string;
}

export default function ChatPage() {
  const [count, setCount] = useState(0);
  const [creatorId, setCreatorId] = useState();
  const [participants, setParticipants] = useState<User[]>([]);
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
      setCreatorId(response.data.data.creatorId);
      setParticipants(response.data.data.users);
    });
  };

  const leaveRoom = () => {
    if (userId == creatorId) {
      const leave = window.confirm("방이 삭제됩니다. 나가시겠습니까?");
      if (!leave) return;
      client.current.publish({
        destination: "/pub/chat/room",
        body: JSON.stringify({
          roomId: room.id,
          userId: userId,
          sender: username,
          content: "방이 삭제되었습니다.",
          type: "LEAVE",
        }),
      });
    } else {
      client.current.publish({
        destination: "/pub/chat/room",
        body: JSON.stringify({
          roomId: room.id,
          userId: userId,
          sender: username,
          content: username + "님이 나갔습니다.",
          type: "LEAVE",
        }),
      });
    }

    client.current.unsubscribe(`/sub/room/${room.id}`);
    client.current.unsubscribe(`/sub/enter/${room.id}`);
    // client.current.onDisconnect = () => {
    //   client.current.unsubscribe(`/sub/room/${room.id}`);
    // };
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

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };
  useEffect(scrollToBottom);

  const onClickEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      sendMessage();
    }
  };

  const [message, setMessage] = useState("");
  const onMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const client = useRef(
    new StompJS.Client({
      brokerURL: "ws://localhost:8080/ws",
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      // heartbeatIncoming: 4000,
      // heartbeatOutgoing: 4000,
    })
  );

  client.current.onStompError = function (frame) {
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
  };

  useEffect(() => {
    if (!client.current.active) {
      client.current.activate();
    }

    client.current.onConnect = () => {
      client.current.subscribe(`/sub/enter/${room.id}`, (msg) => {
        const newMsg = JSON.parse(msg.body);

        const newMessage: Message = {
          username: newMsg.sender,
          sender: userId == newMsg.userId,
          content: newMsg.content,
          createdAt: "",
          type: newMsg.type,
        };
        setMessages((prevState) => [...prevState, newMessage]);
        if (newMsg.type == "ENTER") {
          setParticipants((prevState) => [
            ...prevState,
            { userId: newMsg.userId, username: newMsg.sender },
          ]);
          setCount((count) => count + 1);
        } else {
          setParticipants((prevState) => {
            const find = prevState.find(
              (state) => state.userId == newMsg.userId
            );
            const idx = prevState.indexOf(find!);
            if (idx != -1) {
              prevState.splice(idx, 1);
            }
            return prevState;
          });
          setCount((count) => count - 1);
        }
      });

      client.current.subscribe(`/sub/room/${room.id}`, (msg) => {
        const newMsg = JSON.parse(msg.body);
        console.log(newMsg.sender + " : " + newMsg.content);
        const now = new Date();

        const createdAt =
          ("0" + (now.getMonth() + 1)).slice(-2) +
          "/" +
          ("0" + now.getDate()).slice(-2) +
          " " +
          ("0" + now.getHours()).slice(-2) +
          ":" +
          ("0" + now.getMinutes()).slice(-2);
        // const receivedTime = new Date().toLocaleTimeString([], {
        //   timeStyle: "short",
        // });
        const newMessage: Message = {
          username: newMsg.sender,
          sender: userId == newMsg.userId,
          content: newMsg.content,
          createdAt: createdAt,
          type: newMsg.type,
        };
        setMessages((prevState) => [...prevState, newMessage]);
      });

      enterMessage();
    };
  }, []);

  const sendMessage = () => {
    if (message == "") return;
    (document.getElementById("msg") as HTMLInputElement).value = "";
    client.current.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify({
        roomId: room.id,
        userId: userId,
        sender: username,
        content: message,
        type: "CHAT",
      }),
    });
  };

  const enterMessage = () => {
    if (room.isEnter === true) {
      client.current.publish({
        destination: "/pub/chat/room",
        body: JSON.stringify({
          roomId: room.id,
          userId: userId,
          sender: username,
          content: username + "님이 들어왔습니다.",
          type: "ENTER",
        }),
      });
    }
  };

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
              {participants.map((participant, index) =>
                participant.userId == creatorId ? (
                  <div className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                    <div className="flex items-center justify-center h-8 w-8 bg-orange-200 rounded-full">
                      {participant.username.substring(0, 1)}
                    </div>
                    <div className="ml-2 text-m font-semibold">
                      {participant.username}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                    <div className="flex items-center justify-center h-8 w-8 bg-pink-200 rounded-full">
                      {participant.username.substring(0, 1)}
                    </div>
                    <div className="ml-2 text-m font-semibold">
                      {participant.username}
                    </div>
                  </div>
                )
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
                <div className="grid grid-cols-12 gap-y-2" ref={scrollRef}>
                  {messages.map((message, index) =>
                    message.type == "ENTER" || message.type == "LEAVE" ? (
                      <div className="col-start-6 col-end-13 py-2 rounded-lg">
                        {message.content}
                      </div>
                    ) : message.sender == true ? (
                      <div className="col-start-6 col-end-13 px-3 pt-1 pb-5 rounded-lg">
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
                      <div className="col-start-1 col-end-8 px-3 pt-1 pb-5 rounded-lg">
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
                <div className="relative w-full" onKeyDown={onClickEnter}>
                  <input
                    type="text"
                    id="msg"
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    onChange={onMessageChange}
                  />
                  {/* <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
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
                  </button> */}
                </div>
              </div>
              <div className="ml-4">
                <button
                  className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  onClick={sendMessage}
                >
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
