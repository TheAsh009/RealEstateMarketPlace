import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";

function SignIn() {
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:4000/api/v1/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        // setError(data.message);
        // setLoading(false);
        dispatch(signInFailure(data.message));
        return;
      }

      // setLoading(false);
      // setError(null);
      dispatch(signInSuccess(data));

      setFormData("");
      navigate("/");
    } catch (error) {
      // setLoading(false);
      // setError(error.message);
      dispatch(signInFailure(error.message));
      console.log("Catch block Error", error);
    }
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-lg mx-auto mt-8 gap-5">
          <h1 className="text-3xl text-center font-semibold">Sign In</h1>
          <form className="flex flex-col gap-3 mt-5" onSubmit={handleSubmit}>
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
              {loading ? "Loading..." : "SIGN IN"}
            </button>
            <button className="bg-red-700 rounded-lg text-[#fff] py-2 cursor-pointer mt-5">
              CONTINUE WITH GOOGLE
            </button>
          </form>
          <div>
            <p className="mt-5">
              Don't have an Account ?
              <Link to="/sign-up">
                <span className="text-blue-400">Sign Up</span>
              </Link>
            </p>
            {error && <p className="text-red-500 mt-5">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default SignIn;
