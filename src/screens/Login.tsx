import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, isFirebaseMock } from '../firebase';
import { signInAnonymously } from 'firebase/auth';
import { motion } from 'motion/react';
import { Shield, Phone, User, Calendar, Users } from 'lucide-react';
import { useSystem } from '../context/SystemContext';

const Login = () => {
  const { loginMock, updateProfile } = useSystem();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | 'OTHER' | ''>('');
  const [step, setStep] = useState<'phone' | 'otp' | 'details'>('phone');
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
        setStep('details');
        return;
      }
      // For demo purposes, we use anonymous sign-in if real phone auth is not configured
      await signInAnonymously(auth);
      setStep('details');
    } catch (error) {
      console.error(error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile({
        name,
        age: parseInt(age),
        gender: gender as any,
      });
      navigate('/risk-profile');
    } catch (error) {
      console.error(error);
      alert('Failed to save details.');
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
        <div className="w-24 h-24 bg-blue-600 rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-200 relative group">
          <Shield size={48} className="text-white group-hover:scale-110 transition-transform" />
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">PARTIDO 360</h1>
        <p className="text-blue-600 font-black tracking-[0.2em] text-[10px] uppercase mt-1">Resilience Network</p>
      </motion.div>

      <div className="w-full max-w-sm space-y-8">
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-500 ${
                (step === 'phone' && i === 1) || 
                (step === 'otp' && i <= 2) || 
                (step === 'details' && i <= 3) 
                  ? 'w-8 bg-blue-600' 
                  : 'w-4 bg-gray-100'
              }`} 
            />
          ))}
        </div>

        {step === 'phone' ? (
          <motion.form 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            onSubmit={handleSendOtp} 
            className="space-y-4"
          >
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="tel"
                  placeholder="09XX XXX XXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-[24px] focus:bg-white focus:border-blue-600 focus:ring-0 transition-all font-bold text-lg"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-black uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Access Code'}
            </button>
          </motion.form>
        ) : step === 'otp' ? (
          <motion.form 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            onSubmit={handleVerifyOtp} 
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <p className="text-sm font-bold text-gray-900">Enter the 6-digit code</p>
              <p className="text-xs text-gray-400">Sent to {phone}</p>
            </div>
            <div className="flex justify-between gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  className="w-12 h-16 text-center text-2xl font-black bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-0 transition-all"
                  onChange={(e) => {
                    if (e.target.value) setOtp(prev => prev + e.target.value);
                  }}
                />
              ))}
            </div>
            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-black uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify & Continue'}
              </button>
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full text-gray-400 font-black text-[10px] uppercase tracking-widest hover:text-gray-600 transition-colors"
              >
                Change Number
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.form 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            onSubmit={handleSaveDetails} 
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h2 className="text-xl font-black text-gray-900">Complete Profile</h2>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Help us prioritize your safety</p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-[24px] focus:bg-white focus:border-blue-600 focus:ring-0 transition-all font-bold"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-[24px] focus:bg-white focus:border-blue-600 focus:ring-0 transition-all font-bold"
                    required
                  />
                </div>
                <div className="relative">
                  <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full pl-14 pr-10 py-5 bg-gray-50 border-2 border-transparent rounded-[24px] focus:bg-white focus:border-blue-600 focus:ring-0 transition-all font-bold appearance-none"
                    required
                  >
                    <option value="">Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-black uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Start Resilience Journey'}
            </button>
          </motion.form>
        )}
      </div>

      <p className="mt-12 text-gray-400 text-xs text-center max-w-[250px]">
        By continuing, you agree to receive emergency alerts and disaster advisories.
      </p>
    </div>
  );
};

export default Login;
