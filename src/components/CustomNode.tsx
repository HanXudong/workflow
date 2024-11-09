import React from 'react';
import { Handle, Position } from 'reactflow';
import * as Icons from 'lucide-react';

interface CustomNodeProps {
  data: {
    type: string;
    label: string;
    icon: string;
    description: string;
    config?: {
      settings: Record<string, any>;
    };
  };
}

function CustomNode({ data }: CustomNodeProps) {
  const Icon = Icons[data.icon as keyof typeof Icons];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-6 h-6 text-gray-600 flex-shrink-0" />}
        <div className="min-w-0">
          <p className="font-medium truncate">{data.label}</p>
          <p className="text-sm text-gray-500 truncate">{data.description}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
}

export default CustomNode;