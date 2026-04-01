import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type HighlightType = "risky" | "important" | "rights";

interface HighlightedWord {
  word: string;
  type: HighlightType;
  count: number;
}

interface DetectedSection {
  section: string;
  act: string;
  reason: string;
}

interface AnalysisResult {
  riskyKeywords: HighlightedWord[];
  importantKeywords: HighlightedWord[];
  rightsKeywords: HighlightedWord[];
  detectedSections: DetectedSection[];
  highlightedText: Array<{ text: string; type: HighlightType | "normal" }>;
}

const RISKY_WORDS = [
  "penalty",
  "penalties",
  "liquidated damages",
  "forfeiture",
  "forfeit",
  "terminate",
  "termination",
  "liable",
  "liability",
  "indemnify",
  "indemnity",
  "indemnification",
  "default",
  "breach",
  "fine",
  "imprisonment",
  "punishable",
  "confiscate",
  "confiscation",
  "void",
  "illegal",
  "unlawful",
  "prohibited",
  "restriction",
  "encumbrance",
  "lien",
];

const IMPORTANT_WORDS = [
  "shall",
  "must",
  "obligation",
  "obligations",
  "deadline",
  "within",
  "days",
  "notice period",
  "condition",
  "conditions",
  "warranty",
  "warranties",
  "represent",
  "representation",
  "representations",
  "required",
  "requirement",
  "mandatory",
  "compulsory",
  "time limit",
  "limitation",
  "expire",
  "expiry",
  "renewal",
  "binding",
  "irrevocable",
  "non-negotiable",
];

const RIGHTS_WORDS = [
  "entitled",
  "entitlement",
  "right",
  "rights",
  "may",
  "compensation",
  "remedy",
  "remedies",
  "relief",
  "benefit",
  "benefits",
  "claim",
  "claims",
  "recover",
  "recovery",
  "refund",
  "damages",
  "award",
  "reimbursement",
  "privilege",
  "option",
  "discretion",
  "waive",
  "waiver",
];

function detectSections(text: string): DetectedSection[] {
  const lower = text.toLowerCase();
  const sections: DetectedSection[] = [];

  if (lower.includes("contract") || lower.includes("agreement")) {
    sections.push(
      {
        section: "Section 10",
        act: "Indian Contract Act 1872",
        reason:
          "Validity of contracts — free consent, competence, lawful consideration",
      },
      {
        section: "Section 23",
        act: "Indian Contract Act 1872",
        reason: "Lawful object — contract may be void if object is unlawful",
      },
      {
        section: "Section 56",
        act: "Indian Contract Act 1872",
        reason: "Doctrine of Frustration — if performance becomes impossible",
      },
      {
        section: "Section 73",
        act: "Indian Contract Act 1872",
        reason: "Compensation for loss/damage caused by breach of contract",
      },
      {
        section: "Section 74",
        act: "Indian Contract Act 1872",
        reason: "Liquidated damages and penalty clauses",
      },
    );
  }
  if (
    lower.includes("fir") ||
    lower.includes("police") ||
    lower.includes("arrest")
  ) {
    sections.push(
      {
        section: "Section 154",
        act: "CrPC / BNSS",
        reason: "Filing of First Information Report (FIR)",
      },
      {
        section: "Section 41",
        act: "CrPC / BNSS",
        reason: "Power of police to arrest without warrant",
      },
      {
        section: "Section 167",
        act: "CrPC / BNSS",
        reason: "Default bail — if chargesheet not filed within 60/90 days",
      },
    );
  }
  if (
    lower.includes("cheque") ||
    lower.includes("dishonour") ||
    lower.includes("dishonor")
  ) {
    sections.push(
      {
        section: "Section 138",
        act: "Negotiable Instruments Act 1881",
        reason:
          "Cheque dishonour — criminal liability, 2 years imprisonment or fine or both",
      },
      {
        section: "Section 139",
        act: "Negotiable Instruments Act 1881",
        reason: "Presumption in favour of holder — burden of proof on accused",
      },
    );
  }
  if (
    lower.includes("property") ||
    lower.includes("land") ||
    lower.includes("sale deed")
  ) {
    sections.push(
      {
        section: "Section 54",
        act: "Transfer of Property Act 1882",
        reason: "Sale of immovable property — definition and requirements",
      },
      {
        section: "Section 58",
        act: "Transfer of Property Act 1882",
        reason: "Mortgage — types and requirements",
      },
    );
  }
  if (
    lower.includes("employ") ||
    lower.includes("termination") ||
    lower.includes("retrench")
  ) {
    sections.push(
      {
        section: "Section 25F",
        act: "Industrial Disputes Act 1947",
        reason:
          "Conditions for retrenchment — notice and compensation required",
      },
      {
        section: "Section 2A",
        act: "Industrial Disputes Act 1947",
        reason:
          "Individual workman's dispute — right to raise industrial dispute",
      },
    );
  }
  if (
    lower.includes("rent") ||
    lower.includes("lease") ||
    lower.includes("tenant")
  ) {
    sections.push(
      {
        section: "Section 105",
        act: "Transfer of Property Act 1882",
        reason: "Lease of immovable property — rights and obligations",
      },
      {
        section: "Section 108",
        act: "Transfer of Property Act 1882",
        reason: "Rights and liabilities of lessor and lessee",
      },
    );
  }
  if (
    lower.includes("consumer") ||
    lower.includes("defect") ||
    lower.includes("deficiency")
  ) {
    sections.push(
      {
        section: "Section 2(7)",
        act: "Consumer Protection Act 2019",
        reason: "Definition of consumer — covers goods and services",
      },
      {
        section: "Section 35",
        act: "Consumer Protection Act 2019",
        reason: "Complaint before District Consumer Commission",
      },
    );
  }

  return sections;
}

