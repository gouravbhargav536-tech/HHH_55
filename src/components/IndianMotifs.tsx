import React from 'react';

/**
 * Regal Indian decorative divider with center mandala flower & paisley flourishes
 */
export const MandalaDivider: React.FC<{ className?: string; color?: string }> = ({ 
  className = '', 
  color = '#D4AF37' 
}) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-4 overflow-hidden ${className}`}>
      <div className="h-[1px] flex-1 max-w-44 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
      
      <svg className="w-8 h-8 shrink-0 text-[#D4AF37]" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="12" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
        <circle cx="50" cy="50" r="4" fill={color} />
        {/* 8 Petals */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const cx = 50 + Math.cos(angle) * 24;
          const cy = 50 + Math.sin(angle) * 24;
          return (
            <ellipse 
              key={i} 
              cx={cx} 
              cy={cy} 
              rx="6" 
              ry="11" 
              transform={`rotate(${i * 45}, ${cx}, ${cy})`} 
              stroke={color} 
              strokeWidth="1.5" 
              fill="none" 
            />
          );
        })}
      </svg>

      <div className="h-[1px] flex-1 max-w-44 bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
    </div>
  );
};

/**
 * Royal Jharokha Header Arch top ornament
 */
export const JharokhaTopArch: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <svg className="w-32 h-6 text-[#D4AF37]" viewBox="0 0 160 30" fill="none">
        <path d="M0 28 C40 28 60 5 80 2 C100 5 120 28 160 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="80" cy="6" r="3" fill="currentColor" />
        <circle cx="60" cy="18" r="2" fill="currentColor" />
        <circle cx="100" cy="18" r="2" fill="currentColor" />
      </svg>
    </div>
  );
};

/**
 * Sacred Kalash with Coconut and Mango Leaves
 */
export const KalashIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor">
      {/* Coconut atop */}
      <circle cx="24" cy="12" r="7" fill="#E5C158" stroke="#8A671C" strokeWidth="1.5" />
      {/* Leaves */}
      <path d="M18 16 Q12 10 10 14 Q14 18 19 18" fill="#15803D" />
      <path d="M30 16 Q36 10 38 14 Q34 18 29 18" fill="#15803D" />
      {/* Pot */}
      <path d="M16 20 H32 L36 30 C37 38 31 42 24 42 C17 42 11 38 12 30 Z" fill="#D4AF37" stroke="#8A671C" strokeWidth="1.5" />
      {/* Swastik on pot */}
      <path d="M24 28 V36 M20 32 H28 M20 28 V30 M28 34 V36 M20 36 H22 M26 28 H28" stroke="#4A0E17" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
};
