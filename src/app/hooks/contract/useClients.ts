"use client";

import {
  useState,
  useEffect
} from "react";
import { Client } from "@/types/client";

interface ApiResponse {
  success: boolean;
  data?: any[];
  error?: {
    message: string;
    code?: number;
  };
}

interface ExtendedClient extends Client {
  customer?: string;
}

export function useClients() {
  const [clients, setClients] = useState<ExtendedClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/clients');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ApiResponse = await response.json();
        if (data.success && data.data) {
          const formattedClients = data.data.map((c: any) => ({
            id: c.id,
            name: c.name,
            customer: c.name, 
            customerCode: c.customerCode,
            email: c.email,
            phone: c.phone,
            country: c.country,
            status: c.status,
            createdAt: c.createdAt
          }));
          setClients(formattedClients);
        } else {
          setError(data.error?.message || "Failed to load clients");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error" );
      } finally {
        setLoading(false);
      }
  };
  fetchClients();
}, []);

  return {
    clients,
    loading,
    error,
  };
}
