const DEFAULT_PAYPAL_ME_ID = "chuanchen";
const DEFAULT_ALIPAY_QR_URL = "https://qr.alipay.com/bap02556ygmhsbzmufv00f7";

export type SupportedCurrency = "usd" | "cny";

export function generatePayPalMeLink(amount: number): string {
  const paypalMeId = process.env.AI_SENTINEL_PAYPAL_ME_ID || DEFAULT_PAYPAL_ME_ID;
  return `https://paypal.me/${encodeURIComponent(paypalMeId)}/${amount.toFixed(2)}`;
}

export function generateAlipayDonateLink(amount: number): string {
  const alipayQrUrl = process.env.AI_SENTINEL_ALIPAY_QR_URL || DEFAULT_ALIPAY_QR_URL;
  // 支付宝收款码链接
  return `${alipayQrUrl}`;
}
