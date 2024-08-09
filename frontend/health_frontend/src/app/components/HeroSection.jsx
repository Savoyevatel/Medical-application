"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="h-screen flex flex-col items-center justify-center bg-[#121212]">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-7xl lg:leading-normal font-extrabold">
            <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              <TypeAnimation
                sequence={[
                  "Your personal healthcare assistant",
                  1000,
                  "Custom Treatment Plans",
                  1000,
                  "Real stories, real results",
                  1000,
                  "Track your personal treatment",
                  1000,
                  "Recovery monitoring",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
        </motion.div>
      </div>
      
      <div className="container mx-auto mt-6 text-center">
        <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
          I am a <span className="font-bold">healthcare application</span> that generates treatment plans to help people recover from diseases.
        </p>
        <Link legacyBehavior href={"/login"}>
          <a className="inline-block px-6 py-3 w-48 text-lg font-medium text-white bg-gray-600 rounded-md hover:bg-blue-600 transition-colors duration-300">
            Try
          </a>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
