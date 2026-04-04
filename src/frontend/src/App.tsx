import { Toaster } from "@/components/ui/sonner";
import { useCallback, useEffect, useRef, useState } from "react";
import { AppContextProvider } from "./AppContext";
import { AdminPage } from "./components/AdminPage";
import { ArtsHomePage } from "./components/ArtsHomePage";
import { ArtsSolver } from "./components/ArtsSolver";
import { BookmarksPage } from "./components/BookmarksPage";
import { BottomMobileNav } from "./components/BottomMobileNav";
import { CAHomePage } from "./components/CAHomePage";
import { CASolver } from "./components/CASolver";
import { CMAHomePage } from "./components/CMAHomePage";
import { CMASolver } from "./components/CMASolver";
import { CommerceHomePage } from "./components/CommerceHomePage";
import { CommerceSolver } from "./components/CommerceSolver";
import { CustomerCasePage } from "./components/CustomerCasePage";
import { DoubtPage } from "./components/DoubtPage";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { GalleryPermissionModal } from "./components/GalleryPermissionModal";
import { HistoryPage } from "./components/HistoryPage";
import { HomePage } from "./components/HomePage";
import { LawPage } from "./components/LawPage";
import { LeaderboardPage } from "./components/LeaderboardPage";
import { LoginPage } from "./components/LoginPage";
import { MockTestPage } from "./components/MockTestPage";
import { Navbar } from "./components/Navbar";
import { NeetHomePage } from "./components/NeetHomePage";
import { NeetSolver } from "./components/NeetSolver";
import { PremiumNotesPage } from "./components/PremiumNotesPage";
import { ProgressTrackerPage } from "./components/ProgressTrackerPage";
import { QAPage } from "./components/QAPage";
import { QuizPage } from "./components/QuizPage";
import { SSCPage } from "./components/SSCPage";
import { ScienceHomePage } from "./components/ScienceHomePage";
import { ScienceSolver } from "./components/ScienceSolver";
import { TermsFullPage, TermsModal } from "./components/TermsPage";
import { UsernameModal } from "./components/UsernameModal";
import type { CALevel } from "./data/caSubjects";
import type { CMALevel } from "./data/cmaSubjects";
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
  | "law"
  | "arts"
  | "artsSolver"
  | "commerce"
  | "commerceSolver"
  | "terms"
  | "neet"
  | "neetSolver"
  | "ca"
  | "caSolver"
  | "cma"
  | "cmaSolver"
  | "qa"
  | "mockTest"
  | "progress"
  | "bookmarks"
  | "doubt"
  | "leaderboard"
  | "ssc";

function getLocalStorageKey(principalId: string) {
  return `wbcom_username_${principalId}`;
}

function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const goOffline = () => {
      setIsOffline(true);
      setDismissed(false);
    };
    const goOnline = () => setIsOffline(false);
    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);
    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, []);

  // Add padding to main content when banner is visible
  useEffect(() => {
    const main = document.getElementById("main-content");
    if (main) main.style.paddingBottom = isOffline && !dismissed ? "3rem" : "";
  }, [isOffline, dismissed]);

  if (!isOffline || dismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "#d97706",
        color: "#fff",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "13px",
        fontWeight: 500,
        boxShadow: "0 -2px 12px rgba(0,0,0,0.3)",
      }}
    >
      <span>
        ⚠️ আপনি এখন অফলাইনে আছেন — সম্প্রতি দেখা content দেখা যাবে। You&apos;re offline
        — recently viewed content is available.
      </span>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        style={{
          background: "rgba(255,255,255,0.2)",
          border: "none",
          borderRadius: "4px",
          color: "#fff",
          cursor: "pointer",
          padding: "2px 10px",
          fontSize: "13px",
          marginLeft: "12px",
        }}
      >
        ✕
      </button>
    </div>
  );
}

