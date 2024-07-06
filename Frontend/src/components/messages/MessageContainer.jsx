import React from 'react'
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import NochatSelected from './NochatSelected';


const MessageContainer = () => {

    const noChatSelected=true
    
	return (
    <div className="md:min-w-[450px] flex flex-col">
      {noChatSelected ? (
        <NochatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">Sanidhya Agarwal</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

