import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import { User, Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrength";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import AppContext from "../context/AppContext";
import { ToastContainer, toast } from 'react-toastify';
const SignupPage = () => {
  const URL = "http://127.0.0.1:8000/api/auth";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();
  const [api, context] = notification.useNotification();
  const {user,isAuthenticated,setUser,setIsAuthenticated,isLoading,setIsLoading}=useContext(AppContext);
  async function handleSignup(e) {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    let response;
    try {
      setIsLoading(true);
      response = await axios.post(`${URL}/signup`, {
        name,
        email,
        password,
        passwordConfirm,
      });
      if(response.data.status==='success'){
        setUser(response.data.data.user);
        setIsAuthenticated(true);
        navigate("/verify-email");
      }

    } catch (err) {
      api.error({
        message: "Error",
        description: err.response?.data?.message,
      });
      setIsLoading(false);
    } finally {
      if(response.data.status==='success'){
        api.success({
          message:"Success",
        })
      }
      setIsLoading(false);
    }
  }
  useEffect(()=>{
    
    if(isAuthenticated && user){
      navigate('/home');
    }
  },[isAuthenticated,user])
  return (
    <motion.div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Create Account
        </h2>
        <form onSubmit={handleSignup}>
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <PasswordStrengthMeter password={password} />
          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            onClick={handleSignup}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className=" animate-spin mx-auto" size={24} />
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link to={"/login"} className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
      {context}
      
    </motion.div>
  );
};

export default SignupPage;
