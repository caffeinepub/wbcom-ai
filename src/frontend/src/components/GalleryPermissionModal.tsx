import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImageIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const GALLERY_ASKED_KEY = "gallery_permission_asked";

export function GalleryPermissionModal() {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const asked = localStorage.getItem(GALLERY_ASKED_KEY);
    if (!asked) {
      // Slight delay so the app fully loads first
      const timer = setTimeout(() => setOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleAllow() {
    localStorage.setItem(GALLERY_ASKED_KEY, "allowed");
    // Trigger file input to prompt native gallery permission
    fileInputRef.current?.click();
    setOpen(false);
  }

  function handleSkip() {
    localStorage.setItem(GALLERY_ASKED_KEY, "skipped");
    setOpen(false);
  }

  return (
    <>
      {/* Hidden file input to trigger gallery permission */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={() => {
          // We don't need to do anything here — just triggering the permission prompt
          if (fileInputRef.current) fileInputRef.current.value = "";
        }}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-sm"
          data-ocid="gallery_permission.dialog"
        >
          <DialogHeader>
            <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center mx-auto mb-3">
              <ImageIcon className="w-6 h-6 text-navy" />
            </div>
            <DialogTitle className="text-center text-navy font-bold">
              গ্যালারি অ্যাক্সেস / Gallery Access
            </DialogTitle>
            <DialogDescription className="text-center text-sm leading-relaxed">
              আপনার প্রশ্ন বা সমস্যার সাথে ছবি পাঠাতে গ্যালারি অ্যাক্সেস দিন।
              <br />
              <span className="text-foreground/70">
                Allow gallery access to attach photos to your questions and
                support messages.
              </span>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button
              onClick={handleAllow}
              className="w-full bg-navy text-white hover:bg-navy/90 font-semibold"
              data-ocid="gallery_permission.confirm_button"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              অনুমতি দিন / Allow
            </Button>
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="w-full text-muted-foreground"
              data-ocid="gallery_permission.cancel_button"
            >
              <X className="w-4 h-4 mr-2" />
              এড়িয়ে যান / Skip
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
