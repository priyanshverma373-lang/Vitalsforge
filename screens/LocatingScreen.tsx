import React, { useEffect, useState } from 'react';
import { Loader2, MapPinOff } from 'lucide-react';
import { Button } from '../components/Button';

interface LocatingScreenProps {
  error: string | null;
  onRetry: () => void;
  onManual: () => void;
}

export const LocatingScreen: React.FC<LocatingScreenProps> = ({ error, onRetry, onManual }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="flex flex-col h-full justify-center items-center p-8 space-y-6 text-center animate-fade-in">
        <div className="w-24 h-24 bg-amber-500/10 rounded-full flex items-center justify-center">
            <MapPinOff className="w-12 h-12 text-amber-500" />
        </div>
        <div>
            <h2 className="text-2xl font-bold text-white mb-2">Location Unavailable</h2>
            <p className="text-slate-400">{error}</p>
        </div>
        <div className="w-full space-y-4 pt-8">
            <Button variant="primary" fullWidth onClick={onManual}>
                Enter Location Manually
            </Button>
            <Button variant="secondary" fullWidth onClick={onRetry}>
                Retry GPS
            </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full justify-center items-center p-8 space-y-8 text-center">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
        <div className="relative w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-700">
             <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-white tracking-wider">ACQUIRING SATELLITE{dots}</h2>
        <p className="text-slate-400 mt-2">Triangulating precise position for rescue.</p>
      </div>

      <div className="w-full pt-12">
        <Button variant="ghost" fullWidth onClick={onManual}>
            Skip to Manual Input
        </Button>
      </div>
    </div>
  );
};