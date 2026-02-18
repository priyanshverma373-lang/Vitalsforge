import React from 'react';

interface PulsingCoreProps {
  status: 'stable' | 'critical' | 'locating';
}

export const PulsingCore: React.FC<PulsingCoreProps> = ({ status }) => {
  const isCritical = status === 'critical';

  return (
    <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
      {/* Background Volumetric Glows */}
      <div className={`absolute inset-0 blur-[100px] rounded-full transition-colors duration-1000 ${isCritical ? 'bg-primary/20' : 'bg-emerald-500/10'}`}></div>
      {isCritical && <div className="absolute -top-20 -left-20 size-64 bg-red-500/5 blur-[80px] rounded-full"></div>}
      
      {/* The "Heart" Object */}
      <div className={`
        relative z-10 w-64 h-80 rounded-[40%] 
        overflow-hidden shadow-2xl border border-white/10 
        flex items-center justify-center group transition-all duration-1000
        ${isCritical ? 'bg-gradient-to-br from-primary via-red-950 to-black' : 'bg-gradient-to-br from-emerald-500 via-emerald-950 to-black'}
      `}>
        {/* Glowing Distress Zones */}
        <div className={`absolute top-1/4 right-1/4 size-20 blur-2xl opacity-80 ${isCritical ? 'bg-primary pulse-red' : 'bg-emerald-400 animate-pulse'}`}></div>
        <div className={`absolute bottom-1/3 left-1/3 size-16 blur-xl opacity-60 ${isCritical ? 'bg-primary' : 'bg-emerald-400'}`}></div>
        
        {/* Inner texture simulation */}
        <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        {/* HUD Connectors */}
        <div className={`absolute top-1/2 -right-12 w-12 h-px ${isCritical ? 'bg-primary/50' : 'bg-emerald-500/50'}`}></div>
        <div className={`absolute top-1/3 -left-12 w-12 h-px ${isCritical ? 'bg-primary/50' : 'bg-emerald-500/50'}`}></div>
      </div>
    </div>
  );
};