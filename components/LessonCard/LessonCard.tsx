import { auth } from '@/firebaseConfig'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'


const LessonCard = ({ lesson }: any) => {
    const [user] = useAuthState(auth)
    const router = useRouter()

    return (
        <div
            onClick={() => {
                if (user) {
                    router.push(`/subject/${lesson.lessonSubject}/lesson/${lesson.lessonID}`)
                } else if (!user) {
                    alert("Sign in first")
                }
            }}
            className='w-full h-28 flex justify-start items-center rounded-md bg-Mid p-4 hover:cursor-pointer'>
            <h6>{lesson.lessonTitle}</h6>
        </div>
    )
}

export default LessonCard