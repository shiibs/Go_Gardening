import { useEffect, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenuAlt4 } from "react-icons/hi";

import { Link } from "react-router-dom";
import User from "./User";

import Login from "./Login";

export default function Header({ isHomePage, userDetails, setUserDetails }) {
  return (
    <div
      className={`flex w-full justify-between items-center h-20 px-4 z-10 text-white ${
        isHomePage ? "absolute" : "relative"
      } ${isHomePage ? "top-0" : ""} ${isHomePage ? "" : "bg-gray-800"}`}
    >
      <div className="flex gap-3">
        <h1 className="text-xl">GO-GARDENING.</h1>
        <Link to={"/"} className="font-bold mt-1">
          Home
        </Link>
      </div>
      <div>
        {userDetails ? (
          <User userDetails={userDetails} setUserDetails={setUserDetails} />
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
}
