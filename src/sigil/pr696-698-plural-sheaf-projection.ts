import { createHash } from 'node:crypto'

export const SYNTHGOTHHUB_PR696_698_PLURAL_SHEAF_PROJECTION_V1 =
  'SYNTHGOTHHUB_PR696_698_PLURAL_SHEAF_PROJECTION_V1' as const
export const SIGILBOOK_PR_696_HEAD =
  'bc1b0321f5439ac198af729dff43add7c1cdccb4' as const
export const SIGILBOOK_PR_697_HEAD =
  'f9b8e844831740283657033c1ac8dd3f5d0fa298' as const
export const SIGILBOOK_PR_698_HEAD =
  '3845097dd1836184f7a0be91b0e47dd29f84880d' as const
export const UAPA_PR_20_HEAD =
  '09598fb67ba92883b4bd0ca35b6681253073db73' as const
export const SEMANTIC_KERNEL_ID =
  'SIGIL_PLURAL_UNIVERSAL_ABSTRAKTA_SHEAF_KERNEL_V2' as const
export const PI_REF = 'PI:SYNTHGOTHHUB:PR696_698:PLURAL_SHEAF:V1' as const
export const PROJECTION_ID =
  'SYNTHGOTHHUB_PR696_698_PLURAL_SHEAF_PROJECTION_V1' as const
export const EXPECTED_END_LINE = `end ${PROJECTION_ID}` as const

export type SourceState = 'MERGED' | 'OPEN_READY'
export type SourceAuthority =
  | 'CONSOLIDATED_SOURCE_COVER'
  | 'LOCALIZATION_AND_GAUGE'
  | 'RENDER_AND_NATIVE_PLAN'

export interface SheafSourceEpoch {
  readonly repository: 'jbermejovega/sigilbook'
  readonly pullRequest: 696 | 697 | 698
  readonly headSha: string
  readonly state: SourceState
  readonly authority: SourceAuthority
  readonly authorityRank: 1 | 2 | 3
  readonly sourceEpochRewritten: false
}

export interface PluralSheafSection {
  readonly sectionId: string
  readonly sourceRepository: string
  readonly sourcePullRequest: number
  readonly sourceHeadSha: string
  readonly contextId: string
  readonly semanticKernelId: typeof SEMANTIC_KERNEL_ID
  readonly pluralFacets: readonly string[]
  readonly restrictionWitnessId: string
  readonly traceWitnessId: string
  readonly piRef: typeof PI_REF
  readonly identityTransport: false
  readonly pluralCollapse: false
  readonly obstructionPreserved: true
}

export interface PluralSheafOverlap {
  readonly overlapId: string
  readonly leftSectionId: string
  readonly rightSectionId: string
  readonly restrictionWitnessId: string
  readonly forwardWitnessId: string
  readonly witnessReturnId: string
  readonly commutes: true
  readonly schedulerAuthority: false
  readonly identityTransport: false
}

export interface Pr696698PluralSheafProjection {
  readonly id: typeof SYNTHGOTHHUB_PR696_698_PLURAL_SHEAF_PROJECTION_V1
  readonly authorOwner: 'Jara Juana Bermejo Vega / JJBV'
  readonly sourceEpochs: readonly SheafSourceEpoch[]
  readonly parentProjection: {
    readonly repository:
      'jbermejovega/universal-abstrakta-plural-aesthetik'
    readonly pullRequest: 20
    readonly headSha: typeof UAPA_PR_20_HEAD
  }
  readonly targetRepository:
    'jbermejovega/universal-abstrakta-plural-aesthetik'
  readonly semanticKernelId: typeof SEMANTIC_KERNEL_ID
  readonly piRef: typeof PI_REF
  readonly sections: readonly PluralSheafSection[]
  readonly overlaps: readonly PluralSheafOverlap[]
  readonly invariants: readonly string[]
  readonly exactEndLine: typeof EXPECTED_END_LINE
  readonly uapaIsLocalCochainProjectionNotWholeSheaf: true
  readonly sourceModelsRemainDistinct: true
  readonly projectionRemainsDistinct: true
  readonly synthGothHubIsRouterNotKernel: true
  readonly renderHasCanonicalAuthority: false
  readonly identityTransport: false
  readonly pluralCollapse: false
  readonly runtimeExecuted: false
  readonly workflowDispatched: false
  readonly defaultBranchWritten: false
  readonly finalKapsyla: false
  readonly fixedPointSha256: string
}

