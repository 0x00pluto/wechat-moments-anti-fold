import { Signal, Smartphone } from "lucide-react";

type WechatSandboxProps = {
  previewText: string;
  showToggle: boolean;
  isExpanded: boolean;
  onToggle: () => void;
};

export function WechatSandbox({
  previewText,
  showToggle,
  isExpanded,
  onToggle,
}: WechatSandboxProps) {
  return (
    <div
      id="sim-sandbox"
      className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-2xl relative flex flex-col"
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-900">
        <div className="flex items-center gap-1.5">
          <Smartphone className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-semibold text-slate-200">
            朋友圈效果拟真沙盒
          </span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">Live Sync</span>
      </div>

      <div className="w-full bg-[#191919] text-[#e7e7e7] rounded-xl border border-neutral-800 overflow-hidden font-sans shadow-lg flex flex-col self-center">
        <div className="px-3.5 py-1 text-[9px] text-[#8c8c8c] flex justify-between items-center bg-[#191919] border-b border-[#222]">
          <span className="font-medium">19:26</span>
          <div className="flex items-center gap-1">
            <Signal className="w-2.5 h-2.5" />
            <span className="text-[8px]">5G</span>
            <div className="w-4 h-2 border border-[#8c8c8c]/50 rounded-sm relative flex items-center p-0.5">
              <div className="h-full w-3/4 bg-[#8c8c8c]" />
            </div>
          </div>
        </div>

        <div className="p-4 flex gap-3 text-xs">
          <div className="w-9 h-9 rounded bg-indigo-600 shrink-0 flex items-center justify-center text-white font-bold select-none text-[13px] tracking-wider shadow-md">
            OB
          </div>

          <div className="flex-1 flex flex-col gap-1.5 min-w-0">
            <div className="text-[#576b95] font-semibold text-[13px] hover:underline cursor-pointer">
              防折叠先锋小助手
            </div>

            <div className="text-[#f3f4f6] text-[13px] whitespace-pre-wrap break-all leading-[1.6]">
              {previewText}
            </div>

            {showToggle && (
              <button
                type="button"
                onClick={onToggle}
                className="text-[#576b95] text-[12px] font-medium mt-0.5 cursor-pointer select-none active:text-[#576b95]/70 text-left"
              >
                {isExpanded ? "收起" : "全文"}
              </button>
            )}

            <div className="flex items-center justify-between text-[11px] text-[#7f7f7f] mt-1.5">
              <div className="flex items-center gap-2">
                <span>3分钟前</span>
                <span className="text-[#576b95] cursor-pointer">删除</span>
              </div>
              <div className="w-5 h-3.5 bg-[#252525] rounded-sm flex items-center justify-center gap-0.5 cursor-pointer hover:bg-[#333]">
                <span className="w-1 h-1 rounded-full bg-[#8c8c8c]" />
                <span className="w-1 h-1 rounded-full bg-[#8c8c8c]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-slate-500 mt-3 leading-normal">
        *
        提示：如果文本在上述沙盒内视觉上仍出现顺序倒置或排版残缺，是因为混淆文本遇到了特殊数字/标点阻断，建议根据其分段稍作微调。
      </p>
    </div>
  );
}
