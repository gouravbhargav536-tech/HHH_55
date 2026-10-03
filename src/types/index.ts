export type Language = 'hi' | 'en';

export type MetalType = 'gold' | 'silver';

export type GoldPurity = '24K' | '22K' | '18K' | '14K';
export type SilverPurity = '999' | '925' | '800';
export type Purity = GoldPurity | SilverPurity;

export type MakingType = 'percent' | 'perGram' | 'flat';

export type ProductCategory = 
  | 'mangalsutra'
  | 'nath'
  | 'maang_tikka'
  | 'borla_rakhdi'
  | 'kundan'
  | 'polki'
  | 'meenakari'
  | 'temple'
  | 'payal_bichhiya'
  | 'kada_chudi'
  | 'dulhan_set'
  | 'necklace'
  | 'earrings'
  | 'ring'
  | 'chain'
  | 'silver_article';

export interface Product {
  id: string;
  nameHi: string;
  nameEn: string;
  category: ProductCategory;
  metal: MetalType;
  purity: Purity;
  grossWeight: number; // in grams
  stoneWeight: number; // in grams
  makingType: MakingType;
  makingValue: number; // % or ₹/g or flat ₹
  stoneCharge: number; // in ₹
  occasionTags: string[];
  image: string;
  descriptionHi: string;
  descriptionEn: string;
  inStock: boolean;
  featured?: boolean;
}

export interface PriceBreakdown {
  grossWeight: number;
  stoneWeight: number;
  netWeight: number;
  ratePerGram: number;
  metalValue: number;
  makingCharge: number;
  stoneCharge: number;
  subtotal: number;
  gstPercent: number;
  gstAmount: number;
  total: number;
}

export interface LiveRates {
  // Gold per gram
  gold24k: number;
  gold22k: number;
  gold18k: number;
  gold14k: number;
  // Silver per gram
  silver999: number;
  silver925: number;
  silver800: number;

  updatedAt: string; // ISO string
  previousGold24k?: number;
  previousSilver999?: number;
  source: 'goldapi' | 'frankfurter' | 'cache' | 'default' | 'manual';
  isManualOverride: boolean;
}

export interface ShopSettings {
  shopNameHi: string;
  shopNameEn: string;
  taglineHi: string;
  taglineEn: string;
  taglineLocationHi: string;
  taglineLocationEn: string;
  addressHi: string;
  addressEn: string;
  phone: string;
  whatsappNumber: string;
  googleMapsUrl: string;
  openingHoursHi: string;
  openingHoursEn: string;
  
  // Rate adjustment (Indian retail premium / duty / local sarafa market variance)
  rateAdjustmentPercentGold: number;
  rateAdjustmentRsPerGramGold: number;
  rateAdjustmentPercentSilver: number;
  rateAdjustmentRsPerGramSilver: number;

  manualOverride: boolean;
  manualGold24k: number;
  manualSilver999: number;

  gstPercent: number;
  defaultMakingPercent: number;
  oldGoldDeductionPercent: number;

  activeFestivalId: string;
}

export interface FestivalBanner {
  id: string;
  titleHi: string;
  titleEn: string;
  subtitleHi: string;
  subtitleEn: string;
  offerBadgeHi: string;
  offerBadgeEn: string;
  descriptionHi: string;
  descriptionEn: string;
  active: boolean;
  themeColor: string;
}

export interface ShubhMuhurat {
  id: string;
  date: string;
  tithiHi: string;
  tithiEn: string;
  eventHi: string;
  eventEn: string;
  auspiciousHours: string;
  importanceHi: string;
  importanceEn: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  commentHi: string;
  commentEn: string;
  verifiedPurchase: boolean;
}

export interface FaqItem {
  id: string;
  questionHi: string;
  questionEn: string;
  answerHi: string;
  answerEn: string;
  category: 'hallmark' | 'making' | 'exchange' | 'delivery' | 'booking';
}
