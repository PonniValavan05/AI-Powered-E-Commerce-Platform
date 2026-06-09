import React from 'react';

export default function Cart({ cart, removeFromCart, onClose, onCheckout }) {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 360, background: '#fff',
      boxShadow: '-4px 0 20px rgba(0,0,0,0.15)', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px', background: '#1a1a2e', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: 18 }}>🛍️ Your Cart ({cart.length})</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', fontSize: 22, cursor: 'pointer' }}>✕</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#999' }}>
            <div style={{ fontSize: 48 }}>🛒</div>
            <p>Your cart is empty</p>
          </div>
        ) : (
          cart.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid #f0f0f0', alignItems: 'center' }}>
              <div style={{ fontSize: 36 }}>{item.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
                <div style={{ color: '#e53e3e', fontWeight: 700 }}>₹{(item.price * item.qty).toLocaleString()}</div>
                <div style={{ fontSize: 12, color: '#888' }}>Qty: {item.qty}</div>
              </div>
              <button onClick={() => removeFromCart(item.id)}
                style={{ background: '#fee2e2', border: 'none', color: '#e53e3e', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', fontWeight: 700 }}>
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div style={{ padding: 20, borderTop: '1px solid #eee' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>
            <span>Total:</span>
            <span style={{ color: '#e53e3e' }}>₹{total.toLocaleString()}</span>
          </div>
          <button onClick={onCheckout} style={{ width: '100%', padding: 14, background: '#ff6b35', color: 'white', border: 'none',
            borderRadius: 24, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}