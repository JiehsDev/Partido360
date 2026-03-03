import React, { useState } from 'react';
import { Camera, MapPin, CheckCircle2, AlertCircle, Search, Filter, X, ExternalLink, Activity } from 'lucide-react';
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
    <div className="space-y-6 lg:space-y-8 animate-fade-in">
      {/* Filter Bar */}
      <div className="bg-white p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] border border-gray-100 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-8">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest min-w-[60px]">Category:</span>
            <select className="flex-1 sm:flex-none bg-gray-50 border-2 border-gray-100 rounded-xl text-xs font-bold px-4 py-2.5 focus:border-blue-500 transition-all outline-none appearance-none">
              <option>All Categories</option>
              <option>Blocked Road</option>
              <option>Downed Powerline</option>
              <option>Severe Flooding</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest min-w-[60px]">Barangay:</span>
            <select className="flex-1 sm:flex-none bg-gray-50 border-2 border-gray-100 rounded-xl text-xs font-bold px-4 py-2.5 focus:border-blue-500 transition-all outline-none appearance-none">
              <option>All Barangays</option>
              <option>San Jose</option>
              <option>Goa</option>
              <option>Tigaon</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="w-full sm:w-64 pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            />
          </div>
          <button className="p-3 bg-gray-900 text-white rounded-xl hover:bg-black transition-all shadow-lg shadow-gray-900/20">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Report Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {reports.map((report, i) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-[32px] lg:rounded-[40px] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500"
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={report.image} 
                alt={report.category} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute top-4 left-4">
                <div className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md border border-white/20 ${getStatusColor(report.status)}`}>
                  {report.status}
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <button className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all border border-white/20">
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
            <div className="p-6 lg:p-8 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="text-base font-black text-gray-900 leading-tight mb-2">{report.category}</h4>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-blue-500" />
                      {report.barangay}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Activity size={12} className="text-gray-400" />
                      {report.timestamp}
                    </div>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 border border-gray-100 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-all">
                  <Camera size={24} />
                </div>
              </div>
              
              <div className="flex items-center gap-3 pt-2">
                <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-900/20">
                  Validate
                </button>
                <button className="flex-1 py-4 bg-gray-50 text-gray-600 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-100 active:scale-[0.98] transition-all">
                  Escalate
                </button>
                <button className="p-4 bg-red-50 text-red-400 border border-red-100 rounded-2xl hover:bg-red-100 hover:text-red-600 active:scale-[0.98] transition-all">
                  <X size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-8">
        <button className="px-10 py-5 bg-white border-2 border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:bg-gray-50 hover:border-blue-200 hover:text-blue-600 transition-all shadow-sm active:scale-[0.98]">
          Load More Reports
        </button>
      </div>
    </div>
  );
};

export default DamageReports;
