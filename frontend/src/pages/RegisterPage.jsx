import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function RegisterPage() {
  const navigate = useNavigate();
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
      await API.post("users/register/", {
        ...formData,
        role: "customer"
      });
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Registration failed");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="border p-10 rounded w-96 space-y-5">
        <h1 className="text-3xl font-bold text-center">Register</h1>
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
        <button className="bg-black text-white w-full p-2">Register</button>
      </form>
    </div>
  );
}
export default RegisterPage;