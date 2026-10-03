import React, { useState } from 'react';
import { LiveRates, Language, ShopSettings, MetalType, Purity, GoldPurity, MakingType } from '../types';
import { calculateItemPrice, calculateOldGoldExchange, formatINR, formatWeight, generateWhatsAppLink } from '../utils/pricing';
import { MandalaDivider } from './IndianMotifs';
import { BrandLogo } from './BrandLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Calculator, Printer, RefreshCw, Scale, ArrowRightLeft, ShieldAlert } from 'lucide-react';

interface PriceCalculatorProps {
  rates: LiveRates;
  settings: ShopSettings;
  lang: Language;
}

export const PriceCalculatorHisab: React.FC<PriceCalculatorProps> = ({ rates, settings, lang }) => {
  const [activeTab, setActiveTab] = useState<'new_jewellery' | 'old_exchange'>('new_jewellery');

  // New jewellery calculator state
  const [metal, setMetal] = useState<MetalType>('gold');
  const [purity, setPurity] = useState<Purity>('22K');
  const [grossWeight, setGrossWeight] = useState<number>(10.5);
  const [stoneWeight, setStoneWeight] = useState<number>(0.5);
  const [makingType, setMakingType] = useState<MakingType>('percent');
  const [makingValue, setMakingValue] = useState<number>(settings.defaultMakingPercent || 12);
  const [stoneCharge, setStoneCharge] = useState<number>(500);
  const [includeGst, setIncludeGst] = useState<boolean>(true);

  // Old gold estimator state
  const [oldWeight, setOldWeight] = useState<number>(15.0);
  const [oldPurity, setOldPurity] = useState<GoldPurity>('22K');
  const [oldDeduction, setOldDeduction] = useState<number>(settings.oldGoldDeductionPercent || 2.5);

  // Calculate new jewellery price breakdown
  const currentGst = includeGst ? settings.gstPercent : 0;
  const breakdown = calculateItemPrice(
    grossWeight,
    stoneWeight,
    metal,
    purity,
    makingType,
    makingValue,
    stoneCharge,
    rates,
    currentGst
  );

  // Calculate old gold estimate
  const oldGoldBreakdown = calculateOldGoldExchange(oldWeight, oldPurity, rates, oldDeduction);

  // WhatsApp prefilled message for new estimation
  const sendNewToWhatsApp = () => {
    const metalName = metal === 'gold' ? (lang === 'hi' ? 'सोना' : 'Gold') : (lang === 'hi' ? 'चांदी' : 'Silver');
    const text = lang === 'hi'
      ? `नमस्ते श्री लक्ष्मी ज्वेलर्स!\nमैंने वेबसाइट पर ज्वेलरी हिसाब पर्ची तैयार की है:\n\n*धातु:* ${metalName} (${purity} हॉलमार्क)\n*सकल वजन:* ${formatWeight(breakdown.grossWeight)}\n*नगीना वजन:* ${formatWeight(breakdown.stoneWeight)}\n*शुद्ध धातु वजन:* ${formatWeight(breakdown.netWeight)}\n*आज का भाव:* ${formatINR(breakdown.ratePerGram)}/g\n*सोने का मूल्य:* ${formatINR(breakdown.metalValue)}\n*घड़ाई (मेकिंग):* ${formatINR(breakdown.makingCharge)}\n*नगीना चार्ज:* ${formatINR(breakdown.stoneCharge)}\n*उप-योग:* ${formatINR(breakdown.subtotal)}\n*जीएसटी (${breakdown.gstPercent}%):* ${formatINR(breakdown.gstAmount)}\n*कुल देय अनुमान:* ${formatINR(breakdown.total)}\n\nकृपया इस हिसाब पर आभूषण तैयार करने के बारे में मार्गदर्शन करें।`
      : `Hello Shri Laxmi Jewellers!\nI calculated a jewellery estimate slip:\n\n*Metal:* ${metalName} (${purity})\n*Gross Weight:* ${formatWeight(breakdown.grossWeight)}\n*Net Metal Weight:* ${formatWeight(breakdown.netWeight)}\n*Rate applied:* ${formatINR(breakdown.ratePerGram)}/g\n*Metal Value:* ${formatINR(breakdown.metalValue)}\n*Making:* ${formatINR(breakdown.makingCharge)}\n*Stone:* ${formatINR(breakdown.stoneCharge)}\n*Subtotal:* ${formatINR(breakdown.subtotal)}\n*GST (${breakdown.gstPercent}%):* ${formatINR(breakdown.gstAmount)}\n*Total Estimated:* ${formatINR(breakdown.total)}\n\nPlease advise if you have designs in this weight range.`;

    const url = generateWhatsAppLink(settings.whatsappNumber, text);
    window.open(url, '_blank');
  };

  // WhatsApp prefilled message for old gold exchange
  const sendOldExchangeToWhatsApp = () => {
    const text = lang === 'hi'
      ? `नमस्ते श्री लक्ष्मी ज्वेलर्स!\nमैं पुराना सोना बदलना चाहता हूँ:\n\n*वजन:* ${formatWeight(oldWeight)}\n*शुद्धता:* ${oldPurity}\n*आज की दर:* ${formatINR(oldGoldBreakdown.ratePerGram)}/g\n*सकल मूल्य:* ${formatINR(oldGoldBreakdown.pureValue)}\n*अनुमानित रिफाइनिंग कटौती (${oldDeduction}%):* ${formatINR(oldGoldBreakdown.deductionAmount)}\n*अनुमानित भुगतान / एडजस्टमेंट:* ${formatINR(oldGoldBreakdown.netPayout)}\n\nदुकान पर टेस्टिंग और नए आभूषण में बदलने हेतु कब आ सकते हैं?`
      : `Hello Shri Laxmi Jewellers!\nI wish to exchange old gold:\n\n*Weight:* ${formatWeight(oldWeight)}\n*Purity:* ${oldPurity}\n*Today Rate:* ${formatINR(oldGoldBreakdown.ratePerGram)}/g\n*Gross Value:* ${formatINR(oldGoldBreakdown.pureValue)}\n*Deduction (${oldDeduction}%):* ${formatINR(oldGoldBreakdown.deductionAmount)}\n*Net Estimated Payout:* ${formatINR(oldGoldBreakdown.netPayout)}\n\nPlease let me know store timings for verification.`;

    const url = generateWhatsAppLink(settings.whatsappNumber, text);
    window.open(url, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="calculator" className="max-w-5xl mx-auto px-4 py-8">
      {/* Section Title */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A671C] uppercase tracking-widest mb-1">
          <Calculator className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{lang === 'hi' ? 'पारदर्शी डिजिटल हिसाब' : 'Transparent Calculation Slip'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#4A0E17]">
          {lang === 'hi' ? 'ज्वेलरी हिसाब पर्ची व पुराना सोना एक्सचेंज' : 'Jeweller Hisab Slip & Old Gold Exchange'}
        </h2>
        <p className="mt-1 text-sm text-[#5C450C]/80">
          {lang === 'hi'
            ? 'सर्राफा परंपरा अनुसार शुद्ध वजन, घड़ाई व जीएसटी का पाई-पाई पारदर्शी हिसाब'
            : 'Exact bill-style breakdown matching authentic Indian Sarafa ledger standards'}
        </p>
        <MandalaDivider className="my-3" />
      </div>

      {/* Tabs */}
      <div className="flex justify-center mt-4">
        <div className="inline-flex p-1 bg-[#FAF5EE] border border-[#D4AF37]/30 rounded-xl shadow-xs">
          <button
            onClick={() => setActiveTab('new_jewellery')}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'new_jewellery'
                ? 'bg-[#4A0E17] text-[#FAF7F2] shadow-sm'
                : 'text-[#5C450C] hover:text-[#4A0E17]'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{lang === 'hi' ? 'नए आभूषण की पर्ची (Hisab)' : 'New Jewellery Estimate'}</span>
          </button>
          <button
            onClick={() => setActiveTab('old_exchange')}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'old_exchange'
                ? 'bg-[#4A0E17] text-[#FAF7F2] shadow-sm'
                : 'text-[#5C450C] hover:text-[#4A0E17]'
            }`}
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>{lang === 'hi' ? 'पुराना सोना एक्सचेंज (Estimate)' : 'Old Gold Exchange'}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: NEW JEWELLERY HISAB SLIP */}
      {activeTab === 'new_jewellery' && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs Column (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#D4AF37]/40 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="font-heading text-lg font-bold text-[#4A0E17] pb-2 border-b border-[#D4AF37]/20 flex items-center justify-between">
              <span>{lang === 'hi' ? 'आभूषण विवरण दर्ज करें' : 'Enter Item Specifications'}</span>
              <span className="text-xs font-mono font-normal text-[#8A671C]">
                {lang === 'hi' ? 'लागू दर:' : 'Rate:'} {formatINR(breakdown.ratePerGram)}/g
              </span>
            </h3>

            {/* Metal & Purity Selection */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#8A671C] uppercase mb-1">
                  {lang === 'hi' ? 'धातु (Metal)' : 'Metal'}
                </label>
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#FAF7F2] border border-[#D4AF37]/30 rounded-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setMetal('gold');
                      setPurity('22K');
                    }}
                    className={`py-1.5 text-xs font-medium rounded ${
                      metal === 'gold' ? 'bg-[#B38622] text-white' : 'text-[#5C450C]'
                    }`}
                  >
                    {lang === 'hi' ? 'सोना (Gold)' : 'Gold'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMetal('silver');
                      setPurity('925');
                    }}
                    className={`py-1.5 text-xs font-medium rounded ${
                      metal === 'silver' ? 'bg-[#475569] text-white' : 'text-[#5C450C]'
                    }`}
                  >
                    {lang === 'hi' ? 'चांदी (Silver)' : 'Silver'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8A671C] uppercase mb-1">
                  {lang === 'hi' ? 'शुद्धता (Purity)' : 'Purity'}
                </label>
                <select
                  value={purity}
                  onChange={(e) => setPurity(e.target.value as any)}
                  className="w-full p-2 bg-[#FAF7F2] border border-[#D4AF37]/30 rounded-lg text-xs font-medium text-[#4A0E17] focus:ring-1 focus:ring-[#B38622] outline-hidden"
                >
                  {metal === 'gold' ? (
                    <>
                      <option value="22K">22K (916 Hallmark)</option>
                      <option value="18K">18K (750 Hallmark)</option>
                      <option value="24K">24K (999 Pure)</option>
                      <option value="14K">14K (585)</option>
                    </>
                  ) : (
                    <>
                      <option value="925">925 Pure Silver (92.5%)</option>
                      <option value="999">999 Fine Silver (99.9%)</option>
                      <option value="800">800 Traditional Silver (80%)</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            {/* Weights: Gross and Stone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#8A671C] uppercase mb-1">
                  {lang === 'hi' ? 'सकल वजन (Gross Wt. in Grams)' : 'Gross Weight (Grams)'}
                </label>
                <input
                  type="number"
                  step="0.05"
                  min="0.1"
                  value={grossWeight || ''}
                  onChange={(e) => setGrossWeight(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#D4AF37]/30 rounded-lg text-sm font-mono font-bold text-[#4A0E17] focus:ring-1 focus:ring-[#B38622] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8A671C] uppercase mb-1">
                  {lang === 'hi' ? 'नगीना वजन (Less Stone Wt. in Grams)' : 'Stone Weight (Grams)'}
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={stoneWeight || ''}
                  onChange={(e) => setStoneWeight(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#D4AF37]/30 rounded-lg text-sm font-mono text-[#8A671C] focus:ring-1 focus:ring-[#B38622] outline-hidden"
                />
              </div>
            </div>

            {/* Making Charge Type and Value */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#8A671C] uppercase mb-1">
                  {lang === 'hi' ? 'घड़ाई का प्रकार (Making Type)' : 'Making Charge Type'}
                </label>
                <select
                  value={makingType}
                  onChange={(e) => setMakingType(e.target.value as MakingType)}
                  className="w-full p-2 bg-[#FAF7F2] border border-[#D4AF37]/30 rounded-lg text-xs font-medium text-[#4A0E17] focus:ring-1 focus:ring-[#B38622] outline-hidden"
                >
                  <option value="percent">{lang === 'hi' ? 'प्रतिशत (%) सोना मूल्य पर' : 'Percentage (%) on metal'}</option>
                  <option value="perGram">{lang === 'hi' ? 'प्रति ग्राम (₹ / Gram)' : 'Per Gram (₹ / g)'}</option>
                  <option value="flat">{lang === 'hi' ? 'एकमुश्त (Flat ₹)' : 'Flat Amount (₹)'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8A671C] uppercase mb-1">
                  {lang === 'hi' ? 'घड़ाई दर (Making Value)' : 'Making Rate'} 
                  <span className="text-[10px] text-stone-500 lowercase ml-1">
                    ({makingType === 'percent' ? '%' : '₹'})
                  </span>
                </label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={makingValue || ''}
                  onChange={(e) => setMakingValue(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#D4AF37]/30 rounded-lg text-sm font-mono font-semibold text-[#4A0E17] focus:ring-1 focus:ring-[#B38622] outline-hidden"
                />
              </div>
            </div>

            {/* Stone Charge & GST Toggle */}
            <div className="grid grid-cols-2 gap-3 items-center">
              <div>
                <label className="block text-xs font-semibold text-[#8A671C] uppercase mb-1">
                  {lang === 'hi' ? 'नगीना / स्टोन खर्च (₹)' : 'Stone Charge (₹)'}
                </label>
                <input
                  type="number"
                  step="50"
                  min="0"
                  value={stoneCharge || ''}
                  onChange={(e) => setStoneCharge(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#D4AF37]/30 rounded-lg text-sm font-mono text-[#4A0E17] focus:ring-1 focus:ring-[#B38622] outline-hidden"
                />
              </div>

              <div className="pt-4">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeGst}
                    onChange={(e) => setIncludeGst(e.target.checked)}
                    className="w-4 h-4 accent-[#4A0E17] rounded"
                  />
                  <span className="text-xs font-medium text-[#2E050C]">
                    {lang === 'hi' ? `जीएसटी (${settings.gstPercent}%) शामिल करें` : `Include GST (${settings.gstPercent}%)`}
                  </span>
                </label>
                <span className="text-[10px] text-[#8A671C] block ml-6">
                  {lang === 'hi' ? 'पक्का बिल अनिवार्य (Govt Rules)' : 'Government Official Invoice'}
                </span>
              </div>
            </div>
          </div>

          {/* Slip Output Column (5 cols) */}
          <div className="lg:col-span-5">
            <div
              id="hisab-print-area"
              className="bg-[#FFFDF8] border-2 border-[#D4AF37] rounded-2xl p-5 shadow-md font-mono text-xs text-[#2E050C] relative"
            >
              {/* Slip Header */}
              <div className="text-center pb-3 border-b-2 border-dashed border-[#D4AF37]/60 flex flex-col items-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <BrandLogo size="xs" showBorder={true} />
                  <span className="text-[10px] tracking-widest text-[#8A671C] uppercase font-sans font-bold">
                    ॥ श्री लक्ष्मी जी सदा सहाय ॥
                  </span>
                </div>
                <h4 className="font-heading text-lg font-bold text-[#4A0E17] mt-0.5 font-sans">
                  {lang === 'hi' ? settings.shopNameHi : settings.shopNameEn}
                </h4>
                <div className="text-[10px] text-[#5C450C] font-sans">
                  {lang === 'hi' ? settings.addressHi : settings.addressEn}
                </div>
                <div className="text-[10px] text-[#8A671C] mt-1 font-sans font-medium">
                  {lang === 'hi' ? 'अनुमानित हिसाब पर्ची (Est. Bill Slip)' : 'Estimation Slip'} · {new Date().toLocaleDateString('en-IN')}
                </div>
              </div>

              {/* Metal & Purity Banner */}
              <div className="my-2.5 py-1 px-2.5 bg-[#FAF5EE] rounded flex justify-between font-sans text-xs font-semibold text-[#4A0E17]">
                <span>{metal === 'gold' ? (lang === 'hi' ? 'सोना (Gold)' : 'Gold') : (lang === 'hi' ? 'चांदी (Silver)' : 'Silver')} · {purity}</span>
                <span>{formatINR(breakdown.ratePerGram)} / {lang === 'hi' ? 'ग्राम' : 'g'}</span>
              </div>

              {/* Line Items */}
              <div className="space-y-1.5 py-2 border-b border-dashed border-[#D4AF37]/40">
                <div className="flex justify-between">
                  <span className="text-stone-600 font-sans">{lang === 'hi' ? 'सकल वजन (Gross Weight):' : 'Gross Weight:'}</span>
                  <span className="font-bold">{formatWeight(breakdown.grossWeight)}</span>
                </div>

                {breakdown.stoneWeight > 0 && (
                  <div className="flex justify-between text-rose-800">
                    <span className="font-sans">{lang === 'hi' ? 'कम नगीना वजन (Less Stone):' : 'Less Stone Weight:'}</span>
                    <span>-{formatWeight(breakdown.stoneWeight)}</span>
                  </div>
                )}

                <div className="flex justify-between font-bold text-[#2E050C] pt-0.5 border-t border-dotted border-stone-300">
                  <span className="font-sans">{lang === 'hi' ? 'शुद्ध धातु वजन (Net Weight):' : 'Net Metal Weight:'}</span>
                  <span>{formatWeight(breakdown.netWeight)}</span>
                </div>

                <div className="flex justify-between pt-1">
                  <span className="text-stone-600 font-sans">{lang === 'hi' ? 'धातु मूल्य (Metal Value):' : 'Metal Value:'}</span>
                  <span>{formatINR(breakdown.metalValue)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-stone-600 font-sans">{lang === 'hi' ? 'घड़ाई (Making Charge):' : 'Making Charges:'}</span>
                  <span>{formatINR(breakdown.makingCharge)}</span>
                </div>

                {breakdown.stoneCharge > 0 && (
                  <div className="flex justify-between">
                    <span className="text-stone-600 font-sans">{lang === 'hi' ? 'नगीना मूल्य (Stone Charge):' : 'Stone Charges:'}</span>
                    <span>{formatINR(breakdown.stoneCharge)}</span>
                  </div>
                )}

                <div className="flex justify-between pt-1 border-t border-stone-300 text-stone-700">
                  <span className="font-sans">{lang === 'hi' ? 'उप-योग (Subtotal):' : 'Subtotal:'}</span>
                  <span>{formatINR(breakdown.subtotal)}</span>
                </div>

                {includeGst && (
                  <div className="flex justify-between text-stone-700">
                    <span className="font-sans">{lang === 'hi' ? `जीएसटी @ ${breakdown.gstPercent}%:` : `GST @ ${breakdown.gstPercent}%:`}</span>
                    <span>{formatINR(breakdown.gstAmount)}</span>
                  </div>
                )}
              </div>

              {/* Total Box */}
              <div className="mt-3 p-2 bg-[#4A0E17] text-[#FAF7F2] rounded-lg flex justify-between items-center text-sm font-bold">
                <span className="font-sans tracking-wide uppercase">{lang === 'hi' ? 'कुल देय राशि:' : 'Total Amount:'}</span>
                <span className="text-base text-[#E5C158]">{formatINR(breakdown.total)}</span>
              </div>

              {/* Watermark Notice */}
              <p className="mt-2 text-[10px] text-stone-500 font-sans text-center leading-tight">
                {lang === 'hi'
                  ? '* यह पर्ची केवल ग्राहक सुविधा हेतु अनुमानित हिसाब है। वास्तविक वजन व भाव बिलिंग के समय मान्य होगा।'
                  : '* Indicative estimation slip for customer reference. Final billing based on live counter weighing.'}
              </p>

              {/* Action Buttons */}
              <div className="mt-4 space-y-2 no-print">
                <button
                  type="button"
                  onClick={sendNewToWhatsApp}
                  className="w-full py-2.5 px-3 bg-[#128C7E] hover:bg-[#0E7064] text-white font-sans text-xs font-semibold rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>{lang === 'hi' ? 'दुकानदार को यह पर्ची WhatsApp करें' : 'Send Slip to Shop on WhatsApp'}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full py-2 px-3 border border-[#D4AF37]/60 bg-white hover:bg-[#FAF7F2] text-[#4A0E17] font-sans text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4 text-[#B38622]" />
                  <span>{lang === 'hi' ? 'पर्ची प्रिंट / PDF सेव करें' : 'Print / Save as PDF'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OLD GOLD EXCHANGE ESTIMATOR */}
      {activeTab === 'old_exchange' && (
        <div className="mt-6 max-w-2xl mx-auto bg-white border border-[#D4AF37]/40 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-[#D4AF37]/20">
            <ArrowRightLeft className="w-5 h-5 text-[#B38622]" />
            <div>
              <h3 className="font-heading text-lg font-bold text-[#4A0E17]">
                {lang === 'hi' ? 'पुराना सोना बदलकर नया आभूषण लें' : 'Old Gold Exchange Value Estimator'}
              </h3>
              <p className="text-xs text-[#8A671C]">
                {lang === 'hi' ? 'आज के ताज़ा भाव पर बिना किसी अड़चन के तुरंत एक्सचेंज' : 'Instant transparent exchange based on live today rates'}
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#8A671C] uppercase mb-1">
                {lang === 'hi' ? 'पुराने सोने का वजन (Grams)' : 'Gold Weight (Grams)'}
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={oldWeight || ''}
                onChange={(e) => setOldWeight(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#D4AF37]/30 rounded-lg text-sm font-mono font-bold text-[#4A0E17] focus:ring-1 focus:ring-[#B38622] outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8A671C] uppercase mb-1">
                {lang === 'hi' ? 'अनुमानित शुद्धता' : 'Assumed Purity'}
              </label>
              <select
                value={oldPurity}
                onChange={(e) => setOldPurity(e.target.value as GoldPurity)}
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#D4AF37]/30 rounded-lg text-xs font-medium text-[#4A0E17] focus:ring-1 focus:ring-[#B38622] outline-hidden"
              >
                <option value="22K">22K (916 Standard)</option>
                <option value="18K">18K (750 Grade)</option>
                <option value="24K">24K (Pure Gold)</option>
                <option value="14K">14K (585 Grade)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8A671C] uppercase mb-1">
                {lang === 'hi' ? 'रिफाइनिंग/मेल्टिंग कटौती (%)' : 'Refining Deduction (%)'}
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="10"
                value={oldDeduction || ''}
                onChange={(e) => setOldDeduction(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#D4AF37]/30 rounded-lg text-sm font-mono text-[#8A671C] focus:ring-1 focus:ring-[#B38622] outline-hidden"
              />
            </div>
          </div>

          {/* Old Gold Result Calculation Card */}
          <div className="mt-5 p-4 bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-xl space-y-2 text-xs font-mono">
            <div className="flex justify-between text-stone-700">
              <span className="font-sans">{lang === 'hi' ? 'आज का सोना भाव:' : 'Today Gold Rate:'}</span>
              <span className="font-bold text-[#4A0E17]">{formatINR(oldGoldBreakdown.ratePerGram)} / g</span>
            </div>

            <div className="flex justify-between text-stone-700">
              <span className="font-sans">{lang === 'hi' ? 'सकल धातु मूल्य (Gross Value):' : 'Gross Metal Value:'}</span>
              <span>{formatINR(oldGoldBreakdown.pureValue)}</span>
            </div>

            <div className="flex justify-between text-rose-800">
              <span className="font-sans">{lang === 'hi' ? `रिफाइनिंग कटौती (${oldDeduction}%):` : `Refining Deduction (${oldDeduction}%):`}</span>
              <span>-{formatINR(oldGoldBreakdown.deductionAmount)}</span>
            </div>

            <div className="pt-2 border-t border-[#D4AF37]/40 flex justify-between items-center text-sm font-bold text-[#4A0E17]">
              <span className="font-sans">{lang === 'hi' ? 'अनुमानित एक्सचेंज मूल्य:' : 'Estimated Net Value:'}</span>
              <span className="text-lg text-emerald-800 font-mono">{formatINR(oldGoldBreakdown.netPayout)}</span>
            </div>
          </div>

          {/* Warning label */}
          <div className="mt-3 p-2.5 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2 text-amber-900 text-[11px]">
            <ShieldAlert className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
            <p>
              {lang === 'hi'
                ? 'महत्वपूर्ण सूचना: यह केवल अनुमान है (Estimate Only)। वास्तविक शुद्धता व अंतिम मूल्य दुकान पर आपके सामने कसौटी / डिजिटल कैरेटोमीटर जांच व तौल के बाद ही तय होगा।'
                : 'Notice: This is an estimate only. Actual purity and final adjustment will be determined in front of you via digital karatometer and precision scales at the store.'}
            </p>
          </div>

          <div className="mt-4">
            <button
              onClick={sendOldExchangeToWhatsApp}
              className="w-full py-2.5 px-4 bg-[#128C7E] hover:bg-[#0E7064] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>{lang === 'hi' ? 'एक्सचेंज जानकारी WhatsApp पर भेजें' : 'Send Exchange Inquiry on WhatsApp'}</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
