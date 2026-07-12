import {
  COURSE_HYPERLATTICE,
  COURSE_MODULES,
  FIGURE_SPECS,
  JARRAS_INVARIANTS,
  MOVEMENT_ATOMS,
  MOVEMENT_FORMULAS,
} from './catalog.js'
import type {
  CourseHyperlattice,
  HyperlatticeEdge,
  HyperlatticeNode,
  JarrasCourseModule,
  JarrasFigureId,
  JarrasFigureSpec,
  JarrasInvariant,
  JarrasKhoreoLibrary,
  MovementAtom,
  MovementFormula,
  SocialMediaCard,
  ValidationIssue,
  ValidationReport,
} from './types.js'

export const JARRAS_KHOREO_LIBRARY_ID = 'JARRAS_KHOREO_LIBRARY_V1' as const
export const JARRAS_KHOREO_AUTHOR_OWNER = 'Jara Juana Bermejo Vega / JJBV' as const
export const DEFAULT_PERFORMANCE_LINE = 'I survived becoming a Turk teacher doing JavaScript' as const

export interface BuildJarrasKhoreoLibraryOptions {
  readonly performanceLine?: string
}

export interface FigurePromptOptions {
  readonly includeInvariants?: boolean
  readonly includeAltText?: boolean
}

export function buildJarrasKhoreoLibrary(options: BuildJarrasKhoreoLibraryOptions = {}): JarrasKhoreoLibrary {
  return Object.freeze({
    id: JARRAS_KHOREO_LIBRARY_ID,
    authorOwner: JARRAS_KHOREO_AUTHOR_OWNER,
    performanceLine: options.performanceLine ?? DEFAULT_PERFORMANCE_LINE,
    modules: COURSE_MODULES,
    atoms: MOVEMENT_ATOMS,
    formulas: MOVEMENT_FORMULAS,
    figures: FIGURE_SPECS,
    hyperlattice: COURSE_HYPERLATTICE,
    invariants: JARRAS_INVARIANTS,
  })
}

export function getMovementAtom(id: string, atoms: readonly MovementAtom[] = MOVEMENT_ATOMS): MovementAtom | undefined {
  return atoms.find((atom) => atom.id === id)
}

export function getMovementFormula(
  id: string,
  formulas: readonly MovementFormula[] = MOVEMENT_FORMULAS,
): MovementFormula | undefined {
  return formulas.find((formula) => formula.id === id)
}

export function getCourseModule(
  id: string,
  modules: readonly JarrasCourseModule[] = COURSE_MODULES,
): JarrasCourseModule | undefined {
  return modules.find((module) => module.id === id)
}

export function getFigureSpec(id: JarrasFigureId, figures: readonly JarrasFigureSpec[] = FIGURE_SPECS): JarrasFigureSpec | undefined {
  return figures.find((figure) => figure.id === id)
}

export function createFigurePrompt(figure: JarrasFigureSpec, options: FigurePromptOptions = {}): string {
  const invariantLine = options.includeInvariants === false ? '' : `\nInvariants: ${figure.invariants.join(' · ')}.`
  const altLine = options.includeAltText ? `\nAlt text target: ${figure.altText}` : ''
  return [
    figure.prompt,
    `Title: ${figure.title}.`,
    `Subtitle: ${figure.subtitle}.`,
    `Caption: ${figure.caption}.`,
    `Visual kernel: ${figure.visualKernel.join(', ')}.`,
    'Use a pedagogical, dressed, consent-first course-figure style; avoid invasive sexualization and avoid violence.',
    `${invariantLine}${altLine}`.trim(),
  ]
    .filter((part) => part.length > 0)
    .join('\n')
}

export function createSocialMediaCards(figures: readonly JarrasFigureSpec[] = FIGURE_SPECS): readonly SocialMediaCard[] {
  return figures.map((figure) =>
    Object.freeze({
      figureId: figure.id,
      caption: `${figure.title} — ${figure.caption}`,
      shortCaption: figure.caption,
      hashtags: Object.freeze(['#JarrasKhoreo', '#PACAZINE', '#TwerkPedagogy', '#SafeReplay', '#PluralTyped']),
      altText: figure.altText,
    }),
  )
}

