import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../../../store'
import { BsTrash } from 'react-icons/bs'
import React, { useState } from 'react'
import { clearCart } from '../../productWeb.slice'
interface InforType {
  name: string
  phone: string
  email: string
  payment: string
}
const initialInfor: InforType = {
  name: '',
  phone: '',
  email: '',
  payment: ''
}
export default function Checkout() {
  const cartList = useSelector((state: RootState) => state.product.cartList)
  const totalPrices = useSelector((state: RootState) => state.product.totalPrice)
  const dispatch = useDispatch()

  const [shipCost, setShipCost] = useState<number>(0)
  const [infor, setInfor] = useState<InforType>(initialInfor)
  const [err, setErr] = useState<InforType>(initialInfor)
  const handleClearCart = () => {
    dispatch(clearCart())
  }
  const handleCheckout = (infor: InforType) => {
    infor.name === ''
      ? setErr((prev) => ({ ...prev, name: 'Please enter your name' }))
      : setErr((prev) => ({ ...prev, name: '' }))
    infor.phone === ''
      ? setErr((prev) => ({ ...prev, phone: 'Please enter your phone number' }))
      : setErr((prev) => ({ ...prev, phone: '' }))
    infor.email === ''
      ? setErr((prev) => ({ ...prev, email: 'Please enter your email' }))
      : setErr((prev) => ({ ...prev, email: '' }))
    infor.payment === ''
      ? setErr((prev) => ({ ...prev, payment: 'Please enter your payment' }))
      : setErr((prev) => ({ ...prev, payment: '' }))
    if (infor.name !== '' && infor.name !== '' && infor.name !== '' && infor.payment !== '') {
      setTimeout(() => {
        alert('Ban da thanh toan thanh cong')
        setShipCost(0)
        setInfor(initialInfor)
        dispatch(clearCart())
      }, 2000)
    }
  }

  return (
    <main className='pt-[66px] pb-12 flex min-h-[800px] '>
      <div className='container mx-auto'>
        <div className='flex flex-col md:flex-row shadow-md my-10'>
          <div className='w-full md:w-3/4 bg-white pb-4 px-10'>
            <div className='flex justify-between border-b pb-8'>
              <h2 className='font-semibold text-2xl'>Your information</h2>{' '}
            </div>
            <form className='flex flex-col gap-y-6 mt-10 mb-5'>
              <div className='flex flex-col'>
                <label htmlFor='' className='font-semibold text-gray-600 text-xs uppercase w-2/5'>
                  Name
                </label>
                <input
                  type='text'
                  placeholder='Your name'
                  value={infor.name}
                  onChange={(e) => setInfor((prev) => ({ ...prev, name: e.target.value }))}
                  className='px-2 py-[5px] w-f  outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required
                />
                <p className='font-semibold text-red-500 text-xs'>{err.name}</p>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='' className='font-semibold text-gray-600 text-xs uppercase w-2/5'>
                  Phone number
                </label>
                <input
                  type='tel'
                  value={infor.phone}
                  placeholder='Your Phone number'
                  onChange={(e) => setInfor((prev) => ({ ...prev, phone: e.target.value }))}
                  className='px-2 py-[5px] w-f outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required
                />
                <p className='font-semibold text-red-500 text-xs'>{err.phone}</p>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='' className='font-semibold text-gray-600 text-xs uppercase w-2/5'>
                  Email
                </label>
                <input
                  type='email'
                  value={infor.email}
                  onChange={(e) => setInfor((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder='Your Email'
                  className=' px-2 py-[5px] w-f outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required
                />
                <p className='font-semibold text-red-500 text-xs'>{err.email}</p>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='' className='font-semibold text-gray-600 text-xs uppercase w-2/5'>
                  Payment method
                </label>
                <select
                  className='block p-2 border rounded outline-none text-gray-600 w-full text-sm'
                  value={infor.payment}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setInfor((prev) => ({ ...prev, payment: e.target.value }))
                  }
                >
                  <option value={'0'}>Select Payment method</option>
                  <option value={'Standard Payment'}>Standard Payment</option>
                  <option value={'Online Payment'}>Online Payment </option>
                </select>
                <p className='font-semibold text-red-500 text-xs'>{err.payment}</p>
              </div>
            </form>
            <Link to={'/'} className='flex font-semibold text-indigo-600 text-sm mt-10'>
              <svg className='fill-current mr-2 text-indigo-600 w-4' viewBox='0 0 448 512'>
                <path d='M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z' />
              </svg>
              Continue Shopping
            </Link>
          </div>

          <div id='summary' className='w-full md:w-1/4 px-8 pb-4'>
            <h1 className='font-semibold text-2xl border-b pb-8'>Order Summary</h1>
            <div className='flex justify-between mt-10 mb-5'>
              <span className='font-semibold text-sm uppercase'>Items {cartList?.length}</span>
              <span className='font-semibold text-sm'>{totalPrices.toFixed(2)}$</span>
            </div>
            <div>
              <label className='font-medium inline-block mb-3 text-sm uppercase'>Shipping</label>
              <select
                className='block p-2  border rounded outline-none text-gray-600 w-full text-sm'
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setShipCost(parseFloat(e.target.value))}
              >
                <option value={'0'}>Select your shipping</option>
                <option value={'10.00'}>Standard shipping - $10.00</option>
                <option value={'15.00'}>Fast shipping - $15.00</option>
              </select>
            </div>
            <div className='py-4'>
              <label htmlFor='promo' className='font-semibold inline-block mb-3 text-sm uppercase'>
                Coupons
              </label>
              <input type='text' id='promo' placeholder='Enter your code' className='p-2 text-sm w-full' />
            </div>
            <div className='border-t'>
              <div className='flex items-center font-semibold justify-between py-6 text-sm uppercase'>
                <span>Total cost: ${(totalPrices + shipCost).toFixed(2)}</span>
                <div
                  onClick={() => handleClearCart()}
                  className='cursor-pointer rounded py-4 bg-red-500 text-white w-8 h-8 flex items-center justify-center text-xl'
                >
                  <BsTrash />
                </div>
              </div>
              <button
                onClick={() => handleCheckout(infor)}
                className='bg-indigo-500 font-semibold rounded hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full'
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
