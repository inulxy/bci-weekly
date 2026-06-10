export type Category =
  | "学术论文"
  | "公司动态"
  | "临床进展"
  | "技术突破"
  | "政策法规"
  | "投融资"
  | "会议活动";

export type Importance = 1 | 2 | 3;

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: Category;
  importance: Importance;
  date: string;
  tags: string[];
  source: string;
  sourceUrl: string;
}

export interface CompanyStatus {
  name: string;
  country: string;
  stage: string;
  status: string;
  highlight: string;
  lastUpdated: string;
  trend: "up" | "stable" | "pending";
}

export interface WeekMeta {
  weekNumber: number;
  year: number;
  dateRange: string;
  totalPapers: number;
  totalFunding: number;
  totalClinical: number;
  totalRegulatory: number;
  headline: string;
}

export const currentWeekMeta: WeekMeta = {
  weekNumber: 23,
  year: 2026,
  dateRange: "2026.06.01 – 06.07",
  totalPapers: 14,
  totalFunding: 4,
  totalClinical: 3,
  totalRegulatory: 2,
  headline: "Neuralink 完成第 10 例人体植入，斯坦福团队发布高密度无线皮层阵列",
};

export const newsItems: NewsItem[] = [
  {
    id: "n001",
    title: "Neuralink N1 芯片完成第 10 例人体植入手术",
    summary:
      "Neuralink 宣布其 N1 芯片已在第 10 名受试者体内成功植入，该受试者为颈椎脊髓损伤患者。术后 48 小时信号质量优异，1024 个电极中有效通道超过 970 个，创下历史最高记录。团队称解码延迟已降至 18ms。",
    category: "临床进展",
    importance: 3,
    date: "2026-06-04",
    tags: ["Neuralink", "N1芯片", "人体试验", "脊髓损伤"],
    source: "Neuralink Blog",
    sourceUrl: "https://neuralink.com",
  },
  {
    id: "n002",
    title: "斯坦福发布 NeuroPixel-W：无线高密度皮层阵列",
    summary:
      "斯坦福大学 Shenoy 实验室在 Nature Neuroscience 发表论文，展示新型无线皮层阵列 NeuroPixel-W，在非人灵长类动物实验中同时记录超过 4096 个神经元，功耗仅 8mW，续航 14 小时。",
    category: "学术论文",
    importance: 3,
    date: "2026-06-02",
    tags: ["斯坦福", "皮层阵列", "神经记录", "无线"],
    source: "Nature Neuroscience",
    sourceUrl: "https://www.nature.com/neuro",
  },
  {
    id: "n003",
    title: "Synchron 完成 C 轮 1.5 亿美元融资",
    summary:
      "血管内 BCI 公司 Synchron 宣布完成 C 轮融资，总额 1.5 亿美元，由 Khosla Ventures 领投，微软创始人 Bill Gates 参投。融资将用于扩大 Stentrode 设备的临床试验规模至 50 例。",
    category: "投融资",
    importance: 3,
    date: "2026-06-03",
    tags: ["Synchron", "融资", "Stentrode", "血管内BCI"],
    source: "TechCrunch",
    sourceUrl: "https://techcrunch.com",
  },
  {
    id: "n004",
    title: "FDA 授予 Precision Neuroscience 皮层记录贴片 Breakthrough 认定",
    summary:
      "FDA 向 Precision Neuroscience 的 Layer 7 皮层记录贴片授予突破性医疗器械认定（BTD），该贴片可通过颅骨切缝植入，覆盖面积是传统电极的 6 倍，用于难治性癫痫的长期监测。",
    category: "政策法规",
    importance: 2,
    date: "2026-06-05",
    tags: ["FDA", "Precision Neuroscience", "突破性认定", "癫痫"],
    source: "FDA.gov",
    sourceUrl: "https://fda.gov",
  },
  {
    id: "n005",
    title: "MIT 团队实现非侵入式 BCI 跨颅控制机械臂，准确率 94%",
    summary:
      "MIT 媒体实验室发表论文展示全新功能性近红外光谱（fNIRS）结合 EEG 的混合解码方案，受试者仅需佩戴轻量级头带即可以 94.3% 准确率控制 6 自由度机械臂，较前代系统提升 22 个百分点。",
    category: "技术突破",
    importance: 3,
    date: "2026-06-01",
    tags: ["MIT", "非侵入式", "fNIRS", "机械臂控制"],
    source: "Science Robotics",
    sourceUrl: "https://www.science.org/journal/scirobotics",
  },
  {
    id: "n006",
    title: "欧盟《神经数据保护条例》草案进入公示阶段",
    summary:
      "欧洲议会发布《神经数据保护条例》（NDPR）草案公示稿，该条例将神经信号数据纳入与基因数据同等级别的特殊类个人数据，要求 BCI 设备运营商在欧盟境内设置本地数据处理节点，公示期持续至 2026 年 9 月。",
    category: "政策法规",
    importance: 2,
    date: "2026-06-06",
    tags: ["欧盟", "神经数据", "隐私保护", "NDPR"],
    source: "European Parliament",
    sourceUrl: "https://europarl.europa.eu",
  },
  {
    id: "n007",
    title: "语言解码 BCI 新突破：静默语音重建词汇量扩展至 5 万词",
    summary:
      "加州大学旧金山分校 Chang 实验室在 NEJM 发表成果，其语言皮层 BCI 系统将可解码词汇量从 1250 词扩展到 5 万词，在 ALS 患者测试中实现每分钟 78 词的流畅对话，接近正常语速。",
    category: "学术论文",
    importance: 3,
    date: "2026-06-03",
    tags: ["UCSF", "语言解码", "ALS", "皮层BCI"],
    source: "New England Journal of Medicine",
    sourceUrl: "https://nejm.org",
  },
  {
    id: "n008",
    title: "BrainGate 临床试验更新：无线版本 Freedom 完成 2 年随访",
    summary:
      "BrainGate 联盟发布无线 BCI 系统 Freedom 的 2 年随访数据，4 名受试者中 3 名保持稳定信号质量，未出现严重不良事件，最长使用时长累计超过 1400 小时。信号衰减率低于预期值 30%。",
    category: "临床进展",
    importance: 2,
    date: "2026-06-04",
    tags: ["BrainGate", "无线BCI", "随访数据", "临床试验"],
    source: "Journal of Neural Engineering",
    sourceUrl: "https://iopscience.iop.org/journal/1741-2552",
  },
  {
    id: "n009",
    title: "浙江大学发布国产柔性电极阵列，弯曲半径达 0.3mm",
    summary:
      "浙大郑筱祥团队在 Advanced Materials 发表柔性神经探针研究，采用液态金属与生物可降解聚合物复合结构，弯曲半径 0.3mm，体内 6 个月后信号-噪声比仍优于传统硅探针，并通过了医疗器械注册检测。",
    category: "技术突破",
    importance: 2,
    date: "2026-06-02",
    tags: ["浙大", "柔性电极", "国产BCI", "神经探针"],
    source: "Advanced Materials",
    sourceUrl: "https://onlinelibrary.wiley.com/journal/15214095",
  },
  {
    id: "n010",
    title: "SfN 2026 年会摘要截止日期：6 月 30 日",
    summary:
      "神经科学学会（Society for Neuroscience）2026 年年会将于 11 月 15-19 日在芝加哥举办，预计参会人数超过 30,000 人，今年新增 BCI 专题分会场。摘要投稿截止日期为 2026 年 6 月 30 日。",
    category: "会议活动",
    importance: 1,
    date: "2026-06-01",
    tags: ["SfN", "神经科学年会", "会议", "摘要投稿"],
    source: "SfN Official",
    sourceUrl: "https://sfn.org",
  },
  {
    id: "n011",
    title: "国内首家神经接口专项基金成立，规模 20 亿元",
    summary:
      "上海市政府与多家头部创投联合宣布成立「神经接口产业基金」，规模 20 亿元人民币，重点投资皮层电极材料、ASIC 解码芯片和临床康复应用三大方向，首批拟投项目 8 个。",
    category: "投融资",
    importance: 2,
    date: "2026-06-05",
    tags: ["国内投融资", "神经接口基金", "政策支持", "上海"],
    source: "上海市政府官网",
    sourceUrl: "https://www.shanghai.gov.cn",
  },
  {
    id: "n012",
    title: "transformer 架构用于跨被试神经信号解码，泛化性提升 41%",
    summary:
      "Google DeepMind 与哈佛大学合作团队将大规模预训练 transformer 模型应用于皮层宽场成像数据，实现跨被试零样本泛化，准确率较传统 RNN 方法提升 41%，将推动 BCI 临床普及中的个体化校准问题。",
    category: "学术论文",
    importance: 2,
    date: "2026-06-06",
    tags: ["DeepMind", "transformer", "跨被试", "解码算法"],
    source: "arXiv",
    sourceUrl: "https://arxiv.org",
  },
];