const SOURCE_EPOCHS = [
  {
    repository: 'jbermejovega/sigilbook',
    pullRequest: 696,
    headSha: SIGILBOOK_PR_696_HEAD,
    state: 'MERGED',
    authority: 'CONSOLIDATED_SOURCE_COVER',
    authorityRank: 3,
    sourceEpochRewritten: false,
  },
  {
    repository: 'jbermejovega/sigilbook',
    pullRequest: 697,
    headSha: SIGILBOOK_PR_697_HEAD,
    state: 'MERGED',
    authority: 'LOCALIZATION_AND_GAUGE',
    authorityRank: 2,
    sourceEpochRewritten: false,
  },
  {
    repository: 'jbermejovega/sigilbook',
    pullRequest: 698,
    headSha: SIGILBOOK_PR_698_HEAD,
    state: 'OPEN_READY',
    authority: 'RENDER_AND_NATIVE_PLAN',
    authorityRank: 1,
    sourceEpochRewritten: false,
  },
] as const satisfies readonly SheafSourceEpoch[]

const SECTIONS = [
  {
    sectionId: 'SECTION_PR696_CONSOLIDATED_LEDGER',
    sourceRepository: 'jbermejovega/sigilbook',
    sourcePullRequest: 696,
    sourceHeadSha: SIGILBOOK_PR_696_HEAD,
    contextId: 'CONSOLIDATED_SOURCE_CONTEXT',
    semanticKernelId: SEMANTIC_KERNEL_ID,
    pluralFacets: [
      'COHERENT_SHEAF',
      'PACAPDG',
      'UAP',
      'QUNO_TYPED',
      'TRACE_PRESERVED',
    ],
    restrictionWitnessId: 'RESTRICT_PR696_TO_PR697',
    traceWitnessId: 'TRACE_PR696_CONSOLIDATED_LEDGER',
    piRef: PI_REF,
    identityTransport: false,
    pluralCollapse: false,
    obstructionPreserved: true,
  },
  {
    sectionId: 'SECTION_PR697_LOCALIZED_GAUGE_SOC',
    sourceRepository: 'jbermejovega/sigilbook',
    sourcePullRequest: 697,
    sourceHeadSha: SIGILBOOK_PR_697_HEAD,
    contextId: 'QUOQUANTIM_LOCALIZATION_CONTEXT',
    semanticKernelId: SEMANTIC_KERNEL_ID,
    pluralFacets: [
      'STRIKK_TYPED',
      'PYDANTIKA_TYPED',
      'QUEEN_OF_QUANTA',
      'GAUGE_WITNESSED',
      'REALTIME_SOC_PLAN',
    ],
    restrictionWitnessId: 'RESTRICT_PR697_TO_PR698',
    traceWitnessId: 'TRACE_PR697_LOCALIZED_GAUGE_SOC',
    piRef: PI_REF,
    identityTransport: false,
    pluralCollapse: false,
    obstructionPreserved: true,
  },
  {
    sectionId: 'SECTION_PR698_QUASARPI_DJANGO',
    sourceRepository: 'jbermejovega/sigilbook',
    sourcePullRequest: 698,
    sourceHeadSha: SIGILBOOK_PR_698_HEAD,
    contextId: 'QUASARPI_VIRTUAL_DJANGO_CONTEXT',
    semanticKernelId: SEMANTIC_KERNEL_ID,
    pluralFacets: [
      'QUOQUANTUM',
      'VIRTUAL_DJANGO',
      'QUASARPI_2D',
      'QUASARPI_3D',
      'CPYTHON_STACK_PLAN',
    ],
    restrictionWitnessId: 'RESTRICT_PR698_TO_UAPA',
    traceWitnessId: 'TRACE_PR698_QUASARPI_DJANGO',
    piRef: PI_REF,
    identityTransport: false,
    pluralCollapse: false,
    obstructionPreserved: true,
  },
  {
    sectionId: 'SECTION_UAPA_PUBLIC_COCHAIN',
    sourceRepository:
      'jbermejovega/universal-abstrakta-plural-aesthetik',
    sourcePullRequest: 20,
    sourceHeadSha: UAPA_PR_20_HEAD,
    contextId: 'PUBLIC_AESTHETIK_CONTEXT',
    semanticKernelId: SEMANTIC_KERNEL_ID,
    pluralFacets: [
      'PLURAL_UNIVERSAL_ABSTRAKTA',
      'AESTHETIK_PROJECTION',
      'WCAG_WITNESSED',
      'RENDER_IS_PROJECTION',
      'NO_CANONICAL_RENDER_AUTHORITY',
    ],
    restrictionWitnessId: 'RESTRICT_UAPA_TO_PR696_ANCHOR',
    traceWitnessId: 'TRACE_UAPA_PUBLIC_COCHAIN',
    piRef: PI_REF,
    identityTransport: false,
    pluralCollapse: false,
    obstructionPreserved: true,
  },
] as const satisfies readonly PluralSheafSection[]

