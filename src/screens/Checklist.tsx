import React, { useState, useEffect } from 'react';
import { useSystem } from '../context/SystemContext';
import { db, isFirebaseMock } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { CheckCircle2, Circle, Trophy, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const Checklist = () => {
  const { user, profile, updateProfile } = useSystem();
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: 'powerbank', label: 'Charge Powerbanks', done: false, points: 10 },
    { id: 'gobag', label: 'Prepare Go-Bag', done: false, points: 20 },
    { id: 'roof', label: 'Secure Roof & Windows', done: false, points: 30 },
    { id: 'water', label: 'Store Drinking Water', done: false, points: 15 },
    { id: 'docs', label: 'Secure Important Documents', done: false, points: 25 },
  ]);

  useEffect(() => {
    if (!user || isFirebaseMock) return;
    const fetchChecklist = async () => {
      const docRef = doc(db, 'checklists', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setItems(prev => prev.map(item => ({ ...item, done: !!data[item.id] })));
      }
    };
    fetchChecklist();
  }, [user]);

  const toggleItem = async (id: string, points: number) => {
    if (!user) return;
    const item = items.find(i => i.id === id);
    if (!item) return;

    const newDone = !item.done;
    setItems(prev => prev.map(i => i.id === id ? { ...i, done: newDone } : i));

    if (!isFirebaseMock) {
      const docRef = doc(db, 'checklists', user.uid);
      await setDoc(docRef, { [id]: newDone }, { merge: true });
    }

    // Update resilience points
    await updateProfile({
      resiliencePoints: (profile?.resiliencePoints || 0) + (newDone ? points : -points)
    });
  };

  const progress = (items.filter(i => i.done).length / items.length) * 100;

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      <header className="flex items-center gap-5">
        <button 
          onClick={() => navigate(-1)} 
          className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-100 rounded-2xl hover:bg-gray-50 transition-all shadow-sm active:scale-90"
        >
          <ArrowLeft size={20} className="text-gray-900" />
        </button>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Preparation</h1>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">Readiness Checklist</p>
        </div>
      </header>

      {/* Progress Card */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-blue-600 p-8 rounded-[40px] text-white shadow-2xl shadow-blue-100 relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <Trophy size={28} />
            </div>
            <div className="text-right">
              <p className="text-4xl font-black tracking-tighter">{Math.round(progress)}%</p>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Complete</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Readiness Score</p>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80">
                {items.filter(i => i.done).length} / {items.length} Tasks
              </p>
            </div>
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden p-0.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              />
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -left-10 -top-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />
      </motion.div>

      <div className="space-y-4 animate-slide-up">
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => toggleItem(item.id, item.points)}
            className={`w-full p-6 rounded-[32px] border-2 transition-all flex items-center justify-between group ${
              item.done
                ? 'border-blue-600 bg-blue-50 shadow-lg shadow-blue-50'
                : 'border-gray-100 bg-white hover:border-blue-200 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                item.done ? 'bg-blue-600 text-white scale-110' : 'bg-gray-50 text-gray-300'
              }`}>
                {item.done ? (
                  <CheckCircle2 size={24} />
                ) : (
                  <Circle size={24} />
                )}
              </div>
              <div className="text-left">
                <p className={`font-black text-lg tracking-tight ${item.done ? 'text-blue-900' : 'text-gray-700'}`}>
                  {item.label}
                </p>
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${item.done ? 'bg-blue-600' : 'bg-gray-300'}`} />
                  <p className={`text-[10px] font-black uppercase tracking-widest ${item.done ? 'text-blue-600' : 'text-gray-400'}`}>
                    +{item.points} Points
                  </p>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Checklist;
