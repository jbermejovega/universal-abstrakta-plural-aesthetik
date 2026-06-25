import type { PaletteResult, ShadeKey } from '../types.js'
import { buildCompatMatrix } from './tokens.js'
import { parseHex } from '../math/color.js'
import { contrastRatioHex } from '../math/contrast.js'
import { AA_NORMAL, AA_LARGE } from '../algorithm/thresholds.js'

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

export interface ContrastCheckResult {
  foreground: string
  background: string
  ratio: number
  level: 'aa-normal' | 'aa-large' | 'fail'
  message: string
}

// Standalone contrast check between two arbitrary hex colors — not tied to a
// generated palette. Used to validate accent colors (or any free-form hex)
// against a known background, e.g. white/black or a shade hex already
// returned by generate_palette/validate_pairings.
export function checkContrast(foregroundHex: string, backgroundHex: string): ContrastCheckResult {
  const foreground = parseHex(foregroundHex)
  const background = parseHex(backgroundHex)
  const ratio = contrastRatioHex(foreground, background)

  if (ratio >= AA_NORMAL) {
    return {
      foreground,
      background,
      ratio,
      level: 'aa-normal',
      message: `✓ ${foreground} on ${background}: ${ratio.toFixed(2)}:1 — AA normal (≥4.5:1), safe for any font size`,
    }
  }

  if (ratio >= AA_LARGE) {
    return {
      foreground,
      background,
      ratio,
      level: 'aa-large',
      message: `⚠ ${foreground} on ${background}: ${ratio.toFixed(2)}:1 — AA large text only (3:1–4.5:1), requires ≥24px or ≥18.67px bold`,
    }
  }

  return {
    foreground,
    background,
    ratio,
    level: 'fail',
    message: `✗ ${foreground} on ${background}: ${ratio.toFixed(2)}:1 — FAILS WCAG AA (below 3:1)`,
  }
}
