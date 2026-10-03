import React, { useState } from 'react';
import { LiveRates, Language, ShopSettings } from '../types';
import { calculateItemPrice, formatINR, formatWeight, generateWhatsAppLink } from '../utils/pricing';
import { MandalaDivider } from './IndianMotifs';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Sparkles, Eye, Video, ShieldCheck, CheckCircle2, ChevronRight, Gem, Info } from 'lucide-react';
import royalBrideImg from '../assets/images/royal_rajasthani_bride_1790240060215.jpg';
import templeModelImg from '../assets/images/indian_jewellery_model_showcase_1790932251602.jpg';

interface JewelleryModelShowcaseProps {
  rates: LiveRates;
  settings: ShopSettings;
  lang: Language;
  onOpenVideoCall: () => void;
  onOpenCustomOrder: () => void;
}

interface ModelPiece {
  id: string;
  nameHi: string;
  nameEn: string;
  weightGrams: number;
  purity: '22K' | '18K';
  makingPercent: number;
  stoneCharge: number;
  descriptionHi: string;
  descriptionEn: string;
}

interface ModelLook {
  id: string;
  titleHi: string;
  titleEn: string;
  subtitleHi: string;
  subtitleEn: string;
  image: string;
  tagHi: string;
  tagEn: string;
  descriptionHi: string;
  descriptionEn: string;
  pieces: ModelPiece[];
}

