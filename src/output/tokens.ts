import type { CSSTokens, PaletteResult, ShadeKey, Theme } from '../types.js'

const SHADE_KEYS: ShadeKey[] = ['100', '300', '600', '700', '800', '900']

function bgLabel(key: string, theme: Theme): string {
  return key === 'theme' ? (theme === 'black' ? 'black' : 'white') : key
}

// ─── Compatibility JSON ───────────────────────────────────────────────────────

export type ShadeCompat = {
  hex: string
  bodyText: string[]
  largeText: string[]
  bgOnly: boolean
}

export function buildCompatMatrix(result: PaletteResult): Record<ShadeKey, ShadeCompat> {
  const { palette, usage, theme } = result
  const matrix = {} as Record<ShadeKey, ShadeCompat>

  for (const shade of SHADE_KEYS) {
    const { normalText, largeText } = usage[shade]
    matrix[shade] = {
      hex: palette[shade].hex.toLowerCase(),
      bodyText: [...normalText].sort((a, b) => b.ratio - a.ratio).map(p => bgLabel(p.key, theme)),
      largeText: largeText.map(p => bgLabel(p.key, theme)),
      bgOnly: normalText.length === 0 && largeText.length === 0,
    }
  }

  return matrix
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function toCSSTokens(result: PaletteResult, prefix: string = 'color'): CSSTokens {
  const { sourceColor, theme } = result
  const matrix = buildCompatMatrix(result)
  const bg = theme === 'white' ? 'white' : 'black'

  // Collect manifest sections
  const bodyLines: string[] = []
  const largeLines: string[] = []
  const bgOnlyItems: string[] = []

  for (const shade of SHADE_KEYS) {
    const { hex, bodyText, largeText, bgOnly } = matrix[shade]
    if (bgOnly) {
      bgOnlyItems.push(`shade-${shade} (${hex})`)
    } else {
      if (bodyText.length) bodyLines.push(`shade-${shade} (${hex}) → ${bodyText.join(', ')}`)
      if (largeText.length) largeLines.push(`shade-${shade} (${hex}) → ${largeText.join(', ')}`)
    }
  }

  // Build manifest block comment
  const manifest: string[] = [
    `/*`,
    ` * WCAG AA PAIRING MANIFEST — source: ${sourceColor} · theme: ${bg}`,
    ` *`,
  ]

  if (bodyLines.length) {
    manifest.push(` * BODY TEXT (any font size, ≥4.5:1):`)
    for (const l of bodyLines) manifest.push(` *   ${l}`)
    manifest.push(` *`)
  }

  if (largeLines.length) {
    manifest.push(` * LARGE TEXT ONLY (≥24px or ≥18.67px bold, 3:1–4.5:1):`)
    manifest.push(` *   These pairings are PROHIBITED for body text at any size.`)
    for (const l of largeLines) manifest.push(` *   ${l}`)
    manifest.push(` *`)
  }

  if (bgOnlyItems.length) {
    manifest.push(` * BACKGROUND ONLY (no accessible text use):`)
    manifest.push(` *   ${bgOnlyItems.join(', ')}`)
    manifest.push(` *`)
  }

  manifest.push(` */`)

  // CSS variables — no indentation so inline comments are machine-readable at line start
  const cssVars = SHADE_KEYS.map((key) => {
    const { hex, bodyText, largeText, bgOnly } = matrix[key]
    if (bgOnly) return `--${prefix}-${key}: ${hex}; /* bg-only */`
    const parts: string[] = []
    if (bodyText.length) parts.push(`✅ text→${bodyText.join('·')}`)
    if (largeText.length) parts.push(`⚠️ lg→${largeText.join('·')}`)
    return `--${prefix}-${key}: ${hex}; /* ${parts.join('  ')} */`
  })

  return [...manifest, `:root {`, ...cssVars, `}`].join('\n')
}
