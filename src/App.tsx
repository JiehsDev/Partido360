import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SystemProvider, useSystem } from './context/SystemContext';
import Login from './screens/Login';
import RiskProfile from './screens/RiskProfile';
import WalletLink from './screens/WalletLink';
import Dashboard from './screens/Dashboard';
import Checklist from './screens/Checklist';
import EvacuationMap from './screens/EvacuationMap';
import Emergency from './screens/Emergency';
import Report from './screens/Report';
import ReliefPass from './screens/ReliefPass';
import SafeRoute from './screens/SafeRoute';

// Admin Screens
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import StormControl from './admin/StormControl';
import CashProtocol from './admin/CashProtocol';
import EvacuationCenters from './admin/EvacuationCenters';
import HelpRequests from './admin/HelpRequests';
import DamageReports from './admin/DamageReports';
import ReliefPassManagement from './admin/ReliefPassManagement';
import Analytics from './admin/Analytics';
import AdminSettings from './admin/AdminSettings';

import { AlertTriangle, Settings } from 'lucide-react';
import { useState } from 'react';

const PhaseSwitcher = () => {
  const { mode, setMode } = useSystem();

  const phases = [
    { id: 'GREEN', color: 'bg-green-500', label: 'Safe' },
    { id: 'YELLOW', color: 'bg-yellow-500', label: 'Watch' },
    { id: 'RED', color: 'bg-red-600', label: 'Alert' },
    { id: 'EMERGENCY', color: 'bg-gray-900', label: 'Post' },
  ] as const;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-2xl border border-white/20 flex items-center gap-1">
      {phases.map((p) => (
        <button
          key={p.id}
          onClick={() => setMode(p.id)}
          className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
            mode === p.id
              ? `${p.color} text-white scale-105 shadow-lg`
              : 'text-gray-400 hover:bg-gray-100'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${mode === p.id ? 'bg-white' : p.color}`} />
          {p.label}
        </button>
      ))}
    </div>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useSystem();
  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { mode } = useSystem();
  
  const getBannerColor = () => {
    switch (mode) {
      case 'YELLOW': return 'bg-yellow-500 text-black';
      case 'RED': return 'bg-red-600 text-white';
      case 'EMERGENCY': return 'bg-gray-900 text-white';
      default: return 'hidden';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className={`${getBannerColor()} px-4 py-2 text-center text-sm font-bold sticky top-0 z-40 flex items-center justify-center gap-2`}>
        <AlertTriangle size={16} />
        {mode === 'YELLOW' && 'STORM ADVISORY: Monitoring Tropical Storm "Pepito"'}
        {mode === 'RED' && 'CRITICAL ALERT: EVACUATION ADVISED'}
        {mode === 'EMERGENCY' && 'EMERGENCY MODE: POST-IMPACT RESPONSE'}
      </div>
      <main className="max-w-md mx-auto min-h-screen relative">
        {children}
      </main>
      <PhaseSwitcher />
    </div>
  );
};

export default function App() {
  return (
    <SystemProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={
            <AdminLayout>
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/storm" element={<StormControl />} />
                <Route path="/cash" element={<CashProtocol />} />
                <Route path="/evac" element={<EvacuationCenters />} />
                <Route path="/help" element={<HelpRequests />} />
                <Route path="/reports" element={<DamageReports />} />
                <Route path="/relief" element={<ReliefPassManagement />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<AdminSettings />} />
              </Routes>
            </AdminLayout>
          } />

          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/risk-profile" element={<RiskProfile />} />
                    <Route path="/wallet-link" element={<WalletLink />} />
                    <Route path="/checklist" element={<Checklist />} />
                    <Route path="/evacuation-map" element={<EvacuationMap />} />
                    <Route path="/emergency" element={<Emergency />} />
                    <Route path="/report" element={<Report />} />
                    <Route path="/relief-pass" element={<ReliefPass />} />
                    <Route path="/safe-route" element={<SafeRoute />} />
                  </Routes>
                </MainLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </SystemProvider>
  );
}
