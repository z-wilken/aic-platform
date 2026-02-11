/**
 * AIC Engine Client
 * Server-side client for interacting with the Python Bias Audit Engine.
 * Handles authentication, retries, and type-safe communication.
 */

export interface EngineAnalysisResult {
  audit_hash: string;
  signature: string;
  status: string;
  metrics: any;
  metadata: any;
}

export class EngineClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.ENGINE_URL || 'http://localhost:8000';
  }

  private async request<T>(path: string, options: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${path}`;

    // Add default headers including API key authentication
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };
    if (process.env.ENGINE_API_KEY) {
      headers['X-API-Key'] = process.env.ENGINE_API_KEY;
    }

    let lastError: Error | null = null;
    const maxRetries = 3;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const response = await fetch(url, { ...options, headers });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Engine API Error (${response.status}): ${errorText}`);
        }

        return await response.json() as T;
      } catch (error: any) {
        lastError = error;
        // Exponential backoff
        if (attempt < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }

    throw lastError || new Error(`Failed to call Engine API after ${maxRetries} attempts`);
  }

  /**
   * Run a standard bias analysis (Disparate Impact / 4/5ths Rule)
   */
  async analyzeDisparateImpact(data: any[], protectedAttribute: string, outcomeVariable: string, previousHash?: string): Promise<EngineAnalysisResult> {
    return this.request<EngineAnalysisResult>('/api/v1/analyze', {
      method: 'POST',
      body: JSON.stringify({
        data,
        protected_attribute: protectedAttribute,
        outcome_variable: outcomeVariable,
        previous_hash: previousHash
      }),
    });
  }

  /**
   * Run Equalized Odds analysis
   */
  async analyzeEqualizedOdds(data: any[], protectedAttribute: string, actualOutcome: string, predictedOutcome: string, threshold: number = 0.1, previousHash?: string): Promise<EngineAnalysisResult> {
    return this.request<EngineAnalysisResult>('/api/v1/analyze/equalized-odds', {
      method: 'POST',
      body: JSON.stringify({
        data,
        protected_attribute: protectedAttribute,
        actual_outcome: actualOutcome,
        predicted_outcome: predictedOutcome,
        threshold,
        previous_hash: previousHash
      }),
    });
  }

  /**
   * Calculate live Integrity Score breakdown
   */
  async calculateIntegrityScore(params: any): Promise<any> {
    return this.request<any>('/api/v1/integrity/calculate', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  /**
   * Check engine health
   */
  async checkHealth(): Promise<boolean> {
    try {
      const result = await this.request<any>('/health', { method: 'GET' });
      return result.status === 'healthy';
    } catch {
      return false;
    }
  }
}

// Singleton instance
export const engineClient = new EngineClient();
