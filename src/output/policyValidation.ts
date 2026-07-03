import { checkContrast } from './validation.js'
import type {
  AccessibilityProfile,
  ColorPairPolicyInput,
  ColorPairRole,
  ProfileValidationIssue,
  ProfileValidationReport,
} from '../profile/profile.js'

function minContrastForRole(profile: AccessibilityProfile, role: ColorPairRole): number {
  switch (role) {
    case 'normalText':
      return profile.policy.normalTextMinContrast
    case 'largeText':
      return profile.policy.largeTextMinContrast
    case 'uiComponent':
      return profile.policy.uiComponentMinContrast
    case 'focusIndicator':
      return profile.policy.focusIndicatorMinContrast
    case 'graphic':
      return profile.policy.graphicMinContrast
    case 'status':
      return profile.policy.statusMinContrast
  }
}

export function validateProfileColorPairs(
  profile: AccessibilityProfile,
  pairs: readonly ColorPairPolicyInput[],
): ProfileValidationReport {
  const issues: ProfileValidationIssue[] = []

  for (const pair of pairs) {
    const minContrast = minContrastForRole(profile, pair.role)

    try {
      const contrast = checkContrast(pair.foreground, pair.background)

      if (contrast.ratio < minContrast) {
        issues.push({
          ruleId: 'CCI-01',
          severity: 'fail',
          pairId: pair.id,
          message: `${pair.id}: ${contrast.ratio.toFixed(2)}:1 is below the required ${minContrast}:1 contrast for ${pair.role}.`,
        })
      }
    } catch (error) {
      issues.push({
        ruleId: 'CCI-01',
        severity: 'fail',
        pairId: pair.id,
        message: `${pair.id}: invalid color pair (${error instanceof Error ? error.message : 'unknown error'}).`,
      })
    }

    if (pair.role === 'status' && profile.policy.statusRequiresNonColorCue && pair.hasNonColorCue !== true) {
      issues.push({
        ruleId: 'CCI-02',
        severity: 'fail',
        pairId: pair.id,
        message: `${pair.id}: status color requires a non-color cue such as a visible label or icon.`,
      })
    }
  }

  return {
    profileId: profile.id,
    allPass: issues.every(issue => issue.severity !== 'fail'),
    issues,
  }
}

export type { ColorPairPolicyInput, ProfileValidationReport }
