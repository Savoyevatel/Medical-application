// src/app/components/Modal.jsx
import React, { useState } from "react";
import axios from "axios";

const Modal = ({ isOpen, onClose, onSubmit, username }) => {
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username,
      date_of_birth: e.target.elements.dateOfBirth.value,
      gender: e.target.elements.gender.value,
      contact_number: e.target.elements.contactNumber.value,
      address: e.target.elements.address.value,
      medical_history: e.target.elements.medicalRecords.value,
    };

    try {
      await axios.post("http://127.0.0.1:8000/api/users/patient/", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      onSubmit(formData);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg max-w-md mx-auto">
        <h2 className="text-2xl mb-4">Patient Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-2">
            {/* Left Column */}
            <div className="w-full sm:w-1/2 px-2 mb-4">
              <label className="block text-sm font-bold mb-1" htmlFor="dateOfBirth">
                Date of Birth:
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="w-full sm:w-1/2 px-2 mb-4">
              <label className="block text-sm font-bold mb-1" htmlFor="gender">
                Gender:
              </label>
              <select
                id="gender"
                name="gender"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="w-full sm:w-1/2 px-2 mb-4">
              <label className="block text-sm font-bold mb-1" htmlFor="contactNumber">
                Contact Number:
              </label>
              <input
                id="contactNumber"
                name="contactNumber"
                type="tel"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            {/* Right Column */}
            <div className="w-full sm:w-1/2 px-2 mb-4">
              <label className="block text-sm font-bold mb-1" htmlFor="address">
                Address:
              </label>
              <input
                id="address"
                name="address"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="w-full px-2 mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="medicalRecords">
                Medical Records:
              </label>
              <textarea
                id="medicalRecords"
                name="medicalRecords"
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="5"
                required
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
