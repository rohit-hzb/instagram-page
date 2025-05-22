import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "./App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import icon from "./assets/instagram_icon.png"

export default function Login({ setToken }) {
  const [currentState, setCurrentState] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword,setShowPassword]=useState(false);
  const navigate=useNavigate();

  const formHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "signup") {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          toast.success(response.data.message);
          setName("");
          setEmail("");
          setPassword("");
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          toast.success(response.data.message);
          navigate("/home");
          setEmail("");
          setPassword("");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong. Try again."
      );
      console.error(error);
    }
  };

  const isLogin = currentState === "login";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Auth Container */}
      <div className="w-full max-w-md bg-white border rounded-lg shadow-md p-8">
        {/* Logo */}
        {/* <div className="flex justify-center mb-6">
          <img
            src={icon}
            alt="Instagram Logo"
            className="w-24 h-24 object-contain"
          />
        </div> */}

        {/* Header */}
        <h2 className="text-center text-xl font-bold mb-4">
          {isLogin ? "Log in to Instagram" : "Sign up for Instagram"}
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={formHandler}>
          {!isLogin && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
         <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Password"
    className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
    required
  />
  <span
    className="absolute right-3 top-2.5 text-sm text-blue-500 cursor-pointer select-none"
    onClick={() => setShowPassword((prev) => !prev)}
  >
    {showPassword ? "Hide" : "Show"}
  </span>
</div>


          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600 transition"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>

          {isLogin && (
            <div className="text-xs text-center text-blue-500 cursor-pointer hover:underline">
              Forgot password?
            </div>
          )}
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-2 text-gray-500 text-sm font-semibold">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Facebook Login */}
        <div className="text-center text-sm text-blue-900 font-medium cursor-pointer hover:underline">
          Log in with Facebook
        </div>
      </div>

      {/* Toggle Box */}
      <div className="w-full max-w-md mt-4 p-4 bg-white border rounded-lg shadow-md text-center text-sm">
        {isLogin ? (
          <>
            Don&apos;t have an account?{" "}
            <span
              className="text-blue-500 font-semibold cursor-pointer hover:underline"
              onClick={() => setCurrentState("signup")}
            >
              Sign up
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span
              className="text-blue-500 font-semibold cursor-pointer hover:underline"
              onClick={() => setCurrentState("login")}
            >
              Log in
            </span>
          </>
        )}
      </div>
    </div>
  );
}
