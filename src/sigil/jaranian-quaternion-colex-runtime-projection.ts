import { createHash } from 'node:crypto'

export const JARANIAN_QUATERNION_COLEX_UAPA_RUNTIME_PROJECTION_V1 =
  'JARANIAN_QUATERNION_COLEX_UAPA_RUNTIME_PROJECTION_V1' as const
export const SIGILBOOK_RUNTIME_HEAD =
  '28fd3f150fb1520ea322b35d4d6542a7738ae11d' as const
export const SIGIL4CPYTHON_RUNTIME_PROJECTION_HEAD =
  'c7191b7bf867e41e84e4daac3ac59b79f968d04d' as const
export const UAPA_PARENT_HEAD =
  'e55d0f06e0b4d377c933a5b63cf2c572b24cf148' as const
export const EXPECTED_RUNTIME_END_LINE =
  `end ${JARANIAN_QUATERNION_COLEX_UAPA_RUNTIME_PROJECTION_V1}` as const

export interface RuntimeSourceFile {
  readonly path: string
  readonly role:
    | 'QUATERNION_MESH_AND_CONTEXT_RUNTIME'
    | 'IMMEDIATE_MESH_BASIS_OVERLAY'
    | 'SCENE_BINDING'
  readonly sourceOnly: true
  readonly parserObserved: false
  readonly runtimeExecuted: false
}

export interface QuaternionEquationView {
  readonly equationId: string
  readonly expression: string
  readonly sourceChecked: true
  readonly runtimeObserved: false
}

export interface RuntimeContextView {
  readonly axis: 'GLOBAL' | 'X' | 'Y' | 'Z'
  readonly identityVisible: true
  readonly stabilizerVisible: true
  readonly chiralityLayersVisible: true
  readonly heldAxes: readonly string[]
  readonly allRelationsJointlyMeasurable: false
}

export interface JaranianQuaternionColexRuntimeProjection {
  readonly id: typeof JARANIAN_QUATERNION_COLEX_UAPA_RUNTIME_PROJECTION_V1
  readonly authorOwner: 'Jara Juana Bermejo Vega / JJBV'
  readonly sources: {
    readonly sigilbook: {
      readonly pullRequest: 746
      readonly headSha: typeof SIGILBOOK_RUNTIME_HEAD
    }
    readonly sigil4cpython: {
      readonly pullRequest: 9
      readonly headSha: typeof SIGIL4CPYTHON_RUNTIME_PROJECTION_HEAD
    }
    readonly uapaParent: {
      readonly pullRequest: 21
      readonly headSha: typeof UAPA_PARENT_HEAD
    }
  }
  readonly sourceFiles: readonly RuntimeSourceFile[]
  readonly equations: readonly QuaternionEquationView[]
  readonly contexts: readonly RuntimeContextView[]
  readonly identityAnchorId: 'Identity_ONE_Gold'
  readonly stabilizerPolytopeId: 'StabilizerOctahedron_Gold'
  readonly oppositePhaseOperation: 'QUATERNION_ANTIPODE'
  readonly phaseProjectionRadius: 'sqrt(3)'
  readonly compositeStatesNormalized: true
  readonly parityLayersArePauliContexts: false
  readonly palette: readonly {
    readonly token: string
    readonly hex: string
    readonly pattern: string
  }[]
  readonly renderIsProjection: true
  readonly canonicalAuthority: false
  readonly physicalMeasurementExecuted: false
  readonly godotStarted: false
  readonly runtimeExecuted: false
  readonly identityTransport: false
  readonly tracePreserved: true
  readonly piFixed: true
  readonly finalKapsyla: false
  readonly exactEndLine: typeof EXPECTED_RUNTIME_END_LINE
  readonly fixedPointSha256: string
}

