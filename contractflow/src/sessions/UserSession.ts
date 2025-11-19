import { DurableObject } from "cloudflare:workers";

/**
 * UserSession Durable Object for managing user sessions
 * Based on RedwoodSDK authentication patterns
 */
export class UserSession extends DurableObject {
  private sessions: Map<string, SessionData> = new Map();

  constructor(ctx: DurableObjectState, env: any) {
    super(ctx, env);
    // Initialize from storage if needed
    this.loadSessions();
  }

  private async loadSessions() {
    const stored = await this.ctx.storage.get("sessions");
    if (stored) {
      this.sessions = new Map(stored as [string, SessionData][]);
    }
  }

  private async saveSessions() {
    await this.ctx.storage.put("sessions", Array.from(this.sessions.entries()));
  }

  /**
   * Create a new session
   */
  async createSession(sessionId: string, userData: SessionData): Promise<void> {
    this.sessions.set(sessionId, {
      ...userData,
      createdAt: Date.now(),
      lastAccessed: Date.now()
    });
    await this.saveSessions();
  }

  /**
   * Get session data
   */
  async getSession(sessionId: string): Promise<SessionData | null> {
    const session = this.sessions.get(sessionId);
    
    if (!session) {
      return null;
    }

    // Check if session has expired (24 hours)
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    if (now - session.lastAccessed > maxAge) {
      this.sessions.delete(sessionId);
      await this.saveSessions();
      return null;
    }

    // Update last accessed time
    session.lastAccessed = now;
    this.sessions.set(sessionId, session);
    await this.saveSessions();

    return session;
  }

  /**
   * Update session data
   */
  async updateSession(sessionId: string, userData: Partial<SessionData>): Promise<boolean> {
    const session = this.sessions.get(sessionId);
    
    if (!session) {
      return false;
    }

    const updated = {
      ...session,
      ...userData,
      lastAccessed: Date.now()
    };

    this.sessions.set(sessionId, updated);
    await this.saveSessions();
    return true;
  }

  /**
   * Delete session
   */
  async deleteSession(sessionId: string): Promise<void> {
    this.sessions.delete(sessionId);
    await this.saveSessions();
  }

  /**
   * Clear expired sessions
   */
  async clearExpiredSessions(): Promise<number> {
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    let cleared = 0;

    for (const [sessionId, session] of this.sessions.entries()) {
      if (now - session.lastAccessed > maxAge) {
        this.sessions.delete(sessionId);
        cleared++;
      }
    }

    if (cleared > 0) {
      await this.saveSessions();
    }

    return cleared;
  }

  /**
   * Get all active sessions (admin function)
   */
  async getActiveSessions(): Promise<SessionData[]> {
    await this.clearExpiredSessions();
    return Array.from(this.sessions.values());
  }
}

/**
 * Session data interface
 */
export interface SessionData {
  id: string;
  username: string;
  email?: string;
  role: 'admin' | 'user';
  isAuthenticated: boolean;
  createdAt: number;
  lastAccessed: number;
}