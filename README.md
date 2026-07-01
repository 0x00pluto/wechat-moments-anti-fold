# 防折叠黑科技

朋友圈防折叠文案混淆工具。基于 RLO / PDF 隐形重排，本地处理、即时预览。

**在线访问：** [pyq.t.xds365.com](https://pyq.t.xds365.com)

## 功能

- 输入文案，实时生成防折叠混淆结果
- 自动识别已混淆文本，避免重复处理
- 可调混淆段落参数
- 朋友圈效果拟真预览
- 文本安全指标诊断

## 技术栈

Next.js · React · TypeScript · Tailwind CSS · shadcn/ui

## 本地开发

```bash
pnpm install
pnpm dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)。

```bash
pnpm build   # 构建
pnpm start   # 生产模式启动
pnpm lint    # 代码检查
```

## 说明

所有文本处理均在浏览器本地完成，不上传服务器。
