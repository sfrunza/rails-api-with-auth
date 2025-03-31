export function formatCentsToDollarsString(
  price: number | null,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "BDT";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {},
) {
  if (!price) price = 0
  const { currency = "USD", notation = "standard" } = options;

  const numericPrice =
    typeof price === "string" ? parseFloat(price) / 100 : price / 100;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

export function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`;
}

export function priceObjectToString(
  price?: { min: number; max: number }
): string {

  if (!price) return "To be determined";

  const { min, max } = price;

  if (min == null || max == null) return "To be determined";

  const minPrice = formatCentsToDollarsString(min);
  const maxPrice = formatCentsToDollarsString(max);

  if (min === max) {
    return maxPrice;
  }

  if (max === 0) {
    return minPrice;
  } else {
    return `${minPrice} - ${maxPrice}`;
  }
}