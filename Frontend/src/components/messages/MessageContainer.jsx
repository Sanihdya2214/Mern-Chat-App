import React, { useEffect } from 'react'
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import NochatSelected from './NochatSelected';
import useConverstaion from '../../zustand/useConversation';


const MessageContainer = () => {

  const { selectedConversation, setSelectedConversation } = useConverstaion()
  
  useEffect(()=> {
    //unmounts the selectedConversation
    //Cleanup Function
      return setSelectedConversation(null)
  
  
    },[setSelectedConversation])

    
	return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NochatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
              <span className="text-gray-900 font-bold">{selectedConversation.username}</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

