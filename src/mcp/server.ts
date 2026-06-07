import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import { generatePalette, toCSSTokens } from '../index.js'
import { buildCompatMatrix } from '../output/tokens.js'
import { validatePairings } from '../output/validation.js'

const server = new Server(
  { name: 'accessible-color-palette', version: '1.0.0' },
  { capabilities: { tools: {}, resources: {}, prompts: {} } }
)

// ─── Resources ───────────────────────────────────────────────────────────────

server.setRequestHandler(ListResourcesRequestSchema, () => ({ resources: [] }))

server.setRequestHandler(ListResourceTemplatesRequestSchema, () => ({
  resourceTemplates: [
    {
      uriTemplate: 'palette://{hex}/{theme}',
      name: 'Palette compatibility matrix',
      description:
        'WCAG AA compatibility matrix for a palette. Returns a JSON object mapping each shade (100–900) to the backgrounds it can be used on: bodyText (≥4.5:1, safe for any font size) and largeText (3:1–4.5:1, ≥24px or ≥18.67px bold only). Read this resource at the START of every design task — even if you read it earlier in the conversation. Context drift causes previously-learned rules to be ignored; re-reading resets your reference point to the authoritative data.',
      mimeType: 'application/json',
    },
  ],
}))

server.setRequestHandler(ReadResourceRequestSchema, (request) => {
  const { uri } = request.params
  const match = uri.match(/^palette:\/\/([0-9a-fA-F]{3,8})\/(white|black)$/)

  if (!match) {
    throw new Error(
      `Invalid palette resource URI: "${uri}". Expected format: palette://{hex}/{theme} — e.g. palette://1f7a54/white`,
    )
  }

  const hex = match[1]!
  const theme = match[2]! as 'white' | 'black'

  const result = generatePalette(hex, theme)
  const shades = buildCompatMatrix(result)

  return {
    contents: [
      {
        uri,
        mimeType: 'application/json',
        text: JSON.stringify({ source: result.sourceColor, theme, shades }, null, 2),
      },
    ],
  }
})

// ─── Prompts ─────────────────────────────────────────────────────────────────

server.setRequestHandler(ListPromptsRequestSchema, () => ({
  prompts: [
    {
      name: 'plan-palette-usage',
      description:
        'Use this prompt BEFORE writing any CSS that uses palette colors. It guides you through reading the compatibility matrix, validating every pairing, and only then generating code. Skipping this flow is the root cause of inaccessible color combinations.',
      arguments: [
        { name: 'hex', description: 'Source hex color (without #)', required: true },
        { name: 'theme', description: '"white" or "black" background', required: true },
      ],
    },
  ],
}))

server.setRequestHandler(GetPromptRequestSchema, (request) => {
  const { name, arguments: promptArgs } = request.params

  if (name === 'plan-palette-usage') {
    const hex = (promptArgs?.['hex'] ?? '{hex}').toString().replace('#', '')
    const theme = (promptArgs?.['theme'] ?? '{theme}').toString()

    return {
      description: 'RPG flow: Read → Plan (with thinking) → validate_pairings loop → generate_css_tokens',
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `You are about to write CSS using the palette generated from #${hex} on ${theme}.

Execute these steps IN ORDER. Do NOT skip any step or proceed past a failure.

─── STEP 1 · READ (required at every new task) ─────────────────────────────
Call: read_resource("palette://${hex}/${theme}")

IMPORTANT: re-read this even if you've already read it earlier in this conversation.
Prior CSS examples in the context can cause you to ignore previously-learned rules.
This re-read resets your reference point.

─── STEP 2 · PLAN inside <thinking> ────────────────────────────────────────
Before writing a single line of CSS, open a <thinking> block and, for each
component rule you plan to write, perform this explicit cotejo:

  Component: [name]
  Rule: [selector] → foreground: shade-X, background: shade-Y/white/black
  Check: is shade-X in matrix[shade-X].bodyText for background Y?
    → YES: aa-normal ✓ safe for any size
    → ONLY in largeText: aa-large ⚠ mark as large-text-only in CSS comment
    → NEITHER: FAIL ✗ — I must choose a different shade

Do this for EVERY pairing. Do not skip any. Do not rely on memory from
prior examples — the statistics of previous CSS you generated are biased.

─── STEP 3 · VALIDATE (blocking loop) ──────────────────────────────────────
After your <thinking> cotejo, call:

  validate_pairings({
    hex: "${hex}",
    theme: "${theme}",
    pairings: [ ...every pair from your thinking block... ]
  })

The response includes a "proceed" field.
• proceed: false → you are BLOCKED. Fix every failing pair. Repeat Step 3.
• proceed: true  → you may continue to Step 4.

You MUST NOT output component CSS while proceed is false.
You MUST repeat this loop until proceed is true.

─── STEP 4 · GENERATE ──────────────────────────────────────────────────────
Call: generate_css_tokens({ hex: "${hex}", theme: "${theme}" })

The response includes a NEXT REQUIRED STEP section.
Follow those instructions before writing component CSS.

─── WHAT IS ABSOLUTELY FORBIDDEN ───────────────────────────────────────────
✗ Skipping the <thinking> cotejo and writing CSS from statistical intuition
✗ Using a shade marked bg-only as a text color
✗ Outputting CSS while validate_pairings returned proceed: false
✗ Removing or editing inline comments from generate_css_tokens output
✗ Assuming a pairing is safe because it "looked correct" in a prior example`,
          },
        },
      ],
    }
  }

  throw new Error(`Unknown prompt: ${name}`)
})

