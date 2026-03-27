import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Languages,
  Lightbulb,
  Link2,
  Scale,
  Search,
  Share2,
  Star,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  const [caseQuery, setCaseQuery] = useState("");
  const [caseTopicFilter, setCaseTopicFilter] = useState("");
  const [ipcBnsQuery, setIpcBnsQuery] = useState("");
  const [glossaryQuery, setGlossaryQuery] = useState("");
  const [glossaryLetter, setGlossaryLetter] = useState("");

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
    return true;
  }

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
    fontSize: "13px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box" as const,
  };
  const labelStyle = {
    fontSize: "11px",
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
        </Tabs>
      </div>
    </div>
  );
}
