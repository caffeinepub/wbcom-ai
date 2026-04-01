import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";
type FontSize = "small" | "medium" | "large";
type Language = "bengali" | "english";

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  fontSize: FontSize;
  setFontSize: (s: FontSize) => void;
  language: Language;
  toggleLanguage: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppContextProvider({
  children,
}: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("vs_theme") as Theme) ?? "dark";
  });
  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    return (localStorage.getItem("vs_fontSize") as FontSize) ?? "medium";
  });
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem("vs_language") as Language) ?? "bengali";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("vs_theme", theme);
  }, [theme]);

  useEffect(() => {
    const sizeMap = { small: "13px", medium: "15px", large: "17px" };
    document.documentElement.style.setProperty(
      "--base-font-size",
      sizeMap[fontSize],
    );
    localStorage.setItem("vs_fontSize", fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("vs_language", language);
  }, [language]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  function setFontSize(s: FontSize) {
    setFontSizeState(s);
  }

  function toggleLanguage() {
    setLanguage((l) => (l === "bengali" ? "english" : "bengali"));
  }

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        fontSize,
        setFontSize,
        language,
        toggleLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx)
    throw new Error("useAppContext must be used within AppContextProvider");
  return ctx;
}
