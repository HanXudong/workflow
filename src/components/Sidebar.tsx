import React from 'react';
import { components } from '../config/components';
import * as Icons from 'lucide-react';

type Category = 'input' | 'processing' | 'output' | 'utility';

const categoryOrder: Category[] = ['input', 'processing', 'output', 'utility'];
const categoryLabels: Record<Category, string> = {
  input: 'Input Components',
  processing: 'Processing Components',
  output: 'Output Components',
  utility: 'Utility Components',
};

function Sidebar() {
  const componentsByCategory = categoryOrder.map(category => ({
    category,
    label: categoryLabels[category],
    components: components.filter(c => c.category === category),
  }));

  const onDragStart = (event: React.DragEvent, component: typeof components[0]) => {
    event.dataTransfer.setData('application/reactflow', component.type);
    event.dataTransfer.setData('icon', component.icon);
    event.dataTransfer.setData('label', component.label);
    event.dataTransfer.setData('description', component.description);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Components</h2>
      <div className="space-y-6">
        {componentsByCategory.map(({ category, label, components }) => (
          <div key={category}>
            <h3 className="text-sm font-medium text-gray-500 mb-2">{label}</h3>
            <div className="space-y-2">
              {components.map((component) => {
                const IconComponent = Icons[component.icon as keyof typeof Icons];
                return (
                  <div
                    key={component.type}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
                    draggable
                    onDragStart={(e) => onDragStart(e, component)}
                  >
                    {IconComponent && <IconComponent className="w-5 h-5 text-gray-600" />}
                    <div>
                      <p className="font-medium text-sm">{component.label}</p>
                      <p className="text-xs text-gray-500">{component.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;