export const JewelleryModelShowcase: React.FC<JewelleryModelShowcaseProps> = ({
  rates,
  settings,
  lang,
  onOpenVideoCall,
  onOpenCustomOrder,
}) => {
  const modelLooks: ModelLook[] = [
    {
      id: 'rajputi-dulhan',
      titleHi: 'शाही राजपूती दुल्हन मॉडल लुक',
      titleEn: 'Royal Rajputi Dulhan Model Look',
      subtitleHi: 'पारंपरिक कुंदन मीनाकारी, बोरला, नथ व कण्ठी हार',
      subtitleEn: 'Handcrafted Kundan Meenakari, Borla, Nath & Bridal Choker',
      image: royalBrideImg,
      tagHi: 'सर्वाधिक लोकप्रिय दुल्हन पसंद',
      tagEn: 'Most Popular Bridal Choice',
      descriptionHi: 'शेखावाटी व राजपूताना परंपरा का सर्वोत्तम उदाहरण। 22K 916 बीआईएस हॉलमार्क सोने में लाल व हरे मीनाकारी के साथ कुंदन जड़ाई।',
      descriptionEn: 'The pinnacle of Rajasthani bridal opulence. Crafted in 22K BIS Hallmarked gold with authentic red-green meenakari and royal polki stones.',
      pieces: [
        {
          id: 'choker',
          nameHi: 'जड़ाऊ कुंदन चोकर हार (Choker)',
          nameEn: 'Handcrafted Kundan Bridal Choker',
          weightGrams: 42.5,
          purity: '22K',
          makingPercent: 14,
          stoneCharge: 3500,
          descriptionHi: 'गले पर सटीक बैठने वाला भव्य जड़ाऊ चोकर हार',
          descriptionEn: 'Grand choker sitting elegantly around the collarbone',
        },
        {
          id: 'borla',
          nameHi: 'राजपूती बोरला / शीशफूल (Borla)',
          nameEn: 'Traditional Rajputi Borla & Mathapatti',
          weightGrams: 14.8,
          purity: '22K',
          makingPercent: 12,
          stoneCharge: 1200,
          descriptionHi: 'गोल कुंदन बोरला सिर के मध्य भाग हेतु',
          descriptionEn: 'Spherical kundan borla worn at the center hairline',
        },
        {
          id: 'nath',
          nameHi: 'कुंदन मोती नथ (Bridal Nath)',
          nameEn: 'Royal Pearl & Kundan Bridal Nath',
          weightGrams: 7.2,
          purity: '22K',
          makingPercent: 12,
          stoneCharge: 800,
          descriptionHi: 'बारीक लटकन व मोती की लड़ी युक्त पारंपरिक नथ',
          descriptionEn: 'Delicate floral filigree with authentic Basra pearl strand',
        },
        {
          id: 'jhumka',
          nameHi: 'चांदबाली झुमके (Chandbali Earrings)',
          nameEn: 'Royal Chandbali Jhumkas',
          weightGrams: 18.5,
          purity: '22K',
          makingPercent: 12,
          stoneCharge: 1500,
          descriptionHi: 'तीन-स्तरीय लटकन युक्त मीनाकारी झुमके',
          descriptionEn: 'Triple-tier jhumkas with emerald and ruby accents',
        },
      ],
    },
    {
      id: 'temple-heritage',
      titleHi: 'पारंपरिक मंदिर व कासू माला लुक',
      titleEn: 'Heritage Temple & Mango Mala Look',
      subtitleHi: 'माँ लक्ष्मी आकृति, नक्काशीदार कासू माला व भारी कड़े',
      subtitleEn: 'Embossed Lakshmi Motifs, Antique Kasu Mala & Temple Jhumkas',
      image: templeModelImg,
      tagHi: 'शुभ मांगलिक व अखंड सौभाग्य',
      tagEn: 'Sacred & Auspicious Heritage',
      descriptionHi: 'शुद्ध 22K सोने पर प्राचीन हस्तशिल्प नक्काशी। धन-वैभव की देवी माँ लक्ष्मी की आकृति व बारीक दानेदार कारीगरी।',
      descriptionEn: 'Intricately handcrafted in 22K hallmark gold featuring auspicious Goddess Lakshmi motifs, antique matte finish, and granulations.',
      pieces: [
        {
          id: 'temple-necklace',
          nameHi: 'लक्ष्मी मंदिर कासू माला (Temple Mala)',
          nameEn: 'Grand Lakshmi Temple Long Necklace',
          weightGrams: 48.0,
          purity: '22K',
          makingPercent: 13,
          stoneCharge: 2000,
          descriptionHi: 'देवी लक्ष्मी के मुहर व आम्र-पल्लव (मैंगो) नक्काशी युक्त हार',
          descriptionEn: 'Embossed temple coin necklace with sacred floral crests',
        },
        {
          id: 'temple-jhumka',
          nameHi: 'नक्काशीदार मंदिर झुमके (Temple Jhumka)',
          nameEn: 'Antique Carved Temple Jhumkas',
          weightGrams: 16.5,
          purity: '22K',
          makingPercent: 12,
          stoneCharge: 1000,
          descriptionHi: 'मयूर (मोर) व पुष्प नक्काशीदार पारंपरिक झुमके',
          descriptionEn: 'Peacock crest with solid gold chime bells',
        },
        {
          id: 'temple-kada',
          nameHi: 'शाही पचेली कड़ा (Antique Bangle)',
          nameEn: 'Royal Embossed Kada Pair (2 Pcs)',
          weightGrams: 32.0,
          purity: '22K',
          makingPercent: 11,
          stoneCharge: 800,
          descriptionHi: 'मजबूत पेचदार डिज़ाइन, जीवनभर की शुद्धता',
          descriptionEn: 'Screw-lock antique bridal kadas with ruby centerpieces',
        },
      ],
    },
  ];

  const [activeLookId, setActiveLookId] = useState<string>('rajputi-dulhan');
  const [selectedPieceId, setSelectedPieceId] = useState<string>('choker');

  const currentLook = modelLooks.find((l) => l.id === activeLookId) || modelLooks[0];
  const activePiece =
    currentLook.pieces.find((p) => p.id === selectedPieceId) || currentLook.pieces[0];

  // Calculate live price for each piece and for entire look
  let totalLookWeight = 0;
  let totalLookPrice = 0;

  const piecesWithPrice = currentLook.pieces.map((piece) => {
    const bd = calculateItemPrice(
      piece.weightGrams,
      0,
      'gold',
      piece.purity,
      'percent',
      piece.makingPercent,
      piece.stoneCharge,
      rates,
      settings.gstPercent
    );
    totalLookWeight += piece.weightGrams;
    totalLookPrice += bd.total;
    return {
      ...piece,
      priceBreakdown: bd,
    };
  });

  const activePieceData =
    piecesWithPrice.find((p) => p.id === activePiece.id) || piecesWithPrice[0];

  const handleInquireLookOnWhatsApp = () => {
    const piecesSummary = piecesWithPrice
      .map(
        (p, i) =>
          `${i + 1}. *${lang === 'hi' ? p.nameHi : p.nameEn}* (~${formatWeight(
            p.weightGrams
          )}) - ${formatINR(p.priceBreakdown.total)}`
      )
      .join('\n');

    const msg =
      lang === 'hi'
        ? `नमस्ते श्री लक्ष्मी ज्वेलर्स!\nमैंने वेबसाइट पर *${currentLook.titleHi}* (मॉडल डिज़ाइन) देखा है:\n\n${piecesSummary}\n\n*कुल सेट वजन:* ~${formatWeight(
            totalLookWeight
          )}\n*आज के भाव अनुसार कुल सेट मूल्य:* ${formatINR(
            totalLookPrice
          )}\n\nकृपया बताएं कि क्या यह डिज़ाइन दुकान पर तैयार उपलब्ध है या इसे लाइव वीडियो कॉल पर देखा जा सकता है?`
        : `Hello Shri Laxmi Jewellers!\nI viewed the *${currentLook.titleEn}* (Model Showcase) on your site:\n\n${piecesSummary}\n\n*Total Look Weight:* ~${formatWeight(
            totalLookWeight
          )}\n*Live Total Estimate:* ${formatINR(
            totalLookPrice
          )}\n\nPlease advise if this model design can be previewed or customized for my wedding date.`;

    const url = generateWhatsAppLink(settings.whatsappNumber, msg);
    window.open(url, '_blank');
  };

  const handleInquireSinglePiece = (piece: typeof activePieceData) => {
    const name = lang === 'hi' ? piece.nameHi : piece.nameEn;
    const msg =
      lang === 'hi'
        ? `नमस्ते श्री लक्ष्मी ज्वेलर्स!\nमैंने मॉडल डिज़ाइन में *${name}* देखा:\n\n*वजन:* ~${formatWeight(
            piece.weightGrams
          )}\n*शुद्धता:* ${piece.purity} (916 हॉलमार्क)\n*आज का अनुमानित भाव:* ${formatINR(
            piece.priceBreakdown.total
          )}\n\nकृपया इस डिज़ाइन की अतिरिक्त फोटो और मेकिंग चार्ज की जानकारी भेजें।`
        : `Hello Shri Laxmi Jewellers!\nI am interested in *${name}* from your Model Showcase:\n\n*Weight:* ~${formatWeight(
            piece.weightGrams
          )}\n*Purity:* ${piece.purity}\n*Today's Est. Price:* ${formatINR(
            piece.priceBreakdown.total
          )}\n\nPlease share more photos and booking details on WhatsApp.`;

    const url = generateWhatsAppLink(settings.whatsappNumber, msg);
    window.open(url, '_blank');
  };

  return (
    <section id="model-designs" className="max-w-7xl mx-auto px-4 py-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#D4AF37]/50 text-xs font-bold text-[#8A671C] uppercase tracking-widest mb-2 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{lang === 'hi' ? 'शाही मॉडल डिज़ाइन व लुकबुक' : 'Bridal Model Designs & Lookbook'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-[#4A0E17] tracking-tight">
          {lang === 'hi'
            ? 'पहनकर देखें: दुल्हन व पारंपरिक मॉडल आभूषण'
            : 'Worn to Perfection: Bridal & Heritage Model Showcase'}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#5C450C] max-w-xl mx-auto leading-relaxed">
          {lang === 'hi'
            ? 'देखें कैसे हमारे आभूषण भारतीय दुल्हन पर फबते हैं। वास्तविक वजन, २२ कैरेट शुद्धता और आज के लाइव भाव के साथ पारदर्शी गणना।'
            : 'Experience how our handcrafted jewellery adorns an Indian bride. Real weights, 22K hallmarking, and live pricing linked to today’s bullion rates.'}
        </p>
        <MandalaDivider className="my-4 text-[#D4AF37]" />

        {/* Look Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {modelLooks.map((look) => {
            const isActive = look.id === activeLookId;
            return (
              <button
                key={look.id}
                onClick={() => {
                  setActiveLookId(look.id);
                  setSelectedPieceId(look.pieces[0].id);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-xs ${
                  isActive
                    ? 'bg-[#4A0E17] text-[#FAF7F2] ring-2 ring-[#D4AF37] ring-offset-2'
                    : 'bg-white text-[#4A0E17] border border-[#D4AF37]/50 hover:bg-[#FAF5EE]'
                }`}
              >
                <Gem className={`w-3.5 h-3.5 ${isActive ? 'text-[#E5C158]' : 'text-[#8A671C]'}`} />
                <span>{lang === 'hi' ? look.titleHi : look.titleEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Model Showcase Card */}
      <div className="bg-gradient-to-br from-[#FFFDF9] via-white to-[#FAF5EE] border-2 border-[#D4AF37]/60 rounded-3xl p-5 sm:p-8 shadow-xl overflow-hidden relative">
        {/* Subtle Watermark Motifs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Model Photography Card */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-lg group">
              <img
                src={currentLook.image}
                alt={lang === 'hi' ? currentLook.titleHi : currentLook.titleEn}
                className="w-full h-[400px] sm:h-[500px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Top Tag */}
              <div className="absolute top-3 left-3 bg-[#4A0E17]/90 text-[#E5C158] border border-[#D4AF37] px-3 py-1 rounded-full text-[11px] font-bold shadow-md flex items-center gap-1.5 backdrop-blur-xs">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>{lang === 'hi' ? currentLook.tagHi : currentLook.tagEn}</span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-[11px] text-[#E5C158] font-bold uppercase tracking-wider">
                  {lang === 'hi' ? currentLook.subtitleHi : currentLook.subtitleEn}
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mt-0.5">
                  {lang === 'hi' ? currentLook.titleHi : currentLook.titleEn}
                </h3>
                <p className="text-xs text-stone-200 mt-1 line-clamp-2">
                  {lang === 'hi' ? currentLook.descriptionHi : currentLook.descriptionEn}
                </p>
              </div>
            </div>

            {/* Quick Consultation CTAs under Model Photo */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onOpenVideoCall}
                className="py-2.5 px-3 bg-white border border-[#D4AF37]/60 hover:bg-[#FAF5EE] text-[#4A0E17] text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Video className="w-4 h-4 text-[#B38622]" />
                <span>{lang === 'hi' ? 'वीडियो कॉल पर देखें' : 'View on Video Call'}</span>
              </button>

              <button
                onClick={onOpenCustomOrder}
                className="py-2.5 px-3 bg-[#FAF5EE] border border-[#D4AF37]/60 hover:bg-[#F3ECE0] text-[#4A0E17] text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#B38622]" />
                <span>{lang === 'hi' ? 'नाप व मनपसंद बनवाएं' : 'Custom Tailor Design'}</span>
              </button>
            </div>
          </div>

          {/* Right: Piece-by-Piece Explorer & Live Price Calculation */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-5">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/30">
                <div>
                  <span className="text-[11px] uppercase font-bold text-[#8A671C] tracking-wider block">
                    {lang === 'hi' ? 'मॉडल द्वारा पहने गए आभूषण' : 'Pieces Featured on Model'}
                  </span>
                  <h4 className="font-heading font-bold text-lg text-[#4A0E17]">
                    {lang === 'hi' ? 'प्रत्येक आभूषण का लाइव हिसाब' : 'Itemized Live Weight & Valuation'}
                  </h4>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>22K 916 Hallmark</span>
                </span>
              </div>

              {/* Pieces Selector List */}
              <div className="mt-4 space-y-2.5">
                {piecesWithPrice.map((piece) => {
                  const isSelected = piece.id === activePieceData.id;
                  return (
                    <div
                      key={piece.id}
                      onClick={() => setSelectedPieceId(piece.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#4A0E17] text-[#FAF7F2] border-[#D4AF37] shadow-md ring-1 ring-[#D4AF37]'
                          : 'bg-white hover:bg-[#FAF5EE] border-[#D4AF37]/30 text-[#2E050C]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                              isSelected
                                ? 'bg-[#D4AF37] text-[#4A0E17]'
                                : 'bg-[#FAF5EE] text-[#8A671C] border border-[#D4AF37]/40'
                            }`}
                          >
                            <Gem className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-heading font-bold text-xs sm:text-sm">
                              {lang === 'hi' ? piece.nameHi : piece.nameEn}
                            </div>
                            <div
                              className={`text-[10px] ${
                                isSelected ? 'text-[#E5C158]' : 'text-[#8A671C]'
                              }`}
                            >
                              ~{formatWeight(piece.weightGrams)} · {piece.purity} (916)
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div
                            className={`font-mono font-bold text-xs sm:text-sm ${
                              isSelected ? 'text-[#E5C158]' : 'text-[#4A0E17]'
                            }`}
                          >
                            {formatINR(piece.priceBreakdown.total)}
                          </div>
                          <span
                            className={`text-[9px] block ${
                              isSelected ? 'text-stone-300' : 'text-stone-500'
                            }`}
                          >
                            {lang === 'hi' ? 'जीएसटी सहित' : 'incl. GST'}
                          </span>
                        </div>
                      </div>

                      {/* Expanded View for Selected Piece */}
                      {isSelected && (
                        <div className="mt-3 pt-3 border-t border-white/20 text-xs space-y-2">
                          <p className="text-[11px] text-[#FAF7F2]/90 leading-relaxed font-sans">
                            {lang === 'hi' ? piece.descriptionHi : piece.descriptionEn}
                          </p>

                          <div className="grid grid-cols-2 gap-2 bg-black/25 p-2 rounded-lg font-mono text-[11px] text-white/90">
                            <div>
                              <span className="text-white/60 block text-[9px] font-sans">
                                {lang === 'hi' ? 'सोना मूल्य:' : 'Gold Value:'}
                              </span>
                              <span>{formatINR(piece.priceBreakdown.metalValue)}</span>
                            </div>
                            <div>
                              <span className="text-white/60 block text-[9px] font-sans">
                                {lang === 'hi' ? 'घड़ाई (Making):' : 'Making Charge:'}
                              </span>
                              <span>{formatINR(piece.priceBreakdown.makingCharge)}</span>
                            </div>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleInquireSinglePiece(piece);
                            }}
                            className="mt-2 w-full py-2 px-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                          >
                            <WhatsAppIcon className="w-4 h-4 text-white" />
                            <span>
                              {lang === 'hi'
                                ? `यह आभूषण WhatsApp पर पूछें (${formatINR(piece.priceBreakdown.total)})`
                                : `Inquire This Piece on WhatsApp`}
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Combined Model Look Total & Primary WhatsApp Booking Button */}
            <div className="pt-4 border-t-2 border-[#D4AF37]/40 bg-gradient-to-r from-[#FAF5EE] to-[#FFFDF9] p-4 rounded-2xl border border-[#D4AF37]/50 shadow-xs">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-3">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#8A671C] font-bold">
                    {lang === 'hi' ? 'संपूर्ण मॉडल लुक कुल वजन व मूल्य' : 'Complete Model Ensemble Price'}
                  </div>
                  <div className="text-xs text-[#5C450C]">
                    {lang === 'hi'
                      ? `कुल वजन: ~${formatWeight(totalLookWeight)} शुद्ध २२ कैरेट सोना`
                      : `Total Weight: ~${formatWeight(totalLookWeight)} Pure 22K Gold`}
                  </div>
                </div>

                <div className="text-center sm:text-right">
                  <div className="text-2xl sm:text-3xl font-heading font-extrabold text-[#4A0E17] font-mono">
                    {formatINR(totalLookPrice)}
                  </div>
                  <span className="text-[10px] text-emerald-800 font-semibold flex items-center justify-center sm:justify-end gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{lang === 'hi' ? 'आज का लाइव भाव लागू' : 'Live Bullion Rates Applied'}</span>
                  </span>
                </div>
              </div>

              {/* The Real WhatsApp CTA Button */}
              <button
                onClick={handleInquireLookOnWhatsApp}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#128C7E] via-[#25D366] to-[#128C7E] hover:from-[#0E7064] hover:via-[#1EBE5D] hover:to-[#0E7064] text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2.5 transition-all transform active:scale-98 cursor-pointer border border-white/30"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>
                  {lang === 'hi'
                    ? 'पूरा मॉडल सेट WhatsApp पर बुक / आर्डर करें'
                    : 'Order / Inquire Full Model Ensemble on WhatsApp'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
