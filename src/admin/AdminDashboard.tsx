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
    <div className="space-y-8">
      {/* System Status Banner */}
      <div className={`p-8 rounded-[40px] text-white shadow-2xl flex items-center justify-between relative overflow-hidden ${
        mode === 'GREEN' ? 'bg-green-600' :
        mode === 'YELLOW' ? 'bg-yellow-500 text-black' :
        mode === 'RED' ? 'bg-red-600' : 'bg-gray-900'
      }`}>
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] mb-2 opacity-80">Current System State</p>
          <h2 className="text-5xl font-black tracking-tighter mb-4">{mode} MODE</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
              <Activity size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Storm "Pepito" Active</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
              <TrendingUp size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Landfall in 14h</span>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full bg-white/10 skew-x-[-20deg] translate-x-1/2" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                {stat.icon}
              </div>
              <div className="flex items-center gap-1 text-green-500 text-xs font-black">
                <ArrowUpRight size={14} />
                {stat.trend}
              </div>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-gray-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">User Registration Trend</h3>
            <select className="bg-gray-50 border-none rounded-xl text-xs font-bold px-4 py-2">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#9CA3AF'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#9CA3AF'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 700 }}
                />
                <Area type="monotone" dataKey="users" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Cash Grants Distribution</h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount (PHP)</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#9CA3AF'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#9CA3AF'}} />
                <Tooltip 
                  cursor={{fill: '#F9FAFB'}}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="grants" fill="#2563EB" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity / Quick Actions */}
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-6">Recent Help Requests</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                    <LifeBuoy size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Rescue Required: Barangay San Jose</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">User ID: #USR-8291 • 12 mins ago</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
                  Respond
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 p-8 rounded-[40px] text-white shadow-xl">
          <h3 className="text-lg font-black uppercase tracking-tight mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full p-4 bg-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all text-center">
              🚨 Trigger Cash Protocol
            </button>
            <button className="w-full p-4 bg-white/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all text-center">
              📢 Send Advisory
            </button>
            <button className="w-full p-4 bg-white/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all text-center">
              🗺️ Open Evac Centers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
