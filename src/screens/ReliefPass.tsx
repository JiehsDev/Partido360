import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSystem } from '../context/SystemContext';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowLeft, Share2, Download, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

const ReliefPass = () => {
  const { user, profile } = useSystem();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="p-6 space-y-8 flex flex-col min-h-screen animate-fade-in">
      <header className="flex items-center gap-5">
        <button 
          onClick={() => navigate(-1)} 
          className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-100 rounded-2xl hover:bg-gray-50 transition-all shadow-sm active:scale-90"
        >
          <ArrowLeft size={20} className="text-gray-900" />
        </button>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Relief Pass</h1>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">Digital Identification</p>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center py-8">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white p-10 rounded-[56px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border-2 border-gray-50 flex flex-col items-center w-full max-w-sm relative overflow-hidden"
        >
          {/* Decorative background */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-blue-600" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50" />
          
          <div className="mb-10 text-center relative z-10">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Family ID</p>
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter">
              {user.uid.slice(0, 8).toUpperCase()}
            </h2>
          </div>

          <div className="bg-gray-50 p-8 rounded-[40px] mb-10 shadow-inner border-2 border-gray-100 relative group">
            <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[40px]" />
            <QRCodeSVG
              value={JSON.stringify({
                uid: user.uid,
                phone: profile?.phone,
                residents: profile?.residents,
                barangay: profile?.barangay
              })}
              size={200}
              level="H"
              includeMargin={false}
              className="relative z-10"
            />
          </div>

          <div className="w-full space-y-6 relative z-10">
            <div className="flex justify-between items-center px-4 py-4 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Residents</span>
              <span className="text-sm font-black text-gray-900">{profile?.residents || 0} Members</span>
            </div>
            <div className="flex justify-between items-center px-4 py-4 bg-green-50 rounded-2xl border border-green-100">
              <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Status</span>
              <div className="flex items-center gap-2 text-green-700">
                <ShieldCheck size={16} />
                <span className="text-sm font-black">VERIFIED</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-4 animate-slide-up">
        <button className="flex items-center justify-center gap-3 p-5 bg-white border-2 border-gray-100 rounded-[24px] font-black text-[10px] uppercase tracking-widest text-gray-700 shadow-sm hover:bg-gray-50 hover:border-blue-200 transition-all active:scale-95">
          <Download size={18} className="text-blue-600" />
          Save Pass
        </button>
        <button className="flex items-center justify-center gap-3 p-5 bg-white border-2 border-gray-100 rounded-[24px] font-black text-[10px] uppercase tracking-widest text-gray-700 shadow-sm hover:bg-gray-50 hover:border-blue-200 transition-all active:scale-95">
          <Share2 size={18} className="text-blue-600" />
          Share Pass
        </button>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-900 p-8 rounded-[40px] text-white shadow-2xl shadow-gray-200 relative overflow-hidden"
      >
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-blue-400">
            <ShieldCheck size={20} />
          </div>
          <p className="font-black text-sm uppercase tracking-widest">Validation Policy</p>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed font-bold uppercase tracking-wider">
          This pass is valid for all relief distribution centers in the <span className="text-white">Partido District</span>. Do not share your QR code with unauthorized personnel.
        </p>
      </motion.div>
    </div>
  );
};

export default ReliefPass;
