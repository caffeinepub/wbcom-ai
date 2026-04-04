import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MessageCircleQuestion, Reply, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useGetMyCustomerMessages } from "../hooks/useQueries";
import {
  ImageUploader,
  MessageImages,
  type UploadedImage,
  formatImagesAppend,
  parseImagesFromMessage,
} from "./ImageUploader";

interface DoubtPageProps {
  username: string;
}

export function DoubtPage({ username }: DoubtPageProps) {
  const { actor } = useActor();
  const { data: doubts, isLoading, refetch } = useGetMyCustomerMessages();
  const [question, setQuestion] = useState("");
  const [sending, setSending] = useState(false);
  const [doubtImages, setDoubtImages] = useState<UploadedImage[]>([]);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  async function submitDoubt() {
    if (!question.trim()) return;
    if (!actor) {
      toast.error("সংযোগ নেই");
      return;
    }
    setSending(true);
    try {
      const imageAppend = formatImagesAppend(doubtImages.map((img) => img.url));
      const fullQuestion = question.trim() + imageAppend;
      await actor.submitCustomerMessage(username || "Student", fullQuestion);
      toast.success("আপনার প্রশ্ন পাঠানো হয়েছে!");
      setQuestion("");
      setDoubtImages([]);
      refetch();
    } catch {
      toast.error("পাঠানো সম্ভব হয়নি");
    } finally {
      setSending(false);
    }
  }

  return (
    <div data-ocid="doubt.page">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center border border-primary/25">
          <MessageCircleQuestion className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl">Doubt Section</h1>
          <p className="text-muted-foreground text-sm">
            প্রশ্ন পোস্ট করুন, Admin উত্তর দেবেন
          </p>
        </div>
      </div>

      {/* Ask a doubt */}
      <Card className="mb-6" data-ocid="doubt.card">
        <CardContent className="pt-4 space-y-3">
          <p className="text-sm font-semibold">নতুন প্রশ্ন / Ask a Doubt</p>
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="আপনার প্রশ্ন বা সমস্যা লিখুন... / Type your question or doubt..."
            rows={4}
            data-ocid="doubt.textarea"
          />

          {/* Image uploader */}
          <ImageUploader onImagesChange={setDoubtImages} maxImages={5} />

          <Button
            onClick={submitDoubt}
            disabled={!question.trim() || sending}
            data-ocid="doubt.submit_button"
          >
            {sending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            {sending ? "পাঠানো হচ্ছে..." : "প্রশ্ন পাঠান / Submit"}
          </Button>
        </CardContent>
      </Card>

      {/* My doubts */}
      <div>
        <h2 className="font-semibold text-base mb-3">
          আমার প্রশ্নসমূহ / My Doubts
        </h2>
        {isLoading ? (
          <div
            className="text-center py-10 text-muted-foreground"
            data-ocid="doubt.loading_state"
          >
            <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin opacity-40" />
            <p>লোড হচ্ছে...</p>
          </div>
        ) : !doubts || doubts.length === 0 ? (
          <div
            className="text-center py-12 text-muted-foreground"
            data-ocid="doubt.empty_state"
          >
            <MessageCircleQuestion className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>এখনো কোনো প্রশ্ন পাওয়া যায়নি।</p>
            <p className="text-sm mt-1">উপরে প্রশ্ন পাঠান।</p>
          </div>
        ) : (
          <div className="space-y-4" data-ocid="doubt.list">
            {[...doubts].reverse().map((d, idx) => {
              const reply =
                Array.isArray(d.adminReply) && d.adminReply.length > 0
                  ? d.adminReply[0]
                  : null;
              const { text: msgText, imageUrls } = parseImagesFromMessage(
                d.message,
              );
              return (
                <Card key={String(d.id)} data-ocid={`doubt.item.${idx + 1}`}>
                  <CardContent className="pt-4 space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {new Date(
                          Number(BigInt(String(d.timestamp)) / 1_000_000n),
                        ).toLocaleString("en-IN")}
                      </p>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {msgText}
                      </p>
                      <MessageImages
                        imageUrls={imageUrls}
                        onImageClick={setLightboxUrl}
                      />
                    </div>
                    {reply ? (
                      <div className="rounded-lg bg-green-500/10 border border-green-500/30 p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Reply className="w-3.5 h-3.5 text-green-400" />
                          <p className="text-xs font-semibold text-green-400">
                            Admin Reply
                          </p>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{reply}</p>
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground italic">
                        এখনো উত্তর দেওয়া হয়নি। Admin শীঘ্রই দেবেন।
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!lightboxUrl} onOpenChange={() => setLightboxUrl(null)}>
        <DialogContent className="max-w-3xl p-2 bg-black/90 border-none">
          {lightboxUrl && (
            <img
              src={lightboxUrl}
              alt="Enlarged view"
              className="w-full max-h-[80vh] object-contain rounded"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
