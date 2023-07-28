import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../../../../store'
import { ProductType } from '../../type/product.type'
import { addToCart } from '../../productWeb.slice'

export default function ProductDetail() {
  const productList = useSelector((state: RootState) => state.product.productList)
  const { id } = useParams()
  const dispatch = useDispatch()
  const [productDetail, setDetail] = useState<ProductType | null>(null)
  useEffect(() => {
    if (id) {
      const product: ProductType | null = productList.find((product) => product.id === parseInt(id)) || null
      setDetail(product)
    }
  }, [id])
  const handleAddToCart = (product: ProductType) => {
    dispatch(addToCart(product))
  }
  return (
    <section className='pt-32 pb-12 lg:py-32 h-screen flex items-center'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row items-center'>
          <div className=' flex flex-1 justify-center items-center mb-8 lg:mb-0'>
            <img src={productDetail?.image} alt={productDetail?.title} className='max-w-[200px] lg:max-w-sm' />
          </div>
          <div className='flex-1 text-center lg:text-left'>
            <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0'>{productDetail?.title}</h1>
            <div className='text-xl text-blue-500 font-medium mb-6'>{productDetail?.price}</div>
            <p className='mb-8'>{productDetail?.description}</p>
            <button
              className='bg-red-500 py-4 px-8 text-white'
              onClick={() => {
                if (productDetail) {
                  handleAddToCart(productDetail)
                }
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
