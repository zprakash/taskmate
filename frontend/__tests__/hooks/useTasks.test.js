import { renderHook, act } from '@testing-library/react-hooks';
import useTasks from '../../hooks/useTasks';
import * as taskService from '../../services/taskService';

jest.mock('../../services/taskService');

describe('useTasks', () => {
  beforeEach(() => {
    taskService.getTasks.mockResolvedValue([
      { id: 1, title: 'Task 1' }
    ]);
  });

  it('fetches tasks on mount', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTasks());

    expect(result.current.tasks).toEqual([]);
    
    await waitForNextUpdate();
    
    expect(result.current.tasks).toEqual([{ id: 1, title: 'Task 1' }]);
  });

  it('adds new task', async () => {
    const newTask = { id: 2, title: 'New Task' };
    taskService.createTask.mockResolvedValue(newTask);

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      await result.current.addTask({ title: 'New Task' });
    });

    expect(taskService.createTask).toHaveBeenCalled();
    expect(result.current.tasks).toContainEqual(newTask);
  });
});