const SOURCE_FILES = [
  {
    path: 'godot/sigil4godot/jaranian/JaranianQuaternionColex.gd',
    role: 'QUATERNION_MESH_AND_CONTEXT_RUNTIME',
    sourceOnly: true,
    parserObserved: false,
    runtimeExecuted: false,
  },
  {
    path: 'godot/sigil4godot/jaranian/JaranianBasisRenderer.gd',
    role: 'IMMEDIATE_MESH_BASIS_OVERLAY',
    sourceOnly: true,
    parserObserved: false,
    runtimeExecuted: false,
  },
  {
    path: 'godot/sigil4godot/jaranian/JaranianQuaternionColex.tscn',
    role: 'SCENE_BINDING',
    sourceOnly: true,
    parserObserved: false,
    runtimeExecuted: false,
  },
] as const satisfies readonly RuntimeSourceFile[]

const EQUATIONS = [
  ['X2_NEG_ONE', 'i*i=-1'],
  ['Y2_NEG_ONE', 'j*j=-1'],
  ['Z2_NEG_ONE', 'k*k=-1'],
  ['XY_Z', 'i*j=k'],
  ['YZ_X', 'j*k=i'],
  ['ZX_Y', 'k*i=j'],
  ['YX_NEG_Z', 'j*i=-k'],
  ['ZY_NEG_X', 'k*j=-i'],
  ['XZ_NEG_Y', 'i*k=-j'],
  ['XYZ_NEG_ONE', 'i*j*k=-1'],
  ['ONE_X_X', '1*i=i'],
].map(([equationId, expression]) => ({
  equationId,
  expression,
  sourceChecked: true,
  runtimeObserved: false,
})) as readonly QuaternionEquationView[]

const CONTEXTS = [
  ['GLOBAL', []],
  ['X', ['Y', 'Z']],
  ['Y', ['X', 'Z']],
  ['Z', ['X', 'Y']],
].map(([axis, heldAxes]) => ({
  axis,
  identityVisible: true,
  stabilizerVisible: true,
  chiralityLayersVisible: true,
  heldAxes,
  allRelationsJointlyMeasurable: false,
})) as readonly RuntimeContextView[]

