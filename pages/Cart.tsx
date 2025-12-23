import React, { useState } from 'react';
import { useApp } from '../store';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useApp();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-gray-50">
         <ShoppingBag size={64} className="text-gray-300 mb-6" />
         <h1 className="text-4xl font-black font-['Oswald'] uppercase mb-4">Your Bag is Empty</h1>
         <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
         <Link to="/shop" className="px-10 py-4 bg-dark text-white rounded-full font-bold uppercase tracking-wider hover:bg-primary transition-colors">
            Start Shopping
         </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="container mx-auto px-6">
         <h1 className="text-5xl font-black font-['Oswald'] uppercase mb-12">Shopping Bag</h1>
         
         <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Cart Items */}
            <div className="flex-1 space-y-6">
               <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="hidden md:grid grid-cols-12 gap-4 p-6 bg-gray-50 border-b border-gray-100 text-xs font-bold uppercase text-gray-500">
                     <div className="col-span-6">Product</div>
                     <div className="col-span-2 text-center">Price</div>
                     <div className="col-span-2 text-center">Quantity</div>
                     <div className="col-span-2 text-right">Total</div>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                     {cart.map(item => (
                        <div key={item.id} className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                           <div className="col-span-12 md:col-span-6 flex gap-4">
                              <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex flex-col justify-center">
                                 <h3 className="font-bold text-lg">{item.name}</h3>
                                 <p className="text-gray-500 text-sm">{item.category}</p>
                                 <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm flex items-center gap-1 mt-2 hover:underline">
                                    <Trash2 size={14} /> Remove
                                 </button>
                              </div>
                           </div>
                           
                           <div className="col-span-4 md:col-span-2 text-center font-bold">
                              ${item.price}
                           </div>
                           
                           <div className="col-span-4 md:col-span-2 flex justify-center">
                              <div className="flex items-center border border-gray-200 rounded-lg">
                                 <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-gray-50"><Minus size={14}/></button>
                                 <span className="w-8 text-center font-bold">{item.quantity}</span>
                                 <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-gray-50"><Plus size={14}/></button>
                              </div>
                           </div>
                           
                           <div className="col-span-4 md:col-span-2 text-right font-bold text-primary text-lg">
                              ${(item.price * item.quantity).toFixed(2)}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               
               <div className="flex justify-between">
                  <Link to="/shop" className="text-dark font-bold hover:underline">Continue Shopping</Link>
               </div>
            </div>

            {/* Summary */}
            <div className="w-full lg:w-96">
               <div className="bg-white p-8 rounded-2xl shadow-sm sticky top-32">
                  <h2 className="text-xl font-bold uppercase mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                     <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-bold text-dark">${cartTotal.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="font-bold text-primary">Free</span>
                     </div>
                     <div className="flex justify-between text-gray-600">
                        <span>Tax (Estimated)</span>
                        <span className="font-bold text-dark">$0.00</span>
                     </div>
                  </div>
                  
                  <div className="border-t border-b border-gray-100 py-6 mb-6">
                     <div className="flex justify-between items-center">
                        <span className="font-bold text-lg uppercase">Total</span>
                        <span className="font-black text-3xl font-['Oswald']">${cartTotal.toFixed(2)}</span>
                     </div>
                  </div>
                  
                  <div className="mb-6">
                     <div className="flex gap-2">
                        <input 
                           type="text" 
                           placeholder="Coupon Code" 
                           value={coupon}
                           onChange={(e) => setCoupon(e.target.value)}
                           className="flex-1 bg-gray-50 border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary"
                        />
                        <button className="px-4 bg-gray-200 text-gray-600 font-bold rounded-lg hover:bg-gray-300 text-xs uppercase">Apply</button>
                     </div>
                  </div>
                  
                  <button 
                    onClick={() => navigate('/checkout')}
                    className="w-full py-4 bg-primary text-white rounded-xl font-bold uppercase tracking-wider hover:bg-secondary transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 group"
                  >
                     Checkout <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Cart;