import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bookmark, BookmarkX, Search } from "lucide-react";
import { useCallback, useState } from "react";

export interface BookmarkItem {
  id: string;
  type: "note" | "question" | "lawSection";
  title: string;
  content: string;
  subject?: string;
  savedAt: number;
}

const STORAGE_KEY = "vs_bookmarks";

function loadBookmarks(): BookmarkItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BookmarkItem[]) : [];
  } catch {
    return [];
  }
}

function saveBookmarksToStorage(items: BookmarkItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(loadBookmarks);

  const addBookmark = useCallback((item: BookmarkItem) => {
    setBookmarks((prev) => {
      const filtered = prev.filter((b) => b.id !== item.id);
      const next = [...filtered, item];
      saveBookmarksToStorage(next);
      return next;
    });
  }, []);

  const removeBookmark = useCallback((id: string) => {
    setBookmarks((prev) => {
      const next = prev.filter((b) => b.id !== id);
      saveBookmarksToStorage(next);
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (id: string) => bookmarks.some((b) => b.id === id),
    [bookmarks],
  );

  return { bookmarks, addBookmark, removeBookmark, isBookmarked };
}

const TYPE_LABELS: Record<BookmarkItem["type"], string> = {
  note: "Note",
  question: "Question",
  lawSection: "Law Section",
};

const TYPE_COLORS: Record<BookmarkItem["type"], string> = {
  note: "bg-violet-400/15 text-violet-300 border-violet-400/25",
  question: "bg-cyan-400/15 text-cyan-300 border-cyan-400/25",
  lawSection: "bg-indigo-400/15 text-indigo-300 border-indigo-400/25",
};

export function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | BookmarkItem["type"]>("all");

  const filtered = bookmarks
    .filter((b) => filter === "all" || b.type === filter)
    .filter((b) => {
      const q = query.toLowerCase();
      return (
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.content.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => b.savedAt - a.savedAt);

  return (
    <div data-ocid="bookmarks.page">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center border border-primary/25">
          <Bookmark className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl">Bookmarks</h1>
          <p className="text-muted-foreground text-sm">
            সংরক্ষিত নোট, প্রশ্ন ও আইন বিভাগ
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bookmarks..."
            className="pl-9"
            data-ocid="bookmarks.search_input"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="border border-border rounded-md px-3 py-2 text-sm bg-background"
          data-ocid="bookmarks.select"
        >
          <option value="all">All Types</option>
          <option value="note">Notes</option>
          <option value="question">Questions</option>
          <option value="lawSection">Law Sections</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="bookmarks.empty_state"
        >
          <BookmarkX className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">কোনো bookmark নেই</p>
          <p className="text-sm mt-1">
            আইন বিভাগ বা Q&A Bank থেকে বিষয়সমূহ bookmark করুন।
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            {filtered.length} saved items
          </p>
          {filtered.map((b, idx) => (
            <div
              key={b.id}
              className="rounded-xl border border-border bg-card p-4"
              data-ocid={`bookmarks.item.${idx + 1}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={`text-xs border ${TYPE_COLORS[b.type]}`}>
                      {TYPE_LABELS[b.type]}
                    </Badge>
                    {b.subject && (
                      <span className="text-xs text-muted-foreground">
                        {b.subject}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm leading-tight mb-1">
                    {b.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {b.content}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                  onClick={() => removeBookmark(b.id)}
                  data-ocid={`bookmarks.delete_button.${idx + 1}`}
                >
                  <BookmarkX className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Saved{" "}
                {new Date(b.savedAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