const PALETTE = [
  { token: 'BRANE_CYAN', hex: '#22D3EE', pattern: 'forward-dashed' },
  { token: 'KINK_MAGENTA', hex: '#F472B6', pattern: 'reverse-chevron' },
  { token: 'PIORNALEGO_GOLD', hex: '#F5C542', pattern: 'coherence-solid' },
  { token: 'PARCHMENT_CREAM', hex: '#F8F6E8', pattern: 'structural-outline' },
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

export function buildJaranianQuaternionColexRuntimeProjection(): JaranianQuaternionColexRuntimeProjection {
  const payload = {
    id: JARANIAN_QUATERNION_COLEX_UAPA_RUNTIME_PROJECTION_V1,
    authorOwner: 'Jara Juana Bermejo Vega / JJBV',
    sources: {
      sigilbook: { pullRequest: 746, headSha: SIGILBOOK_RUNTIME_HEAD },
      sigil4cpython: {
        pullRequest: 9,
        headSha: SIGIL4CPYTHON_RUNTIME_PROJECTION_HEAD,
      },
      uapaParent: { pullRequest: 21, headSha: UAPA_PARENT_HEAD },
    },
    sourceFiles: SOURCE_FILES,
    equations: EQUATIONS,
    contexts: CONTEXTS,
    identityAnchorId: 'Identity_ONE_Gold',
    stabilizerPolytopeId: 'StabilizerOctahedron_Gold',
    oppositePhaseOperation: 'QUATERNION_ANTIPODE',
    phaseProjectionRadius: 'sqrt(3)',
    compositeStatesNormalized: true,
    parityLayersArePauliContexts: false,
    palette: PALETTE,
    renderIsProjection: true,
    canonicalAuthority: false,
    physicalMeasurementExecuted: false,
    godotStarted: false,
    runtimeExecuted: false,
    identityTransport: false,
    tracePreserved: true,
    piFixed: true,
    finalKapsyla: false,
    exactEndLine: EXPECTED_RUNTIME_END_LINE,
  } as const
  return { ...payload, fixedPointSha256: digest(payload) }
}

export function validateJaranianQuaternionColexRuntimeProjection(
  projection: JaranianQuaternionColexRuntimeProjection,
): readonly string[] {
  const errors: string[] = []
  if (projection.sources.sigilbook.headSha !== SIGILBOOK_RUNTIME_HEAD) errors.push('SIGILBOOK_RUNTIME_HEAD_DRIFT')
  if (projection.sources.sigil4cpython.headSha !== SIGIL4CPYTHON_RUNTIME_PROJECTION_HEAD) errors.push('SIGIL4CPYTHON_RUNTIME_HEAD_DRIFT')
  if (projection.sources.uapaParent.headSha !== UAPA_PARENT_HEAD) errors.push('UAPA_PARENT_HEAD_DRIFT')
  if (projection.sourceFiles.length !== 3 || projection.sourceFiles.some((file) => !file.sourceOnly || file.parserObserved || file.runtimeExecuted)) errors.push('GODOT_SOURCE_BOUNDARY_BROKEN')
  if (projection.equations.length !== 11 || projection.equations.some((equation) => !equation.sourceChecked || equation.runtimeObserved)) errors.push('QUATERNION_EQUATION_BOUNDARY_BROKEN')
  if (projection.contexts.length !== 4) errors.push('CONTEXT_INVENTORY_MISMATCH')
  for (const context of projection.contexts) {
    if (!context.identityVisible || !context.stabilizerVisible || !context.chiralityLayersVisible) errors.push(`CONTEXT_ERASES_GEOMETRY:${context.axis}`)
    if (context.axis !== 'GLOBAL' && context.heldAxes.length === 0) errors.push(`CONTEXT_HELD_AXES_MISSING:${context.axis}`)
    if (context.allRelationsJointlyMeasurable) errors.push(`CONTEXT_OVERCLAIMS_MEASUREMENT:${context.axis}`)
  }
  if (projection.identityAnchorId === projection.stabilizerPolytopeId) errors.push('IDENTITY_STABILIZER_COLLAPSE')
  if (projection.oppositePhaseOperation !== 'QUATERNION_ANTIPODE') errors.push('OPPOSITE_PHASE_OPERATION_MISMATCH')
  if (!projection.compositeStatesNormalized || projection.phaseProjectionRadius !== 'sqrt(3)') errors.push('PHASE_PROJECTION_MISMATCH')
  if (projection.parityLayersArePauliContexts) errors.push('PARITY_CONTEXT_COLLAPSE')
  if (!projection.renderIsProjection || projection.canonicalAuthority) errors.push('RENDER_AUTHORITY_BOUNDARY_BROKEN')
  if (projection.physicalMeasurementExecuted || projection.godotStarted || projection.runtimeExecuted || projection.finalKapsyla) errors.push('EXECUTION_BOUNDARY_BROKEN')
  if (projection.identityTransport || !projection.tracePreserved || !projection.piFixed) errors.push('INVARIANT_BOUNDARY_BROKEN')
  const { fixedPointSha256: _, ...payload } = projection
  if (projection.fixedPointSha256 !== digest(payload)) errors.push('FIXED_POINT_DIGEST_DRIFT')
  return errors
}

export function validateRuntimeProjectionDocument(document: string): readonly string[] {
  const errors: string[] = []
  const lines = document.replace(/\n+$/, '').split('\n')
  if (lines.at(-1) !== EXPECTED_RUNTIME_END_LINE) errors.push('EXACT_END_LINE_MISSING')
  for (const required of [
    `projection ${JARANIAN_QUATERNION_COLEX_UAPA_RUNTIME_PROJECTION_V1}`,
    `source sigilbook#746@${SIGILBOOK_RUNTIME_HEAD}`,
    `source sigil4cpython#9@${SIGIL4CPYTHON_RUNTIME_PROJECTION_HEAD}`,
    'identity Identity_ONE_Gold',
    'stabilizer StabilizerOctahedron_Gold',
    'operation opposite-phase QUATERNION_ANTIPODE',
    'invariant RENDER_IS_PROJECTION',
  ]) {
    if (!lines.includes(required)) errors.push(`MISSING_LINE:${required}`)
  }
  return errors
}
