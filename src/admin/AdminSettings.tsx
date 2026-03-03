import React from 'react';
import { Settings, Users, Bell, Shield, History, Plus, Trash2, Edit2, Lock, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

const AdminSettings = () => {
  const admins = [
    { id: 1, name: 'Admin One', email: 'admin1@partido.gov.ph', role: 'Super Admin', status: 'Active' },
    { id: 2, name: 'Admin Two', email: 'admin2@partido.gov.ph', role: 'Operator', status: 'Active' },
    { id: 3, name: 'Admin Three', email: 'admin3@partido.gov.ph', role: 'Viewer', status: 'Inactive' },
  ];

  return (
    <div className="space-y-6 lg:space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          {/* User Management */}
          <div className="bg-white p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                  <Users className="text-blue-600" size={20} />
                </div>
                Admin User Management
              </h3>
              <button className="bg-blue-600 text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-900/20">
                <Plus size={18} />
                Add Admin
              </button>
            </div>
            <div className="overflow-x-auto -mx-6 lg:-mx-8">
              <div className="inline-block min-w-full align-middle px-6 lg:px-8">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-100">
                      <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Admin Name</th>
                      <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
                      <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                      <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {admins.map((admin) => (
                      <tr key={admin.id} className="group hover:bg-gray-50 transition-all">
                        <td className="py-5">
                          <p className="text-sm font-black text-gray-900">{admin.name}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{admin.email}</p>
                        </td>
                        <td className="py-5">
                          <span className="text-xs font-bold text-gray-600">{admin.role}</span>
                        </td>
                        <td className="py-5 text-center">
                          <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest inline-block border ${
                            admin.status === 'Active' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-gray-50 text-gray-600 border-gray-100'
                          }`}>
                            {admin.status}
                          </div>
                        </td>
                        <td className="py-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                              <Edit2 size={16} />
                            </button>
                            <button className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                <Bell className="text-blue-600" size={20} />
              </div>
              Notification Settings
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Auto Alert on RED Mode', sub: 'Immediately notify all users when state changes to RED.', icon: <Shield size={20} /> },
                { label: 'Auto Cash Trigger', sub: 'Automatically dispatch cash grants when RED mode is activated.', icon: <Lock size={20} /> },
                { label: 'SMS Fallback', sub: 'Send SMS alerts to users without active internet connection.', icon: <Smartphone size={20} /> },
              ].map((setting) => (
                <div key={setting.label} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-gray-50 rounded-[24px] border border-gray-100 hover:border-blue-200 transition-all group gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform border border-gray-100">
                      {setting.icon}
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-900">{setting.label}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{setting.sub}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Enabled</span>
                    <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer shadow-inner">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:space-y-8">
          {/* System Logs */}
          <div className="bg-gray-900 p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] text-white shadow-2xl h-fit relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl" />
            
            <h3 className="text-lg font-black uppercase tracking-tight mb-8 flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                <History className="text-blue-400" size={20} />
              </div>
              System Audit Logs
            </h3>
            <div className="space-y-3 relative z-10">
              {[
                { action: 'State Change: RED', time: '2h ago', user: 'Admin One' },
                { action: 'Cash Protocol Triggered', time: '2h ago', user: 'Admin One' },
                { action: 'Evac Center #3 Opened', time: '5h ago', user: 'Admin Two' },
                { action: 'New Admin Added', time: '1d ago', user: 'Super Admin' },
                { action: 'System Backup Complete', time: '2d ago', user: 'System' },
              ].map((log, i) => (
                <div key={i} className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group">
                  <p className="text-xs font-black text-white mb-2 group-hover:text-blue-400 transition-colors">{log.action}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{log.user}</p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 active:scale-[0.98] transition-all relative z-10">
              View All Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
