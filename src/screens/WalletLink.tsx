import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSystem } from '../context/SystemContext';
import { Wallet, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const WalletLink = () => {
  const { profile, updateProfile } = useSystem();
  const navigate = useNavigate();
  const [linking, setLinking] = useState<string | null>(null);

  const wallets = [
    { name: 'GCash', color: 'bg-blue-600', icon: 'G' },
    { name: 'Maya', color: 'bg-green-600', icon: 'M' },
    { name: 'Landbank', color: 'bg-red-700', icon: 'L' },
  ];

  const handleLink = async (wallet: string) => {
    setLinking(wallet);
    // Simulate linking
    setTimeout(async () => {
      await updateProfile({ wallet });
      setLinking(null);
    }, 1500);
  };

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      <header className="space-y-2">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Financial Link</h1>
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Connect your wallet</p>
      </header>

      <div className="space-y-4 animate-slide-up">
        {wallets.map((w, i) => (
          <motion.button
            key={w.name}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => handleLink(w.name)}
            disabled={!!linking || profile?.wallet === w.name}
            className={`w-full p-6 rounded-[32px] border-2 transition-all flex items-center justify-between group ${
              profile?.wallet === w.name
                ? 'border-blue-600 bg-blue-50 shadow-lg shadow-blue-100'
                : 'border-gray-100 hover:border-blue-200 bg-white shadow-sm'
            }`}
          >
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 ${w.color} rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl group-hover:scale-110 transition-transform`}>
                {w.icon}
              </div>
              <div className="text-left">
                <p className="font-black text-gray-900 text-lg">{w.name}</p>
                <p className={`text-[10px] font-black uppercase tracking-widest ${
                  profile?.wallet === w.name ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  {profile?.wallet === w.name ? 'Connected' : 'Tap to Link'}
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
              {profile?.wallet === w.name ? (
                <CheckCircle2 className="text-blue-600" size={20} />
              ) : linking === w.name ? (
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <ArrowRight className="text-gray-300 group-hover:text-blue-600 transition-colors" size={20} />
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-900 p-8 rounded-[40px] text-white shadow-2xl shadow-gray-200 relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-blue-400">
            <Wallet size={20} />
          </div>
          <p className="font-black text-sm uppercase tracking-widest">Anticipatory Grant</p>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed font-bold uppercase tracking-wider">
          If your risk level is <span className="text-red-400">HIGH</span> and a storm advisory is issued, you will receive <span className="text-white text-lg font-black">₱1,500</span> automatically to your linked wallet.
        </p>
      </motion.div>

      {profile?.wallet && (
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onClick={() => navigate('/')}
          className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-black uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all"
        >
          Go to Dashboard
        </motion.button>
      )}
    </div>
  );
};

export default WalletLink;
