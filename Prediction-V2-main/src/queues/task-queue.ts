export interface Task<T = unknown> {
  id: string;
  payload: T;
  priority?: number;
  createdAt: string;
}

export class TaskQueue<T = unknown> {
  private queue: Task<T>[] = [];

  enqueue(payload: T, priority = 0): Task<T> {
    const task: Task<T> = {
      id: `task_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      payload,
      priority,
      createdAt: new Date().toISOString(),
    };
    this.queue.push(task);
    this.queue.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
    return task;
  }

  dequeue(): Task<T> | undefined {
    return this.queue.shift();
  }

  peek(): Task<T> | undefined {
    return this.queue[0];
  }

  size(): number {
    return this.queue.length;
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }

  clear(): void {
    this.queue = [];
  }
}
