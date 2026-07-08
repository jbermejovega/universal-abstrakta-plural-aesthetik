# UAPA invariant SIGIL renormalization flow v1

`UAPA_INVARIANT_SIGIL_RENORMALIZATION_FLOW_V1` is the PACAPDG glue layer for the
branch-integrated SIGIL work:

- `lintPluralSigil` remains the canonical KQC flow that emits PACAUAP palette
  primitives and PACAPDG code primitives.
- `buildSigilPaletteFlow` contributes the accessible-palette witness from the
  sigil WCAG atlas branch.
- `cecicodeInspiredProfile` and `validateProfileColorPairs` contribute a
  downstream policy profile for status, communication, and token-first checks.

The integration is intentionally typed metadata over existing validation. It
does not add a second color algorithm. The generalized tensor/MERA vocabulary is
encoded as context-typed tensors, coboundary-cocycle layers, twisted injection
witnesses, annihilator tensors for failing policy, and a PACAPDG colimit whose
`accepted` flag is true only when every branch witness passes.

```ts
import { buildInvariantSigilRenormalizationFlow } from 'universal-abstrakta-plural-aesthetik'

const flow = buildInvariantSigilRenormalizationFlow({
  namespace: 'uap.ceci.qquapp',
  sourceHex: '#1F7A54',
  theme: 'white',
  pairings: [{ foreground: '800', background: 'theme' }],
  injections: [
    {
      id: 'button',
      language: 'css',
      method: 'django-button-flow',
      code: '.button { color: var(--uap-800); background: #fff; }',
    },
  ],
  profilePairs: [
    {
      id: 'status.success',
      role: 'status',
      foreground: '#ffffff',
      background: '#047857',
      hasNonColorCue: true,
    },
  ],
})

console.log(flow.pacapdg.accepted)
console.log(flow.tensors.map((tensor) => tensor.role))
```

The glue stages are:

1. `kokompiled`
2. `kokobuilt`
3. `kokoskaffolded`
4. `kokoweaved`

Failures are represented as contravariant `annihilator` tensors, so review
agents can see which branch witness broke the invariant without guessing from
free-form text.
