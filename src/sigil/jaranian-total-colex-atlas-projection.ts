import { createHash } from 'node:crypto'

export const SCHEMA_ID =
  'JARANIAN_TOTAL_COLEX_ATLAS_UAPA_PROJECTION_V1' as const
export const CANON = 'PIORNALEGO_ES_CANON' as const
export const UAPA_PARENT_PULL_REQUEST = 21 as const
export const UAPA_PARENT_HEAD =
  'e55d0f06e0b4d377c933a5b63cf2c572b24cf148' as const
export const SIGILBOOK_SOURCE_PULL_REQUEST = 746 as const
export const SIGILBOOK_SOURCE_HEAD =
  '5ef828c5df04f77a64c66dd5a4b940588cef3bd2' as const
export const SIGILBOOK_BUNDLE_SHA256 =
  '06dcf4061d299fe9efc821b15c563aa2ae34160ebc592a668fae446a8e3b20c2' as const
export const SIGIL4CPYTHON_SOURCE_PULL_REQUEST = 9 as const
export const SIGIL4CPYTHON_SOURCE_HEAD =
  '349fcd8af06369a51b2d14245a12abd4e9a1375a' as const
export const SIGIL4CPYTHON_PROJECTION_SHA256 =
  '5adba5e4e1567195c6b40d01ac7663cae6982e151ba44fc79d8f7af90ce1c5a6' as const
export const EXPECTED_END_LINE = `end ${SCHEMA_ID}` as const

export type PanelId =
  | 'panel.brane'
  | 'panel.totalization'
  | 'panel.hk_fm'
  | 'panel.dual_solids'
  | 'panel.scutoid'
  | 'panel.qubit'

export type ColexLayer =
  | 'H1_OBJECTS'
  | 'H2_FUNCTORS'
  | 'H3_NATURAL_TRANSFORMATIONS'
  | 'H4_COHERENCE'

export type ChiralAxis = 'X' | 'Y' | 'Z'

export interface SourceBinding {
  readonly repository: string
  readonly pullRequest: number
  readonly headSha: string
  readonly payloadSha256: string
  readonly identityDistinct: true
  readonly authorityTransferred: false
}

export interface RenderPanel {
  readonly panelId: PanelId
  readonly ordinal: 1 | 2 | 3 | 4 | 5 | 6
  readonly slug: string
  readonly colorToken: string
  readonly patternToken: string
  readonly textLabel: string
  readonly renderIsProjection: true
  readonly canonicalAuthority: false
}

export interface ChiralContextView {
  readonly axis: ChiralAxis
  readonly contextId: string
  readonly identityCellId: 'cell.identity'
  readonly measurableRelationIds: readonly string[]
  readonly heldRelationIds: readonly string[]
  readonly allRelationsJointlyMeasurable: false
  readonly physicalMeasurementExecuted: false
}

export interface HeldClaimView {
  readonly relationId:
    | 'rel.fm.reverse'
    | 'rel.hk.preservation'
    | 'rel.scutoid.intercalation'
  readonly reason: string
  readonly promoted: false
}

export interface JaranianTotalColexAtlasProjection {
  readonly id: typeof SCHEMA_ID
  readonly canon: typeof CANON
  readonly authorOwner: 'Jara Juana Bermejo Vega / JJBV'
  readonly parent: SourceBinding
  readonly sigilbookSource: SourceBinding
  readonly sigil4cpythonSource: SourceBinding
  readonly identityCellId: 'cell.identity'
  readonly identityRelationId: 'rel.identity'
  readonly layers: readonly ColexLayer[]
  readonly panels: readonly RenderPanel[]
  readonly chiralContexts: readonly ChiralContextView[]
  readonly heldClaims: readonly HeldClaimView[]
  readonly invariants: readonly string[]
  readonly exactEndLine: typeof EXPECTED_END_LINE
  readonly renderIsProjection: true
  readonly colorIsIdentity: false
  readonly sourceModelsRemainDistinct: true
  readonly projectionRemainsDistinct: true
  readonly identityTransport: false
  readonly pluralCollapse: false
  readonly runtimeExecuted: false
  readonly workflowDispatched: false
  readonly defaultBranchWritten: false
  readonly finalKapsyla: false
  readonly fixedPointSha256: string
}

const PANELS = [
  ['panel.brane', 1, 'braided-brane-of-branes-and-sigil-typing', 'BRANE_CYAN', 'forward-dashed', 'Braided brane-of-branes'],
  ['panel.totalization', 2, 'weak-three-dimensional-graphical-calculus-totalization', 'JARAKU_VIOLET', 'higher-crosshatch', 'Weak 3-D totalization'],
  ['panel.hk_fm', 3, 'hyperkaehler-and-fourier-mukai-deep-colex', 'PIORNALEGO_GOLD', 'coherence-solid', 'Hyperkaehler Fourier-Mukai deep colex'],
  ['panel.dual_solids', 4, 'global-quasi-category-dual-solids-and-momentum', 'KINK_MAGENTA', 'reverse-chevron', 'Dual solids and momentum'],
  ['panel.scutoid', 5, 'scutoid-geometry-and-packing', 'BRANE_CYAN', 'structural-outline', 'Scutoid geometry'],
  ['panel.qubit', 6, 'chiral-qubit-polytope-colex-eight-state-model', 'PIORNALEGO_GOLD', 'colex-grid', 'Chiral qubit eight-state colex'],
].map(([panelId, ordinal, slug, colorToken, patternToken, textLabel]) => ({
  panelId,
  ordinal,
  slug,
  colorToken,
  patternToken,
  textLabel,
  renderIsProjection: true,
  canonicalAuthority: false,
})) as readonly RenderPanel[]

