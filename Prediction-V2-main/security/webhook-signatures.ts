import { createHmac, timingSafeEqual } from 'crypto';

export function signPayload(payload: string, secret: string, algorithm = 'sha256'): string {
  return createHmac(algorithm, secret).update(payload).digest('hex');
}

export function verifySignature(payload: string, signature: string, secret: string, algorithm = 'sha256'): boolean {
  const expected = signPayload(payload, secret, algorithm);
  try {
    return timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
}

export function extractSignatureHeader(header: string, prefix = 'sha256='): string {
  if (header.startsWith(prefix)) return header.slice(prefix.length);
  return header;
}
