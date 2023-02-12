import { auth } from '@/firebaseConfig'
import Image from 'next/image'
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
                    router.push(`/subject/${lesson.lessonSubject}_2/lesson/${lesson.lessonID}`)
                } else if (!user) {
                    alert("Sign in first")
                }
            }}
            className='w-full h-28 flex justify-start items-center rounded-md bg-gray-200 p-3 hover:cursor-pointer space-x-3'>

            {lesson.lessonLogo && (
                <Image
                    src={lesson.lessonLogo}
                    alt="lessonLogo"
                    width={100}
                    height={100}
                    className="w-24 h-24"
                />
            )}
            <h6 className='font-nunito_sans text-lg text-Dark font-medium'>{lesson.lessonTitle}</h6>
        </div>
    )
}

export default LessonCard