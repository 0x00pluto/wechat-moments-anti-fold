import { Gauge } from "lucide-react";

import { cn } from "@/lib/utils";

import type { SafetyLevel } from "@/hooks/use-obfuscator-workspace";

type MetricsPanelProps = {
  safetyPct: number;
  safetyLevel: SafetyLevel;
  rloCount: number;
  groupCount: number;
};

const progressGradients: Record<SafetyLevel, string> = {
  high: "bg-gradient-to-r from-teal-500 to-emerald-500",
  medium: "bg-gradient-to-r from-indigo-500 to-purple-500",
  low: "bg-gradient-to-r from-amber-500 to-orange-500",
};

export function MetricsPanel({
  safetyPct,
  safetyLevel,
  rloCount,
  groupCount,
}: MetricsPanelProps) {
  return (
    <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-2xl">
      <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-slate-900">
        <Gauge className="w-4 h-4 text-emerald-400" />
        <span className="text-xs font-semibold text-slate-200">
          文本物理状态安全指标
        </span>
      </div>

      <div className="flex flex-col gap-3.5">
        <div>
          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
            <span>算法绕过成功率估计</span>
            <span className="font-mono text-emerald-400">{safetyPct}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-300",
                progressGradients[safetyLevel],
              )}
              style={{ width: `${safetyPct}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center pt-1">
          <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-900">
            <div className="text-xs font-mono font-semibold text-indigo-400">
              {rloCount}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">重排控制符数</div>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-900">
            <div className="text-xs font-mono font-semibold text-purple-400">
              {groupCount}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">总混淆分组数</div>
          </div>
        </div>
      </div>
    </div>
  );
}
