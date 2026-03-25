import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Atom, Calculator, Dna, FlaskConical, Microscope } from "lucide-react";
import { motion } from "motion/react";

interface ScienceHomePageProps {
  onSelect: (subject: string, classLevel: number) => void;
}

const subjects = [
  {
    id: "physics",
    label: "Physics",
    bengali: "পদার্থবিজ্ঞান",
    icon: Atom,
    borderColor: "rgba(96, 180, 255, 0.3)",
    iconColor: "#60b4ff",
    iconBg: "rgba(96, 180, 255, 0.15)",
    btnStyle: {
      background: "rgba(96,180,255,0.2)",
      color: "#60b4ff",
      border: "1px solid rgba(96,180,255,0.3)",
    },
    desc: "Mechanics, Optics, Electricity, Magnetism, Modern Physics",
  },
  {
    id: "chemistry",
    label: "Chemistry",
    bengali: "রসায়নবিজ্ঞান",
    icon: FlaskConical,
    borderColor: "rgba(52, 211, 153, 0.3)",
    iconColor: "#34d399",
    iconBg: "rgba(52, 211, 153, 0.15)",
    btnStyle: {
      background: "rgba(52,211,153,0.2)",
      color: "#34d399",
      border: "1px solid rgba(52,211,153,0.3)",
    },
    desc: "Organic, Inorganic, Physical Chemistry, Reactions",
  },
  {
    id: "biology",
    label: "Biology",
    bengali: "জীববিজ্ঞান",
    icon: Dna,
    borderColor: "rgba(192, 132, 252, 0.3)",
    iconColor: "#c084fc",
    iconBg: "rgba(192, 132, 252, 0.15)",
    btnStyle: {
      background: "rgba(192,132,252,0.2)",
      color: "#c084fc",
      border: "1px solid rgba(192,132,252,0.3)",
    },
    desc: "Cell Biology, Genetics, Ecology, Plant & Animal Physiology",
  },
  {
    id: "mathematics",
    label: "Mathematics",
    bengali: "গণিত",
    icon: Calculator,
    borderColor: "rgba(245, 200, 66, 0.3)",
    iconColor: "#f5c842",
    iconBg: "rgba(245, 200, 66, 0.15)",
    btnStyle: {
      background: "rgba(245,200,66,0.2)",
      color: "#f5c842",
      border: "1px solid rgba(245,200,66,0.3)",
    },
    desc: "Algebra, Calculus, Coordinate Geometry, Probability",
  },
];

const glassCard = (borderColor: string) => ({
  background: "rgba(255,255,255,0.04)",
  border: `1px solid ${borderColor}`,
  backdropFilter: "blur(8px)",
  borderRadius: "1rem",
});

export function ScienceHomePage({ onSelect }: ScienceHomePageProps) {
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
              background: "rgba(0,212,255,0.15)",
              border: "1px solid rgba(0,212,255,0.3)",
            }}
          >
            <Microscope className="w-5 h-5" style={{ color: "#00d4ff" }} />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-white leading-none">
              Science Tutor
            </h1>
            <p className="text-sm text-white/50">
              বিজ্ঞান শিক্ষক — WBCHSE Syllabus
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
            Step-by-Step Solutions
          </Badge>
          <Badge
            variant="secondary"
            className="bg-white/10 text-white/70 border-white/10 text-xs"
          >
            Theory + Numerical
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
              transition={{ delay: idx * 0.08 }}
              style={glassCard(subject.borderColor)}
              className="p-5 flex flex-col gap-4"
              data-ocid="science.card"
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
                  data-ocid="science.primary_button"
                >
                  Class XI
                </Button>
                <Button
                  size="sm"
                  className="flex-1 text-sm font-semibold border-0"
                  style={subject.btnStyle}
                  onClick={() => onSelect(subject.id, 12)}
                  data-ocid="science.secondary_button"
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
          background: "rgba(0,212,255,0.08)",
          border: "1px solid rgba(0,212,255,0.2)",
        }}
      >
        <h3
          className="font-display font-bold text-base mb-3"
          style={{ color: "#00d4ff" }}
        >
          Science Tips 🔬
        </h3>
        <ul className="space-y-2 text-sm text-white/60">
          <li>• Select a subject and class to begin</li>
          <li>• Choose the chapter, then Theory or Numerical type</li>
          <li>• Get step-by-step solutions following WBCHSE pattern</li>
          <li>• Solutions saved to your History for revision</li>
        </ul>
      </motion.div>
    </div>
  );
}
