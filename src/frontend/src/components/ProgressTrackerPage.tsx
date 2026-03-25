import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2, RefreshCw } from "lucide-react";
import {
  getRevisionDueTopics,
  getStudyHistory,
} from "../utils/progressTracker";

const SUBJECTS = [
  {
    name: "Accountancy",
    chapters: [
      "Journal Entry",
      "Ledger",
      "Trial Balance",
      "Financial Statements",
      "Partnership",
      "Company Accounts",
      "Cash Flow",
    ],
  },
  {
    name: "Science",
    chapters: [
      "Mechanics",
      "Thermodynamics",
      "Optics",
      "Electrostatics",
      "Current Electricity",
      "Organic Chemistry",
      "Cell Biology",
      "Genetics",
    ],
  },
  {
    name: "Arts",
    chapters: [
      "Ancient History",
      "Medieval History",
      "Modern History",
      "Indian Politics",
      "Geography",
      "Bengali Literature",
      "English Literature",
    ],
  },
  {
    name: "Commerce",
    chapters: [
      "Business Studies",
      "Economics",
      "Commercial Mathematics",
      "Computer Application",
    ],
  },
  {
    name: "Law",
    chapters: [
      "IPC",
      "CrPC",
      "BNS",
      "BNSS",
      "Constitution",
      "HMA",
      "IT Act",
      "Contract Act",
    ],
  },
  {
    name: "NEET",
    chapters: [
      "Mechanics",
      "Thermodynamics",
      "Mole Concept",
      "Cell Structure",
      "Human Physiology",
      "Genetics & Evolution",
      "Ecology",
    ],
  },
  {
    name: "CA",
    chapters: [
      "Accounting Concepts",
      "Bills of Exchange",
      "Partnership Accounts",
      "Contract Law",
      "GST",
      "Income Tax",
    ],
  },
];

export function ProgressTrackerPage() {
  const history = getStudyHistory();
  const revisionDue = getRevisionDueTopics(3);

  const studiedSet = new Set(history.map((r) => `${r.subject}::${r.chapter}`));

  return (
    <div data-ocid="progress.page">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center border border-primary/25">
          <BarChart2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl">Progress Tracker</h1>
          <p className="text-muted-foreground text-sm">আপনি কতটুকু পড়েছেন দেখুন</p>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revision">
            Revision Due
            {revisionDue.length > 0 && (
              <Badge variant="destructive" className="ml-1.5 text-xs">
                {revisionDue.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="history">Study History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-4">
            {SUBJECTS.map((subj) => {
              const studied = subj.chapters.filter((ch) =>
                studiedSet.has(`${subj.name}::${ch}`),
              ).length;
              const pct =
                subj.chapters.length > 0
                  ? Math.round((studied / subj.chapters.length) * 100)
                  : 0;
              return (
                <Card key={subj.name} data-ocid="progress.card">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold">
                        {subj.name}
                      </CardTitle>
                      <span className="text-xs text-muted-foreground">
                        {studied}/{subj.chapters.length} chapters
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Progress value={pct} className="mb-3 h-2" />
                    <div className="flex flex-wrap gap-1.5">
                      {subj.chapters.map((ch) => {
                        const done = studiedSet.has(`${subj.name}::${ch}`);
                        return (
                          <Badge
                            key={ch}
                            variant={done ? "default" : "outline"}
                            className="text-xs"
                          >
                            {ch}
                          </Badge>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="revision">
          {revisionDue.length === 0 ? (
            <div
              className="text-center py-16 text-muted-foreground"
              data-ocid="progress.empty_state"
            >
              <RefreshCw className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">সব টিক আছে! কোনো revision বাকি নেই।</p>
              <p className="text-sm mt-1">
                Topics not studied in 3+ days will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {revisionDue.map((r, idx) => (
                <Card
                  key={`${r.subject}::${r.chapter}`}
                  className="border-orange-400/30 bg-orange-400/5"
                  data-ocid={`progress.item.${idx + 1}`}
                >
                  <CardContent className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{r.chapter}</p>
                      <p className="text-xs text-muted-foreground">
                        {r.subject}
                      </p>
                    </div>
                    <div className="text-xs text-orange-400">
                      {Math.floor(
                        (Date.now() - r.studiedAt) / (1000 * 60 * 60 * 24),
                      )}{" "}
                      days ago
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history">
          {history.length === 0 ? (
            <div
              className="text-center py-16 text-muted-foreground"
              data-ocid="progress.empty_state"
            >
              <BarChart2 className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">এখনো কোনো অধ্যয়ন ইতিহাস নেই।</p>
              <p className="text-sm mt-1">
                Study some topics to see your history here.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {[...history]
                .reverse()
                .slice(0, 50)
                .map((r, idx) => (
                  <div
                    key={`${r.subject}::${r.chapter}::${r.studiedAt}`}
                    className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-border bg-card"
                    data-ocid={`progress.item.${idx + 1}`}
                  >
                    <div>
                      <p className="text-sm font-medium">{r.chapter}</p>
                      <p className="text-xs text-muted-foreground">
                        {r.subject}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(r.studiedAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
