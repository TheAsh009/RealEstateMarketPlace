import React from "react";

import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm flex flex-wrap sm:text-xl">
            <span className="text-slate-500">Ashitosh</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        <form className="bg-slate-100 p-3 rounded-lg focus:outline-none flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-24 sm:w-64"
          />
          <IoSearch />
        </form>
        <ul className="text-slate-700 flex items-center space-x-4 cursor-pointer">
          <Link to="/">
            <li className="hidden sm:inline hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline hover:underline">About</li>
          </Link>
          <Link to="/sign-in">
            <li className="hidden sm:inline hover:underline">Sign In</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
