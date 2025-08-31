import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const Register =  () => {
  // Code JS
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
    if(form.password !== form.confirmPassword){
      return alert('Password is not match')
    }
    // console.log(form);

    // Sent to back
    try{
      const res = await axios.post('http://localhost:5001/api/register',form)
      // console.log(res)
      toast.success(res.data)
    }catch(err){
      // console.log(err)
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
    }
    
  };
  return (
    <div>
      Register
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
        Confirm Password
        <input
          className="border"
          onChange={handleOnChange}
          name="confirmPassword"
          type="text"
        />
        <button className="bg-blue-500 rounded-b-md">Register</button>
      </form>
    </div>
  );
};

export default Register;
