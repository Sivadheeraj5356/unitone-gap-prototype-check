const REQUIRED_FIELDS = [
  ["problemGap", "The plan states the gap found during research"],
  ["userContext", "The plan names the user and operating context"],
  ["datasetSource", "The plan names a lawful dataset or collection source"],
  ["baseline", "The plan defines a baseline to beat"],
  ["evaluationMetric", "The plan defines a measurable evaluation metric"],
  ["prototypeStep", "The plan defines the first small prototype step"],
  ["validationOwner", "The plan names who validates the result"]
];

export function checkPrototypePlan(plan) {
  const checks = REQUIRED_FIELDS.map(([field, label]) => ({
    id: field,
    label,
    passed: typeof plan[field] === "string" && plan[field].trim().length >= 12,
    fix: `Add a specific ${field} entry before prototyping.`
  }));

  const metricText = `${plan.evaluationMetric || ""} ${plan.baseline || ""}`;
  checks.push({
    id: "measurable-target",
    label: "The evaluation includes a numeric target or comparison",
    passed: /\d/.test(metricText) || /baseline|compare|outperform/i.test(metricText),
    fix: "Add a numeric target or explicit comparison against the baseline."
  });

  const passed = checks.filter((check) => check.passed).length;
  return {
    ready: passed === checks.length,
    score: `${passed}/${checks.length}`,
    checks
  };
}
