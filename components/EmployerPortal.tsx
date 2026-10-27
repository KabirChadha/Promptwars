"use client";

import React from "react";
import {
  Building2,
  BarChart3,
  AlertOctagon,
  TrendingDown,
  CheckSquare,
  Square,
} from "lucide-react";
import { Industry, FairShiftIntelResponse, WorkerPayload } from "@/lib/types";
import { TranslationStrings } from "@/lib/translations";
import { ShiftSimulator } from "@/components/ShiftSimulator";

/**
 * Interface defining the properties required by the EmployerPortal component.
 */
export interface EmployerPortalProps {
  /** The currently selected industry sector domain. */
  industry: Industry;
  /** Intelligence analysis results returned by the FairShift engine. */
  intelResult: FairShiftIntelResponse | null;
  /** Lookup map tracking completion state of remediation checklist items. */
  completedChecklist: Record<number, boolean>;
  /** Callback to toggle completion status of a checklist item by index. */
  onToggleChecklist: (idx: number) => void;
  /** Active localized translation strings dictionary. */
  t: TranslationStrings;
  /** The active worker shift parameters and credentials. */
  simulatorForm: WorkerPayload;
  /** React state dispatcher to update simulator form fields. */
  setSimulatorForm: React.Dispatch<React.SetStateAction<WorkerPayload>>;
  /** Whether the simulator recalculation request is actively processing. */
  isAuditingShift: boolean;
  /** General background loading state for the audit engine. */
  isLoading: boolean;
  /** Visual pulse trigger displayed when shift data is recalculated. */
  auditUpdatedPulse: boolean;
  /** Handler invoked when user triggers audit recalculation. */
  onRecalculate: () => void;
}

/**
 * EmployerPortal Component
 * 
 * Provides the enterprise employer intelligence dashboard featuring systemic
 * safety violation heatmaps, OSHA compliance scoring, predictive workforce attrition
 * modeling, root-cause diagnostics, and the interactive shift simulator.
 *
 * @param props - Component configuration properties adhering to {@link EmployerPortalProps}.
 * @returns The rendered EmployerPortal UI hierarchy.
 */
