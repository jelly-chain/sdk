# Risk Explanation Prompts

Use these prompts when explaining risk scores to users or downstream systems.

---

## Low Risk (0–0.30)

"The prediction carries low risk. Market conditions are relatively stable and data quality is good. Suitable for standard automated execution."

## Medium Risk (0.30–0.60)

"The prediction carries moderate risk. Some uncertainty exists in the input signals or market conditions are elevated. Review before taking automated action."

## High Risk (0.60–0.85)

"The prediction carries elevated risk. Significant uncertainty or volatility is present. Use conservative position sizes and apply manual review."

## Critical Risk (0.85+)

"The prediction has critical risk. Inputs are highly uncertain, volatile, or conflicting. Do not use this output for automated execution. Flag for human review."

---

## Risk Factor Explanations

- **high volatility** — Recent price movements have been unusually large.
- **low confidence** — Not enough signals agree on a direction.
- **volume spike** — Unusual trading volume was detected, which may indicate manipulation or significant news.
- **liquidity risk** — Pool depth is insufficient for safe execution.
- **sentiment contradiction** — Social and on-chain signals are in direct conflict.