// ─── Tools ───────────────────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, () => ({
  tools: [
    {
      name: 'generate_palette',
      description:
        'Generate a WCAG 2.2 AA compliant monochromatic color palette from any hex color. Returns 6 shades (100–900) guaranteed to meet contrast requirements, plus a full compatibility matrix showing which shade pairs are safe for body text (≥4.5:1) and which are large-text-only (3:1–4.5:1).',
      inputSchema: {
        type: 'object',
        properties: {
          hex: {
            type: 'string',
            description: 'A valid hex color, e.g. "#1F7A54" or "1F7A54"',
          },
          theme: {
            type: 'string',
            enum: ['white', 'black'],
            description: 'The background the palette will be used on',
          },
        },
        required: ['hex', 'theme'],
      },
    },
    {
      name: 'validate_pairings',
      description: `Validate a list of intended color pairings against the WCAG compatibility matrix BEFORE writing CSS.

Call this tool in your planning step — before generate_css_tokens — to confirm every combination is accessible.

Returns level "aa-normal" (≥4.5:1, any size), "aa-large" (3:1–4.5:1, large text only), "fail" (inaccessible), or "invalid" (unknown shade key). Also returns a "proceed" field: if proceed is false you are BLOCKED and must fix every failing pair before writing any CSS.

Examples:
  ✓ { foreground: "700", background: "white" } → aa-normal, proceed: true
  ⚠ { foreground: "600", background: "100" }  → aa-large,  proceed: true (large text only)
  ✗ { foreground: "100", background: "white" } → fail,      proceed: false — BLOCKED`,
      inputSchema: {
        type: 'object',
        properties: {
          hex: {
            type: 'string',
            description: 'Source hex color',
          },
          theme: {
            type: 'string',
            enum: ['white', 'black'],
            description: 'Background theme',
          },
          pairings: {
            type: 'array',
            description: 'List of shade pairs to validate',
            items: {
              type: 'object',
              properties: {
                foreground: {
                  type: 'string',
                  description: 'Shade key used as text color: 100 | 300 | 600 | 700 | 800 | 900',
                },
                background: {
                  type: 'string',
                  description: 'Shade key or "white"/"black" used as background',
                },
              },
              required: ['foreground', 'background'],
            },
          },
        },
        required: ['hex', 'theme', 'pairings'],
      },
    },
    {
      name: 'generate_css_tokens',
      description: `Generate a complete CSS block for a WCAG AA palette.

The output has two parts — both are REQUIRED and must be copied verbatim:

1. A manifest block comment listing every valid pairing by category:
   • BODY TEXT (≥4.5:1) — safe for any font size
   • LARGE TEXT ONLY (3:1–4.5:1) — ≥24px or ≥18.67px bold only; PROHIBITED at smaller sizes
   • BACKGROUND ONLY — shades that must never be used as text color

2. A :root { } block with one variable per shade and an inline WCAG comment:
   • ✅ text→white·100   means this shade passes 4.5:1 on white and shade-100
   • ⚠️ lg→300           means this shade meets 3:1–4.5:1 on shade-300 (large text only)
   • bg-only             means this shade has zero safe text uses

WRONG: ignoring the comments and using shade-100 as a text color
CORRECT: reading "/* bg-only */" and using shade-100 only as a background

Do not remove, rename, or rewrite the comments — they are the authoritative accessibility rules.`,
      inputSchema: {
        type: 'object',
        properties: {
          hex: {
            type: 'string',
            description: 'A valid hex color',
          },
          theme: {
            type: 'string',
            enum: ['white', 'black'],
            description: 'The background the palette will be used on',
          },
          prefix: {
            type: 'string',
            description: 'CSS variable prefix (default: "color")',
          },
        },
        required: ['hex', 'theme'],
      },
    },
  ],
}))

