import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  icon?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  label, 
  icon,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        glass-panel rounded-xl p-4 flex flex-col 
        ${onClick ? 'active:scale-[0.98] transition-transform cursor-pointer hover:bg-white/5' : ''} 
        ${className}
      `}
    >
      {(label || icon) && (
        <div className="flex items-center gap-2 mb-3 opacity-60">
          {icon && <span className="material-symbols-outlined text-sm">{icon}</span>}
          {label && <span className="text-[10px] uppercase font-bold tracking-[0.2em]">{label}</span>}
        </div>
      )}
      <div className="flex-1 relative">
        {children}
      </div>
    </div>
  );
};