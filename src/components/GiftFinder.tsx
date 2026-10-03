import React, { useState, useMemo } from 'react';
import { Product, LiveRates, Language, ShopSettings } from '../types';
import { ProductCard } from './ProductCard';
import { calculateProductPrice, formatINR } from '../utils/pricing';
import { MandalaDivider } from './IndianMotifs';
import { Gift, Heart, User } from 'lucide-react';

interface GiftFinderProps {
  products: Product[];
  rates: LiveRates;
  settings: ShopSettings;
  lang: Language;
}

export const GiftFinder: React.FC<GiftFinderProps> = ({ products, rates, settings, lang }) => {
  const [recipient, setRecipient] = useState<string>('gift_mother');
  const [budgetTier, setBudgetTier] = useState<number>(50000);

  const recipientOptions = [
    { id: 'gift_mother', labelHi: 'माँ के लिए (Mother)', labelEn: 'For Mother', icon: '🙏' },
    { id: 'gift_wife', labelHi: 'धर्मपत्नी के लिए (Wife)', labelEn: 'For Wife', icon: '💖' },
    { id: 'gift_sister', labelHi: 'बहन के लिए (Sister)', labelEn: 'For Sister', icon: '🌸' },
    { id: 'gift_daughter', labelHi: 'बेटी के लिए (Daughter)', labelEn: 'For Daughter', icon: '✨' },
    { id: 'bride', labelHi: 'दुल्हन हेतु (Bride)', labelEn: 'For Bride', icon: '👑' },
  ];

  const budgetOptions = [
    { amount: 15000, labelHi: '₹15,000 तक', labelEn: 'Under ₹15,000' },
    { amount: 35000, labelHi: '₹35,000 तक', labelEn: 'Under ₹35,000' },
    { amount: 60000, labelHi: '₹60,000 तक', labelEn: 'Under ₹60,000' },
    { amount: 150000, labelHi: '₹1.5 लाख तक', labelEn: 'Under ₹1.5 Lakh' },
    { amount: 500000, labelHi: 'शाही उपहार (Above ₹1.5L)', labelEn: 'Royal Gifts (> ₹1.5L)' },
  ];

  // Match items based on recipient tag and budget
  const matchingGifts = useMemo(() => {
    return products.filter((p) => {
      const price = calculateProductPrice(p, rates, settings.gstPercent).total;
      const matchesRecipient = p.occasionTags.includes(recipient) || p.occasionTags.includes('gift') || p.occasionTags.includes('festive');
      
      if (budgetTier < 500000) {
        return matchesRecipient && price <= budgetTier;
      }
      return matchesRecipient && price >= 100000;
    });
  }, [products, recipient, budgetTier, rates, settings]);

  return (
    <section id="gift-finder" className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-[#FFFDF9] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A671C] uppercase tracking-widest mb-1">
            <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{lang === 'hi' ? 'परफेक्ट उपहार सहायक' : 'Curated Gifting Assistant'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#4A0E17]">
            {lang === 'hi' ? 'अपनों के लिए शुभ उपहार खोजें' : 'Auspicious Jewellery Gift Finder'}
          </h2>
          <p className="mt-1 text-sm text-[#5C450C]/80">
            {lang === 'hi'
              ? 'रिश्ता और अपना बजट चुनें — हम आपके लिए सबसे उपयुक्त और यादगार गहने दिखाएंगे।'
              : 'Select who you are gifting and your budget to see matching hallmark jewellery.'}
          </p>
          <MandalaDivider className="my-3" />
        </div>

        {/* Step 1: Who is it for? */}
        <div className="mt-4">
          <label className="block text-xs font-semibold text-[#8A671C] uppercase text-center mb-2.5">
            {lang === 'hi' ? '१. उपहार किसके लिए है?' : '1. Who is this gift for?'}
          </label>
          <div className="flex flex-wrap justify-center gap-2">
            {recipientOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setRecipient(opt.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  recipient === opt.id
                    ? 'bg-[#4A0E17] text-[#FAF7F2] shadow-sm'
                    : 'bg-[#FAF5EE] text-[#5C450C] hover:bg-[#F3ECE0] border border-[#D4AF37]/30'
                }`}
              >
                <span>{opt.icon}</span>
                <span>{lang === 'hi' ? opt.labelHi : opt.labelEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: What is the budget? */}
        <div className="mt-5 pt-4 border-t border-[#D4AF37]/20">
          <label className="block text-xs font-semibold text-[#8A671C] uppercase text-center mb-2.5">
            {lang === 'hi' ? '२. आपका बजट कितना है?' : '2. What is your budget?'}
          </label>
          <div className="flex flex-wrap justify-center gap-2">
            {budgetOptions.map((b) => (
              <button
                key={b.amount}
                onClick={() => setBudgetTier(b.amount)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium font-mono transition-all ${
                  budgetTier === b.amount
                    ? 'bg-[#B38622] text-white shadow-xs font-bold'
                    : 'bg-[#FAF7F2] text-[#5C450C] hover:bg-[#FAF5EE] border border-[#D4AF37]/30'
                }`}
              >
                {lang === 'hi' ? b.labelHi : b.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mt-8">
          <div className="text-center pb-3">
            <span className="text-xs font-semibold text-[#4A0E17]">
              {lang === 'hi'
                ? `आपके बजट में ${matchingGifts.length} उपहार विकल्प मिले:`
                : `Found ${matchingGifts.length} gift options matching your selection:`}
            </span>
          </div>

          {matchingGifts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchingGifts.slice(0, 3).map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  rates={rates}
                  settings={settings}
                  lang={lang}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-xs text-[#8A671C]">
              {lang === 'hi' ? 'कृपया थोड़ा अधिक बजट चुनकर देखें' : 'Try selecting a higher budget tier'}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
