import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Code JS
  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);
  // console.log(actionLogin);
  const user = useEcomStore((state) => state.user);
  // console.log('user from zustand',user)

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      // key:value
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(form)

    // -------------- Sent to back --------
    // ย้ายไป Zustand
    try {
      const res = await actionLogin(form);
      // console.log(res)
      const role = res.data.payload.role;
      // console.log(role)
      roleRedirect(role);

      toast.success("Welcome Back");
    } catch (err) {
      // console.log(err);
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }

    // try{
    //   const res = await axios.post('http://localhost:5001/api/login',form)
    //   console.log(res)
    //   toast.success(res.data)
    // }catch(err){
    //   // console.log(err)
    //   const errMsg = err.response?.data?.message
    //   toast.error(errMsg)
    // }
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };
  return (
    <div>
      Login
      <form onSubmit={handleSubmit}>
        Email
        <input
          className="border"
          onChange={handleOnChange}
          name="email"
          type="email"
        />
        Password
        <input
          className="border"
          onChange={handleOnChange}
          name="password"
          type="text"
        />
        <button className="bg-blue-500 rounded-b-md">Login</button>
      </form>
    </div>
  );
};

export default Login;
