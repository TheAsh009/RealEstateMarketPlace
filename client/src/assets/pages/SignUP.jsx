import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    passeword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData);

  return (
    <div>
      <div className="max-w-lg mx-auto mt-8 gap-5">
        <h1 className="text-3xl text-center font-semibold">Sign Up</h1>
        <form className="flex flex-col gap-3 mt-5">
          <input
            type="text"
            placeholder="username"
            className="p-3 focus:outline-none rounded-lg bg-[#fff]"
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            className="p-3 focus:outline-none rounded-lg  bg-[#fff]"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 focus:outline-none rounded-lg  bg-[#fff]"
            id="Password"
            onChange={handleChange}
          />
          <button className="bg-gray-600 rounded-lg text-[#fff] py-2 cursor-pointer mt-5">
            SIGN UP
          </button>
          <button className="bg-red-600 rounded-lg text-[#fff] py-2 cursor-pointer mt-5">
            CONTINUE WITH GOOGLE
          </button>
        </form>
        <div>
          <p className="mt-5">
            Have an Account ?{" "}
            <Link to="sign-in">
              <span className="text-blue-400">Sign In</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
