import React, { useState } from 'react';
import { products } from '../App';

const categories = ['All', 'Electronics', 'Clothing', 'Home', 'Sports', 'Books'];

export default function ProductList({ addToCart, onProductClick }) {
  const [selected, setSelected] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [added, setAdded] = useState({});

  let filtered = products.filter(p =>
    (selected === 'All' || p.category === selected) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === 'low-high') filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === 'high-low') filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  else if (sort === 'discount') filtered = [...filtered].sort((a, b) => b.discount - a.discount);

  const handleAdd = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [product.id]: false })), 1500);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <input type="text" placeholder="🔍 Search products..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ padding: '10px 16px', borderRadius: 24, border: '1px solid #ddd', fontSize: 14, flex: 1, minWidth: 200, outline: 'none' }} />
        <select value={sort} onChange={e => setSort(e.target.value)}
          style={{ padding: '10px 16px', borderRadius: 24, border: '1px solid #ddd', fontSize: 13, outline: 'none', cursor: 'pointer' }}>
          <option value="default">Sort: Featured</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="discount">Best Discount</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelected(cat)}
            style={{ padding: '8px 18px', borderRadius: 24, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
              background: selected === cat ? '#1a1a2e' : '#fff', color: selected === cat ? '#fff' : '#333',
              boxShadow: selected === cat ? '0 2px 8px rgba(0,0,0,0.2)' : '0 1px 4px rgba(0,0,0,0.1)' }}>
            {cat === 'All' ? '🛍️ All' : cat === 'Electronics' ? '📱 Electronics' : cat === 'Clothing' ? '👗 Clothing' : cat === 'Home' ? '🏠 Home' : cat === 'Sports' ? '⚽ Sports' : '📚 Books'}
          </button>
        ))}
      </div>

      <div style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>Showing {filtered.length} products</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 20 }}>
        {filtered.map(product => (
          <div key={product.id} onClick={() => onProductClick(product)}
            style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', cursor: 'pointer', border: '1px solid #f0f0f0',
              transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}>

            <div style={{ height: 180, background: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <span style={{ fontSize: 64 }}>{product.emoji}</span>
              {product.discount > 0 && (
                <div style={{ position: 'absolute', top: 10, left: 10, background: '#e53e3e', color: 'white', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 6 }}>
                  -{product.discount}%
                </div>
              )}
            </div>

            <div style={{ padding: '14px 16px' }}>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>{product.brand}</div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6, lineHeight: 1.3, height: 36, overflow: 'hidden' }}>{product.name}</div>
              <div style={{ color: '#f5a623', fontSize: 12, marginBottom: 6 }}>
                {'★'.repeat(Math.round(product.rating))} <span style={{ color: '#888' }}>{product.rating} ({product.reviews?.toLocaleString()})</span>
              </div>
              <div style={{ marginBottom: 12 }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: '#e53e3e' }}>₹{product.price.toLocaleString()}</span>
                {product.discount > 0 && (
                  <span style={{ fontSize: 12, color: '#888', textDecoration: 'line-through', marginLeft: 6 }}>
                    ₹{Math.round(product.price / (1 - product.discount / 100)).toLocaleString()}
                  </span>
                )}
              </div>
              <button onClick={(e) => handleAdd(e, product)}
                style={{ width: '100%', padding: '9px', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
                  background: added[product.id] ? '#38a169' : '#1a1a2e', color: '#fff', transition: 'background 0.3s' }}>
                {added[product.id] ? '✅ Added!' : '🛒 Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}