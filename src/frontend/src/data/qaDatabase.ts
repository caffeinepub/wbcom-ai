export type QuestionType =
  | "chapter_wise"
  | "short_answer"
  | "long_answer"
  | "mcq"
  | "important_exam";
export type SubjectArea =
  | "arts"
  | "science"
  | "commerce"
  | "law"
  | "neet"
  | "ca";
export type ClassLevel =
  | "11"
  | "12"
  | "neet"
  | "ca_foundation"
  | "ca_inter"
  | "ca_final";
export type Difficulty = "easy" | "medium" | "hard";

export interface QAEntry {
  id: string;
  subjectArea: SubjectArea;
  subject: string; // e.g. 'Physics', 'History', 'IPC'
  chapter: string;
  classLevel: ClassLevel;
  questionType: QuestionType;
  questionEn: string;
  questionBn: string;
  answerEn: string;
  answerBn: string;
  explanationEn?: string;
  explanationBn?: string;
  options?: { a: string; b: string; c: string; d: string };
  optionsBn?: { a: string; b: string; c: string; d: string };
  correctOption?: "a" | "b" | "c" | "d";
  difficulty: Difficulty;
  isImportant: boolean;
  tags?: string[];
}

export const QA_DATABASE: QAEntry[] = [
  // ========== ARTS - HISTORY ==========
  {
    id: "hist_001",
    subjectArea: "arts",
    subject: "History",
    chapter: "Rise of Nationalism in Europe",
    classLevel: "11",
    questionType: "short_answer",
    questionEn:
      "What was the significance of the French Revolution for nationalism?",
    questionBn: "জাতীয়তাবাদের জন্য ফরাসি বিপ্লবের গুরুত্ব কী ছিল?",
    answerEn:
      "The French Revolution (1789) was the first clear expression of nationalism. It created the idea that sovereignty resided in the people, not the king. It introduced concepts of liberty, equality and fraternity. It also spread the idea of a unified nation-state governed by a constitution.",
    answerBn:
      "ফরাসি বিপ্লব (১৭৮৯) জাতীয়তাবাদের প্রথম স্পষ্ট প্রকাশ ছিল। এটি এই ধারণা তৈরি করেছিল যে সার্বভৌমত্ব রাজার নয়, জনগণের কাছে থাকে। এটি স্বাধীনতা, সমতা ও ভ্রাতৃত্বের ধারণা চালু করেছিল।",
    difficulty: "medium",
    isImportant: true,
  },
  {
    id: "hist_002",
    subjectArea: "arts",
    subject: "History",
    chapter: "Rise of Nationalism in Europe",
    classLevel: "11",
    questionType: "mcq",
    questionEn:
      "In which year was the Zollverein customs union established in Germany?",
    questionBn: "জার্মানিতে জোলভেরেইন শুল্ক ইউনিয়ন কোন বছর প্রতিষ্ঠিত হয়েছিল?",
    answerEn: "1834",
    answerBn: "১৮৩৪",
    options: { a: "1815", b: "1834", c: "1848", d: "1871" },
    optionsBn: { a: "১৮১৫", b: "১৮৩৪", c: "১৮৪৮", d: "১৮৭১" },
    correctOption: "b",
    explanationEn:
      "The Zollverein was established in 1834, abolishing tariff barriers between German states and creating economic unity that later facilitated political unification.",
    explanationBn:
      "জোলভেরেইন ১৮৩৪ সালে প্রতিষ্ঠিত হয়েছিল, জার্মান রাজ্যগুলির মধ্যে শুল্ক বাধা বিলুপ্ত করে এবং পরবর্তী রাজনৈতিক একীকরণের সুবিধা করে।",
    difficulty: "easy",
    isImportant: true,
  },
  {
    id: "hist_003",
    subjectArea: "arts",
    subject: "History",
    chapter: "Nationalism in India",
    classLevel: "12",
    questionType: "long_answer",
    questionEn:
      "Explain the causes and effects of the Non-Cooperation Movement (1920-22).",
    questionBn: "অসহযোগ আন্দোলনের (১৯২০-২২) কারণ ও ফলাফল ব্যাখ্যা করো।",
    answerEn: `**Causes:**
1. Rowlatt Act (1919) – gave arbitrary powers to the British government
2. Jallianwala Bagh Massacre (1919) – shocked the entire nation
3. Khilafat Movement – Muslims joined Hindus against British
4. Disappointment with Montford Reforms

**Main Features:**
- Surrender of titles and honorary offices
- Boycott of civil services, army, police, courts and legislative councils
- Boycott of foreign goods and use of Swadeshi goods
- Students leaving government-controlled schools and colleges

**Effects:**
1. First mass movement that involved all sections of society
2. Deepened the Hindu-Muslim unity
3. Movement suspended after Chauri Chaura incident (1922)
4. Gandhiji arrested in 1922
5. It awakened political consciousness among ordinary people`,
    answerBn: `**কারণসমূহ:**
১. রাউলট আইন (১৯১৯) – ব্রিটিশ সরকারকে স্বেচ্ছাচারী ক্ষমতা দিয়েছিল
২. জালিয়ানওয়ালাবাগ হত্যাকাণ্ড (১৯১৯) – সমগ্র জাতিকে শোকে বিহ্বল করে
৩. খিলাফত আন্দোলন – মুসলমানরা হিন্দুদের সাথে ব্রিটিশ বিরোধী অবস্থান নেয়
৪. মন্টফোর্ড সংস্কারে হতাশা

**প্রধান বৈশিষ্ট্য:**
- উপাধি ও সম্মানজনক পদ ত্যাগ
- সরকারি চাকরি, সেনাবাহিনী, পুলিশ, আদালত ও আইনসভা বয়কট
- বিদেশি পণ্য বয়কট এবং স্বদেশি পণ্যের ব্যবহার

**ফলাফল:**
১. প্রথম গণআন্দোলন যেখানে সমাজের সব শ্রেণী অংশ নেয়
২. হিন্দু-মুসলিম ঐক্য গভীরতর হয়
৩. চৌরিচৌরা ঘটনার (১৯২২) পর আন্দোলন স্থগিত`,
    difficulty: "hard",
    isImportant: true,
  },
  {
    id: "hist_004",
    subjectArea: "arts",
    subject: "History",
    chapter: "The Making of a Global World",
    classLevel: "12",
    questionType: "important_exam",
    questionEn:
      "What was the Bretton Woods Agreement? What were its main features?",
    questionBn: "ব্রেটন উডস চুক্তি কী ছিল? এর প্রধান বৈশিষ্ট্যগুলি কী?",
    answerEn: `The Bretton Woods Agreement was signed in 1944 by 44 Allied nations at Bretton Woods, New Hampshire, USA.

**Main Features:**
1. Established IMF (International Monetary Fund) to stabilize currencies
2. Set up World Bank (IBRD) for post-war reconstruction
3. Fixed exchange rate system – currencies pegged to US dollar
4. US dollar convertible to gold at $35 per ounce
5. Ensured post-war economic stability`,
    answerBn: `ব্রেটন উডস চুক্তি ১৯৪৪ সালে যুক্তরাষ্ট্রের নিউ হ্যাম্পশায়ারের ব্রেটন উডসে ৪৪টি মিত্রপক্ষের দেশ স্বাক্ষর করে।

**প্রধান বৈশিষ্ট্য:**
১. মুদ্রা স্থিতিশীল করতে আইএমএফ (আন্তর্জাতিক মুদ্রা তহবিল) প্রতিষ্ঠা
২. যুদ্ধোত্তর পুনর্গঠনের জন্য বিশ্বব্যাংক (IBRD) গঠন
৩. স্থির বিনিময় হার পদ্ধতি – মুদ্রাগুলি মার্কিন ডলারের সাথে আবদ্ধ
৪. মার্কিন ডলার প্রতি আউন্স ৩৫ ডলারে সোনায় রূপান্তরযোগ্য`,
    difficulty: "medium",
    isImportant: true,
  },
  // ========== ARTS - POLITICAL SCIENCE ==========
  {
    id: "polsci_001",
    subjectArea: "arts",
    subject: "Political Science",
    chapter: "Constitution Why and How",
    classLevel: "11",
    questionType: "short_answer",
    questionEn: "What is a Constitution? Why is it needed?",
    questionBn: "সংবিধান কী? এটি কেন প্রয়োজন?",
    answerEn:
      "A Constitution is a fundamental document that defines the structure, powers and limitations of the government and guarantees the rights of citizens. It is needed to: (1) establish a framework for governance, (2) protect rights and freedoms, (3) define the relationship between state and citizens, (4) prevent arbitrary use of power.",
    answerBn:
      "সংবিধান একটি মৌলিক দলিল যা সরকারের কাঠামো, ক্ষমতা এবং সীমা নির্ধারণ করে এবং নাগরিকদের অধিকার নিশ্চিত করে। এটি প্রয়োজন কারণ: (১) শাসনের কাঠামো প্রতিষ্ঠা করতে, (২) অধিকার ও স্বাধীনতা রক্ষা করতে, (৩) রাষ্ট্র ও নাগরিকের সম্পর্ক নির্ধারণ করতে।",
    difficulty: "easy",
    isImportant: true,
  },
  {
    id: "polsci_002",
    subjectArea: "arts",
    subject: "Political Science",
    chapter: "Election and Representation",
    classLevel: "11",
    questionType: "mcq",
    questionEn: "Which system of election does India follow for Lok Sabha?",
    questionBn: "ভারত লোকসভার জন্য কোন নির্বাচন পদ্ধতি অনুসরণ করে?",
    answerEn: "First Past the Post (FPTP)",
    answerBn: "ফার্স্ট পাস্ট দ্য পোস্ট (FPTP)",
    options: {
      a: "Proportional Representation",
      b: "First Past the Post",
      c: "Two-Round System",
      d: "Ranked Choice Voting",
    },
    optionsBn: {
      a: "আনুপাতিক প্রতিনিধিত্ব",
      b: "ফার্স্ট পাস্ট দ্য পোস্ট",
      c: "দুই রাউন্ড পদ্ধতি",
      d: "র‍্যাংকড চয়েস ভোটিং",
    },
    correctOption: "b",
    explanationEn:
      "India follows FPTP (also called plurality system) for Lok Sabha elections, where the candidate with the most votes wins, even without a majority.",
    explanationBn:
      "ভারত লোকসভা নির্বাচনের জন্য FPTP পদ্ধতি অনুসরণ করে, যেখানে সবচেয়ে বেশি ভোট পাওয়া প্রার্থী জেতে।",
    difficulty: "easy",
    isImportant: true,
  },
  // ========== ARTS - GEOGRAPHY ==========
  {
    id: "geo_001",
    subjectArea: "arts",
    subject: "Geography",
    chapter: "Resources and Development",
    classLevel: "12",
    questionType: "short_answer",
    questionEn: "What is sustainable development? Give its importance.",
    questionBn: "টেকসই উন্নয়ন কী? এর গুরুত্ব দাও।",
    answerEn:
      "Sustainable development is development that meets the needs of the present generation without compromising the ability of future generations to meet their own needs (Brundtland Commission, 1987). Importance: (1) Conserves natural resources, (2) Reduces environmental degradation, (3) Ensures intergenerational equity, (4) Balances economic growth with ecological balance.",
    answerBn:
      "টেকসই উন্নয়ন হল এমন উন্নয়ন যা ভবিষ্যৎ প্রজন্মের নিজেদের চাহিদা পূরণের ক্ষমতার সাথে আপোষ না করে বর্তমান প্রজন্মের চাহিদা পূরণ করে (ব্রান্টল্যান্ড কমিশন, ১৯৮৭)। গুরুত্ব: (১) প্রাকৃতিক সম্পদ সংরক্ষণ করে, (২) পরিবেশ অবক্ষয় হ্রাস করে।",
    difficulty: "medium",
    isImportant: true,
  },
  {
    id: "geo_002",
    subjectArea: "arts",
    subject: "Geography",
    chapter: "Atmosphere",
    classLevel: "11",
    questionType: "mcq",
    questionEn:
      "What is the correct sequence of atmospheric layers from Earth's surface?",
    questionBn: "পৃথিবীর পৃষ্ঠ থেকে বায়ুমণ্ডলীয় স্তরগুলির সঠিক ক্রম কী?",
    answerEn: "Troposphere → Stratosphere → Mesosphere → Thermosphere",
    answerBn: "ট্রপোস্ফিয়ার → স্ট্র্যাটোস্ফিয়ার → মেসোস্ফিয়ার → থার্মোস্ফিয়ার",
    options: {
      a: "Troposphere → Mesosphere → Stratosphere → Thermosphere",
      b: "Stratosphere → Troposphere → Mesosphere → Thermosphere",
      c: "Troposphere → Stratosphere → Mesosphere → Thermosphere",
      d: "Mesosphere → Troposphere → Stratosphere → Thermosphere",
    },
    correctOption: "c",
    explanationEn:
      "The correct order from Earth's surface is Troposphere (0-12 km), Stratosphere (12-50 km), Mesosphere (50-80 km), Thermosphere (80-500 km).",
    explanationBn:
      "পৃথিবীর পৃষ্ঠ থেকে সঠিক ক্রম: ট্রপোস্ফিয়ার (০-১২ কিমি), স্ট্র্যাটোস্ফিয়ার (১২-৫০ কিমি), মেসোস্ফিয়ার (৫০-৮০ কিমি), থার্মোস্ফিয়ার।",
    difficulty: "easy",
    isImportant: false,
  },
  // ========== ARTS - PHILOSOPHY ==========
  {
    id: "phil_001",
    subjectArea: "arts",
    subject: "Philosophy",
    chapter: "Theory of Knowledge",
    classLevel: "11",
    questionType: "short_answer",
    questionEn: "What is the difference between rationalism and empiricism?",
    questionBn: "বুদ্ধিবাদ ও অভিজ্ঞতাবাদের মধ্যে পার্থক্য কী?",
    answerEn:
      "Rationalism holds that knowledge is primarily derived from reason and innate ideas (Descartes, Leibniz). Empiricism holds that all knowledge comes from sensory experience (Locke, Hume). Rationalists believe in a priori knowledge; empiricists believe all knowledge is a posteriori (derived from experience).",
    answerBn:
      "বুদ্ধিবাদ মনে করে যে জ্ঞান প্রধানত কারণ ও সহজাত ধারণা থেকে আসে (দেকার্তে, লেইবনিজ)। অভিজ্ঞতাবাদ মনে করে সমস্ত জ্ঞান ইন্দ্রিয় অভিজ্ঞতা থেকে আসে (লক, হিউম)।",
    difficulty: "medium",
    isImportant: true,
  },
  // ========== ARTS - BENGALI ==========
  {
    id: "bengali_001",
    subjectArea: "arts",
    subject: "Bengali",
    chapter: "গদ্য - বাংলা সাহিত্যের ইতিহাস",
    classLevel: "11",
    questionType: "short_answer",
    questionEn:
      "Who is known as the father of Bengali prose? Write about his contributions.",
    questionBn: "বাংলা গদ্যের জনক কে? তাঁর অবদান লেখো।",
    answerEn:
      "Ishwar Chandra Vidyasagar (1820-1891) is known as the father of Bengali prose. He simplified and systematized Bengali prose style, wrote Barna Parichay, reformed Bengali script, and translated several Sanskrit texts into Bengali.",
    answerBn:
      "ঈশ্বরচন্দ্র বিদ্যাসাগর (১৮২০-১৮৯১) বাংলা গদ্যের জনক নামে পরিচিত। তিনি বাংলা গদ্যকে সরল ও সুনির্দিষ্ট করেন, বর্ণপরিচয় রচনা করেন, বাংলা বর্ণমালা সংস্কার করেন এবং সংস্কৃত গ্রন্থের বাংলা অনুবাদ করেন।",
    difficulty: "easy",
    isImportant: true,
  },
  {
    id: "bengali_002",
    subjectArea: "arts",
    subject: "Bengali",
    chapter: "রবীন্দ্রনাথ ঠাকুর",
    classLevel: "12",
    questionType: "important_exam",
    questionEn:
      "Write about the major works and philosophy of Rabindranath Tagore.",
    questionBn: "রবীন্দ্রনাথ ঠাকুরের প্রধান রচনাবলী ও দর্শন সম্পর্কে লেখো।",
    answerEn: `Rabindranath Tagore (1861-1941) was awarded the Nobel Prize in Literature in 1913 for Gitanjali.

**Major Works:**
- Poetry: Gitanjali, Sonar Tari, Manasi, Kalpana
- Novels: Ghare Baire, Gora, Chokher Bali
- Short Stories: Kabuliwala, Postmaster
- Drama: Dak Ghar, Raja
- Essays: Jibansmriti

**Philosophy:**
- Humanism – believed in human potential and dignity
- Universalism – transcended narrow nationalism
- Spiritualism – blended Indian philosophy with universal values
- Educational Philosophy – founded Visva-Bharati at Shantiniketan`,
    answerBn: `রবীন্দ্রনাথ ঠাকুর (১৮৬১-১৯৪১) গীতাঞ্জলির জন্য ১৯১৩ সালে সাহিত্যে নোবেল পুরস্কার পান।

**প্রধান রচনাবলী:**
- কবিতা: গীতাঞ্জলি, সোনার তরী, মানসী, কল্পনা
- উপন্যাস: ঘরে বাইরে, গোরা, চোখের বালি
- ছোটগল্প: কাবুলিওয়ালা, পোস্টমাস্টার
- নাটক: ডাকঘর, রাজা

**দর্শন:**
- মানবতাবাদ – মানুষের সম্ভাবনা ও মর্যাদায় বিশ্বাস
- বিশ্ববাদ – সংকীর্ণ জাতীয়তাবাদের উর্ধ্বে
- শান্তিনিকেতনে বিশ্বভারতী প্রতিষ্ঠা`,
    difficulty: "hard",
    isImportant: true,
  },
  // ========== SCIENCE - PHYSICS ==========
  {
    id: "phy_001",
    subjectArea: "science",
    subject: "Physics",
    chapter: "Laws of Motion",
    classLevel: "11",
    questionType: "chapter_wise",
    questionEn: "State Newton's three laws of motion with examples.",
    questionBn: "নিউটনের তিনটি গতিসূত্র উদাহরণ সহ বর্ণনা করো।",
    answerEn: `**First Law (Law of Inertia):** A body at rest remains at rest, and a body in motion continues in uniform motion in a straight line unless acted upon by an external force.
Example: Passengers jerk forward when a bus suddenly stops.

**Second Law:** The rate of change of momentum of a body is directly proportional to the applied force and takes place in the direction of the force.
Formula: F = ma
Example: A cricket ball accelerates more when a greater force is applied.

**Third Law:** For every action, there is an equal and opposite reaction.
Example: A rocket propels upward as gases are expelled downward.`,
    answerBn: `**প্রথম সূত্র (জড়তার সূত্র):** স্থির বস্তু স্থির থাকে এবং গতিশীল বস্তু একই বেগে সরলরেখায় গতিশীল থাকে যদি না কোনো বাহ্যিক বল প্রযুক্ত হয়।
উদাহরণ: বাস হঠাৎ থামলে যাত্রীরা সামনে হেলে পড়েন।

**দ্বিতীয় সূত্র:** কোনো বস্তুর ভরবেগের পরিবর্তনের হার প্রযুক্ত বলের সমানুপাতিক।
সূত্র: F = ma

**তৃতীয় সূত্র:** প্রতিটি ক্রিয়ার একটি সমান ও বিপরীত প্রতিক্রিয়া আছে।
উদাহরণ: রকেট নিচে গ্যাস ছুড়ে দিয়ে উপরে উঠে।`,
    difficulty: "medium",
    isImportant: true,
  },
  {
    id: "phy_002",
    subjectArea: "science",
    subject: "Physics",
    chapter: "Electricity",
    classLevel: "12",
    questionType: "mcq",
    questionEn: "What is the SI unit of electric resistance?",
    questionBn: "বৈদ্যুতিক রোধের SI একক কী?",
    answerEn: "Ohm (Ω)",
    answerBn: "ওহম (Ω)",
    options: { a: "Ampere", b: "Volt", c: "Ohm", d: "Watt" },
    optionsBn: { a: "অ্যাম্পিয়ার", b: "ভোল্ট", c: "ওহম", d: "ওয়াট" },
    correctOption: "c",
    explanationEn:
      "The SI unit of electrical resistance is Ohm (Ω), named after German physicist Georg Simon Ohm. V = IR (Ohm's Law).",
    explanationBn:
      "বৈদ্যুতিক রোধের SI একক হল ওহম (Ω), জার্মান পদার্থবিদ Georg Simon Ohm-এর নামে। V = IR (ওহমের সূত্র)।",
    difficulty: "easy",
    isImportant: true,
  },
  {
    id: "phy_003",
    subjectArea: "science",
    subject: "Physics",
    chapter: "Gravitation",
    classLevel: "11",
    questionType: "short_answer",
    questionEn: "What is the difference between mass and weight?",
    questionBn: "ভর ও ওজনের মধ্যে পার্থক্য কী?",
    answerEn:
      "Mass is the amount of matter in a body (measured in kg), remains constant everywhere, and is a scalar quantity. Weight is the gravitational force acting on a body (W = mg, measured in Newton), varies with gravity, and is a vector quantity. At the moon, weight is 1/6th of Earth weight but mass remains same.",
    answerBn:
      "ভর হল কোনো বস্তুতে পদার্থের পরিমাণ (kg-এ পরিমাপ), সর্বত্র অপরিবর্তিত থাকে এবং একটি স্কেলার রাশি। ওজন হল বস্তুর উপর মহাকর্ষ বল (W = mg, Newton-এ পরিমাপ), মহাকর্ষের সাথে পরিবর্তিত হয়।",
    difficulty: "easy",
    isImportant: true,
  },
  {
    id: "phy_004",
    subjectArea: "science",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    classLevel: "12",
    questionType: "important_exam",
    questionEn:
      "State and explain Faraday's laws of electromagnetic induction.",
    questionBn: "ফ্যারাডের তাড়িতচৌম্বক আবেশের সূত্র বর্ণনা ও ব্যাখ্যা করো।",
    answerEn: `**Faraday's First Law:** Whenever there is a change in the magnetic flux linked with a circuit, an EMF is induced in the circuit. The induced EMF lasts as long as the change in flux continues.

**Faraday's Second Law:** The magnitude of the induced EMF is directly proportional to the rate of change of magnetic flux.
Formula: e = -dΦ/dt
The negative sign indicates Lenz's Law – the induced EMF opposes the cause producing it.

**Application:** Electric generators, transformers, and induction motors work on this principle.`,
    answerBn: `**ফ্যারাডের প্রথম সূত্র:** যখনই কোনো বর্তনীর সাথে সংযুক্ত চৌম্বক ফ্লাক্সের পরিবর্তন হয়, সেই বর্তনীতে একটি EMF আবিষ্ট হয়।

**ফ্যারাডের দ্বিতীয় সূত্র:** আবিষ্ট EMF-এর মান চৌম্বক ফ্লাক্স পরিবর্তনের হারের সরাসরি সমানুপাতিক।
সূত্র: e = -dΦ/dt
ঋণাত্মক চিহ্ন লেঞ্জের সূত্র নির্দেশ করে।

**প্রয়োগ:** বৈদ্যুতিক জেনারেটর, ট্রান্সফর্মার এই নীতিতে কাজ করে।`,
    difficulty: "hard",
    isImportant: true,
  },
  // ========== SCIENCE - CHEMISTRY ==========
  {
    id: "chem_001",
    subjectArea: "science",
    subject: "Chemistry",
    chapter: "Atomic Structure",
    classLevel: "11",
    questionType: "chapter_wise",
    questionEn: "Explain Bohr's model of the atom. What are its limitations?",
    questionBn: "বোরের পরমাণু মডেল ব্যাখ্যা করো। এর সীমাবদ্ধতাগুলি কী?",
    answerEn: `**Bohr's Model (1913):**
1. Electrons revolve around the nucleus in fixed circular orbits called shells (K, L, M, N)
2. Each shell has a fixed energy level
3. Electrons don't radiate energy while revolving
4. Energy is absorbed/emitted only when electrons jump between orbits
5. Formula: E_n = -13.6/n² eV

**Limitations:**
1. Cannot explain spectra of multi-electron atoms
2. Cannot explain fine structure of hydrogen spectrum
3. Cannot explain Zeeman and Stark effects
4. Violates Heisenberg's Uncertainty Principle`,
    answerBn: `**বোরের মডেল (১৯১৩):**
১. ইলেকট্রন নিউক্লিয়াসের চারদিকে নির্দিষ্ট বৃত্তাকার কক্ষপথে ঘোরে (K, L, M, N)
২. প্রতিটি কক্ষপথে নির্দিষ্ট শক্তিস্তর
৩. ঘোরার সময় ইলেকট্রন শক্তি বিকিরণ করে না
৪. কক্ষপথ পরিবর্তনের সময় শক্তি শোষণ/বিকিরণ হয়

**সীমাবদ্ধতা:**
১. বহু ইলেকট্রন পরমাণুর বর্ণালী ব্যাখ্যা করতে পারে না
২. হাইজেনবার্গের অনিশ্চয়তা নীতি লঙ্ঘন করে`,
    difficulty: "hard",
    isImportant: true,
  },
  {
    id: "chem_002",
    subjectArea: "science",
    subject: "Chemistry",
    chapter: "Periodic Table",
    classLevel: "11",
    questionType: "mcq",
    questionEn: "Which element has the highest electronegativity?",
    questionBn: "কোন মৌলের তড়িৎ ঋণাত্মকতা সর্বাধিক?",
    answerEn: "Fluorine (F)",
    answerBn: "ফ্লোরিন (F)",
    options: { a: "Oxygen", b: "Chlorine", c: "Fluorine", d: "Nitrogen" },
    optionsBn: { a: "অক্সিজেন", b: "ক্লোরিন", c: "ফ্লোরিন", d: "নাইট্রোজেন" },
    correctOption: "c",
    explanationEn:
      "Fluorine has the highest electronegativity (3.98 on Pauling scale) among all elements due to its small atomic radius and high nuclear charge.",
    explanationBn:
      "ফ্লোরিনের তড়িৎ ঋণাত্মকতা সর্বাধিক (পলিং স্কেলে ৩.৯৮) কারণ এর পারমাণবিক ব্যাসার্ধ ছোট ও নিউক্লিয়ার চার্জ বেশি।",
    difficulty: "easy",
    isImportant: true,
  },
  {
    id: "chem_003",
    subjectArea: "science",
    subject: "Chemistry",
    chapter: "Chemical Bonding",
    classLevel: "11",
    questionType: "short_answer",
    questionEn:
      "What is an ionic bond? Give an example of ionic compound formation.",
    questionBn: "আয়নিক বন্ধন কী? আয়নিক যৌগ গঠনের উদাহরণ দাও।",
    answerEn:
      "An ionic bond is formed by the complete transfer of electrons from one atom to another, resulting in oppositely charged ions that attract each other. Example: NaCl (common salt) – Sodium (Na) loses one electron to become Na⁺ and Chlorine (Cl) gains that electron to become Cl⁻. The electrostatic attraction between Na⁺ and Cl⁻ forms the ionic bond.",
    answerBn:
      "আয়নিক বন্ধন গঠিত হয় যখন একটি পরমাণু থেকে অন্য পরমাণুতে ইলেকট্রনের সম্পূর্ণ স্থানান্তর ঘটে, ফলে বিপরীত আধানের আয়ন তৈরি হয়। উদাহরণ: NaCl – সোডিয়াম (Na) একটি ইলেকট্রন হারিয়ে Na⁺ হয় এবং ক্লোরিন (Cl) সেই ইলেকট্রন গ্রহণ করে Cl⁻ হয়।",
    difficulty: "medium",
    isImportant: true,
  },
  // ========== SCIENCE - BIOLOGY ==========
  {
    id: "bio_001",
    subjectArea: "science",
    subject: "Biology",
    chapter: "Cell: The Unit of Life",
    classLevel: "11",
    questionType: "chapter_wise",
    questionEn:
      "What is the difference between prokaryotic and eukaryotic cells?",
    questionBn: "প্রোক্যারিওটিক ও ইউক্যারিওটিক কোষের মধ্যে পার্থক্য কী?",
    answerEn: `**Prokaryotic Cell:**
- No membrane-bound nucleus (nucleoid region)
- No membrane-bound organelles
- Smaller (1-10 μm)
- Circular DNA, no histones
- Examples: Bacteria, Archaea

**Eukaryotic Cell:**
- Has membrane-bound nucleus
- Has membrane-bound organelles (mitochondria, ER, etc.)
- Larger (10-100 μm)
- Linear DNA with histones
- Examples: Plants, Animals, Fungi`,
    answerBn: `**প্রোক্যারিওটিক কোষ:**
- ঝিল্লি-আবৃত নিউক্লিয়াস নেই (নিউক্লিওয়েড অঞ্চল)
- ঝিল্লি-আবৃত অঙ্গাণু নেই
- ছোট আকার (১-১০ μm)
- উদাহরণ: ব্যাকটেরিয়া, আর্কিয়া

**ইউক্যারিওটিক কোষ:**
- ঝিল্লি-আবৃত নিউক্লিয়াস আছে
- ঝিল্লি-আবৃত অঙ্গাণু আছে (মাইটোকন্ড্রিয়া, ER ইত্যাদি)
- বড় আকার (১০-১০০ μm)
- উদাহরণ: উদ্ভিদ, প্রাণী, ছত্রাক`,
    difficulty: "medium",
    isImportant: true,
  },
  {
    id: "bio_002",
    subjectArea: "science",
    subject: "Biology",
    chapter: "Photosynthesis",
    classLevel: "11",
    questionType: "important_exam",
    questionEn:
      "Explain the light reaction of photosynthesis with a neat diagram.",
    questionBn: "সালোকসংশ্লেষণের আলোক বিক্রিয়া ব্যাখ্যা করো।",
    answerEn: `Light reaction (Light-dependent reaction) occurs in the thylakoid membrane of chloroplasts.

**Steps:**
1. **Photolysis of Water:** 2H₂O → 4H⁺ + 4e⁻ + O₂ (oxygen is released)
2. **Photosystem II (P680):** Absorbs light at 680nm, oxidizes water
3. **Electron Transport Chain:** Electrons pass through plastoquinone, cytochrome b6f, plastocyanin
4. **Photosystem I (P700):** Re-energizes electrons using 700nm light
5. **NADPH Formation:** Ferredoxin reduces NADP⁺ → NADPH
6. **ATP Synthesis:** Chemiosmosis – H⁺ gradient drives ATP synthase → ATP

**Net Products:** ATP + NADPH (used in Calvin Cycle)`,
    answerBn: `আলোক বিক্রিয়া ক্লোরোপ্লাস্টের থাইলাকয়েড ঝিল্লিতে ঘটে।

**ধাপসমূহ:**
১. **জলের আলোক বিশ্লেষণ:** 2H₂O → 4H⁺ + 4e⁻ + O₂ (অক্সিজেন মুক্ত হয়)
২. **ফটোসিস্টেম II (P680):** ৬৮০ nm তরঙ্গদৈর্ঘ্যে আলো শোষণ করে
৩. **ইলেকট্রন পরিবহন শৃঙ্খল:** ইলেকট্রন প্লাস্টোকুইনোন, সাইটোক্রোম b6f দিয়ে যায়
৪. **ফটোসিস্টেম I (P700):** ৭০০ nm আলো ব্যবহার করে ইলেকট্রন পুনরায় শক্তিশালী করে
৫. **ATP + NADPH উৎপাদন** (ক্যালভিন চক্রে ব্যবহৃত)`,
    difficulty: "hard",
    isImportant: true,
  },
  {
    id: "bio_003",
    subjectArea: "science",
    subject: "Biology",
    chapter: "Human Reproduction",
    classLevel: "12",
    questionType: "mcq",
    questionEn:
      "Where does fertilization occur in the human female reproductive system?",
    questionBn: "মানব মহিলা প্রজনন তন্ত্রে নিষেক কোথায় ঘটে?",
    answerEn: "Fallopian tube (Ampulla region)",
    answerBn: "ফ্যালোপিয়ান টিউব (অ্যাম্পুলা অংশে)",
    options: { a: "Uterus", b: "Ovary", c: "Fallopian tube", d: "Cervix" },
    optionsBn: { a: "জরায়ু", b: "ডিম্বাশয়", c: "ফ্যালোপিয়ান টিউব", d: "সার্ভিক্স" },
    correctOption: "c",
    explanationEn:
      "Fertilization normally occurs in the ampulla region of the fallopian tube (oviduct). The fertilized egg (zygote) then travels to the uterus for implantation.",
    explanationBn:
      "নিষেক সাধারণত ফ্যালোপিয়ান টিউবের অ্যাম্পুলা অংশে ঘটে। নিষিক্ত ডিম্বাণু (জাইগোট) তারপর রোপণের জন্য জরায়ুতে যায়।",
    difficulty: "easy",
    isImportant: true,
  },
  // ========== SCIENCE - MATHEMATICS ==========
  {
    id: "math_001",
    subjectArea: "science",
    subject: "Mathematics",
    chapter: "Calculus - Differentiation",
    classLevel: "12",
    questionType: "chapter_wise",
    questionEn: "Find the derivative of f(x) = x³ + 3x² - 5x + 7",
    questionBn: "f(x) = x³ + 3x² - 5x + 7 এর অবকল গুণাঙ্ক নির্ণয় করো।",
    answerEn: `Using the power rule: d/dx(xⁿ) = nxⁿ⁻¹

f(x) = x³ + 3x² - 5x + 7
f'(x) = 3x² + 3(2x) - 5(1) + 0
f'(x) = 3x² + 6x - 5

Answer: f'(x) = 3x² + 6x - 5`,
    answerBn: `পাওয়ার রুল ব্যবহার করে: d/dx(xⁿ) = nxⁿ⁻¹

f(x) = x³ + 3x² - 5x + 7
f'(x) = 3x² + 3(2x) - 5(1) + 0
f'(x) = 3x² + 6x - 5

উত্তর: f'(x) = 3x² + 6x - 5`,
    difficulty: "medium",
    isImportant: true,
  },
  {
    id: "math_002",
    subjectArea: "science",
    subject: "Mathematics",
    chapter: "Probability",
    classLevel: "12",
    questionType: "mcq",
    questionEn:
      "A coin is tossed twice. What is the probability of getting exactly one head?",
    questionBn: "একটি মুদ্রা দুবার নিক্ষেপ করা হলে ঠিক একটি হেড পাওয়ার সম্ভাবনা কত?",
    answerEn: "1/2",
    answerBn: "১/২",
    options: { a: "1/4", b: "1/2", c: "3/4", d: "1" },
    correctOption: "b",
    explanationEn:
      "Sample space = {HH, HT, TH, TT}. Favorable outcomes (exactly one H) = {HT, TH} = 2. P = 2/4 = 1/2.",
    explanationBn:
      "নমুনা স্থান = {HH, HT, TH, TT}। অনুকূল ঘটনা (ঠিক একটি H) = {HT, TH} = ২টি। P = 2/4 = 1/2।",
    difficulty: "easy",
    isImportant: true,
  },
  // ========== COMMERCE - ACCOUNTANCY ==========
  {
    id: "acc_001",
    subjectArea: "commerce",
    subject: "Accountancy",
    chapter: "Journal Entry",
    classLevel: "11",
    questionType: "chapter_wise",
    questionEn:
      "What is a journal entry? Record a journal entry for cash sales of ₹50,000.",
    questionBn: "জার্নাল এন্ট্রি কী? ₹৫০,০০০ নগদ বিক্রয়ের জন্য জার্নাল এন্ট্রি করো।",
    answerEn: `A journal entry is the first step in the accounting process where business transactions are recorded in chronological order.

**Journal Entry:**
Date | Particulars | Dr (₹) | Cr (₹)
--|--|--|--
 [Date] | Cash A/c Dr | 50,000 | 
 | To Sales A/c | | 50,000
 | (Being goods sold for cash) | | 

**Rule Applied:** Cash is an asset (Real Account) – Debit what comes in.
Sales is income (Nominal Account) – Credit all incomes.`,
    answerBn: `জার্নাল এন্ট্রি হল অ্যাকাউন্টিং প্রক্রিয়ার প্রথম ধাপ যেখানে ব্যবসায়িক লেনদেন কালানুক্রমিক ক্রমে নথিভুক্ত করা হয়।

**জার্নাল এন্ট্রি:**
তারিখ | বিবরণ | ডেবিট (₹) | ক্রেডিট (₹)
--|--|--|--
 [তারিখ] | Cash A/c Dr | ৫০,০০০ | 
 | বিক্রয় A/c-এর বিপরীতে | | ৫০,০০০
 | (নগদ বিক্রয়ের জন্য) | | 

**প্রযুক্ত নিয়ম:** নগদ হল সম্পদ (Real A/c) – যা আসে তা ডেবিট করো।
বিক্রয় হল আয় (Nominal A/c) – সব আয় ক্রেডিট করো।`,
    difficulty: "easy",
    isImportant: true,
  },
  {
    id: "acc_002",
    subjectArea: "commerce",
    subject: "Accountancy",
    chapter: "Partnership",
    classLevel: "12",
    questionType: "important_exam",
    questionEn:
      "Explain the rules of profit and loss sharing in a partnership firm.",
    questionBn: "অংশীদারি ফার্মে লাভ-ক্ষতি বণ্টনের নিয়মগুলি ব্যাখ্যা করো।",
    answerEn: `In a partnership firm, profit/loss sharing depends on the Partnership Deed:

1. **Equal Sharing** – If no deed or deed silent on ratio, profits shared equally
2. **Fixed Ratio** – As per deed (e.g., 3:2:1)
3. **Capital Ratio** – Based on opening/average capital
4. **Interest on Capital** – Allowed at agreed rate before profit division
5. **Salary/Commission** – Paid to working partners before profit sharing
6. **Interest on Drawings** – Charged to partners, increases firm's profit

**Profit & Loss Appropriation Account** is prepared to show distribution.`,
    answerBn: `অংশীদারি ফার্মে লাভ/ক্ষতি বণ্টন অংশীদারি দলিলের উপর নির্ভর করে:

১. **সমান ভাগ** – যদি দলিল না থাকে বা নীরব থাকে
২. **নির্দিষ্ট অনুপাত** – দলিল অনুযায়ী (যেমন ৩:২:১)
৩. **মূলধন অনুপাত** – প্রারম্ভিক/গড় মূলধনের ভিত্তিতে
৪. **মূলধনের সুদ** – লাভ বণ্টনের আগে অনুমোদিত হারে
৫. **বেতন/কমিশন** – কার্যকরী অংশীদারদের লাভ বণ্টনের আগে প্রদান
৬. **উত্তোলনের সুদ** – অংশীদারদের থেকে আদায়, ফার্মের লাভ বাড়ায়`,
    difficulty: "hard",
    isImportant: true,
  },
  {
    id: "acc_003",
    subjectArea: "commerce",
    subject: "Accountancy",
    chapter: "Depreciation",
    classLevel: "11",
    questionType: "mcq",
    questionEn:
      "Under which method of depreciation does the amount of depreciation decrease every year?",
    questionBn: "অবচয়ের কোন পদ্ধতিতে প্রতি বছর অবচয়ের পরিমাণ কমতে থাকে?",
    answerEn: "Reducing Balance Method (Written Down Value Method)",
    answerBn: "ক্রমহ্রাসমান জের পদ্ধতি (WDV পদ্ধতি)",
    options: {
      a: "Straight Line Method",
      b: "Reducing Balance Method",
      c: "Sum of Years Digit Method",
      d: "Both A and C",
    },
    optionsBn: {
      a: "সরল রেখা পদ্ধতি",
      b: "ক্রমহ্রাসমান জের পদ্ধতি",
      c: "বছরের অঙ্কের সমষ্টি পদ্ধতি",
      d: "A ও C উভয়",
    },
    correctOption: "b",
    explanationEn:
      "In the Reducing Balance Method, depreciation is calculated on the book value (not original cost), which decreases each year, so depreciation amount also decreases.",
    explanationBn:
      "ক্রমহ্রাসমান জের পদ্ধতিতে অবচয় পুস্তক মূল্যের (মূল মূল্য নয়) উপর গণনা করা হয়, যা প্রতি বছর কমে, তাই অবচয়ের পরিমাণও কমে।",
    difficulty: "easy",
    isImportant: true,
  },
  // ========== COMMERCE - BUSINESS STUDIES ==========
  {
    id: "bs_001",
    subjectArea: "commerce",
    subject: "Business Studies",
    chapter: "Nature and Purpose of Business",
    classLevel: "11",
    questionType: "short_answer",
    questionEn: "Distinguish between business, profession, and employment.",
    questionBn: "ব্যবসা, পেশা ও চাকরির মধ্যে পার্থক্য করো।",
    answerEn: `**Business:** Economic activity involving regular production/exchange of goods/services for profit. Risk involved. No qualification needed.

**Profession:** Activity requiring specialized knowledge, training, and certification (Doctor, Lawyer, CA). Income is fee/professional charge. Governed by professional body.

**Employment:** Working under an employer for salary/wages. Regular income, no risk, follows employer's directions.`,
    answerBn: `**ব্যবসা:** মুনাফার জন্য নিয়মিত পণ্য/সেবা উৎপাদন/বিনিময়ের অর্থনৈতিক কার্যকলাপ। ঝুঁকি আছে।

**পেশা:** বিশেষ জ্ঞান, প্রশিক্ষণ ও সনদ প্রয়োজন (ডাক্তার, আইনজীবী, CA)। আয় হল পারিশ্রমিক/পেশাদার চার্জ।

**চাকরি:** বেতন/মজুরির জন্য নিয়োগকর্তার অধীনে কাজ। নিয়মিত আয়, কোনো ঝুঁকি নেই।`,
    difficulty: "medium",
    isImportant: true,
  },
  {
    id: "bs_002",
    subjectArea: "commerce",
    subject: "Business Studies",
    chapter: "Management Principles",
    classLevel: "12",
    questionType: "mcq",
    questionEn: 'Who is known as the "Father of Scientific Management"?',
    questionBn: '"বৈজ্ঞানিক ব্যবস্থাপনার জনক" কে?',
    answerEn: "Frederick Winslow Taylor",
    answerBn: "ফ্রেডেরিক উইনস্লো টেলর",
    options: {
      a: "Henri Fayol",
      b: "Elton Mayo",
      c: "F.W. Taylor",
      d: "Peter Drucker",
    },
    optionsBn: {
      a: "হেনরি ফেয়ল",
      b: "এলটন মেয়ো",
      c: "এফ.ডব্লিউ. টেলর",
      d: "পিটার ড্রাকার",
    },
    correctOption: "c",
    explanationEn:
      "F.W. Taylor (1856-1915) is known as the Father of Scientific Management. His key principles include science, not rule of thumb; harmony; cooperation; and maximum output.",
    explanationBn:
      "এফ.ডব্লিউ. টেলর (১৮৫৬-১৯১৫) বৈজ্ঞানিক ব্যবস্থাপনার জনক। তাঁর মূল নীতিগুলি: বিজ্ঞান (অভিজ্ঞতানির্ভর নিয়ম নয়), সামঞ্জস্য, সহযোগিতা, সর্বোচ্চ উৎপাদন।",
    difficulty: "easy",
    isImportant: true,
  },
  // ========== COMMERCE - ECONOMICS ==========
  {
    id: "eco_001",
    subjectArea: "commerce",
    subject: "Economics",
    chapter: "Demand and Supply",
    classLevel: "11",
    questionType: "long_answer",
    questionEn: "Explain the law of demand with a suitable diagram.",
    questionBn: "চাহিদার নিয়ম একটি উপযুক্ত চিত্রসহ ব্যাখ্যা করো।",
    answerEn: `**Law of Demand (Marshall):** Other things remaining equal, as the price of a commodity falls, its demand rises, and as price rises, demand falls. There is an inverse relationship between price and quantity demanded.

**Demand Schedule Example:**
Price (₹) | Quantity Demanded
10 | 50
8 | 70
6 | 100
4 | 140

**Demand Curve:** Slopes downward from left to right (negative slope)

**Reasons for Law of Demand:**
1. Substitution effect – cheaper goods replace costlier ones
2. Income effect – as price falls, real income rises
3. New consumers enter the market at lower prices
4. Multiple uses of commodity at lower prices`,
    answerBn: `**চাহিদার নিয়ম (মার্শাল):** অন্যান্য বিষয় অপরিবর্তিত থাকলে, কোনো পণ্যের দাম কমলে তার চাহিদা বাড়ে এবং দাম বাড়লে চাহিদা কমে। দাম ও চাহিদার পরিমাণের মধ্যে বিপরীত সম্পর্ক।

**চাহিদা তালিকার উদাহরণ:**
দাম (₹) | চাহিদার পরিমাণ
১০ | ৫০
৮ | ৭০
৬ | ১০০

**চাহিদা রেখা:** বাম থেকে ডানে নিম্নগামী (ঋণাত্মক ঢাল)

**চাহিদার নিয়মের কারণ:**
১. প্রতিস্থাপন প্রভাব
২. আয় প্রভাব
৩. নতুন ভোক্তারা বাজারে প্রবেশ করেন`,
    difficulty: "medium",
    isImportant: true,
  },
  // ========== LAW ==========
  {
    id: "law_001",
    subjectArea: "law",
    subject: "IPC",
    chapter: "Crimes Against Person",
    classLevel: "11",
    questionType: "short_answer",
    questionEn:
      "What is the difference between murder (IPC 302) and culpable homicide (IPC 299)?",
    questionBn: "খুন (IPC 302) এবং মানবহত্যা (IPC 299) এর মধ্যে পার্থক্য কী?",
    answerEn: `**Culpable Homicide (IPC 299):** Causing death with intention to cause death OR intention to cause bodily injury likely to cause death OR knowledge that death is likely. Punishment: Up to 10 years / life imprisonment / fine.

**Murder (IPC 302):** Culpable homicide becomes murder when: (1) done with intention to cause death, (2) done with intention to cause bodily injury sufficient in ordinary course of nature to cause death, (3) done with knowledge that death is imminently dangerous. Punishment: Death / life imprisonment + fine.

**Key Difference:** Murder requires higher degree of intention/knowledge. All murders are culpable homicide but not all culpable homicides are murder.`,
    answerBn: `**মানবহত্যা (IPC 299):** মৃত্যু ঘটানোর অভিপ্রায় বা মৃত্যু সম্ভাবনা জেনে মৃত্যু ঘটানো। সাজা: ১০ বছর/যাবজ্জীবন/জরিমানা।

**খুন (IPC 302):** মানবহত্যা তখন খুন হয় যখন: (১) মৃত্যু ঘটানোর অভিপ্রায়ে, (২) এমন জখম করার অভিপ্রায়ে যা স্বাভাবিকভাবে মৃত্যুর জন্য যথেষ্ট। সাজা: মৃত্যুদণ্ড/যাবজ্জীবন + জরিমানা।

**মূল পার্থক্য:** খুনের জন্য উচ্চতর অভিপ্রায়/জ্ঞান প্রয়োজন।`,
    difficulty: "hard",
    isImportant: true,
  },
  {
    id: "law_002",
    subjectArea: "law",
    subject: "Constitution",
    chapter: "Fundamental Rights",
    classLevel: "11",
    questionType: "mcq",
    questionEn:
      "Under which Article of the Indian Constitution is the Right to Constitutional Remedies guaranteed?",
    questionBn:
      "ভারতীয় সংবিধানের কোন অনুচ্ছেদে সাংবিধানিক প্রতিকারের অধিকার নিশ্চিত করা হয়েছে?",
    answerEn: "Article 32",
    answerBn: "অনুচ্ছেদ ৩২",
    options: {
      a: "Article 19",
      b: "Article 21",
      c: "Article 32",
      d: "Article 226",
    },
    optionsBn: {
      a: "অনুচ্ছেদ ১৯",
      b: "অনুচ্ছেদ ২১",
      c: "অনুচ্ছেদ ৩২",
      d: "অনুচ্ছেদ ২২৬",
    },
    correctOption: "c",
    explanationEn:
      'Article 32 guarantees the right to move the Supreme Court for enforcement of Fundamental Rights. Dr. B.R. Ambedkar called it the "heart and soul" of the Constitution.',
    explanationBn:
      'অনুচ্ছেদ ৩২ মৌলিক অধিকার প্রয়োগের জন্য সুপ্রিম কোর্টে যাওয়ার অধিকার নিশ্চিত করে। ড. বি.আর. আম্বেদকর এটিকে সংবিধানের "হৃদয় ও আত্মা" বলেছেন।',
    difficulty: "easy",
    isImportant: true,
  },
  {
    id: "law_003",
    subjectArea: "law",
    subject: "CrPC",
    chapter: "Arrest and Bail",
    classLevel: "11",
    questionType: "important_exam",
    questionEn:
      "Explain the concept of anticipatory bail under Section 438 CrPC.",
    questionBn: "CrPC ধারা ৪৩৮ এর অধীনে প্রত্যাশামূলক জামিনের ধারণা ব্যাখ্যা করো।",
    answerEn: `**Anticipatory Bail (Section 438 CrPC):** It is a bail granted in anticipation of arrest – i.e., before actually being arrested.

**Who can grant:** Sessions Court or High Court.

**Grounds:** Person must show reasonable apprehension of arrest.

**Important Conditions:**
1. Person must make himself available for interrogation
2. Must not leave India without prior permission
3. Must not tamper with evidence
4. Must not influence witnesses

**Landmark Case:** Balchand Jain v. State of M.P. (1977) – SC held anticipatory bail is not a blanket protection.

**BNS Equivalent:** BNSS Section 482`,
    answerBn: `**প্রত্যাশামূলক জামিন (CrPC ধারা ৪৩৮):** গ্রেফতারের প্রত্যাশায় জামিন – অর্থাৎ প্রকৃত গ্রেফতারের আগে।

**কে দিতে পারে:** সেশন কোর্ট বা হাইকোর্ট।

**শর্তসমূহ:**
১. জিজ্ঞাসাবাদের জন্য উপলব্ধ থাকতে হবে
২. পূর্ব অনুমতি ছাড়া ভারত ত্যাগ নয়
৩. সাক্ষ্য নষ্ট করা যাবে না
৪. সাক্ষীদের প্রভাবিত করা যাবে না

**BNSS সমতুল্য:** BNSS ধারা ৪৮২`,
    difficulty: "hard",
    isImportant: true,
  },
  // ========== NEET - PHYSICS ==========
  {
    id: "neet_phy_001",
    subjectArea: "neet",
    subject: "Physics",
    chapter: "Mechanics",
    classLevel: "neet",
    questionType: "mcq",
    questionEn:
      "A body thrown vertically upward with velocity u will reach maximum height when its velocity becomes:",
    questionBn:
      "u বেগে উপরের দিকে নিক্ষিপ্ত একটি বস্তু সর্বোচ্চ উচ্চতায় পৌঁছাবে যখন তার বেগ হবে:",
    answerEn: "Zero",
    answerBn: "শূন্য",
    options: { a: "u/2", b: "u", c: "2u", d: "Zero" },
    optionsBn: { a: "u/2", b: "u", c: "2u", d: "শূন্য" },
    correctOption: "d",
    explanationEn:
      "At maximum height, all kinetic energy is converted to potential energy. Velocity = 0. Using v² = u² - 2gh; at max height v = 0, so h = u²/2g.",
    explanationBn:
      "সর্বোচ্চ উচ্চতায় সমস্ত গতিশক্তি স্থিতিশক্তিতে রূপান্তরিত হয়। বেগ = ০। v² = u² - 2gh ব্যবহার করে; সর্বোচ্চ উচ্চতায় v = 0, তাই h = u²/2g।",
    difficulty: "medium",
    isImportant: true,
  },
  {
    id: "neet_phy_002",
    subjectArea: "neet",
    subject: "Physics",
    chapter: "Modern Physics",
    classLevel: "neet",
    questionType: "important_exam",
    questionEn:
      "State the photoelectric effect and Einstein's equation for it.",
    questionBn: "আলোক-বৈদ্যুতিক প্রভাব এবং এর জন্য আইনস্টাইনের সমীকরণ বর্ণনা করো।",
    answerEn: `**Photoelectric Effect:** When light of suitable frequency (above threshold frequency) falls on a metal surface, electrons are emitted from the surface.

**Einstein's Equation:**
KE_max = hν - φ
where:
- h = Planck's constant (6.63 × 10⁻³⁴ J·s)
- ν = frequency of incident light
- φ = Work function (minimum energy to remove electron)
- KE_max = Maximum kinetic energy of emitted photoelectrons

**Key Points:**
1. No effect below threshold frequency regardless of intensity
2. KE depends on frequency, not intensity
3. Number of electrons depends on intensity
4. Emission is instantaneous`,
    answerBn: `**আলোক-বৈদ্যুতিক প্রভাব:** উপযুক্ত কম্পাঙ্কের (দেহলি কম্পাঙ্কের উপরে) আলো ধাতব পৃষ্ঠে পড়লে ইলেকট্রন নির্গত হয়।

**আইনস্টাইনের সমীকরণ:**
KE_max = hν - φ
যেখানে:
- h = প্ল্যাংকের ধ্রুবক (6.63 × 10⁻³⁴ J·s)
- ν = আপতিত আলোর কম্পাঙ্ক
- φ = কর্মফল (ইলেকট্রন বের করতে ন্যূনতম শক্তি)

**মূল বিষয়:**
১. দেহলি কম্পাঙ্কের নিচে কোনো প্রভাব নেই
২. KE কম্পাঙ্কের উপর নির্ভরশীল, তীব্রতার নয়`,
    difficulty: "hard",
    isImportant: true,
  },
  // ========== NEET - BIOLOGY ==========
  {
    id: "neet_bio_001",
    subjectArea: "neet",
    subject: "Biology",
    chapter: "Genetics & Evolution",
    classLevel: "neet",
    questionType: "mcq",
    questionEn:
      "Which of the following is the genotype of a person with blood group AB?",
    questionBn: "AB রক্তগ্রুপের একজন ব্যক্তির জিনোটাইপ কোনটি?",
    answerEn: "Iᴬ Iᴮ",
    answerBn: "Iᴬ Iᴮ",
    options: { a: "Iᴬ Iᴬ", b: "Iᴬ Iᴮ", c: "Iᴮ i", d: "ii" },
    correctOption: "b",
    explanationEn:
      "ABO blood group has three alleles: Iᴬ, Iᴮ, and i. AB blood group has codominant expression of both Iᴬ and Iᴮ alleles, so genotype is IᴬIᴮ.",
    explanationBn:
      "ABO রক্তগ্রুপে তিনটি অ্যালিল আছে: Iᴬ, Iᴮ, এবং i। AB রক্তগ্রুপে Iᴬ এবং Iᴮ উভয় অ্যালিলের সহপ্রধান প্রকাশ হয়, তাই জিনোটাইপ IᴬIᴮ।",
    difficulty: "medium",
    isImportant: true,
  },
  {
    id: "neet_bio_002",
    subjectArea: "neet",
    subject: "Biology",
    chapter: "Human Physiology",
    classLevel: "neet",
    questionType: "short_answer",
    questionEn: "What is the role of insulin in glucose metabolism?",
    questionBn: "গ্লুকোজ বিপাকে ইনসুলিনের ভূমিকা কী?",
    answerEn:
      "Insulin is a peptide hormone secreted by β-cells of the islets of Langerhans in the pancreas. It lowers blood glucose by: (1) facilitating glucose uptake by cells, (2) promoting glycogen synthesis (glycogenesis) in liver and muscle, (3) inhibiting glycogen breakdown (glycogenolysis), (4) promoting fat synthesis. Deficiency of insulin causes diabetes mellitus.",
    answerBn:
      "ইনসুলিন অগ্ন্যাশয়ের লেঙ্গারহান্স দ্বীপের β-কোষ দ্বারা নিঃসৃত একটি পেপটাইড হরমোন। এটি রক্তে গ্লুকোজ কমায়: (১) কোষে গ্লুকোজ প্রবেশ সহজ করে, (২) যকৃত ও পেশীতে গ্লাইকোজেন সংশ্লেষণ উৎসাহিত করে, (৩) গ্লাইকোজেন ভাঙ্গন বাধা দেয়। ইনসুলিনের অভাবে ডায়াবেটিস মেলিটাস হয়।",
    difficulty: "medium",
    isImportant: true,
  },
  // ========== CA - FOUNDATION ==========
  {
    id: "ca_001",
    subjectArea: "ca",
    subject: "Principles of Accounting",
    chapter: "Basic Accounting Concepts",
    classLevel: "ca_foundation",
    questionType: "short_answer",
    questionEn: "Explain the Going Concern concept in accounting.",
    questionBn: "অ্যাকাউন্টিংয়ে চলমান প্রতিষ্ঠান ধারণাটি ব্যাখ্যা করো।",
    answerEn: `**Going Concern Concept:** This concept assumes that a business entity will continue to operate indefinitely into the future and will not be liquidated in the near future.

**Implications:**
1. Fixed assets are recorded at cost, not market value
2. Long-term liabilities are separated from current liabilities
3. Depreciation is charged on fixed assets
4. Prepaid expenses are treated as assets

**Exception:** When a business is about to wind up, the going concern concept does not apply, and assets are valued at liquidation (realizable) value.

**Relevant AS:** AS-1 (Disclosure of Accounting Policies)`,
    answerBn: `**চলমান প্রতিষ্ঠান ধারণা:** এই ধারণা ধরে নেয় যে একটি ব্যবসায়িক সত্তা অনির্দিষ্টকালের জন্য পরিচালনা অব্যাহত রাখবে এবং নিকট ভবিষ্যতে বিলুপ্ত হবে না।

**প্রভাব:**
১. স্থায়ী সম্পদ খরচে নথিভুক্ত হয়, বাজার মূল্যে নয়
২. দীর্ঘমেয়াদী দায় বর্তমান দায় থেকে আলাদা
৩. স্থায়ী সম্পদে অবচয় ধার্য করা হয়
৪. অগ্রিম খরচ সম্পদ হিসেবে বিবেচিত`,
    difficulty: "medium",
    isImportant: true,
  },
  {
    id: "ca_002",
    subjectArea: "ca",
    subject: "Business Laws",
    chapter: "Indian Contract Act 1872",
    classLevel: "ca_foundation",
    questionType: "mcq",
    questionEn:
      "Which of the following is NOT an essential element of a valid contract under ICA 1872?",
    questionBn: "ICA ১৮৭২ অনুযায়ী বৈধ চুক্তির অপরিহার্য উপাদান কোনটি নয়?",
    answerEn: "Registration",
    answerBn: "নিবন্ধন",
    options: {
      a: "Offer and Acceptance",
      b: "Consideration",
      c: "Registration",
      d: "Free Consent",
    },
    optionsBn: { a: "প্রস্তাব ও গ্রহণ", b: "প্রতিদান", c: "নিবন্ধন", d: "মুক্ত সম্মতি" },
    correctOption: "c",
    explanationEn:
      "Essential elements of a valid contract (Section 10 ICA): Offer & Acceptance, Consideration, Free Consent, Competent Parties, Lawful Object, Not declared void. Registration is NOT essential for general contracts.",
    explanationBn:
      "বৈধ চুক্তির অপরিহার্য উপাদান (ICA ধারা ১০): প্রস্তাব ও গ্রহণ, প্রতিদান, মুক্ত সম্মতি, সক্ষম পক্ষ, আইনসম্মত উদ্দেশ্য। সাধারণ চুক্তির জন্য নিবন্ধন অপরিহার্য নয়।",
    difficulty: "medium",
    isImportant: true,
  },
  {
    id: "ca_003",
    subjectArea: "ca",
    subject: "Principles of Accounting",
    chapter: "Bills of Exchange",
    classLevel: "ca_foundation",
    questionType: "important_exam",
    questionEn:
      "What is a Bill of Exchange? Explain its parties and essential features.",
    questionBn: "বিল অব এক্সচেঞ্জ কী? এর পক্ষগুলি এবং অপরিহার্য বৈশিষ্ট্যগুলি ব্যাখ্যা করো।",
    answerEn: `**Definition (NI Act, Section 5):** A bill of exchange is an instrument in writing, containing an unconditional order, signed by the maker, directing a certain person to pay a certain sum of money only to or to the order of a certain person, or to the bearer of the instrument.

**Parties:**
1. **Drawer:** Person who draws/creates the bill (creditor)
2. **Drawee:** Person on whom the bill is drawn (debtor)
3. **Payee:** Person to whom payment is to be made
4. **Acceptor:** Drawee who accepts the bill

**Essential Features:**
1. Must be in writing
2. Unconditional order to pay
3. Fixed sum of money
4. Must be signed by the drawer
5. Must be accepted by drawee
6. Payable on demand or at a fixed future date`,
    answerBn: `**সংজ্ঞা (NI আইন, ধারা ৫):** বিল অব এক্সচেঞ্জ হল একটি লিখিত দলিল যাতে প্রস্তুতকারীর স্বাক্ষরিত নিঃশর্ত আদেশ থাকে, যা একটি নির্দিষ্ট ব্যক্তিকে নির্দিষ্ট পরিমাণ অর্থ শুধুমাত্র একটি নির্দিষ্ট ব্যক্তিকে পরিশোধ করতে নির্দেশ দেয়।

**পক্ষসমূহ:**
১. **ড্রয়ার:** যে বিল তৈরি করে (পাওনাদার)
২. **ড্রয়ি:** যার উপর বিল তৈরি হয় (দেনাদার)
৩. **পেয়ি:** যাকে অর্থ প্রদান করতে হবে

**অপরিহার্য বৈশিষ্ট্য:**
১. লিখিত হতে হবে
২. নিঃশর্ত অর্থ প্রদানের আদেশ
৩. নির্দিষ্ট পরিমাণ অর্থ
৪. ড্রয়ার কর্তৃক স্বাক্ষরিত`,
    difficulty: "hard",
    isImportant: true,
  },
  // ========== Additional NEET Chemistry ==========
  {
    id: "neet_chem_001",
    subjectArea: "neet",
    subject: "Chemistry",
    chapter: "Mole Concept",
    classLevel: "neet",
    questionType: "mcq",
    questionEn: "How many molecules are present in 1 mole of CO₂?",
    questionBn: "১ মোল CO₂-এ কতটি অণু আছে?",
    answerEn: "6.022 × 10²³",
    answerBn: "6.022 × 10²³",
    options: {
      a: "6.022 × 10²²",
      b: "6.022 × 10²³",
      c: "6.022 × 10²⁴",
      d: "3.011 × 10²³",
    },
    correctOption: "b",
    explanationEn:
      "Avogadro's number (Nₐ) = 6.022 × 10²³ entities per mole. One mole of any substance contains 6.022 × 10²³ molecules/atoms/ions.",
    explanationBn:
      "অ্যাভোগাড্রো সংখ্যা (Nₐ) = প্রতি মোলে 6.022 × 10²³। যেকোনো পদার্থের এক মোলে 6.022 × 10²³ অণু/পরমাণু/আয়ন থাকে।",
    difficulty: "easy",
    isImportant: true,
  },
  // Additional Arts - Sociology
  {
    id: "soc_001",
    subjectArea: "arts",
    subject: "Sociology",
    chapter: "Social Institutions",
    classLevel: "11",
    questionType: "short_answer",
    questionEn: "What is a social institution? Give examples.",
    questionBn: "সামাজিক প্রতিষ্ঠান কী? উদাহরণ দাও।",
    answerEn:
      "A social institution is an organized system of social norms, values, roles, and patterns that regulate social behavior in important areas of social life. Examples: Family (primary socialization), Education (knowledge transmission), Religion (moral norms), Economy (production/distribution), Politics (governance and power), Marriage.",
    answerBn:
      "সামাজিক প্রতিষ্ঠান হল সংগঠিত সামাজিক নিয়ম, মূল্যবোধ, ভূমিকা ও নিদর্শনের ব্যবস্থা যা সামাজিক জীবনের গুরুত্বপূর্ণ ক্ষেত্রে সামাজিক আচরণ নিয়ন্ত্রণ করে। উদাহরণ: পরিবার, শিক্ষা, ধর্ম, অর্থনীতি, রাজনীতি, বিবাহ।",
    difficulty: "easy",
    isImportant: false,
  },
  // Additional Commerce - Economics
  {
    id: "eco_002",
    subjectArea: "commerce",
    subject: "Economics",
    chapter: "National Income",
    classLevel: "12",
    questionType: "important_exam",
    questionEn: "What is GDP? Explain the methods of measuring GDP.",
    questionBn: "GDP কী? GDP পরিমাপের পদ্ধতিগুলি ব্যাখ্যা করো।",
    answerEn: `**GDP (Gross Domestic Product):** The total monetary value of all final goods and services produced within a country's borders in a specific time period (usually one year).

**Methods of Measuring GDP:**

1. **Expenditure Method:** GDP = C + I + G + (X - M)
   - C = Private Consumption
   - I = Investment
   - G = Government Expenditure
   - X-M = Net Exports

2. **Income Method:** Sum of all factor incomes:
   GDP = Wages + Rent + Interest + Profit

3. **Product/Value Added Method:** Sum of value added at each stage of production. Value Added = Output - Input`,
    answerBn: `**GDP (মোট দেশীয় উৎপাদন):** একটি নির্দিষ্ট সময়কালে (সাধারণত এক বছর) একটি দেশের সীমানার মধ্যে উৎপাদিত সমস্ত চূড়ান্ত পণ্য ও সেবার মোট আর্থিক মূল্য।

**GDP পরিমাপের পদ্ধতি:**

১. **ব্যয় পদ্ধতি:** GDP = C + I + G + (X - M)
   - C = ব্যক্তিগত ভোগ
   - I = বিনিয়োগ
   - G = সরকারি ব্যয়
   - X-M = নিট রপ্তানি

২. **আয় পদ্ধতি:** সমস্ত উৎপাদন উপাদানের আয়ের সমষ্টি

৩. **উৎপাদন/মূল্য সংযোজন পদ্ধতি:** উৎপাদনের প্রতিটি ধাপে মূল্য সংযোজনের সমষ্টি`,
    difficulty: "hard",
    isImportant: true,
  },
];

