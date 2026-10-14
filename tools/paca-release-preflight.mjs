#!/usr/bin/env node
// Structural policy checker; never a legal determination, GitHub authority or publish action.
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const base = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mode = process.argv[2] || 'audit';
const read = (path) => readFileSync(resolve(base, path), 'utf8');
const errors = [];
const requireTrue = (ok, reason) => { if (!ok) errors.push(reason); };

if (!['audit', 'release'].includes(mode)) {
  console.error('Usage: node tools/paca-release-preflight.mjs audit|release');
  process.exit(2);
}

const manifestPath = 'registry/paca_release_gate_v1.json';
requireTrue(existsSync(resolve(base, manifestPath)), 'missing release manifest');
const manifest = existsSync(resolve(base, manifestPath))
  ? JSON.parse(read(manifestPath))
  : null;

if (manifest) {
  requireTrue(manifest.schema_id === 'PACA_CROSS_REPOSITORY_RELEASE_GATE_V1', 'wrong manifest schema');
  requireTrue(manifest.repository === 'jbermejovega/universal-abstrakta-plural-aesthetik', 'wrong repository scope');
  requireTrue(['HOLD_PUBLIC_RELEASE','REVIEW_REQUIRED','READY_FOR_RELEASE','RELEASED'].includes(manifest.release_status), 'invalid release state');
  for (const path of manifest.required_documents || []) {
    requireTrue(typeof path === 'string' && !path.startsWith('/') && !path.split('/').includes('..') && existsSync(resolve(base, path)), 'missing or invalid required document: ' + path);
  }
  const license = read('LICENSE');
  requireTrue(license.includes('MIT License') && license.includes('Ceci Olivera'), 'inherited MIT/Ceci notice missing or changed');
  const pkg = JSON.parse(read('package.json'));
  requireTrue(pkg.license === 'MIT', 'published package license changed without a migration');
  requireTrue(Boolean(pkg.dependencies?.['accessible-color-palette']), 'upstream dependency no longer declared');
  requireTrue(manifest.copyright_claims?.existing_mit_root?.preserve === true, 'root MIT preservation not recorded');
  requireTrue(Array.isArray(manifest.copyright_claims?.new_original_art?.cleared_assets), 'artistic rights inventory is absent');
  if (manifest.release_status === 'HOLD_PUBLIC_RELEASE') {
    requireTrue(manifest.copyright_claims.new_original_art.license_granted_to_assets === false, 'HOLD claims an unreviewed artistic grant');
  }
  if (mode === 'release') {
    requireTrue(manifest.release_status === 'READY_FOR_RELEASE', 'HOLD: release status is not READY_FOR_RELEASE');
    for (const [key, value] of Object.entries(manifest.release_gates || {})) {
      requireTrue(value === true, 'HOLD: release gate not approved: ' + key);
    }
    for (const [key, value] of Object.entries(manifest.channel_authorization || {})) {
      // Only requested channels should be approved, but require at least one specifically approved.
      requireTrue(typeof value === 'boolean', 'invalid channel authorization value: ' + key);
    }
    requireTrue(Object.values(manifest.channel_authorization || {}).some(v => v === true), 'HOLD: no publication channel authorized');
    requireTrue(manifest.inbound?.license_inventory_complete === true, 'HOLD: inbound licenses incomplete');
    requireTrue(manifest.inbound?.demo_asset_provenance_complete === true, 'HOLD: demonstration rights incomplete');
    requireTrue(manifest.inbound?.third_party_notices_complete === true, 'HOLD: notices incomplete');
    requireTrue(manifest.release_gates?.human_release_approval === true, 'HOLD: human approval absent');
  }
}

if (errors.length) {
  for (const error of errors) console.error('PACA POLICY FAIL:', error);
  process.exitCode = 1;
} else {
  console.log(mode === 'audit'
    ? 'PACA POLICY AUDIT OK: declaration present. This is NOT release authorization; current state=' + manifest.release_status
    : 'PACA RELEASE DECLARATION STRUCTURALLY READY; independent human/legal/provenance checks remain required.');
}
