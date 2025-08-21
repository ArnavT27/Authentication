import React, { useEffect } from 'react'
import {motion} from 'framer-motion';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { notification } from 'antd';
import axios from 'axios';
const WelcomeHome = () => {
    const {isAuthenticated,user,setIsAuthenticated,setUser}=useContext(AppContext);
    const [api,context]=notification.useNotification();
    const navigate =useNavigate();
    useEffect(()=>{
        if(!isAuthenticated){
            navigate('/')
        }
    },[isAuthenticated])

    async function handleLogout(){
        try{
            await axios.post("http://127.0.0.1:8000/api/auth/logout",{},{withCredentials:true});
            setTimeout(()=>{
                api.success({
                    message:"Success",
                    description:"Logged out successfully!",
                })

            },3000);
        }
        catch(err){
            api.error({
                message:"Error",
                description:err.response?.data?.message||"Error logging out.Please try again later",
            }) 
        }
        finally{
            setIsAuthenticated(false);
            setUser(null);
        }    
    }
  return (
    <div className="w-full px-4">
      <motion.div initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{duration:1}}  className="max-w-3xl mx-auto">
        <div
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_60px_rgba(16,185,129,0.15)] p-8 md:p-12 text-center"
        >
          {/* Decorative glows */}
          <span aria-hidden className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-2xl" />
          <span aria-hidden className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-lime-400/20 blur-2xl" />


          {/* Heading */}
          <h1 className="bg-gradient-to-r from-emerald-300 via-teal-200 to-lime-200 bg-clip-text text-4xl md:text-5xl font-extrabold tracking-tight text-transparent">
            Welcome, {user &&(user.name[0].toUpperCase()+user.name.substring(1))}
          </h1>

          {/* Subheading */}
          <p className="mt-3 text-sm md:text-base text-gray-200/80">
            You’re all set. Explore the app and enjoy a smooth, secure experience.
          </p>
            <motion.button onClick={handleLogout} whileHover={{scale:1.1}} transition={{duration:0.3}} whileTap={{scale:0.9}} className='bg-gradient-to-br from-green-400 via-emerald-400 to-blue-300 text-white p-[10px] mt-[20px] rounded-2xl font-medium cursor-pointer'>Log out</motion.button>
        
        </div>
        {context}
      </motion.div>
    </div>
  )
}

export default WelcomeHome