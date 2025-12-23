import React, { useState } from 'react';
import { useApp } from '../store';
import { ArrowLeft, CreditCard, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart, addOrder } = useApp();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Redirect if empty and not success
  if (cart.length === 0 && !success) {
     return (
        <div className="min-h-screen pt-32 flex flex-col items-center justify-center">
           <p className="text-xl mb-4">Your cart is empty.</p>
           <Link to="/shop" className="text-primary font-bold">Return to Shop</Link>
        </div>
     )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setLoading(true);
      // Simulate Stripe processing
      setTimeout(() => {
        addOrder(cart, cartTotal, {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          address: formData.address,
          city: formData.city
        });
        setLoading(false);
        setSuccess(true);
        clearCart(); 
        localStorage.removeItem('apex_cart'); 
      }, 2000);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-lg w-full animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 animate-bounce">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-4xl font-black font-['Oswald'] uppercase mb-4 text-dark">Order Confirmed!</h2>
          <p className="text-gray-500 mb-8">Thank you for your purchase. We have sent a confirmation email to your inbox.</p>
          <div className="flex flex-col gap-4">
             <Link to="/dashboard" className="inline-block px-8 py-3 bg-gray-100 text-dark rounded-full font-bold uppercase hover:bg-gray-200">
               View Order in Dashboard
             </Link>
             <Link to="/" className="inline-block px-8 py-3 bg-dark text-white rounded-full font-bold uppercase hover:bg-gray-900">
               Back to Home
             </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Form Side */}
          <div>
            <Link to="/cart" className="flex items-center text-gray-500 hover:text-dark mb-8">
              <ArrowLeft size={20} className="mr-2" /> Back to Cart
            </Link>
            
            <div className="mb-8">
              <h1 className="text-4xl font-black font-['Oswald'] uppercase mb-2">Checkout</h1>
              <div className="flex gap-2">
                <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-gray-200'}`} />
                <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm">
              {step === 1 ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <h2 className="text-xl font-bold uppercase">Shipping Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input name="firstName" required type="text" placeholder="First Name" onChange={handleInputChange} value={formData.firstName} className="w-full p-4 bg-gray-50 rounded-lg border-transparent focus:border-primary focus:bg-white focus:ring-0 transition-all" />
                    <input name="lastName" required type="text" placeholder="Last Name" onChange={handleInputChange} value={formData.lastName} className="w-full p-4 bg-gray-50 rounded-lg border-transparent focus:border-primary focus:bg-white focus:ring-0 transition-all" />
                  </div>
                  <input name="email" required type="email" placeholder="Email Address" onChange={handleInputChange} value={formData.email} className="w-full p-4 bg-gray-50 rounded-lg border-transparent focus:border-primary focus:bg-white focus:ring-0 transition-all" />
                  <input name="address" required type="text" placeholder="Address" onChange={handleInputChange} value={formData.address} className="w-full p-4 bg-gray-50 rounded-lg border-transparent focus:border-primary focus:bg-white focus:ring-0 transition-all" />
                  <div className="grid grid-cols-2 gap-4">
                    <input name="city" required type="text" placeholder="City" onChange={handleInputChange} value={formData.city} className="w-full p-4 bg-gray-50 rounded-lg border-transparent focus:border-primary focus:bg-white focus:ring-0 transition-all" />
                    <input name="zip" required type="text" placeholder="ZIP Code" onChange={handleInputChange} value={formData.zip} className="w-full p-4 bg-gray-50 rounded-lg border-transparent focus:border-primary focus:bg-white focus:ring-0 transition-all" />
                  </div>
                  <button type="submit" className="w-full py-4 bg-dark text-white rounded-lg font-bold uppercase hover:bg-gray-900 transition-colors">
                    Continue to Payment
                  </button>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <h2 className="text-xl font-bold uppercase">Payment</h2>
                  <div className="p-4 border-2 border-primary bg-primary/5 rounded-lg flex items-center gap-4 mb-4">
                    <CreditCard className="text-primary" />
                    <span className="font-medium">Credit Card (Stripe Test Mode)</span>
                  </div>
                  <input required type="text" placeholder="Card Number" className="w-full p-4 bg-gray-50 rounded-lg border-transparent focus:border-primary focus:bg-white focus:ring-0 transition-all" />
                  <div className="grid grid-cols-2 gap-4">
                    <input required type="text" placeholder="MM/YY" className="w-full p-4 bg-gray-50 rounded-lg border-transparent focus:border-primary focus:bg-white focus:ring-0 transition-all" />
                    <input required type="text" placeholder="CVC" className="w-full p-4 bg-gray-50 rounded-lg border-transparent focus:border-primary focus:bg-white focus:ring-0 transition-all" />
                  </div>
                  <button disabled={loading} type="submit" className="w-full py-4 bg-primary text-white rounded-lg font-bold uppercase hover:bg-secondary transition-colors flex justify-center">
                    {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"/> : `Pay $${cartTotal.toFixed(2)}`}
                  </button>
                  <button type="button" onClick={() => setStep(1)} className="w-full text-center text-gray-500 hover:text-dark text-sm">Return to Shipping</button>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary Side */}
          <div className="bg-white p-8 rounded-2xl shadow-sm h-fit">
            <h2 className="text-xl font-bold uppercase mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                     <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="text-primary font-bold">Free</span>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between items-center">
              <span className="font-bold text-lg uppercase">Total</span>
              <span className="font-bold text-2xl font-['Oswald']">${cartTotal.toFixed(2)}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;