import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { Users, AlertCircle, Wallet, LifeBuoy, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';

const Analytics = () => {
  const riskData = [
    { name: 'High Risk', value: 3842, color: '#DC2626' },
    { name: 'Low Risk', value: 8640, color: '#10B981' },
  ];

  const barangayData = [
    { name: 'San Jose', users: 2400, risk: 800 },
    { name: 'Goa', users: 1900, risk: 400 },
    { name: 'Tigaon', users: 1500, risk: 300 },
    { name: 'Lagonoy', users: 1200, risk: 200 },
    { name: 'Sangay', users: 900, risk: 100 },
  ];

  const timelineData = [
    { time: '08:00', help: 2, resolved: 1 },
    { time: '10:00', help: 5, resolved: 3 },
    { time: '12:00', help: 12, resolved: 8 },
    { time: '14:00', help: 18, resolved: 12 },
    { time: '16:00', help: 14, resolved: 15 },
    { time: '18:00', help: 8, resolved: 10 },
  ];

  const metrics = [
    { label: 'Avg Response Time', value: '14m', sub: '2m faster than last storm', icon: <TrendingDown size={14} />, color: 'text-green-500' },
    { label: 'Most Affected', value: 'San Jose', sub: '800 high risk users', icon: <AlertCircle size={14} />, color: 'text-red-500' },
    { label: 'Vulnerable Pop.', value: '18.4%', sub: '2,296 members total', icon: <Users size={14} />, color: 'text-blue-500' },
  ];

  return (
    <div className="space-y-6 lg:space-y-8 animate-fade-in">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 lg:p-8 rounded-[24px] lg:rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all group"
          >
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">{metric.label}</p>
            <div className="flex items-center gap-4 mb-4">
              <p className="text-4xl font-black text-gray-900 tracking-tight">{metric.value}</p>
              <div className={`${metric.color} bg-current/10 p-2 rounded-xl group-hover:scale-110 transition-transform`}>
                {metric.icon}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">{metric.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Risk Distribution */}
        <div className="bg-white p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-8">Risk Level Distribution</h3>
          <div className="flex-1 flex flex-col sm:flex-row items-center gap-8">
            <div className="w-full sm:w-1/2 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '12px 20px' }}
                    itemStyle={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full sm:w-1/2 space-y-4">
              {riskData.map((item) => (
                <div key={item.name} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between group hover:border-blue-200 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.name}</span>
                  </div>
                  <span className="text-base font-black text-gray-900">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Barangay Distribution */}
        <div className="bg-white p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-8">Users by Barangay</h3>
          <div className="h-64 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barangayData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#9CA3AF', textTransform: 'uppercase'}} />
                <Tooltip 
                  cursor={{fill: '#F9FAFB'}}
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '12px 20px' }}
                />
                <Bar dataKey="users" fill="#2563EB" radius={[0, 12, 12, 0]} barSize={20} />
                <Bar dataKey="risk" fill="#DC2626" radius={[0, 12, 12, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Help Requests Timeline */}
        <div className="lg:col-span-2 bg-white p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Emergency Requests Timeline</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-600" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Help Requests</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Resolved</span>
              </div>
            </div>
          </div>
          <div className="h-80 lg:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#9CA3AF'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#9CA3AF'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '12px 20px' }}
                />
                <Line type="monotone" dataKey="help" stroke="#DC2626" strokeWidth={4} dot={{ r: 6, fill: '#DC2626', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8, strokeWidth: 0 }} />
                <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={4} dot={{ r: 6, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
