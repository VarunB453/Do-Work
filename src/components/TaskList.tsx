import React from 'react';
import { Task } from '../types';
import { Trash2, Edit, CheckCircle } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEditTask,
  onDeleteTask,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="glass-card rounded-lg overflow-hidden"
        >
          {task.imageUrl && (
            <img
              src={task.imageUrl}
              alt={task.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">{task.title}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEditTask(task)}
                  className="p-1.5 text-gray-400 hover:text-purple-500 bg-[#1A1525] rounded-md"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 bg-[#1A1525] rounded-md"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-400 mb-4">{task.description}</p>
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span>Progress ({task.progress}%)</span>
                <span>Priority: {task.weightage}</span>
              </div>
              <div className="w-full bg-[#1A1525] rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
            </div>
            {task.notes && (
              <div className="text-sm text-gray-400 bg-[#1A1525] p-3 rounded-md">
                <strong className="text-gray-300">Notes:</strong> {task.notes}
              </div>
            )}
            <div className="text-xs text-gray-500 mt-3">
              Updated: {new Date(task.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};