import React, { useState } from 'react';
import { Camera, MapPin, CheckCircle2, AlertCircle, Search, Filter, X, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

const DamageReports = () => {
  const [reports, setReports] = useState([
    { id: 'REP-001', category: 'Blocked Road', barangay: 'San Jose', timestamp: '12 mins ago', status: 'PENDING', image: 'https://picsum.photos/seed/road/400/300' },
    { id: 'REP-002', category: 'Downed Powerline', barangay: 'Goa', timestamp: '24 mins ago', status: 'VALIDATED', image: 'https://picsum.photos/seed/power/400/300' },
    { id: 'REP-003', category: 'Severe Flooding', barangay: 'Tigaon', timestamp: '45 mins ago', status: 'ESCALATED', image: 'https://picsum.photos/seed/flood/400/300' },
    { id: 'REP-004', category: 'Structural Damage', barangay: 'Lagonoy', timestamp: '1h ago', status: 'PENDING', image: 'https://picsum.photos/seed/house/400/300' },
    { id: 'REP-005', category: 'Blocked Road', barangay: 'San Jose', timestamp: '2h ago', status: 'CLOSED', image: 'https://picsum.photos/seed/debris/400/300' },
    { id: 'REP-006', category: 'Medical Emergency', barangay: 'Goa', timestamp: '3h ago', status: 'PENDING', image: 'https://picsum.photos/seed/medical/400/300' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-700';
      case 'VALIDATED': return 'bg-green-100 text-green-700';
      case 'ESCALATED': return 'bg-red-100 text-red-700';
      case 'CLOSED': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category:</span>
            <select className="bg-gray-50 border-none rounded-xl text-xs font-bold px-4 py-2">
              <option>All Categories</option>
              <option>Blocked Road</option>
              <option>Downed Powerline</option>
              <option>Severe Flooding</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Barangay:</span>
            <select className="bg-gray-50 border-none rounded-xl text-xs font-bold px-4 py-2">
              <option>All Barangays</option>
              <option>San Jose</option>
              <option>Goa</option>
              <option>Tigaon</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold"
            />
          </div>
          <button className="p-2 bg-gray-900 text-white rounded-xl hover:bg-black transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Report Grid */}
      <div className="grid grid-cols-3 gap-8">
        {reports.map((report, i) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden group"
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={report.image} 
                alt={report.category} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${getStatusColor(report.status)}`}>
                  {report.status}
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all">
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-gray-900">{report.category}</h4>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                    <MapPin size={12} />
                    {report.barangay} • {report.timestamp}
                  </div>
                </div>
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                  <Camera size={20} />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="flex-1 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
                  Validate
                </button>
                <button className="flex-1 py-3 bg-gray-50 text-gray-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all">
                  Escalate
                </button>
                <button className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all">
                  <X size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-4">
        <button className="px-8 py-4 bg-white border border-gray-200 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all shadow-sm">
          Load More Reports
        </button>
      </div>
    </div>
  );
};

export default DamageReports;
