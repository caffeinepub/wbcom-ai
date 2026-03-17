import { BookOpen, Star } from "lucide-react";
import { motion } from "motion/react";

export function HeroBanner() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0F3A5A 0%, #1a5278 60%, #0F3A5A 100%)",
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-10 w-32 h-32 rounded-full bg-white/20" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full bg-white/10" />
        <div className="absolute top-8 left-8 w-16 h-16 rounded-full bg-gold/30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-white/70 text-sm">
              WBCHSE & Calcutta University Syllabus
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
          >
            Master Accountancy <span className="text-gold">with AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/80 text-lg mb-6 leading-relaxed"
          >
            Step-by-step solutions for Partnership, Depreciation, NPO, Company
            Accounts &amp; more. Designed for West Bengal students.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {[
              "Partnership Accounts",
              "Depreciation",
              "NPO",
              "Balance Sheet",
              "Cash Flow",
            ].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 bg-white/10 text-white/90 text-xs font-medium px-3 py-1 rounded-full border border-white/20"
              >
                <BookOpen className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
