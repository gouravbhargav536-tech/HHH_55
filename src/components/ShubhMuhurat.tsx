import React from 'react';
import { ShubhMuhurat as ShubhMuhuratType, Language, ShopSettings } from '../types';
import { generateWhatsAppLink } from '../utils/pricing';
import { MandalaDivider } from './IndianMotifs';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Calendar, Clock, Sparkles, AlertCircle } from 'lucide-react';

interface ShubhMuhuratProps {
  muhuratList: ShubhMuhuratType[];
  settings: ShopSettings;
  lang: Language;
}

export const ShubhMuhuratSection: React.FC<ShubhMuhuratProps> = ({ muhuratList, settings, lang }) => {
  return (
    <section id="muhurat" className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-[#FAF5EE] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A671C] uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{lang === 'hi' ? 'सोना-चांदी खरीद के पावन दिवस' : 'Auspicious Buying Dates'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#4A0E17]">
            {lang === 'hi' ? 'शुभ मुहूर्त पंचांग (Shubh Muhurat)' : 'Auspicious Gold & Silver Calendar'}
          </h2>
          <p className="mt-1 text-sm text-[#5C450C]/80">
            {lang === 'hi'
              ? 'पुष्य नक्षत्र, धनतेरस व मांगलिक चौघड़िया में स्वर्ण-रजत क्रय सुख व समृद्धि दायक होता है।'
              : 'Sample calendar of Pushya Nakshatra, Dhanteras and auspicious wedding buying days.'}
          </p>
          <MandalaDivider className="my-3" />
        </div>

        {/* Clear disclaimer stating this is a sample list per prompt requirement */}
        <div className="max-w-xl mx-auto mb-6 p-2 bg-[#FAF7F2] border border-[#D4AF37]/30 rounded-lg text-center text-[11px] text-[#8A671C] flex items-center justify-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#B38622]" />
          <span>
            {lang === 'hi'
              ? 'टिप्पणी: यह मुहूर्त सूची संदर्भ हेतु नमूना (Sample List) है। स्थानीय पंचांग अनुसार पुष्टि करें।'
              : 'Note: Clearly marked sample list for customer planning. Confirm with local sarafa panchang.'}
          </span>
        </div>

        {/* Muhurat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {muhuratList.map((m) => {
            const waMsg = lang === 'hi'
              ? `नमस्ते श्री लक्ष्मी ज्वेलर्स!\nमैं *${m.tithiHi} (${m.date})* के शुभ मुहूर्त में सोने/चांदी की खरीदारी के लिए टोकन बुकिंग करना चाहता हूँ।`
              : `Hello Shri Laxmi Jewellers!\nI would like to plan a purchase for the auspicious occasion of *${m.tithiEn} (${m.date})*.`;
            const waUrl = generateWhatsAppLink(settings.whatsappNumber, waMsg);

            return (
              <div
                key={m.id}
                className="bg-white border border-[#D4AF37]/30 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-[#D4AF37] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 pb-2 border-b border-[#D4AF37]/20">
                    <div>
                      <span className="text-[11px] font-semibold text-[#8A671C] font-mono block">
                        {m.date}
                      </span>
                      <h3 className="font-heading text-base font-bold text-[#4A0E17] mt-0.5">
                        {lang === 'hi' ? m.tithiHi : m.tithiEn}
                      </h3>
                    </div>
                    <div className="p-2 rounded-xl bg-[#FAF5EE] text-[#4A0E17]">
                      <Calendar className="w-5 h-5 text-[#B38622]" />
                    </div>
                  </div>

                  <p className="mt-2.5 text-xs text-[#2E050C] font-medium leading-relaxed">
                    {lang === 'hi' ? m.eventHi : m.eventEn}
                  </p>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-[#8A671C] font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#B38622]" />
                    <span>{m.auspiciousHours}</span>
                  </div>

                  <p className="mt-2 text-[11px] text-[#5C450C]/80 leading-normal">
                    {lang === 'hi' ? m.importanceHi : m.importanceEn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D4AF37]/20">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-lg bg-[#FAF5EE] hover:bg-[#F3ECE0] text-[#4A0E17] text-xs font-semibold flex items-center justify-center gap-2 border border-[#D4AF37]/40 transition-colors"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-[#128C7E]" />
                    <span>{lang === 'hi' ? 'इस मुहूर्त के लिए बुकिंग पूछें' : 'Inquire for This Muhurat'}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
