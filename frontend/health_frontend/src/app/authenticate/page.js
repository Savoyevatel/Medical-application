"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from 'next/link';


const Authenticate = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "User";
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/users/login-user/",
        { username: formData.username, password: formData.password },
        config
      );
  
      // Log the response data for debugging
      console.log('Login Response:', data);
  
      localStorage.setItem("token", data.token); // Save the token in local storage
      localStorage.setItem("username", formData.username); // Save the username in local storage
      
      // Redirect based on isAdmin status
      if (role.toLowerCase() === "doctor" & data.isAdmin) {
        router.push("/dashboard_db");
      } else if (role.toLowerCase() === "patient" & data.isAdmin){
        router.push("/dashboard");
        
      } else if (role.toLowerCase() === "doctor" & !data.isAdmin){
        setError("These are patient credentials, are you a patient?");
      } else {
        router.push("/dashboard");
      }
      
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.error("Error logging in: ", err.response ? err.response.data : err.message);
    }
  };
  

  return (
    <section className="h-screen flex items-center justify-center bg-[#121212]">
      <Link href="/login" className="absolute top-30 left-30 md:top-20 md:left-20 bg-gradient-to-r from-gray-400 to-blue-600 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105">
        Go Back
      </Link>
      <div className="container mx-auto text-center">
        <h1 className="text-white mb-8 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
          Authenticate as {role}
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-400 to-white-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Authenticate
          </button>
        </form>
      </div>
    </section>
  );
};

export default Authenticate;
