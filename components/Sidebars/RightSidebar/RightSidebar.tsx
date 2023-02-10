import { auth } from '@/firebaseConfig'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import ProfileCard from './ProfileCard'

const RightSidebar = () => {

  

  return (
    <div className='hidden lg:inline-flex lg:col-start-11 lg:col-end-13 bg-Lightest border-l border-gray-300'>
      <ProfileCard />


    </div>
  )
}

export default RightSidebar