// Helper functions
export const getSubjectAreas = (): SubjectArea[] => [
  "arts",
  "science",
  "commerce",
  "law",
  "neet",
  "ca",
];

export const getSubjectsByArea = (area: SubjectArea): string[] => {
  const subjects = [
    ...new Set(
      QA_DATABASE.filter((q) => q.subjectArea === area).map((q) => q.subject),
    ),
  ];
  return subjects.sort();
};

export const getChaptersBySubject = (subject: string): string[] => {
  const chapters = [
    ...new Set(
      QA_DATABASE.filter((q) => q.subject === subject).map((q) => q.chapter),
    ),
  ];
  return chapters.sort();
};

export const filterQuestions = (params: {
  subjectArea?: SubjectArea;
  subject?: string;
  chapter?: string;
  questionType?: QuestionType;
  classLevel?: ClassLevel;
  searchQuery?: string;
  importantOnly?: boolean;
}): QAEntry[] => {
  return QA_DATABASE.filter((q) => {
    if (params.subjectArea && q.subjectArea !== params.subjectArea)
      return false;
    if (params.subject && q.subject !== params.subject) return false;
    if (params.chapter && q.chapter !== params.chapter) return false;
    if (params.questionType && q.questionType !== params.questionType)
      return false;
    if (params.classLevel && q.classLevel !== params.classLevel) return false;
    if (params.importantOnly && !q.isImportant) return false;
    if (params.searchQuery) {
      const q_lower = params.searchQuery.toLowerCase();
      if (
        !q.questionEn.toLowerCase().includes(q_lower) &&
        !q.questionBn.includes(params.searchQuery) &&
        !q.chapter.toLowerCase().includes(q_lower) &&
        !q.subject.toLowerCase().includes(q_lower)
      )
        return false;
    }
    return true;
  });
};

