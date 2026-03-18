import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  ArrowRight,
  BookMarked,
  Gavel,
  Globe2,
  Languages,
  Lightbulb,
  Link2,
  Scale,
  Search,
  Star,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { LawLanguage, LawResult } from "../lib/lawSolver";
import { generateLawExplanation } from "../lib/lawSolver";

const POPULAR_ACTS = [
  { label: "IPC 302", query: "IPC 302", desc: "Murder" },
  { label: "IPC 307", query: "IPC 307", desc: "Attempt to Murder" },
  { label: "IPC 420", query: "IPC 420", desc: "Cheating" },
  { label: "IPC 498A", query: "IPC 498A", desc: "Dowry Cruelty" },
  { label: "IPC 376", query: "IPC 376", desc: "Rape" },
  { label: "Article 21", query: "Article 21", desc: "Right to Life" },
  { label: "Article 19", query: "Article 19", desc: "Freedom of Speech" },
  { label: "Article 14", query: "Article 14", desc: "Right to Equality" },
  { label: "CrPC 41", query: "CrPC 41", desc: "Arrest without Warrant" },
  { label: "CrPC 164", query: "CrPC 164", desc: "Magistrate's Statement" },
  { label: "IT Act 66C", query: "IT Act 66C", desc: "Identity Theft" },
  { label: "HMA Section 13", query: "HMA 13", desc: "Divorce" },
];

const COVERED_ACTS = [
  "Indian Penal Code, 1860 (IPC)",
  "Code of Criminal Procedure, 1973 (CrPC)",
  "Bharatiya Nyaya Sanhita, 2023 (BNS)",
  "Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)",
  "Constitution of India",
  "Hindu Marriage Act, 1955",
  "Information Technology Act, 2000",
  "POCSO Act, 2012",
  "Domestic Violence Act, 2005",
  "Dowry Prohibition Act, 1961",
];

