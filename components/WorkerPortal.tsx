"use client";

import React from "react";
import {
  IndianRupee,
  CheckCircle2,
  Volume2,
  VolumeX,
  ShieldCheck,
  Lock,
  Eye,
  Mic,
  Activity,
  AlertTriangle,
  Award,
  QrCode,
  Copy,
  Check,
} from "lucide-react";
import { WorkerPayload, FairShiftIntelResponse, Language } from "@/lib/types";
import { TranslationStrings } from "@/lib/translations";

/**
 * Interface defining the properties required by the WorkerPortal component.
 */
export interface WorkerPortalProps {
  /** The active worker shift parameters and credentials. */
  simulatorForm: WorkerPayload;
  /** React state dispatcher to update simulator form fields. */
  setSimulatorForm: React.Dispatch<React.SetStateAction<WorkerPayload>>;
  /** Intelligence analysis results returned by the FairShift engine. */
  intelResult: FairShiftIntelResponse | null;
  /** General background loading state for the audit engine. */
  isLoading: boolean;
  /** Whether the PII scrubber and grievance dispatch action is in-flight. */
  isScrubbing: boolean;
  /** Whether voice grievance simulation is currently recording. */
  isRecordingVoice: boolean;
  /** Whether speech synthesis audio readout is actively playing. */
  isSpeaking: boolean;
  /** Indicates whether the cryptographic credential hash was recently copied to clipboard. */
  copiedCredential: boolean;
  /** Whether the confirmation badge for dispatched grievance is shown. */
  grievanceDispatchedBadge: boolean;
  /** Current active language code. */
  language: Language;
  /** Localized translation strings dictionary for the current language. */
  t: TranslationStrings;
  /** Handler to initiate or halt text-to-speech reading of vernacular summaries. */
  onSpeakText: (text: string) => void;
  /** Handler to copy credential hash to system clipboard. */
  onCopyCredential: (id: string) => void;
  /** Handler to scrub PII and dispatch grievance to compliance engine. */
  onScrubAndLogGrievance: () => Promise<void> | void;
  /** Handler to simulate microphone voice note recording and transcription. */
  onSimulateVoiceGrievance: () => void;
}

/**
 * WorkerPortal Component
 * 
 * Provides the worker-centric mobile perspective covering:
 * - Feature 1: Transparent Vernacular Payslip & Statutory 2x Overtime Ledger
 * - Feature 2: Whistleblower Grievance Vault with PII Scrubbing
 * - Feature 3: Portable W3C-Compliant Skill Passport & QR Mobility
 * - Feature 4: Physiological Fatigue Radar & Mandatory Rest Lockout
 *
 * @param props - Component configuration properties adhering to {@link WorkerPortalProps}.
 * @returns The rendered WorkerPortal UI hierarchy.
 */
