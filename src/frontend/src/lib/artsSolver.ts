export interface ArtsSolverInput {
  subject: string;
  classLevel: number;
  chapter: string;
  question: string;
  type: "essay" | "short" | "mcq";
}

function isEnglishSubject(subject: string): boolean {
  return subject === "english";
}

function getSubjectLabel(subject: string): string {
  const labels: Record<string, string> = {
    bengali: "বাংলা",
    english: "English",
    history: "ইতিহাস",
    geography: "ভূগোল",
    politicalscience: "রাষ্ট্রবিজ্ঞান",
    philosophy: "দর্শন",
    sociology: "সমাজবিজ্ঞান",
    sanskrit: "সংস্কৃত",
  };
  return labels[subject] ?? subject;
}

function generateEssayBengali(
  subject: string,
  classLevel: number,
  chapter: string,
  question: string,
): string {
  const subjectLabel = getSubjectLabel(subject);

  // Subject-specific content maps
  const contentMap: Record<string, Record<string, string>> = {
    history: {
      "মৌর্য সাম্রাজ্য":
        "মৌর্য সাম্রাজ্য ছিল ভারতের প্রথম বৃহৎ সাম্রাজ্য। চন্দ্রগুপ্ত মৌর্য ৩২২ খ্রিস্টপূর্বাব্দে এই সাম্রাজ্য প্রতিষ্ঠা করেন। তাঁর পরামর্শদাতা ছিলেন কৌটিল্য বা চাণক্য। অশোক এই সাম্রাজ্যের সর্বশ্রেষ্ঠ শাসক ছিলেন। কলিঙ্গ যুদ্ধের পর অশোক বৌদ্ধ ধর্ম গ্রহণ করেন এবং অহিংসার নীতি অনুসরণ করেন। মৌর্য প্রশাসন অত্যন্ত সংগঠিত ছিল — কেন্দ্রীয় সরকার থেকে গ্রাম পর্যায় পর্যন্ত বিস্তৃত ছিল।",
      "গুপ্ত সাম্রাজ্য":
        "গুপ্ত সাম্রাজ্যকে ভারতের 'স্বর্ণযুগ' বলা হয়। চন্দ্রগুপ্ত প্রথম ৩২০ খ্রিস্টাব্দে গুপ্ত বংশ প্রতিষ্ঠা করেন। সমুদ্রগুপ্ত ছিলেন একজন মহান সামরিক বিজেতা এবং কবি। চন্দ্রগুপ্ত বিক্রমাদিত্যের সময় বিজ্ঞান, শিল্পকলা ও সাহিত্যের ব্যাপক উন্নতি হয়। কালিদাস, আর্যভট্ট এই যুগের বিখ্যাত ব্যক্তিত্ব।",
      "মুঘল সাম্রাজ্য":
        "মুঘল সাম্রাজ্য ১৫২৬ খ্রিস্টাব্দে বাবর প্রতিষ্ঠা করেন। প্রথম পানিপথের যুদ্ধে ইব্রাহিম লোদীকে পরাজিত করে বাবর দিল্লি অধিকার করেন। আকবর ছিলেন সবচেয়ে শক্তিশালী মুঘল সম্রাট। তিনি দীন-ই-ইলাহি ধর্ম প্রবর্তন করেন এবং হিন্দু-মুসলিম সম্প্রীতি প্রতিষ্ঠার চেষ্টা করেন। শাহজাহান তাজমহল নির্মাণ করেন।",
      "ভারতীয় জাতীয়তাবাদ":
        "উনিশ শতকে ভারতে জাতীয়তাবাদের উদ্ভব হয়। ১৮৮৫ সালে ভারতীয় জাতীয় কংগ্রেস প্রতিষ্ঠিত হয়। বাল গঙ্গাধর তিলক, বিপিনচন্দ্র পাল, লালা লাজপত রাই — এই ত্রয়ী 'লাল-বাল-পাল' নামে পরিচিত ছিলেন। স্বদেশী আন্দোলন ১৯০৫ সালে বঙ্গভঙ্গের বিরোধিতায় শুরু হয়। এই আন্দোলন দেশীয় শিল্প ও পণ্য ব্যবহারকে উৎসাহিত করে।",
      "অসহযোগ আন্দোলন":
        "গান্ধীজির নেতৃত্বে ১৯২০-২২ সালে অসহযোগ আন্দোলন সংঘটিত হয়। এই আন্দোলনে ব্রিটিশ পণ্য বয়কট, সরকারি চাকরি থেকে পদত্যাগ এবং ব্রিটিশ আদালত বর্জন করা হয়। চৌরিচৌরার ঘটনায় হিংসা ছড়িয়ে পড়লে গান্ধীজি আন্দোলন প্রত্যাহার করেন। এই আন্দোলন জাতীয় চেতনাকে ব্যাপকভাবে জাগ্রত করে।",
      default:
        "ভারতের ইতিহাস একটি দীর্ঘ ও বৈচিত্র্যময় যাত্রার ইতিহাস। প্রাচীনকাল থেকে আধুনিক যুগ পর্যন্ত বিভিন্ন সাম্রাজ্য, আন্দোলন ও সংস্কৃতির সমন্বয়ে ভারতীয় সভ্যতা গড়ে উঠেছে। রাজনৈতিক, সামাজিক ও অর্থনৈতিক পরিবর্তনের মধ্য দিয়ে ভারত আজ বিশ্বের বৃহত্তম গণতন্ত্র।",
    },
    geography: {
      "পৃথিবীর গঠন":
        "পৃথিবীর অভ্যন্তরীণ গঠন তিনটি প্রধান স্তরে বিভক্ত — ভূত্বক, গুরুমণ্ডল ও কেন্দ্রমণ্ডল। ভূত্বক সবচেয়ে পাতলা স্তর এবং এটি দুই ভাগে বিভক্ত — মহাদেশীয় ভূত্বক ও সামুদ্রিক ভূত্বক। গুরুমণ্ডলে সিলিকেট ও ম্যাগনেসিয়াম খনিজ পাওয়া যায়। কেন্দ্রমণ্ডল আবার বাইরের তরল কোর ও ভেতরের কঠিন কোরে বিভক্ত।",
      বায়ুমণ্ডল:
        "বায়ুমণ্ডল পৃথিবীকে ঘিরে থাকা গ্যাসের আবরণ। এটি পাঁচটি স্তরে বিভক্ত — ট্রপোস্ফিয়ার, স্ট্রাটোস্ফিয়ার, মেসোস্ফিয়ার, থার্মোস্ফিয়ার ও এক্সোস্ফিয়ার। ট্রপোস্ফিয়ারে আবহাওয়া ঘটনা সংঘটিত হয়। ওজোন স্তর স্ট্রাটোস্ফিয়ারে অবস্থিত যা সূর্যের ক্ষতিকর অতিবেগুনি রশ্মি থেকে রক্ষা করে।",
      "ভারতের কৃষি":
        "ভারত একটি কৃষিপ্রধান দেশ। এখানে দুটি প্রধান ফসলের মৌসুম রয়েছে — খরিফ ও রবি। ধান, গম, ডাল ও তুলা প্রধান ফসল। সবুজ বিপ্লব ১৯৬০-এর দশকে কৃষি উৎপাদন বৃদ্ধি করে। পাঞ্জাব ও হরিয়ানা সবুজ বিপ্লবের কেন্দ্রস্থল ছিল।",
      default:
        "ভূগোল হলো পৃথিবীর ভৌত ও মানবিক বৈশিষ্ট্য অধ্যয়নের বিজ্ঞান। এটি মানুষ ও পরিবেশের পারস্পরিক সম্পর্ক বিশ্লেষণ করে। প্রাকৃতিক ভূগোল ভূমিরূপ, জলবায়ু, মাটি ও উদ্ভিদ নিয়ে আলোচনা করে। মানব ভূগোল জনসংখ্যা, নগরায়ণ ও পরিবহন নিয়ে কাজ করে।",
    },
    politicalscience: {
      "মৌলিক অধিকার":
        "ভারতীয় সংবিধানের তৃতীয় অংশে (১২-৩৫ অনুচ্ছেদ) মৌলিক অধিকারগুলো লিপিবদ্ধ আছে। এগুলো হলো: সাম্যের অধিকার (১৪-১৮), স্বাধীনতার অধিকার (১৯-২২), শোষণের বিরুদ্ধে অধিকার (২৩-২৪), ধর্মীয় স্বাধীনতার অধিকার (২৫-২৮), সাংস্কৃতিক ও শিক্ষার অধিকার (২৯-৩০), এবং সাংবিধানিক প্রতিকারের অধিকার (৩২)। মৌলিক অধিকার লঙ্ঘন হলে সুপ্রিম কোর্টে যাওয়া যায়।",
      গণতন্ত্র:
        "গণতন্ত্র হলো জনগণের দ্বারা পরিচালিত শাসনব্যবস্থা। আব্রাহাম লিংকন বলেছিলেন, গণতন্ত্র হলো 'জনগণের জন্য, জনগণের দ্বারা ও জনগণের শাসন'। সংসদীয় ও রাষ্ট্রপতিশাসিত — দুই ধরনের গণতন্ত্র প্রচলিত। ভারতে সংসদীয় গণতন্ত্র বিদ্যমান। প্রতি পাঁচ বছরে সাধারণ নির্বাচন অনুষ্ঠিত হয়।",
      default:
        "রাষ্ট্রবিজ্ঞান হলো রাষ্ট্র, সরকার ও রাজনৈতিক ব্যবস্থা সম্পর্কিত বিজ্ঞান। এটি ক্ষমতার উৎস, প্রয়োগ ও বিতরণ বিশ্লেষণ করে। আধুনিক রাষ্ট্রবিজ্ঞানে গণতন্ত্র, মানবাধিকার ও আন্তর্জাতিক সম্পর্ক গুরুত্বপূর্ণ বিষয়।",
    },
    philosophy: {
      "ন্যায় দর্শন":
        "ন্যায় দর্শন গৌতম মুনি প্রতিষ্ঠা করেন। এই দর্শনের মূল গ্রন্থ হলো 'ন্যায়সূত্র'। ন্যায় দর্শনে প্রমাণের চারটি উৎস স্বীকার করা হয়: প্রত্যক্ষ (ইন্দ্রিয়জ্ঞান), অনুমান (যুক্তি), উপমান (তুলনা) ও শব্দ (আপ্তবাক্য)। অনুমানের পঞ্চাবয়ব যুক্তিপদ্ধতি এই দর্শনের বিশেষ বৈশিষ্ট্য। প্রতিজ্ঞা, হেতু, উদাহরণ, উপনয় ও নিগমন — এই পাঁচটি অংশ মিলে অনুমান গঠিত হয়।",
      "বৌদ্ধ দর্শন":
        "বৌদ্ধ দর্শনের মূল ভিত্তি হলো গৌতম বুদ্ধের শিক্ষা। চারটি আর্যসত্য হলো: দুঃখ, দুঃখের কারণ (তৃষ্ণা), দুঃখ নিরোধ ও দুঃখ নিরোধের পথ। অষ্টাঙ্গিক মার্গ হলো মধ্যপন্থী জীবনযাপনের পথ। বৌদ্ধ দর্শন অনিত্যতা, অনাত্মা ও দুঃখের উপর জোর দেয়। নির্বাণ হলো সকল কষ্ট থেকে মুক্তির অবস্থা।",
      default:
        "দর্শন হলো জীবন, জ্ঞান ও সত্তার মূল প্রশ্নগুলো নিয়ে গভীর চিন্তার শাস্ত্র। ভারতীয় দর্শনে আস্তিক ও নাস্তিক — দুটি শাখা আছে। আস্তিক দর্শনে বেদের কর্তৃত্ব স্বীকার করা হয়, যেমন সাংখ্য, যোগ, ন্যায়, বৈশেষিক, মীমাংসা ও বেদান্ত।",
    },
    sociology: {
      "পরিবার ও বিবাহ":
        "পরিবার হলো সমাজের মৌলিক একক। পরিবারের প্রধান কাজ হলো সন্তান লালনপালন, সমাজীকরণ ও অর্থনৈতিক সহায়তা। পরিবার দুই ধরনের — একক পরিবার ও যৌথ পরিবার। বিবাহ হলো সামাজিকভাবে স্বীকৃত যৌনসম্পর্ক ও পারিবারিক গঠনের প্রক্রিয়া। ভারতে হিন্দু বিবাহ একটি ধর্মীয় অনুষ্ঠান হিসেবে বিবেচিত।",
      "সামাজিক স্তরবিন্যাস":
        "সামাজিক স্তরবিন্যাস হলো সমাজের বিভিন্ন শ্রেণিতে বিভক্ত হওয়ার প্রক্রিয়া। ভারতে বর্ণ প্রথা সবচেয়ে পুরনো স্তরবিন্যাস পদ্ধতি। ব্রাহ্মণ, ক্ষত্রিয়, বৈশ্য ও শূদ্র — এই চারটি বর্ণ প্রাচীন ভারতীয় সমাজে প্রচলিত ছিল। আধুনিক যুগে শ্রেণি, লিঙ্গ ও জাতিগত পরিচয় স্তরবিন্যাসের ভিত্তি হয়েছে।",
      default:
        "সমাজবিজ্ঞান মানব সমাজ ও সামাজিক আচরণ অধ্যয়নের বিজ্ঞান। এমিল ডুর্খেইম, ম্যাক্স ওয়েবার ও কার্ল মার্ক্স আধুনিক সমাজবিজ্ঞানের প্রতিষ্ঠাতা। সমাজবিজ্ঞান পরিবার, ধর্ম, শ্রেণি, লিঙ্গ ও রাষ্ট্রের মতো বিষয়গুলো বিশ্লেষণ করে।",
    },
    bengali: {
      "ব্যাকরণ - সন্ধি":
        "সন্ধি হলো দুটি পদ বা শব্দের মিলনে সৃষ্ট পরিবর্তন। সন্ধি তিন প্রকার: স্বরসন্ধি, ব্যঞ্জনসন্ধি ও বিসর্গসন্ধি। স্বরসন্ধির উদাহরণ: সূর্য + অস্ত = সূর্যাস্ত। ব্যঞ্জনসন্ধির উদাহরণ: জগৎ + ঈশ = জগদীশ। সন্ধি সঠিকভাবে বোঝা বাংলা ব্যাকরণে অত্যন্ত গুরুত্বপূর্ণ।",
      "ব্যাকরণ - কারক":
        "কারক হলো বাক্যে ক্রিয়ার সাথে বিশেষ্য বা সর্বনামের সম্পর্ক। বাংলায় ছয়টি কারক আছে: কর্তৃকারক, কর্মকারক, করণকারক, সম্প্রদান কারক, অপাদান কারক ও অধিকরণ কারক। কর্তৃকারক ক্রিয়া সম্পাদন করে (রাম যায়)। কর্মকারক ক্রিয়ার লক্ষ্যস্থল (রাম ফল খায়)।",
      default:
        "বাংলা সাহিত্য ও ব্যাকরণ বিষয়টি শিক্ষার্থীদের ভাষার গভীরে প্রবেশ করতে সাহায্য করে। রবীন্দ্রনাথ, শরৎচন্দ্র, মানিক বন্দ্যোপাধ্যায়ের মতো লেখকদের রচনা বাংলা সাহিত্যকে সমৃদ্ধ করেছে। ব্যাকরণের জ্ঞান ভাষাকে সঠিকভাবে প্রয়োগ করতে সহায়তা করে।",
    },
    sanskrit: {
      "সংস্কৃত ব্যাকরণ - সন্ধি":
        "সংস্কৃত সন্ধি তিন প্রকার: স্বরসন্ধি (অচ্ সন্ধি), হলন্ত সন্ধি (হল্ সন্ধি) ও বিসর্গ সন্ধি। স্বরসন্ধির উদাহরণ: রাম + অনুজ = রামানুজ (আ + অ = আ)। গুণ সন্ধিতে অ/আ + ই/ঈ = এ হয়। বৃদ্ধি সন্ধিতে অ/আ + এ/ঐ = ঐ হয়। যানসন্ধিতে ই/ঈ + অভিন্ন = য্ হয়।",
      default:
        "সংস্কৃত ভারতের প্রাচীনতম ভাষা এবং অধিকাংশ ভারতীয় ভাষার জননী। বেদ, উপনিষদ ও মহাকাব্যগুলো সংস্কৃত ভাষায় রচিত। কালিদাসের শকুন্তলা, মেঘদূত সংস্কৃত সাহিত্যের অমর সৃষ্টি।",
    },
  };

  const chapterContent =
    contentMap[subject]?.[chapter] ?? contentMap[subject]?.default ?? "";

  return `✅ উত্তর: ${question}

📌 ভূমিকা:
${chapterContent ? `${chapterContent.split("।").slice(0, 2).join("।")}。` : `${chapter} হলো ${subjectLabel} বিষয়ের একটি গুরুত্বপূর্ণ অধ্যায়। এই অধ্যায়টি WBCHSE পাঠ্যক্রমে বিশেষ গুরুত্ব বহন করে।`}

📝 মূল আলোচনা:
${
  chapterContent ||
  `প্রশ্নটি "${chapter}" অধ্যায়ের অন্তর্গত। এই বিষয়ে মূল ধারণাগুলো হলো:

• প্রথম বিন্দু: মূল সংজ্ঞা ও ধারণা
• দ্বিতীয় বিন্দু: ঐতিহাসিক প্রেক্ষাপট ও বিকাশ
• তৃতীয় বিন্দু: প্রাসঙ্গিক তথ্য ও বিশ্লেষণ
• চতুর্থ বিন্দু: সমাজ ও সংস্কৃতিতে প্রভাব`
}

💡 উদাহরণ:
উদাহরণস্বরূপ বলা যায় — ${chapter} সম্পর্কিত প্রশ্নের উত্তরে আমরা দেখি যে এই বিষয়টি আমাদের দৈনন্দিন জীবন ও সমাজের সাথে গভীরভাবে সংযুক্ত। WBCHSE পরীক্ষায় এই ধরনের প্রশ্নের উত্তর দেওয়ার সময় সুনির্দিষ্ট উদাহরণ দিতে হবে।

📌 উপসংহার:
পরিশেষে বলা যায়, ${chapter} বিষয়টি ${subjectLabel} পাঠ্যক্রমের একটি অপরিহার্য অংশ। এই বিষয়ে সম্যক জ্ঞান অর্জন করলে পরীক্ষায় ভালো ফলাফল করা সম্ভব। WBCHSE-এর নির্ধারিত সিলেবাস মেনে এই অধ্যায়টি ভালোভাবে পড়া উচিত।

[অধ্যায়: ${chapter} | শ্রেণি: Class ${classLevel} | বিষয়: ${subjectLabel}]`;
}

