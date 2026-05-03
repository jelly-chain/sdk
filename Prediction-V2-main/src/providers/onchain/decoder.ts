export interface AbiInput {
  name: string;
  type: string;
}

export interface AbiEvent {
  name: string;
  type: 'event';
  inputs: AbiInput[];
}

export class Decoder {
  decodeLog(
    _abi: AbiEvent,
    _data: string,
    _topics: string[],
  ): Record<string, unknown> {
    return {};
  }

  decodeFunction(
    _inputs: AbiInput[],
    _data: string,
  ): Record<string, unknown> {
    return {};
  }

  encodeFunctionCall(
    _functionSignature: string,
    _params: unknown[],
  ): string {
    return '0x';
  }
}
