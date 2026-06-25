# Using accessible-color-palette as an MCP server

Add it to your MCP client config (Claude Desktop, Cursor, etc.) — no installation required:

```json
{
  "mcpServers": {
    "accessible-color-palette": {
      "command": "npx",
      "args": ["-y", "accessible-color-palette"]
    }
  }
}
```

Or install globally and point to the binary:

```bash
npm install -g accessible-color-palette
```

```json
{
  "mcpServers": {
    "accessible-color-palette": {
      "command": "accessible-color-palette-mcp"
    }
  }
}
```

There are two ways to use the MCP server.

---

## Option A — Direct tool use

Call the tools yourself, or let the model use them freely. Good for querying palette data or generating tokens when you're in control of the flow.

| Tool | Description |
|------|-------------|
| `generate_palette` | Returns the full palette + usage map as JSON |
| `validate_pairings` | Validates a list of foreground/background shade pairs — returns `proceed: false` if any pair fails |
| `generate_css_tokens` | Returns a CSS `:root {}` block with inline WCAG comments per shade. **Requires `validate_pairings` to have passed for the same hex+theme earlier in the session** — it throws otherwise (server-side gate, not just a convention) |
| `check_contrast` | Standalone contrast check between any two hex colors, independent of any generated palette. Use it for accent colors (a status/brand hex that is NOT one of the foundation shades) — `validate_pairings` only knows shade keys and white/black, so it can't check an arbitrary hex |

> [!NOTE]
> The 100–900 scale this server generates is the **foundation layer** of a palette, not necessarily the whole thing. Most real interfaces also need 1–2 semantic accent colors (error/success/warning/sale) that the monochrome scale can't express — that's what `check_contrast` is for. Don't read "monochromatic" in this project's name as "never use any other color in the UI."

> [!WARNING]
> `generate_css_tokens` returns the `:root {}` block with the WCAG comments soldered to each variable, plus an explicit instruction to copy it **verbatim**. That instruction is in the response text precisely because some models otherwise reformat the output and drop the comments while keeping the hex values — which silently throws away the only record of which pairings are safe. If you're calling this tool directly rather than letting an agent drive, keep the comments when you paste the block into your CSS.

There's also a resource template you can read directly:

```
palette://{hex}/{theme}
```

Returns the full WCAG compatibility matrix as JSON — useful as a reference before making color decisions.

---

## Option B — Guided prompt (recommended for design tasks)

When you delegate a design task to an AI agent, use the `plan-palette-usage` prompt instead of calling tools directly. The prompt injects a strict 4-step workflow:

1. Read the compatibility matrix (even if read earlier in the conversation)
2. Document every planned color pairing inside a `<thinking>` block and check each one
3. Call `validate_pairings` — the model is **blocked** until all pairs pass
4. Only then call `generate_css_tokens`

This prevents models from combining colors based on 'intuition' or prior examples, which is the most common cause of inaccessible AI-generated CSS.

**Example instruction to your agent:**

> "Use the `plan-palette-usage` prompt with hex=`1f7a54` and theme=`white`, then design a user profile card."

> [!NOTE]
> **MCP prompts are user-controlled by spec, not model-controlled like tools.** That's true for every MCP client, not a Claude Code limitation: a model can never invoke `plan-palette-usage` on its own just because you asked it to in natural language ("use the prompt X") — only a human typing the actual slash command triggers it. In Claude Code that's `/mcp__accessible-palette__plan-palette-usage <hex> <theme>`; it shows up in the autocomplete and runs like any other prompt. Cline exposes the same capability through its own UI. So Option B is reachable everywhere MCP prompts are supported — it just always requires a human to type it, in every client, by design.
>
> Because of that, anything that needs to happen without a human typing a slash command — i.e. the model acting on its own — cannot rely on a prompt. That's why, since **v2.2.0**, the validate-before-generate order is also enforced **server-side**: `generate_css_tokens` will reject the call (throw) for a given hex+theme until `validate_pairings` has returned `proceed: true` for that exact hex+theme earlier in the same session. The model cannot get CSS tokens out of this server without validation having passed first, whether or not anyone ever types the prompt. The prompt remains useful on top of that because it also enforces the matrix re-read and the explicit `<thinking>` cross-check — steps no server-side gate can compel — but the accessibility guarantee itself does not depend on it.
