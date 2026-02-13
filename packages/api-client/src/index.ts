import CircuitBreaker from 'opossum';
import { SigningService } from '@aic/auth';

const ENGINE_URL = process.env.ENGINE_URL || 'http://localhost:8000';

/**
 * INSTITUTIONAL ENGINE CLIENT
 * 
 * Provides resilient, authenticated communication with the AI Audit Engine.
 * Implements the Circuit Breaker pattern to prevent Platform cascading failures.
 */
export class EngineClient {
  private static breaker: CircuitBreaker;

  private static initializeBreaker() {
    if (this.breaker) return;

    const options = {
      timeout: 10000, // 10 seconds
      errorThresholdPercentage: 50,
      resetTimeout: 30000, // 30 seconds before trying again
    };

    // The actual fetch operation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const callEngine = async (endpoint: string, options: any) => {
      const response = await fetch(`${ENGINE_URL}${endpoint}`, options);
      if (!response.ok) throw new Error(`Engine HTTP ${response.status}`);
      return await response.json();
    };

    this.breaker = new CircuitBreaker(callEngine, options);
    
    this.breaker.fallback(() => ({
      error: "Engine currently in manual-failover mode. Real-time intelligence restricted.",
      status: "CIRCUIT_OPEN",
      fallback: true
    }));

    this.breaker.on('open', () => console.warn('[CIRCUIT_BREAKER] Engine circuit opened! System in failover.'));
    this.breaker.on('halfOpen', () => console.info('[CIRCUIT_BREAKER] Engine circuit half-open. Testing recovery...'));
    this.breaker.on('close', () => console.info('[CIRCUIT_BREAKER] Engine circuit closed. Full intelligence restored.'));
  }

  /**
   * Execute an authenticated request to the Audit Engine
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async request(endpoint: string, method: string = 'GET', body?: any, orgId?: string) {
    this.initializeBreaker();

    // 1. Generate Sovereign Identity Token
    const token = await SigningService.generateServiceToken('aic-engine', orgId);

    const options = {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    return await this.breaker.fire(endpoint, options);
  }
}
