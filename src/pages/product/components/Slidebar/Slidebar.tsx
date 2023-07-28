import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { clearCart, setSlideBar, setTotalAmount, setTotalPrice } from '../../productWeb.slice'
import { BsArrowBarRight } from 'react-icons/bs'
import CartItem from '../CartItem'
import { BsTrash } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
export default function Slidebar() {
  const isShow = useSelector((state: RootState) => state.product.isOpen)
  const cartList = useSelector((state: RootState) => state.product.cartList)
  const [amountItem, setAmountItem] = useState<number>(0)
  const [totalPrices, setTotalPrices] = useState<number>(0)
  const dispatch = useDispatch()
  const handleShow = () => {
    dispatch(setSlideBar())
  }
  const handleClearCart = () => {
    dispatch(clearCart())
  }
  useEffect(() => {
    if (cartList) {
      const amount: number = cartList.reduce((totalAmount, item) => {
        return totalAmount + item.amount
      }, 0)
      const price: number = cartList.reduce((total, item) => {
        return total + item.amount * item.product.price
      }, 0)

      setAmountItem(amount)
      setTotalPrices(price)
    }
  }, [cartList])
  dispatch(setTotalAmount(amountItem))
  dispatch(setTotalPrice(totalPrices))

  return (
    <div
      className={`${isShow ? 'right-0' : '-right-full'} 
  w-full h-full md:w-[56vw] md:min-w-[470px] md:max-w-[500px] xl:max-w-[30vw] bg-white fixed top-0 shadow-2xl
  transition-all duration-300 z-20 px-4 lg:px-[35px] max-h-screen
  `}
    >
      <div className='flex items-center justify-between border-b py-6'>
        <h3 className='uppercase text-sm font-semibold'>Shopping Cart ({amountItem})</h3>
        <div className='cursor-pointer text-2xl flex justify-center items-center w-8 h-8' onClick={() => handleShow()}>
          <BsArrowBarRight />
        </div>
      </div>
      <div className='overflow-auto max-h-[65%]'>
        {cartList.map((item, index) => (
          <CartItem item={item} key={index} className={'border-b last:border-b-0'} />
        ))}
      </div>
      <div className={`absolute bottom-0 w-full pr-8 lg:pr-[70px] py-4 border-t border-gray-200 bg-white`}>
        <div className='flex flex-col gap-y-3 '>
          <div className='flex w-full justify-between items-center'>
            <div className='uppercase font-semibold'>
              <span className='mr-2'>Total:</span>$ {totalPrices.toFixed(2)}
            </div>
            <div
              onClick={() => handleClearCart()}
              className='cursor-pointer rounded py-4 bg-red-500 text-white w-10 h-10 flex items-center justify-center text-xl'
            >
              <BsTrash />
            </div>
          </div>
          <Link
            to={'/cart'}
            className='bg-gray-200 rounded flex py-4 justify-center items-center text-black w-full font-medium'
          >
            View Cart
          </Link>
          <Link
            to={'/checkout'}
            className='bg-gray-800 rounded flex py-4 justify-center items-center text-white w-full font-medium'
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}
