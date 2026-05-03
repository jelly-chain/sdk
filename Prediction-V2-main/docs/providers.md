# Provider Integration Guide

## Available Providers

| Provider | Type | Source |
|---|---|---|
| LlamaFi | off-chain | `src/providers/llamafi/` |
| BNB MCP | on-chain | `src/providers/mcp/` |
| RPC | on-chain | `src/providers/onchain/` |
| News | off-chain | `src/providers/offchain/news-client.ts` |
| Sentiment | off-chain | `src/providers/offchain/sentiment-client.ts` |
| Macro | off-chain | `src/providers/offchain/macro-client.ts` |

## Adding a Custom Provider

1. Create `src/providers/<name>/` with `client.ts`, `adapter.ts`, `types.ts`, `validators.ts`.
2. Extend `BaseProvider` in your main provider class.
3. Register it in `src/registry/provider-registry.ts`.
4. Add unit tests in `tests/unit/providers/<name>.test.ts`.

## Environment Variables

Set these in `.env`:

```
LLAMAFI_API_KEY=...
MCP_API_KEY=...
NEWS_API_KEY=...
SENTIMENT_API_KEY=...
```
