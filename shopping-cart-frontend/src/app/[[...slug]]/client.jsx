'use client'

import React from 'react'
import CartContextProvider from '../../context/CartContextProvider';
// import dynamic from 'next/dynamic'

// const App = dynamic(() => import('../../App'), { ssr: false })
import App from "../../App"
import ProductsList from "../../components/ProductsList";

export function ClientOnly() {
  return <CartContextProvider>
  <App>
  <ProductsList/>
  </App>
</CartContextProvider>
}