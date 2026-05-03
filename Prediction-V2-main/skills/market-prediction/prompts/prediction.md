# Prediction Prompt Template

Use this prompt structure when invoking the prediction engine for a given input.

---

**Prediction Request**

- Keyword: `{{keyword}}`
- Token: `{{token}}`
- Chain: `{{chain}}`
- Timeframe: `{{timeframe}}`
- Additional Context: `{{context}}`

**Instructions:**

1. Evaluate the keyword and token against current market conditions on `{{chain}}`.
2. Identify relevant on-chain events, sentiment signals, and data sources.
3. Apply the appropriate prediction strategy for the current market regime.
4. Combine all signals through ensemble modeling.
5. Apply risk and policy checks.
6. Return a structured prediction result with factors and explanations.

**Format the output as:**

```json
{
  "signal": "...",
  "confidence": ...,
  "riskScore": ...,
  "factors": [...],
  "explanations": [...]
}
```
