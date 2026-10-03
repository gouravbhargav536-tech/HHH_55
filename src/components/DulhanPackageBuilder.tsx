import React, { useState } from 'react';
import { LiveRates, Language, ShopSettings } from '../types';
import { calculateItemPrice, formatINR, formatWeight, generateWhatsAppLink } from '../utils/pricing';
import { MandalaDivider } from './IndianMotifs';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Crown, Check, Sparkles, HeartHandshake } from 'lucide-react';
import royalBrideImg from '../assets/images/royal_rajasthani_bride_1790240060215.jpg';

interface DulhanItemOption {
  id: string;
  nameHi: string;
  nameEn: string;
  category: string;
  metal: 'gold' | 'silver';
  purity: '22K' | '925';
  defaultGrossWeight: number;
  makingPercent: number;
  descriptionHi: string;
  descriptionEn: string;
}

const BRIDAL_PIECES: DulhanItemOption[] = [
  {
    id: 'b-necklace',
    nameHi: 'शाही राजपूती चोकर व नवलखा हार',
    nameEn: 'Royal Rajputi Choker & Long Bridal Necklace',
    category: 'necklace',
    metal: 'gold',
    purity: '22K',
    defaultGrossWeight: 52.0,
    makingPercent: 15,
    descriptionHi: 'कुंदन व मीनाकारी जड़ाऊ भारी चोकर हार',
    descriptionEn: 'Kundan & Meenakari heavy bridal choker necklace',
  },
  {
    id: 'b-earrings',
    nameHi: 'कंवरानी झुमके / चांदबालियां (जोड़ी)',
    nameEn: 'Kanwarani Chandelier Jhumkas (Pair)',
    category: 'earrings',
    metal: 'gold',
    purity: '22K',
    defaultGrossWeight: 18.5,
    makingPercent: 14,
    descriptionHi: 'तीन लड़ी मोतियों के सहारे वाले शाही झुमके',
    descriptionEn: 'Grand hanging jhumkas with pearl ear supports',
  },
  {
    id: 'b-borla',
    nameHi: 'पारंपरिक बोरला व रखड़ी सेट',
    nameEn: 'Traditional Borla & Rakhdi Set',
    category: 'borla',
    metal: 'gold',
    purity: '22K',
    defaultGrossWeight: 14.5,
    makingPercent: 14,
    descriptionHi: 'मोती लटकन और लाल मीनाकारी युक्त',
    descriptionEn: 'Heritage forehead jewel with pearl droplets',
  },
  {
    id: 'b-nath',
    nameHi: 'जोधपुरी कुंदन दुल्हन नथ',
    nameEn: 'Jodhpuri Kundan Bridal Nath',
    category: 'nath',
    metal: 'gold',
    purity: '22K',
    defaultGrossWeight: 8.5,
    makingPercent: 15,
    descriptionHi: 'मोती चैन व रूबी जड़ाऊ बड़ी नथ',
    descriptionEn: 'Triple pearl string with ruby accent large bridal nath',
  },
  {
    id: 'b-bangles',
    nameHi: 'गोखुरू कड़ा व सोने की चूड़ी सेट (4 नग)',
    nameEn: 'Gokhru Kada & Gold Bangle Set (4 pcs)',
    category: 'bangles',
    metal: 'gold',
    purity: '22K',
    defaultGrossWeight: 48.0,
    makingPercent: 12,
    descriptionHi: 'ठोस 22K हॉलमार्क राजपूती कड़े',
    descriptionEn: 'Solid 22K hallmarked traditional kada set',
  },
  {
    id: 'b-ring',
    nameHi: 'हाथफूल व शाही अंगूठी',
    nameEn: 'Haathphool & Royal Ring',
    category: 'ring',
    metal: 'gold',
    purity: '22K',
    defaultGrossWeight: 12.0,
    makingPercent: 14,
    descriptionHi: 'हथेलियों की शोभा बढ़ाने वाला हाथफूल',
    descriptionEn: 'Wrist to finger connected hand ornament',
  },
  {
    id: 'b-payal',
    nameHi: '925 शुद्ध चांदी छैलकड़ी दुल्हन पायल जोड़ी',
    nameEn: 'Pure 925 Silver Chhailkadi Bridal Payal Pair',
    category: 'payal',
    metal: 'silver',
    purity: '925',
    defaultGrossWeight: 190.0,
    makingPercent: 15,
    descriptionHi: 'मीठी खनक वाले घुंघरू और ठोस जालीदार चांदी',
    descriptionEn: 'Heavy handcrafted 925 silver bridal anklets',
  },
];

interface DulhanPackageBuilderProps {
  rates: LiveRates;
  settings: ShopSettings;
  lang: Language;
}

