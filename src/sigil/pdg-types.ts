export type SigilPrimitive =
  | 'PACA_COLOR_TOKEN'
  | 'PACAPDG_ACCESSIBLE_PAIRING'
  | 'PACAUAP_RENDER_BOUNDARY'
  | 'QQUAPP_PALETTE_FLOW'

export type SigilPaletteTheme = 'white' | 'black'

export interface SigilPalettePairing {
  foreground: string
  background: string
}

export interface SigilPaletteLintInput {
  sourceHex: string
  theme: SigilPaletteTheme
  requiredPairs: SigilPalettePairing[]
}

export interface SigilPalettePdgWitness {
  piFixed: boolean
  tracePreserved: true
  noIdentityTransport: true
  externalDependency: 'accessible-color-palette'
}

export interface SigilPaletteLintResult {
  accepted: boolean
  primitive: SigilPrimitive
  reasons: string[]
  pacapdg: SigilPalettePdgWitness
}

export interface SigilPaletteFlow {
  id: 'UAPA_SIGIL_ACCESSIBLE_PALETTE_LINTER_V1'
  input: SigilPaletteLintInput
  result: SigilPaletteLintResult
  invariants: {
    wcagAaChecked: true
    pacauapBoundaryPreserved: true
    qquappFlow: true
  }
}