function generateShortBengali(
  subject: string,
  classLevel: number,
  chapter: string,
  question: string,
): string {
  const subjectLabel = getSubjectLabel(subject);
  return `✅ সংক্ষিপ্ত উত্তর: ${question}

📌 মূল বক্তব্য:
${chapter} বিষয়ক এই প্রশ্নে মূল বিষয়গুলো হলো:

• সংজ্ঞা: ${chapter} হলো ${subjectLabel}-এর একটি মৌলিক ধারণা যা শ্রেণি ${classLevel}-এর পাঠ্যক্রমে অন্তর্ভুক্ত।
• বৈশিষ্ট্য: এর প্রধান বৈশিষ্ট্যগুলো হলো এর ঐতিহাসিক গুরুত্ব, সামাজিক প্রাসঙ্গিকতা ও পরীক্ষামূলক তাৎপর্য।
• উদাহরণ: বাস্তব উদাহরণ দিয়ে বোঝালে — ${chapter} সম্পর্কিত ঘটনা বা ব্যক্তিত্ব এর ব্যাখ্যাকে সহজতর করে।

💡 স্মরণীয় বিষয়:
WBCHSE পরীক্ষায় সংক্ষিপ্ত প্রশ্নের উত্তরে সংজ্ঞা, উদাহরণ ও তাৎপর্য অবশ্যই উল্লেখ করতে হবে।

[অধ্যায়: ${chapter} | শ্রেণি: Class ${classLevel} | বিষয়: ${subjectLabel}]`;
}

