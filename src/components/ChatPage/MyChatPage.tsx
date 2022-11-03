import react, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Room = {
  roomId: number;
  name: string;
};

export default function MyChatPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLogin, setLogin] = useState<string | null>(
    localStorage.getItem("userId")
  );
  const username = localStorage.getItem("username");

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin == null) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="mt-32">
      <div className="px-4 sm:px-8 max-w-5xl m-auto">
        <h1 className="text-4xl text-center font-semibold">
          내가 참여한 채팅방 목록
        </h1>
        <p className="mt-2 text-center text-s tracking-wide mb-4 text-gray-500">
          <span className="font-bold text-indigo-500">{username}</span>님이
          참여한 채팅방입니다.
        </p>

        <ul className="border border-gray-200 rounded overflow-hidden shadow-md">
          {rooms.map((room, index) => (
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
          ))}
        </ul>
      </div>
    </div>
  );
}
