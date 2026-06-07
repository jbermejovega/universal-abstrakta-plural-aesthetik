import type { PaletteResult, ShadeKey } from '../types.js'
import { buildCompatMatrix } from './tokens.js'

const VALID_SHADE_KEYS = new Set<string>(['100', '300', '600', '700', '800', '900'])

export type PairingLevel = 'aa-normal' | 'aa-large' | 'fail' | 'invalid'

export interface PairingResult {
  foreground: string
  background: string
  level: PairingLevel
  hex?: string
  message: string
}

export interface ValidationReport {
  summary: string
  allPass: boolean
  pairings: PairingResult[]
}

export function validatePairings(
  result: PaletteResult,
  pairings: Array<{ foreground: string; background: string }>,
): ValidationReport {
  const matrix = buildCompatMatrix(result)

  const results: PairingResult[] = pairings.map(({ foreground, background }) => {
    if (!VALID_SHADE_KEYS.has(foreground)) {
      return {
        foreground,
        background,
        level: 'invalid',
        message: `"${foreground}" is not a valid shade key — use 100, 300, 600, 700, 800, or 900`,
      }
    }

    const shade = matrix[foreground as ShadeKey]

    if (shade.bgOnly) {
      return {
        foreground,
        background,
        level: 'fail',
        hex: shade.hex,
        message: `shade-${foreground} (${shade.hex}) is bg-only — no accessible text pairings exist. Use it as a background only.`,
      }
    }

    if (shade.bodyText.includes(background)) {
      return {
        foreground,
        background,
        level: 'aa-normal',
        hex: shade.hex,
        message: `✓ shade-${foreground} on ${background}: AA normal (≥4.5:1) — safe for any font size`,
      }
    }

    if (shade.largeText.includes(background)) {
      return {
        foreground,
        background,
        level: 'aa-large',
        hex: shade.hex,
        message: `⚠ shade-${foreground} on ${background}: AA large text only (3:1–4.5:1) — requires ≥24px or ≥18.67px bold`,
      }
    }

    const allowed = [
      shade.bodyText.length ? `body-text on: ${shade.bodyText.join(', ')}` : '',
      shade.largeText.length ? `large-text on: ${shade.largeText.join(', ')}` : '',
    ]
      .filter(Boolean)
      .join(' | ')

    return {
      foreground,
      background,
      level: 'fail',
      hex: shade.hex,
      message: `✗ shade-${foreground} on ${background}: FAILS WCAG AA. Allowed: ${allowed || 'none'}`,
    }
  })

  const allPass = results.every(r => r.level === 'aa-normal' || r.level === 'aa-large')

  return {
    summary: allPass
      ? '✓ All pairings pass WCAG AA'
      : '✗ One or more pairings fail WCAG AA — fix before generating CSS',
    allPass,
    pairings: results,
  }
}
