import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import ProductsList from './Screens/ProductsList'
import ProductDetails from './Screens/ProductDetails'
import NavBar from './NavBar'
import {Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  }

  return (
      <>
        <NavBar items={cart}/>
        <div>
          <Routes>
            <Route path="/" element={<ProductsList/>} />
            <Route path="/details/:id" element={<ProductDetails addToCart={addToCart}/>} />
          </Routes>
        </div>
      </>
  );
}

export default App;