function generateMCQBengali(
  subject: string,
  classLevel: number,
  chapter: string,
  question: string,
): string {
  const subjectLabel = getSubjectLabel(subject);

  // Pre-defined MCQs for common topics
  type MCQEntry = {
    q: string;
    options: [string, string, string, string];
    correct: number;
    explanation: string;
  };

  const mcqMap: Record<string, MCQEntry[]> = {
    "মৌর্য সাম্রাজ্য": [
      {
        q: "মৌর্য সাম্রাজ্যের প্রতিষ্ঠাতা কে?",
        options: ["অশোক", "চন্দ্রগুপ্ত মৌর্য", "বিম্বিসার", "বিন্দুসার"],
        correct: 1,
        explanation:
          "চন্দ্রগুপ্ত মৌর্য ৩২২ খ্রিস্টপূর্বাব্দে মৌর্য সাম্রাজ্যের প্রতিষ্ঠা করেন। তাঁর উপদেষ্টা ছিলেন চাণক্য।",
      },
    ],
    "গুপ্ত সাম্রাজ্য": [
      {
        q: "গুপ্ত যুগকে কী বলা হয়?",
        options: ["লৌহ যুগ", "ব্রোঞ্জ যুগ", "ভারতের স্বর্ণযুগ", "ঐতিহাসিক যুগ"],
        correct: 2,
        explanation:
          "গুপ্ত যুগকে ভারতের 'স্বর্ণযুগ' বলা হয় কারণ এই সময় বিজ্ঞান, শিল্পকলা, সাহিত্য ও চিকিৎসার অভূতপূর্ব উন্নতি হয়েছিল।",
      },
    ],
    "মৌলিক অধিকার": [
      {
        q: "ভারতীয় সংবিধানে মৌলিক অধিকার কোথায় উল্লেখ আছে?",
        options: ["প্রথম অংশে", "দ্বিতীয় অংশে", "তৃতীয় অংশে", "চতুর্থ অংশে"],
        correct: 2,
        explanation:
          "ভারতীয় সংবিধানের তৃতীয় অংশে (অনুচ্ছেদ ১২-৩৫) মৌলিক অধিকারগুলো লিপিবদ্ধ আছে।",
      },
    ],
    "ন্যায় দর্শন": [
      {
        q: "ন্যায় দর্শনে প্রমাণের সংখ্যা কত?",
        options: ["দুটি", "তিনটি", "চারটি", "পাঁচটি"],
        correct: 2,
        explanation:
          "ন্যায় দর্শনে চারটি প্রমাণ স্বীকার করা হয়: প্রত্যক্ষ, অনুমান, উপমান ও শব্দ।",
      },
    ],
    "ব্যাকরণ - সন্ধি": [
      {
        q: "স্বরসন্ধির একটি উদাহরণ কোনটি?",
        options: [
          "জগৎ + ঈশ = জগদীশ",
          "সূর্য + অস্ত = সূর্যাস্ত",
          "তৎ + কাল = তৎকাল",
          "মনঃ + যোগ = মনোযোগ",
        ],
        correct: 1,
        explanation: "সূর্য + অস্ত = সূর্যাস্ত একটি স্বরসন্ধির উদাহরণ (অ + অ = আ)।",
      },
    ],
  };

  const examples = mcqMap[chapter];
  if (examples && examples.length > 0) {
    const ex = examples[0];
    const optionLabels = ["(a)", "(b)", "(c)", "(d)"];
    const correctLabel = optionLabels[ex.correct];
    return `❓ প্রশ্ন: ${question || ex.q}

(a) ${ex.options[0]}
(b) ${ex.options[1]}
(c) ${ex.options[2]}
(d) ${ex.options[3]}

✅ সঠিক উত্তর: ${correctLabel} ${ex.options[ex.correct]}

💡 ব্যাখ্যা: ${ex.explanation}

[অধ্যায়: ${chapter} | শ্রেণি: Class ${classLevel} | বিষয়: ${subjectLabel}]`;
  }

  // Generic MCQ
  return `❓ প্রশ্ন: ${question || `${chapter} সম্পর্কে সঠিক তথ্য কোনটি?`}

(a) ${chapter}-এর উদ্ভব প্রাচীনকালে হয়েছিল
(b) ${chapter} শুধুমাত্র ভারতে সীমাবদ্ধ
(c) ${chapter} বিষয়টি ${subjectLabel}-এর কেন্দ্রীয় প্রতিপাদ্য
(d) ${chapter} আধুনিক যুগে গুরুত্বহীন

✅ সঠিক উত্তর: (c) ${chapter} বিষয়টি ${subjectLabel}-এর কেন্দ্রীয় প্রতিপাদ্য

💡 ব্যাখ্যা: WBCHSE পাঠ্যক্রম অনুযায়ী ${chapter} হলো ${subjectLabel} বিষয়ের একটি কেন্দ্রীয় প্রসঙ্গ। এটি Class ${classLevel}-এর সিলেবাসে বিশেষ গুরুত্ব দেওয়া হয়েছে এবং পরীক্ষায় প্রায়ই এই বিষয়ে প্রশ্ন আসে।

[অধ্যায়: ${chapter} | শ্রেণি: Class ${classLevel} | বিষয়: ${subjectLabel}]`;
}

