import React from "react";
import { ShieldAlert, ShieldCheck, AlertTriangle, LucideIcon } from "lucide-react";

/**
 * Interface defining properties for the ScoreMeter circular gauge component.
 */
export interface ScoreMeterProps {
  /** Numeric statutory compliance score out of 100. */
  score: number;
  /** Categorical status level for compliance rating. */
  status: "Critical" | "Warning" | "Compliant";
  /** Optional loading state rendering evaluation pulse placeholder. */
  isLoading?: boolean;
}

/**
 * ScoreMeter Component
 *
 * Renders an animated SVG circular gauge displaying statutory audit rating,
 * color-coded status badges, and explanatory baseline alignment narratives.
 *
 * @param props - Component configuration properties adhering to {@link ScoreMeterProps}.
 * @returns The rendered circular score meter.
 */
export function ScoreMeter({
  score,
  status,
  isLoading = false,
}: ScoreMeterProps): React.JSX.Element {
  // SVG circular gauge math
  const size = 160;
  const strokeWidth = 12;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getStatusColor = (): {
    stroke: string;
    text: string;
    bg: string;
    border: string;
    icon: LucideIcon;
  } => {
    switch (status) {
      case "Critical":
        return {
          stroke: "#f43f5e", // rose-500
          text: "text-rose-400",
          bg: "bg-rose-500/10",
          border: "border-rose-500/30",
          icon: ShieldAlert,
        };
      case "Warning":
        return {
          stroke: "#f97316", // orange-500
          text: "text-orange-400",
          bg: "bg-orange-500/10",
          border: "border-orange-500/30",
          icon: AlertTriangle,
        };
      case "Compliant":
        return {
          stroke: "#10b981", // emerald-500
          text: "text-emerald-400",
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/30",
          icon: ShieldCheck,
        };
    }
  };

  const statusStyle = getStatusColor();
  const StatusIcon = statusStyle.icon;

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 shadow-card-subtle relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-radial-gradient-orange opacity-40 pointer-events-none" />

      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Track Circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#27272a"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress Stroke */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={statusStyle.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={isLoading ? circumference : strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-3xl font-extrabold text-zinc-500 animate-pulse">--</span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                Evaluating
              </span>
            </div>
          ) : (
            <>
              <span className="text-4xl font-extrabold text-zinc-50 tracking-tight">
                {score}
              </span>
              <span className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-widest">
                / 100 Index
              </span>
            </>
          )}
        </div>
      </div>

      {/* Status Badge */}
      <div className="mt-4 flex flex-col items-center gap-1.5">
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${statusStyle.bg} ${statusStyle.border} ${statusStyle.text} border`}
        >
          <StatusIcon className="w-3.5 h-3.5" />
          <span>{status} Rating</span>
        </div>
        <p className="text-xs text-zinc-400 text-center max-w-[200px]">
          {status === "Critical"
            ? "Severe labour rights or workplace hazard violations detected."
            : status === "Warning"
            ? "Moderate compliance gaps requiring timely remediation."
            : "Strong alignment with UN SDG 8 baseline standards."}
        </p>
      </div>
    </div>
  );
}

export default ScoreMeter;
