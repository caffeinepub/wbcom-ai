import { Button } from "@/components/ui/button";
import { Lock, Star } from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const STAR_POSITIONS = [
  { top: "10%", left: "5%" },
  { top: "21%", left: "18%" },
  { top: "32%", left: "31%" },
  { top: "43%", left: "44%" },
  { top: "54%", left: "57%" },
  { top: "65%", left: "70%" },
  { top: "76%", left: "83%" },
  { top: "87%", left: "96%" },
];

export function LoginPage() {
  const { login, isLoggingIn, isInitializing } = useInternetIdentity();

  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative stars */}
      {STAR_POSITIONS.map((pos, i) => (
        <motion.div
          key={pos.top}
          className="absolute text-gold/20"
          style={{ top: pos.top, left: pos.left }}
          animate={{ opacity: [0.15, 0.5, 0.15], scale: [1, 1.2, 1] }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.4,
          }}
        >
          <Star className="w-4 h-4 fill-gold/20" />
        </motion.div>
      ))}

      {/* Decorative circle glows */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 rounded-full bg-gold/5 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center gap-8 z-10 px-6 max-w-md w-full"
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <img
            src="/assets/generated/vidya-setu-logo-transparent.dim_400x200.png"
            alt="Vidya Setu AI"
            className="h-20 w-auto object-contain drop-shadow-lg"
          />
          <div className="text-center">
            <h1 className="font-display font-bold text-5xl text-gold tracking-tight">
              Vidya Setu AI
            </h1>
            <p className="text-white text-lg mt-2 font-medium">
              Connecting You to Smarter Learning
            </p>
            <p className="text-gold/70 text-sm mt-1 font-medium">
              স্মার্ট শিক্ষার দিকে আপনাকে সংযুক্ত করছি
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-24 h-px bg-gold/40" />

        {/* Features list */}
        <div className="grid grid-cols-2 gap-3 w-full">
          {[
            "📚 8 Topic Solvers",
            "📝 Step-by-step Solutions",
            "🎓 WBCHSE Syllabus",
            "💾 Save History",
          ].map((feat) => (
            <div
              key={feat}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-sm text-center"
            >
              {feat}
            </div>
          ))}
        </div>

        {/* Login button */}
        <Button
          size="lg"
          onClick={login}
          disabled={isLoggingIn || isInitializing}
          data-ocid="auth.primary_button"
          className="w-full bg-gold text-navy font-bold text-base hover:bg-gold/90 hover:scale-105 transition-all shadow-lg shadow-gold/20 py-6"
        >
          {isLoggingIn ? "Logging in..." : "Login with Internet Identity"}
        </Button>

        {/* Privacy notice */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 w-full">
          <Lock className="w-3.5 h-3.5 text-gold/70 shrink-0" />
          <p className="text-white/50 text-xs">
            We do not share your personal information with anyone.
          </p>
        </div>

        <p className="text-white/40 text-xs text-center -mt-4">
          Secure, passwordless login powered by Internet Computer
        </p>
      </motion.div>

      {/* Founder credit */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-8 text-center z-10"
      >
        <p className="text-gold font-semibold text-sm">
          Founder &amp; CEO: Bikram Mandal
        </p>
        <p className="text-white/50 text-xs mt-0.5">C.R.G.S</p>
      </motion.div>
    </div>
  );
}
