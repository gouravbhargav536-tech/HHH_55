import React from 'react';
import { Language, CustomerReview, FaqItem } from '../types';
import { MandalaDivider } from './IndianMotifs';
import { ShieldCheck, CheckCircle2, Star, Smartphone, Scale, FileText, ChevronDown } from 'lucide-react';

interface HallmarkTrustProps {
  reviews: CustomerReview[];
  faqs: FaqItem[];
  lang: Language;
}

export const HallmarkTrustSection: React.FC<HallmarkTrustProps> = ({ reviews, faqs, lang }) => {
  const [openFaq, setOpenFaq] = React.useState<string | null>(faqs[0]?.id || null);

  return (
    <section id="trust" className="max-w-6xl mx-auto px-4 py-8">
      {/* 1. FACTUAL BIS HALLMARK & HUID GUIDE */}
      <div className="bg-white border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A671C] uppercase tracking-widest mb-1">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>{lang === 'hi' ? 'शुद्धता की सरकारी गारंटी' : 'Govt. Purity Assurance'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#4A0E17]">
            {lang === 'hi' ? 'BIS हॉलमार्क एवं HUID कोड की पहचान' : 'Understanding BIS Hallmark & HUID Code'}
          </h2>
          <p className="mt-1 text-sm text-[#5C450C]/80">
            {lang === 'hi'
              ? 'सोना खरीदते समय हर ग्राहक को अपने जेवर पर ये ३ सरकारी चिन्ह अवश्य देखने चाहिए:'
              : 'Every customer should verify these 3 government marks stamped on hallmark gold:'}
          </p>
          <MandalaDivider className="my-3" />
        </div>

        {/* 3 Hallmark Pillars Graphic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* 1. BIS Logo */}
          <div className="p-4 bg-[#FAF7F2] border border-[#D4AF37]/30 rounded-2xl text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#4A0E17] text-[#E5C158] flex items-center justify-center font-bold text-xl mb-3 shadow-xs">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12,2 22,20 2,20" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-base text-[#4A0E17]">
              {lang === 'hi' ? '१. बीआईएस मानक चिन्ह' : '1. BIS Triangular Logo'}
            </h3>
            <p className="text-xs text-[#5C450C] mt-1.5 leading-relaxed">
              {lang === 'hi'
                ? 'भारतीय मानक ब्यूरो (Bureau of Indian Standards) का आधिकारिक त्रिकोण निशान जो शुद्धता का प्रतीक है।'
                : 'Official triangular stamp certifying conformity to Bureau of Indian Standards specifications.'}
            </p>
          </div>

          {/* 2. Purity & Fineness */}
          <div className="p-4 bg-[#FAF7F2] border border-[#D4AF37]/30 rounded-2xl text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#B38622] text-white flex items-center justify-center font-bold text-sm font-mono mb-3 shadow-xs">
              22K916
            </div>
            <h3 className="font-heading font-bold text-base text-[#4A0E17]">
              {lang === 'hi' ? '२. शुद्धता व कैरेट' : '2. Purity & Fineness Mark'}
            </h3>
            <p className="text-xs text-[#5C450C] mt-1.5 leading-relaxed">
              {lang === 'hi'
                ? 'सोने के कैरेट का स्पष्ट अंकन: 22K (91.6% शुद्ध), 18K (75.0% शुद्ध) या 14K (58.5% शुद्ध)।'
                : 'Exact stamped fineness: 22K916 (91.6% pure), 18K750 (75.0% pure), or 14K585 (58.5% pure).'}
            </p>
          </div>

          {/* 3. 6-Digit Alphanumeric HUID */}
          <div className="p-4 bg-[#FAF7F2] border border-[#D4AF37]/30 rounded-2xl text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#083D56] text-white flex items-center justify-center font-bold text-xs font-mono tracking-wider mb-3 shadow-xs">
              AB1234
            </div>
            <h3 className="font-heading font-bold text-base text-[#4A0E17]">
              {lang === 'hi' ? '३. ६ अंकों का HUID कोड' : '3. 6-Digit HUID Code'}
            </h3>
            <p className="text-xs text-[#5C450C] mt-1.5 leading-relaxed">
              {lang === 'hi'
                ? 'हर आभूषण की विशिष्ट पहचान (Hallmark Unique Identification)। इसे सरकार के "BIS Care App" में डालकर तुरंत शुद्धता व दुकान की जांच करें।'
                : 'Unique alphanumeric identifier. Verify jewelry authenticity and hallmarking center directly on BIS Care App.'}
            </p>
          </div>
        </div>

        {/* BIS Care App Verification Guide */}
        <div className="mt-6 p-4 bg-[#FAF5EE] rounded-xl border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#4A0E17] text-[#E5C158] rounded-xl shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#4A0E17]">
                {lang === 'hi' ? 'अपने मोबाइल में BIS Care App से कैसे जांचें?' : 'How to verify using BIS Care Mobile App'}
              </div>
              <div className="text-[11px] text-[#5C450C]/80 mt-0.5">
                {lang === 'hi'
                  ? 'ऐप खोलें → "Verify HUID" पर क्लिक करें → जेवर पर छपा 6 अंकों का कोड दर्ज करें → तुरंत सोने की शुद्धता स्क्रीन पर देखें।'
                  : 'Open App → Tap "Verify HUID" → Enter 6-digit stamped code → View hallmarking center and exact karat on screen.'}
              </div>
            </div>
          </div>

          <div className="shrink-0 text-xs font-mono text-[#8A671C] font-semibold bg-white px-3 py-1.5 rounded-lg border border-[#D4AF37]/30">
            Govt. BIS Care App
          </div>
        </div>
      </div>

      {/* 2. THREE PILLARS OF TRUST (Pakka Bill, Front Weighing, Exchange Policy) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-[#FFFDF9] border border-[#D4AF37]/30 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2.5 text-[#4A0E17] font-heading font-bold text-base mb-2">
            <FileText className="w-5 h-5 text-[#B38622]" />
            <span>{lang === 'hi' ? '१००% पक्का बिल' : '100% Pakka Invoice'}</span>
          </div>
          <p className="text-xs text-[#5C450C] leading-relaxed">
            {lang === 'hi'
              ? 'हर खरीद पर सरकारी जीएसटी, एचयूआईडी नंबर, सकल व शुद्ध वजन की स्पष्ट प्रविष्टि युक्त पक्का कंप्यूटराइज्ड बिल प्रदान किया जाता है (Sample Policy)।'
              : 'Every purchase receives an itemized GST invoice with stamped HUID code, gross weight, and net weight (Sample Policy).'}
          </p>
        </div>

        <div className="bg-[#FFFDF9] border border-[#D4AF37]/30 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2.5 text-[#4A0E17] font-heading font-bold text-base mb-2">
            <Scale className="w-5 h-5 text-[#B38622]" />
            <span>{lang === 'hi' ? 'ग्राहक के समक्ष तौल' : 'Open Front Weighing'}</span>
          </div>
          <p className="text-xs text-[#5C450C] leading-relaxed">
            {lang === 'hi'
              ? 'अत्याधुनिक सीलबंद डिजिटल कंप्यूटर कांटे पर मिलीग्राम (0.001g) स्तर की पारदर्शी तौल। ग्राहक अपनी आंखों के सामने वजन जांच सकते हैं।'
              : 'Precision digital calibrated scales measuring up to 0.001g placed transparently on the customer counter.'}
          </p>
        </div>

        <div className="bg-[#FFFDF9] border border-[#D4AF37]/30 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2.5 text-[#4A0E17] font-heading font-bold text-base mb-2">
            <CheckCircle2 className="w-5 h-5 text-[#B38622]" />
            <span>{lang === 'hi' ? 'पारदर्शी एक्सचेंज नीति' : 'Lifetime Buyback & Exchange'}</span>
          </div>
          <p className="text-xs text-[#5C450C] leading-relaxed">
            {lang === 'hi'
              ? 'हमारे बनाए सभी हॉलमार्क जेवर पर आजीवन १००% धातु मूल्य एक्सचेंज गारंटी। पुराना सोना भी आज के ताज़ा भाव पर बदला जाता है।'
              : '100% metal value exchange guarantee on our hallmarked jewellery at prevailing market rates anytime.'}
          </p>
        </div>
      </div>

      {/* 3. GOOGLE REVIEWS SECTION (Authentic local verified customers) */}
      <div className="mt-8 bg-[#FAF5EE] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#D4AF37]/20">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold font-mono text-[#4A0E17]">4.9</span>
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs text-[#8A671C] font-semibold">
                (Google Reviews · 180+ {lang === 'hi' ? 'समीक्षाएं' : 'reviews'})
              </span>
            </div>
            <h3 className="font-heading text-lg font-bold text-[#4A0E17] mt-1">
              {lang === 'hi' ? 'हमारे ग्राहकों का विश्वास व अनुभव' : 'Trusted by Generations of Families'}
            </h3>
          </div>

          <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>{lang === 'hi' ? 'सत्यापित स्थानीय ग्राहक' : 'Verified Local Buyers'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white p-4 rounded-xl border border-[#D4AF37]/30 shadow-2xs">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-heading font-bold text-sm text-[#4A0E17]">{r.name}</div>
                  <div className="text-[11px] text-[#8A671C]">{r.location} · {r.date}</div>
                </div>
                <div className="flex text-amber-500">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>

              <p className="mt-2 text-xs text-[#2E050C] leading-relaxed italic">
                "{lang === 'hi' ? r.commentHi : r.commentEn}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. HINDI FAQ ACCORDION */}
      <div className="mt-8 bg-white border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8">
        <div className="text-center max-w-xl mx-auto mb-6">
          <h3 className="font-heading text-xl font-bold text-[#4A0E17]">
            {lang === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न (FAQ)' : 'Frequently Asked Questions'}
          </h3>
          <p className="text-xs text-[#5C450C]/80 mt-1">
            {lang === 'hi' ? 'घड़ाई, हॉलमार्क, एक्सचेंज व बुकिंग से जुड़े आपके सभी सवाल' : 'Clear answers regarding making charges, purity, exchange, and delivery'}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-[#D4AF37]/30 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full p-4 text-left font-semibold text-xs sm:text-sm text-[#4A0E17] bg-[#FAF7F2] hover:bg-[#FAF5EE] flex items-center justify-between gap-3 transition-colors"
                >
                  <span>{lang === 'hi' ? faq.questionHi : faq.questionEn}</span>
                  <ChevronDown className={`w-4 h-4 text-[#B38622] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="p-4 bg-white text-xs text-[#2E050C] leading-relaxed border-t border-[#D4AF37]/20 animate-fadeIn">
                    {lang === 'hi' ? faq.answerHi : faq.answerEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
