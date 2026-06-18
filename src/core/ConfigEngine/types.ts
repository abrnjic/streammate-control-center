export interface AppConfig {
  version: number;
  data: Record<string, any>;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
