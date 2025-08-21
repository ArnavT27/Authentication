import React, { useContext, useState } from 'react'
import {Lock,Loader} from 'lucide-react'
import { motion } from 'framer-motion';
import Input from '../components/Input';
import { notification } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AppContext from '../context/AppContext';
const ChangePasswordPage = () => {
    const [password,setPassword]=useState('');
    const [passwordConfirm,setPasswordConfirm]=useState('');
    const [isLoading,setIsLoading]=useState(false);
    const [api,context]=notification.useNotification();
    const url='http://127.0.0.1:8000/api/auth';
    const {token}=useParams();
    const {setIsAuthenticated}=useContext(AppContext);
    const navigate=useNavigate();
    async function handleChange(e){
        e.preventDefault();
        setIsLoading(true);
        try{
            const response=await axios.post(`${url}/forgot-password/${token}`,{password,passwordConfirm});
            console.log(response);
            setIsAuthenticated(false);
            navigate('/login');
        }
        catch(err){
            api.error({
                message:"Error",
                description:err.response.data.message,
            })
        }
        finally{
            setIsLoading(false);
        }
    }
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br p-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md"
            >
                <div className="relative overflow-hidden rounded-2xl bg-gray-800 shadow-2xl border border-gray-700">                    
                    <div className="relative p-8">
                        <div className="text-center mb-8">
                            <h1 className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-600 text-transparent bg-clip-text text-4xl font-bold mb-2">
                                Change Password
                            </h1>
                            
                        </div>
                        
                        <form onSubmit={handleChange}  className="space-y-6">
                            <div className="space-y-2">
                                <Input 
                                    icon={Lock} 
                                    type="password" 
                                    placeholder="Enter your password"
                                    required
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Input 
                                    icon={Lock} 
                                    type="password" 
                                    placeholder="Confirm Password"
                                    required
                                    onChange={(e)=>setPasswordConfirm(e.target.value)}
                                />
                            </div>
                            
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 transform hover:shadow-xl"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <Loader className="w-5 h-5 animate-spin" />
                                        <span>Sending...</span>
                                    </div>
                                ) : (
                                    "Confirm"
                                )}
                            </motion.button>
                        </form>
                        
                        <div className="mt-6 text-center">
                            <motion.a
                                href="/login"
                                whileHover={{ scale: 1.05 }}
                                className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-200"
                            >
                                ← Back to Login
                            </motion.a>
                        </div>
                    </div>
                </div>
                {context}
            </motion.div>
        </div>
  )
}

export default ChangePasswordPage