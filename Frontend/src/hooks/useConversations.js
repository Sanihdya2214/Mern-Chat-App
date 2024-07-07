import React, { useEffect,useState } from 'react'

const useConversations = () => {
    const [Loading, setLoading] = useState(false);

    const [conversations, setConversations] = useState([]);
    
      useEffect(() => {
          const getConversations = async () => {
               setLoading(true);
              try {
                  const res = await fetch("/api/users") //since it was a get request we do not need to
                                             //pass any more values like we earlier passed

                  const data = await res.json()
                  
                  if (data.error) {
                      throw new Error(data.error)
                  }
                    setConversations(data)

              } catch (error) {
                  toast.error(error.message);
              } finally {
                  setLoading(false)
              }
              
        }
           getConversations();
    }, [])
        return {Loading,conversations}
}

export default useConversations
