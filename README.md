# UnitOne Gap Prototype Check

A dependency-free Node.js checker for turning AI research notes into a concrete first prototype plan.

UnitOne AI's internship centers on finding gaps and building early versions for products such as agriculture sensing, perception, and decision support. This project makes that handoff explicit: before a prototype starts, the plan must name the gap, user context, data source, baseline, measurable evaluation, first build step, and validation owner.

## Run

```bash
npm test
npm run check
```

The agriculture example is synthetic and contains no client or personal data.

## Output

The CLI prints `PASS` or `FAIL` for each requirement. A failed item includes the next piece of information to add; it does not invent research results.
