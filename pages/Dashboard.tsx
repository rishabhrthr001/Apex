import React from 'react';
import { useApp } from '../store';
import { Link, Navigate } from 'react-router-dom';
import { Package, MapPin, CreditCard, LogOut } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, orders, logout } = useApp();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0 space-y-4">
             <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold mb-4">
                   {user.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="font-bold text-lg truncate">{user.name}</h2>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-2">
                   <button className="flex items-center gap-3 text-primary font-bold text-sm bg-primary/5 p-2 rounded-lg"><Package size={16}/> Orders</button>
                   <button className="flex items-center gap-3 text-gray-500 hover:text-dark font-medium text-sm p-2 rounded-lg"><MapPin size={16}/> Addresses</button>
                   <button className="flex items-center gap-3 text-gray-500 hover:text-dark font-medium text-sm p-2 rounded-lg"><CreditCard size={16}/> Payments</button>
                   <button onClick={logout} className="flex items-center gap-3 text-red-500 hover:text-red-700 font-medium text-sm p-2 rounded-lg"><LogOut size={16}/> Logout</button>
                </div>
             </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-3xl font-black font-['Oswald'] uppercase mb-8">Order History</h1>
            
            {orders.length === 0 ? (
               <div className="bg-white p-12 rounded-2xl shadow-sm text-center">
                  <Package size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-bold mb-2">No orders yet</h3>
                  <p className="text-gray-500 mb-6">Start shopping to see your orders here.</p>
                  <Link to="/shop" className="inline-block px-8 py-3 bg-dark text-white rounded-full font-bold uppercase">Browse Shop</Link>
               </div>
            ) : (
              <div className="space-y-6">
                 {orders.map(order => (
                   <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                      <div className="flex flex-wrap justify-between items-center mb-6 pb-6 border-b border-gray-100">
                         <div>
                            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Order ID</p>
                            <p className="font-bold text-dark">#{order.id}</p>
                         </div>
                         <div>
                            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Date</p>
                            <p className="font-medium">{order.date}</p>
                         </div>
                         <div>
                            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Total</p>
                            <p className="font-bold text-primary">${order.total.toFixed(2)}</p>
                         </div>
                         <div>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase">
                               {order.status}
                            </span>
                         </div>
                      </div>
                      
                      <div className="space-y-4">
                         {order.items.map(item => (
                            <div key={item.id} className="flex gap-4 items-center">
                               <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                               </div>
                               <div className="flex-1">
                                  <h4 className="font-bold text-sm">{item.name}</h4>
                                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                               </div>
                               <p className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                         ))}
                      </div>
                   </div>
                 ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;