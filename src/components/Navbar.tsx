import React from 'react';
import { Language, ShopSettings } from '../types';
import { generateWhatsAppLink } from '../utils/pricing';
import { Globe, Phone, Video, Sparkles, Settings } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { WhatsAppIcon } from './WhatsAppIcon';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  settings: ShopSettings;
  onOpenCustomOrder: () => void;
  onOpenVideoCall: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  settings,
  onOpenCustomOrder,
  onOpenVideoCall,
  onOpenAdmin,
}) => {
  const directWhatsAppUrl = generateWhatsAppLink(
    settings.whatsappNumber,
    lang === 'hi'
      ? 'नमस्ते श्री लक्ष्मी ज्वेलर्स! मुझे आभूषण के बारे में जानकारी चाहिए।'
      : 'Hello Shri Laxmi Jewellers! I would like to inquire about your jewellery designs.'
  );

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#D4AF37]/30 shadow-xs">
      {/* Top thin announcement bar with phone & sarafa note */}
      <div className="bg-[#4A0E17] text-[#E5C158] text-[11px] py-1 px-4 text-center font-medium flex items-center justify-between">
        <span className="hidden sm:inline">
          {lang === 'hi' ? '॥ श्री महालक्ष्मी नमः ॥' : 'Tradition of Trust Since 1982'}
        </span>
        <span className="mx-auto sm:mx-0">
          {lang === 'hi' 
            ? '१००% बीआईएस हॉलमार्क जेवर · मुख्य सर्राफा बाजार, श्री माधोपुर (सीकर)' 
            : '100% BIS Hallmarked Jewellery · Main Sarafa Bazar, Sri Madhopur'}
        </span>
        <div className="hidden sm:flex items-center gap-3">
          <a href={`tel:${settings.phone}`} className="hover:text-white flex items-center gap-1 font-mono">
            <Phone className="w-3 h-3 text-[#E5C158]" />
            <span>{settings.phone}</span>
          </a>
        </div>
      </div>

      {/* Main Branding & Navigation bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Name & Location */}
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 group">
          <BrandLogo size="md" showBorder={true} />
          <div>
            <h1 className="font-heading font-extrabold text-lg sm:text-2xl text-[#4A0E17] leading-none tracking-tight group-hover:text-[#6B1724] transition-colors">
              {lang === 'hi' ? settings.shopNameHi : settings.shopNameEn}
            </h1>
            <div className="flex items-center gap-1 text-[11px] text-[#8A671C] font-medium mt-0.5">
              <span>{lang === 'hi' ? settings.taglineLocationHi : settings.taglineLocationEn}</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline text-emerald-800 font-semibold">{lang === 'hi' ? 'हॉलमार्क प्रमाणित' : 'Hallmark Certified'}</span>
            </div>
          </div>
        </a>

        {/* Desktop Quick Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-[#4A0E17]">
          <a href="#catalogue" className="hover:text-[#B38622] transition-colors">
            {lang === 'hi' ? 'आभूषण संग्रह' : 'Catalogue'}
          </a>
          <a href="#model-designs" className="hover:text-[#B38622] transition-colors flex items-center gap-1 text-[#6B1724]">
            <Sparkles className="w-3 h-3 text-[#B38622]" />
            <span>{lang === 'hi' ? 'मॉडल डिज़ाइन' : 'Model Looks'}</span>
          </a>
          <a href="#calculator" className="hover:text-[#B38622] transition-colors">
            {lang === 'hi' ? 'हिसाब पर्ची' : 'Hisab Slip'}
          </a>
          <a href="#dulhan-builder" className="hover:text-[#B38622] transition-colors">
            {lang === 'hi' ? 'दुल्हन पैकेज' : 'Bridal Set'}
          </a>
          <a href="#muhurat" className="hover:text-[#B38622] transition-colors">
            {lang === 'hi' ? 'शुभ मुहूर्त' : 'Muhurat'}
          </a>
          <a href="#trust" className="hover:text-[#B38622] transition-colors">
            {lang === 'hi' ? 'हॉलमार्क व शुद्धता' : 'Hallmark Trust'}
          </a>
        </nav>

        {/* Right CTA cluster */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#D4AF37]/50 bg-white hover:bg-[#FAF5EE] text-xs font-bold text-[#4A0E17] shadow-2xs transition-colors"
            title="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#B38622]" />
            <span>{lang === 'hi' ? 'English' : 'हिन्दी'}</span>
          </button>

          {/* Video Call button */}
          <button
            onClick={onOpenVideoCall}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF5EE] border border-[#D4AF37]/50 hover:bg-[#F3ECE0] text-xs font-semibold text-[#4A0E17] transition-colors"
          >
            <Video className="w-3.5 h-3.5 text-[#B38622]" />
            <span>{lang === 'hi' ? 'वीडियो कॉल' : 'Video Call'}</span>
          </button>

          {/* Custom Order button */}
          <button
            onClick={onOpenCustomOrder}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF5EE] border border-[#D4AF37]/50 hover:bg-[#F3ECE0] text-xs font-semibold text-[#4A0E17] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B38622]" />
            <span>{lang === 'hi' ? 'कस्टम ऑर्डर' : 'Custom Order'}</span>
          </button>

          {/* Direct WhatsApp CTA */}
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#128C7E] hover:bg-[#0E7064] text-white text-xs font-bold shadow-xs transition-transform active:scale-95"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Admin Settings Cog Icon (Subtle) */}
          <button
            onClick={onOpenAdmin}
            className="p-1.5 rounded-lg text-stone-500 hover:text-[#4A0E17] hover:bg-[#FAF5EE] transition-colors"
            title={lang === 'hi' ? 'दुकानदार सेटिंग्स (/admin)' : 'Store Owner Settings (/admin)'}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
