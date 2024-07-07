import React from 'react'
import useGetMessages from '../../hooks/useGetMessages'
import { useAuthContext } from '../../context/AuthContext'
import useConverstaion from '../../zustand/useConversation'
import { extractTime } from '../../utils/extractTime'

const Message = ({message}) => {

  const { authUser } = useAuthContext()
  const { selectedConversation } = useConverstaion()
  
  const fromMe = message.senderId === authUser._id
  const chatClassName = fromMe ? "chat-end" : "chat-start"
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic
  const formatedTime=extractTime(message.createdAt)
  const bubbleBgColor = fromMe ? "bg-blue-500" : ""
  
  const shakeClass=message.shouldShake ? "shake" : ""

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="Tailwind CSS Chat Bubble Component" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} p-2`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex  gap-1 items-center">
        {formatedTime}
      </div>
    </div>
  );
}

export default Message