const CONTEXTS = [
  {
    axis: 'X',
    contextId: 'ctx.qubit.X',
    measurableRelationIds: ['rel.identity', 'rel.measure.X', 'rel.glue.XY', 'rel.glue.ZX'],
    heldRelationIds: ['rel.measure.Y', 'rel.measure.Z', 'rel.glue.YZ'],
  },
  {
    axis: 'Y',
    contextId: 'ctx.qubit.Y',
    measurableRelationIds: ['rel.identity', 'rel.measure.Y', 'rel.glue.XY', 'rel.glue.YZ'],
    heldRelationIds: ['rel.measure.X', 'rel.measure.Z', 'rel.glue.ZX'],
  },
  {
    axis: 'Z',
    contextId: 'ctx.qubit.Z',
    measurableRelationIds: ['rel.identity', 'rel.measure.Z', 'rel.glue.YZ', 'rel.glue.ZX'],
    heldRelationIds: ['rel.measure.X', 'rel.measure.Y', 'rel.glue.XY'],
  },
].map((value) => ({
  ...value,
  identityCellId: 'cell.identity',
  allRelationsJointlyMeasurable: false,
  physicalMeasurementExecuted: false,
})) as readonly ChiralContextView[]

const HELD_CLAIMS = [
  {
    relationId: 'rel.fm.reverse',
    reason: 'reverse transform remains an adjoint/equivalence candidate',
    promoted: false,
  },
  {
    relationId: 'rel.hk.preservation',
    reason: 'derived equivalence does not prove Hyperkaehler preservation',
    promoted: false,
  },
  {
    relationId: 'rel.scutoid.intercalation',
    reason: 'render does not prove a physical tissue-energy model',
    promoted: false,
  },
] as const satisfies readonly HeldClaimView[]

const INVARIANTS = [
  'NO_IDENTITY_TRANSPORT',
  'NO_PLURAL_COLLAPSE',
  'SAFE_REPLAY',
  'TRACE_PRESERVED',
  'PROVENANCE_PRESERVED',
  'PI_FIXED',
  'COLOR_IS_NOT_IDENTITY',
  'RENDER_IS_PROJECTION',
  'NO_SINGLE_CHIRAL_CONTEXT_IS_COMPLETE',
] as const

function stable(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stable)
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, item]) => [key, stable(item)]),
    )
  }
  return value
}

function digest(value: unknown): string {
  return createHash('sha256').update(JSON.stringify(stable(value))).digest('hex')
}

function source(
  repository: string,
  pullRequest: number,
  headSha: string,
  payloadSha256: string,
): SourceBinding {
  return {
    repository,
    pullRequest,
    headSha,
    payloadSha256,
    identityDistinct: true,
    authorityTransferred: false,
  }
}

export function buildJaranianTotalColexAtlasProjection(): JaranianTotalColexAtlasProjection {
  const withoutFixedPoint = {
    id: SCHEMA_ID,
    canon: CANON,
    authorOwner: 'Jara Juana Bermejo Vega / JJBV',
    parent: source(
      'jbermejovega/universal-abstrakta-plural-aesthetik',
      UAPA_PARENT_PULL_REQUEST,
      UAPA_PARENT_HEAD,
      UAPA_PARENT_HEAD,
    ),
    sigilbookSource: source(
      'jbermejovega/sigilbook',
      SIGILBOOK_SOURCE_PULL_REQUEST,
      SIGILBOOK_SOURCE_HEAD,
      SIGILBOOK_BUNDLE_SHA256,
    ),
    sigil4cpythonSource: source(
      'jbermejovega/sigil4cpython',
      SIGIL4CPYTHON_SOURCE_PULL_REQUEST,
      SIGIL4CPYTHON_SOURCE_HEAD,
      SIGIL4CPYTHON_PROJECTION_SHA256,
    ),
    identityCellId: 'cell.identity',
    identityRelationId: 'rel.identity',
    layers: ['H1_OBJECTS', 'H2_FUNCTORS', 'H3_NATURAL_TRANSFORMATIONS', 'H4_COHERENCE'],
    panels: PANELS,
    chiralContexts: CONTEXTS,
    heldClaims: HELD_CLAIMS,
    invariants: INVARIANTS,
    exactEndLine: EXPECTED_END_LINE,
    renderIsProjection: true,
    colorIsIdentity: false,
    sourceModelsRemainDistinct: true,
    projectionRemainsDistinct: true,
    identityTransport: false,
    pluralCollapse: false,
    runtimeExecuted: false,
    workflowDispatched: false,
    defaultBranchWritten: false,
    finalKapsyla: false,
  } as const
  return {
    ...withoutFixedPoint,
    fixedPointSha256: digest(withoutFixedPoint),
  }
}

