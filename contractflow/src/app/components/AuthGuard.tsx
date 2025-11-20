"use client";

import { useEffect, useState } from "react";
import { User } from "../actions/auth";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const sessionData = localStorage.getItem('user_session');
        if (sessionData) {
          const userData = JSON.parse(sessionData) as User;
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to parse session data:', error);
        localStorage.removeItem('user_session');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login if not authenticated
      window.location.href = '/Login';
    }
  }, [loading, user]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return fallback || <div>Redirecting to login...</div>;
  }

  return <>{children}</>;
}