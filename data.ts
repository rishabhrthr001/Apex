import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Apex Runner Elite",
    price: 189,
    category: "Footwear",
    image: "https://picsum.photos/id/103/800/800",
    description: "Engineered for speed. The Apex Runner Elite features our proprietary reactive foam technology.",
    rating: 4.8,
    reviews: 124,
    features: ["Reactive Foam", "Breathable Mesh", "Carbon Fiber Plate"]
  },
  {
    id: 2,
    name: "Urban Minimalist Jacket",
    price: 245,
    category: "Apparel",
    image: "https://picsum.photos/id/1059/800/800",
    description: "Water-resistant, wind-proof, and effortlessly stylish. The perfect outer layer for the modern city.",
    rating: 4.9,
    reviews: 89,
    features: ["Gore-Tex Membrane", "Hidden Pockets", "Thermal Lining"]
  },
  {
    id: 3,
    name: "Lumina Smart Watch",
    price: 399,
    category: "Accessories",
    image: "https://picsum.photos/id/175/800/800",
    description: "Track your life in high definition. Health monitoring meets luxury design.",
    rating: 4.7,
    reviews: 450,
    features: ["ECG Monitor", "Sapphire Glass", "7-Day Battery"]
  },
  {
    id: 4,
    name: "Zenith Wireless Headphones",
    price: 349,
    category: "Electronics",
    image: "https://picsum.photos/id/1/800/800",
    description: "Immersive soundscapes with active noise cancellation. Silence the world.",
    rating: 4.6,
    reviews: 210,
    features: ["Active Noise Cancelling", "Transparency Mode", "30h Playtime"]
  },
  {
    id: 5,
    name: "Terra Hiking Boot",
    price: 220,
    category: "Footwear",
    image: "https://picsum.photos/id/1084/800/800",
    description: "Conquer any terrain. Waterproof leather and rugged soles for the path less traveled.",
    rating: 4.9,
    reviews: 76,
    features: ["Vibram Sole", "Waterproof Leather", "Ankle Support"]
  },
  {
    id: 6,
    name: "Canvas Weekender",
    price: 150,
    category: "Accessories",
    image: "https://picsum.photos/id/1075/800/800",
    description: "The perfect companion for short getaways. Durable canvas with leather accents.",
    rating: 4.5,
    reviews: 112,
    features: ["Organic Cotton", "Leather Straps", "Laptop Sleeve"]
  }
];

export const CATEGORIES = ["All", "Footwear", "Apparel", "Accessories", "Electronics"];

export const TESTIMONIALS = [
  {
    id: 1,
    text: "The quality is absolutely unmatched. I've never owned a better pair of shoes.",
    author: "Alex Morgan",
    role: "Professional Athlete"
  },
  {
    id: 2,
    text: "Apex completely changed my wardrobe. Minimalist, functional, and beautiful.",
    author: "Sarah Jenkins",
    role: "Architect"
  }
];