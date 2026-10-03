import React from 'react';
import festiveHeroImg from '../assets/images/festive_jewellery_hero_1790240036846.jpg';
import pureCoinsImg from '../assets/images/pure_gold_coins_set_1790240080986.jpg';
import bridalPortraitImg from '../assets/images/royal_rajasthani_bride_1790240060215.jpg';
import goldKadasImg from '../assets/images/royal_gold_kadas_bangles_1791004916167.jpg';
import silverPayalImg from '../assets/images/pure_silver_payal_anklets_1791004930426.jpg';
import templeModelImg from '../assets/images/indian_jewellery_model_showcase_1790932251602.jpg';

interface JewelleryImageProps {
  type: string;
  name: string;
  metal: 'gold' | 'silver';
  className?: string;
}

export const JewelleryImage: React.FC<JewelleryImageProps> = ({ type, name, metal, className = '' }) => {
  const isSilver = metal === 'silver';

  // Helper renderer for realistic photo card
  const renderPhotoCard = (
    imageSrc: string,
    tagText: string,
    purityText: string,
    objectPos: string = 'object-center'
  ) => (
    <div className={`relative w-full h-full overflow-hidden bg-black ${className}`}>
      <img
        src={imageSrc}
        alt={name}
        className={`w-full h-full object-cover ${objectPos} group-hover:scale-110 transition-transform duration-700 ease-out`}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

      {/* Top Tag */}
      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#D4AF37]/90 text-[#2E050C] font-bold text-[9px] uppercase tracking-wider shadow-sm backdrop-blur-xs">
        {tagText}
      </div>

      {/* Bottom Purity Hallmark Stamp */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/70 text-[10px] text-[#E5C158] font-mono tracking-wider backdrop-blur-xs border border-[#D4AF37]/40 shadow-xs">
        <svg className="w-3 h-3 text-[#E5C158]" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12,2 22,20 2,20" />
        </svg>
        <span>{purityText}</span>
      </div>
    </div>
  );

  // 1. Dulhan Sets / Royal Choker Sets
  if (type === 'dulhan_set' || type === 'necklace') {
    return renderPhotoCard(festiveHeroImg, 'शाही दुल्हन सेट', '22K 916 BIS');
  }

  // 2. Pure Coins (Silver & Gold)
  if (type === 'silver_coin' || type === 'gold_coin') {
    return renderPhotoCard(pureCoinsImg, '९९९ शुद्ध पूजन सिक्के', isSilver ? '999 Pure Silver' : '24K 999 Gold');
  }

  // 3. Borla & Rakhdi
  if (type === 'borla_rakhdi') {
    return renderPhotoCard(bridalPortraitImg, 'पारंपरिक बोरला', '22K 916 BIS', 'object-top');
  }

  // 4. Royal Nath
  if (type === 'royal_nath') {
    return renderPhotoCard(bridalPortraitImg, 'जोधपुरी कुंदन नथ', '22K 916 BIS', 'object-center');
  }

  // 5. Gold Bangles & Kadas
  if (type === 'gold_kada' || type === 'kada_chudi' || type === 'bangles') {
    return renderPhotoCard(goldKadasImg, 'ठोस गोखुरू कड़ा', '22K 916 BIS');
  }

  // 6. Silver Payal & Bichhiya
  if (type === 'silver_payal' || type === 'payal_bichhiya') {
    return renderPhotoCard(silverPayalImg, '९२५ चांदी छैलकड़ी', '925 Sterling Silver');
  }

  // 7. Temple Jewellery Pendant
  if (type === 'temple_pendant' || type === 'temple') {
    return renderPhotoCard(templeModelImg, 'महालक्ष्मी मंदिर शिल्प', '22K 916 BIS', 'object-center');
  }

  // 8. Kundan Earrings & Chandbalis
  if (type === 'kundan_earrings' || type === 'kundan') {
    return renderPhotoCard(templeModelImg, 'कुंदन चांदबाली', '22K 916 BIS', 'object-top');
  }

  // 9. Mangalsutra
  if (type === 'mangalsutra') {
    return renderPhotoCard(festiveHeroImg, 'पवित्र मंगलसूत्र', '22K 916 BIS', 'object-center');
  }

  // 10. Maang Tikka
  if (type === 'maang_tikka') {
    return renderPhotoCard(bridalPortraitImg, 'राजवाड़ी मांग टीका', '22K 916 BIS', 'object-top');
  }

  // Fallback to high-res festive gold
  return renderPhotoCard(
    isSilver ? pureCoinsImg : festiveHeroImg,
    isSilver ? 'हॉलमार्क चांदी' : 'हॉलमार्क सोना',
    isSilver ? '925 Silver' : '22K 916'
  );
};
