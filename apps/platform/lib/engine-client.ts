import { 
  EngineAnalysisResult, 
  DisparateImpactResult, 
  EqualizedOddsResult, 
  IntersectionalResult,
  ExplanationResult,
  EngineErrorResult
} from '@aic/types';

/**
 * AIC Engine Client
 * Server-side client for interacting with the Python Bias Audit Engine.
 * Handles authentication, retries, and type-safe communication.
 */

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
      } catch (error: unknown) {
        lastError = error instanceof Error ? error : new Error(String(error));
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
  async analyzeDisparateImpact(data: Record<string, any>[], protectedAttribute: string, outcomeVariable: string, previousHash?: string): Promise<DisparateImpactResult> {
    return this.request<DisparateImpactResult>('/api/v1/analyze', {
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
  async analyzeEqualizedOdds(data: Record<string, any>[], protectedAttribute: string, actualOutcome: string, predictedOutcome: string, threshold: number = 0.1, previousHash?: string): Promise<EqualizedOddsResult> {
    return this.request<EqualizedOddsResult>('/api/v1/analyze/equalized-odds', {
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
  async calculateIntegrityScore(params: Record<string, any>): Promise<Record<string, any>> {
    return this.request<Record<string, any>>('/api/v1/integrity/calculate', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  /**
   * Run intersectional bias analysis across multiple protected attributes
   */
  async analyzeIntersectional(data: Record<string, any>[], protectedAttributes: string[], outcomeVariable: string, minGroupSize: number = 30, previousHash?: string): Promise<IntersectionalResult> {
    return this.request<IntersectionalResult>('/api/v1/analyze/intersectional', {
      method: 'POST',
      body: JSON.stringify({
        data,
        protected_attributes: protectedAttributes,
        outcome_variable: outcomeVariable,
        min_group_size: minGroupSize,
        previous_hash: previousHash
      }),
    });
  }

  /**
   * Calculate Theil index (inequality metric)
   */
  async analyzeTheilIndex(data: Record<string, any>[], protectedAttribute: string, outcomeVariable: string, previousHash?: string): Promise<DisparateImpactResult> {
    return this.request<DisparateImpactResult>('/api/v1/analyze/theil-index', {
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
   * Calculate Atkinson index (inequality metric)
   */
  async analyzeAtkinsonIndex(data: Record<string, any>[], protectedAttribute: string, outcomeVariable: string, previousHash?: string): Promise<DisparateImpactResult> {
    return this.request<DisparateImpactResult>('/api/v1/analyze/atkinson-index', {
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
   * Statistical parity difference analysis
   */
  async analyzeStatisticalParity(data: Record<string, any>[], protectedAttribute: string, outcomeVariable: string): Promise<DisparateImpactResult> {
    return this.request<DisparateImpactResult>('/api/v1/analyze/statistical-parity', {
      method: 'POST',
      body: JSON.stringify({
        data,
        protected_attribute: protectedAttribute,
        outcome_variable: outcomeVariable
      }),
    });
  }

  /**
   * Epsilon-differential fairness analysis
   */
  async analyzeEpsilonFairness(data: Record<string, any>[], protectedAttributes: string[], outcomeVariable: string, epsilon: number = 0.8, minGroupSize: number = 10): Promise<IntersectionalResult> {
    return this.request<IntersectionalResult>('/api/v1/analyze/epsilon-fairness', {
      method: 'POST',
      body: JSON.stringify({
        data,
        protected_attributes: protectedAttributes,
        outcome_variable: outcomeVariable,
        epsilon,
        min_group_size: minGroupSize
      }),
    });
  }

  /**
   * Monitor data drift between baseline and current distributions
   */
  async analyzeDrift(baselineData: number[], currentData: number[], featureName: string, nBins: number = 10): Promise<Record<string, any>> {
    return this.request<Record<string, any>>('/api/v1/analyze/drift', {
      method: 'POST',
      body: JSON.stringify({
        baseline_data: baselineData,
        current_data: currentData,
        feature_name: featureName,
        n_bins: nBins
      }),
    });
  }

  /**
   * Analyze empathy/tone of communications (Right to Empathy)
   */
  async analyzeEmpathy(text: string, context: string = 'rejection'): Promise<Record<string, any>> {
    return this.request<Record<string, any>>('/api/v1/analyze/empathy', {
      method: 'POST',
      body: JSON.stringify({ text, context }),
    });
  }

  /**
   * Generate SHAP-based feature importance explanations
   */
  async explainShap(data: Record<string, any>[], targetColumn: string, instance: Record<string, any>, numFeatures: number = 10): Promise<ExplanationResult> {
    return this.request<ExplanationResult>('/api/v1/explain/shap', {
      method: 'POST',
      body: JSON.stringify({
        data,
        target_column: targetColumn,
        instance,
        method: 'shap',
        num_features: numFeatures
      }),
    });
  }

  /**
   * Generate LIME-based explanations
   */
  async explainLime(data: Record<string, any>[], targetColumn: string, instance: Record<string, any>, numFeatures: number = 10): Promise<ExplanationResult> {
    return this.request<ExplanationResult>('/api/v1/explain/lime', {
      method: 'POST',
      body: JSON.stringify({
        data,
        target_column: targetColumn,
        instance,
        method: 'lime',
        num_features: numFeatures
      }),
    });
  }

  /**
   * Generate a plain-language decision explanation (Right to Explanation)
   */
  async explainDecision(modelType: string, inputFeatures: Record<string, any>, decision: string, featureWeights?: Record<string, number>, confidence?: number): Promise<Record<string, any>> {
    return this.request<Record<string, any>>('/api/v1/explain', {
      method: 'POST',
      body: JSON.stringify({
        model_type: modelType,
        input_features: inputFeatures,
        decision,
        feature_weights: featureWeights,
        confidence
      }),
    });
  }

  /**
   * Validate correction/appeal process compliance (Right to Correction)
   */
  async validateCorrectionProcess(params: { hasAppealMechanism: boolean; responseTimeHours: number; humanReviewerAssigned: boolean; clearInstructions: boolean; accessibleFormat: boolean }): Promise<Record<string, any>> {
    return this.request<Record<string, any>>('/api/v1/validate/correction-process', {
      method: 'POST',
      body: JSON.stringify({
        has_appeal_mechanism: params.hasAppealMechanism,
        response_time_hours: params.responseTimeHours,
        human_reviewer_assigned: params.humanReviewerAssigned,
        clear_instructions: params.clearInstructions,
        accessible_format: params.accessibleFormat
      }),
    });
  }

  /**
   * Submit a correction request
   */
  async submitCorrection(decisionId: string, originalDecision: string, requestedOutcome: string, reason: string, supportingEvidence?: Record<string, any>): Promise<Record<string, any>> {
    return this.request<Record<string, any>>('/api/v1/correction/submit', {
      method: 'POST',
      body: JSON.stringify({
        decision_id: decisionId,
        original_decision: originalDecision,
        requested_outcome: requestedOutcome,
        reason,
        supporting_evidence: supportingEvidence
      }),
    });
  }

  /**
   * Run privacy schema audit (POPIA compliance)
   */
  async auditPrivacy(columns: string[]): Promise<Record<string, any>> {
    return this.request<Record<string, any>>('/api/v1/audit/privacy', {
      method: 'POST',
      body: JSON.stringify({ columns }),
    });
  }

  /**
   * Run labor/human agency audit
   */
  async auditLabor(totalDecisions: number, humanInterventions: number, humanOverrides: number): Promise<Record<string, any>> {
    return this.request<Record<string, any>>('/api/v1/audit/labor', {
      method: 'POST',
      body: JSON.stringify({
        total_decisions: totalDecisions,
        human_interventions: humanInterventions,
        human_overrides: humanOverrides
      }),
    });
  }

  /**
   * Run adversarial red team audit
   */
  async auditRedTeam(data: Record<string, any>[], protectedAttribute: string, otherColumns: string[]): Promise<Record<string, any>> {
    return this.request<Record<string, any>>('/api/v1/audit/red-team', {
      method: 'POST',
      body: JSON.stringify({
        data,
        protected_attribute: protectedAttribute,
        other_columns: otherColumns
      }),
    });
  }

  /**
   * Scan and verify evidence documents
   */
  async verifyDocument(text: string): Promise<Record<string, any>> {
    return this.request<Record<string, any>>('/api/v1/audit/verify-document', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  }

  /**
   * Run comprehensive audit across all five algorithmic rights
   */
  async auditComprehensive(organizationName: string, aiSystems: any[], framework: string = 'popia'): Promise<Record<string, any>> {
    return this.request<Record<string, any>>('/api/v1/audit/comprehensive', {
      method: 'POST',
      body: JSON.stringify({
        organization_name: organizationName,
        ai_systems: aiSystems,
        framework
      }),
    });
  }

  /**
   * Analyze AI disclosure compliance (Right to Truth)
   */
  async analyzeDisclosure(interfaceText: string, interactionType: string = 'chatbot'): Promise<Record<string, any>> {
    return this.request<Record<string, any>>('/api/v1/analyze/disclosure', {
      method: 'POST',
      body: JSON.stringify({
        interface_text: interfaceText,
        interaction_type: interactionType
      }),
    });
  }

  /**
   * Verify hash chain integrity for audit trail
   */
  async verifyAuditTrail(records: any[]): Promise<Record<string, any>> {
    return this.request<Record<string, any>>('/api/v1/audit-trail/verify', {
      method: 'POST',
      body: JSON.stringify({ records }),
    });
  }

  /**
   * Get the engine's public signing key
   */
  async getPublicKey(): Promise<{ public_key: string }> {
    return this.request<{ public_key: string }>('/api/v1/audit-trail/public-key', {
      method: 'GET',
    });
  }

  /**
   * Check engine health
   */
  async checkHealth(): Promise<boolean> {
    try {
      const result = await this.request<{ status: string }>('/health', { method: 'GET' });
      return result.status === 'healthy' || result.status === 'AIC Audit Engine Operational';
    } catch {
      return false;
    }
  }
}

// Singleton instance
export const engineClient = new EngineClient();
