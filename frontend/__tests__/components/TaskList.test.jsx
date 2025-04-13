import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from '../../components/TaskList';

describe('TaskList', () => {
  const mockTasks = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      priority: 'medium',
      dueDate: '2023-01-01'
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description 2',
      priority: 'high',
      dueDate: '2023-01-02'
    }
  ];

  it('renders all tasks', () => {
    render(
      <TaskList 
        tasks={mockTasks}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onComplete={jest.fn()}
      />
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('shows empty state when no tasks', () => {
    render(
      <TaskList 
        tasks={[]}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onComplete={jest.fn()}
      />
    );

    expect(screen.queryByRole('listitem')).toBeNull();
  });
});
