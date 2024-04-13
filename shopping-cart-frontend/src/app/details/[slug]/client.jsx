'use client'

import React from 'react'
// import dynamic from 'next/dynamic'

// const App = dynamic(() => import('../../../App'), { ssr: false })
import App from "../../../App"
import ProductDetails from "../../../Components/ProductDetails";
import CartContextProvider from "../../../context/CartContextProvider";

export function ClientOnly({id}) {
      return (
  <CartContextProvider>
      <App>
      <ProductDetails id={id}/>
      </App>
  </CartContextProvider>
  );
}