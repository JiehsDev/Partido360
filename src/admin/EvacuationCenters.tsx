import React, { useState } from 'react';
import { MapPin, Users, Plus, Edit2, Trash2, Search, Filter, AlertCircle } from 'lucide-react';
import MapPlaceholder from '../components/MapPlaceholder';

const EvacuationCenters = () => {
  const [centers, setCenters] = useState([
    { id: 1, name: 'Partido State University Gym', barangay: 'San Jose', capacity: 500, current: 425, status: 'OPEN' },
    { id: 2, name: 'Goa Central School', barangay: 'Goa', capacity: 300, current: 120, status: 'OPEN' },
    { id: 3, name: 'San Jose Municipal Hall', barangay: 'San Jose', capacity: 200, current: 200, status: 'FULL' },
    { id: 4, name: 'Lagonoy Sports Complex', barangay: 'Lagonoy', capacity: 600, current: 0, status: 'PREPARING' },
    { id: 5, name: 'Tigaon Public Market', barangay: 'Tigaon', capacity: 150, current: 0, status: 'CLOSED' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-green-100 text-green-700';
      case 'FULL': return 'bg-red-100 text-red-700';
      case 'PREPARING': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-8">
        {/* Center List */}
        <div className="col-span-2 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Evacuation Center Management</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Search center..." 
                  className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold"
                />
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-700 transition-all">
                <Plus size={16} />
                Add Center
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-100">
                  <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Center Name</th>
                  <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Barangay</th>
                  <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Occupancy</th>
                  <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                  <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {centers.map((center) => (
                  <tr key={center.id} className="group hover:bg-gray-50 transition-all">
                    <td className="py-4">
                      <p className="text-sm font-bold text-gray-900">{center.name}</p>
                    </td>
                    <td className="py-4">
                      <span className="text-xs font-bold text-gray-600">{center.barangay}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              (center.current / center.capacity) > 0.9 ? 'bg-red-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${(center.current / center.capacity) * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-black text-gray-900">
                          {center.current} / {center.capacity}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <div className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest inline-block ${getStatusColor(center.status)}`}>
                        {center.status}
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                          <Edit2 size={14} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Map View Panel */}
        <div className="col-span-1 space-y-8">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm h-[400px] flex flex-col">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-6">Live Map View</h3>
            <div className="flex-1 rounded-3xl overflow-hidden border border-gray-100">
              <MapPlaceholder title="Evacuation Centers" message="Admin map view is currently in demo mode." />
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-[40px] text-white shadow-2xl">
            <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <AlertCircle size={16} className="text-yellow-500" />
              Capacity Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-2xl font-black">745</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Occupants</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-blue-400">1,950</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Capacity</p>
                </div>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '38%' }} />
              </div>
              <p className="text-[10px] font-bold text-gray-500 text-center uppercase tracking-widest">
                38% Overall District Occupancy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvacuationCenters;
