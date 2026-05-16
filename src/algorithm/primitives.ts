import { hexToHSL, hexToRGB, hslToHex } from '../math/color.js'
import { relativeLuminance } from '../math/contrast.js'
import type { Direction, HexColor } from '../types.js'

const DEFAULT_STEP = 0.005

export function stepTowardRatio(
  startHex: HexColor,
  referenceHex: HexColor,
  targetRatio: number,
  direction: Direction,
  step: number = DEFAULT_STEP
): HexColor {
  // Pre-compute the reference luminance once — it never changes during iteration
  const refRGB = hexToRGB(referenceHex)
  const refLuminance = relativeLuminance(refRGB)

  const deltaL = direction === 'lighten' ? step : -step
  let hsl = hexToHSL(startHex)

  for (let i = 0; i < 1000; i++) {
    hsl = { ...hsl, l: Math.min(1, Math.max(0, hsl.l + deltaL)) }
    const current = hslToHex(hsl)

    const currentLuminance = relativeLuminance(hexToRGB(current))
    const l1 = Math.max(currentLuminance, refLuminance)
    const l2 = Math.min(currentLuminance, refLuminance)
    const ratio = Math.round(((l1 + 0.05) / (l2 + 0.05)) * 100) / 100

    if (ratio >= targetRatio) return current
  }

  throw new Error(
    `stepTowardRatio: could not reach targetRatio ${targetRatio} in direction ${direction} — color may be at lightness boundary`
  )
}

export function lightenToRatio(
  anchor: HexColor,
  referenceHex: HexColor,
  targetRatio: number
): HexColor {
  return stepTowardRatio(anchor, referenceHex, targetRatio, 'lighten')
}

export function darkenToRatio(
  anchor: HexColor,
  referenceHex: HexColor,
  targetRatio: number
): HexColor {
  return stepTowardRatio(anchor, referenceHex, targetRatio, 'darken')
}
