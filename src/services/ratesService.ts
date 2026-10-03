import { LiveRates, ShopSettings } from '../types';

/**
 * ARCHITECTURAL & SECURITY NOTICE:
 * In Version 1 (frontend-first architecture), the live rate fetch connects directly to GoldAPI.io
 * or frankfurter fallback. If VITE_GOLDAPI_KEY is defined in client environment, it is sent in the header.
 * 
 * In production, never expose paid API keys to the browser. To transition to a server architecture:
 * 1. Create a server endpoint (e.g. Express route `GET /api/rates` in server.ts or Cloud Run/Vercel serverless function).
 * 2. Keep GOLDAPI_KEY in server-side process.env (not VITE_ prefix).
 * 3. Cache the response in Redis or server memory so all users share 1 API call per hour, protecting quota.
 */

const STORAGE_KEY_RATES = 'slj_live_rates_v1';
const STORAGE_KEY_LAST_FETCH = 'slj_last_fetch_timestamp';
const AUTO_REFRESH_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes
export const MANUAL_REFRESH_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

// Realistic Rajasthan sarafa baseline rates (Sri Madhopur / Jaipur Sarafa market)
export const DEFAULT_BASELINE_RATES: LiveRates = {
  gold24k: 7480,
  gold22k: 6852,
  gold18k: 5610,
  gold14k: 4375,
  silver999: 92.5,
  silver925: 85.5,
  silver800: 74.0,
  updatedAt: new Date().toISOString(),
  source: 'default',
  isManualOverride: false,
};

/**
 * Apply owner adjustments (percentage and flat ₹/gram) and manual overrides
 */
export function applySettingsToRates(rawRates: LiveRates, settings: ShopSettings): LiveRates {
  if (settings.manualOverride && settings.manualGold24k > 0 && settings.manualSilver999 > 0) {
    const gold24k = settings.manualGold24k;
    const gold22k = Math.round(gold24k * 0.916);
    const gold18k = Math.round(gold24k * 0.75);
    const gold14k = Math.round(gold24k * 0.585);

    const silver999 = settings.manualSilver999;
    const silver925 = +(silver999 * 0.925).toFixed(2);
    const silver800 = +(silver999 * 0.800).toFixed(2);

    return {
      ...rawRates,
      gold24k,
      gold22k,
      gold18k,
      gold14k,
      silver999,
      silver925,
      silver800,
      isManualOverride: true,
      source: 'manual',
    };
  }

  // Apply Gold adjustments
  let adjGold24k = rawRates.gold24k;
  if (settings.rateAdjustmentPercentGold) {
    adjGold24k += (adjGold24k * settings.rateAdjustmentPercentGold) / 100;
  }
  if (settings.rateAdjustmentRsPerGramGold) {
    adjGold24k += settings.rateAdjustmentRsPerGramGold;
  }
  adjGold24k = Math.round(adjGold24k);

  const gold22k = Math.round(adjGold24k * 0.916);
  const gold18k = Math.round(adjGold24k * 0.75);
  const gold14k = Math.round(adjGold24k * 0.585);

  // Apply Silver adjustments
  let adjSilver999 = rawRates.silver999;
  if (settings.rateAdjustmentPercentSilver) {
    adjSilver999 += (adjSilver999 * settings.rateAdjustmentPercentSilver) / 100;
  }
  if (settings.rateAdjustmentRsPerGramSilver) {
    adjSilver999 += settings.rateAdjustmentRsPerGramSilver;
  }
  adjSilver999 = +adjSilver999.toFixed(2);

  const silver925 = +(adjSilver999 * 0.925).toFixed(2);
  const silver800 = +(adjSilver999 * 0.800).toFixed(2);

  return {
    ...rawRates,
    gold24k: adjGold24k,
    gold22k,
    gold18k,
    gold14k,
    silver999: adjSilver999,
    silver925,
    silver800,
    isManualOverride: false,
  };
}

/**
 * Read cached rates from localStorage
 */
export function getCachedRates(): LiveRates | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RATES);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.gold24k > 0) {
      return parsed;
    }
  } catch {
    // ignore parse error
  }
  return null;
}

/**
 * Save rates to localStorage
 */
export function saveRatesToCache(rates: LiveRates): void {
  try {
    localStorage.setItem(STORAGE_KEY_RATES, JSON.stringify(rates));
    localStorage.setItem(STORAGE_KEY_LAST_FETCH, Date.now().toString());
  } catch {
    // ignore storage error
  }
}

/**
 * Check when the last fetch occurred
 */
export function getLastFetchTimestamp(): number {
  try {
    const val = localStorage.getItem(STORAGE_KEY_LAST_FETCH);
    return val ? parseInt(val, 10) : 0;
  } catch {
    return 0;
  }
}

/**
 * Fetch USD to INR exchange rate from Frankfurter API
 */
