import { describe, expect, it } from 'vitest'
import { generatePalette } from '../../src/index.js'
import { buildCompatMatrix } from '../../src/output/tokens.js'
import { validatePairings, checkContrast } from '../../src/output/validation.js'

const result = generatePalette('#1f7a54', 'white')
const matrix = buildCompatMatrix(result)

describe('validatePairings', () => {
  it('returns aa-normal for a known body-text pairing (shade-700 on white)', () => {
    const report = validatePairings(result, [{ foreground: '700', background: 'white' }])
    expect(report.allPass).toBe(true)
    expect(report.pairings[0].level).toBe('aa-normal')
    expect(report.pairings[0].message).toContain('✓')
    expect(report.pairings[0].hex).toBe(matrix['700'].hex)
  })

  it('returns aa-large for a large-text-only pairing', () => {
    const shadeWithLarge = Object.entries(matrix).find(([, v]) => v.largeText.length > 0)
    if (!shadeWithLarge) return
    const [fg, data] = shadeWithLarge
    const bg = data.largeText[0]!
    // Only test if this background is NOT also in bodyText (true large-text-only pair)
    if (data.bodyText.includes(bg)) return
    const report = validatePairings(result, [{ foreground: fg, background: bg }])
    expect(report.pairings[0].level).toBe('aa-large')
    expect(report.pairings[0].message).toContain('⚠')
  })

  it('returns fail for bg-only shade used as foreground', () => {
    if (!matrix['100'].bgOnly) return
    const report = validatePairings(result, [{ foreground: '100', background: 'white' }])
    expect(report.allPass).toBe(false)
    expect(report.pairings[0].level).toBe('fail')
    expect(report.pairings[0].message).toContain('bg-only')
  })

  it('returns fail when shade-background combo is not in the matrix (shade-300 on white)', () => {
    // shade-300 is too light to meet any contrast threshold on white
    const report = validatePairings(result, [{ foreground: '300', background: 'white' }])
    expect(report.pairings[0].level).toBe('fail')
    expect(report.pairings[0].message).toContain('✗')
    expect(report.pairings[0].message).toContain('FAILS')
  })

  it('returns invalid for an unknown shade key', () => {
    const report = validatePairings(result, [{ foreground: '500', background: 'white' }])
    expect(report.allPass).toBe(false)
    expect(report.pairings[0].level).toBe('invalid')
    expect(report.pairings[0].message).toContain('500')
    expect(report.pairings[0].hex).toBeUndefined()
  })

  it('returns invalid for non-numeric foreground keys', () => {
    const report = validatePairings(result, [{ foreground: 'primary', background: 'white' }])
    expect(report.pairings[0].level).toBe('invalid')
  })

  it('handles multiple pairings and reports each independently', () => {
    const report = validatePairings(result, [
      { foreground: '700', background: 'white' },
      { foreground: '500', background: 'white' },
    ])
    expect(report.pairings).toHaveLength(2)
    expect(report.pairings[0].level).toBe('aa-normal')
    expect(report.pairings[1].level).toBe('invalid')
  })

  it('allPass is false when any pairing fails', () => {
    const report = validatePairings(result, [
      { foreground: '700', background: 'white' },
      { foreground: '500', background: 'white' },
    ])
    expect(report.allPass).toBe(false)
  })

  it('allPass is true when all pairings pass', () => {
    const validBg = matrix['700'].bodyText[0]!
    const report = validatePairings(result, [
      { foreground: '700', background: validBg },
    ])
    expect(report.allPass).toBe(true)
    expect(report.summary).toContain('✓')
  })

  it('summary contains ✗ when any pairing fails', () => {
    const report = validatePairings(result, [{ foreground: '500', background: 'white' }])
    expect(report.summary).toContain('✗')
  })

  it('handles empty pairings array and reports allPass true', () => {
    const report = validatePairings(result, [])
    expect(report.allPass).toBe(true)
    expect(report.pairings).toHaveLength(0)
  })

  it('includes hex in result for known shade keys', () => {
    const report = validatePairings(result, [{ foreground: '900', background: 'white' }])
    expect(report.pairings[0].hex).toBe(matrix['900'].hex)
  })

  it('fail result includes allowed alternatives in message', () => {
    // shade-300 on white fails — message should list where 300 CAN be used
    const report = validatePairings(result, [{ foreground: '300', background: 'white' }])
    const msg = report.pairings[0].message
    if (!matrix['300'].bgOnly) {
      expect(msg).toMatch(/body-text on:|large-text on:|none/)
    }
  })

  it('works with black theme palette', () => {
    const darkResult = generatePalette('#2dc384', 'black')
    const darkMatrix = buildCompatMatrix(darkResult)
    const validBg = darkMatrix['700'].bodyText[0]!
    const report = validatePairings(darkResult, [{ foreground: '700', background: validBg }])
    expect(report.pairings[0].level).toBe('aa-normal')
  })
})

describe('checkContrast', () => {
  it('returns aa-normal for black text on white background', () => {
    const result = checkContrast('#000000', '#ffffff')
    expect(result.level).toBe('aa-normal')
    expect(result.ratio).toBeGreaterThan(4.6)
    expect(result.message).toContain('✓')
  })

  it('returns fail for two near-identical light colors', () => {
    const result = checkContrast('#eeeeee', '#ffffff')
    expect(result.level).toBe('fail')
    expect(result.message).toContain('✗')
  })

  it('returns aa-large for a ratio between 3.1 and 4.6', () => {
    const result = checkContrast('#8a8a8a', '#ffffff')
    expect(result.level).toBe('aa-large')
    expect(result.message).toContain('⚠')
  })

  it('normalizes hex without leading # and short form', () => {
    const a = checkContrast('000', 'fff')
    const b = checkContrast('#000000', '#ffffff')
    expect(a.ratio).toBe(b.ratio)
    expect(a.foreground).toBe('#000000')
    expect(a.background).toBe('#ffffff')
  })

  it('throws for an invalid hex color', () => {
    expect(() => checkContrast('not-a-color', '#ffffff')).toThrow()
  })

  it('is independent of any generated palette — accepts arbitrary accent colors', () => {
    const accent = checkContrast('#ff5733', '#ffffff')
    expect(['aa-normal', 'aa-large', 'fail']).toContain(accent.level)
  })
})
