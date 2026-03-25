import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { NEET_CHAPTERS } from "@/data/neetChapters";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  FlaskConical,
  Loader2,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface NeetSolverProps {
  subject: string;
  classLevel: number;
  onBack: () => void;
}

type AnswerType = "concept" | "numerical" | "mcq";

interface MCQOption {
  label: string;
  text: string;
  correct: boolean;
}

interface NeetAnswer {
  title: string;
  bengaliTitle: string;
  conceptExplanation: string;
  bengaliExplanation: string;
  keyPoints: string[];
  example: string;
  formulas?: string[];
  mcqOptions?: MCQOption[];
  mcqExplanation?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Comprehensive NCERT-aligned answer generator
// ─────────────────────────────────────────────────────────────────────────────
function generateNeetAnswer(
  subject: string,
  _classLevel: number,
  question: string,
  type: AnswerType,
): NeetAnswer {
  const q = question.toLowerCase();

  // ── PHYSICS ──────────────────────────────────────────────────────────────
  if (subject === "physics") {
    if (q.includes("newton") || q.includes("force") || q.includes("motion")) {
      return {
        title: "Newton's Laws of Motion",
        bengaliTitle: "নিউটনের গতিসূত্র",
        conceptExplanation:
          "Newton's Laws of Motion form the foundation of classical mechanics. The First Law states that a body remains at rest or in uniform motion unless acted upon by an external net force — this is the principle of inertia. The Second Law defines force as the rate of change of momentum: F = ma, meaning force equals mass multiplied by acceleration. The Third Law states that every action has an equal and opposite reaction — when object A exerts a force on object B, object B exerts an equal and opposite force on A simultaneously.",
        bengaliExplanation:
          "নিউটনের প্রথম সূত্র অনুযায়ী, কোনো বস্তু স্থিতিতে থাকলে স্থিতিতে এবং সমবেগে গতিতে থাকলে সেভাবেই থাকবে যদি না বাইরের কোনো বল প্রয়োগ করা হয়। দ্বিতীয় সূত্রে বলা হয়েছে F = ma অর্থাৎ বল = ভর × ত্বরণ। তৃতীয় সূত্র অনুযায়ী প্রতিটি ক্রিয়ার সমান ও বিপরীত প্রতিক্রিয়া আছে।",
        keyPoints: [
          "First Law — Law of Inertia: স্থিতিজাড্য ও গতিজাড্য",
          "Second Law — F = ma (force = mass × acceleration)",
          "Third Law — Action-Reaction pair কখনো একই বস্তুতে কাজ করে না",
          "Impulse = F × t = Δp (change in momentum)",
          "Linear momentum is conserved in an isolated system",
        ],
        example:
          "A cricket ball of mass 0.15 kg moving at 30 m/s is stopped in 0.02 s. Force = Δp/t = (0.15×30)/0.02 = 225 N. — ০.১৫ kg ভরের একটি ক্রিকেট বল ৩০ m/s বেগে ০.০২ s-এ থামানো হলে প্রয়োজনীয় বল = ২২৫ N।",
        formulas: ["F = ma", "p = mv", "Impulse J = FΔt = Δp", "F₁₂ = −F₂₁"],
        mcqOptions:
          type === "mcq"
            ? [
                { label: "A", text: "F = ma", correct: true },
                { label: "B", text: "F = m/a", correct: false },
                { label: "C", text: "F = mv", correct: false },
                { label: "D", text: "F = m/v", correct: false },
              ]
            : undefined,
        mcqExplanation:
          type === "mcq"
            ? "Newton's second law states F = ma. Force is directly proportional to both mass and acceleration."
            : undefined,
      };
    }
    if (q.includes("gravit") || q.includes("g ") || q.includes("gravity")) {
      return {
        title: "Universal Law of Gravitation",
        bengaliTitle: "মহাকর্ষ সূত্র",
        conceptExplanation:
          "Newton's Universal Law of Gravitation states that every particle of matter attracts every other particle with a force that is directly proportional to the product of their masses and inversely proportional to the square of the distance between them. The formula is F = Gm₁m₂/r². The gravitational constant G = 6.674 × 10⁻¹¹ N m² kg⁻². Near the Earth's surface, the acceleration due to gravity g ≈ 9.8 m/s². The value of g decreases with altitude and depth.",
        bengaliExplanation:
          "নিউটনের মহাকর্ষ সূত্র অনুযায়ী যেকোনো দুটি বস্তুর মধ্যে আকর্ষণ বল তাদের ভরের গুণফলের সমানুপাতিক এবং দূরত্বের বর্গের ব্যস্তানুপাতিক। পৃথিবীর পৃষ্ঠে g ≈ 9.8 m/s²। উচ্চতা ও গভীরতা উভয় ক্ষেত্রে g-এর মান হ্রাস পায়।",
        keyPoints: [
          "F = Gm₁m₂/r² — Universal gravitation formula",
          "G = 6.674 × 10⁻¹¹ N m² kg⁻² (universal constant)",
          "g = GM/R² ≈ 9.8 m/s² at Earth's surface",
          "g decreases with altitude: g' = g(1 − 2h/R)",
          "Escape velocity v = √(2gR) = 11.2 km/s for Earth",
        ],
        example:
          "Calculate gravitational force between 60 kg person and Earth (M = 6×10²⁴ kg, R = 6.4×10⁶ m): F = GM_Ε m/R² = 9.8 × 60 ≈ 588 N — এটিই ওই ব্যক্তির ওজন।",
        formulas: ["F = Gm₁m₂/r²", "g = GM/R²", "v_escape = √(2gR)"],
        mcqOptions:
          type === "mcq"
            ? [
                {
                  label: "A",
                  text: "G = 6.674 × 10⁻¹¹ N m² kg⁻²",
                  correct: true,
                },
                { label: "B", text: "G = 9.8 N m² kg⁻²", correct: false },
                {
                  label: "C",
                  text: "G = 6.674 × 10¹¹ N m² kg⁻²",
                  correct: false,
                },
                {
                  label: "D",
                  text: "G = 3.14 × 10⁻¹¹ N m² kg⁻²",
                  correct: false,
                },
              ]
            : undefined,
        mcqExplanation:
          type === "mcq"
            ? "The universal gravitational constant G = 6.674 × 10⁻¹¹ N m² kg⁻². This was experimentally determined by Henry Cavendish."
            : undefined,
      };
    }
    if (
      q.includes("thermo") ||
      q.includes("heat") ||
      q.includes("temperature") ||
      q.includes("entropy")
    ) {
      return {
        title: "Thermodynamics",
        bengaliTitle: "তাপগতিবিদ্যা",
        conceptExplanation:
          "Thermodynamics deals with heat, work, and energy transformations. The Zeroth Law defines thermal equilibrium. The First Law is the law of energy conservation: ΔU = Q − W, where ΔU is internal energy change, Q is heat absorbed, and W is work done by the system. The Second Law states that heat spontaneously flows from hot to cold, and entropy of an isolated system always increases. The Third Law states that absolute zero (0 K) cannot be reached.",
        bengaliExplanation:
          "তাপগতিবিদ্যার প্রথম সূত্র হল শক্তির সংরক্ষণ সূত্র: ΔU = Q − W। দ্বিতীয় সূত্র অনুযায়ী তাপ স্বতঃস্ফূর্তভাবে গরম বস্তু থেকে ঠান্ডা বস্তুতে প্রবাহিত হয় এবং এন্ট্রপি সর্বদা বৃদ্ধি পায়। তৃতীয় সূত্রে পরম শূন্য তাপমাত্রা অর্জন অসম্ভব বলা হয়েছে।",
        keyPoints: [
          "First Law: ΔU = Q − W (Energy Conservation)",
          "Second Law: Entropy always increases in isolated system",
          "Carnot efficiency η = 1 − T₂/T₁",
          "Isothermal process: T constant, PV = constant",
          "Adiabatic process: Q = 0, PVγ = constant",
        ],
        example:
          "A Carnot engine operates between 500 K and 300 K. Efficiency = 1 − 300/500 = 0.4 = 40%. — তাপ উৎসের তাপমাত্রা ৫০০ K এবং তাপগ্রাহকের তাপমাত্রা ৩০০ K হলে কার্নো ইঞ্জিনের দক্ষতা ৪০%।",
        formulas: [
          "ΔU = Q − W",
          "η_Carnot = 1 − T_cold/T_hot",
          "PVγ = constant (adiabatic)",
          "PV = nRT (ideal gas)",
        ],
      };
    }
    if (
      q.includes("optic") ||
      q.includes("light") ||
      q.includes("lens") ||
      q.includes("mirror") ||
      q.includes("refract")
    ) {
      return {
        title: "Ray Optics and Optical Instruments",
        bengaliTitle: "রশ্মি আলোকবিজ্ঞান",
        conceptExplanation:
          "Ray Optics explains the behavior of light using the laws of reflection and refraction. The law of reflection: angle of incidence = angle of reflection. Snell's Law of Refraction: n₁ sin θ₁ = n₂ sin θ₂. For mirrors: 1/v + 1/u = 1/f (mirror formula). For lenses: 1/v − 1/u = 1/f (lens formula). Total Internal Reflection occurs when light travels from denser to rarer medium and angle of incidence exceeds the critical angle — this is used in optical fibres.",
        bengaliExplanation:
          "আলোর প্রতিফলনের সূত্র: আপতন কোণ = প্রতিফলন কোণ। স্নেলের বিচ্যুতি সূত্র: n₁ sin θ₁ = n₂ sin θ₂। দর্পণের জন্য: 1/v + 1/u = 1/f। লেন্সের জন্য: 1/v − 1/u = 1/f। পূর্ণ অভ্যন্তরীণ প্রতিফলন তখন ঘটে যখন আলো ঘন মাধ্যম থেকে হালকা মাধ্যমে যায় এবং আপতন কোণ সংকট কোণের বেশি হয়।",
        keyPoints: [
          "Snell's Law: n₁ sin θ₁ = n₂ sin θ₂",
          "Mirror formula: 1/v + 1/u = 1/f",
          "Lens formula: 1/v − 1/u = 1/f",
          "Magnification m = −v/u",
          "Total Internal Reflection — optical fibre principle",
        ],
        example:
          "An object is 30 cm from a convex lens of focal length 10 cm. 1/v = 1/f + 1/u = 1/10 − 1/30 = 2/30 → v = 15 cm. The image forms 15 cm on the other side. — ১০ cm ফোকাস দূরত্বের উত্তল লেন্স থেকে ৩০ cm দূরে বস্তু রাখলে প্রতিবিম্ব ১৫ cm দূরে পড়বে।",
        formulas: [
          "1/f = 1/v − 1/u (lens)",
          "1/f = 1/v + 1/u (mirror)",
          "n = c/v",
          "sin C = 1/n (critical angle)",
        ],
      };
    }
    if (
      q.includes("electric") ||
      q.includes("current") ||
      q.includes("ohm") ||
      q.includes("circuit") ||
      q.includes("capacit")
    ) {
      return {
        title: "Electricity and Current",
        bengaliTitle: "তড়িৎ ও বিদ্যুৎপ্রবাহ",
        conceptExplanation:
          "Electric current is the rate of flow of charge: I = Q/t. Ohm's Law states V = IR for a conductor at constant temperature. Resistance R = ρL/A where ρ is resistivity, L is length, and A is cross-sectional area. In series circuits, R_total = R₁ + R₂ + R₃. In parallel, 1/R_total = 1/R₁ + 1/R₂ + 1/R₃. Kirchhoff's Laws — Current Law (KCL): sum of currents at a junction = 0; Voltage Law (KVL): sum of EMFs = sum of voltage drops in a loop.",
        bengaliExplanation:
          "তড়িৎপ্রবাহ হল একক সময়ে প্রবাহিত আধানের পরিমাণ: I = Q/t। ওহমের সূত্র: V = IR। শ্রেণী সংযোগে মোট রোধ বাড়ে এবং সমান্তরাল সংযোগে কমে। কির্শফের সূত্র দ্বারা জটিল বর্তনীর বিশ্লেষণ করা হয়।",
        keyPoints: [
          "I = Q/t, V = IR (Ohm's Law)",
          "Series: R_total = R₁ + R₂; Parallel: 1/R = 1/R₁ + 1/R₂",
          "Power P = VI = I²R = V²/R",
          "KCL: ΣI = 0 at junction; KVL: ΣV = 0 in loop",
          "Capacitance C = Q/V; Energy = ½CV²",
        ],
        example:
          "Three resistors 2Ω, 4Ω, 6Ω in parallel: 1/R = 1/2+1/4+1/6 = 6/12+3/12+2/12 = 11/12, R = 12/11 ≈ 1.09Ω. — ২Ω, ৪Ω, ৬Ω সমান্তরাল সংযোগে মোট রোধ প্রায় ১.০৯Ω।",
        formulas: ["V = IR", "P = VI = I²R", "C = Q/V", "R = ρL/A"],
      };
    }
    // Generic physics fallback
    return {
      title: "Physics — NCERT Concept",
      bengaliTitle: "পদার্থবিজ্ঞান — মূল ধারণা",
      conceptExplanation:
        "Physics studies the fundamental laws governing matter and energy. Your query relates to core NCERT Physics topics. Key branches include Mechanics, Thermodynamics, Optics, Electromagnetism, and Modern Physics. Each chapter in NCERT builds on fundamental principles: definitions, laws, derivations, and numerical applications.",
      bengaliExplanation:
        "পদার্থবিজ্ঞানের প্রতিটি অধ্যায়ে মূল সংজ্ঞা, সূত্র, উদাহরণ এবং সাংখ্যিক প্রশ্ন রয়েছে। NEET-এর জন্য NCERT-এর প্রতিটি লাইন মনোযোগ দিয়ে পড়া জরুরি। ধারণাগত প্রশ্নের জন্য সংজ্ঞা ও ব্যাখ্যা এবং সাংখ্যিক প্রশ্নের জন্য সূত্র প্রয়োগ গুরুত্বপূর্ণ।",
      keyPoints: [
        "Focus on NCERT Class 11: Mechanics, Waves, Thermodynamics",
        "Focus on NCERT Class 12: Electrostatics, Current, Optics, Modern Physics",
        "Derivations carry 2–3 marks each in NEET",
        "MCQ questions often test conceptual understanding, not just formulas",
        "Practice dimensional analysis to verify formulas",
      ],
      example:
        "Try typing specific topics like 'Newton laws', 'thermodynamics', 'optics mirror lens', 'electric circuit' for detailed explanations with formulas.",
      formulas: ["F = ma", "E = hν", "PV = nRT", "n₁ sin θ₁ = n₂ sin θ₂"],
    };
  }

  // ── CHEMISTRY ────────────────────────────────────────────────────────────
  if (subject === "chemistry") {
    if (
      q.includes("atom") ||
      q.includes("electron") ||
      q.includes("orbital") ||
      q.includes("quantum")
    ) {
      return {
        title: "Atomic Structure",
        bengaliTitle: "পরমাণুর গঠন",
        conceptExplanation:
          "The modern quantum mechanical model describes electrons occupying orbitals (probability regions) around the nucleus. The four quantum numbers — Principal (n), Azimuthal (l), Magnetic (ml), and Spin (ms) — uniquely describe each electron. Pauli's Exclusion Principle: no two electrons in an atom can have the same set of four quantum numbers. Hund's Rule: electrons fill orbitals of equal energy singly before pairing. Aufbau Principle: electrons fill orbitals in increasing order of energy (1s, 2s, 2p, 3s, 3p, 4s, 3d...).",
        bengaliExplanation:
          "আধুনিক কোয়ান্টাম তত্ত্ব অনুযায়ী ইলেকট্রন নিউক্লিয়াসের চারদিকে অরবিটালে থাকে। চারটি কোয়ান্টাম সংখ্যা (n, l, ml, ms) প্রতিটি ইলেকট্রনকে অনন্যভাবে চিহ্নিত করে। পাউলির বর্জন নীতি, হুন্ডের নিয়ম ও অউফবাউ নীতি ইলেকট্রন বিন্যাস নির্ধারণ করে।",
        keyPoints: [
          "Bohr model: energy E_n = −13.6/n² eV for hydrogen",
          "Heisenberg Uncertainty: Δx·Δp ≥ h/4π",
          "Aufbau order: 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d...",
          "Hund's Rule: maximum multiplicity (singly fill before pairing)",
          "Pauli: no two electrons with same 4 quantum numbers",
        ],
        example:
          "Electronic configuration of Fe (Z=26): 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s² — আয়রনে 26টি ইলেকট্রন এই বিন্যাসে সাজানো থাকে। Fe²⁺ হলে 3d⁶ এবং Fe³⁺ হলে 3d⁵ হয়।",
        formulas: [
          "E_n = −13.6/n² eV",
          "λ = h/mv (de Broglie)",
          "Δx·Δp ≥ h/4π",
        ],
      };
    }
    if (
      q.includes("bond") ||
      q.includes("ionic") ||
      q.includes("covalent") ||
      q.includes("vsepr") ||
      q.includes("hybridiz")
    ) {
      return {
        title: "Chemical Bonding and Molecular Structure",
        bengaliTitle: "রাসায়নিক বন্ধন ও আণবিক গঠন",
        conceptExplanation:
          "Chemical bonds hold atoms together. Ionic bonds form by electron transfer between metals and non-metals (electronegativity difference > 1.7). Covalent bonds form by electron sharing between non-metals. VSEPR Theory predicts molecular geometry based on electron pair repulsion. Hybridization explains bonding geometry: sp (linear, 180°), sp² (trigonal planar, 120°), sp³ (tetrahedral, 109.5°), sp³d (trigonal bipyramidal), sp³d² (octahedral). Resonance occurs when multiple valid Lewis structures exist.",
        bengaliExplanation:
          "আয়নিক বন্ধন ধাতু ও অধাতুর মধ্যে ইলেকট্রন স্থানান্তরে গঠিত হয়। সমযোজী বন্ধনে ইলেকট্রন ভাগ হয়। VSEPR তত্ত্ব আণবিক জ্যামিতি ব্যাখ্যা করে। হাইব্রিডাইজেশন: sp (রৈখিক), sp² (সমতলীয় ত্রিকোণাকার), sp³ (চতুষ্তলকীয়)।",
        keyPoints: [
          "Ionic bond: metal + non-metal, EN difference > 1.7",
          "Covalent: non-metal + non-metal, electron sharing",
          "sp → linear (180°), sp² → trigonal planar (120°), sp³ → tetrahedral (109.5°)",
          "Bond order = (bonding − antibonding electrons)/2",
          "Hydrogen bond: N–H···O, O–H···O (important in DNA, proteins)",
        ],
        example:
          "H₂O has sp³ hybridization with 2 lone pairs causing bond angle to be ~104.5° (less than 109.5°). NH₃ has sp³ with 1 lone pair, angle ~107°. — জলের অণুতে sp³ হাইব্রিডাইজেশন এবং ২টি একাকী ইলেকট্রন জোড়ার কারণে বন্ধন কোণ ১০৪.৫°।",
        formulas: ["Bond order = (Nb − Na)/2", "Formal charge = V − N − B/2"],
      };
    }
    if (
      q.includes("organic") ||
      q.includes("carbon") ||
      q.includes("alkane") ||
      q.includes("alkene") ||
      q.includes("alkohol") ||
      q.includes("alcohol") ||
      q.includes("functional")
    ) {
      return {
        title: "Organic Chemistry — Fundamentals",
        bengaliTitle: "জৈব রসায়ন — মূলতত্ত্ব",
        conceptExplanation:
          "Organic chemistry studies carbon compounds. Hydrocarbons are classified as alkanes (CₙH₂ₙ₊₂, single bonds), alkenes (CₙH₂ₙ, double bond), alkynes (CₙH₂ₙ₋₂, triple bond), and aromatic (benzene ring). Functional groups determine chemical properties: –OH (alcohol), –CHO (aldehyde), –COOH (carboxylic acid), –NH₂ (amine), –X (halide). IUPAC nomenclature gives systematic names. Reaction types: Addition (alkenes), Substitution (alkanes, aromatic), Elimination (alcohols), Condensation (forming polymers/peptides).",
        bengaliExplanation:
          "জৈব রসায়নে কার্বনের যৌগ অধ্যয়ন করা হয়। অ্যালকেন (একক বন্ধন), অ্যালকিন (দ্বিবন্ধন), অ্যালকাইন (ত্রিবন্ধন) হল হাইড্রোকার্বনের মূল শ্রেণী। কার্যকরী গ্রুপ যৌগের রাসায়নিক ধর্ম নির্ধারণ করে।",
        keyPoints: [
          "Alkane: CₙH₂ₙ₊₂ (saturated, substitution reactions)",
          "Alkene: CₙH₂ₙ (addition reactions, Markovnikov's rule)",
          "Benzene: aromatic, electrophilic aromatic substitution",
          "Alcohol dehydration → alkene; oxidation → aldehyde/acid",
          "Inductive and mesomeric effects influence reactivity",
        ],
        example:
          "Ethanol (C₂H₅OH) on oxidation gives acetaldehyde (CH₃CHO), then acetic acid (CH₃COOH). Dehydration with conc. H₂SO₄ gives ethylene (CH₂=CH₂). — ইথানল জারণে প্রথমে অ্যাসিটঅ্যালডিহাইড তারপর অ্যাসিটিক অ্যাসিড পাওয়া যায়।",
        formulas: ["Alkane: CₙH₂ₙ₊₂", "Alkene: CₙH₂ₙ", "Alkyne: CₙH₂ₙ₋₂"],
      };
    }
    if (
      q.includes("equilibrium") ||
      q.includes("kc") ||
      q.includes("le chatelier") ||
      q.includes("acid") ||
      q.includes("base") ||
      q.includes("ph")
    ) {
      return {
        title: "Chemical Equilibrium and Ionic Equilibrium",
        bengaliTitle: "রাসায়নিক সাম্যাবস্থা",
        conceptExplanation:
          "Chemical equilibrium is a dynamic state where rates of forward and reverse reactions are equal, and concentrations remain constant. The equilibrium constant Kc = [products]/[reactants] (concentration terms) or Kp (pressure terms). Le Chatelier's Principle: when a system at equilibrium is disturbed, it shifts to counteract the disturbance. pH = −log[H⁺]. Strong acids completely dissociate; weak acids have Ka. Buffer solutions resist pH change. Henderson-Hasselbalch equation: pH = pKa + log([A⁻]/[HA]).",
        bengaliExplanation:
          "রাসায়নিক সাম্যাবস্থায় সম্মুখ ও বিপরীত বিক্রিয়ার হার সমান। Kc = গুণফল/বিক্রিয়কের ঘনমাত্রার অনুপাত। লে শাতেলিয়ার নীতি: সাম্যাবস্থায় বিঘ্ন ঘটলে তন্ত্র তার প্রভাব কমাতে সরে যায়। pH = −log[H⁺] — অ্যাসিডিটি পরিমাপের মান।",
        keyPoints: [
          "Kc = [C]c[D]d / [A]a[B]b at equilibrium",
          "Kp = Kc(RT)^Δn where Δn = moles gas products − reactants",
          "Le Chatelier: increase pressure → shift to fewer gas moles",
          "pH + pOH = 14 at 25°C; neutral pH = 7",
          "Buffer: pH = pKa + log([salt]/[acid])",
        ],
        example:
          "For N₂ + 3H₂ ⇌ 2NH₃: increasing pressure shifts equilibrium right (Haber process). Adding N₂ also shifts right — more NH₃ produced. — নাইট্রোজেন ও হাইড্রোজেন থেকে অ্যামোনিয়া উৎপাদনে চাপ বাড়ালে অধিক অ্যামোনিয়া পাওয়া যায়।",
        formulas: [
          "Kc = [products]/[reactants]",
          "pH = −log[H⁺]",
          "pH = pKa + log([A⁻]/[HA])",
        ],
      };
    }
    // Generic chemistry fallback
    return {
      title: "Chemistry — NCERT Concept",
      bengaliTitle: "রসায়ন — মূল ধারণা",
      conceptExplanation: `Chemistry (রসায়ন) studies the composition, structure, and reactions of matter. Your query — "${question}" — relates to NCERT Chemistry topics. Key branches: Physical Chemistry (ভৌত রসায়ন), Organic Chemistry (জৈব রসায়ন), and Inorganic Chemistry (অজৈব রসায়ন). NEET Chemistry requires strong conceptual understanding of atomic structure, bonding, thermodynamics, equilibrium, organic reactions, and coordination compounds.`,
      bengaliExplanation:
        "NEET রসায়নে ভৌত, জৈব ও অজৈব রসায়নের সমান গুরুত্ব। পরমাণুর গঠন, রাসায়নিক বন্ধন, তাপরসায়ন, সাম্যাবস্থা, তড়িৎরসায়ন, জৈব রসায়নের বিক্রিয়া পদ্ধতি ও সমন্বয় যৌগ সবচেয়ে বেশি প্রশ্ন আসে।",
      keyPoints: [
        "Physical Chemistry: thermodynamics, equilibrium, electrochemistry, kinetics",
        "Inorganic: periodic table trends, coordination compounds, d-block elements",
        "Organic: named reactions (Aldol, Cannizzaro, Diels-Alder), functional groups",
        "NCERT examples and in-text questions are NEET question sources",
        "30–35 questions from Chemistry in NEET exam",
      ],
      example:
        "Try typing: 'atomic structure orbital', 'chemical bonding hybridization', 'organic alcohol aldehyde', 'equilibrium pH buffer' for detailed answers.",
      formulas: [
        "pH = −log[H⁺]",
        "ΔG = ΔH − TΔS",
        "Kc = [products]/[reactants]",
      ],
    };
  }

  // ── BIOLOGY ──────────────────────────────────────────────────────────────
  if (subject === "biology") {
    if (
      q.includes("cell") ||
      q.includes("mitosis") ||
      q.includes("meiosis") ||
      q.includes("membrane") ||
      q.includes("organell")
    ) {
      return {
        title: "Cell: The Unit of Life",
        bengaliTitle: "কোষ — জীবনের একক",
        conceptExplanation:
          "The cell is the fundamental structural and functional unit of life. Prokaryotic cells (bacteria, archaea) lack a membrane-bound nucleus, while eukaryotic cells (plants, animals, fungi) have a defined nucleus. Key organelles: Nucleus (genetic control), Mitochondria (ATP production, powerhouse), Ribosomes (protein synthesis), ER (transport system), Golgi body (packaging & secretion), Lysosomes (digestion). Mitosis is cell division for growth and repair (equational division — 2 identical daughter cells). Meiosis produces gametes (reductional division — 4 haploid cells with genetic variation).",
        bengaliExplanation:
          "কোষ জীবনের মৌলিক গঠন ও কার্যকরী একক। প্রোক্যারিওটিক কোষে নির্দিষ্ট নিউক্লিয়াস নেই (যেমন ব্যাকটেরিয়া), ইউক্যারিওটিক কোষে আছে। মাইটোকন্ড্রিয়া — কোষের শক্তি কেন্দ্র (ATP উৎপাদন)। মাইটোসিস সমবিভাজন (বৃদ্ধি ও মেরামত) এবং মিয়োসিস হ্রাসমূলক বিভাজন (গ্যামেট উৎপাদন)।",
        keyPoints: [
          "Prokaryote: no nuclear membrane, 70S ribosomes",
          "Eukaryote: nuclear membrane, 80S ribosomes (cytoplasmic)",
          "Mitochondria: double membrane, own DNA, site of Krebs cycle & oxidative phosphorylation",
          "Mitosis: PMAT — Prophase, Metaphase, Anaphase, Telophase",
          "Meiosis I: reductional (homologues separate); Meiosis II: equational (chromatids separate)",
        ],
        example:
          "A cell with 2n = 46 chromosomes undergoing meiosis produces 4 cells each with n = 23 chromosomes. In mitosis, 1 cell with 46 chromosomes produces 2 cells each with 46 chromosomes. — ৪৬ ক্রোমোজোমের একটি কোষ মাইটোসিসে ২টি ৪৬ ক্রোমোজোম কোষ দেয়, মিয়োসিসে ৪টি ২৩ ক্রোমোজোম কোষ দেয়।",
      };
    }
    if (
      q.includes("genetic") ||
      q.includes("dna") ||
      q.includes("rna") ||
      q.includes("protein synth") ||
      q.includes("mendel") ||
      q.includes("inherit") ||
      q.includes("mutation")
    ) {
      return {
        title: "Genetics and Molecular Biology",
        bengaliTitle: "জিনতত্ত্ব ও আণবিক জীববিজ্ঞান",
        conceptExplanation:
          "Genetics studies heredity and variation. Mendel's Laws: Law of Segregation (alleles separate during gamete formation) and Law of Independent Assortment (genes on different chromosomes assort independently). DNA is the genetic material — double helix with complementary base pairing (A-T, G-C). Central Dogma: DNA → (transcription) → mRNA → (translation) → Protein. DNA replication is semi-conservative. Mutations are changes in DNA sequence; point mutations affect a single base, while chromosomal mutations involve structural changes.",
        bengaliExplanation:
          "মেন্ডেলের সূত্র: বিচ্ছিন্নতার সূত্র (অ্যালিলরা গ্যামেট গঠনে আলাদা হয়) এবং স্বাধীন বিন্যাসের সূত্র। DNA দ্বিসূত্রীয় হেলিক্স — A-T এবং G-C জোড়া বন্ধন দ্বারা সংযুক্ত। কেন্দ্রীয় মতবাদ: DNA → mRNA → প্রোটিন।",
        keyPoints: [
          "Mendel's Law of Segregation: Aa × Aa → 1AA : 2Aa : 1aa (3:1 phenotypic ratio)",
          "Dihybrid cross: AaBb × AaBb → 9:3:3:1 ratio",
          "DNA: deoxyribose sugar, phosphate, nitrogenous bases (A, T, G, C)",
          "RNA: ribose sugar, uracil (U) instead of thymine (T)",
          "Replication: semiconservative (proven by Meselson-Stahl experiment)",
        ],
        example:
          "Monohybrid cross Tt × Tt (tall × tall): 25% TT, 50% Tt, 25% tt → 3 tall : 1 short phenotype ratio. — Tt × Tt সংকরায়ণে তত্ত্বগত ফলাফল ৩ লম্বা : ১ খর্বাকার।",
      };
    }
    if (
      q.includes("photosynth") ||
      q.includes("chlorophyll") ||
      q.includes("calvin") ||
      q.includes("plant physio") ||
      q.includes("transpir")
    ) {
      return {
        title: "Photosynthesis in Higher Plants",
        bengaliTitle: "উচ্চতর উদ্ভিদে সালোকসংশ্লেষণ",
        conceptExplanation:
          "Photosynthesis converts light energy into chemical energy stored as glucose. It occurs in two stages: Light Reactions (in thylakoid membranes) and the Calvin Cycle (in stroma). Light reactions produce ATP, NADPH, and O₂ (from water splitting — photolysis). The Calvin Cycle (C3 pathway) uses CO₂, ATP, and NADPH to produce G3P, which is converted to glucose. C4 plants (maize, sugarcane) fix CO₂ first via PEP carboxylase in mesophyll cells to minimize photorespiration. CAM plants (cactus) open stomata at night for CO₂ fixation.",
        bengaliExplanation:
          "সালোকসংশ্লেষণ দুটি ধাপে ঘটে: আলোক বিক্রিয়া (থাইলাকয়েড ঝিল্লিতে) এবং ক্যালভিন চক্র (স্ট্রোমায়)। আলোক বিক্রিয়ায় ATP, NADPH ও O₂ উৎপন্ন হয়। ক্যালভিন চক্রে CO₂ বিজারিত হয়ে গ্লুকোজ তৈরি হয়। C4 উদ্ভিদ (ভুট্টা, আখ) ফটোরেসপিরেশন কমায়।",
        keyPoints: [
          "Light reactions: PS I + PS II, produces ATP + NADPH + O₂",
          "Calvin cycle: CO₂ fixation by RuBisCO → 3-PGA → G3P → glucose",
          "C3 plants: first stable product is 3-C compound (3-PGA) — wheat, rice",
          "C4 plants: first stable product is 4-C compound (OAA) — maize, sugarcane",
          "CAM: CO₂ stored as malic acid at night — cactus, pineapple",
        ],
        example:
          "Overall equation: 6CO₂ + 12H₂O + light energy → C₆H₁₂O₆ + 6O₂ + 6H₂O. The O₂ released comes from water (H₂O), not CO₂ — proven by isotopic labelling. — সালোকসংশ্লেষণে মুক্ত O₂ জলের বিভাজন থেকে আসে।",
      };
    }
    if (
      q.includes("human physio") ||
      q.includes("heart") ||
      q.includes("blood") ||
      q.includes("digestion") ||
      q.includes("nerve") ||
      q.includes("kidney") ||
      q.includes("respir")
    ) {
      return {
        title: "Human Physiology",
        bengaliTitle: "মানব শরীরতত্ত্ব",
        conceptExplanation:
          "Human physiology covers all major organ systems. The cardiovascular system: the heart pumps blood in two circuits — pulmonary (heart → lungs → heart) and systemic (heart → body → heart). Blood consists of plasma (55%) and formed elements — RBCs (carry O₂ via haemoglobin), WBCs (immunity), platelets (clotting). Digestion: food is mechanically and chemically broken down; enzymes include salivary amylase (starch → maltose), pepsin (protein), lipase (fats). The nephron is the functional unit of the kidney; it filters blood and maintains osmoregulation.",
        bengaliExplanation:
          "মানব হৃৎপিণ্ড দুটি সার্কিটে রক্ত পাম্প করে — ফুসফুস সার্কিট ও সিস্টেমিক সার্কিট। রক্তে হিমোগ্লোবিন O₂ বহন করে। নেফ্রন কিডনির কার্যকরী একক — রক্ত পরিষ্কার ও অসমোরেগুলেশন করে। পাচন প্রক্রিয়ায় এনজাইম খাদ্যকে ছোট অণুতে পরিণত করে।",
        keyPoints: [
          "Heart: 4 chambers, SA node is pacemaker (generates 70 bpm)",
          "Blood: RBC (120-day life), WBC (types: neutrophil, lymphocyte, monocyte, eosinophil, basophil)",
          "Digestion enzymes: amylase (starch), pepsin (protein, stomach), lipase (fat, intestine)",
          "Nephron: glomerular filtration, tubular reabsorption, tubular secretion",
          "Neuron: dendrite → cell body → axon → synapse (neurotransmitters)",
        ],
        example:
          "Normal blood pressure: 120/80 mmHg (systolic/diastolic). Glomerular filtration rate: ~125 mL/min; 180 L filtered daily but only ~1.5 L excreted as urine. — প্রতিদিন ১৮০ লিটার রক্ত পরিস্রাবণ হয় কিন্তু মাত্র ১.৫ লিটার মূত্র নির্গত হয়।",
      };
    }
    if (
      q.includes("evolution") ||
      q.includes("darwin") ||
      q.includes("natural selection") ||
      q.includes("origin")
    ) {
      return {
        title: "Evolution",
        bengaliTitle: "বিবর্তন",
        conceptExplanation:
          "Evolution is the change in heritable characteristics of populations over successive generations. Darwin's Theory of Natural Selection: organisms with favorable traits survive and reproduce more (survival of the fittest). Evidence includes fossils, comparative anatomy (homologous structures — same ancestry, analogous structures — convergent evolution), embryology, and molecular biology (DNA comparison). Modern Synthetic Theory combines Darwinian natural selection with Mendelian genetics and population genetics (Hardy-Weinberg Principle).",
        bengaliExplanation:
          "ডারউইনের প্রাকৃতিক নির্বাচন তত্ত্ব: অনুকূল বৈশিষ্ট্যধারী জীব বেশি বেঁচে থাকে ও সন্তান রাখে। হার্ডি-ওয়াইনবার্গ নীতি: বড় প্যানমিক্টিক পপুলেশনে জিন ফ্রিকোয়েন্সি অপরিবর্তিত থাকে যদি বিবর্তনীয় শক্তি কাজ না করে।",
        keyPoints: [
          "Lamarck: use and disuse (discredited)",
          "Darwin: natural selection, variation, heredity",
          "Hardy-Weinberg: p² + 2pq + q² = 1; p + q = 1",
          "Homologous organs: same origin, different function (whale flipper, bat wing, human arm)",
          "Analogous organs: different origin, same function (bird wing, butterfly wing)",
        ],
        example:
          "In a population: if frequency of recessive allele q = 0.3, then p = 0.7; homozygous recessive = q² = 0.09 = 9%. — যদি হ্রাসপ্রাপ্ত অ্যালিলের ফ্রিকোয়েন্সি ০.৩ হয়, তাহলে হোমোজাইগাস রিসেসিভ ব্যক্তির ফ্রিকোয়েন্সি ৯%।",
      };
    }
    // Generic biology fallback
    return {
      title: "Biology — NCERT Concept",
      bengaliTitle: "জীববিজ্ঞান — মূল ধারণা",
      conceptExplanation: `Biology (জীববিজ্ঞান) is the science of life. Your query — "${question}" — relates to NCERT Biology topics. NEET Biology has 90 questions (50% weightage!) covering Botany and Zoology equally. Key units: Cell Biology (কোষ জীববিজ্ঞান), Genetics & Evolution (জিনতত্ত্ব ও বিবর্তন), Human Physiology (মানব শরীরতত্ত্ব), Plant Physiology (উদ্ভিদ শরীরতত্ত্ব), Biotechnology (জৈবপ্রযুক্তি), Ecology (বাস্তুবিদ্যা).`,
      bengaliExplanation:
        "NEET-এ জীববিজ্ঞান থেকে সবচেয়ে বেশি প্রশ্ন আসে (৯০টি)। NCERT-এর প্রতিটি অধ্যায়, ডায়াগ্রাম ও উদাহরণ মনোযোগ দিয়ে পড়া জরুরি। কোষ বিভাজন, জিনতত্ত্ব, সালোকসংশ্লেষণ, শ্বসন, মানব পাচন ও সংবহন সবচেয়ে বেশি প্রশ্ন আসে।",
      keyPoints: [
        "Botany topics: cell, tissues, plant physiology, reproduction, genetics",
        "Zoology topics: animal kingdom, human physiology, reproduction, evolution, ecology",
        "NCERT diagrams must be practiced (Meiosis, Heart, Nephron, Chloroplast)",
        "Biotechnology: rDNA technology, GMO, PCR, gel electrophoresis",
        "Ecology: food chains, biodiversity, environmental issues",
      ],
      example:
        "Try typing: 'cell mitosis meiosis', 'photosynthesis calvin cycle', 'human heart blood circulation', 'genetics mendel dna', 'evolution darwin' for detailed answers.",
    };
  }

  // Fallback
  return {
    title: "NEET Concept Explanation",
    bengaliTitle: "NEET ধারণা ব্যাখ্যা",
    conceptExplanation: `Your question "${question}" relates to NEET preparation. Please select Physics, Chemistry, or Biology and write your specific topic or question for a detailed NCERT-aligned explanation.`,
    bengaliExplanation: `আপনার প্রশ্ন "${question}" NEET প্রস্তুতির সাথে সম্পর্কিত। Physics, Chemistry বা Biology বেছে নির্দিষ্ট টপিক লিখুন বিস্তারিত উত্তরের জন্য।`,
    keyPoints: [
      "Select a subject first",
      "Write specific topic or question",
      "Choose answer type (Concept/Numerical/MCQ)",
    ],
    example:
      "Example queries: 'Newton laws of motion', 'atomic structure orbital', 'photosynthesis light reaction'",
  };
}

const subjectMeta: Record<
  string,
  {
    label: string;
    bengali: string;
    color: string;
    iconClass: string;
    btnClass: string;
  }
> = {
  physics: {
    label: "Physics",
    bengali: "ভৌতবিজ্ঞান",
    color: "teal",
    iconClass: "text-teal-600",
    btnClass: "bg-teal-600 hover:bg-teal-700 text-white",
  },
  chemistry: {
    label: "Chemistry",
    bengali: "রসায়ন",
    color: "cyan",
    iconClass: "text-cyan-600",
    btnClass: "bg-cyan-600 hover:bg-cyan-700 text-white",
  },
  biology: {
    label: "Biology",
    bengali: "জীববিজ্ঞান",
    color: "emerald",
    iconClass: "text-emerald-600",
    btnClass: "bg-emerald-600 hover:bg-emerald-700 text-white",
  },
};

export function NeetSolver({ subject, classLevel, onBack }: NeetSolverProps) {
  const [question, setQuestion] = useState("");
  const [answerType, setAnswerType] = useState<AnswerType>("concept");
  const [answer, setAnswer] = useState<NeetAnswer | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  const meta = subjectMeta[subject] ?? subjectMeta.physics;

  async function handleSubmit() {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer(null);
    await new Promise((r) => setTimeout(r, 500));
    const result = generateNeetAnswer(
      subject,
      classLevel,
      question,
      answerType,
    );
    setAnswer(result);
    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="gap-1 text-muted-foreground"
          data-ocid="neet.button"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <div className="flex items-center gap-2">
          <FlaskConical className={`w-5 h-5 ${meta.iconClass}`} />
          <div>
            <span className="font-display font-bold text-navy text-lg">
              {meta.label}
            </span>
            <span className="ml-2 text-sm text-muted-foreground">
              {meta.bengali}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Chapter Panel */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        {(() => {
          const chapters = NEET_CHAPTERS[subject] ?? [];
          if (chapters.length === 0) return null;
          return (
            <div className="bg-white border border-teal-100 rounded-xl p-4 shadow-sm">
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                Chapters
              </p>
              <div className="flex flex-wrap gap-2">
                {chapters.map((ch) => (
                  <button
                    type="button"
                    key={ch.id}
                    onClick={() => {
                      setSelectedChapter(ch.id);
                      setQuestion(ch.name);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${selectedChapter === ch.id ? "bg-teal-600 text-white border-teal-600" : "bg-white text-gray-600 border-gray-200 hover:border-teal-300"}`}
                    data-ocid="neet.tab"
                  >
                    {ch.name}
                  </button>
                ))}
              </div>
              {selectedChapter && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {chapters
                    .find((c) => c.id === selectedChapter)
                    ?.topics.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setQuestion(t)}
                        className="px-2 py-0.5 rounded text-xs bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100"
                        data-ocid="neet.button"
                      >
                        {t}
                      </button>
                    ))}
                </div>
              )}
            </div>
          );
        })()}
      </motion.div>

      {/* Input Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Card className="mb-5 border-2 border-teal-100">
          <CardContent className="pt-5 space-y-4">
            <div>
              <label
                htmlFor="neet-question"
                className="text-sm font-semibold text-navy mb-1.5 block"
              >
                প্রশ্ন / Question
              </label>
              <Textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="যেকোনো প্রশ্ন বা টপিক লিখুন... / Write any question or topic..."
                className="min-h-[100px] text-sm resize-none border-teal-200 focus-visible:ring-teal-400"
                id="neet-question"
                data-ocid="neet.textarea"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.ctrlKey) handleSubmit();
                }}
              />
            </div>

            {/* Answer Type Selector */}
            <div>
              <p className="text-sm font-semibold text-navy mb-2">
                উত্তরের ধরন / Answer Type
              </p>
              <div className="flex flex-wrap gap-2" data-ocid="neet.tab">
                {(
                  [
                    {
                      value: "concept",
                      icon: BookOpen,
                      label: "Concept / তত্ত্ব",
                    },
                    {
                      value: "numerical",
                      icon: Zap,
                      label: "Numerical / সংখ্যাতাত্ত্বিক",
                    },
                    { value: "mcq", icon: CheckCircle, label: "MCQ Practice" },
                  ] as const
                ).map(({ value, icon: Icon, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAnswerType(value)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                      answerType === value
                        ? "bg-teal-600 text-white border-teal-600"
                        : "bg-white text-gray-600 border-gray-200 hover:border-teal-300"
                    }`}
                    data-ocid={"neet.toggle"}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <Button
              className={`w-full font-semibold ${meta.btnClass}`}
              onClick={handleSubmit}
              disabled={loading || !question.trim()}
              data-ocid="neet.submit_button"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              {loading ? "ব্যাখ্যা তৈরি হচ্ছে..." : "Explain করো"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Answer Display */}
      <AnimatePresence>
        {answer && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
            data-ocid="neet.panel"
          >
            {/* Title */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center shrink-0 mt-0.5">
                <BookOpen className="w-4 h-4 text-teal-700" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl text-navy">
                  {answer.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {answer.bengaliTitle}
                </p>
              </div>
            </div>

            {/* Concept Explanation */}
            <Card className="border border-teal-100">
              <CardContent className="pt-4">
                <h3 className="font-semibold text-sm text-teal-700 mb-2 uppercase tracking-wide">
                  Concept Explanation
                </h3>
                <p className="text-sm leading-relaxed text-foreground mb-3">
                  {answer.conceptExplanation}
                </p>
                <Separator className="my-3" />
                <h3 className="font-semibold text-sm text-teal-700 mb-2 uppercase tracking-wide">
                  বাংলা ব্যাখ্যা
                </h3>
                <p className="text-sm leading-relaxed text-foreground">
                  {answer.bengaliExplanation}
                </p>
              </CardContent>
            </Card>

            {/* Key Points */}
            <Card className="border border-cyan-100 bg-cyan-50/40">
              <CardContent className="pt-4">
                <h3 className="font-semibold text-sm text-cyan-700 mb-3 uppercase tracking-wide">
                  Key Points / গুরুত্বপূর্ণ তথ্য
                </h3>
                <ul className="space-y-1.5">
                  {answer.keyPoints.map((pt, idx) => (
                    <li
                      key={pt.slice(0, 20)}
                      className="flex items-start gap-2 text-sm"
                    >
                      <Badge className="mt-0.5 shrink-0 bg-cyan-600 text-white text-[10px] px-1.5 py-0 h-4">
                        {idx + 1}
                      </Badge>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Example */}
            <Card className="border border-emerald-100 bg-emerald-50/40">
              <CardContent className="pt-4">
                <h3 className="font-semibold text-sm text-emerald-700 mb-2 uppercase tracking-wide">
                  Example / উদাহরণ
                </h3>
                <p className="text-sm leading-relaxed text-emerald-900">
                  {answer.example}
                </p>
              </CardContent>
            </Card>

            {/* Formulas */}
            {answer.formulas && answer.formulas.length > 0 && (
              <Card className="border border-amber-100 bg-amber-50/40">
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-sm text-amber-700 mb-3 uppercase tracking-wide">
                    Important Formulas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {answer.formulas.map((f) => (
                      <code
                        key={f}
                        className="bg-amber-100 text-amber-900 text-sm px-2.5 py-1 rounded-lg font-mono border border-amber-200"
                      >
                        {f}
                      </code>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* MCQ Options */}
            {answer.mcqOptions && (
              <Card className="border border-purple-100">
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-sm text-purple-700 mb-3 uppercase tracking-wide">
                    MCQ Practice
                  </h3>
                  <div className="space-y-2 mb-3">
                    {answer.mcqOptions.map((opt) => (
                      <div
                        key={opt.label}
                        className={`flex items-center gap-2 p-2.5 rounded-lg border text-sm ${
                          opt.correct
                            ? "bg-green-50 border-green-300 text-green-800 font-semibold"
                            : "bg-gray-50 border-gray-200 text-gray-700"
                        }`}
                        data-ocid={
                          opt.correct ? "neet.success_state" : "neet.row"
                        }
                      >
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            opt.correct
                              ? "bg-green-600 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {opt.label}
                        </span>
                        {opt.text}
                        {opt.correct && (
                          <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                        )}
                      </div>
                    ))}
                  </div>
                  {answer.mcqExplanation && (
                    <p className="text-xs text-muted-foreground bg-gray-50 rounded-lg p-3 border">
                      💡 {answer.mcqExplanation}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
