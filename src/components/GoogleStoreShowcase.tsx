import React from 'react';
import { Language, ShopSettings } from '../types';
import { GoogleIcon } from './GoogleIcon';
import { WhatsAppIcon } from './WhatsAppIcon';
import { BrandLogo } from './BrandLogo';
import { MandalaDivider } from './IndianMotifs';
import { Star, MapPin, Navigation, ExternalLink, Camera, ShieldCheck, CheckCircle2, Phone, Clock } from 'lucide-react';
import showroomPhoto from '../assets/images/laxmi_jewellers_showroom_1791004899583.jpg';

interface GoogleStoreShowcaseProps {
  settings: ShopSettings;
  lang: Language;
}

export const GoogleStoreShowcase: React.FC<GoogleStoreShowcaseProps> = ({ settings, lang }) => {
  return (
    <section id="google-store" className="max-w-7xl mx-auto px-4 py-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#D4AF37]/50 shadow-2xs text-xs font-bold text-[#4A0E17] mb-2">
          <GoogleIcon className="w-4 h-4" />
          <span>{lang === 'hi' ? 'गूगल सत्यापित प्रतिष्ठान' : 'Google Verified Business'}</span>
          <span className="text-[#8A671C]">·</span>
          <span className="text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            4.9 ★★★★★
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#4A0E17]">
          {lang === 'hi'
            ? 'दुकान की झलक: गूगल मैप्स सत्यापित शोरूम'
            : 'Showroom Showcase: Verified by Google Maps'}
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-[#5C450C]">
          {lang === 'hi'
            ? 'मुख्य सर्राफा बाजार, श्री माधोपुर (सीकर) स्थित हमारा भव्य पारिवारिक शोरूम। गूगल पर 480+ ग्राहकों का अटूट भरोसा।'
            : 'Visit our flagship hallmarked jewellery showroom in Main Sarafa Bazar, Sri Madhopur. Rated 4.9★ by 480+ verified Google users.'}
        </p>
        <MandalaDivider className="my-3 text-[#D4AF37]" />
      </div>

      {/* Main Google Profile Showcase Card */}
      <div className="bg-white border-2 border-[#D4AF37]/60 rounded-3xl overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left / Top: Google Storefront & Showroom Photograph */}
          <div className="lg:col-span-7 relative group overflow-hidden bg-black min-h-[300px] sm:min-h-[420px]">
            <img
              src={showroomPhoto}
              alt="Shri Laxmi Jewellers Showroom on Google Maps"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Gradient Sheen */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />

            {/* Top Google Photos Watermark Badge */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md flex items-center gap-2 text-xs font-bold text-[#1F2937]">
              <GoogleIcon className="w-4 h-4" />
              <span>{lang === 'hi' ? 'Photos by Google · स्टोर फ़ोटो' : 'Photos by Google · Showroom'}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Bottom Photo Caption */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="inline-flex items-center gap-1.5 text-[11px] text-[#E5C158] font-bold uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>{lang === 'hi' ? 'मुख्य सर्राफा बाजार, श्री माधोपुर (सीकर, राज.)' : 'Main Sarafa Bazar, Sri Madhopur, Sikar'}</span>
              </div>
              <h3 className="font-heading text-lg sm:text-2xl font-bold text-white leading-tight">
                {lang === 'hi' ? settings.shopNameHi : settings.shopNameEn}
              </h3>
              <p className="text-xs text-white/80 mt-1 max-w-lg line-clamp-2">
                {lang === 'hi'
                  ? 'वातानुकूलित आधुनिक शोरूम, कंप्यूटर डिजिटल तौल कांटा, १००% बीआईएस हॉलमार्क प्रमाणन एवं राजपूती आभूषणों का विशाल संग्रह।'
                  : 'Air-conditioned luxury jewellery showroom featuring open-counter digital weighing, 100% BIS Hallmarked 22K gold, and royal Rajasthani ornaments.'}
              </p>
            </div>
          </div>

          {/* Right: Google Business Profile Panel & Actions */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-[#FFFDF9] to-[#FAF7F2]">
            {/* Google Rating Overview */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-center">
                    <GoogleIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-[#4A0E17]">
                      Google Maps Rating
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-[#8A671C]">
                      <span className="font-bold text-sm text-[#4A0E17] font-mono">4.9</span>
                      <div className="flex text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] font-medium text-stone-500">(480+ {lang === 'hi' ? 'समीक्षाएं' : 'reviews'})</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] font-bold">
                    ✓ Verified
                  </span>
                </div>
              </div>

              {/* Key Store Attributes on Google */}
              <div className="mt-4 space-y-2.5 text-xs text-[#2E050C]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#B38622] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#4A0E17]">{lang === 'hi' ? 'सटीक पता:' : 'Exact Address:'}</span>
                    <p className="text-stone-600">{lang === 'hi' ? settings.addressHi : settings.addressEn}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#B38622] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#4A0E17]">{lang === 'hi' ? 'खुलने का समय:' : 'Store Timings:'}</span>
                    <p className="text-stone-600">{lang === 'hi' ? settings.openingHoursHi : settings.openingHoursEn} · <span className="text-emerald-700 font-semibold">{lang === 'hi' ? 'सातों दिन खुला' : 'Open Everyday'}</span></p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#B38622] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#4A0E17]">{lang === 'hi' ? 'सीधा संपर्क:' : 'Direct Phone:'}</span>
                    <p className="font-mono text-stone-700 font-semibold">{settings.phone}</p>
                  </div>
                </div>
              </div>

              {/* Customer Google Testimonial Quote */}
              <div className="mt-4 p-3 rounded-xl bg-white border border-[#D4AF37]/30 shadow-2xs">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center">
                    G
                  </div>
                  <span className="text-[11px] font-bold text-[#4A0E17]">Gourav Sharma</span>
                  <div className="flex text-amber-500 text-[10px]">★★★★★</div>
                  <span className="text-[9px] text-stone-400 ml-auto">Google Review</span>
                </div>
                <p className="text-[11px] text-stone-600 italic">
                  {lang === 'hi'
                    ? '"श्री माधोपुर की सबसे भरोसेमंद दुकान। डिजिटल कांटे पर सामने तौल और तुरंत HUID बिलिंग मिली। सोने की फिनिशिंग लाजवाब है!"'
                    : '"Most trustworthy jeweller in Sri Madhopur. Transparent counter weighing, instant HUID bill and gorgeous finishing."'}
                </p>
              </div>
            </div>

            {/* Action Buttons for Google Maps */}
            <div className="mt-6 space-y-2.5 pt-4 border-t border-[#D4AF37]/30">
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#1A73E8] hover:bg-[#1557B0] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>{lang === 'hi' ? 'Google Maps पर दुकान का रास्ता देखें' : 'Get Directions on Google Maps'}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                >
                  <Camera className="w-3.5 h-3.5 text-[#1A73E8]" />
                  <span>{lang === 'hi' ? 'गूगल फोटो देखें' : 'View Photos'}</span>
                </a>

                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                >
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{lang === 'hi' ? 'रिव्यू लिखें' : 'Write Review'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