function AppInner() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [scienceSubject, setScienceSubject] = useState("");
  const [scienceClass, setScienceClass] = useState(11);
  const [artsSubject, setArtsSubject] = useState("");
  const [artsClass, setArtsClass] = useState(11);
  const [commerceSubject, setCommerceSubject] = useState("");
  const [commerceClass, setCommerceClass] = useState(11);
  const [neetSubject, setNeetSubject] = useState("");
  const [neetClass, setNeetClass] = useState(11);
  const [caLevel, setCaLevel] = useState<CALevel>("foundation");
  const [caSubject, setCaSubject] = useState("");
  const [cmaLevel, setCmaLevel] = useState<CMALevel>("foundation");
  const [cmaSubject, setCmaSubject] = useState("");
  const { identity } = useInternetIdentity();
  const { actor, isFetching } = useActor();
  const adminCheckDone = useRef(false);
  const profileCheckDone = useRef(false);
  const lastIdentityPrincipal = useRef<string | null>(null);
  const lastActorRef = useRef<unknown>(null);
  const loginRecorded = useRef(false);

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
            if (claimed) setIsAdmin(true);
          }
          setIsAdminLoading(false);
          return;
        } catch {
          if (i < retries - 1)
            await new Promise((r) => setTimeout(r, delayMs * (i + 1)));
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
      if (!loginRecorded.current) {
        loginRecorded.current = true;
        actor.recordLogin(savedName.trim()).catch(() => {});
      }
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
      loginRecorded.current = false;
      lastIdentityPrincipal.current = currentPrincipal;
      lastActorRef.current = actor;
    }
    if (!identity || !actor || isFetching) return;
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
        p === "law" ||
        p === "commerce" ||
        p === "doubt" ||
        p === "leaderboard") &&
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

  function handleArtsSelect(subject: string, classLevel: number) {
    setArtsSubject(subject);
    setArtsClass(classLevel);
    setCurrentPage("artsSolver");
  }

  function handleCommerceSelect(subject: string, classLevel: number) {
    setCommerceSubject(subject);
    setCommerceClass(classLevel);
    setCurrentPage("commerceSolver");
  }

  function handleNeetSelect(subject: string, classLevel: number) {
    setNeetSubject(subject);
    setNeetClass(classLevel);
    setCurrentPage("neetSolver");
  }

  function handleCASelect(level: CALevel, subject: string) {
    setCaLevel(level);
    setCaSubject(subject);
    setCurrentPage("caSolver");
  }

  function handleCMASelect(level: CMALevel, subject: string) {
    setCmaLevel(level);
    setCmaSubject(subject);
    setCurrentPage("cmaSolver");
  }

  function handleUsernameSaved(name: string) {
    setUsername(name);
    setShowUsernameModal(false);
    if (identity) {
      const principalId = identity.getPrincipal().toString();
      localStorage.setItem(getLocalStorageKey(principalId), name);
    }
    if (!loginRecorded.current && actor) {
      loginRecorded.current = true;
      actor.recordLogin(name).catch(() => {});
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
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isAdmin={isAdmin}
        isAdminLoading={isAdminLoading}
        username={username}
      />
      <Toaster richColors position="top-right" />
      <OfflineBanner />
      <UsernameModal open={showUsernameModal} onSaved={handleUsernameSaved} />
      <GalleryPermissionModal />

      <main className="flex-1 pb-16 md:pb-0" id="main-content">
        <div key={currentPage}>
          {currentPage === "home" && <HomePage onNavigate={handleNavigate} />}

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

          {currentPage === "arts" && (
            <ArtsHomePage onSelect={handleArtsSelect} />
          )}

          {currentPage === "commerce" && (
            <CommerceHomePage onSelect={handleCommerceSelect} />
          )}

          {currentPage === "commerceSolver" && (
            <CommerceSolver
              subject={commerceSubject}
              classLevel={commerceClass}
              onBack={() => setCurrentPage("commerce")}
            />
          )}

          {currentPage === "artsSolver" && (
            <ArtsSolver
              subject={artsSubject}
              classLevel={artsClass}
              onBack={() => setCurrentPage("arts")}
            />
          )}

          {currentPage === "notes" && (
            <ErrorBoundary>
              <PremiumNotesPage />
            </ErrorBoundary>
          )}

          {currentPage === "law" && <LawPage />}

          {currentPage === "neet" && (
            <NeetHomePage onSelect={handleNeetSelect} />
          )}

          {currentPage === "neetSolver" && (
            <NeetSolver
              subject={neetSubject}
              classLevel={neetClass}
              onBack={() => setCurrentPage("neet")}
            />
          )}

          {currentPage === "ca" && <CAHomePage onSelect={handleCASelect} />}

          {currentPage === "caSolver" && (
            <CASolver
              level={caLevel}
              subjectId={caSubject}
              onBack={() => setCurrentPage("ca")}
            />
          )}

          {currentPage === "cma" && <CMAHomePage onSelect={handleCMASelect} />}

          {currentPage === "cmaSolver" && (
            <CMASolver
              level={cmaLevel}
              subjectId={cmaSubject}
              onBack={() => setCurrentPage("cma")}
            />
          )}

          {currentPage === "qa" && <QAPage />}

          {currentPage === "terms" && (
            <TermsFullPage onBack={() => setCurrentPage("home")} />
          )}

          {currentPage === "mockTest" && (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
              <MockTestPage />
            </div>
          )}

          {currentPage === "progress" && (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
              <ProgressTrackerPage />
            </div>
          )}

          {currentPage === "bookmarks" && (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
              <BookmarksPage />
            </div>
          )}

          {currentPage === "doubt" && (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
              <DoubtPage username={username} />
            </div>
          )}

          {currentPage === "ssc" && <SSCPage />}

          {currentPage === "leaderboard" && (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
              <LeaderboardPage />
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-border bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-primary/15 border border-primary/30">
                <span className="text-xs font-bold text-primary">V</span>
              </div>
              <div>
                <p className="font-display font-bold text-sm">Vidya Setu AI</p>
                <p className="text-xs text-muted-foreground">
                  পশ্চিমবঙ্গের শিক্ষক
                </p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Founder &amp; CEO: Bikram Mandal | C.R.G.S
              </p>
              <button
                type="button"
                onClick={() => setCurrentPage("terms")}
                className="text-xs text-muted-foreground underline hover:text-foreground mt-1"
                data-ocid="terms.link"
              >
                Terms &amp; Conditions
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()}. Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      <TermsModal />

      {/* Mobile bottom navigation */}
      <BottomMobileNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isLoggedIn={!!identity}
        username={username}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppContextProvider>
      <AppInner />
    </AppContextProvider>
  );
}
