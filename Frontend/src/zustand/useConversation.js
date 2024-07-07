import { create } from "zustand"

const useConverstaion = create((set) => ({
    
    //This function is used to get a global state for all messages and coversations
    //Its just like the context api in the react to create global values so that can be used in
    //any component and we do not have to do prop drilling

    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }), 
    messages: [],
    setMessages:(messages)=>set({messages}),



}))

export default useConverstaion