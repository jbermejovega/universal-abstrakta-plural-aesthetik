import { parseHex } from './math/color.js'
import { buildCompatibilityMatrix } from './algorithm/compatibility.js'
import { buildPalette } from './algorithm/palette.js'
import { toCSSTokens as _toCSSTokens } from './output/tokens.js'
import { buildPaletteUsage } from './output/usage.js'
import { validatePairings as _validatePairings, checkContrast as _checkContrast } from './output/validation.js'
import type { PaletteResult, Theme } from './types.js'

export function generatePalette(hex: string, theme: Theme): PaletteResult {
  const parsed = parseHex(hex)
  const palette = buildPalette(parsed, theme)
  const compatibility = buildCompatibilityMatrix(palette, theme)
  const usage = buildPaletteUsage(palette, compatibility, theme)
  return { palette, usage, theme, sourceColor: parsed }
}

export function toCSSTokens(result: PaletteResult, prefix?: string): string {
  return _toCSSTokens(result, prefix)
}

export const validatePairings = _validatePairings
export const checkContrast = _checkContrast

export { lintPluralSigil } from './sigil/plural-sigil.js'
export {
  JARANIAN_KNOWLEDGE_GENERATORS,
  PACA_KNOWLEDGE_SURFACES,
  PACA_KNOWLEDGE_THEORY_AUTHOR,
  PACA_KNOWLEDGE_UPSTREAM_COMMIT,
  PACA_KNOWLEDGE_UPSTREAM_PULL_REQUEST,
  PACA_KNOWLEDGE_UPSTREAM_REPOSITORY,
  UAPA_GRAPHICAL_CALCULUS_PRESHEAF_RELEASE_ID,
  UAPA_INVARIANT_SIGIL_RENORMALIZATION_FLOW_ID,
  UAPA_PACA_KNOWLEDGE_ATLAS_PROJECTION_ID,
  UAPA_SIGIL_ACCESSIBLE_PALETTE_LINTER_ID,
  buildCanonicalPacaKnowledgeAtlasProjection,
  buildGraphicalCalculusPresheafRelease,
  buildInvariantSigilRenormalizationFlow,
  buildPacaKnowledgeAtlasProjection,
  buildSigilPaletteFlow,
  lintAccessiblePalette,
} from './sigil/index.js'
export {
  JARRAKNE_KQC_TWIST_GROOVE_V1,
  buildJarrakneKqcNormalForm,
  jarrakneMermaid,
  validateJarrakneKqcNormalForm,
} from './sigil/jarrakne-kqc-twist-groove.js'
export type {
  GlueSurface,
  GrooveAtom,
  JarrakneEntity,
  JarrakneKqcNormalForm,
} from './sigil/jarrakne-kqc-twist-groove.js'
export {
  VORTICE_TWERK_AUTHOR,
  VORTICE_TWERK_PLURAL_AESTHETIK_V1,
  buildVorticeTwerkPluralAesthetik,
  validateVorticeTwerkPluralAesthetik,
  vorticeTwerkMermaid,
} from './sigil/vortice-twerk-plural-aesthetik.js'
export type {
  AesthetikCell,
  CellularTwistedInjection,
  SourcePin,
  VorticeTwerkPluralAesthetik,
  VorticeTwerkSurface,
} from './sigil/vortice-twerk-plural-aesthetik.js'
export {
  EXPECTED_END_LINE as PR696_698_EXPECTED_END_LINE,
  PI_REF as PR696_698_PI_REF,
  PROJECTION_ID as PR696_698_PROJECTION_ID,
  SEMANTIC_KERNEL_ID as PR696_698_SEMANTIC_KERNEL_ID,
  SIGILBOOK_PR_696_HEAD,
  SIGILBOOK_PR_697_HEAD,
  SIGILBOOK_PR_698_HEAD,
  SYNTHGOTHHUB_PR696_698_PLURAL_SHEAF_PROJECTION_V1,
  UAPA_PR_20_HEAD,
  buildPr696698PluralSheafProjection,
  pr696698PluralSheafMermaid,
  validatePr696698PluralSheaf,
  validateProjectionDocument as validatePr696698ProjectionDocument,
  verifyPr696698PluralSheafFixedPoint,
} from './sigil/pr696-698-plural-sheaf-projection.js'
export type {
  PluralSheafOverlap,
  PluralSheafSection,
  Pr696698PluralSheafProjection,
  SheafSourceEpoch,
  SourceAuthority as Pr696698SourceAuthority,
  SourceState as Pr696698SourceState,
} from './sigil/pr696-698-plural-sheaf-projection.js'
export { cecicodeInspiredProfile } from './profile/cecicodeInspired.js'
export { validateProfileColorPairs } from './output/policyValidation.js'
export * from './jarras/index.js'

