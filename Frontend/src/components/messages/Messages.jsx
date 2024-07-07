import React, { useRef ,useEffect} from 'react'
import Message from "./Message";
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/MessageSkeleton.jsx';
import useListenMessage from '../../hooks/useListenMessage.js';

const Messages = () => {
	
	const { Loading, messages } = useGetMessages();
	  useListenMessage()
	const lastMessageref = useRef()
	
	   useEffect(() => {
		   setTimeout(() => {
			   lastMessageref.current?.scrollIntoView({ behaviour: "smooth" }); //This will Give the
			                           //The last essage reference
		  },100)
	   },[messages])
	   


	return (
    <div className="px-4 flex-1 overflow-auto">
      {!Loading &&
        messages.length > 0 &&
        messages.map((message) => (
			<div key={message._id}
			      ref={lastMessageref}
			>
            <Message message={message} />
          </div>
        ))}
      {Loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!Loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};
export default Messages;