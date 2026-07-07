type Brand<T, B> = T & { readonly __brand: B }

export type HexColor = Brand<string, 'HexColor'>
export type Theme = 'white' | 'black'

export type ShadeKey = '100' | '300' | '600' | '700' | '800' | '900'

export type Direction = 'lighten' | 'darken'

export interface HSL {
  h: number  // 0–360
  s: number  // 0–1
  l: number  // 0–1
}

export interface RGB {
  r: number  // 0–1 normalized
  g: number
  b: number
}

export interface ShadeEntry {
  hex: HexColor
  rgb: { r: number; g: number; b: number }
  hsl: { h: number; s: number; l: number }
}

export type Palette = Record<ShadeKey, ShadeEntry>

export type ContrastLevel = 'aa-normal' | 'aa-large (≥24px only)' | 'fail'

export interface CompatibilityEntry {
  ratio: number
  level: ContrastLevel
}

export type MatrixKey = ShadeKey | 'theme'

export type CompatibilityMatrix = Record<MatrixKey, Partial<Record<MatrixKey, CompatibilityEntry>>>

export type BackgroundKey = ShadeKey | 'theme'

export interface CompatiblePair {
  key: BackgroundKey
  hex: HexColor
  ratio: number
}

export interface ShadeUsage {
  hex: HexColor
  normalText: CompatiblePair[]
  largeText: CompatiblePair[]
}

export type PaletteUsage = Record<ShadeKey, ShadeUsage>

export interface PaletteResult {
  palette: Palette
  usage: PaletteUsage
  theme: Theme
  sourceColor: HexColor
}

export type CSSTokens = string

export type PluralSigilStage = 'SIGIL' | 'QUANTIZED' | 'CANONICAL'
export type PluralSigilPrimitiveKind = 'PACAPDG' | 'PACAUAP'
export type PluralSigilRuntime = 'django' | 'qquapp' | 'w3c-wcag' | 'agent'
export type PluralSigilSeverity = 'error' | 'warning'
export type PluralSigilIssueCode = 'KQC_ORDER' | 'WCAG_PAIRING'
export type PluralSigilPairingLevel = 'aa-normal' | 'aa-large' | 'fail' | 'invalid'
export type QquappTeleportationMethod = 'injective-encoder' | 'projective-decoder' | 'self-dual-roundtrip'

export interface QquappEncoder {
  kind: 'injective'
  method: QquappTeleportationMethod
  from: 'PluralSigilInput'
  to: 'PACAPDG | PACAUAP'
}

export interface QquappDecoder {
  kind: 'projective'
  method: QquappTeleportationMethod
  from: 'PluralSigilReport'
  to: 'agent-review | pr-review | canonical-release'
}

export interface QecZooReference {
  repository: 'errorcorrectionzoo/eczoo_data'
  url: 'https://github.com/errorcorrectionzoo/eczoo_data'
  site: 'https://errorcorrectionzoo.org/'
  relation: 'taxonomy-reference'
}

export interface QquappKokompiLibrary {
  name: 'KokompiTyped'
  context: 'QQUAPP'
  categoryContext: 'inf-kat-kont'
  encoder: QquappEncoder
  decoder: QquappDecoder
  selfDual: boolean
  teleportationMethods: QquappTeleportationMethod[]
  qecZooReference: QecZooReference
}

export interface PluralSigilPairing {
  foreground: string
  background: string
}

export interface PluralSigilInjection {
  id: string
  language: string
  code: string
  method?: string
  pairings?: PluralSigilPairing[]
}

export interface PluralSigilInput {
  namespace: string
  sourceHex: string
  theme: Theme
  pairings: PluralSigilPairing[]
  injections: PluralSigilInjection[]
  stages?: PluralSigilStage[]
  cssPrefix?: string
}

export interface PluralSigilFlow {
  stage: PluralSigilStage
  ordinal: number
  invariant: string
  primitive: PluralSigilPrimitiveKind
}

export interface PluralSigilIssue {
  code: PluralSigilIssueCode
  severity: PluralSigilSeverity
  message: string
  path: string
}

export interface PluralSigilValidationPairing {
  foreground: string
  background: string
  level: PluralSigilPairingLevel
  message: string
  hex?: string
}

export interface PluralSigilValidation {
  summary: string
  allPass: boolean
  pairings: PluralSigilValidationPairing[]
}

export interface PluralSigilPayload {
  code?: string
  language?: string
  palette?: PaletteResult
  cssTokens?: CSSTokens
}

export interface PluralSigilPrimitive {
  kind: PluralSigilPrimitiveKind
  id: string
  namespace: string
  method: string
  payload: PluralSigilPayload
  bindings: PluralSigilPairing[]
  flow: PluralSigilFlow[]
  standards: string[]
  exposition: string
}

export interface PluralSigilAgentExposition {
  name: string
  purpose: string
  externalDependency: string
  runtimes: PluralSigilRuntime[]
  standards: string[]
}

export interface PluralSigilRelease {
  fork: string
  canonical: boolean
}

export interface PluralSigilReport {
  ok: boolean
  rule: 'KQC'
  source: 'accessible-color-palette'
  stages: PluralSigilStage[]
  flow: PluralSigilFlow[]
  palette: PaletteResult
  validation: PluralSigilValidation
  primitives: PluralSigilPrimitive[]
  qquapp: QquappKokompiLibrary
  issues: PluralSigilIssue[]
  agentExposition: PluralSigilAgentExposition
  release: PluralSigilRelease
}