export type {
  PaletteResult,
  Palette,
  ShadeEntry,
  ContrastLevel,
  Theme,
  ShadeKey,
  MatrixKey,
  HexColor,
  CSSTokens,
  BackgroundKey,
  CompatiblePair,
  ShadeUsage,
  PaletteUsage,
  CompatibilityEntry,
  CompatibilityMatrix,
  PluralSigilStage,
  PluralSigilPrimitiveKind,
  PluralSigilRuntime,
  PluralSigilSeverity,
  PluralSigilIssueCode,
  PluralSigilPairingLevel,
  QquappTeleportationMethod,
  QquappEncoder,
  QquappDecoder,
  QecZooReference,
  QquappKokompiLibrary,
  PluralSigilPairing,
  PluralSigilInjection,
  PluralSigilInput,
  PluralSigilFlow,
  PluralSigilIssue,
  PluralSigilValidationPairing,
  PluralSigilValidation,
  PluralSigilPayload,
  PluralSigilPrimitive,
  PluralSigilAgentExposition,
  PluralSigilRelease,
  PluralSigilReport,
} from './types.js'

export type {
  SigilPaletteFlow,
  SigilPaletteLintInput,
  SigilPaletteLintResult,
  SigilPalettePairing,
  SigilPalettePdgWitness,
  SigilPaletteTheme,
  SigilPrimitive,
  ContextTensorRole,
  ContextTensorVariance,
  ContextTypedTensor,
  GeneralizedMeraLayer,
  InvariantSigilRenormalizationFlow,
  InvariantSigilRenormalizationInput,
  PacaPdgRenormalizationWitness,
  PluralTheorySource,
  RenormalizationColimit,
  RenormalizationGlueStage,
  TwistedInjectionWitness,
  AdapterReadiness,
  AdapterSurface,
  ComputationalCategoryBasis,
  GraphicalCalculusKind,
  GraphicalCalculusPresheafRelease,
  GraphicalCalculusPresheafReleaseInput,
  GraphicalCalculusSection,
  JaranianKnowledgeGenerator,
  MilestoneStatus,
  PacaKnowledgeAtlasProjection,
  PacaKnowledgeAtlasProjectionInput,
  PacaKnowledgeProjectionBlockReason,
  PacaKnowledgeSurface,
  PresheafOfSheavesWitness,
  PresheafReleaseDataType,
  PresheafReleaseMilestone,
  RagKnowledgeBaseWitness,
  ReleaseAdapterWitness,
  ReleaseBlockReason,
  SafeReplayDataTypeRelease,
} from './sigil/index.js'
export type {
  AccessibilityProfile,
  AccessibilityProfileCriterion,
  AccessibilityProfilePolicy,
  ColorPairPolicyInput,
  ColorPairRole,
  ProfileValidationIssue,
  ProfileValidationReport,
  ProfileValidationSeverity,
} from './profile/index.js'
export type { PairingLevel, PairingResult, ValidationReport, ContrastCheckResult } from './output/validation.js'
