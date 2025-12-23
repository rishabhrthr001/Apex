import React, { useState } from 'react';
import { useApp } from '../store';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    if (email && password) {
      // Mock admin check
      const role = email.includes('admin') ? 'admin' : 'user';
      login(email, role);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md animate-in fade-in slide-in-from-bottom-10 duration-700">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black font-['Oswald'] uppercase mb-2">Welcome Back</h1>
          <p className="text-gray-500">Sign in to access your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
             <label className="block text-sm font-bold uppercase text-gray-700 mb-2">Email</label>
             <input 
               type="email" 
               required
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-0 outline-none transition-all"
               placeholder="demo@apex.com"
             />
          </div>
          <div>
             <div className="flex justify-between mb-2">
               <label className="block text-sm font-bold uppercase text-gray-700">Password</label>
               <a href="#" className="text-xs text-primary font-bold hover:underline">Forgot?</a>
             </div>
             <input 
               type="password" 
               required
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-0 outline-none transition-all"
               placeholder="••••••••"
             />
          </div>
          
          <button type="submit" className="w-full bg-dark text-white py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-gray-900 transition-colors flex items-center justify-center gap-2">
             <LogIn size={20} /> Sign In
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Create Account</Link>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 text-blue-800 text-xs rounded-lg">
           <p><strong>Demo Hint:</strong> Use any email. Include "admin" in email to test Admin Dashboard.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;