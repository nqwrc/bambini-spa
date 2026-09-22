// Data guardrail for bambini-spa. Runs before every `vite build` (see package.json "prebuild").
//
// Two modes, chosen by the BAMBINI_MODE environment variable:
//   mockup     (default) placeholders are allowed; unverified items are listed as warnings.
//   production every published contact channel must be verified, or the build stops.
//
// The rule: a null field renders a visible placeholder on the site, never an invented value.
// A `verified: false` on something the public would act on (an email, a phone number) is a
// build error in production, because a wrong channel is worse than a missing one.

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mode = process.env.BAMBINI_MODE === 'production' ? 'production' : 'mockup';
const errors = [];
const warnings = [];

function load(name) {
  const path = resolve(root, 'data', name);
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (err) {
    errors.push(`${name}: cannot read or parse (${err.message})`);
    return null;
  }
}

const ISO_DATE = /^\d{4}-\d{2}(-\d{2})?$/;
const EMAIL = /^[^\s@]+@bambinispa\.it$/;

const site = load('site.json');
const fleet = load('fleet.json');
const timeline = load('timeline.json');
const news = load('news.json');
const contacts = load('contacts.json');
const counters = load('counters.json');
const certifications = load('certifications.json');
const team = load('team.json');

// --- site.json ---------------------------------------------------------------
if (site) {
  if (!ISO_DATE.test(site.updated ?? '')) errors.push('site.json: "updated" must be an ISO date');
  if (site.address?.verified !== true) errors.push('site.json: address must be verified');
  for (const f of site.facts ?? []) {
    if (f.value === null || f.value === undefined) errors.push(`site.json: fact "${f.key}" has no value; drop it instead of leaving it empty`);
    if (!f.source || !f.asOf) errors.push(`site.json: fact "${f.key}" needs "source" and "asOf"`);
    if (f.verified !== true) warnings.push(`site.json: fact "${f.key}" is not verified (renders the amber badge)`);
  }
}

// --- fleet.json --------------------------------------------------------------
const INVENTED_NAMES = ['Green Sister', 'Atlas', 'Fast Swift', 'Unity', 'Carrier Uno'];
if (fleet) {
  if (fleet.length !== 17) errors.push(`fleet.json: expected 17 vessels (bambinispa.it/flotta, 2026-09), found ${fleet.length}`);
  const ids = new Set();
  for (const v of fleet) {
    if (!v.id || !v.name || !v.type) errors.push(`fleet.json: vessel ${JSON.stringify(v.id ?? v.name)} lacks id, name or type`);
    if (ids.has(v.id)) errors.push(`fleet.json: duplicate id "${v.id}"`);
    ids.add(v.id);
    if (INVENTED_NAMES.includes(v.name)) errors.push(`fleet.json: "${v.name}" is an invented name from the generated mockups`);
    if (![1, 2, null].includes(v.dp)) errors.push(`fleet.json: "${v.name}" dp must be 1, 2 or null`);
    if (typeof v.fifi !== 'boolean') errors.push(`fleet.json: "${v.name}" fifi must be boolean`);
    if (v.lastRefit !== null && !ISO_DATE.test(v.lastRefit)) errors.push(`fleet.json: "${v.name}" lastRefit must be ISO or null`);
  }
}

// --- timeline.json / news.json ---------------------------------------------------
for (const [name, items, dateKey] of [['timeline.json', timeline, 'date'], ['news.json', news, 'date']]) {
  if (!items) continue;
  for (const it of items) {
    const label = it.title_it ?? `year ${it.year}`;
    if (it.verified) {
      if (!ISO_DATE.test(it[dateKey] ?? '')) errors.push(`${name}: "${label}" is verified but has no ISO date`);
      if (!it.source) errors.push(`${name}: "${label}" is verified but has no source`);
      if (!it.title_it) errors.push(`${name}: verified entry without title_it`);
    } else {
      warnings.push(`${name}: "${label}" is a placeholder`);
    }
  }
}

// --- contacts.json -----------------------------------------------------------
if (contacts) {
  const keys = new Set();
  let lastResort = 0;
  for (const c of contacts) {
    if (!c.key || !c.label_it) errors.push('contacts.json: every contact needs key and label_it');
    if (keys.has(c.key)) errors.push(`contacts.json: duplicate key "${c.key}"`);
    keys.add(c.key);
    if (c.email !== null && !EMAIL.test(c.email)) errors.push(`contacts.json: "${c.key}" email must be @bambinispa.it or null`);
    if (c.lastResort) lastResort += 1;
    const hasChannel = c.email !== null || c.phone !== null;
    if (c.verified !== true) {
      const msg = `contacts.json: "${c.key}" (${c.email ?? c.phone ?? 'no channel'}) is not verified`;
      // In production an unverified channel would route real requests to an address nobody reads.
      if (mode === 'production' && hasChannel) errors.push(msg);
      else warnings.push(msg);
    }
  }
  if (lastResort !== 1) errors.push('contacts.json: exactly one contact must carry "lastResort": true (the info@ fallback)');
  const fallback = contacts.find((c) => c.lastResort);
  if (fallback && fallback.email !== 'info@bambinispa.it') errors.push('contacts.json: the lastResort contact must be info@bambinispa.it');
}

// --- counters.json -----------------------------------------------------------
if (counters) {
  for (const k of ['operativeToday', 'hoursYtd', 'paxYtd']) {
    if (counters[k] !== null && typeof counters[k] !== 'number') errors.push(`counters.json: "${k}" must be a number or null`);
    if (counters[k] === null) warnings.push(`counters.json: "${k}" is a placeholder`);
  }
  if (counters.updated !== null && !ISO_DATE.test(counters.updated)) errors.push('counters.json: "updated" must be ISO or null');
}

// --- certifications.json -----------------------------------------------------
if (certifications) {
  for (const c of certifications) {
    if (!c.name) errors.push('certifications.json: entry without name');
    for (const k of ['since', 'lastAudit', 'expires']) {
      if (c[k] !== null && !ISO_DATE.test(c[k])) errors.push(`certifications.json: "${c.name}" ${k} must be ISO or null`);
      if (c[k] === null && c.kind !== 'training') warnings.push(`certifications.json: "${c.name}" ${k} missing`);
    }
    if (c.verified && c.kind !== 'training' && !c.since) errors.push(`certifications.json: "${c.name}" verified without a "since" date`);
  }
}

// --- team.json ---------------------------------------------------------------
if (team && contacts) {
  const deptKeys = new Set(contacts.map((c) => c.key));
  for (const m of team) {
    if (!m.role_it) errors.push('team.json: entry without role_it');
    if (!deptKeys.has(m.dept)) errors.push(`team.json: "${m.role_it}" dept "${m.dept}" is not a contacts.json key`);
    if (m.name === null) warnings.push(`team.json: "${m.role_it}" has no name (renders [NOME])`);
  }
}

// --- report ------------------------------------------------------------------
console.log(`check-data: mode=${mode}, ${errors.length} error(s), ${warnings.length} warning(s)`);
for (const w of warnings) console.log(`  warn  ${w}`);
for (const e of errors) console.error(`  ERROR ${e}`);
if (errors.length) {
  console.error('check-data: build blocked. Fix the data or run in mockup mode (BAMBINI_MODE unset).');
  process.exit(1);
}
