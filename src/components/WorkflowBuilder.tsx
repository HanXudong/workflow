import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Connection,
  Panel,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import ConfigPanel from './ConfigPanel';
import { Save, Play, Undo, Redo, RotateCcw } from 'lucide-react';
import { useWorkflowStore } from '../store/workflowStore';

const nodeTypes = {
  custom: CustomNode,
};

function WorkflowBuilder() {
  const { 
    nodes, 
    edges, 
    selectedNode,
    onNodesChange, 
    onEdgesChange,
    onConnect,
    addNode,
    setSelectedNode,
    resetWorkflow,
    saveWorkflow,
  } = useWorkflowStore();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const icon = event.dataTransfer.getData('icon');
      const label = event.dataTransfer.getData('label');
      const description = event.dataTransfer.getData('description');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
      const position = reactFlowBounds
        ? {
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          }
        : { x: 0, y: 0 };

      const newNode = {
        id: `node-${Math.random().toString(36).substr(2, 9)}`,
        type: 'custom',
        position,
        data: { type, label, icon, description },
      };

      addNode(newNode);
    },
    [addNode],
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
  }, [setSelectedNode]);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  return (
    <div className="h-full w-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <Panel position="top" className="flex gap-2">
          <button 
            className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
            onClick={() => resetWorkflow()}
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm">Reset</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
            <Undo className="w-4 h-4" />
            <span className="text-sm">Undo</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
            <Redo className="w-4 h-4" />
            <span className="text-sm">Redo</span>
          </button>
          <button 
            className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
            onClick={() => saveWorkflow()}
          >
            <Save className="w-4 h-4" />
            <span className="text-sm">Save</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            <Play className="w-4 h-4" />
            <span className="text-sm">Run Workflow</span>
          </button>
        </Panel>
      </ReactFlow>
      {selectedNode && <ConfigPanel nodeId={selectedNode} />}
    </div>
  );
}

export default WorkflowBuilder;