import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 


const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
        // Change the username key to name
        formData.name = formData.username;
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Registration successful! Redirecting...");
        navigate("/login");
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="block w-full p-2 mb-4 border rounded"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="block w-full p-2 mb-4 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="block w-full p-2 mb-4 border rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          className="block w-full p-2 mb-4 border rounded"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
