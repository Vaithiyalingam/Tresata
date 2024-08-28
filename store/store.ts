import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';

export enum TaskStatus {
    Pending = 'Pending',
    Completed = 'Completed',
    InProgress = 'InProgress'
  }

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdOn: string;
}

export const tasksAtom = atomWithStorage<Task[]>('tasks', []);

export const addTaskAtom = atom(
  (get) => get(tasksAtom),
  (get, set, newTask: Task) => {
    const updatedTasks = [...get(tasksAtom), newTask];
    set(tasksAtom, updatedTasks);
  }
);

export const deleteTaskAtom = atom(
    (get) => get(tasksAtom),
    (get, set, id: number) => {
      const updatedTasks = get(tasksAtom).filter(task => task.id !== id);
      set(tasksAtom, updatedTasks);
    }
  );
  
  export const updateTaskAtom = atom(
    (get) => get(tasksAtom),
    (get, set, updatedTask: Task) => {
      const updatedTasks = get(tasksAtom).map(task =>
        task.id === updatedTask.id ? updatedTask : task
      );
      set(tasksAtom, updatedTasks);
    }
  );
