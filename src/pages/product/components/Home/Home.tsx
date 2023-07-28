import ClickOnTop from '../ClickOnTop'
import Hero from '../Hero'
import Search from '../Search'
import ProductList from '../ProductList'
import Filter from '../Filter'
import useWindowResize from '../../hooks/useWindowResize'
import { useAppDispatch } from '../../../../store'
import { changePerPage } from '../../productWeb.slice'

export default function Home() {
  const { width } = useWindowResize()
  const dispatch = useAppDispatch()
  if (width) {
    if (width < 640) {
      dispatch(changePerPage(4))
    } else if (width < 1024) {
      dispatch(changePerPage(6))
    } else if (width < 1280) {
      dispatch(changePerPage(8))
    } else {
      dispatch(changePerPage(10))
    }
  }
  return (
    <main className='min-h-screen relative'>
      <Hero />
      <section className='pt-6'>
        <div className='container mx-auto'>
          <div className='sm:flex sm:items-center sm:justify-between'>
            <Search />
            <Filter />
          </div>
        </div>
      </section>
      <ProductList />
      <ClickOnTop />
    </main>
  )
}
