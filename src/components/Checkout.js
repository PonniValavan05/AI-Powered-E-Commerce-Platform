import React, { useState } from 'react';

export default function Checkout({ cart, onClose, onPlaceOrder }) {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({ name: '', phone: '', pincode: '', city: '', state: 'Tamil Nadu', address: '' });
  const [payment, setPayment] = useState('upi');

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = cart.reduce((s, i) => s + Math.round(i.price * (i.discount || 0) / 100) * i.qty, 0);
  const delivery = subtotal > 499 ? 0 : 49;
  const total = subtotal + delivery;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 900, maxHeight: '95vh', overflow: 'auto' }}>

        {/* Header */}
        <div style={{ background: '#1a1a2e', color: 'white', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '20px 20px 0 0' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>🔒 Secure Checkout</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', fontSize: 22, cursor: 'pointer' }}>✕</button>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', padding: '16px 24px', gap: 8, borderBottom: '1px solid #eee' }}>
          {['Cart', 'Address', 'Payment', 'Confirm'].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700,
                background: step > i ? '#38a169' : step === i + 1 ? '#ff6b35' : '#eee', color: step >= i + 1 ? 'white' : '#888' }}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span style={{ fontSize: 13, fontWeight: step === i + 1 ? 700 : 400, color: step === i + 1 ? '#ff6b35' : '#888' }}>{s}</span>
              {i < 3 && <span style={{ color: '#ccc', margin: '0 4px' }}>›</span>}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 0 }}>
          <div style={{ padding: 24 }}>

            {/* Step 1 - Cart Review */}
            {step === 1 && (
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>Review Your Items</h3>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid #f0f0f0', alignItems: 'center' }}>
                    <div style={{ fontSize: 40, width: 60, height: 60, background: '#f9f9f9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: '#888' }}>Qty: {item.qty}</div>
                    </div>
                    <div style={{ fontWeight: 700, color: '#e53e3e', fontSize: 16 }}>₹{(item.price * item.qty).toLocaleString()}</div>
                  </div>
                ))}
                <button onClick={() => setStep(2)}
                  style={{ marginTop: 20, width: '100%', padding: 14, background: '#ff6b35', color: 'white', border: 'none', borderRadius: 24, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  Continue to Address →
                </button>
              </div>
            )}

            {/* Step 2 - Address */}
            {step === 2 && (
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>📍 Delivery Address</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { key: 'name', label: 'Full Name', placeholder: 'Rahul Sharma' },
                    { key: 'phone', label: 'Phone Number', placeholder: '+91 98765 43210' },
                    { key: 'pincode', label: 'PIN Code', placeholder: '600001' },
                    { key: 'city', label: 'City', placeholder: 'Chennai' },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: '#666', display: 'block', marginBottom: 4 }}>{f.label}</label>
                      <input value={address[f.key]} onChange={e => setAddress(a => ({ ...a, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14, outline: 'none' }} />
                    </div>
                  ))}
                  <div style={{ gridColumn: '1/-1' }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#666', display: 'block', marginBottom: 4 }}>Full Address</label>
                    <textarea value={address.address} onChange={e => setAddress(a => ({ ...a, address: e.target.value }))}
                      placeholder="House No, Street, Area, Landmark"
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14, outline: 'none', height: 80, resize: 'none' }} />
                  </div>
                  <div style={{ gridColumn: '1/-1' }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#666', display: 'block', marginBottom: 4 }}>State</label>
                    <select value={address.state} onChange={e => setAddress(a => ({ ...a, state: e.target.value }))}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14, outline: 'none' }}>
                      {['Tamil Nadu', 'Karnataka', 'Maharashtra', 'Delhi', 'Gujarat', 'Rajasthan', 'Kerala', 'Andhra Pradesh', 'Telangana'].map(s => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                  <button onClick={() => setStep(1)} style={{ flex: 1, padding: 14, background: '#f5f5f5', color: '#333', border: 'none', borderRadius: 24, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>← Back</button>
                  <button onClick={() => setStep(3)} style={{ flex: 2, padding: 14, background: '#ff6b35', color: 'white', border: 'none', borderRadius: 24, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Continue to Payment →</button>
                </div>
              </div>
            )}

            {/* Step 3 - Payment */}
            {step === 3 && (
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>💳 Payment Method</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { id: 'upi', label: '📱 UPI Payment', sub: 'Google Pay, PhonePe, Paytm, BHIM' },
                    { id: 'card', label: '💳 Credit / Debit Card', sub: 'Visa, Mastercard, Rupay' },
                    { id: 'netbanking', label: '🏦 Net Banking', sub: 'All major banks supported' },
                    { id: 'cod', label: '💵 Cash on Delivery', sub: 'Pay when you receive' },
                    { id: 'emi', label: '📅 EMI', sub: 'No cost EMI available on select cards' },
                  ].map(p => (
                    <label key={p.id} onClick={() => setPayment(p.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', border: `2px solid ${payment === p.id ? '#ff6b35' : '#eee'}`,
                        borderRadius: 12, cursor: 'pointer', background: payment === p.id ? '#fff8f5' : '#fff', transition: 'all 0.2s' }}>
                      <input type="radio" checked={payment === p.id} onChange={() => setPayment(p.id)} style={{ accentColor: '#ff6b35' }} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{p.label}</div>
                        <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{p.sub}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {payment === 'upi' && (
                  <div style={{ marginTop: 16 }}>
                    <input placeholder="Enter UPI ID (e.g. name@upi)" style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14, outline: 'none' }} />
                  </div>
                )}
                {payment === 'card' && (
                  <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div style={{ gridColumn: '1/-1' }}>
                      <input placeholder="Card Number" style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14, outline: 'none' }} />
                    </div>
                    <input placeholder="MM/YY" style={{ padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14, outline: 'none' }} />
                    <input placeholder="CVV" style={{ padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14, outline: 'none' }} />
                  </div>
                )}
                <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                  <button onClick={() => setStep(2)} style={{ flex: 1, padding: 14, background: '#f5f5f5', color: '#333', border: 'none', borderRadius: 24, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>← Back</button>
                  <button onClick={() => setStep(4)} style={{ flex: 2, padding: 14, background: '#ff6b35', color: 'white', border: 'none', borderRadius: 24, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Review Order →</button>
                </div>
              </div>
            )}

            {/* Step 4 - Confirm */}
            {step === 4 && (
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>✅ Review & Confirm Order</h3>
                <div style={{ background: '#f9f9f9', borderRadius: 12, padding: 16, marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>📍 Delivery Address</div>
                  <div style={{ fontSize: 13, color: '#555' }}>{address.name || 'Not provided'}, {address.phone}</div>
                  <div style={{ fontSize: 13, color: '#555' }}>{address.address}, {address.city}, {address.state} - {address.pincode}</div>
                </div>
                <div style={{ background: '#f9f9f9', borderRadius: 12, padding: 16, marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>💳 Payment Method</div>
                  <div style={{ fontSize: 13, color: '#555', textTransform: 'capitalize' }}>{payment}</div>
                </div>
                <div style={{ background: '#fff8f5', borderRadius: 12, padding: 16, border: '1px solid #ffe0cc' }}>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>🛍️ Items ({cart.length})</div>
                  {cart.map(i => (
                    <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0' }}>
                      <span>{i.emoji} {i.name} × {i.qty}</span>
                      <span style={{ fontWeight: 600 }}>₹{(i.price * i.qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                  <button onClick={() => setStep(3)} style={{ flex: 1, padding: 14, background: '#f5f5f5', color: '#333', border: 'none', borderRadius: 24, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>← Back</button>
                  <button onClick={onPlaceOrder} style={{ flex: 2, padding: 14, background: '#38a169', color: 'white', border: 'none', borderRadius: 24, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>🎉 Place Order</button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div style={{ background: '#f9f9f9', padding: 24, borderLeft: '1px solid #eee' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Order Summary</h3>
            {cart.map(i => (
              <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0', borderBottom: '1px solid #eee' }}>
                <span style={{ color: '#555' }}>{i.emoji} {i.name.slice(0, 20)}... × {i.qty}</span>
                <span style={{ fontWeight: 600 }}>₹{(i.price * i.qty).toLocaleString()}</span>
              </div>
            ))}
            <div style={{ padding: '12px 0', fontSize: 13 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', color: '#388e3c' }}>
                <span>Discount</span><span>-₹{discount.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', color: '#388e3c' }}>
                <span>Delivery</span><span>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 18, borderTop: '2px solid #ddd', paddingTop: 12 }}>
              <span>Total</span><span style={{ color: '#e53e3e' }}>₹{total.toLocaleString()}</span>
            </div>
            <div style={{ background: '#e8f5e9', borderRadius: 8, padding: 10, marginTop: 12, fontSize: 12, color: '#388e3c' }}>
              🎉 You are saving ₹{discount.toLocaleString()} on this order!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}