export function LawPage() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState<LawLanguage>("english");
  const [result, setResult] = useState<LawResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  function handleSearch(q?: string) {
    const searchQuery = q ?? query;
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setNotFound(false);

    setTimeout(() => {
      const res = generateLawExplanation(searchQuery, language);
      if (res) {
        setResult(res);
        setNotFound(false);
      } else {
        setResult(null);
        setNotFound(true);
      }
      setIsSearching(false);
    }, 400);
  }

  function handleQuickSelect(q: string) {
    setQuery(q);
    handleSearch(q);
  }

  function toggleLanguage() {
    const newLang: LawLanguage = language === "english" ? "bengali" : "english";
    setLanguage(newLang);
    if (result && query) {
      const res = generateLawExplanation(query, newLang);
      if (res) setResult(res);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-900 flex items-center justify-center shadow">
              <Scale className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-indigo-900">
                Law Section — আইন বিভাগ
              </h1>
              <p className="text-sm text-muted-foreground">
                Indian Acts, Constitution, Landmark Cases — সহজ ভাষায়
              </p>
            </div>
          </div>

          {/* Language Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            data-ocid="law.toggle"
            className="border-indigo-200 text-indigo-900 hover:bg-indigo-50 gap-2 shrink-0"
          >
            <Languages className="w-4 h-4" />
            {language === "english" ? "Switch to বাংলা" : "Switch to English"}
          </Button>
        </div>

        {/* Search Bar */}
        <div className="flex gap-2 mt-4">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder='Search: "IPC 302", "Article 21", "Hindu Marriage Act 1955 Section 13"...'
            className="border-indigo-200 focus-visible:ring-indigo-400 text-sm"
            data-ocid="law.search_input"
          />
          <Button
            onClick={() => handleSearch()}
            disabled={isSearching}
            data-ocid="law.primary_button"
            className="bg-indigo-900 hover:bg-indigo-800 text-white gap-2 shrink-0"
          >
            <Search className="w-4 h-4" />
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>

        {/* Popular Quick Selects */}
        <div className="mt-4">
          <p className="text-xs font-semibold text-indigo-900/70 uppercase tracking-wider mb-2">
            Popular Sections
          </p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_ACTS.map((act) => (
              <button
                key={act.label}
                type="button"
                onClick={() => handleQuickSelect(act.query)}
                data-ocid="law.button"
                className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-indigo-200 bg-white hover:bg-indigo-50 hover:border-indigo-400 text-xs font-medium text-indigo-800 transition-all"
              >
                <Gavel className="w-3 h-3 text-amber-500 group-hover:text-amber-600" />
                <span>{act.label}</span>
                <span className="text-indigo-400">·</span>
                <span className="text-indigo-500">{act.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Acts Coverage Info */}
      {!result && !notFound && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <Card className="border-indigo-100 bg-indigo-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold text-indigo-900 flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-amber-500" />
                Acts Covered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5">
                {COVERED_ACTS.map((act) => (
                  <li
                    key={act}
                    className="flex items-center gap-2 text-xs text-indigo-800"
                  >
                    <ArrowRight className="w-3 h-3 text-amber-500 shrink-0" />
                    {act}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-indigo-100 bg-amber-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold text-amber-800 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                How to Search
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-amber-800">
              <div className="flex items-start gap-2">
                <Star className="w-3 h-3 mt-0.5 text-amber-500 shrink-0" />
                <span>
                  Type Act name + Section: <strong>"IPC 302"</strong>
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Star className="w-3 h-3 mt-0.5 text-amber-500 shrink-0" />
                <span>
                  Full form:{" "}
                  <strong>"Hindu Marriage Act 1955 Section 13"</strong>
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Star className="w-3 h-3 mt-0.5 text-amber-500 shrink-0" />
                <span>
                  Constitution: <strong>"Article 21"</strong> or{" "}
                  <strong>"Article 32"</strong>
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Star className="w-3 h-3 mt-0.5 text-amber-500 shrink-0" />
                <span>Press Enter or click Search</span>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center gap-2">
                <Globe2 className="w-3 h-3 text-indigo-600" />
                <span>Toggle Bengali / English explanation above</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Not Found */}
      <AnimatePresence>
        {notFound && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6"
          >
            <Card
              className="border-amber-200 bg-amber-50"
              data-ocid="law.error_state"
            >
              <CardContent className="pt-5 flex items-center gap-3 text-amber-800">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">
                    Section not found in database
                  </p>
                  <p className="text-xs mt-0.5">
                    Try: "IPC 302", "Article 21", "CrPC 41", "HMA Section 13",
                    "IT Act 66C"
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result Display */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
            data-ocid="law.panel"
          >
            {/* Title Card */}
            <Card className="border-indigo-300 bg-indigo-900 text-white shadow-lg">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Scale className="w-4 h-4 text-amber-300" />
                      <span className="text-xs font-medium text-indigo-200">
                        {result.actName}
                      </span>
                    </div>
                    <h2 className="font-display font-bold text-xl text-white">
                      {result.title}
                    </h2>
                  </div>
                  <Badge className="bg-amber-400 text-indigo-900 font-bold text-xs shrink-0">
                    §{result.sectionNumber}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Section Text */}
            <Card className="border-indigo-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-indigo-900 flex items-center gap-2">
                  <BookMarked className="w-4 h-4 text-amber-500" />
                  Original Section Text
                </CardTitle>
              </CardHeader>
              <CardContent>
                <blockquote className="border-l-4 border-amber-400 pl-4 text-sm text-muted-foreground italic leading-relaxed">
                  {result.sectionText}
                </blockquote>
              </CardContent>
            </Card>

            {/* Explanation */}
            <Card className="border-indigo-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-indigo-900 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  {language === "bengali" ? "ব্যাখ্যা" : "Explanation"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                  {result.explanation}
                </p>
              </CardContent>
            </Card>

            {/* Examples */}
            <Card className="border-green-100 bg-green-50/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-green-800 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-green-600" />
                  {language === "bengali"
                    ? "ব্যবহারিক উদাহরণ"
                    : "Practical Examples"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.examples.map((ex, i) => (
                    <li
                      key={ex.slice(0, 30)}
                      className="flex items-start gap-2.5 text-sm text-green-900"
                    >
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-green-200 text-green-800 text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      {ex}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Landmark Cases */}
            <Card className="border-amber-200 bg-amber-50/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-amber-900 flex items-center gap-2">
                  <Gavel className="w-4 h-4 text-amber-600" />
                  {language === "bengali" ? "গুরুত্বপূর্ণ মামলা" : "Landmark Cases"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.landmarkCases.map((lc, i) => (
                  <div
                    key={lc.name}
                    className="p-3 rounded-lg border border-amber-200 bg-white"
                    data-ocid={`law.item.${i + 1}`}
                  >
                    <p className="font-semibold text-xs text-amber-800 mb-1">
                      ⚖️ {lc.name}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {lc.summary}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Exceptions */}
            <Card className="border-red-100 bg-red-50/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-red-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  {language === "bengali"
                    ? "ব্যতিক্রম ও শর্ত"
                    : "Exceptions & Provisos"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-900 leading-relaxed">
                  {result.exceptions}
                </p>
              </CardContent>
            </Card>

            {/* Overriding Effect */}
            <Card className="border-violet-100 bg-violet-50/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-violet-800 flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-violet-600" />
                  {language === "bengali"
                    ? "ওভাররাইডিং প্রভাব"
                    : "Overriding Effect & Cross-Laws"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-violet-900 leading-relaxed">
                  {result.overridingEffect}
                </p>
              </CardContent>
            </Card>

            {/* Related Sections */}
            <Card className="border-indigo-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-indigo-900 flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-indigo-600" />
                  {language === "bengali"
                    ? "সম্পর্কিত ধারাসমূহ"
                    : "Related Sections"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.relatedSections.map((rs) => (
                    <button
                      key={rs.ref}
                      type="button"
                      onClick={() => handleQuickSelect(rs.ref)}
                      data-ocid="law.button"
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-xs font-medium text-indigo-800 transition-colors"
                    >
                      <Scale className="w-3 h-3 text-amber-500" />
                      <span className="font-bold">{rs.ref}</span>
                      <span className="text-indigo-400">·</span>
                      <span className="text-indigo-500">{rs.description}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
