# Jelly x402 SDK

Official SDK for integrating with the Jelly x402 autonomous payment protocol.  
Supports **Solana** and **BNB Chain (BSC)**.

> The prediction markets were broken. Fragmented across chains, locked behind regional restrictions, controlled by the few. Agents were blind. Alpha died in silos. **Jelly is formless, unstoppable. Jelly sees all chains.**

**GitHub:** https://github.com/jelly-chain/sdk  
**Docs:** https://jellychain.fun/docs  
**Terminal:** https://terminal.jellychain.fun

---

## Supported Chains

| Chain | Package (TS) | Package (Python) | Chain ID |
|-------|-------------|-----------------|----------|
| Solana | `@jelly-chain/sdk` | `jelly-x402` | — |
| BNB Chain | `@jelly-chain/bnb-sdk` | `jelly-x402-bnb` | 56 / 97 |

---

## Repository Structure

```
sdk/
├── README.md                  # This file
│
├── ts/                        # Solana TypeScript SDK
│   ├── index.ts
│   ├── client.ts              # X402Client
│   ├── types.ts
│   ├── errors.ts
│   ├── middleware.ts          # Express middleware
│   ├── wallet.ts              # Solana wallet utils
│   └── package.json           # @jelly-chain/sdk
│
├── python/                    # Solana Python SDK
│   └── x402_sdk/
│       ├── __init__.py
│       ├── client.py          # X402Client + AsyncX402Client
│       ├── types.py
│       ├── errors.py
│       ├── middleware.py      # Flask middleware
│       └── wallet.py
│
└── bnb/                       # BNB Chain SDK
    ├── README.md              # BNB-specific docs
    ├── ts/                    # BNB TypeScript SDK
    │   ├── index.ts
    │   ├── client.ts          # BNBX402Client + AsyncBNBX402Client
    │   ├── types.ts
    │   ├── errors.ts
    │   ├── middleware.ts      # Express middleware
    │   ├── wallet.ts          # BNBWallet (ethers.js v6)
    │   └── package.json       # @jelly-chain/bnb-sdk
    └── python/                # BNB Python SDK
        ├── setup.py
        ├── pyproject.toml
        └── x402_bnb/
            ├── __init__.py
            ├── client.py      # BNBX402Client + AsyncBNBX402Client
            ├── types.py
            ├── errors.py
            ├── middleware.py  # Flask + FastAPI middleware
            └── wallet.py      # BNBWallet (web3.py)
```

---

## Human Setup — Solana

### Install

```bash
# TypeScript
npm install @jelly-chain/sdk

# Python
pip install jelly-x402
```

### Get an API Key

1. Sign up at https://jellychain.fun
2. Dashboard → API Keys → Create Key
3. `export JELLY_API_KEY="x402_your_api_key"`

### TypeScript — Client (paying agent)

```typescript
import { X402Client } from '@jelly-chain/sdk';
import { Keypair } from '@solana/web3.js';

const keypair = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(process.env.SOLANA_PRIVATE_KEY!))
);

const client = new X402Client({
  keypair,
  apiKey: process.env.JELLY_API_KEY,
  baseUrl: 'https://api.jellychain.fun',
  maxPaymentPerRequest: 0.1,
});

const response = await client.request('https://api.example.com/premium-data');
console.log(response.data);
if (response.paymentMade) {
  console.log(`Paid ${response.paymentMade.amount} ${response.paymentMade.currency}`);
}
```

### Python — Client (paying agent)

```python
from jelly_x402 import X402Client, X402Config

config = X402Config(
    network='mainnet-beta',
    rpc_url='https://api.mainnet-beta.solana.com',
    max_payment_per_request=0.1,
    commitment='confirmed',
)
client = X402Client(keypair=keypair, config=config)

response = client.request('https://api.example.com/premium-data')
print(response.data)
```

### Async Support (Python)

```python
from jelly_x402 import AsyncX402Client
import asyncio

async def main():
    client = AsyncX402Client(keypair=keypair)
    response = await client.request('https://api.example.com/data')
    print(response.data)

asyncio.run(main())
```

### Express Middleware (Solana)

```typescript
import { createX402Middleware } from '@jelly-chain/sdk';

const x402 = createX402Middleware({
  apiKey: process.env.JELLY_API_KEY,
  recipient: 'YOUR_SOLANA_WALLET_ADDRESS',
});

app.get('/api/premium', x402.requirePayment(0.001), (req, res) => {
  res.json({ data: 'Premium content!' });
});
```

