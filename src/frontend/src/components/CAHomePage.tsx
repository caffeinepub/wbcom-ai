import { motion } from "motion/react";
import { type CALevel, CA_LEVEL_META, CA_SUBJECTS } from "../data/caSubjects";

interface CAHomePageProps {
  onSelect: (level: CALevel, subject: string) => void;
}

export function CAHomePage({ onSelect }: CAHomePageProps) {
  const levels: CALevel[] = ["foundation", "intermediate", "final"];

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.08 0.04 280) 0%, oklch(0.12 0.08 290) 50%, oklch(0.08 0.05 260) 100%)",
          minHeight: "200px",
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {["a", "b", "c", "d", "e"].map((id, i) => (
            <motion.div
              key={id}
              className="absolute rounded-full"
              style={{
                width: 8 + i * 4,
                height: 8 + i * 4,
                top: `${15 + i * 16}%`,
                left: `${10 + i * 18}%`,
                background: "rgba(192,132,252,0.1)",
              }}
              animate={{ y: [-6, 6, -6] }}
              transition={{
                duration: 3 + i,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 text-center">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-5"
              style={{
                background: "rgba(192,132,252,0.15)",
                border: "1px solid rgba(192,132,252,0.3)",
                color: "rgba(192,132,252,0.9)",
              }}
            >
              <span>🏆</span>
              <span>ICAI — Institute of Chartered Accountants of India</span>
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-3 tracking-tight">
              CA Preparation Hub
            </h1>
            <p
              className="text-lg font-semibold mb-2"
              style={{ color: "#c084fc" }}
            >
              সিএ পরীক্ষার প্রস্তুতি — Theory, Practical ও MCQ সহ
            </p>
            <p className="text-white/50 text-sm max-w-xl mx-auto">
              Foundation · Intermediate · Final — সব level-এর সব
              subject-এ বিস্তারিত Q&amp;A সমাধান
            </p>
          </motion.div>
        </div>
      </section>

      {/* Levels */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
        {levels.map((level, li) => {
          const meta = CA_LEVEL_META[level];
          const subjects = CA_SUBJECTS[level];
          return (
            <motion.section
              key={level}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: li * 0.1 }}
            >
              {/* Level header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="px-4 py-2 rounded-xl font-bold text-sm"
                  style={{
                    background: "rgba(192,132,252,0.2)",
                    border: "1px solid rgba(192,132,252,0.35)",
                    color: "#c084fc",
                  }}
                >
                  {meta.label}
                </div>
                <div>
                  <p className="font-display font-bold text-lg text-white leading-tight">
                    {meta.bengali}
                  </p>
                  <p className="text-xs text-white/40">{meta.desc}</p>
                </div>
              </div>

              {/* Subject cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects.map((sub, si) => (
                  <motion.button
                    key={sub.id}
                    type="button"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: li * 0.1 + si * 0.04 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onSelect(level, sub.id)}
                    data-ocid={`ca.${level}.${sub.id}.button`}
                    className="flex flex-col items-start gap-3 p-4 rounded-2xl text-left transition-all"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(192,132,252,0.2)",
                      backdropFilter: "blur(8px)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "rgba(192,132,252,0.5)";
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(192,132,252,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "rgba(192,132,252,0.2)";
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(255,255,255,0.04)";
                    }}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <span className="text-2xl">{sub.icon}</span>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(192,132,252,0.15)",
                          color: "#c084fc",
                          border: "1px solid rgba(192,132,252,0.3)",
                        }}
                      >
                        {meta.label}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-white leading-tight">
                        {sub.label}
                      </p>
                      <p className="text-xs text-white/40 mt-0.5">
                        {sub.bengali}
                      </p>
                    </div>
                    <p className="text-xs text-white/30">
                      {sub.chapters.length} chapters
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
