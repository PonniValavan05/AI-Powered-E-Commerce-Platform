import React, { useState } from 'react';

export default function ProductDetail({ product, onClose, addToCart, onBuyNow }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const savings = product.orig ? product.orig - product.price : Math.round(product.price * product.discount / 100);
  const originalPrice = product.orig || Math.round(product.price / (1 - product.discount / 100));

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
      onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: 20, maxWidth: 800, width: '100%', maxHeight: '90vh', overflow: 'auto', position: 'relative' }}
        onClick={e => e.stopPropagation()}>

        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: '#f0f0f0', border: 'none',
          borderRadius: '50%', width: 36, height: 36, fontSize: 18, cursor: 'pointer', zIndex: 10 }}>✕</button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          {/* Left - Image */}
          <div style={{ background: '#f9f9f9', padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '20px 0 0 20px' }}>
            <div style={{ fontSize: 120, marginBottom: 20 }}>{product.emoji}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ width: 60, height: 60, background: '#eee', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, border: i === 1 ? '2px solid #ff6b35' : '2px solid transparent', cursor: 'pointer' }}>
                  {product.emoji}
                </div>
              ))}
            </div>
          </div>

          {/* Right - Details */}
          <div style={{ padding: 32 }}>
            <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{product.brand} — {product.category}</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, lineHeight: 1.3 }}>{product.name}</h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ color: '#f5a623', fontSize: 16 }}>{'★'.repeat(Math.round(product.rating))}</span>
              <span style={{ fontWeight: 700 }}>{product.rating}</span>
              <span style={{ color: '#007185', fontSize: 13 }}>({product.reviews?.toLocaleString()} reviews)</span>
            </div>

            <div style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '16px 0', marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#e53e3e' }}>₹{product.price.toLocaleString()}</div>
              <div style={{ fontSize: 13, color: '#888' }}>M.R.P: <span style={{ textDecoration: 'line-through' }}>₹{originalPrice.toLocaleString()}</span></div>
              <div style={{ color: '#388e3c', fontSize: 13, fontWeight: 600 }}>You Save: ₹{savings.toLocaleString()} ({product.discount}% off)</div>
              <div style={{ color: '#388e3c', fontSize: 13, marginTop: 4 }}>✓ FREE Delivery on orders above ₹499</div>
            </div>

            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 16 }}>{product.description}</p>

            <div style={{ background: '#f0f9ff', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 13 }}>
              <div>🚚 <b>Delivery:</b> Thursday, Jun 12 — FREE</div>
              <div style={{ marginTop: 4 }}>🔄 <b>Returns:</b> 30-day easy returns</div>
              <div style={{ marginTop: 4 }}>✅ <b>In Stock</b> — Order soon!</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>Qty:</span>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{ padding: '8px 14px', border: 'none', background: '#f5f5f5', cursor: 'pointer', fontSize: 16, fontWeight: 700 }}>−</button>
                <span style={{ padding: '8px 16px', fontWeight: 700, fontSize: 16 }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}
                  style={{ padding: '8px 14px', border: 'none', background: '#f5f5f5', cursor: 'pointer', fontSize: 16, fontWeight: 700 }}>+</button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={handleAdd}
                style={{ padding: '13px', borderRadius: 24, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 15,
                  background: added ? '#38a169' : '#f0c14b', color: '#111', transition: 'background 0.3s' }}>
                {added ? '✅ Added to Cart!' : '🛒 Add to Cart'}
              </button>
              <button onClick={() => onBuyNow(product)}
                style={{ padding: '13px', borderRadius: 24, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 15,
                  background: '#ff6b35', color: 'white' }}>
                ⚡ Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div style={{ padding: 32, borderTop: '1px solid #eee' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Customer Reviews</h3>
          <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, fontWeight: 800, color: '#e53e3e' }}>{product.rating}</div>
              <div style={{ color: '#f5a623', fontSize: 20 }}>{'★'.repeat(Math.round(product.rating))}</div>
              <div style={{ fontSize: 12, color: '#888' }}>out of 5</div>
            </div>
            <div style={{ flex: 1 }}>
              {[5,4,3,2,1].map(s => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 12, width: 8 }}>{s}</span>
                  <span style={{ color: '#f5a623', fontSize: 12 }}>★</span>
                  <div style={{ flex: 1, height: 8, background: '#eee', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${[72,15,8,3,2][5-s]}%`, height: '100%', background: '#f5a623' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {[
            { name: 'Rahul K.', rating: 5, text: 'Absolutely fantastic product! Quality is top-notch and delivery was super fast.', date: 'Jun 5, 2026' },
            { name: 'Priya M.', rating: 4, text: 'Great value for money. Works exactly as described. Highly recommend!', date: 'May 28, 2026' },
            { name: 'Arjun S.', rating: 5, text: 'Exceeded my expectations. Will definitely buy again from ShopAI!', date: 'May 20, 2026' },
          ].map((r, i) => (
            <div key={i} style={{ padding: '16px 0', borderTop: '1px solid #f0f0f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1a1a2e', color: '#f5a623', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>{r.name[0]}</div>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</span>
                </div>
                <span style={{ fontSize: 12, color: '#888' }}>{r.date}</span>
              </div>
              <div style={{ color: '#f5a623', marginBottom: 4 }}>{'★'.repeat(r.rating)}</div>
              <p style={{ fontSize: 13, color: '#555', lineHeight: 1.5 }}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}