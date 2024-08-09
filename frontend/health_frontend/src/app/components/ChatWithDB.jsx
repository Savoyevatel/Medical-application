"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import SearchFormdb from "./SearchFormdb";

const ChatWithDB = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Good morning Doctor, what can I do for you today?" }
  ]);
  const chatContainerRef = useRef(null);

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
        "http://127.0.0.1:8000/api/chats/chat-with-db/",  // Update this to match your Django URL
        { query: inputValue },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      const assistantMessage = { role: "assistant", content: response.data.response };
      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error("Error fetching data:", error);
      const errorMessage = { role: "assistant", content: "Sorry, I encountered an error. Please try again." };
      setMessages([...newMessages, errorMessage]);
    }
  };

  return (
    <section className="min-h-screen flex flex-col bg-[#121212]">
      <div className="flex-grow flex flex-col w-full">
        <h1 className="text-white my-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center">
          Chat Assistant
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
            <SearchFormdb onSubmit={handleSearch} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatWithDB;