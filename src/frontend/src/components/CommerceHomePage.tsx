import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart2,
  BookOpen,
  Calculator,
  Monitor,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";

interface CommerceHomePageProps {
  onSelect: (subject: string, classLevel: number) => void;
}

const subjects = [
  {
    id: "accountancy",
    label: "Accountancy",
    bengali: "হিসাববিজ্ঞান",
    icon: BookOpen,
    borderColor: "rgba(45, 212, 191, 0.3)",
    iconColor: "#2dd4bf",
    iconBg: "rgba(45, 212, 191, 0.15)",
    btnStyle: {
      background: "rgba(45,212,191,0.2)",
      color: "#2dd4bf",
      border: "1px solid rgba(45,212,191,0.3)",
    },
    desc: "Partnership, Depreciation, NPO, Company Accounts, Cash Flow, Journal Entry — WBCHSE ও Calcutta University",
  },
  {
    id: "businessstudies",
    label: "Business Studies",
    bengali: "ব্যবসায় শিক্ষা",
    icon: ShoppingBag,
    borderColor: "rgba(96, 180, 255, 0.3)",
    iconColor: "#60b4ff",
    iconBg: "rgba(96, 180, 255, 0.15)",
    btnStyle: {
      background: "rgba(96,180,255,0.2)",
      color: "#60b4ff",
      border: "1px solid rgba(96,180,255,0.3)",
    },
    desc: "ব্যবসার প্রকৃতি, সংগঠন, ব্যবস্থাপনা, বিপণন ও আর্থিক পরিকল্পনা",
  },
  {
    id: "economics",
    label: "Economics",
    bengali: "অর্থনীতি",
    icon: TrendingUp,
    borderColor: "rgba(52, 211, 153, 0.3)",
    iconColor: "#34d399",
    iconBg: "rgba(52, 211, 153, 0.15)",
    btnStyle: {
      background: "rgba(52,211,153,0.2)",
      color: "#34d399",
      border: "1px solid rgba(52,211,153,0.3)",
    },
    desc: "চাহিদা-যোগান, বাজার, GDP, অর্থনৈতিক নীতি ও ভারতীয় অর্থনীতি",
  },
  {
    id: "commercialmathematics",
    label: "Commercial Mathematics",
    bengali: "বাণিজ্যিক গণিত",
    icon: Calculator,
    borderColor: "rgba(245, 200, 66, 0.3)",
    iconColor: "#f5c842",
    iconBg: "rgba(245, 200, 66, 0.15)",
    btnStyle: {
      background: "rgba(245,200,66,0.2)",
      color: "#f5c842",
      border: "1px solid rgba(245,200,66,0.3)",
    },
    desc: "সুদ, মুনাফা, বাট্টা, পরিসংখ্যান, সম্ভাবনা ও ক্ষতিপূরণ",
  },
  {
    id: "computerapplication",
    label: "Computer Application",
    bengali: "কম্পিউটার অ্যাপ্লিকেশন",
    icon: Monitor,
    borderColor: "rgba(192, 132, 252, 0.3)",
    iconColor: "#c084fc",
    iconBg: "rgba(192, 132, 252, 0.15)",
    btnStyle: {
      background: "rgba(192,132,252,0.2)",
      color: "#c084fc",
      border: "1px solid rgba(192,132,252,0.3)",
    },
    desc: "কম্পিউটার মূলনীতি, MS Office, ডেটাবেস, HTML, ই-কমার্স",
  },
];

const glassCard = (borderColor: string) => ({
  background: "rgba(255,255,255,0.04)",
  border: `1px solid ${borderColor}`,
  backdropFilter: "blur(8px)",
  borderRadius: "1rem",
});

export function CommerceHomePage({ onSelect }: CommerceHomePageProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: "rgba(96,180,255,0.15)",
              border: "1px solid rgba(96,180,255,0.3)",
            }}
          >
            <BarChart2 className="w-5 h-5" style={{ color: "#60b4ff" }} />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-white leading-none">
              Commerce Tutor
            </h1>
            <p className="text-sm text-white/50">
              বাণিজ্য বিভাগ — WBCHSE Syllabus
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <Badge
            variant="secondary"
            className="bg-white/10 text-white/70 border-white/10 text-xs"
          >
            Class XI &amp; XII
          </Badge>
          <Badge
            variant="secondary"
            className="bg-white/10 text-white/70 border-white/10 text-xs"
          >
            Accountancy
          </Badge>
          <Badge
            variant="secondary"
            className="bg-white/10 text-white/70 border-white/10 text-xs"
          >
            Step-by-Step Solutions
          </Badge>
          <Badge
            variant="secondary"
            className="bg-white/10 text-white/70 border-white/10 text-xs"
          >
            Math Problem Solver
          </Badge>
          <Badge
            variant="secondary"
            className="bg-white/10 text-white/70 border-white/10 text-xs"
          >
            MCQ + Theory
          </Badge>
        </div>
      </motion.div>

      {/* Subject Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {subjects.map((subject, idx) => {
          const Icon = subject.icon;
          return (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              style={glassCard(subject.borderColor)}
              className="p-5 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: subject.iconBg }}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: subject.iconColor }}
                  />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-white leading-tight">
                    {subject.label}
                  </h2>
                  <p className="text-sm text-white/50">{subject.bengali}</p>
                </div>
              </div>
              <p className="text-xs text-white/40 leading-relaxed">
                {subject.desc}
              </p>
              <div className="flex gap-2 mt-1">
                <Button
                  size="sm"
                  className="flex-1 text-sm font-semibold border-0"
                  style={subject.btnStyle}
                  onClick={() => onSelect(subject.id, 11)}
                >
                  Class XI
                </Button>
                <Button
                  size="sm"
                  className="flex-1 text-sm font-semibold border-0"
                  style={subject.btnStyle}
                  onClick={() => onSelect(subject.id, 12)}
                >
                  Class XII
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 rounded-xl p-5"
        style={{
          background: "rgba(96,180,255,0.08)",
          border: "1px solid rgba(96,180,255,0.2)",
        }}
      >
        <h3
          className="font-display font-bold text-base mb-3"
          style={{ color: "#60b4ff" }}
        >
          Commerce Tips 💼
        </h3>
        <ul className="space-y-2 text-sm text-white/60">
          <li>• বিষয় ও শ্রেণি বেছে নিন এবং অধ্যায় সিলেক্ট করুন</li>
          <li>• গণিতের সমস্যার জন্য "Problem Solving" ধরন বেছে নিন</li>
          <li>• তত্ত্ব প্রশ্নের জন্য Essay বা Short Answer বেছে নিন</li>
          <li>• সমাধান History-তে সংরক্ষিত হবে পুনরায় পড়ার জন্য</li>
        </ul>
      </motion.div>
    </div>
  );
}
