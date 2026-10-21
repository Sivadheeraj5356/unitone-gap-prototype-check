#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { checkPrototypePlan } from "./checker.js";

const [planPath] = process.argv.slice(2);
if (!planPath) {
  console.error("Usage: npm run check -- <prototype-plan.json>");
  process.exit(1);
}

const plan = JSON.parse(await readFile(planPath, "utf8"));
const report = checkPrototypePlan(plan);
console.log(`Prototype readiness: ${report.score} (${report.ready ? "ready" : "needs work"})`);
for (const check of report.checks) {
  console.log(`${check.passed ? "PASS" : "FAIL"} ${check.id}: ${check.label}`);
  if (!check.passed) console.log(`  Next: ${check.fix}`);
}
