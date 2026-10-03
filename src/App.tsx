import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Language, LiveRates, ShopSettings, FestivalBanner as FestivalBannerType } from './types';
import { DEFAULT_SHOP_SETTINGS, FESTIVAL_BANNERS, SHUBH_MUHURAT_LIST, CUSTOMER_REVIEWS, FAQ_LIST } from './data/shopConfig';
import { PRODUCTS_CATALOG } from './data/products';
import { fetchLiveRates, applySettingsToRates, DEFAULT_BASELINE_RATES } from './services/ratesService';

import { Navbar } from './components/Navbar';
import { RateBoard } from './components/RateBoard';
import { FestivalBanner } from './components/FestivalBanner';
import { JewelleryModelShowcase } from './components/JewelleryModelShowcase';
import { ProductCatalog } from './components/ProductCatalog';
import { PriceCalculatorHisab } from './components/PriceCalculatorHisab';
import { DulhanPackageBuilder } from './components/DulhanPackageBuilder';
import { GiftFinder } from './components/GiftFinder';
import { ShubhMuhuratSection } from './components/ShubhMuhurat';
import { HallmarkTrustSection } from './components/HallmarkTrust';
import { GoogleStoreShowcase } from './components/GoogleStoreShowcase';
import { OurStory } from './components/OurStory';
import { Footer } from './components/Footer';
import { StickyMobileBar } from './components/StickyMobileBar';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { CustomOrderModal, VideoCallModal } from './components/OrderModals';
import { AdminSettingsModal } from './components/AdminSettingsModal';

const STORAGE_KEY_SETTINGS = 'slj_shop_settings_v1';
const STORAGE_KEY_LANG = 'slj_preferred_lang_v1';

export default function App() {
  // 1. Language state: Hindi is default per user prompt
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    return (saved === 'en' || saved === 'hi') ? saved : 'hi';
  });

  const toggleLanguage = () => {
    setLang((prev) => {
      const next = prev === 'hi' ? 'en' : 'hi';
      localStorage.setItem(STORAGE_KEY_LANG, next);
      document.documentElement.lang = next;
      return next;
    });
  };

  // 2. Shop Settings state
  const [settings, setSettings] = useState<ShopSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_SHOP_SETTINGS, ...parsed };
      }
    } catch {
      // ignore
    }
    return DEFAULT_SHOP_SETTINGS;
  });

  const handleSaveSettings = (newSettings: ShopSettings) => {
    setSettings(newSettings);
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(newSettings));
  };

  // 3. Raw Rates & Live Rates with adjustments applied
  const [rawRates, setRawRates] = useState<LiveRates>(DEFAULT_BASELINE_RATES);
  const [isRefreshingRate, setIsRefreshingRate] = useState<boolean>(false);

  // Compute final effective rates with owner adjustments & manual overrides
  const effectiveRates = useMemo(() => {
    return applySettingsToRates(rawRates, settings);
  }, [rawRates, settings]);

  const loadRates = useCallback(async (forceRefresh: boolean = false) => {
    setIsRefreshingRate(true);
    try {
      const rates = await fetchLiveRates(forceRefresh);
      setRawRates(rates);
    } catch (err) {
      console.error('Error fetching live rates:', err);
    } finally {
      setIsRefreshingRate(false);
    }
  }, []);

  // Initial rate fetch
  useEffect(() => {
    loadRates(false);
  }, [loadRates]);

  // Modals state
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState<boolean>(false);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Check URL hash for #admin or path for /admin
  useEffect(() => {
    if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
      setIsAdminOpen(true);
    }
  }, []);

  // Find active festival banner
  const activeBanner = useMemo(() => {
    return (
      FESTIVAL_BANNERS.find((b) => b.id === settings.activeFestivalId) ||
      FESTIVAL_BANNERS[0]
    );
  }, [settings.activeFestivalId]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2E050C]">
      {/* 1. Top Navbar */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        settings={settings}
        onOpenCustomOrder={() => setIsCustomOrderOpen(true)}
        onOpenVideoCall={() => setIsVideoCallOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Top Live Gold & Silver Rate Board */}
        <RateBoard
          rates={effectiveRates}
          lang={lang}
          onRefreshRate={() => loadRates(true)}
          isRefreshing={isRefreshingRate}
        />

        {/* 3. Active Festival Banner */}
        <FestivalBanner
          banner={activeBanner}
          settings={settings}
          lang={lang}
        />

        {/* 4. Royal Jewellery Model Showcase & Virtual Lookbook */}
        <JewelleryModelShowcase
          rates={effectiveRates}
          settings={settings}
          lang={lang}
          onOpenVideoCall={() => setIsVideoCallOpen(true)}
          onOpenCustomOrder={() => setIsCustomOrderOpen(true)}
        />

        {/* 5. Complete Product Catalogue with live auto-calculated prices */}
        <ProductCatalog
          products={PRODUCTS_CATALOG}
          rates={effectiveRates}
          settings={settings}
          lang={lang}
        />

        {/* 5. Price Calculator (Hisab Slip) & Old Gold Exchange Estimator */}
        <PriceCalculatorHisab
          rates={effectiveRates}
          settings={settings}
          lang={lang}
        />

        {/* 6. Dulhan Package Builder */}
        <DulhanPackageBuilder
          rates={effectiveRates}
          settings={settings}
          lang={lang}
        />

        {/* 7. Gift Finder */}
        <GiftFinder
          products={PRODUCTS_CATALOG}
          rates={effectiveRates}
          settings={settings}
          lang={lang}
        />

        {/* 8. Shubh Muhurat Auspicious Calendar */}
        <ShubhMuhuratSection
          muhuratList={SHUBH_MUHURAT_LIST}
          settings={settings}
          lang={lang}
        />

        {/* 9. BIS Hallmark & HUID Trust Guide, Customer Reviews & FAQ */}
        <HallmarkTrustSection
          reviews={CUSTOMER_REVIEWS}
          faqs={FAQ_LIST}
          lang={lang}
        />

        {/* 10. Google Maps Verified Showroom & Store Photos */}
        <GoogleStoreShowcase
          settings={settings}
          lang={lang}
        />

        {/* 11. Our Story & Family Sarafa Heritage */}
        <OurStory
          settings={settings}
          lang={lang}
        />
      </main>

      {/* 11. Footer with Legal & Sarafa Disclaimers */}
      <Footer
        settings={settings}
        lang={lang}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 12. Sticky Mobile Conversion Bar */}
      <StickyMobileBar
        settings={settings}
        lang={lang}
        onOpenVideoCall={() => setIsVideoCallOpen(true)}
      />

      {/* 13. Floating WhatsApp Direct Chat Widget */}
      <FloatingWhatsAppButton
        settings={settings}
        lang={lang}
      />

      {/* Interactive Modals */}
      <CustomOrderModal
        isOpen={isCustomOrderOpen}
        onClose={() => setIsCustomOrderOpen(false)}
        settings={settings}
        lang={lang}
      />

      <VideoCallModal
        isOpen={isVideoCallOpen}
        onClose={() => setIsVideoCallOpen(false)}
        settings={settings}
        lang={lang}
      />

      <AdminSettingsModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        settings={settings}
        onSave={handleSaveSettings}
        banners={FESTIVAL_BANNERS}
        lang={lang}
      />
    </div>
  );
}