export function validateJaranianTotalColexAtlasProjection(
  projection: JaranianTotalColexAtlasProjection,
): readonly string[] {
  const errors: string[] = []
  if (projection.parent.headSha !== UAPA_PARENT_HEAD) errors.push('UAPA_PARENT_HEAD_DRIFT')
  if (projection.sigilbookSource.headSha !== SIGILBOOK_SOURCE_HEAD) errors.push('SIGILBOOK_SOURCE_HEAD_DRIFT')
  if (projection.sigilbookSource.payloadSha256 !== SIGILBOOK_BUNDLE_SHA256) errors.push('SIGILBOOK_BUNDLE_DRIFT')
  if (projection.sigil4cpythonSource.headSha !== SIGIL4CPYTHON_SOURCE_HEAD) errors.push('SIGIL4CPYTHON_SOURCE_HEAD_DRIFT')
  if (projection.sigil4cpythonSource.payloadSha256 !== SIGIL4CPYTHON_PROJECTION_SHA256) errors.push('SIGIL4CPYTHON_PROJECTION_DIGEST_DRIFT')
  if (projection.panels.length !== 6) errors.push('ATLAS_REQUIRES_SIX_PANELS')
  if (new Set(projection.panels.map((panel) => panel.panelId)).size !== 6) errors.push('PANEL_IDENTITY_COLLISION')
  if (new Set(projection.panels.map((panel) => panel.ordinal)).size !== 6) errors.push('PANEL_ORDER_COLLISION')
  if (projection.layers.length !== 4 || new Set(projection.layers).size !== 4) errors.push('ATLAS_REQUIRES_H1_H2_H3_H4')
  if (projection.identityCellId !== 'cell.identity' || projection.identityRelationId !== 'rel.identity') errors.push('PACACORE_IDENTITY_MISMATCH')
  if (projection.chiralContexts.length !== 3) errors.push('ATLAS_REQUIRES_X_Y_Z_CONTEXTS')
  for (const context of projection.chiralContexts) {
    if (context.identityCellId !== 'cell.identity' || !context.measurableRelationIds.includes('rel.identity')) {
      errors.push(`CONTEXT_IDENTITY_MISSING:${context.axis}`)
    }
    if (context.heldRelationIds.length === 0 || context.allRelationsJointlyMeasurable) {
      errors.push(`SINGLE_CONTEXT_CLAIMS_GLOBAL_COMPLETENESS:${context.axis}`)
    }
    if (context.physicalMeasurementExecuted) errors.push(`PHYSICAL_MEASUREMENT_EXECUTED:${context.axis}`)
  }
  if (projection.heldClaims.some((claim) => claim.promoted)) errors.push('HELD_CLAIM_PROMOTED')
  if (projection.panels.some((panel) => !panel.renderIsProjection || panel.canonicalAuthority)) errors.push('RENDER_AUTHORITY_BOUNDARY_BROKEN')
  if (projection.colorIsIdentity) errors.push('COLOR_MAY_NOT_CARRY_IDENTITY')
  if (projection.identityTransport || projection.pluralCollapse) errors.push('IDENTITY_OR_PLURALITY_BOUNDARY_BROKEN')
  if (projection.runtimeExecuted || projection.workflowDispatched || projection.defaultBranchWritten || projection.finalKapsyla) errors.push('EXECUTION_BOUNDARY_BROKEN')
  const { fixedPointSha256: _, ...payload } = projection
  if (projection.fixedPointSha256 !== digest(payload)) errors.push('FIXED_POINT_DIGEST_DRIFT')
  return errors
}

export function validateProjectionDocument(document: string): readonly string[] {
  const errors: string[] = []
  const lines = document.replace(/\n+$/, '').split('\n')
  if (lines.at(-1) !== EXPECTED_END_LINE) errors.push('EXACT_END_LINE_MISSING')
  if (document.split(EXPECTED_END_LINE).length - 1 !== 1) errors.push('END_LINE_NOT_UNIQUE')
  for (const required of [
    `projection ${SCHEMA_ID}`,
    `source sigilbook#746@${SIGILBOOK_SOURCE_HEAD}`,
    `source sigil4cpython#9@${SIGIL4CPYTHON_SOURCE_HEAD}`,
    'identity cell.identity relation rel.identity',
    'context X incomplete true',
    'context Y incomplete true',
    'context Z incomplete true',
    'invariant RENDER_IS_PROJECTION',
  ]) {
    if (!lines.includes(required)) errors.push(`MISSING_LINE:${required}`)
  }
  return errors
}
