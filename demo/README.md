# Demo gallery

The HTML files in this folder are real outputs from different AI coding agents using the
`accessible-color-palette` MCP server, kept as-is (not hand-edited afterward) to see what each
agent actually does with the tool, warts included.

## How these were generated

**Coding agents used:** Claude Code, GitHub Copilot, Open Code, and MiniMax's own coding client —
plus models run through Open Code (e.g. MiniMax M2, DeepSeek) as a separate agent from their
native clients. This is a mixed, informal set, not a controlled benchmark — there's no fixed
model/agent pairing and no per-file record of which output came from which combination.

**Prompts used** were deliberately minimal — no accessibility instructions baked into the prompt
itself, no mention of the MCP server's specific tools by name, just a request to use it plus a
generic ask for a clean, usable, good-looking interface (the kind of thing you'd say to any
design request, accessibility-related or not):

```
create a landing page for a random topic using the palette mcp.
the interface should be clean, usable, and beautiful

create a landing page for X using the palette mcp and choose accent colors.
the interface should be clean, usable, and beautiful
```

**Plus one more variable held constant across all of them:** every session also had the
[`a11y.instructions.md`](https://github.com/github/awesome-copilot/blob/main/instructions/a11y.instructions.md)
accessibility skill from `github/awesome-copilot` loaded — WCAG 2.2 AA criteria, 38+ documented
anti-patterns, legal enforcement context (EAA, ADA Title II), and framework-specific fixes. That
skill isn't incidental to this project: it's the winning variant from a controlled comparison run
by its author, Michael Fairchild (Microsoft) — the same person who built
[`microsoft/a11y-llm-eval`](https://github.com/microsoft/a11y-llm-eval), the harness that
benchmarks how accessible LLM-generated HTML actually is by rendering it in a real browser and
running it against axe-core plus hand-written assertions. In [his own write-up of that
work](https://dev.to/mfairchild365/embedding-accessibility-into-ai-based-software-development-282k),
he compares three instruction sets against the harness: a one-line "must be accessible" prompt
(+18 percentage points over baseline), a basic semantic-HTML/WCAG-AA prompt (+37 points), and a
full expert-level instruction set (+48 points) — and explicitly states he published that
detailed, best-performing version at the exact `a11y.instructions.md` path used here. So what's
running in these demos is the two things this project argues for, stacked: the empirically
best-performing general accessibility guidance, plus a tool that keeps the contrast arithmetic
out of the model's head entirely (this MCP server).

## What to look for

These are not a benchmark and shouldn't be read as one — there's no scoring, no per-agent
breakdown, no controlled prompt-to-output mapping, and no per-file record of which agent or model
produced which file. What they're useful for is qualitative: open a few, inspect the `:root {}`
block for whether the WCAG manifest comments survived intact, and check whether accent colors
(when the prompt asked for them) actually got run through `check_contrast` or just picked by eye.

Don't take any of this on faith — run [axe-core](https://github.com/dequelabs/axe-core),
Lighthouse, Pa11y, or whatever checker you trust against these files yourself. We did, against
all 33 of them (axe-core, WCAG 2.x/2.2 AA rules, headless Chromium): **25 came back with zero
violations of any kind.** Of the 8 that didn't, 7 have a `color-contrast` violation — proof that
the combination of skill + MCP server reduces contrast failures a lot, not that it makes them
impossible. The MCP server only guarantees the tokens it generates; it has no way to verify
accent colors picked by eye instead of run through `check_contrast`, or component CSS the model
wrote without checking it against the manifest at all.

Informally, across this set, Claude Code came out as the most reliable agent and Open Code the
least — but that's one person's impression from an uncontrolled set, not a finding. Run your own
comparison and tell us what you get.
