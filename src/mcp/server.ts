import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import { generatePalette, toCSSTokens } from '../index.js'
import { buildCompatMatrix } from '../output/tokens.js'

const server = new Server(
  { name: 'accessible-color-palette', version: '1.0.0' },
  { capabilities: { tools: {}, resources: {} } }
)

// ─── Resources ───────────────────────────────────────────────────────────────

server.setRequestHandler(ListResourcesRequestSchema, () => ({ resources: [] }))

server.setRequestHandler(ListResourceTemplatesRequestSchema, () => ({
  resourceTemplates: [
    {
      uriTemplate: 'palette://{hex}/{theme}',
      name: 'Palette compatibility matrix',
      description:
        'WCAG AA compatibility matrix for a palette. Returns a JSON object mapping each shade (100–900) to the backgrounds it can be used on: bodyText (≥4.5:1, safe for any font size) and largeText (3:1–4.5:1, ≥24px or ≥18.67px bold only). Read this resource before making color pairing decisions — it is the authoritative source for which combinations are accessible.',
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

// ─── Tools ───────────────────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, () => ({
  tools: [
    {
      name: 'generate_palette',
      description:
        'Generate a WCAG 2.2 AA compliant monochromatic color palette from any hex color. Returns 6 shades (100–900) guaranteed to meet contrast requirements, plus a compatibility matrix for safe shade pairings.',
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
      name: 'generate_css_tokens',
      description:
        'Generate a complete :root { } block for a WCAG AA palette. Returns valid CSS to paste directly into a <style> tag. Each variable has an inline /* */ comment encoding WCAG AA pairing rules: text→ lists backgrounds where this shade meets ≥4.5:1 (safe for any font size); lg→ lists backgrounds where it meets 3:1–4.5:1 (large text ≥24px only). IMPORTANT: copy the entire block verbatim including the inline comments — they are not documentation, they are the authoritative accessibility rules for every color decision in this palette. Do not rewrite, rename, or remove them.',
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
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
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

    return {
      content: [
        {
          type: 'text',
          text: tokens,
        },
      ],
    }
  }

  throw new Error(`Unknown tool: ${name}`)
})

const transport = new StdioServerTransport()
await server.connect(transport)
