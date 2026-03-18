interface ScienceSolveInput {
  subject: string;
  classLevel: number;
  chapter: string;
  question: string;
  type: "theory" | "numerical";
}

function extractNumbers(text: string): number[] {
  const matches = text.match(/-?\d+\.?\d*/g) ?? [];
  return matches.map(Number).filter((n) => !Number.isNaN(n));
}

function detectKeywords(q: string): string[] {
  const lower = q.toLowerCase();
  const keys: string[] = [];
  const checks: [string, string][] = [
    ["velocity|speed|displacement|kinematics|বেগ|গতি|সরণ|দ্রুতি", "kinematics"],
    ["acceleration|retardation|ত্বরণ|মন্দন", "acceleration"],
    ["force|mass|newton|বল|ভর|নিউটন", "force"],
    ["work|energy|power|joule|watt|কাজ|শক্তি|ক্ষমতা", "energy"],
    ["gravity|gravitational|weight|অভিকর্ষ|মাধ্যাকর্ষণ|ওজন", "gravity"],
    ["pressure|density|fluid|চাপ|ঘনত্ব|তরল", "fluid"],
    ["heat|temperature|thermal|তাপ|উষ্ণতা", "heat"],
    ["wave|frequency|wavelength|amplitude|তরঙ্গ|কম্পাঙ্ক|তরঙ্গদৈর্ঘ্য", "wave"],
    [
      "electric|charge|coulomb|voltage|current|resistance|ohm|তড়িৎ|বিদ্যুৎ|আধান|রোধ",
      "electricity",
    ],
    ["magnetic|magnetic field|tesla|চৌম্বক", "magnetism"],
    [
      "lens|mirror|refraction|reflection|optics|লেন্স|দর্পণ|প্রতিসরণ|প্রতিফলন",
      "optics",
    ],
    ["mole|molarity|moles|molecular weight|মোল|মোলারিটি", "stoichiometry"],
    ["ph|acid|base|buffer|অ্যাসিড|ক্ষার|pH", "acid-base"],
    [
      "enthalpy|entropy|gibbs|thermodynamics|এনথালপি|এনট্রপি|তাপগতিবিদ্যা",
      "thermodynamics_chem",
    ],
    ["rate|order|reaction rate|বিক্রিয়ার হার", "kinetics"],
    [
      "photosynthesis|saloksangsleshan|shalok|salok|saloksangsleshan|photosynthes|সালোকসংশ্লেষণ|শ্বসন",
      "photosynthesis",
    ],
    [
      "mitosis|maytosis|mytosis|maitoysis|mitotis|মাইটোসিস|কোষবিভাজন|সমবিভাজন",
      "mitosis",
    ],
    [
      "meiosis|miyosis|meyosis|miosis|mayosis|মিয়োসিস|হ্রাসমূলক বিভাজন|হ্রাস বিভাজন",
      "meiosis",
    ],
    [
      "cell|kosho|kosha|কোষ|কোষপ্রাচীর|প্লাজমা|সাইটোপ্লাজম|নিউক্লিয়াস|মাইটোকন্ড্রিয়া",
      "biology_cell",
    ],
    [
      "genetics|dna|rna|heredity|allele|gene|jinototto|bongshogoti|জিনতত্ত্ব|বংশগতি|ডিএনএ",
      "genetics",
    ],
    ["protein|প্রোটিন|অ্যামিনো অ্যাসিড", "protein"],
    ["enzyme|এনজাইম", "enzyme"],
    [
      "ecosystem|bastutontro|khaddoshrinkhol|বাস্তুতন্ত্র|খাদ্যশৃঙ্খল|food chain",
      "ecology",
    ],
    ["plant|উদ্ভিদ|পত্র|বায়বীয়|পাতা|কাণ্ড|মূল", "plant_biology"],
    [
      "blood|roktoshonchalan|rokto|রক্ত|হৃদয়|hridoy|হৃৎপিণ্ড|heart|circulation|রক্তসংবহন",
      "human_biology",
    ],
    ["nervous|স্নায়ু|মস্তিষ্ক|brain", "nervous_system"],
    ["hormone|হরমোন|অন্তঃক্ষরা", "endocrine"],
    ["derivative|differentiation|integral|integration|অবকলন|সমাকলন", "calculus"],
    ["matrix|matrices|determinant|ম্যাট্রিক্স|নির্ধারক", "matrix"],
    ["probability|permutation|combination|সম্ভাবনা|বিন্যাস|সমাবেশ", "combinatorics"],
    ["sin|cos|tan|trigonometry|ত্রিকোণমিতি", "trigonometry"],
    ["vector|scalar|ভেক্টর|স্কেলার", "vectors"],
  ];
  for (const [pattern, key] of checks) {
    if (new RegExp(pattern).test(lower)) keys.push(key);
  }
  return keys;
}

