import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, Medal, Trophy } from "lucide-react";
import { useQuizHistory } from "../hooks/useQueries";

function rankIcon(rank: number) {
  if (rank === 1) return <Crown className="w-4 h-4 text-yellow-400" />;
  if (rank === 2) return <Medal className="w-4 h-4 text-slate-400" />;
  if (rank === 3) return <Medal className="w-4 h-4 text-amber-600" />;
  return (
    <span className="w-4 h-4 inline-flex items-center justify-center text-xs font-bold text-muted-foreground">
      {rank}
    </span>
  );
}

export function LeaderboardPage() {
  const { data: history, isLoading } = useQuizHistory();

  // Build personal best per topic
  const personalBest: Record<
    string,
    { score: number; total: number; pct: number }
  > = {};
  for (const r of history ?? []) {
    const score = Number(r.score);
    const total = Number(r.total);
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    const existing = personalBest[r.topic];
    if (!existing || pct > existing.pct) {
      personalBest[r.topic] = { score, total, pct };
    }
  }

  // Top scores (from personal best)
  const topScores = Object.entries(personalBest)
    .map(([topic, s]) => ({ topic, ...s }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 20);

  // Recent results
  const recentResults = [...(history ?? [])]
    .sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
    .slice(0, 20);

  return (
    <div data-ocid="leaderboard.page">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center border border-primary/25">
          <Trophy className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl">Leaderboard</h1>
          <p className="text-muted-foreground text-sm">
            আপনার Quiz স্কোর ও শ্রেষ্ঠ ফলাফল
          </p>
        </div>
      </div>

      <Tabs defaultValue="topscores">
        <TabsList className="mb-6">
          <TabsTrigger value="topscores">Top Scores by Topic</TabsTrigger>
          <TabsTrigger value="recent">Recent Results</TabsTrigger>
        </TabsList>

        <TabsContent value="topscores">
          {isLoading ? (
            <div
              className="text-center py-10 text-muted-foreground"
              data-ocid="leaderboard.loading_state"
            >
              Loading...
            </div>
          ) : topScores.length === 0 ? (
            <div
              className="text-center py-16 text-muted-foreground"
              data-ocid="leaderboard.empty_state"
            >
              <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">এখনো কোনো Quiz দেওয়া হয়নি</p>
              <p className="text-sm mt-1">Quiz দিন ও এখানে স্কোর দেখুন।</p>
            </div>
          ) : (
            <div className="space-y-2" data-ocid="leaderboard.list">
              {topScores.map((s, idx) => (
                <div
                  key={s.topic}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card"
                  data-ocid={`leaderboard.item.${idx + 1}`}
                >
                  <div className="w-8 flex items-center justify-center">
                    {rankIcon(idx + 1)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold capitalize">
                      {s.topic.replace(/_/g, " ")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {s.score}/{s.total} correct
                    </p>
                  </div>
                  <Badge
                    variant={
                      s.pct >= 80
                        ? "default"
                        : s.pct >= 60
                          ? "secondary"
                          : "outline"
                    }
                    className="text-xs"
                  >
                    {s.pct}%
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="recent">
          {recentResults.length === 0 ? (
            <div
              className="text-center py-16 text-muted-foreground"
              data-ocid="leaderboard.empty_state"
            >
              <Trophy className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>কোনো recent ফলাফল নেই।</p>
            </div>
          ) : (
            <div className="space-y-2">
              {recentResults.map((r, idx) => {
                const score = Number(r.score);
                const total = Number(r.total);
                const pct = total > 0 ? Math.round((score / total) * 100) : 0;
                return (
                  <Card
                    key={String(r.id)}
                    data-ocid={`leaderboard.item.${idx + 1}`}
                  >
                    <CardContent className="py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold capitalize">
                          {r.topic.replace(/_/g, " ")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(
                            Number(BigInt(String(r.timestamp)) / 1_000_000n),
                          ).toLocaleDateString("en-IN")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">
                          {score}/{total}
                        </span>
                        <Badge
                          variant={
                            pct >= 80
                              ? "default"
                              : pct >= 60
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {pct}%
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
