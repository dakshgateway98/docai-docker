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
import TaskBoardComponent from '../../components/TaskBoardComponent';

const TaskBoard = () => {


  return (
    <div className='flex h-100 w-100'>
      <TaskBoardComponent />
    </div>
  );
};

export default TaskBoard;
