import React, { useState } from 'react';
import { LifeBuoy, MapPin, CheckCircle2, AlertCircle, Search, Filter, ArrowRight, Activity } from 'lucide-react';
import MapPlaceholder from '../components/MapPlaceholder';
import { motion } from 'motion/react';

const HelpRequests = () => {
  const [requests, setRequests] = useState([
    { id: 'REQ-001', user: 'USR-8291', barangay: 'San Jose', timestamp: '12 mins ago', status: 'PENDING', location: [123.5, 13.6] },
    { id: 'REQ-002', user: 'USR-1042', barangay: 'Goa', timestamp: '24 mins ago', status: 'RESPONDING', location: [123.48, 13.62] },
    { id: 'REQ-003', user: 'USR-3842', barangay: 'Tigaon', timestamp: '45 mins ago', status: 'RESOLVED', location: [123.52, 13.68] },
    { id: 'REQ-004', user: 'USR-9281', barangay: 'Lagonoy', timestamp: '1h ago', status: 'PENDING', location: [123.55, 13.73] },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-red-100 text-red-700';
      case 'RESPONDING': return 'bg-yellow-100 text-yellow-700';
      case 'RESOLVED': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-8">
        {/* Live Requests Table */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
              <LifeBuoy className="text-red-600" />
              Live Emergency Requests
            </h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Search request..." 
                  className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold"
                />
              </div>
              <button className="p-2 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-gray-600">
                <Filter size={18} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-100">
                  <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Request ID</th>
                  <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">User / Barangay</th>
                  <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Time</th>
                  <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                  <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {requests.map((req) => (
                  <tr key={req.id} className="group hover:bg-gray-50 transition-all">
                    <td className="py-4">
                      <p className="text-sm font-black text-gray-900">{req.id}</p>
                    </td>
                    <td className="py-4">
                      <p className="text-sm font-bold text-gray-900">{req.user}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{req.barangay}</p>
                    </td>
                    <td className="py-4">
                      <span className="text-xs font-bold text-gray-600">{req.timestamp}</span>
                    </td>
                    <td className="py-4 text-center">
                      <div className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest inline-block ${getStatusColor(req.status)}`}>
                        {req.status}
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <ArrowRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">14</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active Requests</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">08</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Responding</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">124</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Resolved Today</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Map View Panel */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm h-[450px] flex flex-col">
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-6 flex items-center gap-3">
            <MapPin className="text-red-600" />
            Live Incident Map
          </h3>
          <div className="flex-1 rounded-3xl overflow-hidden border border-gray-100 relative">
            <MapPlaceholder title="Emergency Requests" message="Live incident map is currently in demo mode." />
            {/* Mock Markers */}
            <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-lg animate-ping" />
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-lg animate-ping" />
          </div>
        </div>

        {/* Action Panel */}
        <div className="bg-gray-900 p-8 rounded-[40px] text-white shadow-2xl">
          <h3 className="text-sm font-black uppercase tracking-widest mb-6">Response Actions</h3>
          <div className="space-y-3">
            <button className="w-full p-4 bg-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all text-center">
              Mark as Responding
            </button>
            <button className="w-full p-4 bg-green-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-green-700 transition-all text-center">
              Mark as Resolved
            </button>
            <button className="w-full p-4 bg-white/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all text-center">
              Assign Rescue Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpRequests;
