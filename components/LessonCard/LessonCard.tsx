import Link from 'next/link'
import React from 'react'

const LessonCard = ({ lesson }: any) => {
    return (
        <Link
            href={`/subject/${lesson.lessonSubject}/lesson/${lesson.lessonID}`}
            className='w-full h-28 flex justify-start items-center rounded-md bg-Mid p-4'>
            <h6>{lesson.lessonTitle}</h6>
        </Link>
    )
}

export default LessonCard