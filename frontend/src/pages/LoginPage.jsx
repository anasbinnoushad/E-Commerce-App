import { useContext, useState } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("users/login/", formData);
      const user = response.data.user;
      const token = response.data.token.access;
      login(user, token);
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "merchant") {
        navigate("/merchant-dashboard");
      } else {
        navigate("/customer-dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid credentials");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="border p-10 rounded w-96 space-y-5">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border w-full p-2"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border w-full p-2"
          onChange={handleChange}
        />
        <button className="bg-black text-white w-full p-2">Login</button>
          </form>
    </div>
  );
}
export default LoginPage;