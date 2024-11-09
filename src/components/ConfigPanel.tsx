import React from 'react';
import { components } from '../config/components';
import { ComponentConfig, ComponentSetting } from '../types/workflow';
import { useWorkflowStore } from '../store/workflowStore';

interface ConfigPanelProps {
  nodeId: string | null;
}

function ConfigPanel({ nodeId }: ConfigPanelProps) {
  const { nodes, updateNodeConfig } = useWorkflowStore();
  
  if (!nodeId) {
    return null;
  }

  const node = nodes.find(n => n.id === nodeId);
  if (!node) {
    return null;
  }

  const component = components.find(c => c.type === node.data.type);
  if (!component) {
    return null;
  }

  const handleSettingChange = (setting: ComponentSetting, value: any) => {
    const newConfig: ComponentConfig = {
      id: nodeId,
      type: component.type,
      settings: {
        ...(node.data.config?.settings || {}),
        [setting.key]: value,
      },
    };
    updateNodeConfig(nodeId, newConfig);
  };

  return (
    <div className="absolute right-0 top-0 w-80 h-full bg-white border-l border-gray-200 p-4 overflow-y-auto shadow-lg">
      <div className="sticky top-0 bg-white pb-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">{component.label} Settings</h3>
        <p className="text-sm text-gray-500">{component.description}</p>
      </div>
      <div className="space-y-4 mt-4">
        {component.settings.map((setting) => (
          <div key={setting.key} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {setting.label}
            </label>
            {setting.type === 'select' ? (
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={node.data.config?.settings?.[setting.key] || ''}
                onChange={(e) => handleSettingChange(setting, e.target.value)}
              >
                <option value="">Select an option</option>
                {setting.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : setting.type === 'boolean' ? (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                  checked={node.data.config?.settings?.[setting.key] || false}
                  onChange={(e) => handleSettingChange(setting, e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-500">{setting.description}</span>
              </div>
            ) : (
              <input
                type={setting.type}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={node.data.config?.settings?.[setting.key] || ''}
                onChange={(e) => handleSettingChange(setting, e.target.value)}
                placeholder={setting.description}
              />
            )}
            {setting.description && setting.type !== 'boolean' && (
              <p className="text-xs text-gray-500">{setting.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConfigPanel;