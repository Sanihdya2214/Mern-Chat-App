import React from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { useState } from 'react';
const useSignup = () => {
    const [Loading, setLoading] = useState(false);
    const{setAuthUser}=useAuthContext()
    const signup = async ({ username, fullName, password, confirmPassword, gender }) => {
        
          const success = handleInputUsers({
            username,
            fullName,
            password,
            confirmPassword,
            gender,
          });
         if(!success) return
          setLoading(true);
        
        try {
            const res = await fetch("/api/auth/signup", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                username,
                fullName,
                password,
                confirmPassword,
                gender,
              }),
            });

            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            //loacaStorage
            localStorage.setItem("chat-user",JSON.stringify(data))
            //context
            setAuthUser(data)
        } catch (error) {
             toast.error(error.message)
        } finally {
            setLoading(false)
        }
        
    }
    
    return { Loading, signup };
}

export default useSignup


function handleInputUsers({ username, fullName, password, confirmPassword, gender }) {
    
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill all the fields")
        return false
    }
    if (password !== confirmPassword) {
        toast.error("Passwords Do Not Match")
        return false
    }
    if (password.length < 6) {
        toast.error("Password must be altleasr 6 character long")
        return false
}
   return true
}