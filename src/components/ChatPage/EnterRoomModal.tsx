import react, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UrlContext } from "../../App";

type Room = {
  id: number;
  name: string;
};

export default function EnterRoomModal() {
  const [count, setCount] = useState(0);
  const [participants, setParticipants] = useState<string[]>([]);
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  const location = useLocation();
  const room = location.state as Room;

  const baseUrl = useContext(UrlContext);
  const navigate = useNavigate();

  const enterRoom = () => {
    axios
      .post(baseUrl + `/api/chatroom/enter/${room.id}/${userId}`)
      .then((response) => {
        if (response.data.code == 200) {
          var rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
          rooms.push(room.id);
          localStorage.setItem("rooms", JSON.stringify(rooms));
        }
        if (response.data.code == 10020) {
          alert("이미 입장한 방입니다.");
        }
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

  useEffect(getRoomInfo, []);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-2/5 min-w-fit max-w-lg my-6 mx-auto">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start text-right justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">채팅방 입장</h3>
            </div>
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-gray-500 text-lg leading-relaxed">
                현재 참여자 수 : {count}명
              </p>
              <div className="flex flex-col space-y-1 mt-4 -mx-2 h-100 overflow-y-auto">
                {participants.map((participant, index) =>
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
                )}
              </div>
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

              <Link
                to={`/chat/${room.id}`}
                state={{
                  name: room.name,
                  id: room.id
                }}
              >
                <button
                  className="bg-indigo-400 text-white font-bold uppercase text-m px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={enterRoom}
                >
                  입장하기
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
