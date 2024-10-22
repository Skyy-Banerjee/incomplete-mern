import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";

function Register() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleRegister = async (evt) => {
    evt.preventDefault();
    const data = {
      username,
      email,
      password,
    };
    //console.log(data);
    try {
      await registerUser(data).unwrap();
      alert("Registration successful");
      navigate("/login");
    } catch (evt) {
      setMessage("Registration failed");
    }
  };
  // Toggle the visibility of the password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold pt-5">Please Register</h2>
        <form
          onSubmit={handleRegister}
          className="space-y-5 max-w-sm mx-auto pt-8">
          <input
            className="w-full bg-gray-100 focus:outline-none py-3 px-3"
            type="text"
            name="useername"
            id="useername"
            placeholder="Username"
            required
            onChange={(evt) => setUsername(evt.target.value)}
          />
          <input
            className="w-full bg-gray-100 focus:outline-none py-3 px-3"
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            required
            onChange={(evt) => setEmail(evt.target.value)}
          />
          <div className="relative">
            <input
              className="w-full bg-gray-100 focus:outline-none py-3 px-3"
              type={showPassword ? "text" : "password"} // Toggle between 'text' and 'password'
              name="password"
              id="password"
              placeholder="Password"
              required
              onChange={(evt) => setPassword(evt.target.value)}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={togglePasswordVisibility}>
              {/* Conditionally render the eye/eye-off icon 👁️🔒*/}
              {showPassword ? (
                <i className="ri-eye-off-line"></i>
              ) : (
                <i className="ri-eye-line"></i>
              )}
            </span>
          </div>
          {message && <p className="text-red-500">{message}</p>}
          <button
            type="submit"
            className="w-full mt-5 bg-primary text-white hover:bg-red-800 font-medium py-3 rounded-md">
            Register 📝
          </button>
        </form>
        <p className="my-5 italic text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-red-700 px-1 underline">
            Login
          </Link>{" "}
          here!
        </p>
      </div>
    </section>
  );
}

export default Register;
