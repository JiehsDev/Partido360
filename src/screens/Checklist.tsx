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
    <div className="p-6 space-y-8">
      <header className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-gray-900">Preparation</h1>
          <p className="text-gray-500 font-medium text-sm">Complete tasks to earn points.</p>
        </div>
      </header>

      {/* Progress Card */}
      <div className="bg-blue-600 p-8 rounded-[40px] text-white shadow-xl shadow-blue-200 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Trophy size={24} />
            </div>
            <p className="text-4xl font-black">{Math.round(progress)}%</p>
          </div>
          <p className="text-sm font-bold opacity-80 uppercase tracking-widest mb-2">Readiness Score</p>
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleItem(item.id, item.points)}
            className={`w-full p-6 rounded-3xl border-2 transition-all flex items-center justify-between ${
              item.done
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-100 bg-white hover:border-gray-200'
            }`}
          >
            <div className="flex items-center gap-4">
              {item.done ? (
                <CheckCircle2 className="text-blue-500" size={24} />
              ) : (
                <Circle className="text-gray-300" size={24} />
              )}
              <div className="text-left">
                <p className={`font-bold ${item.done ? 'text-blue-900' : 'text-gray-700'}`}>
                  {item.label}
                </p>
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
                  +{item.points} Points
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Checklist;
