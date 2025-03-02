import React from "react";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  console.log(file);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-8">Profile</h1>
      <form className="flex flex-col gap-3">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          accept="image/*"
          hidden
        />
        <img
          src={currentUser.avatar}
          alt="Profile"
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 "
        />
        <input
          type="text"
          id="username"
          placeholder="username"
          className="p-3 rounded-lg bg-[#fff] focus:outline-none"
        />

        <input
          type="email"
          id="email"
          placeholder="email"
          className="p-3 rounded-lg bg-[#fff] focus:outline-none"
        />

        <input
          type="password"
          id="password"
          placeholder="password"
          className="p-3 rounded-lg bg-[#fff] focus:outline-none"
        />

        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-85">
          update
        </button>
        <div className="flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer">Delete Account</span>
          <span className="text-red-700 cursor-pointer">Sign Out</span>
        </div>
      </form>
    </div>
  );
}

export default Profile;
