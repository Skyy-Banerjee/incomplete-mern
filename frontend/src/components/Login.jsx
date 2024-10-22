import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";

function Login() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
  //console.log(loginUser);

  const handleLogin = async (evt) => {
    evt.preventDefault();
    const data = {
      email,
      password,
    };
    // console.log(data);
    try {
      const response = await loginUser(data).unwrap();
      //console.log(response);
      const { token, user } = response;
      dispatch(setUser({ user }));
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      setMessage("Error logging in. Please check your credentials.");
    }
  };

  // Toggle the visibility of the password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold pt-5">Login</h2>
        <form
          onSubmit={handleLogin}
          className="space-y-5 max-w-sm mx-auto pt-8">
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
            Login 🔐
          </button>
        </form>
        <p className="my-5 italic text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-red-700 px-1 underline">
            Register
          </Link>{" "}
          here!
        </p>
      </div>
    </section>
  );
}

export default Login;
