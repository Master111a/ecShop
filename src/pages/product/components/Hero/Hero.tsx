import React from 'react'
import WomanImg from '../../assets/imgs/woman_hero.png'
// import bgHero from '../../assets/imgs/bg_hero.svg'
import { Link } from 'react-router-dom'
export default function Hero() {
  return (
    <section className='bg-pink-200 h-[800px] bg-no-repeat bg-cover bg-center py-24'>
      <div className='container px-6 md:px-0  mx-auto flex justify-around h-full'>
        <div className='flex flex-col justify-center'>
          <div className='font-semibold flex items-center uppercase'>
            <div className='w-10 h-[2px] bg-red-500 mr-3'></div>New Trend
          </div>
          <h1 className='text-[70px] leading-[1.1] font-light mb-4 uppercase'>
            Autumn Sale StyLish <br />
            <span className='font-semibold'>womens</span>
          </h1>
          <Link to={'/'} className='self-start uppercase font-semibold border-b-2 border-black'>
            Discover More
          </Link>
        </div>
        <div className='hidden lg:block'>
          <img src={WomanImg} alt='New trend' />
        </div>
      </div>
    </section>
  )
}
