import { AppConfig, ValidationResult } from './types';
import { EventBus } from '../EventBus/EventBus';
import { EventType } from '../EventBus/types';

/**
 * Engine responsible for loading, saving, versioning, migrating, and validating configuration.
 * Exclusively handles non-UI settings persistence logic.
 */
export class ConfigEngine {
  private config: AppConfig;
  private eventBus: EventBus;

  constructor(eventBus: EventBus) {
    this.eventBus = eventBus;
    this.config = this.loadConfig();
  }

  /**
   * Internal mechanism to load config from persistence.
   */
  private loadConfig(): AppConfig {
    // Basic stub. Real implementation uses local storage / file system.
    return { version: 1, data: {} };
  }

  /**
   * Retrieve the current loaded configuration.
   */
  public getConfig(): AppConfig {
    return this.config;
  }

  /**
   * Validates the structure and consistency of generic configurations.
   */
  public validateConfig(config: AppConfig): ValidationResult {
    if (!config || typeof config.version !== 'number') {
      return { isValid: false, errors: ['Invalid config structure: Missing version'] };
    }
    return { isValid: true, errors: [] };
  }

  /**
   * Commits the new configuration state and dispatches structural events on the event bus.
   */
  public saveConfig(config: AppConfig): void {
    const validation = this.validateConfig(config);
    if (!validation.isValid) {
      throw new Error(`Config validation failed: ${validation.errors.join(', ')}`);
    }
    this.config = config;
    
    // Save operation simulating underlying platform persistence...
    
    this.eventBus.emit({
      type: EventType.ConfigurationSaved,
      timestamp: Date.now(),
      payload: { version: this.config.version }
    });
  }

  /**
   * Progressively maps internal structures of earlier configurations to the target version logic.
   */
  public migrate(config: AppConfig, targetVersion: number): AppConfig {
    // Upgrade paths for older config schema versions...
    return { ...config, version: targetVersion };
  }
}
