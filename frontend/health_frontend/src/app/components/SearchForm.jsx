"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AppModal from "./AppModal";

const SearchForm = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSubmit(inputValue);
    setInputValue("");
  };

  const handleEndConversation = () => {
    router.push("/login");
  };

  const handleMakeAppointment = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = (formData) => {
    setIsModalOpen(false);
    // Perform any additional actions with the submitted form data if needed
    router.push("/login");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
  <div className="flex space-x-3">
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Could you fetch me information on diabetes?"
      className="flex-grow p-2 border border-gray-600 rounded-l-lg"
    />
    <button
      type="submit"
      className="p-3 bg-blue-500 hover:bg-blue-900 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
    >
      Send
    </button>
  </div>
  <div className="flex space-x-3">
    <button
      type="button"
      onClick={handleMakeAppointment}
      className="flex-1 p-3 bg-green-500 hover:bg-green-700 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
    >
      Make an Appointment
    </button>
    <button
      type="button"
      onClick={handleEndConversation}
      className="flex-1 p-3 bg-red-500 hover:bg-red-700 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
    >
      End Without Appointment
    </button>
  </div>
</form>
      <AppModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        username={localStorage.getItem("username")}
      />
    </div>
  );
};

export default SearchForm;
