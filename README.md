# NeuralPulse Weekly

脑机接口领域每周进展追踪网站。

## 快速启动

确保已安装 Node.js 18+，然后在项目目录执行：

```bash
cd ~/bci-weekly
npm install
npm run dev
```

浏览器访问 http://localhost:3000

## 自动生成投行周报

第一版采用“公开源自动抓取 + 人工审核 + 报告页自动渲染”的工作流：

```bash
npm run update:weekly
npm test
npm run dev
```

访问：

- `http://localhost:3000/reports/current`：医药投行风格本周报告
- `http://localhost:3000/admin/review`：候选事件审核台

自动抓取脚本会写入：

- `src/data/generated/weekly-candidates.json`：本周候选事件池
- `src/data/generated/report-snapshot.json`：报告页读取的结构化快照

当前公开源包括 PubMed、arXiv、ClinicalTrials.gov、openFDA。若网络或 API 临时失败，脚本会写入备用示例数据，保证页面不空白。

## 项目结构

```
src/
├── app/
│   ├── layout.tsx      # 根布局 + 字体导入
│   ├── page.tsx        # 主页面
│   ├── reports/current # 投行风格报告页
│   ├── admin/review    # 候选事件审核台
│   └── globals.css     # 全局样式 + 设计 token
├── components/
│   ├── Header.tsx          # 顶部导航（固定 + 毛玻璃效果）
│   ├── HeroSection.tsx     # Hero 区（数字统计 + EEG 波形背景）
│   ├── EegWaveform.tsx     # 动态 EEG 脑电波 SVG 动画
│   ├── NewsFeed.tsx        # 新闻列表 + 分类过滤器
│   ├── NewsCard.tsx        # 单条新闻卡片
│   ├── CompanyTracker.tsx  # 公司进展追踪表格
│   ├── Sidebar.tsx         # 侧边栏（订阅/分类/热词/归档）
│   └── Footer.tsx          # 页脚
├── data/
│   ├── weekly-data.ts       # 首页展示数据
│   └── generated/           # 自动生成的候选事件和报告快照
scripts/
├── fetch-weekly-candidates.mjs # 自动抓取公开源
└── report-builder.mjs          # 生成投行报告快照
```

## 每周更新流程

1. GitHub Actions 每周一自动运行 `npm run update:weekly`
2. 脚本抓取公开源并更新 `src/data/generated/*.json`
3. GitHub 自动提交生成数据，Vercel 检测到提交后重新部署
4. 你打开 `/admin/review` 审核候选事件
5. 对外分享 `/reports/current` 或首页链接

也可以手动触发：

```bash
npm run update:weekly
git add src/data/generated
git commit -m "chore: update weekly BCI candidates"
git push
```

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS + CSS Variables
- **字体**: Space Grotesk · Inter · JetBrains Mono
- **部署**: Vercel（`vercel deploy`）
