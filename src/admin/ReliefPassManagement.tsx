import React, { useState } from 'react';
import { QrCode, Search, Filter, Download, CheckCircle2, AlertCircle, Users, MapPin, Camera } from 'lucide-react';
import { motion } from 'motion/react';

const ReliefPassManagement = () => {
  const [families, setFamilies] = useState([
    { id: 'FAM-001', head: 'Juan Dela Cruz', barangay: 'San Jose', residents: 5, status: 'PENDING', timestamp: '2h ago' },
    { id: 'FAM-002', head: 'Maria Santos', barangay: 'Tigaon', residents: 4, status: 'CLAIMED', timestamp: '4h ago' },
    { id: 'FAM-003', head: 'Pedro Penduko', barangay: 'Goa', residents: 6, status: 'PENDING', timestamp: '5h ago' },
    { id: 'FAM-004', head: 'Elena Gilbert', barangay: 'Lagonoy', residents: 3, status: 'CLAIMED', timestamp: '6h ago' },
    { id: 'FAM-005', head: 'Stefan Salvatore', barangay: 'San Jose', residents: 2, status: 'PENDING', timestamp: '8h ago' },
  ]);

  const [isScanning, setIsScanning] = useState(false);

  const stats = [
    { label: 'Total Families', value: '3,842', icon: <Users />, color: 'bg-blue-500' },
    { label: 'Claimed', value: '1,248', icon: <CheckCircle2 />, color: 'bg-green-500' },
    { label: 'Pending', value: '2,594', icon: <AlertCircle />, color: 'bg-orange-500' },
    { label: 'Distribution Rate', value: '32.4%', icon: <QrCode />, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm"
          >
            <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg`}>
              {stat.icon}
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-gray-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Family QR List */}
        <div className="col-span-2 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Relief Distribution Management</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Search family..." 
                  className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold"
                />
              </div>
              <button className="p-2 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-gray-600">
                <Download size={18} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-100">
                  <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Family ID</th>
                  <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Head / Barangay</th>
                  <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Residents</th>
                  <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                  <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {families.map((fam) => (
                  <tr key={fam.id} className="group hover:bg-gray-50 transition-all">
                    <td className="py-4">
                      <p className="text-sm font-black text-gray-900">{fam.id}</p>
                    </td>
                    <td className="py-4">
                      <p className="text-sm font-bold text-gray-900">{fam.head}</p>
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        <MapPin size={10} />
                        {fam.barangay}
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <span className="text-xs font-black text-gray-900">{fam.residents}</span>
                    </td>
                    <td className="py-4 text-center">
                      <div className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest inline-block ${
                        fam.status === 'CLAIMED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {fam.status}
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <button className="px-4 py-2 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">
                        Mark Claimed
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Scanner Mode Panel */}
        <div className="col-span-1 space-y-8">
          <div className="bg-gray-900 p-8 rounded-[40px] text-white shadow-2xl overflow-hidden relative">
            <h3 className="text-lg font-black uppercase tracking-tight mb-8 flex items-center gap-3">
              <QrCode className="text-blue-400" />
              Scanner Mode
            </h3>
            
            <div className="aspect-square bg-white/5 rounded-3xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center relative group cursor-pointer hover:bg-white/10 transition-all">
              {isScanning ? (
                <div className="w-full h-full relative">
                  <div className="absolute inset-0 bg-blue-500/20 animate-pulse" />
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-[scan_2s_linear_infinite]" />
                  <div className="w-full h-full flex items-center justify-center">
                    <Camera size={64} className="text-white/20" />
                  </div>
                </div>
              ) : (
                <>
                  <Camera size={48} className="text-gray-600 mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tap to start scanner</p>
                </>
              )}
              
              <button 
                onClick={() => setIsScanning(!isScanning)}
                className="absolute inset-0 w-full h-full opacity-0"
              />
            </div>

            <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[10px] font-bold text-gray-400 leading-relaxed text-center">
                Scan family QR codes to verify and mark relief distribution as claimed.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Distribution Progress</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <p className="text-2xl font-black text-gray-900">1,248</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">32.4% Complete</p>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '32.4%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default ReliefPassManagement;
