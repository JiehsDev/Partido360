import React, { useState } from 'react';
import { MapPin, Users, Plus, Edit2, Trash2, Search, Filter, AlertCircle, X } from 'lucide-react';
import MapPlaceholder from '../components/MapPlaceholder';
import { motion, AnimatePresence } from 'motion/react';

const EvacuationCenters = () => {
  const [centers, setCenters] = useState([
    { id: 1, name: 'Partido State University Gym', barangay: 'San Jose', capacity: 500, current: 425, status: 'OPEN' },
    { id: 2, name: 'Goa Central School', barangay: 'Goa', capacity: 300, current: 120, status: 'OPEN' },
    { id: 3, name: 'San Jose Municipal Hall', barangay: 'San Jose', capacity: 200, current: 200, status: 'FULL' },
    { id: 4, name: 'Lagonoy Sports Complex', barangay: 'Lagonoy', capacity: 600, current: 0, status: 'PREPARING' },
    { id: 5, name: 'Tigaon Public Market', barangay: 'Tigaon', capacity: 150, current: 0, status: 'CLOSED' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCenter, setEditingCenter] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', barangay: '', capacity: 0, current: 0 });

  const handleOpenAdd = () => {
    setEditingCenter(null);
    setFormData({ name: '', barangay: '', capacity: 0, current: 0 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (center: any) => {
    setEditingCenter(center);
    setFormData({ 
      name: center.name, 
      barangay: center.barangay, 
      capacity: center.capacity, 
      current: center.current 
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCenter) {
      setCenters(prev => prev.map(c => c.id === editingCenter.id ? { 
        ...c, 
        ...formData,
        status: formData.current >= formData.capacity ? 'FULL' : formData.current > 0 ? 'OPEN' : 'PREPARING'
      } : c));
    } else {
      const newCenter = {
        id: Date.now(),
        ...formData,
        status: formData.current >= formData.capacity ? 'FULL' : formData.current > 0 ? 'OPEN' : 'PREPARING'
      };
      setCenters(prev => [...prev, newCenter]);
    }
    setIsModalOpen(false);
  };

  const deleteCenter = (id: number) => {
    setCenters(prev => prev.filter(c => c.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-green-100 text-green-700';
      case 'FULL': return 'bg-red-100 text-red-700';
      case 'PREPARING': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 lg:space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Center List */}
        <div className="lg:col-span-2 bg-white p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Evacuation Center Management</h3>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search center..." 
                  className="w-full sm:w-48 pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                />
              </div>
              <button 
                onClick={handleOpenAdd}
                className="bg-blue-600 text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-900/20"
              >
                <Plus size={18} />
                Add Center
              </button>
            </div>
          </div>

          <div className="overflow-x-auto -mx-6 lg:-mx-8">
            <div className="inline-block min-w-full align-middle px-6 lg:px-8">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left border-b border-gray-100">
                    <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Center Name</th>
                    <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Barangay</th>
                    <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Occupancy</th>
                    <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                    <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {centers.map((center) => (
                    <tr key={center.id} className="group hover:bg-gray-50 transition-all">
                      <td className="py-5">
                        <p className="text-sm font-black text-gray-900">{center.name}</p>
                      </td>
                      <td className="py-5">
                        <span className="text-xs font-bold text-gray-600">{center.barangay}</span>
                      </td>
                      <td className="py-5">
                        <div className="flex flex-col items-center gap-1.5">
                          <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${
                                (center.current / center.capacity) > 0.9 ? 'bg-red-500' : 'bg-blue-500'
                              }`}
                              style={{ width: `${(center.current / center.capacity) * 100}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-black text-gray-900">
                            {center.current} / {center.capacity}
                          </span>
                        </div>
                      </td>
                      <td className="py-5 text-center">
                        <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest inline-block border ${getStatusColor(center.status)}`}>
                          {center.status}
                        </div>
                      </td>
                      <td className="py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleOpenEdit(center)}
                            className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => deleteCenter(center.id)}
                            className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          >
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

        {/* Map View Panel */}
        <div className="lg:col-span-1 space-y-6 lg:space-y-8">
          <div className="bg-white p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] border border-gray-100 shadow-sm h-[400px] flex flex-col">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-6">Live Map View</h3>
            <div className="flex-1 rounded-3xl overflow-hidden border border-gray-100 relative">
              <MapPlaceholder title="Evacuation Centers" message="Admin map view is currently in demo mode." />
              <div className="absolute inset-0 bg-gray-900/5 pointer-events-none" />
            </div>
          </div>

          <div className="bg-gray-900 p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl" />
            
            <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-3 relative z-10">
              <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                <AlertCircle size={16} className="text-yellow-500" />
              </div>
              Capacity Summary
            </h3>
            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-3xl font-black">{centers.reduce((acc, c) => acc + c.current, 0)}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Occupants</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-blue-400">{centers.reduce((acc, c) => acc + c.capacity, 0)}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Capacity</p>
                </div>
              </div>
              <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden p-1">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-1000" 
                  style={{ width: `${(centers.reduce((acc, c) => acc + c.current, 0) / centers.reduce((acc, c) => acc + c.capacity, 0)) * 100}%` }} 
                />
              </div>
              <p className="text-[10px] font-black text-gray-500 text-center uppercase tracking-[0.2em]">
                {Math.round((centers.reduce((acc, c) => acc + c.current, 0) / centers.reduce((acc, c) => acc + c.capacity, 0)) * 100)}% Overall District Occupancy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-lg rounded-[48px] p-8 lg:p-12 shadow-2xl relative z-10 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                  {editingCenter ? 'Edit Center' : 'Add New Center'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-all">
                  <X size={24} className="text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Center Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl transition-all font-bold outline-none"
                    placeholder="e.g. PSU Gym"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Barangay</label>
                  <input 
                    type="text" 
                    required
                    value={formData.barangay}
                    onChange={e => setFormData({...formData, barangay: e.target.value})}
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl transition-all font-bold outline-none"
                    placeholder="e.g. San Jose"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Capacity</label>
                    <input 
                      type="number" 
                      required
                      value={formData.capacity}
                      onChange={e => setFormData({...formData, capacity: parseInt(e.target.value)})}
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl transition-all font-bold outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Current</label>
                    <input 
                      type="number" 
                      required
                      value={formData.current}
                      onChange={e => setFormData({...formData, current: parseInt(e.target.value)})}
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl transition-all font-bold outline-none"
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-900/20 hover:bg-blue-700 active:scale-[0.98] transition-all mt-4"
                >
                  {editingCenter ? 'Update Center' : 'Create Center'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EvacuationCenters;
