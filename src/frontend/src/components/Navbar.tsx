import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  BarChart2,
  BookOpen,
  Briefcase,
  FlaskConical,
  History,
  Home,
  LogIn,
  LogOut,
  Menu,
  Microscope,
  Palette,
  Scale,
  ShieldCheck,
  Trophy,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

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
  | "neet"
  | "neetSolver";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isAdmin?: boolean;
  isAdminLoading?: boolean;
  username?: string;
}

export function Navbar({
  currentPage,
  onNavigate,
  isAdmin,
  isAdminLoading,
  username,
}: NavbarProps) {
  const { identity, login, clear, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const isLoggedIn = !!identity;
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: Array<{ page: Page; label: string; icon: React.ReactNode }> =
    [
      { page: "home", label: "Home", icon: <Home className="w-4 h-4" /> },
      {
        page: "science",
        label: "Science",
        icon: <Microscope className="w-4 h-4" />,
      },
      {
        page: "neet" as Page,
        label: "NEET",
        icon: <FlaskConical className="w-4 h-4 text-teal-600" />,
      },
      {
        page: "arts",
        label: "Arts (কলা)",
        icon: <Palette className="w-4 h-4" />,
      },
      {
        page: "commerce" as Page,
        label: "Commerce",
        icon: <BarChart2 className="w-4 h-4" />,
      },
      ...(isLoggedIn
        ? [
            {
              page: "law" as Page,
              label: "Law (আইন)",
              icon: <Scale className="w-4 h-4" />,
            },
            {
              page: "quiz" as Page,
              label: "Quiz",
              icon: <Trophy className="w-4 h-4" />,
            },
            {
              page: "notes" as Page,
              label: "Notes",
              icon: <BookOpen className="w-4 h-4" />,
            },
            {
              page: "history" as Page,
              label: "History",
              icon: <History className="w-4 h-4" />,
            },
            {
              page: "customerCase" as Page,
              label: "Customer Support",
              icon: <Briefcase className="w-4 h-4" />,
            },
            ...(isAdmin
              ? [
                  {
                    page: "admin" as Page,
                    label: "Admin",
                    icon: <ShieldCheck className="w-4 h-4" />,
                  },
                ]
              : []),
          ]
        : []),
    ];

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  const isActivePage = (page: Page) =>
    currentPage === page ||
    (page === "science" && currentPage === "scienceSolver") ||
    (page === "arts" && currentPage === "artsSolver") ||
    (page === "commerce" && currentPage === "commerceSolver") ||
    (page === "neet" && currentPage === "neetSolver");

  function getDesktopClass(page: Page) {
    const active = isActivePage(page);
    if (page === "admin") {
      return active
        ? "bg-gold/20 text-gold border border-gold/30"
        : "text-muted-foreground hover:text-gold hover:bg-gold/10";
    }
    if (page === "quiz") {
      return active
        ? "bg-gold/15 text-gold border border-gold/20"
        : "text-muted-foreground hover:text-gold hover:bg-gold/10";
    }
    if (page === "science") {
      return active
        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
        : "text-muted-foreground hover:text-emerald-700 hover:bg-emerald-50";
    }
    if (page === "arts") {
      return active
        ? "bg-amber-100 text-amber-700 border border-amber-200"
        : "text-muted-foreground hover:text-amber-700 hover:bg-amber-50";
    }
    if (page === "notes") {
      return active
        ? "bg-purple-100 text-purple-700 border border-purple-200"
        : "text-muted-foreground hover:text-purple-700 hover:bg-purple-50";
    }
    if (page === "law") {
      return active
        ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
        : "text-muted-foreground hover:text-indigo-700 hover:bg-indigo-50";
    }
    if (page === "commerce") {
      return active
        ? "bg-blue-100 text-blue-700 border border-blue-200"
        : "text-muted-foreground hover:text-blue-700 hover:bg-blue-50";
    }
    return active
      ? "bg-navy/10 text-navy"
      : "text-muted-foreground hover:text-navy hover:bg-navy/5";
  }

  function getMobileClass(page: Page) {
    const active = isActivePage(page);
    if (active) {
      if (page === "admin" || page === "quiz") return "bg-gold/20 text-gold";
      if (page === "science") return "bg-emerald-100 text-emerald-700";
      if (page === "arts") return "bg-amber-100 text-amber-700";
      if (page === "notes") return "bg-purple-100 text-purple-700";
      if (page === "law") return "bg-indigo-100 text-indigo-700";
      if (page === "commerce") return "bg-blue-100 text-blue-700";
      return "bg-navy/10 text-navy";
    }
    return "text-muted-foreground hover:text-navy hover:bg-navy/5";
  }

  return (
    <header className="bg-white border-b border-border shadow-xs sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2.5 group"
            data-ocid="nav.link"
          >
            <img
              src="/assets/generated/vidya-setu-logo-transparent.dim_400x200.png"
              alt="Vidya Setu AI"
              className="h-9 w-auto object-contain"
            />
            <div className="leading-tight">
              <span className="block font-display font-bold text-navy text-base leading-none">
                Vidya Setu AI
              </span>
              <span className="hidden sm:block text-[9px] text-muted-foreground leading-none mt-0.5">
                Connecting You to Smarter Learning
              </span>
            </div>
          </button>

          {/* Desktop Nav links */}
          <nav className="hidden sm:flex items-center gap-0.5">
            {navItems.map(({ page, label, icon }) => (
              <button
                key={page}
                type="button"
                onClick={() => onNavigate(page)}
                data-ocid={`${page}.link`}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${getDesktopClass(page)}`}
              >
                {icon}
                {label}
              </button>
            ))}
            {/* Admin loading indicator */}
            {isLoggedIn && isAdminLoading && (
              <span className="px-2.5 py-1.5 text-xs text-muted-foreground animate-pulse">
                ...
              </span>
            )}
          </nav>

          {/* Auth + Username + Mobile Menu */}
          <div className="flex items-center gap-2">
            {isLoggedIn && username && (
              <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-navy bg-navy/5 px-2.5 py-1.5 rounded-md">
                <UserCircle className="w-3.5 h-3.5 text-gold" />
                <span>Hi, {username}</span>
              </div>
            )}

            {isLoggedIn ? (
              <Button
                variant="outline"
                size="sm"
                onClick={clear}
                data-ocid="auth.button"
                className="border-navy/20 text-navy hover:bg-navy/5 text-xs h-8"
              >
                <LogOut className="w-3.5 h-3.5 mr-1" />
                Logout
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={login}
                disabled={isLoggingIn || isInitializing}
                data-ocid="auth.button"
                className="bg-navy text-white hover:bg-navy/90 text-xs h-8"
              >
                <LogIn className="w-3.5 h-3.5 mr-1" />
                {isLoggingIn ? "Logging in..." : "Login"}
              </Button>
            )}

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="sm:hidden h-8 w-8 p-0"
                  data-ocid="nav.open_modal_button"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col gap-1 mt-6">
                  {isLoggedIn && username && (
                    <div className="flex items-center gap-2 px-3 py-2.5 mb-1 rounded-md bg-navy/5">
                      <UserCircle className="w-4 h-4 text-gold" />
                      <span className="text-sm font-semibold text-navy">
                        Hi, {username}
                      </span>
                    </div>
                  )}
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                    Navigation
                  </p>
                  {navItems.map(({ page, label, icon }) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => handleNavigate(page)}
                      data-ocid={`${page}.link`}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${getMobileClass(page)}`}
                    >
                      {icon}
                      {label}
                    </button>
                  ))}
                  {isLoggedIn && isAdminLoading && (
                    <p className="text-xs text-muted-foreground px-3 py-2 animate-pulse">
                      Checking permissions...
                    </p>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
