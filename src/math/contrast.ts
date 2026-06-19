import { hexToRGB } from './color.js'
import type { HexColor, RGB } from '../types.js'

export function toLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

export function relativeLuminance(rgb: RGB): number {
  return (
    0.2126 * toLinear(rgb.r) +
    0.7152 * toLinear(rgb.g) +
    0.0722 * toLinear(rgb.b)
  )
}

// Returns the WCAG 2.2 contrast ratio at full float precision.
// Uses relative luminance (IEC 61966-2-1) — not APCA/WCAG 3.
// Never round here — rounding belongs to the display layer (use .toFixed(2)).
// Threshold comparisons must use the raw value so the algorithm doesn't claim
// 4.50 when the real ratio is 4.495 (which axe and Firefox DevTools would fail).
export function contrastRatio(a: RGB, b: RGB): number {
  const l1 = Math.max(relativeLuminance(a), relativeLuminance(b))
  const l2 = Math.min(relativeLuminance(a), relativeLuminance(b))
  return (l1 + 0.05) / (l2 + 0.05)
}

export function contrastRatioHex(a: HexColor, b: HexColor): number {
  return contrastRatio(hexToRGB(a), hexToRGB(b))
}
