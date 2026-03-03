import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSystem } from '../context/SystemContext';
import { db, isFirebaseMock } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ShieldCheck, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const Emergency = () => {
  const { user, profile, updateProfile } = useSystem();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'SAFE' | 'HELP' | null>(null);
  const [loading, setLoading] = useState(false);

  const handleStatus = async (s: 'SAFE' | 'HELP') => {
    if (!user) return;
    setLoading(true);
    try {
      // Get current location
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };

        if (!isFirebaseMock) {
          // Save to Firestore
          await addDoc(collection(db, 'emergency_status'), {
            userId: user.uid,
            status: s,
            location,
            timestamp: serverTimestamp()
          });
        }

        // Update user profile
        await updateProfile({ emergencyStatus: s });
        setStatus(s);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Emergency</h1>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">Safety Status Update</p>
        </div>
      </header>

      {!status ? (
        <div className="flex-1 flex flex-col gap-6 justify-center animate-slide-up">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleStatus('SAFE')}
            disabled={loading}
            className="flex-1 bg-emerald-500 text-white rounded-[48px] p-10 shadow-2xl shadow-emerald-100 flex flex-col items-center justify-center gap-6 group transition-all relative overflow-hidden"
          >
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform backdrop-blur-md border-4 border-white/30">
              <ShieldCheck size={72} />
            </div>
            <div className="text-center relative z-10">
              <p className="text-4xl font-black tracking-tighter mb-2">I AM SAFE</p>
              <p className="text-[10px] font-black opacity-60 uppercase tracking-widest">No assistance needed</p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleStatus('HELP')}
            disabled={loading}
            className="flex-1 bg-rose-600 text-white rounded-[48px] p-10 shadow-2xl shadow-rose-100 flex flex-col items-center justify-center gap-6 group transition-all relative overflow-hidden"
          >
            <div className="absolute -left-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform backdrop-blur-md border-4 border-white/30">
              <AlertCircle size={72} />
            </div>
            <div className="text-center relative z-10">
              <p className="text-4xl font-black tracking-tighter mb-2">I NEED HELP</p>
              <p className="text-[10px] font-black opacity-60 uppercase tracking-widest">Request immediate rescue</p>
            </div>
          </motion.button>
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
        >
          <div className={`w-40 h-40 rounded-full flex items-center justify-center shadow-2xl ${
            status === 'SAFE' ? 'bg-emerald-100 text-emerald-600 shadow-emerald-50' : 'bg-rose-100 text-rose-600 shadow-rose-50'
          }`}>
            <CheckCircle2 size={96} />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Status Reported</h2>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest max-w-[280px] mx-auto leading-relaxed">
              Your status and coordinates have been sent to the <span className="text-gray-900">Partido District Emergency Operations Center</span>.
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full max-w-[280px] bg-gray-900 text-white py-5 rounded-[24px] font-black uppercase tracking-widest shadow-2xl hover:bg-black active:scale-[0.98] transition-all"
          >
            Back to Dashboard
          </button>
        </motion.div>
      )}

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-900 p-8 rounded-[40px] text-white shadow-2xl shadow-gray-200 relative overflow-hidden"
      >
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-blue-400">
            <AlertCircle size={20} />
          </div>
          <p className="font-black text-sm uppercase tracking-widest">Location Sharing</p>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed font-bold uppercase tracking-wider">
          Your location is automatically shared with local authorities when you update your status for <span className="text-white">immediate response</span>.
        </p>
      </motion.div>
    </div>
  );
};

export default Emergency;
