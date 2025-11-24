"use server";

import { z } from "zod";


export interface User {
  id: string;
  username: string;
  email?: string;
  role: 'admin' | 'user';
  isAuthenticated: boolean;
}

// Login form validation
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
});

// Mock user database
const mockUsers = [
  {
    id: "1",
    username: "admin",
    password: "admin", 
    email: "admin@plb.no",
    role: "admin" as const
  },
  {
    id: "2", 
    username: "user",
    password: "user123",
    email: "user@plb.no",
    role: "user" as const
  }
];

//Server action to handle user login
export async function login(formData: FormData): Promise<{ success: boolean; error?: string; redirect?: string; sessionData?: string; setCookie?: string }> {
  const result = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password")
  });

  if (!result.success) {
    return {
      success: false,
      error: "Invalid input data"
    };
  }

  const { username, password } = result.data;

  // Authenticate user
  const user = mockUsers.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return {
      success: false,
      error: "Invalid username or password"
    };
  }

  // Create user session data
  const userData: User = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    isAuthenticated: true
  };

  // Store session data in localStorage and cookie for authentication
  const sessionData = JSON.stringify(userData);
  
  return { 
    success: true, 
    redirect: "/Home",
    sessionData: sessionData,
    setCookie: `user_session=${encodeURIComponent(sessionData)}; Path=/; Max-Age=86400`
  };
}

//Server action to handle user logout
export async function logout(): Promise<{ redirect: string; clearSession: boolean; clearCookie?: string }> {
  // Clear session data and cookie
  return { 
    redirect: "/Login", 
    clearSession: true,
    clearCookie: "user_session=; Path=/; Max-Age=0"
  };
}

//Get current user from session
export async function getCurrentUser(): Promise<User | null> {
  // Get current user from localStorage (client-side session check)
  // Server-side authentication is handled by requireAuth() in worker.tsx
  try {
    if (typeof window !== 'undefined') {
      const sessionData = window.localStorage.getItem('user_session');
      if (sessionData) {
        const userData = JSON.parse(sessionData) as User;
        return userData;
      }
    }
  } catch {
    // Ignore errors, return null
  }
  return null;
}

//Check if user is authenticated

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null && user.isAuthenticated;
}

// Check if user has specific role
export async function hasRole(role: 'admin' | 'user'): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null && user.role === role;
}

// Require authentication middleware
export async function requireAuth(): Promise<User | { redirect: string }> {
  const authenticated = await isAuthenticated();
  
  if (!authenticated) {
    return { redirect: "/Login" };
  }
  
  return (await getCurrentUser())!;
}

//Require admin role middleware
export async function requireAdmin(): Promise<User | { redirect: string }> {
  const user = await requireAuth();
  
  if ('redirect' in user) {
    return user; // Already a redirect response
  }
  
  if (!user || user.role !== 'admin') {
    return { redirect: "/Login?error=insufficient_permissions" };
  }
  
  return user;
}