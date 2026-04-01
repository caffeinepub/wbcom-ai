import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart2,
  BookOpen,
  Briefcase,
  Calendar,
  FlaskConical,
  GraduationCap,
  Headphones,
  Library,
  Microscope,
  Palette,
  RefreshCw,
  Scale,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { PremiumNote } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { getRevisionDueTopics } from "../utils/progressTracker";

type Note = PremiumNote;

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const QUICK_ACCESS = [
  {
    id: "arts",
    label: "Arts (কলা)",
    icon: Palette,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
  },
  {
    id: "science",
    label: "Science (বিজ্ঞান)",
    icon: Microscope,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
  },
  {
    id: "commerce",
    label: "Commerce + Accountancy",
    icon: BarChart2,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  {
    id: "law",
    label: "Law (আইন)",
    icon: Scale,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/20",
  },
  {
    id: "ca",
    label: "CA Preparation",
    icon: GraduationCap,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
  },
  {
    id: "cma",
    label: "CMA Preparation",
    icon: GraduationCap,
    color: "text-teal-300",
    bg: "bg-teal-300/10",
    border: "border-teal-300/20",
  },
  {
    id: "notes",
    label: "Notes & Study Materials",
    icon: BookOpen,
    color: "text-violet-300",
    bg: "bg-violet-300/10",
    border: "border-violet-300/20",
  },
  {
    id: "quiz",
    label: "Quiz / Practice",
    icon: Trophy,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/20",
  },
  {
    id: "neet",
    label: "NEET Preparation",
    icon: FlaskConical,
    color: "text-teal-400",
    bg: "bg-teal-400/10",
    border: "border-teal-400/20",
  },
  {
    id: "ssc",
    label: "SSC Jobs",
    icon: Briefcase,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/20",
  },
  {
    id: "customerCase",
    label: "Customer Support",
    icon: Headphones,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
    border: "border-pink-400/20",
  },
  {
    id: "qa",
    label: "Q&A Bank",
    icon: Library,
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/20",
  },
];

function parseNoticeContent(content: string): {
  text: string;
  publishAt?: number;
} {
  try {
    const parsed = JSON.parse(content);
    if (parsed && typeof parsed === "object" && "publishAt" in parsed) {
      return { text: parsed.text ?? content, publishAt: parsed.publishAt };
    }
  } catch {
    // plain text
  }
  return { text: content };
}

function formatDate(timestamp: bigint): string {
  try {
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
  const revisionDue = getRevisionDueTopics(3);

  useEffect(() => {
    if (!actor || isFetching) return;
    setIsLoadingNotes(true);
    actor
      .getPremiumNotesList()
      .then((all: Note[]) => {
        const now = Date.now();
        const noticeItems = all
          .filter((n) => {
            if (n.subject !== "notice") return false;
            const { publishAt } = parseNoticeContent(n.content);
            if (publishAt !== undefined && publishAt > now) return false;
            return true;
          })
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
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="py-12 px-4 text-center border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
        <img
          src="/assets/generated/vidya-setu-logo-transparent.dim_400x200.png"
          alt="Vidya Setu AI"
          className="h-16 sm:h-20 w-auto object-contain mx-auto mb-4"
        />
        <h1 className="font-display font-bold text-3xl sm:text-4xl mb-2">
          Vidya Setu AI
        </h1>
        <p className="text-lg sm:text-xl font-semibold text-yellow-500 mb-2">
          Connecting You to Smarter Learning
        </p>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          WBCHSE, Calcutta University ও ICAI (CA) সিলেবাস অনুযায়ী সম্পূর্ণ সমাধান
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Revision Reminders */}
        {revisionDue.length > 0 && (
          <section data-ocid="revision.section">
            <div className="rounded-xl border border-orange-400/30 bg-orange-400/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <RefreshCw className="w-4 h-4 text-orange-400" />
                <h2 className="font-semibold text-orange-400 text-sm">
                  Revision Due — {revisionDue.length} টি topic
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {revisionDue.slice(0, 8).map((r) => (
                  <span
                    key={`${r.subject}::${r.chapter}`}
                    className="text-xs px-2 py-1 rounded-full bg-orange-400/15 border border-orange-400/25 text-orange-300"
                  >
                    {r.subject} — {r.chapter}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Notice Board */}
        <section data-ocid="notices.section">
          <h2 className="font-display font-bold text-xl mb-4 text-primary">
            Daily Updates / Notice Board 📢
          </h2>
          {isLoadingNotes ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Skeleton key={`skel-${i}`} className="h-24 rounded-xl" />
              ))}
            </div>
          ) : notices.length === 0 ? (
            <div
              className="rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-5 py-4 text-sm text-yellow-400/70"
              data-ocid="notices.empty_state"
            >
              কোনো নতুন আপডেট নেই। Admin শীঘ্রই নতুন বিজ্ঞপ্তি পোস্ট করবেন।
            </div>
          ) : (
            <div className="space-y-4">
              {notices.map((notice, idx) => {
                const { text } = parseNoticeContent(notice.content);
                const dateStr = formatDate(notice.createdAt);
                return (
                  <div
                    key={String(notice.id)}
                    className="rounded-xl px-5 py-4 border border-yellow-400/25 bg-yellow-400/5"
                    data-ocid={`notices.item.${idx + 1}`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-bold text-base text-yellow-400/90 flex-1">
                        {notice.title}
                      </h3>
                      {dateStr && (
                        <div className="flex items-center gap-1 text-xs text-yellow-400/60 shrink-0">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{dateStr}</span>
                        </div>
                      )}
                    </div>
                    <div className="border-t border-yellow-400/15 mb-3" />
                    <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground/75">
                      {text}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Quick Access */}
        <section data-ocid="quickaccess.section">
          <h2 className="font-display font-bold text-xl mb-4 text-primary">
            Quick Access
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {QUICK_ACCESS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  data-ocid={`quickaccess.${item.id}.button`}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${item.border} ${item.bg} hover:opacity-80 focus:outline-none`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${item.bg}`}
                  >
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <span className="text-xs font-semibold text-center leading-tight">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Popular Notes */}
        <section data-ocid="popularnotes.section">
          <h2 className="font-display font-bold text-xl mb-4 text-primary">
            Popular Notes 📚
          </h2>
          {isLoadingNotes ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={`note-skel-${i}`} className="h-28 rounded-xl" />
              ))}
            </div>
          ) : popularNotes.length === 0 ? (
            <div
              className="rounded-xl border border-border bg-muted/30 px-5 py-6 text-sm text-center text-muted-foreground"
              data-ocid="popularnotes.empty_state"
            >
              Admin শীঘ্রই Notes যোগ করবেন
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {popularNotes.map((note, idx) => (
                <div
                  key={String(note.id)}
                  className="rounded-xl p-4 border border-border bg-card flex flex-col gap-2"
                  data-ocid={`popularnotes.item.${idx + 1}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm leading-tight">
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
                    {(() => {
                      const c = note.content;
                      const marker = "__CONTENT__\n";
                      if (c.includes(marker))
                        return (
                          c.split(marker)[1]?.slice(0, 100) ?? c.slice(0, 100)
                        );
                      if (c.startsWith("__ATTACHMENTS__")) return "";
                      return c.slice(0, 100);
                    })()}
                    {note.content.length > 100 ? "..." : ""}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-auto self-start text-xs"
                    onClick={() => onNavigate("notes")}
                    data-ocid={`popularnotes.view_button.${idx + 1}`}
                  >
                    View in Notes
                  </Button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