const OVERLAPS = [
  {
    overlapId: 'OVERLAP_PR696_PR697',
    leftSectionId: 'SECTION_PR696_CONSOLIDATED_LEDGER',
    rightSectionId: 'SECTION_PR697_LOCALIZED_GAUGE_SOC',
    restrictionWitnessId: 'RESTRICTION_WITNESS_696_697',
    forwardWitnessId: 'FORWARD_WITNESS_696_697',
    witnessReturnId: 'WITNESS_RETURN_697_696',
    commutes: true,
    schedulerAuthority: false,
    identityTransport: false,
  },
  {
    overlapId: 'OVERLAP_PR697_PR698',
    leftSectionId: 'SECTION_PR697_LOCALIZED_GAUGE_SOC',
    rightSectionId: 'SECTION_PR698_QUASARPI_DJANGO',
    restrictionWitnessId: 'RESTRICTION_WITNESS_697_698',
    forwardWitnessId: 'FORWARD_WITNESS_697_698',
    witnessReturnId: 'WITNESS_RETURN_698_697',
    commutes: true,
    schedulerAuthority: false,
    identityTransport: false,
  },
  {
    overlapId: 'OVERLAP_PR698_UAPA',
    leftSectionId: 'SECTION_PR698_QUASARPI_DJANGO',
    rightSectionId: 'SECTION_UAPA_PUBLIC_COCHAIN',
    restrictionWitnessId: 'RESTRICTION_WITNESS_698_UAPA',
    forwardWitnessId: 'FORWARD_WITNESS_698_UAPA',
    witnessReturnId: 'WITNESS_RETURN_UAPA_698',
    commutes: true,
    schedulerAuthority: false,
    identityTransport: false,
  },
  {
    overlapId: 'OVERLAP_UAPA_PR696_ANCHOR',
    leftSectionId: 'SECTION_UAPA_PUBLIC_COCHAIN',
    rightSectionId: 'SECTION_PR696_CONSOLIDATED_LEDGER',
    restrictionWitnessId: 'RESTRICTION_WITNESS_UAPA_696',
    forwardWitnessId: 'FORWARD_WITNESS_UAPA_696',
    witnessReturnId: 'WITNESS_RETURN_696_UAPA',
    commutes: true,
    schedulerAuthority: false,
    identityTransport: false,
  },
] as const satisfies readonly PluralSheafOverlap[]

const INVARIANTS = [
  'NO_IDENTITY_TRANSPORT',
  'NO_PLURAL_COLLAPSE',
  'SAFE_REPLAY',
  'TRACE_PRESERVED',
  'PROVENANCE_PRESERVED',
  'PI_FIXED',
  'OBSTRUCTIONS_VISIBLE',
  'NO_AUTHORITY_PROMOTION',
  'RENDER_IS_PROJECTION',
] as const

function digest(value: unknown): string {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex')
}

function connected(
  sections: readonly PluralSheafSection[],
  overlaps: readonly PluralSheafOverlap[],
): boolean {
  const ids = new Set(sections.map((section) => section.sectionId))
  const first = sections[0]
  if (first === undefined) return false

  const adjacency = new Map<string, Set<string>>()
  for (const id of ids) adjacency.set(id, new Set())
  for (const overlap of overlaps) {
    adjacency.get(overlap.leftSectionId)?.add(overlap.rightSectionId)
    adjacency.get(overlap.rightSectionId)?.add(overlap.leftSectionId)
  }

  const seen = new Set<string>()
  const pending = [first.sectionId]
  while (pending.length > 0) {
    const current = pending.pop()
    if (current === undefined || seen.has(current)) continue
    seen.add(current)
    for (const next of adjacency.get(current) ?? []) pending.push(next)
  }
  return seen.size === ids.size
}