function analyzeText(text: string): AnalysisResult {
  const lower = text.toLowerCase();

  function findWords(
    wordList: string[],
    type: HighlightType,
  ): HighlightedWord[] {
    const found: HighlightedWord[] = [];
    for (const word of wordList) {
      const regex = new RegExp(`\\b${word.replace(/[-]/g, "[-]")}\\b`, "gi");
      const matches = lower.match(regex);
      if (matches) {
        found.push({ word, type, count: matches.length });
      }
    }
    return found;
  }

  const risky = findWords(RISKY_WORDS, "risky");
  const important = findWords(IMPORTANT_WORDS, "important");
  const rights = findWords(RIGHTS_WORDS, "rights");

  const allWords = [
    ...risky.map((w) => ({ word: w.word, type: "risky" as HighlightType })),
    ...important.map((w) => ({
      word: w.word,
      type: "important" as HighlightType,
    })),
    ...rights.map((w) => ({ word: w.word, type: "rights" as HighlightType })),
  ];

  allWords.sort((a, b) => b.word.length - a.word.length);

  const segments: Array<{ text: string; type: HighlightType | "normal" }> = [];

  if (allWords.length > 0) {
    const pattern = allWords
      .map((w) => w.word.replace(/[-]/g, "[-]"))
      .join("|");
    const regex = new RegExp(`(${pattern})`, "gi");
    const parts = text.split(regex);

    for (const part of parts) {
      if (!part) continue;
      const matchedWord = allWords.find(
        (w) => w.word.toLowerCase() === part.toLowerCase(),
      );
      if (matchedWord) {
        segments.push({ text: part, type: matchedWord.type });
      } else {
        segments.push({ text: part, type: "normal" });
      }
    }
  } else {
    segments.push({ text, type: "normal" });
  }

  return {
    riskyKeywords: risky,
    importantKeywords: important,
    rightsKeywords: rights,
    detectedSections: detectSections(text),
    highlightedText: segments,
  };
}

const HIGHLIGHT_STYLES: Record<HighlightType, React.CSSProperties> = {
  risky: {
    background: "rgba(239,68,68,0.2)",
    color: "#fca5a5",
    borderBottom: "2px solid #ef4444",
    borderRadius: "2px",
    padding: "0 2px",
  },
  important: {
    background: "rgba(234,179,8,0.2)",
    color: "#fde68a",
    borderBottom: "2px solid #eab308",
    borderRadius: "2px",
    padding: "0 2px",
  },
  rights: {
    background: "rgba(34,197,94,0.2)",
    color: "#86efac",
    borderBottom: "2px solid #22c55e",
    borderRadius: "2px",
    padding: "0 2px",
  },
};

