export interface Plugin {
  readonly name: string;
  readonly version: string;
  readonly description: string;
  readonly capabilities: string[];

  install(): Promise<void>;
  start(): Promise<void>;
  stop(): Promise<void>;
  uninstall(): Promise<void>;
}

export abstract class BasePlugin implements Plugin {
  abstract readonly name: string;
  abstract readonly version: string;
  abstract readonly description: string;
  readonly capabilities: string[] = [];

  async install(): Promise<void> {}
  async start(): Promise<void> {}
  async stop(): Promise<void> {}
  async uninstall(): Promise<void> {}
}
