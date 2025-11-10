import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Header from './components/Header'

export default function App(){
  const [cart, setCart] = useState([])

  const addToCart = (product) => setCart(prev => [...prev, product])
  
  const removeFromCart = (productId) => {
    const index = cart.findIndex(item => item.id === productId)
    if (index > -1) {
      const newCart = [...cart]
      newCart.splice(index, 1)
      setCart(newCart)
    }
  }
  
  const clearCart = () => setCart([])

  return (
    <div>
      <Header cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />} />
      </Routes>
    </div>
  )
}
