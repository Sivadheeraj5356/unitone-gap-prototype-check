import test from "node:test";
import assert from "node:assert/strict";
import { checkPrototypePlan } from "../src/checker.js";

const readyPlan = {
  problemGap: "Field teams lack a low-cost way to spot early crop stress before visible damage spreads.",
  userContext: "Farm operations teams reviewing drone and phone images during weekly field visits.",
  datasetSource: "Public plant-village images plus consented pilot photos collected by the field team.",
  baseline: "Compare against weekly manual inspection with a target of at least 80% recall.",
  evaluationMetric: "Recall at 80% or better and false positives reviewed by an agronomist.",
  prototypeStep: "Build a small image classifier and report confidence-ranked stressful regions for review.",
  validationOwner: "Agronomy reviewer and product engineer"
};

test("accepts a complete gap-to-prototype plan", () => {
  const report = checkPrototypePlan(readyPlan);
  assert.equal(report.ready, true);
  assert.equal(report.score, "8/8");
});

test("rejects a missing research gap", () => {
  const report = checkPrototypePlan({ ...readyPlan, problemGap: "" });
  assert.equal(report.checks.find((check) => check.id === "problemGap").passed, false);
});

test("rejects a missing dataset source", () => {
  const report = checkPrototypePlan({ ...readyPlan, datasetSource: "" });
  assert.equal(report.checks.find((check) => check.id === "datasetSource").passed, false);
});

test("requires a measurable target or baseline comparison", () => {
  const report = checkPrototypePlan({
    ...readyPlan,
    baseline: "manual review process",
    evaluationMetric: "model quality"
  });
  assert.equal(report.checks.find((check) => check.id === "measurable-target").passed, false);
});

test("requires a validation owner", () => {
  const report = checkPrototypePlan({ ...readyPlan, validationOwner: "TBD" });
  assert.equal(report.checks.find((check) => check.id === "validationOwner").passed, false);
});
