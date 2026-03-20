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
    bengali: "ভৌতবিজ্ঞান",
    icon: Atom,
    bgClass: "bg-teal-50 border-teal-200",
    iconClass: "text-teal-600 bg-teal-100",
    badgeClass: "bg-teal-100 text-teal-700 border-teal-200",
    btnClass: "bg-teal-600 hover:bg-teal-700 text-white",
    desc: "Mechanics, Thermodynamics, Optics, Electricity, Modern Physics, Waves — NCERT aligned",
  },
  {
    id: "chemistry",
    label: "Chemistry",
    bengali: "রসায়ন",
    icon: FlaskConical,
    bgClass: "bg-cyan-50 border-cyan-200",
    iconClass: "text-cyan-600 bg-cyan-100",
    badgeClass: "bg-cyan-100 text-cyan-700 border-cyan-200",
    btnClass: "bg-cyan-600 hover:bg-cyan-700 text-white",
    desc: "Atomic Structure, Chemical Bonding, Organic, Electrochemistry, Equilibrium — NCERT aligned",
  },
  {
    id: "biology",
    label: "Biology",
    bengali: "জীববিজ্ঞান",
    icon: Dna,
    bgClass: "bg-emerald-50 border-emerald-200",
    iconClass: "text-emerald-600 bg-emerald-100",
    badgeClass: "bg-emerald-100 text-emerald-700 border-emerald-200",
    btnClass: "bg-emerald-600 hover:bg-emerald-700 text-white",
    desc: "Cell Biology, Genetics, Ecology, Human Physiology, Plant Physiology, Evolution — NCERT aligned",
  },
];

export function NeetHomePage({ onSelect }: NeetHomePageProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-teal-700 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-navy leading-none">
              NEET Preparation
            </h1>
            <p className="text-sm text-muted-foreground">
              NEET প্রস্তুতি — NCERT Syllabus
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <Badge
            variant="secondary"
            className="bg-teal-700/10 text-teal-800 border-0 text-xs"
          >
            Class XI &amp; XII
          </Badge>
          <Badge
            variant="secondary"
            className="bg-cyan-100 text-cyan-800 border-0 text-xs"
          >
            Concept + MCQ + Numerical
          </Badge>
          <Badge
            variant="secondary"
            className="bg-emerald-100 text-emerald-700 border-0 text-xs"
          >
            Bilingual (EN + বাংলা)
          </Badge>
        </div>
      </motion.div>

      {/* Subject Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {subjects.map((subject, idx) => {
          const Icon = subject.icon;
          return (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={`rounded-2xl border-2 p-5 ${subject.bgClass} flex flex-col gap-4`}
              data-ocid={"neet.card"}
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
                  data-ocid={"neet.primary_button"}
                >
                  Class XI
                </Button>
                <Button
                  size="sm"
                  className={`flex-1 text-sm font-semibold ${subject.btnClass}`}
                  onClick={() => onSelect(subject.id, 12)}
                  data-ocid={"neet.secondary_button"}
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
        transition={{ delay: 0.35 }}
        className="mt-6 bg-teal-800 rounded-xl p-5 text-white"
      >
        <h3 className="font-display font-bold text-base mb-3">NEET Tips 🎯</h3>
        <ul className="space-y-2 text-sm text-white/80">
          <li>
            • প্রশ্ন বা topic লিখুন এবং ধরন বেছে নিন (Concept / Numerical / MCQ)
          </li>
          <li>• Write any question or topic and choose the answer type</li>
          <li>• প্রতিটি উত্তর NCERT syllabus অনুযায়ী, বাংলা ও ইংরেজিতে</li>
          <li>• Important formulas and landmark examples included</li>
        </ul>
      </motion.div>
    </div>
  );
}
