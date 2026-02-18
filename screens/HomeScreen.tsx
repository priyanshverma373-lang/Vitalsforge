import React from 'react';
import { PulsingCore } from '../components/PulsingCore';
import { GlassCard } from '../components/GlassCard';
import { EmergencyType } from '../types';

interface HomeScreenProps {
  onTriggerEmergency: (type: EmergencyType) => void;
  onManualLocation: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onTriggerEmergency, onManualLocation }) => {
  return (
    <div className="relative flex flex-col h-full bg-[#0a0505] overflow-hidden">
      <div className="scanline"></div>
      
      {/* Subtle Green Background for Stable state */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_#0a2e15_0%,_#000000_70%)] opacity-50 z-0"></div>

      <header className="relative z-50 px-6 py-8">
        <h2 className="text-[10px] font-bold tracking-[0.2em] text-emerald-500 uppercase mb-1">System Status</h2>
        <h1 className="text-3xl font-bold text-white uppercase tracking-tighter">VITALSFORGE ONLINE</h1>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center space-y-12">
        <PulsingCore status="stable" />
        
        <div className="w-full px-6 space-y-3">
           <GlassCard className="border-emerald-500/20 bg-emerald-900/10">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-emerald-500">verified_user</span>
                    <div>
                      <p className="text-sm text-white font-bold">Bio-Metrics Stable</p>
                      <p className="text-[10px] text-white/50 uppercase tracking-wider">Continuous Scan Active</p>
                    </div>
                 </div>
                 <span className="text-emerald-500 font-mono text-xs font-bold">NOMINAL</span>
              </div>
           </GlassCard>

           <GlassCard className="border-emerald-500/20 bg-emerald-900/10" onClick={onManualLocation}>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-emerald-500">satellite_alt</span>
                    <div>
                      <p className="text-sm text-white font-bold">Location Services</p>
                      <p className="text-[10px] text-white/50 uppercase tracking-wider">Ready to Transmit</p>
                    </div>
                 </div>
                 <span className="text-emerald-500 font-mono text-xs font-bold">STBY</span>
              </div>
           </GlassCard>
        </div>
      </main>

      <footer className="relative z-50 p-6 pb-10">
        <button 
          onClick={() => onTriggerEmergency(EmergencyType.GENERAL)}
          className="w-full py-6 bg-transparent border border-white/10 rounded-xl flex items-center justify-center gap-4 group hover:bg-white/5 transition-all"
        >
           <div className="size-12 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-white">priority_high</span>
           </div>
           <div className="text-left">
              <p className="text-white font-bold tracking-widest uppercase">Trigger Distress</p>
              <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Initiate Protocol 911</p>
           </div>
        </button>
      </footer>
    </div>
  );
};