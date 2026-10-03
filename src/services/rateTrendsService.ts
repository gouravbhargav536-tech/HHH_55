import { LiveRates } from '../types';

export interface RateHistoryPoint {
  date: string;          // YYYY-MM-DD
  dayLabelHi: string;    // e.g. "18 सितं"
  dayLabelEn: string;    // e.g. "18 Sep"
  gold24k: number;       // ₹ per gram
  gold22k: number;       // ₹ per gram
  gold18k: number;       // ₹ per gram
  silver999: number;     // ₹ per gram
  isToday: boolean;
}

const STORAGE_KEY_7D_TREND = 'slj_rate_history_7d_v1';

// Month names for clean Hindi / English formatting
const MONTH_NAMES_HI = ['जन', 'फ़र', 'मार्च', 'अप्रै', 'मई', 'जून', 'जुला', 'अग', 'सितं', 'अक्टू', 'नव', 'दिस'];
const MONTH_NAMES_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Format a Date object into YYYY-MM-DD and short locale labels
 */
function formatDateLabels(d: Date) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const dateKey = `${year}-${month}-${day}`;

  const dayNum = d.getDate();
  const monthIdx = d.getMonth();

  return {
    dateKey,
    dayLabelHi: `${dayNum} ${MONTH_NAMES_HI[monthIdx]}`,
    dayLabelEn: `${dayNum} ${MONTH_NAMES_EN[monthIdx]}`,
  };
}

/**
 * Retrieves the 7-day rate history from localStorage or generates realistic simulated
 * historical points based on the current live rate.
 */
export function get7DayRateTrends(currentRates: LiveRates): RateHistoryPoint[] {
  const today = new Date();
  const points: RateHistoryPoint[] = [];

  // Read any saved history from localStorage
  let savedHistory: Record<string, Partial<RateHistoryPoint>> = {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_7D_TREND);
    if (raw) {
      savedHistory = JSON.parse(raw);
    }
  } catch {
    savedHistory = {};
  }

  // Realistic daily fluctuation offsets for the preceding 6 days
  // Represents normal market oscillations (-1.2% to +0.8%)
  const dailyFactors = [
    -0.011, // 6 days ago
    -0.006, // 5 days ago
    +0.004, // 4 days ago
    -0.001, // 3 days ago
    +0.007, // 2 days ago
    +0.003, // 1 day ago
    0,      // Today
  ];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const { dateKey, dayLabelHi, dayLabelEn } = formatDateLabels(d);
    const isToday = i === 0;

    if (isToday) {
      // Today always reflects current live/adjusted rate
      const point: RateHistoryPoint = {
        date: dateKey,
        dayLabelHi: `${dayLabelHi} (आज)`,
        dayLabelEn: `${dayLabelEn} (Today)`,
        gold24k: Math.round(currentRates.gold24k),
        gold22k: Math.round(currentRates.gold22k),
        gold18k: Math.round(currentRates.gold18k),
        silver999: +currentRates.silver999.toFixed(1),
        isToday: true,
      };
      points.push(point);
      savedHistory[dateKey] = point;
    } else if (savedHistory[dateKey] && savedHistory[dateKey].gold24k) {
      // Use existing saved historical rate if recorded
      const saved = savedHistory[dateKey];
      points.push({
        date: dateKey,
        dayLabelHi,
        dayLabelEn,
        gold24k: Math.round(saved.gold24k!),
        gold22k: Math.round(saved.gold22k || saved.gold24k! * 0.916),
        gold18k: Math.round(saved.gold18k || saved.gold24k! * 0.75),
        silver999: +(saved.silver999 || currentRates.silver999).toFixed(1),
        isToday: false,
      });
    } else {
      // Simulate historical rate based on factor
      const factor = dailyFactors[6 - i];
      const sim24k = Math.round(currentRates.gold24k * (1 + factor));
      const sim22k = Math.round(sim24k * 0.916);
      const sim18k = Math.round(sim24k * 0.75);
      const simSilver = +(currentRates.silver999 * (1 + factor * 1.3)).toFixed(1);

      const simPoint: RateHistoryPoint = {
        date: dateKey,
        dayLabelHi,
        dayLabelEn,
        gold24k: sim24k,
        gold22k: sim22k,
        gold18k: sim18k,
        silver999: simSilver,
        isToday: false,
      };

      points.push(simPoint);
      savedHistory[dateKey] = simPoint;
    }
  }

  // Persist updated history back to localStorage
  try {
    localStorage.setItem(STORAGE_KEY_7D_TREND, JSON.stringify(savedHistory));
  } catch {
    // Ignore storage limits
  }

  return points;
}
