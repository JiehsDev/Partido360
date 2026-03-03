import React from 'react';
import { 
  Users, 
  AlertCircle, 
  Wallet, 
  MapPin, 
  LifeBuoy, 
  ArrowUpRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useSystem } from '../context/SystemContext';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const AdminDashboard = () => {
  const { mode } = useSystem();

  const stats = [
    { label: 'Total Users', value: '12,482', icon: <Users />, color: 'bg-blue-500', trend: '+12%' },
    { label: 'High Risk Users', value: '3,842', icon: <AlertCircle />, color: 'bg-red-500', trend: '+5%' },
    { label: 'Cash Grants Sent', value: '₱5.7M', icon: <Wallet />, color: 'bg-green-500', trend: '+24%' },
    { label: 'Help Requests', value: '14', icon: <LifeBuoy />, color: 'bg-orange-500', trend: '-2%' },
  ];

  const chartData = [
    { name: 'Mon', users: 400, grants: 240 },
    { name: 'Tue', users: 300, grants: 139 },
    { name: 'Wed', users: 200, grants: 980 },
    { name: 'Thu', users: 278, grants: 390 },
    { name: 'Fri', users: 189, grants: 480 },
    { name: 'Sat', users: 239, grants: 380 },
    { name: 'Sun', users: 349, grants: 430 },
  ];

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* System Status Banner */}
      <div className={`p-8 lg:p-12 rounded-[40px] lg:rounded-[56px] text-white shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between relative overflow-hidden ${
        mode === 'GREEN' ? 'bg-emerald-600 shadow-emerald-900/20' :
        mode === 'YELLOW' ? 'bg-yellow-500 text-black shadow-yellow-900/20' :
        mode === 'RED' ? 'bg-rose-600 shadow-rose-900/20' : 'bg-gray-900 shadow-gray-900/20'
      }`}>
        <div className="relative z-10 w-full lg:w-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 opacity-80">Current System State</p>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-6">{mode} MODE</h2>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white/20 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10">
              <Activity size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Storm "Pepito" Active</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10">
              <TrendingUp size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Landfall in 14h</span>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full bg-white/10 skew-x-[-20deg] translate-x-1/2 hidden lg:block" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[40px] border-2 border-gray-50 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                <ArrowUpRight size={14} />
                {stat.trend}
              </div>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</p>
            <p className="text-4xl font-black text-gray-900 tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 lg:p-10 rounded-[48px] border-2 border-gray-50 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">User Registration</h3>
            <select className="bg-gray-50 border-2 border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest px-6 py-3 focus:border-blue-600 focus:ring-0 transition-all">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#9CA3AF'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#9CA3AF'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '16px' }}
                  itemStyle={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                />
                <Area type="monotone" dataKey="users" stroke="#2563EB" strokeWidth={4} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 lg:p-10 rounded-[48px] border-2 border-gray-50 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Cash Distribution</h3>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-600 rounded-full" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount (PHP)</span>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#9CA3AF'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#9CA3AF'}} />
                <Tooltip 
                  cursor={{fill: '#F9FAFB'}}
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '16px' }}
                />
                <Bar dataKey="grants" fill="#2563EB" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity / Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 lg:p-10 rounded-[48px] border-2 border-gray-50 shadow-sm">
          <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-8">Recent Help Requests</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-gray-50 rounded-[32px] border border-gray-100 hover:border-blue-100 transition-all">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <LifeBuoy size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900">Rescue Required: Barangay San Jose</p>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">User ID: #USR-8291 • 12 mins ago</p>
                  </div>
                </div>
                <button className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all active:scale-95">
                  Respond
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 p-8 lg:p-10 rounded-[48px] text-white shadow-2xl shadow-gray-200 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
          <h3 className="text-xl font-black uppercase tracking-tight mb-8 relative z-10">Quick Actions</h3>
          <div className="space-y-4 relative z-10">
            <button className="w-full p-6 bg-blue-600 rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 active:scale-[0.98] transition-all text-center shadow-xl shadow-blue-900/40">
              🚨 Trigger Cash Protocol
            </button>
            <button className="w-full p-6 bg-white/10 rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-white/20 active:scale-[0.98] transition-all text-center border border-white/10">
              📢 Send Advisory
            </button>
            <button className="w-full p-6 bg-white/10 rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-white/20 active:scale-[0.98] transition-all text-center border border-white/10">
              🗺️ Open Evac Centers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
