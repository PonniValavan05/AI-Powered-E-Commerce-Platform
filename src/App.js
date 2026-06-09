import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Chatbot from './components/Chatbot';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/Checkout';
import './App.css';

export const products = [
  // ── ELECTRONICS (original, duplicates removed) ──────────────────────────
  { id: 1,  name: 'iPhone 15 Pro',       price: 134900, category: 'Electronics', emoji: '📱', rating: 4.8, reviews: 2847,  description: 'Titanium design, A17 Pro chip, 48MP camera system', brand: 'Apple',   discount: 10, type: 'phone' },
  { id: 4,  name: 'MacBook Air M3',      price: 114900, category: 'Electronics', emoji: '💻', rating: 4.9, reviews: 987,   description: 'Supercharged by M3 chip, 18hr battery, 15.3" display', brand: 'Apple',   discount: 10, type: 'laptop' },
  { id: 5,  name: 'iPad Pro 12.9"',      price: 89900,  category: 'Electronics', emoji: '📟', rating: 4.8, reviews: 1456,  description: 'M2 chip, Liquid Retina XDR display, Apple Pencil support', brand: 'Apple',   discount: 5,  type: 'tablet' },
  { id: 8,  name: 'boAt Airdopes 141',   price: 1299,   category: 'Electronics', emoji: '🎵', rating: 4.2, reviews: 24500, description: 'True wireless earbuds with 42hr total playback', brand: 'boAt',    discount: 71, type: 'headset' },
  { id: 9,  name: 'Canon EOS R50',       price: 64990,  category: 'Electronics', emoji: '📷', rating: 4.6, reviews: 654,   description: 'Mirrorless camera with 24.2MP APS-C sensor', brand: 'Canon',   discount: 8,  type: 'camera' },
  { id: 10, name: 'PlayStation 5',       price: 54990,  category: 'Electronics', emoji: '🎮', rating: 4.8, reviews: 4312,  description: 'Next-gen gaming console with ultra-high speed SSD', brand: 'Sony',    discount: 8,  type: 'gaming' },
  { id: 12, name: 'JBL Charge 5',        price: 13999,  category: 'Electronics', emoji: '🔊', rating: 4.5, reviews: 3421,  description: 'Portable waterproof bluetooth speaker', brand: 'JBL',     discount: 22, type: 'speaker' },
  { id: 13, name: 'Kindle Paperwhite',   price: 13999,  category: 'Electronics', emoji: '📚', rating: 4.6, reviews: 8765,  description: '6.8" display, adjustable warm light, waterproof', brand: 'Amazon',  discount: 18, type: 'ereader' },
  { id: 14, name: 'GoPro Hero 12',       price: 34990,  category: 'Electronics', emoji: '🎬', rating: 4.5, reviews: 1234,  description: '5.3K video, HyperSmooth 6.0 stabilization', brand: 'GoPro',   discount: 10, type: 'camera' },
  { id: 16, name: 'Dell XPS 15',         price: 149900, category: 'Electronics', emoji: '💻', rating: 4.7, reviews: 876,   description: 'Intel Core i7, 16GB RAM, 512GB SSD, OLED display', brand: 'Dell',    discount: 5,  type: 'laptop' },
  { id: 20, name: 'HP LaserJet Printer', price: 12999,  category: 'Electronics', emoji: '🖨️', rating: 4.4, reviews: 1876,  description: 'Wireless monochrome laser printer, fast printing', brand: 'HP',      discount: 20, type: 'printer' },

  // ── PHONES ────────────────────────────────────────────────────────────────
  { id: 101, name: 'iPhone 15',            price: 79900,  category: 'Electronics', emoji: '📱', rating: 4.7, reviews: 5432,  description: '6.1" Super Retina XDR, A16 Bionic, 48MP camera', brand: 'Apple',    discount: 8,  type: 'phone' },
  { id: 102, name: 'iPhone 14',            price: 59900,  category: 'Electronics', emoji: '📱', rating: 4.6, reviews: 8765,  description: '6.1" Super Retina XDR, A15 Bionic, Crash Detection', brand: 'Apple',    discount: 20, type: 'phone' },
  { id: 103, name: 'iPhone 13',            price: 49900,  category: 'Electronics', emoji: '📱', rating: 4.5, reviews: 12345, description: '6.1" OLED, A15 Bionic, Cinematic mode video', brand: 'Apple',    discount: 28, type: 'phone' },
  { id: 104, name: 'Samsung Galaxy S24 Ultra', price: 129999, category: 'Electronics', emoji: '📱', rating: 4.8, reviews: 3421, description: '6.8" QHD+, Snapdragon 8 Gen 3, 200MP, S Pen included', brand: 'Samsung', discount: 10, type: 'phone' },
  { id: 105, name: 'Samsung Galaxy S24',   price: 74999,  category: 'Electronics', emoji: '📱', rating: 4.6, reviews: 6543,  description: 'AI-powered smartphone, Snapdragon 8 Gen 3, 50MP', brand: 'Samsung', discount: 20, type: 'phone' },
  { id: 106, name: 'Samsung Galaxy S23',   price: 54999,  category: 'Electronics', emoji: '📱', rating: 4.6, reviews: 7821,  description: '6.1" Dynamic AMOLED, Snapdragon 8 Gen 2, 50MP', brand: 'Samsung', discount: 25, type: 'phone' },
  { id: 107, name: 'Samsung Galaxy A54',   price: 27999,  category: 'Electronics', emoji: '📱', rating: 4.4, reviews: 9876,  description: '6.4" Super AMOLED, Exynos 1380, 50MP OIS camera', brand: 'Samsung', discount: 22, type: 'phone' },
  { id: 108, name: 'Samsung Galaxy M34',   price: 16999,  category: 'Electronics', emoji: '📱', rating: 4.3, reviews: 14532, description: '6.5" sAMOLED 120Hz, 5000mAh, 50MP camera', brand: 'Samsung', discount: 30, type: 'phone' },
  { id: 109, name: 'POCO X6 Pro',          price: 26999,  category: 'Electronics', emoji: '📱', rating: 4.5, reviews: 7654,  description: '6.67" AMOLED 144Hz, Dimensity 8300, 64MP camera', brand: 'POCO',    discount: 15, type: 'phone' },
  { id: 110, name: 'POCO F5',              price: 22999,  category: 'Electronics', emoji: '📱', rating: 4.4, reviews: 5432,  description: '6.67" AMOLED 120Hz, Snapdragon 7+ Gen 2, 64MP', brand: 'POCO',    discount: 20, type: 'phone' },
  { id: 111, name: 'POCO M6 Pro',          price: 12999,  category: 'Electronics', emoji: '📱', rating: 4.2, reviews: 8765,  description: '6.67" AMOLED 120Hz, Helio G99 Ultra, 50MP', brand: 'POCO',    discount: 35, type: 'phone' },
  { id: 112, name: 'Moto Edge 40',         price: 24999,  category: 'Electronics', emoji: '📱', rating: 4.4, reviews: 4321,  description: '6.55" pOLED 144Hz, Dimensity 8020, 50MP OIS', brand: 'Motorola', discount: 22, type: 'phone' },
  { id: 113, name: 'Moto G84',             price: 16999,  category: 'Electronics', emoji: '📱', rating: 4.3, reviews: 6789,  description: '6.55" pOLED 120Hz, Snapdragon 695, 50MP', brand: 'Motorola', discount: 28, type: 'phone' },
  { id: 114, name: 'Moto G54',             price: 10999,  category: 'Electronics', emoji: '📱', rating: 4.1, reviews: 9876,  description: '6.5" IPS LCD 120Hz, Dimensity 7020, 50MP', brand: 'Motorola', discount: 38, type: 'phone' },
  { id: 115, name: 'Redmi Note 13 Pro+',   price: 29999,  category: 'Electronics', emoji: '📱', rating: 4.5, reviews: 12345, description: '6.67" AMOLED 120Hz, Dimensity 7200 Ultra, 200MP', brand: 'Redmi',   discount: 15, type: 'phone' },
  { id: 116, name: 'Redmi Note 13',        price: 14999,  category: 'Electronics', emoji: '📱', rating: 4.3, reviews: 18765, description: '6.67" AMOLED 120Hz, Snapdragon 685, 108MP', brand: 'Redmi',   discount: 25, type: 'phone' },
  { id: 117, name: 'Redmi 13C',            price: 8999,   category: 'Electronics', emoji: '📱', rating: 4.1, reviews: 23456, description: '6.74" IPS LCD, Helio G85, 50MP camera', brand: 'Redmi',   discount: 40, type: 'phone' },
  { id: 118, name: 'Realme GT 5 Pro',      price: 34999,  category: 'Electronics', emoji: '📱', rating: 4.5, reviews: 3456,  description: '6.78" AMOLED 144Hz, Snapdragon 8 Gen 3, 50MP', brand: 'Realme',  discount: 12, type: 'phone' },
  { id: 119, name: 'Realme 12 Pro+',       price: 22999,  category: 'Electronics', emoji: '📱', rating: 4.3, reviews: 5678,  description: '6.7" AMOLED 120Hz, Snapdragon 7s Gen 2, 50MP', brand: 'Realme',  discount: 20, type: 'phone' },
  { id: 120, name: 'OnePlus 12R',          price: 39999,  category: 'Electronics', emoji: '📱', rating: 4.6, reviews: 4321,  description: '6.78" LTPO AMOLED 120Hz, Snapdragon 8 Gen 1, 50MP', brand: 'OnePlus', discount: 10, type: 'phone' },
  { id: 121, name: 'OnePlus Nord CE 3',    price: 24999,  category: 'Electronics', emoji: '📱', rating: 4.3, reviews: 6789,  description: '6.7" Super AMOLED 120Hz, Snapdragon 782G, 50MP', brand: 'OnePlus', discount: 18, type: 'phone' },

  // ── TVs ───────────────────────────────────────────────────────────────────
  { id: 130, name: 'Samsung 65" QLED 4K',   price: 79999,  category: 'Electronics', emoji: '📺', rating: 4.7, reviews: 2341, description: 'Quantum Dot, 4K, Tizen OS, Alexa built-in', brand: 'Samsung', discount: 20, type: 'tv' },
  { id: 131, name: 'Samsung 55" QLED 4K',   price: 69999,  category: 'Electronics', emoji: '📺', rating: 4.7, reviews: 3210, description: 'Quantum Dot technology, 4K, Tizen OS', brand: 'Samsung', discount: 22, type: 'tv' },
  { id: 132, name: 'Samsung 43" Crystal 4K',price: 32999,  category: 'Electronics', emoji: '📺', rating: 4.5, reviews: 4532, description: 'Crystal Processor 4K, PurColor, HDR', brand: 'Samsung', discount: 25, type: 'tv' },
  { id: 133, name: 'Samsung 32" HD Smart',  price: 17999,  category: 'Electronics', emoji: '📺', rating: 4.3, reviews: 7654, description: 'HD Smart TV, Tizen OS, Netflix, YouTube', brand: 'Samsung', discount: 30, type: 'tv' },
  { id: 134, name: 'Redmi Smart TV X55',    price: 44999,  category: 'Electronics', emoji: '📺', rating: 4.4, reviews: 5432, description: '55" 4K QLED, Dolby Vision, Dolby Atmos, Android TV', brand: 'Redmi',   discount: 22, type: 'tv' },
  { id: 135, name: 'Redmi Smart TV 43"',    price: 24999,  category: 'Electronics', emoji: '📺', rating: 4.3, reviews: 8765, description: '43" FHD, Android TV 11, 20W speakers', brand: 'Redmi',   discount: 28, type: 'tv' },
  { id: 136, name: 'Sony Bravia 55" OLED',  price: 129999, category: 'Electronics', emoji: '📺', rating: 4.8, reviews: 1234, description: '4K OLED, XR Processor, Acoustic Surface Audio+', brand: 'Sony',    discount: 8,  type: 'tv' },
  { id: 137, name: 'Sony Bravia 43" 4K',    price: 44999,  category: 'Electronics', emoji: '📺', rating: 4.6, reviews: 3456, description: '43" 4K HDR, X1 Processor, Google TV', brand: 'Sony',    discount: 15, type: 'tv' },
  { id: 138, name: 'Realme Smart TV 43"',   price: 22999,  category: 'Electronics', emoji: '📺', rating: 4.2, reviews: 6789, description: '43" FHD, Android TV, 24W Stereo speakers', brand: 'Realme',  discount: 32, type: 'tv' },
  { id: 139, name: 'OnePlus TV 55" U1S',    price: 49999,  category: 'Electronics', emoji: '📺', rating: 4.5, reviews: 2345, description: '55" QLED 4K, 30W Dolby Atmos, Android TV', brand: 'OnePlus', discount: 18, type: 'tv' },
  { id: 140, name: 'OnePlus TV 43" Y1S',    price: 23999,  category: 'Electronics', emoji: '📺', rating: 4.3, reviews: 4567, description: '43" FHD, Android TV 11, 20W speakers', brand: 'OnePlus', discount: 25, type: 'tv' },
  { id: 141, name: 'LG OLED 55" C3',        price: 119999, category: 'Electronics', emoji: '📺', rating: 4.8, reviews: 1876, description: 'Evo OLED panel, α9 AI Processor 4K Gen6, webOS', brand: 'LG',      discount: 10, type: 'tv' },
  { id: 142, name: 'Xiaomi Smart TV 5X 55"',price: 39999,  category: 'Electronics', emoji: '📺', rating: 4.4, reviews: 6543, description: '55" 4K QLED, Dolby Vision IQ, PatchWall 4', brand: 'Xiaomi',  discount: 20, type: 'tv' },

  // ── HEADSETS ──────────────────────────────────────────────────────────────
  { id: 150, name: 'Sony WH-1000XM5',       price: 29990,  category: 'Electronics', emoji: '🎧', rating: 4.8, reviews: 8765,  description: 'Industry-best ANC, 30hr battery, LDAC Hi-Res Audio', brand: 'Sony',    discount: 14, type: 'headset' },
  { id: 151, name: 'Sony WF-1000XM5',       price: 19990,  category: 'Electronics', emoji: '🎧', rating: 4.7, reviews: 5432,  description: 'True wireless, best-in-class ANC, 8hr+16hr battery', brand: 'Sony',    discount: 20, type: 'headset' },
  { id: 152, name: 'Sony WH-CH720N',        price: 9990,   category: 'Electronics', emoji: '🎧', rating: 4.5, reviews: 6789,  description: 'Lightweight ANC headphones, 35hr battery', brand: 'Sony',    discount: 30, type: 'headset' },
  { id: 153, name: 'Samsung Galaxy Buds2 Pro', price: 12990, category: 'Electronics', emoji: '🎧', rating: 4.6, reviews: 6789, description: '360 Audio, ANC, 5hr+13hr battery, IPX7', brand: 'Samsung', discount: 25, type: 'headset' },
  { id: 154, name: 'Samsung Galaxy Buds FE', price: 5999,  category: 'Electronics', emoji: '🎧', rating: 4.3, reviews: 9876,  description: 'Active Noise Cancellation, 6hr+15hr, comfort fit', brand: 'Samsung', discount: 40, type: 'headset' },
  { id: 155, name: 'OnePlus Buds Pro 2',    price: 9999,   category: 'Electronics', emoji: '🎧', rating: 4.5, reviews: 7654,  description: 'Dynaudio tuned, 48dB ANC, 9hr+36hr battery', brand: 'OnePlus', discount: 30, type: 'headset' },
  { id: 156, name: 'OnePlus Nord Buds 2',   price: 2999,   category: 'Electronics', emoji: '🎧', rating: 4.2, reviews: 18765, description: '12.4mm drivers, 25dB ANC, 7hr+29hr battery', brand: 'OnePlus', discount: 40, type: 'headset' },
  { id: 157, name: 'Realme Buds Air 5 Pro', price: 4999,   category: 'Electronics', emoji: '🎧', rating: 4.3, reviews: 12345, description: '50dB ANC, LDAC, 9hr+27hr battery, 360° Spatial Audio', brand: 'Realme',  discount: 38, type: 'headset' },
  { id: 158, name: 'boAt Rockerz 550',      price: 1499,   category: 'Electronics', emoji: '🎧', rating: 4.1, reviews: 34567, description: '20hr playback, 40mm drivers, foldable design', brand: 'boAt',    discount: 70, type: 'headset' },
  { id: 159, name: 'JBL Tune 770NC',        price: 7999,   category: 'Electronics', emoji: '🎧', rating: 4.5, reviews: 4321,  description: 'Adaptive ANC, 70hr battery, multipoint connection', brand: 'JBL',     discount: 35, type: 'headset' },
  { id: 160, name: 'Bose QuietComfort 45',  price: 24990,  category: 'Electronics', emoji: '🎧', rating: 4.6, reviews: 3210,  description: 'World-class noise cancellation, 24hr battery', brand: 'Bose',    discount: 16, type: 'headset' },

  // ── CLOTHING ──────────────────────────────────────────────────────────────
  { id: 21, name: "Levi's 511 Slim Jeans",  price: 2599, category: 'Clothing', emoji: '👖', rating: 4.3, reviews: 3421, description: 'Classic slim fit denim jeans, dark indigo wash', brand: "Levi's",   discount: 35 },
  { id: 22, name: 'Nike Air Max 270',        price: 8995, category: 'Clothing', emoji: '👟', rating: 4.6, reviews: 7821, description: 'Comfortable running shoes with Air Max cushioning', brand: 'Nike',     discount: 31 },
  { id: 23, name: 'Allen Solly Formal Shirt',price: 1299, category: 'Clothing', emoji: '👔', rating: 4.4, reviews: 5432, description: 'Premium cotton formal shirt, wrinkle resistant', brand: 'Allen Solly',discount: 40 },
  { id: 24, name: 'Adidas Hoodie',           price: 3499, category: 'Clothing', emoji: '🧥', rating: 4.5, reviews: 2341, description: 'Comfortable fleece hoodie with kangaroo pocket', brand: 'Adidas',    discount: 25 },
  { id: 25, name: 'Zara Summer Dress',       price: 2999, category: 'Clothing', emoji: '👗', rating: 4.3, reviews: 1876, description: 'Floral print summer dress, lightweight fabric', brand: 'Zara',      discount: 30 },
  { id: 26, name: 'Puma Sports T-Shirt',     price: 899,  category: 'Clothing', emoji: '👕', rating: 4.2, reviews: 6543, description: 'Dry cell technology, moisture wicking fabric', brand: 'Puma',      discount: 45 },
  { id: 27, name: 'Woodland Boots',          price: 4999, category: 'Clothing', emoji: '🥾', rating: 4.6, reviews: 3210, description: 'Waterproof leather boots with grip sole', brand: 'Woodland',   discount: 20 },
  { id: 28, name: 'H&M Slim Chinos',         price: 1999, category: 'Clothing', emoji: '👖', rating: 4.1, reviews: 2109, description: 'Slim fit stretch chino trousers', brand: 'H&M',       discount: 33 },
  { id: 29, name: 'Biba Ethnic Kurti',       price: 1499, category: 'Clothing', emoji: '👘', rating: 4.4, reviews: 4532, description: 'Beautiful ethnic print cotton kurti', brand: 'Biba',      discount: 50 },
  { id: 30, name: 'Reebok Running Shoes',    price: 5999, category: 'Clothing', emoji: '👟', rating: 4.5, reviews: 3421, description: 'Lightweight running shoes with cushioned sole', brand: 'Reebok',    discount: 28 },
  { id: 31, name: 'Van Heusen Blazer',       price: 6999, category: 'Clothing', emoji: '🧥', rating: 4.6, reviews: 1234, description: 'Slim fit formal blazer, premium fabric', brand: 'Van Heusen', discount: 15 },
  { id: 32, name: 'US Polo Polo T-Shirt',    price: 1199, category: 'Clothing', emoji: '👕', rating: 4.3, reviews: 8765, description: 'Classic polo t-shirt in premium cotton', brand: 'US Polo',   discount: 40 },
  { id: 33, name: 'Nike Dri-FIT Shorts',     price: 1999, category: 'Clothing', emoji: '🩳', rating: 4.4, reviews: 4321, description: 'Athletic shorts with Dri-FIT technology', brand: 'Nike',     discount: 22 },
  { id: 34, name: 'Adidas Superstar Shoes',  price: 7999, category: 'Clothing', emoji: '👟', rating: 4.7, reviews: 5432, description: 'Iconic shell-toe sneakers, classic design', brand: 'Adidas',    discount: 18 },
  { id: 35, name: 'Fabindia Cotton Saree',   price: 3499, category: 'Clothing', emoji: '👗', rating: 4.5, reviews: 2341, description: 'Handwoven pure cotton saree with zari border', brand: 'Fabindia',  discount: 10 },
  { id: 36, name: 'W Ethnic Palazzo Set',    price: 1799, category: 'Clothing', emoji: '👘', rating: 4.3, reviews: 3210, description: 'Ethnic printed palazzo set with dupatta', brand: 'W',         discount: 38 },
  { id: 37, name: 'Pepe Jeans Jacket',       price: 4499, category: 'Clothing', emoji: '🧥', rating: 4.4, reviews: 1543, description: 'Casual denim jacket with button closure', brand: 'Pepe Jeans', discount: 26 },
  { id: 38, name: 'Skechers Walking Shoes',  price: 4299, category: 'Clothing', emoji: '👟', rating: 4.5, reviews: 6789, description: 'Memory foam insole, arch fit technology', brand: 'Skechers',  discount: 32 },
  { id: 39, name: 'Arrow Formal Trousers',   price: 1999, category: 'Clothing', emoji: '👖', rating: 4.2, reviews: 2876, description: 'Slim fit formal trousers, wrinkle free', brand: 'Arrow',     discount: 44 },
  { id: 40, name: 'Manyavar Sherwani',       price: 8999, category: 'Clothing', emoji: '👔', rating: 4.7, reviews: 987,  description: 'Designer sherwani for weddings and celebrations', brand: 'Manyavar',  discount: 12 },

  // ── HOME ──────────────────────────────────────────────────────────────────
  { id: 41, name: 'Instant Pot Duo 7-in-1', price: 6999,  category: 'Home', emoji: '🍳', rating: 4.6, reviews: 12043, description: '7-in-1 electric pressure cooker, 5.7L', brand: 'Instant Pot', discount: 30 },
  { id: 42, name: 'Philips Air Fryer',       price: 8999,  category: 'Home', emoji: '🍟', rating: 4.4, reviews: 4523,  description: 'Digital air fryer, oil-free cooking, 4.1L', brand: 'Philips',    discount: 33 },
  { id: 43, name: 'Dyson V15 Vacuum',        price: 52900, category: 'Home', emoji: '🧹', rating: 4.7, reviews: 2341,  description: 'Cordless vacuum with laser dust detection', brand: 'Dyson',      discount: 10 },
  { id: 44, name: 'Prestige Mixer Grinder',  price: 3499,  category: 'Home', emoji: '🫙', rating: 4.5, reviews: 8765,  description: '750W motor, 3 stainless steel jars', brand: 'Prestige',   discount: 28 },
  { id: 45, name: 'IKEA Study Desk',         price: 12999, category: 'Home', emoji: '🪑', rating: 4.3, reviews: 3456,  description: 'Minimalist work desk with cable management', brand: 'IKEA',       discount: 15 },
  { id: 46, name: 'Havells Ceiling Fan',     price: 2499,  category: 'Home', emoji: '💨', rating: 4.4, reviews: 6543,  description: 'Energy efficient BLDC motor, remote control', brand: 'Havells',    discount: 20 },
  { id: 47, name: 'Milton Water Bottle',     price: 499,   category: 'Home', emoji: '🍶', rating: 4.3, reviews: 15432, description: 'Stainless steel insulated bottle, 1L', brand: 'Milton',     discount: 35 },
  { id: 48, name: 'Bajaj Microwave 20L',     price: 6999,  category: 'Home', emoji: '📦', rating: 4.4, reviews: 4321,  description: 'Solo microwave oven with 20L capacity', brand: 'Bajaj',      discount: 22 },
  { id: 49, name: 'Godrej Refrigerator',     price: 24999, category: 'Home', emoji: '🧊', rating: 4.5, reviews: 2341,  description: '265L double door, frost free, energy star', brand: 'Godrej',     discount: 18 },
  { id: 50, name: 'Wipro Smart LED Bulb',    price: 399,   category: 'Home', emoji: '💡', rating: 4.2, reviews: 9876,  description: 'WiFi enabled, 16 million colors, voice control', brand: 'Wipro',      discount: 40 },
  { id: 51, name: 'Bosch Washing Machine',   price: 34999, category: 'Home', emoji: '🫧', rating: 4.6, reviews: 1876,  description: '7KG front load, EcoSilence Drive motor', brand: 'Bosch',      discount: 12 },
  { id: 52, name: 'Cello Dinner Set 18pc',   price: 1999,  category: 'Home', emoji: '🍽️', rating: 4.3, reviews: 5432,  description: 'Opalware dinner set, microwave safe', brand: 'Cello',      discount: 45 },
  { id: 53, name: 'Wooden Bookshelf',        price: 7999,  category: 'Home', emoji: '📚', rating: 4.5, reviews: 1543,  description: '5-tier wooden bookshelf with display shelf', brand: 'Wakefit',    discount: 25 },
  { id: 54, name: 'Pigeon Induction Cooktop',price: 1799,  category: 'Home', emoji: '🔥', rating: 4.3, reviews: 7654,  description: '1800W induction cooktop with auto-shut off', brand: 'Pigeon',     discount: 38 },
  { id: 55, name: 'Crompton Geyser 15L',     price: 6499,  category: 'Home', emoji: '🚿', rating: 4.4, reviews: 4321,  description: '15L storage water heater, 5 star rated', brand: 'Crompton',   discount: 15 },
  { id: 56, name: 'Solimo Bedsheet Set',     price: 799,   category: 'Home', emoji: '🛏️', rating: 4.2, reviews: 18765, description: 'Cotton double bedsheet with 2 pillow covers', brand: 'Solimo',    discount: 50 },
  { id: 57, name: 'Morphy Richards Toaster', price: 2499,  category: 'Home', emoji: '🍞', rating: 4.5, reviews: 3456,  description: '2-slice pop-up toaster, 7 browning levels', brand: 'Morphy Richards', discount: 28 },
  { id: 58, name: 'Nilkamal Plastic Chair',  price: 799,   category: 'Home', emoji: '🪑', rating: 4.1, reviews: 12345, description: 'Durable plastic chair, 150kg capacity', brand: 'Nilkamal',   discount: 20 },
  { id: 59, name: 'Asian Paints Wall Paint', price: 899,   category: 'Home', emoji: '🎨', rating: 4.4, reviews: 3210,  description: 'Royale luxury emulsion, 1L, washable', brand: 'Asian Paints',discount: 10 },
  { id: 60, name: 'Eureka Forbes Vacuum',    price: 4999,  category: 'Home', emoji: '🧹', rating: 4.3, reviews: 2341,  description: 'Wet & dry vacuum cleaner, 1400W motor', brand: 'Eureka Forbes',discount: 32 },

  // ── SPORTS ────────────────────────────────────────────────────────────────
  { id: 61, name: 'Yoga Mat Premium',        price: 799,   category: 'Sports', emoji: '🧘', rating: 4.4, reviews: 8921,  description: '6mm anti-slip yoga mat with carry strap', brand: 'Boldfit',   discount: 47 },
  { id: 62, name: 'Dumbbells Set 10kg',      price: 1499,  category: 'Sports', emoji: '🏋️', rating: 4.5, reviews: 5432,  description: 'Cast iron dumbbells, rubber coated, pair', brand: 'Kore',      discount: 30 },
  { id: 63, name: 'Nivia Football',          price: 599,   category: 'Sports', emoji: '⚽', rating: 4.3, reviews: 7654,  description: 'Size 5 football, machine stitched, PVC material', brand: 'Nivia',     discount: 25 },
  { id: 64, name: 'Yonex Badminton Racket',  price: 2999,  category: 'Sports', emoji: '🏸', rating: 4.6, reviews: 3210,  description: 'Carbon fibre racket, isometric head shape', brand: 'Yonex',     discount: 20 },
  { id: 65, name: 'Cosco Cricket Set',       price: 3499,  category: 'Sports', emoji: '🏏', rating: 4.4, reviews: 2341,  description: 'Junior cricket bat, ball and stumps combo', brand: 'Cosco',     discount: 15 },
  { id: 66, name: 'Decathlon Cycling Helmet',price: 1999,  category: 'Sports', emoji: '🪖', rating: 4.5, reviews: 4321,  description: 'Lightweight helmet, adjustable fit, 18 vents', brand: 'Decathlon', discount: 22 },
  { id: 67, name: 'Resistance Bands Set',    price: 599,   category: 'Sports', emoji: '💪', rating: 4.3, reviews: 9876,  description: 'Set of 5 resistance bands, different strengths', brand: 'Boldfit',   discount: 55 },
  { id: 68, name: 'Skipping Rope',           price: 299,   category: 'Sports', emoji: '🪢', rating: 4.2, reviews: 12345, description: 'Adjustable speed skipping rope with ball bearings', brand: 'Strauss',   discount: 40 },
  { id: 69, name: 'Swimming Goggles',        price: 799,   category: 'Sports', emoji: '🥽', rating: 4.4, reviews: 5432,  description: 'Anti-fog UV protection swimming goggles', brand: 'Speedo',    discount: 35 },
  { id: 70, name: 'Treadmill Manual',        price: 12999, category: 'Sports', emoji: '🏃', rating: 4.3, reviews: 1876,  description: 'Manual treadmill with 3-level incline', brand: 'Healthgenie',discount: 28 },
  { id: 71, name: 'Protein Powder 1kg',      price: 1299,  category: 'Sports', emoji: '💊', rating: 4.5, reviews: 8765,  description: 'Whey protein isolate, chocolate, 25g protein/serving', brand: 'MuscleBlaze',discount: 30 },
  { id: 72, name: 'Tennis Racket',           price: 1999,  category: 'Sports', emoji: '🎾', rating: 4.4, reviews: 2341,  description: 'Aluminum alloy frame, pre-strung racket', brand: 'Wilson',    discount: 18 },
  { id: 73, name: 'Gym Gloves',             price: 499,   category: 'Sports', emoji: '🧤', rating: 4.3, reviews: 6543,  description: 'Padded gym gloves with wrist support', brand: 'Kobo',      discount: 45 },
  { id: 74, name: 'Basketball Size 7',       price: 1299,  category: 'Sports', emoji: '🏀', rating: 4.5, reviews: 3456,  description: 'Official size 7 basketball, indoor/outdoor', brand: 'Spalding',  discount: 15 },
  { id: 75, name: 'Boxing Gloves',          price: 1499,  category: 'Sports', emoji: '🥊', rating: 4.4, reviews: 3210,  description: '10oz PU leather boxing gloves with wrist strap', brand: 'Everlast',  discount: 30 },
  { id: 76, name: 'Pull-Up Bar',             price: 899,   category: 'Sports', emoji: '🔩', rating: 4.5, reviews: 7654,  description: 'Doorframe pull-up bar, no screws needed', brand: 'Boldfit',   discount: 42 },
  { id: 77, name: 'Foam Roller',             price: 699,   category: 'Sports', emoji: '🪵', rating: 4.4, reviews: 4321,  description: 'High density foam roller for muscle recovery', brand: 'Boldfit',   discount: 38 },
  { id: 78, name: 'Sports Water Bottle',     price: 399,   category: 'Sports', emoji: '🍶', rating: 4.2, reviews: 18765, description: 'BPA free 1L sports bottle with flip cap', brand: 'Nalgene',   discount: 20 },
  { id: 79, name: 'Volleyball',              price: 799,   category: 'Sports', emoji: '🏐', rating: 4.3, reviews: 2876,  description: 'Official size volleyball, soft touch PU material', brand: 'Cosco',     discount: 22 },
  { id: 80, name: 'Cycling Gloves',          price: 499,   category: 'Sports', emoji: '🧤', rating: 4.3, reviews: 2341,  description: 'Half finger cycling gloves with gel padding', brand: 'Decathlon', discount: 25 },

  // ── BOOKS ─────────────────────────────────────────────────────────────────
  { id: 81, name: 'Atomic Habits',           price: 449, category: 'Books', emoji: '📖', rating: 4.8, reviews: 98743, description: 'By James Clear — Build good habits, break bad ones', brand: 'Penguin',        discount: 44 },
  { id: 82, name: 'Rich Dad Poor Dad',        price: 299, category: 'Books', emoji: '📗', rating: 4.7, reviews: 76543, description: 'By Robert Kiyosaki — Financial education classic', brand: 'Plata Publishing', discount: 50 },
  { id: 83, name: 'The Alchemist',            price: 199, category: 'Books', emoji: '📕', rating: 4.6, reviews: 54321, description: 'By Paulo Coelho — A journey of self-discovery', brand: 'HarperCollins',   discount: 55 },
  { id: 84, name: 'Think and Grow Rich',      price: 249, category: 'Books', emoji: '📘', rating: 4.5, reviews: 43210, description: 'By Napoleon Hill — Classic self-help book', brand: 'Fingerprint',      discount: 48 },
  { id: 85, name: 'The Psychology of Money',  price: 399, category: 'Books', emoji: '📙', rating: 4.7, reviews: 32109, description: 'By Morgan Housel — Timeless lessons on wealth', brand: 'Jaico',           discount: 38 },
  { id: 86, name: 'Wings of Fire',            price: 149, category: 'Books', emoji: '📔', rating: 4.8, reviews: 87654, description: 'By APJ Abdul Kalam — Inspiring autobiography', brand: 'Universities Press',discount: 25 },
  { id: 87, name: 'Zero to One',              price: 349, category: 'Books', emoji: '📒', rating: 4.5, reviews: 21098, description: 'By Peter Thiel — Building startups that matter', brand: 'Crown Business',   discount: 40 },
  { id: 88, name: 'Sapiens',                  price: 499, category: 'Books', emoji: '📓', rating: 4.6, reviews: 43210, description: 'By Yuval Noah Harari — A brief history of humankind', brand: 'Harper',          discount: 30 },
  { id: 89, name: 'Deep Work',                price: 349, category: 'Books', emoji: '📗', rating: 4.6, reviews: 23456, description: 'By Cal Newport — Rules for focused success', brand: 'Grand Central',    discount: 42 },
  { id: 90, name: 'Harry Potter Box Set',      price: 2999,category: 'Books', emoji: '⚡', rating: 4.9, reviews: 54321, description: 'Complete 7-book Harry Potter series box set', brand: 'Bloomsbury',       discount: 20 },
  { id: 91, name: 'Clean Code',               price: 599, category: 'Books', emoji: '💻', rating: 4.7, reviews: 12345, description: 'By Robert C. Martin — Agile software craftsmanship', brand: 'Prentice Hall',   discount: 18 },
  { id: 92, name: 'The 5AM Club',             price: 299, category: 'Books', emoji: '🌅', rating: 4.4, reviews: 34567, description: 'By Robin Sharma — Own your morning', brand: 'HarperCollins',   discount: 45 },
  { id: 93, name: 'Ikigai',                   price: 249, category: 'Books', emoji: '🌸', rating: 4.5, reviews: 45678, description: 'By Héctor García — Japanese secret to a long life', brand: 'Penguin',         discount: 38 },
  { id: 94, name: 'Python Crash Course',       price: 699, category: 'Books', emoji: '🐍', rating: 4.7, reviews: 15678, description: 'By Eric Matthes — Hands-on programming for beginners', brand: 'No Starch Press', discount: 22 },
  { id: 95, name: 'Cracking the Coding Interview', price: 799, category: 'Books', emoji: '💡', rating: 4.8, reviews: 23456, description: '189 programming questions and solutions', brand: 'CareerCup',       discount: 20 },
  { id: 96, name: 'The Lean Startup',         price: 399, category: 'Books', emoji: '🚀', rating: 4.4, reviews: 18765, description: 'By Eric Ries — How to build successful startups', brand: 'Crown Business',  discount: 35 },
  { id: 97, name: 'Wings of Fire',            price: 149, category: 'Books', emoji: '🔥', rating: 4.8, reviews: 67890, description: 'By APJ Abdul Kalam — Inspiring autobiography', brand: 'Gita Press',       discount: 15 },
  { id: 98, name: 'The Secret',               price: 299, category: 'Books', emoji: '✨', rating: 4.3, reviews: 56789, description: 'By Rhonda Byrne — Law of attraction guide', brand: 'Atria Books',      discount: 50 },
  { id: 99, name: 'The 48 Laws of Power',     price: 499, category: 'Books', emoji: '⚡', rating: 4.5, reviews: 23456, description: 'By Robert Greene — Laws of power and strategy', brand: 'Profile Books',    discount: 30 },
  { id: 100,name: 'Ramayana',                 price: 199, category: 'Books', emoji: '🕉️', rating: 4.8, reviews: 67890, description: 'By Valmiki — Ancient Indian epic retold', brand: 'Gita Press',       discount: 15 },
];

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);

  const handleBuyNow = (product) => {
    addToCart(product);
    setSelectedProduct(null);
    setCheckoutOpen(true);
  };

  const handlePlaceOrder = () => {
    setCheckoutOpen(false);
    setCart([]);
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 4000);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">🛒 ShopAI</div>
        <p className="tagline">Your AI-powered shopping assistant</p>
        <button className="cart-btn" onClick={() => setCartOpen(!cartOpen)}>
          🛍️ Cart ({totalItems})
        </button>
      </header>

      <main className="main">
        <ProductList addToCart={addToCart} onProductClick={setSelectedProduct} />
      </main>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          addToCart={addToCart}
          onBuyNow={handleBuyNow}
        />
      )}

      {cartOpen && (
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          onClose={() => setCartOpen(false)}
          onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
        />
      )}

      {checkoutOpen && (
        <Checkout
          cart={cart}
          onClose={() => setCheckoutOpen(false)}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

      {orderSuccess && (
        <div style={{
          position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)',
          background: '#38a169', color: 'white', padding: '16px 32px', borderRadius: 12,
          fontSize: 16, fontWeight: 700, zIndex: 9999, boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}>
          ✅ Order Placed Successfully! Thank you for shopping with ShopAI!
        </div>
      )}

      <Chatbot
        cart={cart}
        setCart={setCart}
        products={products}
        onProductClick={setSelectedProduct}
      />
    </div>
  );
}

export default App;