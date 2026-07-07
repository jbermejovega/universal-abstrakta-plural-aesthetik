import { describe, expect, it } from 'vitest'
import { lintPluralSigil } from '../../src/index.js'
import type { PluralSigilInput } from '../../src/index.js'

const baseInput: PluralSigilInput = {
  namespace: 'uap.ceci.qquapp',
  sourceHex: '#1f7a54',
  theme: 'white',
  cssPrefix: 'uap',
  pairings: [{ foreground: '700', background: 'theme' }],
  injections: [
    {
      id: 'button',
      language: 'css',
      method: 'django-button-flow',
      code: '.button { color: var(--uap-700); background: #fff; }',
      pairings: [{ foreground: '700', background: 'theme' }],
    },
  ],
}

describe('lintPluralSigil', () => {
  it('emits KQC-gated PACAUAP and PACAPDG primitives', () => {
    const report = lintPluralSigil(baseInput)

    expect(report.ok).toBe(true)
    expect(report.source).toBe('accessible-color-palette')
    expect(report.stages).toEqual(['SIGIL', 'QUANTIZED', 'CANONICAL'])
    expect(report.primitives.map((primitive) => primitive.kind)).toEqual(['PACAUAP', 'PACAPDG'])
    expect(report.validation.pairings[0]?.background).toBe('white')
    expect(report.agentExposition.runtimes).toEqual(['django', 'qquapp', 'w3c-wcag', 'agent'])
    expect(report.release).toEqual({
      fork: 'jbermejovega/universal-abstrakta-plural-aesthetik',
      canonical: true,
    })
  })

  it('injects syntax-aware SIGIL headers into code primitives', () => {
    const report = lintPluralSigil(baseInput)
    const codePrimitive = report.primitives.find((primitive) => primitive.kind === 'PACAPDG')

    expect(codePrimitive?.payload.language).toBe('css')
    expect(codePrimitive?.payload.code).toContain('KQC: SIGIL -> QUANTIZED -> CANONICAL')
    expect(codePrimitive?.payload.code).toContain(baseInput.injections[0]?.code)
  })

  it('blocks canonical release when KQC order is not first', () => {
    const report = lintPluralSigil({
      ...baseInput,
      stages: ['QUANTIZED', 'SIGIL', 'CANONICAL'],
    })

    expect(report.ok).toBe(false)
    expect(report.release.canonical).toBe(false)
    expect(report.issues.some((issue) => issue.code === 'KQC_ORDER')).toBe(true)
  })

  it('blocks inaccessible WCAG pairings before canonical release', () => {
    const report = lintPluralSigil({
      ...baseInput,
      pairings: [{ foreground: '300', background: 'theme' }],
      injections: [],
    })

    expect(report.ok).toBe(false)
    expect(report.release.canonical).toBe(false)
    expect(report.issues.some((issue) => issue.code === 'WCAG_PAIRING')).toBe(true)
  })
})
