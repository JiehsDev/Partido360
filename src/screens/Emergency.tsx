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
    <div className="p-6 space-y-8 flex flex-col min-h-screen">
      <header className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-gray-900">Emergency Status</h1>
          <p className="text-gray-500 font-medium text-sm">Update your current safety status.</p>
        </div>
      </header>

      {!status ? (
        <div className="flex-1 flex flex-col gap-6 justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleStatus('SAFE')}
            disabled={loading}
            className="flex-1 bg-green-500 text-white rounded-[48px] p-8 shadow-2xl shadow-green-200 flex flex-col items-center justify-center gap-4 group transition-all"
          >
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck size={64} />
            </div>
            <div className="text-center">
              <p className="text-4xl font-black mb-2">I AM SAFE</p>
              <p className="text-sm font-bold opacity-80 uppercase tracking-widest">No assistance needed</p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleStatus('HELP')}
            disabled={loading}
            className="flex-1 bg-red-600 text-white rounded-[48px] p-8 shadow-2xl shadow-red-200 flex flex-col items-center justify-center gap-4 group transition-all"
          >
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertCircle size={64} />
            </div>
            <div className="text-center">
              <p className="text-4xl font-black mb-2">I NEED HELP</p>
              <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Request immediate rescue</p>
            </div>
          </motion.button>
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
        >
          <div className={`w-32 h-32 rounded-full flex items-center justify-center ${
            status === 'SAFE' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}>
            <CheckCircle2 size={80} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">Status Reported</h2>
            <p className="text-gray-500 font-medium max-w-[250px] mx-auto leading-relaxed">
              Your status and coordinates have been sent to the Partido District Emergency Operations Center.
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:bg-black active:scale-95 transition-all"
          >
            Back to Dashboard
          </button>
        </motion.div>
      )}

      <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-center gap-4">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
          <AlertCircle size={20} />
        </div>
        <p className="text-xs text-blue-700 font-bold leading-relaxed">
          Your location is automatically shared with local authorities when you update your status.
        </p>
      </div>
    </div>
  );
};

export default Emergency;
