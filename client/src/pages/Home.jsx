import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SimpleBot from '../components/SimpleBot'

export default function Home({ addToCart }){
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('default')
  const [filterCategory, setFilterCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(()=>{
    const fetchProducts = async ()=>{
      try{
        const res = await axios.get('http://localhost:5000/api/products')
        const list = (res.data && res.data.products) || []
        setProducts(list)
        setFiltered(list)
      }catch(err){
        console.error('fetch err', err)
      }finally{ setLoading(false) }
    }
    fetchProducts()
  },[])

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products]

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        (p.tags && p.tags.some(tag => tag.toLowerCase().includes(query)))
      )
    }

    // Filter by category
    if (filterCategory !== 'all') {
      result = result.filter(p => p.category === filterCategory)
    }

    // Filter by price range
    if (priceRange !== 'all') {
      if (priceRange === 'under50') result = result.filter(p => p.price < 50)
      else if (priceRange === '50to100') result = result.filter(p => p.price >= 50 && p.price <= 100)
      else if (priceRange === '100to500') result = result.filter(p => p.price > 100 && p.price <= 500)
      else if (priceRange === 'over500') result = result.filter(p => p.price > 500)
    }

    // Sort
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price)
    else if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name))

    setFiltered(result)
  }, [products, sortBy, filterCategory, priceRange, searchQuery])

  // Get unique categories from products
  const categories = ['all', ...new Set(products.map(p => p.category))]

  // Called by SimpleBot with message or directly with a filtered array
  const handleBot = async (msg) => {
    const lower = (msg || '').toLowerCase()
    // Try backend bot first
    try{
      const res = await axios.get('http://localhost:5000/api/bot', { params: { msg } })
      if (res.data && res.data.success){
        // Check if this is an action command (add to cart)
        if (res.data.action === 'add_to_cart' && Array.isArray(res.data.products)){
          const productsToAdd = res.data.products
          
          // Add all matching products to cart
          productsToAdd.forEach(product => addToCart(product))
          
          // Show success message
          const message = res.data.message || `Added ${productsToAdd.length} item(s) to cart!`
          alert(message)
          
          // Optionally still show the products
          setFiltered(productsToAdd)
          return message
        }
        
        // Regular filter behavior
        if (Array.isArray(res.data.products)){
          setFiltered(res.data.products)
          // Reset filters when bot is used
          setSortBy('default')
          setFilterCategory('all')
          setPriceRange('all')
          return `Found ${res.data.products.length} products`
        }
      }
    }catch(e){
      console.error('Bot error:', e)
      // fallback to client-side filtering
    }

    // client-side fallback: filter by keywords present in message
    const words = lower.split(/\s+/).filter(Boolean)
    if (words.length === 0) return setFiltered(products)

    const filteredLocal = products.filter(p => words.some(w => p.name.toLowerCase().includes(w) || (p.tags||[]).join(' ').includes(w) || p.category?.toLowerCase?.().includes(w)))
    setFiltered(filteredLocal)
    return `Found ${filteredLocal.length} products`
  }

  const resetFilters = () => {
    setSortBy('default')
    setFilterCategory('all')
    setPriceRange('all')
    setSearchQuery('')
  }

  if (loading) return <div className="container">Loading products...</div>

  return (
    <div className="home-layout">
      <div className="main-content">
        <h2>Store ({filtered.length} products)</h2>
        
        {/* Search Bar */}
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="🔍 Search products by name, category, or tags..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="clear-search">✕</button>
          )}
        </div>

        {/* Filter and Sort Controls */}
        <div className="controls">
          <div className="control-group">
            <label>Category:</label>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label>Price Range:</label>
            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
              <option value="all">All Prices</option>
              <option value="under50">Under $50</option>
              <option value="50to100">$50 - $100</option>
              <option value="100to500">$100 - $500</option>
              <option value="over500">Over $500</option>
            </select>
          </div>

          <div className="control-group">
            <label>Sort By:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>

          <button onClick={resetFilters} className="reset-btn">Reset Filters</button>
        </div>

        {/* Product Grid */}
        <div className="grid">
          {filtered.length === 0 ? (
            <p className="no-results">No products found. Try different filters or use the chatbot!</p>
          ) : (
            filtered.map(p => (
              <div key={p.id} className="card">
                <img src={p.image} alt={p.name} />
                <h3>{p.name}</h3>
                <p className="price">${p.price}</p>
                <p className="category">{p.category}</p>
                <button onClick={()=>addToCart(p)}>Add to Cart</button>
              </div>
            ))
          )}
        </div>
      </div>

      <SimpleBot onSend={handleBot} />
    </div>
  )
}
