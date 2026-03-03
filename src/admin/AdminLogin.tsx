import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail } from 'lucide-react';
import { motion } from 'motion/react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock login delay
    setTimeout(() => {
      navigate('/admin');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[56px] p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border-2 border-white/5 relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl" />
        
        <div className="text-center mb-12 relative z-10">
          <div className="w-24 h-24 bg-blue-600 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-900/40 group">
            <ShieldCheck size={48} className="text-white group-hover:scale-110 transition-transform" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">ADMIN COMMAND</h1>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
            <p className="text-blue-600 font-black tracking-[0.2em] text-[10px] uppercase">Partido 360 Resilience System</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-8 relative z-10">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="admin@partido360.gov"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 bg-gray-50 border-2 border-gray-100 rounded-[24px] focus:border-blue-600 focus:ring-0 transition-all font-bold text-gray-700 shadow-sm placeholder:text-gray-300"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Access Password</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 bg-gray-50 border-2 border-gray-100 rounded-[24px] focus:border-blue-600 focus:ring-0 transition-all font-bold text-gray-700 shadow-sm placeholder:text-gray-300"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-6 rounded-[24px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-900/20 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Authenticating...
              </>
            ) : (
              'Login to Command Center'
            )}
          </button>

          <div className="text-center">
            <button type="button" className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-colors">
              Forgot Access Credentials?
            </button>
          </div>
        </form>

        <div className="mt-12 pt-10 border-t-2 border-gray-50 text-center relative z-10">
          <p className="text-[8px] font-black text-gray-300 uppercase tracking-[0.3em]">
            Authorized Personnel Only • Secure Session
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
