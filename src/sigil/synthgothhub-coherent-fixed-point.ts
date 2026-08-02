import { createHash } from 'node:crypto'

export const SYNTHGOTHHUB_COHERENT_AESTHETIK_PROJECTION_V1 =
  'SYNTHGOTHHUB_COHERENT_AESTHETIK_PROJECTION_V1' as const
export const SIGILBOOK_PR_695_PAYLOAD_HEAD =
  '3eaa72173eba1f91627c80b5e8359adeb140994e' as const
export const SIGIL4CPYTHON_PR_8_HEAD =
  '965c440211b9e2dcd94af492aca138fbcdba76fd' as const
export const SEMANTIC_KERNEL_ID =
  'SIGIL_PLURAL_UNIVERSAL_ABSTRAKTA_AESTHETIK_KERNEL_V1' as const
export const PI_REF =
  'PI:SYNTHGOTHHUB:COHERENT_SHEAF:CYTHON:V1' as const
export const PROJECTION_ID =
  'SYNTHGOTHHUB_UNIVERSAL_AESTHETIK_PROJECTION_V1' as const
export const EXPECTED_END_LINE = `end ${PROJECTION_ID}` as const

export interface SynthGothHubAesthetikProjection {
  readonly id: typeof SYNTHGOTHHUB_COHERENT_AESTHETIK_PROJECTION_V1
  readonly authorOwner: 'Jara Juana Bermejo-Vega / JJBV'
  readonly source: {
    readonly sigilbookPullRequest: 695
    readonly sigilbookPayloadHead: typeof SIGILBOOK_PR_695_PAYLOAD_HEAD
    readonly sigil4cpythonPullRequest: 8
    readonly sigil4cpythonHead: typeof SIGIL4CPYTHON_PR_8_HEAD
  }
  readonly targetRepository:
    'jbermejovega/universal-abstrakta-plural-aesthetik'
  readonly semanticKernelId: typeof SEMANTIC_KERNEL_ID
  readonly piRef: typeof PI_REF
  readonly exactEndLine: typeof EXPECTED_END_LINE
  readonly sourceModelRemainsDistinct: true
  readonly projectionRemainsDistinct: true
  readonly synthGothHubIsRouterNotKernel: true
  readonly renderHasCanonicalAuthority: false
  readonly identityTransport: false
  readonly pluralCollapse: false
  readonly runtimeExecuted: false
  readonly finalKapsyla: false
  readonly fixedPointSha256: string
}

function digest(value: unknown): string {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex')
}

export function validateProjectionDocument(document: string): readonly string[] {
  const errors: string[] = []
  const lines = document.replace(/\n+$/, '').split('\n')
  if (lines.at(-1) !== EXPECTED_END_LINE) {
    errors.push('EXACT_END_LINE_MISSING')
  }
  if (document.split(EXPECTED_END_LINE).length - 1 !== 1) {
    errors.push('END_LINE_NOT_UNIQUE')
  }
  const required = new Set([
    `projection ${PROJECTION_ID}`,
    'author Jara Juana Bermejo-Vega / JJBV',
    `source sigilbook#695@${SIGILBOOK_PR_695_PAYLOAD_HEAD}`,
    'target jbermejovega/universal-abstrakta-plural-aesthetik',
    `kernel ${SEMANTIC_KERNEL_ID}`,
    `pi ${PI_REF}`,
    'invariant NO_IDENTITY_TRANSPORT',
    'invariant NO_PLURAL_COLLAPSE',
    'invariant TRACE_PRESERVED',
    'invariant OBSTRUCTION_PRESERVED',
  ])
  for (const line of required) {
    if (!lines.includes(line)) errors.push(`MISSING_LINE:${line}`)
  }
  return errors
}

export function buildSynthGothHubAesthetikProjection(
  document: string,
): SynthGothHubAesthetikProjection {
  const errors = validateProjectionDocument(document)
  if (errors.length > 0) throw new Error(errors.join(';'))
  const payload = {
    id: SYNTHGOTHHUB_COHERENT_AESTHETIK_PROJECTION_V1,
    authorOwner: 'Jara Juana Bermejo-Vega / JJBV',
    source: {
      sigilbookPullRequest: 695,
      sigilbookPayloadHead: SIGILBOOK_PR_695_PAYLOAD_HEAD,
      sigil4cpythonPullRequest: 8,
      sigil4cpythonHead: SIGIL4CPYTHON_PR_8_HEAD,
    },
    targetRepository: 'jbermejovega/universal-abstrakta-plural-aesthetik',
    semanticKernelId: SEMANTIC_KERNEL_ID,
    piRef: PI_REF,
    exactEndLine: EXPECTED_END_LINE,
    sourceModelRemainsDistinct: true,
    projectionRemainsDistinct: true,
    synthGothHubIsRouterNotKernel: true,
    renderHasCanonicalAuthority: false,
    identityTransport: false,
    pluralCollapse: false,
    runtimeExecuted: false,
    finalKapsyla: false,
  } as const
  return { ...payload, fixedPointSha256: digest(payload) }
}

export function verifyProjectionFixedPoint(
  projection: SynthGothHubAesthetikProjection,
): boolean {
  const { fixedPointSha256, ...payload } = projection
  return digest(payload) === fixedPointSha256
}
