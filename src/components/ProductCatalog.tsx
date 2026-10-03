import React, { useState, useMemo } from 'react';
import { Product, LiveRates, Language, ShopSettings, ProductCategory, MetalType } from '../types';
import { ProductCard } from './ProductCard';
import { calculateProductPrice, formatINR } from '../utils/pricing';
import { MandalaDivider } from './IndianMotifs';
import { Filter, ArrowUpDown, Sparkles, X } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  rates: LiveRates;
  settings: ShopSettings;
  lang: Language;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ products, rates, settings, lang }) => {
  const [selectedMetal, setSelectedMetal] = useState<'all' | MetalType>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [selectedPurity, setSelectedPurity] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(600000);
  const [sortBy, setSortBy] = useState<'featured' | 'priceAsc' | 'priceDesc' | 'weightAsc' | 'weightDesc'>('featured');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  // Categories list with Hindi and English labels
  const categories: { id: string; nameHi: string; nameEn: string }[] = [
    { id: 'all', nameHi: 'सभी आभूषण', nameEn: 'All Jewellery' },
    { id: 'dulhan_set', nameHi: 'दुल्हन सेट (Dulhan Set)', nameEn: 'Bridal Set' },
    { id: 'borla_rakhdi', nameHi: 'बोरला और रखड़ी (Borla)', nameEn: 'Borla & Rakhdi' },
    { id: 'nath', nameHi: 'नथ (Royal Nath)', nameEn: 'Nath' },
    { id: 'mangalsutra', nameHi: 'मंगलसूत्र (Mangalsutra)', nameEn: 'Mangalsutra' },
    { id: 'kada_chudi', nameHi: 'कड़ा और चूड़ियां (Kada)', nameEn: 'Kada & Bangles' },
    { id: 'kundan', nameHi: 'कुंदन व पोलकी (Kundan)', nameEn: 'Kundan Jewellery' },
    { id: 'meenakari', nameHi: 'मीनाकारी (Meenakari)', nameEn: 'Meenakari' },
    { id: 'temple', nameHi: 'मंदिर आभूषण (Temple)', nameEn: 'Temple Jewellery' },
    { id: 'payal_bichhiya', nameHi: 'पायल और बिछिया (Payal)', nameEn: 'Payal & Bichhiya' },
    { id: 'silver_article', nameHi: 'चांदी के सिक्के व पात्र', nameEn: 'Silver Articles' },
    { id: 'ring', nameHi: 'अंगूठी (Rings)', nameEn: 'Rings' },
    { id: 'chain', nameHi: 'सोने की चैन (Chains)', nameEn: 'Chains' },
  ];

  // Occasions list
  const occasions = [
    { id: 'all', nameHi: 'सभी अवसर', nameEn: 'All Occasions' },
    { id: 'wedding', nameHi: 'विवाह व लगन', nameEn: 'Wedding' },
    { id: 'bride', nameHi: 'दुल्हन हेतु', nameEn: 'For Bride' },
    { id: 'festive', nameHi: 'त्योहार व पूजा', nameEn: 'Festive & Pooja' },
    { id: 'teej', nameHi: 'तीज व गणगौर', nameEn: 'Teej & Gangaur' },
    { id: 'karwa_chauth', nameHi: 'करवा चौथ', nameEn: 'Karwa Chauth' },
    { id: 'daily', nameHi: 'दैनिक पहनना', nameEn: 'Daily Wear' },
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedMetal !== 'all' && p.metal !== selectedMetal) return false;
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        if (selectedPurity !== 'all' && p.purity !== selectedPurity) return false;
        if (selectedOccasion !== 'all' && !p.occasionTags.includes(selectedOccasion)) return false;

        const price = calculateProductPrice(p, rates, settings.gstPercent).total;
        if (price > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        const priceA = calculateProductPrice(a, rates, settings.gstPercent).total;
        const priceB = calculateProductPrice(b, rates, settings.gstPercent).total;

        if (sortBy === 'priceAsc') return priceA - priceB;
        if (sortBy === 'priceDesc') return priceB - priceA;
        if (sortBy === 'weightAsc') return a.grossWeight - b.grossWeight;
        if (sortBy === 'weightDesc') return b.grossWeight - a.grossWeight;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedMetal, selectedCategory, selectedPurity, selectedOccasion, maxPrice, sortBy, rates, settings]);

  const resetFilters = () => {
    setSelectedMetal('all');
    setSelectedCategory('all');
    setSelectedOccasion('all');
    setSelectedPurity('all');
    setMaxPrice(600000);
    setSortBy('featured');
  };

  return (
    <section id="catalogue" className="max-w-7xl mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A671C] uppercase tracking-widest mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{lang === 'hi' ? 'हस्तनिर्मित राजस्थानी आभूषण' : 'Handcrafted Heritage Designs'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#4A0E17]">
          {lang === 'hi' ? 'आभूषण संग्रह एवं ताज़ा हिसाब' : 'Jewellery Collection & Live Estimates'}
        </h2>
        <p className="mt-1 text-sm text-[#5C450C]/80">
          {lang === 'hi'
            ? 'आज के लाइव सोने व चांदी के भाव पर स्वतः आकलित पारदर्शी मूल्य। कोई छुपा चार्ज नहीं।'
            : 'Transparent prices automatically calculated on today live gold and silver rates.'}
        </p>
        <MandalaDivider className="my-3" />
      </div>

      {/* Primary Category Quick-Tabs */}
      <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#4A0E17] text-[#FAF7F2] shadow-sm font-semibold'
                  : 'bg-[#FAF5EE] text-[#5C450C] hover:bg-[#F3ECE0] border border-[#D4AF37]/30'
              }`}
            >
              {lang === 'hi' ? cat.nameHi : cat.nameEn}
            </button>
          );
        })}
      </div>

      {/* Secondary Controls Bar: Metal Toggle, Filter trigger, Sort */}
      <div className="mt-4 p-3 bg-[#FAF5EE] border border-[#D4AF37]/30 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
        {/* Metal Toggle */}
        <div className="flex items-center p-1 bg-[#FAF7F2] rounded-lg border border-[#D4AF37]/30">
          <button
            onClick={() => setSelectedMetal('all')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              selectedMetal === 'all'
                ? 'bg-[#4A0E17] text-[#FAF7F2]'
                : 'text-[#5C450C] hover:text-[#4A0E17]'
            }`}
          >
            {lang === 'hi' ? 'सभी धातु' : 'All Metals'}
          </button>
          <button
            onClick={() => setSelectedMetal('gold')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              selectedMetal === 'gold'
                ? 'bg-[#B38622] text-[#FAF7F2]'
                : 'text-[#5C450C] hover:text-[#B38622]'
            }`}
          >
            {lang === 'hi' ? 'सोना (Gold)' : 'Gold'}
          </button>
          <button
            onClick={() => setSelectedMetal('silver')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              selectedMetal === 'silver'
                ? 'bg-[#475569] text-white'
                : 'text-[#5C450C] hover:text-slate-800'
            }`}
          >
            {lang === 'hi' ? 'चांदी (Silver)' : 'Silver'}
          </button>
        </div>

        {/* Sort & Filter Controls */}
        <div className="flex items-center gap-2">
          {/* Filter Modal / Drawer Trigger */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D4AF37]/40 bg-white text-xs font-medium text-[#4A0E17] hover:bg-[#FAF7F2]"
          >
            <Filter className="w-3.5 h-3.5 text-[#B38622]" />
            <span>{lang === 'hi' ? 'फ़िल्टर' : 'Filter'}</span>
            {(selectedOccasion !== 'all' || selectedPurity !== 'all' || maxPrice < 600000) && (
              <span className="w-2 h-2 rounded-full bg-[#B38622]" />
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#D4AF37]/40 bg-white text-xs font-medium text-[#4A0E17]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#B38622]" />
            <select
              value={sortBy}
              aria-label={lang === 'hi' ? 'क्रमबद्ध करें' : 'Sort by'}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border-none focus:outline-hidden text-xs text-[#4A0E17] cursor-pointer"
            >
              <option value="featured">{lang === 'hi' ? 'विशेष पसंद (Featured)' : 'Featured'}</option>
              <option value="priceAsc">{lang === 'hi' ? 'कीमत: कम से ज्यादा' : 'Price: Low to High'}</option>
              <option value="priceDesc">{lang === 'hi' ? 'कीमत: ज्यादा से कम' : 'Price: High to Low'}</option>
              <option value="weightAsc">{lang === 'hi' ? 'वजन: हल्का से भारी' : 'Weight: Low to High'}</option>
              <option value="weightDesc">{lang === 'hi' ? 'वजन: भारी से हल्का' : 'Weight: High to Low'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Collapsible Advanced Filters Drawer */}
      {isFilterOpen && (
        <div className="mt-3 p-4 bg-white border border-[#D4AF37]/40 rounded-xl shadow-md text-xs text-[#2E050C] animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-[#D4AF37]/20 font-semibold text-sm text-[#4A0E17]">
            <span className="flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-[#B38622]" />
              {lang === 'hi' ? 'विस्तृत फ़िल्टर विकल्प' : 'Advanced Filters'}
            </span>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="p-1 hover:bg-[#FAF5EE] rounded text-stone-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
            {/* Occasion Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-[#8A671C] uppercase mb-1">
                {lang === 'hi' ? 'अवसर / उपयोग' : 'Occasion'}
              </label>
              <select
                value={selectedOccasion}
                onChange={(e) => setSelectedOccasion(e.target.value)}
                className="w-full p-2 bg-[#FAF7F2] border border-[#D4AF37]/30 rounded text-xs focus:ring-1 focus:ring-[#B38622] outline-hidden"
              >
                {occasions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {lang === 'hi' ? o.nameHi : o.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Purity Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-[#8A671C] uppercase mb-1">
                {lang === 'hi' ? 'शुद्धता (कैरेट/हॉलमार्क)' : 'Purity / Hallmark'}
              </label>
              <select
                value={selectedPurity}
                onChange={(e) => setSelectedPurity(e.target.value)}
                className="w-full p-2 bg-[#FAF7F2] border border-[#D4AF37]/30 rounded text-xs focus:ring-1 focus:ring-[#B38622] outline-hidden"
              >
                <option value="all">{lang === 'hi' ? 'सभी शुद्धता' : 'All Purities'}</option>
                <option value="22K">22K (916 Hallmark)</option>
                <option value="18K">18K (750 Hallmark)</option>
                <option value="24K">24K (999 Pure)</option>
                <option value="925">925 Pure Silver</option>
                <option value="999">999 Pure Silver</option>
              </select>
            </div>

            {/* Max Budget Slider */}
            <div>
              <div className="flex justify-between text-[11px] font-semibold text-[#8A671C] uppercase mb-1">
                <span>{lang === 'hi' ? 'अधिकतम बजट' : 'Max Budget'}</span>
                <span className="text-[#4A0E17] font-mono">{formatINR(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="600000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                className="w-full accent-[#4A0E17] cursor-pointer"
              />
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-[#D4AF37]/20 flex justify-end">
            <button
              onClick={resetFilters}
              className="text-xs text-[#8A671C] hover:text-[#4A0E17] underline font-medium cursor-pointer"
            >
              {lang === 'hi' ? 'सभी फ़िल्टर साफ़ करें' : 'Reset All Filters'}
            </button>
          </div>
        </div>
      )}

      {/* Results Count & Current Filter Indicators */}
      <div className="mt-3 flex items-center justify-between text-xs text-[#8A671C]">
        <span>
          {lang === 'hi'
            ? `कुल ${filteredProducts.length} आभूषण उपलब्ध हैं`
            : `Showing ${filteredProducts.length} items`}
        </span>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              rates={rates}
              settings={settings}
              lang={lang}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 text-center py-12 px-4 bg-white rounded-xl border border-dashed border-[#D4AF37]/50 max-w-lg mx-auto">
          <p className="text-base font-semibold text-[#4A0E17]">
            {lang === 'hi' ? 'इस फ़िल्टर में कोई आभूषण नहीं मिला' : 'No items match your filter criteria'}
          </p>
          <p className="text-xs text-[#8A671C] mt-1">
            {lang === 'hi' ? 'कृपया बजट या श्रेणी बदलकर देखें' : 'Try increasing your budget or selecting all categories'}
          </p>
          <button
            onClick={resetFilters}
            className="mt-3 px-4 py-1.5 bg-[#4A0E17] text-[#FAF7F2] text-xs font-semibold rounded-lg hover:bg-[#6B1724]"
          >
            {lang === 'hi' ? 'फ़िल्टर हटाएं' : 'Reset Filters'}
          </button>
        </div>
      )}
    </section>
  );
};
