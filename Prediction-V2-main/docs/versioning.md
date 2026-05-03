# Versioning and Compatibility

## SDK Version

The current SDK version is `2.0.0`. Use the `SDK_VERSION` constant:

```ts
import { SDK_VERSION } from 'wmarket-prediction-sdk';
console.log(SDK_VERSION); // "2.0.0"
```

## Compatibility Check

```ts
import { checkCompatibility } from 'wmarket-prediction-sdk';

const result = checkCompatibility('1.2.0', '2.0.0');
// { compatible: false, reason: "Major version mismatch..." }
```

## Schema Versioning

All public outputs include a schema version in metadata. Use `registerSchema` and `getSchema` to manage internal schema evolution.

## Changeset Process

This project uses Changesets for release management. Add a changeset before opening a PR:

```bash
npx changeset add
```
