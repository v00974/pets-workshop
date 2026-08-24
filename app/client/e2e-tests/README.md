# GoldPulse dashboard tests

The Playwright suite validates the XAU/USD paper-trading dashboard in
`goldpulse-dashboard.spec.ts`.

## Coverage

- Renders the market workspace and transparent `WAIT` decision.
- Updates the simulated plan for 5-, 10-, and 15-minute durations.
- Previews a paper trade without representing it as a real order.

## Running tests

From `app/client`:

```sh
npm install
npm run test:e2e
```

Playwright starts the Astro development server automatically. No brokerage,
market-data, or backend service is required for these interface tests.