const CARD_STYLES = {
  risky: {
    bg: "rgba(239,68,68,0.1)",
    border: "1px solid rgba(239,68,68,0.3)",
    title: "#fca5a5",
    icon: "🚨",
    label: "Risky Clauses",
    desc: "Terms that may put you at risk or impose heavy obligations",
  },
  important: {
    bg: "rgba(234,179,8,0.1)",
    border: "1px solid rgba(234,179,8,0.3)",
    title: "#fde68a",
    icon: "⚠️",
    label: "Important Terms",
    desc: "Mandatory obligations, deadlines, and conditions you must comply with",
  },
  rights: {
    bg: "rgba(34,197,94,0.1)",
    border: "1px solid rgba(34,197,94,0.3)",
    title: "#86efac",
    icon: "✅",
    label: "Your Rights",
    desc: "Rights and entitlements available to you under this document",
  },
  sections: {
    bg: "rgba(59,130,246,0.1)",
    border: "1px solid rgba(59,130,246,0.3)",
    title: "#93c5fd",
    icon: "📚",
    label: "Relevant Law Sections",
    desc: "Indian laws that may apply to this document",
  },
};

export function DocumentChecker() {
  const [docText, setDocText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!docText.trim()) return;
    setAnalyzing(true);
    setTimeout(() => {
      setResult(analyzeText(docText));
      setAnalyzing(false);
    }, 600);
  };

  const cardBase: React.CSSProperties = {
    borderRadius: "10px",
    padding: "16px",
    marginBottom: "14px",
  };

  return (
    <div style={{ color: "#e8d5a3" }}>
      <div
        style={{
          background: "rgba(201,168,76,0.06)",
          border: "1px solid rgba(201,168,76,0.2)",
          borderRadius: "10px",
          padding: "16px",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            color: "#c9a84c",
            fontSize: "15px",
            fontWeight: "700",
            margin: "0 0 6px",
          }}
        >
          📄 Legal Document Checker
        </h3>
        <p style={{ color: "#a89060", fontSize: "13px", margin: 0 }}>
          Paste your legal document text below (contract, FIR, notice,
          agreement, court order). The checker will identify risky clauses,
          obligations, rights, and applicable Indian law sections.
        </p>
      </div>

      <Textarea
        value={docText}
        onChange={(e) => setDocText(e.target.value)}
        placeholder="Paste your legal document text here... (e.g., rental agreement, employment contract, FIR copy, cheque dishonour notice, property sale deed...)"
        rows={10}
        data-ocid="law.doc_checker.textarea"
        style={{
          background: "rgba(7,16,31,0.9)",
          border: "1px solid rgba(201,168,76,0.3)",
          color: "#e8d5a3",
          borderRadius: "8px",
          fontSize: "13px",
          lineHeight: "1.6",
          resize: "vertical",
          minHeight: "200px",
          marginBottom: "12px",
          width: "100%",
          boxSizing: "border-box",
          padding: "12px",
        }}
      />

      <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
        <Button
          onClick={handleAnalyze}
          disabled={!docText.trim() || analyzing}
          data-ocid="law.doc_checker.primary_button"
          style={{
            background: docText.trim() ? "#c9a84c" : "rgba(201,168,76,0.3)",
            color: docText.trim() ? "#0a1628" : "#a89060",
            border: "none",
            fontWeight: "700",
            cursor: docText.trim() ? "pointer" : "not-allowed",
          }}
        >
          {analyzing ? "Analyzing..." : "🔍 Analyze Document"}
        </Button>
        {result && (
          <Button
            onClick={() => {
              setResult(null);
              setDocText("");
            }}
            variant="outline"
            data-ocid="law.doc_checker.secondary_button"
            style={{
              border: "1px solid rgba(201,168,76,0.3)",
              color: "#a89060",
              background: "transparent",
            }}
          >
            Clear
          </Button>
        )}
      </div>

      {result && (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            {(
              [
                { key: "risky", words: result.riskyKeywords },
                { key: "important", words: result.importantKeywords },
                { key: "rights", words: result.rightsKeywords },
              ] as const
            ).map(({ key, words }) => {
              const s = CARD_STYLES[key];
              return (
                <div
                  key={key}
                  style={{ ...cardBase, background: s.bg, border: s.border }}
                  data-ocid={`law.doc_checker.${key}.card`}
                >
                  <p
                    style={{
                      color: s.title,
                      fontSize: "13px",
                      fontWeight: "700",
                      margin: "0 0 4px",
                    }}
                  >
                    {s.icon} {s.label} ({words.length})
                  </p>
                  <p
                    style={{
                      color: "#a89060",
                      fontSize: "11px",
                      margin: "0 0 10px",
                    }}
                  >
                    {s.desc}
                  </p>
                  {words.length > 0 ? (
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
                    >
                      {words.map((w) => (
                        <span
                          key={w.word}
                          style={{
                            ...HIGHLIGHT_STYLES[w.type],
                            fontSize: "12px",
                            display: "inline-block",
                            padding: "2px 6px",
                            borderRadius: "4px",
                          }}
                        >
                          {w.word}{" "}
                          <span style={{ opacity: 0.7 }}>×{w.count}</span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p
                      style={{
                        color: "#a89060",
                        fontSize: "12px",
                        fontStyle: "italic",
                        margin: 0,
                      }}
                    >
                      None found
                    </p>
                  )}
                </div>
              );
            })}

            {/* Relevant Sections */}
            <div
              style={{
                ...cardBase,
                background: CARD_STYLES.sections.bg,
                border: CARD_STYLES.sections.border,
              }}
              data-ocid="law.doc_checker.sections.card"
            >
              <p
                style={{
                  color: CARD_STYLES.sections.title,
                  fontSize: "13px",
                  fontWeight: "700",
                  margin: "0 0 4px",
                }}
              >
                {CARD_STYLES.sections.icon} {CARD_STYLES.sections.label} (
                {result.detectedSections.length})
              </p>
              <p
                style={{
                  color: "#a89060",
                  fontSize: "11px",
                  margin: "0 0 10px",
                }}
              >
                {CARD_STYLES.sections.desc}
              </p>
              {result.detectedSections.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  {result.detectedSections.map((s) => (
                    <div
                      key={`${s.section}-${s.act}`}
                      style={{
                        background: "rgba(59,130,246,0.08)",
                        borderRadius: "6px",
                        padding: "6px 8px",
                      }}
                    >
                      <p
                        style={{
                          color: "#93c5fd",
                          fontSize: "12px",
                          fontWeight: "700",
                          margin: "0 0 2px",
                        }}
                      >
                        {s.section} — {s.act}
                      </p>
                      <p
                        style={{
                          color: "#a89060",
                          fontSize: "11px",
                          margin: 0,
                        }}
                      >
                        {s.reason}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p
                  style={{
                    color: "#a89060",
                    fontSize: "12px",
                    fontStyle: "italic",
                    margin: 0,
                  }}
                >
                  No specific sections detected
                </p>
              )}
            </div>
          </div>

          {/* Highlighted Text */}
          <div
            style={{
              background: "rgba(7,16,31,0.9)",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: "10px",
              padding: "16px",
            }}
          >
            <p
              style={{
                color: "#c9a84c",
                fontSize: "13px",
                fontWeight: "700",
                marginBottom: "12px",
              }}
            >
              📝 Document with Highlights
            </p>
            <div
              style={{
                fontSize: "13px",
                lineHeight: "1.9",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {result.highlightedText.map((seg, i) => {
                // biome-ignore lint/suspicious/noArrayIndexKey: text segments have no stable ID
                const key = i;
                return seg.type === "normal" ? (
                  <span key={key} style={{ color: "#d4c8a8" }}>
                    {seg.text}
                  </span>
                ) : (
                  <mark key={key} style={HIGHLIGHT_STYLES[seg.type]}>
                    {seg.text}
                  </mark>
                );
              })}
            </div>
            <div
              style={{
                display: "flex",
                gap: "16px",
                marginTop: "16px",
                paddingTop: "12px",
                borderTop: "1px solid rgba(201,168,76,0.1)",
                flexWrap: "wrap",
              }}
            >
              {[
                { type: "risky" as HighlightType, label: "Risky" },
                { type: "important" as HighlightType, label: "Important" },
                { type: "rights" as HighlightType, label: "Rights" },
              ].map(({ type, label }) => (
                <span
                  key={type}
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <mark
                    style={{ ...HIGHLIGHT_STYLES[type], padding: "1px 6px" }}
                  >
                    {label}
                  </mark>
                </span>
              ))}
            </div>
          </div>

          <p
            style={{
              color: "rgba(168,144,96,0.6)",
              fontSize: "11px",
              marginTop: "12px",
              textAlign: "center",
            }}
          >
            ⚠ This is an educational tool only. Consult a qualified lawyer for
            legal advice. Source: India Code (indiacode.nic.in)
          </p>
        </div>
      )}
    </div>
  );
}