### Flask Middleware (Solana)

```python
from jelly_x402 import create_x402_middleware

x402 = create_x402_middleware(
    api_key=os.environ['JELLY_API_KEY'],
    recipient='YOUR_SOLANA_WALLET_ADDRESS'
)

@app.route('/api/premium')
@x402.require_payment(0.001)
def premium():
    return {'data': 'Premium content!'}
```

### Error Handling (Solana)

```python
from jelly_x402 import X402Error, InsufficientBalanceError, PaymentExpiredError

try:
    response = client.request('https://api.example.com/data')
except InsufficientBalanceError as e:
    print(f"Not enough SOL: need {e.required}")
except PaymentExpiredError:
    print("Payment window expired, retrying...")
except X402Error as e:
    print(f"Jelly x402 error: {e.message}")
```

---

## Human Setup — BNB Chain

### Install

```bash
# TypeScript
npm install @jelly-chain/bnb-sdk ethers

# Python (minimal)
pip install jelly-x402-bnb

# Python (with web3 signing)
pip install "jelly-x402-bnb[web3]"

# Python (everything)
pip install "jelly-x402-bnb[full]"
```

### TypeScript — Client (paying agent)

```typescript
import { BNBX402Client, BNBWallet } from '@jelly-chain/bnb-sdk';

const wallet = BNBWallet.fromPrivateKey(process.env.BNB_PRIVATE_KEY!, {
  network: 'mainnet',
});

const client = new BNBX402Client({
  apiKey: process.env.JELLY_API_KEY!,
  network: 'mainnet',
  maxPaymentPerRequest: 0.005,   // BNB
  gasSpeed: 'standard',
});
client.setWallet(wallet);

const response = await client.request('https://api.example.com/premium-data');
console.log(response.data);
if (response.paymentMade) {
  console.log(`Paid ${response.paymentMade.amount} ${response.paymentMade.currency}`);
  console.log(`Tx: https://bscscan.com/tx/${response.paymentMade.txHash}`);
}
```

### Python — Client (paying agent)

```python
from x402_bnb import BNBX402Client, BNBWallet
import os

wallet = BNBWallet.from_private_key(os.environ['BNB_PRIVATE_KEY'])
client = BNBX402Client(
    api_key=os.environ['JELLY_API_KEY'],
    network='mainnet',
    max_payment_per_request=0.005,
    gas_speed='standard',
)
client.set_wallet(wallet)

response = client.request('https://api.example.com/premium-data')
print(response.data)
if response.payment_made:
    print(f"Paid {response.payment_made['amount']} {response.payment_made['currency']}")
    print(f"Tx: https://bscscan.com/tx/{response.payment_made['tx_hash']}")
```

### Async (Python — BNB)

```python
from x402_bnb import AsyncBNBX402Client, BNBWallet
import asyncio, os

async def main():
    wallet = BNBWallet.from_private_key(os.environ['BNB_PRIVATE_KEY'])
    client = AsyncBNBX402Client(api_key=os.environ['JELLY_API_KEY'])
    client.set_wallet(wallet)

    response = await client.request('https://api.example.com/data')
    print(response.data)

asyncio.run(main())
```

### Express Middleware (BNB)

```typescript
import { createBNBMiddleware } from '@jelly-chain/bnb-sdk';

const bnb = createBNBMiddleware({
  apiKey: process.env.JELLY_API_KEY!,
  recipient: '0xYourWalletAddress',
  chainId: 56,
});

app.get('/api/premium', bnb.requirePayment(0.001), (req, res) => {
  res.json({ data: 'Premium content!' });
});

app.get('/api/data', bnb.requirePayment(1, { currency: 'USDT' }), (req, res) => {
  res.json({ data: 'Data behind 1 USDT paywall' });
});
```

### Flask Middleware (BNB)

```python
from x402_bnb.middleware import create_bnb_middleware, get_payment_info
from flask import g

bnb = create_bnb_middleware(
    api_key=os.environ['JELLY_API_KEY'],
    recipient='0xYourWalletAddress',
)

@app.route('/api/premium')
@bnb.require_payment(0.001)
def premium():
    payment = get_payment_info(g)
    return {'data': 'Premium!', 'paid_via': payment['tx_hash']}
```

### Error Handling (BNB)

```python
from x402_bnb import (
    X402Error, InsufficientBalanceError, InsufficientGasError,
    MaxPaymentExceededError, WrongChainError, PaymentExpiredError,
)