export function validateProjectionDocument(document: string): readonly string[] {
  const errors: string[] = []
  const lines = document.replace(/\n+$/, '').split('\n')
  if (lines.at(-1) !== EXPECTED_END_LINE) errors.push('EXACT_END_LINE_MISSING')
  if (document.split(EXPECTED_END_LINE).length - 1 !== 1) {
    errors.push('END_LINE_NOT_UNIQUE')
  }

  const required = new Set([
    `projection ${PROJECTION_ID}`,
    'author Jara Juana Bermejo Vega / JJBV',
    `source sigilbook#696@${SIGILBOOK_PR_696_HEAD} MERGED`,
    `source sigilbook#697@${SIGILBOOK_PR_697_HEAD} MERGED`,
    `source sigilbook#698@${SIGILBOOK_PR_698_HEAD} OPEN_READY`,
    `parent_projection universal-abstrakta#20@${UAPA_PR_20_HEAD}`,
    'target jbermejovega/universal-abstrakta-plural-aesthetik',
    `kernel ${SEMANTIC_KERNEL_ID}`,
    `pi ${PI_REF}`,
    'section SECTION_PR696_CONSOLIDATED_LEDGER',
    'section SECTION_PR697_LOCALIZED_GAUGE_SOC',
    'section SECTION_PR698_QUASARPI_DJANGO',
    'section SECTION_UAPA_PUBLIC_COCHAIN',
    'overlap OVERLAP_PR696_PR697 FORWARD_WITNESS_696_697 WITNESS_RETURN_697_696',
    'overlap OVERLAP_PR697_PR698 FORWARD_WITNESS_697_698 WITNESS_RETURN_698_697',
    'overlap OVERLAP_PR698_UAPA FORWARD_WITNESS_698_UAPA WITNESS_RETURN_UAPA_698',
    'invariant NO_IDENTITY_TRANSPORT',
    'invariant NO_PLURAL_COLLAPSE',
    'invariant TRACE_PRESERVED',
    'invariant PI_FIXED',
    'invariant OBSTRUCTIONS_VISIBLE',
    'invariant NO_AUTHORITY_PROMOTION',
    'invariant RENDER_IS_PROJECTION',
  ])
  for (const line of required) {
    if (!lines.includes(line)) errors.push(`MISSING_LINE:${line}`)
  }
  if (lines.includes('render canonical_authority true')) {
    errors.push('RENDER_CANONICAL_AUTHORITY_FORBIDDEN')
  }
  return errors
}

export function validatePr696698PluralSheaf(
  projection: Omit<Pr696698PluralSheafProjection, 'fixedPointSha256'>,
): readonly string[] {
  const errors: string[] = []
  const expectedPullRequests = [696, 697, 698]
  const observedPullRequests = projection.sourceEpochs.map(
    (source) => source.pullRequest,
  )
  if (JSON.stringify(observedPullRequests) !== JSON.stringify(expectedPullRequests)) {
    errors.push('SOURCE_CHAIN_MUST_BE_696_697_698')
  }

  const expectedHeads = [
    SIGILBOOK_PR_696_HEAD,
    SIGILBOOK_PR_697_HEAD,
    SIGILBOOK_PR_698_HEAD,
  ]
  const observedHeads = projection.sourceEpochs.map((source) => source.headSha)
  if (JSON.stringify(observedHeads) !== JSON.stringify(expectedHeads)) {
    errors.push('SOURCE_HEAD_DRIFT')
  }

  const expectedStates: readonly SourceState[] = [
    'MERGED',
    'MERGED',
    'OPEN_READY',
  ]
  const observedStates = projection.sourceEpochs.map((source) => source.state)
  if (JSON.stringify(observedStates) !== JSON.stringify(expectedStates)) {
    errors.push('SOURCE_STATE_DRIFT')
  }

  const ranks = projection.sourceEpochs.map((source) => source.authorityRank)
  if (ranks.some((rank, index) => index > 0 && rank > (ranks[index - 1] ?? 0))) {
    errors.push('AUTHORITY_PROMOTION_DETECTED')
  }

  const sectionIds = projection.sections.map((section) => section.sectionId)
  if (new Set(sectionIds).size !== sectionIds.length) {
    errors.push('DUPLICATE_SECTION_IDENTITY')
  }

  const known = new Set(sectionIds)
  for (const overlap of projection.overlaps) {
    if (!known.has(overlap.leftSectionId) || !known.has(overlap.rightSectionId)) {
      errors.push(`UNKNOWN_OVERLAP_ENDPOINT:${overlap.overlapId}`)
    }
    if (overlap.forwardWitnessId.length === 0) {
      errors.push(`MISSING_FORWARD_WITNESS:${overlap.overlapId}`)
    }
    if (overlap.witnessReturnId.length === 0) {
      errors.push(`MISSING_WITNESS_RETURN:${overlap.overlapId}`)
    }
    if (overlap.schedulerAuthority || overlap.identityTransport) {
      errors.push(`OVERLAP_AUTHORITY_OR_TRANSPORT:${overlap.overlapId}`)
    }
  }

  if (!connected(projection.sections, projection.overlaps)) {
    errors.push('SHEAF_COVER_NOT_CONNECTED')
  }

  for (const section of projection.sections) {
    if (section.semanticKernelId !== SEMANTIC_KERNEL_ID) {
      errors.push(`SEMANTIC_KERNEL_DRIFT:${section.sectionId}`)
    }
    if (section.piRef !== PI_REF) errors.push(`PI_DRIFT:${section.sectionId}`)
    if (
      section.identityTransport ||
      section.pluralCollapse ||
      !section.obstructionPreserved
    ) {
      errors.push(`SECTION_INVARIANT_FAILURE:${section.sectionId}`)
    }
  }

  const mandatory = new Set(INVARIANTS)
  for (const invariant of mandatory) {
    if (!projection.invariants.includes(invariant)) {
      errors.push(`MISSING_INVARIANT:${invariant}`)
    }
  }

  if (!projection.uapaIsLocalCochainProjectionNotWholeSheaf) {
    errors.push('UAPA_MUST_REMAIN_LOCAL_COCHAIN_PROJECTION')
  }
  if (projection.renderHasCanonicalAuthority) {
    errors.push('RENDER_CANONICAL_AUTHORITY_FORBIDDEN')
  }
  if (
    projection.identityTransport ||
    projection.pluralCollapse ||
    projection.runtimeExecuted ||
    projection.workflowDispatched ||
    projection.defaultBranchWritten ||
    projection.finalKapsyla
  ) {
    errors.push('EXECUTION_OR_IDENTITY_BOUNDARY_VIOLATION')
  }
  return errors
}

