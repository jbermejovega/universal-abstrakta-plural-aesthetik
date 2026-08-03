import {
  SIGIL4CPYTHON_RUNTIME_PROJECTION_HEAD,
  SIGILBOOK_RUNTIME_HEAD,
  buildJaranianQuaternionColexRuntimeProjection,
  validateJaranianQuaternionColexRuntimeProjection,
  validateRuntimeProjectionDocument,
} from '../src/sigil/jaranian-quaternion-colex-runtime-projection.js'

declare const process: { exitCode?: number }

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const projection = buildJaranianQuaternionColexRuntimeProjection()
assert(validateJaranianQuaternionColexRuntimeProjection(projection).length === 0, 'runtime projection must validate')
assert(projection.sources.sigilbook.headSha === SIGILBOOK_RUNTIME_HEAD, 'sigilbook runtime source drift')
assert(projection.sources.sigil4cpython.headSha === SIGIL4CPYTHON_RUNTIME_PROJECTION_HEAD, 'sigil4cpython runtime source drift')
assert(projection.sourceFiles.length === 3, 'three Godot source files required')
assert(projection.equations.length === 11, 'eleven quaternion equations required')
assert(projection.contexts.length === 4, 'GLOBAL/X/Y/Z contexts required')
assert(projection.identityAnchorId !== projection.stabilizerPolytopeId, 'identity must be distinct from stabilizer polytope')
assert(projection.oppositePhaseOperation === 'QUATERNION_ANTIPODE', 'opposite phase must use antipode')
assert(projection.compositeStatesNormalized, 'composite states must be normalized')
assert(!projection.parityLayersArePauliContexts, 'parity layers are not Pauli contexts')
assert(projection.contexts.every((context) => context.identityVisible), 'identity visible in every context')
assert(projection.contexts.every((context) => context.stabilizerVisible), 'stabilizer core visible in every context')
assert(projection.contexts.every((context) => context.chiralityLayersVisible), 'chirality layers visible in every context')
assert(projection.contexts.filter((context) => context.axis !== 'GLOBAL').every((context) => context.heldAxes.length === 2), 'local contexts require held axes')
assert(!projection.runtimeExecuted && !projection.godotStarted, 'runtime must remain unexecuted')

const second = buildJaranianQuaternionColexRuntimeProjection()
assert(projection.fixedPointSha256 === second.fixedPointSha256, 'fixed point must be deterministic')

const bad = {
  ...projection,
  identityAnchorId: projection.stabilizerPolytopeId as never,
}
assert(
  validateJaranianQuaternionColexRuntimeProjection(bad).includes('IDENTITY_STABILIZER_COLLAPSE'),
  'identity/stabilizer collapse must reject',
)

const document = [
  `projection ${projection.id}`,
  `source sigilbook#746@${SIGILBOOK_RUNTIME_HEAD}`,
  `source sigil4cpython#9@${SIGIL4CPYTHON_RUNTIME_PROJECTION_HEAD}`,
  'identity Identity_ONE_Gold',
  'stabilizer StabilizerOctahedron_Gold',
  'operation opposite-phase QUATERNION_ANTIPODE',
  'invariant RENDER_IS_PROJECTION',
  projection.exactEndLine,
].join('\n')
assert(validateRuntimeProjectionDocument(document).length === 0, 'runtime projection document must validate')

console.log(JSON.stringify({ tests: 18, fixedPointSha256: projection.fixedPointSha256 }))
process.exitCode = 0
