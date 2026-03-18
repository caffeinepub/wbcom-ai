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
    color: "blue",
    bgClass: "bg-blue-50 border-blue-200",
    iconClass: "text-blue-600 bg-blue-100",
    badgeClass: "bg-blue-100 text-blue-700 border-blue-200",
    btnClass: "bg-blue-600 hover:bg-blue-700 text-white",
    desc: "Mechanics, Optics, Electricity, Magnetism, Modern Physics",
  },
  {
    id: "chemistry",
    label: "Chemistry",
    bengali: "রসায়নবিজ্ঞান",
    icon: FlaskConical,
    color: "green",
    bgClass: "bg-emerald-50 border-emerald-200",
    iconClass: "text-emerald-600 bg-emerald-100",
    badgeClass: "bg-emerald-100 text-emerald-700 border-emerald-200",
    btnClass: "bg-emerald-600 hover:bg-emerald-700 text-white",
    desc: "Organic, Inorganic, Physical Chemistry, Reactions",
  },
  {
    id: "biology",
    label: "Biology",
    bengali: "জীববিজ্ঞান",
    icon: Dna,
    color: "purple",
    bgClass: "bg-purple-50 border-purple-200",
    iconClass: "text-purple-600 bg-purple-100",
    badgeClass: "bg-purple-100 text-purple-700 border-purple-200",
    btnClass: "bg-purple-600 hover:bg-purple-700 text-white",
    desc: "Cell Biology, Genetics, Ecology, Plant & Animal Physiology",
  },
  {
    id: "mathematics",
    label: "Mathematics",
    bengali: "গণিত",
    icon: Calculator,
    color: "orange",
    bgClass: "bg-orange-50 border-orange-200",
    iconClass: "text-orange-600 bg-orange-100",
    badgeClass: "bg-orange-100 text-orange-700 border-orange-200",
    btnClass: "bg-orange-600 hover:bg-orange-700 text-white",
    desc: "Algebra, Calculus, Coordinate Geometry, Probability",
  },
];

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
          <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
            <Microscope className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-navy leading-none">
              Science Tutor
            </h1>
            <p className="text-sm text-muted-foreground">
              বিজ্ঞান শিক্ষক — WBCHSE Syllabus
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
            className="bg-gold/15 text-amber-700 border-0 text-xs"
          >
            Step-by-Step Solutions
          </Badge>
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-700 border-0 text-xs"
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
              className={`rounded-2xl border-2 p-5 ${subject.bgClass} flex flex-col gap-4`}
              data-ocid={"science.card"}
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
                  data-ocid={"science.primary_button"}
                >
                  Class XI
                </Button>
                <Button
                  size="sm"
                  className={`flex-1 text-sm font-semibold ${subject.btnClass}`}
                  onClick={() => onSelect(subject.id, 12)}
                  data-ocid={"science.secondary_button"}
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
          Science Tips 🔬
        </h3>
        <ul className="space-y-2 text-sm text-white/80">
          <li>• Select a subject and class to begin</li>
          <li>• Choose the chapter, then Theory or Numerical type</li>
          <li>• Get step-by-step solutions following WBCHSE pattern</li>
          <li>• Solutions saved to your History for revision</li>
        </ul>
      </motion.div>
    </div>
  );
}
