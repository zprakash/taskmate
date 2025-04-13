import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onEdit, onDelete, onComplete, onUpdate }) => {
  return (
    <div className="space-y-2">
      {tasks.map(task => (
        <TaskItem 
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onComplete={onComplete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default TaskList;