export const companyTrackerData: CompanyStatus[] = [
  {
    name: "Neuralink",
    country: "🇺🇸",
    stage: "Phase I",
    status: "人体试验 N=10",
    highlight: "第 10 例完成，有效通道率 94.7%",
    lastUpdated: "2026-W23",
    trend: "up",
  },
  {
    name: "Synchron",
    country: "🇺🇸",
    stage: "Phase II",
    status: "扩大临床 N→50",
    highlight: "C 轮 $150M 完成，扩招临床中心",
    lastUpdated: "2026-W23",
    trend: "up",
  },
  {
    name: "Precision Neuroscience",
    country: "🇺🇸",
    stage: "Phase I",
    status: "FDA BTD 获批",
    highlight: "Layer 7 贴片获突破性医疗器械认定",
    lastUpdated: "2026-W23",
    trend: "up",
  },
  {
    name: "BrainGate",
    country: "🇺🇸",
    stage: "Phase I/II",
    status: "长期随访中",
    highlight: "Freedom 无线版 2 年随访数据发布",
    lastUpdated: "2026-W23",
    trend: "stable",
  },
  {
    name: "Paradromics",
    country: "🇺🇸",
    stage: "Pre-clinical",
    status: "灵长类验证",
    highlight: "Connexus 系统非人灵长类实验进行中",
    lastUpdated: "2026-W21",
    trend: "stable",
  },
  {
    name: "Blackrock Neurotech",
    country: "🇺🇸",
    stage: "Phase II",
    status: "商业化推进",
    highlight: "MoveAgain 获 CE 认证，进入欧洲市场",
    lastUpdated: "2026-W22",
    trend: "up",
  },
  {
    name: "浙大脑机团队",
    country: "🇨🇳",
    stage: "Phase I",
    status: "国内首批植入",
    highlight: "柔性电极完成注册检测，临床IND申请中",
    lastUpdated: "2026-W23",
    trend: "up",
  },
  {
    name: "天桥脑科学研究院",
    country: "🇨🇳",
    stage: "Pre-clinical",
    status: "基础研究",
    highlight: "资助国内高密度电极阵列研发项目 8 项",
    lastUpdated: "2026-W20",
    trend: "pending",
  },
];

