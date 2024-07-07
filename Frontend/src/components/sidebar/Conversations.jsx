import React from 'react'
import Conversation from './Conversation';
import useConversations from '../../hooks/useConversations';
import { getRandomEmoji } from '../../utils/emojis';

const Conversations = () => {
  const { Loading, conversations } = useConversations()
    console.log("Conversations",conversations)

  return (
    <div className="py-2 flex flex-col overflow-auto">
   
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversation.length - 1}
        />
))}

      {Loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
}   

export default Conversations
