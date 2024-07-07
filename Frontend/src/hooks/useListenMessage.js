import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConverstaion from '../zustand/useConversation'
import NotificationSound from "../assets/sounds/Notification.mp3"
const useListenMessage = () => {
  
    const { socket } = useSocketContext()
    const{messages,setMessages}=useConverstaion()

     useEffect(() => {
         socket?.on("newMessage", (newMessage) => {
             newMessage.shouldShake = true
             const sound = new Audio(NotificationSound)
             sound.play()
            setMessages([...messages,newMessage ])
      })
         
        return ()=> socket?.off("newMessage")  
     }, [socket,setMessages,messages])
     

}

export default useListenMessage
