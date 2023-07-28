import { useSelector } from 'react-redux'
import Product from '../Product'
import { RootState, useAppDispatch } from '../../../../store'
import { useEffect } from 'react'
import { changeCurrentPage, getProductList, nextPage, prevPage } from '../../productWeb.slice'
import Pagination from '../Pagination'
import { ProductType } from '../../type/product.type'
export default function ProductList() {
  const filterList = useSelector((state: RootState) => state.product.filterList)
  const textSearch = useSelector((state: RootState) => state.product.textSearch)
  const currentPage = useSelector((state: RootState) => state.product.currentPage)
  const perPage = useSelector((state: RootState) => state.product.perPage)

  const totalPage: number = Math.ceil(
    filterList.filter((product) => product.title.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase())).length /
      perPage
  )
  const lastIndex: number = currentPage * perPage
  const firstIndex: number = lastIndex - perPage
  const viewList: ProductType[] = filterList.slice(firstIndex, lastIndex)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const promise = dispatch(getProductList())
    return () => {
      promise.abort()
    }
  }, [dispatch])

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      dispatch(nextPage())
    }
  }
  const handlePrevPage = () => {
    if (currentPage > 0) {
      dispatch(prevPage())
    }
  }

  useEffect(() => {
    dispatch(changeCurrentPage())
  }, [totalPage])

  return (
    <section className='py-8'>
      <div className='container mx-auto'>
        <h2 className='text-center text-2xl mb-4 uppercase font-bold text-gray-600'>Products For You</h2>

        <div
          className='grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 
        gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'
        >
          {textSearch
            ? viewList
                .filter((product) => product.title.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase()))
                .map((product) => <Product product={product} key={product.id} />)
            : viewList.map((product) => <Product product={product} key={product.id} />)}
        </div>
        <Pagination
          pageNumber={currentPage}
          handleNext={handleNextPage}
          handlePrev={handlePrevPage}
          totalPage={totalPage}
        />
      </div>
    </section>
  )
}
