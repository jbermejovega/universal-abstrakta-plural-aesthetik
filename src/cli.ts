#!/usr/bin/env node
import { generatePalette, toCSSTokens } from './index.js'
import type { Theme } from './types.js'

const HELP = `
Usage: uap-palette <hex> <theme> [options]

Arguments:
  hex              Hex color (with or without #, 3 or 6 chars)
  theme            Background theme: white | black

Options:
  --json           Output full palette + usage map as JSON
  --prefix <name>  CSS variable prefix (default: color)
  -h, --help       Show this help message

Examples:
  uap-palette 1F7A54 white
  uap-palette "#239062" black --prefix brand
  uap-palette 1F7A54 white --json
`.trim()

const args = process.argv.slice(2)

if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
  console.log(HELP)
  process.exit(0)
}

const positional: string[] = []
let prefix = 'color'
let json = false

for (let i = 0; i < args.length; i++) {
  const arg = args[i] ?? ''
  if (arg === '--json') {
    json = true
  } else if (arg === '--prefix') {
    const next = args[i + 1]
    if (!next || next.startsWith('-')) {
      console.error('Error: --prefix requires a value')
      process.exit(1)
    }
    prefix = next
    i++
  } else if (!arg.startsWith('-')) {
    positional.push(arg)
  } else {
    console.error(`Unknown option: ${arg}`)
    console.error(HELP)
    process.exit(1)
  }
}

const [hex, theme] = positional

if (!hex || !theme) {
  console.error('Error: hex and theme are required\n')
  console.error(HELP)
  process.exit(1)
}

if (theme !== 'white' && theme !== 'black') {
  console.error(`Error: theme must be "white" or "black", got "${theme}"`)
  process.exit(1)
}

try {
  const result = generatePalette(hex, theme as Theme)
  if (json) {
    console.log(JSON.stringify(result, null, 2))
  } else {
    console.log(toCSSTokens(result, prefix))
  }
} catch (err) {
  console.error(`Error: ${err instanceof Error ? err.message : String(err)}`)
  process.exit(1)
}
