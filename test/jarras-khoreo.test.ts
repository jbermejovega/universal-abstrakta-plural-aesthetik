import { describe, expect, it } from 'vitest'
import {
  buildJarrasKhoreoLibrary,
  createFigurePrompt,
  createSocialMediaCards,
  getFigureSpec,
  validateJarrasKhoreoLibrary,
} from '../src/index.js'

describe('Jarras Khoreo library', () => {
  it('builds a valid course atlas', () => {
    const library = buildJarrasKhoreoLibrary()
    const report = validateJarrasKhoreoLibrary(library)

    expect(report.ok).toBe(true)
    expect(library.figures.length).toBeGreaterThanOrEqual(12)
    expect(library.modules.some((module) => module.id === 'pelvic-foundation')).toBe(true)
    expect(library.hyperlattice.globalSection).toBe('GLOBAL_SECTION_PACAPDG')
  })

  it('creates figure prompts with alt text', () => {
    const figure = getFigureSpec('hexagonin-jaraniano')
    expect(figure).toBeDefined()

    if (!figure) return

    const prompt = createFigurePrompt(figure, { includeAltText: true })
    expect(prompt).toContain('Hexagonín Jaraniano')
    expect(prompt).toContain('Alt text target')
    expect(prompt).toContain('no_transport')
  })

  it('creates social media cards for each figure', () => {
    const library = buildJarrasKhoreoLibrary()
    const cards = createSocialMediaCards(library.figures)

    expect(cards).toHaveLength(library.figures.length)
    expect(cards[0]?.hashtags).toContain('#JarrasKhoreo')
  })
})