async function getUsdToInrRate(): Promise<number> {
  const res = await fetch('https://api.frankfurter.dev/v1/latest?base=USD&symbols=INR');
  if (!res.ok) throw new Error('Frankfurter currency fetch failed');
  const data = await res.json();
  return data.rates.INR || 83.5;
}

/**
 * Primary fetcher: GoldAPI.io or Fallbacks
 */
export async function fetchLiveRates(forceRefresh: boolean = false): Promise<LiveRates> {
  const cached = getCachedRates();
  const lastFetch = getLastFetchTimestamp();
  const now = Date.now();

  // If not forcing, and cached is fresh (< 30 mins old), return cached
  if (!forceRefresh && cached && now - lastFetch < AUTO_REFRESH_INTERVAL_MS) {
    return cached;
  }

  const apiKey = import.meta.env.VITE_GOLDAPI_KEY || '';

  // Attempt 1: GoldAPI with direct INR
  if (apiKey) {
    try {
      const headers = {
        'x-access-token': apiKey,
        'Content-Type': 'application/json',
      };

      const [goldRes, silverRes] = await Promise.all([
        fetch('https://www.goldapi.io/api/XAU/INR', { headers }),
        fetch('https://www.goldapi.io/api/XAG/INR', { headers }),
      ]);

      if (goldRes.ok && silverRes.ok) {
        const goldData = await goldRes.json();
        const silverData = await silverRes.json();

        // Extract or compute 24k gold per gram
        let gold24k = 0;
        if (goldData.price_gram_24k) {
          gold24k = Math.round(goldData.price_gram_24k);
        } else if (goldData.price) {
          // goldData.price is per troy ounce (31.1035 grams)
          gold24k = Math.round(goldData.price / 31.1035);
        }

        const gold22k = goldData.price_gram_22k ? Math.round(goldData.price_gram_22k) : Math.round(gold24k * 0.916);
        const gold18k = goldData.price_gram_18k ? Math.round(goldData.price_gram_18k) : Math.round(gold24k * 0.75);
        const gold14k = goldData.price_gram_14k ? Math.round(goldData.price_gram_14k) : Math.round(gold24k * 0.585);

        // Silver per gram
        let silver999 = 0;
        if (silverData.price_gram_24k) {
          silver999 = +silverData.price_gram_24k.toFixed(2);
        } else if (silverData.price) {
          silver999 = +(silverData.price / 31.1035).toFixed(2);
        }

        const silver925 = +(silver999 * 0.925).toFixed(2);
        const silver800 = +(silver999 * 0.800).toFixed(2);

        if (gold24k > 1000 && silver999 > 10) {
          const freshRates: LiveRates = {
            gold24k,
            gold22k,
            gold18k,
            gold14k,
            silver999,
            silver925,
            silver800,
            updatedAt: new Date().toISOString(),
            previousGold24k: cached?.gold24k,
            previousSilver999: cached?.silver999,
            source: 'goldapi',
            isManualOverride: false,
          };
          saveRatesToCache(freshRates);
          return freshRates;
        }
      }
    } catch {
      // GoldAPI direct call failed, continue to fallback 1
    }

    // Attempt 1b: GoldAPI in USD + Frankfurter INR conversion
    try {
      const headers = { 'x-access-token': apiKey };
      const [goldUsdRes, silverUsdRes, inrRate] = await Promise.all([
        fetch('https://www.goldapi.io/api/XAU/USD', { headers }),
        fetch('https://www.goldapi.io/api/XAG/USD', { headers }),
        getUsdToInrRate(),
      ]);

      if (goldUsdRes.ok && silverUsdRes.ok) {
        const goldUsd = await goldUsdRes.json();
        const silverUsd = await silverUsdRes.json();

        const goldOzInr = goldUsd.price * inrRate;
        const gold24k = Math.round(goldOzInr / 31.1035);
        const gold22k = Math.round(gold24k * 0.916);
        const gold18k = Math.round(gold24k * 0.75);
        const gold14k = Math.round(gold24k * 0.585);

        const silverOzInr = silverUsd.price * inrRate;
        const silver999 = +(silverOzInr / 31.1035).toFixed(2);
        const silver925 = +(silver999 * 0.925).toFixed(2);
        const silver800 = +(silver999 * 0.800).toFixed(2);

        const convertedRates: LiveRates = {
          gold24k,
          gold22k,
          gold18k,
          gold14k,
          silver999,
          silver925,
          silver800,
          updatedAt: new Date().toISOString(),
          previousGold24k: cached?.gold24k,
          previousSilver999: cached?.silver999,
          source: 'frankfurter',
          isManualOverride: false,
        };
        saveRatesToCache(convertedRates);
        return convertedRates;
      }
    } catch {
      // Fallback 1 failed
    }
  }

  // Fallback 2: Cached rate from localStorage
  if (cached && cached.gold24k > 0) {
    return {
      ...cached,
      source: 'cache',
    };
  }

  // Fallback 3: Solid realistic baseline Rajasthan market defaults
  return DEFAULT_BASELINE_RATES;
}
