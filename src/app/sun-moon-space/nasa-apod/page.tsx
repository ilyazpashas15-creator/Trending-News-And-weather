'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Calendar,
  Download,
  ExternalLink,
  RefreshCw,
  Eye,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Share2,
  Camera,
} from 'lucide-react';
import astronomyService from '@/services/astronomyService';

interface APODItem {
  title: string;
  date: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: string;
  copyright?: string;
}

const CURATED_PRESETS: { label: string; date: string; title: string; image: string; explanation: string; credit: string }[] = [
  {
    label: 'Pillars of Creation',
    date: '2026-09-08',
    title: 'Pillars of Creation in High Definition',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1400&auto=format&fit=crop',
    explanation:
      'Captured in mid-infrared wavelengths, the towering tendrils of gas and dust known as the Pillars of Creation lie at the heart of the Eagle Nebula (M16), roughly 6,500 light-years away. Within these majestic columns, embryonic stars form inside dense globules of molecular hydrogen gas.',
    credit: 'NASA, ESA, CSA, STScI (JWST)',
  },
  {
    label: 'Andromeda Galaxy',
    date: '2026-08-20',
    title: 'M31: The Great Galaxy in Andromeda',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1400&auto=format&fit=crop',
    explanation:
      'At 2.5 million light-years away, the Andromeda Galaxy is the closest major spiral galaxy to our own Milky Way. Spanning roughly 220,000 light-years across, its billions of stars and winding spiral dust lanes shine with majestic celestial brilliance.',
    credit: 'Robert Gendler & Subaru Telescope',
  },
  {
    label: 'Carina Nebula',
    date: '2026-07-12',
    title: 'Cosmic Cliffs of the Carina Nebula',
    image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1400&auto=format&fit=crop',
    explanation:
      'Looking like craggy mountains on a moonlit evening, this landscape of "mountains" and "valleys" is actually the edge of a nearby, young, star-forming region named NGC 3324 in the Carina Nebula, revealing previously invisible areas of stellar birth.',
    credit: 'NASA, ESA, CSA, STScI',
  },
  {
    label: 'Saturn\'s Rings',
    date: '2026-06-05',
    title: 'Saturn at Equinox from Cassini',
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1400&auto=format&fit=crop',
    explanation:
      'During Saturnian equinox, sunlight strikes the rings edge-on, casting dramatic shadows and highlighting structures that rise miles above the main ring plane. Cassini captured this panoramic composite over an eight-hour photographic sequence.',
    credit: 'NASA / JPL / Space Science Institute',
  },
];

export default function NASAAPODPage() {
  const [apodData, setApodData] = useState<APODItem>({
    title: CURATED_PRESETS[0].title,
    date: CURATED_PRESETS[0].date,
    explanation: CURATED_PRESETS[0].explanation,
    url: CURATED_PRESETS[0].image,
    hdurl: CURATED_PRESETS[0].image,
    media_type: 'image',
    copyright: CURATED_PRESETS[0].credit,
  });
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const loadApod = async (dateStr?: string) => {
    setLoading(true);
    try {
      const data = await astronomyService.getAPOD(dateStr);
      if (data?.title) {
        setApodData(data);
      } else {
        const found = CURATED_PRESETS.find((p) => p.date === dateStr) || CURATED_PRESETS[0];
        setApodData({
          title: found.title,
          date: found.date,
          explanation: found.explanation,
          url: found.image,
          hdurl: found.image,
          media_type: 'image',
          copyright: found.credit,
        });
      }
    } catch {
      const found = CURATED_PRESETS[0];
      setApodData({
        title: found.title,
        date: found.date,
        explanation: found.explanation,
        url: found.image,
        hdurl: found.image,
        media_type: 'image',
        copyright: found.credit,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSelectedDate(val);
    if (val) loadApod(val);
  };

  const toggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(apodData.explanation);
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Ambient Deep Space Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[350px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl opacity-60 dark:opacity-75" />
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 py-6 sm:py-8">
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-200/80 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              NASA Astrophysics Data System
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Astronomy Picture of the Day (APOD)
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Professional deep-space imaging and astrophysics discoveries curated daily by NASA and astronomers worldwide.
            </p>
          </div>

          {/* Date Picker & Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                max={new Date().toISOString().split('T')[0]}
                className="pl-9 pr-3 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm"
              />
            </div>
            <button
              onClick={() => {
                setSelectedDate('');
                loadApod();
              }}
              className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm"
              title="Refresh / Latest Image"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Curated Celestial Discoveries Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {CURATED_PRESETS.map((p) => {
            const isSelected = apodData.title === p.title;
            return (
              <button
                key={p.label}
                onClick={() => {
                  setSelectedDate(p.date);
                  setApodData({
                    title: p.title,
                    date: p.date,
                    explanation: p.explanation,
                    url: p.image,
                    hdurl: p.image,
                    media_type: 'image',
                    copyright: p.credit,
                  });
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border flex-shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-transparent shadow-md shadow-indigo-500/25 scale-[1.02]'
                    : 'bg-white dark:bg-slate-900/80 border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/30'
                }`}
              >
                <span>{p.label}</span>
                <span className={`text-[10px] px-1 rounded ${isSelected ? 'bg-white/20' : 'bg-slate-100 dark:bg-white/10'}`}>
                  {p.date}
                </span>
              </button>
            );
          })}
        </div>

        {/* Hero Cinema Mode HD Image Card */}
        <div
          className={`rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-sm overflow-hidden mb-6 transition-all duration-300 ${
            isCinemaMode ? 'fixed inset-4 z-50 overflow-y-auto bg-slate-950' : 'relative'
          }`}
        >
          {/* Top Bar inside image card */}
          <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[260px] sm:max-w-md">
                {apodData.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleSpeech}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 border transition-all ${
                  isSpeaking
                    ? 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400 animate-pulse'
                    : 'bg-slate-100 dark:bg-white/10 border-transparent text-slate-600 dark:text-slate-300'
                }`}
                title="Read Explanation Aloud"
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline text-[11px]">{isSpeaking ? 'Stop' : 'Listen'}</span>
              </button>

              <button
                onClick={() => setIsCinemaMode(!isCinemaMode)}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                title={isCinemaMode ? 'Exit Full View' : 'Cinema Mode'}
              >
                {isCinemaMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* High-Resolution Cosmic Canvas / Image */}
          <div className="relative w-full aspect-[16/9] max-h-[560px] bg-slate-950 flex items-center justify-center overflow-hidden">
            <img
              src={apodData.url}
              alt={apodData.title}
              className="w-full h-full object-cover object-center transition-all duration-500 hover:scale-105"
              loading="eager"
            />
            {/* Credit Tag */}
            <div className="absolute bottom-3 right-3 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-bold text-slate-300 border border-white/10">
              Credit: {apodData.copyright || 'NASA / JPL'}
            </div>
          </div>

          {/* Explanation & Technical Details */}
          <div className="p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full">
                  {apodData.date}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  Astrophysics Feature
                </span>
              </div>

              {apodData.hdurl && (
                <a
                  href={apodData.hdurl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Full-Res HD Image
                </a>
              )}
            </div>

            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-2">
              {apodData.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              {apodData.explanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
