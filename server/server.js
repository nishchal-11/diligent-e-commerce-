const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Mock product data (40 products)
const products = [
  // Electronics & Tech
  { id: 1, name: 'Ultrabook Laptop', price: 999, category: 'laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop', tags: ['tech','laptop','electronics'] },
  { id: 2, name: 'Gaming Laptop', price: 1499, category: 'laptops', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop', tags: ['tech','laptop','gaming','electronics'] },
  { id: 3, name: 'Wireless Headphones', price: 199, category: 'audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop', tags: ['tech','audio','electronics'] },
  { id: 4, name: 'Smartphone Pro', price: 899, category: 'phones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop', tags: ['tech','phone','electronics'] },
  { id: 5, name: 'Wireless Earbuds', price: 149, category: 'audio', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop', tags: ['tech','audio','electronics'] },
  { id: 6, name: '4K Monitor', price: 449, category: 'monitors', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop', tags: ['tech','monitor','electronics'] },
  { id: 7, name: 'Mechanical Keyboard', price: 129, category: 'accessories', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop', tags: ['tech','keyboard','accessories'] },
  { id: 8, name: 'Gaming Mouse', price: 79, category: 'accessories', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop', tags: ['tech','mouse','gaming','accessories'] },
  { id: 9, name: 'Tablet Pro', price: 599, category: 'tablets', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop', tags: ['tech','tablet','electronics'] },
  { id: 10, name: 'Smartwatch', price: 299, category: 'wearables', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop', tags: ['tech','watch','wearables'] },
  
  // Clothing & Fashion
  { id: 11, name: 'Running Shoes', price: 120, category: 'shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop', tags: ['clothing','shoes','sports'] },
  { id: 12, name: 'White T-Shirt', price: 25, category: 'clothing', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop', tags: ['clothing','shirt'] },
  { id: 13, name: 'Denim Jeans', price: 79, category: 'clothing', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop', tags: ['clothing','jeans','pants'] },
  { id: 14, name: 'Leather Jacket', price: 249, category: 'clothing', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop', tags: ['clothing','jacket','leather'] },
  { id: 15, name: 'Sneakers', price: 89, category: 'shoes', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=300&fit=crop', tags: ['clothing','shoes','sneakers'] },
  { id: 16, name: 'Sunglasses', price: 149, category: 'accessories', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop', tags: ['accessories','sunglasses','fashion'] },
  { id: 17, name: 'Baseball Cap', price: 29, category: 'accessories', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=300&fit=crop', tags: ['accessories','cap','hat'] },
  { id: 18, name: 'Backpack', price: 69, category: 'bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop', tags: ['accessories','bag','backpack'] },
  { id: 19, name: 'Hoodie', price: 59, category: 'clothing', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop', tags: ['clothing','hoodie','sweatshirt'] },
  { id: 20, name: 'Dress Shoes', price: 159, category: 'shoes', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&h=300&fit=crop', tags: ['clothing','shoes','formal'] },
  
  // Home & Living
  { id: 21, name: 'Coffee Maker', price: 89, category: 'kitchen', image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=300&fit=crop', tags: ['home','kitchen','appliances'] },
  { id: 22, name: 'Table Lamp', price: 49, category: 'lighting', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop', tags: ['home','lamp','lighting'] },
  { id: 23, name: 'Throw Pillow', price: 29, category: 'decor', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=300&fit=crop', tags: ['home','pillow','decor'] },
  { id: 24, name: 'Wall Clock', price: 39, category: 'decor', image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&h=300&fit=crop', tags: ['home','clock','decor'] },
  { id: 25, name: 'Desk Chair', price: 199, category: 'furniture', image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=300&fit=crop', tags: ['home','furniture','chair'] },
  { id: 26, name: 'Plant Pot', price: 19, category: 'decor', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop', tags: ['home','plant','decor'] },
  { id: 27, name: 'Bedding Set', price: 79, category: 'bedroom', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop', tags: ['home','bedroom','bedding'] },
  { id: 28, name: 'Vacuum Cleaner', price: 149, category: 'appliances', image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=300&fit=crop', tags: ['home','appliances','cleaning'] },
  
  // Sports & Fitness
  { id: 29, name: 'Yoga Mat', price: 35, category: 'fitness', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop', tags: ['sports','fitness','yoga'] },
  { id: 30, name: 'Dumbbells Set', price: 89, category: 'fitness', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop', tags: ['sports','fitness','weights'] },
  { id: 31, name: 'Water Bottle', price: 19, category: 'accessories', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop', tags: ['sports','bottle','accessories'] },
  { id: 32, name: 'Basketball', price: 29, category: 'sports', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop', tags: ['sports','basketball','ball'] },
  { id: 33, name: 'Tennis Racket', price: 119, category: 'sports', image: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=400&h=300&fit=crop', tags: ['sports','tennis','racket'] },
  
  // Books & Media
  { id: 34, name: 'Bestseller Novel', price: 15, category: 'books', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop', tags: ['books','reading','novel'] },
  { id: 35, name: 'Cookbook', price: 29, category: 'books', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop', tags: ['books','cooking','recipe'] },
  { id: 36, name: 'Vinyl Record Player', price: 199, category: 'audio', image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&h=300&fit=crop', tags: ['audio','music','vinyl'] },
  
  // Beauty & Personal Care
  { id: 37, name: 'Perfume', price: 89, category: 'beauty', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop', tags: ['beauty','perfume','fragrance'] },
  { id: 38, name: 'Skincare Set', price: 69, category: 'beauty', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop', tags: ['beauty','skincare','cosmetics'] },
  { id: 39, name: 'Hair Dryer', price: 49, category: 'beauty', image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=300&fit=crop', tags: ['beauty','haircare','appliances'] },
  { id: 40, name: 'Electric Shaver', price: 79, category: 'grooming', image: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=400&h=300&fit=crop', tags: ['grooming','shaver','personal-care'] }
];

// GET /api/products - return all products
app.get('/api/products', (req, res) => {
  res.json({ success: true, products });
});

// POST /api/login - fake auth accepts any non-empty username/password
app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'username and password required' });
  }

  // Return a fake token
  return res.json({ success: true, token: 'fake-jwt-token', username });
});

// GET /api/bot?msg=... - simple bot hook: if message contains keywords, return filtered products
app.get('/api/bot', (req, res) => {
  const msg = (req.query.msg || '').toLowerCase();

  if (!msg) return res.json({ success: true, products: [] });

  // Check for action commands (add to cart)
  const addToCartMatch = msg.match(/add.*to.*cart/i);
  if (addToCartMatch) {
    // Parse the intent
    let targetProducts = [...products];
    let priceLimit = null;
    let priceMin = null;
    
    // Extract price conditions
    const underMatch = msg.match(/under|less than|below\s+\$?(\d+)/i);
    const overMatch = msg.match(/over|more than|above\s+\$?(\d+)/i);
    const exactMatch = msg.match(/\$(\d+)/);
    
    if (underMatch) {
      priceLimit = parseInt(underMatch[1]);
      targetProducts = targetProducts.filter(p => p.price < priceLimit);
    } else if (overMatch) {
      priceMin = parseInt(overMatch[1]);
      targetProducts = targetProducts.filter(p => p.price > priceMin);
    } else if (exactMatch) {
      const exactPrice = parseInt(exactMatch[1]);
      targetProducts = targetProducts.filter(p => Math.abs(p.price - exactPrice) < 20);
    }

    // Filter by category/product type
    const keywords = [];
    if (msg.includes('laptop') || msg.includes('laptops')) keywords.push('laptop');
    if (msg.includes('shoe') || msg.includes('shoes')) keywords.push('shoes');
    if (msg.includes('headphone') || msg.includes('headphones')) keywords.push('headphones');
    if (msg.includes('t-shirt') || msg.includes('shirt')) keywords.push('clothing');
    if (msg.includes('phone') || msg.includes('smartphone')) keywords.push('phone');
    if (msg.includes('watch')) keywords.push('watch');
    if (msg.includes('book')) keywords.push('book');
    if (msg.includes('fitness') || msg.includes('gym')) keywords.push('fitness');

    if (keywords.length > 0) {
      targetProducts = targetProducts.filter(p => {
        const name = p.name.toLowerCase();
        const tags = (p.tags || []).join(' ');
        const category = p.category.toLowerCase();
        return keywords.some(k => name.includes(k) || tags.includes(k) || category.includes(k));
      });
    }

    return res.json({ 
      success: true, 
      action: 'add_to_cart',
      products: targetProducts,
      message: targetProducts.length > 0 
        ? `Found ${targetProducts.length} product(s) matching your criteria. Adding to cart...`
        : 'No products found matching your criteria.'
    });
  }

  // Regular search/filter behavior
  const keywords = [];
  if (msg.includes('laptop') || msg.includes('laptops')) keywords.push('laptop');
  if (msg.includes('shoe') || msg.includes('shoes')) keywords.push('shoes');
  if (msg.includes('headphone') || msg.includes('headphones')) keywords.push('headphones');
  if (msg.includes('t-shirt') || msg.includes('shirt')) keywords.push('clothing');
  if (msg.includes('phone') || msg.includes('smartphone')) keywords.push('phone');
  if (msg.includes('watch')) keywords.push('watch');
  if (msg.includes('book')) keywords.push('book');
  if (msg.includes('fitness') || msg.includes('gym')) keywords.push('fitness');

  let filtered = products.filter(p => {
    const name = p.name.toLowerCase();
    const tags = (p.tags || []).join(' ');
    return keywords.some(k => name.includes(k) || tags.includes(k));
  });

  // If no keywords matched, try returning items whose name contains any word in msg
  if (filtered.length === 0) {
    const words = msg.split(/\s+/).filter(Boolean);
    filtered = products.filter(p => words.some(w => p.name.toLowerCase().includes(w) || (p.tags||[]).includes(w)));
  }

  return res.json({ success: true, products: filtered });
});

app.listen(PORT, () => {
  console.log(`Speed-ecom server running on http://localhost:${PORT}`);
});
