import React from 'react'
import { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5"
import useConverstaion from '../../zustand/useConversation';
import useConversations from '../../hooks/useConversations';
import toast from 'react-hot-toast';
const SearchInput = () => {
  const [Search, setSearch] = useState("");
  const{setSelectedConversation}= useConverstaion()  
   const{conversations}=useConversations()

  const handleSubmit = (e) => {
       e.preventDefault()
    if (!Search) return 
    if (Search.length < 3) {
      return toast.error("Search term must be atleast 3 characters long")
    }
   const conversation=conversations.find((c)=> c.fullName.toLowerCase().includes(Search.toLowerCase()))
    //This part basically find the user that we are looking from our database conerting the
    //conversation to lowecase and the search part to lowercase too
    if (conversation) {
         setSelectedConversation(conversation);
          setSearch("")
    } else {
      toast.error("No such User found")
      }
}
       
       
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        value={Search}
        onChange={(e)=>setSearch(e.target.value)}
        placeholder="Search..."
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
         <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
}

export default SearchInput
