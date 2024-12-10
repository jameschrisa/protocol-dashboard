interface User {
  email: string;
  password: string;
  name: string;
  role: string;
}

// Demo credentials - in a real app, this would be handled by a secure backend
export const users: User[] = [
  {
    email: "admin@protocol.ai",
    // In a real app, passwords would be hashed and stored securely
    password: "admin123",
    name: "Admin User",
    role: "admin"
  },
  {
    email: "demo@protocol.ai",
    password: "demo123",
    name: "Demo User",
    role: "user"
  }
];

export function validateCredentials(email: string, password: string): boolean {
  return users.some(user => user.email === email && user.password === password);
}

export function getUserByEmail(email: string): User | undefined {
  return users.find(user => user.email === email);
}
