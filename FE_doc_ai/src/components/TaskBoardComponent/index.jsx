// import React, { useCallback, useState } from 'react';
// import ReactFlow, {
//   MiniMap,
//   Controls,
//   Background,
//   applyNodeChanges,
//   applyEdgeChanges,
//   addEdge,
// } from 'reactflow';
// import 'reactflow/dist/style.css';

// // A sample list of available tasks to display in the sidebar.
// // Each task has a label, a type, and possibly other metadata you might want to store.
// const AVAILABLE_TASKS = [
//   { id: 'task-initial', label: 'Initial Node', type: 'input' },
//   { id: 'task-transform', label: 'Transform Node', type: 'default' },
//   { id: 'task-branch', label: 'Branch Node', type: 'default' },
//   { id: 'task-join', label: 'Join Node', type: 'default' },
//   { id: 'task-output', label: 'Output Node', type: 'output' },
// ];

// const initialNodes = [];
// const initialEdges = [];

// const TaskBoardComponent = () => {
//   const [nodes, setNodes] = useState(initialNodes);
//   const [edges, setEdges] = useState(initialEdges);

//   // -- React Flow callbacks to handle changes in nodes/edges
//   const onNodesChange = useCallback(
//     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
//     []
//   );

//   const onEdgesChange = useCallback(
//     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//     []
//   );

//   const onConnect = useCallback(
//     (connection) => setEdges((eds) => addEdge(connection, eds)),
//     []
//   );

//   // -- Drag-and-drop handlers
//   const onDragStart = (event, task) => {
//     // We store the task info in the dataTransfer so that we can retrieve it on drop.
//     event.dataTransfer.setData('application/reactflow', JSON.stringify(task));
//     event.dataTransfer.effectAllowed = 'move';
//   };

//   const onDragOver = (event) => {
//     // We must prevent default so ReactFlow knows we can drop
//     event.preventDefault();
//     event.dataTransfer.dropEffect = 'move';
//   };

//   const onDrop = (event) => {
//     event.preventDefault();

//     // Retrieve the task object that we set in onDragStart
//     const taskData = event.dataTransfer.getData('application/reactflow');
//     if (!taskData) {
//       return;
//     }

//     const task = JSON.parse(taskData);

//     // The drop location on the ReactFlow canvas
//     const reactFlowBounds = event.target.getBoundingClientRect();
//     const position = {
//       x: event.clientX - reactFlowBounds.left,
//       y: event.clientY - reactFlowBounds.top,
//     };

//     // Create a new node for this dropped task
//     const newNode = {
//       id: `${task.id}-${+new Date()}`, // unique ID
//       type: task.type,
//       position,
//       data: {
//         label: task.label,
//         // You can store any additional data you need, e.g. "type" or "inputs"
//       },
//     };

//     // Add it to the current list of nodes
//     setNodes((nds) => nds.concat(newNode));
//   };

//   // -- Execute the flow by sending nodes to the server
//   const executeFlow = async () => {
//     // Construct your tasks array from the node data
//     const tasks = nodes.map((node) => ({
//       type: node.type,       // or node.data.type, depending on your structure
//       label: node.data.label,
//       // any other relevant info for your tasks
//     }));

//     try {
//       const response = await fetch('http://localhost:3001/execute', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ tasks }),
//       });

//       const result = await response.json();
//       console.log('Execution Result:', result);
//       // handle success or show result in the UI
//     } catch (error) {
//       console.error('Error executing flow:', error);
//       // handle error in the UI
//     }
//   };

//   return (
//     <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
//       {/* Left Sidebar with available tasks */}
//       <aside
//         style={{
//           width: '220px',
//           background: '#f3f3f3',
//           padding: '10px',
//           borderRight: '1px solid #ccc',
//           boxSizing: 'border-box',
//         }}
//       >
//         <h3>Available Tasks</h3>
//         <div style={{ marginTop: '1rem' }}>
//           {AVAILABLE_TASKS.map((task) => (
//             <div
//               key={task.id}
//               onDragStart={(event) => onDragStart(event, task)}
//               draggable
//               style={{
//                 marginBottom: '8px',
//                 padding: '8px',
//                 background: '#fff',
//                 border: '1px solid #ddd',
//                 borderRadius: '4px',
//                 cursor: 'grab',
//               }}
//             >
//               {task.label}
//             </div>
//           ))}
//         </div>
//       </aside>

//       {/* Main ReactFlow area */}
//       <div style={{ flex: 1, position: 'relative' }}>
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//           onDragOver={onDragOver}
//           onDrop={onDrop}
//           fitView
//           style={{ width: '100%', height: '100%' }}
//         >
//           <MiniMap />
//           <Controls />
//           <Background />
//         </ReactFlow>

//         {/* Execute button */}
//         <button
//           onClick={executeFlow}
//           style={{
//             position: 'absolute',
//             top: 10,
//             right: 10,
//             zIndex: 10,
//             padding: '8px 16px',
//             cursor: 'pointer',
//           }}
//         >
//           Execute
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TaskBoardComponent;


import React, { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

// A sample list of available tasks to display in the sidebar.
const AVAILABLE_TASKS = [
  { id: 'task-initial', label: 'Initial Node', type: 'input' },
  { id: 'task-transform', label: 'Transform Node', type: 'default' },
  { id: 'task-branch', label: 'Branch Node', type: 'default' },
  { id: 'task-join', label: 'Join Node', type: 'default' },
  { id: 'task-output', label: 'Output Node', type: 'output' },
];

const initialNodes = [];
const initialEdges = [];

const TaskBoard = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  // React Flow callbacks
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  // Drag-and-drop handlers
  const onDragStart = (event, task) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(task));
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();
    const taskData = event.dataTransfer.getData('application/reactflow');
    if (!taskData) return;

    const task = JSON.parse(taskData);

    // Calculate drop position relative to the ReactFlow container
    const reactFlowBounds = event.target.getBoundingClientRect();
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    // Create a new node
    const newNode = {
      id: `${task.id}-${+new Date()}`, // unique ID
      type: task.type,
      position,
      data: {
        label: task.label,
      },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  // Example "execute flow" function
  const executeFlow = async () => {
    const tasks = nodes.map((node) => ({
      type: node.type,
      label: node.data.label,
    }));

    try {
      const response = await fetch('http://localhost:3001/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks }),
      });
      const result = await response.json();
      console.log('Execution Result:', result);
    } catch (error) {
      console.error('Error executing flow:', error);
    }
  };

  return (
    <div className="flex w-screen h-screen">
      {/* Left Sidebar with available tasks */}
      <aside className="w-[220px] bg-gray-100 p-4 border-r border-gray-300 box-border">
        <h3 className="font-semibold">Available Tasks</h3>
        <div className="mt-4">
          {AVAILABLE_TASKS.map((task) => (
            <div
              key={task.id}
              onDragStart={(event) => onDragStart(event, task)}
              draggable
              className="mb-2 p-2 bg-white border border-gray-300 rounded cursor-grab"
            >
              {task.label}
            </div>
          ))}
        </div>
      </aside>

      {/* Main ReactFlow area */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          fitView
          className="w-full h-full"
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>

        {/* Execute button */}
        <button
          onClick={executeFlow}
          className="absolute top-2 right-2 z-10 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Execute
        </button>
      </div>
    </div>
  );
};

export default TaskBoard;
