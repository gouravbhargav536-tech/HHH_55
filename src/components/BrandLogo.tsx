import React from 'react';
import laxmiLogoImg from '../assets/images/shri_laxmi_mata_logo_1790932147267.jpg';

interface BrandLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showBorder?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showBorder = true,
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-18 h-18',
    '2xl': 'w-24 h-24',
  };

  return (
    <div
      className={`relative rounded-full overflow-hidden shrink-0 select-none shadow-sm transition-transform duration-300 group-hover:scale-105 ${
        sizeClasses[size]
      } ${
        showBorder
          ? 'ring-2 ring-[#D4AF37] ring-offset-1 ring-offset-[#FAF7F2] shadow-[0_2px_10px_rgba(212,175,55,0.3)]'
          : ''
      } ${className}`}
      title="श्री लक्ष्मी ज्वेलर्स - माँ महालक्ष्मी शुभ प्रतीक"
    >
      <img
        src={laxmiLogoImg}
        alt="श्री लक्ष्मी ज्वेलर्स (Shri Laxmi Jewellers) - माँ लक्ष्मी दिव्य प्रतीक"
        className="w-full h-full object-cover object-center scale-105"
        loading="eager"
      />
      {/* Golden sheen overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/15 via-transparent to-white/20 pointer-events-none rounded-full" />
    </div>
  );
};