function solveMathematicsNumerical(chapter: string, question: string): string {
  const nums = extractNumbers(question);
  const keywords = detectKeywords(question);
  const kw = keywords[0] ?? "";

  let formulaSection = "";
  let stepSection = "";

  if (kw === "calculus") {
    formulaSection = `Key Formulas:
  d/dx(xⁿ) = n·xⁿ⁻¹   (Power Rule)
  d/dx(sin x) = cos x
  ∫xⁿ dx = xⁿ⁺¹/(n+1) + C`;
    stepSection = `Step 1: Identify the function to differentiate/integrate.
Step 2: Apply the appropriate rule (power rule, chain rule, product rule).
Step 3: Simplify the result.
Step 4: Add constant of integration C if indefinite integral.`;
  } else if (kw === "matrix") {
    formulaSection = `Key Concepts:
  Order of Matrix: m × n (m rows, n columns)
  det(A) for 2×2: ad - bc
  A⁻¹ = (1/det(A)) × adj(A)`;
    stepSection = `Step 1: Write the matrix clearly.
Step 2: Identify the operation (addition, multiplication, determinant, inverse).
Step 3: Apply the operation row by row.
Step 4: Verify dimensions are compatible.`;
  } else if (kw === "trigonometry") {
    formulaSection = `Key Identities:
  sin²θ + cos²θ = 1
  tan θ = sin θ / cos θ
  sin(A+B) = sinA cosB + cosA sinB`;
    const a = nums[0] ?? 30;
    stepSection = `Step 1: Identify the trigonometric expression.
Step 2: Use standard identities to simplify.
Step 3: Substitute known values.
Step 4: Calculate final answer.

  Example: For angle ${a}°
  sin ${a}° = ${Math.sin((a * Math.PI) / 180).toFixed(4)}
  cos ${a}° = ${Math.cos((a * Math.PI) / 180).toFixed(4)}`;
  } else if (kw === "combinatorics") {
    const n = nums[0] ?? 5;
    const r = nums[1] ?? 2;
    const perm = factorial(n) / factorial(n - r);
    const comb = perm / factorial(r);
    formulaSection = `Key Formulas:
  P(n,r) = n! / (n-r)!   (Permutations)
  C(n,r) = n! / (r! × (n-r)!)   (Combinations)`;
    stepSection = `Step 1: Identify n = ${n}, r = ${r}.
Step 2: Calculate P(${n},${r}) = ${n}! / (${n}-${r})!
         = ${perm.toLocaleString()}
Step 3: Calculate C(${n},${r}) = P(${n},${r}) / ${r}!
         = ${comb.toLocaleString()}`;
  } else {
    stepSection = `Step 1: Read the problem carefully and note all given values.
Step 2: Identify the relevant formula from chapter "${chapter}".
Step 3: Substitute the given values into the formula.
Step 4: Perform arithmetic operations step-by-step.
Step 5: Write the final answer with correct units.`;
  }

  return `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📐 MATHEMATICS SOLUTION (Class ${chapter.includes("Class") ? "" : ""})
Chapter: ${chapter}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 Given Problem:
${question}

${
  formulaSection
    ? `📝 ${formulaSection}

`
    : ""
}🔢 Step-by-Step Solution:
${stepSection}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 মনে রাখো (Remember):
  → সূত্র মুখস্থ না করে বুঝে প্রয়োগ করো
  → প্রতিটি ধাপ পরিষ্কারভাবে লেখো
  → একক (unit) লিখতে ভুলো না
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}

function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

function solvePhysicsNumerical(chapter: string, question: string): string {
  const nums = extractNumbers(question);
  const keywords = detectKeywords(question);
  const kw = keywords[0] ?? "";

  let given = "";
  let formula = "";
  let steps = "";
  let answer = "";

  if (kw === "kinematics" || kw === "acceleration") {
    const u = nums[0] ?? 0;
    const a = nums[1] ?? 10;
    const t = nums[2] ?? 5;
    const v = u + a * t;
    const s = u * t + 0.5 * a * t * t;
    given = `  Initial velocity (u) = ${u} m/s
  Acceleration (a) = ${a} m/s²
  Time (t) = ${t} s`;
    formula = `  v = u + at          (1st equation of motion)
  s = ut + ½at²       (2nd equation of motion)
  v² = u² + 2as       (3rd equation of motion)`;
    steps = `  Step 1: Identify given: u = ${u}, a = ${a}, t = ${t}
  Step 2: Apply v = u + at
           v = ${u} + (${a})(${t})
           v = ${v} m/s
  Step 3: Apply s = ut + ½at²
           s = (${u})(${t}) + ½(${a})(${t})²
           s = ${u * t} + ${0.5 * a * t * t}
           s = ${s} m`;
    answer = `  Final velocity v = ${v} m/s
  Distance s = ${s} m`;
  } else if (kw === "force") {
    const m = nums[0] ?? 5;
    const a = nums[1] ?? 10;
    const F = m * a;
    given = `  Mass (m) = ${m} kg
  Acceleration (a) = ${a} m/s²`;
    formula = `  F = ma       (Newton's Second Law)`;
    steps = `  Step 1: Note m = ${m} kg, a = ${a} m/s²
  Step 2: F = ma
           F = ${m} × ${a}
           F = ${F} N`;
    answer = `  Force F = ${F} N`;
  } else if (kw === "energy") {
    const m = nums[0] ?? 2;
    const v = nums[1] ?? 10;
    const h = nums[2] ?? 5;
    const KE = 0.5 * m * v * v;
    const PE = m * 9.8 * h;
    given = `  Mass (m) = ${m} kg
  Velocity (v) = ${v} m/s
  Height (h) = ${h} m`;
    formula = `  KE = ½mv²     (Kinetic Energy)
  PE = mgh      (Potential Energy)
  g = 9.8 m/s²`;
    steps = `  Step 1: KE = ½mv² = ½ × ${m} × ${v}² = ${KE} J
  Step 2: PE = mgh = ${m} × 9.8 × ${h} = ${PE.toFixed(2)} J`;
    answer = `  KE = ${KE} J, PE = ${PE.toFixed(2)} J`;
  } else if (kw === "electricity") {
    const V = nums[0] ?? 12;
    const R = nums[1] ?? 4;
    const I = V / R;
    const P = V * I;
    given = `  Voltage (V) = ${V} V
  Resistance (R) = ${R} Ω`;
    formula = `  I = V/R       (Ohm's Law)
  P = VI        (Electric Power)`;
    steps = `  Step 1: I = V/R = ${V}/${R} = ${I.toFixed(2)} A
  Step 2: P = VI = ${V} × ${I.toFixed(2)} = ${P.toFixed(2)} W`;
    answer = `  Current I = ${I.toFixed(2)} A, Power P = ${P.toFixed(2)} W`;
  } else if (kw === "wave") {
    const f = nums[0] ?? 440;
    const lambda = nums[1] ?? 0.8;
    const v = f * lambda;
    given = `  Frequency (f) = ${f} Hz
  Wavelength (λ) = ${lambda} m`;
    formula = "  v = fλ        (Wave speed formula)";
    steps = `  Step 1: v = f × λ
           v = ${f} × ${lambda}
           v = ${v} m/s`;
    answer = `  Wave speed v = ${v} m/s`;
  } else {
    given = nums.length
      ? `  Given values: ${nums.join(", ")}`
      : "  Given: (extracted from problem above)";
    formula = `  Identify the relevant formula from chapter: ${chapter}`;
    steps = `  Step 1: List all given quantities with units.
  Step 2: Identify the unknown quantity.
  Step 3: Choose the appropriate formula from ${chapter}.
  Step 4: Substitute values carefully.
  Step 5: Calculate and write the answer with units.`;
    answer = "  Apply the formula and calculate the final answer.";
  }

  return `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚛️ PHYSICS SOLUTION (Numerical)
Chapter: ${chapter}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 Problem:
${question}

📊 Given Data (প্রদত্ত তথ্য):
${given}

📝 Formula Used (সূত্র):
${formula}

🔢 Solution Steps (সমাধান):
${steps}

✅ Final Answer (উত্তর):
${answer}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 মনে রাখো:
  → প্রতিটি রাশির একক (SI unit) লিখতে ভুলো না
  → সূত্র সঠিকভাবে প্রয়োগ করো
  → WBCHSE পরীক্ষায় সব ধাপ দেখিয়ে লেখো
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}

function solveChemistryNumerical(chapter: string, question: string): string {
  const nums = extractNumbers(question);
  const keywords = detectKeywords(question);
  const kw = keywords[0] ?? "";

  let given = "";
  let formula = "";
  let steps = "";
  let answer = "";

  if (kw === "stoichiometry") {
    const mass = nums[0] ?? 36;
    const molarMass = nums[1] ?? 18;
    const moles = mass / molarMass;
    given = `  Mass of substance = ${mass} g
  Molar mass = ${molarMass} g/mol`;
    formula = `  n = m/M         (moles = mass / molar mass)
  Molarity (M) = n/V(L)`;
    steps = `  Step 1: n = m/M = ${mass}/${molarMass} = ${moles.toFixed(3)} mol
  Step 2: Number of molecules = n × 6.022×10²³
           = ${moles.toFixed(3)} × 6.022×10²³
           = ${(moles * 6.022e23).toExponential(3)} molecules`;
    answer = `  Moles = ${moles.toFixed(3)} mol`;
  } else if (kw === "acid-base") {
    const conc = nums[0] ?? 0.1;
    const pH = -Math.log10(conc);
    given = `  Concentration [H⁺] = ${conc} mol/L`;
    formula = "  pH = -log₁₀[H⁺]";
    steps = `  Step 1: [H⁺] = ${conc} mol/L
  Step 2: pH = -log₁₀(${conc})
           pH = ${pH.toFixed(2)}`;
    answer = `  pH = ${pH.toFixed(2)}`;
  } else if (kw === "thermodynamics_chem") {
    const H = nums[0] ?? -285.8;
    const S = nums[1] ?? 69.9;
    const T = nums[2] ?? 298;
    const G = H - T * (S / 1000);
    given = `  ΔH = ${H} kJ/mol
  ΔS = ${S} J/mol·K
  T = ${T} K`;
    formula = "  ΔG = ΔH - TΔS   (Gibbs Free Energy)";
    steps = `  Step 1: Convert ΔS to kJ: ${S}/1000 = ${S / 1000} kJ/mol·K
  Step 2: ΔG = ΔH - TΔS
           ΔG = ${H} - (${T} × ${S / 1000})
           ΔG = ${G.toFixed(2)} kJ/mol`;
    answer = `  ΔG = ${G.toFixed(2)} kJ/mol
  ${G < 0 ? "→ Spontaneous reaction (স্বতঃস্ফূর্ত বিক্রিয়া)" : "→ Non-spontaneous reaction"}`;
  } else {
    given = nums.length
      ? `  Given values: ${nums.join(", ")}`
      : "  (from problem statement above)";
    formula = `  Relevant formula from chapter: ${chapter}`;
    steps = `  Step 1: Write the balanced equation (if reaction problem).
  Step 2: List all given values with units.
  Step 3: Apply the formula for ${chapter}.
  Step 4: Calculate step-by-step.
  Step 5: State final answer with units.`;
    answer = "  Apply formula and calculate.";
  }

  return `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧪 CHEMISTRY SOLUTION (Numerical)
Chapter: ${chapter}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 Problem:
${question}

📊 Given (প্রদত্ত):
${given}

📝 Formula (সূত্র):
${formula}

🔢 Steps (ধাপ):
${steps}

✅ Answer (উত্তর):
${answer}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 মনে রাখো:
  → বিক্রিয়া সমীকরণ সবসময় balance করো
  → SI unit ব্যবহার করো
  → significant figures মেনে চলো
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}

