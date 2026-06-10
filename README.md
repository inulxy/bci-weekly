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

## 项目结构

```
src/
├── app/
│   ├── layout.tsx      # 根布局 + 字体导入
│   ├── page.tsx        # 主页面
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
└── data/
    └── weekly-data.ts  # 所有 mock 数据（每周替换这里）
```

## 每周更新流程

1. 打开 `src/data/weekly-data.ts`
2. 修改 `currentWeekMeta`（周次、日期范围、头条）
3. 在 `newsItems` 数组中添加/删除当周条目
4. 在 `companyTrackerData` 中更新公司状态
5. 将上周内容移入 `archiveWeeks`

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS + CSS Variables
- **字体**: Space Grotesk · Inter · JetBrains Mono
- **部署**: Vercel（`vercel deploy`）
