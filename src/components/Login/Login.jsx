import React, { useState } from "react";
import logo from "../../assets/cooptex.png";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { checkIfValidUser } from "../../helpers/StorageHelpers";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidUser = checkIfValidUser(userName, password);
    if (!isValidUser) return;
    navigate("/");
  };

  const isFormValid = userName.length > 0 && password.length > 0;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <div className="flex justify-center">
          <img src={logo} width={150} height={150} alt="log" />
        </div>
        <h3 className="text-2xl font-bold text-center">
          Login to your account
        </h3>
        <div className="mt-4">
          <div>
            <label className="block" htmlFor="email">
              Username
            </label>
            <input
              type="text"
              id="email"
              placeholder="username"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              name="username"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            {/* <span className="text-xs tracking-wide text-red-600">
                Username is required
              </span> */}
          </div>
          <div className="mt-4">
            <label className="block" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div className="flex items-baseline justify-between">
            <button
              disabled={!isFormValid}
              onClick={handleSubmit}
              type="button"
              className={` px-6 py-2 mt-4 text-white rounded-lg ${
                !isFormValid ? "bg-gray-600" : "bg-blue-600  hover:bg-blue-900 "
              }`}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
