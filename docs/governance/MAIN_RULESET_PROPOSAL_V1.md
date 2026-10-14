# GitHub main branch and release rulesets · deployment plan V1

Repository: `jbermejovega/universal-abstrakta-plural-aesthetik`. These are **recommended settings only**; this proposal has not changed the GitHub Settings UI.

## Main branch ruleset

- **Name:** `PACA_MAIN_REVIEW_AND_PROVENANCE_V1`.
- **Target:** branch `main` (include exact branch); no wildcard applying to feature branches.
- **Initial enforcement:** `Disabled` or `Evaluate` while verifying that required checks exist. Move to `Active` after observing the intended CI behavior and legal-review process.
- **Bypass list:** empty if feasible; review account-level administrative bypass semantics before claiming universal enforcement.
- **Enable:** Restrict deletions; Block force pushes; Require a pull request before merging; require ≥1 qualified review if feasible; dismiss stale approvals; resolve conversations.
- **Require checks:** select the **observed exact job names** for `policy-audit`, Node build/test and (if applicable) secret/dependency checks. Never invent an unobserved GitHub status name and never make a permanently absent check required.
- **Optional later:** required signed commits only after validating signatures of human/bot contributors; linear history only if the agreed merge strategy is squash/rebase; deployment protection only after a real environment exists.
- **Do not select:** restrict updates/creations unless the human maintenance workflow intentionally authorizes a bypass actor. Avoid configurations that permanently deadlock the sole owner.

## Tag/publication protection

Configure a separate tag ruleset for `v*` and any publication prefixes to prevent unauthorized release tags while HOLD, plus registry credentials, npm trusted publishing and GitHub Pages settings. Protecting `main` alone cannot prevent manually created GitHub Releases, direct npm publish by holders of publishing credentials, unguarded Pages or a separate hosting provider.

## From proposal to enforceable state

1. Run local `npm run policy:audit`; CI `policy-audit` must have at least one **observed** passing run.
2. Merge the governance PR through review (do not bypass protections).
3. Configure the ruleset through <https://github.com/jbermejovega/universal-abstrakta-plural-aesthetik/settings/rules/new?target=branch&enforcement=disabled>.
4. Set precise target, check names, review policy, disabled/evaluate validation. Then switch to Active.
5. Inventory/lock all registry and hosting release credentials. Preserve explicit `HOLD_PUBLIC_RELEASE` in each repo until audited.
6. Treat explicit human copyright approval as an external gate: a green CI badge cannot grant copyright ownership.

## Scope

The ruleset controls **this repository** only. A documented standard in one repo is not an organization-wide enforcement policy; other repositories require their own adoption, check observation and active protections. This GitHub connector does not expose settings-write ruleset management, so this document is a configuration checklist, not proof of activation.
