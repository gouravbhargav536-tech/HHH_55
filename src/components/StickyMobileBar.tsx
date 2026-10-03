import React from 'react';
import { Language, ShopSettings } from '../types';
import { generateWhatsAppLink } from '../utils/pricing';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Phone, Navigation, Video } from 'lucide-react';

interface StickyMobileBarProps {
  settings: ShopSettings;
  lang: Language;
  onOpenVideoCall: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ settings, lang, onOpenVideoCall }) => {
  const whatsappUrl = generateWhatsAppLink(
    settings.whatsappNumber,
    lang === 'hi'
      ? 'नमस्ते श्री लक्ष्मी ज्वेलर्स! मैं आभूषणों के बारे में जानकारी लेना चाहता हूँ।'
      : 'Hello Shri Laxmi Jewellers! I would like to inquire about your jewellery.'
  );

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t-2 border-[#D4AF37]/50 shadow-[0_-4px_16px_rgba(0,0,0,0.1)] px-2 py-1.5 flex items-center justify-around">
      {/* 1. Call Now */}
      <a
        href={`tel:${settings.phone}`}
        className="flex flex-col items-center justify-center p-1 text-[#4A0E17] hover:text-[#6B1724] active:scale-95 transition-transform"
      >
        <div className="w-8 h-8 rounded-full bg-[#FAF5EE] border border-[#D4AF37]/40 flex items-center justify-center text-[#B38622]">
          <Phone className="w-4 h-4" />
        </div>
        <span className="text-[10px] font-bold mt-0.5">
          {lang === 'hi' ? 'कॉल करें' : 'Call'}
        </span>
      </a>

      {/* 2. WhatsApp (Primary highlighted button with real WhatsApp icon) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center p-1 active:scale-95 transition-transform"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#25D366] flex items-center justify-center text-white shadow-md border-2 border-white ring-1 ring-[#D4AF37]">
          <WhatsAppIcon className="w-5 h-5 text-white" />
        </div>
        <span className="text-[10px] font-bold mt-0.5 text-[#075E54]">
          {lang === 'hi' ? 'व्हाट्सएप' : 'WhatsApp'}
        </span>
      </a>

      {/* 3. Video Call */}
      <button
        onClick={onOpenVideoCall}
        className="flex flex-col items-center justify-center p-1 text-[#4A0E17] hover:text-[#6B1724] active:scale-95 transition-transform"
      >
        <div className="w-8 h-8 rounded-full bg-[#FAF5EE] border border-[#D4AF37]/40 flex items-center justify-center text-[#B38622]">
          <Video className="w-4 h-4" />
        </div>
        <span className="text-[10px] font-bold mt-0.5">
          {lang === 'hi' ? 'वीडियो कॉल' : 'Video Call'}
        </span>
      </button>

      {/* 4. Directions / Google Maps */}
      <a
        href={settings.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center p-1 text-[#4A0E17] hover:text-[#6B1724] active:scale-95 transition-transform"
      >
        <div className="w-8 h-8 rounded-full bg-[#FAF5EE] border border-[#D4AF37]/40 flex items-center justify-center text-[#B38622]">
          <Navigation className="w-4 h-4" />
        </div>
        <span className="text-[10px] font-bold mt-0.5">
          {lang === 'hi' ? 'रास्ता (मैप)' : 'Directions'}
        </span>
      </a>
    </div>
  );
};
