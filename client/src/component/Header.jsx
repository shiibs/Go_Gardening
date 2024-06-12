import { useEffect, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenuAlt4 } from "react-icons/hi";

import { Link } from "react-router-dom";
import User from "./User";

import Login from "./Login";

export default function Header({ isHomePage, loggedIn, user }) {
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
        {loggedIn ? (
          <User loggedIn={loggedIn} user={user} />
        ) : (
          <Login loggedIn={loggedIn} />
        )}
      </div>
    </div>
  );
}

{
  /* <div className="md:hidden z-10" onClick={handleNav}>
        {nav ? <AiOutlineClose size={20} /> : <HiOutlineMenuAlt4 size={20} />}
      </div>

      <div
        onClick={handleNav}
        className={
          nav
            ? "absolute text-black left-0 top-0 w-full bg-gray-100/90 px-4 py-7 flex-col"
            : "absolute left-[-100%]"
        }
      >
        <ul>
          <h1>GO-GARDENING.</h1>
          <li className="border-b">Home</li>
          <li className="border-b">About</li>
          <li className="border-b">Contact</li>
        </ul>
      </div> */
}
