import React, { useEffect, useState } from 'react'
import { auth, db } from '@/firebaseConfig'
import { arrayUnion, collection, doc, getDoc, getDocs, increment, updateDoc } from 'firebase/firestore'
import Image from 'next/image'
import { useRouter } from 'next/router'
import logoOne from "../../../../../public/images/logos/logoOne.png"
import Link from 'next/link'

// icons
import { IoCloseSharp } from "react-icons/io5"
import { useAuthState } from 'react-firebase-hooks/auth'
import { toast } from 'react-toastify'

const Index = ({ lessonData, lessonTestsData, lessonFirstTestQuestionsAndAnswersData }: any) => {
    const [user, loading, error] = useAuthState(auth)
    const router = useRouter()


    const [timer, setTimer] = useState<number>(100)
    const [isTestModalOpen, setIsTestModalOpen] = useState<boolean>(false)
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0);
    const [optionChosen, setOptionChosen] = useState<string>("");
    const [score, setScore] = useState<number>(0)
    const [isTestCompleted, setIsTestCompleted] = useState<boolean>(false)


    const nextQuestion = () => {
        if (lessonFirstTestQuestionsAndAnswersData?.questions[currentQuestionNumber].answer == optionChosen) {
            setScore(score + 1);
            setTimer(5)
            setCurrentQuestionNumber(currentQuestionNumber + 1);
            setOptionChosen("")
        }

        setCurrentQuestionNumber(currentQuestionNumber + 1);
        setOptionChosen("")



    }
    const finishTest = async () => {
        if (lessonFirstTestQuestionsAndAnswersData?.questions[currentQuestionNumber].answer == optionChosen) {
            setScore(score + 1);
            setTimer(0)
        }

        setIsTestModalOpen(false)
        setTimer(0)
        setIsTestCompleted(true)



        // updating user and Sending Coins to user
        const userRef = doc(db, "users", auth?.currentUser?.uid as string)
        await updateDoc(userRef, {
            userCoins: increment(score * 50)
        })

        const notify = () => toast.success(`${score * 50} Coins Credited`, {
            position: "bottom-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        notify()

    }


    let timerIntervalFunc: any;
    useEffect(() => {

        timerIntervalFunc = setInterval(() => {
            if (isTestModalOpen && timer != 0) setTimer(timer - 1)
            if (isTestModalOpen && timer == 0) {
                if (currentQuestionNumber != lessonFirstTestQuestionsAndAnswersData?.questions.length - 1) {
                    setCurrentQuestionNumber(currentQuestionNumber + 1)
                    setTimer(5)
                }
            }
        }, 1000)

        return () => clearInterval(timerIntervalFunc)

    })

    useEffect(() => {
        if (!user && !loading) {
            router.push("/")
        }
    }, [loading])

    return (
        <>


            {isTestModalOpen && (
                <div className='z-20 fixed w-full h-full bg-black/[.80] flex justify-center items-center'>
                    <div className='z-50 w-[90%] h-[90vh] lg:w-[80%] lg:h-[80vh] bg-Lightest rounded-md flex flex-col items-center justify-start'>
                        {/* --- Taskbar ---  */}
                        <div className='w-full h-16 flex justify-between items-center bg-Brand rounded-tr-md rounded-tl-md px-5'>
                            <span> {null} </span>
                            {/* Timer */}
                            <p className='text-xl text-white font-nunito font-semibold'> Timer : {`${timer} seconds`} </p>
                            <IoCloseSharp size={"1.5rem"} onClick={() => setIsTestModalOpen(false)} className="text-red-500 hover:cursor-pointer" />
                        </div>

                        {/* Container */}
                        <div className='w-full h-full flex flex-col items-center justify-between py-10'>
                            {/* Question and Options container */}
                            <div className='w-full flex flex-col justify-between items-center'>
                                <p className='text-Dark text-4xl font-nunito font-semibold text-center px-5'>  Question {currentQuestionNumber + 1} : {lessonFirstTestQuestionsAndAnswersData?.questions[currentQuestionNumber]?.prompt} </p>
                                {/*- option - {optionChosen} Score - {score} */}

                                {/* Options */}
                                <div className='w-full flex flex-col items-center justify-center space-y-3 my-10'>
                                    {lessonFirstTestQuestionsAndAnswersData?.questions[currentQuestionNumber]?.options?.map((option: any) => {
                                        return (
                                            <button
                                                onClick={() => {
                                                    setOptionChosen(option.option)
                                                }}
                                                type='button'
                                                title='option'
                                                key={option.optionValue}
                                                className={`w-[90%] h-12 text-center bg-gray-200 ${optionChosen == option.option && "border-4 border-Brand"} rounded-md`}>
                                                <span className='text-base text-black font-nunito_sans font-medium'> {option.option} - {option.optionValue} </span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>


                            {/* Buttons */}
                            <div className='w-full flex items-center justify-center space-x-3'>
                                {currentQuestionNumber == lessonFirstTestQuestionsAndAnswersData?.questions.length - 1 ? (
                                    <button
                                        onClick={finishTest}
                                        type='button'
                                        title='submitBtn'
                                        className=' outline-none border-none w-28 h-10 bg-Brand text-white font-nunito font-semibold text-base rounded-md'>
                                        Submit
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
                                )}

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
                        className="w-20 h-20"
                    />
                </Link>

                {!isTestCompleted && (
                    <button
                        onClick={() => {
                            console.log(lessonFirstTestQuestionsAndAnswersData)
                            setIsTestModalOpen(true)
                        }}
                        type='button'
                        className='outline-none border-none w-28 h-10 bg-Brand text-white font-nunito font-medium text-base rounded-md'
                    > Start Test </button>
                )}

                {/* Results */}
                {isTestCompleted && (
                    <div className='w-[95%] py-20 flex flex-col items-center justify-start p-3 space-y-2 my-5 border-2 border-Brand rounded-lg'>
                        <p className='font-nunito font-medium'> Results: </p>
                        <p className='text-3xl font-nunito text-Brand font-bold'> Marks : {score} </p>
                        <p className='text-xl font-nunito text-Darkest font-bold'> {score * 50} Coins Earned !!!! </p>

                        <button
                            onClick={() => router.push(`/`)}
                            type='button'
                            title='goToHome'
                            className='outline-none border-none w-32 h-10 bg-Brand text-white font-nunito font-medium text-base rounded-md'
                        > Go to Home </button>
                    </div>
                )}


                {/* Lesson Deatils */}
                <div className='w-full flex flex-col items-start justify-start p-3 space-y-2 my-5'>
                    <p className='text-Dark text-xl font-nunito_sans font-semibold'> Lesson Details: </p>
                    <p className='text-Dark text-base font-nunito_sans font-medium'>{lessonData?.lessonDescription}</p>
                </div>




            </div>


            <main className='col-span-full relative lg:col-start-3 lg:col-end-13 flex flex-col items-center justify-start bg-Brand'>
                {lessonData.lessonType === "3dModel" && <div className='absolute w-full col-span-full lg:col-start-3 lg:col-end-13 h-14 bg-Brand top-0 flex justify-start items-center px-5'>    </div>}



                {lessonData.lessonType === "metaverse" && (
                    <iframe
                        width={"100%"}
                        className='w-full h-screen' id=""
                        src={process.env.NEXT_PUBLIC_BIOLOGY_ORAGNS_METAVERSE_ID}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; microphone; camera; display-capture; xr-spatial-tracking; xr;"
                        allowFullScreen
                    ></iframe>
                )}



                {lessonData.lessonType === "3dModel" && (
                    <iframe
                        width={"100%"}
                        className='w-full h-screen' id=""
                        src={process.env.NEXT_PUBLIC_BIOLOGY_ORAGNS_METAVERSE_ID}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; microphone; camera; display-capture; xr-spatial-tracking; xr;"
                        allowFullScreen
                    ></iframe>
                )}


                {/* <iframe width=820 height=460 id="iframe" src="" allow="autoplay; fullscreen"></iframe> */}




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