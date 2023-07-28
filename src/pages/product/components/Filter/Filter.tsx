import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiFilterAlt } from 'react-icons/bi'
import { RootState } from '../../../../store'
import { filterByCategory } from '../../productWeb.slice'

export default function Filter() {
  const productList = useSelector((state: RootState) => state.product.productList)
  const dispatch = useDispatch()
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterByCategory(e.target.value))
  }
  const categoryList: string[] = Array.from(new Set(productList.map((item) => item.category)))
  return (
    <div className='mt-2'>
      <div className='flex flex-col items-start sm:flex-row sm:items-center '>
        <label htmlFor='filter' className='block ml-2 text-xl sm:hidden font-medium text-gray-900 dark:text-white'>
          Filter
        </label>
        <div className='text-2xl text-gray-700 font-semibold hidden sm:block'>
          <BiFilterAlt />
        </div>
        <select
          onChange={(e) => handleChange(e)}
          id='filter'
          className='bg-gray-50 border capitalize sm:max-w-[250px] sm:ml-2 border-gray-300 text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        >
          <option defaultValue='Choose a category'>Choose a category</option>
          {categoryList.map((item, index) => (
            <option className='capitalize' value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
