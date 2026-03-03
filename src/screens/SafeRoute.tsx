import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ArrowLeft, Navigation, AlertTriangle, ShieldCheck, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import MapPlaceholder from '../components/MapPlaceholder';

const SafeRoute = () => {
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [distance, setDistance] = useState('2.4 km');
  const [time, setTime] = useState('12 mins');
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
      style: 'mapbox://styles/mapbox/navigation-night-v1',
      center: [123.49, 13.63],
      zoom: 13
    });

    map.current.on('load', () => {
      if (!map.current) return;

      // Mock route coordinates
      const route = [
        [123.50, 13.64],
        [123.495, 13.635],
        [123.49, 13.63],
      ];

      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route
          }
        }
      });

      map.current.addLayer({
        id: 'route-layer',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3b82f6',
          'line-width': 8,
          'line-opacity': 0.8
        }
      });

      // Add markers
      new mapboxgl.Marker({ color: '#3b82f6' })
        .setLngLat([123.50, 13.64])
        .addTo(map.current);

      new mapboxgl.Marker({ color: '#10b981' })
        .setLngLat([123.49, 13.63])
        .addTo(map.current);

      // Add hazard area
      map.current.addSource('hazard', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [[[123.492, 13.638], [123.498, 13.638], [123.498, 13.642], [123.492, 13.642], [123.492, 13.638]]]
          }
        }
      });

      map.current.addLayer({
        id: 'hazard-layer',
        type: 'fill',
        source: 'hazard',
        paint: {
          'fill-color': '#ef4444',
          'fill-opacity': 0.4
        }
      });
    });

    return () => map.current?.remove();
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-900 animate-fade-in">
      <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between gap-4 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <button 
            onClick={() => navigate(-1)} 
            className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md border-2 border-white/10 rounded-2xl shadow-2xl hover:bg-white/20 transition-all active:scale-90"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl shadow-2xl border-2 border-white/10 font-black text-[10px] uppercase tracking-widest text-white flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Safe Route
          </div>
        </div>
      </div>

      <div className="flex-1 relative">
        {hasToken ? (
          <div ref={mapContainer} className="w-full h-full" />
        ) : (
          <div className="w-full h-full bg-gray-800 p-6 pt-24">
            <div className="h-64 rounded-[40px] overflow-hidden border-2 border-white/5 shadow-2xl">
              <MapPlaceholder title="Safe Route Navigation" message="Navigation view is in demo mode. Connect Mapbox for live routing." />
            </div>
          </div>
        )}
      </div>

      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        className="bg-gray-900 p-10 rounded-t-[56px] shadow-[0_-20px_80px_rgba(0,0,0,0.5)] border-t-2 border-white/5 z-20 space-y-8"
      >
        <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-4" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-blue-600 rounded-[24px] flex items-center justify-center text-white shadow-2xl shadow-blue-900 group">
              <Navigation size={32} className="group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <p className="text-4xl font-black text-white tracking-tighter">{time}</p>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">{distance}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Destination</p>
            <p className="text-lg font-black text-white tracking-tight">PSU Gym Center</p>
          </div>
        </div>

        <div className="space-y-4">
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-5 p-6 bg-rose-500/10 border-2 border-rose-500/20 rounded-[32px]"
          >
            <div className="w-10 h-10 bg-rose-500/20 rounded-xl flex items-center justify-center text-rose-500">
              <AlertTriangle size={20} />
            </div>
            <p className="text-[10px] text-rose-200 font-black uppercase tracking-widest leading-relaxed flex-1">
              Hazard detected on <span className="text-white">San Jose Road</span>. Route recalculated to avoid flooding.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-5 p-6 bg-emerald-500/10 border-2 border-emerald-500/20 rounded-[32px]"
          >
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500">
              <ShieldCheck size={20} />
            </div>
            <p className="text-[10px] text-emerald-200 font-black uppercase tracking-widest leading-relaxed flex-1">
              This route is <span className="text-white">VERIFIED SAFE</span> by the local disaster response team.
            </p>
          </motion.div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-white text-gray-900 py-6 rounded-[24px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-gray-100 active:scale-[0.98] transition-all"
        >
          End Navigation
        </button>
      </motion.div>
    </div>
  );
};

export default SafeRoute;
