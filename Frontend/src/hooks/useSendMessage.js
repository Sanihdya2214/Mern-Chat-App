import React from 'react'
import useConverstaion from '../zustand/useConversation';
import { useState } from 'react';

import toast from "react-hot-toast";
const useSendMessage = () => {
     
    const [Loading, setLoading] = useState(false);
    const { selectedConversation,messages, setMessages } = useConverstaion()
    
    const sendMessage = async (message) => {
        setLoading(true)
          try {
              const res = await fetch(
                `/api/messages/send/${selectedConversation._id}`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message }),//here we will take send the data to json strimgify 
                                                //function as object {message}
                }
              );
              const data = await res.json()
              if (data.error) {
                  throw new Error(data.error)
              }
                 setMessages([...messages,data])    


          } catch (error) {
            toast.error(error.message)
          } finally {
              setLoading(false)
          }

    }
       return{Loading,sendMessage}

}

export default useSendMessage
