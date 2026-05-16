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

export type ContrastLevel = 'aa-normal' | 'aa-large' | 'fail'

export interface CompatibilityEntry {
  ratio: number
  level: ContrastLevel
}

export type CompatibilityMatrix = Record<ShadeKey, Partial<Record<ShadeKey, CompatibilityEntry>>>

export type BackgroundKey = ShadeKey | 'background'

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
