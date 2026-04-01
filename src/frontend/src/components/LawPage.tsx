import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  Filter,
  Gavel,
  Globe2,
  GraduationCap,
  Languages,
  Lightbulb,
  Link2,
  Scale,
  Search,
  Share2,
  Star,
  Wand2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { LawLanguage, LawResult } from "../lib/lawSolver";
import { generateLawExplanation, getAllLawEntries } from "../lib/lawSolver";
import { CourtTour3D } from "./CourtTour3D";
import { DocumentChecker } from "./DocumentChecker";
import { LawNewsTicker, loadJudgments } from "./LawNewsTicker";
import type { JudgmentEntry } from "./LawNewsTicker";

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
      "Right to speedy trial is implicit in Article 21. | দ্রুত বিচারের অধিকার আর্টিকেল 21-এ নিহিত।",
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
    name: "Baxi Amrik Singh v. Union of India",
    citation: "(2019) Case",
    court: "Supreme Court of India",
    year: 2019,
    topics: ["Anticipatory Bail", "CrPC 438"],
    summary:
      "Anticipatory bail cannot be time-bound; once granted, it operates till end of trial. | অ্যান্টিসিপেটোরি জামিন সময়সীমাবদ্ধ নয়।",
  },
];

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
    note: "Similar provision",
  },
  {
    ipcSec: "498A",
    ipcTitle: "Cruelty by Husband",
    bnsSec: "85",
    bnsTitle: "Cruelty by husband or relatives",
    note: "Similar provision",
  },
  {
    ipcSec: "300",
    ipcTitle: "Murder (definition)",
    bnsSec: "100",
    bnsTitle: "Murder (definition)",
    note: "Similar provision",
  },
  {
    ipcSec: "323",
    ipcTitle: "Voluntarily causing hurt",
    bnsSec: "115",
    bnsTitle: "Voluntarily causing hurt",
    note: "Similar provision",
  },
  {
    ipcSec: "324",
    ipcTitle: "Causing hurt by dangerous weapons",
    bnsSec: "117",
    bnsTitle: "Voluntarily causing hurt by dangerous weapons",
    note: "Similar provision",
  },
  {
    ipcSec: "363",
    ipcTitle: "Kidnapping",
    bnsSec: "137",
    bnsTitle: "Kidnapping",
    note: "Similar provision",
  },
  {
    ipcSec: "364A",
    ipcTitle: "Kidnapping for Ransom",
    bnsSec: "140",
    bnsTitle: "Kidnapping for ransom",
    note: "Similar provision",
  },
  {
    ipcSec: "465",
    ipcTitle: "Forgery",
    bnsSec: "336",
    bnsTitle: "Forgery",
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
    definition: "Serious crime where police can arrest without warrant.",
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
    term: "Default Bail",
    bengali: "ডিফল্ট জামিন",
    definition:
      "Bail granted under CrPC 167(2) when police fail to complete investigation within statutory period.",
    definitionBn: "নির্ধারিত সময়ের মধ্যে তদন্ত শেষ না হলে প্রদত্ত জামিন।",
  },
  {
    term: "Decree",
    bengali: "ডিক্রি",
    definition:
      "A formal order of a civil court that determines the rights of parties in a dispute.",
    definitionBn: "দেওয়ানি আদালতের লিখিত আদেশ।",
  },
  {
    term: "Ex parte",
    bengali: "একতরফা রায়",
    definition: "A legal proceeding done with only one party present.",
    definitionBn: "একতরফা বিচার যেখানে বিপক্ষ অনুপস্থিত।",
  },
  {
    term: "FIR (First Information Report)",
    bengali: "প্রথম তথ্য প্রতিবেদন",
    definition: "Report filed at police station regarding cognizable offence.",
    definitionBn: "আমলযোগ্য অপরাধে থানায় দায়ের অভিযোগ।",
  },
  {
    term: "Habeas Corpus",
    bengali: "হেবিয়াস কর্পাস",
    definition:
      "A writ requiring a person under arrest to be brought before a judge.",
    definitionBn: "অবৈধ বন্দীত্ব প্রতিরোধে রিট।",
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
    definitionBn: "ম্যাজিস্ট্রেটের আদেশে কারাগারে প্রেরণ।",
  },
  {
    term: "Jurisdiction",
    bengali: "এখতিয়ার",
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
    definitionBn: "যে অপরাধে পুলিশ পরোয়ানা ছাড়া গ্রেফতার করতে পারে না।",
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
    definitionBn: "আদালত থেকে পালিয়ে যাওয়া অপরাধী।",
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
      "Order sending accused back to custody for further investigation or trial.",
    definitionBn: "অভিযুক্তকে হেফাজতে ফেরত পাঠান।",
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
    definitionBn: "আদালতের লিখিত নির্দেশ।",
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

const LAW_STYLES = `
  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes lawSpin {
    to { transform: rotate(360deg); }
  }
  .law-result-card {
    animation: slideInUp 0.4s ease-out;
  }
  .law-card {
    background: #0f2040;
    border: 1px solid rgba(201,168,76,0.3);
    border-radius: 12px;
    transition: border-color 0.2s, background 0.2s;
  }
  .law-card:hover {
    border-color: rgba(201,168,76,0.6);
    background: #132850;
  }
  .law-badge-capital { background: #8b0000; color: #ffd0d0; border: 1px solid #c00; }
  .law-badge-severe { background: #7a3000; color: #ffd4b0; border: 1px solid #c45000; }
  .law-badge-moderate { background: #5a4000; color: #ffe8a0; border: 1px solid #c9a84c; }
  .law-badge-minor { background: #0d3d30; color: #a0f0d8; border: 1px solid #2a6b5e; }
  @media print {
    body > * { display: none !important; }
    .law-print-section { display: block !important; position: fixed; top: 0; left: 0; width: 100%; padding: 40px; font-family: Georgia, serif; color: #000; background: #fff; }
  }
  @media (max-width: 640px) {
    .law-two-col { grid-template-columns: 1fr !important; }
  }
`;

interface RecentlyViewedItem {
  id: string;
  title: string;
  query: string;
  timestamp: number;
}

function getPunishmentSeverity(
  result: LawResult,
): "Capital" | "Severe" | "Moderate" | "Minor" {
  const text =
    `${result.sectionText ?? ""} ${result.explanation ?? ""}`.toLowerCase();
  if (
    text.includes("death penalty") ||
    text.includes("capital punishment") ||
    text.includes("death")
  )
    return "Capital";
  if (
    text.includes("life imprisonment") ||
    text.includes("rigorous imprisonment") ||
    text.includes("7 years")
  )
    return "Severe";
  if (text.includes("imprisonment") || text.includes("3 years"))
    return "Moderate";
  return "Minor";
}

function SealSVG() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="32"
        cy="32"
        r="30"
        stroke="#c9a84c"
        strokeWidth="2"
        fill="none"
      />
      <circle
        cx="32"
        cy="32"
        r="26"
        stroke="#c9a84c"
        strokeWidth="0.8"
        strokeDasharray="4 3"
        fill="none"
      />
      <line
        x1="32"
        y1="20"
        x2="32"
        y2="44"
        stroke="#c9a84c"
        strokeWidth="1.5"
      />
      <line
        x1="18"
        y1="26"
        x2="46"
        y2="26"
        stroke="#c9a84c"
        strokeWidth="1.5"
      />
      <line x1="20" y1="26" x2="18" y2="34" stroke="#c9a84c" strokeWidth="1" />
      <line x1="20" y1="26" x2="22" y2="34" stroke="#c9a84c" strokeWidth="1" />
      <path
        d="M16 34 Q20 37 24 34"
        stroke="#c9a84c"
        strokeWidth="1.5"
        fill="none"
      />
      <line x1="44" y1="26" x2="42" y2="34" stroke="#c9a84c" strokeWidth="1" />
      <line x1="44" y1="26" x2="46" y2="34" stroke="#c9a84c" strokeWidth="1" />
      <path
        d="M40 34 Q44 37 48 34"
        stroke="#c9a84c"
        strokeWidth="1.5"
        fill="none"
      />
      <line
        x1="26"
        y1="44"
        x2="38"
        y2="44"
        stroke="#c9a84c"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function LawPage() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState<LawLanguage>("english");
  const [result, setResult] = useState<LawResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedItem[]>(
    [],
  );
  const [showRecent, setShowRecent] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [filterAct, setFilterAct] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterPunishment, setFilterPunishment] = useState("All");
  const [browseMode, setBrowseMode] = useState(false);
  const [browseEntries, setBrowseEntries] = useState<
    Array<{
      key: string;
      title: string;
      actName: string;
      sectionNumber: string;
      explanation: string;
    }>
  >([]);
  const [caseQuery, setCaseQuery] = useState("");
  const [caseTopicFilter, setCaseTopicFilter] = useState("");
  const [ipcBnsQuery, setIpcBnsQuery] = useState("");
  const [glossaryQuery, setGlossaryQuery] = useState("");
  const [glossaryLetter, setGlossaryLetter] = useState("");
  const [judgments, _setJudgments] = useState<JudgmentEntry[]>(() =>
    loadJudgments(),
  );
  const [aiSimplifierInput, setAiSimplifierInput] = useState("");
  const [aiSimplifierResult, setAiSimplifierResult] = useState<null | {
    simple: string;
    points: string[];
    action: string;
    english: string;
  }>(null);
  const [aiAdvisorInput, setAiAdvisorInput] = useState("");
  const [aiAdvisorResult, setAiAdvisorResult] = useState<null | {
    laws: Array<{
      title: string;
      sections: string[];
      rights: string[];
      steps: string[];
    }>;
  }>(null);
  const [flashcardFilter, setFlashcardFilter] = useState("All");
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [moreLawsCategory, setMoreLawsCategory] = useState<
    "ipr" | "banking" | "env" | null
  >(null);
  const [moreLawsQuery, setMoreLawsQuery] = useState("");
  const [moreLawsResult, setMoreLawsResult] = useState<LawResult | null>(null);

  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("law_recently_viewed");
      if (stored) setRecentlyViewed(JSON.parse(stored));
    } catch (_) {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lawParam = params.get("law");
    if (lawParam) {
      setQuery(lawParam);
      runSearch(lawParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function saveToRecent(res: LawResult, q: string) {
    const item: RecentlyViewedItem = {
      id: q.trim().toLowerCase().replace(/\s+/g, "_"),
      title: res.title ?? q,
      query: q,
      timestamp: Date.now(),
    };
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((r) => r.id !== item.id);
      const updated = [item, ...filtered].slice(0, 10);
      try {
        localStorage.setItem("law_recently_viewed", JSON.stringify(updated));
      } catch (_) {
        /* ignore */
      }
      return updated;
    });
  }

  function runSearch(q: string) {
    if (!q.trim()) return;
    setIsSearching(true);
    setNotFound(false);
    setTimeout(() => {
      const res = generateLawExplanation(q, language);
      if (res) {
        setResult(res);
        setNotFound(false);
        saveToRecent(res, q);
      } else {
        setResult(null);
        setNotFound(true);
      }
      setIsSearching(false);
    }, 200);
  }

  function handleSearch(q?: string) {
    runSearch(q ?? query);
  }

  function handleShare() {
    const url = `${window.location.origin}${window.location.pathname}?law=${encodeURIComponent(query)}`;
    navigator.clipboard.writeText(url).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  }

  function shareOnWhatsApp(title: string, shareContent: string) {
    const preview = shareContent.substring(0, 300);
    const message = `📚 *Vidya Setu AI*
⚖️ *${title}*

${preview}...

🔗 Vidya Setu AI - আপনার আইনি শিক্ষার সঙ্গী`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  }

  function resultPassesFilter(): boolean {
    if (!result) return true;
    if (filterAct !== "All") {
      const actUpper = (result.actName ?? "").toUpperCase();
      const queryUpper = query.toUpperCase();
      const actMap: Record<string, string[]> = {
        IPC: ["IPC", "INDIAN PENAL"],
        BNS: ["BNS", "BHARATIYA NYAYA"],
        CrPC: ["CRPC", "CRIMINAL PROCEDURE"],
        "IT Act": ["IT ACT", "INFORMATION TECHNOLOGY"],
        "Contract Act": ["CONTRACT"],
        HMA: ["HMA", "HINDU MARRIAGE"],
        Constitution: ["CONSTITUTION", "ARTICLE"],
      };
      const keys = actMap[filterAct] ?? [filterAct.toUpperCase()];
      if (!keys.some((k) => actUpper.includes(k) || queryUpper.includes(k)))
        return false;
    }
    if (filterCategory !== "All") {
      const actUpper = (result.actName ?? "").toUpperCase();
      const isConstitutional =
        actUpper.includes("CONSTITUTION") || actUpper.includes("ARTICLE");
      const isCivil =
        actUpper.includes("CONTRACT") ||
        actUpper.includes("HMA") ||
        actUpper.includes("HINDU MARRIAGE") ||
        actUpper.includes("SUCCESSION") ||
        actUpper.includes("CIVIL");
      const isCriminal = !isConstitutional && !isCivil;
      if (filterCategory === "Criminal" && !isCriminal) return false;
      if (filterCategory === "Civil" && !isCivil) return false;
      if (filterCategory === "Constitutional" && !isConstitutional)
        return false;
    }
    if (filterPunishment !== "All") {
      const sev = getPunishmentSeverity(result);
      const desc =
        `${result.sectionText ?? ""} ${result.explanation ?? ""}`.toUpperCase();
      const hasDeath = sev === "Capital" || desc.includes("DEATH");
      const hasImprisonment =
        hasDeath ||
        sev === "Severe" ||
        sev === "Moderate" ||
        desc.includes("IMPRISONMENT") ||
        desc.includes("PRISON");
      const hasFine = desc.includes("FINE") || desc.includes("PENALTY");
      const hasBoth = hasImprisonment && hasFine;
      if (filterPunishment === "Death" && !hasDeath) return false;
      if (filterPunishment === "Imprisonment" && !hasImprisonment) return false;
      if (filterPunishment === "Fine" && !hasFine) return false;
      if (filterPunishment === "Both" && !hasBoth) return false;
    }
    return true;
  }

  // Browse mode: activate when any filter is not "All"
  useEffect(() => {
    const isFiltered =
      filterAct !== "All" ||
      filterCategory !== "All" ||
      filterPunishment !== "All";
    if (!isFiltered) {
      setBrowseMode(false);
      setBrowseEntries([]);
      return;
    }
    setBrowseMode(true);
    const all = getAllLawEntries();
    const filtered = all.filter((entry) => {
      if (filterAct !== "All") {
        const actUpper = entry.actName.toUpperCase();
        const actMap: Record<string, string[]> = {
          IPC: ["IPC", "INDIAN PENAL"],
          BNS: ["BNS", "BHARATIYA NYAYA"],
          CrPC: ["CRPC", "CRIMINAL PROCEDURE"],
          "IT Act": ["IT ACT", "INFORMATION TECHNOLOGY"],
          "Contract Act": ["CONTRACT"],
          HMA: ["HMA", "HINDU MARRIAGE"],
          Constitution: ["CONSTITUTION", "ARTICLE"],
        };
        const keys = actMap[filterAct] ?? [filterAct.toUpperCase()];
        if (!keys.some((k) => actUpper.includes(k))) return false;
      }
      if (filterCategory !== "All") {
        const actUpper = entry.actName.toUpperCase();
        const isConstitutional =
          actUpper.includes("CONSTITUTION") || actUpper.includes("ARTICLE");
        const isCivil =
          actUpper.includes("CONTRACT") ||
          actUpper.includes("HMA") ||
          actUpper.includes("HINDU MARRIAGE") ||
          actUpper.includes("SUCCESSION");
        const isCriminal = !isConstitutional && !isCivil;
        if (filterCategory === "Criminal" && !isCriminal) return false;
        if (filterCategory === "Civil" && !isCivil) return false;
        if (filterCategory === "Constitutional" && !isConstitutional)
          return false;
      }
      if (filterPunishment !== "All") {
        const sev = entry.punishmentSeverity || "";
        const desc = `${entry.sectionText} ${entry.explanation}`.toUpperCase();
        const hasDeath = sev === "Capital" || desc.includes("DEATH");
        const hasImprisonment =
          hasDeath ||
          sev === "Severe" ||
          sev === "Moderate" ||
          desc.includes("IMPRISONMENT");
        const hasFine = desc.includes("FINE") || desc.includes("PENALTY");
        const hasBoth = hasImprisonment && hasFine;
        if (filterPunishment === "Death" && !hasDeath) return false;
        if (filterPunishment === "Imprisonment" && !hasImprisonment)
          return false;
        if (filterPunishment === "Fine" && !hasFine) return false;
        if (filterPunishment === "Both" && !hasBoth) return false;
      }
      return true;
    });
    setBrowseEntries(filtered);
  }, [filterAct, filterCategory, filterPunishment]);

  const severity = result ? getPunishmentSeverity(result) : null;
  const severityBadgeClass =
    severity === "Capital"
      ? "law-badge-capital"
      : severity === "Severe"
        ? "law-badge-severe"
        : severity === "Moderate"
          ? "law-badge-moderate"
          : "law-badge-minor";
  const severityIcon =
    severity === "Capital"
      ? "☠️"
      : severity === "Severe"
        ? "🔴"
        : severity === "Moderate"
          ? "🟡"
          : "🟢";

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

  // Shared style helpers
  const navyCard = {
    background: "#0f2040",
    border: "1px solid rgba(201,168,76,0.3)",
    borderRadius: "12px",
  };
  const goldText = { color: "#c9a84c" };
  const mutedText = { color: "#a89060" };
  const primaryText = { color: "#f0e6d0" };
  const inputStyle = {
    background: "#0f2040",
    border: "1px solid rgba(201,168,76,0.4)",
    borderRadius: "8px",
    padding: "10px 14px",
    color: "#f0e6d0",
    outline: "none",
    width: "100%",
    boxSizing: "border-box" as const,
  };
  const labelStyle = {
    fontWeight: "700" as const,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  };

  return (
    <div
      style={{ background: "#0a1628", color: "#f0e6d0", minHeight: "100vh" }}
    >
      <style>{LAW_STYLES}</style>

      {/* Print section */}
      <div
        className="law-print-section"
        ref={printRef}
        style={{ display: "none" }}
      >
        {result && (
          <div
            style={{
              fontFamily: "Georgia, serif",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                textAlign: "center",
                borderBottom: "3px double #000",
                paddingBottom: "16px",
                marginBottom: "24px",
              }}
            >
              <h1 style={{ fontSize: "22px", fontWeight: "bold" }}>
                REPUBLIC OF INDIA — LEGAL REFERENCE
              </h1>
              <p style={{ fontSize: "12px", color: "#555" }}>
                Source: India Code — indiacode.nic.in | Ministry of Law &
                Justice
              </p>
            </div>
            <h2 style={{ fontSize: "18px", marginBottom: "4px" }}>
              {result.title}
            </h2>
            <p
              style={{ fontSize: "13px", color: "#444", marginBottom: "16px" }}
            >
              {result.actName}
            </p>
            {result.sectionText && (
              <div
                style={{
                  background: "#f5f5f5",
                  padding: "12px",
                  borderLeft: "4px solid #333",
                  marginBottom: "16px",
                }}
              >
                <strong>Original Section Text:</strong>
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: "12px",
                    marginTop: "8px",
                  }}
                >
                  {result.sectionText}
                </p>
              </div>
            )}
            <div style={{ marginBottom: "16px" }}>
              <strong>Explanation:</strong>
              <p style={{ marginTop: "8px", lineHeight: "1.6" }}>
                {result.explanation}
              </p>
            </div>
            {result.landmarkCases && result.landmarkCases.length > 0 && (
              <div style={{ marginBottom: "16px" }}>
                <strong>Landmark Cases:</strong>
                {result.landmarkCases.map((c) => (
                  <div
                    key={c.name}
                    style={{
                      marginTop: "8px",
                      paddingLeft: "12px",
                      borderLeft: "2px solid #ccc",
                    }}
                  >
                    <p style={{ fontWeight: "bold", fontSize: "13px" }}>
                      {c.name}
                    </p>
                    {c.citation && (
                      <p style={{ fontSize: "11px", color: "#666" }}>
                        {c.citation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div
              style={{
                borderTop: "1px solid #ccc",
                paddingTop: "12px",
                marginTop: "24px",
                fontSize: "11px",
                color: "#666",
              }}
            >
              <p>
                ⚖️ Legal Disclaimer: Educational purposes only. Not legal advice.
              </p>
              <p>
                Authoritative Source: indiacode.nic.in — Legislative Department,
                Ministry of Law and Justice
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Official Seal Header */}
      <header
        style={{
          background:
            "linear-gradient(135deg, #07101f 0%, #0a1628 50%, #0d1f3c 100%)",
          borderBottom: "2px solid rgba(201,168,76,0.5)",
          padding: "40px 24px 32px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <SealSVG />
          <div>
            <h1
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(22px, 4vw, 36px)",
                fontWeight: "700",
                color: "#f0e6d0",
                letterSpacing: "0.04em",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Law Section <span style={goldText}>/</span> আইন বিভাগ
            </h1>
            <p
              style={{
                color: "#c9a84c",
                fontSize: "13px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginTop: "8px",
                fontFamily: "Georgia, serif",
              }}
            >
              Indian Legal Reference — Bilingual
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: "24px",
              fontSize: "11px",
              color: "#a89060",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <span>IPC • BNS • CrPC</span>
            <span style={goldText}>⚖</span>
            <span>IT Act • Contract Act • HMA</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 16px" }}
      >
        <LawNewsTicker judgments={judgments} />
        <Tabs defaultValue="search">
          <TabsList
            style={{
              background: "#07101f",
              border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: "10px",
              padding: "4px",
              marginBottom: "28px",
              display: "flex",
              flexWrap: "wrap",
              height: "auto",
              gap: "2px",
            }}
          >
            {[
              {
                value: "search",
                icon: <Search className="w-3.5 h-3.5" />,
                label: "Search",
              },
              {
                value: "cases",
                icon: <Gavel className="w-3.5 h-3.5" />,
                label: "Case Finder",
              },
              {
                value: "comparison",
                icon: <Globe2 className="w-3.5 h-3.5" />,
                label: "IPC vs BNS",
              },
              {
                value: "glossary",
                icon: <BookOpen className="w-3.5 h-3.5" />,
                label: "Legal Glossary",
              },
              {
                value: "court-tour",
                icon: <Globe2 className="w-3.5 h-3.5" />,
                label: "3D Court Tour",
              },
              {
                value: "doc-checker",
                icon: <BookMarked className="w-3.5 h-3.5" />,
                label: "Doc Checker",
              },
              {
                value: "ai-tools",
                icon: <Wand2 className="w-3.5 h-3.5" />,
                label: "AI Tools",
              },
              {
                value: "flashcards",
                icon: <GraduationCap className="w-3.5 h-3.5" />,
                label: "Flashcards",
              },
              {
                value: "more-laws",
                icon: <Scale className="w-3.5 h-3.5" />,
                label: "More Laws",
              },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                data-ocid={`law.${tab.value}.tab`}
                style={{ gap: "6px" }}
                className="data-[state=active]:bg-[#c9a84c] data-[state=active]:text-[#0a1628] data-[state=active]:font-bold text-[#a89060] hover:text-[#f0e6d0] transition-colors"
              >
                {tab.icon}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ====== SEARCH TAB ====== */}
          <TabsContent value="search">
            {/* Language Toggle */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              {(["english", "bengali"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  data-ocid="law.language.toggle"
                  style={{
                    padding: "6px 16px",
                    borderRadius: "6px",
                    border: `1px solid ${language === lang ? "#c9a84c" : "rgba(201,168,76,0.3)"}`,
                    background:
                      language === lang
                        ? "rgba(201,168,76,0.15)"
                        : "transparent",
                    color: language === lang ? "#c9a84c" : "#a89060",
                    fontSize: "12px",
                    cursor: "pointer",
                    fontWeight: language === lang ? 600 : 400,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Languages className="w-3.5 h-3.5" />
                  {lang === "english" ? "English" : "বাংলা"}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div
              style={{ display: "flex", gap: "8px", marginBottom: "8px" }}
              data-ocid="law.search.input"
            >
              <div style={{ flex: 1, position: "relative" }}>
                <Search
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#a89060",
                    width: "16px",
                    height: "16px",
                  }}
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by section number (IPC 302), keyword (murder), or topic (bail)..."
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  data-ocid="law.input"
                  style={{ ...inputStyle, paddingLeft: "40px" }}
                />
              </div>
              <button
                type="button"
                onClick={() => handleSearch()}
                disabled={isSearching}
                data-ocid="law.search.button"
                style={{
                  background: "linear-gradient(135deg, #c9a84c, #a88030)",
                  color: "#0a1628",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  fontWeight: "700",
                  fontSize: "13px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  whiteSpace: "nowrap",
                }}
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
            <p style={{ ...mutedText, fontSize: "11px", marginBottom: "20px" }}>
              💡 Tip: Try "IPC 302", "bail", "CrPC 438", "Article 21", "Contract
              Act 10"
            </p>

            {/* Popular Chips */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "20px",
              }}
            >
              {POPULAR_ACTS.map((a) => (
                <button
                  key={a.query}
                  type="button"
                  onClick={() => {
                    setQuery(a.query);
                    handleSearch(a.query);
                  }}
                  data-ocid="law.quick.button"
                  style={{
                    background: "rgba(201,168,76,0.08)",
                    border: "1px solid rgba(201,168,76,0.3)",
                    borderRadius: "20px",
                    padding: "4px 12px",
                    color: "#c9a84c",
                    fontSize: "11px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Star style={{ width: "10px", height: "10px" }} />
                  <span style={{ fontWeight: "600" }}>{a.label}</span>
                  <span style={mutedText}>— {a.desc}</span>
                </button>
              ))}
            </div>

            {/* Recently Viewed */}
            {recentlyViewed.length > 0 && (
              <div
                style={{
                  ...navyCard,
                  marginBottom: "20px",
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowRecent((v) => !v)}
                  data-ocid="law.recent.toggle"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 16px",
                    background: "transparent",
                    border: "none",
                    color: "#c9a84c",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Clock className="w-3.5 h-3.5" /> Recently Viewed (
                    {recentlyViewed.length})
                  </span>
                  {showRecent ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {showRecent && (
                  <div
                    style={{
                      padding: "8px 16px 16px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    {recentlyViewed.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setQuery(item.query);
                          handleSearch(item.query);
                        }}
                        data-ocid="law.recent.button"
                        style={{
                          background: "rgba(201,168,76,0.1)",
                          border: "1px solid rgba(201,168,76,0.3)",
                          borderRadius: "16px",
                          padding: "4px 12px",
                          color: "#f0e6d0",
                          fontSize: "11px",
                          cursor: "pointer",
                        }}
                      >
                        {item.title || item.query}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Filter Bar */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "20px",
                padding: "14px 16px",
                background: "#0d1f3c",
                border: "1px solid rgba(201,168,76,0.25)",
                borderRadius: "10px",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  ...goldText,
                  fontSize: "12px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Filter className="w-3.5 h-3.5" /> Filters
              </span>
              {[
                {
                  label: "Act",
                  value: filterAct,
                  setter: setFilterAct,
                  options: [
                    "All",
                    "IPC",
                    "BNS",
                    "CrPC",
                    "IT Act",
                    "Contract Act",
                    "HMA",
                    "Constitution",
                  ],
                },
                {
                  label: "Category",
                  value: filterCategory,
                  setter: setFilterCategory,
                  options: ["All", "Criminal", "Civil", "Constitutional"],
                },
                {
                  label: "Punishment",
                  value: filterPunishment,
                  setter: setFilterPunishment,
                  options: ["All", "Imprisonment", "Fine", "Both", "Death"],
                },
              ].map(({ label, value, setter, options }) => (
                <div
                  key={label}
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <span style={{ ...mutedText, fontSize: "11px" }}>
                    {label}:
                  </span>
                  <select
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    data-ocid="law.filter.select"
                    style={{
                      background: "#0f2040",
                      border: "1px solid rgba(201,168,76,0.3)",
                      borderRadius: "6px",
                      padding: "4px 8px",
                      color: value !== "All" ? "#c9a84c" : "#a89060",
                      fontSize: "12px",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    {options.map((o) => (
                      <option
                        key={o}
                        value={o}
                        style={{ background: "#0f2040", color: "#f0e6d0" }}
                      >
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Loading */}
            {isSearching && (
              <div
                data-ocid="law.loading_state"
                style={{ textAlign: "center", padding: "48px 0", ...mutedText }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "3px solid rgba(201,168,76,0.2)",
                    borderTop: "3px solid #c9a84c",
                    borderRadius: "50%",
                    animation: "lawSpin 0.8s linear infinite",
                    margin: "0 auto 12px",
                  }}
                />
                <p style={{ fontSize: "13px" }}>Searching legal database...</p>
              </div>
            )}

            {/* Not Found */}
            {notFound && !isSearching && (
              <div
                data-ocid="law.empty_state"
                style={{
                  textAlign: "center",
                  padding: "48px 24px",
                  background: "#0d1f3c",
                  border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: "12px",
                }}
              >
                <Scale
                  style={{
                    width: "48px",
                    height: "48px",
                    color: "rgba(201,168,76,0.3)",
                    margin: "0 auto 12px",
                  }}
                />
                <p
                  style={{
                    ...mutedText,
                    fontSize: "14px",
                    marginBottom: "8px",
                  }}
                >
                  No section found for "{query}"
                </p>
                <p style={{ color: "#6a6050", fontSize: "12px" }}>
                  Try: "IPC 302", "Article 21", "CrPC 438", or "bail"
                </p>
              </div>
            )}

            {/* Browse Mode: show filtered entries */}
            {browseMode && !isSearching && (
              <div data-ocid="law.browse.panel" style={{ marginTop: "8px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{ ...goldText, fontSize: "13px", fontWeight: "600" }}
                  >
                    🔍 {browseEntries.length} entries found
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setFilterAct("All");
                      setFilterCategory("All");
                      setFilterPunishment("All");
                    }}
                    data-ocid="law.filter.cancel_button"
                    style={{
                      background: "rgba(201,168,76,0.15)",
                      border: "1px solid rgba(201,168,76,0.4)",
                      borderRadius: "6px",
                      padding: "4px 10px",
                      color: "#c9a84c",
                      fontSize: "11px",
                      cursor: "pointer",
                    }}
                  >
                    ✕ Clear Filters
                  </button>
                </div>
                {browseEntries.length === 0 ? (
                  <div
                    data-ocid="law.browse.empty_state"
                    style={{
                      textAlign: "center",
                      padding: "32px",
                      ...mutedText,
                      fontSize: "13px",
                    }}
                  >
                    No sections match the selected filters.
                  </div>
                ) : (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(260px, 1fr))",
                      gap: "10px",
                    }}
                  >
                    {browseEntries.slice(0, 60).map((entry, idx) => (
                      <button
                        key={entry.key}
                        type="button"
                        data-ocid={`law.browse.item.${idx + 1}`}
                        onClick={() => {
                          setQuery(entry.key);
                          setBrowseMode(false);
                          setFilterAct("All");
                          setFilterCategory("All");
                          setFilterPunishment("All");
                          setTimeout(() => {
                            setIsSearching(true);
                            setResult(null);
                            setNotFound(false);
                            setTimeout(() => {
                              const r = generateLawExplanation(
                                entry.key,
                                language,
                              );
                              if (r) {
                                setResult(r);
                                setNotFound(false);
                              } else {
                                setNotFound(true);
                              }
                              setIsSearching(false);
                            }, 300);
                          }, 50);
                        }}
                        style={{
                          background: "#0d1f3c",
                          border: "1px solid rgba(201,168,76,0.3)",
                          borderRadius: "8px",
                          padding: "10px 12px",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "border-color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor =
                            "rgba(201,168,76,0.7)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor =
                            "rgba(201,168,76,0.3)";
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: "8px",
                          }}
                        >
                          <span
                            style={{
                              ...goldText,
                              fontSize: "12px",
                              fontWeight: "700",
                            }}
                          >
                            {entry.key}
                          </span>
                          <span
                            style={{
                              ...mutedText,
                              fontSize: "10px",
                              background: "rgba(201,168,76,0.1)",
                              padding: "2px 6px",
                              borderRadius: "10px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {entry.actName.substring(0, 20)}
                          </span>
                        </div>
                        <div
                          style={{
                            color: "#e8d8b8",
                            fontSize: "12px",
                            fontWeight: "600",
                            marginTop: "4px",
                            marginBottom: "4px",
                          }}
                        >
                          {entry.title}
                        </div>
                        <div
                          style={{
                            ...mutedText,
                            fontSize: "11px",
                            lineHeight: "1.4",
                          }}
                        >
                          {entry.explanation.substring(0, 90)}…
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {browseEntries.length > 60 && (
                  <div
                    style={{
                      ...mutedText,
                      fontSize: "12px",
                      textAlign: "center",
                      marginTop: "8px",
                    }}
                  >
                    Showing 60 of {browseEntries.length} results. Narrow your
                    filters for more specific results.
                  </div>
                )}
              </div>
            )}

            {/* Filter mismatch */}
            {result && !isSearching && !resultPassesFilter() && (
              <div
                data-ocid="law.filter.empty_state"
                style={{
                  padding: "16px",
                  background: "#0d1f3c",
                  border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: "10px",
                  ...mutedText,
                  fontSize: "13px",
                  textAlign: "center",
                }}
              >
                ⚠️ No match for current filters. Try adjusting the Act or
                Category filter.
              </div>
            )}

            {/* Result Card */}
            {result && !isSearching && resultPassesFilter() && (
              <div className="law-result-card" data-ocid="law.result.card">
                {/* Card Header */}
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #0d1f3c 0%, #0f2855 100%)",
                    border: "1px solid rgba(201,168,76,0.5)",
                    borderRadius: "12px 12px 0 0",
                    padding: "20px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "16px",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        flexWrap: "wrap",
                        marginBottom: "6px",
                      }}
                    >
                      <h2
                        style={{
                          fontFamily: "Georgia, serif",
                          fontSize: "clamp(16px, 3vw, 22px)",
                          fontWeight: "700",
                          ...primaryText,
                          margin: 0,
                        }}
                      >
                        {result.title}
                      </h2>
                      {severity && (
                        <span
                          className={severityBadgeClass}
                          data-ocid="law.severity.badge"
                          style={{
                            padding: "2px 10px",
                            borderRadius: "12px",
                            fontSize: "11px",
                            fontWeight: "700",
                            letterSpacing: "0.06em",
                          }}
                        >
                          {severityIcon} {severity}
                        </span>
                      )}
                    </div>
                    {result.actName && (
                      <p
                        style={{
                          ...goldText,
                          fontSize: "13px",
                          margin: 0,
                          fontStyle: "italic",
                        }}
                      >
                        {result.actName}
                      </p>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                    <button
                      type="button"
                      onClick={handleShare}
                      data-ocid="law.share.button"
                      style={{
                        background: shareCopied
                          ? "rgba(201,168,76,0.2)"
                          : "rgba(201,168,76,0.1)",
                        border: "1px solid rgba(201,168,76,0.4)",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        color: "#c9a84c",
                        cursor: "pointer",
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      {shareCopied ? "Copied!" : "Share"}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        shareOnWhatsApp(
                          result.title,
                          `${result.explanation} ${result.sectionText}`,
                        )
                      }
                      data-ocid="law.whatsapp.button"
                      style={{
                        background: "rgba(37,211,102,0.15)",
                        border: "1px solid rgba(37,211,102,0.4)",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        color: "#25D366",
                        cursor: "pointer",
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      data-ocid="law.export.button"
                      style={{
                        background: "rgba(201,168,76,0.1)",
                        border: "1px solid rgba(201,168,76,0.4)",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        color: "#c9a84c",
                        cursor: "pointer",
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <Download className="w-3.5 h-3.5" />
                      Export PDF
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div
                  style={{
                    background: "#0f2040",
                    border: "1px solid rgba(201,168,76,0.4)",
                    borderTop: "none",
                    borderRadius: "0 0 12px 12px",
                    padding: "24px",
                  }}
                >
                  {/* Two-column layout */}
                  <div
                    className="law-two-col"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "20px",
                      marginBottom: "24px",
                    }}
                  >
                    {/* Left: Original Section Text */}
                    <div
                      style={{
                        background: "rgba(7,16,31,0.5)",
                        border: "1px solid rgba(201,168,76,0.2)",
                        borderRadius: "8px",
                        padding: "16px",
                      }}
                    >
                      <h3 style={{ ...goldText, ...labelStyle }}>
                        <BookMarked style={{ width: "12px", height: "12px" }} />{" "}
                        Original Section Text
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Courier New', Courier, monospace",
                          fontSize: "12px",
                          lineHeight: "1.7",
                          color: "#d4c9b0",
                          whiteSpace: "pre-wrap",
                          margin: 0,
                        }}
                      >
                        {result.sectionText ||
                          "(Full text available at indiacode.nic.in)"}
                      </p>
                    </div>
                    {/* Right: Bengali Explanation */}
                    <div
                      style={{
                        background: "rgba(201,168,76,0.04)",
                        border: "1px solid rgba(201,168,76,0.25)",
                        borderRadius: "8px",
                        padding: "16px",
                      }}
                    >
                      <h3 style={{ ...goldText, ...labelStyle }}>
                        <Lightbulb style={{ width: "12px", height: "12px" }} />{" "}
                        Bengali Explanation / ব্যাখ্যা
                      </h3>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "1.8",
                          ...primaryText,
                          whiteSpace: "pre-wrap",
                          margin: 0,
                        }}
                      >
                        {result.explanation}
                      </p>
                    </div>
                  </div>

                  {/* Practical Examples */}
                  {result.examples && result.examples.length > 0 && (
                    <div style={{ marginBottom: "20px" }}>
                      <h3 style={{ ...goldText, ...labelStyle }}>
                        📌 Practical Examples
                      </h3>
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        {result.examples.map((ex) => (
                          <li
                            key={ex}
                            style={{
                              display: "flex",
                              gap: "10px",
                              fontSize: "13px",
                              color: "#d4c9b0",
                              padding: "8px 12px",
                              background: "rgba(201,168,76,0.05)",
                              borderRadius: "6px",
                              borderLeft: "2px solid rgba(201,168,76,0.4)",
                            }}
                          >
                            <ArrowRight
                              style={{
                                width: "14px",
                                height: "14px",
                                color: "#c9a84c",
                                flexShrink: 0,
                                marginTop: "2px",
                              }}
                            />
                            {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Landmark Cases */}
                  {result.landmarkCases && result.landmarkCases.length > 0 && (
                    <div style={{ marginBottom: "20px" }}>
                      <h3 style={{ ...goldText, ...labelStyle }}>
                        ⚖️ Landmark Cases
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        {result.landmarkCases.map((c) => (
                          <div
                            key={c.name}
                            style={{
                              background: "rgba(7,16,31,0.6)",
                              border: "1px solid rgba(201,168,76,0.2)",
                              borderRadius: "8px",
                              padding: "12px 14px",
                            }}
                          >
                            <p
                              style={{
                                ...primaryText,
                                fontWeight: "600",
                                fontSize: "13px",
                                margin: "0 0 4px",
                                fontFamily: "Georgia, serif",
                              }}
                            >
                              {c.name}
                            </p>
                            {c.citation && (
                              <p
                                style={{
                                  ...goldText,
                                  fontSize: "11px",
                                  fontFamily: "monospace",
                                  margin: "0 0 4px",
                                }}
                              >
                                {c.citation}
                              </p>
                            )}
                            {(c.principle ?? c.summary) && (
                              <p
                                style={{
                                  ...mutedText,
                                  fontSize: "12px",
                                  margin: 0,
                                  lineHeight: "1.6",
                                }}
                              >
                                {c.principle ?? c.summary}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Exceptions */}
                  {result.exceptions && (
                    <div
                      style={{
                        marginBottom: "20px",
                        padding: "14px",
                        background: "rgba(255,200,0,0.04)",
                        border: "1px solid rgba(201,168,76,0.25)",
                        borderRadius: "8px",
                      }}
                    >
                      <h3 style={{ ...goldText, ...labelStyle }}>
                        ⚠️ Exceptions & Provisos
                      </h3>
                      {Array.isArray(result.exceptions) ? (
                        <ul style={{ margin: 0, paddingLeft: "16px" }}>
                          {result.exceptions.map((ex) => (
                            <li
                              key={ex}
                              style={{
                                color: "#d4c9b0",
                                fontSize: "13px",
                                marginBottom: "4px",
                              }}
                            >
                              {ex}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p
                          style={{
                            color: "#d4c9b0",
                            fontSize: "13px",
                            margin: 0,
                          }}
                        >
                          {result.exceptions}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Overriding Effect */}
                  {result.overridingEffect && (
                    <div
                      style={{
                        marginBottom: "20px",
                        padding: "14px",
                        background: "rgba(255,140,0,0.06)",
                        border: "1px solid rgba(255,140,0,0.25)",
                        borderRadius: "8px",
                      }}
                    >
                      <h3 style={{ color: "#e8a040", ...labelStyle }}>
                        🔄 Overriding Effect & Cross-Laws
                      </h3>
                      <p
                        style={{
                          color: "#d4c9b0",
                          fontSize: "13px",
                          margin: 0,
                        }}
                      >
                        {result.overridingEffect}
                      </p>
                    </div>
                  )}

                  {/* Related Sections */}
                  {result.relatedSections &&
                    result.relatedSections.length > 0 && (
                      <div style={{ marginBottom: "20px" }}>
                        <h3 style={{ ...goldText, ...labelStyle }}>
                          <Link2 style={{ width: "12px", height: "12px" }} />{" "}
                          Related Sections
                        </h3>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px",
                          }}
                        >
                          {result.relatedSections.map((sec) => (
                            <button
                              key={sec.ref}
                              type="button"
                              onClick={() => {
                                setQuery(sec.ref);
                                handleSearch(sec.ref);
                              }}
                              data-ocid="law.related.button"
                              style={{
                                background: "rgba(201,168,76,0.1)",
                                border: "1px solid rgba(201,168,76,0.4)",
                                borderRadius: "6px",
                                padding: "4px 12px",
                                color: "#c9a84c",
                                fontSize: "12px",
                                cursor: "pointer",
                                fontWeight: "600",
                              }}
                            >
                              {sec.ref}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Legal Disclaimer */}
                  <div
                    data-ocid="law.disclaimer"
                    style={{
                      marginTop: "20px",
                      padding: "12px 16px",
                      background: "rgba(201,168,76,0.04)",
                      border: "1px solid rgba(201,168,76,0.3)",
                      borderRadius: "8px",
                    }}
                  >
                    <p
                      style={{
                        ...mutedText,
                        fontSize: "11px",
                        margin: 0,
                        lineHeight: "1.6",
                      }}
                    >
                      ⚖️ <strong style={goldText}>Legal Disclaimer:</strong> This
                      information is for educational purposes only and does not
                      constitute legal advice. For authoritative text, refer to:{" "}
                      <a
                        href="https://www.indiacode.nic.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ ...goldText, textDecoration: "underline" }}
                      >
                        indiacode.nic.in
                      </a>{" "}
                      — Legislative Department, Ministry of Law and Justice
                    </p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* ====== CASE FINDER TAB ====== */}
          <TabsContent value="cases">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <input
                  value={caseQuery}
                  onChange={(e) => setCaseQuery(e.target.value)}
                  placeholder="Search cases by name, topic (e.g. bail, FIR, murder)..."
                  data-ocid="casefinder.search_input"
                  style={{ ...inputStyle, flex: 1, minWidth: "200px" }}
                />
                <input
                  value={caseTopicFilter}
                  onChange={(e) => setCaseTopicFilter(e.target.value)}
                  placeholder="Filter by topic..."
                  data-ocid="casefinder.filter_input"
                  style={{ ...inputStyle, width: "180px" }}
                />
              </div>
              <p style={{ ...mutedText, fontSize: "12px", margin: 0 }}>
                {filteredCases.length} cases found
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
                data-ocid="casefinder.list"
              >
                {filteredCases.map((c, idx) => (
                  <div
                    key={c.name}
                    className="law-card"
                    style={{ padding: "16px" }}
                    data-ocid={`casefinder.item.${idx + 1}`}
                  >
                    <h3
                      style={{
                        ...primaryText,
                        fontWeight: "600",
                        fontSize: "14px",
                        margin: "0 0 4px",
                        fontFamily: "Georgia, serif",
                      }}
                    >
                      {c.name}
                    </h3>
                    <p
                      style={{
                        ...goldText,
                        fontSize: "11px",
                        fontFamily: "monospace",
                        margin: "0 0 8px",
                      }}
                    >
                      {c.citation} · {c.court} · {c.year}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                        marginBottom: "8px",
                      }}
                    >
                      {c.topics.map((t) => (
                        <span
                          key={t}
                          style={{
                            background: "rgba(201,168,76,0.1)",
                            border: "1px solid rgba(201,168,76,0.3)",
                            borderRadius: "10px",
                            padding: "2px 8px",
                            ...goldText,
                            fontSize: "11px",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <p
                      style={{
                        ...mutedText,
                        fontSize: "13px",
                        lineHeight: "1.6",
                        margin: 0,
                      }}
                    >
                      {c.summary}
                    </p>
                  </div>
                ))}
                {filteredCases.length === 0 && (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "48px 0",
                      ...mutedText,
                    }}
                    data-ocid="casefinder.empty_state"
                  >
                    <Gavel
                      style={{
                        width: "32px",
                        height: "32px",
                        margin: "0 auto 8px",
                        opacity: 0.3,
                      }}
                    />
                    <p style={{ fontSize: "13px" }}>
                      No cases found. Try a different search term.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* ====== IPC vs BNS TAB ====== */}
          <TabsContent value="comparison">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <p style={{ ...mutedText, fontSize: "13px", margin: 0 }}>
                The Bharatiya Nyaya Sanhita, 2023 (BNS) replaces the Indian
                Penal Code, 1860 (IPC). Below is a section-wise comparison.
              </p>
              <input
                value={ipcBnsQuery}
                onChange={(e) => setIpcBnsQuery(e.target.value)}
                placeholder="Search by section number or title..."
                data-ocid="comparison.search_input"
                style={inputStyle}
              />
              <p style={{ ...mutedText, fontSize: "12px", margin: 0 }}>
                {filteredComparison.length} rows found
              </p>
              <div
                style={{
                  borderRadius: "12px",
                  border: "1px solid rgba(201,168,76,0.3)",
                  overflow: "hidden",
                }}
                data-ocid="comparison.table"
              >
                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      fontSize: "13px",
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          background: "#07101f",
                          borderBottom: "1px solid rgba(201,168,76,0.3)",
                        }}
                      >
                        {[
                          "IPC §",
                          "IPC Title",
                          "BNS §",
                          "BNS Title",
                          "Note",
                        ].map((h) => (
                          <th
                            key={h}
                            style={{
                              textAlign: "left",
                              padding: "10px 14px",
                              ...goldText,
                              fontWeight: "700",
                              fontSize: "11px",
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredComparison.map((r, idx) => (
                        <tr
                          key={`${r.ipcSec}-${r.bnsSec}`}
                          style={{
                            borderBottom: "1px solid rgba(201,168,76,0.1)",
                            background: idx % 2 === 0 ? "#0f2040" : "#0d1c38",
                          }}
                          data-ocid={`comparison.row.${idx + 1}`}
                        >
                          <td
                            style={{
                              padding: "10px 14px",
                              fontFamily: "monospace",
                              fontWeight: "700",
                              ...primaryText,
                            }}
                          >
                            {r.ipcSec}
                          </td>
                          <td
                            style={{ padding: "10px 14px", color: "#d4c9b0" }}
                          >
                            {r.ipcTitle}
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              fontFamily: "monospace",
                              fontWeight: "700",
                              ...goldText,
                            }}
                          >
                            {r.bnsSec}
                          </td>
                          <td
                            style={{ padding: "10px 14px", color: "#d4c9b0" }}
                          >
                            {r.bnsTitle}
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              ...mutedText,
                              fontSize: "12px",
                            }}
                          >
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
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <input
                value={glossaryQuery}
                onChange={(e) => {
                  setGlossaryQuery(e.target.value);
                  setGlossaryLetter("");
                }}
                placeholder="Search legal terms..."
                data-ocid="glossary.search_input"
                style={inputStyle}
              />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                <button
                  type="button"
                  onClick={() => setGlossaryLetter("")}
                  style={{
                    padding: "3px 8px",
                    borderRadius: "4px",
                    border: `1px solid ${!glossaryLetter ? "#c9a84c" : "rgba(201,168,76,0.3)"}`,
                    background: !glossaryLetter
                      ? "rgba(201,168,76,0.2)"
                      : "transparent",
                    color: !glossaryLetter ? "#c9a84c" : "#a89060",
                    fontSize: "11px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
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
                    style={{
                      padding: "3px 7px",
                      borderRadius: "4px",
                      border: `1px solid ${glossaryLetter === l ? "#c9a84c" : "rgba(201,168,76,0.2)"}`,
                      background:
                        glossaryLetter === l
                          ? "rgba(201,168,76,0.2)"
                          : "transparent",
                      color: glossaryLetter === l ? "#c9a84c" : "#a89060",
                      fontSize: "11px",
                      cursor: "pointer",
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <p style={{ ...mutedText, fontSize: "12px", margin: 0 }}>
                {filteredGlossary.length} terms
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
                data-ocid="glossary.list"
              >
                {filteredGlossary.map((g, idx) => (
                  <div
                    key={g.term}
                    className="law-card"
                    style={{ padding: "14px 16px" }}
                    data-ocid={`glossary.item.${idx + 1}`}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "6px",
                      }}
                    >
                      <h3
                        style={{
                          ...primaryText,
                          fontWeight: "700",
                          fontSize: "14px",
                          margin: 0,
                          fontFamily: "Georgia, serif",
                        }}
                      >
                        {g.term}
                      </h3>
                      <span
                        style={{
                          background: "rgba(201,168,76,0.12)",
                          border: "1px solid rgba(201,168,76,0.3)",
                          borderRadius: "10px",
                          padding: "2px 8px",
                          ...goldText,
                          fontSize: "11px",
                        }}
                      >
                        {g.bengali}
                      </span>
                    </div>
                    <p
                      style={{
                        color: "#d4c9b0",
                        fontSize: "13px",
                        lineHeight: "1.6",
                        margin: "0 0 4px",
                      }}
                    >
                      {g.definition}
                    </p>
                    <p
                      style={{
                        ...mutedText,
                        fontSize: "12px",
                        margin: 0,
                        lineHeight: "1.6",
                      }}
                    >
                      {g.definitionBn}
                    </p>
                  </div>
                ))}
                {filteredGlossary.length === 0 && (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "40px 0",
                      ...mutedText,
                    }}
                    data-ocid="glossary.empty_state"
                  >
                    <BookOpen
                      style={{
                        width: "32px",
                        height: "32px",
                        margin: "0 auto 8px",
                        opacity: 0.3,
                      }}
                    />
                    <p style={{ fontSize: "13px" }}>No terms found.</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="court-tour">
            <div style={{ marginBottom: "24px" }}>
              <CourtTour3D />
            </div>
          </TabsContent>
          <TabsContent value="doc-checker">
            <div
              style={{
                background: "#0a1628",
                border: "1px solid rgba(201,168,76,0.3)",
                borderRadius: "12px",
                padding: "24px",
                marginBottom: "24px",
              }}
            >
              <DocumentChecker />
            </div>
          </TabsContent>

          {/* ====== AI TOOLS TAB ====== */}
          <TabsContent value="ai-tools">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              {/* Legal Simplifier */}
              <div
                style={{
                  background: "#0f2040",
                  border: "1px solid rgba(201,168,76,0.3)",
                  borderRadius: "12px",
                  padding: "20px",
                }}
              >
                <h3
                  style={{
                    color: "#c9a84c",
                    fontFamily: "Georgia, serif",
                    fontSize: "16px",
                    margin: "0 0 4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Lightbulb className="w-4 h-4" /> Legal Simplifier — জটিল আইনি
                  ভাষা সহজ করুন
                </h3>
                <p
                  style={{
                    color: "#8899aa",
                    fontSize: "13px",
                    margin: "0 0 12px",
                  }}
                >
                  যেকোনো আইনি ধারা বা নোটিশের ভাষা সহজ বাংলা ও ইংরেজিতে বুঝুন
                </p>
                <textarea
                  value={aiSimplifierInput}
                  onChange={(e) => setAiSimplifierInput(e.target.value)}
                  placeholder="এখানে যেকোনো জটিল আইনি ভাষা বা section paste করুন..."
                  data-ocid="ai.simplifier.textarea"
                  rows={5}
                  style={{
                    width: "100%",
                    background: "#07101f",
                    border: "1px solid rgba(201,168,76,0.3)",
                    borderRadius: "8px",
                    padding: "12px",
                    color: "#e8dcc8",
                    fontSize: "13px",
                    fontFamily: "inherit",
                    resize: "vertical",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  type="button"
                  data-ocid="ai.simplifier.button"
                  onClick={() => {
                    const input = aiSimplifierInput.toLowerCase();
                    const legalPhrases: Record<
                      string,
                      {
                        simple: string;
                        points: string[];
                        action: string;
                        english: string;
                      }
                    > = {
                      notwithstanding: {
                        simple:
                          "এই আইনের অন্য যেকোনো বিধান সত্ত্বেও, নিচের নিয়ম প্রযোজ্য হবে।",
                        points: [
                          "অন্য আইন বা ধারার বিরোধ হলেও এই বিধান কার্যকর",
                          "এটি একটি ওভাররাইডিং ক্লজ",
                        ],
                        action:
                          "এই ধারাটি পড়ুন এবং এটি কোন অধিকার বা বাধ্যবাধকতা তৈরি করছে তা বোঝার চেষ্টা করুন।",
                        english:
                          "Despite other provisions in this Act, this rule applies. It overrides conflicting rules.",
                      },
                      cognizable: {
                        simple:
                          "পুলিশ সরাসরি গ্রেফতার করতে পারবে এবং বিনা ওয়ারেন্টে তদন্ত করতে পারবে।",
                        points: [
                          "ওয়ারেন্ট ছাড়া গ্রেফতার সম্ভব",
                          "পুলিশ সরাসরি মামলা নিতে পারে",
                        ],
                        action:
                          "এই ধরনের অপরাধে FIR করুন — পুলিশ অবিলম্বে তদন্ত শুরু করতে বাধ্য।",
                        english:
                          "Police can arrest without warrant and investigate directly. FIR registration is mandatory.",
                      },
                      bailable: {
                        simple:
                          "অভিযুক্ত ব্যক্তি জামিনের অধিকারী — পুলিশ বা আদালত জামিন দিতে বাধ্য।",
                        points: [
                          "জামিন পাওয়ার আইনি অধিকার আছে",
                          "পুলিশ থানা থেকেও জামিন পেতে পারেন",
                        ],
                        action:
                          "গ্রেফতার হলে অবিলম্বে জামিনের দরখাস্ত করুন — এটি আপনার আইনি অধিকার।",
                        english:
                          "The accused has a right to bail. Police or court must grant bail on request.",
                      },
                      "non-bailable": {
                        simple:
                          "জামিন পাওয়া কঠিন এবং শুধুমাত্র আদালতের বিবেচনার উপর নির্ভর করে।",
                        points: [
                          "জামিন পাওয়ার কোনো স্বয়ংক্রিয় অধিকার নেই",
                          "সেশন কোর্ট বা হাই কোর্টে আবেদন করতে হবে",
                        ],
                        action: "আইনজীবীর সাহায্যে সেশন কোর্টে জামিন আবেদন করুন।",
                        english:
                          "Bail is not a right — court has discretion. Apply to Sessions Court with proper grounds.",
                      },
                      "prima facie": {
                        simple:
                          "প্রথম দেখায় মনে হচ্ছে অভিযোগ সত্য — এটি প্রাথমিক প্রমাণ মাত্র।",
                        points: ["এটি চূড়ান্ত রায় নয়", "বিচারে আরও প্রমাণ দিতে হবে"],
                        action:
                          "প্রাথমিক প্রমাণ থেকে নিজেকে রক্ষার জন্য আইনজীবীর সাহায্য নিন।",
                        english:
                          "At first glance the case appears credible — this is preliminary evidence only, not final judgment.",
                      },
                      "mens rea": {
                        simple:
                          "অপরাধ করার মানসিক উদ্দেশ্য বা ইচ্ছা — এটি অপরাধের একটি গুরুত্বপূর্ণ উপাদান।",
                        points: [
                          "অপরাধের জন্য সাধারণত মানসিক উদ্দেশ্য প্রমাণ করতে হয়",
                          "কিছু অপরাধে strict liability প্রযোজ্য — উদ্দেশ্য লাগে না",
                        ],
                        action:
                          "যদি অভিযুক্ত হন, প্রমাণ করুন যে আপনার অপরাধমূলক উদ্দেশ্য ছিল না।",
                        english:
                          "Criminal intent — the mental element of a crime. Prosecution must prove you intended to commit the act.",
                      },
                      "habeas corpus": {
                        simple:
                          "আদালতের কাছে দাবি করা যে কাউকে অবৈধভাবে আটক রাখা হয়েছে এবং তাকে আদালতে উপস্থিত করতে হবে।",
                        points: [
                          "মৌলিক অধিকারের অংশ",
                          "অবৈধ আটকের বিরুদ্ধে শক্তিশালী রক্ষা",
                        ],
                        action:
                          "অবৈধভাবে আটক থাকলে হাই কোর্ট বা সুপ্রিম কোর্টে Habeas Corpus আবেদন করুন।",
                        english:
                          "Writ demanding release from illegal detention. File in High Court or Supreme Court.",
                      },
                      injunction: {
                        simple:
                          "আদালতের নিষেধাজ্ঞা — কাউকে কোনো কাজ করতে বা না করতে আদেশ দেওয়া।",
                        points: [
                          "আদালতের আদেশ না মানলে আদালত অবমাননা হবে",
                          "অস্থায়ী (interim) বা স্থায়ী (permanent) হতে পারে",
                        ],
                        action:
                          "অবৈধ কার্যক্রম থামাতে আদালতে injunction এর জন্য আবেদন করুন।",
                        english:
                          "Court order preventing someone from doing an act. Violation = contempt of court.",
                      },
                      affidavit: {
                        simple:
                          "হলফনামা — শপথ নিয়ে লিখিত বিবৃতি যা আদালতে সত্য বলে গৃহীত হয়।",
                        points: [
                          "মিথ্যা হলফনামা দেওয়া অপরাধ",
                          "নোটারি বা ম্যাজিস্ট্রেটের সামনে সই করতে হয়",
                        ],
                        action:
                          "হলফনামায় শুধু সত্য তথ্য দিন — মিথ্যা বিবৃতি দিলে IPC 193 ধারায় বিচার হতে পারে।",
                        english:
                          "Sworn written statement accepted as truth in court. False affidavit is perjury — a criminal offence.",
                      },
                    };

                    let result: {
                      simple: string;
                      points: string[];
                      action: string;
                      english: string;
                    } | null = null;
                    for (const [phrase, data] of Object.entries(legalPhrases)) {
                      if (input.includes(phrase)) {
                        result = data;
                        break;
                      }
                    }

                    if (!result) {
                      result = {
                        simple:
                          "এই আইনি ভাষাটি একটি আইনি দলিল বা চুক্তির অংশ। এতে বিভিন্ন অধিকার ও বাধ্যবাধকতা উল্লেখ আছে।",
                        points: [
                          "দলিলের প্রতিটি ধারা মনোযোগ দিয়ে পড়ুন",
                          "অস্পষ্ট বিষয়ে স্বাক্ষর করার আগে আইনজীবীর পরামর্শ নিন",
                          "সময়সীমা ও শর্তগুলি বিশেষভাবে লক্ষ্য করুন",
                        ],
                        action:
                          "যেকোনো গুরুত্বপূর্ণ আইনি দলিলে সই করার আগে অবশ্যই যোগ্য আইনজীবীর পরামর্শ নিন।",
                        english:
                          "This appears to be a legal document or contract with various rights and obligations. Consult a qualified lawyer before signing any important document.",
                      };
                    }
                    setAiSimplifierResult(result);
                  }}
                  style={{
                    marginTop: "12px",
                    background: "rgba(201,168,76,0.2)",
                    border: "1px solid rgba(201,168,76,0.5)",
                    borderRadius: "8px",
                    padding: "10px 20px",
                    color: "#c9a84c",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Lightbulb className="w-4 h-4" />
                  সহজ ভাষায় বুঝুন
                </button>

                {aiSimplifierResult && (
                  <div
                    style={{
                      marginTop: "16px",
                      background: "#07101f",
                      border: "1px solid rgba(201,168,76,0.3)",
                      borderRadius: "10px",
                      padding: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                    data-ocid="ai.simplifier.result"
                  >
                    <div>
                      <h4
                        style={{
                          color: "#c9a84c",
                          fontSize: "13px",
                          fontWeight: "700",
                          margin: "0 0 6px",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        সহজ ব্যাখ্যা (Simple Explanation)
                      </h4>
                      <p
                        style={{
                          color: "#e8dcc8",
                          fontSize: "14px",
                          lineHeight: "1.7",
                          margin: 0,
                        }}
                      >
                        {aiSimplifierResult.simple}
                      </p>
                    </div>
                    <div>
                      <h4
                        style={{
                          color: "#c9a84c",
                          fontSize: "13px",
                          fontWeight: "700",
                          margin: "0 0 6px",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        মূল বিষয়গুলো (Key Points)
                      </h4>
                      <ul
                        style={{
                          margin: 0,
                          paddingLeft: "20px",
                          color: "#d4c9b0",
                          fontSize: "13px",
                          lineHeight: "1.8",
                        }}
                      >
                        {aiSimplifierResult.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4
                        style={{
                          color: "#c9a84c",
                          fontSize: "13px",
                          fontWeight: "700",
                          margin: "0 0 6px",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        কী করতে হবে (What to do)
                      </h4>
                      <p
                        style={{
                          color: "#e8dcc8",
                          fontSize: "13px",
                          lineHeight: "1.7",
                          margin: 0,
                        }}
                      >
                        {aiSimplifierResult.action}
                      </p>
                    </div>
                    <div
                      style={{
                        borderTop: "1px solid rgba(201,168,76,0.2)",
                        paddingTop: "12px",
                      }}
                    >
                      <h4
                        style={{
                          color: "#8899aa",
                          fontSize: "12px",
                          fontWeight: "700",
                          margin: "0 0 6px",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        Simple English
                      </h4>
                      <p
                        style={{
                          color: "#c4b8a0",
                          fontSize: "13px",
                          lineHeight: "1.7",
                          margin: 0,
                          fontStyle: "italic",
                        }}
                      >
                        {aiSimplifierResult.english}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Legal Situation Advisor */}
              <div
                style={{
                  background: "#0f2040",
                  border: "1px solid rgba(201,168,76,0.3)",
                  borderRadius: "12px",
                  padding: "20px",
                }}
              >
                <h3
                  style={{
                    color: "#c9a84c",
                    fontFamily: "Georgia, serif",
                    fontSize: "16px",
                    margin: "0 0 4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Scale className="w-4 h-4" /> Legal Situation Advisor — আপনার
                  অধিকার জানুন
                </h3>
                <p
                  style={{
                    color: "#8899aa",
                    fontSize: "13px",
                    margin: "0 0 12px",
                  }}
                >
                  আপনার পরিস্থিতি বর্ণনা করুন — প্রযোজ্য আইন ও অধিকার জানুন
                </p>
                <textarea
                  value={aiAdvisorInput}
                  onChange={(e) => setAiAdvisorInput(e.target.value)}
                  placeholder="আপনার পরিস্থিতি বর্ণনা করুন (যেমন: বাড়ির মালিক ভাড়া ফেরত দিচ্ছেন না, বেতন পাচ্ছি না, চেক বাউন্স হয়েছে...)"
                  data-ocid="ai.advisor.textarea"
                  rows={4}
                  style={{
                    width: "100%",
                    background: "#07101f",
                    border: "1px solid rgba(201,168,76,0.3)",
                    borderRadius: "8px",
                    padding: "12px",
                    color: "#e8dcc8",
                    fontSize: "13px",
                    fontFamily: "inherit",
                    resize: "vertical",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  type="button"
                  data-ocid="ai.advisor.button"
                  onClick={() => {
                    const input = aiAdvisorInput.toLowerCase();
                    const situations = [
                      {
                        keywords: [
                          "cheque",
                          "চেক",
                          "বাউন্স",
                          "bounce",
                          "dishonour",
                        ],
                        laws: [
                          {
                            title: "Negotiable Instruments Act — Cheque Bounce",
                            sections: [
                              "NI Act Section 138",
                              "NI Act Section 142",
                            ],
                            rights: [
                              "30 দিনের মধ্যে আইনি নোটিশ পাঠানোর অধিকার",
                              "ব্যর্থ হলে ম্যাজিস্ট্রেট কোর্টে মামলা করার অধিকার",
                              "2 বছর পর্যন্ত কারাদণ্ড বা দ্বিগুণ পরিমাণ জরিমানার দাবি",
                            ],
                            steps: [
                              "30 দিনের মধ্যে লিখিত নোটিশ পাঠান",
                              "15 দিনের মধ্যে পেমেন্ট না পেলে ম্যাজিস্ট্রেট কোর্টে মামলা করুন",
                              "আইনজীবীর সাহায্য নিন",
                            ],
                          },
                        ],
                      },
                      {
                        keywords: [
                          "ভাড়া",
                          "deposit",
                          "landlord",
                          "বাড়ি",
                          "মালিক",
                          "rent",
                          "টেনান্ট",
                        ],
                        laws: [
                          {
                            title:
                              "Transfer of Property Act & Rent Control Laws",
                            sections: [
                              "Transfer of Property Act Section 105-111",
                              "State Rent Control Act",
                            ],
                            rights: [
                              "ভাড়া রসিদ পাওয়ার অধিকার",
                              "জমা অর্থ ফেরত পাওয়ার অধিকার",
                              "অবৈধ উচ্ছেদের বিরুদ্ধে আইনি সুরক্ষা",
                            ],
                            steps: [
                              "লিখিতভাবে ভাড়া চুক্তি করুন",
                              "ভাড়া রসিদ সংগ্রহ করুন",
                              "বিরোধে রেন্ট কন্ট্রোল কোর্টে আবেদন করুন",
                            ],
                          },
                        ],
                      },
                      {
                        keywords: [
                          "salary",
                          "বেতন",
                          "employer",
                          "নিয়োগকর্তা",
                          "wage",
                          "মজুরি",
                          "pay",
                        ],
                        laws: [
                          {
                            title:
                              "Payment of Wages Act 1936 & Industrial Disputes Act",
                            sections: [
                              "Payment of Wages Act Section 3",
                              "Industrial Disputes Act Section 33C",
                            ],
                            rights: [
                              "নির্ধারিত তারিখে বেতন পাওয়ার অধিকার",
                              "অবৈধ কর্তন থেকে সুরক্ষা",
                              "Labour Court-এ আবেদনের অধিকার",
                            ],
                            steps: [
                              "নিয়োগকর্তাকে লিখিত নোটিশ দিন",
                              "Labour Commissioner-এর কাছে অভিযোগ করুন",
                              "Industrial Tribunal-এ আবেদন করুন",
                            ],
                          },
                        ],
                      },
                      {
                        keywords: [
                          "domestic",
                          "violence",
                          "নির্যাতন",
                          "স্ত্রী",
                          "wife",
                          "মারধর",
                          "dowry",
                          "যৌতুক",
                        ],
                        laws: [
                          {
                            title: "Domestic Violence Act 2005 & IPC 498A",
                            sections: [
                              "DV Act Section 12",
                              "IPC Section 498A",
                              "IPC Section 406",
                            ],
                            rights: [
                              "সুরক্ষা আদেশের অধিকার",
                              "বাসস্থানের অধিকার",
                              "ভরণ-পোষণের দাবি",
                              "যৌতুক ফেরত দাবির অধিকার",
                            ],
                            steps: [
                              "নিকটস্থ থানায় FIR করুন",
                              "Protection Officer-এর সাথে যোগাযোগ করুন",
                              "ম্যাজিস্ট্রেট কোর্টে সুরক্ষা আদেশের আবেদন করুন",
                            ],
                          },
                        ],
                      },
                      {
                        keywords: [
                          "cyber",
                          "hacking",
                          "phishing",
                          "সাইবার",
                          "অনলাইন",
                          "internet fraud",
                          "fake profile",
                        ],
                        laws: [
                          {
                            title: "Information Technology Act 2000",
                            sections: [
                              "IT Act Section 66",
                              "IT Act Section 66C",
                              "IT Act Section 66D",
                              "IT Act Section 67",
                            ],
                            rights: [
                              "Cybercrime Cell-এ অভিযোগ করার অধিকার",
                              "সম্পত্তি পুনরুদ্ধারের দাবি",
                              "ক্ষতিপূরণ দাবির অধিকার",
                            ],
                            steps: [
                              "cybercrime.gov.in-এ অভিযোগ দায়ের করুন",
                              "নিকটস্থ থানার Cyber Cell-এ যান",
                              "প্রমাণ (screenshots) সংরক্ষণ করুন",
                            ],
                          },
                        ],
                      },
                      {
                        keywords: [
                          "accident",
                          "motor",
                          "গাড়ি",
                          "দুর্ঘটনা",
                          "vehicle",
                          "injury",
                        ],
                        laws: [
                          {
                            title: "Motor Vehicles Act 1988 & Tort Law",
                            sections: [
                              "Motor Vehicles Act Section 166",
                              "MV Act Section 140",
                              "MV Act Section 163A",
                            ],
                            rights: [
                              "No-fault compensation দাবির অধিকার (₹50,000 স্থায়ী প্রতিবন্ধীতায়, ₹25,000 মৃত্যুতে)",
                              "MACT (Motor Accident Claims Tribunal)-এ ক্ষতিপূরণ দাবি",
                              "Third-party insurance claim-এর অধিকার",
                            ],
                            steps: [
                              "দুর্ঘটনার FIR করুন",
                              "MACT-এ ক্ষতিপূরণের আবেদন করুন",
                              "বীমা কোম্পানিকে claim নোটিশ দিন",
                            ],
                          },
                        ],
                      },
                      {
                        keywords: [
                          "consumer",
                          "product",
                          "defect",
                          "service",
                          "ভোক্তা",
                          "পণ্য",
                          "ক্ষতিপূরণ",
                        ],
                        laws: [
                          {
                            title: "Consumer Protection Act 2019",
                            sections: [
                              "CPA Section 2(7)",
                              "CPA Section 34",
                              "CPA Section 35",
                            ],
                            rights: [
                              "নিরাপদ পণ্য পাওয়ার অধিকার",
                              "পণ্য ত্রুটিতে ক্ষতিপূরণ দাবির অধিকার",
                              "জেলা ফোরামে বিনামূল্যে অভিযোগের অধিকার",
                            ],
                            steps: [
                              "কোম্পানিকে লিখিত অভিযোগ দিন",
                              "সমাধান না হলে District Consumer Forum-এ যান",
                              "প্রয়োজনে State/National Commission-এ যান",
                            ],
                          },
                        ],
                      },
                      {
                        keywords: [
                          "property",
                          "land",
                          "সম্পত্তি",
                          "জমি",
                          "দখল",
                          "বেদখল",
                        ],
                        laws: [
                          {
                            title:
                              "Transfer of Property Act & Code of Civil Procedure",
                            sections: [
                              "Transfer of Property Act Section 54",
                              "CPC Order 39 Rule 1",
                              "Specific Relief Act Section 38",
                            ],
                            rights: [
                              "সম্পত্তি রক্ষার injunction-এর অধিকার",
                              "বেআইনি দখলের বিরুদ্ধে আইনি পদক্ষেপ",
                              "সম্পত্তি হস্তান্তরে রেজিস্ট্রেশনের অধিকার",
                            ],
                            steps: [
                              "সম্পত্তির সব দলিল সংগ্রহ করুন",
                              "আইনজীবীর মাধ্যমে Civil Court-এ suit করুন",
                              "অস্থায়ী injunction আবেদন করুন",
                            ],
                          },
                        ],
                      },
                      {
                        keywords: [
                          "fir",
                          "police",
                          "পুলিশ",
                          "অভিযোগ",
                          "complaint",
                          "থানা",
                          "গ্রেফতার",
                        ],
                        laws: [
                          {
                            title: "Code of Criminal Procedure (CrPC) / BNSS",
                            sections: [
                              "CrPC Section 154",
                              "CrPC Section 41A",
                              "CrPC Section 50",
                            ],
                            rights: [
                              "FIR নিবন্ধনের অধিকার — থানা অস্বীকার করতে পারবে না (Lalita Kumari case)",
                              "গ্রেফতারের কারণ জানার অধিকার",
                              "আইনজীবীর সাথে পরামর্শের অধিকার",
                              "পরিবারকে জানানোর দাবি",
                            ],
                            steps: [
                              "থানায় FIR করুন — অস্বীকার করলে SP-কে অভিযোগ করুন",
                              "গ্রেফতার হলে D.K. Basu guidelines মনে রাখুন",
                              "24 ঘণ্টার মধ্যে ম্যাজিস্ট্রেটের সামনে উপস্থিত করতে হবে",
                            ],
                          },
                        ],
                      },
                      {
                        keywords: [
                          "cheating",
                          "fraud",
                          "প্রতারণা",
                          "ঠকানো",
                          "scam",
                          "money",
                        ],
                        laws: [
                          {
                            title:
                              "IPC Section 420 / BNS Section 318 — Cheating",
                            sections: [
                              "IPC Section 420",
                              "IPC Section 415",
                              "BNS Section 318",
                            ],
                            rights: [
                              "FIR করার অধিকার",
                              "সম্পত্তি পুনরুদ্ধারের দাবি",
                              "ক্ষতিপূরণের অধিকার",
                            ],
                            steps: [
                              "তথ্য/প্রমাণ সংগ্রহ করুন",
                              "থানায় FIR করুন",
                              "আদালত থেকে সম্পত্তি freeze করার আদেশ নিন",
                            ],
                          },
                        ],
                      },
                    ];

                    let matchedLaws: Array<{
                      title: string;
                      sections: string[];
                      rights: string[];
                      steps: string[];
                    }> | null = null;
                    for (const s of situations) {
                      if (s.keywords.some((k) => input.includes(k))) {
                        matchedLaws = s.laws;
                        break;
                      }
                    }

                    if (!matchedLaws) {
                      matchedLaws = [
                        {
                          title: "সাধারণ আইনি পরামর্শ (General Legal Advice)",
                          sections: [
                            "Constitution Article 21 — Right to Life and Legal Remedies",
                          ],
                          rights: [
                            "আইনজীবীর সাহায্য নেওয়ার অধিকার",
                            "আদালতে যাওয়ার অধিকার",
                            "যোগ্য Legal Aid পাওয়ার অধিকার (Legal Services Authority Act)",
                          ],
                          steps: [
                            "আপনার সমস্যা একজন যোগ্য আইনজীবীকে বিস্তারিত জানান",
                            "জেলা আদালতের আইনি সহায়তা কেন্দ্রে বিনামূল্যে সাহায্য পান",
                            "National Legal Services Authority (nalsa.gov.in) তে যোগাযোগ করুন",
                          ],
                        },
                      ];
                    }
                    setAiAdvisorResult({ laws: matchedLaws });
                  }}
                  style={{
                    marginTop: "12px",
                    background: "rgba(201,168,76,0.2)",
                    border: "1px solid rgba(201,168,76,0.5)",
                    borderRadius: "8px",
                    padding: "10px 20px",
                    color: "#c9a84c",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Scale className="w-4 h-4" />
                  আমার অধিকার জানুন
                </button>

                {aiAdvisorResult && (
                  <div
                    style={{
                      marginTop: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                    data-ocid="ai.advisor.result"
                  >
                    {aiAdvisorResult.laws.map((law) => (
                      <div
                        key={law.title}
                        style={{
                          background: "#07101f",
                          border: "1px solid rgba(201,168,76,0.3)",
                          borderRadius: "10px",
                          padding: "16px",
                        }}
                      >
                        <h4
                          style={{
                            color: "#c9a84c",
                            fontFamily: "Georgia, serif",
                            fontSize: "15px",
                            margin: "0 0 12px",
                          }}
                        >
                          {law.title}
                        </h4>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "12px",
                          }}
                        >
                          <div>
                            <p
                              style={{
                                color: "#8899aa",
                                fontSize: "11px",
                                fontWeight: "700",
                                textTransform: "uppercase",
                                margin: "0 0 6px",
                                letterSpacing: "0.06em",
                              }}
                            >
                              প্রযোজ্য ধারাসমূহ
                            </p>
                            {law.sections.map((s) => (
                              <span
                                key={s}
                                style={{
                                  display: "inline-block",
                                  background: "rgba(201,168,76,0.1)",
                                  border: "1px solid rgba(201,168,76,0.3)",
                                  borderRadius: "10px",
                                  padding: "2px 8px",
                                  color: "#c9a84c",
                                  fontSize: "11px",
                                  margin: "2px",
                                }}
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                          <div>
                            <p
                              style={{
                                color: "#8899aa",
                                fontSize: "11px",
                                fontWeight: "700",
                                textTransform: "uppercase",
                                margin: "0 0 6px",
                                letterSpacing: "0.06em",
                              }}
                            >
                              আপনার অধিকার
                            </p>
                            <ul
                              style={{
                                margin: 0,
                                paddingLeft: "16px",
                                color: "#d4c9b0",
                                fontSize: "12px",
                                lineHeight: "1.7",
                              }}
                            >
                              {law.rights.map((r) => (
                                <li key={r}>{r}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div
                          style={{
                            marginTop: "12px",
                            paddingTop: "12px",
                            borderTop: "1px solid rgba(201,168,76,0.15)",
                          }}
                        >
                          <p
                            style={{
                              color: "#8899aa",
                              fontSize: "11px",
                              fontWeight: "700",
                              textTransform: "uppercase",
                              margin: "0 0 6px",
                              letterSpacing: "0.06em",
                            }}
                          >
                            পদক্ষেপ নিন
                          </p>
                          <ol
                            style={{
                              margin: 0,
                              paddingLeft: "16px",
                              color: "#e8dcc8",
                              fontSize: "13px",
                              lineHeight: "1.8",
                            }}
                          >
                            {law.steps.map((s) => (
                              <li key={s}>{s}</li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    ))}
                    <p
                      style={{
                        color: "#666",
                        fontSize: "11px",
                        margin: 0,
                        fontStyle: "italic",
                        textAlign: "center",
                      }}
                    >
                      ⚠️ এটি শিক্ষামূলক তথ্য মাত্র। গুরুত্বপূর্ণ আইনি বিষয়ে অবশ্যই একজন যোগ্য
                      আইনজীবীর পরামর্শ নিন।
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* ====== FLASHCARDS TAB ====== */}
          <TabsContent value="flashcards">
            <style>{`
              .flashcard-container { perspective: 1000px; }
              .flashcard-inner { position: relative; width: 100%; height: 180px; transform-style: preserve-3d; transition: transform 0.6s; cursor: pointer; }
              .flashcard-inner.flipped { transform: rotateY(180deg); }
              .flashcard-front, .flashcard-back { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; -webkit-backface-visibility: hidden; border-radius: 10px; padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; }
              .flashcard-front { background: linear-gradient(135deg, #0f2040, #162a50); border: 1px solid rgba(201,168,76,0.4); }
              .flashcard-back { background: linear-gradient(135deg, #1a2f4a, #0d1e38); border: 1px solid rgba(201,168,76,0.6); transform: rotateY(180deg); }
            `}</style>
            <div
              style={{
                marginBottom: "16px",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {[
                "All",
                "Latin",
                "Criminal",
                "Civil",
                "Constitutional",
                "Contract",
              ].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => {
                    setFlashcardFilter(f);
                    setFlippedCards(new Set());
                  }}
                  data-ocid={`flashcard.${f.toLowerCase()}.tab`}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "20px",
                    border: `1px solid ${flashcardFilter === f ? "#c9a84c" : "rgba(201,168,76,0.3)"}`,
                    background:
                      flashcardFilter === f
                        ? "rgba(201,168,76,0.2)"
                        : "transparent",
                    color: flashcardFilter === f ? "#c9a84c" : "#8899aa",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "16px",
              }}
              data-ocid="flashcard.list"
            >
              {[
                {
                  term: "Habeas Corpus",
                  category: "Constitutional",
                  cat: "Constitutional",
                  bengali: "তোমার শরীর রাখো",
                  meaning:
                    "অবৈধ আটকের বিরুদ্ধে রক্ষার রিট। আদালত কাউকে উপস্থিত করার নির্দেশ দেয়।",
                  english:
                    "Writ for unlawful detention — court orders person to be brought before it.",
                  exam: "Article 32 (SC) ও Article 226 (HC) এর অধীনে — CLAT ও Judiciary পরীক্ষায় গুরুত্বপূর্ণ",
                },
                {
                  term: "Mandamus",
                  category: "Latin",
                  cat: "Constitutional",
                  bengali: "আমরা আদেশ দিচ্ছি",
                  meaning:
                    "সরকারি কর্তৃপক্ষকে তার আইনগত দায়িত্ব পালন করতে বাধ্য করার রিট।",
                  english:
                    "Writ compelling a public authority to perform its legal duty.",
                  exam: "Mandamus শুধু public duty-র জন্য — private body-র বিরুদ্ধে নয়",
                },
                {
                  term: "Certiorari",
                  category: "Latin",
                  cat: "Constitutional",
                  bengali: "নিশ্চিত করতে হবে",
                  meaning: "নিম্ন আদালতের অবৈধ বা এখতিয়ার-বহির্ভূত রায় বাতিল করার রিট।",
                  english:
                    "Writ quashing an illegal or ultra-vires order of a lower court/tribunal.",
                  exam: "Certiorari = রায় বাতিল; Prohibition = রায় দিতে নিষেধ — পার্থক্য মনে রাখুন",
                },
                {
                  term: "Prohibition",
                  category: "Latin",
                  cat: "Constitutional",
                  bengali: "নিষিদ্ধ করা",
                  meaning:
                    "নিম্ন আদালতকে তার এখতিয়ারের বাইরে কাজ করতে নিষেধ করার রিট।",
                  english:
                    "Writ preventing a lower court from exceeding its jurisdiction.",
                  exam: "Prohibition is preventive (before judgment); Certiorari is curative (after judgment)",
                },
                {
                  term: "Quo Warranto",
                  category: "Latin",
                  cat: "Constitutional",
                  bengali: "কী অধিকারে?",
                  meaning: "কোনো পদে আসীন ব্যক্তির অধিকার প্রশ্ন করার রিট।",
                  english:
                    "Writ questioning the legal authority by which a person holds a public office.",
                  exam: "Quo Warranto শুধু public office-র জন্য প্রযোজ্য",
                },
                {
                  term: "Res Judicata",
                  category: "Latin",
                  cat: "Civil",
                  bengali: "বিচার হয়ে গেছে",
                  meaning: "একই বিষয়ে দুই পক্ষের মধ্যে দ্বিতীয়বার মামলা করা যায় না।",
                  english:
                    "A matter already judged cannot be litigated again between the same parties.",
                  exam: "CPC Section 11 — Res Judicata prevents 'double jeopardy' in civil cases",
                },
                {
                  term: "Locus Standi",
                  category: "Latin",
                  cat: "Civil",
                  bengali: "মামলার অধিকার",
                  meaning: "আদালতে মামলা করার আইনগত সক্ষমতা বা অধিকার।",
                  english:
                    "The legal right or standing to bring a case before a court.",
                  exam: "PIL-এ locus standi শিথিল — যেকোনো নাগরিক জনস্বার্থে মামলা করতে পারেন",
                },
                {
                  term: "Sub Judice",
                  category: "Latin",
                  cat: "Civil",
                  bengali: "বিচারাধীন",
                  meaning: "আদালতে যে বিষয়ের বিচার চলছে — প্রকাশ্যে আলোচনা সীমিত।",
                  english:
                    "A matter under judicial consideration — public discussion restricted.",
                  exam: "Sub Judice matter নিয়ে মিডিয়া রিপোর্ট করলে Contempt of Court হতে পারে",
                },
                {
                  term: "Prima Facie",
                  category: "Latin",
                  cat: "Criminal",
                  bengali: "প্রথম দর্শনে",
                  meaning: "প্রথম দেখায় সত্য বলে মনে হওয়া — চূড়ান্ত প্রমাণ নয়।",
                  english:
                    "At first sight; appears credible without further examination.",
                  exam: "Chargesheet গ্রহণে Prima Facie case দেখা হয় — এটি trial proof নয়",
                },
                {
                  term: "Ex Parte",
                  category: "Latin",
                  cat: "Civil",
                  bengali: "এক পক্ষে",
                  meaning: "এক পক্ষের অনুপস্থিতিতে বা এক পক্ষের পক্ষে নেওয়া সিদ্ধান্ত।",
                  english:
                    "Done for or on behalf of one side only; order passed without hearing other party.",
                  exam: "Ex parte order — অনুপস্থিত পক্ষ set aside application দিতে পারেন",
                },
                {
                  term: "Amicus Curiae",
                  category: "Latin",
                  cat: "Constitutional",
                  bengali: "আদালতের বন্ধু",
                  meaning: "আদালতকে সাহায্য করার জন্য আমন্ত্রিত নিরপেক্ষ বিশেষজ্ঞ।",
                  english:
                    "Friend of the court — neutral expert invited to assist in complex cases.",
                  exam: "PIL মামলায় Supreme Court প্রায়ই Amicus Curiae নিয়োগ করে",
                },
                {
                  term: "Pro Bono",
                  category: "Latin",
                  cat: "Civil",
                  bengali: "বিনামূল্যে",
                  meaning: "পারিশ্রমিক ছাড়া জনকল্যাণে আইনি সেবা প্রদান।",
                  english:
                    "Legal services provided for the public good without charge.",
                  exam: "Legal Services Authority Act 1987 — দরিদ্র ব্যক্তিদের বিনামূল্যে আইনি সহায়তার অধিকার",
                },
                {
                  term: "Mens Rea",
                  category: "Latin",
                  cat: "Criminal",
                  bengali: "অপরাধমূলক মানসিকতা",
                  meaning: "অপরাধ করার মানসিক উদ্দেশ্য বা অপরাধী মন।",
                  english:
                    "Guilty mind — the mental element required for criminal liability.",
                  exam: "Actus reus + Mens rea = Crime. Strict liability অপরাধে Mens rea লাগে না",
                },
                {
                  term: "Actus Reus",
                  category: "Latin",
                  cat: "Criminal",
                  bengali: "অপরাধমূলক কাজ",
                  meaning: "অপরাধের বাহ্যিক উপাদান — শুধু মানসিক উদ্দেশ্য যথেষ্ট নয়।",
                  english: "The guilty act — the physical element of a crime.",
                  exam: "Attempt = incomplete actus reus + full mens rea",
                },
                {
                  term: "In Absentia",
                  category: "Latin",
                  cat: "Criminal",
                  bengali: "অনুপস্থিতিতে",
                  meaning: "অভিযুক্তের অনুপস্থিতিতে বিচার বা সিদ্ধান্ত গ্রহণ।",
                  english:
                    "Trial or judgment given when the accused is absent.",
                  exam: "Proclaimed offender (CrPC 82) এর বিরুদ্ধে in absentia বিচার হতে পারে",
                },
                {
                  term: "Ad Hoc",
                  category: "Latin",
                  cat: "Civil",
                  bengali: "নির্দিষ্ট উদ্দেশ্যে",
                  meaning: "কোনো বিশেষ উদ্দেশ্যে বিশেষভাবে গঠিত — স্থায়ী নয়।",
                  english:
                    "Formed for a specific purpose; temporary arrangement.",
                  exam: "Ad hoc judges (Article 224A) Supreme Court-এ কখনো নিয়োগ হন",
                },
                {
                  term: "Bona Fide",
                  category: "Latin",
                  cat: "Civil",
                  bengali: "সৎ উদ্দেশ্যে",
                  meaning: "সৎ বিশ্বাস ও সৎ উদ্দেশ্যে করা — প্রতারণামূলক নয়।",
                  english: "In good faith; honestly and without deception.",
                  exam: "Bona fide purchaser for value without notice — সম্পত্তি আইনে গুরুত্বপূর্ণ রক্ষা",
                },
                {
                  term: "Mala Fide",
                  category: "Latin",
                  cat: "Civil",
                  bengali: "দুরভিসন্ধিমূলক",
                  meaning: "খারাপ উদ্দেশ্যে বা অসৎ বিশ্বাসে করা।",
                  english:
                    "In bad faith; with malicious or improper intention.",
                  exam: "Mala fide action দেখালে প্রশাসনিক সিদ্ধান্ত বাতিল করা যায়",
                },
                {
                  term: "Ultra Vires",
                  category: "Latin",
                  cat: "Constitutional",
                  bengali: "ক্ষমতার বাইরে",
                  meaning: "আইনি ক্ষমতার সীমার বাইরে গিয়ে করা কাজ।",
                  english:
                    "Beyond the powers; an act done outside one's legal authority.",
                  exam: "Ultra vires company acts, ultra vires delegated legislation — সংবিধান পরীক্ষায় গুরুত্বপূর্ণ",
                },
                {
                  term: "Intra Vires",
                  category: "Latin",
                  cat: "Constitutional",
                  bengali: "ক্ষমতার মধ্যে",
                  meaning: "আইনি ক্ষমতার সীমার মধ্যে করা বৈধ কাজ।",
                  english: "Within the powers; acting within legal authority.",
                  exam: "Ultra vires-এর বিপরীত — Intra vires acts valid ও enforceable",
                },
                {
                  term: "Caveat Emptor",
                  category: "Latin",
                  cat: "Contract",
                  bengali: "ক্রেতা সাবধান",
                  meaning: "পণ্য কেনার আগে ক্রেতাকে নিজে সতর্ক থাকতে হবে।",
                  english:
                    "Buyer beware — buyer must check product before purchase.",
                  exam: "Sale of Goods Act — এখন Consumer Protection Act দ্বারা এই নীতি অনেকটা সংকুচিত",
                },
                {
                  term: "Force Majeure",
                  category: "Civil",
                  cat: "Contract",
                  bengali: "অপ্রতিরোধ্য শক্তি",
                  meaning:
                    "প্রাকৃতিক দুর্যোগ বা অন্য অনিয়ন্ত্রণযোগ্য ঘটনায় চুক্তির দায় থেকে মুক্তি।",
                  english:
                    "Act of God or uncontrollable events excusing contract performance.",
                  exam: "Indian Contract Act Section 56 — Doctrine of Frustration সম্পর্কিত",
                },
                {
                  term: "Estoppel",
                  category: "Civil",
                  cat: "Contract",
                  bengali: "আগের অবস্থান থেকে সরে আসতে বাধা",
                  meaning: "একবার কোনো বিষয় স্বীকার করলে পরে তা অস্বীকার করা যায় না।",
                  english:
                    "Prevents a person from acting inconsistently with their previous conduct.",
                  exam: "Evidence Act Section 115 — Estoppel doctrine. Promissory estoppel-ও গুরুত্বপূর্ণ",
                },
                {
                  term: "Injunction",
                  category: "Civil",
                  cat: "Civil",
                  bengali: "আদালতের নিষেধাজ্ঞা",
                  meaning: "কাউকে কোনো কাজ করতে বা না করতে আদালতের নির্দেশ।",
                  english:
                    "Court order compelling or restraining a party from doing an act.",
                  exam: "Temporary (CPC Order 39) vs Permanent Injunction — পার্থক্য পরীক্ষায় আসে",
                },
                {
                  term: "Affidavit",
                  category: "Civil",
                  cat: "Civil",
                  bengali: "হলফনামা",
                  meaning: "শপথ নিয়ে দেওয়া লিখিত বিবৃতি — মিথ্যা হলে perjury।",
                  english:
                    "Sworn written statement — false affidavit constitutes perjury.",
                  exam: "IPC Section 193 — False affidavit পুনিশমেন্ট পরীক্ষায় প্রায়ই আসে",
                },
                {
                  term: "Subpoena",
                  category: "Civil",
                  cat: "Civil",
                  bengali: "সাক্ষী হাজির আদেশ",
                  meaning: "আদালতে সাক্ষী হিসেবে হাজির হতে বা নথি দাখিল করতে সমন।",
                  english:
                    "Court order requiring a person to attend court as witness or produce documents.",
                  exam: "CrPC Section 61 vs Civil subpoena (CPC Order 16) — পার্থক্য জানুন",
                },
                {
                  term: "Indemnity",
                  category: "Contract",
                  cat: "Contract",
                  bengali: "ক্ষতিপূরণের চুক্তি",
                  meaning: "কোনো পক্ষকে অন্যের কারণে সৃষ্ট ক্ষতি থেকে রক্ষার প্রতিশ্রুতি।",
                  english:
                    "Contract to compensate for loss caused by another's actions.",
                  exam: "Indian Contract Act Section 124-125 — Insurance contract হল indemnity-র উদাহরণ",
                },
                {
                  term: "Bailment",
                  category: "Contract",
                  cat: "Contract",
                  bengali: "সাময়িক সম্পত্তি হস্তান্তর",
                  meaning: "সাময়িকভাবে কারো কাছে সম্পত্তি গচ্ছিত রাখা — মালিকানা বদলায় না।",
                  english:
                    "Temporary delivery of goods for a specific purpose without transfer of ownership.",
                  exam: "Contract Act Section 148 — Bailor ও Bailee-র দায়িত্ব পরীক্ষায় প্রায়ই আসে",
                },
                {
                  term: "Novation",
                  category: "Contract",
                  cat: "Contract",
                  bengali: "চুক্তি প্রতিস্থাপন",
                  meaning: "পুরনো চুক্তি বাতিল করে নতুন চুক্তি করা — নতুন পক্ষ আসতে পারে।",
                  english:
                    "Substitution of a new contract for an old one; new parties may replace old ones.",
                  exam: "Contract Act Section 62 — Novation, rescission, and alteration পরীক্ষায় আসে",
                },
                {
                  term: "Quantum Meruit",
                  category: "Latin",
                  cat: "Contract",
                  bengali: "যতটুকু প্রাপ্য",
                  meaning: "অসম্পূর্ণ কাজের জন্য ন্যায্য পারিশ্রমিকের দাবি।",
                  english:
                    "Reasonable payment for partial services rendered even if contract incomplete.",
                  exam: "Contract Act Section 70 — Quasi-contract, unjust enrichment রোধে ব্যবহৃত",
                },
                {
                  term: "Double Jeopardy",
                  category: "Constitutional",
                  cat: "Criminal",
                  bengali: "দ্বিগুণ বিপদ নিষিদ্ধ",
                  meaning: "একই অপরাধে দুইবার বিচার করা নিষিদ্ধ।",
                  english:
                    "Prohibition on being tried twice for the same offence.",
                  exam: "Article 20(2) — বাংলায় 'একই অপরাধে দ্বিতীয়বার বিচার নিষিদ্ধ' — মূল অধিকার",
                },
                {
                  term: "Nemo Judex in Causa Sua",
                  category: "Latin",
                  cat: "Constitutional",
                  bengali: "নিজের মামলার বিচারক নয়",
                  meaning:
                    "কেউ নিজের মামলার বিচারক হতে পারবেন না — স্বার্থের দ্বন্দ্ব নিষিদ্ধ।",
                  english:
                    "No one shall be a judge in their own cause — rule against bias.",
                  exam: "Natural Justice-এর প্রথম নিয়ম — Administrative Law পরীক্ষায় গুরুত্বপূর্ণ",
                },
                {
                  term: "Audi Alteram Partem",
                  category: "Latin",
                  cat: "Constitutional",
                  bengali: "দুই পক্ষ শোনা",
                  meaning: "উভয় পক্ষকে শোনার সুযোগ না দিয়ে কোনো সিদ্ধান্ত নেওয়া যায় না।",
                  english:
                    "Hear the other side — both parties must be given opportunity to present their case.",
                  exam: "Natural Justice-এর দ্বিতীয় নিয়ম — Nemo judex + Audi alteram partem = Natural Justice",
                },
              ]
                .filter(
                  (card) =>
                    flashcardFilter === "All" || card.cat === flashcardFilter,
                )
                .map((card, idx) => (
                  <button
                    type="button"
                    key={card.term}
                    className="flashcard-container"
                    data-ocid={`flashcard.item.${idx + 1}`}
                    onClick={() =>
                      setFlippedCards((prev) => {
                        const n = new Set(prev);
                        if (n.has(idx)) n.delete(idx);
                        else n.add(idx);
                        return n;
                      })
                    }
                  >
                    <div
                      className={`flashcard-inner${flippedCards.has(idx) ? " flipped" : ""}`}
                    >
                      <div className="flashcard-front">
                        <span
                          style={{
                            display: "inline-block",
                            background: "rgba(201,168,76,0.15)",
                            border: "1px solid rgba(201,168,76,0.3)",
                            borderRadius: "10px",
                            padding: "2px 8px",
                            color: "#c9a84c",
                            fontSize: "10px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            marginBottom: "8px",
                            alignSelf: "flex-start",
                          }}
                        >
                          {card.category}
                        </span>
                        <h3
                          style={{
                            color: "#f0e6d0",
                            fontFamily: "Georgia, serif",
                            fontSize: "18px",
                            fontWeight: "700",
                            margin: "0 0 6px",
                          }}
                        >
                          {card.term}
                        </h3>
                        <p
                          style={{
                            color: "#8899aa",
                            fontSize: "12px",
                            margin: 0,
                          }}
                        >
                          {card.bengali}
                        </p>
                        <p
                          style={{
                            color: "#445566",
                            fontSize: "11px",
                            margin: "8px 0 0",
                            textAlign: "center",
                          }}
                        >
                          👆 টাপ করুন অর্থ দেখতে
                        </p>
                      </div>
                      <div className="flashcard-back">
                        <p
                          style={{
                            color: "#e8dcc8",
                            fontSize: "13px",
                            lineHeight: "1.6",
                            margin: "0 0 8px",
                          }}
                        >
                          {card.meaning}
                        </p>
                        <p
                          style={{
                            color: "#8899aa",
                            fontSize: "12px",
                            lineHeight: "1.5",
                            margin: "0 0 8px",
                            fontStyle: "italic",
                          }}
                        >
                          {card.english}
                        </p>
                        <div
                          style={{
                            borderTop: "1px solid rgba(201,168,76,0.2)",
                            paddingTop: "8px",
                          }}
                        >
                          <p
                            style={{
                              color: "#c9a84c",
                              fontSize: "11px",
                              margin: 0,
                            }}
                          >
                            💡 <strong>Exam Tip:</strong> {card.exam}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </TabsContent>

          {/* ====== MORE LAWS TAB ====== */}
          <TabsContent value="more-laws">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {!moreLawsCategory ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {[
                    {
                      key: "ipr" as const,
                      title: "Intellectual Property Rights (IPR)",
                      desc: "Copyright, Patent, Trademark, Geographical Indications — protect your creative works",
                      icon: "🏛️",
                      sections: [
                        "Copyright Act 1957",
                        "Patents Act 1970",
                        "Trade Marks Act 1999",
                        "GI Act 1999",
                      ],
                    },
                    {
                      key: "banking" as const,
                      title: "Banking & Finance Law",
                      desc: "RBI Act, Banking Regulation Act, SARFAESI, Insolvency & Bankruptcy Code",
                      icon: "🏦",
                      sections: [
                        "RBI Act 1934",
                        "Banking Regulation Act 1949",
                        "SARFAESI Act 2002",
                        "IBC 2016",
                      ],
                    },
                    {
                      key: "env" as const,
                      title: "Environmental Law",
                      desc: "EPA, Wildlife Protection, Forest Conservation, National Green Tribunal",
                      icon: "🌿",
                      sections: [
                        "Environment Protection Act 1986",
                        "Wildlife Protection Act 1972",
                        "Forest Conservation Act 1980",
                        "NGT Act 2010",
                      ],
                    },
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.key}
                      className="law-card"
                      style={{
                        padding: "20px",
                        cursor: "pointer",
                        width: "100%",
                        textAlign: "left",
                      }}
                      onClick={() => setMoreLawsCategory(cat.key)}
                      data-ocid={`morelaws.${cat.key}.card`}
                    >
                      <div style={{ fontSize: "32px", marginBottom: "12px" }}>
                        {cat.icon}
                      </div>
                      <h3
                        style={{
                          color: "#c9a84c",
                          fontFamily: "Georgia, serif",
                          fontSize: "16px",
                          margin: "0 0 8px",
                        }}
                      >
                        {cat.title}
                      </h3>
                      <p
                        style={{
                          color: "#8899aa",
                          fontSize: "13px",
                          lineHeight: "1.6",
                          margin: "0 0 12px",
                        }}
                      >
                        {cat.desc}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "4px",
                        }}
                      >
                        {cat.sections.map((s) => (
                          <span
                            key={s}
                            style={{
                              background: "rgba(201,168,76,0.1)",
                              border: "1px solid rgba(201,168,76,0.25)",
                              borderRadius: "8px",
                              padding: "2px 7px",
                              color: "#a89060",
                              fontSize: "10px",
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setMoreLawsCategory(null);
                        setMoreLawsResult(null);
                        setMoreLawsQuery("");
                      }}
                      style={{
                        background: "rgba(201,168,76,0.1)",
                        border: "1px solid rgba(201,168,76,0.3)",
                        borderRadius: "8px",
                        padding: "6px 12px",
                        color: "#c9a84c",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                      data-ocid="morelaws.back.button"
                    >
                      ← Back
                    </button>
                    <h3
                      style={{
                        color: "#c9a84c",
                        fontFamily: "Georgia, serif",
                        fontSize: "16px",
                        margin: 0,
                      }}
                    >
                      {moreLawsCategory === "ipr"
                        ? "🏛️ IPR Laws"
                        : moreLawsCategory === "banking"
                          ? "🏦 Banking Laws"
                          : "🌿 Environmental Laws"}
                    </h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginBottom: "16px",
                    }}
                  >
                    <input
                      value={moreLawsQuery}
                      onChange={(e) => setMoreLawsQuery(e.target.value)}
                      placeholder="Search sections..."
                      data-ocid="morelaws.search_input"
                      style={{
                        flex: 1,
                        background: "#07101f",
                        border: "1px solid rgba(201,168,76,0.3)",
                        borderRadius: "8px",
                        padding: "10px 14px",
                        color: "#e8dcc8",
                        fontSize: "13px",
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && moreLawsQuery.trim()) {
                          const r = generateLawExplanation(
                            moreLawsQuery,
                            "english",
                          );
                          setMoreLawsResult(r);
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (moreLawsQuery.trim()) {
                          const r = generateLawExplanation(
                            moreLawsQuery,
                            "english",
                          );
                          setMoreLawsResult(r);
                        }
                      }}
                      data-ocid="morelaws.search.button"
                      style={{
                        background: "rgba(201,168,76,0.2)",
                        border: "1px solid rgba(201,168,76,0.4)",
                        borderRadius: "8px",
                        padding: "10px 16px",
                        color: "#c9a84c",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      Search
                    </button>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(220px, 1fr))",
                      gap: "8px",
                      marginBottom: "20px",
                    }}
                    data-ocid="morelaws.list"
                  >
                    {(moreLawsCategory === "ipr"
                      ? [
                          {
                            q: "copyright act 14",
                            label: "Copyright Act §14",
                            desc: "Meaning of Copyright",
                          },
                          {
                            q: "patent act 2",
                            label: "Patents Act §2",
                            desc: "Definitions — Invention",
                          },
                          {
                            q: "patent act 48",
                            label: "Patents Act §48",
                            desc: "Rights of Patentee",
                          },
                          {
                            q: "trademark 2",
                            label: "Trade Marks Act §2",
                            desc: "Definition of Trademark",
                          },
                          {
                            q: "trademark 29",
                            label: "Trade Marks Act §29",
                            desc: "Infringement",
                          },
                          {
                            q: "gi act",
                            label: "GI Act 1999",
                            desc: "Geographical Indications",
                          },
                        ]
                      : moreLawsCategory === "banking"
                        ? [
                            {
                              q: "rbi act 17",
                              label: "RBI Act §17",
                              desc: "Business RBI May Transact",
                            },
                            {
                              q: "rbi act 42",
                              label: "RBI Act §42",
                              desc: "Cash Reserve Ratio (CRR)",
                            },
                            {
                              q: "banking regulation 22",
                              label: "Banking Regulation §22",
                              desc: "Licensing of Banks",
                            },
                            {
                              q: "sarfaesi 13",
                              label: "SARFAESI §13",
                              desc: "Enforcement of Security",
                            },
                            {
                              q: "ibc 7",
                              label: "IBC §7",
                              desc: "Insolvency by Financial Creditor",
                            },
                          ]
                        : [
                            {
                              q: "epa 2",
                              label: "EPA §2",
                              desc: "Definitions",
                            },
                            {
                              q: "epa 3",
                              label: "EPA §3",
                              desc: "Central Govt Powers",
                            },
                            {
                              q: "epa 15",
                              label: "EPA §15",
                              desc: "Penalties",
                            },
                            {
                              q: "wildlife 9",
                              label: "Wildlife Act §9",
                              desc: "Prohibition of Hunting",
                            },
                            {
                              q: "forest conservation act 2",
                              label: "Forest Act §2",
                              desc: "Restrictions on Diversion",
                            },
                            {
                              q: "ngt 14",
                              label: "NGT Act §14",
                              desc: "Jurisdiction of NGT",
                            },
                          ]
                    ).map((item, idx) => (
                      <button
                        key={item.q}
                        type="button"
                        data-ocid={`morelaws.section.${idx + 1}`}
                        onClick={() => {
                          const r = generateLawExplanation(item.q, "english");
                          setMoreLawsResult(r);
                          setMoreLawsQuery(item.label);
                        }}
                        style={{
                          background: "#0f2040",
                          border: "1px solid rgba(201,168,76,0.3)",
                          borderRadius: "10px",
                          padding: "12px 14px",
                          color: "#e8dcc8",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "border-color 0.2s",
                        }}
                      >
                        <div
                          style={{
                            color: "#c9a84c",
                            fontSize: "12px",
                            fontWeight: "700",
                            marginBottom: "4px",
                          }}
                        >
                          {item.label}
                        </div>
                        <div style={{ color: "#8899aa", fontSize: "11px" }}>
                          {item.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                  {moreLawsResult && (
                    <div
                      style={{
                        background: "#0f2040",
                        border: "1px solid rgba(201,168,76,0.4)",
                        borderRadius: "12px",
                        padding: "20px",
                      }}
                      data-ocid="morelaws.result"
                    >
                      <h3
                        style={{
                          color: "#c9a84c",
                          fontFamily: "Georgia, serif",
                          fontSize: "16px",
                          margin: "0 0 4px",
                        }}
                      >
                        {moreLawsResult.title}
                      </h3>
                      <p
                        style={{
                          color: "#8899aa",
                          fontSize: "12px",
                          margin: "0 0 16px",
                        }}
                      >
                        {moreLawsResult.actName} · §
                        {moreLawsResult.sectionNumber}
                      </p>
                      <div
                        style={{
                          background: "rgba(7,16,31,0.5)",
                          border: "1px solid rgba(201,168,76,0.2)",
                          borderRadius: "8px",
                          padding: "14px",
                          marginBottom: "14px",
                        }}
                      >
                        <p
                          style={{
                            color: "#d4c9b0",
                            fontSize: "13px",
                            lineHeight: "1.7",
                            margin: 0,
                            fontStyle: "italic",
                          }}
                        >
                          {moreLawsResult.sectionText}
                        </p>
                      </div>
                      <p
                        style={{
                          color: "#e8dcc8",
                          fontSize: "13px",
                          lineHeight: "1.8",
                          margin: "0 0 12px",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {moreLawsResult.explanation}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            shareOnWhatsApp(
                              moreLawsResult.title,
                              moreLawsResult.explanation,
                            )
                          }
                          style={{
                            background: "rgba(37,211,102,0.15)",
                            border: "1px solid rgba(37,211,102,0.4)",
                            borderRadius: "8px",
                            padding: "6px 12px",
                            color: "#25D366",
                            cursor: "pointer",
                            fontSize: "12px",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                          data-ocid="morelaws.whatsapp.button"
                        >
                          <Share2 className="w-3.5 h-3.5" /> WhatsApp
                        </button>
                      </div>
                    </div>
                  )}
                  {moreLawsQuery && !moreLawsResult && (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "32px",
                        color: "#666",
                      }}
                      data-ocid="morelaws.empty_state"
                    >
                      <Scale
                        style={{
                          width: "32px",
                          height: "32px",
                          margin: "0 auto 8px",
                          opacity: 0.3,
                        }}
                      />
                      <p style={{ fontSize: "13px" }}>
                        No result found. Try a different search.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
