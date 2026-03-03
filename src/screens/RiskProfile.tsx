import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSystem } from '../context/SystemContext';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Users, AlertCircle } from 'lucide-react';
import MapPlaceholder from '../components/MapPlaceholder';

// Mock hazard zones (Partido District area)
const HAZARD_ZONES = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Flood Zone A' },
      geometry: {
        type: 'Polygon',
        coordinates: [[[123.5, 13.6], [123.6, 13.6], [123.6, 13.7], [123.5, 13.7], [123.5, 13.6]]]
      }
    }
  ]
};

const RiskProfile = () => {
  const { updateProfile } = useSystem();
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  
  const [barangay, setBarangay] = useState('');
  const [residents, setResidents] = useState(1);
  const [vulnerable, setVulnerable] = useState<string[]>([]);
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [riskLevel, setRiskLevel] = useState<'LOW' | 'HIGH'>('LOW');
  const [hasToken, setHasToken] = useState(true);

  useEffect(() => {
    const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    if (!token) {
      setHasToken(false);
      // Still set a mock location for demo
      setLocation([123.5, 13.6]);
      return;
    }
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [123.5, 13.6], // Partido District center
      zoom: 10
    });

    map.current.on('load', () => {
      if (!map.current) return;
      
      map.current.addSource('hazards', {
        type: 'geojson',
        data: HAZARD_ZONES as any
      });

      map.current.addLayer({
        id: 'hazards-layer',
        type: 'fill',
        source: 'hazards',
        paint: {
          'fill-color': '#ff0000',
          'fill-opacity': 0.3
        }
      });

      // Get user location
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords: [number, number] = [pos.coords.longitude, pos.coords.latitude];
        setLocation(coords);
        
        if (map.current) {
          map.current.flyTo({ center: coords, zoom: 14 });
          new mapboxgl.Marker({ color: '#3b82f6' })
            .setLngLat(coords)
            .addTo(map.current);
        }

        // Simple risk check (mock)
        // In a real app, use turf.js booleanPointInPolygon
        const isHighRisk = coords[0] > 123.5 && coords[0] < 123.6 && coords[1] > 13.6 && coords[1] < 13.7;
        setRiskLevel(isHighRisk ? 'HIGH' : 'LOW');
      });
    });

    return () => map.current?.remove();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      barangay,
      residents,
      vulnerableMembers: vulnerable,
      riskLevel,
    });
    navigate('/wallet-link');
  };

  const toggleVulnerable = (type: string) => {
    setVulnerable(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="p-6 space-y-8 pb-12 animate-fade-in">
      <header className="space-y-2">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Risk Profile</h1>
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Household Assessment</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Your Barangay</label>
          <div className="relative">
            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              value={barangay}
              onChange={(e) => setBarangay(e.target.value)}
              className="w-full pl-14 pr-10 py-5 bg-white border-2 border-gray-100 rounded-[24px] focus:border-blue-600 focus:ring-0 transition-all font-bold appearance-none shadow-sm"
              required
            >
              <option value="">Select Barangay</option>
              <option value="San Jose">San Jose</option>
              <option value="Tigaon">Tigaon</option>
              <option value="Goa">Goa</option>
              <option value="Lagonoy">Lagonoy</option>
            </select>
          </div>
        </div>

        <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Household Size</label>
          <div className="relative">
            <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="number"
              min="1"
              value={residents}
              onChange={(e) => setResidents(parseInt(e.target.value))}
              className="w-full pl-14 pr-6 py-5 bg-white border-2 border-gray-100 rounded-[24px] focus:border-blue-600 focus:ring-0 transition-all font-bold shadow-sm"
              required
            />
          </div>
        </div>

        <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Vulnerable Members</label>
          <div className="grid grid-cols-2 gap-3">
            {['Elderly', 'PWD', 'Infants', 'Pregnant'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => toggleVulnerable(type)}
                className={`py-5 rounded-[24px] border-2 font-black text-[10px] uppercase tracking-widest transition-all shadow-sm ${
                  vulnerable.includes(type)
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100'
                    : 'bg-white border-gray-100 text-gray-400 hover:border-blue-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Location Assessment</label>
          <div className="w-full h-56 rounded-[32px] overflow-hidden border-2 border-gray-100 bg-gray-50 shadow-inner relative group">
            {hasToken ? (
              <div ref={mapContainer} className="w-full h-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <MapPlaceholder title="Hazard Zone Map" />
              </div>
            )}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-100 shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Live GPS</span>
            </div>
          </div>
          
          {location && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`p-6 rounded-[24px] flex items-center gap-4 border-2 shadow-sm ${
                riskLevel === 'HIGH' 
                  ? 'bg-red-50 border-red-100 text-red-700' 
                  : 'bg-green-50 border-green-100 text-green-700'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                riskLevel === 'HIGH' ? 'bg-red-100' : 'bg-green-100'
              }`}>
                <AlertCircle size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">System Assessment</p>
                <p className="text-sm font-black">
                  {riskLevel === 'HIGH' ? 'High Hazard Zone Detected' : 'Safe Zone Detected'}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-black uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
};

export default RiskProfile;
