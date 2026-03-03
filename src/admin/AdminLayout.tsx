import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CloudRain, 
  Wallet, 
  MapPin, 
  LifeBuoy, 
  Camera, 
  QrCode, 
  BarChart3, 
  Settings, 
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { useSystem } from '../context/SystemContext';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mode } = useSystem();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { id: 'storm', label: 'Storm Control', icon: <CloudRain size={20} />, path: '/admin/storm' },
    { id: 'cash', label: 'Cash Protocol', icon: <Wallet size={20} />, path: '/admin/cash' },
    { id: 'evac', label: 'Evac Centers', icon: <MapPin size={20} />, path: '/admin/evac' },
    { id: 'help', label: 'Help Requests', icon: <LifeBuoy size={20} />, path: '/admin/help' },
    { id: 'reports', label: 'Damage Reports', icon: <Camera size={20} />, path: '/admin/reports' },
    { id: 'relief', label: 'Relief Pass', icon: <QrCode size={20} />, path: '/admin/relief' },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} />, path: '/admin/analytics' },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
  ];

  const handleLogout = () => {
    // Mock logout
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight">PARTIDO</h1>
            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Admin Command</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                location.pathname === item.path
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-900/20 transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white border-bottom border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black text-gray-900">
              {navItems.find(item => item.path === location.pathname)?.label || 'Admin'}
            </h2>
            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
              mode === 'GREEN' ? 'bg-green-100 text-green-700' :
              mode === 'YELLOW' ? 'bg-yellow-100 text-yellow-700' :
              mode === 'RED' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {mode} MODE
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right mr-4">
              <p className="text-xs font-bold text-gray-900">Command Center</p>
              <p className="text-[10px] font-bold text-gray-400">v1.2.0-beta</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 border border-gray-200">
              <Settings size={20} />
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