try:
    response = client.request('https://api.example.com/data')
except InsufficientBalanceError as e:
    print(f"Need {e.required} {e.currency}, have {e.available}")
except InsufficientGasError as e:
    print(f"Top up BNB for gas: need ~{e.required_bnb} BNB")
except WrongChainError as e:
    print(f"Wrong chain: expected {e.expected_chain_id}")
except MaxPaymentExceededError as e:
    print(f"Payment {e.requested} > max {e.maximum}")
except X402Error as e:
    print(f"Error [{e.code}]: {e.message}")
```

> See `bnb/README.md` for the full BNB SDK reference, including FastAPI middleware, wallet utilities, and agent skills setup.

---

## Agent Setup (Skills)

The Skills setup lets an autonomous agent load Jelly x402 as a headless skill. Place SKILL.md files in `.local/skills/`.

### Solana Skill

Place in `.local/skills/jelly-x402/SKILL.md`:

````markdown
---
name: jelly-x402
description: Solana x402 payment client for autonomous agents.
---

## Environment Variables
- `JELLY_API_KEY` — API key from jellychain.fun
- `SOLANA_PRIVATE_KEY` — JSON array of secret key bytes

## Quick Usage
```javascript
const { X402Client } = await import('@jelly-chain/sdk');
const { Keypair } = await import('@solana/web3.js');

const keypair = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(process.env.SOLANA_PRIVATE_KEY))
);
const client = new X402Client({
  keypair,
  apiKey: process.env.JELLY_API_KEY,
  baseUrl: 'https://api.jellychain.fun',
  maxPaymentPerRequest: 0.05,
});

const response = await client.request('https://api.example.com/data');
console.log(response.data);
```
````

### BNB Chain Skill

Place in `.local/skills/jelly-x402-bnb/SKILL.md`:

````markdown
---
name: jelly-x402-bnb
description: BNB Chain x402 payment client for autonomous agents.
---

## Environment Variables
- `JELLY_API_KEY` — API key from jellychain.fun
- `BNB_PRIVATE_KEY` — 32-byte hex private key

## Quick Usage (TypeScript)
```javascript
const { BNBX402Client, BNBWallet } = await import('@jelly-chain/bnb-sdk');

const wallet = BNBWallet.fromPrivateKey(process.env.BNB_PRIVATE_KEY);
const client = new BNBX402Client({
  apiKey: process.env.JELLY_API_KEY,
  network: 'mainnet',
  maxPaymentPerRequest: 0.005,
});
client.setWallet(wallet);

const response = await client.request('https://api.example.com/data');
console.log(response.data);
```

## Quick Usage (Python)
```python
from x402_bnb import BNBX402Client, BNBWallet
import os

wallet = BNBWallet.from_private_key(os.environ['BNB_PRIVATE_KEY'])
client = BNBX402Client(api_key=os.environ['JELLY_API_KEY'], max_payment_per_request=0.005)
client.set_wallet(wallet)
response = client.request('https://api.example.com/data')
print(response.data)
```

## Agent Safety
1. Keep `maxPaymentPerRequest` low (0.001–0.01 BNB)
2. Maintain ~0.01 BNB gas reserve at all times
3. Log all txHash values for audit trail
4. Never hardcode private keys
````

---

## API Reference

### Base URL
```
https://api.jellychain.fun/api
```

### Authentication
```
Authorization: Bearer x402_your_api_key
```

### Solana Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/verify` | Verify Solana payment |
| POST | `/payment-request` | Create payment request |
| GET | `/balance/{address}` | SOL + USDC balance |
| GET | `/transaction/{signature}` | Transaction details |
| GET | `/transactions/{address}` | Transaction history |
| GET | `/agent/stats` | Agent payment stats |

### BNB Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/bnb/verify` | Verify BNB Chain payment |
| POST | `/bnb/payment-request` | Create BNB payment request |
| GET | `/bnb/balance/{address}` | BNB + token balances |
| GET | `/bnb/transaction/{txHash}` | Transaction details |
| GET | `/bnb/transactions/{address}` | Transaction history |
| GET | `/bnb/gas` | Current gas estimates |
| GET | `/bnb/agent/stats` | BNB agent stats |

---

## Support

- Website: https://jellychain.fun
- Documentation: https://jellychain.fun/docs
- GitHub: https://github.com/jelly-chain/sdk
- Twitter: https://x.com/jellyqnw

## License

MIT
