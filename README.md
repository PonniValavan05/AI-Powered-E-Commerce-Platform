# 🛍️ ShopAI - AI-Powered E-Commerce Platform

> A complete mini e-commerce platform with an AI chatbot assistant integrated with Groq API. Built for Full Stack Developer Internship assessment at Auriseg.

**🎥 Demo Video:** [Add your video link here]

## 📋 Table of Contents:
1. [Project Overview](#project-overview)
2. [Features Implemented](#features-implemented)
3. [AI Chatbot Commands](#ai-chatbot-commands)
4. [Tech Stack](#tech-stack)
5. [Installation & Setup](#installation--setup)
6. [Project Structure](#project-structure)
7. [Screenshots](#screenshots)
8. [Submission Information](#submission-information)

## Project Overview:

ShopAI is a **fully functional e-commerce platform** where users can:
- Browse 40+ products across 6 categories
- Add/remove items from cart
- Complete checkout with address and payment
- Interact with an **AI chatbot** that can compare products, filter by budget, manage cart, and apply coupons

The chatbot is powered by **Groq API** (Llama 3.1 8B model) - 100% free to use.

## Features Implemented:

### 🛒 E-Commerce Features:
| Feature | Status |
|---------|--------|
| Product listing with categories | ✅ |
| Product search and filter | ✅ |
| Add to cart / Remove from cart | ✅ |
| Cart quantity management | ✅ |
| Checkout flow (Address + Payment) | ✅ |
| Coupon discount system | ✅ |
| Responsive design | ✅ |

### 🤖 AI Chatbot Features (Groq API):
| Feature | Description |
|---------|-------------|
| Product Comparison | Compare specs, prices, ratings |
| Budget Filtering | "Show phones under ₹15000" |
| Cart Management | Add/remove items via chat |
| Coupon Codes | Apply SAVE10, DIWALI30, etc. |
| Festival Deals | "Diwali gift ideas" |
| Product Info | "Tell me about iPhone 15" |
| Emoji Reactions | 👍❤️😮😄 on messages |

### 💰 Available Coupons:
| Code | Discount |
|------|----------|
| SAVE10 | 10% OFF |
| WELCOME20 | 20% OFF |
| DIWALI30 | 30% OFF |
| FESTIVE50 | 50% OFF |

## AI Chatbot Commands:

### 📱 Phone Commands:
Compare iPhone 15 vs Samsung S24,
Show phones under ₹15000,
Tell me about POCO X6 Pro,
Best phone for gaming,
Add iPhone 15 to cart,

### 📺 TV Commands:
Compare Sony vs Samsung TV,
Best 43 inch TV,
Which TV is best under ₹50000?,
Show all Sony TVs,

### 🎧 Headset Commands:
Compare Sony WH-1000XM5 vs Bose,
Best headset under ₹5000,
Add boAt earbuds to cart,

### 🎟️ Coupon Commands:
DIWALI30,
SAVE10,
Show coupon codes,
Apply welcome discount,

### 🎁 Festival Commands:
Diwali gift ideas,
Best gift under ₹1000,
Festival offers,

## Tech Stack:

| Category | Technology |
|----------|------------|
| Frontend | React.js 18 |
| AI API | Groq (Llama 3.1 8B) |
| Styling | CSS-in-JS / Inline styles |
| Version Control | Git & GitHub |
| Deployment | Vercel (recommended) |

## Installation & Setup:

### Prerequisites:
- Node.js (v18 or higher)
- Groq API key ([Free at console.groq.com](https://console.groq.com))

### Steps to Run Locally:

```bash
# 1. Clone the repository
git clone https://github.com/PonniValavan05/AI-Powered-E-Commerce-Platform.git

# 2. Navigate to project folder
cd AI-Powered-E-Commerce-Platform

# 3. Install dependencies
npm install

# 4. Create .env file with your Groq API key
echo "REACT_APP_GROQ_API_KEY=your_groq_api_key_here" > .env

# 5. Start the development server
npm start
The app will open at http://localhost:3000

Environment Variables:
REACT_APP_GROQ_API_KEY - Your Groq API key (starts with gsk_)

## 🔑 Getting Your Groq API Key

This project uses Groq API for the AI chatbot. You need a free API key.

1. Go to [console.groq.com](https://console.groq.com)
2. Sign in with Google
3. Click **API Keys** → **Create API Key**
4. Name it (e.g., "ShopAI")
5. Copy the key (starts with `gsk_`)

> ⚠️ **Important:** Never share or commit your API key. The `.env` file is already in `.gitignore`.

Project Structure:

AI-Powered-E-Commerce-Platform/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Chatbot.js      # AI assistant (compare, budget, cart)
│   │   ├── Cart.js         # Shopping cart UI
│   │   ├── Checkout.js     # Address & payment flow
│   │   ├── ProductCard.js  # Product display card
│   │   └── ProductDetail.js # Single product view
│   ├── App.js              # Main app with 40+ products
│   ├── App.css
│   └── index.js
├── .env                    # API keys (not in git)
├── .gitignore              # Ignored files
├── package.json
└── README.md
