import { PluginDefinition, PluginStatus } from './types';
import { EventBus } from '../EventBus/EventBus';
import { EventType } from '../EventBus/types';

/**
 * Engine designed for managing the Plugin lifecycle logic, dependency trees, and generic feature statuses.
 * No specific plugin execution rules are included in Sprint 2.1.
 */
export class PluginEngine {
  private plugins: Map<string, PluginDefinition> = new Map();
  private eventBus: EventBus;

  constructor(eventBus: EventBus) {
    this.eventBus = eventBus;
  }

  /**
   * Formally register a new plugin onto the platform bus.
   */
  public registerPlugin(plugin: PluginDefinition): void {
    if (this.plugins.has(plugin.metadata.id)) {
      throw new Error(`Plugin ${plugin.metadata.id} is already registered`);
    }
    
    plugin.status = PluginStatus.REGISTERED;
    this.plugins.set(plugin.metadata.id, plugin);

    this.eventBus.emit({
      type: EventType.PluginRegistered,
      timestamp: Date.now(),
      payload: { pluginId: plugin.metadata.id }
    });
  }

  /**
   * Promote the plugin active pipeline block context state.
   */
  public enablePlugin(pluginId: string): void {
    const plugin = this.plugins.get(pluginId);
    if (plugin) {
      // Stub: in reality, evaluate dependency trees prior to flip.
      plugin.status = PluginStatus.ENABLED;
      this.eventBus.emit({
        type: EventType.PluginLoaded,
        timestamp: Date.now(),
        payload: { pluginId }
      });
    }
  }

  /**
   * Terminate internal module lifecycle binding block hooks.
   */
  public disablePlugin(pluginId: string): void {
    const plugin = this.plugins.get(pluginId);
    if (plugin) {
      plugin.status = PluginStatus.DISABLED;
      this.eventBus.emit({
        type: EventType.PluginDisabled,
        timestamp: Date.now(),
        payload: { pluginId }
      });
    }
  }

  /**
   * View generic runtime activity blocks of targeted module definition contexts.
   */
  public getPluginStatus(pluginId: string): PluginStatus {
    const plugin = this.plugins.get(pluginId);
    return plugin ? plugin.status : PluginStatus.UNREGISTERED;
  }

  /**
   * Collect all registered modules inside internal array structures.
   */
  public getPlugins(): PluginDefinition[] {
    return Array.from(this.plugins.values());
  }
}
