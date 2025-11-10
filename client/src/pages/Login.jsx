import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) =>{
    e.preventDefault()
    setError('')
    
    if(!username || !password){ 
      setError('Please enter username and password')
      return 
    }
    
    try{
      const res = await axios.post('http://localhost:5000/api/login',{ username, password })
      if (res.data && res.data.success){
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('username', username)
        // Redirect to home page
        navigate('/')
      }else{
        setError('Login failed. Please try again.')
      }
    }catch(err){
      console.error('Login error:', err)
      setError('Login error. Please check server connection.')
    }
  }

  return (
    <div className="container">
      <div className="login-container">
        <h2>Login to Speed Ecom</h2>
        <p className="login-subtitle">Enter any username and password to continue</p>
        <form onSubmit={submit} className="form">
          <label>Username</label>
          <input 
            type="text"
            value={username} 
            onChange={e=>setUsername(e.target.value)}
            placeholder="Enter username"
            autoFocus
          />
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={e=>setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
        </form>
        <p className="login-hint">💡 Hint: Any non-empty credentials will work!</p>
      </div>
    </div>
  )
}
