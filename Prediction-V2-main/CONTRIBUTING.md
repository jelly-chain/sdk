# Contributing to WMarket Prediction SDK v2

Thank you for your interest in contributing. This document covers how to set up your environment, make changes, and submit your work.

## Getting Started

1. Fork the repository and clone your fork.
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in any keys you need for local development.
4. Run the test suite to confirm everything is working: `npm run test:run`

## Development Workflow

- `npm run dev` — builds the SDK in watch mode.
- `npm run test` — runs tests in interactive watch mode.
- `npm run typecheck` — checks TypeScript without emitting files.
- `npm run lint` — runs ESLint across all source files.

## Submitting Changes

1. Create a branch from `main`: `git checkout -b feat/my-feature`
2. Make your changes and add tests.
3. Add a changeset: `npx changeset add`
4. Push your branch and open a pull request. Fill in the PR template.

## Adding a New Provider

1. Create a directory under `src/providers/<name>/` with `client.ts`, `adapter.ts`, `types.ts`, and `validators.ts`.
2. Register the provider in `src/providers/index.ts` and `src/registry/provider-registry.ts`.
3. Add unit tests under `tests/unit/providers/<name>.test.ts`.
4. Document the provider in `docs/providers.md`.

## Adding a New Strategy

1. Create `src/strategies/<name>-strategy.ts` implementing the `BaseStrategy` interface.
2. Register it in `src/strategies/index.ts` and `src/registry/strategy-registry.ts`.
3. Add tests under `tests/unit/` and document in `docs/strategies.md`.

## Code Style

- TypeScript strict mode is enforced.
- Prefer explicit return types on public functions.
- No `any` unless absolutely necessary — use `unknown` and narrow.
- All async functions must handle errors explicitly.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
