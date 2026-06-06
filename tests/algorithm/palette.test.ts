import { describe, expect, it } from 'vitest'
import {
  buildPalette,
  find100,
  find300,
  find600,
  find700,
  find800,
  find900,
} from '../../src/algorithm/palette.js'
import { contrastRatioHex } from '../../src/math/contrast.js'
import { parseHex } from '../../src/math/color.js'

const WHITE = parseHex('#ffffff')
const BLACK = parseHex('#000000')

// 9 cases: 4 white theme + 5 black theme (#38BDF8 added to cover the 600↔900 edge case)
const figmaCases = [
  { input: '#1A6646', theme: 'white' as const },
  { input: '#AC9FE4', theme: 'white' as const },
  { input: '#DD45AA', theme: 'white' as const },
  { input: '#00BAF5', theme: 'white' as const },
  { input: '#1C734E', theme: 'black' as const },
  { input: '#8FFFA3', theme: 'black' as const },
  { input: '#FF9161', theme: 'black' as const },
  { input: '#1145F8', theme: 'black' as const },
  { input: '#38BDF8', theme: 'black' as const },
]

describe('buildPalette — FigJam cases: WCAG contrast targets', () => {
  for (const { input, theme } of figmaCases) {
    describe(`${input} / ${theme}`, () => {
      const bg = theme === 'white' ? WHITE : BLACK
      const palette = buildPalette(parseHex(input), theme)

      it('shade 700 has >= 4.5:1 contrast on background', () => {
        expect(contrastRatioHex(palette['700'].hex, bg)).toBeGreaterThanOrEqual(4.5)
      })

      it('shade 100 has >= 4.5:1 contrast on shade 700', () => {
        expect(contrastRatioHex(palette['100'].hex, palette['700'].hex)).toBeGreaterThanOrEqual(4.5)
      })

      it('shade 300 has >= 3.0:1 contrast on shade 700', () => {
        expect(contrastRatioHex(palette['300'].hex, palette['700'].hex)).toBeGreaterThanOrEqual(3.0)
      })

      it('shade 600 has >= 3.0:1 contrast on shade 100', () => {
        expect(contrastRatioHex(palette['600'].hex, palette['100'].hex)).toBeGreaterThanOrEqual(3.0)
      })

      it('shade 800 has >= 3.0:1 contrast on shade 600', () => {
        expect(contrastRatioHex(palette['800'].hex, palette['600'].hex)).toBeGreaterThanOrEqual(3.0)
      })

      it('shade 900 has >= 3.0:1 contrast on shade 700', () => {
        expect(contrastRatioHex(palette['900'].hex, palette['700'].hex)).toBeGreaterThanOrEqual(3.0)
      })

      it('shade 900 has >= 4.5:1 contrast on shade 600', () => {
        expect(contrastRatioHex(palette['900'].hex, palette['600'].hex)).toBeGreaterThanOrEqual(4.5)
      })
    })
  }
})

describe('find700', () => {
  it('white theme: result has >= 4.5:1 contrast against white', () => {
    const result = find700(parseHex('#1A6646'), 'white')
    expect(contrastRatioHex(result, WHITE)).toBeGreaterThanOrEqual(4.5)
  })

  it('black theme: result has >= 4.5:1 contrast against black', () => {
    const result = find700(parseHex('#1C734E'), 'black')
    expect(contrastRatioHex(result, BLACK)).toBeGreaterThanOrEqual(4.5)
  })
})

describe('find100', () => {
  it('white theme: result has >= 4.5 contrast against shade700', () => {
    const shade700 = find700(parseHex('#1A6646'), 'white')
    const shade100 = find100(shade700, 'white')
    expect(contrastRatioHex(shade100, shade700)).toBeGreaterThanOrEqual(4.5)
  })

  it('white theme: result is lighter than shade700', () => {
    const shade700 = find700(parseHex('#1A6646'), 'white')
    const shade100 = find100(shade700, 'white')
    expect(contrastRatioHex(shade100, BLACK)).toBeGreaterThan(
      contrastRatioHex(shade700, BLACK)
    )
  })

  it('black theme: result has >= 4.5 contrast against shade700', () => {
    const shade700 = find700(parseHex('#1C734E'), 'black')
    const shade100 = find100(shade700, 'black')
    expect(contrastRatioHex(shade100, shade700)).toBeGreaterThanOrEqual(4.5)
  })

  it('black theme: result is darker than shade700', () => {
    const shade700 = find700(parseHex('#1C734E'), 'black')
    const shade100 = find100(shade700, 'black')
    expect(contrastRatioHex(shade100, WHITE)).toBeGreaterThan(
      contrastRatioHex(shade700, WHITE)
    )
  })
})

