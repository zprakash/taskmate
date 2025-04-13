import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useTasks } from '../../hooks/useTasks';
import Tasks from '../../pages/Tasks';

jest.mock('../../hooks/useTasks');

describe('Tasks Page', () => {
  beforeEach(() => {
    useTasks.mockReturnValue({
      tasks: [
        { id: 1, title: 'Task 1' },
        { id: 2, title: 'Task 2' }
      ],
      addTask: jest.fn(),
      updateTask: jest.fn(),
      deleteTask: jest.fn(),
      toggleComplete: jest.fn()
    });
  });

  it('renders task list', () => {
    render(<Tasks />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('adds new task', () => {
    const mockAddTask = jest.fn();
    useTasks.mockReturnValue({
      tasks: [],
      addTask: mockAddTask
    });

    render(<Tasks />);
    
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'New Task' }
    });
    fireEvent.click(screen.getByText('Add Task'));

    expect(mockAddTask).toHaveBeenCalled();
  });
});
