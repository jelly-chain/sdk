# Secrets and Permissions Guide

## Secret Management

Use the `loadSecret` helper to safely load API keys:

```ts
import { loadSecret, loadOptionalSecret } from 'wmarket-prediction-sdk';

const apiKey = loadSecret('LLAMAFI_API_KEY');          // throws if missing
const optKey = loadOptionalSecret('SENTIMENT_API_KEY'); // returns undefined
```

Never log secrets. Use `redactSecret` before printing:

```ts
import { redactSecret } from 'wmarket-prediction-sdk';
console.log(redactSecret(apiKey)); // "ABCD****"
```

## Permissions

The SDK includes a role-based access control system:

```ts
import { createContext, can } from 'wmarket-prediction-sdk';

const ctx = createContext('predictor');
if (can(ctx, 'predict')) {
  // allowed
}
```

## Webhook Verification

```ts
import { verifySignature } from 'wmarket-prediction-sdk';

const isValid = verifySignature(payload, incomingSignature, secret);
```

## Rate Limiting

```ts
import { RateLimiter } from 'wmarket-prediction-sdk';

const limiter = new RateLimiter({ windowMs: 60_000, maxRequests: 30 });
const { allowed, remaining } = limiter.check('user-123');
```
