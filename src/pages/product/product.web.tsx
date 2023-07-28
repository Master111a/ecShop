import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Footer from './components/Footer'
import ProductDetail from './components/ProductDetail'
import Slidebar from './components/Slidebar'
import Cart from './components/Cart'
import Checkout from './components/Checkout'

export default function AppProduct() {
  return (
    <div className='relative'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />

        <Route path='/product/:id' element={<ProductDetail />} />
      </Routes>
      <Slidebar />
      <Footer />
    </div>
  )
}
