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
    <div className="p-6 space-y-8 pb-24">
      <header className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-gray-900">Report Damage</h1>
          <p className="text-gray-500 font-medium text-sm">Help us assess the impact.</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Select Category</label>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  category === cat.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                <div className="text-2xl mb-2">{cat.icon}</div>
                <p className={`text-xs font-black uppercase tracking-widest ${
                  category === cat.id ? 'text-blue-700' : 'text-gray-500'
                }`}>
                  {cat.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Photo Evidence</label>
          <div
            onClick={() => fileInput.current?.click()}
            className="w-full aspect-video bg-gray-100 rounded-3xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-50 transition-all"
          >
            {preview ? (
              <div className="relative w-full h-full">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <button
                  onClick={(e) => { e.stopPropagation(); setPreview(null); setImage(null); }}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full backdrop-blur"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <Camera size={48} className="text-gray-400 mb-2" />
                <p className="text-sm font-bold text-gray-400">Tap to take photo</p>
              </>
            )}
          </div>
          <input ref={fileInput} type="file" accept="image/*" capture="environment" onChange={handleImage} className="hidden" />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details about the situation..."
            className="w-full p-6 bg-gray-100 border-none rounded-3xl focus:ring-2 focus:ring-blue-500 min-h-[150px] font-medium"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !category}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? 'Submitting Report...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
};

export default Report;
