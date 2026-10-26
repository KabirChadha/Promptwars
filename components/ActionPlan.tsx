import React from "react";
import { ActionStep } from "@/lib/types";
import { Zap } from "lucide-react";

interface ActionPlanProps {
  actionPlan: ActionStep[];
}

export function ActionPlan({ actionPlan }: ActionPlanProps) {
  return (
    <div className="space-y-3.5">
      {actionPlan.map((stepItem) => (
        <div
          key={stepItem.step}
          className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700/80 transition-all"
        >
          {/* Step Pill */}
          <div className="flex-shrink-0 flex items-center sm:flex-col items-center justify-center w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono font-bold text-xs">
            0{stepItem.step}
          </div>

          {/* Content */}
          <div className="flex-1 space-y-2">
            <p className="text-sm font-medium text-zinc-100 leading-snug">
              {stepItem.action}
            </p>

            {/* Impact Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-950/80 border border-zinc-800 text-xs text-orange-300">
              <Zap className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
              <span className="font-semibold text-zinc-400">Impact:</span>
              <span className="text-zinc-200">{stepItem.impact}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ActionPlan;
