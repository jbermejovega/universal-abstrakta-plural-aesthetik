export const VORTICE_TWERK_PLURAL_AESTHETIK_V1 =
  'VORTICE_TWERK_PLURAL_AESTHETIK_V1' as const

export const VORTICE_TWERK_AUTHOR =
  'Jara Juana Bermejo Vega / JJBV' as const

export type VorticeTwerkSurface =
  | 'sigilbook:paca-base'
  | 'sigilbook:pacaiogames'
  | 'sigil4cpython:coherent-sheaf'
  | 'uapa:plural-aesthetik'
  | 'sigil4godot:scene-plan'

export interface SourcePin {
  readonly repository: string
  readonly commit: string
  readonly role: string
  readonly license: string
  readonly readOnly: true
  readonly codeCopied: false
  readonly identityTransported: false
  readonly obstruction?: string
}

export interface AesthetikCell {
  readonly id: string
  readonly surface: VorticeTwerkSurface
  readonly role:
    | 'base'
    | 'game'
    | 'localizer'
    | 'choreography'
    | 'portal'
    | 'render'
  readonly paletteRole:
    | 'void-charcoal'
    | 'piornalego-gold'
    | 'jaraku-violet'
    | 'brane-cyan'
    | 'kink-magenta'
    | 'parchment-cream'
  readonly pluralTyped: true
  readonly replayOrder: number
}

export interface CellularTwistedInjection {
  readonly id: string
  readonly source: string
  readonly target: string
  readonly qquapp: true
  readonly cellular: true
  readonly twist: 'MAGIC_JARRAS_TWIST'
  readonly tracePreserved: true
  readonly piFixed: true
  readonly identityTransported: false
  readonly executed: false
}

export interface VorticeTwerkPluralAesthetik {
  readonly id: typeof VORTICE_TWERK_PLURAL_AESTHETIK_V1
  readonly authorOwner: typeof VORTICE_TWERK_AUTHOR
  readonly canon: 'PIORNALEGO_ES_CANON'
  readonly sigilbookSource: {
    readonly branch: 'agent/sigilitas-vortice-taller-twerk-canonical-release-v1'
    readonly commit: 'f376c1fbbd66cb0abe120aae9afbe51b5560d4dd'
  }
  readonly sigil4cpythonProjection: {
    readonly branch: 'agent/vortice-twerk-coherent-sheaf-projection-v1'
    readonly commit: 'd9fd00d8a7522fc954deb8e8697ea4c86a4f9021'
  }
  readonly cells: readonly AesthetikCell[]
  readonly injections: readonly CellularTwistedInjection[]
  readonly sources: readonly SourcePin[]
  readonly invariants: {
    readonly consentPreserved: true
    readonly pauseAvailable: true
    readonly exitVisible: true
    readonly bodyBoundaryPreserved: true
    readonly pluralityPreserved: true
    readonly provenancePreserved: true
    readonly tracePreserved: true
    readonly piFixed: true
    readonly noIdentityTransport: true
    readonly noCoercion: true
    readonly humanReviewRequired: true
  }
  readonly runtimeExecuted: false
}

const cells = [
  { id: 'paca-base', surface: 'sigilbook:paca-base', role: 'base', paletteRole: 'piornalego-gold', pluralTyped: true, replayOrder: 0 },
  { id: 'pacaiogames', surface: 'sigilbook:pacaiogames', role: 'game', paletteRole: 'jaraku-violet', pluralTyped: true, replayOrder: 1 },
  { id: 'quasarpi', surface: 'uapa:plural-aesthetik', role: 'localizer', paletteRole: 'brane-cyan', pluralTyped: true, replayOrder: 2 },
  { id: 'jarraskhoreopi', surface: 'uapa:plural-aesthetik', role: 'choreography', paletteRole: 'kink-magenta', pluralTyped: true, replayOrder: 3 },
  { id: 'qquapp-portal', surface: 'sigil4cpython:coherent-sheaf', role: 'portal', paletteRole: 'parchment-cream', pluralTyped: true, replayOrder: 4 },
  { id: 'sigil4godot', surface: 'sigil4godot:scene-plan', role: 'render', paletteRole: 'void-charcoal', pluralTyped: true, replayOrder: 5 },
] as const satisfies readonly AesthetikCell[]

