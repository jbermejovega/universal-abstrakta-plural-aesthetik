export type JarrasInvariant =
  | 'no_transport'
  | 'no_coercion'
  | 'safe_replay'
  | 'trace_preserved'
  | 'pi_fixed'
  | 'body_boundary_preserved'
  | 'authorship_preserved'
  | 'plurality_not_collapsed'
  | 'public_internal_separated'
  | 'consent_first'

export type JarrasModuleId =
  | 'pelvic-foundation'
  | 'hiphop-groove'
  | 'composition-lab'
  | 'floor-metastability'
  | 'somatic-sensorial'
  | 'eulerian-improvisation'
  | 'sound-synthesis'
  | 'queer-bounce-lineage'
  | 'safe-replay'

export type JarrasFigureId =
  | 'hyperlattice-course-map'
  | 'pelvis-core'
  | 'hiphop-groove'
  | 'cuadradinho-brega-funk'
  | 'hexagonin-jaraniano'
  | 'jarras-choreo-transitions'
  | 'floor-drops-metastable'
  | 'somatic-sensorial'
  | 'eulerian-random-path'
  | 'psychedelic-postclub'
  | 'quantum-instrumentality'
  | 'queer-bounce-history'
  | 'safe-replay-consent-first'

export type MovementAtomKind =
  | 'updown'
  | 'jiggle'
  | 'tiktok'
  | 'bounce'
  | 'wave'
  | 'rockin'
  | 'shake'
  | 'floor-drop'
  | 'pause'

export type MovementLayer =
  | 'pelvis'
  | 'groove'
  | 'composition'
  | 'floorwork'
  | 'somatic'
  | 'history'
  | 'sound'
  | 'safety'

export type FigureBatch = 'foundation' | 'transition-somatic' | 'history-sound-synthesis'

export type JarrasRelationKind =
  | 'teaches'
  | 'combines'
  | 'transitions'
  | 'grounds'
  | 'historicizes'
  | 'sonifies'
  | 'validates'
  | 'glues'

export interface MovementAtom {
  readonly id: MovementAtomKind
  readonly label: string
  readonly layer: MovementLayer
  readonly cue: string
  readonly visual: string
  readonly safety: readonly string[]
}

export interface MovementFormula {
  readonly id: string
  readonly label: string
  readonly atoms: readonly MovementAtomKind[]
  readonly geometry: 'line' | 'square' | 'hexagon' | 'graph' | 'cycle' | 'field'
  readonly rhythm: string
  readonly rule: string
}

export interface JarrasCourseModule {
  readonly id: JarrasModuleId
  readonly title: string
  readonly purpose: string
  readonly atoms: readonly MovementAtomKind[]
  readonly formulas: readonly string[]
  readonly historicalContext: readonly string[]
  readonly soundContext: readonly string[]
  readonly invariants: readonly JarrasInvariant[]
}

export interface JarrasFigureSpec {
  readonly id: JarrasFigureId
  readonly batch: FigureBatch
  readonly title: string
  readonly subtitle: string
  readonly moduleIds: readonly JarrasModuleId[]
  readonly visualKernel: readonly string[]
  readonly caption: string
  readonly altText: string
  readonly prompt: string
  readonly invariants: readonly JarrasInvariant[]
}

export interface HyperlatticeNode {
  readonly id: string
  readonly label: string
  readonly layer: MovementLayer | 'global'
  readonly section: 'local' | 'global' | 'boundary'
  readonly weight: number
}

export interface HyperlatticeEdge {
  readonly source: string
  readonly target: string
  readonly relation: JarrasRelationKind
  readonly via: 'PACAUAP' | 'PACAPDG' | 'CLICK42' | 'JARRAS_CHOREO' | 'SIGILPI' | 'KAPSYLA'
  readonly preserves: readonly JarrasInvariant[]
}

export interface CourseHyperlattice {
  readonly nodes: readonly HyperlatticeNode[]
  readonly edges: readonly HyperlatticeEdge[]
  readonly globalSection: 'GLOBAL_SECTION_PACAPDG'
}

export interface SocialMediaCard {
  readonly figureId: JarrasFigureId
  readonly caption: string
  readonly shortCaption: string
  readonly hashtags: readonly string[]
  readonly altText: string
}

export interface JarrasKhoreoLibrary {
  readonly id: 'JARRAS_KHOREO_LIBRARY_V1'
  readonly authorOwner: 'Jara Juana Bermejo Vega / JJBV'
  readonly performanceLine: string
  readonly modules: readonly JarrasCourseModule[]
  readonly atoms: readonly MovementAtom[]
  readonly formulas: readonly MovementFormula[]
  readonly figures: readonly JarrasFigureSpec[]
  readonly hyperlattice: CourseHyperlattice
  readonly invariants: readonly JarrasInvariant[]
}

export interface JarrasValidationIssue {
  readonly code:
    | 'MISSING_INVARIANT'
    | 'UNKNOWN_ATOM'
    | 'UNKNOWN_FORMULA'
    | 'UNKNOWN_MODULE'
    | 'BROKEN_HYPERLATTICE_EDGE'
    | 'EMPTY_CAPTION'
  readonly severity: 'error' | 'warning'
  readonly path: string
  readonly message: string
}

export interface JarrasValidationReport {
  readonly ok: boolean
  readonly issues: readonly JarrasValidationIssue[]
}
