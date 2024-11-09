import { ComponentDefinition } from '../types/workflow';

export const components: ComponentDefinition[] = [
  // Input Components
  {
    type: 'database',
    label: 'Database',
    icon: 'Database',
    category: 'input',
    description: 'Connect to various databases',
    settings: [
      {
        key: 'connectionString',
        label: 'Connection String',
        type: 'text',
        description: 'Database connection string',
      },
      {
        key: 'query',
        label: 'Query',
        type: 'text',
        description: 'SQL query to execute',
      },
    ],
  },
  {
    type: 'api',
    label: 'API',
    icon: 'Globe',
    category: 'input',
    description: 'Make HTTP API calls',
    settings: [
      {
        key: 'url',
        label: 'URL',
        type: 'text',
        description: 'API endpoint URL',
      },
      {
        key: 'method',
        label: 'Method',
        type: 'select',
        options: [
          { label: 'GET', value: 'get' },
          { label: 'POST', value: 'post' },
          { label: 'PUT', value: 'put' },
          { label: 'DELETE', value: 'delete' },
        ],
      },
    ],
  },
  {
    type: 'webhook',
    label: 'Webhook',
    icon: 'Webhook',
    category: 'input',
    description: 'Receive webhook events',
    settings: [
      {
        key: 'path',
        label: 'Path',
        type: 'text',
        description: 'Webhook endpoint path',
      },
    ],
  },

  // Processing Components
  {
    type: 'llm',
    label: 'LLM',
    icon: 'Brain',
    category: 'processing',
    description: 'Large Language Model processing',
    settings: [
      {
        key: 'model',
        label: 'Model',
        type: 'select',
        options: [
          { label: 'GPT-4', value: 'gpt-4' },
          { label: 'GPT-3.5', value: 'gpt-3.5-turbo' },
        ],
      },
      {
        key: 'prompt',
        label: 'Prompt',
        type: 'text',
        description: 'System prompt for the LLM',
      },
    ],
  },
  {
    type: 'search',
    label: 'Search Engine',
    icon: 'Search',
    category: 'processing',
    description: 'Search across different sources',
    settings: [
      {
        key: 'engine',
        label: 'Search Engine',
        type: 'select',
        options: [
          { label: 'Elasticsearch', value: 'elasticsearch' },
          { label: 'Meilisearch', value: 'meilisearch' },
        ],
      },
    ],
  },
  {
    type: 'filter',
    label: 'Filter',
    icon: 'Filter',
    category: 'processing',
    description: 'Filter data based on conditions',
    settings: [
      {
        key: 'condition',
        label: 'Condition',
        type: 'text',
        description: 'Filter condition expression',
      },
    ],
  },
  {
    type: 'transform',
    label: 'Transform',
    icon: 'Code2',
    category: 'processing',
    description: 'Transform data structure',
    settings: [
      {
        key: 'transform',
        label: 'Transform',
        type: 'text',
        description: 'Data transformation expression',
      },
    ],
  },

  // Output Components
  {
    type: 'chatbot',
    label: 'Chatbot',
    icon: 'Bot',
    category: 'output',
    description: 'Interactive chat interface',
    settings: [
      {
        key: 'persona',
        label: 'Persona',
        type: 'text',
        description: 'Chatbot personality description',
      },
    ],
  },
  {
    type: 'message',
    label: 'Message',
    icon: 'MessageSquare',
    category: 'output',
    description: 'Send messages to various platforms',
    settings: [
      {
        key: 'platform',
        label: 'Platform',
        type: 'select',
        options: [
          { label: 'Slack', value: 'slack' },
          { label: 'Discord', value: 'discord' },
          { label: 'Email', value: 'email' },
        ],
      },
    ],
  },

  // Utility Components
  {
    type: 'workflow',
    label: 'Workflow',
    icon: 'GitBranch',
    category: 'utility',
    description: 'Control flow operations',
    settings: [
      {
        key: 'type',
        label: 'Type',
        type: 'select',
        options: [
          { label: 'Parallel', value: 'parallel' },
          { label: 'Sequential', value: 'sequential' },
          { label: 'Conditional', value: 'conditional' },
        ],
      },
    ],
  },
  {
    type: 'combine',
    label: 'Combine',
    icon: 'Combine',
    category: 'utility',
    description: 'Combine multiple inputs',
    settings: [
      {
        key: 'strategy',
        label: 'Combine Strategy',
        type: 'select',
        options: [
          { label: 'Merge', value: 'merge' },
          { label: 'Concat', value: 'concat' },
          { label: 'Join', value: 'join' },
        ],
      },
    ],
  },
];