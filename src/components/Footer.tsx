import React from 'react';
import { Language, ShopSettings } from '../types';
import { generateWhatsAppLink } from '../utils/pricing';
import { MandalaDivider } from './IndianMotifs';
import { BrandLogo } from './BrandLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { MapPin, Phone, Clock, ShieldCheck, Settings, Sparkles } from 'lucide-react';

interface FooterProps {
  settings: ShopSettings;
  lang: Language;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, lang, onOpenAdmin }) => {
  const whatsappUrl = generateWhatsAppLink(
    settings.whatsappNumber,
    lang === 'hi'
      ? 'नमस्ते श्री लक्ष्मी ज्वेलर्स! मैं आभूषणों की जानकारी हेतु संपर्क कर रहा हूँ।'
      : 'Hello Shri Laxmi Jewellers! I would like to inquire about your jewellery collections.'
  );

  return (
    <footer className="bg-[#1C0307] text-[#FAF7F2] border-t-2 border-[#D4AF37]/50 pt-10 pb-20 md:pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-white/10 text-xs">
          {/* Col 1: Shop Brand & Heritage */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <BrandLogo size="md" showBorder={true} />
              <span className="font-heading font-bold text-lg text-white">
                {lang === 'hi' ? settings.shopNameHi : settings.shopNameEn}
              </span>
            </div>
            <p className="text-[#F3ECE0]/80 leading-relaxed">
              {lang === 'hi'
                ? 'श्री माधोपुर, सीकर का प्रतिष्ठित पारिवारिक सर्राफा प्रतिष्ठान। शुद्धता, ईमानदारी और बीआईएस हॉलमार्क प्रमाणन का अटूट विश्वास।'
                : 'Heritage jewellery store in Sri Madhopur, Sikar. Dedicated to pure hallmarked gold, transparent billing, and authentic craftsmanship.'}
            </p>
            <div className="flex items-center gap-1.5 text-[#E5C158] font-semibold text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'hi' ? '१००% बीआईएस हॉलमार्क एवं HUID प्रमाणित' : '100% BIS Hallmarked & HUID Certified'}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-bold text-sm text-[#E5C158] uppercase tracking-wider">
              {lang === 'hi' ? 'महत्वपूर्ण अनुभाग' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-1.5 text-[#FAF7F2]/80">
              <li>
                <a href="#catalogue" className="hover:text-[#E5C158] transition-colors">
                  {lang === 'hi' ? 'आभूषण संग्रह व मूल्य' : 'Jewellery Catalogue'}
                </a>
              </li>
              <li>
                <a href="#model-designs" className="hover:text-[#E5C158] transition-colors flex items-center gap-1 text-[#E5C158]">
                  <Sparkles className="w-3 h-3 text-[#E5C158]" />
                  <span>{lang === 'hi' ? 'मॉडल डिज़ाइन व लुकबुक' : 'Model Looks & Try-On'}</span>
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-[#E5C158] transition-colors">
                  {lang === 'hi' ? 'डिजिटल हिसाब पर्ची' : 'Price Calculator & Slip'}
                </a>
              </li>
              <li>
                <a href="#dulhan-builder" className="hover:text-[#E5C158] transition-colors">
                  {lang === 'hi' ? 'दुल्हन पैकेज बिल्डर' : 'Dulhan Package Builder'}
                </a>
              </li>
              <li>
                <a href="#gift-finder" className="hover:text-[#E5C158] transition-colors">
                  {lang === 'hi' ? 'उपहार खोजक (Gift Finder)' : 'Gift Finder Assistant'}
                </a>
              </li>
              <li>
                <a href="#muhurat" className="hover:text-[#E5C158] transition-colors">
                  {lang === 'hi' ? 'शुभ मुहूर्त पंचांग' : 'Shubh Muhurat Calendar'}
                </a>
              </li>
              <li>
                <a href="#trust" className="hover:text-[#E5C158] transition-colors">
                  {lang === 'hi' ? 'हॉलमार्क व HUID जांच' : 'Hallmark Verification'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Sarafa Traditions */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-bold text-sm text-[#E5C158] uppercase tracking-wider">
              {lang === 'hi' ? 'पारंपरिक श्रेणियां' : 'Heritage Collections'}
            </h4>
            <ul className="space-y-1.5 text-[#FAF7F2]/80">
              <li>{lang === 'hi' ? 'राजपूती बोरला व रखड़ी' : 'Rajputi Borla & Rakhdi'}</li>
              <li>{lang === 'hi' ? 'जोधपुरी कुंदन दुल्हन नथ' : 'Jodhpuri Kundan Nath'}</li>
              <li>{lang === 'hi' ? 'जयपुर मीनाकारी झुमकियां' : 'Jaipur Meenakari Jhumkas'}</li>
              <li>{lang === 'hi' ? 'ठोस गोखुरू कड़ा जोड़ी' : 'Antique Gokhru Gold Kadas'}</li>
              <li>{lang === 'hi' ? 'शुद्ध ९२५ चांदी छैलकड़ी पायल' : 'Pure 925 Silver Payal'}</li>
              <li>{lang === 'hi' ? '९९९ लक्ष्मी-गणेश पूजन सिक्के' : '999 Laxmi-Ganesh Pooja Coins'}</li>
            </ul>
          </div>

          {/* Col 4: Store Contact */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-bold text-sm text-[#E5C158] uppercase tracking-wider">
              {lang === 'hi' ? 'संपर्क व पता' : 'Contact & Visit'}
            </h4>
            <p className="text-[#FAF7F2]/85 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#E5C158] shrink-0 mt-0.5" />
              <span>{lang === 'hi' ? settings.addressHi : settings.addressEn}</span>
            </p>
            <p className="text-[#FAF7F2]/85 flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#E5C158] shrink-0" />
              <span className="font-mono">{settings.phone}</span>
            </p>
            <p className="text-[#FAF7F2]/85 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#E5C158] shrink-0" />
              <span>{lang === 'hi' ? settings.openingHoursHi : settings.openingHoursEn}</span>
            </p>
            <div className="pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-[11px] shadow-sm transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>{lang === 'hi' ? 'व्हाट्सएप चैट करें' : 'Chat on WhatsApp'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Mandatory Footer Disclaimer */}
        <div className="py-4 border-b border-white/10 text-center text-[11px] text-[#FAF7F2]/70 leading-relaxed max-w-4xl mx-auto space-y-1">
          <p className="font-semibold text-[#E5C158]">
            {lang === 'hi'
              ? 'अस्वीकरण (Disclaimer): वेबसाइट पर प्रदर्शित सभी भाव सांकेतिक (अनुमानित) हैं, वास्तविक व अंतिम भाव दुकान पर खरीद एवं डिजिटल तौल के समय निर्धारित होगा। चित्र केवल सांकेतिक नमूने हैं।'
              : 'Disclaimer: All prices shown on this website are indicative estimates. Final rate and total are confirmed at the shop based on live counter weighing. Images are sample representations.'}
          </p>
          <p>
            {lang === 'hi'
              ? 'सोने के भाव अंतर्राष्ट्रीय बुलियन व स्थानीय सर्राफा एसोसिएशन की दरों के अनुरूप प्रतिदिन बदलते हैं।'
              : 'Gold and silver rates fluctuate daily according to international bullion markets and local Sarafa Association benchmarks.'}
          </p>
        </div>

        {/* Bottom Credits & Hidden Admin Trigger */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#FAF7F2]/60">
          <div>
            © {new Date().getFullYear()} {lang === 'hi' ? settings.shopNameHi : settings.shopNameEn}, Sri Madhopur. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-[#E5C158] hover:text-white transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'दुकानदार लॉगिन / सेटिंग्स' : 'Owner Admin Settings'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
