"use client"

import { auth } from '@/firebaseConfig'
import { SignInWithGoogleFunction } from '@/utils/SignInWithGoogle'
import { signOut } from 'firebase/auth'
import Image from 'next/image'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const ProfileCard = () => {
    const [user, loading, error] = useAuthState(auth)



    return (
        <div className='w-full h-20 flex justify-center items-center px-3'>
            {!user && (
                <button
                    onClick={SignInWithGoogleFunction}
                    type='button'
                    title='signIn'
                    className='hidden lg:inline-flex outline-none border-none w-28 h-10 bg-Brand text-white font-nunito font-semibold text-base rounded-md justify-center items-center'>
                    Sign in
                </button>
            )}


            {user && (
                <div onClick={() => signOut(auth)} className='flex justify-center items-center space-x-2 hover:cursor-pointer'>
                    <Image src={user?.photoURL as string} alt="pfp" width={50} height={50} className={"w-10 h-10 rounded-full"} />
                    <div className='flex flex-col justify-start items-start space-y-1'>
                        <p className='font-nunito text-base font-semibold'> {user?.displayName} </p>
                        <p className='font-nunito_sans text-sm font-medium'> Class 10th </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileCard