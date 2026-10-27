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

/**
 * Supported industry sector domains for dynamic compliance adaptation.
 */
export type Industry = 'construction' | 'campus';

/**
 * User perspective persona toggles between individual worker and plant management.
 */
export type UserRole = 'worker' | 'employer';

/**
 * Supported ISO language codes for vernacular summaries and localized UI.
 */
export type Language = 'en' | 'hi' | 'ta';

/**
 * Structured input payload capturing worker profile, shift parameters, and raw grievance notes.
 */
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

/**
 * Breakdown of itemized statutory pay, overtime multiplier, and plain-language vernacular summaries.
 */
export interface PayslipDetail {
  basePay: number;
  overtimePay: number;
  grossPay: number;
  currency: string;
  plainLanguageSummary: Record<Language, string>;
  hoursAudited: number;
}

/**
 * Severity tier classification for workplace safety grievances.
 */
export type GrievanceSeverity = 'CRITICAL' | 'ELEVATED' | 'ROUTINE';

/**
 * Sanitized workplace grievance record with cryptographic anonymity and statutory violation mapping.
 */
export interface SafetyGrievance {
  id: string;
  isRedacted: boolean;
  originalLanguage: Language;
  redactedReport: string;
  severity: GrievanceSeverity;
  complianceViolation: string;
  suggestedAction: string;
}

/**
 * Tri-state fatigue risk classification based on circadian and weekly shift volume thresholds.
 */
export type FatigueLevel = 'OPTIMAL' | 'WARNING' | 'DANGER';

/**
 * Physiological strain score, fatigue level, and mandatory rest lockout protocol.
 */
export interface FatigueMetric {
  score: number;
  level: FatigueLevel;
  primaryFactor: string;
  mitigationProtocol: string;
  mandatedRestHours: number;
}

/**
 * Individual industry-accredited skill badge with certified hours and issuer details.
 */
export interface VerifiedBadge {
  title: string;
  hoursCompleted: number;
  certifiedBy: string;
}

/**
 * Portable W3C-aligned verifiable digital skill passport for cross-employer workforce mobility.
 */
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

/**
 * Unified intelligence response payload returned by the FairShift analytics engine.
 */
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
    complianceScore?: number;
    riskTier?: string;
    driverSummary?: string;
    clusterRootCause: string;
    actionChecklist: string[];
  };
}

/**
 * Plant management workforce analytics, attrition risk forecasting, and mitigation checklist.
 */
export interface EmployerInsights {
  attritionRiskPercentage: number;
  complianceScore?: number;
  riskTier?: string;
  driverSummary?: string;
  clusterRootCause: string;
  actionChecklist: string[];
}

/**
 * Metadata detailing evaluation timestamp, industry domain, and UN SDG alignment.
 */
export interface IntelMeta {
  industry: Industry;
  evaluatedAt: string;
  sdgAlignment: string[];
  complianceIndex: number;
}

/**
 * Audit finding item highlighting statutory violation, severity, and remediation recommendation.
 */
export interface Finding {
  title: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  recommendation: string;
  sdgTargetRef: string;
}

/**
 * Stepwise remediation action item with projected operational and compliance impact.
 */
export interface ActionStep {
  step: number;
  action: string;
  impact: string;
}

/**
 * Aggregated analysis response supporting legacy visualization components.
 */
export interface AnalysisResponse {
  overallScore: number;
  status: 'Critical' | 'Warning' | 'Compliant';
  summary: string;
  findings: Finding[];
  actionPlan: ActionStep[];
  generatedDocument: string;
}

/**
 * Scenario definition for predefined hackathon and testing demonstration profiles.
 */
export interface DemoScenario {
  id: string;
  title: string;
  subtitle: string;
  text: string;
}