export function EmployerPortal({
  industry,
  intelResult,
  completedChecklist,
  onToggleChecklist,
  t,
  simulatorForm,
  setSimulatorForm,
  isAuditingShift,
  isLoading,
  auditUpdatedPulse,
  onRecalculate,
}: EmployerPortalProps): React.JSX.Element {
  const complianceScore =
    intelResult?.employerInsights?.complianceScore ??
    intelResult?.meta?.complianceIndex ??
    48;

  const defaultRiskTier =
    complianceScore < 60
      ? "CRITICAL RISK"
      : complianceScore < 80
      ? "ELEVATED RISK"
      : "OPTIMAL / COMPLIANT";

  const riskTier = intelResult?.employerInsights?.riskTier || defaultRiskTier;

  const actionChecklist = intelResult?.employerInsights?.actionChecklist || [
    "Deploy automated 12-hour mandatory inter-shift lockout on biometric attendance gates.",
    "Mandate daily morning safety huddle & scaffold tag verification with certified supervisor sign-off.",
    "Audit sub-contractor payslips to enforce 2x overtime rate under Indian Factories Act.",
  ];

  return (
    <div className="space-y-6">
      {/* Header Ribbon for Employer Center */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-orange-400" />
            <h2 className="text-base font-bold text-zinc-50">
              {t.employerCenterTab}
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Real-time statutory compliance audit, attrition risk forecasting, and root-cause intelligence.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
            {industry === "construction" ? "SITE: METRO CORRIDOR 4" : "SITE: SRM CAMPUS FACILITY"}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/30">
            Active Shifts: 148 Workers
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FEATURE 5: SYSTEMIC SAFETY VIOLATION HEATMAP & OSHA AUDIT TRACKER */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-4 shadow-lg">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30 uppercase tracking-wide inline-block">
              {t.feature5Badge}
            </span>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-50">{t.feature5Title}</h3>
                  <p className="text-[11px] text-zinc-400">{t.feature5Subtitle}</p>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-zinc-800 text-zinc-300">
                Target 8.8
              </span>
            </div>
          </div>

          {/* Score Index Meter */}
          <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center text-center space-y-2">
            <span className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider">
              {t.complianceRatingLabel}
            </span>
            <div className="flex items-baseline gap-1">
              <span
                className={`text-5xl font-extrabold ${
                  complianceScore < 60
                    ? "text-red-400"
                    : complianceScore < 80
                    ? "text-amber-400"
                    : "text-emerald-400"
                }`}
              >
                {complianceScore}
              </span>
              <span className="text-sm font-mono text-zinc-400">/ 100</span>
            </div>

            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                complianceScore < 60
                  ? "bg-red-500/15 text-red-400 border border-red-500/30"
                  : complianceScore < 80
                  ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                  : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
              }`}
            >
              {riskTier}
            </span>
          </div>

          {/* Safety Violation Heatmap Breakdown */}
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
            <span className="text-[10px] font-mono uppercase text-zinc-400 block font-semibold">
              {t.oshaStatusTitle}
            </span>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-zinc-300">Electrical Grounding (Sec 36)</span>
                <span className="px-1.5 py-0.2 rounded bg-red-500/20 text-red-300 font-mono text-[10px]">
                  HIGH RISK
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-300">HazMat PPE & Gloves (1910.138)</span>
                <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px]">
                  ELEVATED
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-300">Scaffold Stability Anchors</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                  MONITORED
                </span>
              </div>
            </div>
          </div>

          {/* SDG Targets Ribbon */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase text-zinc-400 block">
              {t.alignedTargetsTitle}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(intelResult?.meta?.sdgAlignment || [
                "Target 8.8 (Labour Rights)",
                "Target 8.5 (Decent Work)",
                "Target 8.6 (Skills)",
              ]).map((targetItem: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] bg-zinc-950 text-zinc-300 border border-zinc-800"
                >
                  {targetItem}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* FEATURE 6: PREDICTIVE WORKFORCE ATTRITION & WAGE GAP MATRIX */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-4 shadow-lg">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30 uppercase tracking-wide inline-block">
              {t.feature6Badge}
            </span>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <AlertOctagon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-50">{t.feature6Title}</h3>
                  <p className="text-[11px] text-zinc-400">{t.feature6Subtitle}</p>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-orange-500/10 text-orange-400 border border-orange-500/30">
                Live Cluster
              </span>
            </div>
          </div>

          {/* Attrition Risk Meter */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                <TrendingDown className="w-3.5 h-3.5 text-red-400" />
                {t.attritionRiskLabel}
              </span>
              <span className="font-bold text-red-400">
                {intelResult?.employerInsights?.attritionRiskPercentage ?? 68}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full transition-all duration-500"
                style={{
                  width: `${intelResult?.employerInsights?.attritionRiskPercentage ?? 68}%`,
                }}
              />
            </div>
            <div className="pt-1.5 border-t border-zinc-900">
              <span className="text-[11px] text-zinc-300 block leading-relaxed font-mono">
                {intelResult?.employerInsights?.driverSummary || t.attritionDrivers}
              </span>
            </div>
          </div>

          {/* Root Cause Narrative */}
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
            <span className="text-[10px] font-mono uppercase text-orange-400 block font-semibold">
              {t.rootCauseTitle}
            </span>
            <p className="text-xs text-zinc-200 leading-relaxed">
              {intelResult?.employerInsights?.clusterRootCause ||
                "High overtime fatigue coupling with unaddressed electrical and scaffold safety hazards creates peak 30-day voluntary turnover risk."}
            </p>
          </div>

          {/* Actionable Plant Manager Checklist */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-200">
                {t.checklistTitle}
              </span>
              <span className="text-[10px] font-mono text-orange-400">
                {Object.values(completedChecklist).filter(Boolean).length} / {actionChecklist.length} Done
              </span>
            </div>

            <div className="space-y-2">
              {actionChecklist.map((actionText: string, idx: number) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onToggleChecklist(idx)}
                  className={`w-full p-2.5 rounded-lg border text-left flex items-start gap-2.5 transition-all text-xs ${
                    completedChecklist[idx]
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                      : "bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                  }`}
                >
                  {completedChecklist[idx] ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                  )}
                  <span
                    className={`leading-snug ${
                      completedChecklist[idx] ? "line-through text-zinc-500" : ""
                    }`}
                  >
                    {actionText}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-zinc-500 italic">
            {t.checklistEscalation}
          </div>
        </div>

        {/* FEATURE 7: SHIFT INPUT SIMULATOR */}
        <ShiftSimulator
          simulatorForm={simulatorForm}
          setSimulatorForm={setSimulatorForm}
          isAuditingShift={isAuditingShift}
          isLoading={isLoading}
          auditUpdatedPulse={auditUpdatedPulse}
          t={t}
          onRecalculate={onRecalculate}
        />
      </div>
    </div>
  );
}

export default EmployerPortal;
