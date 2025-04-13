import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddTask from '../../components/AddTask';

describe('AddTask', () => {
  it('submits form with entered data', () => {
    const mockSubmit = jest.fn();
    render(<AddTask onAddTask={mockSubmit} />);

    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'New Task' }
    });
    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: 'Task Description' }
    });
    fireEvent.click(screen.getByText('Add Task'));

    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'New Task',
      description: 'Task Description',
      priority: 'medium',
      dueDate: ''
    });
  });

  it('pre-fills form when editing', () => {
    const mockTask = {
      id: 1,
      title: 'Existing Task',
      description: 'Existing Description',
      priority: 'high',
      dueDate: '2023-01-01'
    };

    render(<AddTask initialData={mockTask} onUpdateTask={jest.fn()} />);

    expect(screen.getByDisplayValue('Existing Task')).toBeInTheDocument();
    expect(screen.getByText('Update Task')).toBeInTheDocument();
  });
});
