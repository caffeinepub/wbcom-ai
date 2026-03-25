import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Atom, Dna, FlaskConical, GraduationCap } from "lucide-react";
import { motion } from "motion/react";

interface NeetHomePageProps {
  onSelect: (subject: string, classLevel: number) => void;
}

const subjects = [
  {
    id: "physics",
    label: "Physics",
    bengali: "পদার্থবিজ্ঞান",
    icon: Atom,
    borderColor: "rgba(45, 212, 191, 0.3)",
    iconColor: "#2dd4bf",
    iconBg: "rgba(45, 212, 191, 0.15)",
    btnStyle: {
      background: "rgba(45,212,191,0.2)",
      color: "#2dd4bf",
      border: "1px solid rgba(45,212,191,0.3)",
    },
    chapters: [
      "Mechanics",
      "Thermodynamics",
      "Oscillations & Waves",
      "Electrostatics",
      "Current Electricity",
      "Magnetism",
      "EM Induction & AC",
      "Optics",
      "Modern Physics",
      "Semiconductors",
    ],
  },
  {
    id: "chemistry",
    label: "Chemistry",
    bengali: "রসায়নবিজ্ঞান",
    icon: FlaskConical,
    borderColor: "rgba(0, 212, 255, 0.3)",
    iconColor: "#00d4ff",
    iconBg: "rgba(0, 212, 255, 0.15)",
    btnStyle: {
      background: "rgba(0,212,255,0.2)",
      color: "#00d4ff",
      border: "1px solid rgba(0,212,255,0.3)",
    },
    chapters: [
      "Physical Chemistry",
      "Inorganic Chemistry",
      "Organic Chemistry",
    ],
  },
  {
    id: "biology",
    label: "Biology",
    bengali: "জীববিজ্ঞান",
    icon: Dna,
    borderColor: "rgba(52, 211, 153, 0.3)",
    iconColor: "#34d399",
    iconBg: "rgba(52, 211, 153, 0.15)",
    btnStyle: {
      background: "rgba(52,211,153,0.2)",
      color: "#34d399",
      border: "1px solid rgba(52,211,153,0.3)",
    },
    chapters: [
      "Diversity in Living World",
      "Structural Organisation",
      "Cell Structure & Function",
      "Plant Physiology",
      "Human Physiology",
      "Reproduction",
      "Genetics & Evolution",
      "Biology & Human Welfare",
      "Biotechnology",
      "Ecology & Environment",
    ],
  },
];

export function NeetHomePage({ onSelect }: NeetHomePageProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: "rgba(45,212,191,0.15)",
              border: "1px solid rgba(45,212,191,0.3)",
            }}
          >
            <GraduationCap className="w-5 h-5" style={{ color: "#2dd4bf" }} />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-white leading-none">
              NEET Preparation
            </h1>
            <p className="text-sm text-white/50">
              NEET প্রস্তুতি — NCERT Syllabus Aligned
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <Badge
            variant="secondary"
            className="bg-white/10 text-white/70 border-white/10 text-xs"
          >
            Medical Entrance
          </Badge>
          <Badge
            variant="secondary"
            className="bg-white/10 text-white/70 border-white/10 text-xs"
          >
            Chapter-wise Topics
          </Badge>
          <Badge
            variant="secondary"
            className="bg-white/10 text-white/70 border-white/10 text-xs"
          >
            Bilingual (EN + বাংলা)
          </Badge>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {subjects.map((subject, idx) => {
          const Icon = subject.icon;
          return (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="p-5 flex flex-col gap-4"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${subject.borderColor}`,
                backdropFilter: "blur(8px)",
                borderRadius: "1rem",
              }}
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
              <div className="flex flex-wrap gap-1">
                {subject.chapters.slice(0, 4).map((c) => (
                  <span
                    key={c}
                    className="text-xs rounded px-2 py-0.5 text-white/50"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    {c}
                  </span>
                ))}
                {subject.chapters.length > 4 && (
                  <span className="text-xs text-white/35">
                    +{subject.chapters.length - 4} more
                  </span>
                )}
              </div>
              <Button
                size="sm"
                className="w-full text-sm font-semibold mt-1 border-0"
                style={subject.btnStyle}
                onClick={() => onSelect(subject.id, 0)}
              >
                Start Preparation →
              </Button>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mt-6 rounded-xl p-5"
        style={{
          background: "rgba(45,212,191,0.08)",
          border: "1px solid rgba(45,212,191,0.2)",
        }}
      >
        <h3
          className="font-display font-bold text-base mb-3"
          style={{ color: "#2dd4bf" }}
        >
          কিভাবে ব্যবহার করবেন 🎯
        </h3>
        <ul className="space-y-2 text-sm text-white/60">
          <li>• Subject বেছে নিন, তারপর chapter বা topic বেছে নিন</li>
          <li>• যেকোনো প্রশ্ন বা topic লিখুন — বিস্তারিত explanation পাবেন</li>
          <li>• প্রতিটি উত্তর NCERT syllabus অনুযায়ী, বাংলা ও ইংরেজিতে</li>
          <li>• MCQ, Concept, এবং Numerical তিনটি mode আছে</li>
        </ul>
      </motion.div>
    </div>
  );
}
