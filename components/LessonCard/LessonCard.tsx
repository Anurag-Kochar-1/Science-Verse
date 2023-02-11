import React from 'react'

const LessonCard = ({ lesson }: any) => {
    return (
        <div className='w-full h-28 flex justify-start items-center rounded-md bg-Mid'>
            <h6>{lesson.lessonTitle}</h6>
        </div>
    )
}

export default LessonCard