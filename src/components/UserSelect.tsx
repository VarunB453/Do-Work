import React from 'react';
import { User } from '../types';
import { UserPlus, Users, X } from 'lucide-react';

interface UserSelectProps {
  users: User[];
  currentUser: string | null;
  onSelectUser: (userId: string) => void;
  onAddUser: () => void;
  onRemoveUser: (userId: string) => void;
}

export const UserSelect: React.FC<UserSelectProps> = ({
  users,
  currentUser,
  onSelectUser,
  onAddUser,
  onRemoveUser,
}) => {
  return (
    <div className="glass-card rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-500" />
          <h2 className="text-lg font-semibold text-white">Team Members</h2>
        </div>
        {users.length < 2 && (
          <button
            onClick={onAddUser}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Add User
          </button>
        )}
      </div>
      <div className="flex gap-4 flex-wrap">
        {users.map((user) => (
          <div
            key={user.id}
            className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
              currentUser === user.id
                ? 'bg-purple-600 text-white'
                : 'bg-[#1A1525] text-gray-300'
            }`}
          >
            <button
              onClick={() => onSelectUser(user.id)}
              className="flex items-center gap-2"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">{user.name}</span>
            </button>
            <button
              onClick={() => onRemoveUser(user.id)}
              className="ml-2 p-1 hover:bg-red-500/20 rounded-full"
              title="Remove user"
            >
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};