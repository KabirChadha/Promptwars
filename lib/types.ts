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
