import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ArrowLeft, Navigation, Users, Info, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import MapPlaceholder from '../components/MapPlaceholder';

const EVAC_CENTERS = [
  { id: 1, name: 'Partido State University Gym', coords: [123.49, 13.63], capacity: 85, status: 'OPEN' },
  { id: 2, name: 'Goa Central School', coords: [123.48, 13.62], capacity: 40, status: 'OPEN' },
  { id: 3, name: 'San Jose Municipal Hall', coords: [123.51, 13.70], capacity: 95, status: 'FULL' },
  { id: 4, name: 'Lagonoy Sports Complex', coords: [123.55, 13.73], capacity: 20, status: 'PREPARING' },
];

const EvacuationMap = () => {
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selected, setSelected] = useState<any>(null);
  const [hasToken, setHasToken] = useState(true);

  useEffect(() => {
    const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    if (!token) {
      setHasToken(false);
      return;
    }
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [123.5, 13.65],
      zoom: 11
    });

    EVAC_CENTERS.forEach(center => {
      const el = document.createElement('div');
      el.className = `w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs ${
        center.status === 'OPEN' ? 'bg-green-500' : center.status === 'FULL' ? 'bg-red-500' : 'bg-yellow-500'
      }`;
      el.innerHTML = center.capacity.toString();
      
      new mapboxgl.Marker(el)
        .setLngLat(center.coords as [number, number])
        .addTo(map.current!)
        .getElement()
        .addEventListener('click', () => setSelected(center));
    });

    // Add user location
    navigator.geolocation.getCurrentPosition((pos) => {
      if (map.current) {
        new mapboxgl.Marker({ color: '#3b82f6' })
          .setLngLat([pos.coords.longitude, pos.coords.latitude])
          .addTo(map.current);
      }
    });

    return () => map.current?.remove();
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50 animate-fade-in">
      <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between gap-4 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <button 
            onClick={() => navigate(-1)} 
            className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-100 rounded-2xl shadow-xl hover:bg-gray-50 transition-all active:scale-90"
          >
            <ArrowLeft size={20} className="text-gray-900" />
          </button>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-xl border-2 border-gray-100 font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Evacuation Map
          </div>
        </div>
        
        <button 
          onClick={() => window.location.reload()} 
          className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-100 rounded-2xl shadow-xl hover:bg-gray-50 transition-all active:scale-90 pointer-events-auto"
        >
          <Navigation size={20} className="text-blue-600" />
        </button>
      </div>

      <div className="flex-1 relative">
        {hasToken ? (
          <div ref={mapContainer} className="w-full h-full" />
        ) : (
          <div className="w-full h-full p-6 pt-24 space-y-6 overflow-y-auto bg-gray-50">
            <div className="h-56 rounded-[32px] overflow-hidden border-2 border-gray-100 shadow-inner">
              <MapPlaceholder title="Evacuation Centers" />
            </div>
            <div className="space-y-4 animate-slide-up">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Nearby Centers (Demo)</h3>
              {EVAC_CENTERS.map((center, i) => (
                <motion.button
                  key={center.id}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelected(center)}
                  className={`w-full p-6 bg-white border-2 rounded-[32px] flex items-center justify-between transition-all group ${
                    selected?.id === center.id ? 'border-blue-600 shadow-xl shadow-blue-50' : 'border-gray-100 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:scale-110 transition-transform ${
                      center.status === 'OPEN' ? 'bg-green-500 shadow-green-100' : 'bg-red-500 shadow-red-100'
                    }`}>
                      {center.capacity}%
                    </div>
                    <div className="text-left">
                      <p className="text-lg font-black text-gray-900 tracking-tight">{center.name}</p>
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${center.status === 'OPEN' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{center.status}</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                    <Navigation size={18} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      {selected ? (
        <motion.div 
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          className="bg-white p-8 rounded-t-[48px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] border-t-2 border-gray-50 z-20"
        >
          <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8" />
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">{selected.name}</h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Evacuation Center</p>
            </div>
            <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${
              selected.status === 'OPEN' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {selected.status}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-6 rounded-[32px] border-2 border-gray-100">
              <div className="flex items-center gap-3 text-gray-400 mb-2">
                <Users size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Capacity</span>
              </div>
              <p className="text-2xl font-black text-gray-900">{selected.capacity}% <span className="text-xs text-gray-400 font-bold">Full</span></p>
            </div>
            <div className="bg-gray-50 p-6 rounded-[32px] border-2 border-gray-100">
              <div className="flex items-center gap-3 text-gray-400 mb-2">
                <Navigation size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Distance</span>
              </div>
              <p className="text-2xl font-black text-gray-900">2.4 <span className="text-xs text-gray-400 font-bold">km</span></p>
            </div>
          </div>

          <button
            onClick={() => navigate('/safe-route')}
            className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-black uppercase tracking-widest shadow-xl shadow-blue-200 flex items-center justify-center gap-4 hover:bg-blue-700 active:scale-[0.98] transition-all"
          >
            <Navigation size={20} />
            Navigate to Center
          </button>
        </motion.div>
      ) : (
        <div className="absolute bottom-10 left-6 right-6 flex justify-center pointer-events-none">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-gray-900/90 backdrop-blur-md px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 text-[10px] font-black text-white uppercase tracking-widest pointer-events-auto"
          >
            <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center text-blue-400">
              <Info size={16} />
            </div>
            Tap a marker to view details
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default EvacuationMap;