export const SUBJECT_AREA_LABELS: Record<
  SubjectArea,
  { en: string; bn: string }
> = {
  arts: { en: "Arts", bn: "কলা" },
  science: { en: "Science", bn: "বিজ্ঞান" },
  commerce: { en: "Commerce", bn: "বাণিজ্য" },
  law: { en: "Law", bn: "আইন" },
  neet: { en: "NEET", bn: "NEET" },
  ca: { en: "CA", bn: "CA" },
};

export const QUESTION_TYPE_LABELS: Record<
  QuestionType,
  { en: string; bn: string }
> = {
  chapter_wise: { en: "Chapter-Wise", bn: "অধ্যায়ভিত্তিক" },
  short_answer: { en: "Short Answer", bn: "সংক্ষিপ্ত উত্তর" },
  long_answer: { en: "Long Answer", bn: "দীর্ঘ উত্তর" },
  mcq: { en: "MCQ", bn: "বহুনির্বাচনী" },
  important_exam: { en: "Important/Exam", bn: "গুরুত্বপূর্ণ/পরীক্ষা" },
};

export const CLASS_LEVEL_LABELS: Record<
  ClassLevel,
  { en: string; bn: string }
> = {
  "11": { en: "Class 11", bn: "একাদশ শ্রেণী" },
  "12": { en: "Class 12", bn: "দ্বাদশ শ্রেণী" },
  neet: { en: "NEET", bn: "NEET" },
  ca_foundation: { en: "CA Foundation", bn: "CA ফাউন্ডেশন" },
  ca_inter: { en: "CA Intermediate", bn: "CA ইন্টারমিডিয়েট" },
  ca_final: { en: "CA Final", bn: "CA ফাইনাল" },
};
