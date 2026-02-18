import React, { useEffect, useState } from 'react';
import { PulsingCore } from '../components/PulsingCore';
import { GeoLocationState, EmergencyGuide, EmergencyType } from '../types';
import { getEmergencyGuidance } from '../services/gemini';
import { formatCoordinates } from '../services/location';

interface EmergencyDashboardProps {
  location: GeoLocationState;
  onReset: () => void;
}

export const EmergencyDashboard: React.FC<EmergencyDashboardProps> = ({ location, onReset }) => {
  const [guide, setGuide] = useState<EmergencyGuide | null>(null);
  
  // Simulated Vitals
  const [bpm, setBpm] = useState(142);
  
  useEffect(() => {
    // Simulate heart rate fluctuation
    const interval = setInterval(() => {
      setBpm(prev => prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3));
    }, 1000);

    const fetchAdvice = async () => {
      if (location.coords) {
         try {
           const result = await getEmergencyGuidance(
              location.coords.latitude, 
              location.coords.longitude, 
              EmergencyType.GENERAL
           );
           setGuide(result);
         } catch(e) { console.error(e); }
      }
    };
    fetchAdvice();

    return () => clearInterval(interval);
  }, [location.coords]);

  const handleCall = () => {
    window.location.href = `tel:${guide?.emergencyServicesNumber || '911'}`;
  };

  const getAccuracyPercent = () => {
    if (!location.coords?.accuracy) return 10;
    // Lower accuracy number is better. 10m is great (90%), 100m is poor (10%)
    const val = Math.max(0, 100 - location.coords.accuracy);
    return Math.min(100, val);
  };

  return (
    <div className="relative h-full w-full bg-[radial-gradient(circle_at_center,_#3a1010_0%,_#120808_60%,_#000000_100%)] overflow-hidden flex flex-col">
      {/* Scanline Overlay */}
      <div className="scanline"></div>

      {/* Top Status Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary flex items-center justify-center pulse-red">
            <span className="material-symbols-outlined text-white">ecg_heart</span>
          </div>
          <div>
            <h1 className="text-[10px] font-bold tracking-widest text-primary uppercase">System Status</h1>
            <h2 className="text-lg font-bold leading-none text-white">CRITICAL DISTRESS</h2>
          </div>
        </div>
        <button className="size-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors border border-white/5">
          <span className="material-symbols-outlined text-white">notifications</span>
        </button>
      </header>

      {/* Main 3D Viewport Area */}
      <main className="relative flex-1 w-full flex items-center justify-center">
        
        {/* Central Heart Visualization */}
        <PulsingCore status="critical" />

        {/* Floating Metrics - Right (BPM) */}
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 glass-panel p-4 rounded-xl border-l-4 border-l-primary glow-red pr-8 transform translate-x-2">
            <p className="text-[10px] uppercase tracking-tighter text-white/60">Real-time BPM</p>
            <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">{bpm}</span>
                <span className="text-primary text-sm font-bold">↑</span>
            </div>
        </div>

        {/* Floating Metrics - Left (Location Status) */}
        <div className="absolute -left-4 top-1/3 -translate-y-1/2 glass-panel p-3 rounded-xl pl-6 transform -translate-x-2">
            <p className="text-[10px] uppercase tracking-tighter text-white/60">Geo-Lock</p>
            <p className="text-sm font-bold text-primary">
                {location.coords ? "LOCKED" : "TRIANGULATING"}
            </p>
            <div className="mt-1 flex gap-1">
                <div className={`h-1 w-4 rounded-full ${location.coords ? 'bg-primary' : 'bg-primary/20'}`}></div>
                <div className={`h-1 w-4 rounded-full ${location.coords ? 'bg-primary' : 'bg-primary/20'}`}></div>
                <div className="h-1 w-4 bg-primary/20 rounded-full"></div>
            </div>
        </div>

        {/* Side Panels - Left (Signal/Ischemia) */}
        <div className="absolute left-4 top-[60%] w-32 flex flex-col gap-4">
            <div className="glass-panel p-3 rounded-xl flex flex-col justify-between h-32">
                <div>
                    <span className="material-symbols-outlined text-primary text-xl">satellite_alt</span>
                    <p className="text-[10px] font-bold mt-2 uppercase tracking-widest text-white/40">Signal Str.</p>
                </div>
                <div className="relative h-12 bg-white/5 rounded-lg overflow-hidden flex items-end">
                     {/* Randomized signal bars simulation */}
                    <div className="w-1/4 h-[40%] bg-primary/40 mx-[1px]"></div>
                    <div className="w-1/4 h-[60%] bg-primary/60 mx-[1px]"></div>
                    <div className="w-1/4 h-[80%] bg-primary/80 mx-[1px]"></div>
                    <div className="w-1/4 h-full bg-primary mx-[1px]"></div>
                </div>
                <p className="text-lg font-bold text-white">STRONG</p>
            </div>
        </div>

        {/* Side Panels - Right (GPS/V-Pattern) */}
        <div className="absolute right-4 top-[60%] w-32 flex flex-col gap-4">
            <div className="glass-panel p-3 rounded-xl flex flex-col justify-between h-32">
                <div>
                    <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                    <p className="text-[10px] font-bold mt-2 uppercase tracking-widest text-white/40">Precision</p>
                </div>
                <div className="space-y-2">
                     <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${getAccuracyPercent()}%` }}></div>
                     </div>
                     <p className="text-[10px] text-white/60">
                        {location.accuracy ? `±${Math.round(location.accuracy)}m` : 'Wait...'}
                     </p>
                </div>
                <p className="text-xs font-medium text-white/60">
                    {location.coords ? "COORDS SENT" : "SEARCHING"}
                </p>
            </div>
        </div>
      </main>

      {/* Bottom Action Area */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 p-6 space-y-4 bg-gradient-to-t from-black to-transparent">
        <div className="flex gap-3">
            <button 
                onClick={handleCall}
                className="flex-1 bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 glow-red active:scale-95 transition-transform"
            >
                <span className="material-symbols-outlined">emergency_share</span>
                ALERT RESPONSE TEAM
            </button>
            <button 
                onClick={onReset}
                className="size-14 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 active:scale-95 transition-transform"
            >
                <span className="material-symbols-outlined text-white">power_settings_new</span>
            </button>
        </div>
        
        {/* Navigation Bar */}
        <nav className="flex justify-around items-center glass-panel py-3 px-2 rounded-full border-white/10 bg-black/40">
            <a className="flex flex-col items-center gap-1 text-primary" href="#">
                <span className="material-symbols-outlined fill text-2xl">monitoring</span>
                <span className="text-[10px] font-bold">MONITOR</span>
            </a>
            <a className="flex flex-col items-center gap-1 text-white/40" href="#">
                <span className="material-symbols-outlined text-2xl">history</span>
                <span className="text-[10px] font-bold">LOGS</span>
            </a>
            <a className="flex flex-col items-center gap-1 text-white/40" href="#">
                <span className="material-symbols-outlined text-2xl">science</span>
                <span className="text-[10px] font-bold">ANALYSIS</span>
            </a>
            <a className="flex flex-col items-center gap-1 text-white/40" href="#">
                <span className="material-symbols-outlined text-2xl">settings</span>
                <span className="text-[10px] font-bold">SETUP</span>
            </a>
        </nav>
      </footer>

      {/* UI Decoration: Corner accents */}
      <div className="fixed top-0 left-0 size-24 border-t-2 border-l-2 border-primary/30 pointer-events-none"></div>
      <div className="fixed top-0 right-0 size-24 border-t-2 border-r-2 border-primary/30 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 size-24 border-b-2 border-l-2 border-primary/30 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 size-24 border-b-2 border-r-2 border-primary/30 pointer-events-none"></div>
    </div>
  );
};