function getBiologyContent(
  topic: string,
  chapter: string,
  question: string,
): {
  definition: string;
  explanation: string;
  keyPoints: string;
  examTips: string;
} {
  if (topic === "meiosis") {
    return {
      definition:
        "মিয়োসিস হলো এক বিশেষ ধরনের কোষ বিভাজন প্রক্রিয়া যেখানে একটি মাতৃকোষ থেকে চারটি অপত্য কোষ তৈরি হয় এবং প্রতিটি অপত্য কোষে ক্রোমোজোম সংখ্যা মাতৃকোষের অর্ধেক হয়।",
      explanation: `মিয়োসিসের গঠন ও পর্যায়সমূহ:

🔴 মিয়োসিস-I (হ্রাসমূলক বিভাজন):
  ১. লেপ্টোটিন: ক্রোমোজোম সুতার মতো দেখায়, ক্রোমোজোম সংকুচিত হতে শুরু করে
  ২. জাইগোটিন: সমসংস্থ ক্রোমোজোম জোড় বাঁধে (সিন্যাপসিস), বাইভ্যালেন্ট গঠন
  ৩. প্যাকাইটিন: ক্রসিং ওভার ঘটে — জিনগত পুনর্বিন্যাস হয়
  ৪. ডিপ্লোটিন: বাইভ্যালেন্ট আলাদা হতে শুরু করে, কায়াজমা দেখা যায়
  ৫. ডায়াকাইনেসিস: ক্রোমোজোম আরও ঘন হয়, নিউক্লিয়ার ঝিল্লি বিলুপ্ত
  মেটাফেজ-I → অ্যানাফেজ-I → টেলোফেজ-I

🔵 মিয়োসিস-II (সমীকরণ বিভাজন):
  প্রতিটি কোষ মাইটোসিসের মতো বিভাজিত হয়
  ফলে মোট ৪টি হ্যাপ্লয়েড (n) কোষ তৈরি হয়

মিয়োসিসের বৈশিষ্ট্য:
  • মাতৃকোষ: ডিপ্লয়েড (2n)
  • অপত্য কোষ: হ্যাপ্লয়েড (n) — ৪টি
  • কোষ বিভাজন: ২ বার
  • DNA প্রতিলিপি: ১ বার (মিয়োসিস-I-এর আগে)
  • ক্রসিং ওভার: ঘটে → জিনগত বৈচিত্র্য তৈরি`,
      keyPoints: `→ মিয়োসিস শুধুমাত্র জননাঙ্গে ঘটে (শুক্রাশয়, ডিম্বাশয়)
  → ক্রসিং ওভার → কায়াজমা গঠন → জিনগত পুনর্বিন্যাস
  → প্রজাতির ক্রোমোজোম সংখ্যা প্রজন্মের পর প্রজন্মে স্থির থাকে
  → মিয়োসিস না হলে প্রতি প্রজন্মে ক্রোমোজোম দ্বিগুণ হয়ে যেত`,
      examTips: `→ মিয়োসিস-I ও মিয়োসিস-II-এর পার্থক্য লেখো
  → লেপ্টোটিন থেকে ডায়াকাইনেসিস পর্যন্ত পাঁচটি পর্যায়ের নাম ও বৈশিষ্ট্য মনে রাখো
  → মাইটোসিস ও মিয়োসিসের তুলনামূলক চিত্র আঁকো
  → ক্রসিং ওভারের গুরুত্ব ব্যাখ্যা করো`,
    };
  }
  if (topic === "mitosis") {
    return {
      definition:
        "মাইটোসিস হলো এক প্রকার কোষ বিভাজন যেখানে একটি মাতৃকোষ থেকে দুটি অপত্য কোষ তৈরি হয় এবং প্রতিটি অপত্য কোষে মাতৃকোষের সমান সংখ্যক ক্রোমোজোম থাকে।",
      explanation: `মাইটোসিসের পর্যায়সমূহ:

১. প্রোফেজ:
   → ক্রোমাটিন সুতা ঘনীভূত হয়ে ক্রোমোজোমে পরিণত হয়
   → নিউক্লিয়ার ঝিল্লি ও নিউক্লিওলাস অদৃশ্য হয়
   → স্পিন্ডল যন্ত্র তৈরি হতে শুরু করে

২. মেটাফেজ:
   → ক্রোমোজোমগুলো কোষের মধ্যবর্তী তলে (বিষুব তল) সারিবদ্ধ হয়
   → সেন্ট্রোমিয়ারে স্পিন্ডল তন্তু যুক্ত হয়
   → এই পর্যায়ে ক্রোমোজোম সবচেয়ে স্পষ্ট দেখা যায়

৩. অ্যানাফেজ:
   → সেন্ট্রোমিয়ার বিভক্ত হয়
   → ক্রোমাটিডগুলো কোষের বিপরীত মেরুতে চলে যায়
   → কোষটি লম্বা হতে শুরু করে

৪. টেলোফেজ:
   → মেরুতে পৌঁছানো ক্রোমোজোমগুলো ক্রোমাটিনে পরিণত হয়
   → নিউক্লিয়ার ঝিল্লি পুনরায় তৈরি হয়
   → সাইটোকাইনেসিস: সাইটোপ্লাজম বিভক্ত হয়ে দুটি কোষ গঠন করে

মাইটোসিসের বৈশিষ্ট্য:
  • মাতৃকোষ: ডিপ্লয়েড (2n)
  • অপত্য কোষ: ডিপ্লয়েড (2n) — ২টি
  • দেহকোষে ঘটে
  • বৃদ্ধি ও মেরামতের জন্য`,
      keyPoints: `→ মাইটোসিসে ক্রোমোজোম সংখ্যা অপরিবর্তিত থাকে
  → মেটাফেজ পর্যায়ে ক্রোমোজোম গণনা সবচেয়ে সহজ
  → প্রাণীকোষে সেন্ট্রিওল থাকে, উদ্ভিদকোষে থাকে না
  → সাইটোকাইনেসিস: প্রাণীতে খাঁজ, উদ্ভিদে কোষপাত গঠনের মাধ্যমে`,
      examTips: `→ চারটি পর্যায়ের নাম ও বৈশিষ্ট্য বিস্তারিত লেখো
  → প্রতিটি পর্যায়ের চিত্র আঁকো
  → মাইটোসিস ও মিয়োসিসের পার্থক্য টেবিলে লেখো
  → মাইটোসিসের গুরুত্ব ব্যাখ্যা করো`,
    };
  }
  if (topic === "photosynthesis") {
    return {
      definition:
        "সালোকসংশ্লেষণ হলো সেই প্রক্রিয়া যেখানে সবুজ উদ্ভিদ সূর্যালোক, জল ও কার্বন ডাইঅক্সাইড ব্যবহার করে গ্লুকোজ ও অক্সিজেন তৈরি করে।",
      explanation: `সালোকসংশ্লেষণের সমীকরণ:
  6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (সূর্যালোক ও ক্লোরোফিলের উপস্থিতিতে)

দুটি পর্যায়:
  ১. আলোক দশা (Light Reaction) — থাইলাকয়েডে:
     • সূর্যালোক শোষণ
     • জলের ফটোলাইসিস: H₂O → H⁺ + OH⁻ + e⁻
     • ATP ও NADPH তৈরি
     • O₂ নির্গত হয়

  ২. অন্ধকার দশা (Calvin Cycle) — স্ট্রোমায়:
     • CO₂ স্থিরীকরণ (RuBisCO এনজাইম দ্বারা)
     • C3 চক্র: 3-ফসফোগ্লিসারেট তৈরি
     • গ্লুকোজ সংশ্লেষণ`,
      keyPoints: `→ ক্লোরোপ্লাস্টে সালোকসংশ্লেষণ ঘটে
  → ক্লোরোফিল-a সরাসরি আলোক বিক্রিয়ায় অংশ নেয়
  → C4 উদ্ভিদ (আখ, ভুট্টা) অধিক দক্ষতায় CO₂ গ্রহণ করে
  → তাপমাত্রা, আলোর তীব্রতা ও CO₂ ঘনত্ব সালোকসংশ্লেষণকে প্রভাবিত করে`,
      examTips: `→ সমীকরণটি মুখস্থ রাখো
  → আলোক দশা ও অন্ধকার দশার পার্থক্য লেখো
  → ক্লোরোপ্লাস্টের গঠন চিত্র সহ লেখো`,
    };
  }
  if (topic === "genetics") {
    return {
      definition: "জিনতত্ত্ব (Genetics) হলো জীবের বংশগতি ও প্রকরণের বিজ্ঞান।",
      explanation: `মেন্ডেলের সূত্র:
  ১. পৃথকীভবনের সূত্র: গ্যামেট গঠনের সময় অ্যালিল আলাদা হয়
  ২. স্বাধীন বিন্যাসের সূত্র: বিভিন্ন ক্রোমোজোমের জিন স্বাধীনভাবে বিন্যস্ত হয়

DNA গঠন:
  • দ্বি-কুণ্ডলী সর্পিল (Watson & Crick, ১৯৫৩)
  • বেস জোড়: A-T, G-C
  • কেন্দ্রীয় নীতি: DNA → RNA → প্রোটিন`,
      keyPoints: `→ প্রভাবী অ্যালিল প্রচ্ছন্ন অ্যালিলকে আড়াল করে
  → জিনোটাইপ: জিনগত গঠন; ফিনোটাইপ: পর্যবেক্ষণযোগ্য বৈশিষ্ট্য
  → মিউটেশন: DNA-এর স্থায়ী পরিবর্তন`,
      examTips: `→ মেন্ডেলের পরীক্ষার বিবরণ লেখো
  → পানেট বর্গ (Punnett square) এঁকে ক্রস দেখাও
  → মনোহাইব্রিড অনুপাত ৩:১, ডাইহাইব্রিড অনুপাত ৯:৩:৩:১`,
    };
  }
  if (topic === "ecology") {
    return {
      definition:
        "বাস্তুতন্ত্র (Ecosystem) হলো একটি জৈবিক সম্প্রদায় এবং তার পরিবেশের মধ্যে মিথস্ক্রিয়ার একক।",
      explanation: `খাদ্যশৃঙ্খল (Food Chain):
  উৎপাদক → প্রথম স্তরের খাদক → দ্বিতীয় স্তরের খাদক → বিয়োজক
  উদাহরণ: ঘাস → ঘাসফড়িং → ব্যাঙ → সাপ → ঈগল

শক্তি প্রবাহ:
  • শুধু ১০% শক্তি পরবর্তী স্তরে যায় (১০% নিয়ম)
  • পুষ্টিচক্র: কার্বন চক্র, নাইট্রোজেন চক্র

জীববৈচিত্র্য:
  • জিনগত বৈচিত্র্য, প্রজাতিগত বৈচিত্র্য, বাস্তুতান্ত্রিক বৈচিত্র্য`,
      keyPoints: `→ উৎপাদক: সবুজ উদ্ভিদ (অটোট্রফ)
  → খাদক: প্রাণী (হেটেরোট্রফ)
  → বিয়োজক: ব্যাকটেরিয়া ও ছত্রাক
  → জলবায়ু পরিবর্তন জীববৈচিত্র্য হ্রাস করছে`,
      examTips: `→ খাদ্যজাল ও খাদ্যশৃঙ্খলের পার্থক্য লেখো
  → শক্তি পিরামিড আঁকো
  → কার্বন চক্র চিত্র সহ বর্ণনা করো`,
    };
  }
  if (topic === "nervous_system") {
    return {
      definition:
        "স্নায়ুতন্ত্র হলো সেই তন্ত্র যা শরীরের বিভিন্ন অংশের মধ্যে সংকেত পরিবহন করে এবং কার্যক্রম নিয়ন্ত্রণ করে।",
      explanation: `স্নায়ুতন্ত্রের বিভাগ:
  • কেন্দ্রীয় স্নায়ুতন্ত্র (CNS): মস্তিষ্ক ও মেরুদণ্ড
  • পেরিফেরাল স্নায়ুতন্ত্র (PNS): দেহের বাকি অংশ

নিউরনের গঠন:
  • ডেনড্রাইট → কোষদেহ → অ্যাক্সন → সিন্যাপস
  • সিন্যাপসে নিউরোট্রান্সমিটার মুক্ত হয়

মানব মস্তিষ্কের অংশ:
  • সেরিব্রাম: চিন্তা, স্মৃতি, ঐচ্ছিক গতি
  • সেরিবেলাম: ভারসাম্য ও সমন্বয়
  • মেডুলা অবলংগাটা: শ্বাস-প্রশ্বাস, হৃদস্পন্দন নিয়ন্ত্রণ`,
      keyPoints: `→ নিউরন হলো স্নায়ুতন্ত্রের একক
  → রিফ্লেক্স আর্ক: স্বয়ংক্রিয় স্নায়বিক প্রতিক্রিয়া
  → স্বায়ত্তশাসিত স্নায়ুতন্ত্র: সিম্প্যাথেটিক ও প্যারাসিম্প্যাথেটিক`,
      examTips: `→ নিউরনের চিত্র আঁকো ও অংশগুলো লেবেল করো
  → রিফ্লেক্স আর্কের চিত্র আঁকো
  → CNS ও PNS-এর পার্থক্য লেখো`,
    };
  }
  if (topic === "endocrine") {
    return {
      definition:
        "অন্তঃক্ষরা তন্ত্র (Endocrine System) হলো সেই তন্ত্র যা হরমোন নামক রাসায়নিক পদার্থ সরাসরি রক্তে ক্ষরণ করে দেহের কার্যক্রম নিয়ন্ত্রণ করে।",
      explanation: `প্রধান অন্তঃক্ষরা গ্রন্থি ও হরমোন:
  পিটুইটারি গ্রন্থি  → বৃদ্ধি হরমোন (GH), TSH, FSH
  থাইরয়েড গ্রন্থি   → থাইরক্সিন (বিপাক নিয়ন্ত্রণ)
  অগ্ন্যাশয়          → ইনসুলিন (রক্তে শর্করা কমায়)
                       গ্লুকাগন (রক্তে শর্করা বাড়ায়)
  অ্যাড্রিনাল গ্রন্থি → অ্যাড্রিনালিন (জরুরি প্রতিক্রিয়া)
  গোনাড              → ইস্ট্রোজেন, টেস্টোস্টেরন`,
      keyPoints: `→ হরমোন রক্তের মাধ্যমে লক্ষ্য অঙ্গে পৌঁছায়
  → নেতিবাচক প্রতিক্রিয়া (negative feedback) হরমোন নিয়ন্ত্রণ করে
  → ইনসুলিনের অভাবে ডায়াবেটিস হয়`,
      examTips: `→ গ্রন্থি, হরমোন ও কাজের তালিকা মনে রাখো
  → ইনসুলিন ও গ্লুকাগনের বিপরীতমুখী কাজ বোঝো`,
    };
  }
  // Generic biology fallback — tries to give a meaningful answer
  const lowerQ = question.toLowerCase();
  // Attempt to detect topic from the question text itself for a more helpful response
  const detectedFromQ = detectKeywords(question);
  if (detectedFromQ.length > 0) {
    const firstKey = detectedFromQ[0];
    if (
      [
        "meiosis",
        "mitosis",
        "photosynthesis",
        "genetics",
        "ecology",
        "nervous_system",
        "endocrine",
      ].includes(firstKey)
    ) {
      return getBiologyContent(firstKey, chapter, question);
    }
  }
  // Build a helpful generic response based on question keywords
  const topicHint =
    lowerQ.includes("gothon") || lowerQ.includes("গঠন")
      ? "গঠন ও কাজ"
      : lowerQ.includes("bornona") || lowerQ.includes("বর্ণনা")
        ? "বিস্তারিত বর্ণনা"
        : lowerQ.includes("parthokko") || lowerQ.includes("পার্থক্য")
          ? "তুলনামূলক পার্থক্য"
          : lowerQ.includes("kormo") || lowerQ.includes("কাজ")
            ? "কার্যপ্রণালী"
            : "সংজ্ঞা ও ব্যাখ্যা";
  return {
    definition: `${chapter} অধ্যায়ের এই প্রশ্নটি WBCHSE জীববিজ্ঞান পাঠ্যক্রমের একটি গুরুত্বপূর্ণ বিষয়। প্রশ্নটি "${topicHint}" সংক্রান্ত।`,
    explanation: `প্রশ্নের উত্তর দিতে নিম্নলিখিত বিষয়গুলো মনে রাখো:

  ১. ${chapter} অধ্যায়ের মূল ধারণাগুলো পর্যালোচনা করো
  ২. সংশ্লিষ্ট জৈবিক প্রক্রিয়ার ধাপগুলো ক্রমানুসারে লেখো
  ৩. গঠন বর্ণনায় চিত্র আঁকা আবশ্যক
  ৪. বৈজ্ঞানিক পরিভাষা (scientific terminology) ব্যবহার করো
  ৫. WBCHSE পাঠ্যপুস্তকের সংজ্ঞা ও ব্যাখ্যা অনুসরণ করো

  💡 টিপস: প্রশ্নের বিষয়টি আরও নির্দিষ্টভাবে লিখলে (যেমন: "মিয়োসিসের গঠন", "সালোকসংশ্লেষণের পর্যায়") সম্পূর্ণ বিস্তারিত উত্তর পাবে।`,
    keyPoints: `→ জীববিজ্ঞানের প্রতিটি বিষয় পরস্পর সংযুক্ত
  → গঠন ও কাজ একসাথে বোঝো
  → চিত্র আঁকলে পরীক্ষায় বেশি নম্বর পাবে
  → WBCHSE পাঠ্যপুস্তকের ভাষায় উত্তর লেখো`,
    examTips: `→ প্রশ্নের মূল বিষয় চিহ্নিত করে উত্তর শুরু করো
  → সংজ্ঞা দিয়ে শুরু, তারপর বিস্তারিত ব্যাখ্যা
  → চিত্র ও তালিকা ব্যবহার করো
  → পয়েন্ট আকারে লিখলে নম্বর বেশি পাবে`,
  };
}

