import React from 'react'
import Image from 'next/image'
import logoOne from "../../../public/images/logos/logoOne.png"
import Link from 'next/link'

// Icons Import
import { BsPerson } from "react-icons/bs"
import { MdOutlineLeaderboard, MdSubject } from "react-icons/md"
import { CgPerformance } from "react-icons/cg"
import {IoSettingsOutline} from "react-icons/io5"
import {IoMdNotificationsOutline} from "react-icons/io"

const navLinks = [
    {
        id: 0,
        name: "Subjects",
        icon: <MdSubject size={"1.5rem"} className="text-gray-600" />,
        link: "/"
    },
    {
        id: 1,
        name: "Leaderboard",
        icon: <MdOutlineLeaderboard size={"1.5rem"} className="text-gray-600" />,
        link: "/leaderboard"
    },
    {
        id: 2,
        name: "Performance",
        icon: <CgPerformance size={"1.5rem"} className="text-gray-600" />,
        link: "/performance"
    },
    {
        id: 3,
        name: "Profile",
        icon: <BsPerson size={"1.5rem"} className="text-gray-600" />,
        link: "/profile"
    },
    {
        id: 4,
        name: "Notifications",
        icon: <IoMdNotificationsOutline size={"1.5rem"} className="text-gray-600" />,
        link: "/"
        
    }

]


const LeftSidebar = () => {

    return (
        <div className='hidden lg:inline-flex col-start-1 col-end-3 bg-Lightest flex-col items-center justify-between py-10 space-y-10 border-r border-gray-300'>
            {/* LOGO */}
            <Link href={`/`}>
                <Image
                    src={logoOne}
                    alt="logo"
                    width={100}
                    height={100}
                    className="w-20 h-20 rounded-full"
                />
            </Link>

            {/* Nav links Container */}
            <div className='w-full flex flex-col items-center justify-start space-y-20'>
                {navLinks?.map((item) => {
                    return (
                        <Link
                            key={item.id}
                            href={item.link}
                            className='w-full flex justify-start items-center space-x-3 px-5 py-1 hover:cursor-pointer'>
                            {item.icon}
                            <h6 className='text-base text-gray-600 font-nunito font-medium'> {item.name} </h6>
                        </Link>
                    )
                })}
            </div>


            {/* Settings icon */}
            <div
                className='w-full flex justify-start items-center space-x-3 px-5 py-1 hover:cursor-pointer'>
                <IoSettingsOutline size={"1.5rem"} className="text-gray-600" />
                <h6 className='text-base text-gray-600 font-nunito font-medium'> Settings </h6>
            </div>

        </div>
    )
}

export default LeftSidebar