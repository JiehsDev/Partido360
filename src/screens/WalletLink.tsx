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
    <div className="p-6 space-y-8">
      <header>
        <h1 className="text-2xl font-black text-gray-900">Financial Link</h1>
        <p className="text-gray-500">Connect your wallet to receive anticipatory cash grants.</p>
      </header>

      <div className="space-y-4">
        {wallets.map((w) => (
          <button
            key={w.name}
            onClick={() => handleLink(w.name)}
            disabled={!!linking || profile?.wallet === w.name}
            className={`w-full p-6 rounded-3xl border-2 transition-all flex items-center justify-between ${
              profile?.wallet === w.name
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-100 hover:border-blue-200 bg-white'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${w.color} rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg`}>
                {w.icon}
              </div>
              <div className="text-left">
                <p className="font-black text-gray-900">{w.name}</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                  {profile?.wallet === w.name ? 'Linked' : 'Tap to Connect'}
                </p>
              </div>
            </div>
            {profile?.wallet === w.name ? (
              <CheckCircle2 className="text-blue-500" size={24} />
            ) : linking === w.name ? (
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <ArrowRight className="text-gray-300" size={24} />
            )}
          </button>
        ))}
      </div>

      <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 space-y-3">
        <div className="flex items-center gap-3 text-blue-700">
          <Wallet size={20} />
          <p className="font-bold text-sm">Anticipatory Cash Grant</p>
        </div>
        <p className="text-xs text-blue-600 leading-relaxed font-medium">
          If your risk level is HIGH and a storm advisory is issued, you will receive ₱1,500 automatically to your linked wallet.
        </p>
      </div>

      {profile?.wallet && (
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onClick={() => navigate('/')}
          className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-black active:scale-95 transition-all"
        >
          Go to Dashboard
        </motion.button>
      )}
    </div>
  );
};

export default WalletLink;
