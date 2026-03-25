import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Gavel,
  Globe2,
  Languages,
  Lightbulb,
  Link2,
  Scale,
  Search,
  Star,
} from "lucide-react";
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
  { label: "CrPC 164", query: "CrPC 164", desc: "Magistrate Statement" },
  { label: "IT Act 66C", query: "IT Act 66C", desc: "Identity Theft" },
  { label: "HMA 13", query: "HMA 13", desc: "Divorce" },
];

// ====== Case Finder Data ======
const LANDMARK_CASES = [
  {
    name: "Kesavananda Bharati v. State of Kerala",
    citation: "AIR 1973 SC 1461",
    court: "Supreme Court of India",
    year: 1973,
    topics: ["Constitution", "Basic Structure", "Fundamental Rights"],
    summary:
      "Established the Basic Structure doctrine — Parliament cannot alter the basic structure of the Constitution. | সংসদ সংবিধানের মৌলিক প্রকৃতি পরিবর্তন করতে পারবে না বলে সর্বোচ্চ আদালত রায় দিয়েছে।",
  },
  {
    name: "Maneka Gandhi v. Union of India",
    citation: "AIR 1978 SC 597",
    court: "Supreme Court of India",
    year: 1978,
    topics: ["Article 21", "Right to Life", "Personal Liberty"],
    summary:
      "Expanded the scope of Article 21 — due process must be fair, just, and reasonable. | আর্টিকেল 21-এর পরিধি বিস্তৃত করা হয়।",
  },
  {
    name: "Vishaka v. State of Rajasthan",
    citation: "AIR 1997 SC 3011",
    court: "Supreme Court of India",
    year: 1997,
    topics: ["Sexual Harassment", "Workplace", "Women Rights"],
    summary:
      "Laid down Vishaka Guidelines for prevention of sexual harassment at workplace. | কর্মক্ষেত্রে যৌন হয়রানি প্রতিরোধে বিশাখা গাইডলাইন তৈরি হয়।",
  },
  {
    name: "D.K. Basu v. State of West Bengal",
    citation: "AIR 1997 SC 610",
    court: "Supreme Court of India",
    year: 1997,
    topics: ["Arrest", "Custody", "Police", "CrPC"],
    summary:
      "Set out guidelines for arrest and detention to prevent custodial torture. | গ্রেফতার ও হেফাজতে নির্যাতন প্রতিরোধে নির্দেশিকা নির্ধারিত হয়।",
  },
  {
    name: "Shreya Singhal v. Union of India",
    citation: "(2015) 5 SCC 1",
    court: "Supreme Court of India",
    year: 2015,
    topics: ["IT Act", "Section 66A", "Freedom of Speech", "Internet"],
    summary:
      "Struck down Section 66A of IT Act as unconstitutional. | IT Act-এর ধারা 66A অসাংবিধানিক ঘোষণা।",
  },
  {
    name: "Lalita Kumari v. Govt of UP",
    citation: "(2014) 2 SCC 1",
    court: "Supreme Court of India",
    year: 2014,
    topics: ["FIR", "CrPC 154", "Mandatory Registration"],
    summary:
      "Registration of FIR is mandatory when information discloses cognizable offence. | আমলযোগ্য অপরাধের ক্ষেত্রে FIR অবশ্যই নিবন্ধন করতে হবে।",
  },
  {
    name: "Arnesh Kumar v. State of Bihar",
    citation: "(2014) 8 SCC 273",
    court: "Supreme Court of India",
    year: 2014,
    topics: ["Arrest", "IPC 498A", "CrPC 41A"],
    summary:
      "Arrest should not be made automatically in 498A cases; CrPC 41A notice must be served first. | 498A মামলায় স্বয়ংক্রিয়ভাবে গ্রেফতার নয়।",
  },
  {
    name: "Shah Bano Begum v. Mohd Ahmed Khan",
    citation: "AIR 1985 SC 945",
    court: "Supreme Court of India",
    year: 1985,
    topics: ["Maintenance", "Muslim Law", "CrPC 125"],
    summary:
      "Muslim divorced women entitled to maintenance under CrPC Section 125. | তালাকপ্রাপ্ত মুসলিম মহিলা CrPC 125 ধারায় ভরণ-পোষণ পাবেন।",
  },
  {
    name: "State of Maharashtra v. Madhkar Narayan",
    citation: "AIR 1991 SC 207",
    court: "Supreme Court of India",
    year: 1991,
    topics: ["Women Rights", "Privacy", "Rape"],
    summary:
      "Every woman has a right to privacy and bodily integrity. | প্রতিটি নারীর গোপনীয়তা ও শারীরিক সুরক্ষার অধিকার আছে।",
  },
  {
    name: "Indira Sawhney v. Union of India",
    citation: "AIR 1993 SC 477",
    court: "Supreme Court of India",
    year: 1992,
    topics: ["Reservation", "OBC", "Article 16"],
    summary:
      "Upheld 27% reservation for OBCs but capped total reservations at 50%. | OBC-দের জন্য 27% সংরক্ষণ বহাল রাখা হয়, তবে মোট 50%-এর সীমা।",
  },
  {
    name: "Navtej Singh Johar v. Union of India",
    citation: "(2018) 10 SCC 1",
    court: "Supreme Court of India",
    year: 2018,
    topics: ["IPC 377", "LGBTQ+", "Decriminalisation"],
    summary:
      "Decriminalised consensual same-sex relations by reading down IPC Section 377. | IPC 377 ধারা পড়া শেষে সমলিঙ্গ সম্পর্ক অপরাধমুক্ত করা হয়।",
  },
  {
    name: "Puttaswamy v. Union of India",
    citation: "(2017) 10 SCC 1",
    court: "Supreme Court of India",
    year: 2017,
    topics: ["Right to Privacy", "Article 21", "Aadhaar"],
    summary:
      "Right to Privacy is a fundamental right under Article 21. | গোপনীয়তার অধিকার সংবিধানের মৌলিক অধিকার।",
  },
  {
    name: "Hussainara Khatoon v. State of Bihar",
    citation: "AIR 1979 SC 1369",
    court: "Supreme Court of India",
    year: 1979,
    topics: ["Bail", "Undertrial", "CrPC 436A", "Right to Speedy Trial"],
    summary:
      "Right to speedy trial is implicit in Article 21. Undertrial prisoners cannot be detained beyond maximum sentence period. | দ্রুত বিচারের অধিকার আর্টিকেল 21-এ নিহিত।",
  },
  {
    name: "M.C. Mehta v. Union of India",
    citation: "AIR 1987 SC 1086",
    court: "Supreme Court of India",
    year: 1987,
    topics: ["Environment", "Article 21", "Absolute Liability"],
    summary:
      "Introduced Absolute Liability rule — industry engaged in hazardous activity is strictly liable for harm. | শিল্প সংস্থা বিপজ্জনক কার্যকলাপে নিরঙ্কুশ দায়বদ্ধ।",
  },
  {
    name: "Baxi Amrik Singh v. Union of India",
    citation: "(2019) Case",
    court: "Supreme Court of India",
    year: 2019,
    topics: ["Anticipatory Bail", "CrPC 438"],
    summary:
      "Anticipatory bail cannot be time-bound; once granted, it operates till end of trial. | অ্যান্টিসিপেটোরি জামিন সময়সীমাবদ্ধ নয়।",
  },
  {
    name: "Union Carbide v. Union of India",
    citation: "AIR 1992 SC 248",
    court: "Supreme Court of India",
    year: 1992,
    topics: ["Bhopal Gas Tragedy", "Compensation", "IPC"],
    summary:
      "Settled Bhopal gas tragedy compensation. Established precedent for industrial disaster liability. | ভোপাল গ্যাস দুর্যোগের ক্ষতিপূরণ নির্ধারণ।",
  },
  {
    name: "Bachan Singh v. State of Punjab",
    citation: "AIR 1980 SC 898",
    court: "Supreme Court of India",
    year: 1980,
    topics: ["Death Penalty", "IPC 302", "Rarest of Rare"],
    summary:
      "Death penalty valid but only in 'rarest of rare' cases with special reasons. | মৃত্যুদণ্ড সবচেয়ে বিরল ক্ষেত্রেই প্রযোজ্য।",
  },
  {
    name: "Olga Tellis v. Bombay Municipal Corporation",
    citation: "AIR 1986 SC 180",
    court: "Supreme Court of India",
    year: 1985,
    topics: ["Right to Life", "Livelihood", "Article 21"],
    summary:
      "Right to livelihood is part of Right to Life under Article 21. | জীবিকার অধিকার আর্টিকেল 21-এর অন্তর্গত।",
  },
  {
    name: "State of UP v. Deoman Upadhyaya",
    citation: "AIR 1960 SC 1125",
    court: "Supreme Court of India",
    year: 1960,
    topics: ["Confession", "Evidence", "CrPC 164"],
    summary:
      "Confession before Magistrate admissible; police confession not admissible. | ম্যাজিস্ট্রেটের কাছে স্বীকারোক্তি গ্রহণযোগ্য।",
  },
  {
    name: "Gidauri Lal v. State",
    citation: "AIR 1954 SC 695",
    court: "Supreme Court of India",
    year: 1954,
    topics: ["Self-Defence", "IPC 96", "Right to Private Defence"],
    summary:
      "Right to private defence must be exercised without aggression or retaliation. | ব্যক্তিগত আত্মরক্ষার অধিকার আক্রমণহীনভাবে প্রযোগ।",
  },
  {
    name: "Anuradha Bhasin v. Union of India",
    citation: "(2020) 3 SCC 637",
    court: "Supreme Court of India",
    year: 2020,
    topics: ["Internet Shutdown", "Article 19", "Freedom of Speech"],
    summary:
      "Freedom of speech includes freedom of internet. Internet shutdowns must pass proportionality test. | ইন্টারনেট বন্ধ বাকস্বাধীনতার লঙ্ঘন হতে পারে।",
  },
];

