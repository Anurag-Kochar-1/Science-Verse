import { db } from '@/firebaseConfig'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React from 'react'

const Index = ({ lessonData }: any) => {
    const router = useRouter()
    const { lessonID } = router.query
    return (
        <main className='col-span-full lg:col-start-3 lg:col-end-13 flex flex-col items-center justify-start bg-red-300'>
            <iframe
                width={"100%"}
                className='w-full h-screen' id=""
                src={lessonData.lessonMetaverseID}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; microphone; camera; display-capture; xr-spatial-tracking; xr;"
                allowFullScreen
            ></iframe>
        </main>
    )
}

export default Index






export async function getServerSideProps({ params }: any) {
    const { subject, lessonID } = params

    const lessonRef = doc(db, "classes", "10", "subjects", `${subject}`, 'lessons', `${lessonID}`)
    const lessonRes = await getDoc(lessonRef)
    const lessonData = lessonRes.data() || null


    return {
        props: {
            lessonData
        }
    }

}