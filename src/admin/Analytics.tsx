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
    <div className="space-y-8">
      {/* Top Metrics */}
      <div className="grid grid-cols-3 gap-6">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm"
          >
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{metric.label}</p>
            <div className="flex items-center gap-3 mb-2">
              <p className="text-3xl font-black text-gray-900">{metric.value}</p>
              <div className={`${metric.color} bg-current/10 p-1 rounded-full`}>
                {metric.icon}
              </div>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">{metric.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Risk Distribution */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-8">Risk Level Distribution</h3>
          <div className="h-64 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-1/2 space-y-4">
              {riskData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-bold text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-xs font-black text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Barangay Distribution */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-8">Users by Barangay</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barangayData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#9CA3AF'}} />
                <Tooltip 
                  cursor={{fill: '#F9FAFB'}}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="users" fill="#2563EB" radius={[0, 8, 8, 0]} />
                <Bar dataKey="risk" fill="#DC2626" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Help Requests Timeline */}
        <div className="col-span-2 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-8">Emergency Requests Timeline</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#9CA3AF'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#9CA3AF'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
                <Line type="monotone" dataKey="help" stroke="#DC2626" strokeWidth={3} dot={{ r: 4, fill: '#DC2626' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
