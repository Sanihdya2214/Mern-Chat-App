import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useConverstaion from '../zustand/useConversation'


const useGetMessages = () => {
    const [Loading, setLoading] = useState(false)
    const { selectedConversation, setSelectedConversation, setMessages, messages } = useConverstaion()
    
    useEffect(() => {
         const getMessage = async () => {
           setLoading(true);
           try {
             const res = await fetch(
               `/api/messages/${selectedConversation._id}`
             );
             const data = await res.json();

             if (data.error) {
               throw new Error(data.error);
             }

             setMessages(data);
           } catch (error) {
             toast.error(error.message);
           } finally {
             setLoading(false);
           }
         };
       
        if(selectedConversation?._id) getMessage()

    },[selectedConversation?._id,setMessages] )
    
      return{Loading,messages}

}

export default useGetMessages
