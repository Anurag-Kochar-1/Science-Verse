import { db } from '@/firebaseConfig'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React from 'react'

const Index = ( {lessonData}: any ) => {
    const router = useRouter()
    const { lessonID } = router.query
    return (
        <div>

            <h1 className='text-xl font-nunito_sans'> lesson ID = {lessonID} </h1>
            <p onClick={() => console.log(lessonData)}> log lessonData </p>
        </div>
    )
}

export default Index


export async function getServerSideProps ( {params}: any ) {
    const {subject, lessonID} = params

    const lessonRef = doc(db, "classes", "10" , "subjects", `${subject}`, 'lessons', `${lessonID}`)
    const lessonRes = await getDoc(lessonRef) 
    const lessonData = lessonRes.data() || null


    return {
        props: {
            lessonData
        }
    }

}