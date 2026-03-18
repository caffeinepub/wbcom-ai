import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { MessageSquare, Reply, ShieldCheck, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import {
  useGetCustomerMessages,
  useGetUserCount,
  useReplyToCustomerMessage,
} from "../hooks/useQueries";

export function AdminPage() {
  const { data: userCount, isLoading: loadingCount } = useGetUserCount();
  const { data: messages, isLoading: loadingMessages } =
    useGetCustomerMessages();
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const replyMutation = useReplyToCustomerMessage();

  const [openReplyId, setOpenReplyId] = useState<bigint | null>(null);
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});

  async function handleDeleteMessage(id: bigint) {
    if (!actor) return;
    try {
      await (actor as any).deleteCustomerMessage(id);
      queryClient.invalidateQueries({ queryKey: ["customerMessages"] });
      toast.success("Message removed.");
    } catch {
      toast.error("Failed to remove message.");
    }
  }

  async function handleSendReply(id: bigint) {
    const key = String(id);
    const text = (replyTexts[key] || "").trim();
    if (!text) {
      toast.error("উত্তর লিখুন / Please enter a reply");
      return;
    }
    replyMutation.mutate(
      { id, replyText: text },
      {
        onSuccess: () => {
          toast.success("উত্তর পাঠানো হয়েছে / Reply sent!");
          setOpenReplyId(null);
          setReplyTexts((prev) => ({ ...prev, [key]: "" }));
        },
        onError: () => {
          toast.error("উত্তর পাঠানো যায়নি / Failed to send reply");
        },
      },
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8" data-ocid="admin.page">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-11 h-11 rounded-xl bg-navy flex items-center justify-center shadow-md">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-navy">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            অ্যাডমিন ড্যাশবোর্ড — Bikram Mandal
          </p>
        </div>
        <Badge className="ml-auto bg-gold/20 text-gold border-gold/30 font-semibold">
          Admin
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Card className="border-navy/20 shadow-sm" data-ocid="admin.card">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              মোট ব্যবহারকারী / Total Users
            </CardTitle>
            <Users className="w-4 h-4 text-navy" />
          </CardHeader>
          <CardContent>
            {loadingCount ? (
              <Skeleton className="h-9 w-20" data-ocid="admin.loading_state" />
            ) : (
              <p className="text-4xl font-display font-bold text-navy">
                {userCount !== undefined ? String(userCount) : "—"}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Registered Internet Identity users
            </p>
          </CardContent>
        </Card>

        <Card className="border-navy/20 shadow-sm" data-ocid="admin.card">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              মোট বার্তা / Total Messages
            </CardTitle>
            <MessageSquare className="w-4 h-4 text-navy" />
          </CardHeader>
          <CardContent>
            {loadingMessages ? (
              <Skeleton className="h-9 w-20" />
            ) : (
              <p className="text-4xl font-display font-bold text-navy">
                {messages ? messages.length : "—"}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Customer support messages received
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      <Card className="border-navy/20 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-navy flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Customer Support Messages / গ্রাহক সেবার বার্তা
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingMessages ? (
            <div className="space-y-3" data-ocid="admin.loading_state">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : !messages || messages.length === 0 ? (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="admin.empty_state"
            >
              <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">কোনো বার্তা নেই</p>
              <p className="text-sm mt-1">No customer messages yet.</p>
            </div>
          ) : (
            <div className="space-y-4" data-ocid="admin.table">
              {messages.map((msg, idx) => {
                const key = String(msg.id);
                // adminReply is Candid optional: [] | [string]
                const existingReply =
                  msg.adminReply.length > 0 ? msg.adminReply[0] : null;
                const isOpen = openReplyId === msg.id;

                return (
                  <div
                    key={key}
                    className="border border-navy/15 rounded-lg p-4 bg-white/60"
                    data-ocid={`admin.row.${idx + 1}`}
                  >
                    {/* Top row: name + time + actions */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="font-semibold text-navy text-sm">
                          {msg.senderName || "Anonymous"}
                        </span>
                        <span className="ml-3 text-xs text-muted-foreground">
                          {new Date(
                            Number(msg.timestamp / 1_000_000n),
                          ).toLocaleString("bn-IN")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 px-2 text-xs border-navy/20 text-navy hover:bg-navy/10"
                          onClick={() => setOpenReplyId(isOpen ? null : msg.id)}
                          data-ocid={`admin.secondary_button.${idx + 1}`}
                        >
                          <Reply className="w-3 h-3 mr-1" />
                          {isOpen ? "বন্ধ করুন" : "Reply"}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                          onClick={() => handleDeleteMessage(msg.id)}
                          data-ocid={`admin.delete_button.${idx + 1}`}
                          title="Remove message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Message text */}
                    <p className="text-sm text-foreground whitespace-pre-wrap mb-3">
                      {msg.message}
                    </p>

                    {/* Existing admin reply */}
                    {existingReply && (
                      <div className="rounded-md bg-teal-50 border border-teal-200 px-3 py-2 mb-3">
                        <p className="text-xs font-semibold text-teal-700 mb-0.5">
                          ✅ Admin Reply / অ্যাডমিনের উত্তর:
                        </p>
                        <p className="text-sm text-teal-800 whitespace-pre-wrap">
                          {existingReply}
                        </p>
                      </div>
                    )}

                    {/* Reply input box */}
                    {isOpen && (
                      <div className="mt-2 space-y-2">
                        <Textarea
                          placeholder="উত্তর লিখুন / Type your reply..."
                          className="min-h-20 text-sm border-navy/20 focus-visible:ring-navy/30"
                          value={replyTexts[key] || ""}
                          onChange={(e) =>
                            setReplyTexts((prev) => ({
                              ...prev,
                              [key]: e.target.value,
                            }))
                          }
                          data-ocid="admin.textarea"
                        />
                        <Button
                          size="sm"
                          className="bg-navy text-white hover:bg-navy/90 text-xs px-4"
                          onClick={() => handleSendReply(msg.id)}
                          disabled={replyMutation.isPending}
                          data-ocid={`admin.submit_button.${idx + 1}`}
                        >
                          {replyMutation.isPending ? (
                            "পাঠানো হচ্ছে..."
                          ) : (
                            <>
                              <Reply className="w-3 h-3 mr-1" />
                              উত্তর পাঠান / Send Reply
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