// ====== IPC vs BNS Data ======
const IPC_BNS_COMPARISON = [
  {
    ipcSec: "302",
    ipcTitle: "Punishment for Murder",
    bnsSec: "101",
    bnsTitle: "Murder",
    note: "Same punishment — death or life imprisonment",
  },
  {
    ipcSec: "304",
    ipcTitle: "Culpable Homicide not amounting to Murder",
    bnsSec: "105",
    bnsTitle: "Culpable Homicide",
    note: "Similar provision",
  },
  {
    ipcSec: "307",
    ipcTitle: "Attempt to Murder",
    bnsSec: "109",
    bnsTitle: "Attempt to commit murder",
    note: "Similar provision",
  },
  {
    ipcSec: "376",
    ipcTitle: "Punishment for Rape",
    bnsSec: "64",
    bnsTitle: "Punishment for rape",
    note: "Broadened definition",
  },
  {
    ipcSec: "354",
    ipcTitle: "Assault on Woman with intent to outrage modesty",
    bnsSec: "74",
    bnsTitle: "Assault or use of criminal force to woman",
    note: "Expanded protection",
  },
  {
    ipcSec: "354A",
    ipcTitle: "Sexual Harassment",
    bnsSec: "75",
    bnsTitle: "Sexual harassment",
    note: "Similar provision",
  },
  {
    ipcSec: "354B",
    ipcTitle: "Assault with intent to disrobe",
    bnsSec: "76",
    bnsTitle: "Assault or use of criminal force and disrobing",
    note: "Similar provision",
  },
  {
    ipcSec: "354C",
    ipcTitle: "Voyeurism",
    bnsSec: "77",
    bnsTitle: "Voyeurism",
    note: "Similar provision",
  },
  {
    ipcSec: "354D",
    ipcTitle: "Stalking",
    bnsSec: "78",
    bnsTitle: "Stalking",
    note: "Similar provision",
  },
  {
    ipcSec: "375",
    ipcTitle: "Rape (definition)",
    bnsSec: "63",
    bnsTitle: "Rape (definition)",
    note: "Expanded to include marital rape exception (minor wife)",
  },
  {
    ipcSec: "378",
    ipcTitle: "Theft",
    bnsSec: "303",
    bnsTitle: "Theft",
    note: "Similar provision",
  },
  {
    ipcSec: "379",
    ipcTitle: "Punishment for Theft",
    bnsSec: "303(2)",
    bnsTitle: "Punishment for theft",
    note: "Similar provision",
  },
  {
    ipcSec: "390",
    ipcTitle: "Robbery",
    bnsSec: "309",
    bnsTitle: "Robbery",
    note: "Similar provision",
  },
  {
    ipcSec: "392",
    ipcTitle: "Punishment for Robbery",
    bnsSec: "309(2)",
    bnsTitle: "Punishment for robbery",
    note: "Similar provision",
  },
  {
    ipcSec: "395",
    ipcTitle: "Dacoity",
    bnsSec: "310",
    bnsTitle: "Dacoity",
    note: "Similar provision",
  },
  {
    ipcSec: "406",
    ipcTitle: "Criminal Breach of Trust",
    bnsSec: "316",
    bnsTitle: "Criminal breach of trust",
    note: "Similar provision",
  },
  {
    ipcSec: "420",
    ipcTitle: "Cheating",
    bnsSec: "318",
    bnsTitle: "Cheating",
    note: "Broadened scope",
  },
  {
    ipcSec: "463",
    ipcTitle: "Forgery",
    bnsSec: "336",
    bnsTitle: "Forgery",
    note: "Similar provision",
  },
  {
    ipcSec: "498A",
    ipcTitle: "Cruelty by Husband/Relatives",
    bnsSec: "85",
    bnsTitle: "Husband or relative subjecting woman to cruelty",
    note: "Similar provision",
  },
  {
    ipcSec: "499",
    ipcTitle: "Defamation",
    bnsSec: "356",
    bnsTitle: "Defamation",
    note: "Similar provision",
  },
  {
    ipcSec: "500",
    ipcTitle: "Punishment for Defamation",
    bnsSec: "356(2)",
    bnsTitle: "Punishment for defamation",
    note: "Similar provision",
  },
  {
    ipcSec: "503",
    ipcTitle: "Criminal Intimidation",
    bnsSec: "351",
    bnsTitle: "Criminal intimidation",
    note: "Similar provision",
  },
  {
    ipcSec: "504",
    ipcTitle: "Intentional insult",
    bnsSec: "352",
    bnsTitle: "Intentional insult with intent to provoke",
    note: "Similar provision",
  },
  {
    ipcSec: "506",
    ipcTitle: "Punishment for Criminal Intimidation",
    bnsSec: "351(2)",
    bnsTitle: "Punishment for criminal intimidation",
    note: "Similar provision",
  },
  {
    ipcSec: "509",
    ipcTitle: "Word, gesture or act to insult modesty of woman",
    bnsSec: "79",
    bnsTitle: "Act intended to insult modesty of a woman",
    note: "Broader scope",
  },
  {
    ipcSec: "34",
    ipcTitle: "Acts done by several persons in furtherance of common intention",
    bnsSec: "3(5)",
    bnsTitle: "Common intention",
    note: "Restructured but similar",
  },
  {
    ipcSec: "120B",
    ipcTitle: "Punishment of criminal conspiracy",
    bnsSec: "61",
    bnsTitle: "Punishment for criminal conspiracy",
    note: "Similar provision",
  },
  {
    ipcSec: "141",
    ipcTitle: "Unlawful Assembly",
    bnsSec: "189",
    bnsTitle: "Unlawful assembly",
    note: "Similar provision",
  },
  {
    ipcSec: "149",
    ipcTitle: "Every member of unlawful assembly guilty",
    bnsSec: "190",
    bnsTitle: "Liability of members of unlawful assembly",
    note: "Similar provision",
  },
  {
    ipcSec: "323",
    ipcTitle: "Punishment for voluntarily causing hurt",
    bnsSec: "115",
    bnsTitle: "Voluntarily causing hurt",
    note: "Similar provision",
  },
  {
    ipcSec: "324",
    ipcTitle: "Voluntarily causing hurt by dangerous weapons",
    bnsSec: "117",
    bnsTitle: "Voluntarily causing hurt by dangerous weapons",
    note: "Similar provision",
  },
  {
    ipcSec: "325",
    ipcTitle: "Punishment for grievous hurt",
    bnsSec: "116",
    bnsTitle: "Voluntarily causing grievous hurt",
    note: "Similar provision",
  },
  {
    ipcSec: "300",
    ipcTitle: "Murder (definition)",
    bnsSec: "100",
    bnsTitle: "Murder (definition)",
    note: "Slightly modified",
  },
  {
    ipcSec: "304A",
    ipcTitle: "Causing death by negligence",
    bnsSec: "106",
    bnsTitle: "Causing death by negligence",
    note: "Enhanced punishment for hit-and-run",
  },
  {
    ipcSec: "509",
    ipcTitle: "Insult modesty of woman",
    bnsSec: "79",
    bnsTitle: "Act intended to insult modesty of woman",
    note: "Similar provision",
  },
  {
    ipcSec: "153A",
    ipcTitle: "Promoting enmity between classes",
    bnsSec: "196",
    bnsTitle: "Promoting enmity between groups",
    note: "Similar provision",
  },
  {
    ipcSec: "295A",
    ipcTitle: "Deliberate acts to outrage religious feelings",
    bnsSec: "299",
    bnsTitle: "Deliberate and malicious acts to outrage religious feelings",
    note: "Similar provision",
  },
  {
    ipcSec: "468",
    ipcTitle: "Forgery for purpose of cheating",
    bnsSec: "339",
    bnsTitle: "Forgery for purpose of cheating",
    note: "Similar provision",
  },
  {
    ipcSec: "471",
    ipcTitle: "Using as genuine a forged document",
    bnsSec: "341",
    bnsTitle: "Using as genuine a forged document",
    note: "Similar provision",
  },
  {
    ipcSec: "409",
    ipcTitle: "Criminal breach of trust by public servant",
    bnsSec: "317",
    bnsTitle: "Criminal breach of trust by public servant",
    note: "Similar provision",
  },
];

