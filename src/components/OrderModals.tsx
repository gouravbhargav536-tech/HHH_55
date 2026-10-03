import React, { useState } from 'react';
import { Language, ShopSettings } from '../types';
import { generateWhatsAppLink, formatINR } from '../utils/pricing';
import { BrandLogo } from './BrandLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { X, Video, Sparkles, Upload, ShieldCheck } from 'lucide-react';

interface CustomOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ShopSettings;
  lang: Language;
}

export const CustomOrderModal: React.FC<CustomOrderModalProps> = ({ isOpen, onClose, settings, lang }) => {
  const [jewelleryType, setJewelleryType] = useState<string>('दुल्हन सेट / चोकर (Bridal Choker)');
  const [budget, setBudget] = useState<string>('150000');
  const [targetDate, setTargetDate] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = lang === 'hi'
      ? `नमस्ते श्री लक्ष्मी ज्वेलर्स!\nमैं अपनी पसंद का *कस्टम आभूषण (मनपसंद जेवर)* बनवाना चाहता हूँ:\n\n*आभूषण का प्रकार:* ${jewelleryType}\n*अनुमानित बजट:* ${formatINR(parseFloat(budget) || 0)}\n*डिलीवरी/शादी की तारीख:* ${targetDate || 'शीघ्र'}\n*विशेष विवरण/मांग:* ${notes || 'डिज़ाइन फोटो व्हाट्सएप पर भेज रहा हूँ'}\n\nकृपया बताएं कि इसके निर्माण में कितना समय और मेकिंग चार्ज लगेगा?`
      : `Hello Shri Laxmi Jewellers!\nI would like to place a *custom jewellery order*:\n\n*Item Type:* ${jewelleryType}\n*Budget:* ${formatINR(parseFloat(budget) || 0)}\n*Required By:* ${targetDate || 'Soon'}\n*Notes:* ${notes || 'Sharing reference design photo'}\n\nPlease let me know estimated time and making details.`;

    const url = generateWhatsAppLink(settings.whatsappNumber, text);
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-2 border-[#D4AF37] rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center pb-3 border-b border-[#D4AF37]/20 flex flex-col items-center">
          <BrandLogo size="md" showBorder={true} className="mb-2" />
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A671C] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#B38622]" />
            <span>{lang === 'hi' ? 'मनपसंद कारीगरी' : 'Custom Craftsmanship'}</span>
          </div>
          <h3 className="font-heading text-xl font-bold text-[#4A0E17]">
            {lang === 'hi' ? 'कस्टम डिज़ाइन ऑर्डर फॉर्म' : 'Custom Jewellery Order'}
          </h3>
          <p className="text-xs text-[#5C450C] mt-1">
            {lang === 'hi' ? 'अपनी मनपसंद फोटो या स्केच अनुसार शुद्ध हॉलमार्क जेवर तैयार करवाएं' : 'Order personalized hallmark jewellery made to your exact reference'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs text-[#2E050C]">
          <div>
            <label className="block font-semibold text-[#8A671C] uppercase mb-1">
              {lang === 'hi' ? 'आभूषण का प्रकार (Jewellery Type)' : 'Jewellery Type'}
            </label>
            <input
              type="text"
              required
              value={jewelleryType}
              onChange={(e) => setJewelleryType(e.target.value)}
              placeholder={lang === 'hi' ? 'उदा. राजपूती बोरला, कुंदन चोकर, कड़े...' : 'e.g. Rajputi Borla, Choker, Kada...'}
              className="w-full p-2.5 bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-lg text-xs focus:ring-1 focus:ring-[#B38622] outline-hidden font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#8A671C] uppercase mb-1">
                {lang === 'hi' ? 'अनुमानित बजट (₹)' : 'Approx Budget (₹)'}
              </label>
              <input
                type="number"
                step="5000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-lg font-mono font-bold text-xs focus:ring-1 focus:ring-[#B38622] outline-hidden text-[#4A0E17]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#8A671C] uppercase mb-1">
                {lang === 'hi' ? 'तैयार होने की तारीख' : 'Target Date / Wedding'}
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-lg text-xs focus:ring-1 focus:ring-[#B38622] outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#8A671C] uppercase mb-1">
              {lang === 'hi' ? 'विशेष निर्देश / विवरण' : 'Specific Notes / Weight Range'}
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={lang === 'hi' ? 'जैसे: 22K 916 हॉलमार्क, लाल मीनाकारी, 20 ग्राम के अंदर...' : 'e.g. 22K 916 purity, red meenakari, within 20 grams...'}
              className="w-full p-2.5 bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-lg text-xs focus:ring-1 focus:ring-[#B38622] outline-hidden"
            />
          </div>

          <p className="text-[11px] text-stone-500 italic">
            {lang === 'hi'
              ? '💡 नोट: फॉर्म सबमिट करने पर सीधे WhatsApp खुलेगा, जहाँ आप अपने डिज़ाइन की फोटो भी अटैच कर सकते हैं।'
              : '💡 Note: Submitting will open WhatsApp where you can attach your reference design photo.'}
          </p>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#128C7E] hover:bg-[#0E7064] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>{lang === 'hi' ? 'WhatsApp पर आर्डर भेजें व फोटो शेयर करें' : 'Send Custom Request on WhatsApp'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ShopSettings;
  lang: Language;
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({ isOpen, onClose, settings, lang }) => {
  const [preferredTime, setPreferredTime] = useState<string>('आज दोपहर 4 से 6 बजे के बीच');
  const [categoryInterest, setCategoryInterest] = useState<string>('दुल्हन सेट व बोरला (Bridal Set)');

  if (!isOpen) return null;

  const handleRequestVideoCall = () => {
    const text = lang === 'hi'
      ? `नमस्ते श्री लक्ष्मी ज्वेलर्स!\nमैं ज्वेलरी लाइव देखने के लिए *वीडियो कॉल (WhatsApp Video Call)* का अनुरोध करना चाहता हूँ:\n\n*देखने हेतु आभूषण:* ${categoryInterest}\n*सुविधाजनक समय:* ${preferredTime}\n\nकृपया बताएं कि क्या इस समय वीडियो कॉल उपलब्ध है?`
      : `Hello Shri Laxmi Jewellers!\nI would like to request a *live WhatsApp Video Call* to view jewellery designs:\n\n*Pieces to view:* ${categoryInterest}\n*Preferred Timing:* ${preferredTime}\n\nPlease confirm availability.`;

    const url = generateWhatsAppLink(settings.whatsappNumber, text);
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-2 border-[#D4AF37] rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center pb-3 border-b border-[#D4AF37]/20 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <BrandLogo size="sm" showBorder={true} />
            <div className="w-9 h-9 rounded-full bg-[#4A0E17] text-[#E5C158] flex items-center justify-center shadow-xs">
              <Video className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-heading text-lg font-bold text-[#4A0E17]">
            {lang === 'hi' ? 'ज्वेलरी देखने के लिए वीडियो कॉल' : 'Book a Live Video Consultation'}
          </h3>
          <p className="text-xs text-[#5C450C] mt-1">
            {lang === 'hi' ? 'घर बैठे दुकान के आभूषण लाइव देखें, वजन व हॉलमार्क जांचें' : 'Preview authentic hallmarked jewellery live from the comfort of your home'}
          </p>
        </div>

        <div className="mt-4 space-y-3.5 text-xs text-[#2E050C]">
          <div>
            <label className="block font-semibold text-[#8A671C] uppercase mb-1">
              {lang === 'hi' ? 'कौन से आभूषण देखना चाहते हैं?' : 'Items you wish to see'}
            </label>
            <input
              type="text"
              value={categoryInterest}
              onChange={(e) => setCategoryInterest(e.target.value)}
              className="w-full p-2.5 bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-lg text-xs focus:ring-1 focus:ring-[#B38622] outline-hidden font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#8A671C] uppercase mb-1">
              {lang === 'hi' ? 'कॉल के लिए उपयुक्त समय' : 'Preferred Time'}
            </label>
            <input
              type="text"
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              placeholder="उदा. आज शाम 5 बजे"
              className="w-full p-2.5 bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-lg text-xs focus:ring-1 focus:ring-[#B38622] outline-hidden"
            />
          </div>

          <div className="p-3 bg-[#FAF5EE] rounded-xl text-[11px] text-[#5C450C] space-y-1 border border-[#D4AF37]/30">
            <div className="font-semibold text-[#4A0E17]">
              {lang === 'hi' ? 'वीडियो कॉल पर आपको दिखाया जाएगा:' : 'On video call you will see:'}
            </div>
            <div>✓ {lang === 'hi' ? 'डिजिटल कांटे पर लाइव तौल' : 'Live precision weighing on scale'}</div>
            <div>✓ {lang === 'hi' ? 'हॉलमार्क 6-डिजिट HUID कोड' : 'Hallmark 6-digit HUID stamp'}</div>
            <div>✓ {lang === 'hi' ? 'बारीक मीनाकारी व नक्काशी' : 'High detail craftsmanship'}</div>
          </div>

          <button
            onClick={handleRequestVideoCall}
            className="w-full py-3 px-4 bg-[#128C7E] hover:bg-[#0E7064] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>{lang === 'hi' ? 'वीडियो कॉल का समय WhatsApp पर तय करें' : 'Confirm Video Call on WhatsApp'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
