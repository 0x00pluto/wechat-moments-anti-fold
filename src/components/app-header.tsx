import { ShieldAlert, Smartphone } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function AppHeader() {
  return (
    <header className="border-b border-slate-900/80 bg-slate-950/60 backdrop-blur-xl sticky top-0 z-40 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-65 group-hover:opacity-100 transition duration-300" />
            <div className="relative bg-slate-900 border border-slate-800 p-2.5 rounded-xl shadow-inner flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <h1 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
              防折叠黑科技{" "}
              <Badge
                variant="outline"
                className="text-[10px] bg-indigo-500/10 text-indigo-400 border-indigo-500/20 px-1.5 py-0.5 rounded font-medium"
              >
                PRO
              </Badge>
            </h1>
            <p className="text-[11px] text-slate-400">
              基于 RLO 与 PDF 隐形重排技术的防折叠工具
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center">
          <a
            href="#sim-sandbox"
            className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1.5 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>朋友圈模拟沙盒</span>
          </a>
        </div>
      </div>
    </header>
  );
}