function solveTheory(
  subject: string,
  chapter: string,
  question: string,
): string {
  const subjectEmoji: Record<string, string> = {
    physics: "⚛️",
    chemistry: "🧪",
    biology: "🔬",
    mathematics: "📐",
  };
  const emoji = subjectEmoji[subject] ?? "📚";

  const subjectNameBn: Record<string, string> = {
    physics: "পদার্থবিজ্ঞান",
    chemistry: "রসায়নবিজ্ঞান",
    biology: "জীববিজ্ঞান",
    mathematics: "গণিত",
  };
  const subjectName = subjectNameBn[subject] ?? subject;

  const keywords = detectKeywords(question);

  let definition = "";
  let explanation = "";
  let keyPoints = "";
  let examTips = "";

  // Physics theory — সম্পূর্ণ বাংলায়
  if (subject === "physics") {
    if (keywords.includes("kinematics") || keywords.includes("acceleration")) {
      definition = "গতি হলো সময়ের সাথে কোনো বস্তুর অবস্থানের পরিবর্তন।";
      explanation = `গতির প্রকারভেদ:
  ১. সুষম গতি: সমান সময়ে সমান দূরত্ব অতিক্রম
  ২. অসম গতি: সমান সময়ে অসমান দূরত্ব অতিক্রম
  ৩. সরলরেখায় গতি: সরলরেখা বরাবর গতি

গতির সমীকরণ (সুষম ত্বরণের জন্য):
  v = u + at
  s = ut + ½at²
  v² = u² + 2as
  যেখানে: u = প্রাথমিক বেগ, v = অন্তিম বেগ
           a = ত্বরণ, t = সময়, s = সরণ`;
      keyPoints = `→ দূরত্ব হলো স্কেলার রাশি; সরণ হলো ভেক্টর রাশি
  → দ্রুতি হলো স্কেলার; বেগ হলো ভেক্টর
  → ত্বরণ ধনাত্মক (বেগ বৃদ্ধি) বা ঋণাত্মক (বেগ হ্রাস) হতে পারে`;
      examTips = `→ সংজ্ঞা সঠিকভাবে লেখো
  → সমীকরণ প্রয়োগে প্রতিটি রাশির একক লিখবে
  → চিত্র আঁকলে বেশি নম্বর পাবে`;
    } else if (keywords.includes("force")) {
      definition =
        "বল হলো এমন একটি বাহ্যিক কারণ যা কোনো বস্তুর গতি বা আকৃতি পরিবর্তন করতে পারে। F = ma।";
      explanation = `নিউটনের গতিসূত্র:
  ১ম সূত্র (জড়তার সূত্র): বাহ্যিক বল না থাকলে স্থির বস্তু স্থির এবং গতিশীল বস্তু সমবেগে গতিশীল থাকে।
  ২য় সূত্র: F = ma (বল = ভর × ত্বরণ)
  ৩য় সূত্র: প্রতিটি ক্রিয়ার সমান ও বিপরীত প্রতিক্রিয়া আছে।`;
      keyPoints = `→ বলের একক: নিউটন (N) = kg·m/s²
  → স্বাভাবিক বল তলের সাথে লম্বভাবে কাজ করে
  → ঘর্ষণ বল গতির বিরুদ্ধে কাজ করে`;
      examTips = `→ তিনটি সূত্রই মুখস্থ রাখো এবং উদাহরণ দাও
  → ফ্রি-বডি ডায়াগ্রাম আঁকো`;
    } else if (keywords.includes("electricity")) {
      definition = "বৈদ্যুতিক প্রবাহ হলো প্রতি একক সময়ে আহিত কণার প্রবাহ। I = Q/t।";
      explanation = `তড়িৎ প্রবাহের মূল ধারণা:
  • ওহমের সূত্র: V = IR
  • শ্রেণি সংযোগে রোধ: R = R₁ + R₂ + R₃
  • সমান্তরাল সংযোগে রোধ: 1/R = 1/R₁ + 1/R₂ + 1/R₃
  • বৈদ্যুতিক ক্ষমতা: P = VI = I²R = V²/R
  • কির্চফের সূত্র: KCL (প্রবাহ) এবং KVL (বিভব)`;
      keyPoints = `→ সুপরিবাহকের রোধ কম
  → রোধাঙ্ক তাপমাত্রার উপর নির্ভর করে
  → তড়িচ্চালক বল (EMF) হলো উৎস কর্তৃক প্রতি একক আধানে কৃতকার্য`;
      examTips = `→ V = IR সবচেয়ে গুরুত্বপূর্ণ সূত্র
  → শ্রেণি ও সমান্তরাল সংযোগের পার্থক্য বোঝো`;
    } else {
      definition = `${chapter}-এর মূল ধারণাগুলো পদার্থবিজ্ঞানের মৌলিক নীতির সাথে সম্পর্কিত।`;
      explanation = `${chapter} অধ্যায়ের মূল বিষয়:
  • মৌলিক সংজ্ঞাগুলো ভালোভাবে বোঝো
  • সংশ্লিষ্ট সূত্র ও তাদের প্রতিপাদন শেখো
  • বাস্তব জীবনের উদাহরণের সাথে সংযোগ করো
  • এই ধারণার উপর ভিত্তি করে সংখ্যাতাত্ত্বিক সমস্যা অনুশীলন করো`;
      keyPoints = `→ ভৌত রাশি SI একক সহ সংজ্ঞায়িত করো
  → মাত্রিক বিশ্লেষণ বোঝো
  → তত্ত্বকে ব্যবহারিক প্রয়োগের সাথে সংযুক্ত করো`;
      examTips = `→ সংজ্ঞা সঠিকভাবে লেখো
  → উদাহরণ দিয়ে ব্যাখ্যা করো
  → চিত্র আঁকলে বেশি নম্বর পাবে`;
    }
  }
  // Chemistry theory — সম্পূর্ণ বাংলায়
  else if (subject === "chemistry") {
    if (keywords.includes("acid-base")) {
      definition =
        "অ্যাসিড হলো প্রোটন দাতা (ব্রনস্টেড-লাউরি) বা ইলেকট্রন জোড় গ্রহণকারী (লুইস)। ক্ষারক হলো প্রোটন গ্রহণকারী।";
      explanation = `pH স্কেল:
  pH = -log₁₀[H⁺]
  • pH < 7 → অম্লীয় (Acidic)
  • pH = 7 → নিরপেক্ষ (Neutral)
  • pH > 7 → ক্ষারীয় (Basic/Alkaline)

শক্তিশালী অ্যাসিড: HCl, H₂SO₄, HNO₃
শক্তিশালী ক্ষার: NaOH, KOH, Ca(OH)₂`;
      keyPoints = `→ pH + pOH = 14 (২৫°C তাপমাত্রায়)
  → বাফার দ্রবণ pH-এর পরিবর্তন রোধ করে
  → টাইট্রেশনে অজানা ঘনমাত্রা নির্ণয় করা হয়`;
      examTips = `→ pH স্কেল মুখস্থ রাখো: ০-১৪
  → অ্যাসিড ও ক্ষারের সংজ্ঞা তিনটি তত্ত্ব অনুযায়ী লেখো`;
    } else if (keywords.includes("stoichiometry")) {
      definition =
        "স্টয়কিওমেট্রি হলো রাসায়নিক বিক্রিয়ায় বিকারক ও উৎপাদের মধ্যে পরিমাণগত সম্পর্কের অধ্যয়ন।";
      explanation = `মোল ধারণা:
  ১ মোল = ৬.০২২ × ১০²³ কণা (অ্যাভোগাড্রো সংখ্যা)
  মোলার ভর = ১ মোলের গ্রামে ভর
  n = m/M (মোল = ভর / মোলার ভর)

সাম্যঞ্জিত সমীকরণ: aA + bB → cC + dD
মোলের অনুপাত = a:b:c:d`;
      keyPoints = `→ প্রথমে সমীকরণ সাম্যঞ্জিত (balance) করো
  → মোলের অনুপাত ব্যবহার করো
  → সীমাকারী বিকারক (limiting reagent) উৎপাদের পরিমাণ নির্ধারণ করে`;
      examTips = `→ অ্যাভোগাড্রো সংখ্যা মনে রাখো: ৬.০২২×১০²³
  → মোল গণনার ধাপগুলো পরিষ্কারভাবে লেখো`;
    } else {
      definition = `${chapter} অধ্যায়টি মৌলিক রাসায়নিক নীতি ও বিক্রিয়া নিয়ে আলোচনা করে।`;
      explanation = `${chapter}-এর মূল বিষয়:
  • মূল সংজ্ঞা ও পরিভাষা
  • গুরুত্বপূর্ণ বিক্রিয়া ও তাদের কার্যপদ্ধতি
  • প্রাসঙ্গিক সূত্র ও নীতি
  • শিল্প ও ব্যবহারিক প্রয়োগ`;
      keyPoints = `→ IUPAC নামকরণ পদ্ধতি শেখো
  → বিক্রিয়ার কার্যপদ্ধতি (mechanism) বোঝো
  → সমীকরণ সাম্যঞ্জিত করার অনুশীলন করো`;
      examTips = `→ বিক্রিয়া সমীকরণ মনে রাখো
  → উদাহরণ সহ ব্যাখ্যা করো
  → একক ও অনুপাত সঠিকভাবে লেখো`;
    }
  }
  // Biology theory — সম্পূর্ণ বাংলায়
  else if (subject === "biology") {
    const chapterLower = chapter.toLowerCase();
    const questionLower = question.toLowerCase();

    let bioTopic = "";
    // 1. Keyword-based detection (primary)
    if (keywords.includes("meiosis")) {
      bioTopic = "meiosis";
    } else if (keywords.includes("mitosis")) {
      bioTopic = "mitosis";
    } else if (keywords.includes("photosynthesis")) {
      bioTopic = "photosynthesis";
    } else if (keywords.includes("genetics")) {
      bioTopic = "genetics";
    } else if (keywords.includes("ecology")) {
      bioTopic = "ecology";
    } else if (keywords.includes("nervous_system")) {
      bioTopic = "nervous_system";
    } else if (keywords.includes("endocrine")) {
      bioTopic = "endocrine";
    } else if (keywords.includes("human_biology")) {
      bioTopic = "human_biology";
    } else if (keywords.includes("biology_cell")) {
      bioTopic = "biology_cell";
    }
    // 2. Chapter-name based detection (secondary signal)
    else if (
      /mitosis|cell.divis|kosh.bivaj/i.test(chapterLower) ||
      /mitosis|maytosis|mytosis|kosh.bivaj/i.test(questionLower)
    ) {
      bioTopic = "mitosis";
    } else if (
      /meiosis|miyosis|reproductive/i.test(chapterLower) ||
      /miyosis|meyosis|miosis|mayosis/i.test(questionLower)
    ) {
      bioTopic = "meiosis";
    } else if (
      /photosynth|salok|light.react/i.test(chapterLower) ||
      /shalok|salok|photosynthes/i.test(questionLower)
    ) {
      bioTopic = "photosynthesis";
    } else if (/genetics|heredit|dna|rna/i.test(chapterLower)) {
      bioTopic = "genetics";
    } else if (/ecology|ecosystem|food.chain|bastutontro/i.test(chapterLower)) {
      bioTopic = "ecology";
    } else if (/nervous|neural/i.test(chapterLower)) {
      bioTopic = "nervous_system";
    } else if (/hormone|endocrine/i.test(chapterLower)) {
      bioTopic = "endocrine";
    }

    const bioContent = getBiologyContent(bioTopic, chapter, question);
    definition = bioContent.definition;
    explanation = bioContent.explanation;
    keyPoints = bioContent.keyPoints;
    examTips = bioContent.examTips;
  }
  // Mathematics theory — সম্পূর্ণ বাংলায়
  else {
    if (keywords.includes("calculus")) {
      definition =
        "ক্যালকুলাস হলো গণিতের সেই শাখা যা ক্রমাগত পরিবর্তন নিয়ে আলোচনা করে — অবকলন (differentiation) ও সমাকলন (integration)।";
      explanation = `অবকলনের নিয়ম:
  d/dx(c) = 0              (ধ্রুবক)
  d/dx(xⁿ) = nxⁿ⁻¹        (ঘাত নিয়ম)
  d/dx(eˣ) = eˣ
  d/dx(ln x) = 1/x
  d/dx(sin x) = cos x
  d/dx(cos x) = -sin x

সমাকলনের নিয়ম:
  ∫xⁿ dx = xⁿ⁺¹/(n+1) + C
  ∫eˣ dx = eˣ + C
  ∫(1/x) dx = ln|x| + C`;
      keyPoints = `→ অবকলক = পরিবর্তনের হার = স্পর্শকের ঢাল
  → সমাকল = বক্ররেখার নিচের ক্ষেত্রফল
  → মৌলিক উপপাদ্য: ∫ᵃᵇ f(x)dx = F(b) - F(a)`;
      examTips = `→ অবকলন ও সমাকলনের নিয়মগুলো মুখস্থ রাখো
  → শৃঙ্খল নিয়ম (chain rule) ও গুণন নিয়ম (product rule) অনুশীলন করো`;
    } else if (keywords.includes("matrix")) {
      definition = "ম্যাট্রিক্স হলো সংখ্যার আয়তাকার বিন্যাস যা সারি ও স্তম্ভে সজ্জিত।";
      explanation = `ম্যাট্রিক্সের ক্রিয়াসমূহ:
  যোগ: (A+B)ᵢⱼ = Aᵢⱼ + Bᵢⱼ (একই ক্রমের ম্যাট্রিক্সের জন্য)
  গুণ: (AB)ᵢⱼ = Σ AᵢₖBₖⱼ
  পরিবর্ত (Transpose): (Aᵀ)ᵢⱼ = Aⱼᵢ
  ২×২ নির্ধারক: |a b; c d| = ad - bc
  বিপরীত ম্যাট্রিক্স: A⁻¹ = (1/det A) × adj A`;
      keyPoints = `→ ম্যাট্রিক্স গুণ বিনিময়যোগ্য নয়: AB ≠ BA (সাধারণত)
  → det(A) ≠ 0 হলেই ম্যাট্রিক্সের বিপরীত বিদ্যমান
  → একক ম্যাট্রিক্স I, গুণের ক্ষেত্রে ১-এর মতো কাজ করে`;
      examTips = `→ নির্ধারক (determinant) গণনার ধাপ দেখাও
  → ম্যাট্রিক্সের ক্রম (order) সঠিকভাবে লেখো`;
    } else {
      definition = `${chapter} হলো WBCHSE পাঠ্যক্রমের গণিতের একটি মৌলিক শাখা।`;
      explanation = `${chapter}-এর মূল বিষয়:
  • মূল সংজ্ঞা ও স্বতঃসিদ্ধ
  • গুরুত্বপূর্ণ উপপাদ্য ও তাদের প্রমাণ
  • সমস্যা সমাধানের জন্য আদর্শ সূত্র
  • উচ্চতর গণিতে প্রয়োগ`;
      keyPoints = `→ সংজ্ঞাগুলো সুনির্দিষ্টভাবে বোঝো
  → আদর্শ সূত্রগুলো শেখো
  → বিভিন্ন ধরনের সমস্যা অনুশীলন করো`;
      examTips = `→ সূত্র মুখস্থ না করে বুঝে প্রয়োগ করো
  → প্রতিটি ধাপ পরিষ্কারভাবে লেখো
  → একক (unit) লিখতে ভুলো না`;
    }
  }

  return `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${emoji} ${subjectName} — তত্ত্বীয় উত্তর
অধ্যায়: ${chapter}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❓ প্রশ্ন:
${question}

📖 সংজ্ঞা / ধারণা:
  ${definition}

📝 বিস্তারিত ব্যাখ্যা:
${explanation}

🔑 মূল বিষয়:
  ${keyPoints}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 WBCHSE পরীক্ষার টিপস:
  ${examTips}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}

export function generateScienceSolution(input: ScienceSolveInput): string {
  const { subject, chapter, question, type } = input;

  if (type === "theory") {
    return solveTheory(subject, chapter, question);
  }

  // Numerical
  switch (subject) {
    case "physics":
      return solvePhysicsNumerical(chapter, question);
    case "chemistry":
      return solveChemistryNumerical(chapter, question);
    case "mathematics":
      return solveMathematicsNumerical(chapter, question);
    case "biology": {
      const bioNumerical = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔬 BIOLOGY — PRACTICAL / NUMERICAL
Chapter: ${chapter}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 Problem:
${question}

🔢 Solution:
  Step 1: Identify the biological process or ratio involved.
  Step 2: Use the relevant formula or ratio.

  Common Biology Calculations:
  • Mitotic Index = (Cells in division / Total cells) × 100
  • Phenotypic Ratio (Monohybrid): 3:1 (dominant:recessive)
  • Phenotypic Ratio (Dihybrid): 9:3:3:1
  • Magnification = Size of image / Actual size of object
  • Net Primary Productivity = GPP - Respiration

  Step 3: Substitute given values.
  Step 4: Calculate and state the answer.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 মনে রাখো:
  → জীববিজ্ঞানে অনুপাত (ratio) মনে রাখো
  → বংশগতির ক্রস সঠিকভাবে দেখাও (Punnett square)
  → পরিমাপ ও একক সঠিকভাবে লেখো
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
      return bioNumerical;
    }
    default:
      return solveTheory(subject, chapter, question);
  }
}
