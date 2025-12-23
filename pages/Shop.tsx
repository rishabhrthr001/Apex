import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { CATEGORIES } from '../data';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Filter, Star, ShoppingBag, Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { useApp } from '../store';

gsap.registerPlugin(ScrollTrigger);

const Shop: React.FC = () => {
  const { products, addToCart } = useApp();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let result = [...products];

    // Filter by Category
    if (activeCategory !== "All") {
      result = result.filter(p => p.category === activeCategory);
    }

    // Filter by Search
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Sort
    if (sortBy === 'low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [activeCategory, searchQuery, sortBy, products]);

  useLayoutEffect(() => {
    // Animate list when it changes
    const ctx = gsap.context(() => {
      if (listRef.current) {
        gsap.fromTo(".product-card", 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", clearProps: "all" }
        );
      }
    }, listRef);
    return () => ctx.revert();
  }, [filteredProducts]);

  return (
    <div className="pt-40 min-h-screen bg-[#FAFAFA] pb-32">
      
      {/* Header */}
      <div className="container mx-auto px-6 mb-20 text-center">
        <h1 className="text-6xl md:text-8xl font-black font-['Oswald'] uppercase mb-6 text-dark tracking-tight">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-800">Collection</span>
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          Curated essentials for the modern lifestyle. Quality meets performance in every stitch.
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-16">
        
        {/* Sidebar */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="sticky top-32 space-y-10">
            
            {/* Search */}
            <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-transparent border-b-2 border-gray-200 focus:border-primary outline-none transition-colors text-lg"
                />
                <Search className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>

            {/* Categories */}
            <div>
              <div className="flex items-center gap-2 mb-6 text-dark border-b border-gray-100 pb-2">
                <Filter size={18} />
                <h3 className="font-bold uppercase tracking-widest text-sm">Categories</h3>
              </div>
              <div className="space-y-3">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`block w-full text-left py-2 transition-all text-sm uppercase tracking-wider group flex items-center justify-between ${
                      activeCategory === cat 
                      ? 'text-primary font-bold pl-2' 
                      : 'text-gray-500 hover:text-dark'
                    }`}
                  >
                    {cat}
                    {activeCategory === cat && <ArrowRight size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
               <div className="flex items-center gap-2 mb-6 text-dark border-b border-gray-100 pb-2">
                  <SlidersHorizontal size={18} />
                  <h3 className="font-bold uppercase tracking-widest text-sm">Sort By</h3>
               </div>
               <select 
                 value={sortBy}
                 onChange={(e) => setSortBy(e.target.value)}
                 className="w-full bg-transparent border-none text-sm text-gray-500 focus:ring-0 cursor-pointer hover:text-dark transition-colors p-0"
                >
                 <option value="featured">Featured</option>
                 <option value="low">Price: Low to High</option>
                 <option value="high">Price: High to Low</option>
               </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div ref={listRef} className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-gray-300 rounded-3xl">
              <p className="text-xl text-gray-400 mb-4">No products found matching your criteria.</p>
              <button onClick={() => {setSearchQuery(''); setActiveCategory('All')}} className="text-primary font-bold uppercase tracking-widest text-sm hover:underline">Clear all filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card group flex flex-col">
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-2xl mb-6">
                    <Link to={`/product/${product.id}`}>
                        <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform"
                        />
                    </Link>
                    
                    {/* Floating Badge */}
                    <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold shadow-sm">
                      <Star size={12} className="text-primary fill-primary" />
                      {product.rating}
                    </div>
                    
                    {/* Add to Cart Overlay Button */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                      className="absolute bottom-4 right-4 w-12 h-12 bg-white text-dark rounded-full shadow-xl flex items-center justify-center translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out hover:bg-primary hover:text-white"
                    >
                      <ShoppingBag size={20} />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-xs text-primary font-bold uppercase tracking-widest">{product.category}</p>
                        <span className="text-lg font-bold text-dark">${product.price}</span>
                    </div>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-2xl font-bold font-['Oswald'] text-dark mb-1 leading-tight group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;