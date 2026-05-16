import { contrastRatioHex } from '../math/contrast.js'
import type {
  CompatibilityEntry,
  CompatibilityMatrix,
  ContrastLevel,
  Palette,
  ShadeKey,
} from '../types.js'

const SHADE_KEYS: ShadeKey[] = ['100', '300', '600', '700', '800', '900']

export function buildCompatibilityMatrix(palette: Palette): CompatibilityMatrix {
  const matrix = Object.fromEntries(
    SHADE_KEYS.map((key) => [key, {}])
  ) as CompatibilityMatrix

  for (const from of SHADE_KEYS) {
    for (const to of SHADE_KEYS) {
      if (from === to) continue

      const ratio = contrastRatioHex(palette[from].hex, palette[to].hex)

      const level: ContrastLevel =
        ratio >= 4.5 ? 'aa-normal' : ratio >= 3.0 ? 'aa-large' : 'fail'

      const entry: CompatibilityEntry = { ratio, level }
      matrix[from][to] = entry
    }
  }

  return matrix
}
