import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Scale, ShieldCheck } from "lucide-react";

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
              শর্তাবলী — Vidya Setu AI, Founder: Bikram Mandal | C.R.G.S
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

const TERMS_SECTIONS = [
  {
    title: "Educational Purpose Only",
    body: "This platform is created for educational purposes only. The content provided is meant for learning and general understanding. It is not intended to replace formal education, textbooks, or professional guidance.",
  },
  {
    title: "No Legal or Professional Advice",
    body: "The information provided on this platform — especially law-related content such as IPC, CrPC, BNS, BNSS, and other Indian acts — is strictly for educational and informational purposes only. It does NOT constitute legal advice. Users should consult a qualified legal professional or advocate for any legal matters, disputes, or decisions.",
  },
  {
    title: "Accuracy Disclaimer",
    body: "We strive to provide accurate, updated, and syllabus-aligned information. However, we do not guarantee that all content is 100% correct or complete. Laws, syllabi, and academic content may change over time. Users are encouraged to verify information from official sources such as India Code (indiacode.nic.in), WBCHSE official website, and Calcutta University publications.",
  },
  {
    title: "User Responsibility",
    body: "Users are solely responsible for how they use the information provided on this platform. Vidya Setu AI is not responsible for any decisions, actions, or consequences arising from the use of content available here. By using this platform, you acknowledge that you are using all content at your own risk and discretion.",
  },
  {
    title: "Privacy",
    body: "We respect user privacy and are committed to protecting your personal information. Login is handled securely via Internet Identity (ICP) — a decentralized, passwordless authentication system. We do not share personal information with third parties without explicit user consent. We collect only what is necessary to provide the service, such as saved problem history and display names.",
  },
  {
    title: "Misuse Policy",
    body: "Users must not misuse this platform in any way. Prohibited activities include: spreading harmful, offensive, or illegal content; attempting to hack, exploit, or damage the system or its infrastructure; impersonating other users or administrators; using the platform for any commercial purpose without authorization; and violating the privacy or rights of other users. Violations may result in immediate account suspension.",
  },
  {
    title: "Changes to Terms",
    body: "Vidya Setu AI reserves the right to update, modify, or replace these Terms and Conditions at any time without prior notice. It is the user's responsibility to review these terms periodically. Continued use of the platform after any changes constitutes acceptance of the revised terms.",
  },
  {
    title: "Contact & Support",
    body: "For any issues, feedback, or support requests, users can reach out through the Customer Support section within the app. You can also contact us via Instagram DM at @wbcomai. For premium notes access requests, please DM us directly on Instagram.",
  },
  {
    title: "Disclaimer of Affiliation",
    body: "This platform — Vidya Setu AI — is not affiliated, associated, authorized, endorsed by, or in any way officially connected with WBCHSE (West Bengal Council of Higher Secondary Education), Calcutta University, or any of their subsidiaries or affiliates. All content, study materials, law explanations, and solutions are provided independently for educational purposes only. WBCHSE and Calcutta University are registered trademarks of their respective owners.",
  },
];

export function TermsFullPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-background" data-ocid="terms.page">
      {/* Header */}
      <div className="bg-navy text-white py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10 mb-6 -ml-2"
            onClick={onBack}
            data-ocid="terms.close_button"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-gold" />
            </div>
            <h1 className="text-3xl font-display font-bold tracking-tight">
              Terms &amp; Conditions
            </h1>
          </div>
          <p className="text-white/60 text-sm max-w-xl">
            Please read these terms carefully before using Vidya Setu AI. By
            accessing or using our platform, you agree to be bound by these
            terms.
          </p>
          <p className="text-white/40 text-xs mt-3">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
        {TERMS_SECTIONS.map((section, index) => (
          <div
            key={section.title}
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
            data-ocid={`terms.item.${index + 1}`}
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-gold">{index + 1}</span>
              </div>
              <div>
                <h2 className="font-semibold text-foreground text-base mb-2">
                  {section.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {section.body}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Footer note */}
        <div className="text-center py-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Vidya Setu AI — Founder &amp; CEO:
            Bikram Mandal | C.R.G.S
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            শর্তাবলী | পশ্চিমবঙ্গের শিক্ষার্থীদের জন্য
          </p>
        </div>
      </div>
    </div>
  );
}
