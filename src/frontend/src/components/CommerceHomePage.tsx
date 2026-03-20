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
    bgClass: "bg-teal-50 border-teal-200",
    iconClass: "text-teal-600 bg-teal-100",
    btnClass: "bg-teal-600 hover:bg-teal-700 text-white",
    desc: "Partnership, Depreciation, NPO, Company Accounts, Cash Flow, Journal Entry — WBCHSE ও Calcutta University",
  },
  {
    id: "businessstudies",
    label: "Business Studies",
    bengali: "ব্যবসায় শিক্ষা",
    icon: ShoppingBag,
    bgClass: "bg-blue-50 border-blue-200",
    iconClass: "text-blue-600 bg-blue-100",
    btnClass: "bg-blue-600 hover:bg-blue-700 text-white",
    desc: "ব্যবসার প্রকৃতি, সংগঠন, ব্যবস্থাপনা, বিপণন ও আর্থিক পরিকল্পনা",
  },
  {
    id: "economics",
    label: "Economics",
    bengali: "অর্থনীতি",
    icon: TrendingUp,
    bgClass: "bg-green-50 border-green-200",
    iconClass: "text-green-600 bg-green-100",
    btnClass: "bg-green-600 hover:bg-green-700 text-white",
    desc: "চাহিদা-যোগান, বাজার, GDP, অর্থনৈতিক নীতি ও ভারতীয় অর্থনীতি",
  },
  {
    id: "commercialmathematics",
    label: "Commercial Mathematics",
    bengali: "বাণিজ্যিক গণিত",
    icon: Calculator,
    bgClass: "bg-orange-50 border-orange-200",
    iconClass: "text-orange-600 bg-orange-100",
    btnClass: "bg-orange-600 hover:bg-orange-700 text-white",
    desc: "সুদ, মুনাফা, বাট্টা, পরিসংখ্যান, সম্ভাবনা ও ক্ষতিপূরণ",
  },
  {
    id: "computerapplication",
    label: "Computer Application",
    bengali: "কম্পিউটার অ্যাপ্লিকেশন",
    icon: Monitor,
    bgClass: "bg-violet-50 border-violet-200",
    iconClass: "text-violet-600 bg-violet-100",
    btnClass: "bg-violet-600 hover:bg-violet-700 text-white",
    desc: "কম্পিউটার মূলনীতি, MS Office, ডেটাবেস, HTML, ই-কমার্স",
  },
];

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
          <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center">
            <BarChart2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-navy leading-none">
              Commerce Tutor
            </h1>
            <p className="text-sm text-muted-foreground">
              বাণিজ্য বিভাগ — WBCHSE Syllabus
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <Badge
            variant="secondary"
            className="bg-navy/10 text-navy border-0 text-xs"
          >
            Class XI &amp; XII
          </Badge>
          <Badge
            variant="secondary"
            className="bg-teal-100 text-teal-700 border-0 text-xs"
          >
            Accountancy
          </Badge>
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-700 border-0 text-xs"
          >
            Step-by-Step Solutions
          </Badge>
          <Badge
            variant="secondary"
            className="bg-orange-100 text-orange-700 border-0 text-xs"
          >
            Math Problem Solver
          </Badge>
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-700 border-0 text-xs"
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
              className={`rounded-2xl border-2 p-5 ${subject.bgClass} flex flex-col gap-4`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center ${subject.iconClass}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-foreground leading-tight">
                    {subject.label}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {subject.bengali}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {subject.desc}
              </p>
              <div className="flex gap-2 mt-1">
                <Button
                  size="sm"
                  className={`flex-1 text-sm font-semibold ${subject.btnClass}`}
                  onClick={() => onSelect(subject.id, 11)}
                >
                  Class XI
                </Button>
                <Button
                  size="sm"
                  className={`flex-1 text-sm font-semibold ${subject.btnClass}`}
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
        className="mt-6 bg-navy rounded-xl p-5 text-white"
      >
        <h3 className="font-display font-bold text-base mb-3">
          Commerce Tips 💼
        </h3>
        <ul className="space-y-2 text-sm text-white/80">
          <li>• বিষয় ও শ্রেণি বেছে নিন এবং অধ্যায় সিলেক্ট করুন</li>
          <li>• গণিতের সমস্যার জন্য "Problem Solving" ধরন বেছে নিন</li>
          <li>• তত্ত্ব প্রশ্নের জন্য Essay বা Short Answer বেছে নিন</li>
          <li>• সমাধান History-তে সংরক্ষিত হবে পুনরায় পড়ার জন্য</li>
        </ul>
      </motion.div>
    </div>
  );
}
