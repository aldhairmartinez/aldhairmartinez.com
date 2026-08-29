#!/usr/bin/env node
// Resume sync/cross-check — see lib/experience.ts for the full workflow this
// supports. This script does exactly two mechanical things:
//
//   1. Copies the authored PDF/DOCX from your local resume source folder
//      into public/, so the production download links pick up the latest
//      files.
//   2. Cross-checks "hard facts" (dollar figures, percentages, rank claims)
//      between the plaintext resume export and lib/experience.ts, and warns
//      about anything present in one but not the other.
//
// It does NOT parse the resume into structured data, does NOT edit
// lib/experience.ts, and does NOT touch git. Resolving a reported mismatch
// is always a manual edit — see the workflow doc for why.
//
// Usage:
//   npm run resume:sync
//
// Configuration:
//   RESUME_SOURCE_DIR   Path to the folder containing the authored resume
//                       files. Defaults to ~/Grafana/aldhairmartinez.

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, "..");

const sourceDir =
  process.env.RESUME_SOURCE_DIR || path.join(os.homedir(), "Grafana", "aldhairmartinez");

const FILENAMES = {
  pdf: "aldhairmartinez_resume.pdf",
  docx: "aldhairmartinez_resume.docx",
  txt: "aldhairmartinez_resume.txt",
};

const publicDir = path.join(repoRoot, "public");
const experiencePath = path.join(repoRoot, "lib", "experience.ts");

function fail(message) {
  console.error(`\n✗ ${message}\n`);
  process.exit(1);
}

function readFile(filePath, label) {
  if (!fs.existsSync(filePath)) {
    fail(
      `${label} not found at:\n  ${filePath}\n\n` +
        `Set RESUME_SOURCE_DIR if your resume files live somewhere else, e.g.:\n` +
        `  RESUME_SOURCE_DIR=/path/to/folder npm run resume:sync`
    );
  }
  return fs.readFileSync(filePath, "utf-8");
}

// --- Step 1: copy PDF/DOCX into public/ ------------------------------------

console.log(`Resume source: ${sourceDir}\n`);

const copyResults = [];
for (const key of ["pdf", "docx"]) {
  const src = path.join(sourceDir, FILENAMES[key]);
  const dest = path.join(publicDir, FILENAMES[key]);

  if (!fs.existsSync(src)) {
    fail(
      `${FILENAMES[key]} not found in resume source folder:\n  ${src}\n\n` +
        `Set RESUME_SOURCE_DIR if your resume files live somewhere else.`
    );
  }

  fs.copyFileSync(src, dest);
  const size = fs.statSync(dest).size;
  copyResults.push({ file: FILENAMES[key], size });
}

console.log("Copied to public/:");
for (const { file, size } of copyResults) {
  console.log(`  ✓ ${file}  (${size.toLocaleString()} bytes)`);
}

// --- Step 2: cross-check hard facts between .txt and experience.ts ---------

const txtPath = path.join(sourceDir, FILENAMES.txt);
const txtRaw = readFile(txtPath, "Resume .txt export").replace(/^﻿/, "");
const tsRaw = readFile(experiencePath, "lib/experience.ts");

const PATTERNS = {
  "dollar figures": /\$[\d,]+(?:\.\d+)?[KM]?\+?/g,
  percentages: /\b\d+(?:\.\d+)?%/g,
  "rank claims": /#\d+\b/g,
};

function extract(text, pattern) {
  return new Set(text.match(pattern) ?? []);
}

console.log("\nCross-checking hard facts against lib/experience.ts...\n");

let anyMismatch = false;

for (const [label, pattern] of Object.entries(PATTERNS)) {
  const inTxt = extract(txtRaw, pattern);
  const inTs = extract(tsRaw, pattern);

  const onlyInTxt = [...inTxt].filter((v) => !inTs.has(v));
  const onlyInTs = [...inTs].filter((v) => !inTxt.has(v));

  if (onlyInTxt.length === 0 && onlyInTs.length === 0) {
    console.log(`  ✓ ${label}: in sync (${inTxt.size} found)`);
    continue;
  }

  anyMismatch = true;
  console.log(`  ⚠ ${label}: mismatch`);
  if (onlyInTxt.length > 0) {
    console.log(`      in resume.txt but not lib/experience.ts: ${onlyInTxt.join(", ")}`);
  }
  if (onlyInTs.length > 0) {
    console.log(`      in lib/experience.ts but not resume.txt: ${onlyInTs.join(", ")}`);
  }
}

console.log("");

if (anyMismatch) {
  console.log(
    "⚠ Mismatches found above. Update the corresponding bullet(s) in lib/experience.ts,\n" +
      "  then re-run `npm run resume:sync` to confirm. This script only reports —\n" +
      "  it never edits experience.ts, resume content, or git for you.\n"
  );
  process.exit(1);
} else {
  console.log("✓ All hard facts match between resume.txt and lib/experience.ts.\n");
  console.log("Next steps: npm run lint && npm run build, then review `git diff` before committing.\n");
}
