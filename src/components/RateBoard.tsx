import React, { useState, useEffect, useMemo } from 'react';
import { LiveRates, Language } from '../types';
import { formatINR } from '../utils/pricing';
import { MANUAL_REFRESH_COOLDOWN_MS, getLastFetchTimestamp } from '../services/ratesService';
import { get7DayRateTrends } from '../services/rateTrendsService';
import { RateTrendsChart } from './RateTrendsChart';
import { RefreshCw, TrendingUp, TrendingDown, Clock, ShieldCheck, AlertCircle, LineChart, ChevronDown, ChevronUp } from 'lucide-react';

interface RateBoardProps {
  rates: LiveRates;
  lang: Language;
  onRefreshRate: () => Promise<void>;
  isRefreshing: boolean;
}

export const RateBoard: React.FC<RateBoardProps> = ({ rates, lang, onRefreshRate, isRefreshing }) => {
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);
  const [refreshMessage, setRefreshMessage] = useState<string | null>(null);
  const [showTrendsChart, setShowTrendsChart] = useState<boolean>(true);

  // Check cooldown timer
  useEffect(() => {
    const updateCooldown = () => {
      const lastFetch = getLastFetchTimestamp();
      const elapsed = Date.now() - lastFetch;
      if (elapsed < MANUAL_REFRESH_COOLDOWN_MS) {
        setCooldownRemaining(Math.ceil((MANUAL_REFRESH_COOLDOWN_MS - elapsed) / 1000));
      } else {
        setCooldownRemaining(0);
      }
    };

    updateCooldown();
    const interval = setInterval(updateCooldown, 1000);
    return () => clearInterval(interval);
  }, [rates]);

  // Generate or retrieve 7-day rate history
  const trendHistory = useMemo(() => {
    return get7DayRateTrends(rates);
  }, [rates]);

  const handleRefreshClick = async () => {
    if (cooldownRemaining > 0) {
      setRefreshMessage(
        lang === 'hi'
          ? `कृपया ${Math.ceil(cooldownRemaining / 60)} मिनट प्रतीक्षा करें (दर 5 मिनट में एक बार रिफ्रेश होती है)`
          : `Please wait ${Math.ceil(cooldownRemaining / 60)}m (refresh allowed once every 5 mins)`
      );
      setTimeout(() => setRefreshMessage(null), 3500);
      return;
    }

    try {
      await onRefreshRate();
      setRefreshMessage(lang === 'hi' ? 'ताज़ा भाव अपडेट हो गए हैं!' : 'Rates refreshed successfully!');
      setTimeout(() => setRefreshMessage(null), 3000);
    } catch {
      setRefreshMessage(lang === 'hi' ? 'दर अपडेट करने में असमर्थ, पूर्व सुरक्षित दर प्रदर्शित' : 'Could not fetch live rate, using cached data');
      setTimeout(() => setRefreshMessage(null), 3500);
    }
  };

  // Compare trend with previous rates
  const goldTrend = rates.previousGold24k 
    ? rates.gold24k > rates.previousGold24k ? 'up' : rates.gold24k < rates.previousGold24k ? 'down' : 'same'
    : 'same';

  const silverTrend = rates.previousSilver999
    ? rates.silver999 > rates.previousSilver999 ? 'up' : rates.silver999 < rates.previousSilver999 ? 'down' : 'same'
    : 'same';

  // Format updated time
  const updatedTime = new Date(rates.updatedAt).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <section className="bg-gradient-to-b from-[#2E050C] via-[#3E0911] to-[#250409] text-[#FAF7F2] border-y border-[#D4AF37]/30 shadow-lg relative overflow-hidden">
      {/* Decorative filigree accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        {/* Top Header of Rate Board */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#D4AF37]/20 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold tracking-wide text-[#E5C158] uppercase">
              {lang === 'hi' ? 'दुकान लाइव भाव बोर्ड' : 'Live Sarafa Rate Board'}
            </span>
            <span className="text-[#E5C158]/50">|</span>
            <span className="flex items-center gap-1 text-[#F3ECE0]/80">
              <Clock className="w-3.5 h-3.5 text-[#E5C158]" />
              {lang === 'hi' ? `अपडेट: ${updatedTime}` : `Updated: ${updatedTime}`}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {rates.isManualOverride && (
              <span className="text-[11px] text-amber-300 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                {lang === 'hi' ? 'दुकानदार द्वारा निर्धारित दर' : 'Store Confirmed Rate'}
              </span>
            )}

            {/* Toggle 7-Day Chart Button */}
            <button
              onClick={() => setShowTrendsChart(!showTrendsChart)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                showTrendsChart
                  ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#E5C158]'
                  : 'border-[#D4AF37]/40 text-[#FAF7F2] hover:bg-[#D4AF37]/15'
              }`}
              title={lang === 'hi' ? '७ दिनों का भाव रुझान ग्राफ' : '7-Day Price Trend Graph'}
            >
              <LineChart className="w-3.5 h-3.5 text-[#E5C158]" />
              <span className="hidden sm:inline">
                {lang === 'hi' ? '७-दिन ग्राफ' : '7-Day Trends'}
              </span>
              {showTrendsChart ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {/* Refresh Rate Button */}
            <button
              onClick={handleRefreshClick}
              disabled={isRefreshing}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium border transition-colors ${
                cooldownRemaining > 0 
                  ? 'border-[#D4AF37]/20 text-[#FAF7F2]/60 cursor-not-allowed bg-black/20' 
                  : 'border-[#D4AF37]/50 text-[#FAF7F2] hover:bg-[#D4AF37]/20 active:bg-[#D4AF37]/30'
              }`}
              title={cooldownRemaining > 0 ? `Refresh cooldown active` : `Refresh rate`}
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#E5C158] ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>
                {isRefreshing 
                  ? (lang === 'hi' ? 'अपडेट हो रहा...' : 'Updating...') 
                  : cooldownRemaining > 0 
                    ? `${lang === 'hi' ? 'पुनः' : 'Wait'} (${cooldownRemaining}s)` 
                    : (lang === 'hi' ? 'भाव रिफ्रेश करें' : 'Refresh Rate')
                }
              </span>
            </button>
          </div>
        </div>

        {/* Feedback message banner */}
        {refreshMessage && (
          <div className="mt-2 py-1 px-3 bg-[#D4AF37]/15 border border-[#D4AF37]/40 rounded text-xs text-[#E5C158] flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{refreshMessage}</span>
          </div>
        )}

        {/* Rates Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mt-3">
          {/* Gold 24K */}
          <div className="bg-[#1C0307]/70 border border-[#D4AF37]/30 rounded-lg p-2.5 sm:p-3 relative group hover:border-[#D4AF37] transition-all">
            <div className="flex items-center justify-between text-xs text-[#E5C158] mb-1">
              <span className="font-bold tracking-wider">{lang === 'hi' ? 'सोना 24K (शुद्ध)' : 'Gold 24K (Fine)'}</span>
              <div className="flex items-center gap-0.5">
                {goldTrend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />}
                {goldTrend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-rose-400" />}
                <span className="text-[10px] text-[#FAF7F2]/60">99.9%</span>
              </div>
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono tracking-tight text-[#FAF7F2]">
              {formatINR(rates.gold24k)}
              <span className="text-xs text-[#F3ECE0]/70 font-sans font-normal ml-1">/ {lang === 'hi' ? 'ग्राम' : 'g'}</span>
            </div>
            <div className="text-xs text-[#E5C158]/80 font-mono mt-0.5">
              10g: {formatINR(rates.gold24k * 10)}
            </div>
          </div>

          {/* Gold 22K (Hallmark jewellery standard) */}
          <div className="bg-gradient-to-br from-[#4A111B] to-[#2B060C] border-2 border-[#D4AF37] rounded-lg p-2.5 sm:p-3 shadow-md relative group">
            <div className="absolute -top-2.5 right-2 px-1.5 py-0.5 bg-[#D4AF37] text-[#2E050C] text-[9px] font-bold tracking-wider rounded uppercase">
              {lang === 'hi' ? 'जेवर मानक (916)' : 'Jewellery (916)'}
            </div>
            <div className="flex items-center justify-between text-xs text-[#E5C158] mb-1">
              <span className="font-bold tracking-wider">{lang === 'hi' ? 'सोना 22K (हॉलमार्क)' : 'Gold 22K (Hallmark)'}</span>
              <div className="flex items-center gap-0.5">
                {goldTrend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />}
                {goldTrend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-rose-400" />}
              </div>
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono tracking-tight text-[#FAF7F2]">
              {formatINR(rates.gold22k)}
              <span className="text-xs text-[#F3ECE0]/70 font-sans font-normal ml-1">/ {lang === 'hi' ? 'ग्राम' : 'g'}</span>
            </div>
            <div className="text-xs text-[#E5C158] font-mono mt-0.5 font-semibold">
              10g: {formatINR(rates.gold22k * 10)}
            </div>
          </div>

          {/* Gold 18K */}
          <div className="bg-[#1C0307]/70 border border-[#D4AF37]/30 rounded-lg p-2.5 sm:p-3 relative group hover:border-[#D4AF37] transition-all">
            <div className="flex items-center justify-between text-xs text-[#E5C158] mb-1">
              <span className="font-bold tracking-wider">{lang === 'hi' ? 'सोना 18K (डायमंड)' : 'Gold 18K (750)'}</span>
              <span className="text-[10px] text-[#FAF7F2]/60">75.0%</span>
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono tracking-tight text-[#FAF7F2]">
              {formatINR(rates.gold18k)}
              <span className="text-xs text-[#F3ECE0]/70 font-sans font-normal ml-1">/ {lang === 'hi' ? 'ग्राम' : 'g'}</span>
            </div>
            <div className="text-xs text-[#E5C158]/80 font-mono mt-0.5">
              10g: {formatINR(rates.gold18k * 10)}
            </div>
          </div>

          {/* Pure Silver */}
          <div className="bg-[#1C0307]/70 border border-[#D4AF37]/30 rounded-lg p-2.5 sm:p-3 relative group hover:border-[#D4AF37] transition-all">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
              <span className="font-bold tracking-wider text-slate-100">{lang === 'hi' ? 'चांदी (सिक्का/पातली)' : 'Silver (999/925)'}</span>
              <div className="flex items-center gap-0.5">
                {silverTrend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />}
                {silverTrend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-rose-400" />}
              </div>
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono tracking-tight text-[#FAF7F2]">
              {formatINR(rates.silver999)}
              <span className="text-xs text-[#F3ECE0]/70 font-sans font-normal ml-1">/ {lang === 'hi' ? 'ग्राम' : 'g'}</span>
            </div>
            <div className="text-xs text-slate-300 font-mono mt-0.5">
              1 Kg: {formatINR(rates.silver999 * 1000)}
            </div>
          </div>
        </div>

        {/* 7-Day Recharts Trend Line Chart */}
        {showTrendsChart && (
          <RateTrendsChart data={trendHistory} lang={lang} />
        )}

        {/* Customer Disclaimer Banner */}
        <div className="mt-2.5 pt-2 border-t border-[#D4AF37]/15 text-[11px] text-[#FAF7F2]/75 flex flex-wrap items-center justify-between gap-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[#E5C158] font-bold">ℹ</span>
            <span>
              {lang === 'hi'
                ? 'भाव सांकेतिक (अनुमानित) हैं। अंतिम भाव दुकान पर वजन व खरीद के समय तय होगा।'
                : 'Rates are indicative. Final rate is confirmed at the shop during purchase.'}
            </span>
          </div>
          <div className="text-[#E5C158]/80">
            {lang === 'hi' ? '100% बीआईएस हॉलमार्क प्रमाण पत्र सहित' : '100% BIS Hallmarked Guarantee'}
          </div>
        </div>
      </div>
    </section>
  );
};
