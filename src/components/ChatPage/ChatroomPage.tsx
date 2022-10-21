import React from "react";

export default function ChatroomPage() {
  return (
    <div className="mt-32">
      <div className="px-4 sm:px-8 max-w-5xl m-auto">
        <h1 className="text-3xl text-center font-semibold">채팅방 목록</h1>
        <p className="mt-2 text-center text-s mb-4 text-gray-500">
          채팅을 원하시면 로그인해주세요
        </p>
        <ul className="border border-gray-200 rounded overflow-hidden shadow-md">
          <li className="px-4 py-4 bg-white hover:bg-indigo-100 hover:text-indigo-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
            First Item
          </li>
          <li className="px-4 py-4 bg-white hover:bg-indigo-100 hover:text-indigo-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
            Second Item
          </li>
          <li className="px-4 py-4 bg-white hover:bg-indigo-100 hover:text-indigo-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
            Third Item
          </li>
          <li className="px-4 py-4 bg-white hover:bg-indigo-100 hover:text-indigo-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
            Another Item
          </li>
          <li className="px-4 py-4 bg-white hover:bg-indigo-100 hover:text-indigo-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
            Item for the Nth time
          </li>
        </ul>
      </div>
    </div>
  );
}
