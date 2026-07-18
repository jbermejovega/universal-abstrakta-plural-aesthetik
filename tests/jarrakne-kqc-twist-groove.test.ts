import { describe, expect, it } from 'vitest'

import {
  JARRAKNE_KQC_TWIST_GROOVE_V1,
  buildJarrakneKqcNormalForm,
  jarrakneMermaid,
  validateJarrakneKqcNormalForm,
} from '../src/index.js'

describe('Jarrakne KQC twist groove normal form', () => {
  it('admits the canonical three-surface twist cycle', () => {
    const normalForm = buildJarrakneKqcNormalForm()

    expect(normalForm.id).toBe(JARRAKNE_KQC_TWIST_GROOVE_V1)
    expect(normalForm.surfaces).toEqual([
      'sigilbook:sigil4py',
      'sigil4cpython',
      'universal-abstrakta-plural-aesthetik',
    ])
    expect(normalForm.entities).toEqual([
      'invoka-jarrakne',
      'jaraskhoreo',
      'arakne',
      'jarramplas-mask',
    ])
    expect(validateJarrakneKqcNormalForm(normalForm)).toEqual([])
  })

  it('preserves no-transport and replay ordering', () => {
    const normalForm = buildJarrakneKqcNormalForm()

    expect(normalForm.twists.every((twist) => !twist.identityTransported)).toBe(true)
    expect(normalForm.twists.every((twist) => twist.tracePreserved)).toBe(true)
    expect(normalForm.grooves.map((groove) => groove.beat)).toEqual([0, 1, 2, 3])
    expect(normalForm.invariants.maskBoundaryPreserved).toBe(true)
    expect(normalForm.invariants.piFixed).toBe(true)
  })

  it('renders an inspectable Mermaid admission witness', () => {
    const mermaid = jarrakneMermaid()

    expect(mermaid).toContain('KQC normal form: ADMIT')
    expect(mermaid).toContain('Jaraskhoreo twerk grooves')
    expect(mermaid).toContain('Jarramplas mask boundary')
  })
})
