import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookMarked,
  BookOpen,
  Brain,
  Globe,
  Landmark,
  Palette,
  Scale,
  ScrollText,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

interface ArtsHomePageProps {
  onSelect: (subject: string, classLevel: number) => void;
}

const subjects = [
  {
    id: "bengali",
    label: "Bengali",
    bengali: "বাংলা",
    icon: BookOpen,
    bgClass: "bg-rose-50 border-rose-200",
    iconClass: "text-rose-600 bg-rose-100",
    btnClass: "bg-rose-600 hover:bg-rose-700 text-white",
    desc: "গল্প, কবিতা, নাটক, প্রবন্ধ, ব্যাকরণ ও রচনা",
  },
  {
    id: "english",
    label: "English",
    bengali: "ইংরেজি",
    icon: BookMarked,
    bgClass: "bg-blue-50 border-blue-200",
    iconClass: "text-blue-600 bg-blue-100",
    btnClass: "bg-blue-600 hover:bg-blue-700 text-white",
    desc: "Prose, Poetry, Drama, Grammar & Writing Skills",
  },
  {
    id: "history",
    label: "History",
    bengali: "ইতিহাস",
    icon: Landmark,
    bgClass: "bg-amber-50 border-amber-200",
    iconClass: "text-amber-600 bg-amber-100",
    btnClass: "bg-amber-600 hover:bg-amber-700 text-white",
    desc: "প্রাচীন ভারত, মধ্যযুগ, আধুনিক ইতিহাস ও বিশ্বযুদ্ধ",
  },
  {
    id: "geography",
    label: "Geography",
    bengali: "ভূগোল",
    icon: Globe,
    bgClass: "bg-green-50 border-green-200",
    iconClass: "text-green-600 bg-green-100",
    btnClass: "bg-green-600 hover:bg-green-700 text-white",
    desc: "ভূমিরূপ, বায়ুমণ্ডল, জলবায়ু ও ভারতের ভূগোল",
  },
  {
    id: "politicalscience",
    label: "Political Science",
    bengali: "রাষ্ট্রবিজ্ঞান",
    icon: Scale,
    bgClass: "bg-indigo-50 border-indigo-200",
    iconClass: "text-indigo-600 bg-indigo-100",
    btnClass: "bg-indigo-600 hover:bg-indigo-700 text-white",
    desc: "গণতন্ত্র, সংবিধান, মৌলিক অধিকার ও আন্তর্জাতিক সম্পর্ক",
  },
  {
    id: "philosophy",
    label: "Philosophy",
    bengali: "দর্শন",
    icon: Brain,
    bgClass: "bg-violet-50 border-violet-200",
    iconClass: "text-violet-600 bg-violet-100",
    btnClass: "bg-violet-600 hover:bg-violet-700 text-white",
    desc: "ভারতীয় দর্শন, যুক্তিবিজ্ঞান, নৈতিকতা ও মেটাফিজিক্স",
  },
  {
    id: "sociology",
    label: "Sociology",
    bengali: "সমাজবিজ্ঞান",
    icon: Users,
    bgClass: "bg-teal-50 border-teal-200",
    iconClass: "text-teal-600 bg-teal-100",
    btnClass: "bg-teal-600 hover:bg-teal-700 text-white",
    desc: "পরিবার, সমাজ, সংস্কৃতি, নগরায়ণ ও বিশ্বায়ন",
  },
  {
    id: "sanskrit",
    label: "Sanskrit",
    bengali: "সংস্কৃত",
    icon: ScrollText,
    bgClass: "bg-orange-50 border-orange-200",
    iconClass: "text-orange-600 bg-orange-100",
    btnClass: "bg-orange-600 hover:bg-orange-700 text-white",
    desc: "সংস্কৃত গদ্য, পদ্য, ব্যাকরণ ও অনুবাদ",
  },
];

export function ArtsHomePage({ onSelect }: ArtsHomePageProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-navy leading-none">
              Arts Tutor
            </h1>
            <p className="text-sm text-muted-foreground">
              কলা বিভাগ — WBCHSE Syllabus
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
            className="bg-amber-100 text-amber-700 border-0 text-xs"
          >
            Step-by-Step Answers
          </Badge>
          <Badge
            variant="secondary"
            className="bg-rose-100 text-rose-700 border-0 text-xs"
          >
            Essay + MCQ
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
              data-ocid="arts.card"
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
                  data-ocid="arts.primary_button"
                >
                  Class XI
                </Button>
                <Button
                  size="sm"
                  className={`flex-1 text-sm font-semibold ${subject.btnClass}`}
                  onClick={() => onSelect(subject.id, 12)}
                  data-ocid="arts.secondary_button"
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
        transition={{ delay: 0.5 }}
        className="mt-6 bg-navy rounded-xl p-5 text-white"
      >
        <h3 className="font-display font-bold text-base mb-3">Arts Tips 🎨</h3>
        <ul className="space-y-2 text-sm text-white/80">
          <li>• বিষয় ও শ্রেণি বেছে নিন এবং অধ্যায় সিলেক্ট করুন</li>
          <li>• রচনামূলক, সংক্ষিপ্ত বা বহুনির্বাচনি ধরন বেছে নিন</li>
          <li>• প্রশ্ন লিখুন — WBCHSE সিলেবাস মেনে বিস্তারিত উত্তর পাবেন</li>
          <li>• সমাধান History-তে সংরক্ষিত হবে পুনরায় পড়ার জন্য</li>
        </ul>
      </motion.div>
    </div>
  );
}
