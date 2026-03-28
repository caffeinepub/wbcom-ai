import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  BarChart2,
  BookOpen,
  Bookmark,
  Briefcase,
  ChevronDown,
  ClipboardList,
  FlaskConical,
  GraduationCap,
  History,
  Home,
  Library,
  LogIn,
  LogOut,
  Menu,
  MessageCircleQuestion,
  Microscope,
  Moon,
  Palette,
  Scale,
  ShieldCheck,
  Sun,
  Trophy,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import { useAppContext } from "../AppContext";
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
  | "leaderboard";

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
  const {
    theme,
    toggleTheme,
    fontSize,
    setFontSize,
    language,
    toggleLanguage,
  } = useAppContext();
  const isLoggedIn = !!identity;
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDark = theme === "dark";

  const primaryNavItems: Array<{
    page: Page;
    label: string;
    icon: React.ReactNode;
  }> = [
    { page: "home", label: "Home", icon: <Home className="w-4 h-4" /> },
    {
      page: "science",
      label: "Science",
      icon: <Microscope className="w-4 h-4" />,
    },
    { page: "neet", label: "NEET", icon: <FlaskConical className="w-4 h-4" /> },
    { page: "arts", label: "Arts", icon: <Palette className="w-4 h-4" /> },
    {
      page: "commerce",
      label: "Commerce",
      icon: <BarChart2 className="w-4 h-4" />,
    },
    { page: "ca", label: "CA", icon: <GraduationCap className="w-4 h-4" /> },
    { page: "cma", label: "CMA", icon: <GraduationCap className="w-4 h-4" /> },
    { page: "qa", label: "Q&A", icon: <Library className="w-4 h-4" /> },
    ...(isLoggedIn
      ? [
          {
            page: "law" as Page,
            label: "Law",
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
        ]
      : []),
  ];

  const moreItems: Array<{ page: Page; label: string; icon: React.ReactNode }> =
    [
      {
        page: "mockTest",
        label: "Mock Test",
        icon: <ClipboardList className="w-4 h-4" />,
      },
      {
        page: "progress",
        label: "Progress",
        icon: <BarChart2 className="w-4 h-4" />,
      },
      {
        page: "bookmarks",
        label: "Bookmarks",
        icon: <Bookmark className="w-4 h-4" />,
      },
      ...(isLoggedIn
        ? [
            {
              page: "doubt" as Page,
              label: "Doubts",
              icon: <MessageCircleQuestion className="w-4 h-4" />,
            },
            {
              page: "leaderboard" as Page,
              label: "Leaderboard",
              icon: <Trophy className="w-4 h-4" />,
            },
            {
              page: "history" as Page,
              label: "History",
              icon: <History className="w-4 h-4" />,
            },
            {
              page: "customerCase" as Page,
              label: "Support",
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
    (page === "neet" && currentPage === "neetSolver") ||
    (page === "ca" && currentPage === "caSolver") ||
    (page === "cma" && currentPage === "cmaSolver");

  const btnBase =
    "flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium whitespace-nowrap border";
  const activeBtn = isDark
    ? "bg-primary/15 text-primary border-primary/25"
    : "bg-primary/10 text-primary border-primary/30";
  const inactiveBtn = isDark
    ? "text-foreground/60 hover:text-primary hover:bg-primary/10 border-transparent"
    : "text-foreground/70 hover:text-primary hover:bg-primary/10 border-transparent";

  const headerBg = isDark ? "rgba(5, 8, 20, 0.9)" : "rgba(248, 249, 255, 0.95)";

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: headerBg,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: isDark
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2"
            data-ocid="nav.link"
          >
            <img
              src="/assets/generated/vidya-setu-logo-transparent.dim_400x200.png"
              alt="Vidya Setu AI"
              className="h-9 w-auto object-contain"
            />
            <div className="leading-tight hidden sm:block">
              <span className="block font-display font-bold text-sm leading-none">
                Vidya Setu AI
              </span>
              <span className="text-[9px] text-muted-foreground leading-none mt-0.5">
                Connecting You to Smarter Learning
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {primaryNavItems.map(({ page, label, icon }) => (
              <button
                key={page}
                type="button"
                onClick={() => onNavigate(page)}
                data-ocid={`${page}.link`}
                className={`${btnBase} ${isActivePage(page) ? activeBtn : inactiveBtn}`}
              >
                {icon}
                {label}
              </button>
            ))}

            {/* More dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={`${btnBase} ${inactiveBtn}`}
                  data-ocid="nav.dropdown_menu"
                >
                  More <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                {moreItems.map(({ page, label, icon }) => (
                  <DropdownMenuItem
                    key={page}
                    onClick={() => onNavigate(page)}
                    data-ocid={`${page}.link`}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    {icon}
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-1.5">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              data-ocid="nav.toggle"
              className={`p-1.5 rounded-md text-xs ${inactiveBtn}`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Font size */}
            <div className="hidden sm:flex items-center gap-0.5">
              {(["small", "medium", "large"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFontSize(s)}
                  data-ocid="nav.toggle"
                  className={`px-1.5 py-1 rounded text-[10px] font-semibold border ${
                    fontSize === s ? activeBtn : inactiveBtn
                  }`}
                >
                  {s === "small" ? "A-" : s === "medium" ? "A" : "A+"}
                </button>
              ))}
            </div>

            {/* Language toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              data-ocid="nav.toggle"
              className={`hidden sm:flex items-center px-2 py-1.5 rounded-md text-xs font-semibold border ${inactiveBtn}`}
            >
              {language === "bengali" ? "বাং/EN" : "EN/বাং"}
            </button>

            {/* Username */}
            {isLoggedIn && username && (
              <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 border border-border px-2 py-1.5 rounded-md">
                <UserCircle className="w-3.5 h-3.5 text-yellow-400" />
                <span>{username}</span>
              </div>
            )}

            {/* Auth */}
            {isLoggedIn ? (
              <Button
                variant="outline"
                size="sm"
                onClick={clear}
                data-ocid="auth.button"
                className="text-xs h-8"
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
                className="text-xs h-8"
              >
                <LogIn className="w-3.5 h-3.5 mr-1" />
                {isLoggingIn ? "Logging in..." : "Login"}
              </Button>
            )}

            {/* Mobile hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden h-8 w-8 p-0"
                  data-ocid="nav.open_modal_button"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-64 border-l border-border bg-background"
              >
                <div className="flex flex-col gap-1 mt-6">
                  {isLoggedIn && username && (
                    <div className="flex items-center gap-2 px-3 py-2 mb-1 rounded-md bg-muted border border-border">
                      <UserCircle className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-semibold">
                        Hi, {username}
                      </span>
                    </div>
                  )}
                  {/* Mobile theme/font/lang controls */}
                  <div className="flex items-center gap-2 px-2 py-2 mb-1">
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 border border-border rounded-md text-xs"
                    >
                      {isDark ? (
                        <>
                          <Sun className="w-3.5 h-3.5" /> Light
                        </>
                      ) : (
                        <>
                          <Moon className="w-3.5 h-3.5" /> Dark
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={toggleLanguage}
                      className="flex-1 py-1.5 border border-border rounded-md text-xs font-medium"
                    >
                      {language === "bengali" ? "বাং/EN" : "EN/বাং"}
                    </button>
                  </div>
                  <div className="flex items-center gap-1 px-2 mb-2">
                    {(["small", "medium", "large"] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setFontSize(s)}
                        className={`flex-1 py-1 rounded text-[10px] font-bold border ${fontSize === s ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"}`}
                      >
                        {s === "small" ? "A-" : s === "medium" ? "A" : "A+"}
                      </button>
                    ))}
                  </div>
                  {[...primaryNavItems, ...moreItems].map(
                    ({ page, label, icon }) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => handleNavigate(page)}
                        data-ocid={`${page}.link`}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                          isActivePage(page)
                            ? "bg-primary/15 text-primary"
                            : "text-foreground/70 hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        {icon}
                        {label}
                      </button>
                    ),
                  )}
                  {isAdminLoading && (
                    <p className="text-xs text-muted-foreground px-3 py-2">
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
