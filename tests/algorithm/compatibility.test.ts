import { describe, expect, it } from 'vitest'
import { buildCompatibilityMatrix } from '../../src/algorithm/compatibility.js'
import { buildPalette } from '../../src/algorithm/palette.js'
import { parseHex } from '../../src/math/color.js'
import type { MatrixKey } from '../../src/types.js'

const SHADE_KEYS: MatrixKey[] = ['100', '300', '600', '700', '800', '900']
const ALL_KEYS: MatrixKey[] = ['theme', ...SHADE_KEYS]

const palette = buildPalette(parseHex('#1f7a54'), 'white')
const matrix = buildCompatibilityMatrix(palette, 'white')

describe('buildCompatibilityMatrix — #1f7a54 white', () => {
  it('100 vs 700 is aa-normal (>= 4.55 by construction)', () => {
    expect(matrix['100']['700']?.level).toBe('aa-normal')
  })

  it('100 vs 700 ratio >= 4.5 (real WCAG threshold)', () => {
    expect(matrix['100']['700']?.ratio).toBeGreaterThanOrEqual(4.5)
  })

  it('300 vs 700 is aa-large', () => {
    expect(matrix['300']['700']?.level).toBe('aa-large (≥24px only)')
  })

  it('100 vs 300 is fail (both light, low mutual contrast)', () => {
    expect(matrix['100']['300']?.level).toBe('fail')
  })

  it('700 vs 700 is undefined (same shade never compared)', () => {
    expect(matrix['700']['700']).toBeUndefined()
  })

  it('has exactly 42 non-undefined entries (7 keys × 7 minus diagonal)', () => {
    let count = 0
    for (const from of ALL_KEYS) {
      for (const to of ALL_KEYS) {
        if (matrix[from][to] !== undefined) count++
      }
    }
    expect(count).toBe(42)
  })

  it('matrix is not triangular — both directions present for all pairs', () => {
    for (const from of ALL_KEYS) {
      for (const to of ALL_KEYS) {
        if (from === to) continue
        expect(matrix[from][to]).toBeDefined()
        expect(matrix[to][from]).toBeDefined()
      }
    }
  })

  it('ratio is symmetric for all pairs', () => {
    for (const from of ALL_KEYS) {
      for (const to of ALL_KEYS) {
        if (from === to) continue
        expect(matrix[from][to]?.ratio).toBe(matrix[to][from]?.ratio)
      }
    }
  })
})

describe('buildCompatibilityMatrix — theme key as first-class shade', () => {
  it('matrix has a theme row', () => {
    expect(matrix['theme']).toBeDefined()
  })

  it('matrix has a theme column for every shade', () => {
    for (const shade of SHADE_KEYS) {
      expect(matrix[shade]['theme']).toBeDefined()
    }
  })

  it('theme vs theme is undefined', () => {
    expect(matrix['theme']['theme']).toBeUndefined()
  })

  it('shade 700 vs theme (white) is aa-normal', () => {
    expect(matrix['700']['theme']?.level).toBe('aa-normal')
  })

  it('shade 700 vs theme ratio >= 4.5 (real)', () => {
    expect(matrix['700']['theme']?.ratio).toBeGreaterThanOrEqual(4.5)
  })

  it('shade 100 vs theme (white) is fail in white theme — both very light', () => {
    expect(matrix['100']['theme']?.level).toBe('fail')
  })

  it('symmetric: theme vs 700 equals 700 vs theme', () => {
    expect(matrix['theme']['700']?.ratio).toBe(matrix['700']['theme']?.ratio)
  })
})

describe('buildCompatibilityMatrix — black theme inverts theme pairings', () => {
  const darkPalette = buildPalette(parseHex('#239062'), 'black')
  const darkMatrix = buildCompatibilityMatrix(darkPalette, 'black')

  it('shade 700 vs theme (black) is aa-normal', () => {
    expect(darkMatrix['700']['theme']?.level).toBe('aa-normal')
  })

  it('shade 900 vs theme (black) is aa-normal (lightest on black)', () => {
    expect(darkMatrix['900']['theme']?.level).toBe('aa-normal')
  })

  it('shade 100 vs theme (black) is fail in black theme — both very dark', () => {
    expect(darkMatrix['100']['theme']?.level).toBe('fail')
  })
})

describe('buildCompatibilityMatrix — strict WCAG guarantee', () => {
  // Every aa-normal entry must clear the real WCAG 4.5:1 threshold without
  // depending on rounding. This is the property the epsilon fixes.
  it('every aa-normal entry has real ratio >= 4.5', () => {
    for (const from of ALL_KEYS) {
      for (const to of ALL_KEYS) {
        const entry = matrix[from][to]
        if (entry?.level === 'aa-normal') {
          expect(entry.ratio).toBeGreaterThanOrEqual(4.5)
        }
      }
    }
  })

  it('every aa-large entry has real ratio >= 3.0', () => {
    for (const from of ALL_KEYS) {
      for (const to of ALL_KEYS) {
        const entry = matrix[from][to]
        if (entry?.level === 'aa-large (≥24px only)') {
          expect(entry.ratio).toBeGreaterThanOrEqual(3.0)
        }
      }
    }
  })
})
