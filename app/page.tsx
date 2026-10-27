"use client";

import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import { WorkerPortal } from "@/components/WorkerPortal";
import { EmployerPortal } from "@/components/EmployerPortal";
import {
  Industry,
  UserRole,
  Language,
  WorkerPayload,
  FairShiftIntelResponse,
} from "@/lib/types";
import { TRANSLATIONS } from "@/lib/translations";
import { FIVE_WORKER_ROSTER, WorkerScenario } from "@/lib/scenarios";
import { clientScrubPII } from "@/lib/utils";
import {
  HardHat,
  Building2,
  User,
  Sparkles,
  Zap,
} from "lucide-react";

/**
 * FairShiftDashboard Main Application Page
 *
 * Implements the top-level orchestration layer for FairShift:
 * - Persists and synchronizes multi-perspective states (Worker vs Employer)
 * - Manages cross-industry runtime adaptations (Metro Construction vs SRMIST Campus)
 * - Dynamically coordinates multilingual localization (English, Tamil, Hindi)
 * - Dispatches asynchronous shift auditing and AI intelligence requests
 *
 * @returns The rendered main dashboard page.
 */
export default function FairShiftDashboard(): React.JSX.Element {
  // Navigation & Control States
  const [userRole, setUserRole] = useState<UserRole>("worker");
  const [industry, setIndustry] = useState<Industry>("construction");
  const [language, setLanguage] = useState<Language>("en");

  // Fully controlled Shift Input Simulator Form state
  const [simulatorForm, setSimulatorForm] = useState<WorkerPayload>(
    FIVE_WORKER_ROSTER[0].payload
  );

  // Intel Response & Dynamic UI States
  const [intelResult, setIntelResult] = useState<FairShiftIntelResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuditingShift, setIsAuditingShift] = useState<boolean>(false);
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);
  const [activeScenario, setActiveScenario] = useState<string>("suresh");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedCredential, setCopiedCredential] = useState<boolean>(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [completedChecklist, setCompletedChecklist] = useState<Record<number, boolean>>({});
  const [grievanceDispatchedBadge, setGrievanceDispatchedBadge] = useState<boolean>(false);
  const [auditUpdatedPulse, setAuditUpdatedPulse] = useState<boolean>(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const showToast = useCallback((msg: string): void => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  // Core Audit Analysis Dispatcher
  const executeAnalysis = useCallback(
    async (payload: WorkerPayload, isManualRecalc = false): Promise<void> => {
      if (isManualRecalc) {
        setIsAuditingShift(true);
      } else {
        setIsLoading(true);
      }

      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }

        const data: FairShiftIntelResponse = await response.json();
        setIntelResult(data);

        if (isManualRecalc) {
          setAuditUpdatedPulse(true);
          showToast(t.auditUpdatedToast);
          setTimeout(() => setAuditUpdatedPulse(false), 4500);
        } else {
          showToast("FairShift audit processed. Intel hydrated.");
        }
      } catch (err: unknown) {
        console.error("Analysis execution error:", err);
        showToast("Intelligence server offline. Retaining local model.");
      } finally {
        setIsLoading(false);
        setIsAuditingShift(false);
      }
    },
    [t.auditUpdatedToast, showToast]
  );

  // Initial live hydration on mount
  useEffect(() => {
    executeAnalysis(FIVE_WORKER_ROSTER[0].payload);
  }, [executeAnalysis]);

  // Activate any of the 5 worker roster scenarios
  const handleSelectScenario = (scenario: WorkerScenario): void => {
    setActiveScenario(scenario.id);
    setIndustry(scenario.payload.industry);
    setSimulatorForm({ ...scenario.payload });
    setCompletedChecklist({});
    setGrievanceDispatchedBadge(false);

    executeAnalysis(scenario.payload);
  };

  // Industry Switcher Sync
  const handleSwitchIndustry = (newInd: Industry): void => {
    setIndustry(newInd);
    const updatedForm: WorkerPayload = {
      ...simulatorForm,
      industry: newInd,
      roleTitle:
        newInd === "campus"
          ? "Campus Facility & HazMat Custodian"
          : "Senior Scaffolding Rig Specialist",
      acquiredSkills:
        newInd === "campus"
          ? ["Institutional Sanitization & HazMat Level 2", "Campus Facility Emergency First Aid"]
          : ["Hydraulic Rig Operation Level 1", "Working at Heights & Scaffold Safety"],
    };
    setSimulatorForm(updatedForm);
    executeAnalysis(updatedForm);
  };

  // Recalculate Button Handler in Shift Input Simulator
  const handleRecalculateSimulator = (): void => {
    const payload: WorkerPayload = {
      workerId: simulatorForm.workerId || "FS-WRK-001",
      workerName: simulatorForm.workerName || "Worker",
      roleTitle:
        simulatorForm.roleTitle ||
        (simulatorForm.industry === "construction"
          ? "Senior Scaffolding Rig Specialist"
          : "Campus Facility & HazMat Custodian"),
      industry: simulatorForm.industry || industry,
      language: language,
      shiftHours: Number(simulatorForm.shiftHours) || 8,
      consecutiveDays: Number(simulatorForm.consecutiveDays) || 5,
      hourlyRate: Number(simulatorForm.hourlyRate) || 120,
      overtimeHours: Number(simulatorForm.overtimeHours) || 0,
      grievanceRawText: simulatorForm.grievanceRawText,
      acquiredSkills:
        (simulatorForm.industry || industry) === "construction"
          ? ["Hydraulic Rig Operation Level 1", "Working at Heights & Scaffold Safety"]
          : ["Institutional Sanitization & HazMat Level 2", "Campus Facility Emergency First Aid"],
    };

    executeAnalysis(payload, true);
  };

  // Wire "Scrub PII & Log Grievance" Button in Worker View
  const handleScrubAndLogGrievance = async (): Promise<void> => {
    setIsScrubbing(true);
    const raw = simulatorForm.grievanceRawText || "";
    const scrubbed = clientScrubPII(raw, simulatorForm.workerName, simulatorForm.workerId);

    // Update form with scrubbed text immediately
    const updatedForm: WorkerPayload = { ...simulatorForm, grievanceRawText: scrubbed };
    setSimulatorForm(updatedForm);

    try {
      const payload: WorkerPayload = {
        ...updatedForm,
        language,
        shiftHours: Number(updatedForm.shiftHours) || 8,
        consecutiveDays: Number(updatedForm.consecutiveDays) || 5,
        hourlyRate: Number(updatedForm.hourlyRate) || 120,
        overtimeHours: Number(updatedForm.overtimeHours) || 0,
        acquiredSkills:
          updatedForm.industry === "construction"
            ? ["Hydraulic Rig Operation Level 1", "Working at Heights & Scaffold Safety"]
            : ["Institutional Sanitization & HazMat Level 2", "Campus Facility Emergency First Aid"],
      };

      await executeAnalysis(payload);
      setGrievanceDispatchedBadge(true);
      showToast(t.dispatchedBadge);
      setTimeout(() => setGrievanceDispatchedBadge(false), 5500);
    } finally {
      setIsScrubbing(false);
    }
  };

  // Voice Note Simulation
  const handleSimulateVoiceGrievance = (): void => {
    if (isRecordingVoice) return;
    setIsRecordingVoice(true);
    showToast(t.recordingAudio);

    setTimeout(() => {
      const simulatedVoiceText =
        industry === "construction"
          ? "Site foreman Singh instructed double shift on tower crane without emergency harnesses after 14 continuous hours in high wind."
          : "Contractor withheld acid-resistant boots and face visors for floor deep-cleaning squad in university hostels.";

      const updatedForm: WorkerPayload = { ...simulatorForm, grievanceRawText: simulatedVoiceText };
      setSimulatorForm(updatedForm);
      setIsRecordingVoice(false);
      showToast("Voice grievance transcribed and PII redaction active.");

      executeAnalysis(updatedForm);
    }, 2000);
  };

  // Text-to-Speech Read Aloud Simulation
  const handleSpeakText = (text: string): void => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } else {
      showToast("Audio synthesizer not supported in current browser.");
    }
  };

  // Credential Copy Action with Tooltip Checkmark
  const handleCopyCredential = (id: string): void => {
    if (typeof navigator !== "undefined" && navigator?.clipboard) {
      navigator.clipboard.writeText(id);
      setCopiedCredential(true);
      showToast(`${t.copiedButton} ${id}`);
      setTimeout(() => setCopiedCredential(false), 2500);
    }
  };

  // Toggle Checklist
  const toggleChecklist = (idx: number): void => {
    setCompletedChecklist((prev: Record<number, boolean>) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-orange-500/30 selection:text-orange-200">
      {/* Global Top Navbar */}
      <Navbar />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-zinc-900 border border-orange-500/40 text-zinc-100 shadow-2xl shadow-orange-500/20 text-xs font-medium animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-7">
        {/* ========================================================= */}
        {/* PLATFORM CAPABILITIES: 7/7 ACTIVE MODULES BAR             */}
        {/* ========================================================= */}
        <section
          aria-label="Platform Capabilities Bar"
          className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs shadow-md"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-bold text-zinc-100 tracking-wide uppercase">
              {t.capabilitiesTitle}
            </span>
            <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30">
              {t.capabilitiesCount}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 text-[11px] font-medium">
            <span className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
              F1: Payslip Ledger
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
              F2: PII Vault
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
              F3: Skill Passport & QR
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
              F4: Fatigue Radar
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
              F5: OSHA Violation Heatmap
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
              F6: Predictive Attrition
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
              F7: Dynamic Cross-Industry
            </span>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 1: TOP UTILITY HEADER & MULTI-SWITCH BAR          */}
        {/* ========================================================= */}
        <section
          aria-label="System Controls"
          className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-xl backdrop-blur-md space-y-4"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Left: App Title & SDG Status */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/40 flex items-center justify-center text-orange-400 shadow-lg shadow-orange-500/10">
                <HardHat className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-zinc-50">
                    {t.appTitle}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-orange-500/15 border border-orange-500/30 text-orange-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
                    {t.appBadge}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {t.appSubtitle}
                </p>
              </div>
            </div>

            {/* Right: Dual Perspective Segmented Control */}
            <div
              role="tablist"
              aria-label="User Perspective Selector"
              className="inline-flex p-1 rounded-xl bg-zinc-950 border border-zinc-800 self-start lg:self-auto"
            >
              <button
                type="button"
                role="tab"
                aria-selected={userRole === "worker"}
                onClick={() => setUserRole("worker")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  userRole === "worker"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-zinc-950 shadow-md shadow-orange-500/20 font-bold"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                }`}
              >
                <User className="w-4 h-4" />
                <span>{t.workerViewTab}</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={userRole === "employer"}
                onClick={() => setUserRole("employer")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  userRole === "employer"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-zinc-950 shadow-md shadow-orange-500/20 font-bold"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>{t.employerCenterTab}</span>
              </button>
            </div>
          </div>

          {/* Sub-Control Ribbon: Industry + Language */}
          <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Industry Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-zinc-400 font-medium hidden sm:inline">{t.industryLabel}</span>
              <div className="inline-flex rounded-lg bg-zinc-950 p-1 border border-zinc-800">
                <button
                  type="button"
                  onClick={() => handleSwitchIndustry("construction")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                    industry === "construction"
                      ? "bg-zinc-800 text-orange-400 border border-orange-500/30"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <HardHat className="w-3.5 h-3.5 text-orange-400" />
                  <span>{t.constructionIndustry}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSwitchIndustry("campus")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                    industry === "campus"
                      ? "bg-zinc-800 text-orange-400 border border-orange-500/30"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-orange-400" />
                  <span>{t.campusIndustry}</span>
                </button>
              </div>
            </div>

            {/* Multilingual Selector */}
            <div className="flex items-center gap-2">
              <span className="text-zinc-400 font-medium hidden sm:inline">{t.languageLabel}</span>
              <div className="inline-flex rounded-lg bg-zinc-950 p-1 border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                    language === "en"
                      ? "bg-zinc-800 text-zinc-50 border border-zinc-700 font-bold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("ta")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                    language === "ta"
                      ? "bg-zinc-800 text-zinc-50 border border-zinc-700 font-bold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  தமிழ்
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("hi")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                    language === "hi"
                      ? "bg-zinc-800 text-zinc-50 border border-zinc-700 font-bold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  हिंदी
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: 5 DIVERSE HACKATHON WORKER ROSTER SCENARIOS    */}
        {/* ========================================================= */}
        <section
          aria-label="Hackathon Scenarios Roster"
          className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/90 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-400 animate-pulse shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                {t.scenariosTitle}
              </span>
            </div>
            <span className="text-[11px] text-zinc-400 font-mono hidden sm:inline">
              {t.scenariosSubtitle}
            </span>
          </div>

          {/* 5 Worker Scenario Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {FIVE_WORKER_ROSTER.map((scenario: WorkerScenario) => {
              const isActive = activeScenario === scenario.id;
              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => handleSelectScenario(scenario)}
                  className={`p-2.5 rounded-xl text-left border transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 flex flex-col justify-between ${
                    isActive
                      ? "bg-orange-500/15 border-orange-500 text-orange-200 shadow-md shadow-orange-500/15 scale-[1.01]"
                      : "bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/60"
                  }`}
                >
                  <span className="font-bold text-xs leading-snug line-clamp-1">
                    {scenario.pillTitle}
                  </span>
                  <span
                    className={`mt-1.5 text-[10px] font-mono leading-tight block ${
                      isActive ? "text-orange-300" : "text-zinc-400"
                    }`}
                  >
                    {scenario.pillBadge}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: WORKER PERSPECTIVE VIEW                        */}
        {/* ========================================================= */}
        {userRole === "worker" && (
          <WorkerPortal
            simulatorForm={simulatorForm}
            setSimulatorForm={setSimulatorForm}
            intelResult={intelResult}
            isLoading={isLoading}
            isScrubbing={isScrubbing}
            isRecordingVoice={isRecordingVoice}
            isSpeaking={isSpeaking}
            copiedCredential={copiedCredential}
            grievanceDispatchedBadge={grievanceDispatchedBadge}
            language={language}
            t={t}
            onSpeakText={handleSpeakText}
            onCopyCredential={handleCopyCredential}
            onScrubAndLogGrievance={handleScrubAndLogGrievance}
            onSimulateVoiceGrievance={handleSimulateVoiceGrievance}
          />
        )}

        {/* ========================================================= */}
        {/* SECTION 4: EMPLOYER INTEL CENTER VIEW                     */}
        {/* ========================================================= */}
        {userRole === "employer" && (
          <EmployerPortal
            industry={industry}
            intelResult={intelResult}
            completedChecklist={completedChecklist}
            onToggleChecklist={toggleChecklist}
            t={t}
            simulatorForm={simulatorForm}
            setSimulatorForm={setSimulatorForm}
            isAuditingShift={isAuditingShift}
            isLoading={isLoading}
            auditUpdatedPulse={auditUpdatedPulse}
            onRecalculate={handleRecalculateSimulator}
          />
        )}
      </main>
    </div>
  );
}