export function WorkerPortal({
  simulatorForm,
  setSimulatorForm,
  intelResult,
  isLoading,
  isScrubbing,
  isRecordingVoice,
  isSpeaking,
  copiedCredential,
  grievanceDispatchedBadge,
  language,
  t,
  onSpeakText,
  onCopyCredential,
  onScrubAndLogGrievance,
  onSimulateVoiceGrievance,
}: WorkerPortalProps): React.JSX.Element {
  // Mathematical fallback calculations
  const computedBasePay = Math.round(
    (simulatorForm.shiftHours || 8) * (simulatorForm.hourlyRate || 160)
  );
  const computedOvertimePay = Math.round(
    (simulatorForm.overtimeHours || 0) * ((simulatorForm.hourlyRate || 160) * 2)
  );
  const computedGrossPay = computedBasePay + computedOvertimePay;

  // Plain-Language summary binds dynamically to selected language
  const plainLanguageExplanation =
    intelResult?.payslip?.plainLanguageSummary?.[language] ||
    `You completed ${simulatorForm.shiftHours} regular hours (₹${computedBasePay}) plus ${simulatorForm.overtimeHours} overtime hours at 2x rate (₹${computedOvertimePay}). Total payout is ₹${computedGrossPay}. Zero hidden deductions.`;

  return (
    <div className="space-y-6">
      {/* Worker Mobile Banner / Context Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-lg">
            {simulatorForm.workerName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-zinc-50">{simulatorForm.workerName}</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
                {simulatorForm.workerId}
              </span>
            </div>
            <p className="text-xs text-zinc-400 flex items-center gap-2 mt-0.5">
              <span>{simulatorForm.roleTitle}</span>
              <span>•</span>
              <span className="text-orange-400 font-medium capitalize">
                {simulatorForm.industry} Sector
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-right">
            <span className="text-[10px] uppercase font-mono text-zinc-400 block">
              Logged Cycle
            </span>
            <span className="font-bold text-zinc-200">
              {simulatorForm.consecutiveDays} Consecutive Days ({simulatorForm.shiftHours}h/shift)
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/30 text-right">
            <span className="text-[10px] uppercase font-mono text-orange-400 block">
              Statutory Rate
            </span>
            <span className="font-bold text-orange-300">₹{simulatorForm.hourlyRate}/hr</span>
          </div>
        </div>
      </div>

      {/* Grid for Features 1 to 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FEATURE 1: PLAIN-LANGUAGE PAYSLIP LEDGER */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-4 shadow-lg relative overflow-hidden">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30 uppercase tracking-wide inline-block">
              {t.feature1Badge}
            </span>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <IndianRupee className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-50">{t.feature1Title}</h3>
                  <p className="text-[11px] text-zinc-400">{t.feature1Subtitle}</p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {t.zeroDeductions}
              </span>
            </div>
          </div>

          {/* Mathematical Ledger Breakdown */}
          {isLoading ? (
            <div className="space-y-3 animate-pulse py-4">
              <div className="h-4 bg-zinc-800 rounded w-3/4" />
              <div className="h-8 bg-zinc-800 rounded w-1/2" />
              <div className="h-4 bg-zinc-800 rounded w-full" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                {/* Base Pay Calculation */}
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                    {t.basePayLabel} ({simulatorForm.shiftHours}h × ₹{simulatorForm.hourlyRate})
                  </span>
                  <span className="text-lg font-bold text-zinc-100 mt-1 block">
                    ₹{intelResult?.payslip?.basePay ?? computedBasePay}
                  </span>
                  <span className="text-[10px] text-zinc-500 mt-0.5 block">
                    Standard Statutory Hours
                  </span>
                </div>

                {/* Overtime Pay Calculation */}
                <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/30">
                  <span className="text-[10px] font-mono text-orange-400 uppercase flex items-center justify-between">
                    <span>
                      {t.overtimeLabel} ({simulatorForm.overtimeHours}h)
                    </span>
                    <span className="px-1 rounded bg-orange-500/20 text-[9px] font-bold">
                      {t.statutoryMultiplier}
                    </span>
                  </span>
                  <span className="text-lg font-bold text-orange-300 mt-1 block">
                    ₹{intelResult?.payslip?.overtimePay ?? computedOvertimePay}
                  </span>
                  <span className="text-[10px] text-orange-400/80 mt-0.5 block">
                    Rate: ₹{simulatorForm.hourlyRate * 2}/hr (200%)
                  </span>
                </div>
              </div>

              {/* Total Gross Payout Highlight */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">
                    {t.grossPayLabel}
                  </span>
                  <span className="text-2xl font-extrabold text-zinc-50">
                    ₹{intelResult?.payslip?.grossPay ?? computedGrossPay}
                  </span>
                </div>
                <div className="text-right text-[11px] text-zinc-400">
                  <span className="font-medium text-emerald-400 flex items-center justify-end gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {t.guaranteedBadge}
                  </span>
                  <span>
                    {simulatorForm.shiftHours + simulatorForm.overtimeHours} {t.hoursAudited}
                  </span>
                </div>
              </div>

              {/* Multilingual Plain-Language Explanation */}
              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-orange-400" />
                    {t.explanationTitle} ({language.toUpperCase()}):
                  </span>
                  <button
                    type="button"
                    onClick={() => onSpeakText(plainLanguageExplanation)}
                    className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800 text-zinc-300 hover:text-orange-400 flex items-center gap-1 border border-zinc-700 transition-colors"
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="w-3 h-3 text-red-400" /> {t.stopAudio}
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3 h-3 text-orange-400" /> {t.listenAudio}
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-zinc-200 leading-relaxed italic bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800/60">
                  &quot;{plainLanguageExplanation}&quot;
                </p>
              </div>
            </div>
          )}
        </div>

        {/* FEATURE 2: WHISTLEBLOWER GRIEVANCE VAULT */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-4 shadow-lg relative">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30 uppercase tracking-wide inline-block">
              {t.feature2Badge}
            </span>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-50">{t.feature2Title}</h3>
                  <p className="text-[11px] text-zinc-400">{t.feature2Subtitle}</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Lock className="w-3 h-3" /> {t.piiRedactedBadge}
              </span>
            </div>
          </div>

          {/* Grievance Input & Simulation Buttons */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <label
                htmlFor="grievanceInput"
                className="font-medium text-zinc-300 flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-zinc-400" />
                {t.incidentLabel}
              </label>

              <button
                type="button"
                onClick={onSimulateVoiceGrievance}
                disabled={isRecordingVoice}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  isRecordingVoice
                    ? "bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse"
                    : "bg-zinc-800 text-orange-300 hover:bg-zinc-700 border border-zinc-700"
                }`}
              >
                <Mic className="w-3 h-3" />
                <span>{isRecordingVoice ? t.recordingAudio : t.voiceNoteButton}</span>
              </button>
            </div>

            <textarea
              id="grievanceInput"
              rows={2}
              value={simulatorForm.grievanceRawText}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setSimulatorForm((prev) => ({ ...prev, grievanceRawText: e.target.value }))
              }
              placeholder={t.placeholderGrievance}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              {/* Animated Confirmation Badge */}
              {grievanceDispatchedBadge ? (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-semibold animate-in fade-in zoom-in-95">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.dispatchedBadge}</span>
                </div>
              ) : (
                <span className="text-[11px] text-zinc-500 italic">
                  All personal names, employee IDs, and supervisor tags are replaced with [REDACTED].
                </span>
              )}

              <button
                type="button"
                onClick={onScrubAndLogGrievance}
                disabled={isScrubbing || isLoading}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-orange-500 hover:bg-orange-600 text-zinc-950 transition-all shadow-md shadow-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-75 shrink-0"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isScrubbing ? t.scrubbingButton : t.scrubButton}</span>
              </button>
            </div>
          </div>

          {/* Redacted Grievance Display Card */}
          {isLoading ? (
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 animate-pulse space-y-2">
              <div className="h-4 bg-zinc-800 rounded w-1/3" />
              <div className="h-10 bg-zinc-800 rounded w-full" />
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] text-zinc-400">
                  {t.ticketLabel}: {intelResult?.grievanceAnalysis?.id || "GRV-SRM-8821"}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    intelResult?.grievanceAnalysis?.severity === "CRITICAL"
                      ? "bg-red-500/15 text-red-400 border border-red-500/30"
                      : intelResult?.grievanceAnalysis?.severity === "ELEVATED"
                      ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                      : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                  }`}
                >
                  {intelResult?.grievanceAnalysis?.severity || "ROUTINE"} SEVERITY
                </span>
              </div>

              {/* Redacted text highlight */}
              <p className="text-xs text-zinc-300 leading-relaxed">
                &quot;
                {intelResult?.grievanceAnalysis?.redactedReport
                  ? intelResult.grievanceAnalysis.redactedReport
                      .split("[REDACTED]")
                      .map((part: string, i: number, arr: string[]) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <span className="inline-block px-1.5 py-0.2 mx-1 rounded bg-orange-500/20 text-orange-300 font-mono text-[11px] font-semibold border border-orange-500/40">
                              [REDACTED]
                            </span>
                          )}
                        </React.Fragment>
                      ))
                  : "Grievance securely logged. All supervisor tags and worker identifiers anonymized."}
                &quot;
              </p>

              <div className="pt-2 border-t border-zinc-800/80 text-[11px] space-y-1">
                <div className="text-zinc-400">
                  <span className="text-orange-400 font-semibold">{t.violationLabel}: </span>
                  {intelResult?.grievanceAnalysis?.complianceViolation ||
                    "Indian Factories Act Sec 36 / OSHA 1926.404"}
                </div>
                <div className="text-zinc-400">
                  <span className="text-emerald-400 font-semibold">{t.actionLabel}: </span>
                  {intelResult?.grievanceAnalysis?.suggestedAction ||
                    "Conduct immediate site OHS inspection and isolate hazards."}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FEATURE 4: PHYSIOLOGICAL FATIGUE RADAR & MANDATORY REST LOCKOUT */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-4 shadow-lg relative">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30 uppercase tracking-wide inline-block">
              {t.feature4Badge}
            </span>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-50">{t.feature4Title}</h3>
                  <p className="text-[11px] text-zinc-400">{t.feature4Subtitle}</p>
                </div>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                  intelResult?.fatigueRisk?.level === "DANGER"
                    ? "bg-red-500/15 text-red-400 border-red-500/40 animate-pulse"
                    : intelResult?.fatigueRisk?.level === "WARNING"
                    ? "bg-amber-500/15 text-amber-400 border-amber-500/40"
                    : "bg-emerald-500/15 text-emerald-400 border-emerald-500/40"
                }`}
              >
                {intelResult?.fatigueRisk?.level || "OPTIMAL"} LEVEL
              </span>
            </div>
          </div>

          {/* Score & Gauge Presentation */}
          {isLoading ? (
            <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 animate-pulse space-y-3">
              <div className="h-6 bg-zinc-800 rounded w-1/4" />
              <div className="h-10 bg-zinc-800 rounded w-full" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                    {t.fatigueScoreLabel}
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-3xl font-extrabold text-zinc-50">
                      {intelResult?.fatigueRisk?.score ?? 89}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">/ 100</span>
                  </div>
                </div>

                {/* Visual Meter Bar */}
                <div className="w-40 space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                    <span>{t.riskSafe}</span>
                    <span>{t.riskDanger}</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-zinc-800 overflow-hidden relative">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        intelResult?.fatigueRisk?.level === "DANGER"
                          ? "bg-red-500"
                          : intelResult?.fatigueRisk?.level === "WARNING"
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                      }`}
                      style={{
                        width: `${intelResult?.fatigueRisk?.score ?? 89}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Mandated Rest Lockout Alert */}
              {(intelResult?.fatigueRisk?.mandatedRestHours ?? 24) > 0 ? (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-red-300 block">
                      {t.lockoutAlertTitle}: {intelResult?.fatigueRisk?.mandatedRestHours ?? 24} Hours
                    </span>
                    <span className="text-zinc-300 mt-0.5 block">
                      {intelResult?.fatigueRisk?.mitigationProtocol ||
                        "Immediate 24-hour mandatory rest lockout enforced on biometric gate."}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.optimalMessage}</span>
                </div>
              )}

              <div className="text-xs text-zinc-400">
                <span className="font-semibold text-zinc-300">{t.stressFactorLabel} </span>
                {intelResult?.fatigueRisk?.primaryFactor ||
                  "Excessive consecutive shift hours without mandatory weekend cycle."}
              </div>
            </div>
          )}
        </div>

        {/* FEATURE 3: PORTABLE CRYPTOGRAPHIC SKILL PASSPORT & QR MOBILITY */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-4 shadow-lg relative">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30 uppercase tracking-wide inline-block">
              {t.feature3Badge}
            </span>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-50">{t.feature3Title}</h3>
                  <p className="text-[11px] text-zinc-400">{t.feature3Subtitle}</p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/30">
                {t.w3cBadge}
              </span>
            </div>
          </div>

          {isLoading ? (
            <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 animate-pulse space-y-3">
              <div className="h-6 bg-zinc-800 rounded w-1/3" />
              <div className="h-12 bg-zinc-800 rounded w-full" />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Credential Hash, QR Code Simulation & Copy */}
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-3">
                {/* Simulated QR Mobility Code Badge */}
                <div className="w-12 h-12 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 border border-zinc-700 shadow-sm">
                  <QrCode className="w-full h-full text-zinc-950" />
                </div>

                <div className="space-y-0.5 flex-1 min-w-0">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                    {t.credentialIdLabel}
                  </span>
                  <span className="font-mono text-xs font-bold text-orange-400 tracking-wider truncate block">
                    {intelResult?.skillPassport?.digitalCredentialId || "VEC-SRM-53555245"}
                  </span>
                  <span className="text-[9px] text-zinc-500 font-mono block">
                    {t.qrMobilityLabel}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onCopyCredential(
                      intelResult?.skillPassport?.digitalCredentialId || "VEC-SRM-53555245"
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors shrink-0"
                >
                  {copiedCredential ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> {t.copiedButton}
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" /> {t.copyButton}
                    </>
                  )}
                </button>
              </div>

              {/* Verified Badges Array */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-zinc-300 block">
                  {t.verifiedBadgesTitle}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {(intelResult?.skillPassport?.verifiedBadges || [
                    {
                      title: "Hydraulic Rig Operation Level 1",
                      hoursCompleted: 140,
                      certifiedBy: "NSDC India",
                    },
                    {
                      title: "Working at Heights & Scaffold Safety",
                      hoursCompleted: 80,
                      certifiedBy: "DGFASLI",
                    },
                  ]).map((badge, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800/80 flex flex-col justify-between"
                    >
                      <span className="font-semibold text-zinc-200 text-[11px]">
                        {badge.title}
                      </span>
                      <div className="flex items-center justify-between mt-1 text-[10px] text-zinc-400">
                        <span>
                          {badge.hoursCompleted} {t.hoursLabel}
                        </span>
                        <span className="text-orange-400/90 font-mono">
                          {badge.certifiedBy}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Recommended Career Milestone */}
              <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/25 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase text-orange-400 block">
                    {t.nextMilestoneLabel}
                  </span>
                  <span className="font-medium text-zinc-200 mt-0.5 block">
                    {intelResult?.skillPassport?.nextRecommendedMilestone ||
                      "Heavy Earthmoving Equipment Specialist (HEMM-2)"}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-zinc-400 block">
                    {t.readinessLabel}
                  </span>
                  <span className="font-bold text-orange-400">
                    {intelResult?.skillPassport?.marketReadinessScore ?? 88}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkerPortal;