// ====== Legal Glossary ======
const LEGAL_GLOSSARY = [
  {
    term: "Acquittal",
    bengali: "খালাস",
    definition:
      "A judgement that a person is not guilty of the crime with which they have been charged.",
    definitionBn: "আদালতের রায় যে অভিযুক্ত ব্যক্তি নির্দোষ।",
  },
  {
    term: "Affidavit",
    bengali: "হলফনামা",
    definition:
      "A written statement confirmed by oath, used as evidence in court.",
    definitionBn: "শপথ গ্রহণপূর্বক লিখিত বিবরণ, যা সাক্ষ্যহিসেবে ব্যবহৃত হয়।",
  },
  {
    term: "Anticipatory Bail",
    bengali: "অগ্রিম জামিন",
    definition:
      "Bail granted before arrest in anticipation of arrest, under CrPC Section 438.",
    definitionBn: "গ্রেফতারের আগে CrPC 438 ধারায় প্রদত্ত জামিন।",
  },
  {
    term: "Bail",
    bengali: "জামিন",
    definition:
      "Temporary release of an accused person awaiting trial, sometimes on condition of security.",
    definitionBn: "বিচারের আগে অভিযুক্তকে শর্ত সাপেক্ষে মুক্তি।",
  },
  {
    term: "Bailable Offence",
    bengali: "জামিনযোগ্য অপরাধ",
    definition:
      "An offence where the accused has a right to get bail (less serious crimes).",
    definitionBn: "অপেক্ষাকৃত কম গুরুত্বের অপরাধ যেখানে জামিন পাওয়ার অধিকার আছে।",
  },
  {
    term: "Chargesheet",
    bengali: "চার্জশিট",
    definition:
      "A formal document filed by police after investigation, listing charges against the accused.",
    definitionBn: "তদন্তর পর পুলিশ কর্তৃক দাখিল নথিবদ্ধ অভিযোগ।",
  },
  {
    term: "Cognizable Offence",
    bengali: "আমলযোগ্য অপরাধ",
    definition:
      "Serious crime where police can arrest without warrant (e.g., murder, rape, robbery).",
    definitionBn: "গুরুতর অপরাধ যেখানে পুলিশ পরোয়ানা ছাড়াই গ্রেফতার করতে পারে।",
  },
  {
    term: "Conviction",
    bengali: "দোষপ্রমাণ",
    definition:
      "A formal declaration that someone is guilty of a criminal offence.",
    definitionBn: "আদালতের নির্ধারণ যে অভিযুক্ত ব্যক্তি দোষী।",
  },
  {
    term: "Cognizance",
    bengali: "আমল",
    definition:
      "The act of taking notice of an offence by a Court, starting judicial proceedings.",
    definitionBn: "আদালত কর্তৃক অপরাধের বিষয়ে বিচার শুরু।",
  },
  {
    term: "Contempt of Court",
    bengali: "আদালত অবমাননা",
    definition:
      "Disobedience or disrespect towards a court of law or its officers.",
    definitionBn: "আদালতের নির্দেশ না মানা বা অবমাননা।",
  },
  {
    term: "Cross-examination",
    bengali: "জেরা",
    definition:
      "Questioning of a witness by the opposing party after the examination-in-chief.",
    definitionBn: "প্রধান পরীক্ষার পর বিপক্ষ দল সাক্ষীকে প্রশ্ন করা।",
  },
  {
    term: "Default Bail",
    bengali: "ডিফল্ট জামিন",
    definition:
      "Bail granted under CrPC 167(2) when police fail to complete investigation within statutory period (60/90 days).",
    definitionBn: "নির্ধারিত সময়ের মধ্যে তদন্ত শেষ না হলে প্রদত্ত জামিন।",
  },
  {
    term: "Decree",
    bengali: "ডিক্রি",
    definition:
      "A formal order of a civil court that determines the rights of parties in a dispute.",
    definitionBn: "দেওযানি আদালতের লিখিত আদেশ।",
  },
  {
    term: "Detenu",
    bengali: "আটক ব্যক্তি",
    definition:
      "A person kept in custody/detention, especially under preventive detention laws.",
    definitionBn: "যে ব্যক্তি রেমান্ড বা নিরাপত্তামূ঳ক বন্দীত্বে আটক।",
  },
  {
    term: "Ex parte",
    bengali: "একতরফা রায়",
    definition:
      "A legal proceeding done with only one party present (other party absent).",
    definitionBn: "একতরফা বিচার যেখানে বিপক্ষ অনুপস্থিত।",
  },
  {
    term: "FIR (First Information Report)",
    bengali: "প্রথম তথ্য প্রতিবেদন",
    definition:
      "Report filed at police station regarding cognizable offence. Starts formal investigation.",
    definitionBn: "আমলযোগ্য অপরাধে থানায় দায়ের অভিযোগ।",
  },
  {
    term: "Habeas Corpus",
    bengali: "হেবিয়াস কর্পাস",
    definition:
      "A writ requiring a person under arrest to be brought before a judge, used to prevent unlawful detention.",
    definitionBn: "अবৈধ বন্দীত্ব প্রতিরোধে রিট।",
  },
  {
    term: "Injunction",
    bengali: "নিষেধাজ্ঞা",
    definition:
      "A court order requiring a party to do or refrain from doing specific acts.",
    definitionBn: "আদালতের নির্দেশ যা কাউকে কিছু করতে বা না করতে বলে।",
  },
  {
    term: "Judicial Custody",
    bengali: "বিচারিক হেফাজত",
    definition:
      "Custody under orders of a Magistrate (remanded to jail, not police custody).",
    definitionBn: "ম্যাজিস্ট্রেটের আদেশে দারোগারে প্রেরণ।",
  },
  {
    term: "Jurisdiction",
    bengali: "সিমা/এখতিয়ার",
    definition:
      "The official power to make legal decisions and judgements in a particular area.",
    definitionBn: "আদালতের বিচারিক ক্ষমতা বা এলাকা।",
  },
  {
    term: "Locus Standi",
    bengali: "মামলা করার অধিকার",
    definition:
      "The right or capacity to bring an action or to appear in a court.",
    definitionBn: "আদালতে মামলা দায়ের যোগ্যতা।",
  },
  {
    term: "Mandamus",
    bengali: "পরোয়ানার আদেশ",
    definition: "A court order compelling a public body to perform its duty.",
    definitionBn: "সরকারি সংস্থাকে দায়িত্ব পালনে বাধ্য করার আদেশ।",
  },
  {
    term: "Non-Cognizable Offence",
    bengali: "আমল অযোগ্য অপরাধ",
    definition:
      "Less serious offence where police cannot arrest without warrant.",
    definitionBn: "যে অপরাধে পুলিশ পরোয়ানা ছাড়া গ্রেফতার করতে পারে না।",
  },
  {
    term: "Plea Bargaining",
    bengali: "প্লি বার্গেনিং",
    definition:
      "Agreement where defendant pleads guilty in exchange for lesser charge or sentence.",
    definitionBn: "কম শাস্তির বিনিময়ে অভিযুক্ত দোষ স্বীকার করেন।",
  },
  {
    term: "Proclaimed Offender",
    bengali: "ফেরারি অপরাধী",
    definition:
      "A person declared fugitive by court for absconding to avoid legal proceedings (CrPC 82).",
    definitionBn: "আদালত থেকে পালিয়ে যাওয়া অপরাধী, যাকে রাষ্ট্র ফেরারি ঘোষণা করে।",
  },
  {
    term: "Quash",
    bengali: "বাতিল",
    definition:
      "To set aside or void a decision, order, or charge. Courts quash FIRs under CrPC 482.",
    definitionBn: "আদালত রায় বা আদেশ বাতিল করা।",
  },
  {
    term: "Remand",
    bengali: "রিমান্ড",
    definition:
      "Order sending accused back to custody (police or judicial) for further investigation or trial.",
    definitionBn: "অভিযুক্তকে পুলিশ বা বিচারিক হেফাজতে ফেরত পাঠান।",
  },
  {
    term: "Res Judicata",
    bengali: "পূর্ববিচারিত বিষয়",
    definition:
      "A matter that has been decided by a court cannot be re-litigated between same parties.",
    definitionBn: "যে বিষয়ে আদালত রায় দিয়েছে তা আবার মামলা হবে না।",
  },
  {
    term: "Stay Order",
    bengali: "স্থগিতাদেশ",
    definition:
      "A court order stopping a particular action or case temporarily.",
    definitionBn: "আদালতের আদেশ যা সাময়িকভাবে কোনো কাজ বা মামলা বন্ধ রাখে।",
  },
  {
    term: "Sub Judice",
    bengali: "বিচারাধীন",
    definition:
      "A matter currently under judicial consideration and not yet decided.",
    definitionBn: "যে বিষয় এখনো আদালতে চলমান।",
  },
  {
    term: "Summons",
    bengali: "সমন",
    definition: "A legal document requiring a person to appear before a court.",
    definitionBn: "আদালতে হাজির হতে নির্দেশ দেওয়া লিখিত নির্দেশ।",
  },
  {
    term: "Suo Motu",
    bengali: "স্বপ্রণোদিত",
    definition:
      "A court acting on its own initiative without any petition by a party.",
    definitionBn: "আদালত নিজের ইচ্ছায় মামলা গ্রহণ করে।",
  },
  {
    term: "Tort",
    bengali: "নাগরিক অন্যায়",
    definition:
      "A wrongful act or infringement of a right leading to civil liability.",
    definitionBn: "এমন ভুল কাজ যা দেওয়ানি দায়বদ্ধতা সৃষ্টি করে।",
  },
  {
    term: "Undertrial Prisoner",
    bengali: "বিচারাধীন কারাবন্দী",
    definition: "A person in jail awaiting trial (not yet convicted).",
    definitionBn: "বিচার হয়নি এমন ব্যক্তি যিনি কারাগারে আছেন।",
  },
  {
    term: "Warrant",
    bengali: "পরোয়ানা",
    definition:
      "A court document authorising police to arrest someone or search premises.",
    definitionBn: "আদালত প্রদত্ত অনুমতিপত্র গ্রেফতার বা তল্লাশির জন্য।",
  },
  {
    term: "Witness",
    bengali: "সাক্ষী",
    definition: "A person who gives evidence in a court of law.",
    definitionBn: "আদালতে সাক্ষ্য দেওয়া ব্যক্তি।",
  },
  {
    term: "Writ",
    bengali: "রিট",
    definition:
      "A formal written order issued by a court commanding someone to do or refrain from an act.",
    definitionBn: "আদালতের লিখিত নির্দেশ যা কাউকে কিছু করতে বা না করতে বলে।",
  },
  {
    term: "Zero FIR",
    bengali: "জিরো FIR",
    definition:
      "FIR filed at any police station regardless of jurisdiction — later transferred to appropriate station.",
    definitionBn: "যেকোনো থানায় দায়ের FIR যা পরে সঠিক থানায় পাঠানো হয়।",
  },
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function LawPage() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState<LawLanguage>("english");
  const [result, setResult] = useState<LawResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  // Case Finder
  const [caseQuery, setCaseQuery] = useState("");
  const [caseTopicFilter, setCaseTopicFilter] = useState("");
  // IPC vs BNS
  const [ipcBnsQuery, setIpcBnsQuery] = useState("");
  // Glossary
  const [glossaryQuery, setGlossaryQuery] = useState("");
  const [glossaryLetter, setGlossaryLetter] = useState("");

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
    }, 200);
  }

  const filteredCases = LANDMARK_CASES.filter((c) => {
    const q = caseQuery.toLowerCase();
    const topicMatch =
      !caseTopicFilter ||
      c.topics.some((t) =>
        t.toLowerCase().includes(caseTopicFilter.toLowerCase()),
      );
    const textMatch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.summary.toLowerCase().includes(q) ||
      c.topics.some((t) => t.toLowerCase().includes(q));
    return topicMatch && textMatch;
  });

  const filteredComparison = IPC_BNS_COMPARISON.filter((r) => {
    const q = ipcBnsQuery.toLowerCase();
    return (
      !q ||
      r.ipcSec.includes(q) ||
      r.bnsSec.includes(q) ||
      r.ipcTitle.toLowerCase().includes(q) ||
      r.bnsTitle.toLowerCase().includes(q)
    );
  });

  const filteredGlossary = LEGAL_GLOSSARY.filter((g) => {
    const q = glossaryQuery.toLowerCase();
    const letterMatch =
      !glossaryLetter || g.term.toUpperCase().startsWith(glossaryLetter);
    const textMatch =
      !q ||
      g.term.toLowerCase().includes(q) ||
      g.definition.toLowerCase().includes(q);
    return letterMatch && textMatch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center border border-primary/25">
          <Scale className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl">Law Section</h1>
          <p className="text-muted-foreground text-sm">
            ভারতীয় আইন সংক্রান্ত তথ্য বাংলা ও ইংরেজিতে
          </p>
        </div>
      </div>

      <Tabs defaultValue="search">
        <TabsList className="mb-6 flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="search" data-ocid="law.search.tab">
            <Search className="w-3.5 h-3.5 mr-1.5" />
            Search
          </TabsTrigger>
          <TabsTrigger value="cases" data-ocid="law.cases.tab">
            <Gavel className="w-3.5 h-3.5 mr-1.5" />
            Case Finder
          </TabsTrigger>
          <TabsTrigger value="comparison" data-ocid="law.comparison.tab">
            <Globe2 className="w-3.5 h-3.5 mr-1.5" />
            IPC vs BNS
          </TabsTrigger>
          <TabsTrigger value="glossary" data-ocid="law.glossary.tab">
            <BookOpen className="w-3.5 h-3.5 mr-1.5" />
            Legal Glossary
          </TabsTrigger>
        </TabsList>

        {/* ====== SEARCH TAB ====== */}
        <TabsContent value="search">
          {/* Language Toggle */}
          <div className="flex gap-2 mb-4">
            {(["english", "bengali"] as const).map((lang) => (
              <Button
                key={lang}
                variant={language === lang ? "default" : "outline"}
                size="sm"
                onClick={() => setLanguage(lang)}
                className="text-xs h-7"
                data-ocid="law.language.toggle"
              >
                <Languages className="w-3.5 h-3.5 mr-1" />
                {lang === "english" ? "English" : "বাংলা"}
              </Button>
            ))}
          </div>

          {/* Search box */}
          <div className="flex gap-2 mb-4" data-ocid="law.search.input">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search: IPC 302, BNS 64, CrPC 41, Article 21..."
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              data-ocid="law.input"
            />
            <Button
              onClick={() => handleSearch()}
              disabled={isSearching}
              data-ocid="law.search.button"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>

          {/* Popular quick buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {POPULAR_ACTS.map((a) => (
              <button
                key={a.query}
                type="button"
                onClick={() => {
                  setQuery(a.query);
                  handleSearch(a.query);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border text-xs hover:bg-primary/10"
                data-ocid="law.quick.button"
              >
                <Star className="w-3 h-3 text-primary" />
                <span className="font-medium">{a.label}</span>
                <span className="text-muted-foreground">— {a.desc}</span>
              </button>
            ))}
          </div>

          {/* Loading */}
          {isSearching && (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="law.loading_state"
            >
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>অনুসন্ধান হচ্ছে...</p>
            </div>
          )}

          {/* Not Found */}
          {!isSearching && notFound && (
            <div className="text-center py-12" data-ocid="law.error_state">
              <Scale className="w-10 h-10 mx-auto mb-3 text-muted-foreground/40" />
              <p className="font-semibold">কোনো ফলাফল পাওয়া যায়নি</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try: IPC 302, BNS 103, CrPC 41, Article 21
              </p>
            </div>
          )}

          {/* Result */}
          {!isSearching && result && (
            <div
              className="rounded-xl border border-border bg-card p-5 space-y-5"
              data-ocid="law.result.card"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-xl">{result.title}</h2>
                  <p className="text-sm text-muted-foreground font-medium mt-0.5">
                    {result.actName}
                  </p>
                </div>
                <Badge variant="outline" className="shrink-0">
                  {result.sectionNumber}
                </Badge>
              </div>

              {result.sectionText && (
                <div>
                  <h3 className="font-semibold text-sm mb-2 flex items-center gap-1.5">
                    <BookMarked className="w-4 h-4 text-primary" />
                    Original Section Text
                  </h3>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap bg-muted/30 p-3 rounded-lg border border-border">
                    {result.sectionText}
                  </p>
                </div>
              )}

              <Separator />

              <div>
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  Explanation
                </h3>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {result.explanation}
                </p>
              </div>

              {result.examples && result.examples.length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm mb-2">
                    📌 Practical Examples
                  </h3>
                  <ul className="space-y-1">
                    {result.examples.map((ex) => (
                      <li key={ex} className="text-sm flex gap-2">
                        <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.landmarkCases && result.landmarkCases.length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm mb-2">
                    ⚖️ Landmark Cases
                  </h3>
                  <ul className="space-y-2">
                    {result.landmarkCases.map((c) => (
                      <li
                        key={c.name}
                        className="text-sm p-2 rounded-lg bg-muted/40 border border-border"
                      >
                        <p className="font-medium">{c.name}</p>
                        {c.citation && (
                          <p className="text-xs text-muted-foreground">
                            {c.citation}
                          </p>
                        )}
                        {(c.principle || c.summary) && (
                          <p className="text-xs mt-1">
                            {c.principle ?? c.summary}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.exceptions && (
                <div>
                  <h3 className="font-semibold text-sm mb-2">
                    ⚠️ Exceptions & Provisos
                  </h3>
                  {Array.isArray(result.exceptions) ? (
                    <ul className="space-y-1">
                      {result.exceptions.map((ex) => (
                        <li key={ex} className="text-sm text-muted-foreground">
                          • {ex}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {result.exceptions}
                    </p>
                  )}
                </div>
              )}

              {result.overridingEffect && (
                <div className="p-3 rounded-lg bg-orange-400/10 border border-orange-400/30">
                  <h3 className="font-semibold text-sm text-orange-400 mb-1">
                    🔄 Overriding Effect & Cross-Laws
                  </h3>
                  <p className="text-sm">{result.overridingEffect}</p>
                </div>
              )}

              {result.relatedSections && result.relatedSections.length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm mb-2 flex items-center gap-1.5">
                    <Link2 className="w-4 h-4 text-primary" />
                    Related Sections
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.relatedSections.map((sec) => (
                      <Button
                        key={sec.ref}
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => {
                          setQuery(sec.ref);
                          handleSearch(sec.ref);
                        }}
                        data-ocid="law.related.button"
                      >
                        {sec.ref}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-xs text-muted-foreground border-t border-border pt-3">
                Source: India Code (
                <a
                  href="https://www.indiacode.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  indiacode.nic.in
                </a>
                ) — Legislative Department, Ministry of Law and Justice
              </p>
            </div>
          )}
        </TabsContent>

        {/* ====== CASE FINDER TAB ====== */}
        <TabsContent value="cases">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={caseQuery}
                onChange={(e) => setCaseQuery(e.target.value)}
                placeholder="Search cases by name, topic (e.g. bail, FIR, murder)..."
                className="flex-1"
                data-ocid="casefinder.search_input"
              />
              <Input
                value={caseTopicFilter}
                onChange={(e) => setCaseTopicFilter(e.target.value)}
                placeholder="Filter by topic..."
                className="w-40"
                data-ocid="casefinder.filter_input"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {filteredCases.length} cases found
            </p>
            <div className="space-y-3" data-ocid="casefinder.list">
              {filteredCases.map((c, idx) => (
                <div
                  key={c.name}
                  className="rounded-xl border border-border bg-card p-4"
                  data-ocid={`casefinder.item.${idx + 1}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-sm">{c.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {c.citation} · {c.court} · {c.year}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {c.topics.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c.summary}
                  </p>
                </div>
              ))}
              {filteredCases.length === 0 && (
                <div
                  className="text-center py-12 text-muted-foreground"
                  data-ocid="casefinder.empty_state"
                >
                  <Gavel className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p>No cases found. Try a different search term.</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* ====== IPC vs BNS TAB ====== */}
        <TabsContent value="comparison">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              The Bharatiya Nyaya Sanhita, 2023 (BNS) replaces the Indian Penal
              Code, 1860 (IPC). Below is a section-wise comparison.
            </p>
            <Input
              value={ipcBnsQuery}
              onChange={(e) => setIpcBnsQuery(e.target.value)}
              placeholder="Search by section number or title..."
              data-ocid="comparison.search_input"
            />
            <p className="text-xs text-muted-foreground">
              {filteredComparison.length} rows found
            </p>
            <div
              className="rounded-xl border border-border overflow-hidden"
              data-ocid="comparison.table"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left px-4 py-2 font-semibold text-xs w-16">
                        IPC §
                      </th>
                      <th className="text-left px-4 py-2 font-semibold text-xs">
                        IPC Title
                      </th>
                      <th className="text-left px-4 py-2 font-semibold text-xs w-16">
                        BNS §
                      </th>
                      <th className="text-left px-4 py-2 font-semibold text-xs">
                        BNS Title
                      </th>
                      <th className="text-left px-4 py-2 font-semibold text-xs w-40 hidden sm:table-cell">
                        Note
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredComparison.map((r, idx) => (
                      <tr
                        key={`${r.ipcSec}-${r.bnsSec}`}
                        className="border-b border-border/50 hover:bg-muted/30"
                        data-ocid={`comparison.row.${idx + 1}`}
                      >
                        <td className="px-4 py-2 font-mono text-xs font-bold text-primary">
                          {r.ipcSec}
                        </td>
                        <td className="px-4 py-2 text-xs">{r.ipcTitle}</td>
                        <td className="px-4 py-2 font-mono text-xs font-bold text-orange-400">
                          {r.bnsSec}
                        </td>
                        <td className="px-4 py-2 text-xs">{r.bnsTitle}</td>
                        <td className="px-4 py-2 text-xs text-muted-foreground hidden sm:table-cell">
                          {r.note}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ====== GLOSSARY TAB ====== */}
        <TabsContent value="glossary">
          <div className="space-y-4">
            <Input
              value={glossaryQuery}
              onChange={(e) => {
                setGlossaryQuery(e.target.value);
                setGlossaryLetter("");
              }}
              placeholder="Search legal terms..."
              data-ocid="glossary.search_input"
            />
            <div className="flex flex-wrap gap-1">
              <button
                type="button"
                onClick={() => setGlossaryLetter("")}
                className={`px-2 py-0.5 rounded text-xs font-medium border ${!glossaryLetter ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"}`}
              >
                All
              </button>
              {ALPHABET.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => {
                    setGlossaryLetter(l);
                    setGlossaryQuery("");
                  }}
                  className={`px-2 py-0.5 rounded text-xs font-medium border ${glossaryLetter === l ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {filteredGlossary.length} terms
            </p>
            <div className="space-y-3" data-ocid="glossary.list">
              {filteredGlossary.map((g, idx) => (
                <div
                  key={g.term}
                  className="rounded-xl border border-border bg-card p-4"
                  data-ocid={`glossary.item.${idx + 1}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-sm">{g.term}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {g.bengali}
                    </Badge>
                  </div>
                  <p className="text-sm mb-1">{g.definition}</p>
                  <p className="text-sm text-muted-foreground">
                    {g.definitionBn}
                  </p>
                </div>
              ))}
              {filteredGlossary.length === 0 && (
                <div
                  className="text-center py-10 text-muted-foreground"
                  data-ocid="glossary.empty_state"
                >
                  <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p>No terms found.</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
