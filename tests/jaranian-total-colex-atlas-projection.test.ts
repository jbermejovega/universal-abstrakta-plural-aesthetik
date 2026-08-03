import {
  SIGIL4CPYTHON_SOURCE_HEAD,
  SIGILBOOK_SOURCE_HEAD,
  buildJaranianTotalColexAtlasProjection,
  validateJaranianTotalColexAtlasProjection,
  validateProjectionDocument,
} from '../src/sigil/jaranian-total-colex-atlas-projection.js'

declare const process: { exitCode?: number }

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const projection = buildJaranianTotalColexAtlasProjection()
assert(validateJaranianTotalColexAtlasProjection(projection).length === 0, 'reference projection must validate')
assert(projection.panels.length === 6, 'six panels required')
assert(projection.layers.length === 4, 'four colex layers required')
assert(projection.chiralContexts.length === 3, 'three chiral contexts required')
assert(projection.identityCellId === 'cell.identity', 'identity cell required')
assert(projection.sigilbookSource.headSha === SIGILBOOK_SOURCE_HEAD, 'sigilbook source drift')
assert(projection.sigil4cpythonSource.headSha === SIGIL4CPYTHON_SOURCE_HEAD, 'sigil4cpython source drift')
assert(projection.chiralContexts.every((context) => context.heldRelationIds.length > 0), 'held context inventory required')
assert(projection.heldClaims.every((claim) => !claim.promoted), 'held claims cannot be promoted')
assert(projection.panels.every((panel) => panel.renderIsProjection && !panel.canonicalAuthority), 'render boundary required')

const second = buildJaranianTotalColexAtlasProjection()
assert(projection.fixedPointSha256 === second.fixedPointSha256, 'fixed point must be deterministic')

const bad = {
  ...projection,
  chiralContexts: projection.chiralContexts.map((context, index) =>
    index === 0 ? { ...context, allRelationsJointlyMeasurable: true as never } : context,
  ),
}
assert(
  validateJaranianTotalColexAtlasProjection(bad).includes('SINGLE_CONTEXT_CLAIMS_GLOBAL_COMPLETENESS:X'),
  'single-context global completeness must reject',
)

const document = [
  `projection ${projection.id}`,
  `source sigilbook#746@${SIGILBOOK_SOURCE_HEAD}`,
  `source sigil4cpython#9@${SIGIL4CPYTHON_SOURCE_HEAD}`,
  'identity cell.identity relation rel.identity',
  'context X incomplete true',
  'context Y incomplete true',
  'context Z incomplete true',
  'invariant RENDER_IS_PROJECTION',
  projection.exactEndLine,
].join('\n')
assert(validateProjectionDocument(document).length === 0, 'projection document must validate')

console.log(JSON.stringify({ tests: 13, fixedPointSha256: projection.fixedPointSha256 }))
process.exitCode = 0
