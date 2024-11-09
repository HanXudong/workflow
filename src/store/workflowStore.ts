import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import { ComponentConfig } from '../types/workflow';

// Initial workflow setup
const initialNodes: Node[] = [
  {
    id: 'api-1',
    type: 'custom',
    position: { x: 100, y: 100 },
    data: {
      type: 'api',
      label: 'API Input',
      icon: 'Globe',
      description: 'Fetch data from API',
      config: {
        id: 'api-1',
        type: 'api',
        settings: {
          url: 'https://api.example.com/data',
          method: 'get'
        }
      }
    }
  },
  {
    id: 'llm-1',
    type: 'custom',
    position: { x: 400, y: 100 },
    data: {
      type: 'llm',
      label: 'LLM Processing',
      icon: 'Brain',
      description: 'Process with GPT-4',
      config: {
        id: 'llm-1',
        type: 'llm',
        settings: {
          model: 'gpt-4',
          prompt: 'Analyze the following data:'
        }
      }
    }
  },
  {
    id: 'chatbot-1',
    type: 'custom',
    position: { x: 700, y: 100 },
    data: {
      type: 'chatbot',
      label: 'Chatbot Output',
      icon: 'Bot',
      description: 'Interactive chat interface',
      config: {
        id: 'chatbot-1',
        type: 'chatbot',
        settings: {
          persona: 'Helpful AI Assistant'
        }
      }
    }
  }
];

const initialEdges: Edge[] = [
  {
    id: 'edge-1',
    source: 'api-1',
    target: 'llm-1',
    type: 'default'
  },
  {
    id: 'edge-2',
    source: 'llm-1',
    target: 'chatbot-1',
    type: 'default'
  }
];

type RFState = {
  nodes: Node[];
  edges: Edge[];
  selectedNode: string | null;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void;
  addNode: (node: Node) => void;
  onConnect: (connection: Connection) => void;
  setSelectedNode: (nodeId: string | null) => void;
  updateNodeConfig: (nodeId: string, config: ComponentConfig) => void;
  resetWorkflow: () => void;
  saveWorkflow: () => void;
};

export const useWorkflowStore = create<RFState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  selectedNode: null,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  setEdges: (edges) => {
    if (typeof edges === 'function') {
      set({ edges: edges(get().edges) });
    } else {
      set({ edges });
    }
  },
  addNode: (node: Node) => {
    set({ nodes: [...get().nodes, node] });
  },
  onConnect: (connection: Connection) => {
    set({ edges: addEdge(connection, get().edges) });
  },
  setSelectedNode: (nodeId: string | null) => {
    set({ selectedNode: nodeId });
  },
  updateNodeConfig: (nodeId: string, config: ComponentConfig) => {
    set({
      nodes: get().nodes.map(node =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, config } }
          : node
      ),
    });
  },
  resetWorkflow: () => {
    set({
      nodes: initialNodes,
      edges: initialEdges,
      selectedNode: null,
    });
  },
  saveWorkflow: () => {
    const workflow = {
      nodes: get().nodes,
      edges: get().edges,
    };
    const blob = new Blob([JSON.stringify(workflow, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `workflow-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },
}));