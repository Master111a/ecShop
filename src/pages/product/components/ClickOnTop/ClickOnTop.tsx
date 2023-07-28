import React from 'react'
import { useEffect, useState } from 'react'
import { AiOutlineArrowUp } from 'react-icons/ai'

export default function ClickOnTop() {
  const [isActive, setIsActive] = useState<boolean>(false)
  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 300 ? setIsActive(true) : setIsActive(false)
    })
  })
  return (
    <div
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }}
      className={`${isActive ? 'fixed ' : 'hidden '} bottom-[40px] right-[30px]  cursor-pointer w-[30px] h-[30px]
        flex justify-center items-center bg-emerald-500 rounded-full text-white`}
    >
      <AiOutlineArrowUp className='text-2xl' />
    </div>
  )
}
