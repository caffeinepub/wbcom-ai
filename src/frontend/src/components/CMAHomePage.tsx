import {
  type CMALevel,
  CMA_LEVEL_META,
  CMA_SUBJECTS,
} from "../data/cmaSubjects";

interface CMAHomePageProps {
  onSelect: (level: CMALevel, subject: string) => void;
}

export function CMAHomePage({ onSelect }: CMAHomePageProps) {
  const levels: CMALevel[] = ["foundation", "intermediate", "final"];

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.08 0.04 200) 0%, oklch(0.12 0.08 190) 50%, oklch(0.08 0.05 210) 100%)",
          minHeight: "200px",
        }}
      >
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 text-center">
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-5"
            style={{
              background: "rgba(52,211,153,0.15)",
              border: "1px solid rgba(52,211,153,0.3)",
              color: "rgba(52,211,153,0.9)",
            }}
          >
            <span>🏆</span>
            <span>ICMAI — Institute of Cost Accountants of India</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-3 tracking-tight">
            CMA Preparation Hub
          </h1>
          <p
            className="text-lg font-semibold mb-2"
            style={{ color: "#34d399" }}
          >
            সিএমএ পরীক্ষার প্রস্তুতি — Theory, Practical ও MCQ সহ
          </p>
          <p className="text-white/50 text-sm max-w-xl mx-auto">
            Foundation · Intermediate · Final — সব level-এর সব subject-এ বিস্তারিত
            Q&amp;A সমাধান
          </p>
        </div>
      </section>

      {/* Levels */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
        {levels.map((level) => {
          const meta = CMA_LEVEL_META[level];
          const subjects = CMA_SUBJECTS[level];
          return (
            <section key={level}>
              {/* Level header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="px-4 py-2 rounded-xl font-bold text-sm"
                  style={{
                    background: "rgba(52,211,153,0.2)",
                    border: "1px solid rgba(52,211,153,0.35)",
                    color: "#34d399",
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {subjects.map((sub) => (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => onSelect(level, sub.id)}
                    data-ocid={`cma.${level}.${sub.id}.button`}
                    className="flex flex-col items-start gap-3 p-4 rounded-2xl text-left transition-all hover:opacity-90"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(52,211,153,0.2)",
                    }}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <span className="text-2xl">{sub.icon}</span>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(52,211,153,0.15)",
                          color: "#34d399",
                          border: "1px solid rgba(52,211,153,0.3)",
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
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
