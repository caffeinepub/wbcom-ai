import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Briefcase,
  GraduationCap,
  History,
  Home,
  LogIn,
  LogOut,
  Menu,
  Microscope,
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
  | "scienceSolver";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isAdmin?: boolean;
  username?: string;
}

export function Navbar({
  currentPage,
  onNavigate,
  isAdmin,
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
      ...(isLoggedIn
        ? [
            {
              page: "quiz" as Page,
              label: "Quiz",
              icon: <Trophy className="w-4 h-4" />,
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
    (page === "science" && currentPage === "scienceSolver");

  return (
    <header className="bg-white border-b border-border shadow-xs sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 group"
            data-ocid="nav.link"
          >
            <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div className="leading-tight">
              <span className="block font-display font-bold text-navy text-base leading-none">
                WBCom AI
              </span>
              <span className="hidden sm:block text-[9px] text-muted-foreground leading-none mt-0.5">
                পশ্চিমবঙ্গের শিক্ষক
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
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                  isActivePage(page)
                    ? page === "admin"
                      ? "bg-gold/20 text-gold border border-gold/30"
                      : page === "quiz"
                        ? "bg-gold/15 text-gold border border-gold/20"
                        : page === "science"
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                          : "bg-navy/10 text-navy"
                    : page === "admin"
                      ? "text-muted-foreground hover:text-gold hover:bg-gold/10"
                      : page === "quiz"
                        ? "text-muted-foreground hover:text-gold hover:bg-gold/10"
                        : page === "science"
                          ? "text-muted-foreground hover:text-emerald-700 hover:bg-emerald-50"
                          : "text-muted-foreground hover:text-navy hover:bg-navy/5"
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
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
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                        isActivePage(page)
                          ? page === "admin" || page === "quiz"
                            ? "bg-gold/20 text-gold"
                            : page === "science"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-navy/10 text-navy"
                          : "text-muted-foreground hover:text-navy hover:bg-navy/5"
                      }`}
                    >
                      {icon}
                      {label}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
