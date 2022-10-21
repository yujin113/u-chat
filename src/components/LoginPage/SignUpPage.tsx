import React from "react";

export default function SignUpPage() {
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl font-bold text-center">회원가입</h1>

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded-md mb-4"
            name="email"
            placeholder="이메일"
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded-md mb-4"
            name="username"
            placeholder="닉네임"
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded-md mb-4"
            name="password"
            placeholder="비밀번호"
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded-md mb-4"
            name="confirm_password"
            placeholder="비밀번호 확인"
          />

          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
            Create Account
          </button>
        </div>

        <div className="text-grey-dark mt-6">
          계정이 있으신가요?
          <a
            className="no-underline border-b border-blue text-indigo-600 hover:text-indigo-500"
            href="../login/"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
