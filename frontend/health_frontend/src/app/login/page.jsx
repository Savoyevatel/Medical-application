// app/components/Login.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Login = () => {
  return (
    <section className="h-screen flex items-center justify-center bg-[#121212]">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-white mb-8 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            Select Your Role
          </h1>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          {["Doctor", "Patient", "Visitor"].map((role, index) => (
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={role === "Visitor" ? "/dashboard_vis" : `/authenticate?role=${role}`}
                className="inline-block px-6 py-3 w-48 text-lg font-medium text-white bg-gradient-to-r from-blue-400 to-gray-600 rounded-md hover:from-blue-500 hover:to-blue-700 transition-colors duration-300"
                >
                {role}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8">
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
            Not registered?{" "}
            <Link href="/register" className="text-gray-600 hover:underline">
              Register!
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