describe('find300', () => {
  it('white theme: result has >= 3.0 contrast against shade700', () => {
    const shade700 = find700(parseHex('#1A6646'), 'white')
    expect(contrastRatioHex(find300(shade700, 'white'), shade700)).toBeGreaterThanOrEqual(3.0)
  })

  it('black theme: result has >= 3.0 contrast against shade700', () => {
    const shade700 = find700(parseHex('#1C734E'), 'black')
    expect(contrastRatioHex(find300(shade700, 'black'), shade700)).toBeGreaterThanOrEqual(3.0)
  })
})

describe('find600', () => {
  it('white theme: result has >= 3.0 contrast against shade100', () => {
    const shade700 = find700(parseHex('#1A6646'), 'white')
    const shade100 = find100(shade700, 'white')
    expect(contrastRatioHex(find600(shade100, 'white'), shade100)).toBeGreaterThanOrEqual(3.0)
  })

  it('black theme: result has >= 3.0 contrast against shade100', () => {
    const shade700 = find700(parseHex('#1C734E'), 'black')
    const shade100 = find100(shade700, 'black')
    expect(contrastRatioHex(find600(shade100, 'black'), shade100)).toBeGreaterThanOrEqual(3.0)
  })
})

describe('find800', () => {
  it('white theme: result has >= 3.0 contrast against shade600', () => {
    const shade700 = find700(parseHex('#1A6646'), 'white')
    const shade100 = find100(shade700, 'white')
    const shade600 = find600(shade100, 'white')
    expect(contrastRatioHex(find800(shade600, 'white'), shade600)).toBeGreaterThanOrEqual(3.0)
  })

  it('black theme: result has >= 3.0 contrast against shade600', () => {
    const shade700 = find700(parseHex('#1C734E'), 'black')
    const shade100 = find100(shade700, 'black')
    const shade600 = find600(shade100, 'black')
    expect(contrastRatioHex(find800(shade600, 'black'), shade600)).toBeGreaterThanOrEqual(3.0)
  })
})

describe('find900', () => {
  it('white theme: result has >= 3.0 contrast against shade700', () => {
    const shade700 = find700(parseHex('#1A6646'), 'white')
    const shade100 = find100(shade700, 'white')
    const shade600 = find600(shade100, 'white')
    expect(contrastRatioHex(find900(shade700, shade600, 'white'), shade700)).toBeGreaterThanOrEqual(3.0)
  })

  it('white theme: result is darker than shade700', () => {
    const shade700 = find700(parseHex('#1A6646'), 'white')
    const shade100 = find100(shade700, 'white')
    const shade600 = find600(shade100, 'white')
    const shade900 = find900(shade700, shade600, 'white')
    expect(contrastRatioHex(shade900, WHITE)).toBeGreaterThan(
      contrastRatioHex(shade700, WHITE)
    )
  })

  it('black theme: result has >= 3.0 contrast against shade700', () => {
    const shade700 = find700(parseHex('#1C734E'), 'black')
    const shade100 = find100(shade700, 'black')
    const shade600 = find600(shade100, 'black')
    expect(contrastRatioHex(find900(shade700, shade600, 'black'), shade700)).toBeGreaterThanOrEqual(3.0)
  })

  it('black theme: result is lighter than shade700', () => {
    const shade700 = find700(parseHex('#1C734E'), 'black')
    const shade100 = find100(shade700, 'black')
    const shade600 = find600(shade100, 'black')
    const shade900 = find900(shade700, shade600, 'black')
    expect(contrastRatioHex(shade900, BLACK)).toBeGreaterThan(
      contrastRatioHex(shade700, BLACK)
    )
  })

  it('black theme: result has >= 4.5 contrast against shade600 (#38BDF8 edge case)', () => {
    const shade700 = find700(parseHex('#38BDF8'), 'black')
    const shade100 = find100(shade700, 'black')
    const shade600 = find600(shade100, 'black')
    const shade900 = find900(shade700, shade600, 'black')
    expect(contrastRatioHex(shade900, shade600)).toBeGreaterThanOrEqual(4.5)
  })
})
