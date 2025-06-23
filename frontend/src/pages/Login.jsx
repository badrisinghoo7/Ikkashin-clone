import React, { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [activeForm, setActiveForm] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint =
        activeForm === "login"
          ? "https://ikkashin-lms.onrender.com/api/users/login"
          : "https://ikkashin-lms.onrender.com/api/users/register";
      const payload =
        activeForm === "login"
          ? {
            email: formData.email,
            password: formData.password,
          }
          : {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        if (activeForm === "login") {
          localStorage.setItem("token", JSON.stringify(result.token));
          localStorage.setItem("userId", JSON.stringify(result.userId));
          navigate("/");
        } else {
          navigate("/login");
        }
      } else {
        alert(`Error: ${result.message || "Something went wrong"}`);
      }
    } catch (err) {
      alert("Network error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-white">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl text-blue-600">🎓</span>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-blue-700">IKKASHIN</h1>
          <p className="text-blue-500 mb-2">
            {activeForm === "login"
              ? "Login to your student account"
              : "Create your student account"}
          </p>
        </div>
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setActiveForm("login")}
            disabled={loading}
            className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${activeForm === "login"
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveForm("register")}
            disabled={loading}
            className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${activeForm === "register"
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
          >
            Sign Up
          </button>
        </div>
        <form className="space-y-6" onSubmit={handleAuthSubmit} autoComplete="off">
          {activeForm === "register" && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-blue-50 text-blue-900"
                required
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-blue-50 text-blue-900"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-12 pr-12 py-3 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-blue-50 text-blue-900"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition-all duration-200"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5 mx-auto" />
            ) : activeForm === "login" ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <div className="mt-8 text-center text-blue-400 text-sm">
          {activeForm === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                className="underline hover:text-blue-600 cursor-pointer"
                onClick={() => setActiveForm("register")}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="underline hover:text-blue-600 cursor-pointer"
                onClick={() => setActiveForm("login")}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}