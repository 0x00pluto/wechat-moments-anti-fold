"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { TextObfuscator } from "@/lib/text-obfuscator";

const WECHAT_FOLD_LIMIT = 120;
const DEFAULT_PREVIEW =
  "您输入混淆生成的文字，将会在这里实时渲染，以此检查最终呈现在微信聊天框、朋友圈的视觉流是否排布正常！";

export type InputStatus = "empty" | "normal" | "obfuscated";

export type SafetyLevel = "high" | "medium" | "low";

export function useObfuscatorWorkspace() {
  const obfuscatorRef = useRef(new TextObfuscator());

  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [minSize, setMinSize] = useState(3);
  const [maxSize, setMaxSize] = useState(5);
  const [inputStatus, setInputStatus] = useState<InputStatus>("empty");
  const [hasInvisibleChars, setHasInvisibleChars] = useState(false);
  const [rloCount, setRloCount] = useState(0);
  const [groupCount, setGroupCount] = useState(0);
  const [safetyPct, setSafetyPct] = useState(0);
  const [wechatExpanded, setWechatExpanded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const safetyLevel: SafetyLevel = useMemo(() => {
    if (safetyPct > 80) return "high";
    if (safetyPct > 40) return "medium";
    return "low";
  }, [safetyPct]);

  const updateMetrics = useCallback((count: number) => {
    setRloCount(count);
    setGroupCount(count);

    let pct = 0;
    if (count === 0) {
      pct = 10;
    } else {
      pct = Math.min(99, 70 + count * 3);
    }
    setSafetyPct(pct);
  }, []);

  const processText = useCallback(
    (text: string, expanded = wechatExpanded) => {
      if (!text) {
        setOutputText("");
        setInputStatus("empty");
        setHasInvisibleChars(false);
        updateMetrics(0);
        return;
      }

      const obfuscator = obfuscatorRef.current;
      const isAlreadyObfuscated = obfuscator.isObfuscated(text);

      if (isAlreadyObfuscated) {
        setInputStatus("obfuscated");
        setOutputText(text);
        const count = obfuscator.countRlo(text);
        updateMetrics(count);
        setHasInvisibleChars(true);
        return;
      }

      setInputStatus("normal");
      obfuscator.setGroupParams(minSize, maxSize);
      const result = obfuscator.obfuscate(text);
      setOutputText(result);

      const count = obfuscator.countRlo(result);
      updateMetrics(count);
      setHasInvisibleChars(count > 0);

      if (expanded !== wechatExpanded) {
        setWechatExpanded(expanded);
      }
    },
    [minSize, maxSize, updateMetrics, wechatExpanded],
  );

  const handleInputChange = useCallback(
    (value: string) => {
      setInputText(value);
      processText(value);
    },
    [processText],
  );

  const handleMinSizeChange = useCallback(
    (value: number) => {
      const nextMax = value > maxSize ? value : maxSize;
      setMinSize(value);
      if (value > maxSize) {
        setMaxSize(value);
      }
      if (inputText) {
        obfuscatorRef.current.setGroupParams(value, nextMax);
        processText(inputText);
      }
    },
    [inputText, maxSize, processText],
  );

  const handleMaxSizeChange = useCallback(
    (value: number) => {
      setMaxSize(value);
      if (inputText) {
        obfuscatorRef.current.setGroupParams(minSize, value);
        processText(inputText);
      }
    },
    [inputText, minSize, processText],
  );

  const wechatPreviewText = useMemo(() => {
    if (!outputText) return DEFAULT_PREVIEW;

    if (outputText.length > WECHAT_FOLD_LIMIT && !wechatExpanded) {
      return outputText.slice(0, WECHAT_FOLD_LIMIT) + "...";
    }

    return outputText;
  }, [outputText, wechatExpanded]);

  const showWechatToggle = useMemo(() => {
    const text = outputText;
    return Boolean(text && text.length > WECHAT_FOLD_LIMIT);
  }, [outputText]);

  const toggleWechatExpand = useCallback(() => {
    setWechatExpanded((prev) => !prev);
  }, []);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText(text);
        processText(text);
        if (obfuscatorRef.current.isObfuscated(text)) {
          toast.warning("已导入已被混淆的密文文本");
        } else {
          toast.success("已成功载入普通文本");
        }
      } else {
        toast.warning("您的剪贴板为空");
      }
    } catch {
      toast.warning("沙箱运行限制，请使用 Ctrl+V 快捷键手动粘贴");
    }
  }, [processText]);

  const handleCopy = useCallback(() => {
    if (!outputText) {
      toast.warning("当前没有生成结果可复制");
      return;
    }

    try {
      const textarea = document.createElement("textarea");
      textarea.value = outputText;
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      setCopySuccess(true);
      toast.success("文本已拷贝至您的系统剪贴板");

      setTimeout(() => {
        setCopySuccess(false);
      }, 2500);
    } catch {
      toast.error("因权限限制，请直接全选结果框手动复制");
    }
  }, [outputText]);

  const handleClear = useCallback(() => {
    if (!inputText && !outputText) return;
    setInputText("");
    setOutputText("");
    setInputStatus("empty");
    setHasInvisibleChars(false);
    setWechatExpanded(false);
    updateMetrics(0);
    toast.success("工作区已重置");
  }, [inputText, outputText, updateMetrics]);

  return {
    inputText,
    outputText,
    minSize,
    maxSize,
    inputStatus,
    hasInvisibleChars,
    rloCount,
    groupCount,
    safetyPct,
    safetyLevel,
    wechatPreviewText,
    showWechatToggle,
    wechatExpanded,
    copySuccess,
    handleInputChange,
    handleMinSizeChange,
    handleMaxSizeChange,
    toggleWechatExpand,
    handlePaste,
    handleCopy,
    handleClear,
  };
}
