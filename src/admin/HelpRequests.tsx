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
    <div className="space-y-6 lg:space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          {/* Live Requests Table */}
          <div className="bg-white p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center border border-red-100">
                  <LifeBuoy className="text-red-600" size={20} />
                </div>
                Live Emergency Requests
              </h3>
              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search request..." 
                    className="w-full sm:w-48 pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  />
                </div>
                <button className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                  <Filter size={18} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto -mx-6 lg:-mx-8">
              <div className="inline-block min-w-full align-middle px-6 lg:px-8">
                <table className="min-w-full">
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
                        <td className="py-5">
                          <p className="text-sm font-black text-gray-900">{req.id}</p>
                        </td>
                        <td className="py-5">
                          <p className="text-sm font-black text-gray-900">{req.user}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{req.barangay}</p>
                        </td>
                        <td className="py-5">
                          <span className="text-xs font-bold text-gray-600">{req.timestamp}</span>
                        </td>
                        <td className="py-5 text-center">
                          <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest inline-block border ${getStatusColor(req.status)}`}>
                            {req.status}
                          </div>
                        </td>
                        <td className="py-5 text-right">
                          <button className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                            <ArrowRight size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
            <div className="bg-white p-6 rounded-[24px] lg:rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-4 hover:border-red-200 transition-all group">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center border border-red-100 group-hover:scale-110 transition-transform">
                <Activity size={24} />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900">14</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active Requests</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-[24px] lg:rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-4 hover:border-yellow-200 transition-all group">
              <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center border border-yellow-100 group-hover:scale-110 transition-transform">
                <AlertCircle size={24} />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900">08</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Responding</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-[24px] lg:rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-4 hover:border-green-200 transition-all group">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center border border-green-100 group-hover:scale-110 transition-transform">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900">124</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Resolved Today</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:space-y-8">
          {/* Map View Panel */}
          <div className="bg-white p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] border border-gray-100 shadow-sm h-[450px] flex flex-col">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center border border-red-100">
                <MapPin className="text-red-600" size={20} />
              </div>
              Live Incident Map
            </h3>
            <div className="flex-1 rounded-3xl overflow-hidden border border-gray-100 relative">
              <MapPlaceholder title="Emergency Requests" message="Live incident map is currently in demo mode." />
              <div className="absolute inset-0 bg-gray-900/5 pointer-events-none" />
              {/* Mock Markers */}
              <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-lg animate-ping" />
              <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-lg animate-ping" />
            </div>
          </div>

          {/* Action Panel */}
          <div className="bg-gray-900 p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl" />
            
            <h3 className="text-sm font-black uppercase tracking-widest mb-6 relative z-10">Response Actions</h3>
            <div className="space-y-3 relative z-10">
              <button className="w-full py-5 bg-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-700 active:scale-[0.98] transition-all text-center shadow-lg shadow-blue-900/40">
                Mark as Responding
              </button>
              <button className="w-full py-5 bg-green-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-green-700 active:scale-[0.98] transition-all text-center shadow-lg shadow-green-900/40">
                Mark as Resolved
              </button>
              <button className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 active:scale-[0.98] transition-all text-center">
                Assign Rescue Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpRequests;