const sources = [
  ['godotengine/godot', '4e8c061c9b4a778102a085d9d10f64b3c6be0f87', 'official-engine', 'MIT'],
  ['Zylann/godot', '1ccfa7be094e11e1efe9a544c391fb0ce75b97e2', 'external-fork', 'MIT'],
  ['godotengine/godot-docs', 'eb00dcad2c4628361af6de7e1356676ba006d5f4', 'official-docs', 'CC-BY-3.0'],
  ['Calinou/awesome-gamedev', 'd051efc5c1f628d127a1a16fd7ce7280aac8ad85', 'discovery-catalogue', 'CC-BY-SA-4.0'],
  ['brodcoli/Godot-Portal', '1b4c05550e80f40bbe7a2f4356a000ab10df6e26', 'portal-reference', 'CC0-1.0'],
  ['io12/godot-portal-demo', '0768670710a7c0e472a6ea7a225183c2edb9caf9', 'portal-reference', 'MIT'],
] as const

export function buildVorticeTwerkPluralAesthetik(): VorticeTwerkPluralAesthetik {
  return {
    id: VORTICE_TWERK_PLURAL_AESTHETIK_V1,
    authorOwner: VORTICE_TWERK_AUTHOR,
    canon: 'PIORNALEGO_ES_CANON',
    sigilbookSource: {
      branch: 'agent/sigilitas-vortice-taller-twerk-canonical-release-v1',
      commit: 'f376c1fbbd66cb0abe120aae9afbe51b5560d4dd',
    },
    sigil4cpythonProjection: {
      branch: 'agent/vortice-twerk-coherent-sheaf-projection-v1',
      commit: 'd9fd00d8a7522fc954deb8e8697ea4c86a4f9021',
    },
    cells,
    injections: [
      {
        id: 'cellular-portal-00',
        source: 'jarraskhoreopi',
        target: 'qquapp-portal',
        qquapp: true,
        cellular: true,
        twist: 'MAGIC_JARRAS_TWIST',
        tracePreserved: true,
        piFixed: true,
        identityTransported: false,
        executed: false,
      },
      {
        id: 'cellular-portal-01',
        source: 'qquapp-portal',
        target: 'sigil4godot',
        qquapp: true,
        cellular: true,
        twist: 'MAGIC_JARRAS_TWIST',
        tracePreserved: true,
        piFixed: true,
        identityTransported: false,
        executed: false,
      },
    ],
    sources: sources.map(([repository, commit, role, license]) => ({
      repository,
      commit,
      role,
      license,
      readOnly: true,
      codeCopied: false,
      identityTransported: false,
      ...(repository === 'brodcoli/Godot-Portal'
        ? { obstruction: 'GODOT_3_5_NOT_GODOT_4' }
        : {}),
    })),
    invariants: {
      consentPreserved: true,
      pauseAvailable: true,
      exitVisible: true,
      bodyBoundaryPreserved: true,
      pluralityPreserved: true,
      provenancePreserved: true,
      tracePreserved: true,
      piFixed: true,
      noIdentityTransport: true,
      noCoercion: true,
      humanReviewRequired: true,
    },
    runtimeExecuted: false,
  }
}

export function validateVorticeTwerkPluralAesthetik(
  model: VorticeTwerkPluralAesthetik,
): readonly string[] {
  const errors: string[] = []
  if (model.id !== VORTICE_TWERK_PLURAL_AESTHETIK_V1) errors.push('release id mismatch')
  if (model.authorOwner !== VORTICE_TWERK_AUTHOR) errors.push('author mismatch')
  if (new Set(model.cells.map((cell) => cell.id)).size !== model.cells.length) {
    errors.push('cell identities must remain distinct')
  }
  if (model.cells.some((cell, index) => cell.replayOrder !== index || !cell.pluralTyped)) {
    errors.push('cells must be plural typed and replay ordered')
  }
  if (model.injections.some((edge) => edge.identityTransported || edge.executed || !edge.tracePreserved || !edge.piFixed)) {
    errors.push('cellular injection boundary violated')
  }
  if (model.sources.some((source) => !source.readOnly || source.codeCopied || source.identityTransported)) {
    errors.push('upstream provenance boundary violated')
  }
  if (!Object.values(model.invariants).every(Boolean)) errors.push('protected invariant failed')
  if (model.runtimeExecuted) errors.push('runtime execution not observed')
  return errors
}

export function vorticeTwerkMermaid(
  model = buildVorticeTwerkPluralAesthetik(),
): string {
  const verdict = validateVorticeTwerkPluralAesthetik(model).length === 0 ? 'ADMIT' : 'REJECT'
  return `flowchart LR
  PB["PACA Base"] --> PG["PACAIOGAMES"]
  PG --> QP["QuasarPi localized"]
  QP --> JK["JarraskhoreoPi"]
  JK -- Magic Jarras Twist --> PO["QQUAPP cellular portal"]
  PO --> G["SIGIL4Godot inert plan"]
  G --> V{"Plural aesthetik: ${verdict}"}`
}
