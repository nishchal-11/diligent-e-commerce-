import React, { useState } from 'react'

export default function SimpleBot({ onSend }){
  const [msg, setMsg] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState([])

  const send = async () =>{
    if (!msg.trim()) return
    
    // Add user message to history
    const userMessage = { type: 'user', text: msg }
    setChatHistory(prev => [...prev, userMessage])
    
    setLoading(true)
    setResponse('')
    
    try {
      if (onSend) {
        const result = await onSend(msg)
        
        // Add bot response to history
        const botMessage = { type: 'bot', text: result || 'Done!' }
        setChatHistory(prev => [...prev, botMessage])
        
        if (result) setResponse(result)
      }
    } catch(e) {
      const errorMessage = { type: 'bot', text: 'Error processing request' }
      setChatHistory(prev => [...prev, errorMessage])
      setResponse('Error processing request')
    } finally {
      setLoading(false)
      setMsg('')
      
      // Clear response after 3 seconds
      setTimeout(() => setResponse(''), 3000)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="bot-sidebar">
      <div className="bot-header">
        <span className="bot-title">🤖 Agentic AI Chat Box</span>
      </div>
      
      <div className="bot-chat-area">
        {chatHistory.length === 0 ? (
          <div className="bot-welcome">
            <h3>👋 Welcome!</h3>
            <p>I can help you shop and manage your cart.</p>
            <div className="bot-examples">
              <strong>Try commands like:</strong>
              <ul>
                <li>"add shoes under $30 to cart"</li>
                <li>"show me laptops"</li>
                <li>"remove items over $50"</li>
                <li>"clear all items under $100"</li>
                <li>"what's in my cart?"</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="bot-messages">
            {chatHistory.map((chat, idx) => (
              <div key={idx} className={`bot-message ${chat.type}`}>
                <div className="message-content">{chat.text}</div>
              </div>
            ))}
            {loading && (
              <div className="bot-message bot">
                <div className="message-content typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="bot-input-area">
        <textarea 
          placeholder="Type your message here..." 
          value={msg} 
          onChange={e=>setMsg(e.target.value)} 
          onKeyDown={handleKey}
          disabled={loading}
          rows="3"
        />
        <button onClick={send} disabled={loading || !msg.trim()}>
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  )
}
