import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../constants/api";
const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    try {
      const response = await fetch(`${baseURL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Something went wrong. Please try again."
        );
      }

      const { token } = await response.json();

      // Store token in localStorage
      localStorage.setItem("adminToken", token);

      // Navigate to admin dashboard or home
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Admin Login
        </h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-pink-500"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-pink-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg font-medium hover:bg-pink-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
