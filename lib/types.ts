/**
 * FairShift - Core TypeScript Definitions
 * 
 * Supports:
 * 1. Dual-user perspectives: Worker vs Employer
 * 2. Multi-industry switching: Construction vs Campus
 * 3. Multilingual representations: English ('en'), Hindi ('hi'), Tamil ('ta')
 * 4. 7 Core Human Dignity & Workforce Compliance Features:
 *    - Industry & Role Shift Auditing
 *    - Automated Fair-Pay & Overtime Verification (Payslip)
 *    - PII-Redacted Zero-Retaliation Grievance & Safety Reporting
 *    - Predictive Fatigue Risk & Rest Protocol Modeling
 *    - Portable Skill Passport & Digital Verifiable Badges
 *    - Dual-Perspective Workforce & Attrition Insights
 *    - Multilingual Explanations & UN SDG-8 Alignment
 */

// 1. Industry switching
export type Industry = 'construction' | 'campus';

// 2. Dual-user perspectives
export type UserRole = 'worker' | 'employer';

// 3. Multilingual representations
export type Language = 'en' | 'hi' | 'ta';

// 4. Worker Payload
export interface WorkerPayload {
  workerId: string;
  workerName: string;
  roleTitle: string;
  industry: Industry;
  language: Language;
  shiftHours: number;
  consecutiveDays: number;
  hourlyRate: number;
  overtimeHours: number;
  grievanceRawText?: string;
  acquiredSkills: string[];
}

// 5. Payslip Detail
export interface PayslipDetail {
  basePay: number;
  overtimePay: number;
  grossPay: number;
  currency: string;
  plainLanguageSummary: Record<Language, string>;
  hoursAudited: number;
}

// 6. Safety Grievance
export type GrievanceSeverity = 'CRITICAL' | 'ELEVATED' | 'ROUTINE';

export interface SafetyGrievance {
  id: string;
  isRedacted: boolean;
  originalLanguage: Language;
  redactedReport: string;
  severity: GrievanceSeverity;
  complianceViolation: string;
  suggestedAction: string;
}

// 7. Fatigue Metric
export type FatigueLevel = 'OPTIMAL' | 'WARNING' | 'DANGER';

export interface FatigueMetric {
  score: number;
  level: FatigueLevel;
  primaryFactor: string;
  mitigationProtocol: string;
  mandatedRestHours: number;
}

// 8. Skill Passport
export interface VerifiedBadge {
  title: string;
  hoursCompleted: number;
  certifiedBy: string;
}

export interface SkillPassport {
  workerId: string;
  digitalCredentialId: string;
  verifiedBadges: Array<{
    title: string;
    hoursCompleted: number;
    certifiedBy: string;
  }>;
  marketReadinessScore: number;
  nextRecommendedMilestone: string;
}

// 9. FairShift Intel Response
export interface FairShiftIntelResponse {
  meta: {
    industry: Industry;
    evaluatedAt: string;
    sdgAlignment: string[];
    complianceIndex: number;
  };
  payslip: PayslipDetail;
  grievanceAnalysis: SafetyGrievance;
  fatigueRisk: FatigueMetric;
  skillPassport: SkillPassport;
  employerInsights: {
    attritionRiskPercentage: number;
    clusterRootCause: string;
    actionChecklist: string[];
  };
}

// Optional granular helper interfaces for downstream consumption
export interface EmployerInsights {
  attritionRiskPercentage: number;
  clusterRootCause: string;
  actionChecklist: string[];
}

export interface IntelMeta {
  industry: Industry;
  evaluatedAt: string;
  sdgAlignment: string[];
  complianceIndex: number;
}

// Backward compatibility types for existing legacy modules
export interface Finding {
  title: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  recommendation: string;
  sdgTargetRef: string;
}

export interface ActionStep {
  step: number;
  action: string;
  impact: string;
}

export interface AnalysisResponse {
  overallScore: number;
  status: 'Critical' | 'Warning' | 'Compliant';
  summary: string;
  findings: Finding[];
  actionPlan: ActionStep[];
  generatedDocument: string;
}

export interface DemoScenario {
  id: string;
  title: string;
  subtitle: string;
  text: string;
}
