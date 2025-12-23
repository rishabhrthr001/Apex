export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Order {
  id: string;
  date: string;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
  };
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  search: string;
  sort: 'featured' | 'price-low' | 'price-high';
}