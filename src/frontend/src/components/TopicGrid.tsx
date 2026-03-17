import { motion } from "motion/react";

const TOPICS = [
  {
    id: "partnership",
    icon: "🤝",
    title: "Partnership Accounts",
    bengali: "অংশীদারি হিসাব",
    desc: "Goodwill, Sacrifice Ratio, Revaluation",
  },
  {
    id: "appropriation",
    icon: "📋",
    title: "Appropriation & Capital A/c",
    bengali: "মুনাফা বণ্টন ও মূলধন হিসাব",
    desc: "IOC, Salary, Share of Profit, Drawings",
  },
  {
    id: "depreciation",
    icon: "📉",
    title: "Depreciation",
    bengali: "অবচয়",
    desc: "SLM & WDV Method Schedule",
  },
  {
    id: "npo",
    icon: "🏛️",
    title: "NPO Accounts",
    bengali: "অলাভজনক সংস্থা",
    desc: "Income & Expenditure Account",
  },
  {
    id: "company",
    icon: "🏢",
    title: "Company Accounts",
    bengali: "কোম্পানির হিসাব",
    desc: "Share Issue Journal Entries",
  },
  {
    id: "journal",
    icon: "📖",
    title: "Journal Entries",
    bengali: "জার্নাল এন্ট্রি",
    desc: "Dr/Cr entries with narration",
  },
  {
    id: "cashflow",
    icon: "💰",
    title: "Cash Flow Statement",
    bengali: "নগদ প্রবাহ",
    desc: "Operating, Investing, Financing",
  },
  {
    id: "balancesheet",
    icon: "⚖️",
    title: "Balance Sheet",
    bengali: "উদ্বৃত্তপত্র",
    desc: "Assets & Liabilities check",
  },
  {
    id: "ledger",
    icon: "📊",
    title: "Ledger Accounts",
    bengali: "খতিয়ান",
    desc: "T-format Ledger Posting",
  },
];

interface TopicGridProps {
  activeTopic: string;
  onSelect: (id: string) => void;
}

export function TopicGrid({ activeTopic, onSelect }: TopicGridProps) {
  return (
    <div>
      <h2 className="font-display text-xl font-bold text-navy mb-4">
        Topic Modules
        <span className="block text-sm font-body font-normal text-muted-foreground mt-0.5">
          বিষয় মডিউল
        </span>
      </h2>
      <div className="grid grid-cols-2 gap-3" data-ocid="topics.list">
        {TOPICS.map((topic, i) => (
          <motion.button
            key={topic.id}
            onClick={() => onSelect(topic.id)}
            data-ocid={`topics.item.${i + 1}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className={`text-left p-3 rounded-xl border transition-all shadow-xs hover:shadow-card ${
              activeTopic === topic.id
                ? "border-navy bg-navy text-white shadow-card"
                : "border-border bg-card hover:border-navy/30"
            }`}
          >
            <div className="flex items-start gap-2">
              <span className="text-2xl leading-none mt-0.5">{topic.icon}</span>
              <div className="min-w-0">
                <div
                  className={`font-semibold text-sm leading-tight truncate ${
                    activeTopic === topic.id ? "text-white" : "text-navy"
                  }`}
                >
                  {topic.title}
                </div>
                <div
                  className={`text-xs mt-0.5 ${
                    activeTopic === topic.id
                      ? "text-white/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {topic.bengali}
                </div>
                <div
                  className={`text-[11px] mt-1 hidden sm:block ${
                    activeTopic === topic.id
                      ? "text-white/60"
                      : "text-muted-foreground/70"
                  }`}
                >
                  {topic.desc}
                </div>
              </div>
            </div>
            {activeTopic === topic.id && (
              <div className="mt-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="text-[10px] text-gold font-semibold">
                  ACTIVE
                </span>
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
