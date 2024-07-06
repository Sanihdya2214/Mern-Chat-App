import Conversation from "../models/conversation.model.js"
import Message from "../models/messages.model.js"



export const sendMessage = async (req, res) => {

    try {
        
        //here this is id is from the route where we wriiten "/send/:id"
        const { message } = req.body
        const { id: recieverId } = req.params
         const  senderId  = req.user._id
    
        let conversation = await Conversation.findOne({
        
            participants: { $all: [senderId, recieverId] }
        })
    
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieverId]

            })
        }

        const newMessage = new Message({
          senderId,
          recieverId,
          message,
        });
    
        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        {/* await conversation.save()*/ }
        //  await newMessage.save()

        await Promise.all([conversation.save(), newMessage.save()]);

       res.status(201).json(newMessage) 

    } catch (error) {
        console.log("Error in sendMessage Contollers", error.message);
         res.status(500).json({ error: "Internal Server Error" });
    }

}

export const getMessage = async (req, res) => {
    
               try { 
                   const { id: userToChatId } = req.params
                   const senderId=req.user._id
                  
                   const conversation = await Conversation.findOne({
                       participants: { $all:[senderId,userToChatId]}
                   }).populate("messages") //this will not give the reference id it will give all the messages 
                                        //as an object.   
                    
                   if (!conversation) {
                       return res.status(200).json([])
                       
              }
                   const messages = conversation.messages
                   
                   res.status(200).json(messages)

               } catch (error) {
                 console.log("Error in getMessage Contollers", error.message);
                 res.status(500).json({ error: "Internal Server Error" });
               }




}