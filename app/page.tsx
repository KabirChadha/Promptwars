"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import ScoreMeter from "@/components/ScoreMeter";
import FindingsList from "@/components/FindingsList";
import ActionPlan from "@/components/ActionPlan";
import Dropzone from "@/components/Dropzone";
import { AnalysisResponse, DemoScenario } from "@/lib/types";
import {
  Sparkles,
  FileCheck2,
  AlertOctagon,
  Copy,
  Download,
  Check,
  Send,
  RefreshCw,
  Sliders,
  Layers,
  FileText,
  Flame,
  Info,
} from "lucide-react";

const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: "factory-labor",
    title: "Factory Labor & Overtime Risk",
    subtitle: "Target 8.8 • Manufacturing",
    text: "Operational audit at Assembly Plant B reveals that assembly technicians average 68 weekly hours during peak production quarters, exceeding statutory limits by 20 hours with punitive attendance fines. Volatile organic solvent (VOC) vapors in the finishing unit exceed permissible exposure thresholds without biometric verification of respirator usage. Net earnings are subject to variable piece-rate defect clawbacks, resulting in seasonal wages dipping below the regional living wage floor.",
  },
  {
    id: "gig-contractor",
    title: "Gig Platform & Delivery Workers",
    subtitle: "Target 8.5 • Platform Economy",
    text: "Urban logistics dispatch network employing 12,000 gig couriers operates automated rating-based deactivations without manual arbitration or grievance hearings. Unpaid standby waiting intervals between dispatches average 26% of online shift duration, diluting effective hourly earnings. Couriers lack platform-sponsored occupational injury or liability micro-insurance during active delivery runs.",
  },
  {
    id: "supply-chain",
    title: "Textile Supply Chain & Living Wage",
    subtitle: "Target 8.7 & 8.6 • Global Sourcing",
    text: "Primary garment production facilities maintain 100% verified living wage baselines and accredited labor safety committees. However, secondary Tier-2 embroidery and dye subcontractors lack centralized digital clock-in systems, creating seasonal overtime audit blindspots. Youth vocational apprenticeships remain unaccredited without formal dual-certification pathways.",
  },
];

