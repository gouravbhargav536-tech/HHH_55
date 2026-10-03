import React from 'react';
import { FestivalBanner as FestivalBannerType, Language, ShopSettings } from '../types';
import { generateWhatsAppLink } from '../utils/pricing';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Sparkles, ShieldCheck, Flame, Gift } from 'lucide-react';
import festiveHeroImg from '../assets/images/festive_jewellery_hero_1790240036846.jpg';

interface FestivalBannerProps {
  banner: FestivalBannerType;
  settings: ShopSettings;
  lang: Language;
}

export const FestivalBanner: React.FC<FestivalBannerProps> = ({ banner, settings, lang }) => {
  const whatsappMsg = lang === 'hi'
    ? `नमस्ते श्री लक्ष्मी ज्वेलर्स!\nमैं *${banner.titleHi}* के तहत आभूषण की अग्रिम बुकिंग (Advance Booking / Rate Lock) के संबंध में बात करना चाहता हूँ। कृपया प्रक्रिया बताएं।`
    : `Hello Shri Laxmi Jewellers!\nI would like to inquire regarding advance booking and rate lock under *${banner.titleEn}*. Please let me know the procedure.`;

  const whatsappUrl = generateWhatsAppLink(settings.whatsappNumber, whatsappMsg);

  const whatsappCoinsMsg = lang === 'hi'
    ? `नमस्ते श्री लक्ष्मी ज्वेलर्स!\nमुझे धनतेरस-दीपावली पूजन हेतु *९९९ शुद्ध चांदी व सोने के सिक्के (Laxmi-Ganesh Coins)* बुक करने हैं। कृपया दर व वजन बताएं।`
    : `Hello Shri Laxmi Jewellers!\nI would like to book pure 999 Gold & Silver Laxmi-Ganesh coins for Diwali pooja. Please share available weights and rates.`;
  const whatsappCoinsUrl = generateWhatsAppLink(settings.whatsappNumber, whatsappCoinsMsg);

  return (
    <section className="max-w-7xl mx-auto px-4 py-4">
      {/* Ultra-Premium Hero Card with Royal Visuals */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-[#D4AF37] shadow-2xl bg-gradient-to-br from-[#2E050C] via-[#4A0E17] to-[#1C0307]">
        {/* Visual Background with Luxury Jewellery & Diya Imagery */}
        <div className="absolute inset-0 z-0">
          <img
            src={festiveHeroImg}
            alt="Royal Indian Festive Gold Jewellery"
            className="w-full h-full object-cover object-center opacity-35 mix-blend-luminosity transform scale-105 hover:scale-100 transition-transform duration-1000"
          />
          {/* Rich royal gradient overlays for sharp readability */}
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#2E050C] via-[#2E050C]/90 to-transparent sm:to-[#2E050C]/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-5 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
          {/* Left Text & Highlight Pillars */}
          <div className="max-w-2xl text-center sm:text-left space-y-3">
            {/* Offer Pill / Festive Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/25 border border-[#D4AF37] text-[#E5C158] text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C158] animate-spin-slow" />
              <span>{lang === 'hi' ? banner.offerBadgeHi : banner.offerBadgeEn}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5C158]" />
              <span className="text-[10px] text-white/90 uppercase tracking-widest font-mono">
                {lang === 'hi' ? 'सीमित अवधि' : 'Limited Time'}
              </span>
            </div>

            {/* Main Festive Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
              {lang === 'hi' ? banner.titleHi : banner.titleEn}
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#E5C158] font-medium leading-snug">
              {lang === 'hi' ? banner.subtitleHi : banner.subtitleEn}
            </p>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#FAF7F2]/85 leading-relaxed font-sans max-w-xl">
              {lang === 'hi' ? banner.descriptionHi : banner.descriptionEn}
            </p>

            {/* Value Highlights Chips */}
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[11px] text-[#FAF7F2]">
              <span className="px-2.5 py-1 rounded-lg bg-black/40 border border-[#D4AF37]/40 flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'hi' ? 'आज का भाव लॉक सुविधा' : 'Rate Lock on Advance'}</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/40 border border-[#D4AF37]/40 flex items-center gap-1.5 font-medium">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'hi' ? '९९९ लक्ष्मी-गणेश सिक्के' : '999 Pure Silver & Gold Coins'}</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/40 border border-[#D4AF37]/40 flex items-center gap-1.5 font-medium">
                <Gift className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>{lang === 'hi' ? 'विशेष त्यौहारी मेकिंग छूट' : 'Special Festive Making Discount'}</span>
              </span>
            </div>
          </div>

          {/* Right Action Box & High-Conversion WhatsApp Buttons */}
          <div className="w-full sm:w-auto shrink-0 flex flex-col items-center sm:items-stretch gap-3 bg-black/40 p-5 rounded-2xl border border-[#D4AF37]/40 backdrop-blur-xs">
            <div className="text-center pb-1">
              <span className="text-[11px] uppercase tracking-wider text-[#E5C158] font-bold block">
                {lang === 'hi' ? 'त्यौहार विशेष बुकिंग' : 'Festive Booking Desk'}
              </span>
              <span className="text-[10px] text-[#FAF7F2]/70">
                {lang === 'hi' ? 'दुकान से सीधा संपर्क व अग्रिम टोकन' : 'Direct jeweller rate lock on WhatsApp'}
              </span>
            </div>

            {/* Primary WhatsApp Action */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-6 py-3.5 bg-gradient-to-r from-[#128C7E] via-[#25D366] to-[#128C7E] hover:from-[#0E7064] hover:to-[#1EBE5D] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg flex items-center justify-center gap-2.5 transition-all transform active:scale-98 border border-white/20"
            >
              <WhatsAppIcon className="w-5 h-5 text-white" />
              <span>{lang === 'hi' ? 'व्हाट्सएप पर अग्रिम बुकिंग करें' : 'Book on WhatsApp (Rate Lock)'}</span>
            </a>

            {/* Secondary WhatsApp Action for Gold/Silver Coins */}
            <a
              href={whatsappCoinsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-2.5 bg-white/10 hover:bg-white/20 text-[#FAF7F2] hover:text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 border border-[#D4AF37]/50 transition-colors"
            >
              <Gift className="w-4 h-4 text-[#E5C158]" />
              <span>{lang === 'hi' ? 'पूजन सिक्के दर पूछें (WhatsApp)' : 'Inquire Pooja Coins Rate'}</span>
            </a>

            <div className="text-[10px] text-[#FAF7F2]/60 text-center font-mono pt-1">
              {lang === 'hi' ? '✓ टोकन देकर भाव सुरक्षित करें' : '✓ Lock rates with nominal advance'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
