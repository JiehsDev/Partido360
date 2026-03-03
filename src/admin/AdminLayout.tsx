import React, { useState } from 'react';
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
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { useSystem } from '../context/SystemContext';
import { motion, AnimatePresence } from 'motion/react';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mode } = useSystem();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    navigate('/admin/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      <div className="p-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/20">
          <ShieldCheck size={28} />
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tighter">PARTIDO 360</h1>
          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Admin Command</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            onClick={() => setIsSidebarOpen(false)}
            className={`flex items-center gap-4 px-5 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all ${
              location.pathname === item.path
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/50 scale-[1.02]'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <span className={location.pathname === item.path ? 'text-white' : 'text-gray-500'}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest text-rose-400 hover:bg-rose-900/20 transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col shadow-2xl z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 z-50 lg:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative custom-scrollbar">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 lg:px-10 py-5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4 lg:gap-6">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden w-12 h-12 flex items-center justify-center bg-gray-50 rounded-2xl text-gray-900 active:scale-90 transition-all"
            >
              <Menu size={24} />
            </button>
            <div>
              <h2 className="text-xl lg:text-2xl font-black text-gray-900 tracking-tight">
                {navItems.find(item => item.path === location.pathname)?.label || 'Admin'}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  mode === 'GREEN' ? 'bg-emerald-500' :
                  mode === 'YELLOW' ? 'bg-yellow-500' :
                  mode === 'RED' ? 'bg-rose-500' : 'bg-gray-500'
                }`} />
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">
                  {mode} MODE ACTIVE
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="hidden sm:block text-right">
              <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Command Center</p>
              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-0.5">v1.2.0-beta</p>
            </div>
            <button className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 border border-gray-100 hover:bg-gray-100 transition-all active:scale-90">
              <Settings size={20} />
            </button>
          </div>
        </header>

        <div className="p-6 lg:p-10 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
