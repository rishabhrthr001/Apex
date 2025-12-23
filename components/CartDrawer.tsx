import React, { useRef, useEffect } from 'react';
import { useApp } from '../store';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useApp();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCartOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.5, display: 'block', ease: "power2.out" });
      gsap.to(drawerRef.current, { x: '0%', duration: 0.6, ease: "power3.out" }); // Premium ease
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, ease: "power2.in", onComplete: () => {
         if (overlayRef.current) overlayRef.current.style.display = 'none';
      }});
      gsap.to(drawerRef.current, { x: '100%', duration: 0.5, ease: "power3.in" });
    }
  }, [isCartOpen]);

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none">
      {/* Overlay */}
      <div 
        ref={overlayRef}
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-dark/60 opacity-0 hidden pointer-events-auto backdrop-blur-sm"
      />

      {/* Drawer */}
      <div 
        ref={drawerRef}
        className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transform translate-x-full pointer-events-auto flex flex-col"
      >
        {/* Header */}
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white z-10">
          <h2 className="text-3xl font-black font-['Oswald'] uppercase">Your Bag <span className="text-primary">({cart.length})</span></h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-6">
              <p className="text-xl font-light">Your bag is currently empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="px-8 py-3 bg-dark text-white rounded-full text-sm uppercase font-bold tracking-widest hover:bg-primary transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-6 group">
                <div className="w-24 h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-dark text-lg leading-tight font-['Oswald'] uppercase">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.category}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-gray-200 rounded-full px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-primary transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-primary transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-bold text-dark text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-8 border-t border-gray-100 bg-[#FAFAFA]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="text-3xl font-black font-['Oswald'] text-dark">${cartTotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-400 mb-6 text-center">Shipping & taxes calculated at checkout.</p>
            <Link 
              to="/checkout" 
              onClick={() => setIsCartOpen(false)}
              className="w-full bg-primary text-white py-5 rounded-full font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-secondary transition-all shadow-lg hover:shadow-xl group"
            >
              Checkout <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;