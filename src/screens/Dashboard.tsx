import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSystem } from '../context/SystemContext';
import { 
  CloudRain, 
  MapPin, 
  CheckSquare, 
  AlertCircle, 
  Navigation, 
  LifeBuoy, 
  QrCode, 
  Camera,
  ArrowRight,
  ShieldCheck,
  Wallet
} from 'lucide-react';
import { motion } from 'motion/react';

const Dashboard = () => {
  const { mode, profile } = useSystem();
  const navigate = useNavigate();
  const [weather, setWeather] = useState({ temp: 28, condition: 'Partly Cloudy' });

  useEffect(() => {
    // Mock weather update
    const timer = setInterval(() => {
      setWeather(prev => ({ ...prev, temp: prev.temp + (Math.random() > 0.5 ? 1 : -1) }));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getStatusColor = () => {
    switch (mode) {
      case 'YELLOW': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'RED': return 'text-red-600 bg-red-50 border-red-200';
      case 'EMERGENCY': return 'text-gray-900 bg-gray-100 border-gray-300';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  return (
    <div className="p-6 space-y-8 pb-24">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Hello, {profile?.phone.slice(-4)}</h1>
          <p className="text-gray-500 font-medium text-sm">Partido District, CamSur</p>
        </div>
        <div className={`px-4 py-2 rounded-full border text-xs font-black uppercase tracking-widest ${getStatusColor()}`}>
          {mode} MODE
        </div>
      </header>

      {/* Weather Card */}
      <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <CloudRain size={24} />
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900">{weather.temp}°C</p>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{weather.condition}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Risk Level</p>
          <p className={`text-sm font-black ${profile?.riskLevel === 'HIGH' ? 'text-red-600' : 'text-green-600'}`}>
            {profile?.riskLevel || 'LOW'}
          </p>
        </div>
      </div>

      {/* Mode-Specific Notifications */}
      {mode === 'YELLOW' && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-yellow-500 p-6 rounded-[32px] text-black shadow-xl shadow-yellow-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle size={20} />
            <p className="font-black">Monitoring Advisory</p>
          </div>
          <p className="text-xs font-bold opacity-80 leading-relaxed">
            Tropical Storm "Pepito" is 300km East of Bicol. Monitoring for potential landfall in Partido District.
          </p>
        </motion.div>
      )}

      {mode === 'RED' && profile?.riskLevel === 'HIGH' && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => navigate('/safe-route')}
          className="bg-red-600 p-6 rounded-[32px] text-white shadow-xl shadow-red-200 cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Wallet size={24} />
              <p className="font-black text-lg">Grant Received</p>
            </div>
            <ArrowRight size={20} />
          </div>
          <p className="text-sm font-medium opacity-90 leading-relaxed mb-4">
            ₱1,500 has been sent to your {profile?.wallet || 'linked'} wallet. Use this for immediate preparation and evacuation.
          </p>
          <div className="bg-white/20 p-3 rounded-2xl text-xs font-bold">
            REF: {Math.random().toString(36).substring(7).toUpperCase()}
          </div>
        </motion.div>
      )}

      {mode === 'EMERGENCY' && (
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-gray-900 p-6 rounded-[32px] text-white shadow-xl shadow-gray-400"
        >
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck size={24} className="text-blue-400" />
            <p className="font-black text-lg">Response Active</p>
          </div>
          <p className="text-sm font-medium opacity-80 leading-relaxed mb-4">
            Relief operations have started in your area. Please generate your Relief Pass to claim family assistance.
          </p>
          <button 
            onClick={() => navigate('/relief-pass')}
            className="w-full py-3 bg-white text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest"
          >
            Get Relief Pass
          </button>
        </motion.div>
      )}

      {/* Main Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        <ActionCard
          icon={<CheckSquare size={24} />}
          label="Checklist"
          sub="Preparation"
          onClick={() => navigate('/checklist')}
          color="bg-blue-50 text-blue-600"
        />
        <ActionCard
          icon={<MapPin size={24} />}
          label="Evacuation"
          sub="Find Centers"
          onClick={() => navigate('/evacuation-map')}
          color="bg-green-50 text-green-600"
        />
        <ActionCard
          icon={<Navigation size={24} />}
          label="Safe Route"
          sub="Visual Path"
          onClick={() => navigate('/safe-route')}
          color="bg-orange-50 text-orange-600"
        />
        <ActionCard
          icon={<LifeBuoy size={24} />}
          label="Emergency"
          sub="I Need Help"
          onClick={() => navigate('/emergency')}
          color="bg-red-50 text-red-600"
        />
      </div>

      {/* Secondary Actions */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Post-Impact Tools</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/report')}
            className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all shadow-sm"
          >
            <Camera size={20} className="text-gray-400" />
            <span className="text-sm font-bold text-gray-700">Report Damage</span>
          </button>
          <button
            onClick={() => navigate('/relief-pass')}
            className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all shadow-sm"
          >
            <QrCode size={20} className="text-gray-400" />
            <span className="text-sm font-bold text-gray-700">Relief Pass</span>
          </button>
        </div>
      </div>

      {/* Resilience Points */}
      <div className="bg-gray-900 p-6 rounded-[32px] text-white flex items-center justify-between shadow-xl shadow-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Resilience Points</p>
            <p className="text-2xl font-black">{profile?.resiliencePoints || 0}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Level</p>
          <p className="text-sm font-black text-blue-400">BRONZE</p>
        </div>
      </div>
    </div>
  );
};

const ActionCard = ({ icon, label, sub, onClick, color }: any) => (
  <button
    onClick={onClick}
    className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between h-40 group"
  >
    <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-black text-gray-900">{label}</p>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{sub}</p>
    </div>
  </button>
);

export default Dashboard;
