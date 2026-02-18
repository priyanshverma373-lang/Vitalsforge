import React from 'react';
import { Radio, ShieldAlert } from 'lucide-react';
import { APP_NAME } from '../constants';

interface HeaderProps {
  status?: 'secure' | 'offline' | 'warning' | 'critical';
}

export const Header: React.FC<HeaderProps> = ({ status = 'secure' }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'critical': return 'text-red-500';
      case 'warning': return 'text-amber-500';
      case 'offline': return 'text-slate-500';
      default: return 'text-emerald-500';
    }
  };

  return (
    <header className="flex items-center justify-between py-4 px-6 border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <ShieldAlert className="w-8 h-8 text-white" />
        <h1 className="text-xl font-black tracking-widest text-white">{APP_NAME}</h1>
      </div>
      <div className="flex items-center space-x-2">
        <span className={`text-xs font-mono uppercase ${getStatusColor()}`}>
          {status === 'critical' ? 'ACTIVE EMERGENCY' : 'SYSTEM READY'}
        </span>
        <Radio className={`w-4 h-4 ${getStatusColor()} ${status === 'critical' ? 'animate-pulse' : ''}`} />
      </div>
    </header>
  );
};