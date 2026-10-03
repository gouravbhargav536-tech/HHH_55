import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { RateHistoryPoint } from '../services/rateTrendsService';
import { Language } from '../types';
import { formatINR } from '../utils/pricing';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

interface RateTrendsChartProps {
  data: RateHistoryPoint[];
  lang: Language;
}

type SelectedMetric = 'gold24k' | 'gold22k' | 'silver999' | 'both_gold';

export const RateTrendsChart: React.FC<RateTrendsChartProps> = ({ data, lang }) => {
  const [selectedMetric, setSelectedMetric] = useState<SelectedMetric>('both_gold');

  // Compute 7-day stats for 24K and 22K
  const stats = useMemo(() => {
    if (!data || data.length === 0) return null;

    const gold24Values = data.map((d) => d.gold24k);
    const gold22Values = data.map((d) => d.gold22k);
    const silverValues = data.map((d) => d.silver999);

    const firstPoint = data[0];
    const lastPoint = data[data.length - 1];

    const change24k = lastPoint.gold24k - firstPoint.gold24k;
    const change24kPercent = +((change24k / firstPoint.gold24k) * 100).toFixed(2);

    const change22k = lastPoint.gold22k - firstPoint.gold22k;
    const change22kPercent = +((change22k / firstPoint.gold22k) * 100).toFixed(2);

    const changeSilver = +(lastPoint.silver999 - firstPoint.silver999).toFixed(1);
    const changeSilverPercent = +((changeSilver / firstPoint.silver999) * 100).toFixed(2);

    const high24k = Math.max(...gold24Values);
    const low24k = Math.min(...gold24Values);

    const high22k = Math.max(...gold22Values);
    const low22k = Math.min(...gold22Values);

    const highSilver = Math.max(...silverValues);
    const lowSilver = Math.min(...silverValues);

    return {
      high24k,
      low24k,
      change24k,
      change24kPercent,
      high22k,
      low22k,
      change22k,
      change22kPercent,
      highSilver,
      lowSilver,
      changeSilver,
      changeSilverPercent,
    };
  }, [data]);

  // Compute dynamic Y-axis domain with pleasant padding
  const yDomain = useMemo(() => {
    if (!data || data.length === 0) return [0, 10000];

    if (selectedMetric === 'silver999') {
      const vals = data.map((d) => d.silver999);
      const min = Math.floor(Math.min(...vals) - 2);
      const max = Math.ceil(Math.max(...vals) + 2);
      return [min, max];
    }

    if (selectedMetric === 'gold22k') {
      const vals = data.map((d) => d.gold22k);
      const min = Math.floor(Math.min(...vals) - 100);
      const max = Math.ceil(Math.max(...vals) + 100);
      return [min, max];
    }

    if (selectedMetric === 'gold24k') {
      const vals = data.map((d) => d.gold24k);
      const min = Math.floor(Math.min(...vals) - 100);
      const max = Math.ceil(Math.max(...vals) + 100);
      return [min, max];
    }

    // Both Gold (24K & 22K)
    const vals = data.flatMap((d) => [d.gold24k, d.gold22k]);
    const min = Math.floor(Math.min(...vals) - 150);
    const max = Math.ceil(Math.max(...vals) + 150);
    return [min, max];
  }, [data, selectedMetric]);

  // Custom royal Indian themed tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#2E050C] border border-[#D4AF37] p-2.5 rounded-lg shadow-xl text-xs font-mono text-[#FAF7F2] z-50">
          <div className="font-sans font-bold text-[#E5C158] pb-1 border-b border-[#D4AF37]/30 mb-1.5 flex items-center justify-between gap-3">
            <span>{label}</span>
            <span className="text-[10px] text-[#FAF7F2]/60 font-mono">₹/g</span>
          </div>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4 py-0.5">
              <span className="flex items-center gap-1.5 text-[11px]" style={{ color: entry.color }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: entry.color }} />
                <span className="font-sans">{entry.name}:</span>
              </span>
              <span className="font-bold text-white">
                {formatINR(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-3.5 pt-3.5 border-t border-[#D4AF37]/25 text-[#FAF7F2]">
      {/* Chart Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-[#D4AF37]/20 text-[#E5C158]">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-xs sm:text-sm text-[#E5C158] leading-tight">
              {lang === 'hi' ? 'गत ७ दिनों का भाव रुझान (7-Day Trend)' : '7-Day Price Trend & Analytics'}
            </h4>
            <span className="text-[10px] text-[#FAF7F2]/60">
              {lang === 'hi' ? 'प्रति ग्राम दैनिक उतार-चढ़ाव' : 'Daily price movement per gram'}
            </span>
          </div>
        </div>

        {/* Metric Selector Buttons */}
        <div className="flex items-center p-0.5 bg-[#1C0307] border border-[#D4AF37]/30 rounded-lg text-xs">
          <button
            onClick={() => setSelectedMetric('both_gold')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
              selectedMetric === 'both_gold'
                ? 'bg-[#4A0E17] text-[#E5C158] font-bold shadow-xs'
                : 'text-[#FAF7F2]/70 hover:text-white'
            }`}
          >
            {lang === 'hi' ? '24K + 22K सोना' : '24K & 22K Gold'}
          </button>
          <button
            onClick={() => setSelectedMetric('gold24k')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
              selectedMetric === 'gold24k'
                ? 'bg-[#4A0E17] text-[#E5C158] font-bold shadow-xs'
                : 'text-[#FAF7F2]/70 hover:text-white'
            }`}
          >
            24K
          </button>
          <button
            onClick={() => setSelectedMetric('gold22k')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
              selectedMetric === 'gold22k'
                ? 'bg-[#4A0E17] text-[#E5C158] font-bold shadow-xs'
                : 'text-[#FAF7F2]/70 hover:text-white'
            }`}
          >
            22K (916)
          </button>
          <button
            onClick={() => setSelectedMetric('silver999')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
              selectedMetric === 'silver999'
                ? 'bg-[#4A0E17] text-slate-200 font-bold shadow-xs'
                : 'text-[#FAF7F2]/70 hover:text-white'
            }`}
          >
            {lang === 'hi' ? 'चांदी (Silver)' : 'Silver'}
          </button>
        </div>
      </div>

      {/* 7-Day High / Low / Net Change Quick Bar */}
      {stats && (
        <div className="grid grid-cols-3 gap-2 mb-3 bg-[#1C0307]/80 p-2 sm:p-2.5 rounded-lg border border-[#D4AF37]/20 text-[11px] font-mono">
          {/* Low */}
          <div>
            <span className="text-[10px] text-[#FAF7F2]/60 font-sans block">
              {lang === 'hi' ? '७ दिन का न्यूनतम (Low)' : '7-Day Low'}
            </span>
            <span className="font-bold text-[#FAF7F2]">
              {selectedMetric === 'silver999'
                ? formatINR(stats.lowSilver)
                : selectedMetric === 'gold22k'
                ? formatINR(stats.low22k)
                : formatINR(stats.low24k)}
            </span>
          </div>

          {/* High */}
          <div>
            <span className="text-[10px] text-[#FAF7F2]/60 font-sans block">
              {lang === 'hi' ? '७ दिन का उच्चतम (High)' : '7-Day High'}
            </span>
            <span className="font-bold text-[#E5C158]">
              {selectedMetric === 'silver999'
                ? formatINR(stats.highSilver)
                : selectedMetric === 'gold22k'
                ? formatINR(stats.high22k)
                : formatINR(stats.high24k)}
            </span>
          </div>

          {/* Net Change */}
          <div className="text-right">
            <span className="text-[10px] text-[#FAF7F2]/60 font-sans block">
              {lang === 'hi' ? '७ दिन का शुद्ध बदलाव' : '7-Day Change'}
            </span>
            {(() => {
              const changeVal =
                selectedMetric === 'silver999'
                  ? stats.changeSilver
                  : selectedMetric === 'gold22k'
                  ? stats.change22k
                  : stats.change24k;
              const changePct =
                selectedMetric === 'silver999'
                  ? stats.changeSilverPercent
                  : selectedMetric === 'gold22k'
                  ? stats.change22kPercent
                  : stats.change24kPercent;
              const isPositive = changeVal >= 0;

              return (
                <div
                  className={`inline-flex items-center gap-0.5 font-bold ${
                    isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  <span>
                    {isPositive ? '+' : ''}
                    {formatINR(changeVal)} ({isPositive ? '+' : ''}
                    {changePct}%)
                  </span>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Recharts Line Chart Container */}
      <div className="h-48 sm:h-56 w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D4AF37" strokeOpacity={0.15} vertical={false} />
            <XAxis
              dataKey={lang === 'hi' ? 'dayLabelHi' : 'dayLabelEn'}
              stroke="#D4AF37"
              strokeOpacity={0.7}
              tick={{ fill: '#F3ECE0', fontSize: 10 }}
              tickLine={{ stroke: '#D4AF37', strokeOpacity: 0.3 }}
            />
            <YAxis
              domain={yDomain}
              stroke="#D4AF37"
              strokeOpacity={0.7}
              tick={{ fill: '#F3ECE0', fontSize: 10 }}
              tickFormatter={(v) => `₹${v >= 1000 ? Math.round(v) : v}`}
              tickLine={{ stroke: '#D4AF37', strokeOpacity: 0.3 }}
              width={48}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '8px', fontSize: '11px', color: '#FAF7F2' }}
              iconType="circle"
            />

            {/* 24K Gold Line */}
            {(selectedMetric === 'gold24k' || selectedMetric === 'both_gold') && (
              <Line
                type="monotone"
                dataKey="gold24k"
                name={lang === 'hi' ? '24K सोना (शुद्ध)' : '24K Gold (Fine)'}
                stroke="#E5C158"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#E5C158', strokeWidth: 1, stroke: '#4A0E17' }}
                activeDot={{ r: 5, fill: '#FFF', stroke: '#E5C158', strokeWidth: 2 }}
              />
            )}

            {/* 22K Gold Line */}
            {(selectedMetric === 'gold22k' || selectedMetric === 'both_gold') && (
              <Line
                type="monotone"
                dataKey="gold22k"
                name={lang === 'hi' ? '22K सोना (हॉलमार्क)' : '22K Gold (916)'}
                stroke="#F97316"
                strokeWidth={2}
                dot={{ r: 3, fill: '#F97316', strokeWidth: 1, stroke: '#4A0E17' }}
                activeDot={{ r: 5, fill: '#FFF', stroke: '#F97316', strokeWidth: 2 }}
              />
            )}

            {/* Silver Line */}
            {selectedMetric === 'silver999' && (
              <Line
                type="monotone"
                dataKey="silver999"
                name={lang === 'hi' ? 'चांदी (999/925)' : 'Silver (999)'}
                stroke="#E2E8F0"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#E2E8F0', strokeWidth: 1, stroke: '#4A0E17' }}
                activeDot={{ r: 5, fill: '#FFF', stroke: '#E2E8F0', strokeWidth: 2 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="text-[10px] text-[#FAF7F2]/50 text-center mt-1">
        {lang === 'hi'
          ? 'स्रोत: ऐतिहासिक स्थानीय सर्राफा संघ दैनिक क्लोजिंग दरें एवं लाइव भाव'
          : 'Source: Recorded daily closing rates & live sarafa benchmarks'}
      </div>
    </div>
  );
};
