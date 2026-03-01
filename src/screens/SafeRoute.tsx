import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ArrowLeft, Navigation, AlertTriangle, ShieldCheck, MapPin } from 'lucide-react';
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
    <div className="h-screen flex flex-col bg-gray-900">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <button onClick={() => navigate(-1)} className="bg-white/10 backdrop-blur p-3 rounded-2xl shadow-lg hover:bg-white/20 transition-all text-white">
          <ArrowLeft size={24} />
        </button>
        <div className="bg-white/10 backdrop-blur px-4 py-3 rounded-2xl shadow-lg font-black text-sm uppercase tracking-widest text-white">
          Safe Route
        </div>
      </div>

      <div className="flex-1 relative">
        {hasToken ? (
          <div ref={mapContainer} className="w-full h-full" />
        ) : (
          <div className="w-full h-full bg-gray-800 p-6">
            <MapPlaceholder title="Safe Route Navigation" message="Navigation view is in demo mode. Connect Mapbox for live routing." />
          </div>
        )}
      </div>

      <div className="bg-gray-900 p-8 rounded-t-[48px] shadow-2xl space-y-8 animate-in slide-in-from-bottom-full duration-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-900">
              <Navigation size={24} />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{time}</p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{distance}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Destination</p>
            <p className="text-sm font-black text-white">PSU Gym Center</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-red-900/20 border border-red-900/30 rounded-2xl">
            <AlertTriangle className="text-red-500" size={20} />
            <p className="text-xs text-red-400 font-bold leading-relaxed">
              Hazard detected on San Jose Road. Route has been recalculated to avoid flooding.
            </p>
          </div>
          <div className="flex items-center gap-4 p-4 bg-green-900/20 border border-green-900/30 rounded-2xl">
            <ShieldCheck className="text-green-500" size={20} />
            <p className="text-xs text-green-400 font-bold leading-relaxed">
              This route is verified as safe by the local disaster response team.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-900 hover:bg-blue-700 active:scale-95 transition-all"
        >
          End Navigation
        </button>
      </div>
    </div>
  );
};

export default SafeRoute;
