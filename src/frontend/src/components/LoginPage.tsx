import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const PARTICLES = [
  {
    id: "p0",
    size: 2,
    top: "8%",
    left: "5%",
    color: "oklch(0.75 0.18 200 / 0.6)",
    dur: 3.0,
    delay: 0.0,
  },
  {
    id: "p1",
    size: 3,
    top: "15.5%",
    left: "13%",
    color: "oklch(0.55 0.22 290 / 0.6)",
    dur: 3.4,
    delay: 0.3,
  },
  {
    id: "p2",
    size: 4,
    top: "23%",
    left: "21%",
    color: "oklch(0.72 0.148 78 / 0.5)",
    dur: 3.8,
    delay: 0.6,
  },
  {
    id: "p3",
    size: 2,
    top: "30.5%",
    left: "29%",
    color: "oklch(0.75 0.18 200 / 0.6)",
    dur: 4.2,
    delay: 0.9,
  },
  {
    id: "p4",
    size: 3,
    top: "38%",
    left: "37%",
    color: "oklch(0.55 0.22 290 / 0.6)",
    dur: 4.6,
    delay: 1.2,
  },
  {
    id: "p5",
    size: 4,
    top: "45.5%",
    left: "45%",
    color: "oklch(0.72 0.148 78 / 0.5)",
    dur: 5.0,
    delay: 1.5,
  },
  {
    id: "p6",
    size: 2,
    top: "53%",
    left: "53%",
    color: "oklch(0.75 0.18 200 / 0.6)",
    dur: 5.4,
    delay: 1.8,
  },
  {
    id: "p7",
    size: 3,
    top: "60.5%",
    left: "61%",
    color: "oklch(0.55 0.22 290 / 0.6)",
    dur: 5.8,
    delay: 2.1,
  },
  {
    id: "p8",
    size: 4,
    top: "68%",
    left: "69%",
    color: "oklch(0.72 0.148 78 / 0.5)",
    dur: 6.2,
    delay: 2.4,
  },
  {
    id: "p9",
    size: 2,
    top: "75.5%",
    left: "77%",
    color: "oklch(0.75 0.18 200 / 0.6)",
    dur: 6.6,
    delay: 2.7,
  },
  {
    id: "p10",
    size: 3,
    top: "83%",
    left: "85%",
    color: "oklch(0.55 0.22 290 / 0.6)",
    dur: 7.0,
    delay: 3.0,
  },
  {
    id: "p11",
    size: 4,
    top: "90.5%",
    left: "93%",
    color: "oklch(0.72 0.148 78 / 0.5)",
    dur: 7.4,
    delay: 3.3,
  },
];

export function LoginPage() {
  const { login, isLoggingIn, isInitializing } = useInternetIdentity();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "oklch(0.07 0.03 240)" }}
    >
      {/* Animated gradient orbs */}
      <div
        className="absolute top-[-15%] right-[-10%] w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "oklch(0.55 0.22 290 / 0.12)" }}
      />
      <div
        className="absolute bottom-[-15%] left-[-10%] w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "oklch(0.75 0.18 200 / 0.10)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "oklch(0.72 0.148 78 / 0.04)" }}
      />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            background: p.color,
          }}
          animate={{ y: [-8, 8, -8], opacity: [0.3, 0.8, 0.3] }}
          transition={{
            duration: p.dur,
            repeat: Number.POSITIVE_INFINITY,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

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
            className="h-20 w-auto object-contain animate-logo-float"
            style={{
              filter: "drop-shadow(0 0 16px oklch(0.75 0.18 200 / 0.7))",
            }}
          />
          <div className="text-center">
            <h1
              className="font-display font-bold text-5xl tracking-tight"
              style={{
                color: "oklch(0.72 0.148 78)",
                textShadow: "0 0 30px oklch(0.72 0.148 78 / 0.4)",
              }}
            >
              Vidya Setu AI
            </h1>
            <p className="text-white text-lg mt-2 font-medium">
              Connecting You to Smarter Learning
            </p>
            <p
              className="text-sm mt-1 font-medium"
              style={{ color: "oklch(0.72 0.148 78 / 0.7)" }}
            >
              স্মার্ট শিক্ষার দিকে আপনাকে সংযুক্ত করছি
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-24 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.72 0.148 78 / 0.5), transparent)",
          }}
        />

        {/* Features */}
        <div className="grid grid-cols-2 gap-3 w-full">
          {[
            "📚 8 Topic Solvers",
            "📝 Step-by-step Solutions",
            "🎓 WBCHSE Syllabus",
            "💾 Save History",
          ].map((feat) => (
            <div
              key={feat}
              className="rounded-lg px-3 py-2 text-sm text-center"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.75)",
              }}
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
          className="w-full font-bold text-base py-6 border-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.148 78), oklch(0.78 0.18 70))",
            color: "oklch(0.07 0.03 240)",
            boxShadow:
              "0 0 24px oklch(0.72 0.148 78 / 0.4), 0 4px 16px rgba(0,0,0,0.3)",
          }}
        >
          {isLoggingIn ? "Logging in..." : "Login with Internet Identity"}
        </Button>

        {/* Privacy notice */}
        <div
          className="flex items-center gap-2 rounded-lg px-4 py-2.5 w-full"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Lock
            className="w-3.5 h-3.5 shrink-0"
            style={{ color: "oklch(0.72 0.148 78 / 0.7)" }}
          />
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            We do not share your personal information with anyone.
          </p>
        </div>

        <p
          className="text-xs text-center -mt-4"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
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
        <p
          className="font-semibold text-sm"
          style={{ color: "oklch(0.72 0.148 78)" }}
        >
          Founder &amp; CEO: Bikram Mandal
        </p>
        <p
          className="text-xs mt-0.5"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          C.R.G.S
        </p>
      </motion.div>
    </div>
  );
}
