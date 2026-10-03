import React, { useState } from 'react';
import { ShopSettings, Language, FestivalBanner } from '../types';
import { X, Save, ShieldAlert, Sliders, Store, Percent } from 'lucide-react';

/**
 * ARCHITECTURAL NOTICE:
 * In Version 1 (frontend prototype), these settings are persisted in the browser's localStorage.
 * Any user who opens /admin in this browser session can modify rates and contact numbers.
 * In a production architecture with a backend, restrict this panel behind authenticated
 * server-side admin sessions (JWT / Firebase Auth / Session cookie) and store the settings in a
 * database like PostgreSQL or Firestore.
 */

interface AdminSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ShopSettings;
  onSave: (newSettings: ShopSettings) => void;
  banners: FestivalBanner[];
  lang: Language;
}

export const AdminSettingsModal: React.FC<AdminSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
  banners,
  lang,
}) => {
  const [formData, setFormData] = useState<ShopSettings>({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof ShopSettings, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-2 border-[#D4AF37] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative text-xs text-[#2E050C]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="pb-3 border-b border-[#D4AF37]/30 flex items-center gap-2">
          <Sliders className="w-5 h-5 text-[#B38622]" />
          <div>
            <h3 className="font-heading text-lg font-bold text-[#4A0E17]">
              {lang === 'hi' ? 'दुकानदार प्रबंधन व भाव नियंत्रण' : 'Store Owner Settings & Rate Controls'}
            </h3>
            <span className="text-[11px] text-[#8A671C]">
              {lang === 'hi' ? 'भाव समायोजन, संपर्क व त्यौहार सेटिंग्स' : 'Adjust Sarafa premiums, manual overrides, and contact numbers'}
            </span>
          </div>
        </div>

        {/* Security Alert / Notice */}
        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-[11px] text-amber-900">
          <ShieldAlert className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
          <p>
            {lang === 'hi'
              ? 'संस्करण १ सूचना: यह सेटिंग्स केवल आपके ब्राउज़र के localStorage में सुरक्षित होती हैं। उत्पादन स्तर पर इसे पासवर्ड संरक्षित बैकएंड से जोड़ा जाना चाहिए।'
              : 'Architecture Note: Saved in localStorage for v1. In production, this must be secured behind authenticated server-side admin authentication.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* SECTION 1: RATE ADJUSTMENTS (Indian retail premium) */}
          <div className="p-4 bg-[#FAF7F2] border border-[#D4AF37]/30 rounded-xl space-y-3">
            <h4 className="font-bold text-[#4A0E17] flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <Percent className="w-4 h-4 text-[#B38622]" />
              <span>{lang === 'hi' ? '१. लाइव भाव समायोजन (Sarafa Rate Adjustment)' : '1. Live Rate Adjustments'}</span>
            </h4>
            <p className="text-[11px] text-stone-500">
              {lang === 'hi'
                ? 'अंतर्राष्ट्रीय स्पॉट रेट से स्थानीय सर्राफा व आयात ड्यूटी के अंतर को समायोजित करें:'
                : 'Account for import duty, local bullion association premiums, and transport:'}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#8A671C] mb-1">
                  {lang === 'hi' ? 'सोना समायोजन (%)' : 'Gold Adjustment (%)'}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.rateAdjustmentPercentGold}
                  onChange={(e) => handleChange('rateAdjustmentPercentGold', parseFloat(e.target.value) || 0)}
                  className="w-full p-2 bg-white border border-stone-300 rounded font-mono font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8A671C] mb-1">
                  {lang === 'hi' ? 'सोना समायोजन (₹ प्रति ग्राम)' : 'Gold Adjustment (₹/g)'}
                </label>
                <input
                  type="number"
                  step="1"
                  value={formData.rateAdjustmentRsPerGramGold}
                  onChange={(e) => handleChange('rateAdjustmentRsPerGramGold', parseFloat(e.target.value) || 0)}
                  className="w-full p-2 bg-white border border-stone-300 rounded font-mono font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8A671C] mb-1">
                  {lang === 'hi' ? 'चांदी समायोजन (%)' : 'Silver Adjustment (%)'}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.rateAdjustmentPercentSilver}
                  onChange={(e) => handleChange('rateAdjustmentPercentSilver', parseFloat(e.target.value) || 0)}
                  className="w-full p-2 bg-white border border-stone-300 rounded font-mono font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8A671C] mb-1">
                  {lang === 'hi' ? 'चांदी समायोजन (₹ प्रति ग्राम)' : 'Silver Adjustment (₹/g)'}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.rateAdjustmentRsPerGramSilver}
                  onChange={(e) => handleChange('rateAdjustmentRsPerGramSilver', parseFloat(e.target.value) || 0)}
                  className="w-full p-2 bg-white border border-stone-300 rounded font-mono font-semibold"
                />
              </div>
            </div>

            {/* Manual Rate Override Switch */}
            <div className="pt-3 border-t border-[#D4AF37]/20">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-[#4A0E17]">
                <input
                  type="checkbox"
                  checked={formData.manualOverride}
                  onChange={(e) => handleChange('manualOverride', e.target.checked)}
                  className="w-4 h-4 accent-[#4A0E17]"
                />
                <span>{lang === 'hi' ? 'मैन्युअल भाव ओवरराइड सक्षम करें (Manual Rate Override)' : 'Enable Manual Rate Override'}</span>
              </label>

              {formData.manualOverride && (
                <div className="grid grid-cols-2 gap-3 mt-2.5 animate-fadeIn">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#8A671C]">
                      24K Gold Rate (₹/g)
                    </label>
                    <input
                      type="number"
                      value={formData.manualGold24k}
                      onChange={(e) => handleChange('manualGold24k', parseFloat(e.target.value) || 0)}
                      className="w-full p-2 bg-white border border-stone-300 rounded font-mono font-bold text-[#4A0E17]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#8A671C]">
                      Silver 999 Rate (₹/g)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.manualSilver999}
                      onChange={(e) => handleChange('manualSilver999', parseFloat(e.target.value) || 0)}
                      className="w-full p-2 bg-white border border-stone-300 rounded font-mono font-bold text-[#4A0E17]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 2: SHOP CONTACT & WHATSAPP */}
          <div className="p-4 bg-[#FAF7F2] border border-[#D4AF37]/30 rounded-xl space-y-3">
            <h4 className="font-bold text-[#4A0E17] flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <Store className="w-4 h-4 text-[#B38622]" />
              <span>{lang === 'hi' ? '२. दुकान विवरण एवं व्हाट्सएप' : '2. Shop Details & WhatsApp'}</span>
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#8A671C]">
                  {lang === 'hi' ? 'दुकान का नाम (हिंदी)' : 'Shop Name (Hindi)'}
                </label>
                <input
                  type="text"
                  value={formData.shopNameHi}
                  onChange={(e) => handleChange('shopNameHi', e.target.value)}
                  className="w-full p-2 bg-white border border-stone-300 rounded"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8A671C]">
                  {lang === 'hi' ? 'दुकान का नाम (English)' : 'Shop Name (English)'}
                </label>
                <input
                  type="text"
                  value={formData.shopNameEn}
                  onChange={(e) => handleChange('shopNameEn', e.target.value)}
                  className="w-full p-2 bg-white border border-stone-300 rounded"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8A671C]">
                  {lang === 'hi' ? 'व्हाट्सएप नंबर (देश कोड सहित)' : 'WhatsApp Number (with country code)'}
                </label>
                <input
                  type="text"
                  value={formData.whatsappNumber}
                  onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                  placeholder="+919829012345"
                  className="w-full p-2 bg-white border border-stone-300 rounded font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8A671C]">
                  {lang === 'hi' ? 'कॉल फोन नंबर' : 'Calling Phone'}
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full p-2 bg-white border border-stone-300 rounded font-mono"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: TAX & CHARGES */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#8A671C]">
                {lang === 'hi' ? 'जीएसटी दर (%)' : 'GST Rate (%)'}
              </label>
              <input
                type="number"
                step="0.5"
                value={formData.gstPercent}
                onChange={(e) => handleChange('gstPercent', parseFloat(e.target.value) || 0)}
                className="w-full p-2 bg-white border border-stone-300 rounded font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#8A671C]">
                {lang === 'hi' ? 'डिफ़ॉल्ट मेकिंग (%)' : 'Default Making (%)'}
              </label>
              <input
                type="number"
                step="0.5"
                value={formData.defaultMakingPercent}
                onChange={(e) => handleChange('defaultMakingPercent', parseFloat(e.target.value) || 0)}
                className="w-full p-2 bg-white border border-stone-300 rounded font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#8A671C]">
                {lang === 'hi' ? 'पुराना सोना कटौती (%)' : 'Old Gold Deduction (%)'}
              </label>
              <input
                type="number"
                step="0.5"
                value={formData.oldGoldDeductionPercent}
                onChange={(e) => handleChange('oldGoldDeductionPercent', parseFloat(e.target.value) || 0)}
                className="w-full p-2 bg-white border border-stone-300 rounded font-mono"
              />
            </div>
          </div>

          {/* SECTION 4: ACTIVE FESTIVAL BANNER */}
          <div>
            <label className="block text-[11px] font-semibold text-[#8A671C] mb-1">
              {lang === 'hi' ? 'सक्रिय उत्सव बैनर (Active Festival Banner)' : 'Active Festival Banner'}
            </label>
            <select
              value={formData.activeFestivalId}
              onChange={(e) => handleChange('activeFestivalId', e.target.value)}
              className="w-full p-2 bg-white border border-stone-300 rounded"
            >
              {banners.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.titleHi} ({b.titleEn})
                </option>
              ))}
            </select>
          </div>

          {savedSuccess && (
            <div className="p-2.5 bg-emerald-100 border border-emerald-300 text-emerald-800 text-center font-bold rounded-lg animate-fadeIn">
              {lang === 'hi' ? '✓ सेटिंग्स सफलतापूर्वक सुरक्षित हो गईं!' : '✓ Settings saved successfully!'}
            </div>
          )}

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-stone-300 hover:bg-stone-100 font-semibold"
            >
              {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#4A0E17] hover:bg-[#6B1724] text-white font-bold rounded-lg flex items-center gap-1.5 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>{lang === 'hi' ? 'सेटिंग्स सहेजें' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
