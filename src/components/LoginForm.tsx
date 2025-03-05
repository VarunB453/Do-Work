import React, { useState } from 'react';
import { AUTHORIZED_USERS } from '../types';
import { UserPlus, Lock } from 'lucide-react';

interface LoginFormProps {
  onLogin: (username: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = AUTHORIZED_USERS.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      onLogin(username);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="glass-card p-8 rounded-lg w-full max-w-md">
        <div className="flex items-center gap-2 mb-6">
          <Lock className="w-6 h-6 text-purple-500" />
          <h1 className="text-2xl font-bold text-white">Sign In</h1>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-2 bg-[#1A1525] border border-white/10 rounded-md text-white"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 bg-[#1A1525] border border-white/10 rounded-md text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}; 