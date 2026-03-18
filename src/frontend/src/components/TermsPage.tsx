import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scale } from "lucide-react";

export function TermsModal({ trigger }: { trigger?: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? (
          <button
            type="button"
            className="text-white/50 text-xs underline hover:text-gold transition-colors"
            data-ocid="terms.open_modal_button"
          >
            Terms &amp; Conditions
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg" data-ocid="terms.dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-navy">
            <Scale className="w-5 h-5 text-gold" />
            Terms &amp; Conditions
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-2">
          <div className="space-y-5 text-sm text-foreground">
            <div className="bg-navy/5 rounded-lg p-4 border border-navy/10">
              <h3 className="font-semibold text-navy mb-2 text-base">
                1. User Responsibility
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Users are responsible for the content they submit. We do not
                support sharing copyrighted or illegal material.
              </p>
            </div>

            <div className="bg-gold/5 rounded-lg p-4 border border-gold/20">
              <h3 className="font-semibold text-navy mb-2 text-base">
                2. Affiliation Disclaimer
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                This platform is not officially affiliated with WBCHSE or
                Calcutta University.
              </p>
            </div>

            <div className="bg-navy/5 rounded-lg p-4 border border-navy/10">
              <h3 className="font-semibold text-navy mb-2 text-base">
                3. Educational Purpose &amp; Accuracy
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The solutions provided on this platform are for educational
                purposes only. We do not guarantee 100% accuracy. Users are
                advised to verify answers independently.
              </p>
            </div>

            <div className="bg-navy/5 rounded-lg p-4 border border-navy/10">
              <h3 className="font-semibold text-navy mb-2 text-base">
                4. Privacy
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Login is handled via Internet Identity (ICP). We do not share
                your personal information with anyone, and collect only what is
                necessary to save your problem history.
              </p>
            </div>

            <div className="bg-navy/5 rounded-lg p-4 border border-navy/10">
              <h3 className="font-semibold text-navy mb-2 text-base">
                5. Changes to Terms
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time.
                Continued use of the platform constitutes acceptance of the
                updated terms.
              </p>
            </div>

            <p className="text-xs text-muted-foreground text-center pt-2">
              শর্তাবলী — WBCom AI, Founder: Bikram Mandal | C.R.G.S
            </p>
          </div>
        </ScrollArea>
        <div className="flex justify-end pt-2">
          <DialogTrigger asChild>
            <Button
              variant="default"
              className="bg-navy text-white hover:bg-navy/90"
              data-ocid="terms.close_button"
            >
              বুঝলাম / I Understand
            </Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
}
