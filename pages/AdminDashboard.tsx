import React, { useState } from 'react';
import { useApp } from '../store';
import { Navigate } from 'react-router-dom';
import { 
  Trash2, Plus, Package, DollarSign, ShoppingBag, Edit, CheckCircle, Clock, Truck, X, Search, 
  LayoutDashboard, Users, FileText, CreditCard, Settings, ChevronDown, MoreHorizontal, Bell,
  TrendingUp, Calendar, PieChart, Filter
} from 'lucide-react';
import { Product, Order } from '../types';

const AdminDashboard: React.FC = () => {
  const { user, products, orders, deleteProduct, addProduct, updateProduct, updateOrderStatus } = useApp();
  const [activeView, setActiveView] = useState<'dashboard' | 'products' | 'orders'>('dashboard');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Product Form State
  const [productForm, setProductForm] = useState<Partial<Product>>({
     name: '', price: 0, category: 'Apparel', description: '', image: 'https://picsum.photos/800/800'
  });

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  // Stats Calculation
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const pendingOrders = orders.filter(o => o.status === 'Processing').length;

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setProductForm({ name: '', price: 0, category: 'Apparel', description: '', image: 'https://picsum.photos/800/800' });
    setShowProductModal(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setProductForm(product);
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct({ ...editingProduct, ...productForm } as Product);
    } else {
      const product: Product = {
        id: Date.now(),
        name: productForm.name || 'New Product',
        price: Number(productForm.price) || 0,
        category: productForm.category || 'Uncategorized',
        image: productForm.image || 'https://picsum.photos/800/800',
        description: productForm.description || '',
        rating: 5,
        reviews: 0,
        features: ['New Arrival']
      };
      addProduct(product);
    }
    setShowProductModal(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-['Manrope']">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F1115] text-white flex-shrink-0 fixed h-full z-20 overflow-y-auto hidden md:flex flex-col">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold font-['Oswald']">A</div>
            <span className="font-bold text-lg font-['Oswald'] tracking-wide">PrintBuy</span>
          </div>

          <div className="relative mb-8">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
             <input 
               type="text" 
               placeholder="Search" 
               className="w-full bg-[#1F2125] text-sm text-gray-300 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary placeholder-gray-600"
             />
             <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#2A2D32] p-1 rounded-md text-gray-400 hover:text-white">
               <Plus size={14} />
             </button>
          </div>

          <div className="space-y-8">
            <div>
               <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Operations</h3>
               <nav className="space-y-1">
                 <button 
                   onClick={() => setActiveView('dashboard')}
                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeView === 'dashboard' ? 'bg-[#1F2125] text-primary' : 'text-gray-400 hover:text-white hover:bg-[#1F2125]'}`}
                 >
                   <LayoutDashboard size={18} /> Dashboard
                 </button>
                 <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-[#1F2125] transition-all">
                   <Calendar size={18} /> Schedules
                 </button>
                 <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-[#1F2125] transition-all">
                   <Users size={18} /> Team Members
                 </button>
                 <button 
                   onClick={() => setActiveView('products')}
                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeView === 'products' ? 'bg-[#1F2125] text-primary' : 'text-gray-400 hover:text-white hover:bg-[#1F2125]'}`}
                 >
                   <Package size={18} /> Items
                 </button>
               </nav>
            </div>

            <div>
               <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Client Management</h3>
               <nav className="space-y-1">
                 <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-[#1F2125] transition-all">
                   <Users size={18} /> Clients
                 </button>
                 <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-[#1F2125] transition-all">
                   <FileText size={18} /> Estimates
                 </button>
               </nav>
            </div>

            <div>
               <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Financials</h3>
               <nav className="space-y-1">
                 <button 
                   onClick={() => setActiveView('orders')}
                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeView === 'orders' ? 'bg-[#1F2125] text-primary' : 'text-gray-400 hover:text-white hover:bg-[#1F2125]'}`}
                 >
                   <CreditCard size={18} /> Invoices
                 </button>
                 <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-[#1F2125] transition-all">
                   <DollarSign size={18} /> Payments
                 </button>
                 <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-[#1F2125] transition-all">
                   <PieChart size={18} /> Expenses
                 </button>
               </nav>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto p-6 border-t border-[#1F2125]">
          <button className="flex items-center gap-3 text-gray-400 hover:text-white mb-6 text-sm font-medium">
             <Settings size={18} /> Settings
          </button>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gray-700 rounded-full overflow-hidden">
               <img src={`https://ui-avatars.com/api/?name=${user.name}&background=059669&color=fff`} alt="User" />
             </div>
             <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold text-white truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
             </div>
             <ChevronDown size={14} className="text-gray-500" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8 pt-24 md:pt-8 min-h-screen">
        
        {/* Top Header */}
        <div className="flex justify-between items-center mb-8">
           <h1 className="text-3xl font-bold text-gray-900 font-['Manrope']">
              {activeView === 'dashboard' && 'Dashboard'}
              {activeView === 'products' && 'Items Management'}
              {activeView === 'orders' && 'Invoices & Orders'}
           </h1>
           <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 shadow-sm">
                 <Filter size={16} /> Advanced Search <ChevronDown size={14} />
              </button>
              <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 shadow-sm relative">
                 <Bell size={20} />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
           </div>
        </div>

        {activeView === 'dashboard' && (
          <div className="space-y-6">
            
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
               {[
                  { label: 'Outstanding invoices', value: `$${totalRevenue.toFixed(0)}`, change: '+1.45%', positive: true },
                  { label: 'Amount due', value: '$120,195', change: '+2.11%', positive: true },
                  { label: 'Customers', value: user.role === 'admin' ? '6' : '1', change: '-1.76%', positive: false },
                  { label: 'Invoices', value: totalOrders.toString(), change: '+4.11%', positive: true },
                  { label: 'Estimates', value: '4', change: '+1.45%', positive: true },
               ].map((stat, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative group hover:-translate-y-1 transition-transform duration-300">
                     <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-gray-500">{stat.label}</span>
                        <MoreHorizontal size={16} className="text-gray-300 cursor-pointer hover:text-gray-600" />
                     </div>
                     <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                     <div className="flex items-center gap-2 text-xs">
                        <span className={`flex items-center ${stat.positive ? 'text-green-600' : 'text-red-500'} font-bold`}>
                           {stat.positive ? <TrendingUp size={12} className="mr-1" /> : <TrendingUp size={12} className="mr-1 rotate-180" />}
                           {stat.change}
                        </span>
                        <span className="text-gray-400">vs last 30 days</span>
                     </div>
                  </div>
               ))}
            </div>

            {/* Middle Section: Chart + Widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               
               {/* Chart */}
               <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="font-bold text-gray-900">Revenue Overview</h3>
                     <select className="bg-gray-50 border-none rounded-lg text-sm text-gray-500 py-1 px-3 focus:ring-0 cursor-pointer">
                        <option>Last 6 Months</option>
                        <option>This Year</option>
                     </select>
                  </div>
                  {/* Mock Chart */}
                  <div className="w-full h-80 relative flex items-end justify-between px-2 overflow-hidden">
                     {/* SVG Background for Wave */}
                     <svg className="absolute bottom-0 left-0 w-full h-64 z-0 opacity-20" preserveAspectRatio="none" viewBox="0 0 1440 320">
                        <path fill="#059669" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                     </svg>
                     <svg className="absolute bottom-0 left-0 w-full h-64 z-0 opacity-20" preserveAspectRatio="none" viewBox="0 0 1440 320">
                        <path fill="#34D399" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                     </svg>
                     
                     {/* Grid lines */}
                     <div className="absolute inset-0 z-0 flex flex-col justify-between py-6 pointer-events-none">
                        {[1,2,3,4,5].map(i => <div key={i} className="w-full border-t border-dashed border-gray-100 h-px"></div>)}
                     </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-4 px-2">
                     <span>Feb 20</span><span>Feb 21</span><span>Feb 22</span><span>Feb 23</span><span>Feb 24</span><span>Feb 25</span>
                  </div>
               </div>

               {/* Right Widgets */}
               <div className="space-y-6">
                  {/* Sales Widget */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                     <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                           <ShoppingBag size={18} className="text-gray-400" />
                           <span className="font-bold text-gray-700">Sales</span>
                        </div>
                        <input type="checkbox" checked readOnly className="rounded text-primary focus:ring-primary cursor-pointer" />
                     </div>
                     <h3 className="text-2xl font-bold text-gray-900 mb-1">C$ 7,986.15</h3>
                  </div>
                  
                  {/* Receipts Widget */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                     <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                           <FileText size={18} className="text-gray-400" />
                           <span className="font-bold text-gray-700">Receipts</span>
                        </div>
                        <input type="checkbox" checked readOnly className="rounded text-primary focus:ring-primary cursor-pointer" />
                     </div>
                     <h3 className="text-2xl font-bold text-gray-900 mb-1">C$ 5,191.15</h3>
                     <div className="w-full bg-gray-100 rounded-full h-1.5 mt-4 overflow-hidden">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: '65%' }}></div>
                     </div>
                  </div>

                  {/* Net Income Widget */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                     <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                           <DollarSign size={18} className="text-gray-400" />
                           <span className="font-bold text-gray-700">Net income</span>
                        </div>
                     </div>
                     <h3 className="text-2xl font-bold text-gray-900 mb-1">C$ 4,191.15</h3>
                  </div>
               </div>
            </div>

            {/* Bottom Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               {/* Due Invoices */}
               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                     <h3 className="font-bold text-gray-900">Due Invoice</h3>
                     <button onClick={() => setActiveView('orders')} className="text-xs font-bold text-primary hover:underline flex items-center gap-1">View all <ArrowRightIcon /></button>
                  </div>
                  <table className="w-full text-left text-sm">
                     <thead className="text-gray-400 font-medium">
                        <tr>
                           <th className="p-4 pl-6 font-normal">Date</th>
                           <th className="p-4 font-normal">Client</th>
                           <th className="p-4 font-normal">Amount due</th>
                           <th className="p-4 pr-6 font-normal text-right">Status</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {orders.slice(0, 3).map(order => (
                           <tr key={order.id} className="hover:bg-gray-50">
                              <td className="p-4 pl-6 text-gray-600 font-medium">{order.date}</td>
                              <td className="p-4 text-primary font-bold hover:underline cursor-pointer">{order.customer.name}</td>
                              <td className="p-4 font-bold text-gray-900">${order.total.toFixed(2)}</td>
                              <td className="p-4 pr-6 text-right">
                                 <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                                    ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                                      order.status === 'Shipped' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    {order.status === 'Processing' ? 'Accepted' : order.status}
                                 </span>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

               {/* Recent Estimates */}
               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                     <h3 className="font-bold text-gray-900">Recent estimates</h3>
                     <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">View all <ArrowRightIcon /></button>
                  </div>
                  <table className="w-full text-left text-sm">
                     <thead className="text-gray-400 font-medium">
                        <tr>
                           <th className="p-4 pl-6 font-normal">Date</th>
                           <th className="p-4 font-normal">Client</th>
                           <th className="p-4 font-normal">Total</th>
                           <th className="p-4 pr-6 font-normal text-right">Status</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {orders.slice(0, 3).reverse().map(order => (
                           <tr key={order.id} className="hover:bg-gray-50">
                              <td className="p-4 pl-6 text-gray-600 font-medium">{order.date}</td>
                              <td className="p-4 text-primary font-bold hover:underline cursor-pointer">{order.customer.name}</td>
                              <td className="p-4 font-bold text-gray-900">${(order.total * 1.2).toFixed(2)}</td>
                              <td className="p-4 pr-6 text-right">
                                 <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-green-50 text-green-600">
                                    Accepted
                                 </span>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
          </div>
        )}

        {/* PRODUCTS VIEW */}
        {activeView === 'products' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-2">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div className="flex gap-4">
                  <button className="text-sm font-bold text-gray-900 border-b-2 border-primary pb-1">All Items</button>
                  <button className="text-sm font-medium text-gray-500 hover:text-gray-900 pb-1">Low Stock</button>
                  <button className="text-sm font-medium text-gray-500 hover:text-gray-900 pb-1">Categories</button>
                </div>
                <button 
                  onClick={handleOpenAdd}
                  className="px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:bg-secondary transition-colors flex items-center gap-2"
                >
                   <Plus size={16} /> New Item
                </button>
             </div>
             <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs font-bold uppercase text-gray-500">
                   <tr>
                      <th className="p-4 pl-6">Item Details</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4 text-right pr-6">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {products.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                         <td className="p-4 pl-6 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                               <img src={product.image} className="w-full h-full object-cover" alt="" />
                            </div>
                            <span className="font-bold text-gray-900">{product.name}</span>
                         </td>
                         <td className="p-4 text-sm text-gray-600">{product.category}</td>
                         <td className="p-4 font-bold text-gray-900">${product.price}</td>
                         <td className="p-4 pr-6 text-right flex justify-end gap-2">
                            <button 
                              onClick={() => handleOpenEdit(product)}
                              className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                            >
                               <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => deleteProduct(product.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                               <Trash2 size={16} />
                            </button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        )}

        {/* ORDERS VIEW */}
        {activeView === 'orders' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-2">
             <div className="p-6 border-b border-gray-100">
                <div className="flex gap-4">
                  <button className="text-sm font-bold text-gray-900 border-b-2 border-primary pb-1">All Invoices</button>
                  <button className="text-sm font-medium text-gray-500 hover:text-gray-900 pb-1">Drafts</button>
                  <button className="text-sm font-medium text-gray-500 hover:text-gray-900 pb-1">Recurring</button>
                </div>
             </div>
             <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs font-bold uppercase text-gray-500">
                   <tr>
                      <th className="p-4 pl-6">Invoice #</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right pr-6">Manage</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {orders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                         <td className="p-4 pl-6 font-bold text-gray-900">#{order.id}</td>
                         <td className="p-4 text-sm">
                            <p className="font-bold text-primary hover:underline cursor-pointer">{order.customer?.name || 'Guest'}</p>
                            <p className="text-gray-400 text-xs">{order.customer?.email}</p>
                         </td>
                         <td className="p-4 text-sm text-gray-600">{order.date}</td>
                         <td className="p-4 font-bold text-gray-900">${order.total.toFixed(2)}</td>
                         <td className="p-4">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase
                              ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                              }`}>
                              {order.status === 'Delivered' && <CheckCircle size={12}/>}
                              {order.status === 'Shipped' && <Truck size={12}/>}
                              {order.status === 'Processing' && <Clock size={12}/>}
                              {order.status}
                            </span>
                         </td>
                         <td className="p-4 pr-6 text-right">
                            <select 
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                              className="bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold uppercase p-2 focus:ring-1 focus:ring-primary cursor-pointer outline-none"
                            >
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        )}

        {/* Product Modal */}
        {showProductModal && (
           <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
              <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95">
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold font-['Oswald'] uppercase">{editingProduct ? 'Edit Item' : 'Add New Item'}</h2>
                    <button onClick={() => setShowProductModal(false)} className="text-gray-400 hover:text-dark"><X size={24}/></button>
                 </div>
                 <form onSubmit={handleSaveProduct} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Item Name</label>
                      <input 
                        className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all" 
                        placeholder="Apex Runner"
                        value={productForm.name}
                        onChange={e => setProductForm({...productForm, name: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Price</label>
                          <input 
                            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all" 
                            placeholder="199.00"
                            type="number"
                            value={productForm.price}
                            onChange={e => setProductForm({...productForm, price: Number(e.target.value)})}
                            required 
                          />
                       </div>
                       <div>
                          <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Category</label>
                          <select 
                            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                            value={productForm.category}
                            onChange={e => setProductForm({...productForm, category: e.target.value})}
                          >
                              <option>Footwear</option>
                              <option>Apparel</option>
                              <option>Accessories</option>
                              <option>Electronics</option>
                          </select>
                       </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Image URL</label>
                      <input 
                        className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none transition-all" 
                        placeholder="https://..."
                        value={productForm.image}
                        onChange={e => setProductForm({...productForm, image: e.target.value})}
                      />
                    </div>
                    <div>
                       <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Description</label>
                       <textarea 
                         className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary h-24 outline-none transition-all" 
                         placeholder="Product details..."
                         value={productForm.description}
                         onChange={e => setProductForm({...productForm, description: e.target.value})}
                       ></textarea>
                    </div>
                    
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                       <button type="button" onClick={() => setShowProductModal(false)} className="px-6 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-lg uppercase text-sm">Cancel</button>
                       <button type="submit" className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-secondary uppercase text-sm shadow-lg shadow-primary/30">Save Item</button>
                    </div>
                 </form>
              </div>
           </div>
        )}
      </main>
    </div>
  );
};

const ArrowRightIcon = () => (
   <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 6H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 2.5L9.5 6L6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
   </svg>
)

export default AdminDashboard;