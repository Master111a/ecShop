import { Link } from 'react-router-dom'
import { BsTrash } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { addToCart, clearCart, decreaseAmount, deleteItemCart } from '../../productWeb.slice'
import { ProductType } from '../../type/product.type'

export default function Cart() {
  const cartList = useSelector((state: RootState) => state.product.cartList)
  const totalPrices = useSelector((state: RootState) => state.product.totalPrice)

  const dispatch = useDispatch()
  const handleDecrease = (item: number | string) => {
    dispatch(decreaseAmount(item))
  }
  const handleIncrease = (item: ProductType) => {
    dispatch(addToCart(item))
  }
  const handleDelete = (item: number | string) => {
    dispatch(deleteItemCart(item))
  }
  const handleClearCart = () => {
    dispatch(clearCart())
  }
  return (
    <main className='pt-[66px] pb-12 flex min-h-[800px] '>
      <div className='container mx-auto'>
        <div className='flex flex-col md:flex-row shadow-md my-10'>
          <div className='w-full md:w-3/4 bg-white pb-6 px-10'>
            <div className='flex justify-between border-b pb-8'>
              <h1 className='font-semibold text-2xl'>Shopping Cart</h1>
              <h2 className='font-semibold text-2xl'>{cartList.length} Items</h2>
            </div>
            <div className='flex mt-10 mb-5'>
              <h3 className='font-semibold text-gray-600 text-xs uppercase w-2/5'>Product Details</h3>
              <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/5'>Quantity</h3>
              <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/5'>Price</h3>
              <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/5'>Total</h3>
            </div>
            {cartList.map((cart) => {
              return (
                <div className='flex items-center hover:bg-gray-100 -mx-8 px-6 py-5'>
                  <div className='flex w-2/5'>
                    <div className='w-20'>
                      <img className='h-24' src={cart.product.image} alt={cart.product.title} />
                    </div>
                    <div className='flex flex-col justify-between ml-4 flex-grow'>
                      <span className='font-bold text-sm'>{cart.product.title}</span>
                      <span className='text-red-500 text-xs capitalize'>{cart.product.category}</span>
                      <div
                        className='font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer'
                        onClick={() => handleDelete(cart.product.id)}
                      >
                        Remove
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-center w-1/5'>
                    <svg
                      className='fill-current text-gray-600 w-3 cursor-pointer'
                      viewBox='0 0 448 512'
                      onClick={() => handleDecrease(cart.product.id)}
                    >
                      <path d='M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
                    </svg>

                    <input className='mx-2 border text-center outline-none w-8' type='text' value={cart.amount} />

                    <svg
                      className='fill-current text-gray-600 w-3 cursor-pointer'
                      onClick={() => handleIncrease(cart.product)}
                      viewBox='0 0 448 512'
                    >
                      <path d='M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
                    </svg>
                  </div>
                  <span className='text-center w-1/5 font-semibold text-sm'>${cart.product.price}</span>
                  <span className='text-center w-1/5 font-semibold text-sm'>${cart.product.price * cart.amount}</span>
                </div>
              )
            })}

            <Link to={'/'} className='flex font-semibold text-indigo-600 text-sm mt-10'>
              <svg className='fill-current mr-2 text-indigo-600 w-4' viewBox='0 0 448 512'>
                <path d='M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z' />
              </svg>
              Continue Shopping
            </Link>
          </div>

          <div id='summary' className='w-full md:w-1/4 pb-6 px-8'>
            <h1 className='font-semibold text-2xl border-b pb-8'>Order Summary</h1>
            <div className='flex justify-between mt-10 mb-5'>
              <span className='font-semibold text-sm uppercase'>Items: {cartList?.length}</span>
              <span className='font-semibold text-sm'>{totalPrices.toFixed(2)}$</span>
            </div>
            <div className='border-t mt-8'>
              <div className='flex items-center font-semibold justify-between py-6 text-sm uppercase'>
                <span>Total cost: ${totalPrices.toFixed(2)}</span>
                <div
                  onClick={() => handleClearCart()}
                  className='cursor-pointer rounded py-4 bg-red-500 text-white w-8 h-8 flex items-center justify-center text-xl'
                >
                  <BsTrash />
                </div>
              </div>
              <Link to={'/checkout'}>
                <button className='bg-indigo-500 font-semibold rounded hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full'>
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
