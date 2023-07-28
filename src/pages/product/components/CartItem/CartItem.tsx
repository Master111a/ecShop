import { Link } from 'react-router-dom'
import { GrClose } from 'react-icons/gr'
// import { IoIosRemove } from 'react-icons/io'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { CartType } from '../../type/cart.type'
import { useDispatch } from 'react-redux'
import { addToCart, decreaseAmount, deleteItemCart } from '../../productWeb.slice'
import { ProductType } from '../../type/product.type'
interface CartItemProps {
  item: CartType
  className: string
}
export default function CartItem(props: CartItemProps) {
  const { item, className } = props
  const { product, amount } = item
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
  return (
    <div className={`${className} flex gap-x-4 pt-2 lg:px-4  w-full font-light text-gray-500`}>
      <div className='w-full min-h-[150px] flex items-center gap-x-4'>
        <Link to={`/product/${item.product.id}`}>
          <img src={product.image} alt={product.title} className='rounded max-w-[80px]' />
        </Link>
        <div className='flex w-full flex-col'>
          <div className='flex justify-between mb-2'>
            <Link to={`/product/${item.product.id}`}>
              <h5
                className='text-xl uppercase font-medium max-w-[280px]
             text-gray-800 hover:underline'
              >
                {product.title}
              </h5>
            </Link>
            <div className='cursor-pointer mt-1 rounded overflow-hidden' onClick={() => handleDelete(item.product.id)}>
              <GrClose className='text-xl text-gray-500 hover:text-red-500 transition' />
            </div>
          </div>
          <div className='flex gap-x-2 h-[36px] text-xl'>
            <div className='flex flex-1 h-full max-w-[100px] rounded items-center border text-black font-medium'>
              <div onClick={() => handleDecrease(product.id)} className='flex-1 cursor-pointer'>
                <AiOutlineMinus />
              </div>
              <span className='flex justify-center items-center h-full px-2'>{amount}</span>
              <div
                onClick={() => handleIncrease(product)}
                className=' flex-1 items-center justify-center cursor-pointer flex h-full'
              >
                <AiOutlinePlus />
              </div>
            </div>
            <div className='flex flex-1 justify-around'>$ {product.price}</div>
            <div className='flex flex-1 justify-end products-center text-black font-medium'>
              {`$ ${(product.price * amount).toFixed(2)}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
