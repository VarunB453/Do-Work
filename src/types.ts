export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  weightage: number;
  progress: number;
  imageUrl?: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppState {
  users: User[];
  tasks: Task[];
  currentUser: string | null;
}

export interface UserCredentials {
  username: string;
  password: string;
}

export const AUTHORIZED_USERS: UserCredentials[] = [
  { username: "Aarti", password: "1404" },
  { username: "Varun", password: "1602" }
];