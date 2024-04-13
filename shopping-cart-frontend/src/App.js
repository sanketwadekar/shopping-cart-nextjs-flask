import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import NavBar from './NavBar'
import {Route, Routes, BrowserRouter } from 'react-router-dom';


function App(props) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  }

  return (
      <>
        <NavBar items={cart}/>
          {/* <BrowserRouter> */}
        {/* <div> */}
          {/* <Routes> */}
          {props.children}
            {/* <Route path="/" element={<ProductsList/>} /> */}
            {/* <Route path="/details/:id" element={<ProductDetails addToCart={addToCart}/>} /> */}
          {/* </Routes> */}
        {/* </div> */}
        {/* </BrowserRouter> */}
      </>
  );
}

export default App;
