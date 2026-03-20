import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart2,
  BookOpen,
  Calendar,
  FlaskConical,
  Headphones,
  Microscope,
  Palette,
  Scale,
  Trophy,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { PremiumNote } from "../backend.d";
import { useActor } from "../hooks/useActor";

type Note = PremiumNote;

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const QUICK_ACCESS = [
  {
    id: "arts",
    label: "Arts (কলা)",
    icon: Palette,
    colorClass: "bg-amber-500 hover:bg-amber-600",
    textClass: "text-white",
    ringClass: "ring-amber-300",
  },
  {
    id: "science",
    label: "Science (বিজ্ঞান)",
    icon: Microscope,
    colorClass: "bg-emerald-600 hover:bg-emerald-700",
    textClass: "text-white",
    ringClass: "ring-emerald-300",
  },
  {
    id: "commerce",
    label: "Commerce + Accountancy",
    icon: BarChart2,
    colorClass: "bg-blue-600 hover:bg-blue-700",
    textClass: "text-white",
    ringClass: "ring-blue-300",
  },
  {
    id: "law",
    label: "Law (আইন)",
    icon: Scale,
    colorClass: "bg-indigo-600 hover:bg-indigo-700",
    textClass: "text-white",
    ringClass: "ring-indigo-300",
  },
  {
    id: "notes",
    label: "Notes & Study Materials",
    icon: BookOpen,
    colorClass: "bg-purple-600 hover:bg-purple-700",
    textClass: "text-white",
    ringClass: "ring-purple-300",
  },
  {
    id: "quiz",
    label: "Quiz / Practice",
    icon: Trophy,
    colorClass: "bg-yellow-500 hover:bg-yellow-600",
    textClass: "text-white",
    ringClass: "ring-yellow-300",
  },
  {
    id: "neet",
    label: "NEET Preparation",
    icon: FlaskConical,
    colorClass: "bg-teal-600 hover:bg-teal-700",
    textClass: "text-white",
    ringClass: "ring-teal-300",
  },
  {
    id: "customerCase",
    label: "Customer Support",
    icon: Headphones,
    colorClass: "bg-rose-500 hover:bg-rose-600",
    textClass: "text-white",
    ringClass: "ring-rose-300",
  },
];

