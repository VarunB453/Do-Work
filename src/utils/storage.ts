import { AppState, Task, User } from '../types';

const STORAGE_KEY = 'task-management-app';

export const loadState = (): AppState => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (!serializedState) {
      return { users: [], tasks: [], currentUser: null };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { users: [], tasks: [], currentUser: null };
  }
};

export const saveState = (state: AppState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.error('Error saving state:', err);
  }
};

export const generateId = () => Math.random().toString(36).substr(2, 9);