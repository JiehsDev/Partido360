import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, isFirebaseMock } from '../firebase';
import { signInAnonymously } from 'firebase/auth';
import { motion } from 'motion/react';
import { Shield, Phone } from 'lucide-react';
import { useSystem } from '../context/SystemContext';

const Login = () => {
  const { loginMock } = useSystem();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate OTP send
    setTimeout(() => {
      setStep('otp');
      setLoading(false);
    }, 1000);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isFirebaseMock) {
        loginMock(phone);
        navigate('/risk-profile');
        return;
      }
      // For demo purposes, we use anonymous sign-in if real phone auth is not configured
      // In a real app, you'd use confirmationResult.confirm(otp)
      await signInAnonymously(auth);
      navigate('/risk-profile');
    } catch (error) {
      console.error(error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-12 text-center"
      >
        <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-200">
          <Shield size={48} className="text-white" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">PARTIDO</h1>
        <p className="text-blue-600 font-bold tracking-widest text-xs uppercase">Resilience App</p>
      </motion.div>

      <div className="w-full max-w-sm">
        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="tel"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="flex justify-between gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  className="w-12 h-14 text-center text-2xl font-bold bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {
                    if (e.target.value) setOtp(prev => prev + e.target.value);
                  }}
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>
            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-gray-500 font-medium text-sm"
            >
              Change Number
            </button>
          </form>
        )}
      </div>

      <p className="mt-12 text-gray-400 text-xs text-center max-w-[250px]">
        By continuing, you agree to receive emergency alerts and disaster advisories.
      </p>
    </div>
  );
};

export default Login;
