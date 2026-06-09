import React, { useState, useRef, useEffect } from 'react';

const API_KEY = process.env.REACT_APP_GROQ_API_KEY;
const COUPONS = { 'SAVE10': 10, 'WELCOME20': 20, 'FESTIVE50': 50, 'DIWALI30': 30 };

export default function Chatbot({ cart, setCart, products, onProductClick }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '👋 Hi! I am ShopAI Assistant!\n\nHere is what I can do:\n• 📱 Compare phones, TVs, headsets\n• 💰 Find products within your budget\n• 🛒 Add or remove items from cart\n• 🎟️ Apply coupon codes\n• 🎁 Suggest festival gifts\n• ⭐ Recommend best-rated products\n\nTry asking me something!'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [reactions, setReactions] = useState({});
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [couponApplied, setCouponApplied] = useState(null);
  const bottomRef = useRef(null);
  const chatHistory = useRef([]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── helpers ────────────────────────────────────────────────────────────────
  const cartSummary = cart.length > 0
    ? `Cart: ${cart.map(i => `${i.name} x${i.qty} (₹${i.price})`).join(', ')}. Total ₹${cart.reduce((s, i) => s + i.price * i.qty, 0).toLocaleString()}`
    : 'Cart is empty';

  const productIndex = products
    .filter(p => p.type === 'phone' || p.type === 'tv' || p.type === 'headset')
    .map(p => `${p.name}|${p.brand}|₹${p.price}|${p.type}|${p.rating}★`)
    .join('\n');

  const findProducts = (text) => {
    const lower = text.toLowerCase();

    // Strict category detection
    const isPhone = /\b(phone|iphone|samsung galaxy|poco|moto[^r]|redmi|realme|oneplus nord|oneplus 1|mobile|smartphone)\b/.test(lower);
    const isTV = /\b(tv|television|bravia|qled|oled tv|smart tv)\b/.test(lower);
    const isHeadset = /\b(headset|headphone|earbuds|earphone|buds|wh-|wf-|quietcomfort|rockerz|airdopes|tune)\b/.test(lower);
    const isBook = /\b(book|novel|alchemist|habits|sapiens|read|author|chapter)\b/.test(lower);
    const isClothing = /\b(shirt|jeans|shoes|dress|clothing|wear|jacket|kurta|saree)\b/.test(lower);
    const isSports = /\b(sports|gym|yoga|cricket|football|dumbbell|fitness|racket)\b/.test(lower);
    const isHome = /\b(home|kitchen|cooker|vacuum|fridge|washing machine|geyser)\b/.test(lower);
    const isLaptop = /\b(laptop|macbook|notebook|dell|hp laptop|computer)\b/.test(lower);
    const isGaming = /\b(gaming|playstation|ps5|xbox|nintendo|console)\b/.test(lower);
    const isCamera = /\b(camera|gopro|canon|dslr|mirrorless)\b/.test(lower);
    const isSpeaker = /\b(speaker|jbl charge|bluetooth speaker)\b/.test(lower);

    let filtered = products;
if (isPhone) filtered = products.filter(p => p.type === 'phone');
else if (isTV) filtered = products.filter(p => p.type === 'tv');
else if (isHeadset) filtered = products.filter(p => p.type === 'headset');
else if (isLaptop) filtered = products.filter(p => p.type === 'laptop');
else if (isGaming) filtered = products.filter(p => p.type === 'gaming');
else if (isCamera) filtered = products.filter(p => p.type === 'camera');
else if (isSpeaker) filtered = products.filter(p => p.type === 'speaker');
else if (isBook) filtered = products.filter(p => p.category === 'Books');
else if (isClothing) filtered = products.filter(p => p.category === 'Clothing');
else if (isSports) filtered = products.filter(p => p.category === 'Sports');
else if (isHome) filtered = products.filter(p => p.category === 'Home');
else {
  // No category detected — find by exact name/brand match only
  const tokens = lower.split(/\s+/).filter(w => w.length > 3);
  const exact = products.filter(p => {
    const hay = `${p.name} ${p.brand}`.toLowerCase();
    return tokens.some(t => hay.includes(t));
  });
  return exact.sort((a, b) => b.rating - a.rating).slice(0, 3);
}

    // Match brand/name within detected category
    const tokens = lower.split(/\s+/).filter(w => w.length > 2);
    const specific = filtered.filter(p => {
      const hay = `${p.name} ${p.brand}`.toLowerCase();
      return tokens.some(t => hay.includes(t));
    });

    return (specific.length > 0 ? specific : filtered)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  };

  // ── intent handlers (no API needed) ───────────────────────────────────────
  const handleIntent = (text) => {
    const lower = text.toLowerCase();

    // ADD TO CART
    if (/add .+ (to cart|cart)/.test(lower)) {
      const match = products.find(p =>
        lower.includes(p.name.toLowerCase()) || lower.includes(p.brand.toLowerCase())
      );
      if (match) {
        setCart(prev => {
          const ex = prev.find(i => i.id === match.id);
          return ex
            ? prev.map(i => i.id === match.id ? { ...i, qty: i.qty + 1 } : i)
            : [...prev, { ...match, qty: 1 }];
        });
        return { ok: true, reply: `✅ Added "${match.name}" to your cart!\n💰 Price: ₹${match.price.toLocaleString()} (${match.discount}% off)\n\nClick the Cart button to view it.`, products: [match] };
      }
      return { ok: true, reply: `❌ I couldn't find that product. Try:\n• "Add iPhone 15 to cart"\n• "Add boAt earbuds to cart"\n• "Add Sony headphones to cart"` };
    }

    // REMOVE FROM CART
    if (/remove .+ (from cart|cart)/.test(lower)) {
      const match = cart.find(i => lower.includes(i.name.toLowerCase()));
      if (match) {
        setCart(prev => prev.filter(i => i.id !== match.id));
        return { ok: true, reply: `🗑️ Removed "${match.name}" from your cart!\n\nRemaining items: ${cart.length - 1}` };
      }
      return { ok: true, reply: `❌ That item is not in your cart.\nYour cart has: ${cart.map(i => i.name).join(', ') || 'nothing yet'}.` };
    }

    // COUPON CODE
    const code = text.toUpperCase().match(/\b(SAVE10|WELCOME20|FESTIVE50|DIWALI30)\b/);
    if (code) {
      const disc = COUPONS[code[1]];
      setCouponApplied({ code: code[1], discount: disc });
      return { ok: true, reply: `🎉 Coupon "${code[1]}" applied! You save ${disc}% on your order!\n\nAll coupons:\n• SAVE10 → 10% off\n• WELCOME20 → 20% off\n• DIWALI30 → 30% off 🪔\n• FESTIVE50 → 50% off 🎊` };
    }
    if (/coupon|promo|discount code/.test(lower)) {
      return { ok: true, reply: `🎟️ Available coupon codes:\n\n• SAVE10 → 10% off\n• WELCOME20 → 20% off\n• DIWALI30 → 30% off 🪔\n• FESTIVE50 → 50% off 🎊\n\nJust type the code and I will apply it!` };
    }

    // BUDGET FILTER
    // BUDGET FILTER
const budget = lower.match(/under\s*₹?\s*(\d+)|below\s*₹?\s*(\d+)|budget\s*₹?\s*(\d+)|less than\s*₹?\s*(\d+)/);
if (budget) {
  const amt = parseInt(budget[1] || budget[2] || budget[3] || budget[4]);

  // Detect category from the message
  let pool = products;
  if (/phone|mobile|smartphone|iphone|samsung|poco|redmi|realme|oneplus|moto/.test(lower)) {
    pool = products.filter(p => p.type === 'phone');
  } else if (/tv|television/.test(lower)) {
    pool = products.filter(p => p.type === 'tv');
  } else if (/headset|headphone|earbuds|earphone|buds|audio/.test(lower)) {
    pool = products.filter(p => p.type === 'headset');
  } else if (/book|novel/.test(lower)) {
    pool = products.filter(p => p.category === 'Books');
  } else if (/clothing|shirt|shoes|dress|jeans/.test(lower)) {
    pool = products.filter(p => p.category === 'Clothing');
  } else if (/sports|gym|fitness/.test(lower)) {
    pool = products.filter(p => p.category === 'Sports');
  } else if (/home|kitchen|appliance/.test(lower)) {
    pool = products.filter(p => p.category === 'Home');
  }

  const picks = pool.filter(p => p.price <= amt).sort((a, b) => b.rating - a.rating).slice(0, 5);

  if (!picks.length) {
    return { ok: true, reply: `😔 No products found under ₹${amt.toLocaleString()} in that category.\n\nTry a higher budget or different category!` };
  }

  const categoryName = pool[0]?.type || pool[0]?.category || 'products';
  return {
    ok: true,
    reply: `💰 Top ${categoryName}s under ₹${amt.toLocaleString()} (sorted by rating):`,
    products: picks
  };
}

    // CART STATUS
    if (/what.*(in|is).*cart|show.*cart|my cart/.test(lower)) {
      if (!cart.length) return { ok: true, reply: `🛒 Your cart is empty!\n\nTry asking me to recommend something and I can add it for you.` };
      const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
      return {
        ok: true,
        reply: `🛒 Your cart (${cart.length} items):\n${cart.map(i => `• ${i.name} x${i.qty} = ₹${(i.price * i.qty).toLocaleString()}`).join('\n')}\n\n💰 Total: ₹${total.toLocaleString()}${couponApplied ? `\n🎟️ Coupon ${couponApplied.code}: -${couponApplied.discount}%` : ''}`,
        products: cart
      };
    }

    // RECENTLY VIEWED
    if (/recent|viewed|history|last seen/.test(lower)) {
      if (!recentlyViewed.length) return { ok: true, reply: `👀 You haven't viewed any products yet. Click on any product card to view its details!` };
      return { ok: true, reply: `👀 Your recently viewed products:`, products: recentlyViewed };
    }

    // FESTIVAL / DIWALI
    if (/diwali|holi|eid|christmas|festival|onam|pongal|gift/.test(lower)) {
      const gifts = products.filter(p => p.price < 5000 && p.rating >= 4.3).sort((a, b) => b.rating - a.rating).slice(0, 5);
      return { ok: true, reply: `🪔 Festival Gift Ideas under ₹5000!\n\nUse code DIWALI30 for 30% off! 🎊\nHere are top picks:`, products: gifts };
    }

    return { ok: false };
  };

  // ── main send ──────────────────────────────────────────────────────────────
  const sendMessage = async (msgText) => {
    const text = (msgText || input).trim();
    if (!text || loading) return;

    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setLoading(true);

    const intent = handleIntent(text);
    if (intent.ok) {
      setMessages(prev => [...prev, { role: 'assistant', content: intent.reply, products: intent.products || null }]);
      setLoading(false);
      return;
    }

    const matched = findProducts(text);

    try {
      chatHistory.current.push({ role: 'user', content: text });
      if (chatHistory.current.length > 16) chatHistory.current = chatHistory.current.slice(-16);

      const systemPrompt = `You are ShopAI, a knowledgeable and enthusiastic Indian e-commerce assistant for ShopAI store.

PRODUCT DATABASE (use exact names and prices):
${productIndex}

CURRENT CART: ${cartSummary}
${couponApplied ? `ACTIVE COUPON: ${couponApplied.code} (${couponApplied.discount}% off)` : ''}

YOUR CAPABILITIES:
1. COMPARE products: When asked "compare X vs Y", give a structured comparison with: Price, Display, Camera/Audio, Battery, Processor, Verdict
2. RECOMMEND: Suggest best products for use case (gaming, photography, music, budget)
3. BUDGET: List affordable options low to high price
4. SPECS: Explain detailed specs in simple language
5. DEALS: Mention discount percentages and savings
6. BRANDS: Know all brands — Apple, Samsung, POCO, Motorola, Redmi, Realme, OnePlus, Sony, LG, boAt, JBL, Bose

RESPONSE RULES:
- Always be HELPFUL and SPECIFIC — use real product names and prices from the database
- Keep responses under 6 lines unless it is a comparison
- Use emojis naturally
- For comparisons: use a clear format with categories
- Always mention the BEST VALUE pick at the end
- Speak in a friendly, helpful Indian tone
- If you don't know something, suggest alternatives from the database`;

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          max_tokens: 200,
          temperature: 0.7,
          messages: [
            { role: 'system', content: systemPrompt },
            ...chatHistory.current
          ]
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not get a response.';
      chatHistory.current.push({ role: 'assistant', content: reply });

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: reply,
        products: matched.length > 0 ? matched : null
      }]);
    } catch (err) {
      console.error('Groq error:', err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `❌ API Error: ${err.message}\n\nPlease check your REACT_APP_GROQ_API_KEY in the .env file and restart with npm start.`
      }]);
    }
    setLoading(false);
  };

  const addReaction = (idx, emoji) =>
    setReactions(prev => ({ ...prev, [idx]: prev[idx] === emoji ? null : emoji }));

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const suggestions = [
    '📱 Compare iPhone 15 vs S24',
    '📺 Compare Sony vs Samsung TV',
    '🎧 Best headset under ₹5000',
    '💰 Phones under ₹15000',
    '🛒 Show my cart',
    '🎟️ Show coupons',
    '🪔 Diwali gift ideas',
    '➕ Add boAt earbuds to cart',
  ];

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: 28, right: 28,
          width: 72, height: 72, borderRadius: '50%',
          background: open ? '#e53e3e' : 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white', border: '4px solid white',
          fontSize: 32, cursor: 'pointer',
          boxShadow: '0 6px 30px rgba(102,126,234,0.6)',
          zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s'
        }}>
        {open ? '✕' : '🤖'}
      </button>

      {!open && (
        <div style={{
          position: 'fixed', bottom: 112, right: 18,
          background: '#1a1a2e', color: 'white',
          padding: '6px 14px', borderRadius: 20,
          fontSize: 12, fontWeight: 700, zIndex: 998,
          boxShadow: '0 2px 10px rgba(0,0,0,0.3)', whiteSpace: 'nowrap'
        }}>
          🤖 Ask AI Assistant!
        </div>
      )}

      {open && (
        <div style={{
          position: 'fixed', bottom: 112, right: 28,
          width: 390, height: 590,
          background: '#fff', borderRadius: 24,
          boxShadow: '0 12px 60px rgba(0,0,0,0.25)',
          display: 'flex', flexDirection: 'column',
          zIndex: 998, overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{ padding: '14px 18px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: 28 }}>🤖</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>ShopAI Assistant</div>
                <div style={{ fontSize: 11, opacity: 0.85 }}>✨ Groq AI • Compare • Cart • Deals</div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#4ade80' }} />
                {couponApplied && (
                  <div style={{
                    background: '#4ade80', color: '#14532d',
                    fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10
                  }}>
                    {couponApplied.code} ✓
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '12px 14px',
            display: 'flex', flexDirection: 'column', gap: 10, background: '#fafafa'
          }}>
            {messages.map((msg, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 6 }}>
                  {msg.role === 'assistant' && <div style={{ fontSize: 18, marginBottom: 2 }}>🤖</div>}
                  <div style={{
    maxWidth: '82%', padding: '12px 16px',
    borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
    background: msg.role === 'user'
      ? 'linear-gradient(135deg, #667eea, #764ba2)'
      : 'linear-gradient(135deg, #1a1a2e, #16213e)',
    color: 'white',
    fontSize: 13, lineHeight: 1.8,
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  }}>
    {msg.content.split('\n').map((line, li) => {
      if (!line.trim()) return <div key={li} style={{ height: 6 }} />;
      // Bold headers like **Price:**
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <div key={li} style={{ fontWeight: 800, fontSize: 13, color: '#f5a623', marginTop: 10, marginBottom: 2, letterSpacing: 0.5 }}>
            {line.replace(/\*\*/g, '').toUpperCase()}
          </div>
        );
      }
      // Inline bold like **Price:** text
      if (line.includes('**')) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        const isBullet = line.trim().startsWith('-') || line.trim().startsWith('•');
        return (
          <div key={li} style={{ display: 'flex', gap: 6, alignItems: 'flex-start', marginBottom: 2 }}>
            {isBullet && <span style={{ color: '#f5a623', fontWeight: 900, marginTop: 1 }}>•</span>}
            <span>
              {parts.map((p, pi) => pi % 2 === 1
                ? <span key={pi} style={{ color: '#f5a623', fontWeight: 700 }}>{p}</span>
                : p.replace(/^[-•]\s*/, '')
              )}
            </span>
          </div>
        );
      }
      // Bullet lines starting with - or •
      if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
        return (
          <div key={li} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 3 }}>
            <span style={{ color: '#f5a623', fontWeight: 900, fontSize: 16, lineHeight: 1.4 }}>•</span>
            <span style={{ opacity: 0.95 }}>{line.replace(/^[-•]\s*/, '')}</span>
          </div>
        );
      }
      // Emoji lines or headings
      if (/^[📱📺🎧💰🛒🎁🪔✅❌⭐🔥💡📦]/.test(line.trim())) {
        return (
          <div key={li} style={{ fontWeight: 700, fontSize: 14, color: '#f5a623', marginTop: 8, marginBottom: 2 }}>
            {line}
          </div>
        );
      }
      return <div key={li} style={{ opacity: 0.92, marginBottom: 2 }}>{line}</div>;
    })}
