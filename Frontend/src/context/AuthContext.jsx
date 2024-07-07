import React, { useContext, createContext,useState } from 'react'

export const AuthContext = createContext()

export const useAuthContext = () =>{
    return useContext(AuthContext)
}


export const AuthContextProvider = ({ children }) => {        //This JSON.parse is done so that the data coming in localstorage becomes an object
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
    return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>

}


