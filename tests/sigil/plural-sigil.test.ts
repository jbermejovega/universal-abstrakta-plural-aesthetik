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
    expect(report.qquapp.name).toBe('KokompiTyped')
    expect(report.qquapp.encoder.kind).toBe('injective')
    expect(report.qquapp.decoder.kind).toBe('projective')
    expect(report.qquapp.selfDual).toBe(true)
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

  it('binds QQUAPP teleportation methods to the public QEC Zoo taxonomy reference', () => {
    const report = lintPluralSigil(baseInput)

    expect(report.qquapp.context).toBe('QQUAPP')
    expect(report.qquapp.categoryContext).toBe('inf-kat-kont')
    expect(report.qquapp.teleportationMethods).toEqual([
      'injective-encoder',
      'projective-decoder',
      'self-dual-roundtrip',
    ])
    expect(report.qquapp.qecZooReference).toEqual({
      repository: 'errorcorrectionzoo/eczoo_data',
      url: 'https://github.com/errorcorrectionzoo/eczoo_data',
      site: 'https://errorcorrectionzoo.org/',
      relation: 'taxonomy-reference',
    })
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