export const categoryConfig: Record<
  Category,
  { color: string; bg: string; icon: string }
> = {
  学术论文: { color: "#00D4FF", bg: "rgba(0, 212, 255, 0.1)", icon: "◈" },
  公司动态: { color: "#A78BFA", bg: "rgba(167, 139, 250, 0.1)", icon: "◉" },
  临床进展: { color: "#1EE8A0", bg: "rgba(30, 232, 160, 0.1)", icon: "⊕" },
  技术突破: { color: "#F5A624", bg: "rgba(245, 166, 36, 0.1)", icon: "◆" },
  政策法规: { color: "#FF7B54", bg: "rgba(255, 123, 84, 0.1)", icon: "◐" },
  投融资: { color: "#F5A624", bg: "rgba(245, 166, 36, 0.08)", icon: "◎" },
  会议活动: { color: "#7A95B0", bg: "rgba(122, 149, 176, 0.1)", icon: "◇" },
};

export const archiveWeeks = [
  { week: 22, dateRange: "2026.05.25–05.31", itemCount: 11 },
  { week: 21, dateRange: "2026.05.18–05.24", itemCount: 9 },
  { week: 20, dateRange: "2026.05.11–05.17", itemCount: 13 },
  { week: 19, dateRange: "2026.05.04–05.10", itemCount: 8 },
  { week: 18, dateRange: "2026.04.27–05.03", itemCount: 10 },
  { week: 17, dateRange: "2026.04.20–04.26", itemCount: 7 },
];
