export type Project = {
  id: "quill" | "sleuth" | "influx";
  name: string;
  codename: string;
  title: string;
  tagline: string;
  accent: string;
  features: string[];
  tags: string[];
  repo: string;
};

export type Experience = {
  company: string;
  role: string;
  context: string;
  location: string;
  period: string;
  points: string[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export const profile = {
  name: "Yogesh Gupta Gudipati",
  role: "Senior Data Scientist",
  positioning: "Risk · Machine Learning · Agentic AI",
  location: "Dallas, TX",
  email: "yogeshgudipati@gmail.com",
  linkedin: "https://www.linkedin.com/in/yogeshguptagudipati/",
  github: "https://github.com/yogeshg665",
  resumeUrl: "/Yogesh-Gupta-Gudipati-Resume.pdf",
  heroLine:
    "I build detection systems and agentic AI that turn noisy signals into confident, explainable decisions.",
  summary:
    "Senior Data Scientist with 8+ years across risk management, fraud detection, and applied machine learning at multi-billion-dollar scale. I own production ML end to end — from feature engineering and calibration to MLOps, monitoring, and multi-agent systems — with a track record of $25M+ in modeled cost savings.",
};

export const metrics: { value: string; label: string }[] = [
  { value: "$25M+", label: "Modeled cost savings" },
  { value: "8+", label: "Years in risk & ML" },
  { value: "60%", label: "Fewer false-positive reviews" },
  { value: "50%", label: "Fewer LLM hallucinations" },
  { value: "45%", label: "More decision transparency" },
  { value: "50%", label: "Seller-loss reduction" },
];

export const projects: Project[] = [
  {
    id: "quill",
    name: "Quill",
    codename: "Quill",
    title: "AI Robinhood Agent",
    tagline:
      "Deterministic, risk-governed multi-agent trading engine for US equities.",
    accent: "#16c784",
    features: [
      "Strategy swarm proposes orders; an independent risk guardian has final say",
      "Ten deterministic risk checks (PDT, wash-sale, buying power, liquidity, …)",
      "Paper-mode default; live trading double-gated and human-approved",
    ],
    tags: ["Deterministic", "Risk-guardian veto", "Paper-mode default"],
    repo: "https://github.com/yogeshg665/quill-trading-agent",
  },
  {
    id: "sleuth",
    name: "Sleuth",
    codename: "Sleuth",
    title: "AI Payment Fraud Investigator",
    tagline:
      "Explainable, deterministic payment-fraud investigations end to end.",
    accent: "#f5a524",
    features: [
      "Lifecycle: intake, enrichment, detection, scoring, decisioning, reporting",
      "Every signal cites its rationale; scoring and decisions stay deterministic",
      "Tokenized card references; human-review gates before customer impact",
    ],
    tags: ["Deterministic", "Tokenized card refs", "Human-review gates"],
    repo: "https://github.com/yogeshg665/sleuth-fraud-investigator",
  },
  {
    id: "influx",
    name: "Influx",
    codename: "Influx",
    title: "AI Inflow Transaction Monitor",
    tagline:
      "Deterministic monitoring of inbound transactions and suspicious inflows.",
    accent: "#2dd4bf",
    features: [
      "Detection swarm runs every detector independently and isolates failures",
      "Each flag is explainable and cites the signals that produced it",
      "Pseudonymous identifiers; human-review provisions before any action",
    ],
    tags: ["Deterministic", "Pseudonymous IDs", "Human-review gates"],
    repo: "https://github.com/yogeshg665/influx-inflow-monitor",
  },
];

export const experience: Experience[] = [
  {
    company: "Microsoft",
    role: "Senior Data Scientist — Account Reputation & Trust",
    context: "via Centific Technologies",
    location: "Dallas, TX",
    period: "Sep 2023 — Present",
    points: [
      "Own a production ML system (Queue Prioritization Score) — LightGBM on Azure ML with a scikit-learn pipeline, ColumnTransformer, and ONNX export served through a modern prediction service.",
      "Built MLOps with automated retraining and a pre-deployment gate on AUC and TPR at fixed low false-positive rates.",
      "Engineered features over Risk Data Attributes with out-of-time holdouts, target encoding, and importance-driven selection.",
      "Drove loss-prevention detectors across Azure, M365, Anthropic, and Xbox — contributing to $25M+ in savings.",
      "Built multi-agent anomaly triage with Semantic Kernel and Azure OpenAI plus RAG over Azure AI Search: false positives −60%, hallucinations −50%, transparency +45%.",
    ],
  },
  {
    company: "Amazon",
    role: "Risk Manager — Payment & Fraud Risk Analysis",
    context: "",
    location: "Hyderabad, India",
    period: "Jul 2017 — Dec 2021",
    points: [
      "Built a full-stack fraud investigation tool (C# / ASP.NET Core) and Python analytics pipelines.",
      "Stood up the Bengaluru and Costa Rica sites and managed 40 analysts across three locations.",
      "Applied graph analytics and a similar-accounts classifier for network-level fraud detection.",
      "Identified a money-laundering pattern that drove a global policy change.",
      "Reduced platform seller losses by 50% across phishing, credential-stuffing, AML, and KYC.",
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: "ML Engineering",
    items: [
      "LightGBM",
      "XGBoost",
      "scikit-learn",
      "PyTorch",
      "Feature engineering",
      "Calibration",
      "Monitoring",
    ],
  },
  {
    label: "MLOps",
    items: [
      "Azure ML",
      "ONNX",
      "Automated retraining",
      "Validation gates",
      "A/B testing",
      "Azure DevOps",
    ],
  },
  {
    label: "Agentic AI",
    items: [
      "Multi-agent systems",
      "RAG",
      "Semantic Kernel",
      "Azure OpenAI",
      "Vector search",
      "Prompt engineering",
    ],
  },
  {
    label: "Cloud & Data",
    items: [
      "Synapse",
      "Microsoft Fabric",
      "Azure AI Search",
      "Databricks",
      "Cosmos DB",
      "Power BI",
      "PySpark",
      "SQL",
    ],
  },
];

export const education = {
  degree: "M.S. in Statistics, Data Science",
  school: "California State University, East Bay",
  detail: "GPA 3.77 · Aug 2021 — May 2023",
};
