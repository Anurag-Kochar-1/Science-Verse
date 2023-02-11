import React, { useEffect, useState } from 'react'
import { db } from '@/firebaseConfig'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import Image from 'next/image'
import { useRouter } from 'next/router'
import logoOne from "../../../../../public/images/logos/logoOne.png"
import Link from 'next/link'

// icons
import { IoCloseSharp } from "react-icons/io5"

const Index = ({ lessonData, lessonTestsData, lessonFirstTestQuestionsAndAnswersData }: any) => {
    const router = useRouter()

    const [timer, setTimer] = useState<number>(5)
    const [isTestModalOpen, setIsTestModalOpen] = useState<boolean>(false)
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0);
    const [optionChosen, setOptionChosen] = useState<string>("");
    const [score, setScore] = useState<number>(0)



    const nextQuestion = () => {
        if (lessonFirstTestQuestionsAndAnswersData?.questions[currentQuestionNumber].answer == optionChosen) {
            setScore(score + 1);
            setTimer(5)
        }
        setCurrentQuestionNumber(currentQuestionNumber + 1);
    }


    let timerIntervalFunc: any;
    useEffect(() => {

        timerIntervalFunc =  setInterval(() => {
            if(timer != 1) setTimer( timer - 1)
            if(timer == 1) {
                setCurrentQuestionNumber(currentQuestionNumber + 1)
                setTimer(5)
            }
        }, 1000)

        return () => clearInterval(timerIntervalFunc)

    })

    return (
        <>
            {isTestModalOpen && (
                <div className='fixed w-full h-full bg-black/[.80] flex justify-center items-center'>
                    <div className='z-50 w-[90%] h-[90vh] lg:w-[80%] lg:h-[80vh] bg-Lightest rounded-md flex flex-col items-center justify-start'>
                        {/* --- Taskbar ---  */}
                        <div className='w-full h-16 flex justify-between items-center bg-Brand rounded-tr-md rounded-tl-md px-5'>
                            <span> {null} </span>

                            {/* Timer */}
                            <p className='text-xl text-white font-nunito font-semibold'> Timer : {`${timer} seconds`} </p>


                            <IoCloseSharp size={"1.5rem"} onClick={() => setIsTestModalOpen(false)} className="text-red-500 hover:cursor-pointer" />
                        </div>

                        {/* Questions Container */}
                        <div className='w-full flex flex-col items-center justify-start'>
                            <p>{lessonFirstTestQuestionsAndAnswersData?.questions[currentQuestionNumber]?.prompt} - option - {optionChosen} Score - {score}</p>

                            {/* Options */}
                            <div className='w-full flex flex-col items-center justify-center space-y-3'>
                                {lessonFirstTestQuestionsAndAnswersData?.questions[currentQuestionNumber]?.options?.map((option: any) => {
                                    return (
                                        <button
                                            onClick={() => {
                                                setOptionChosen(option.option)
                                            }}
                                            type='button'
                                            title='option'
                                            key={option.optionValue}
                                            className={`w-[90%] h-12 text-center bg-Mid  focus:border-2 focus:border-Brand`}>
                                            <p> {option.option} - {option.optionValue} </p>
                                        </button>
                                    )
                                })}
                            </div>


                            {/* Buttons */}
                            <div className='w-full flex items-center justify-center space-x-3'>


                                <button
                                    onClick={() => {
                                        nextQuestion()
                                    }}
                                    type='button'
                                    title='next'
                                    className=' outline-none border-none w-28 h-10 bg-Brand text-white font-nunito font-semibold text-base rounded-md'>
                                    Next
                                </button>
                                {/* {currentQuestionNumber == lessonFirstTestQuestionsAndAnswersData?.questions.length - 1 ? (
                                    <button id="nextQuestion">
                                        Finish Quiz
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            nextQuestion()
                                        }}
                                        type='button'
                                        title='next'
                                        className=' outline-none border-none w-28 h-10 bg-Brand text-white font-nunito font-semibold text-base rounded-md'>
                                        Next
                                    </button>
                                )} */}

                            </div>

                        </div>
                    </div>
                </div>
            )}

            <div className='hidden lg:inline-flex col-start-1 col-end-3 bg-Lightest flex-col items-center justify-start py-10 space-y-10 border-r border-gray-600'>
                <Link href={`/`}>
                    <Image
                        src={logoOne}
                        alt="logo"
                        width={100}
                        height={100}
                        className="w-20 h-20 rounded-full"
                    />
                </Link>

                <button
                    onClick={() => {
                        console.log(lessonFirstTestQuestionsAndAnswersData)
                        setIsTestModalOpen(true)
                    }}
                    type='button'
                    className='outline-none border-none w-28 h-10 bg-Brand text-white font-nunito font-medium text-base rounded-md'
                > Start Test </button>
            </div>

            <main className='col-span-full lg:col-start-3 lg:col-end-13 flex flex-col items-center justify-start bg-red-300'>
                {/* <h1 onClick={() => {
                console.log(lessonTestsData)
                }}> LOG lessonTestsData </h1> */}
                <iframe
                    width={"100%"}
                    className='w-full h-screen' id=""
                    src={lessonData.lessonMetaverseID}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; microphone; camera; display-capture; xr-spatial-tracking; xr;"
                    allowFullScreen
                ></iframe>
            </main>
        </>

    )
}

export default Index






export async function getServerSideProps({ params }: any) {
    const { subject, lessonID } = params

    const lessonRef = doc(db, "classes", "10", "subjects", `${subject}`, 'lessons', `${lessonID}`)
    const lessonRes = await getDoc(lessonRef)
    const lessonData = lessonRes.data() || null


    const lessonTestsCollectionRef = collection(db, "classes", "10", "subjects", `${subject}`, 'lessons', `${lessonID}`, "tests")
    const lessonTestsRes = await getDocs(lessonTestsCollectionRef)
    const lessonTestsData = lessonTestsRes?.docs?.map(doc => doc.data())

    const lessonFirstTestQuestionsAndAnswersRef = doc(db, "classes", "10", "subjects", `${subject}`, 'lessons', `${lessonID}`, "tests", `${lessonTestsData[0]?.testID}`)
    const lessonFirstTestQuestionsAndAnswersRes = await getDoc(lessonFirstTestQuestionsAndAnswersRef)
    const lessonFirstTestQuestionsAndAnswersData = lessonFirstTestQuestionsAndAnswersRes?.data() || null

    return {
        props: {
            lessonData,
            lessonTestsData,
            lessonFirstTestQuestionsAndAnswersData
        }
    }

}