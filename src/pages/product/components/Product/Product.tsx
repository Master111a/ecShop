import { Link } from 'react-router-dom'
import { BsCartPlus, BsEyeFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { ProductType } from '../../type/product.type'
import { addToCart } from '../../productWeb.slice'
interface ProductProps {
  product: ProductType
}
export default function Product(props: ProductProps) {
  const { product } = props
  const dispatch = useDispatch()
  const handleAddToCart = (product: ProductType) => {
    dispatch(addToCart(product))
  }

  return (
    <div>
      <div
        className='border border-gray-300 h-[300px] mb-4 relative 
      overflow-hidden group transition'
      >
        <div className='w-full h-full flex justify-center items-center'>
          <img
            src={product.image}
            alt={product.title}
            className='max-h-[160px] group-hover:scale-110 transition duration-300'
          />
        </div>
        <div
          className='absolute top-3 right-0 group-hover:right-6
          p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 
          group-hover:opacity-100 transition-all duration-600'
        >
          <button onClick={() => handleAddToCart(product)}>
            <div className='flex justify-center items-center bg-yellow-500/80 text-white w-8 h-8'>
              <BsCartPlus className='text-2xl' />
            </div>
          </button>
          <Link
            to={`/product/${product.id}`}
            className='w-8 h-8 bg-white flex
            justify-center items-center text-gray-800 drop-shadow-xl'
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      <div className='flex flex-col'>
        <p className='text-sm capitalize text-gray-500 mb-1'>{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h5 className='text-base font-semibold mb-1'>{product.title.substring(0, 23)} ...</h5>
        </Link>
        <h5 className='text-base font-semibold text-blue-500'>$ {product.price}</h5>
      </div>
    </div>
  )
}
