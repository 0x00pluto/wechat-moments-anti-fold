"use client";

import {
  Clipboard,
  Copy,
  Edit3,
  Info,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import type { InputStatus } from "@/hooks/use-obfuscator-workspace";

type WorkspacePanelProps = {
  inputText: string;
  outputText: string;
  inputStatus: InputStatus;
  hasInvisibleChars: boolean;
  minSize: number;
  maxSize: number;
  copySuccess: boolean;
  onInputChange: (value: string) => void;
  onMinSizeChange: (value: number) => void;
  onMaxSizeChange: (value: number) => void;
  onPaste: () => void;
  onClear: () => void;
  onCopy: () => void;
};

function InputStatusBadge({ status }: { status: InputStatus }) {
  if (status === "empty") return null;

  if (status === "obfuscated") {
    return (
      <Badge
        variant="outline"
        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border-amber-500/20 flex items-center gap-1"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        检测到已混淆
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border-emerald-500/20 flex items-center gap-1"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      普通正常文本
    </Badge>
  );
}

export function WorkspacePanel({
  inputText,
  outputText,
  inputStatus,
  hasInvisibleChars,
  minSize,
  maxSize,
  copySuccess,
  onInputChange,
  onMinSizeChange,
  onMaxSizeChange,
  onPaste,
  onClear,
  onCopy,
}: WorkspacePanelProps) {
  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-2xl p-5 md:p-6 shadow-2xl relative">
      <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2 flex-wrap">
          <Edit3 className="w-4 h-4 text-indigo-400" />
          <span>输入待处理文案</span>
          <InputStatusBadge status={inputStatus} />
        </span>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onPaste}
            className="text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border-slate-700/60 h-auto px-3 py-1.5"
          >
            <Clipboard className="w-3.5 h-3.5 text-slate-400" />
            从剪贴板粘贴
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClear}
            className="text-xs font-medium bg-slate-900 hover:bg-slate-800 text-rose-400 border-slate-800 hover:border-rose-950 h-auto px-3 py-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            清空
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <div className="relative group">
            <Textarea
              value={inputText}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="请在这里输入或粘贴您要混淆防折叠的常规文本..."
              className="w-full h-72 p-4 bg-slate-950/80 border-slate-800 rounded-xl focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20 text-sm leading-relaxed text-slate-100 placeholder:text-slate-600 resize-none shadow-none"
            />
            <div className="absolute bottom-3 left-4 text-[10px] text-slate-500 pointer-events-none">
              {inputText.length} 字符
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="relative">
            <Textarea
              value={outputText}
              readOnly
              placeholder="混淆生成防折叠结果将在这里即时呈现..."
              className="w-full h-72 p-4 bg-slate-950/40 border-slate-900 rounded-xl text-sm leading-relaxed text-slate-300 placeholder:text-slate-700 resize-none shadow-none focus-visible:ring-0"
            />
            <div className="absolute bottom-3 left-4 text-[10px] text-slate-500 flex items-center gap-2 pointer-events-none">
              <span>{outputText.length} 字符</span>
              {hasInvisibleChars && (
                <span className="text-indigo-400">包含不占宽控制符</span>
              )}
            </div>

            <Button
              type="button"
              size="sm"
              onClick={onCopy}
              className={cn(
                "absolute bottom-3 right-3 flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xl h-auto active:scale-95",
                copySuccess
                  ? "bg-emerald-600 text-white hover:bg-emerald-600"
                  : "bg-white text-slate-950 hover:bg-indigo-50 hover:text-indigo-950",
              )}
            >
              <Copy className="w-3.5 h-3.5" />
              {copySuccess ? "已成功复制" : "一键复制"}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-slate-900/80 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex flex-wrap items-center gap-6 w-full md:w-auto">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
              最小混淆段落:
            </span>
            <Slider
              min={2}
              max={4}
              step={1}
              value={[minSize]}
              onValueChange={([value]) => onMinSizeChange(value)}
              className="w-24 [&_[data-slot=slider-track]]:bg-slate-800 [&_[data-slot=slider-range]]:bg-indigo-500"
            />
            <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/15">
              {minSize}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
              最大混淆段落:
            </span>
            <Slider
              min={4}
              max={8}
              step={1}
              value={[maxSize]}
              onValueChange={([value]) => onMaxSizeChange(value)}
              className="w-24 [&_[data-slot=slider-track]]:bg-slate-800 [&_[data-slot=slider-range]]:bg-indigo-500"
            />
            <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/15">
              {maxSize}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 whitespace-nowrap self-end md:self-auto">
          <Info className="w-3.5 h-3.5 text-slate-500" />
          <span>段落数值影响字符在底层分割逆序的单位尺寸</span>
        </div>
      </div>
    </div>
  );
}
