import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Header from '@/components/Header/Header'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebaseConfig'
import Link from 'next/link'
import { useState } from 'react'
import LessonCard from '@/components/LessonCard/LessonCard'

const subjectsArray = [
  {
    id: 0,
    subjectName: "Physics",
    subjectLogo: "w",
    subjectCoverImage: "w",
    ref: "physics"
  },
  {
    id: 1,
    subjectName: "Chemistry",
    subjectLogo: "w",
    subjectCoverImage: "w",
    ref: "chemistry"
  },
  {
    id: 2,
    subjectName: "Biology",
    subjectLogo: "w",
    subjectCoverImage: "w",
    ref: "biology"
  },
]


export default function Home({ physicsData, chemistryData, biologyData }: any) {

  const [selectedSubject, setSelectedSubject] = useState<string>("physics")
  // const [selectedSubjectLessonsData, setSelectedSubjectLessonsData] = useState<any[]>(physicsData)




  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='bg-Lightest col-span-full lg:col-start-3 lg:col-end-13 flex flex-col items-center justify-start px-10'>
        <Header />

        {/* Subjects */}
        <div className='w-full flex flex-col justify-start items-start my-10'>

          <h6 className='text-4xl text-Dark font-nunito font-bold'> Subjects</h6>

          <div className='w-full flex flex-wrap justify-start items-center my-5'>
            {subjectsArray?.map((subject) => {
              return (
                <div
                  onClick={() => {
                    setSelectedSubject(subject.ref)
                  }}
                  key={subject.id}
                  className={`w-32 h-32 md:w-52 md:h-52 rounded-lg bg-Light flex justify-end items-end p-5 hover:cursor-pointer m-2 ${selectedSubject === subject.ref && "border-4 border-Brand"}`}>
                  <h5 className='text-lg md:text-3xl text-Brand font-nunito font-semibold'> {subject.subjectName} </h5>
                </div>
              )
            })}
          </div>
        </div>

        {/* Lessons Container */}
        <div className='w-full flex flex-col justify-start items-start my-10'>

          <h6 className='text-4xl text-Dark font-nunito font-bold' onClick={() => {
            console.log(physicsData)
            console.log(chemistryData)
            console.log(biologyData)
          }}> Lesson - {selectedSubject}

          </h6>

          <div className='w-full flex justify-start items-center my-5 space-x-5'>

            {selectedSubject === "physics" && (
              <div className='w-full flex flex-col items-center justify-start space-y-3'>
                {physicsData?.map((lesson: any) => {
                  return <LessonCard key={lesson.lessonID} lesson={lesson} />
                })}
              </div>
            )}

            {selectedSubject === "chemistry" && (
              <div className='w-full flex flex-col items-center justify-start space-y-3'>
                {chemistryData?.map((lesson: any) => {
                  return <LessonCard key={lesson.lessonID} lesson={lesson} />
                })}
              </div>
            )}

            {selectedSubject === "biology" && (
              <div className='w-full flex flex-col items-center justify-start space-y-3'>
                {biologyData?.map((lesson: any) => {
                  return <LessonCard key={lesson.lessonID} lesson={lesson} />
                })}
              </div>
            )}




          </div>
        </div>

      </main>
    </>
  )
}


export async function getServerSideProps() {

  // Getting Physics lessons -> class 10th
  const physicsLessonsCollectionRef = collection(db, `classes/10/subjects/physics/lessons`)
  const physicsRes = await getDocs(physicsLessonsCollectionRef)
  const physicsData = physicsRes?.docs?.map(doc => doc.data())

  // Getting Chemistry lessons -> class 10th
  const chemistryLessonsCollectionRef = collection(db, `classes/10/subjects/chemistry/lessons`)
  const chemistryRes = await getDocs(chemistryLessonsCollectionRef)
  const chemistryData = chemistryRes?.docs?.map(doc => doc.data())


  // Getting Biology lessons -> class 10th
  const biologyLessonsCollectionRef = collection(db, `classes/10/subjects/biology/lessons`)
  const biologyRes = await getDocs(biologyLessonsCollectionRef)
  const biologyData = biologyRes?.docs?.map(doc => doc.data())



  return {
    props: { physicsData, chemistryData, biologyData }
  }
}