# Jelly x402 SDK

Official SDK for the Jelly x402 autonomous payment protocol.  
Settle HTTP 402 payments on **Solana** and **BNB Chain**.

> The prediction markets were broken. Fragmented across chains, locked behind regional restrictions, controlled by the few. Agents were blind. **Jelly is formless, unstoppable. Jelly sees all chains.**

**GitHub:** https://github.com/jelly-chain/sdk  
**Docs:** https://jellychain.fun/docs  
**Terminal:** https://terminal.jellychain.fun

---

## Supported Chains

| Chain | Folder | Package (TS) | Package (Python) |
|-------|--------|-------------|-----------------|
| Solana | [`Solana/`](https://github.com/jelly-chain/sdk/tree/main/Solana) | `@jelly-chain/sdk` | `jelly-x402` |
| BNB Chain | [`bnb/`](https://github.com/jelly-chain/sdk/tree/main/bnb) | `@jelly-chain/bnb-sdk` | `jelly-x402-bnb` |

---

## Repository Structure

```
sdk/
├── README.md              # This file
│
├── Solana/                # Solana SDK
│   ├── README.md          # Full Solana docs (TS + Python)
│   ├── ts/                # TypeScript — @jelly-chain/sdk
│   │   ├── index.ts
│   │   ├── client.ts      # X402Client
│   │   ├── types.ts
│   │   ├── errors.ts
│   │   ├── middleware.ts  # Express middleware
│   │   ├── wallet.ts
│   │   └── package.json
│   └── python/            # Python — jelly-x402
│       ├── README.md
│       ├── setup.py
│       ├── pyproject.toml
│       └── x402_sdk/
│           ├── client.py  # X402Client + AsyncX402Client
│           ├── types.py
│           ├── errors.py
│           ├── middleware.py
│           └── wallet.py
│
└── bnb/                   # BNB Chain SDK
    ├── README.md          # Full BNB docs (TS + Python)
    ├── ts/                # TypeScript — @jelly-chain/bnb-sdk
    │   ├── index.ts
    │   ├── client.ts      # BNBX402Client + AsyncBNBX402Client
    │   ├── types.ts
    │   ├── errors.ts
    │   ├── middleware.ts  # Express middleware
    │   ├── wallet.ts      # BNBWallet (ethers.js v6)
    │   └── package.json
    └── python/            # Python — jelly-x402-bnb
        ├── setup.py
        ├── pyproject.toml
        └── x402_bnb/
            ├── client.py  # BNBX402Client + AsyncBNBX402Client
            ├── types.py
            ├── errors.py
            ├── middleware.py  # Flask + FastAPI
            └── wallet.py      # BNBWallet (web3.py)
```

---

## Quick Start

### Solana

Full docs → [`Solana/README.md`](https://github.com/jelly-chain/sdk/tree/main/Solana)

**TypeScript**
```bash
npm install @jelly-chain/sdk
```
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
if (response.paymentMade) {
  console.log(`Paid ${response.paymentMade.amount} SOL — sig: ${response.paymentMade.signature}`);
}
```

**Python**
```bash
pip install jelly-x402
```
```python
from jelly_x402 import X402Client
import os

client = X402Client(
    api_key=os.environ['JELLY_API_KEY'],
    base_url='https://api.jellychain.fun',
    max_payment_per_request=0.1,
)

response = client.request('https://api.example.com/premium-data')
print(response.data)
```

---

### BNB Chain

Full docs → [`bnb/README.md`](https://github.com/jelly-chain/sdk/tree/main/bnb)

**TypeScript**
```bash
npm install @jelly-chain/bnb-sdk ethers
```
```typescript
import { BNBX402Client, BNBWallet } from '@jelly-chain/bnb-sdk';

const wallet = BNBWallet.fromPrivateKey(process.env.BNB_PRIVATE_KEY!, { network: 'mainnet' });
const client = new BNBX402Client({
  apiKey: process.env.JELLY_API_KEY!,
  network: 'mainnet',
  maxPaymentPerRequest: 0.005,
});
client.setWallet(wallet);

const response = await client.request('https://api.example.com/premium-data');
if (response.paymentMade) {
  console.log(`Paid ${response.paymentMade.amount} BNB — tx: ${response.paymentMade.txHash}`);
}
```

**Python**
```bash
pip install "jelly-x402-bnb[web3]"
```
```python
from x402_bnb import BNBX402Client, BNBWallet
import os

wallet = BNBWallet.from_private_key(os.environ['BNB_PRIVATE_KEY'])
client = BNBX402Client(
    api_key=os.environ['JELLY_API_KEY'],
    network='mainnet',
    max_payment_per_request=0.005,
)
client.set_wallet(wallet)

response = client.request('https://api.example.com/premium-data')
print(response.data)
```

---

## API Endpoints

**Base URL:** `https://api.jellychain.fun/api`  
**Auth:** `Authorization: Bearer x402_your_api_key`

| Method | Endpoint | Chain | Description |
|--------|----------|-------|-------------|
| POST | `/verify` | Solana | Verify payment by signature |
| POST | `/payment-request` | Solana | Create payment requirement |
| GET | `/balance/{address}` | Solana | SOL + USDC balance |
| GET | `/transaction/{sig}` | Solana | Transaction details |
| GET | `/transactions/{address}` | Solana | Transaction history |
| POST | `/bnb/verify` | BNB | Verify payment by txHash |
| POST | `/bnb/payment-request` | BNB | Create BNB payment requirement |
| GET | `/bnb/balance/{address}` | BNB | BNB + token balances |
| GET | `/bnb/transaction/{hash}` | BNB | Transaction details |
| GET | `/bnb/gas` | BNB | Current gas estimates |

---

## Chain Comparison

| Feature | Solana | BNB Chain |
|---------|--------|-----------|
| Address | Base58 | `0x` hex (EVM) |
| Native token | SOL | BNB |
| Tokens | USDC (SPL) | USDT, USDC, BUSD (BEP-20) |
| TX identifier | `signature` | `txHash` |
| Payment header | `X-402-Payment-Signature` | `X-402-Payment-TxHash` |
| Chain ID header | — | `X-402-Chain-Id: 56` |
| Signing lib (TS) | `@solana/web3.js` | `ethers` v6 |
| Signing lib (Py) | `solders` | `web3.py` |

---

## Support

- Website: https://jellychain.fun
- Docs: https://jellychain.fun/docs
- GitHub: https://github.com/jelly-chain/sdk
- Twitter: https://x.com/jellyqnw

## License

MIT
