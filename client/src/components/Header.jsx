import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header({ cartCount }){
  const username = localStorage.getItem('username')
  const navigate = useNavigate()
  
  const handleLogout = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    navigate('/login')
  }
  
  return (
    <header className="header">
      <div className="brand"><Link to="/">Speed Ecom</Link></div>
      <div className="nav">
        {username ? (
          <>
            <span className="user">Hi, {username}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <Link to="/login" className="login-link">Login</Link>
        )}
        <Link to="/cart" className="cart">🛒 Cart: {cartCount}</Link>
      </div>
    </header>
  )
}