export function renderCourseManifest(library: JarrasKhoreoLibrary = buildJarrasKhoreoLibrary()): string {
  const moduleLines = library.modules.map(
    (module) => `- ${module.title}: ${module.purpose}`,
  )
  const figureLines = library.figures.map(
    (figure) => `- ${figure.title}: ${figure.subtitle} — ${figure.caption}`,
  )
  return [
    `# ${library.id}`,
    '',
    `Author-owner: ${library.authorOwner}`,
    `Performance line: ${library.performanceLine}`,
    '',
    '## Modules',
    ...moduleLines,
    '',
    '## Figures',
    ...figureLines,
    '',
    '## Invariants',
    library.invariants.map((invariant) => `- ${invariant}`).join('\n'),
  ].join('\n')
}

export function validateJarrasKhoreoLibrary(library: JarrasKhoreoLibrary): ValidationReport {
  const issues: ValidationIssue[] = []
  const atomIds = new Set(library.atoms.map((atom) => atom.id))
  const formulaIds = new Set(library.formulas.map((formula) => formula.id))
  const moduleIds = new Set(library.modules.map((module) => module.id))
  const nodeIds = new Set(library.hyperlattice.nodes.map((node) => node.id))

  assertRequiredInvariants(library.invariants, 'library.invariants', issues)

  library.modules.forEach((module, moduleIndex) => {
    assertRequiredInvariants(module.invariants, `modules[${moduleIndex}].invariants`, issues)
    module.atoms.forEach((atomId) => {
      if (!atomIds.has(atomId)) {
        issues.push({
          code: 'UNKNOWN_ATOM',
          severity: 'error',
          path: `modules[${moduleIndex}].atoms`,
          message: `Unknown movement atom: ${atomId}`,
        })
      }
    })
    module.formulas.forEach((formulaId) => {
      if (!formulaIds.has(formulaId)) {
        issues.push({
          code: 'UNKNOWN_FORMULA',
          severity: 'error',
          path: `modules[${moduleIndex}].formulas`,
          message: `Unknown movement formula: ${formulaId}`,
        })
      }
    })
  })

  library.figures.forEach((figure, figureIndex) => {
    assertRequiredInvariants(figure.invariants, `figures[${figureIndex}].invariants`, issues)
    if (figure.caption.trim().length === 0) {
      issues.push({
        code: 'EMPTY_CAPTION',
        severity: 'warning',
        path: `figures[${figureIndex}].caption`,
        message: `Figure ${figure.id} should have a caption.`,
      })
    }
    figure.moduleIds.forEach((moduleId) => {
      if (!moduleIds.has(moduleId)) {
        issues.push({
          code: 'UNKNOWN_MODULE',
          severity: 'error',
          path: `figures[${figureIndex}].moduleIds`,
          message: `Unknown module: ${moduleId}`,
        })
      }
    })
  })

  library.hyperlattice.edges.forEach((edge, edgeIndex) => {
    if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) {
      issues.push({
        code: 'BROKEN_HYPERLATTICE_EDGE',
        severity: 'error',
        path: `hyperlattice.edges[${edgeIndex}]`,
        message: `Broken edge ${edge.source} -> ${edge.target}`,
      })
    }
    assertRequiredInvariants(edge.preserves, `hyperlattice.edges[${edgeIndex}].preserves`, issues)
  })

  return Object.freeze({
    ok: issues.every((issue) => issue.severity !== 'error'),
    issues: Object.freeze(issues),
  })
}

function assertRequiredInvariants(
  invariants: readonly JarrasInvariant[],
  path: string,
  issues: ValidationIssue[],
): void {
  const required: readonly JarrasInvariant[] = Object.freeze([
    'no_transport',
    'safe_replay',
    'trace_preserved',
    'pi_fixed',
    'body_boundary_preserved',
    'authorship_preserved',
    'consent_first',
  ])
  const actual = new Set(invariants)
  required.forEach((invariant) => {
    if (!actual.has(invariant)) {
      issues.push({
        code: 'MISSING_INVARIANT',
        severity: 'error',
        path,
        message: `Missing invariant: ${invariant}`,
      })
    }
  })
}

export type {
  CourseHyperlattice,
  HyperlatticeEdge,
  HyperlatticeNode,
  JarrasCourseModule,
  JarrasFigureId,
  JarrasFigureSpec,
  JarrasInvariant,
  JarrasKhoreoLibrary,
  MovementAtom,
  MovementFormula,
  SocialMediaCard,
  ValidationIssue,
  ValidationReport,
}

export {
  COURSE_HYPERLATTICE,
  COURSE_MODULES,
  FIGURE_SPECS,
  JARRAS_INVARIANTS,
  MOVEMENT_ATOMS,
  MOVEMENT_FORMULAS,
}
