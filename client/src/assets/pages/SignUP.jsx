import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/v1/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      //
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      console.log(data);
      setFormData("");
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-lg mx-auto mt-8 gap-5">
          <h1 className="text-3xl text-center font-semibold">Sign Up</h1>
          <form className="flex flex-col gap-3 mt-5" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="username"
              className="p-3 focus:outline-none rounded-lg bg-[#fff]"
              id="username"
              onChange={handleChange}
              value={formData.username}
            />
            <input
              type="email"
              placeholder="email"
              className="p-3 focus:outline-none rounded-lg  bg-[#fff]"
              id="email"
              onChange={handleChange}
              value={formData.email}
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 focus:outline-none rounded-lg  bg-[#fff]"
              id="password"
              onChange={handleChange}
              value={formData.password}
            />
            <button
              className="bg-gray-600 rounded-lg text-[#fff] py-2 cursor-pointer mt-5"
              disabled={loading}
            >
              {loading ? "Loading..." : "SIGN UP"}
            </button>
            <button className="bg-red-700 rounded-lg text-[#fff] py-2 cursor-pointer mt-5">
              CONTINUE WITH GOOGLE
            </button>
          </form>
          <div>
            <p className="mt-5">
              Have an Account ?{" "}
              <Link to="/sign-in">
                <span className="text-blue-400">Sign In</span>
              </Link>
            </p>
            {error && <p className="text-red-500 mt-5">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
