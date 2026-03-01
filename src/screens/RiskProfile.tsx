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
    <div className="p-6 space-y-8">
      <header>
        <h1 className="text-2xl font-black text-gray-900">Risk Profile</h1>
        <p className="text-gray-500">Help us assess your household risk.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Your Barangay</label>
          <select
            value={barangay}
            onChange={(e) => setBarangay(e.target.value)}
            className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Barangay</option>
            <option value="San Jose">San Jose</option>
            <option value="Tigaon">Tigaon</option>
            <option value="Goa">Goa</option>
            <option value="Lagonoy">Lagonoy</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Household Size</label>
          <div className="flex items-center gap-4">
            <Users className="text-gray-400" />
            <input
              type="number"
              min="1"
              value={residents}
              onChange={(e) => setResidents(parseInt(e.target.value))}
              className="flex-1 p-4 bg-white border border-gray-200 rounded-2xl"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-bold text-gray-700">Vulnerable Members</label>
          <div className="grid grid-cols-2 gap-3">
            {['Elderly', 'PWD', 'Infants', 'Pregnant'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => toggleVulnerable(type)}
                className={`p-4 rounded-2xl border text-sm font-bold transition-all ${
                  vulnerable.includes(type)
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'bg-white border-gray-200 text-gray-600'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Location Assessment</label>
          <div className="w-full h-48 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100">
            {hasToken ? (
              <div ref={mapContainer} className="w-full h-full" />
            ) : (
              <MapPlaceholder title="Hazard Zone Map" />
            )}
          </div>
          {location && (
            <div className={`p-4 rounded-2xl flex items-center gap-3 ${
              riskLevel === 'HIGH' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
            }`}>
              <AlertCircle size={20} />
              <span className="text-sm font-bold">
                {riskLevel === 'HIGH' ? 'High Hazard Zone Detected' : 'Safe Zone Detected'}
              </span>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default RiskProfile;
