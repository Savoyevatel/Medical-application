// src/app/components/Dashboard.jsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import SearchForm from "./SearchForm";
import Modal from "./Modal";

const Dashboard = () => {
  const [username, setUsername] = useState(null);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi, I'm a medical application, how can I help you today?" }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [medicalRecords, setMedicalRecords] = useState(null);
  const chatContainerRef = useRef(null);
  useEffect(() => {
    // This code will only run on the client side
    setUsername(localStorage.getItem("username"));
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSearch = async (inputValue) => {
    const newMessages = [...messages, { role: "user", content: inputValue }];
    setMessages(newMessages);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/chats/search/",
        { messages: newMessages },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      const assistantMessage = { role: "assistant", content: response.data };
      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleModalSubmit = (records) => {
    setMedicalRecords(records);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="min-h-screen flex flex-col bg-[#121212]">
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
        onSubmit={handleModalSubmit}
        username={username}
      />
      {!isModalOpen && (
        <div className="flex-grow flex flex-col w-full">
          <h1 className="text-white my-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center">
            HealWave AI
          </h1>
          <div 
            ref={chatContainerRef}
            className="flex-grow overflow-y-auto mb-4 px-4 bg-[#121212]"
          >
            <div className="max-w-4xl mx-auto w-full">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`mb-4 max-w-[70%] ${msg.role === "assistant" ? "mr-auto" : "ml-auto"}`}
                >
                  <div 
                    className={`p-3 rounded-lg ${
                      msg.role === "assistant" ? "bg-[#727786] text-white" : "bg-gray-300 text-black"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4 px-4 bg-[#121212]">
            <div className="max-w-4xl mx-auto">
              <SearchForm onSubmit={handleSearch} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Dashboard;