function formatDate(timestamp: bigint): string {
  try {
    // ICP timestamps are in nanoseconds
    const ms = Number(timestamp / BigInt(1_000_000));
    const date = new Date(ms);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("bn-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { actor, isFetching } = useActor();
  const [notices, setNotices] = useState<Note[]>([]);
  const [popularNotes, setPopularNotes] = useState<Note[]>([]);
  const [isLoadingNotes, setIsLoadingNotes] = useState(true);

  useEffect(() => {
    if (!actor || isFetching) return;
    setIsLoadingNotes(true);
    actor
      .getPremiumNotesList()
      .then((all: Note[]) => {
        const noticeItems = all
          .filter((n) => n.subject === "notice")
          .slice(-5)
          .reverse();
        const recentNotes = all
          .filter((n) => n.subject !== "notice")
          .slice(-4)
          .reverse();
        setNotices(noticeItems);
        setPopularNotes(recentNotes);
      })
      .catch(() => {
        setNotices([]);
        setPopularNotes([]);
      })
      .finally(() => setIsLoadingNotes(false));
  }, [actor, isFetching]);

  return (
    <div className="min-h-screen bg-background">
      {/* Welcome Banner */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0F3A5A 0%, #1a5480 50%, #0d2e47 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-white/5" />
          <div className="absolute top-1/2 -left-16 w-56 h-56 rounded-full bg-yellow-400/5" />
          <div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-white/3" />
          {["dot-a", "dot-b", "dot-c", "dot-d", "dot-e", "dot-f"].map(
            (id, i) => (
              <motion.div
                key={id}
                className="absolute rounded-full bg-white/10"
                style={{
                  width: Math.random() * 6 + 3,
                  height: Math.random() * 6 + 3,
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 90 + 5}%`,
                }}
                animate={{ y: [-4, 4, -4] }}
                transition={{
                  duration: 3 + i,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ),
          )}
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-6">
              <img
                src="/assets/generated/vidya-setu-logo-transparent.dim_400x200.png"
                alt="Vidya Setu AI"
                className="h-20 sm:h-24 w-auto object-contain mx-auto mb-4 drop-shadow-lg"
              />
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-3 tracking-tight">
              Vidya Setu AI
            </h1>
            <p
              className="text-xl sm:text-2xl font-semibold mb-3"
              style={{ color: "#F5C842" }}
            >
              Connecting You to Smarter Learning
            </p>
            <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              WBCHSE ও Calcutta University-র সিলেবাস অনুযায়ী সম্পূর্ণ সমাধান
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Daily Updates / Notice Board */}
        <section data-ocid="notices.section">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-display font-bold text-xl text-navy mb-4">
              Daily Updates / Notice Board 📢
            </h2>
            {isLoadingNotes ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <Skeleton key={`skel-${i}`} className="h-32 rounded-xl" />
                ))}
              </div>
            ) : notices.length === 0 ? (
              <div
                className="rounded-xl border-2 border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700"
                data-ocid="notices.empty_state"
              >
                কোনো নতুন আপডেট নেই। Admin শীঘ্রই নতুন বিজ্ঞপ্তি পোস্ট করবেন।
              </div>
            ) : (
              <div className="space-y-4">
                {notices.map((notice, idx) => {
                  const dateStr = formatDate(notice.createdAt);
                  return (
                    <motion.div
                      key={String(notice.id)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="rounded-xl border-2 border-amber-300 bg-amber-50 px-5 py-4 shadow-sm"
                      data-ocid={`notices.item.${idx + 1}`}
                    >
                      {/* Title row */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-bold text-base text-amber-900 leading-snug flex-1">
                          {notice.title}
                        </h3>
                        {dateStr && (
                          <div className="flex items-center gap-1 text-xs text-amber-600 shrink-0 mt-0.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{dateStr}</span>
                          </div>
                        )}
                      </div>
                      {/* Divider */}
                      <div className="border-t border-amber-200 mb-3" />
                      {/* Full content — no truncation */}
                      <p className="text-sm text-amber-800 leading-relaxed whitespace-pre-wrap">
                        {notice.content}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </section>

        {/* Quick Access */}
        <section data-ocid="quickaccess.section">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-display font-bold text-xl text-navy mb-5">
              Quick Access
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {QUICK_ACCESS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + idx * 0.04 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onNavigate(item.id)}
                    data-ocid={`quickaccess.${item.id}.button`}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl ${item.colorClass} ${item.textClass} shadow-md transition-all duration-150 focus:outline-none focus:ring-2 ${item.ringClass} focus:ring-offset-2`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-center leading-tight">
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* Popular Notes */}
        <section data-ocid="popularnotes.section">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <h2 className="font-display font-bold text-xl text-navy mb-5">
              Popular Notes 📚
            </h2>
            {isLoadingNotes ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton
                    key={`note-skel-${i}`}
                    className="h-36 rounded-xl"
                  />
                ))}
              </div>
            ) : popularNotes.length === 0 ? (
              <div
                className="rounded-xl border border-border bg-muted/30 px-5 py-6 text-sm text-muted-foreground text-center"
                data-ocid="popularnotes.empty_state"
              >
                Admin শীঘ্রই Notes যোগ করবেন
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {popularNotes.map((note, idx) => (
                  <motion.div
                    key={String(note.id)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + idx * 0.06 }}
                    className="rounded-xl border border-border bg-card shadow-sm p-4 flex flex-col gap-3"
                    data-ocid={`popularnotes.item.${idx + 1}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-sm text-foreground leading-tight">
                        {note.title}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="text-xs shrink-0 capitalize"
                      >
                        {note.subject}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {note.content.slice(0, 100)}
                      {note.content.length > 100 ? "..." : ""}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-auto self-start text-xs border-navy text-navy hover:bg-navy hover:text-white"
                      onClick={() => onNavigate("notes")}
                      data-ocid={`popularnotes.view_button.${idx + 1}`}
                    >
                      View in Notes
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </section>
      </div>
    </div>
  );
}
