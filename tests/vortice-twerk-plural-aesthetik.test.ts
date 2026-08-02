import { describe, expect, it } from 'vitest'

import {
  VORTICE_TWERK_AUTHOR,
  VORTICE_TWERK_PLURAL_AESTHETIK_V1,
  buildVorticeTwerkPluralAesthetik,
  validateVorticeTwerkPluralAesthetik,
  vorticeTwerkMermaid,
} from '../src/index.js'

describe('Vortice Taller Twerk plural aesthetik', () => {
  it('admits the canonical replay-ordered cells', () => {
    const model = buildVorticeTwerkPluralAesthetik()

    expect(model.id).toBe(VORTICE_TWERK_PLURAL_AESTHETIK_V1)
    expect(model.authorOwner).toBe(VORTICE_TWERK_AUTHOR)
    expect(model.cells.map((cell) => cell.replayOrder)).toEqual([0, 1, 2, 3, 4, 5])
    expect(validateVorticeTwerkPluralAesthetik(model)).toEqual([])
  })

  it('preserves portal and upstream boundaries', () => {
    const model = buildVorticeTwerkPluralAesthetik()

    expect(model.injections.every((edge) => !edge.identityTransported)).toBe(true)
    expect(model.injections.every((edge) => edge.twist === 'MAGIC_JARRAS_TWIST')).toBe(true)
    expect(model.sources.every((source) => source.readOnly && !source.codeCopied)).toBe(true)
    expect(model.runtimeExecuted).toBe(false)
  })

  it('renders an inspectable admission witness', () => {
    const mermaid = vorticeTwerkMermaid()

    expect(mermaid).toContain('Magic Jarras Twist')
    expect(mermaid).toContain('QQUAPP cellular portal')
    expect(mermaid).toContain('Plural aesthetik: ADMIT')
  })
})