export function buildPr696698PluralSheafProjection(
  document: string,
): Pr696698PluralSheafProjection {
  const documentErrors = validateProjectionDocument(document)
  if (documentErrors.length > 0) throw new Error(documentErrors.join(';'))

  const payload = {
    id: SYNTHGOTHHUB_PR696_698_PLURAL_SHEAF_PROJECTION_V1,
    authorOwner: 'Jara Juana Bermejo Vega / JJBV',
    sourceEpochs: SOURCE_EPOCHS,
    parentProjection: {
      repository: 'jbermejovega/universal-abstrakta-plural-aesthetik',
      pullRequest: 20,
      headSha: UAPA_PR_20_HEAD,
    },
    targetRepository: 'jbermejovega/universal-abstrakta-plural-aesthetik',
    semanticKernelId: SEMANTIC_KERNEL_ID,
    piRef: PI_REF,
    sections: SECTIONS,
    overlaps: OVERLAPS,
    invariants: INVARIANTS,
    exactEndLine: EXPECTED_END_LINE,
    uapaIsLocalCochainProjectionNotWholeSheaf: true,
    sourceModelsRemainDistinct: true,
    projectionRemainsDistinct: true,
    synthGothHubIsRouterNotKernel: true,
    renderHasCanonicalAuthority: false,
    identityTransport: false,
    pluralCollapse: false,
    runtimeExecuted: false,
    workflowDispatched: false,
    defaultBranchWritten: false,
    finalKapsyla: false,
  } as const

  const structuralErrors = validatePr696698PluralSheaf(payload)
  if (structuralErrors.length > 0) throw new Error(structuralErrors.join(';'))
  return { ...payload, fixedPointSha256: digest(payload) }
}

export function verifyPr696698PluralSheafFixedPoint(
  projection: Pr696698PluralSheafProjection,
): boolean {
  const { fixedPointSha256, ...payload } = projection
  return digest(payload) === fixedPointSha256
}

export function pr696698PluralSheafMermaid(): string {
  return `flowchart LR
  P696[PR 696 consolidated coherent-sheaf ledger]
  P697[PR 697 localized gauge and Queen-of-Quanta SoC]
  P698[PR 698 QuoQuantum Django and QuasarPi]
  UAPA[UAPA public cochain projection]
  P696 -->|restriction + witness return| P697
  P697 -->|restriction + witness return| P698
  P698 -->|render projection + witness return| UAPA
  UAPA -. canonical anchor without authority .-> P696`
}
