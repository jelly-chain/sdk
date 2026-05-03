# Configuration Reference

## SDKConfig

| Field | Type | Default | Description |
|---|---|---|---|
| `chains` | `ChainId[]` | required | Supported chains |
| `enableRiskAssessment` | `boolean` | `false` | Enable risk scoring |
| `enableMetrics` | `boolean` | `false` | Enable metrics tracking |
| `enableCache` | `boolean` | `false` | Enable prediction caching |
| `enableTelemetry` | `boolean` | `false` | Enable telemetry spans |
| `enableAudit` | `boolean` | `false` | Enable audit logging |
| `enableReplay` | `boolean` | `false` | Enable replay support |
| `logLevel` | `string` | `'info'` | Log level |
| `cacheOptions` | `CacheOptions` | `{}` | Cache configuration |
| `riskOptions` | `RiskOptions` | `{}` | Risk configuration |
| `providers` | `ProviderConfig[]` | `[]` | Provider configurations |
| `plugins` | `string[]` | `[]` | Plugin identifiers to load |

## CacheOptions

| Field | Type | Default | Description |
|---|---|---|---|
| `ttlMs` | `number` | `300000` | Cache entry TTL in ms |
| `maxEntries` | `number` | `1000` | Max cache size |
| `adapter` | `string` | `'memory'` | `memory`, `redis`, or `file` |
| `redisUrl` | `string` | — | Redis URL when using redis adapter |

## RiskOptions

| Field | Type | Default | Description |
|---|---|---|---|
| `maxRiskScore` | `number` | `0.85` | Block predictions above this score |
| `confidenceThreshold` | `number` | `0.3` | Block predictions below this confidence |
| `tolerance` | `string` | `'medium'` | `low`, `medium`, or `high` |
