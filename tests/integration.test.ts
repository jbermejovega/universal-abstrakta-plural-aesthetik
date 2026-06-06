import { describe, expect, it } from 'vitest'
import { generatePalette, toCSSTokens } from '../src/index.js'

const bgRatio = (result: ReturnType<typeof generatePalette>, shade: '100' | '300' | '600' | '700' | '800' | '900') => {
  const allPairs = [...result.usage[shade].normalText, ...result.usage[shade].largeText]
  return allPairs.find((p) => p.key === 'theme')?.ratio ?? 0
}

describe('generatePalette — #1F7A54 white', () => {
  const result = generatePalette('#1F7A54', 'white')

  it('shade 700 passes normal text on background', () => {
    expect(result.usage['700'].normalText.some((p) => p.key === 'theme')).toBe(true)
  })

  it('sourceColor is the parsed input', () => {
    expect(result.sourceColor).toBe('#1f7a54')
  })

  it('theme is preserved in result', () => {
    expect(result.theme).toBe('white')
  })
})

describe('generatePalette — dark theme inverts lightness order', () => {
  const light = generatePalette('#2dc384', 'white')
  const dark = generatePalette('#239062', 'black')

  it('white theme: shade 100 has lower contrast on background than 900', () => {
    expect(bgRatio(light, '100')).toBeLessThan(bgRatio(light, '900'))
  })

  it('black theme: shade 100 has lower contrast on background than 900', () => {
    expect(bgRatio(dark, '100')).toBeLessThan(bgRatio(dark, '900'))
  })
})

describe('generatePalette — #239062 black (expected values from spec)', () => {
  const result = generatePalette('#239062', 'black')

  it('shade 700 is the anchor with >= 4.5 contrast against black', () => {
    const ratio = bgRatio(result, '700')
    expect(ratio).toBeGreaterThanOrEqual(4.5)
    expect(ratio).toBeLessThanOrEqual(6.0)
  })

  it('shade 900 has the highest contrast on background', () => {
    const shades = ['100', '300', '600', '700', '800', '900'] as const
    const ratios = shades.map((s) => bgRatio(result, s))
    expect(bgRatio(result, '900')).toBe(Math.max(...ratios))
  })

  it('shade 100 has the lowest contrast on background', () => {
    const shades = ['100', '300', '600', '700', '800', '900'] as const
    const ratios = shades.map((s) => bgRatio(result, s))
    expect(bgRatio(result, '100')).toBe(Math.min(...ratios))
  })
})

describe('toCSSTokens integration', () => {
  const result = generatePalette('#1f7a54', 'white')

  it('output contains all 6 shade declarations matching palette hex values', () => {
    const tokens = toCSSTokens(result)
    for (const key of ['100', '300', '600', '700', '800', '900'] as const) {
      expect(tokens).toContain(`--color-${key}: ${result.palette[key].hex.toLowerCase()};`)
    }
  })

  it('custom prefix appears in all token declaration lines', () => {
    const tokens = toCSSTokens(result, 'theme')
    const tokenLines = tokens.split('\n').filter(l => l.trimStart().startsWith('--'))
    expect(tokenLines).toHaveLength(6)
    for (const line of tokenLines) {
      expect(line.startsWith('--theme-')).toBe(true)
    }
  })
})

describe('generatePalette — error handling', () => {
  it('throws for invalid hex', () => {
    expect(() => generatePalette('notacolor', 'white')).toThrow()
  })

  it('error message contains the invalid input', () => {
    expect(() => generatePalette('notacolor', 'white')).toThrow('notacolor')
  })

  it('throws for empty string', () => {
    expect(() => generatePalette('', 'white')).toThrow()
  })
})
