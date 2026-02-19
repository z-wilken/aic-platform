import CircuitBreaker from 'opossum';
import { SigningService } from '@aic/auth';
import {
  DisparateImpactResult,
  EqualizedOddsResult,
  IntersectionalResult,
  ExplanationResult,
  DecisionExplanation,
  EmpathyAnalysisResult,
  TaskStatusResult,
} from '@aic/types';

const ENGINE_URL = process.env.ENGINE_URL || 'http://localhost:8000';

/**
 * INSTITUTIONAL ENGINE CLIENT
 * 
 * Provides resilient, authenticated communication with the AI Audit Engine.
 * Implements the Circuit Breaker pattern to prevent Platform cascading failures.
 * Feature-complete migration from app-level implementation.
 */
export class EngineClient {
  private static breaker: CircuitBreaker;

  private static initializeBreaker() {
    if (this.breaker) return;

    const options = {
      timeout: 30000, // 30 seconds for complex bias analysis
      errorThresholdPercentage: 50,
      resetTimeout: 30000, // 30 seconds before trying again
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const callEngine = async (params: { endpoint: string, method: string, body?: any, orgId?: string }) => {
      const { endpoint, method, body, orgId } = params;
      
      // 1. Generate Sovereign Identity Token
      const token = await SigningService.generateServiceToken('aic-engine', orgId);

      const headers: Record<string, string> = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      if (process.env.ENGINE_API_KEY) {
        headers['X-API-Key'] = process.env.ENGINE_API_KEY;
      }

      const response = await fetch(`${ENGINE_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Engine HTTP ${response.status}: ${text}`);
      }

      return await response.json();
    };

    this.breaker = new CircuitBreaker(callEngine, options);
    
    this.breaker.fallback(() => ({
      error: "Engine currently in manual-failover mode. Real-time intelligence restricted.",
      status: "CIRCUIT_OPEN",
      fallback: true
    }));

    this.breaker.on('open', () => console.warn('[CIRCUIT_BREAKER] Engine circuit opened! System in failover.'));
    this.breaker.on('close', () => console.info('[CIRCUIT_BREAKER] Engine circuit closed. Full intelligence restored.'));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static async request<T>(endpoint: string, method: string = 'GET', body?: any, orgId?: string): Promise<T> {
    this.initializeBreaker();
    return await this.breaker.fire({ endpoint, method, body, orgId }) as T;
  }

  /**
   * Run a standard bias analysis (Disparate Impact / 4/5ths Rule)
   */
  static async analyzeDisparateImpact(orgId: string, data: Record<string, unknown>[], protectedAttribute: string, outcomeVariable: string, previousHash?: string): Promise<DisparateImpactResult> {
    return this.request<DisparateImpactResult>('/api/v1/analyze', 'POST', {
      data,
      protected_attribute: protectedAttribute,
      outcome_variable: outcomeVariable,
      previous_hash: previousHash
    }, orgId);
  }

  /**
   * Run Equalized Odds analysis
   */
  static async analyzeEqualizedOdds(orgId: string, data: Record<string, unknown>[], protectedAttribute: string, actualOutcome: string, predictedOutcome: string, threshold: number = 0.1, previousHash?: string): Promise<EqualizedOddsResult> {
    return this.request<EqualizedOddsResult>('/api/v1/analyze/equalized-odds', 'POST', {
      data,
      protected_attribute: protectedAttribute,
      actual_outcome: actualOutcome,
      predicted_outcome: predictedOutcome,
      threshold,
      previous_hash: previousHash
    }, orgId);
  }

  /**
   * Run intersectional bias analysis
   */
  static async analyzeIntersectional(orgId: string, data: Record<string, unknown>[], protectedAttributes: string[], outcomeVariable: string, minGroupSize: number = 30, previousHash?: string): Promise<IntersectionalResult> {
    return this.request<IntersectionalResult>('/api/v1/analyze/intersectional', 'POST', {
      data,
      protected_attributes: protectedAttributes,
      outcome_variable: outcomeVariable,
      min_group_size: minGroupSize,
      previous_hash: previousHash
    }, orgId);
  }

  /**
   * Generate SHAP-based feature importance explanations
   */
  static async explainShap(orgId: string, data: Record<string, unknown>[], targetColumn: string, instance: Record<string, unknown>, numFeatures: number = 10): Promise<ExplanationResult> {
    return this.request<ExplanationResult>('/api/v1/explain/shap', 'POST', {
      data,
      target_column: targetColumn,
      instance,
      method: 'shap',
      num_features: numFeatures
    }, orgId);
  }

  /**
   * Generate a plain-language decision explanation
   */
  static async explainDecision(orgId: string, modelType: string, inputFeatures: Record<string, unknown>, decision: string, featureWeights?: Record<string, number>, confidence?: number): Promise<DecisionExplanation> {
    return this.request<DecisionExplanation>('/api/v1/explain', 'POST', {
      model_type: modelType,
      input_features: inputFeatures,
      decision,
      feature_weights: featureWeights,
      confidence
    }, orgId);
  }

  /**
   * Analyze empathy/tone of communications
   */
  static async analyzeEmpathy(orgId: string, text: string, context: string = 'rejection'): Promise<EmpathyAnalysisResult> {
    return this.request<EmpathyAnalysisResult>('/api/v1/analyze/empathy', 'POST', { text, context }, orgId);
  }

  /**
   * Get async task status (for polling)
   */
  static async getTaskStatus(taskId: string, orgId: string): Promise<TaskStatusResult> {
    return this.request<TaskStatusResult>(`/api/v1/tasks/${taskId}`, 'GET', undefined, orgId);
  }

  /**
   * Check engine health
   */
  static async checkHealth(): Promise<boolean> {
    try {
      const result = await this.request<{ status: string }>('/health', 'GET');
      return result.status === 'healthy' || result.status === 'AIC Audit Engine Operational';
    } catch {
      return false;
    }
  }
}