function generateEssayEnglish(
  classLevel: number,
  chapter: string,
  question: string,
): string {
  const contentMap: Record<string, string> = {
    "Prose - The Eyes Have It":
      "Ruskin Bond's short story 'The Eyes Have It' is a masterpiece of subtle irony and perception. The story revolves around two visually impaired passengers who believe the other can see. The narrator, a blind man, enjoys a conversation with a young woman on a train journey. Both are unaware that the other is also visually impaired. The story beautifully explores the theme of perception versus reality.",
    "Poetry - The Road Not Taken":
      "Robert Frost's poem 'The Road Not Taken' is one of the most celebrated poems in English literature. The speaker, standing at a fork in a road in a forest, must choose one path. The poem explores themes of choice, individuality, and the roads not taken in life. The famous last lines reflect on a choice made long ago with a sense of satisfaction.",
    "Drama - Macbeth":
      "Shakespeare's 'Macbeth' is a profound tragedy exploring ambition, power, and moral corruption. Macbeth, a brave Scottish general, receives a prophecy from three witches that he will become King of Scotland. Driven by ambition and urged by his wife, Lady Macbeth, he murders King Duncan. His subsequent reign is marked by tyranny, guilt, and paranoia.",
    "Grammar - Tenses":
      "Tenses in English grammar indicate the time of an action or event. There are three main tenses: Present, Past, and Future, each with four aspects: Simple, Continuous, Perfect, and Perfect Continuous. For example, 'She writes' (Simple Present), 'She is writing' (Present Continuous), 'She has written' (Present Perfect), 'She has been writing' (Present Perfect Continuous).",
    default:
      "This chapter from the WBCHSE English syllabus covers important aspects of language and literature. Understanding the themes, characters, and literary devices is essential for examination success.",
  };

  const content = contentMap[chapter] ?? contentMap.default;

  return `✅ Answer: ${question}

📌 Introduction:
${content.split(".").slice(0, 2).join(".")}.

📝 Main Discussion:
${content}

Key themes to remember:
• Theme 1: The central message or argument of the text
• Theme 2: Character development and narrative technique
• Theme 3: Language use and literary devices
• Theme 4: Social and cultural context

💡 Example:
For instance, in ${chapter}, the author/poet uses specific literary techniques such as metaphor, simile, or irony to convey the central message. This makes the text relevant to WBCHSE examination questions.

📌 Conclusion:
In conclusion, ${chapter} is an important part of the Class ${classLevel} WBCHSE English syllabus. A thorough understanding of the text's themes, language, and context is essential for scoring well in examinations.

[Chapter: ${chapter} | Class: ${classLevel} | Subject: English]`;
}

