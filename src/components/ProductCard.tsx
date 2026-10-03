import React, { useState } from 'react';
import { Product, LiveRates, Language, ShopSettings } from '../types';
import { calculateProductPrice, formatINR, formatWeight, generateWhatsAppLink } from '../utils/pricing';
import { JewelleryImage } from './JewelleryImage';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  rates: LiveRates;
  settings: ShopSettings;
  lang: Language;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, rates, settings, lang }) => {
  const [showBreakdown, setShowBreakdown] = useState<boolean>(false);

  const priceInfo = calculateProductPrice(product, rates, settings.gstPercent);
  const isGold = product.metal === 'gold';

  // Build inquiry message for WhatsApp
  const inquiryMessage = lang === 'hi'
    ? `नमस्ते श्री लक्ष्मी ज्वेलर्स! मुझे आपके इस जेवर की जानकारी चाहिए:\n\n*आभूषण:* ${product.nameHi}\n*शुद्धता:* ${product.purity} हॉलमार्क\n*सकल वजन:* ${formatWeight(product.grossWeight)}\n*अनुमानित मूल्य:* ${formatINR(priceInfo.total)}\n\nकृपया बताएं कि क्या यह अभी उपलब्ध है या दुकान पर देखने के लिए कब आ सकते हैं?`
    : `Hello Shri Laxmi Jewellers! I would like to inquire about this design:\n\n*Item:* ${product.nameEn}\n*Purity:* ${product.purity} Hallmarked\n*Gross Weight:* ${formatWeight(product.grossWeight)}\n*Estimated Price:* ${formatINR(priceInfo.total)}\n\nIs this in stock or can we schedule a visit?`;

  const whatsappUrl = generateWhatsAppLink(settings.whatsappNumber, inquiryMessage);

  return (
    <div className="bg-[#FFFDF9] border border-[#D4AF37]/30 rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group hover:border-[#D4AF37]">
      {/* Top Image Container with Jharokha Arch Frame */}
      <div className="relative p-3 pb-0 bg-gradient-to-b from-[#FAF5EE] to-[#FFFDF9]">
        <div className="relative w-full h-56 jharokha-frame border border-[#D4AF37]/40 shadow-inner overflow-hidden">
          <JewelleryImage 
            type={product.image} 
            name={product.nameEn} 
            metal={product.metal} 
          />

          {/* Featured badge if any */}
          {product.featured && (
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#4A0E17] text-[#E5C158] text-[10px] font-semibold tracking-wider rounded border border-[#D4AF37]/40 uppercase shadow-xs">
              {lang === 'hi' ? 'विशेष पसंद' : 'Featured'}
            </div>
          )}
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata Header (Following Zero-Pill Constitution) */}
          <div className="flex items-center gap-1.5 text-xs text-[#8A671C] font-medium mb-1.5">
            <span className="font-semibold">{isGold ? (lang === 'hi' ? 'सोना' : 'Gold') : (lang === 'hi' ? 'चांदी' : 'Silver')}</span>
            <span aria-hidden="true">·</span>
            <span>{product.purity} {lang === 'hi' ? 'हॉलमार्क' : 'Hallmark'}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{formatWeight(product.grossWeight)}</span>
          </div>

          {/* Title */}
          <h3 className="font-heading text-base sm:text-lg font-bold text-[#2E050C] line-clamp-2 leading-snug group-hover:text-[#6B1724] transition-colors">
            {lang === 'hi' ? product.nameHi : product.nameEn}
          </h3>

          {/* Description */}
          <p className="mt-1 text-xs text-[#5C450C]/80 line-clamp-2 leading-relaxed">
            {lang === 'hi' ? product.descriptionHi : product.descriptionEn}
          </p>
        </div>

        {/* Pricing Area */}
        <div className="mt-4 pt-3 border-t border-[#D4AF37]/20">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-[11px] text-[#8A671C] uppercase tracking-wider font-semibold">
                {lang === 'hi' ? 'अनुमानित कुल मूल्य' : 'Estimated Price'}
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#4A0E17] tracking-tight">
                {formatINR(priceInfo.total)}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-[#2E050C]/60 block">
                {lang === 'hi' ? 'जीएसटी 3% सहित' : 'Incl. 3% GST'}
              </span>
              <span className="text-[10px] text-emerald-700 font-medium">
                {lang === 'hi' ? 'पक्का बिल उपलब्ध' : 'Official Bill'}
              </span>
            </div>
          </div>

          {/* Expandable "See how the price is made" Receipt */}
          <div className="mt-2.5">
            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="w-full py-1 px-2.5 flex items-center justify-between text-xs text-[#8A671C] bg-[#FAF5EE] hover:bg-[#F3ECE0] rounded border border-[#D4AF37]/30 transition-colors"
            >
              <span className="flex items-center gap-1.5 font-medium">
                <Info className="w-3.5 h-3.5 text-[#B38622]" />
                {lang === 'hi' ? 'कीमत का हिसाब (Breakdown) देखें' : 'See How Price is Calculated'}
              </span>
              {showBreakdown ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showBreakdown && (
              <div className="mt-2 p-3 bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-lg text-xs space-y-1.5 font-mono shadow-inner animate-fadeIn">
                <div className="text-[11px] font-sans font-semibold text-[#4A0E17] pb-1 border-b border-[#D4AF37]/20 flex justify-between">
                  <span>{lang === 'hi' ? 'सर्राफा हिसाब पर्ची' : 'Jeweller Calculation Receipt'}</span>
                  <span>{lang === 'hi' ? 'दर:' : 'Rate:'} {formatINR(priceInfo.ratePerGram)}/g</span>
                </div>

                <div className="flex justify-between text-[#4A0E17]">
                  <span className="font-sans">{lang === 'hi' ? 'सकल वजन (Gross):' : 'Gross Wt:'}</span>
                  <span>{formatWeight(priceInfo.grossWeight)}</span>
                </div>

                {priceInfo.stoneWeight > 0 && (
                  <div className="flex justify-between text-[#8A671C]">
                    <span className="font-sans">{lang === 'hi' ? 'नगीना वजन (Less Stone):' : 'Less Stone:'}</span>
                    <span>-{formatWeight(priceInfo.stoneWeight)}</span>
                  </div>
                )}

                <div className="flex justify-between font-semibold text-[#2E050C]">
                  <span className="font-sans">{lang === 'hi' ? 'शुद्ध धातु वजन (Net Wt):' : 'Net Metal Wt:'}</span>
                  <span>{formatWeight(priceInfo.netWeight)}</span>
                </div>

                <div className="flex justify-between text-[#2E050C]">
                  <span className="font-sans">{lang === 'hi' ? 'सोना/धातु मूल्य:' : 'Metal Value:'}</span>
                  <span>{formatINR(priceInfo.metalValue)}</span>
                </div>

                <div className="flex justify-between text-[#2E050C]">
                  <span className="font-sans">
                    {lang === 'hi' ? 'घड़ाई (Making):' : 'Making Charge:'} 
                    <span className="text-[10px] text-[#8A671C] font-sans ml-1">
                      ({product.makingType === 'percent' ? `${product.makingValue}%` : product.makingType === 'perGram' ? `₹${product.makingValue}/g` : 'Flat'})
                    </span>
                  </span>
                  <span>{formatINR(priceInfo.makingCharge)}</span>
                </div>

                {priceInfo.stoneCharge > 0 && (
                  <div className="flex justify-between text-[#2E050C]">
                    <span className="font-sans">{lang === 'hi' ? 'नगीना / जड़ाऊ खर्च:' : 'Stone Charge:'}</span>
                    <span>{formatINR(priceInfo.stoneCharge)}</span>
                  </div>
                )}

                <div className="flex justify-between pt-1 border-t border-[#D4AF37]/20 text-[#8A671C]">
                  <span className="font-sans">{lang === 'hi' ? 'उप-योग (Subtotal):' : 'Subtotal:'}</span>
                  <span>{formatINR(priceInfo.subtotal)}</span>
                </div>

                <div className="flex justify-between text-[#8A671C]">
                  <span className="font-sans">{lang === 'hi' ? `जीएसटी (${priceInfo.gstPercent}%):` : `GST (${priceInfo.gstPercent}%):`}</span>
                  <span>{formatINR(priceInfo.gstAmount)}</span>
                </div>

                <div className="flex justify-between pt-1 border-t border-[#D4AF37]/40 font-bold text-[#4A0E17] text-sm">
                  <span className="font-sans">{lang === 'hi' ? 'कुल देय राशि:' : 'Total Estimate:'}</span>
                  <span>{formatINR(priceInfo.total)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Button: WhatsApp inquiry */}
          <div className="mt-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#128C7E] to-[#075E54] hover:from-[#0E7064] hover:to-[#054942] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>{lang === 'hi' ? 'दुकान से डिज़ाइन पूछें (WhatsApp)' : 'Ask About This Design'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
