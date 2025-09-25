"use client";
import React from "react";
import { Button } from "../ui/button";

import { useState } from "react";
import { Login } from "./Login";
import DemoAccount from "./DemoAccount";
import { Register } from "./Register";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-1 rounded-full bg-gray-200 p-1 px-2">
        <Button
          className={`basis-1/2 rounded-full hover:bg-white hover:text-black ${
            isLogin ? "bg-white text-black " : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setIsLogin(true)}
          size={"sm"}
        >
          Login
        </Button>
        <Button
          className={`basis-1/2 rounded-full hover:bg-white hover:text-black ${
            !isLogin ? "bg-white text-black " : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setIsLogin(false)}
          variant={!isLogin ? "default" : "outline"}
          size={"sm"}
        >
          Register
        </Button>
      </div>
      {isLogin && <Login />}
      {!isLogin && <Register setIsLogin={setIsLogin} />}
      <DemoAccount />
    </div>
  );
};

export default Auth;