function generateShortEnglish(
  classLevel: number,
  chapter: string,
  question: string,
): string {
  return `✅ Short Answer: ${question}

📌 Key Points:
${chapter} covers the following important aspects:

• Definition/Summary: ${chapter} is a significant part of the Class ${classLevel} WBCHSE English curriculum dealing with core language and literary skills.
• Main Features: The text/topic emphasizes critical thinking, comprehension, and language proficiency.
• Example: A practical example from ${chapter} would illustrate how language is used effectively in context.

💡 Remember:
For WBCHSE short answer questions, always include the main idea, one or two supporting points, and a brief example.

[Chapter: ${chapter} | Class: ${classLevel} | Subject: English]`;
}

function generateMCQEnglish(
  classLevel: number,
  chapter: string,
  question: string,
): string {
  type MCQEntry = {
    q: string;
    options: [string, string, string, string];
    correct: number;
    explanation: string;
  };

  const mcqMap: Record<string, MCQEntry> = {
    "Prose - The Eyes Have It": {
      q: "Who is the author of 'The Eyes Have It'?",
      options: [
        "R.K. Narayan",
        "Ruskin Bond",
        "Mulk Raj Anand",
        "Rabindranath Tagore",
      ],
      correct: 1,
      explanation:
        "'The Eyes Have It' is written by Ruskin Bond, a celebrated Anglo-Indian author known for his stories set in the Himalayas and simple, evocative prose.",
    },
    "Poetry - The Road Not Taken": {
      q: "Who wrote 'The Road Not Taken'?",
      options: [
        "William Wordsworth",
        "John Keats",
        "Robert Frost",
        "Alfred Tennyson",
      ],
      correct: 2,
      explanation:
        "'The Road Not Taken' is written by Robert Frost, an American poet. The poem explores the theme of choices and individuality.",
    },
    "Drama - Macbeth": {
      q: "What is the main theme of Shakespeare's 'Macbeth'?",
      options: [
        "Love and Romance",
        "Ambition and its consequences",
        "Comedy of errors",
        "Historical events",
      ],
      correct: 1,
      explanation:
        "The main theme of 'Macbeth' is unchecked ambition and its destructive consequences. Macbeth's ambition to become king leads to moral corruption, guilt, and eventual downfall.",
    },
    "Grammar - Voice": {
      q: "Which is the correct passive form of 'She sings a song'?",
      options: [
        "A song is sung by her.",
        "A song was sung by her.",
        "A song has been sung by her.",
        "A song had been sung by her.",
      ],
      correct: 0,
      explanation:
        "The correct passive form is 'A song is sung by her.' Simple Present Active → Simple Present Passive: Subject + is/am/are + past participle + by + object.",
    },
  };

  const ex = mcqMap[chapter];
  if (ex) {
    const optionLabels = ["(a)", "(b)", "(c)", "(d)"];
    return `❓ Question: ${question || ex.q}

(a) ${ex.options[0]}
(b) ${ex.options[1]}
(c) ${ex.options[2]}
(d) ${ex.options[3]}

✅ Correct Answer: ${optionLabels[ex.correct]} ${ex.options[ex.correct]}

💡 Explanation: ${ex.explanation}

[Chapter: ${chapter} | Class: ${classLevel} | Subject: English]`;
  }

  return `❓ Question: ${question || `Which statement about ${chapter} is correct?`}

(a) It is not part of the WBCHSE syllabus
(b) It focuses only on grammar rules
(c) It is a key chapter in Class ${classLevel} WBCHSE English
(d) It was written in the 19th century only

✅ Correct Answer: (c) It is a key chapter in Class ${classLevel} WBCHSE English

💡 Explanation: ${chapter} is indeed a key part of the Class ${classLevel} WBCHSE English curriculum. It helps students develop comprehension, analytical, and writing skills essential for the board examination.

[Chapter: ${chapter} | Class: ${classLevel} | Subject: English]`;
}

export function generateArtsSolution(input: ArtsSolverInput): string {
  const { subject, classLevel, chapter, question, type } = input;

  if (isEnglishSubject(subject)) {
    if (type === "essay")
      return generateEssayEnglish(classLevel, chapter, question);
    if (type === "short")
      return generateShortEnglish(classLevel, chapter, question);
    return generateMCQEnglish(classLevel, chapter, question);
  }

  if (type === "essay")
    return generateEssayBengali(subject, classLevel, chapter, question);
  if (type === "short")
    return generateShortBengali(subject, classLevel, chapter, question);
  return generateMCQBengali(subject, classLevel, chapter, question);
}
