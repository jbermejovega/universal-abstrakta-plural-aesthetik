import { describe, expect, it } from 'vitest'
import {
  PALA_ESTACA_MODELS,
} from './models.js'
import {
  buildPalaEstacaPydantikaSheaf,
  validatePalaEstacaPydantikaSheaf,
} from './pydantika-coherent-sheaf.js'

describe('Pala Estaca Pydantika coherent sheaf', () => {
  it('covers every registered Pala Estaca kernel model', () => {
    const sheaf = buildPalaEstacaPydantikaSheaf()
    const validation = validatePalaEstacaPydantikaSheaf(sheaf)

    expect(validation.state).toBe('ADMIT_COHERENT_SHEAF')
    expect(validation.obstructions).toEqual([])
    expect(sheaf.kernels.map((kernel) => kernel.modelId).sort()).toEqual(
      PALA_ESTACA_MODELS.map((model) => model.id).sort(),
    )
  })

  it('keeps SynthGothHub and Godot rendering outside kernel authority', () => {
    const sheaf = buildPalaEstacaPydantikaSheaf()

    expect(sheaf.synthGothHubIsKernel).toBe(false)
    expect(sheaf.renderHasCanonicalAuthority).toBe(false)
    expect(sheaf.runtimeExecuted).toBe(false)
  })

  it('projects a bounded Void Ouroboros flow', () => {
    const sheaf = buildPalaEstacaPydantikaSheaf()

    expect(sheaf.ouroboros.voidType).toBe('VOID')
    expect(sheaf.ouroboros.finiteBudget).toBe(42)
    expect(sheaf.ouroboros.recurRequiresDecreasingResidue).toBe(true)
    expect(sheaf.ouroboros.errorHistoryAppendOnly).toBe(true)
    expect(sheaf.ouroboros.budgetResetAllowed).toBe(false)
  })

  it('rejects a coerced SynthGothHub kernel boundary', () => {
    const sheaf = buildPalaEstacaPydantikaSheaf()
    const broken = {
      ...sheaf,
      synthGothHubIsKernel: true,
    } as unknown as typeof sheaf
    const validation = validatePalaEstacaPydantikaSheaf(broken)

    expect(validation.state).toBe('REJECT_INVALID_SHEAF')
    expect(validation.obstructions).toContain(
      'SYNTHGOTHHUB_ROUTER_CANNOT_BECOME_KERNEL',
    )
  })
})
