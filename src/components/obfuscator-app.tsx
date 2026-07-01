"use client";

import { AppFooter } from "@/components/app-footer";
import { AppHeader } from "@/components/app-header";
import { MetricsPanel } from "@/components/metrics-panel";
import { WechatSandbox } from "@/components/wechat-sandbox";
import { WorkspacePanel } from "@/components/workspace-panel";
import { useObfuscatorWorkspace } from "@/hooks/use-obfuscator-workspace";

export function ObfuscatorApp() {
  const workspace = useObfuscatorWorkspace();

  return (
    <>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-purple-500/5 to-transparent blur-[80px] pointer-events-none z-0 bg-pulse-glow" />

      <AppHeader />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 md:py-12 z-10 flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <WorkspacePanel
              inputText={workspace.inputText}
              outputText={workspace.outputText}
              inputStatus={workspace.inputStatus}
              hasInvisibleChars={workspace.hasInvisibleChars}
              minSize={workspace.minSize}
              maxSize={workspace.maxSize}
              copySuccess={workspace.copySuccess}
              onInputChange={workspace.handleInputChange}
              onMinSizeChange={workspace.handleMinSizeChange}
              onMaxSizeChange={workspace.handleMaxSizeChange}
              onPaste={workspace.handlePaste}
              onClear={workspace.handleClear}
              onCopy={workspace.handleCopy}
            />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <WechatSandbox
              previewText={workspace.wechatPreviewText}
              showToggle={workspace.showWechatToggle}
              isExpanded={workspace.wechatExpanded}
              onToggle={workspace.toggleWechatExpand}
            />
            <MetricsPanel
              safetyPct={workspace.safetyPct}
              safetyLevel={workspace.safetyLevel}
              rloCount={workspace.rloCount}
              groupCount={workspace.groupCount}
            />
          </div>
        </div>
      </main>

      <AppFooter />
    </>
  );
}