export default function DashboardPage() {
  const [inputText, setInputText] = useState("");
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSelectScenario = (scenario: DemoScenario) => {
    setSelectedScenario(scenario.id);
    setInputText(scenario.text);
    setAttachedFile(null);
  };

  const handleClear = () => {
    setInputText("");
    setSelectedScenario(null);
    setAttachedFile(null);
  };

  const handleFileLoaded = (filename: string, content?: string) => {
    setAttachedFile(filename);
    setSelectedScenario(null);
    if (content) {
      setInputText(content);
    }
  };

  const handleAnalyze = async () => {
    if (!inputText.trim() && !attachedFile) {
      triggerToast("Please provide policy text or attach an audit document first.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
          scenarioId: selectedScenario,
          filename: attachedFile,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze text");
      }

      const data: AnalysisResponse = await response.json();
      setAnalysisResult(data);
      triggerToast("Audit analysis completed successfully.");
    } catch (err) {
      console.error(err);
      triggerToast("An error occurred during analysis. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = async () => {
    if (!analysisResult) return;
    try {
      await navigator.clipboard.writeText(analysisResult.generatedDocument);
      triggerToast("Compliance report copied to clipboard!");
    } catch {
      triggerToast("Unable to copy to clipboard.");
    }
  };

  const handleDownloadReport = () => {
    if (!analysisResult) return;
    const blob = new Blob([analysisResult.generatedDocument], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `SDG8_Compliance_Audit_${analysisResult.status}_${Date.now()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerToast("Report downloaded as Markdown.");
  };

  // Metric counts for risk badges
  const highRiskCount =
    analysisResult?.findings.filter((f) => f.severity === "high").length || 0;
  const mediumRiskCount =
    analysisResult?.findings.filter((f) => f.severity === "medium").length || 0;
  const lowRiskCount =
    analysisResult?.findings.filter((f) => f.severity === "low").length || 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col relative selection:bg-orange-500/30 selection:text-orange-200">
      {/* Background ambient light */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial-gradient-orange pointer-events-none -z-10" />

      {/* Sticky Header */}
      <Navbar />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-10">
        {/* HERO SECTION */}
        <section className="text-center space-y-4 max-w-4xl mx-auto pt-2">
          {/* High-contrast SDG 8 Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-orange-500/40 text-orange-400 text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_15px_-3px_rgba(249,115,22,0.25)]">
            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
            <span>UN SDG 8: Decent Work & Economic Growth</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-50 leading-[1.15]">
            Enterprise Labour Compliance &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500">
              SDG 8 Risk Intelligence
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Instantly evaluate operational labor practices, contractor welfare, and supply chain standards against United Nations SDG 8 benchmarks with structured remediation roadmaps.
          </p>

          {/* Quick Pillar Indicators */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-zinc-400">
            <span className="px-2.5 py-1 rounded-md bg-zinc-900/80 border border-zinc-800">
              Target 8.5: Full & Productive Employment
            </span>
            <span className="px-2.5 py-1 rounded-md bg-zinc-900/80 border border-zinc-800">
              Target 8.7: Eradicate Forced Labour
            </span>
            <span className="px-2.5 py-1 rounded-md bg-zinc-900/80 border border-zinc-800">
              Target 8.8: Safe Working Environments
            </span>
          </div>
        </section>

        {/* ONE-CLICK DEMO SCENARIOS */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-300">
                One-Click Demo Scenarios
              </h2>
            </div>
            <span className="text-xs text-zinc-500 hidden sm:inline">
              Select a benchmark case to auto-populate data
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {DEMO_SCENARIOS.map((scenario) => {
              const isSelected = selectedScenario === scenario.id;
              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => handleSelectScenario(scenario)}
                  className={`text-left p-4 rounded-xl border transition-all duration-200 group flex flex-col justify-between ${
                    isSelected
                      ? "bg-orange-500/10 border-orange-500 text-zinc-50 shadow-[0_0_20px_-3px_rgba(249,115,22,0.2)]"
                      : "bg-zinc-900/80 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-300"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <span className="text-xs font-mono font-medium text-orange-400">
                      {scenario.subtitle}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? "bg-orange-500 ring-4 ring-orange-500/20" : "bg-zinc-700"
                      }`}
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-orange-300 transition-colors">
                    {scenario.title}
                  </h3>
                  <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {scenario.text}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* INPUT CARD */}
        <section className="p-5 sm:p-7 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-card-subtle relative overflow-hidden space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-100">
                  Labour Practice &amp; Policy Input
                </h2>
                <p className="text-xs text-zinc-400">
                  Provide audit transcripts, shift policies, contractor terms, or incident reports
                </p>
              </div>
            </div>

            {inputText && (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-zinc-400 hover:text-zinc-200 hover:underline px-2 py-1 rounded"
              >
                Clear Input
              </button>
            )}
          </div>

          {/* Text Area */}
          <div className="space-y-1.5">
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  setSelectedScenario(null);
                }}
                rows={6}
                placeholder="Paste operational policies, labor audit logs, contractor agreements, or worker grievance summaries to analyze against UN SDG 8 benchmarks..."
                className="w-full rounded-xl bg-zinc-950/80 border border-zinc-800 p-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-orange-500 transition-all font-mono leading-relaxed resize-y min-h-[140px]"
              />
              <div className="absolute bottom-3 right-3 text-[11px] font-mono text-zinc-400 bg-zinc-900/90 px-2 py-0.5 rounded border border-zinc-800 pointer-events-none">
                {inputText.length} chars
              </div>
            </div>
          </div>

          {/* File Dropzone */}
          <Dropzone
            onFileLoaded={handleFileLoaded}
            activeFile={attachedFile}
            onClearFile={() => setAttachedFile(null)}
          />

          {/* Prominent Safety Orange CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Info className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span>Simulated 1.2s neural SDG 8 evaluation engine with ILO &amp; OECD alignment</span>
            </div>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isLoading || (!inputText.trim() && !attachedFile)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm text-white bg-orange-500 hover:bg-orange-600 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 transition-all duration-200 shadow-[0_0_20px_-3px_rgba(249,115,22,0.4)] hover:shadow-[0_0_25px_-2px_rgba(249,115,22,0.6)]"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Evaluating SDG 8 Compliance...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Run SDG 8 Compliance Audit</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* OUTPUT SECTION (Grid Layout) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-orange-400" />
              <h2 className="text-lg font-bold text-zinc-50">
                SDG 8 Assessment Results
              </h2>
            </div>

            {/* Export Toolbar */}
            {analysisResult && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyToClipboard}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-colors"
                >
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Copy Report</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadReport}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-orange-500/10 border border-orange-500/30 hover:border-orange-500/60 text-orange-400 hover:text-orange-300 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export .MD</span>
                </button>
              </div>
            )}
          </div>

          {/* If Result is Ready */}
          {analysisResult ? (
            <div className="space-y-6 animate-fadeIn">
              {/* Top Row: Score Ring + Summary + Risk Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Score Meter */}
                <div className="lg:col-span-1">
                  <ScoreMeter
                    score={analysisResult.overallScore}
                    status={analysisResult.status}
                    isLoading={isLoading}
                  />
                </div>

                {/* Executive Summary & Risk Badges */}
                <div className="lg:col-span-2 p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-card-subtle flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-orange-400 font-semibold">
                        Executive Compliance Summary
                      </span>
                      <span className="text-xs text-zinc-400">
                        Evaluated against 10 ILO core indicators
                      </span>
                    </div>

                    <p className="text-sm text-zinc-200 leading-relaxed">
                      {analysisResult.summary}
                    </p>
                  </div>

                  {/* Risk Badges Grid */}
                  <div className="pt-4 border-t border-zinc-800 grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-zinc-950/80 border border-rose-500/20">
                      <div className="text-2xl font-extrabold text-rose-400">
                        {highRiskCount}
                      </div>
                      <div className="text-[11px] font-medium uppercase tracking-wider text-rose-300/80 mt-0.5">
                        High Risk
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-950/80 border border-orange-500/20">
                      <div className="text-2xl font-extrabold text-orange-400">
                        {mediumRiskCount}
                      </div>
                      <div className="text-[11px] font-medium uppercase tracking-wider text-orange-300/80 mt-0.5">
                        Medium Risk
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-950/80 border border-sky-500/20">
                      <div className="text-2xl font-extrabold text-sky-400">
                        {lowRiskCount}
                      </div>
                      <div className="text-[11px] font-medium uppercase tracking-wider text-sky-300/80 mt-0.5">
                        Low Risk
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lower Section: 2 Columns for Findings vs Action Plan */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* Findings Cards */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                      <AlertOctagon className="w-4 h-4 text-orange-400" />
                      <span>Identified Compliance Vulnerabilities</span>
                    </h3>
                    <span className="text-xs text-zinc-400 font-mono">
                      {analysisResult.findings.length} findings
                    </span>
                  </div>

                  <FindingsList findings={analysisResult.findings} />
                </div>

                {/* Action Plan */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                      <FileCheck2 className="w-4 h-4 text-orange-400" />
                      <span>Prioritized SDG 8 Action Roadmap</span>
                    </h3>
                    <span className="text-xs text-zinc-400 font-mono">
                      {analysisResult.actionPlan.length} steps
                    </span>
                  </div>

                  <ActionPlan actionPlan={analysisResult.actionPlan} />
                </div>
              </div>
            </div>
          ) : (
            /* PLACEHOLDER STATE (Zero Layout Shift) */
            <div className="p-10 rounded-2xl bg-zinc-900/60 border border-dashed border-zinc-800 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-orange-400 shadow-[0_0_20px_-5px_rgba(249,115,22,0.2)]">
                <Sliders className="w-7 h-7" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <h3 className="text-base font-semibold text-zinc-200">
                  Ready to Run SDG 8 Compliance Audit
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Select one of the demo scenarios above or upload an operational audit document, then click{" "}
                  <span className="text-orange-400 font-medium">Run SDG 8 Compliance Audit</span>.
                </p>
              </div>

              {/* Sample Outline Preview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4 text-left">
                <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/80 space-y-1.5">
                  <div className="text-xs font-mono font-medium text-orange-400">01. Indicator Score</div>
                  <div className="text-xs text-zinc-400">Calculates automated Decent Work 0-100 index rating.</div>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/80 space-y-1.5">
                  <div className="text-xs font-mono font-medium text-orange-400">02. Risk Severity</div>
                  <div className="text-xs text-zinc-400">Categorizes violations across ILO and SDG 8 indicators.</div>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/80 space-y-1.5">
                  <div className="text-xs font-mono font-medium text-orange-400">03. Corrective Plan</div>
                  <div className="text-xs text-zinc-400">Synthesizes exportable markdown and structured impact metrics.</div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>PromptWars 2026 • SDG 8 Decent Work &amp; Economic Growth Compliance System</span>
          <span className="font-mono text-zinc-400">Obsidian Zinc &amp; Electric Orange Theme</span>
        </div>
      </footer>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-zinc-900 border border-orange-500/40 text-zinc-100 text-xs shadow-2xl shadow-orange-500/10 animate-bounce">
          <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
