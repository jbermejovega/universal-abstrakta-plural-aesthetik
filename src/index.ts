import { parseHex } from './math/color.js'
import { buildCompatibilityMatrix } from './algorithm/compatibility.js'
import { buildPalette } from './algorithm/palette.js'
import { toCSSTokens as _toCSSTokens } from './output/tokens.js'
import { buildPaletteUsage } from './output/usage.js'
import { validatePairings as _validatePairings, checkContrast as _checkContrast } from './output/validation.js'
import type { PaletteResult, Theme } from './types.js'

export function generatePalette(hex: string, theme: Theme): PaletteResult {
  const parsed = parseHex(hex)
  const palette = buildPalette(parsed, theme)
  const compatibility = buildCompatibilityMatrix(palette, theme)
  const usage = buildPaletteUsage(palette, compatibility, theme)
  return { palette, usage, theme, sourceColor: parsed }
}

export function toCSSTokens(result: PaletteResult, prefix?: string): string {
  return _toCSSTokens(result, prefix)
}

export const validatePairings = _validatePairings
export const checkContrast = _checkContrast

export type {
  PaletteResult,
  Palette,
  ShadeEntry,
  ContrastLevel,
  Theme,
  ShadeKey,
  MatrixKey,
  HexColor,
  CSSTokens,
  BackgroundKey,
  CompatiblePair,
  ShadeUsage,
  PaletteUsage,
  CompatibilityEntry,
  CompatibilityMatrix,
} from './types.js'

export type { PairingLevel, PairingResult, ValidationReport, ContrastCheckResult } from './output/validation.js'
