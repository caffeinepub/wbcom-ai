import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import {
  BookOpen,
  FileText,
  Home,
  LogOut,
  MessageCircle,
  Moon,
  Sun,
  User,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

type Page = string;

interface BottomMobileNavProps {
  currentPage: Page;
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  username?: string;
}

const NAV_ITEMS = [
  { id: "home", icon: Home, label: "হোম", labelEn: "Home" },
  { id: "quiz", icon: Zap, label: "কুইজ", labelEn: "Quiz" },
  { id: "notes", icon: BookOpen, label: "নোটস", labelEn: "Notes" },
  {
    id: "customerCase",
    icon: MessageCircle,
    label: "সাপোর্ট",
    labelEn: "Support",
  },
] as const;

export function BottomMobileNav({
  currentPage,
  onNavigate,
  isLoggedIn,
  username,
}: BottomMobileNavProps) {
  const { clear } = useInternetIdentity();
  const [isDark, setIsDark] = useState(false);
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">(
    "medium",
  );

  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark"));
    const storedFont = localStorage.getItem("font_size") as
      | "small"
      | "medium"
      | "large"
      | null;
    if (storedFont) setFontSize(storedFont);
  }, []);

  function toggleDarkMode(checked: boolean) {
    const root = document.documentElement;
    if (checked) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setIsDark(checked);
  }

  function changeFontSize(size: "small" | "medium" | "large") {
    const sizeMap = { small: "14px", medium: "16px", large: "18px" };
    document.documentElement.style.setProperty(
      "--base-font-size",
      sizeMap[size],
    );
    localStorage.setItem("font_size", size);
    setFontSize(size);
  }

  function handleLogout() {
    clear();
    onNavigate("home");
  }

  if (!isLoggedIn) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-sm border-t border-border shadow-lg"
      data-ocid="bottom_nav.panel"
    >
      <div className="flex items-stretch">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 px-1 text-xs transition-colors min-h-[56px] ${
                isActive
                  ? "text-navy font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-ocid={`bottom_nav.${item.id}.link`}
              aria-label={item.labelEn}
            >
              <Icon
                className={`w-5 h-5 ${isActive ? "fill-navy/10 stroke-navy" : ""}`}
                strokeWidth={isActive ? 2.5 : 1.75}
              />
              <span className="text-[10px] leading-tight">{item.label}</span>
            </button>
          );
        })}

        {/* More / Profile sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 px-1 text-xs text-muted-foreground hover:text-foreground transition-colors min-h-[56px]"
              data-ocid="bottom_nav.more.button"
              aria-label="More options"
            >
              <User className="w-5 h-5" strokeWidth={1.75} />
              <span className="text-[10px] leading-tight">আরো</span>
            </button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="rounded-t-2xl max-h-[85vh] overflow-y-auto"
            data-ocid="bottom_nav.sheet"
          >
            <SheetHeader className="pb-4">
              <SheetTitle className="text-left">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-navy/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <p className="font-bold text-navy text-sm">
                      {username || "Student"}
                    </p>
                    <p className="text-xs text-muted-foreground font-normal">
                      Vidya Setu AI
                    </p>
                  </div>
                </div>
              </SheetTitle>
            </SheetHeader>

            <div className="space-y-4 pb-6">
              {/* Dark Mode */}
              <div className="flex items-center justify-between py-2 border-b border-border">
                <div className="flex items-center gap-2">
                  {isDark ? (
                    <Moon className="w-4 h-4 text-navy" />
                  ) : (
                    <Sun className="w-4 h-4 text-navy" />
                  )}
                  <span className="text-sm font-medium">
                    Dark Mode / ডার্ক মোড
                  </span>
                </div>
                <Switch
                  checked={isDark}
                  onCheckedChange={toggleDarkMode}
                  data-ocid="bottom_nav.dark_mode.switch"
                />
              </div>

              {/* Font Size */}
              <div className="py-2 border-b border-border">
                <p className="text-sm font-medium mb-2">
                  <FileText className="w-4 h-4 inline mr-2 text-navy" />
                  ফন্ট সাইজ / Font Size
                </p>
                <div className="flex gap-2">
                  {(["small", "medium", "large"] as const).map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => changeFontSize(size)}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                        fontSize === size
                          ? "bg-navy text-white border-navy"
                          : "border-navy/20 text-navy/70 hover:bg-navy/5"
                      }`}
                      data-ocid={`bottom_nav.fontsize_${size}.button`}
                    >
                      {size === "small"
                        ? "Small"
                        : size === "medium"
                          ? "Medium"
                          : "Large"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-2">
                  Quick Access
                </p>
                {[
                  { id: "law", label: "⚖️ Law Section" },
                  { id: "neet", label: "🧬 NEET Prep" },
                  { id: "ca", label: "📊 CA Study" },
                  { id: "ssc", label: "📋 SSC Jobs" },
                  { id: "doubt", label: "❓ Doubt Section" },
                ].map((link) => (
                  <SheetTrigger key={link.id} asChild>
                    <button
                      type="button"
                      onClick={() => onNavigate(link.id)}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm hover:bg-navy/5 text-foreground transition-colors"
                      data-ocid={`bottom_nav.${link.id}.link`}
                    >
                      {link.label}
                    </button>
                  </SheetTrigger>
                ))}
              </div>

              {/* Logout */}
              <Button
                variant="outline"
                className="w-full border-red-200 text-red-600 hover:bg-red-50"
                onClick={handleLogout}
                data-ocid="bottom_nav.logout.button"
              >
                <LogOut className="w-4 h-4 mr-2" />
                লগ আউট / Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
