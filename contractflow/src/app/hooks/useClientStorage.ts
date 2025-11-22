/* 

Enkel hook som lagrer NewClient i LocalStorage for å vise nylagrede klienter når DB ikke er satt opp enda

*/

"use client"

import { useCallback, useEffect, useState } from "react";
import type { Client } from "../../lib/clientdummydata";
import { dummyClients } from "../../lib/clientdummydata";
import { getClientById } from "../../lib/clientdummydata";



export default function useClientStorage() {

    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("dummyClients");

        if (stored) {
            try {
                setClients(JSON.parse(stored));
                return;
            } catch {
                console.error("Feil ved parsing av klienter i localStorage");
            }
        }

        setClients(dummyClients);
        localStorage.setItem("dummyClients", JSON.stringify(dummyClients));
    }, []);

    useEffect(() => {
        localStorage.setItem("dummyClients", JSON.stringify(clients));
    }, [clients]);

    const addClient = useCallback((partial: Omit<Client, "id">): Client => {
        const id = String(Date.now());

        const client: Client = {
            id,
            clientAdded: partial.clientAdded ?? new Date().toISOString(),
            ...partial
        };

        setClients(prev => [...prev, client]);
        return client;
    }, []);

    const getClientById = useCallback((id: string): Client | null => {
        return clients.find(c => c.id === id) ?? null;
    }, [clients]);

    const searchClients = useCallback((query: string): Client[] => {
        const q = query.trim().toLowerCase();
        if (!q) return [];

        return clients.filter(c =>
            (c.customerCode ?? "").toLowerCase().includes(q) ||
            (c.customer ?? "").toLowerCase().includes(q) ||
            (c.contactperson ?? "").toLowerCase().includes(q) ||
            (c.email ?? "").toLowerCase().includes(q) ||
            (c.phone ?? "").toLowerCase().includes(q) ||
            (c.country ?? "").toLowerCase().includes(q) ||
            (c.relation ?? "").toLowerCase().includes(q)
        );
    }, [clients]);

    const resetClients = useCallback(() => {
        setClients(dummyClients);
    }, []);

    return {
        clients,
        addClient,
        getClientById,
        searchClients,
        resetClients,
    };
}
