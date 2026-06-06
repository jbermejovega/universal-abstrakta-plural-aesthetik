import { describe, expect, it } from 'vitest'
import { generatePalette } from '../../src/index.js'
import type { ShadeKey } from '../../src/types.js'

const SHADE_KEYS: ShadeKey[] = ['100', '300', '600', '700', '800', '900']

describe('result.usage — white theme', () => {
  const result = generatePalette('#1f7a54', 'white')
  const { usage } = result

  it('has an entry for every shade', () => {
    for (const shade of SHADE_KEYS) {
      expect(usage[shade]).toBeDefined()
    }
  })

  it('each shade entry includes its own hex', () => {
    for (const shade of SHADE_KEYS) {
      expect(usage[shade].hex).toBe(result.palette[shade].hex)
    }
  })

  it('no pair in normalText has ratio < 4.5', () => {
    for (const shade of SHADE_KEYS) {
      for (const pair of usage[shade].normalText) {
        expect(pair.ratio).toBeGreaterThanOrEqual(4.5)
      }
    }
  })

  it('no pair in largeText has ratio < 3 or >= 4.5', () => {
    for (const shade of SHADE_KEYS) {
      for (const pair of usage[shade].largeText) {
        expect(pair.ratio).toBeGreaterThanOrEqual(3.0)
        expect(pair.ratio).toBeLessThan(4.5)
      }
    }
  })

  it('shade 100 on 700 appears in normalText (4.5:1 by construction)', () => {
    const pair = usage['100'].normalText.find((p) => p.key === '700')
    expect(pair).toBeDefined()
    expect(pair!.ratio).toBeGreaterThanOrEqual(4.5)
  })

  it('shade 700 background pair appears in normalText (anchor ~5.1:1)', () => {
    const pair = usage['700'].normalText.find((p) => p.key === 'theme')
    expect(pair).toBeDefined()
    expect(pair!.hex).toBe('#ffffff')
  })

  it('no shade appears in its own normalText or largeText', () => {
    for (const shade of SHADE_KEYS) {
      const allKeys = [
        ...usage[shade].normalText.map((p) => p.key),
        ...usage[shade].largeText.map((p) => p.key),
      ]
      expect(allKeys).not.toContain(shade)
    }
  })
})

describe('result.usage — black theme', () => {
  const result = generatePalette('#239062', 'black')
  const { usage } = result

  it('background pair hex is black', () => {
    for (const shade of SHADE_KEYS) {
      const allPairs = [...usage[shade].normalText, ...usage[shade].largeText]
      const bgPair = allPairs.find((p) => p.key === 'theme')
      if (bgPair) expect(bgPair.hex).toBe('#000000')
    }
  })

  it('shade 700 background pair is in normalText (anchor ~5.1:1)', () => {
    const pair = usage['700'].normalText.find((p) => p.key === 'theme')
    expect(pair).toBeDefined()
    expect(pair!.ratio).toBeGreaterThanOrEqual(4.5)
  })
})
