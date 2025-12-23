import React, { useState } from 'react';
import { useApp } from '../store';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email, 'user');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md animate-in fade-in slide-in-from-bottom-10 duration-700">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black font-['Oswald'] uppercase mb-2">Join Apex</h1>
          <p className="text-gray-500">Create an account to start shopping</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
             <label className="block text-sm font-bold uppercase text-gray-700 mb-2">Full Name</label>
             <input 
               type="text" 
               required
               value={name}
               onChange={(e) => setName(e.target.value)}
               className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-0 outline-none transition-all"
               placeholder="John Doe"
             />
          </div>
          <div>
             <label className="block text-sm font-bold uppercase text-gray-700 mb-2">Email</label>
             <input 
               type="email" 
               required
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-0 outline-none transition-all"
               placeholder="john@example.com"
             />
          </div>
          <div>
             <label className="block text-sm font-bold uppercase text-gray-700 mb-2">Password</label>
             <input 
               type="password" 
               required
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-0 outline-none transition-all"
               placeholder="••••••••"
             />
          </div>
          
          <button type="submit" className="w-full bg-primary text-white py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-secondary transition-colors flex items-center justify-center gap-2">
             <UserPlus size={20} /> Create Account
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;