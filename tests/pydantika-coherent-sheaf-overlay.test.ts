import { describe, expect, it } from 'vitest'
import {
  CURRENT_SIGIL4CPYTHON_SHEAF_SHA,
  CURRENT_SIGILBOOK_SHEAF_SHA,
  buildPydantikaCoherentSheafOverlay,
  validatePydantikaCoherentSheafOverlay,
} from '../src/sigil/pydantika-coherent-sheaf-overlay.js'

describe('Pydantika coherent sheaf overlay', () => {
  it('admits the refreshed cross-repository source pins', () => {
    const overlay = buildPydantikaCoherentSheafOverlay()
    const report = validatePydantikaCoherentSheafOverlay(overlay)

    expect(report.state).toBe('ADMIT')
    expect(report.errors).toEqual([])
    expect(overlay.currentSourcePins.sigilbook).toBe(
      CURRENT_SIGILBOOK_SHEAF_SHA,
    )
    expect(overlay.currentSourcePins.sigil4cpython).toBe(
      CURRENT_SIGIL4CPYTHON_SHEAF_SHA,
    )
  })

  it('preserves the bounded Void Ouroboros contract', () => {
    const overlay = buildPydantikaCoherentSheafOverlay()

    expect(overlay.voidOuroboros.voidType).toBe('VOID')
    expect(overlay.voidOuroboros.finiteBudget).toBe(42)
    expect(overlay.voidOuroboros.recurRequiresDecreasingResidue).toBe(true)
    expect(overlay.voidOuroboros.errorHistoryAppendOnly).toBe(true)
    expect(overlay.voidOuroboros.budgetResetAllowed).toBe(false)
  })
})
