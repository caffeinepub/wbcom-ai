import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, History, Search, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Problem } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useProblemHistory } from "../hooks/useQueries";

const TYPE_LABELS: Record<string, string> = {
  journalEntry: "Journal Entry",
  cashFlowStatement: "Cash Flow",
  balanceSheet: "Balance Sheet",
  ledgerPostings: "Ledger / Ratio",
  incomeStatement: "Depreciation / NPO",
  trialBalance: "Partnership",
};

export function HistoryPage() {
  const { data: problems, isLoading } = useProblemHistory();
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  function formatDate(ts: bigint) {
    const ms = Number(ts) / 1_000_000;
    return new Date(ms).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  async function handleDelete(id: bigint) {
    if (!actor) return;
    try {
      await actor.deleteProblem(id);
      queryClient.invalidateQueries({ queryKey: ["problemHistory"] });
      toast.success("Deleted successfully");
    } catch {
      toast.error("Failed to delete");
    }
  }

  const filtered = (problems ?? []).filter((p: Problem) => {
    const label = TYPE_LABELS[p.type] ?? p.type;
    return label.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">
            My History
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            আমার সমস্যার ইতিহাস
          </p>
        </div>
        <History className="w-8 h-8 text-navy/30" />
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          data-ocid="history.search_input"
          className="pl-9"
          placeholder="Search by topic..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading && (
        <div className="space-y-3" data-ocid="history.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <div className="text-center py-16" data-ocid="history.empty_state">
          <div className="w-16 h-16 rounded-full bg-navy/5 flex items-center justify-center mx-auto mb-4">
            <History className="w-8 h-8 text-navy/30" />
          </div>
          <p className="text-muted-foreground font-medium">
            No saved problems yet.
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Solve a problem and click "Save" to see it here.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((problem: Problem, idx: number) => (
          <motion.div
            key={problem.id.toString()}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            className="bg-card rounded-xl border border-border shadow-xs overflow-hidden"
            data-ocid={`history.item.${idx + 1}`}
          >
            <button
              className="flex w-full items-center justify-between p-4 cursor-pointer hover:bg-secondary/30 transition-colors text-left"
              type="button"
              onClick={() =>
                setExpanded((e) =>
                  e === problem.id.toString() ? null : problem.id.toString(),
                )
              }
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-navy/10 flex items-center justify-center">
                  <History className="w-4 h-4 text-navy" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="text-xs bg-navy/10 text-navy border-0"
                    >
                      {TYPE_LABELS[String(problem.type)] ??
                        String(problem.type)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(problem.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5 truncate max-w-xs">
                    {problem.jsonInput.slice(0, 80)}...
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(problem.id);
                  }}
                  data-ocid={`history.delete_button.${idx + 1}`}
                  className="text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                {expanded === problem.id.toString() ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </button>

            <AnimatePresence>
              {expanded === problem.id.toString() && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border p-4 bg-secondary/20">
                    <p className="text-xs font-bold text-navy uppercase tracking-wide mb-2">
                      Saved Solution
                    </p>
                    <pre className="text-xs text-foreground whitespace-pre-wrap font-mono bg-card rounded-lg p-3 border border-border overflow-x-auto">
                      {problem.solution}
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
