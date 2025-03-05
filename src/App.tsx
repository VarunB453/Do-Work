import React, { useState, useEffect } from 'react';
import { User, Task, AppState } from './types';
import { loadState, saveState, generateId } from './utils/storage';
import { UserSelect } from './components/UserSelect';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { PlusCircle, Layout } from 'lucide-react';
import { LoginForm } from './components/LoginForm';

function App() {
  const [state, setState] = useState<AppState>(loadState());
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  useEffect(() => {
    saveState(state);
  }, [state]);

  const handleLogin = (username: string) => {
    const newUser: User = {
      id: generateId(),
      name: username,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(username)}`,
    };

    setState(prev => {
      const existingUser = prev.users.find(u => u.name === username);
      if (existingUser) {
        return { ...prev, currentUser: existingUser.id };
      }
      return {
        ...prev,
        users: [...prev.users, newUser],
        currentUser: newUser.id,
      };
    });
  };

  const handleAddUser = () => {
    if (state.users.length >= 2) {
      alert('Maximum 2 users allowed');
      return;
    }

    const name = prompt('Enter user name:');
    if (!name) return;

    const newUser: User = {
      id: generateId(),
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
        name
      )}`,
    };

    setState((prev) => ({
      ...prev,
      users: [...prev.users, newUser],
      currentUser: newUser.id,
    }));
  };

  const handleSelectUser = (userId: string) => {
    setState((prev) => ({ ...prev, currentUser: userId }));
  };

  const handleRemoveUser = (userId: string) => {
    if (!confirm('Are you sure you want to remove this user? All their tasks will be deleted.')) {
      return;
    }

    setState((prev) => ({
      ...prev,
      users: prev.users.filter((user) => user.id !== userId),
      tasks: prev.tasks.filter((task) => task.userId !== userId),
      currentUser: prev.currentUser === userId ? null : prev.currentUser,
    }));
  };

  const handleSaveTask = (
    taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  ) => {
    if (!state.currentUser) return;

    if (editingTask) {
      setState((prev) => ({
        ...prev,
        tasks: prev.tasks.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                ...taskData,
                updatedAt: new Date().toISOString(),
              }
            : task
        ),
      }));
    } else {
      const newTask: Task = {
        id: generateId(),
        userId: state.currentUser,
        ...taskData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setState((prev) => ({
        ...prev,
        tasks: [...prev.tasks, newTask],
      }));
    }

    setShowTaskForm(false);
    setEditingTask(undefined);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((task) => task.id !== taskId),
    }));
  };

  const currentUserTasks = state.tasks.filter(
    (task) => task.userId === state.currentUser
  );

  if (!state.currentUser) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#0F0A1F]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Layout className="w-8 h-8 text-purple-500" />
          <h1 className="text-3xl font-bold text-white">
            Task Management System
          </h1>
        </div>

        <UserSelect
          users={state.users}
          currentUser={state.currentUser}
          onSelectUser={handleSelectUser}
          onAddUser={handleAddUser}
          onRemoveUser={handleRemoveUser}
        />

        {state.currentUser && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Your Tasks</h2>
              <button
                onClick={() => setShowTaskForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                <PlusCircle className="w-5 h-5" />
                Add Task
              </button>
            </div>

            <TaskList
              tasks={currentUserTasks}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        )}

        {showTaskForm && (
          <TaskForm
            task={editingTask}
            onSave={handleSaveTask}
            onClose={() => {
              setShowTaskForm(false);
              setEditingTask(undefined);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App