export const DulhanPackageBuilder: React.FC<DulhanPackageBuilderProps> = ({ rates, settings, lang }) => {
  // Selected item IDs
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'b-necklace',
    'b-earrings',
    'b-borla',
    'b-nath',
    'b-bangles',
    'b-payal',
  ]);

  const toggleItem = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Calculate package total
  const selectedItems = BRIDAL_PIECES.filter((item) => selectedIds.includes(item.id));

  let totalGoldWeight = 0;
  let totalSilverWeight = 0;
  let totalEstimatedPrice = 0;

  selectedItems.forEach((item) => {
    const bd = calculateItemPrice(
      item.defaultGrossWeight,
      0,
      item.metal,
      item.purity,
      'percent',
      item.makingPercent,
      0,
      rates,
      settings.gstPercent
    );

    if (item.metal === 'gold') {
      totalGoldWeight += item.defaultGrossWeight;
    } else {
      totalSilverWeight += item.defaultGrossWeight;
    }
    totalEstimatedPrice += bd.total;
  });

  const sendPackageToWhatsApp = () => {
    const itemsText = selectedItems
      .map((item, idx) => {
        const bd = calculateItemPrice(
          item.defaultGrossWeight,
          0,
          item.metal,
          item.purity,
          'percent',
          item.makingPercent,
          0,
          rates,
          settings.gstPercent
        );
        const name = lang === 'hi' ? item.nameHi : item.nameEn;
        return `${idx + 1}. *${name}* (~${formatWeight(item.defaultGrossWeight)}) - ${formatINR(bd.total)}`;
      })
      .join('\n');

    const msg = lang === 'hi'
      ? `नमस्ते श्री लक्ष्मी ज्वेलर्स!\nमैंने वेबसाइट पर *दुल्हन पैकेज (Dulhan Trousseau)* तैयार किया है:\n\n${itemsText}\n\n*कुल सोना वजन:* ~${formatWeight(totalGoldWeight)}\n*कुल चांदी वजन:* ~${formatWeight(totalSilverWeight)}\n*कुल अनुमानित पैकेज मूल्य:* ${formatINR(totalEstimatedPrice)}\n\nकृपया बताएं कि इन डिज़ाइनों के नमूने देखने के लिए दुकान पर कब मिल सकते हैं?`
      : `Hello Shri Laxmi Jewellers!\nI built a custom *Dulhan Bridal Package* on your website:\n\n${itemsText}\n\n*Total Gold Weight:* ~${formatWeight(totalGoldWeight)}\n*Total Silver Weight:* ~${formatWeight(totalSilverWeight)}\n*Total Estimated Package:* ${formatINR(totalEstimatedPrice)}\n\nPlease advise when we can schedule a consultation to view sample pieces.`;

    const url = generateWhatsAppLink(settings.whatsappNumber, msg);
    window.open(url, '_blank');
  };

  return (
    <section id="dulhan-builder" className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-[#2E050C] via-[#4A0E17] to-[#1F0307] rounded-3xl p-6 sm:p-8 text-[#FAF7F2] border border-[#D4AF37]/50 shadow-xl relative overflow-hidden">
        {/* Decorative corner mandala */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#E5C158] uppercase tracking-widest mb-1.5">
            <Crown className="w-4 h-4 text-[#D4AF37]" />
            <span>{lang === 'hi' ? 'शाही दुल्हन आभूषण पैकेज' : 'Royal Dulhan Bridal Trousseau'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#FFFDF8]">
            {lang === 'hi' ? 'दुल्हन पैकेज बिल्डर (Dulhan Package Builder)' : 'Custom Bridal Package Builder'}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#F3ECE0]/80">
            {lang === 'hi'
              ? 'अपनी पसंद के गहने चुनें, लाइव संयुक्त वजन व बजट देखें और पूरी दुल्हन सूची सीधे WhatsApp पर भेजें।'
              : 'Select your preferred bridal pieces, see combined live estimates, and send your wishlist to the jeweller.'}
          </p>
          <MandalaDivider className="my-3 text-[#D4AF37]" />
        </div>

        {/* Luxury Bridal Showcase Feature Card */}
        <div className="mt-5 bg-[#1C0307]/80 border border-[#D4AF37]/40 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center gap-5">
          <div className="w-full md:w-44 h-48 md:h-36 rounded-xl overflow-hidden border border-[#D4AF37]/50 shrink-0 shadow-md relative">
            <img
              src={royalBrideImg}
              alt="Royal Rajasthani Bride Jewellery"
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-1.5 text-center">
              <span className="text-[10px] text-[#E5C158] font-semibold tracking-wider uppercase">
                {lang === 'hi' ? 'राजपूती दुल्हन श्रृंगार' : 'Heritage Bridal Trousseau'}
              </span>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#E5C158] font-bold">
              <HeartHandshake className="w-4 h-4 text-[#D4AF37]" />
              <span>{lang === 'hi' ? 'पीढ़ियों का विश्वास · १००% हॉलमार्क २२ कैरेट' : 'Generations of Trust · 100% 22K Hallmark'}</span>
            </div>
            <h3 className="font-heading text-base sm:text-lg font-bold text-white">
              {lang === 'hi' ? 'विवाह हेतु सम्पूर्ण आभूषण सेट का संयुक्त पारदर्शी हिसाब' : 'Complete Wedding Jewellery Suite with Itemized Pricing'}
            </h3>
            <p className="text-xs text-[#F3ECE0]/80 leading-relaxed">
              {lang === 'hi'
                ? 'चोकर, बोरला, नथ, झुमके, कड़े व चांदी पायल का चयन करें। आज के सोने के भाव अनुसार कुल बजट देखें और सीधे दुकान के कारीगर को व्हाट्सएप भेजें।'
                : 'Select pieces to instantly preview total combined weight, metal value, making charges, and WhatsApp the list to our master craftsman.'}
            </p>
          </div>
        </div>

        {/* Pieces Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-6">
          {BRIDAL_PIECES.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            const itemPrice = calculateItemPrice(
              item.defaultGrossWeight,
              0,
              item.metal,
              item.purity,
              'percent',
              item.makingPercent,
              0,
              rates,
              settings.gstPercent
            ).total;

            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#FAF7F2]/10 border-[#D4AF37] shadow-md ring-1 ring-[#D4AF37]'
                    : 'bg-[#1C0307]/50 border-white/10 hover:border-white/20 opacity-70'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-mono text-[#E5C158] font-semibold">
                      {item.metal === 'gold' ? '22K Gold' : '925 Silver'} · ~{formatWeight(item.defaultGrossWeight)}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? 'bg-[#D4AF37] text-[#2E050C]' : 'border border-white/30 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>

                  <h3 className="font-heading text-sm font-bold text-[#FFFDF8] mt-1.5 leading-snug">
                    {lang === 'hi' ? item.nameHi : item.nameEn}
                  </h3>
                  <p className="text-[11px] text-[#F3ECE0]/70 mt-1 line-clamp-1">
                    {lang === 'hi' ? item.descriptionHi : item.descriptionEn}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-white/10 flex items-baseline justify-between">
                  <span className="text-[10px] text-[#E5C158]/70">{lang === 'hi' ? 'अनुमानित:' : 'Estimate:'}</span>
                  <span className="text-sm font-mono font-bold text-[#E5C158]">{formatINR(itemPrice)}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Combined Summary & Action Bar */}
        <div className="mt-8 p-4 sm:p-5 bg-[#1C0307]/90 border border-[#D4AF37]/50 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-center md:text-left">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#E5C158]/80 font-semibold">
                {lang === 'hi' ? 'चुने गए गहने' : 'Selected Pieces'}
              </div>
              <div className="text-lg font-bold text-white font-mono">
                {selectedItems.length} {lang === 'hi' ? 'आइटम' : 'Items'}
              </div>
            </div>

            <div className="h-8 w-[1px] bg-white/10 hidden md:block" />

            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#E5C158]/80 font-semibold">
                {lang === 'hi' ? 'सोना / चांदी वजन' : 'Gold / Silver Wt.'}
              </div>
              <div className="text-sm font-mono text-[#F3ECE0]">
                {totalGoldWeight > 0 && <span>Gold: {formatWeight(totalGoldWeight)}</span>}
                {totalSilverWeight > 0 && <span className="ml-2">Silver: {formatWeight(totalSilverWeight)}</span>}
              </div>
            </div>

            <div className="h-8 w-[1px] bg-white/10 hidden md:block" />

            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#E5C158] font-bold">
                {lang === 'hi' ? 'संपूर्ण पैकेज कुल अनुमान' : 'Total Package Estimate'}
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#E5C158]">
                {formatINR(totalEstimatedPrice)}
              </div>
            </div>
          </div>

          <button
            onClick={sendPackageToWhatsApp}
            disabled={selectedItems.length === 0}
            className="w-full md:w-auto px-6 py-3 bg-[#128C7E] hover:bg-[#0E7064] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98 cursor-pointer disabled:opacity-50"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>{lang === 'hi' ? 'यह दुल्हन सूची दुकान को WhatsApp करें' : 'Send Bridal Trousseau to WhatsApp'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