server.setRequestHandler(CallToolRequestSchema, (request) => {
  const { name, arguments: args } = request.params

  if (!args || typeof args !== 'object') {
    throw new Error('Missing arguments')
  }

  if (name === 'generate_palette') {
    const hex = args['hex']
    const theme = args['theme']

    if (typeof hex !== 'string' || (theme !== 'white' && theme !== 'black')) {
      throw new Error('Invalid arguments: hex must be string, theme must be "white" or "black"')
    }

    const result = generatePalette(hex, theme)

    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
    }
  }

  if (name === 'validate_pairings') {
    const hex = args['hex']
    const theme = args['theme']
    const pairings = args['pairings']

    if (typeof hex !== 'string' || (theme !== 'white' && theme !== 'black')) {
      throw new Error('Invalid arguments: hex must be string, theme must be "white" or "black"')
    }
    if (!Array.isArray(pairings)) {
      throw new Error('Invalid arguments: pairings must be an array')
    }

    const result = generatePalette(hex, theme)
    const report = validatePairings(
      result,
      pairings.map((p: Record<string, unknown>) => ({
        foreground: String(p['foreground'] ?? ''),
        background: String(p['background'] ?? ''),
      })),
    )

    const response = {
      ...report,
      proceed: report.allPass,
      instruction: report.allPass
        ? '✓ All pairings validated. proceed: true — you may now write component CSS.'
        : '✗ BLOCKED: proceed: false — fix every failing pairing and call validate_pairings again. Do NOT output CSS until proceed is true.',
    }

    return {
      content: [{ type: 'text', text: JSON.stringify(response, null, 2) }],
    }
  }

  if (name === 'generate_css_tokens') {
    const hex = args['hex']
    const theme = args['theme']
    const prefix = args['prefix']

    if (typeof hex !== 'string' || (theme !== 'white' && theme !== 'black')) {
      throw new Error('Invalid arguments: hex must be string, theme must be "white" or "black"')
    }

    const result = generatePalette(hex, theme)
    const tokens = toCSSTokens(result, typeof prefix === 'string' ? prefix : undefined)

    const nextStep = [
      '─── NEXT REQUIRED STEP ─────────────────────────────────────────────────',
      'Before writing ANY component CSS that references these variables:',
      '',
      '1. Open a <thinking> block and list every (foreground-shade, background) pair you plan to use.',
      '2. Call validate_pairings to confirm ALL of them.',
      '3. Check the response: if proceed is false → STOP, fix every failing pair, repeat from step 2.',
      '4. Only write component CSS after validate_pairings returns proceed: true.',
      '',
      `Template: validate_pairings({ hex: "${hex}", theme: "${theme}", pairings: [`,
      '  { foreground: "700", background: "white" },  // ← replace with your actual pairs',
      ']})',
    ].join('\n')

    return {
      content: [
        { type: 'text', text: tokens },
        { type: 'text', text: nextStep },
      ],
    }
  }

  throw new Error(`Unknown tool: ${name}`)
})

const transport = new StdioServerTransport()
await server.connect(transport)
