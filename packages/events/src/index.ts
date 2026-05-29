export enum AIC_EVENTS {
    AUDIT_SUBMITTED = "audit:submitted",
    AUDIT_VERIFIED = "audit:verified",
    INCIDENT_LOGGED = "incident:logged",
    SCORE_RECALCULATED = "score:recalculated",
    LEAD_QUALIFIED = "lead:qualified"
}

export interface AICEventPayload {
    timestamp: string;
    org_id: string;
    actor_id?: string;
    data: any;
}
