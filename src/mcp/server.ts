import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import { generatePalette, toCSSTokens } from '../index.js'

const server = new Server(
  { name: 'accessible-color-palette', version: '1.0.0' },
  { capabilities: { tools: {} } }
)

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
        'Generate CSS custom property declarations for a palette. Paste the output directly into :root {} or a theme block.',
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
