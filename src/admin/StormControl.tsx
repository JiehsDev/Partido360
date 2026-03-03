import React, { useState } from 'react';
import { useSystem, SystemMode } from '../context/SystemContext';
import { CloudRain, Wind, Navigation, Calendar, Send, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

const StormControl = () => {
  const { mode, setMode } = useSystem();
  const [stormName, setStormName] = useState('Pepito');
  const [distance, setDistance] = useState('320');
  const [windSpeed, setWindSpeed] = useState('145');
  const [landfall, setLandfall] = useState('14');
  const [advisoryTitle, setAdvisoryTitle] = useState('STORM ADVISORY: Monitoring Tropical Storm "Pepito"');
  const [advisoryBody, setAdvisoryBody] = useState('Tropical Storm "Pepito" is currently 320km East of Bicol. Monitoring for potential landfall in Partido District. Residents are advised to prepare emergency kits.');

  const handleStateChange = (m: SystemMode) => {
    setMode(m);
    // Update advisory title based on state
    if (m === 'RED') setAdvisoryTitle('CRITICAL ALERT: EVACUATION ADVISED');
    if (m === 'EMERGENCY') setAdvisoryTitle('EMERGENCY MODE: POST-IMPACT RESPONSE');
    if (m === 'GREEN') setAdvisoryTitle('System Status: Normal');
  };

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-8">
        {/* Storm Input Card */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-8 flex items-center gap-3">
            <CloudRain className="text-blue-600" />
            Storm Parameters
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Storm Name</label>
              <div className="relative">
                <CloudRain className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={stormName} 
                  onChange={(e) => setStormName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Distance from PAR (km)</label>
              <div className="relative">
                <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="number" 
                  value={distance} 
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Wind Speed (km/h)</label>
              <div className="relative">
                <Wind className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="number" 
                  value={windSpeed} 
                  onChange={(e) => setWindSpeed(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Expected Landfall (h)</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="number" 
                  value={landfall} 
                  onChange={(e) => setLandfall(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Advisory Message Editor */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-8 flex items-center gap-3">
            <Send className="text-blue-600" />
            Advisory Message Editor
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Advisory Title</label>
              <input 
                type="text" 
                value={advisoryTitle} 
                onChange={(e) => setAdvisoryTitle(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Body Text</label>
              <textarea 
                rows={4}
                value={advisoryBody} 
                onChange={(e) => setAdvisoryBody(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 font-medium text-sm"
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-3">
              <Send size={20} />
              Save & Publish Advisory
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* State Toggle Card */}
        <div className="bg-gray-900 p-8 rounded-[40px] text-white shadow-2xl">
          <h3 className="text-lg font-black uppercase tracking-tight mb-8 flex items-center gap-3">
            <AlertTriangle className="text-yellow-500" />
            System State Toggle
          </h3>
          <div className="space-y-3">
            {(['GREEN', 'YELLOW', 'RED', 'EMERGENCY'] as const).map((m) => (
              <button
                key={m}
                onClick={() => handleStateChange(m)}
                className={`w-full p-6 rounded-3xl border-2 transition-all flex items-center justify-between group ${
                  mode === m
                    ? m === 'GREEN' ? 'border-green-500 bg-green-500/10 text-green-500' :
                      m === 'YELLOW' ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500' :
                      m === 'RED' ? 'border-red-600 bg-red-600/10 text-red-600' :
                      'border-white bg-white/10 text-white'
                    : 'border-gray-800 hover:border-gray-700 text-gray-500'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    m === 'GREEN' ? 'bg-green-500' :
                    m === 'YELLOW' ? 'bg-yellow-500' :
                    m === 'RED' ? 'bg-red-600' : 'bg-white'
                  }`} />
                  <span className="text-sm font-black uppercase tracking-widest">{m}</span>
                </div>
                {mode === m && <div className="w-2 h-2 bg-current rounded-full animate-pulse" />}
              </button>
            ))}
          </div>
          <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-[10px] font-bold text-gray-400 leading-relaxed">
              Changing the state will immediately update the frontend for all users and trigger relevant protocols (e.g., Cash Grant on RED).
            </p>
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">User Banner Preview</h3>
          <div className={`p-4 rounded-2xl text-center text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 ${
            mode === 'GREEN' ? 'bg-green-50 text-green-600 border border-green-100' :
            mode === 'YELLOW' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' :
            mode === 'RED' ? 'bg-red-50 text-red-700 border border-red-100' :
            'bg-gray-900 text-white'
          }`}>
            <AlertTriangle size={14} />
            {advisoryTitle}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StormControl;