</div>
                </div>

                {/* Reactions */}
                {msg.role === 'assistant' && (
                  <div style={{ display: 'flex', gap: 4, marginLeft: 28, marginTop: 4 }}>
                    {['👍', '❤️', '😮', '😄'].map(emoji => (
                      <button key={emoji} onClick={() => addReaction(i, emoji)}
                        style={{
                          background: reactions[i] === emoji ? '#e8e4ff' : 'transparent',
                          border: reactions[i] === emoji ? '1px solid #667eea' : '1px solid #eee',
                          borderRadius: 12, padding: '2px 7px', cursor: 'pointer', fontSize: 13
                        }}>
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}

                {/* Product cards */}
                {msg.products && msg.products.length > 0 && (
                  <div style={{ marginTop: 8, marginLeft: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {msg.products.map(p => (
                      <div key={p.id}
                        onClick={() => {
                          onProductClick(p);
                          setRecentlyViewed(prev => [p, ...prev.filter(x => x.id !== p.id)].slice(0, 5));
                        }}
                        style={{
                          background: '#fff', borderRadius: 12, padding: '10px 12px',
                          cursor: 'pointer', border: '1px solid #e0e0e0',
                          display: 'flex', alignItems: 'center', gap: 10,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                          transition: 'transform 0.15s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                        <div style={{ fontSize: 30 }}>{p.emoji}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                          <div style={{ fontSize: 11, color: '#888' }}>{p.brand} • {p.rating}★</div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 800, color: '#e53e3e' }}>₹{p.price.toLocaleString()}</div>
                          <div style={{ fontSize: 10, color: '#388e3c' }}>{p.discount}% off</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* You might also like */}
                {msg.role === 'assistant' && msg.products?.length > 0 && i === messages.length - 1 && (
                  <div style={{ marginLeft: 28, marginTop: 6 }}>
                    <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>✨ You might also like:</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {products
                        .filter(p => p.type === msg.products[0].type && !msg.products.find(m => m.id === p.id))
                        .sort((a, b) => b.rating - a.rating)
                        .slice(0, 3)
                        .map(p => (
                          <button key={p.id} onClick={() => onProductClick(p)}
                            style={{
                              fontSize: 11, padding: '4px 10px', borderRadius: 14,
                              border: '1px solid #667eea', background: 'white',
                              color: '#667eea', cursor: 'pointer', fontWeight: 600
                            }}>
                            {p.emoji} {p.name.split(' ').slice(0, 3).join(' ')}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ fontSize: 18 }}>🤖</div>
                <div style={{
                  background: '#fff', padding: '10px 16px',
                  borderRadius: '18px 18px 18px 4px',
                  fontSize: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  display: 'flex', gap: 4, alignItems: 'center'
                }}>
                  <span style={{ animation: 'chatBounce 1s infinite 0s' }}>●</span>
                  <span style={{ animation: 'chatBounce 1s infinite 0.2s' }}>●</span>
                  <span style={{ animation: 'chatBounce 1s infinite 0.4s' }}>●</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestion chips */}
          <div style={{
            padding: '6px 10px', display: 'flex', gap: 6,
            overflowX: 'auto', background: '#f0f0f0', borderTop: '1px solid #eee'
          }}>
            {suggestions.map(s => (
              <button key={s} onClick={() => sendMessage(s)}
                style={{
                  whiteSpace: 'nowrap', padding: '5px 10px', borderRadius: 14,
                  border: '1px solid #667eea', background: 'white',
                  color: '#667eea', fontSize: 11, cursor: 'pointer', fontWeight: 600
                }}>
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '10px 14px', borderTop: '1px solid #eee', display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Compare phones, find budget picks, add to cart..."
              style={{
                flex: 1, padding: '10px 16px', borderRadius: 24,
                border: '1.5px solid #e0e0e0', fontSize: 13, outline: 'none'
              }}
            />
            <button onClick={() => sendMessage()} disabled={loading}
              style={{
                width: 44, height: 44, borderRadius: '50%', border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer', fontSize: 18,
                background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white'
              }}>
              ➤
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes chatBounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  );
}