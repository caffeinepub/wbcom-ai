import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Loader2, User } from "lucide-react";
import { useState } from "react";
import { useActor } from "../hooks/useActor";

interface UsernameModalProps {
  open: boolean;
  onSaved: (name: string) => void;
}

export function UsernameModal({ open, onSaved }: UsernameModalProps) {
  const { actor } = useActor();
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter a display name.");
      return;
    }
    if (!actor) {
      setError("Not connected. Please wait and try again.");
      return;
    }
    setIsSaving(true);
    setError("");
    try {
      await actor.saveCallerUserProfile({ name: trimmed });
      onSaved(trimmed);
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        showCloseButton={false}
        data-ocid="username.modal"
      >
        <DialogHeader className="text-center items-center">
          <div className="w-14 h-14 rounded-2xl bg-navy flex items-center justify-center mb-2 mx-auto">
            <GraduationCap className="w-7 h-7 text-gold" />
          </div>
          <DialogTitle className="text-navy text-xl font-display font-bold">
            Welcome to Vidya Setu AI! 🎉
          </DialogTitle>
          <DialogDescription className="text-center text-sm mt-1">
            আপনার নাম সেট করুন — এটি অ্যাপে প্রদর্শিত হবে।
            <br />
            <span className="text-muted-foreground text-xs">
              Set your display name to get started.
            </span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium text-navy">
              Display Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="username"
                data-ocid="username.input"
                placeholder="যেমন: Rahul Das"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                className="pl-9 border-navy/20 focus-visible:ring-navy"
                maxLength={50}
                autoFocus
              />
            </div>
            {error && (
              <p
                className="text-red-500 text-xs"
                data-ocid="username.error_state"
              >
                {error}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              data-ocid="username.submit_button"
              disabled={isSaving || !name.trim()}
              className="w-full bg-navy text-white hover:bg-navy/90 font-semibold"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save & Continue"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
