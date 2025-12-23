import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, Order } from './types';
import { PRODUCTS } from './data';

interface AppContextType {
  // Shop Data
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  
  // Auth
  user: User | null;
  login: (email: string, role?: 'user' | 'admin') => void;
  logout: () => void;
  
  // Orders
  orders: Order[];
  addOrder: (items: CartItem[], total: number, customer: Order['customer']) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products State (Simulate DB)
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Auth State
  const [user, setUser] = useState<User | null>(null);

  // Orders State
  const [orders, setOrders] = useState<Order[]>([]);

  // Init Data
  useEffect(() => {
    const savedCart = localStorage.getItem('apex_cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedUser = localStorage.getItem('apex_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    const savedOrders = localStorage.getItem('apex_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  // Persistence
  useEffect(() => {
    localStorage.setItem('apex_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) localStorage.setItem('apex_user', JSON.stringify(user));
    else localStorage.removeItem('apex_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('apex_orders', JSON.stringify(orders));
  }, [orders]);

  // Product Actions
  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Cart Actions
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Auth Actions
  const login = (email: string, role: 'user' | 'admin' = 'user') => {
    // Simulate API call
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      role
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('apex_user');
  };

  // Order Actions
  const addOrder = (items: CartItem[], total: number, customer: Order['customer']) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toLocaleDateString(),
      items,
      total,
      customer,
      status: 'Processing'
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  return (
    <AppContext.Provider value={{ 
      products, addProduct, updateProduct, deleteProduct,
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, isCartOpen, setIsCartOpen,
      user, login, logout,
      orders, addOrder, updateOrderStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};