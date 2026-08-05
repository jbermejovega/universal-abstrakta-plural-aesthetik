import { describe, expect, it } from 'vitest'
import {
  EXPECTED_END_LINE,
  SIGILBOOK_PR_698_HEAD,
  buildPr696698PluralSheafProjection,
  pr696698PluralSheafMermaid,
  validatePr696698PluralSheaf,
  validateProjectionDocument,
  verifyPr696698PluralSheafFixedPoint,
} from '../src/sigil/pr696-698-plural-sheaf-projection.js'

const DOCUMENT = `projection SYNTHGOTHHUB_PR696_698_PLURAL_SHEAF_PROJECTION_V1
author Jara Juana Bermejo Vega / JJBV
source sigilbook#696@bc1b0321f5439ac198af729dff43add7c1cdccb4 MERGED
source sigilbook#697@f9b8e844831740283657033c1ac8dd3f5d0fa298 MERGED
source sigilbook#698@3845097dd1836184f7a0be91b0e47dd29f84880d OPEN_READY
parent_projection universal-abstrakta#20@09598fb67ba92883b4bd0ca35b6681253073db73
target jbermejovega/universal-abstrakta-plural-aesthetik
kernel SIGIL_PLURAL_UNIVERSAL_ABSTRAKTA_SHEAF_KERNEL_V2
pi PI:SYNTHGOTHHUB:PR696_698:PLURAL_SHEAF:V1
section SECTION_PR696_CONSOLIDATED_LEDGER
section SECTION_PR697_LOCALIZED_GAUGE_SOC
section SECTION_PR698_QUASARPI_DJANGO
section SECTION_UAPA_PUBLIC_COCHAIN
overlap OVERLAP_PR696_PR697 FORWARD_WITNESS_696_697 WITNESS_RETURN_697_696
overlap OVERLAP_PR697_PR698 FORWARD_WITNESS_697_698 WITNESS_RETURN_698_697
overlap OVERLAP_PR698_UAPA FORWARD_WITNESS_698_UAPA WITNESS_RETURN_UAPA_698
invariant NO_IDENTITY_TRANSPORT
invariant NO_PLURAL_COLLAPSE
invariant TRACE_PRESERVED
invariant PI_FIXED
invariant OBSTRUCTIONS_VISIBLE
invariant NO_AUTHORITY_PROMOTION
invariant RENDER_IS_PROJECTION
end SYNTHGOTHHUB_PR696_698_PLURAL_SHEAF_PROJECTION_V1`

describe('PR 696-698 plural Universal Abstrakta sheaf projection', () => {
  it('admits the exact connected cover and deterministic fixed point', () => {
    expect(validateProjectionDocument(DOCUMENT)).toEqual([])
    const projection = buildPr696698PluralSheafProjection(DOCUMENT)
    expect(verifyPr696698PluralSheafFixedPoint(projection)).toBe(true)
    expect(projection.sourceEpochs.map((source) => source.pullRequest)).toEqual([
      696,
      697,
      698,
    ])
    expect(projection.sections).toHaveLength(4)
    expect(projection.overlaps).toHaveLength(4)
  })

  it('keeps UAPA as a local cochain projection without render authority', () => {
    const projection = buildPr696698PluralSheafProjection(DOCUMENT)
    expect(projection.uapaIsLocalCochainProjectionNotWholeSheaf).toBe(true)
    expect(projection.renderHasCanonicalAuthority).toBe(false)
    expect(projection.synthGothHubIsRouterNotKernel).toBe(true)
  })

  it('rejects a missing terminal end line', () => {
    const truncated = DOCUMENT.split('\n').slice(0, -1).join('\n')
    expect(validateProjectionDocument(truncated)).toContain(
      'EXACT_END_LINE_MISSING',
    )
  })

  it('rejects a duplicate terminal line', () => {
    expect(validateProjectionDocument(`${DOCUMENT}\n${EXPECTED_END_LINE}`)).toContain(
      'END_LINE_NOT_UNIQUE',
    )
  })

  it('rejects PR 698 source drift', () => {
    const drifted = DOCUMENT.replace(SIGILBOOK_PR_698_HEAD, '0'.repeat(40))
    expect(
      validateProjectionDocument(drifted).some((error) =>
        error.startsWith('MISSING_LINE:source sigilbook#698'),
      ),
    ).toBe(true)
  })

  it('rejects a missing witness return', () => {
    const projection = buildPr696698PluralSheafProjection(DOCUMENT)
    const { fixedPointSha256: _ignored, ...payload } = projection
    const invalid = {
      ...payload,
      overlaps: payload.overlaps.map((overlap, index) =>
        index === 1 ? { ...overlap, witnessReturnId: '' } : overlap,
      ),
    }
    expect(validatePr696698PluralSheaf(invalid)).toContain(
      'MISSING_WITNESS_RETURN:OVERLAP_PR697_PR698',
    )
  })

  it('rejects a disconnected public projection section', () => {
    const projection = buildPr696698PluralSheafProjection(DOCUMENT)
    const { fixedPointSha256: _ignored, ...payload } = projection
    const invalid = {
      ...payload,
      overlaps: payload.overlaps.filter(
        (overlap) =>
          !overlap.leftSectionId.includes('UAPA') &&
          !overlap.rightSectionId.includes('UAPA'),
      ),
    }
    expect(validatePr696698PluralSheaf(invalid)).toContain(
      'SHEAF_COVER_NOT_CONNECTED',
    )
  })

  it('renders the four-section sheaf diagram', () => {
    const mermaid = pr696698PluralSheafMermaid()
    expect(mermaid).toContain('PR 696')
    expect(mermaid).toContain('PR 697')
    expect(mermaid).toContain('PR 698')
    expect(mermaid).toContain('UAPA public cochain projection')
  })
})
