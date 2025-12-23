import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../store';
import { ShoppingBag, Menu, X, User as UserIcon, LogOut, LayoutDashboard, Package } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const Navbar: React.FC = () => {
  const { cart, setIsCartOpen, user, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  // Entrance Animation
  useEffect(() => {
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  // Click outside listener for user menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Floating Pill Navbar Container */}
      <nav ref={navRef} className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-5xl z-50 opacity-0">
        
        {/* The Pill itself */}
        <div className="bg-[#0F1115]/80 backdrop-blur-2xl border border-white/10 rounded-full pl-8 pr-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex justify-between items-center transition-all duration-500 hover:bg-[#0F1115]/90">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tighter uppercase font-['Oswald'] text-white flex-shrink-0 mr-8 group">
            Apex<span className="text-primary transition-all duration-300 group-hover:text-white">.</span>
          </Link>

          {/* Desktop Links - Centered & Pill Shaped */}
          <div className="hidden md:flex items-center space-x-1 bg-white/5 rounded-full p-1 border border-white/5 shadow-inner">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`px-6 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-500 ease-out ${
                  isActive(link.path) 
                    ? 'bg-white text-dark shadow-sm' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-3 ml-auto md:ml-0">
            
            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={() => user ? setUserMenuOpen(!userMenuOpen) : navigate('/login')}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors border border-transparent hover:border-white/10"
              >
                <UserIcon size={18} />
              </button>
              
              {user && userMenuOpen && (
                <div className="absolute right-0 top-full mt-4 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl py-2 text-dark border border-white/20 transform origin-top-right animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-5 py-4 border-b border-gray-100 mb-2">
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Signed in as</p>
                    <p className="font-bold truncate text-sm text-dark">{user.email}</p>
                  </div>
                  
                  {user.role === 'admin' && (
                    <Link to="/admin" className="flex items-center px-5 py-3 hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                      <LayoutDashboard size={16} className="mr-3 text-gray-400" /> Admin Dashboard
                    </Link>
                  )}
                  
                  <Link to="/dashboard" className="flex items-center px-5 py-3 hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                    <Package size={16} className="mr-3 text-gray-400" /> My Orders
                  </Link>
                  
                  <div className="px-2 mt-2">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center px-4 py-3 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl text-sm font-bold transition-colors"
                    >
                      <LogOut size={16} className="mr-2" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="w-10 h-10 rounded-full bg-primary hover:bg-white hover:text-dark flex items-center justify-center text-white transition-all duration-300 relative shadow-[0_4px_14px_rgba(5,150,105,0.4)] hover:shadow-none"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-dark shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-white"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Full Screen */}
      <div 
        className={`fixed inset-0 bg-dark/95 backdrop-blur-xl z-[60] transform transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] flex flex-col items-center justify-center space-y-8 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
        >
          <X size={24} />
        </button>

        <Link to="/" className="mb-8">
            <span className="text-4xl font-bold tracking-tighter uppercase font-['Oswald'] text-white">
            Apex<span className="text-primary">.</span>
            </span>
        </Link>

        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            to={link.path}
            onClick={() => setMobileMenuOpen(false)}
            className="text-4xl font-black uppercase font-['Oswald'] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 hover:to-primary transition-all duration-300"
          >
            {link.name}
          </Link>
        ))}
        
        {user ? (
          <div className="flex flex-col items-center gap-6 mt-8 w-full px-10">
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="w-full py-4 bg-white/10 text-center rounded-2xl text-lg font-bold uppercase font-['Oswald'] text-white hover:bg-white/20 border border-white/5">My Account</Link>
            <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="text-red-400 font-bold uppercase tracking-wider text-sm">Sign Out</button>
          </div>
        ) : (
           <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="px-10 py-4 bg-white text-dark rounded-full font-bold uppercase tracking-wider hover:scale-105 transition-transform mt-8 shadow-[0_10px_30px_rgba(255,255,255,0.2)]">Login / Register</Link>
        )}
      </div>
    </>
  );
};

export default Navbar;