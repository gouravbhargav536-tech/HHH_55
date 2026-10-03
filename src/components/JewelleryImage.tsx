import React from 'react';
import festiveHeroImg from '../assets/images/festive_jewellery_hero_1790240036846.jpg';
import pureCoinsImg from '../assets/images/pure_gold_coins_set_1790240080986.jpg';
import bridalPortraitImg from '../assets/images/royal_rajasthani_bride_1790240060215.jpg';

interface JewelleryImageProps {
  type: string;
  name: string;
  metal: 'gold' | 'silver';
  className?: string;
}

export const JewelleryImage: React.FC<JewelleryImageProps> = ({ type, name, metal, className = '' }) => {
  const isSilver = metal === 'silver';

  // Check if we have a photorealistic editorial image asset for this type
  if (type === 'dulhan_set') {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-black ${className}`}>
        <img
          src={festiveHeroImg}
          alt={name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#D4AF37]/90 text-[#2E050C] font-bold text-[9px] uppercase tracking-wider shadow-sm">
          राजपूती कुंदन
        </div>
        <div className="absolute bottom-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/60 text-[10px] text-[#E5C158] font-mono tracking-wider backdrop-blur-xs border border-[#D4AF37]/30">
          <svg className="w-3 h-3 text-[#E5C158]" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12,2 22,20 2,20" />
          </svg>
          <span>22K 916</span>
        </div>
      </div>
    );
  }

  if (type === 'silver_coin') {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-black ${className}`}>
        <img
          src={pureCoinsImg}
          alt={name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#E2E8F0] text-[#1E293B] font-bold text-[9px] uppercase tracking-wider shadow-sm">
          999 PURE
        </div>
        <div className="absolute bottom-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/60 text-[10px] text-slate-200 font-mono tracking-wider backdrop-blur-xs border border-white/30">
          <span>999 शुद्ध चांदी</span>
        </div>
      </div>
    );
  }

  if (type === 'borla_rakhdi') {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-black ${className}`}>
        <img
          src={bridalPortraitImg}
          alt={name}
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#D4AF37]/90 text-[#2E050C] font-bold text-[9px] uppercase tracking-wider shadow-sm">
          पारंपरिक बोरला
        </div>
        <div className="absolute bottom-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/60 text-[10px] text-[#E5C158] font-mono tracking-wider backdrop-blur-xs border border-[#D4AF37]/30">
          <span>22K 916</span>
        </div>
      </div>
    );
  }

  const goldGradientId = `goldGrad_${type}`;
  const silverGradientId = `silverGrad_${type}`;
  const jewelRedId = `rubyGrad_${type}`;
  const jewelGreenId = `emeraldGrad_${type}`;

  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#2E050C] via-[#3A0810] to-[#1C0307] p-3 ${className}`}>
      {/* Background subtle mandala watermark */}
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none text-[#D4AF37]" viewBox="0 0 200 200" fill="none" stroke="currentColor">
        <circle cx="100" cy="100" r="80" strokeWidth="0.75" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="60" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="40" strokeWidth="0.5" />
        <path d="M100 20 L100 180 M20 100 L180 100 M43.4 43.4 L156.6 156.6 M43.4 156.6 L156.6 43.4" strokeWidth="0.4" strokeOpacity="0.4" />
      </svg>

      {/* SVG Definitions */}
      <svg className="w-full h-full max-h-56 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-105" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Gold Gradient */}
          <linearGradient id={goldGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="25%" stopColor="#E5C158" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="75%" stopColor="#997316" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>

          {/* Silver Gradient */}
          <linearGradient id={silverGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#E2E8F0" />
            <stop offset="60%" stopColor="#CBD5E1" />
            <stop offset="85%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* Ruby Red Gemstone Gradient */}
          <radialGradient id={jewelRedId} cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FF6B81" />
            <stop offset="50%" stopColor="#C81D3E" />
            <stop offset="100%" stopColor="#6A041A" />
          </radialGradient>

          {/* Emerald Green Gemstone Gradient */}
          <radialGradient id={jewelGreenId} cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#064E3B" />
          </radialGradient>
        </defs>

        {type === 'royal_nath' && (
          <g transform="translate(120, 120)">
            <circle cx="-10" cy="0" r="50" stroke={`url(#${goldGradientId})`} strokeWidth="4.5" fill="none" />
            <path d="M-60 0 C-40 -45 20 -45 40 0" stroke={`url(#${goldGradientId})`} strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
            <ellipse cx="25" cy="15" rx="14" ry="10" fill={`url(#${jewelRedId})`} />
            <circle cx="25" cy="15" r="4" fill="#FFFDF8" />
            <circle cx="10" cy="30" r="8" fill={`url(#${jewelGreenId})`} />
            {[-15, -5, 5, 35, 45].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = -10 + 50 * Math.cos(rad);
              const y = 50 * Math.sin(rad);
              return <circle key={i} cx={x} cy={y} r="3.5" fill="#FFFDF8" stroke="#D4AF37" strokeWidth="0.75" />;
            })}
            <path d="M-60 0 C-80 -40 -10 -90 90 -70" stroke={`url(#${goldGradientId})`} strokeWidth="2.5" fill="none" strokeDasharray="5 3" />
          </g>
        )}

        {type === 'mangalsutra' && (
          <g transform="translate(120, 110)">
            <path d="M-90 -50 C-50 40 50 40 90 -50" stroke="#111827" strokeWidth="4" fill="none" strokeDasharray="6 4" />
            <path d="M-90 -50 C-50 40 50 40 90 -50" stroke={`url(#${goldGradientId})`} strokeWidth="1.5" fill="none" />
            <g transform="translate(0, 36)">
              <circle cx="-16" cy="0" r="14" fill={`url(#${goldGradientId})`} stroke="#8A671C" strokeWidth="1" />
              <circle cx="16" cy="0" r="14" fill={`url(#${goldGradientId})`} stroke="#8A671C" strokeWidth="1" />
              <circle cx="-16" cy="0" r="5" fill={`url(#${jewelRedId})`} />
              <circle cx="16" cy="0" r="5" fill={`url(#${jewelRedId})`} />
              <circle cx="0" cy="16" r="6" fill={`url(#${goldGradientId})`} />
              <circle cx="0" cy="28" r="4" fill="#FFFDF8" stroke="#D4AF37" strokeWidth="0.75" />
            </g>
          </g>
        )}

        {type === 'gold_kada' && (
          <g transform="translate(120, 120)">
            <ellipse cx="0" cy="0" rx="70" ry="45" stroke={`url(#${goldGradientId})`} strokeWidth="14" fill="none" />
            <ellipse cx="0" cy="0" rx="70" ry="45" stroke="#78350F" strokeWidth="1" strokeDasharray="3 3" fill="none" />
            {[-120, -60, 0, 60, 120].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const x = 70 * Math.cos(rad);
              const y = 45 * Math.sin(rad);
              return (
                <g key={i} transform={`translate(${x}, ${y})`}>
                  <circle cx="0" cy="0" r="6" fill={`url(#${jewelRedId})`} stroke="#E5C158" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="2" fill="#FFFDF8" />
                </g>
              );
            })}
            <circle cx="68" cy="0" r="9" fill={`url(#${goldGradientId})`} stroke="#997316" strokeWidth="2" />
          </g>
        )}

        {type === 'silver_payal' && (
          <g transform="translate(120, 120)">
            <path d="M-85 -30 Q0 50 85 -30" stroke={`url(#${silverGradientId})`} strokeWidth="14" strokeLinecap="round" />
            <path d="M-85 -30 Q0 50 85 -30" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4 2" />
            {Array.from({ length: 15 }).map((_, i) => {
              const t = (i - 7) / 7;
              const x = t * 75;
              const y = -30 + 75 * (1 - t * t);
              return (
                <g key={i} transform={`translate(${x}, ${y + 8})`}>
                  <line x1="0" y1="0" x2="0" y2="8" stroke={`url(#${silverGradientId})`} strokeWidth="1.5" />
                  <circle cx="0" cy="12" r="4.5" fill={`url(#${silverGradientId})`} stroke="#94A3B8" strokeWidth="1" />
                </g>
              );
            })}
          </g>
        )}

        {/* Fallback for other items */}
        {!['royal_nath', 'mangalsutra', 'gold_kada', 'silver_payal'].includes(type) && (
          <g transform="translate(120, 120)">
            <circle cx="0" cy="0" r="55" stroke={`url(#${isSilver ? silverGradientId : goldGradientId})`} strokeWidth="8" fill="none" />
            <ellipse cx="0" cy="-45" rx="16" ry="12" fill={`url(#${jewelRedId})`} />
            <circle cx="0" cy="-45" r="6" fill="#FFFDF8" />
            <circle cx="0" cy="45" r="8" fill={`url(#${jewelGreenId})`} />
            <path d="M-30 0 C-10 20 10 20 30 0" stroke={`url(#${isSilver ? silverGradientId : goldGradientId})`} strokeWidth="3" fill="none" />
          </g>
        )}
      </svg>

      {/* Hallmark stamp badge watermark on corner */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/40 text-[10px] text-[#D4AF37] font-mono tracking-wider backdrop-blur-xs">
        <svg className="w-3 h-3 text-[#E5C158]" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12,2 22,20 2,20" />
        </svg>
        <span>{isSilver ? '925 PURE' : '22K 916'}</span>
      </div>
    </div>
  );
};
