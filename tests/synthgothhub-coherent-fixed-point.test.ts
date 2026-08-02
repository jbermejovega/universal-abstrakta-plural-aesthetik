import { describe, expect, it } from 'vitest'
import {
  EXPECTED_END_LINE,
  buildSynthGothHubAesthetikProjection,
  validateProjectionDocument,
  verifyProjectionFixedPoint,
} from '../src/sigil/synthgothhub-coherent-fixed-point.js'

const DOCUMENT = `projection SYNTHGOTHHUB_UNIVERSAL_AESTHETIK_PROJECTION_V1
author Jara Juana Bermejo-Vega / JJBV
source sigilbook#695@5f5d0f0b776d34077a22e897d8ec68cab6637d42
target jbermejovega/universal-abstrakta-plural-aesthetik
section SECTION_AESTHETIK_PUBLIC
kernel SIGIL_PLURAL_UNIVERSAL_ABSTRAKTA_AESTHETIK_KERNEL_V1
pi PI:SYNTHGOTHHUB:COHERENT_SHEAF:CYTHON:V1
invariant NO_IDENTITY_TRANSPORT
invariant NO_PLURAL_COLLAPSE
invariant TRACE_PRESERVED
invariant OBSTRUCTION_PRESERVED
end SYNTHGOTHHUB_UNIVERSAL_AESTHETIK_PROJECTION_V1`

describe('SynthGothHub coherent aesthetik projection', () => {
  it('admits the exact projection and fixed point', () => {
    expect(validateProjectionDocument(DOCUMENT)).toEqual([])
    const projection = buildSynthGothHubAesthetikProjection(DOCUMENT)
    expect(verifyProjectionFixedPoint(projection)).toBe(true)
    expect(projection.renderHasCanonicalAuthority).toBe(false)
    expect(projection.synthGothHubIsRouterNotKernel).toBe(true)
  })

  it('rejects a missing terminal end line', () => {
    const truncated = DOCUMENT.split('\n').slice(0, -1).join('\n')
    expect(validateProjectionDocument(truncated)).toContain(
      'EXACT_END_LINE_MISSING',
    )
  })

  it('rejects a duplicate end line', () => {
    expect(validateProjectionDocument(`${DOCUMENT}\n${EXPECTED_END_LINE}`)).toContain(
      'END_LINE_NOT_UNIQUE',
    )
  })

  it('rejects source-head drift', () => {
    const errors = validateProjectionDocument(
      DOCUMENT.replace('5f5d0f0b', '00000000'),
    )
    expect(errors.some((error) => error.startsWith('MISSING_LINE:source'))).toBe(
      true,
    )
  })
})
