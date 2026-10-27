"use client";

import React from "react";
import { Sliders, RefreshCw } from "lucide-react";
import { WorkerPayload } from "@/lib/types";
import { TranslationStrings } from "@/lib/translations";

/**
 * Interface defining the properties required by the ShiftSimulator component.
 */
export interface ShiftSimulatorProps {
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
  /** Localized translation strings for the current active language. */
  t: TranslationStrings;
  /** Handler invoked when user triggers audit recalculation. */
  onRecalculate: () => void;
}

/**
 * ShiftSimulator Component
 * 
 * Provides an interactive workforce parameter testing environment to simulate
 * shift hours, consecutive days, statutory wage rates, overtime, and safety grievances.
 *
 * @param props - Component configuration properties adhering to {@link ShiftSimulatorProps}.
 * @returns The rendered ShiftSimulator UI card.
 */
export function ShiftSimulator({
  simulatorForm,
  setSimulatorForm,
  isAuditingShift,
  isLoading,
  auditUpdatedPulse,
  t,
  onRecalculate,
}: ShiftSimulatorProps): React.JSX.Element {
  return (
    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-4 shadow-lg">
      <div className="space-y-1">
        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30 uppercase tracking-wide inline-block">
          {t.feature7Badge}
        </span>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-50">{t.feature7Title}</h3>
              <p className="text-[11px] text-zinc-400">{t.feature7Subtitle}</p>
            </div>
          </div>

          {auditUpdatedPulse ? (
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
              {t.auditUpdatedToast}
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-zinc-800 text-zinc-300">
              Custom Audit
            </span>
          )}
        </div>
      </div>

      {/* Parameter Inputs Fully Controlled via simulatorForm */}
      <div className="space-y-3 text-xs">
        <div>
          <label className="text-zinc-400 block font-medium mb-1">
            {t.workerNameLabel}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={simulatorForm.workerName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSimulatorForm((prev) => ({ ...prev, workerName: e.target.value }))
              }
              placeholder="Name"
              className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500 text-xs"
            />
            <input
              type="text"
              value={simulatorForm.workerId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSimulatorForm((prev) => ({ ...prev, workerId: e.target.value }))
              }
              placeholder={t.workerIdLabel}
              className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500 text-xs font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="text-zinc-400 block font-medium mb-1">
              {t.shiftHoursLabel}
            </label>
            <input
              type="number"
              min="1"
              max="24"
              value={simulatorForm.shiftHours}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSimulatorForm((prev) => ({
                  ...prev,
                  shiftHours: Number(e.target.value),
                }))
              }
              className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500 text-xs"
            />
          </div>

          <div>
            <label className="text-zinc-400 block font-medium mb-1">
              {t.consecutiveDaysLabel}
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={simulatorForm.consecutiveDays}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSimulatorForm((prev) => ({
                  ...prev,
                  consecutiveDays: Number(e.target.value),
                }))
              }
              className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500 text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="text-zinc-400 block font-medium mb-1">
              {t.hourlyRateLabel}
            </label>
            <input
              type="number"
              min="50"
              max="2000"
              value={simulatorForm.hourlyRate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSimulatorForm((prev) => ({
                  ...prev,
                  hourlyRate: Number(e.target.value),
                }))
              }
              className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500 text-xs"
            />
          </div>

          <div>
            <label className="text-zinc-400 block font-medium mb-1">
              {t.overtimeHoursLabel}
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={simulatorForm.overtimeHours}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSimulatorForm((prev) => ({
                  ...prev,
                  overtimeHours: Number(e.target.value),
                }))
              }
              className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500 text-xs"
            />
          </div>
        </div>

        <div>
          <label className="text-zinc-400 block font-medium mb-1">
            {t.rawGrievanceLabel}
          </label>
          <textarea
            rows={2}
            value={simulatorForm.grievanceRawText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setSimulatorForm((prev) => ({ ...prev, grievanceRawText: e.target.value }))
            }
            placeholder="Add raw observation..."
            className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500 text-xs resize-none"
          />
        </div>
      </div>

      {/* Audit Submission Button */}
      <button
        type="button"
        onClick={onRecalculate}
        disabled={isAuditingShift || isLoading}
        className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-75"
      >
        <RefreshCw
          className={`w-3.5 h-3.5 ${isAuditingShift || isLoading ? "animate-spin" : ""}`}
        />
        <span>
          {isAuditingShift ? t.recalculatingButton : t.recalculateButton}
        </span>
      </button>
    </div>
  );
}

export default ShiftSimulator;
