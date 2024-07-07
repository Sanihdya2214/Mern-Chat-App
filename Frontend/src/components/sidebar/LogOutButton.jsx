import React from 'react'
import {BiLogOut}  from "react-icons/bi"
import useLogout from '../../hooks/useLogout'
const LogOutButton = () => {

    const {Loading,logout}=useLogout()

  return (
    <div className='mt-auto'>
          {!Loading ? (
              <BiLogOut className="w-6 h-6 text-white curor-pointer "
               onClick={logout}    />
          ) : (
                  <span className='loading loading-spinner'></span>
         ) }
    </div>
  )
}
 
export default LogOutButton
