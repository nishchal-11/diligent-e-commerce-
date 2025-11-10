import React from 'react'
import { Link } from 'react-router-dom'
import SimpleBot from '../components/SimpleBot'

export default function Cart({ cart, removeFromCart, clearCart }){
  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  // Group items by id for quantity display
  const groupedCart = cart.reduce((acc, item) => {
    const existing = acc.find(i => i.id === item.id)
    if (existing) {
      existing.quantity++
    } else {
      acc.push({ ...item, quantity: 1 })
    }
    return acc
  }, [])

  // Handle bot commands for cart management
  const handleCartBot = async (msg) => {
    const lower = msg.toLowerCase()
    
    // Remove items based on price conditions
    if (lower.includes('remove') || lower.includes('delete')) {
      let itemsToRemove = []
      
      // Parse price conditions
      const overMatch = lower.match(/over|more than|greater than|above\s+\$?(\d+)/i)
      const underMatch = lower.match(/under|less than|below\s+\$?(\d+)/i)
      const exactMatch = lower.match(/\$(\d+)/)
      
      if (overMatch) {
        const priceLimit = parseInt(overMatch[1])
        itemsToRemove = cart.filter(item => item.price > priceLimit)
        
        // Remove all matching items
        itemsToRemove.forEach(item => {
          const index = cart.findIndex(i => i.id === item.id)
          if (index > -1) removeFromCart(item.id)
        })
        
        return `Removed ${itemsToRemove.length} item(s) over $${priceLimit}`
      } else if (underMatch) {
        const priceLimit = parseInt(underMatch[1])
        itemsToRemove = cart.filter(item => item.price < priceLimit)
        
        itemsToRemove.forEach(item => {
          const index = cart.findIndex(i => i.id === item.id)
          if (index > -1) removeFromCart(item.id)
        })
        
        return `Removed ${itemsToRemove.length} item(s) under $${priceLimit}`
      }
      
      // Remove by category
      if (lower.includes('laptop')) {
        const laptops = cart.filter(item => item.category === 'laptops')
        laptops.forEach(item => removeFromCart(item.id))
        return `Removed ${laptops.length} laptop(s) from cart`
      }
      if (lower.includes('shoe')) {
        const shoes = cart.filter(item => item.category === 'shoes')
        shoes.forEach(item => removeFromCart(item.id))
        return `Removed ${shoes.length} shoe(s) from cart`
      }
      
      // Remove all
      if (lower.includes('all') || lower.includes('everything')) {
        const count = cart.length
        clearCart()
        return `Removed all ${count} items from cart`
      }
    }
    
    // Clear cart command
    if (lower.includes('clear') || lower.includes('empty')) {
      const count = cart.length
      clearCart()
      return `Cart cleared! Removed ${count} items`
    }
    
    // Show cart info
    if (lower.includes('show') || lower.includes('list') || lower.includes('what')) {
      const total = cart.reduce((sum, item) => sum + item.price, 0)
      return `You have ${cart.length} items in cart. Total: $${total.toFixed(2)}`
    }
    
    return `I can help you manage your cart. Try: "remove items over $50" or "clear cart"`
  }

  if (cart.length === 0) {
    return (
      <div className="cart-page-layout">
        <div className="cart-main-content">
          <h2>Shopping Cart</h2>
          <div className="empty-cart">
            <p>🛒 Your cart is empty</p>
            <Link to="/" className="continue-shopping">Continue Shopping</Link>
          </div>
        </div>
        <SimpleBot onSend={handleCartBot} />
      </div>
    )
  }

  return (
    <div className="cart-page-layout">
      <div className="cart-main-content">
        <h2>Shopping Cart ({cart.length} items)</h2>
        
        <div className="cart-layout">
          <div className="cart-items">
            {groupedCart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-category">{item.category}</p>
                  <p className="cart-item-price">${item.price}</p>
                </div>
                <div className="cart-item-quantity">
                  <span>Qty: {item.quantity}</span>
                </div>
                <div className="cart-item-total">
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="cart-remove-btn"
                  title="Remove from cart"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal ({cart.length} items):</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <strong>FREE</strong>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
            <button onClick={clearCart} className="clear-cart-btn">Clear Cart</button>
            <Link to="/" className="continue-shopping">← Continue Shopping</Link>
          </div>
        </div>
      </div>
      
      <SimpleBot onSend={handleCartBot} />
    </div>
  )
}
