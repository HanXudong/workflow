export interface ComponentConfig {
  id: string;
  type: string;
  settings: Record<string, any>;
}

export interface NodeData {
  label: string;
  icon: string;
  description: string;
  config?: ComponentConfig;
}

export interface ComponentSetting {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'boolean';
  default?: any;
  options?: { label: string; value: any }[];
  description?: string;
}

export interface ComponentDefinition {
  type: string;
  label: string;
  icon: string;
  description: string;
  category: 'input' | 'processing' | 'output' | 'utility';
  settings: ComponentSetting[];
}