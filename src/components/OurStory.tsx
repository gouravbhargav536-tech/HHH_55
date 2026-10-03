import React from 'react';
import { Language, ShopSettings } from '../types';
import { generateWhatsAppLink } from '../utils/pricing';
import { MandalaDivider } from './IndianMotifs';
import { BrandLogo } from './BrandLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

interface OurStoryProps {
  settings: ShopSettings;
  lang: Language;
}

export const OurStory: React.FC<OurStoryProps> = ({ settings, lang }) => {
  const whatsappUrl = generateWhatsAppLink(
    settings.whatsappNumber,
    lang === 'hi'
      ? 'नमस्ते श्री लक्ष्मी ज्वेलर्स! मैं आपकी दुकान के इतिहास व आभूषणों के बारे में जानकारी चाहता हूँ।'
      : 'Hello Shri Laxmi Jewellers! I would like to inquire about your heritage collections.'
  );

  return (
    <section id="our-story" className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-[#FFFDF9] to-[#FAF5EE] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        {/* Decorative corner accents */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
          <BrandLogo size="lg" showBorder={true} className="mb-3" />
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A671C] uppercase tracking-widest mb-1">
            <span>{lang === 'hi' ? 'परंपरा और पीढ़ियों का विश्वास' : 'Legacy of Trust'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#4A0E17]">
            {lang === 'hi' ? 'हमारी कहानी (Our Story)' : 'Our Heritage & Craftsmanship'}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#8A671C]">
            {lang === 'hi' ? settings.taglineHi : settings.taglineEn}
          </p>
          <MandalaDivider className="my-3 text-[#D4AF37]" />
        </div>

        {/* Story Text Block */}
        <div className="mt-4 max-w-3xl mx-auto text-center sm:text-left text-xs sm:text-sm text-[#2E050C] leading-relaxed space-y-3 font-sans">
          <p>
            {lang === 'hi'
              ? 'श्री लक्ष्मी ज्वेलर्स की नींव श्री माधोपुर (सीकर) के मुख्य सर्राफा बाजार में चार दशक पूर्व एक निष्ठावान पारिवारिक सुनार परंपरा के साथ रखी गई थी। हमारे लिए सोना केवल एक धातु या आभूषण नहीं, बल्कि एक परिवार का मान, संस्कृति और पीढ़ियों की धरोहर है।'
              : 'Shri Laxmi Jewellers was established over four decades ago in the historic Sarafa Bazar of Sri Madhopur, Sikar. For our family, gold is not just an ornament—it is a sacred symbol of dignity, culture, and familial legacy.'}
          </p>

          <p>
            {lang === 'hi'
              ? 'शेखावाटी और मारवाड़ की समृद्ध संस्कृति के अनुरूप, हमने पारंपरिक राजपूती बोरला, नथ, रखड़ी, गोखुरू कड़े और शुद्ध मीनाकारी के प्राचीन हुनर को आधुनिक १००% बीआईएस हॉलमार्क प्रमाणन के साथ संजोया है। आज हमारे पास दादा-परदादा के समय से जुड़े ग्राहक अपनी नई पीढ़ी की शादियों के लिए विश्वास के साथ आते हैं।'
              : 'Honoring the rich heritage of Shekhawati and Rajasthan, we handcraft authentic Rajputi Borla, Royal Nath, Gokhru Kadas, and Jaipur Meenakari paired with 100% BIS Hallmarking. Generations of families trust us for their life milestones.'}
          </p>

          <p className="font-semibold text-[#4A0E17] text-center pt-2">
            {lang === 'hi'
              ? '“शुद्ध वजन, पक्का बिल और सही भाव — यही हमारे परिवार का धर्म है।”'
              : '"Accurate weight, authentic invoice, and pure value — our unbroken family promise."'}
          </p>
        </div>

        {/* Store Location, Timings & Contact Info Box */}
        <div className="mt-8 pt-6 border-t border-[#D4AF37]/30 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#2E050C]">
          {/* Address */}
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#4A0E17] text-[#E5C158] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-[#4A0E17] text-sm">
                {lang === 'hi' ? 'दुकान का पता' : 'Store Location'}
              </div>
              <p className="mt-1 text-[#5C450C] leading-normal">
                {lang === 'hi' ? settings.addressHi : settings.addressEn}
              </p>
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-[#B38622] hover:text-[#4A0E17] underline"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'गूगल मैप्स पर रास्ता देखें' : 'Get Directions on Google Maps'}</span>
              </a>
            </div>
          </div>

          {/* Timings */}
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#4A0E17] text-[#E5C158] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-[#4A0E17] text-sm">
                {lang === 'hi' ? 'दुकान का समय' : 'Store Timings'}
              </div>
              <p className="mt-1 text-[#5C450C] leading-normal">
                {lang === 'hi' ? settings.openingHoursHi : settings.openingHoursEn}
              </p>
              <span className="inline-block mt-2 text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                {lang === 'hi' ? 'सातों दिन खुला' : 'Open 7 Days a Week'}
              </span>
            </div>
          </div>

          {/* Direct Phone & WhatsApp */}
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#4A0E17] text-[#E5C158] shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-[#4A0E17] text-sm">
                {lang === 'hi' ? 'फोन व पूछताछ' : 'Phone & Enquiries'}
              </div>
              <p className="mt-1 font-mono text-[#5C450C] font-semibold text-sm">
                {settings.phone}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <a
                  href={`tel:${settings.phone}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A0E17] hover:underline"
                >
                  <span>{lang === 'hi' ? 'अभी कॉल करें' : 'Call Directly'}</span>
                </a>
                <span className="text-stone-300">·</span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#075E54] hover:text-[#128C7E]"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
