import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  
  // Handle form submission
  const handleSubmit = async (e) => {
    const toastId = toast.loading("Logging in...");
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, form);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!", { id: toastId });
      navigate("/");
    } catch (err) {
      toast.error("Invalid login", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-black bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url('https://image.tmdb.org/t/p/original/9O1Iy9od7bHvU4tH9ozGZ7wY41P.jpg')",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 text-white p-10 rounded-2xl shadow-2xl"
      >
        <h2 className="text-4xl font-bold text-center mb-6">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-red-600 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-red-600 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-semibold transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-6 text-gray-300">
          Don't have an account?{" "}
          <Link to="/register" className="text-red-400 hover:underline font-semibold">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
