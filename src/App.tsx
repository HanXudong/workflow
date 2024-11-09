import React from 'react';
import Sidebar from './components/Sidebar';
import WorkflowBuilder from './components/WorkflowBuilder';

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <WorkflowBuilder />
      </div>
    </div>
  );
}

export default App;