import { Toaster } from "@/components/ui/sonner";
import { useCallback, useEffect, useRef, useState } from "react";
import { AdminPage } from "./components/AdminPage";
import { CustomerCasePage } from "./components/CustomerCasePage";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { HeroBanner } from "./components/HeroBanner";
import { HistoryPage } from "./components/HistoryPage";
import { LawPage } from "./components/LawPage";
import { LoginPage } from "./components/LoginPage";
import { Navbar } from "./components/Navbar";
import { PremiumNotesPage } from "./components/PremiumNotesPage";
import { ProblemSolver } from "./components/ProblemSolver";
import { QuizPage } from "./components/QuizPage";
import { ScienceHomePage } from "./components/ScienceHomePage";
import { ScienceSolver } from "./components/ScienceSolver";
import { TermsModal } from "./components/TermsPage";
import { TopicGrid } from "./components/TopicGrid";
import { UsernameModal } from "./components/UsernameModal";
import { useActor } from "./hooks/useActor";
import { useInternetIdentity } from "./hooks/useInternetIdentity";

type Page =
  | "home"
  | "history"
  | "customerCase"
  | "admin"
  | "quiz"
  | "science"
  | "scienceSolver"
  | "notes"
  | "law";

function getLocalStorageKey(principalId: string) {
  return `wbcom_username_${principalId}`;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [activeTopic, setActiveTopic] = useState("journal");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [scienceSubject, setScienceSubject] = useState("");
  const [scienceClass, setScienceClass] = useState(11);
  const { identity } = useInternetIdentity();
  const { actor, isFetching } = useActor();
  const adminCheckDone = useRef(false);
  const profileCheckDone = useRef(false);
  const lastIdentityPrincipal = useRef<string | null>(null);
  const lastActorRef = useRef<unknown>(null);

  const checkAdmin = useCallback(
    async (retries = 5, delayMs = 800) => {
      if (!actor) return;
      setIsAdminLoading(true);
      for (let i = 0; i < retries; i++) {
        try {
          await actor.registerUser();
          const result = await actor.getIsAdmin();
          setIsAdmin(result);
          if (!result && i === 0) {
            const claimed = await actor.forceClaimAdmin();
            if (claimed) {
              setIsAdmin(true);
            }
          }
          setIsAdminLoading(false);
          return;
        } catch {
          if (i < retries - 1) {
            await new Promise((r) => setTimeout(r, delayMs * (i + 1)));
          }
        }
      }
      setIsAdminLoading(false);
    },
    [actor],
  );

  const checkProfile = useCallback(async () => {
    if (!actor || !identity) return;
    const principalId = identity.getPrincipal().toString();
    const localKey = getLocalStorageKey(principalId);
    const savedName = localStorage.getItem(localKey);

    if (savedName?.trim()) {
      setUsername(savedName.trim());
      setShowUsernameModal(false);
      return;
    }

    try {
      const profile = await actor.getCallerUserProfile();
      if (profile?.name?.trim()) {
        const name = profile.name.trim();
        localStorage.setItem(localKey, name);
        setUsername(name);
        setShowUsernameModal(false);
      } else {
        setShowUsernameModal(true);
      }
    } catch {
      setShowUsernameModal(true);
    }
  }, [actor, identity]);

  useEffect(() => {
    const currentPrincipal = identity?.getPrincipal().toString() ?? null;

    if (
      currentPrincipal !== lastIdentityPrincipal.current ||
      actor !== lastActorRef.current
    ) {
      adminCheckDone.current = false;
      profileCheckDone.current = false;
      lastIdentityPrincipal.current = currentPrincipal;
      lastActorRef.current = actor;
    }

    if (!identity || !actor || isFetching) {
      return;
    }

    if (!adminCheckDone.current) {
      adminCheckDone.current = true;
      checkAdmin();
    }

    if (!profileCheckDone.current) {
      profileCheckDone.current = true;
      checkProfile();
    }
  }, [identity, actor, isFetching, checkAdmin, checkProfile]);

  useEffect(() => {
    if (!identity) {
      setUsername("");
      setIsAdmin(false);
      setIsAdminLoading(false);
    }
  }, [identity]);

  function handleNavigate(page: string) {
    const p = page as Page;
    if (
      (p === "history" ||
        p === "customerCase" ||
        p === "admin" ||
        p === "quiz" ||
        p === "notes" ||
        p === "law") &&
      !identity
    )
      return;
    setCurrentPage(p);
  }

  function handleScienceSelect(subject: string, classLevel: number) {
    setScienceSubject(subject);
    setScienceClass(classLevel);
    setCurrentPage("scienceSolver");
  }

  function handleUsernameSaved(name: string) {
    setUsername(name);
    setShowUsernameModal(false);
    if (identity) {
      const principalId = identity.getPrincipal().toString();
      localStorage.setItem(getLocalStorageKey(principalId), name);
    }
  }

  if (!identity) {
    return (
      <>
        <Toaster richColors position="top-right" />
        <LoginPage />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isAdmin={isAdmin}
        isAdminLoading={isAdminLoading}
        username={username}
      />
      <Toaster richColors position="top-right" />

      <UsernameModal open={showUsernameModal} onSaved={handleUsernameSaved} />

      <main className="flex-1">
        {currentPage === "home" && (
          <>
            <HeroBanner />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <TopicGrid
                    activeTopic={activeTopic}
                    onSelect={setActiveTopic}
                  />
                  <div className="mt-6 bg-navy rounded-xl p-5 text-white">
                    <h3 className="font-display font-bold text-base mb-3">
                      Quick Tips 💡
                    </h3>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>
                        • Select a topic card on the left to switch the solver
                      </li>
                      <li>• Fill in the required fields and click Solve</li>
                      <li>• Login to save your solutions and track progress</li>
                      <li>• Solutions follow WBCHSE &amp; CU exam format</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <ProblemSolver activeTopic={activeTopic} />
                </div>
              </div>
            </div>
          </>
        )}

        {currentPage === "quiz" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <QuizPage onNavigate={handleNavigate} />
          </div>
        )}

        {currentPage === "history" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <HistoryPage />
          </div>
        )}

        {currentPage === "customerCase" && <CustomerCasePage />}

        {currentPage === "admin" && isAdmin && (
          <ErrorBoundary>
            <AdminPage />
          </ErrorBoundary>
        )}

        {currentPage === "science" && (
          <ScienceHomePage onSelect={handleScienceSelect} />
        )}

        {currentPage === "scienceSolver" && (
          <ScienceSolver
            subject={scienceSubject}
            classLevel={scienceClass}
            onBack={() => setCurrentPage("science")}
          />
        )}

        {currentPage === "notes" && (
          <ErrorBoundary>
            <PremiumNotesPage />
          </ErrorBoundary>
        )}

        {currentPage === "law" && <LawPage />}
      </main>

      <footer className="bg-navy text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-xs font-bold">W</span>
              </div>
              <div>
                <p className="font-display font-bold text-sm">WBCom AI</p>
                <p className="text-xs text-white/60">পশ্চিমবঙ্গের শিক্ষক</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-white/70">
                Founder &amp; CEO: Bikram Mandal | C.R.G.S
              </p>
            </div>
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()}. Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white/80"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
      <TermsModal />
    </div>
  );
}
