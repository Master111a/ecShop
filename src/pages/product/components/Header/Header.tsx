import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSlideBar } from '../../productWeb.slice'
import { BsCart } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Logo from '../../assets/imgs/pngegg.png'
import { RootState } from '../../../../store'
export default function Header() {
  const dispatch = useDispatch()
  const amountItem = useSelector((state: RootState) => state.product.amountItem)
  const [isActive, setIsActive] = useState<boolean>(false)
  const handleShow = () => {
    dispatch(setSlideBar())
  }
  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false)
    })
    return () =>
      window.removeEventListener('scroll', () => {
        setIsActive(false)
      })
  })

  return (
    <header className={`${isActive ? 'py-4  bg-white shadow-md ' : 'py-5 border-b'} fixed w-full z-10 transition-all`}>
      <div className='container px-6 md:px-0 md:mx-auto  flex items-center justify-between h-full'>
        <Link to={'/'} className='cursor-pointer'>
          <div className='max-h-[24px] max-w-[8%] min-w-[50px]'>
            <img src={Logo} alt='Logo' className='w-full h-full' />
          </div>
        </Link>
        <div className='cursor-pointer flex relative ml-auto ' onClick={() => handleShow()}>
          <BsCart className='text-2xl' />
          <div
            className='absolute bg-red-500 -right-1 -bottom-1 text-[12px] w-[16px] h-[16px] rounded-full 
        text-white flex justify-center items-center'
          >
            {amountItem}
          </div>
        </div>
      </div>
    </header>
  )
}
