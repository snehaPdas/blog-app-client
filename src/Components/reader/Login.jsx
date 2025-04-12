import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("user_access_token");
    if (token) {
     navigate("/home");
    }
  }, [navigate]) 

  const handleLogin = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setError(null); // Reset any previous error message

    try {
      const response = await axiosInstance.post("/login", { email, password });
      
      localStorage.setItem("user_access_token", JSON.stringify(response.data.token)); // Save token to local storage
      localStorage.setItem("user_id", JSON.stringify(response.data.reader.id)); // Save user ID to local storage
      // Handle success (e.g., save token, redirect to home page)
      console.log("Login successful:", response.data);
      navigate("/home") // Redirect to home page after successful login 

    } catch (err) {
      console.error("Login error:", err.response || err.message);
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">Blogify</div>
          <p className="text-sm text-gray-500 mt-1">Welcome back! Please login.</p>
        </div>

        {/* Error Message */}
        {error && <div className="text-red-500 text-center">{error}</div>}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 font-medium hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
