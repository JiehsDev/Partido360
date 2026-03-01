import React from 'react';
import { MapPin, AlertCircle } from 'lucide-react';

interface MapPlaceholderProps {
  title: string;
  message?: string;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ title, message }) => {
  return (
    <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-gray-200 rounded-2xl">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-4">
        <MapPin size={32} />
      </div>
      <h3 className="text-lg font-black text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-[200px] mx-auto mb-4">
        {message || "Map visualization is currently in demo mode."}
      </p>
      <div className="flex items-center gap-2 text-[10px] font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full uppercase tracking-widest">
        <AlertCircle size={12} />
        Mock View
      </div>
    </div>
  );
};

export default MapPlaceholder;
