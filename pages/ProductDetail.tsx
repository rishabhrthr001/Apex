import React, { useState, useLayoutEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../store';
import { Star, Check, Truck, Shield, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState('M');

  const product = products.find(p => p.id === Number(id));
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 3);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Cascade Text Reveal
      gsap.from(".product-info-item", {
        y: 20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.3
      });

      // Hero Image Parallax
      if(document.querySelector(".product-hero-container")) {
        gsap.to(".product-hero-image", {
          yPercent: 15, // Subtle movement
          ease: "none",
          scrollTrigger: {
            trigger: ".product-hero-container",
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, [id]);

  if (!product) return <div className="pt-40 text-center text-xl">Product not found. <Link to="/shop" className="text-primary underline">Go to Shop</Link></div>;

  return (
    <div ref={containerRef} className="pt-24 min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-6 py-8 text-xs font-bold uppercase tracking-widest text-gray-400">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link> <span className="mx-2">/</span> 
        <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link> <span className="mx-2">/</span> 
        <span className="text-dark">{product.name}</span>
      </div>

      <div className="container mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Image Section (Sticky) */}
          <div className="product-hero-container relative h-[70vh] lg:h-[85vh] bg-gray-100 rounded-[2rem] overflow-hidden sticky top-32 shadow-2xl">
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-hero-image w-full h-[120%] object-cover -mt-[10%]" // Extra height for parallax
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center py-10">
            <div className="product-info-item mb-6">
              <span className="inline-block px-4 py-2 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest rounded-full bg-primary/5">
                {product.category}
              </span>
            </div>
            
            <h1 className="product-info-item text-5xl md:text-7xl font-black font-['Oswald'] uppercase text-dark mb-6 leading-[0.9] tracking-tight">
              {product.name}
            </h1>

            <div className="product-info-item flex items-center gap-6 mb-10 pb-10 border-b border-gray-100">
              <p className="text-4xl font-bold text-dark">${product.price}</p>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-500 underline decoration-gray-300 underline-offset-4">{product.reviews} Reviews</span>
              </div>
            </div>

            <p className="product-info-item text-gray-600 text-lg md:text-xl mb-12 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Sizes */}
            {product.category !== 'Accessories' && product.category !== 'Electronics' && (
              <div className="product-info-item mb-10">
                <h3 className="text-xs font-bold uppercase mb-4 text-dark tracking-widest">Select Size</h3>
                <div className="flex gap-4">
                  {['S', 'M', 'L', 'XL'].map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-sm transition-all border ${
                        selectedSize === size 
                        ? 'border-dark bg-dark text-white scale-110 shadow-lg' 
                        : 'border-gray-200 text-gray-500 hover:border-dark hover:text-dark'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="product-info-item flex gap-4 mb-16">
              <button 
                onClick={() => addToCart(product)}
                className="flex-1 bg-primary text-white py-5 rounded-full font-bold uppercase tracking-widest hover:bg-secondary transition-all shadow-[0_10px_30px_rgba(5,150,105,0.3)] hover:shadow-[0_15px_35px_rgba(5,150,105,0.4)] hover:-translate-y-1 active:scale-95 duration-300"
              >
                Add to Cart
              </button>
            </div>

            {/* Features List */}
            <div className="product-info-item bg-[#FAFAFA] p-8 rounded-3xl border border-gray-100">
              <h3 className="font-bold uppercase mb-6 text-dark tracking-widest text-sm">Design Highlights</h3>
              <ul className="space-y-4">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-gray-600">
                    <div className="bg-white p-2 rounded-full shadow-sm text-primary">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="product-info-item flex gap-10 mt-10 px-4 text-gray-500 text-sm font-bold tracking-wide">
              <div className="flex items-center gap-3">
                <Truck size={20} className="text-dark" />
                Free Global Shipping
              </div>
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-dark" />
                2 Year Warranty
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-[#FAFAFA] py-32 border-t border-gray-100">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
               <h2 className="text-4xl md:text-5xl font-black font-['Oswald'] uppercase">Curated For You</h2>
               <Link to="/shop" className="group text-dark font-bold hover:text-primary flex items-center gap-2 uppercase tracking-widest text-sm transition-colors">
                 View Collection <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               {relatedProducts.map(rp => (
                 <Link key={rp.id} to={`/product/${rp.id}`} className="group block">
                    <div className="h-[400px] overflow-hidden bg-gray-100 rounded-2xl mb-6 relative">
                       <img src={rp.image} alt={rp.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                    </div>
                    <div>
                       <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-bold font-['Oswald'] text-xl uppercase text-dark group-hover:text-primary transition-colors">{rp.name}</h3>
                          <span className="font-bold text-gray-900">${rp.price}</span>
                       </div>
                       <p className="text-xs font-bold uppercase text-gray-400 tracking-widest">{rp.category}</p>
                    </div>
                 </Link>
               ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;