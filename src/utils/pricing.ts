import { LiveRates, MetalType, Purity, GoldPurity, MakingType, PriceBreakdown, Product } from '../types';

/**
 * Format numbers according to the Indian numbering system: ₹1,23,456
 */
export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  const rounded = Math.round(amount);
  return '₹' + rounded.toLocaleString('en-IN');
}

/**
 * Format weight in grams (e.g., "12.450 g")
 */
export function formatWeight(grams: number): string {
  if (isNaN(grams) || grams === null || grams === undefined) {
    return '0.000 g';
  }
  return grams.toFixed(3) + ' g';
}

/**
 * Get the rate per gram based on metal and purity from live rates
 */
export function getRatePerGram(metal: MetalType, purity: Purity, rates: LiveRates): number {
  if (metal === 'gold') {
    switch (purity) {
      case '24K':
        return rates.gold24k;
      case '22K':
        return rates.gold22k;
      case '18K':
        return rates.gold18k;
      case '14K':
        return rates.gold14k;
      default:
        return rates.gold22k;
    }
  } else {
    // Silver
    switch (purity) {
      case '999':
        return rates.silver999;
      case '925':
        return rates.silver925;
      case '800':
        return rates.silver800;
      default:
        return rates.silver925;
    }
  }
}

/**
 * Calculate the exact price breakdown for any jewellery item or custom calculation
 */
export function calculateItemPrice(
  grossWeight: number,
  stoneWeight: number,
  metal: MetalType,
  purity: Purity,
  makingType: MakingType,
  makingValue: number,
  stoneCharge: number,
  rates: LiveRates,
  gstPercent: number = 3
): PriceBreakdown {
  const safeGross = Math.max(0, grossWeight || 0);
  const safeStoneWeight = Math.max(0, stoneWeight || 0);
  const netWeight = Math.max(0, safeGross - safeStoneWeight);
  
  const ratePerGram = getRatePerGram(metal, purity, rates);
  const metalValue = netWeight * ratePerGram;

  let makingCharge = 0;
  if (makingType === 'percent') {
    makingCharge = (metalValue * (makingValue || 0)) / 100;
  } else if (makingType === 'perGram') {
    makingCharge = netWeight * (makingValue || 0);
  } else {
    // flat
    makingCharge = makingValue || 0;
  }

  const safeStoneCharge = Math.max(0, stoneCharge || 0);
  const subtotal = metalValue + makingCharge + safeStoneCharge;
  const gstAmount = (subtotal * (gstPercent || 0)) / 100;
  const total = subtotal + gstAmount;

  return {
    grossWeight: safeGross,
    stoneWeight: safeStoneWeight,
    netWeight,
    ratePerGram,
    metalValue: Math.round(metalValue),
    makingCharge: Math.round(makingCharge),
    stoneCharge: Math.round(safeStoneCharge),
    subtotal: Math.round(subtotal),
    gstPercent,
    gstAmount: Math.round(gstAmount),
    total: Math.round(total),
  };
}

/**
 * Helper to compute product price directly from product object
 */
export function calculateProductPrice(
  product: Product,
  rates: LiveRates,
  gstPercent: number = 3
): PriceBreakdown {
  return calculateItemPrice(
    product.grossWeight,
    product.stoneWeight,
    product.metal,
    product.purity,
    product.makingType,
    product.makingValue,
    product.stoneCharge,
    rates,
    gstPercent
  );
}

/**
 * Calculate old gold exchange estimate
 */
export function calculateOldGoldExchange(
  weight: number,
  purity: GoldPurity,
  rates: LiveRates,
  deductionPercent: number = 3
): { pureValue: number; deductionAmount: number; netPayout: number; ratePerGram: number } {
  const safeWeight = Math.max(0, weight || 0);
  const rate = getRatePerGram('gold', purity, rates);
  const grossValue = safeWeight * rate;
  const deductionAmount = (grossValue * deductionPercent) / 100;
  const netPayout = Math.max(0, grossValue - deductionAmount);

  return {
    ratePerGram: rate,
    pureValue: Math.round(grossValue),
    deductionAmount: Math.round(deductionAmount),
    netPayout: Math.round(netPayout),
  };
}

/**
 * Generate a pre-filled WhatsApp link with inquiry message
 */
export function generateWhatsAppLink(phone: string, text: string): string {
  // Clean phone number: remove +, spaces, hyphens
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}
