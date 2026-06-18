import { EventType, SystemEvent, EventHandler } from './types';

/**
 * Strongly typed event system for internal application communication.
 * Prevents the use of arbitrary string literals for events.
 */
export class EventBus {
  private listeners: Record<string, EventHandler<any>[]> = {};

  /**
   * Subscribe to a specific typed event.
   */
  public on<T extends SystemEvent>(type: T['type'], handler: EventHandler<T>): () => void {
    const key = type as string;
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(handler);
    
    return () => {
      this.listeners[key] = this.listeners[key].filter(h => h !== handler);
    };
  }

  /**
   * Emit an event to all registered subscribers.
   */
  public emit(event: SystemEvent): void {
    const key = event.type as string;
    const handlers = this.listeners[key];
    if (handlers) {
      handlers.forEach(handler => handler(event));
    }
  }
}
