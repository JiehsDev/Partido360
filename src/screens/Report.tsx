import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSystem } from '../context/SystemContext';
import { db, storage, isFirebaseMock } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Camera, MapPin, AlertCircle, ArrowLeft, CheckCircle2, X } from 'lucide-react';
import { motion } from 'motion/react';

const Report = () => {
  const { user } = useSystem();
  const navigate = useNavigate();
  const fileInput = useRef<HTMLInputElement>(null);
  
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const categories = [
    { id: 'road', label: 'Blocked Road', icon: '🚧' },
    { id: 'power', label: 'Downed Powerline', icon: '⚡' },
    { id: 'medical', label: 'Medical Emergency', icon: '🏥' },
    { id: 'flood', label: 'Severe Flooding', icon: '🌊' },
    { id: 'structure', label: 'Structural Damage', icon: '🏚️' },
  ];

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !category) return;
    setLoading(true);
    try {
      let imageUrl = '';
      if (image && !isFirebaseMock) {
        const storageRef = ref(storage, `reports/${user.uid}/${Date.now()}_${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      } else if (image && isFirebaseMock) {
        imageUrl = preview || '';
      }

      navigator.geolocation.getCurrentPosition(async (pos) => {
        if (!isFirebaseMock) {
          await addDoc(collection(db, 'reports'), {
            userId: user.uid,
            category,
            description,
            imageUrl,
            location: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            },
            timestamp: serverTimestamp()
          });
        }
        setSuccess(true);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-6 h-screen flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-32 h-32 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
          <CheckCircle2 size={80} />
        </div>
        <h2 className="text-3xl font-black text-gray-900">Report Sent</h2>
        <p className="text-gray-500 font-medium max-w-[250px] mx-auto leading-relaxed">
          Thank you for reporting. Your report has been sent to the local authorities for verification.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:bg-black active:scale-95 transition-all"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 pb-24 animate-fade-in">
      <header className="flex items-center gap-5">
        <button 
          onClick={() => navigate(-1)} 
          className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-100 rounded-2xl hover:bg-gray-50 transition-all shadow-sm active:scale-90"
        >
          <ArrowLeft size={20} className="text-gray-900" />
        </button>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Report Damage</h1>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">Incident Reporting</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="space-y-4 animate-slide-up">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Select Category</label>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.id}
                type="button"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setCategory(cat.id)}
                className={`p-6 rounded-[32px] border-2 text-left transition-all group relative overflow-hidden ${
                  category === cat.id
                    ? 'border-blue-600 bg-blue-50 shadow-lg shadow-blue-50'
                    : 'border-gray-100 bg-white hover:border-blue-200 shadow-sm'
                }`}
              >
                <div className={`text-3xl mb-3 transition-transform group-hover:scale-125 ${category === cat.id ? 'scale-110' : ''}`}>
                  {cat.icon}
                </div>
                <p className={`text-[10px] font-black uppercase tracking-widest leading-tight ${
                  category === cat.id ? 'text-blue-700' : 'text-gray-500'
                }`}>
                  {cat.label}
                </p>
                {category === cat.id && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full" />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Photo Evidence</label>
          <div
            onClick={() => fileInput.current?.click()}
            className="w-full aspect-video bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all group relative shadow-inner"
          >
            {preview ? (
              <div className="relative w-full h-full">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <button
                  onClick={(e) => { e.stopPropagation(); setPreview(null); setImage(null); }}
                  className="absolute top-4 right-4 bg-black/60 text-white p-3 rounded-2xl backdrop-blur-md shadow-xl active:scale-90 transition-all"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mx-auto">
                  <Camera size={28} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tap to capture</p>
              </div>
            )}
          </div>
          <input ref={fileInput} type="file" accept="image/*" capture="environment" onChange={handleImage} className="hidden" />
        </div>

        <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the situation in detail..."
            className="w-full p-8 bg-white border-2 border-gray-100 rounded-[32px] focus:border-blue-600 focus:ring-0 transition-all min-h-[160px] font-bold text-gray-700 shadow-sm placeholder:text-gray-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !category}
          className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-black uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <CheckCircle2 size={20} />
              Submit Report
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Report;
