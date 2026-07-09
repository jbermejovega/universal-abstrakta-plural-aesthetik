import { generatePalette, validatePairings } from 'accessible-color-palette'

import type {
  SigilPaletteFlow,
  SigilPaletteLintInput,
  SigilPaletteLintResult,
} from './pdg-types.js'

export const UAPA_SIGIL_ACCESSIBLE_PALETTE_LINTER_ID = 'UAPA_SIGIL_ACCESSIBLE_PALETTE_LINTER_V1'

export function lintAccessiblePalette(input: SigilPaletteLintInput): SigilPaletteLintResult {
  const palette = generatePalette(input.sourceHex, input.theme)
  const report = validatePairings(palette, input.requiredPairs)
  const reasons = report.pairings
    .filter(pairing => pairing.level === 'fail' || pairing.level === 'invalid')
    .map(pairing => pairing.message)

  return {
    accepted: report.allPass,
    primitive: 'PACAPDG_ACCESSIBLE_PAIRING',
    reasons,
    pacapdg: {
      piFixed: report.allPass,
      tracePreserved: true,
      noIdentityTransport: true,
      externalDependency: 'accessible-color-palette',
    },
  }
}

export function buildSigilPaletteFlow(input: SigilPaletteLintInput): SigilPaletteFlow {
  return {
    id: UAPA_SIGIL_ACCESSIBLE_PALETTE_LINTER_ID,
    input,
    result: lintAccessiblePalette(input),
    invariants: {
      wcagAaChecked: true,
      pacauapBoundaryPreserved: true,
      qquappFlow: true,
    },
  }
}
