import React from "react";
import { Finding } from "@/lib/types";
import { AlertCircle, AlertTriangle, Info, ArrowUpRight } from "lucide-react";

interface FindingsListProps {
  findings: Finding[];
}

export function FindingsList({ findings }: FindingsListProps) {
  const getSeverityBadge = (severity: Finding["severity"]) => {
    switch (severity) {
      case "high":
        return {
          label: "High Risk",
          bg: "bg-rose-500/10",
          border: "border-rose-500/30",
          text: "text-rose-400",
          icon: AlertCircle,
        };
      case "medium":
        return {
          label: "Medium Risk",
          bg: "bg-orange-500/10",
          border: "border-orange-500/30",
          text: "text-orange-400",
          icon: AlertTriangle,
        };
      case "low":
        return {
          label: "Low Risk",
          bg: "bg-sky-500/10",
          border: "border-sky-500/30",
          text: "text-sky-400",
          icon: Info,
        };
    }
  };

  return (
    <div className="space-y-4">
      {findings.map((item, index) => {
        const badge = getSeverityBadge(item.severity);
        const IconComponent = badge.icon;

        return (
          <div
            key={index}
            className="p-5 rounded-xl bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-200 shadow-sm relative overflow-hidden group"
          >
            {/* Top row: Severity badge & SDG Target Ref */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider ${badge.bg} ${badge.border} ${badge.text} border`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                {badge.label}
              </span>

              <span className="text-[11px] font-mono font-medium text-orange-400/90 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded">
                {item.sdgTargetRef}
              </span>
            </div>

            {/* Title */}
            <h4 className="text-base font-semibold text-zinc-100 group-hover:text-orange-300 transition-colors">
              {item.title}
            </h4>

            {/* Description */}
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
              {item.description}
            </p>

            {/* Recommendation box */}
            <div className="mt-3.5 p-3.5 rounded-lg bg-zinc-950/70 border border-zinc-800 flex items-start gap-2.5 text-xs">
              <div className="w-5 h-5 rounded-md bg-orange-500/10 text-orange-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-zinc-200">
                  Remediation Strategy:{" "}
                </span>
                <span className="text-zinc-300">{item.recommendation}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default FindingsList;
