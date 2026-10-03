import React, { useState } from 'react';
import { Language, ShopSettings } from '../types';
import { generateWhatsAppLink } from '../utils/pricing';
import { WhatsAppIcon } from './WhatsAppIcon';
import { BrandLogo } from './BrandLogo';
import { X, Sparkles, Send, ShieldCheck, Clock } from 'lucide-react';

interface FloatingWhatsAppButtonProps {
  settings: ShopSettings;
  lang: Language;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({ settings, lang }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [customMsg, setCustomMsg] = useState<string>('');

  const quickPrompts = [
    {
      id: 'rate',
      textHi: 'आज का 22K/24K सोने का भाव क्या है?',
      textEn: 'What is today rate for 22K and 24K gold?',
    },
    {
      id: 'photo',
      textHi: 'मेरे पास एक आभूषण की फोटो है, क्या आप बना सकते हैं?',
      textEn: 'I have a jewellery photo, can you customize it?',
    },
    {
      id: 'dulhan',
      textHi: 'दुल्हन आभूषण (शादी के गहने) के सेट देखने हैं।',
      textEn: 'I want to see bridal jewellery sets.',
    },
    {
      id: 'visit',
      textHi: 'दुकान पर आने का सही समय और पता बताएं।',
      textEn: 'Please share store timings and location.',
    },
  ];

  const handleSendPrompt = (promptText: string) => {
    const fullMsg = `नमस्ते श्री लक्ष्मी ज्वेलर्स!\n${promptText}`;
    const url = generateWhatsAppLink(settings.whatsappNumber, fullMsg);
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    const fullMsg = `नमस्ते श्री लक्ष्मी ज्वेलर्स!\n${customMsg.trim()}`;
    const url = generateWhatsAppLink(settings.whatsappNumber, fullMsg);
    window.open(url, '_blank');
    setCustomMsg('');
    setIsOpen(false);
  };

  const handleDirectWhatsAppClick = () => {
    // If popup is closed, open popup or directly navigate
    if (!isOpen) {
      setIsOpen(true);
    } else {
      const defaultMsg = lang === 'hi' 
        ? 'नमस्ते श्री लक्ष्मी ज्वेलर्स! मुझे आभूषणों के बारे में जानकारी चाहिए।' 
        : 'Hello Shri Laxmi Jewellers! I would like to inquire about your jewellery.';
      window.open(generateWhatsAppLink(settings.whatsappNumber, defaultMsg), '_blank');
    }
  };

  return (
    <div className="fixed bottom-18 md:bottom-6 right-3 sm:right-6 z-50 flex flex-col items-end">
      {/* Interactive WhatsApp Chat Drawer / Popup */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-24px)] sm:w-80 bg-white border-2 border-[#D4AF37] rounded-2xl shadow-2xl overflow-hidden animate-fadeIn text-xs text-[#2E050C]">
          {/* Header */}
          <div className="bg-[#4A0E17] text-[#FAF7F2] p-3 flex items-center justify-between border-b border-[#D4AF37]/40">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <BrandLogo size="sm" showBorder={true} />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#4A0E17]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#E5C158] leading-tight">
                  {lang === 'hi' ? 'श्री लक्ष्मी ज्वेलर्स' : 'Shri Laxmi Jewellers'}
                </h4>
                <div className="flex items-center gap-1 text-[10px] text-[#FAF7F2]/80">
                  <WhatsAppIcon className="w-3 h-3 text-[#25D366]" />
                  <span>{lang === 'hi' ? 'व्हाट्सएप सहायता · ऑनलाइन' : 'WhatsApp Support · Online'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-[#FAF7F2]/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-3 bg-[#FAF7F2] space-y-2.5">
            {/* Jeweller Greeting message bubble */}
            <div className="bg-white p-2.5 rounded-xl rounded-tl-none border border-[#D4AF37]/30 shadow-2xs max-w-[90%] space-y-1">
              <p className="text-[11px] text-[#2E050C] font-medium leading-relaxed">
                {lang === 'hi'
                  ? 'नमस्कार! 🙏 श्री लक्ष्मी ज्वेलर्स में आपका स्वागत है। आज के लाइव भाव, जेवर की जानकारी या फोटो भेजने के लिए नीचे विकल्प चुनें:'
                  : 'Hello! 🙏 Welcome to Shri Laxmi Jewellers. Tap an option below to inquire about live rates, custom designs, or orders:'}
              </p>
              <span className="text-[9px] text-[#8A671C] block text-right">
                {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {/* Quick Action Suggestion Chips */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold text-[#8A671C] uppercase tracking-wider block">
                {lang === 'hi' ? 'त्वरित संदेश (Quick Chat):' : 'Quick Inquiries:'}
              </span>
              {quickPrompts.map((p) => {
                const text = lang === 'hi' ? p.textHi : p.textEn;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSendPrompt(text)}
                    className="w-full text-left p-2 bg-white hover:bg-[#FAF5EE] border border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-lg text-[11px] font-medium text-[#4A0E17] flex items-center justify-between group transition-colors"
                  >
                    <span className="line-clamp-1">{text}</span>
                    <Send className="w-3 h-3 text-[#128C7E] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Input Box */}
          <form onSubmit={handleSendCustom} className="p-2.5 bg-white border-t border-[#D4AF37]/30 flex items-center gap-2">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder={lang === 'hi' ? 'संदेश लिखें...' : 'Type a message...'}
              className="flex-1 p-2 bg-[#FAF7F2] border border-[#D4AF37]/30 rounded-lg text-xs focus:ring-1 focus:ring-[#128C7E] outline-hidden text-[#2E050C]"
            />
            <button
              type="submit"
              className="p-2 bg-[#128C7E] hover:bg-[#0E7064] text-white rounded-lg shadow-xs transition-colors shrink-0"
              title="Send on WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Trust Footnote */}
          <div className="p-1.5 bg-[#FAF5EE] border-t border-[#D4AF37]/20 text-[10px] text-center text-[#8A671C] flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-700" />
            <span>{lang === 'hi' ? 'सीधे दुकान के मालिक से सुरक्षित चैट' : 'Direct verified chat with jeweller'}</span>
          </div>
        </div>
      )}

      {/* Floating Button with luxury pulse effect */}
      <div className="relative group">
        {/* Pulsing glow ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 blur-xs animate-ping pointer-events-none" />

        {/* Small floating badge */}
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-1.5 absolute -top-8 right-0 bg-[#4A0E17] text-[#E5C158] border border-[#D4AF37] px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-md whitespace-nowrap animate-bounce pointer-events-none">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>{lang === 'hi' ? 'व्हाट्सएप पर पूछें' : 'Chat on WhatsApp'}</span>
          </div>
        )}

        <button
          onClick={handleDirectWhatsAppClick}
          className="relative flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-[#128C7E] to-[#25D366] hover:from-[#0E7064] hover:to-[#1EBE5D] text-white font-bold text-xs sm:text-sm rounded-full shadow-[0_4px_20px_rgba(18,140,126,0.45)] border-2 border-[#D4AF37] transition-all transform active:scale-95 cursor-pointer"
          aria-label="WhatsApp with Shri Laxmi Jewellers"
        >
          <div className="relative">
            <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-300 border-2 border-[#128C7E]" />
          </div>
          <span className="font-heading tracking-wide">
            {lang === 'hi' ? 'व्हाट्सएप चैट' : 'WhatsApp'}
          </span>
        </button>
      </div>
    </div>
  );
};
