import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router-dom"; 

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setAuth({ token: data.token, user: data.user });
        
        // Redirect to the homepage after successful login
        navigate("/"); // This will take the user to the homepage
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
        console.log(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
