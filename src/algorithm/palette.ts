import { hexToHSL, hexToRGB, hslToHex, parseHex } from '../math/color.js'
import { contrastRatioHex } from '../math/contrast.js'
import { darkenToRatio, lightenToRatio } from './primitives.js'
import type { HexColor, Palette, ShadeEntry, Theme } from '../types.js'

const WHITE = parseHex('#ffffff')
const BLACK = parseHex('#000000')

const ANCHOR_TARGET = 5.1
const STEP = 0.005

export function find700(inputHex: HexColor, theme: Theme): HexColor {
  const bg = theme === 'white' ? WHITE : BLACK
  const currentRatio = contrastRatioHex(inputHex, bg)

  if (currentRatio === ANCHOR_TARGET) return inputHex

  if (currentRatio < ANCHOR_TARGET) {
    return theme === 'white'
      ? darkenToRatio(inputHex, bg, ANCHOR_TARGET)
      : lightenToRatio(inputHex, bg, ANCHOR_TARGET)
  }

  // currentRatio > ANCHOR_TARGET: reduce contrast by walking toward the background.
  // stepTowardRatio can't do this (it only increases ratio), so we loop manually.
  // We track prev so that if we overshoot below ANCHOR_TARGET we return the last
  // value that was still >= ANCHOR_TARGET.
  const deltaL = theme === 'white' ? STEP : -STEP
  let hsl = hexToHSL(inputHex)
  let prev: HexColor = inputHex

  for (let i = 0; i < 1000; i++) {
    hsl = { ...hsl, l: Math.min(1, Math.max(0, hsl.l + deltaL)) }
    const current = hslToHex(hsl)
    const ratio = contrastRatioHex(current, bg)

    if (ratio <= ANCHOR_TARGET) {
      return ratio < ANCHOR_TARGET ? prev : current
    }

    prev = current
  }

  throw new Error(
    `find700: could not reach ${ANCHOR_TARGET} ratio — color may be at lightness boundary`
  )
}

export function find100(shade700: HexColor, theme: Theme): HexColor {
  return theme === 'white'
    ? lightenToRatio(shade700, shade700, 4.5)
    : darkenToRatio(shade700, shade700, 4.5)
}

export function find300(shade700: HexColor, theme: Theme): HexColor {
  return theme === 'white'
    ? lightenToRatio(shade700, shade700, 3.1)
    : darkenToRatio(shade700, shade700, 3.1)
}

export function find600(shade100: HexColor, theme: Theme): HexColor {
  return theme === 'white'
    ? darkenToRatio(shade100, shade100, 3.1)
    : lightenToRatio(shade100, shade100, 3.1)
}

export function find800(shade600: HexColor, theme: Theme): HexColor {
  return theme === 'white'
    ? darkenToRatio(shade600, shade600, 3.1)
    : lightenToRatio(shade600, shade600, 3.1)
}

export function find900(shade700: HexColor, theme: Theme): HexColor {
  return theme === 'white'
    ? darkenToRatio(shade700, shade700, 3.1)
    : lightenToRatio(shade700, shade700, 3.1)
}

export function buildPalette(inputHex: HexColor, theme: Theme): Palette {
  const shade700hex = find700(inputHex, theme)
  const shade100hex = find100(shade700hex, theme)
  const shade300hex = find300(shade700hex, theme)
  const shade600hex = find600(shade100hex, theme)
  const shade800hex = find800(shade600hex, theme)
  const shade900hex = find900(shade700hex, theme)

  const toEntry = (hex: HexColor): ShadeEntry => {
    const rgb = hexToRGB(hex)
    const hsl = hexToHSL(hex)
    return {
      hex,
      rgb: { r: Math.round(rgb.r * 255), g: Math.round(rgb.g * 255), b: Math.round(rgb.b * 255) },
      hsl: { h: Math.round(hsl.h), s: Math.round(hsl.s * 100), l: Math.round(hsl.l * 100) },
    }
  }

  return {
    '100': toEntry(shade100hex),
    '300': toEntry(shade300hex),
    '600': toEntry(shade600hex),
    '700': toEntry(shade700hex),
    '800': toEntry(shade800hex),
    '900': toEntry(shade900hex),
  }
}
