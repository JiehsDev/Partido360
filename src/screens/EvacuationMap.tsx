import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ArrowLeft, Navigation, Users, Info, MapPin } from 'lucide-react';
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
    <div className="h-screen flex flex-col">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <button onClick={() => navigate(-1)} className="bg-white p-3 rounded-2xl shadow-lg hover:bg-gray-50 transition-all">
          <ArrowLeft size={24} />
        </button>
        <div className="bg-white px-4 py-3 rounded-2xl shadow-lg font-black text-sm uppercase tracking-widest">
          Evacuation Map
        </div>
      </div>

      <div className="flex-1 relative">
        {hasToken ? (
          <div ref={mapContainer} className="w-full h-full" />
        ) : (
          <div className="w-full h-full p-6 space-y-6 overflow-y-auto bg-gray-50">
            <div className="h-48">
              <MapPlaceholder title="Evacuation Centers" />
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Nearby Centers (Demo)</h3>
              {EVAC_CENTERS.map(center => (
                <button
                  key={center.id}
                  onClick={() => setSelected(center)}
                  className={`w-full p-4 bg-white border rounded-2xl flex items-center justify-between transition-all ${
                    selected?.id === center.id ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold ${
                      center.status === 'OPEN' ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {center.capacity}%
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-gray-900">{center.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{center.status}</p>
                    </div>
                  </div>
                  <Navigation size={16} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {selected ? (
        <div className="bg-white p-6 rounded-t-[40px] shadow-2xl animate-in slide-in-from-bottom-full duration-500">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-gray-900">{selected.name}</h2>
            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
              selected.status === 'OPEN' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {selected.status}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Users size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Capacity</span>
              </div>
              <p className="text-lg font-black text-gray-900">{selected.capacity}% Full</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Navigation size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Distance</span>
              </div>
              <p className="text-lg font-black text-gray-900">2.4 km</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/safe-route')}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-200 flex items-center justify-center gap-3"
          >
            <Navigation size={20} />
            Navigate to Center
          </button>
        </div>
      ) : (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-xl flex items-center gap-3 text-xs font-bold text-gray-600">
          <Info size={16} className="text-blue-500" />
          Tap a marker to view details
        </div>
      )}
    </div>
  );
};

export default EvacuationMap;
