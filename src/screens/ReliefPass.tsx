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
    <div className="p-6 space-y-8 flex flex-col min-h-screen">
      <header className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-gray-900">Digital Relief Pass</h1>
          <p className="text-gray-500 font-medium text-sm">Present this for relief claims.</p>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white p-8 rounded-[48px] shadow-2xl border border-gray-100 flex flex-col items-center w-full max-w-xs relative overflow-hidden"
        >
          {/* Decorative background */}
          <div className="absolute top-0 left-0 w-full h-2 bg-blue-600" />
          
          <div className="mb-8 text-center">
            <h2 className="text-xl font-black text-gray-900 mb-1">Family ID</h2>
            <p className="text-blue-600 font-black text-sm tracking-widest uppercase">
              {user.uid.slice(0, 8).toUpperCase()}
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-3xl mb-8">
            <QRCodeSVG
              value={JSON.stringify({
                uid: user.uid,
                phone: profile?.phone,
                residents: profile?.residents,
                barangay: profile?.barangay
              })}
              size={180}
              level="H"
              includeMargin={false}
            />
          </div>

          <div className="w-full space-y-4">
            <div className="flex justify-between items-center px-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Residents</span>
              <span className="text-sm font-black text-gray-900">{profile?.residents || 0} Members</span>
            </div>
            <div className="flex justify-between items-center px-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</span>
              <div className="flex items-center gap-2 text-green-600">
                <ShieldCheck size={14} />
                <span className="text-sm font-black">VERIFIED</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl font-bold text-sm text-gray-700 shadow-sm hover:bg-gray-50 transition-all">
          <Download size={20} className="text-gray-400" />
          Save Image
        </button>
        <button className="flex items-center justify-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl font-bold text-sm text-gray-700 shadow-sm hover:bg-gray-50 transition-all">
          <Share2 size={20} className="text-gray-400" />
          Share Pass
        </button>
      </div>

      <div className="bg-gray-900 p-6 rounded-3xl text-white flex items-center gap-4">
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400">
          <ShieldCheck size={24} />
        </div>
        <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-wider">
          This pass is valid for all relief distribution centers in the Partido District. Do not share your QR code with unauthorized personnel.
        </p>
      </div>
    </div>
  );
};

export default ReliefPass;
