import { describe, expect, it } from 'vitest'
import { generatePalette, toCSSTokens } from '../../src/index.js'

const result = generatePalette('#1f7a54', 'white')

const tokenLines = (output: string) =>
  output.split('\n').filter(l => l.trimStart().startsWith('--'))

describe('toCSSTokens', () => {
  it('contains all 6 shade declarations', () => {
    const tokens = toCSSTokens(result)
    for (const key of ['100', '300', '600', '700', '800', '900']) {
      expect(tokens).toContain(`--color-${key}:`)
    }
  })

  it('hex values in output match palette entries', () => {
    const tokens = toCSSTokens(result)
    for (const key of ['100', '300', '600', '700', '800', '900'] as const) {
      expect(tokens).toContain(result.palette[key].hex.toLowerCase())
    }
  })

  it('uses custom prefix when provided', () => {
    const tokens = toCSSTokens(result, 'brand')
    expect(tokens).toContain('--brand-100:')
    expect(tokens).not.toContain('--color-100:')
  })

  it('has no trailing newline', () => {
    const tokens = toCSSTokens(result)
    expect(tokens.endsWith('\n')).toBe(false)
  })

  it('has exactly 6 token declaration lines', () => {
    expect(tokenLines(toCSSTokens(result))).toHaveLength(6)
  })

  it('each token line starts with --prefix-key: #hex;', () => {
    for (const line of tokenLines(toCSSTokens(result))) {
      expect(line).toMatch(/^--color-\d+: #[0-9a-f]{6};/)
    }
  })

  it('each token line ends with an inline comment', () => {
    for (const line of tokenLines(toCSSTokens(result))) {
      expect(line).toContain('/*')
      expect(line).toContain('*/')
    }
  })

  it('output starts with a block comment', () => {
    expect(toCSSTokens(result).startsWith('/*')).toBe(true)
  })

  it('comment includes source color', () => {
    expect(toCSSTokens(result)).toContain('#1f7a54')
  })

  it('comment includes theme', () => {
    expect(toCSSTokens(result)).toContain('white')
  })

  it('block comment has BODY TEXT section', () => {
    expect(toCSSTokens(result)).toContain('BODY TEXT')
  })

  it('block comment has LARGE TEXT ONLY section with PROHIBITED language', () => {
    const tokens = toCSSTokens(result)
    expect(tokens).toContain('LARGE TEXT ONLY')
    expect(tokens).toContain('PROHIBITED')
  })

  it('inline comment on aa-normal shade contains ✅', () => {
    const lines = tokenLines(toCSSTokens(result))
    const hasBody = lines.some(l => l.includes('✅'))
    expect(hasBody).toBe(true)
  })

  it('inline comment on large-only shade contains ⚠️', () => {
    const lines = tokenLines(toCSSTokens(result))
    const hasLarge = lines.some(l => l.includes('⚠️'))
    expect(hasLarge).toBe(true)
  })

  it('comment includes shade hex values for reference', () => {
    const tokens = toCSSTokens(result)
    for (const key of ['100', '300', '600', '700', '800', '900'] as const) {
      expect(tokens).toContain(result.palette[key].hex)
    }
  })
})
