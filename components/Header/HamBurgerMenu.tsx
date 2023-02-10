import React from 'react'
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx"

interface IProps {
    isHamBurgerMenuVisible: boolean
    setIsHamBurgerMenuVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const HamBurgerMenu = ({ isHamBurgerMenuVisible, setIsHamBurgerMenuVisible }: IProps) => {
    return (
        <div className={`fixed top-0 left-0 h-full w-[100%] bg-Light flex flex-col items-start justify-between  ${isHamBurgerMenuVisible ? "translate-x-0" : "translate-x-full"} ease-in-out duration-500`}>

            <div className='w-full flex justify-start items-center px-4 py-4'>
                {!isHamBurgerMenuVisible ? (
                    <RxHamburgerMenu className='w-5 h-5 text-brandDarkColor hover:cursor-pointer' onClick={() => setIsHamBurgerMenuVisible(!isHamBurgerMenuVisible)} />
                ) : (
                    <RxCross1 className='w-5 h-5 text-brandDarkColor hover:cursor-pointer' onClick={() => setIsHamBurgerMenuVisible(!isHamBurgerMenuVisible)} />
                )}
            </div>

        </div>
    )
}

export default HamBurgerMenu