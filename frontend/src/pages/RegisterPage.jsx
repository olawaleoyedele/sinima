import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import handleRegisterError from "../utils/handleRegisterError";
import { toast } from "react-hot-toast";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const RegisterPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Loading...");
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/auth/register`, form);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setErrorMsg(handleRegisterError(err));
    }
  };

  return (
    <div className="min-h-screen bg-black bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url('https://image.tmdb.org/t/p/original/tAkyM0e0A7nkgNy1nPqvYjxIwRM.jpg')",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 text-white p-10 rounded-2xl shadow-2xl"
      >
        <h2 className="text-4xl font-bold text-center mb-6">Create Account</h2>
        {errorMsg && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
            {errorMsg}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-md font-semibold transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm mt-6 text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-400 hover:underline font-semibold">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
