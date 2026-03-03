import React, { useState } from 'react';
import { Wallet, Users, AlertCircle, CheckCircle2, Filter, Search, Download } from 'lucide-react';
import { motion } from 'motion/react';

const CashProtocol = () => {
  const [amount, setAmount] = useState('1500');
  const [target, setTarget] = useState('High Risk Only');
  const [isTriggering, setIsTriggering] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const highRiskUsers = [
    { id: 'USR-001', name: 'Juan Dela Cruz', barangay: 'San Jose', risk: 'HIGH', wallet: 'GCash', residents: 5, vulnerable: 2 },
    { id: 'USR-002', name: 'Maria Santos', barangay: 'Tigaon', risk: 'HIGH', wallet: 'Maya', residents: 4, vulnerable: 1 },
    { id: 'USR-003', name: 'Pedro Penduko', barangay: 'Goa', risk: 'HIGH', wallet: 'GCash', residents: 6, vulnerable: 3 },
    { id: 'USR-004', name: 'Elena Gilbert', barangay: 'Lagonoy', risk: 'HIGH', wallet: 'Maya', residents: 3, vulnerable: 0 },
    { id: 'USR-005', name: 'Stefan Salvatore', barangay: 'San Jose', risk: 'HIGH', wallet: 'GCash', residents: 2, vulnerable: 1 },
  ];

  const handleTrigger = () => {
    setIsTriggering(true);
    setTimeout(() => {
      setIsTriggering(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-8">
        {/* Cash Trigger Panel */}
        <div className="col-span-1 bg-gray-900 p-8 rounded-[40px] text-white shadow-2xl h-fit">
          <h3 className="text-lg font-black uppercase tracking-tight mb-8 flex items-center gap-3">
            <Wallet className="text-blue-400" />
            Cash Trigger Panel
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Grant Amount (PHP)</label>
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 font-black text-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Target Audience</label>
              <select 
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold text-sm appearance-none"
              >
                <option className="bg-gray-900">High Risk Only</option>
                <option className="bg-gray-900">All Users</option>
                <option className="bg-gray-900">Specific Barangay</option>
              </select>
            </div>
            <div className="p-4 bg-blue-600/10 border border-blue-600/20 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <Users size={14} className="text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Estimated Impact</span>
              </div>
              <p className="text-sm font-bold">3,842 Users • ₱5,763,000 Total</p>
            </div>
            <button 
              onClick={handleTrigger}
              disabled={isTriggering}
              className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
                isTriggering ? 'bg-gray-800 text-gray-500' : 'bg-red-600 text-white shadow-xl shadow-red-900/50 hover:bg-red-700 active:scale-95'
              }`}
            >
              {isTriggering ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-500 border-t-white rounded-full animate-spin" />
                  Processing Batch...
                </>
              ) : (
                <>
                  <AlertCircle size={20} />
                  🚨 Activate Cash Protocol
                </>
              )}
            </button>
          </div>
        </div>

        {/* High Risk User List */}
        <div className="col-span-2 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">High Risk User List</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Search user..." 
                  className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold"
                />
              </div>
              <button className="p-2 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-gray-600">
                <Filter size={18} />
              </button>
              <button className="p-2 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-gray-600">
                <Download size={18} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-100">
                  <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">User</th>
                  <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Barangay</th>
                  <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Wallet</th>
                  <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">HH Size</th>
                  <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {highRiskUsers.map((user) => (
                  <tr key={user.id} className="group hover:bg-gray-50 transition-all">
                    <td className="py-4">
                      <p className="text-sm font-bold text-gray-900">{user.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{user.id}</p>
                    </td>
                    <td className="py-4">
                      <span className="text-xs font-bold text-gray-600">{user.barangay}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${user.wallet === 'GCash' ? 'bg-blue-500' : 'bg-green-500'}`} />
                        <span className="text-xs font-bold text-gray-600">{user.wallet}</span>
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <span className="text-xs font-black text-gray-900">{user.residents}</span>
                      <span className="text-[10px] text-gray-400 font-bold ml-1">({user.vulnerable}V)</span>
                    </td>
                    <td className="py-4 text-center">
                      <div className="px-2 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-black uppercase tracking-widest inline-block">
                        Linked
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Transaction Log */}
      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
        <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-8">Recent Transaction Log</h3>
        <div className="grid grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Wallet size={20} className="text-blue-600" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Success</p>
                  <p className="text-[10px] font-bold text-gray-400">2m ago</p>
                </div>
              </div>
              <p className="text-sm font-black text-gray-900 mb-1">₱1,500.00</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Ref: TXN-8291-00{i}</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full" />
                <p className="text-[10px] font-bold text-gray-600">Juan Dela Cruz</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Modal Overlay */}
      {showSuccess && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-gray-900/80 backdrop-blur-sm flex items-center justify-center p-6"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-[48px] p-12 text-center max-w-sm shadow-2xl"
          >
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={64} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Protocol Activated</h2>
            <p className="text-gray-500 font-medium mb-8 leading-relaxed">
              Cash grants have been successfully dispatched to 3,842 high-risk users.
            </p>
            <button 
              onClick={() => setShowSuccess(false)}
              className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs"
            >
              Close Window
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CashProtocol;
