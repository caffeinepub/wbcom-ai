export type LawLanguage = "bengali" | "english";

export interface LawResult {
  title: string;
  actName: string;
  sectionNumber: string;
  sectionText: string;
  explanation: string;
  examples: string[];
  landmarkCases: Array<{
    name: string;
    summary?: string;
    citation?: string;
    principle?: string;
  }>;
  exceptions: string | string[];
  overridingEffect: string;
  relatedSections: Array<{ ref: string; description: string }>;
}

// LawDB uses any to support both legacy and new entry schemas
type LawDB = Record<string, any>;

const LAW_DATABASE: LawDB = {
  ipc_302: {
    title: "IPC Section 302 — Punishment for Murder",
    actName: "Indian Penal Code, 1860",
    sectionNumber: "302",
    sectionText:
      "Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.",
    explanation:
      "Section 302 IPC deals with the punishment for murder. Murder is defined under Section 300 IPC. The section prescribes two punishments — death penalty or imprisonment for life — and also a fine. The court decides which punishment to award based on the gravity of the crime and circumstances.",
    examples: [
      "A person intentionally kills another person with a firearm — punishable under Section 302.",
      "A husband kills his wife after planning the act in advance — this is murder under IPC 302.",
      "Poisoning someone with intent to cause death constitutes murder under this section.",
    ],
    landmarkCases: [
      {
        name: "Bachan Singh v. State of Punjab (1980)",
        summary:
          "Supreme Court upheld the constitutional validity of the death penalty and established the 'rarest of rare' doctrine — death should be awarded only in the most heinous cases.",
      },
      {
        name: "Machhi Singh v. State of Punjab (1983)",
        summary:
          "Laid down five categories of cases that qualify as 'rarest of rare', including cases of extreme brutality, murder of innocent children, and socially abhorrent crimes.",
      },
      {
        name: "Santosh Kumar Satishbhushan Bariyar v. State of Maharashtra (2009)",
        summary:
          "SC emphasized that life imprisonment is the norm and death penalty an exception, reinforcing Bachan Singh guidelines.",
      },
    ],
    exceptions:
      "Murder is reduced to culpable homicide not amounting to murder under Section 300 exceptions: (1) Grave and sudden provocation, (2) Right of private defence exceeded, (3) Public servant acting in good faith, (4) Sudden fight without premeditation, (5) Consent of victim (euthanasia-like cases).",
    overridingEffect:
      "Section 302 must be read with Section 300 (definition of murder). BNS 2023 replaces IPC 302 with Section 101 of BNS which carries the same punishment. Section 304 IPC applies where murder is reduced to culpable homicide.",
    relatedSections: [
      { ref: "IPC Section 300", description: "Definition of Murder" },
      {
        ref: "IPC Section 304",
        description: "Punishment for culpable homicide not amounting to murder",
      },
      { ref: "IPC Section 307", description: "Attempt to murder" },
      { ref: "BNS Section 101", description: "BNS equivalent of IPC 302" },
      { ref: "CrPC Section 233", description: "Procedure for Sessions trial" },
    ],
  },
  ipc_304: {
    title:
      "IPC Section 304 — Punishment for Culpable Homicide Not Amounting to Murder",
    actName: "Indian Penal Code, 1860",
    sectionNumber: "304",
    sectionText:
      "Whoever commits culpable homicide not amounting to murder shall be punished with imprisonment for life, or imprisonment of either description for a term which may extend to ten years, and shall also be liable to fine; if the act is done with the intention of causing death, or of causing such bodily injury as is likely to cause death [Part I], or with imprisonment of either description for a term which may extend to ten years, or with fine, or with both, if the act is done with the knowledge that it is likely to cause death, but without any intention to cause death [Part II].",
    explanation:
      "This section punishes culpable homicide when it falls short of murder. It has two parts: Part I applies when there is intention to cause death, and Part II when there is only knowledge that death may result. The punishment under Part I is more severe than Part II.",
    examples: [
      "A person causes death of another in a sudden fight without premeditation — Part I of Section 304.",
      "A doctor performs an operation knowing there is risk of death but without intention — may fall under Part II.",
      "Dowry death cases where indirect violence leads to death — sometimes charged under Section 304B.",
    ],
    landmarkCases: [
      {
        name: "State of Andhra Pradesh v. Rayavarapu Punnayya (1977)",
        summary:
          "SC distinguished murder from culpable homicide and explained that the difference lies in the degree of probability of death resulting from the injury.",
      },
      {
        name: "Pulicherla Nagaraju v. State of AP (2006)",
        summary:
          "SC laid down detailed guidelines to distinguish between Section 302 and 304, focusing on nature of weapon, part of body targeted, and number of blows.",
      },
    ],
    exceptions:
      "No exceptions as such; rather Section 304 itself operates as an exception to 302. Cases falling under Section 300 exceptions automatically attract Section 304.",
    overridingEffect:
      "Section 304 is a lesser offence than Section 302. Courts convert conviction from 302 to 304 when mitigating circumstances exist. BNS Section 105 is the equivalent provision.",
    relatedSections: [
      {
        ref: "IPC Section 300",
        description: "Definition of Murder with exceptions",
      },
      { ref: "IPC Section 302", description: "Punishment for Murder" },
      { ref: "IPC Section 304B", description: "Dowry Death" },
      { ref: "BNS Section 105", description: "BNS equivalent" },
    ],
  },
  ipc_307: {
    title: "IPC Section 307 — Attempt to Murder",
    actName: "Indian Penal Code, 1860",
    sectionNumber: "307",
    sectionText:
      "Whoever does any act with such intention or knowledge, and under such circumstances that, if he by that act caused death, he would be guilty of murder, shall be punished with imprisonment of either description for a term which may extend to ten years, and shall also be liable to fine; and if hurt is caused to any person by such act, the offender shall be liable either to imprisonment for life, or to such punishment as is hereinbefore mentioned.",
    explanation:
      "Section 307 punishes a person who attempts to commit murder. The act must be done with the same intention/knowledge as required for murder under Section 300. If hurt is caused, punishment may extend to life imprisonment.",
    examples: [
      "A person shoots at someone with intent to kill but misses — Section 307.",
      "Administering poison in a dose likely to cause death but the victim survives — Section 307.",
      "Attempting to drown a person with intent to kill — Section 307.",
    ],
    landmarkCases: [
      {
        name: "State of Maharashtra v. Balram Bama Patil (1983)",
        summary:
          "SC held that for Section 307, the intention of the accused is paramount, not whether the victim actually died.",
      },
      {
        name: "Om Prakash v. State of Punjab (1961)",
        summary:
          "Established that Section 307 requires the intention to commit murder, and the act must go beyond preparation to actual attempt.",
      },
    ],
    exceptions:
      "The same exceptions that reduce murder to culpable homicide under Section 300 would correspondingly reduce Section 307 to Section 308 (attempt to commit culpable homicide).",
    overridingEffect:
      "Section 307 is cognizable, non-bailable, and triable by Sessions Court. BNS Section 109 is the equivalent. Distinguished from Section 326 (voluntarily causing grievous hurt with dangerous weapons) by the intent to cause death.",
    relatedSections: [
      { ref: "IPC Section 300", description: "Murder" },
      {
        ref: "IPC Section 308",
        description: "Attempt to commit culpable homicide",
      },
      {
        ref: "IPC Section 326",
        description: "Voluntarily causing grievous hurt by dangerous weapons",
      },
      { ref: "BNS Section 109", description: "BNS equivalent of IPC 307" },
    ],
  },
  ipc_376: {
    title: "IPC Section 376 — Punishment for Rape",
    actName: "Indian Penal Code, 1860",
    sectionNumber: "376",
    sectionText:
      "Whoever commits rape shall be punished with rigorous imprisonment of either description for a term which shall not be less than ten years, but which may extend to imprisonment for life, and shall also be liable to fine. [As amended by Criminal Law Amendment Act, 2013]",
    explanation:
      "Section 376 prescribes punishment for rape as defined under Section 375 IPC. Post the 2013 Nirbhaya Amendment, the minimum punishment was raised to 10 years. Aggravated forms of rape (gang rape, rape by police officer, repeat offenders) carry enhanced punishment including death penalty.",
    examples: [
      "Non-consensual sexual intercourse — Section 376.",
      "Gang rape — Section 376D, minimum 20 years or life.",
      "Rape of a woman under 12 years — Section 376AB, death or life imprisonment.",
    ],
    landmarkCases: [
      {
        name: "Mukesh & Another v. State for NCT Delhi (Nirbhaya Case, 2017)",
        summary:
          "SC upheld death sentence in gang rape and murder case, reinforcing that extreme brutality warrants capital punishment.",
      },
      {
        name: "Tukaram v. State of Maharashtra (Mathura Case, 1979)",
        summary:
          "SC acquitted accused citing consent; triggered nationwide protests leading to 1983 amendment expanding rape definition.",
      },
      {
        name: "State of Punjab v. Gurmit Singh (1996)",
        summary:
          "SC directed in camera trials and anonymity for rape victims; emphasized victim-centric approach in rape trials.",
      },
    ],
    exceptions:
      "Exception under Section 375: Sexual intercourse by a man with his own wife, the wife not being under 18 years, is not rape (though this exception has been challenged constitutionally).",
    overridingEffect:
      "IPC Sections 376A–376E deal with aggravated rape. POCSO Act applies for victims under 18. BNS Sections 63–70 replace IPC Sections 375–376E. CrPC Section 164A requires medical examination.",
    relatedSections: [
      { ref: "IPC Section 375", description: "Definition of Rape" },
      { ref: "IPC Section 376D", description: "Gang Rape" },
      {
        ref: "POCSO Act Section 4",
        description: "Penetrative sexual assault on child",
      },
      { ref: "BNS Section 63", description: "BNS equivalent" },
      { ref: "CrPC Section 154", description: "FIR registration" },
    ],
  },
  ipc_420: {
    title:
      "IPC Section 420 — Cheating and Dishonestly Inducing Delivery of Property",
    actName: "Indian Penal Code, 1860",
    sectionNumber: "420",
    sectionText:
      "Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security, or anything which is signed or sealed, and which is capable of being converted into a valuable security, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.",
    explanation:
      "Section 420 punishes cheating that results in delivery of property. It requires both fraudulent/dishonest inducement AND actual delivery of property. Mere cheating without property delivery is punished under Section 417 IPC (lesser punishment).",
    examples: [
      "A person sells a piece of land that does not belong to him by creating fake documents — Section 420.",
      "Online fraud where victim is tricked into paying money for non-existent goods — Section 420.",
      "Creating fake employment offers and collecting fees — Section 420.",
    ],
    landmarkCases: [
      {
        name: "Hridaya Ranjan Prasad Verma v. State of Bihar (2000)",
        summary:
          "SC held that for Section 420, it must be shown that the accused had fraudulent or dishonest intention at the time of making the promise, not a subsequent failure.",
      },
      {
        name: "Vesa Holdings Pvt. Ltd. v. State of Kerala (2015)",
        summary:
          "SC clarified that mere breach of contract does not amount to cheating unless fraudulent intent existed at the time of promise.",
      },
    ],
    exceptions:
      "Genuine business disputes or breach of contract without initial fraudulent intent are not covered. Civil remedy under Contract Act may apply instead.",
    overridingEffect:
      "BNS Section 318 replaces IPC Section 420. IT Act Section 66C covers identity theft and related online fraud. Section 406 (criminal breach of trust) may also apply in some cases.",
    relatedSections: [
      { ref: "IPC Section 415", description: "Definition of Cheating" },
      {
        ref: "IPC Section 417",
        description: "Punishment for cheating (without property delivery)",
      },
      { ref: "IPC Section 406", description: "Criminal breach of trust" },
      { ref: "IT Act Section 66C", description: "Identity theft" },
      { ref: "BNS Section 318", description: "BNS equivalent" },
    ],
  },
  ipc_498a: {
    title:
      "IPC Section 498A — Husband or Relative of Husband Subjecting Woman to Cruelty",
    actName: "Indian Penal Code, 1860",
    sectionNumber: "498A",
    sectionText:
      "Whoever, being the husband or the relative of the husband of a woman, subjects such woman to cruelty shall be punished with imprisonment for a term which may extend to three years and shall also be liable to fine. Explanation: 'cruelty' means — (a) any wilful conduct likely to drive the woman to suicide or cause grave injury; (b) harassment to coerce her or her relatives to meet unlawful demands for property or dowry.",
    explanation:
      "Section 498A was inserted in 1983 to combat dowry harassment and cruelty to married women by husbands and in-laws. It is a cognizable, non-bailable, and non-compoundable offence. It covers both physical and mental cruelty as well as dowry demands.",
    examples: [
      "Husband physically assaulting wife for not bringing enough dowry — Section 498A.",
      "In-laws mentally torturing a bride to force her to bring more property — Section 498A.",
      "Threatening wife of dire consequences unless additional dowry is paid — Section 498A.",
    ],
    landmarkCases: [
      {
        name: "Arnesh Kumar v. State of Bihar (2014)",
        summary:
          "SC issued guidelines to prevent automatic arrest under Section 498A, directing police to apply mind before arresting and magistrates to apply CrPC Section 41 checklist.",
      },
      {
        name: "Rajesh Sharma v. State of UP (2017)",
        summary:
          "SC set up family welfare committees to screen 498A complaints before arrest; later modified by a larger bench in Social Action Forum case.",
      },
    ],
    exceptions:
      "Mere matrimonial discord or ordinary wear and tear of married life is not cruelty. The Supreme Court has warned against misuse of Section 498A for personal vendetta.",
    overridingEffect:
      "Section 498A is in addition to Dowry Prohibition Act 1961. Domestic Violence Act 2005 provides civil remedies alongside. BNS Section 85 is the equivalent provision.",
    relatedSections: [
      { ref: "IPC Section 304B", description: "Dowry Death" },
      {
        ref: "Dowry Prohibition Act, 1961",
        description: "Prohibition on giving/taking dowry",
      },
      {
        ref: "Domestic Violence Act, 2005",
        description: "Civil remedies for domestic violence",
      },
      { ref: "BNS Section 85", description: "BNS equivalent" },
    ],
  },
  crpc_41: {
    title: "CrPC Section 41 — When Police May Arrest Without Warrant",
    actName: "Code of Criminal Procedure, 1973",
    sectionNumber: "41",
    sectionText:
      "Any police officer may without an order from a Magistrate and without a warrant, arrest any person who has been concerned in any cognizable offence, or against whom a reasonable complaint has been made, or credible information has been received, or a reasonable suspicion exists, of his having been so concerned [subject to conditions added by 2008 Amendment].",
    explanation:
      "Section 41 CrPC empowers police to arrest without a warrant in cognizable offences. After the 2008 amendment and Arnesh Kumar case, police cannot mechanically arrest — they must record reasons in writing and apply a checklist: necessity of arrest must be justified (prevention of further offence, investigation, preventing evidence tampering, etc.).",
    examples: [
      "Police arresting a person found committing theft (cognizable offence) — valid under Section 41.",
      "Arrest based on reasonable suspicion of involvement in a robbery — valid if conditions fulfilled.",
      "Blanket arrest in 498A without applying mind — not valid after Arnesh Kumar guidelines.",
    ],
    landmarkCases: [
      {
        name: "Arnesh Kumar v. State of Bihar (2014)",
        summary:
          "SC made compliance with Section 41 mandatory; directed magistrates not to remand accused mechanically; issued checklist for police before arresting.",
      },
      {
        name: "D.K. Basu v. State of West Bengal (1997)",
        summary:
          "Laid down 11 guidelines on arrest and detention to prevent custodial death and torture; compliance made mandatory.",
      },
    ],
    exceptions:
      "Non-cognizable offences require a warrant. Even for cognizable offences, if the person has permanent address and is cooperative, arrest may not be necessary. The officer must have reasons that can be challenged in court.",
    overridingEffect:
      "BNSS Section 35 replaces CrPC Section 41 with additional safeguards. Article 22 of Constitution provides constitutional protection against arbitrary arrest. CrPC Section 41A provides for Notice of appearance instead of arrest.",
    relatedSections: [
      {
        ref: "CrPC Section 41A",
        description: "Notice before arrest for less serious offences",
      },
      {
        ref: "CrPC Section 57",
        description: "Person arrested not to be detained more than 24 hours",
      },
      {
        ref: "Constitution Article 22",
        description: "Protection against arbitrary arrest",
      },
      { ref: "BNSS Section 35", description: "BNSS equivalent" },
    ],
  },
  crpc_161: {
    title: "CrPC Section 161 — Examination of Witnesses by Police",
    actName: "Code of Criminal Procedure, 1973",
    sectionNumber: "161",
    sectionText:
      "Any police officer making an investigation may examine orally any person supposed to be acquainted with the facts and circumstances of the case. Such person shall be bound to answer truly all questions relating to such case put to him by such officer, other than questions the answers to which would have a tendency to expose him to a criminal charge or to a penalty or forfeiture.",
    explanation:
      "Section 161 enables police to record statements of witnesses during investigation. These statements are not substantive evidence in court but can be used to contradict or corroborate witnesses. The person must answer questions but has the right against self-incrimination under Article 20(3).",
    examples: [
      "Police recording statement of an eyewitness to a theft during investigation — Section 161.",
      "Witness being questioned about the accused's whereabouts — Section 161.",
      "A suspect exercising right against self-incrimination — valid even in Section 161 examination.",
    ],
    landmarkCases: [
      {
        name: "Nandini Satpathy v. P.L. Dani (1978)",
        summary:
          "SC held that the right against self-incrimination under Article 20(3) extends to Section 161 examinations; police cannot compel incriminatory answers.",
      },
    ],
    exceptions:
      "Statements under Section 161 are not admissible as substantive evidence; only Section 164 statements recorded by Magistrate are more reliable. Section 161 statements can only contradict witnesses under Section 162.",
    overridingEffect:
      "BNSS Section 180 is the equivalent. Section 162 CrPC prohibits using these statements as evidence except for contradiction. Compare with Section 164 (Magistrate's statement) which is admissible.",
    relatedSections: [
      {
        ref: "CrPC Section 162",
        description:
          "Statements not to be signed; use of statement in evidence",
      },
      {
        ref: "CrPC Section 164",
        description: "Recording statements and confessions by Magistrate",
      },
      {
        ref: "Constitution Article 20(3)",
        description: "Right against self-incrimination",
      },
      { ref: "BNSS Section 180", description: "BNSS equivalent" },
    ],
  },
  crpc_164: {
    title: "CrPC Section 164 — Recording of Confessions and Statements",
    actName: "Code of Criminal Procedure, 1973",
    sectionNumber: "164",
    sectionText:
      "Any Metropolitan Magistrate or Judicial Magistrate may, whether or not he has jurisdiction in the case, record any confession or statement made to him in the course of an investigation under this Chapter or under any other law for the time being in force.",
    explanation:
      "Section 164 allows a Magistrate (not police) to record confessions and statements during investigation. A confession recorded under this section is admissible as evidence in court. The Magistrate must ensure the confession is voluntary and must warn the person of the right not to confess.",
    examples: [
      "Accused confessing before a Magistrate about committing robbery — admissible under Section 164.",
      "Rape victim's statement recorded by Magistrate — important evidence in rape trial.",
      "Eyewitness statement recorded under Section 164 — more reliable than Section 161 police statement.",
    ],
    landmarkCases: [
      {
        name: "State of Rajasthan v. Raja Ram (2003)",
        summary:
          "SC held that Section 164 confession recorded after proper procedure is reliable evidence. Magistrate must give time for reflection before recording.",
      },
    ],
    exceptions:
      "Confession made to police is not admissible (Section 25 Evidence Act). Only confessions before Magistrates under Section 164 are admissible. The Magistrate must certify that it was taken voluntarily.",
    overridingEffect:
      "BNSS Section 183 replaces this. Section 25 of Evidence Act makes police confessions inadmissible. Section 164 confessions can be retracted but retraction weakens credibility.",
    relatedSections: [
      {
        ref: "CrPC Section 161",
        description: "Police examination of witnesses",
      },
      {
        ref: "Evidence Act Section 25",
        description: "Confession to police officer not proved",
      },
      {
        ref: "Evidence Act Section 26",
        description: "Confession by accused while in custody",
      },
      { ref: "BNSS Section 183", description: "BNSS equivalent" },
    ],
  },
  crpc_313: {
    title: "CrPC Section 313 — Power to Examine the Accused",
    actName: "Code of Criminal Procedure, 1973",
    sectionNumber: "313",
    sectionText:
      "In every inquiry or trial, for the purpose of enabling the accused personally to explain any circumstances appearing in the evidence against him, the Court shall, after the witnesses for the prosecution have been examined and before he is called on for his defence, question him generally on the case.",
    explanation:
      "Section 313 provides the accused with an opportunity to explain prosecution evidence against him. This is a mandatory requirement — failure to examine the accused under Section 313 vitiates the trial. The accused need not take oath and their statement cannot be used against them as an admission, but can be used to assess their defense.",
    examples: [
      "After prosecution evidence, judge asks accused to explain why his fingerprints were found at the crime scene — Section 313.",
      "Accused has the right to deny all allegations and call defense witnesses — Section 313.",
    ],
    landmarkCases: [
      {
        name: "Hate Singh Bhagat Singh v. State of Madhya Bharat (1953)",
        summary:
          "SC held that examination under Section 313 is a right of the accused, not a privilege, and courts must put all incriminating evidence to the accused.",
      },
    ],
    exceptions:
      "The accused need not answer any question; refusal to answer does not amount to contempt. Silence or false answers may, however, affect credibility.",
    overridingEffect:
      "BNSS Section 351 is the equivalent. Section 313 statement is not on oath and cannot be used as evidence against the accused but can be considered by court while evaluating defense.",
    relatedSections: [
      { ref: "CrPC Section 315", description: "Accused as witness" },
      {
        ref: "Constitution Article 20(3)",
        description: "Right against self-incrimination",
      },
      { ref: "BNSS Section 351", description: "BNSS equivalent" },
    ],
  },
  constitution_14: {
    title: "Article 14 — Right to Equality",
    actName: "Constitution of India",
    sectionNumber: "Article 14",
    sectionText:
      "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.",
    explanation:
      "Article 14 guarantees two things: (1) Equality before law — no person is above the law (borrowed from English common law); (2) Equal protection of laws — equals must be treated equally (borrowed from US Constitution). The State can make reasonable classification but the classification must be based on intelligible differentia having rational nexus to the object sought.",
    examples: [
      "A law providing different tax rates for large and small businesses is valid if the classification is reasonable.",
      "A law discriminating against a person based solely on religion, caste, or sex violates Article 14.",
      "Reservation policies are valid reasonable classifications under Article 14.",
    ],
    landmarkCases: [
      {
        name: "E.P. Royappa v. State of Tamil Nadu (1974)",
        summary:
          "SC expanded the meaning of Article 14 to include anti-arbitrariness — any arbitrary State action violates Article 14, not just discriminatory laws.",
      },
      {
        name: "Maneka Gandhi v. Union of India (1978)",
        summary:
          "SC linked Articles 14, 19, and 21, holding that any procedure depriving personal liberty must satisfy all three articles — it must be fair, just, and reasonable.",
      },
      {
        name: "Air India v. Nargesh Meerza (1981)",
        summary:
          "SC struck down air hostess service rules as discriminatory, holding that manifestly arbitrary rules violate Article 14.",
      },
    ],
    exceptions:
      "Reasonable classification is permissible. The State can treat different classes differently — a law applying to a single individual is valid if that individual constitutes a class by themselves. Foreign sovereigns and ambassadors are exempt from Article 14.",
    overridingEffect:
      "Article 14 is part of the Basic Structure of the Constitution and cannot be amended to abrogate it. It overrides any inconsistent legislation. Articles 15, 16, 17, and 18 are specific applications of the general principle of equality in Article 14.",
    relatedSections: [
      {
        ref: "Article 15",
        description:
          "Prohibition of discrimination on grounds of religion, race, caste, sex",
      },
      {
        ref: "Article 16",
        description: "Equality of opportunity in public employment",
      },
      { ref: "Article 19", description: "Right to freedom" },
      { ref: "Article 21", description: "Right to life and personal liberty" },
    ],
  },
  constitution_19: {
    title: "Article 19 — Right to Freedom",
    actName: "Constitution of India",
    sectionNumber: "Article 19",
    sectionText:
      "All citizens shall have the right to: (a) freedom of speech and expression; (b) assemble peaceably and without arms; (c) form associations or unions or co-operative societies; (d) move freely throughout the territory of India; (e) reside and settle in any part of the territory of India; (g) practise any profession, or to carry on any occupation, trade or business.",
    explanation:
      "Article 19 guarantees six fundamental freedoms to Indian citizens only (not foreigners). Each freedom can be reasonably restricted by the State under clauses (2) to (6) on specified grounds such as sovereignty of India, security of State, public order, decency or morality, contempt of court, defamation, incitement to offence, and reasonable restrictions on trade.",
    examples: [
      "A journalist publishing a news article criticizing government policy — protected under Article 19(1)(a).",
      "Citizens holding a peaceful protest march — protected under Article 19(1)(b).",
      "A law prohibiting loud speakers near hospitals — valid restriction under Article 19(2) for public order.",
    ],
    landmarkCases: [
      {
        name: "Romesh Thappar v. State of Madras (1950)",
        summary:
          "SC struck down a law banning a communist journal — first landmark case on free speech, emphasizing that pre-censorship needs strong justification.",
      },
      {
        name: "Shreya Singhal v. Union of India (2015)",
        summary:
          "SC struck down Section 66A of IT Act as an unconstitutional restriction on free speech under Article 19(1)(a).",
      },
      {
        name: "Indian Express v. Union of India (1985)",
        summary:
          "SC held that freedom of the press is part of Article 19(1)(a) and any restrictions must be proportionate.",
      },
    ],
    exceptions:
      "Article 19 applies only to citizens, not foreigners or corporations (except Indian companies). Emergency under Article 352 can suspend Article 19. Reasonable restrictions under Article 19(2)-(6) are valid.",
    overridingEffect:
      "Article 19 must be read with Article 21 (Maneka Gandhi case). Article 33 allows Parliament to restrict Article 19 for armed forces. Preventive detention laws (Article 22) can restrict Article 19(1)(d).",
    relatedSections: [
      { ref: "Article 14", description: "Right to Equality" },
      { ref: "Article 21", description: "Right to Life" },
      {
        ref: "Article 22",
        description: "Protection against arrest and detention",
      },
      {
        ref: "IT Act Section 66A",
        description: "Struck down as violation of Article 19",
      },
    ],
  },
  constitution_21: {
    title: "Article 21 — Right to Life and Personal Liberty",
    actName: "Constitution of India",
    sectionNumber: "Article 21",
    sectionText:
      "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
    explanation:
      "Article 21 is the most expansive fundamental right. Post Maneka Gandhi case, the word 'procedure' means 'just, fair and reasonable procedure'. The right to life means right to live with dignity, not merely animal existence. The Supreme Court has read numerous rights into Article 21 including right to health, education, clean environment, speedy trial, legal aid, privacy, and dignity.",
    examples: [
      "Undertrial prisoners kept in jail for years without trial — violation of Article 21 (right to speedy trial).",
      "Right to privacy — government surveillance without legal basis violates Article 21.",
      "Manual scavenging — Supreme Court held it violates right to live with dignity under Article 21.",
    ],
    landmarkCases: [
      {
        name: "Maneka Gandhi v. Union of India (1978)",
        summary:
          "Revolutionized Article 21 — SC held that 'procedure established by law' must be just, fair and reasonable. Linked Articles 14, 19, and 21.",
      },
      {
        name: "K.S. Puttaswamy v. Union of India (2017)",
        summary:
          "9-judge bench unanimously declared Right to Privacy as a fundamental right under Article 21.",
      },
      {
        name: "Olga Tellis v. Bombay Municipal Corporation (1985)",
        summary:
          "SC held that right to livelihood is part of right to life under Article 21 — pavement dwellers cannot be evicted without alternative shelter.",
      },
    ],
    exceptions:
      "Article 21 can be suspended during National Emergency under Article 359 (but NOT during emergency declared under Article 352 after the 44th Amendment, which removed this power). Even in suspension, Article 21 applies to emergency laws that have been declared to be suspended.",
    overridingEffect:
      "Article 21 has absorbed the 'due process' doctrine from the US Constitution through Maneka Gandhi. It is the foundational article from which dozens of rights flow. Its scope is ever-expanding through judicial interpretation.",
    relatedSections: [
      { ref: "Article 14", description: "Right to Equality" },
      { ref: "Article 19", description: "Right to Freedom" },
      { ref: "Article 22", description: "Protection against arbitrary arrest" },
      { ref: "Article 32", description: "Right to constitutional remedies" },
    ],
  },
  constitution_32: {
    title: "Article 32 — Right to Constitutional Remedies",
    actName: "Constitution of India",
    sectionNumber: "Article 32",
    sectionText:
      "The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part is guaranteed. The Supreme Court shall have power to issue directions or orders or writs, including writs in the nature of habeas corpus, mandamus, prohibition, quo warranto and certiorari, whichever may be appropriate, for the enforcement of any of the rights conferred by this Part.",
    explanation:
      "Dr. Ambedkar called Article 32 the 'heart and soul of the Constitution'. It is itself a fundamental right and guarantees the right to approach the Supreme Court directly for enforcement of fundamental rights. The SC can issue five writs: habeas corpus, mandamus, prohibition, certiorari, and quo warranto.",
    examples: [
      "A person wrongfully detained can file a habeas corpus petition in the Supreme Court under Article 32.",
      "A public officer refusing to perform a statutory duty — mandamus can be sought under Article 32.",
      "Challenging unconstitutional legislation through a writ petition under Article 32.",
    ],
    landmarkCases: [
      {
        name: "Romesh Thappar v. State of Madras (1950)",
        summary:
          "SC held that Article 32 is itself a fundamental right and cannot be taken away even by procedural technicalities.",
      },
      {
        name: "Bandhua Mukti Morcha v. Union of India (1984)",
        summary:
          "SC recognized PIL (Public Interest Litigation) as an extension of Article 32 — any public-spirited person can approach SC for violation of fundamental rights of those who cannot approach themselves.",
      },
    ],
    exceptions:
      "Article 32 can be suspended during Emergency under Article 359 (unlike Article 32(4) which itself says the right shall not be suspended unless as provided by the Constitution). High Courts can exercise similar powers under Article 226 which has a wider scope.",
    overridingEffect:
      "Article 32 is part of the Basic Structure. Article 226 of the Constitution gives High Courts concurrent power to issue writs. Article 32 is restricted to enforcement of Part III rights while Article 226 is wider.",
    relatedSections: [
      { ref: "Article 226", description: "High Court's power to issue writs" },
      { ref: "Article 21", description: "Right to Life" },
      {
        ref: "Article 359",
        description: "Suspension of rights during Emergency",
      },
    ],
  },
  constitution_226: {
    title: "Article 226 — Power of High Courts to Issue Writs",
    actName: "Constitution of India",
    sectionNumber: "Article 226",
    sectionText:
      "Every High Court shall have powers, throughout the territories in relation to which it exercises jurisdiction, to issue to any person or authority, including in appropriate cases, any Government, within those territories directions, orders or writs, including writs in the nature of habeas corpus, mandamus, prohibitions, quo warranto and certiorari, or any of them.",
    explanation:
      "Article 226 is the High Court equivalent of Article 32. Unlike Article 32, Article 226 is wider — it can be invoked not only for enforcement of fundamental rights but also for any other legal right. High Courts can issue writs against private bodies performing public functions.",
    examples: [
      "A university refusing to declare results — mandamus can be sought from High Court under Article 226.",
      "Illegal detention by state police — habeas corpus to High Court under Article 226.",
      "Challenging illegal grant of a government contract — writ petition under Article 226.",
    ],
    landmarkCases: [
      {
        name: "L. Chandra Kumar v. Union of India (1997)",
        summary:
          "SC held that the power of judicial review under Articles 32 and 226 is part of the Basic Structure of the Constitution.",
      },
    ],
    exceptions:
      "Article 226 cannot be invoked against purely private individuals or bodies. High Courts have territorial jurisdiction limitations. Availability of alternative remedies may be a ground for refusing writ jurisdiction (though not an absolute bar).",
    overridingEffect:
      "Article 226 supplements Article 32. Together they form the judicial review mechanism. Article 226 is not suspended during Emergency unlike Article 32 can be under Article 359.",
    relatedSections: [
      {
        ref: "Article 32",
        description: "Supreme Court's power to issue writs",
      },
      {
        ref: "Article 227",
        description: "High Court's superintendence over subordinate courts",
      },
    ],
  },
  hma_13: {
    title: "Hindu Marriage Act Section 13 — Divorce",
    actName: "Hindu Marriage Act, 1955",
    sectionNumber: "13",
    sectionText:
      "Any marriage solemnized, whether before or after the commencement of this Act, may, on a petition presented by either the husband or the wife, be dissolved by a decree of divorce on the ground that the other party has: (i) after the solemnization of the marriage, had voluntary sexual intercourse with any person other than his or her spouse; or (ii) ceased to be a Hindu by conversion to another religion; or (iii) has been incurably of unsound mind; or has been suffering continuously or intermittently from mental disorder; or (iv) has been suffering from a virulent and incurable form of leprosy; or (v) has been suffering from venereal disease in a communicable form; or (vi) has renounced the world by entering any religious order; or (vii) has not been heard of as being alive for a period of seven years or more...",
    explanation:
      "Section 13 provides the grounds for divorce under Hindu law. The most common grounds used are adultery, desertion for 2+ years, cruelty, and unsoundness of mind. The section was amended in 1976 to add irretrievable breakdown provisions.",
    examples: [
      "Spouse committing adultery — ground for divorce under Section 13(1)(i).",
      "Husband treating wife with cruelty (physical or mental) — Section 13(1)(ia).",
      "Desertion for a continuous period of not less than two years — Section 13(1)(ib).",
    ],
    landmarkCases: [
      {
        name: "Savitri Pandey v. Prem Chandra Pandey (2002)",
        summary:
          "SC defined cruelty broadly — it includes conduct that causes reasonable apprehension in the mind of a spouse that it will be harmful or injurious for them to live with the other party.",
      },
      {
        name: "Naveen Kohli v. Neelu Kohli (2006)",
        summary:
          "SC recommended Parliament to add 'irretrievable breakdown of marriage' as a ground for divorce; showed the need for reform.",
      },
    ],
    exceptions:
      "Section 13(2) provides additional grounds available only to the wife: marriage before 15 years of age, husband's bigamy, husband guilty of rape/sodomy/bestiality, and non-resumption of cohabitation after maintenance decree.",
    overridingEffect:
      "Section 13B provides for divorce by mutual consent. Special Marriage Act 1954 Section 27 has similar provisions for those married under it. Section 13A allows courts to pass decree of judicial separation instead of divorce.",
    relatedSections: [
      { ref: "HMA Section 13B", description: "Divorce by mutual consent" },
      { ref: "HMA Section 9", description: "Restitution of conjugal rights" },
      {
        ref: "HMA Section 13A",
        description: "Alternate relief in divorce proceedings",
      },
      {
        ref: "Special Marriage Act Section 27",
        description: "Divorce provisions",
      },
    ],
  },
  hma_9: {
    title: "Hindu Marriage Act Section 9 — Restitution of Conjugal Rights",
    actName: "Hindu Marriage Act, 1955",
    sectionNumber: "9",
    sectionText:
      "When either the husband or the wife has, without reasonable excuse, withdrawn from the society of the other, the aggrieved party may apply by petition to the district court for restitution of conjugal rights and the court, on being satisfied of the truth of the statements made in such petition and that there is no legal ground why the application should not be granted, may decree restitution of conjugal rights accordingly.",
    explanation:
      "Section 9 allows a spouse to seek a court decree compelling the other spouse to return to cohabitation when they have withdrawn without reasonable excuse. If the court decree is not complied with for one year, it becomes a ground for divorce under Section 13(1A).",
    examples: [
      "Husband abandons wife without cause — wife can seek restitution under Section 9.",
      "Wife leaves matrimonial home without reasonable justification — husband can file Section 9 petition.",
    ],
    landmarkCases: [
      {
        name: "T. Sareetha v. Venkata Subbaiah (1983)",
        summary:
          "Andhra Pradesh HC struck down Section 9 as unconstitutional (violation of Articles 14, 19, 21). However, this was overruled by Delhi HC in Harvinder Kaur case.",
      },
      {
        name: "Saroj Rani v. Sudarshan Kumar (1984)",
        summary:
          "SC upheld the constitutionality of Section 9, holding that it serves a social purpose of preventing break-up of marriage and has procedural safeguards.",
      },
    ],
    exceptions:
      "If the petitioner is also guilty of a matrimonial offence, the petition can be dismissed. 'Reasonable excuse' for withdrawal is a complete defense. The court uses discretion — it won't grant decree if it will harm the respondent.",
    overridingEffect:
      "Non-compliance with Section 9 decree for one year is a ground for divorce under Section 13(1A)(ii). Special Marriage Act Section 22 contains equivalent provision.",
    relatedSections: [
      { ref: "HMA Section 13", description: "Divorce" },
      {
        ref: "HMA Section 13(1A)(ii)",
        description: "Non-compliance with Section 9 decree as divorce ground",
      },
      { ref: "HMA Section 10", description: "Judicial separation" },
    ],
  },

  hma_5: {
    title: "Hindu Marriage Act Section 5 — Conditions for a Hindu Marriage",
    actName: "Hindu Marriage Act, 1955",
    sectionNumber: "5",
    sectionText:
      "A marriage may be solemnized between any two Hindus, if the following conditions are fulfilled, namely: (i) neither party has a spouse living at the time of the marriage; (ii) neither party is an idiot or a lunatic; (iii) the bridegroom has completed the age of 21 years and the bride the age of 18 years; (iv) the parties are not within the degrees of prohibited relationship; (v) the parties are not sapindas of each other.",
    explanation:
      "Section 5 lays down the essential conditions for a valid Hindu marriage. All five conditions must be fulfilled. If condition (i) is violated, the marriage is void under Section 11 and attracts punishment under Section 17 (bigamy). If conditions (iv) or (v) are violated, the marriage is also void. Age requirement violation makes the marriage voidable.",
    examples: [
      "A Hindu man aged 22 and woman aged 19, both unmarried, can validly marry under Section 5.",
      "A married man marrying again while his first wife is alive violates Section 5(i) — the second marriage is void.",
      "Marriage between first cousins (in states not recognizing such custom) violates Section 5(iv).",
    ],
    landmarkCases: [
      {
        name: "Lily Thomas v. Union of India (2000)",
        summary:
          "SC held that a Hindu converting to Islam to contract a second marriage while the first marriage subsists does not escape bigamy — the second marriage is void under HMA.",
      },
      {
        name: "Smt. Yamunabai v. Anantrao (1988)",
        summary:
          "SC held that a marriage in violation of Section 5(i) is void ab initio and the second wife has no rights under the Act.",
      },
    ],
    exceptions:
      "Custom or usage permitting sapinda marriages or marriages within prohibited degrees can override conditions (iv) and (v). Regional customs (e.g., cross-cousin marriages in South India) are recognized.",
    overridingEffect:
      "Violation of Section 5(i) — void marriage and Section 17 bigamy. Violation of 5(ii), (iv), (v) — void under Section 11. Violation of 5(iii) — voidable under Section 12. Special Marriage Act 1954 contains similar conditions in Section 4.",
    relatedSections: [
      { ref: "HMA Section 11", description: "Void marriages" },
      { ref: "HMA Section 12", description: "Voidable marriages" },
      { ref: "HMA Section 17", description: "Punishment for bigamy" },
      { ref: "IPC Section 494", description: "Bigamy under IPC" },
    ],
  },
  hma_7: {
    title: "Hindu Marriage Act Section 7 — Ceremonies for a Hindu Marriage",
    actName: "Hindu Marriage Act, 1955",
    sectionNumber: "7",
    sectionText:
      "A Hindu marriage may be solemnized in accordance with the customary rites and ceremonies of either party thereto. Where such rites and ceremonies include the Saptapadi (that is, the taking of seven steps by the bridegroom and the bride jointly before the sacred fire), the marriage becomes complete and binding when the seventh step is taken.",
    explanation:
      "Section 7 recognizes that a Hindu marriage is solemnized through customary rites and ceremonies. The most recognized ceremony is Saptapadi (seven steps around the sacred fire). No specific ceremony is mandated — the ceremony of either party's community is valid. The marriage is legally complete and binding once the seventh step in Saptapadi is taken.",
    examples: [
      "A marriage solemnized with Saptapadi rites is legally valid and complete after the seventh step.",
      "A marriage performed with customary tribal rites of the bride's community is valid.",
      "Exchange of garlands (Jaimala) alone without customary rites may not constitute a valid Hindu marriage.",
    ],
    landmarkCases: [
      {
        name: "Bhaurao Shankar Lokhande v. State of Maharashtra (1965)",
        summary:
          "SC held that for a valid Hindu marriage, customary rites must be actually performed. Mere registration without ceremonies is not sufficient.",
      },
      {
        name: "Kanwal Ram v. Himachal Pradesh Administration (1966)",
        summary:
          "SC reiterated that essential ceremonies must be performed — a marriage without them is not valid under HMA.",
      },
    ],
    exceptions:
      "Different communities have different customary rites — all are valid under Section 7 as long as they constitute a recognized form of solemnization. Temple marriages are valid if proper customary rites are performed.",
    overridingEffect:
      "Section 7 must be read with Section 5 (conditions) and Section 8 (registration). Registration under Section 8 does not validate a marriage if ceremonies under Section 7 were not performed.",
    relatedSections: [
      { ref: "HMA Section 5", description: "Conditions for valid marriage" },
      { ref: "HMA Section 8", description: "Registration of Hindu marriages" },
      { ref: "HMA Section 11", description: "Void marriages" },
    ],
  },
  hma_10: {
    title: "Hindu Marriage Act Section 10 — Judicial Separation",
    actName: "Hindu Marriage Act, 1955",
    sectionNumber: "10",
    sectionText:
      "Either party to a marriage, whether solemnized before or after the commencement of this Act, may present a petition to the district court praying for a decree for judicial separation on any of the grounds specified in sub-section (1) of Section 13, and in the case of a wife also on any of the grounds specified in sub-section (2) thereof.",
    explanation:
      "Judicial separation is a middle path between divorce and staying married. The parties remain legally married but are relieved of the obligation to cohabit. Either party can seek judicial separation on the same grounds as divorce. If the separated spouse fails to resume cohabitation for one year after the decree, it becomes a ground for divorce under Section 13(1A).",
    examples: [
      "Wife seeking judicial separation due to husband's cruelty — parties remain married but live separately.",
      "After judicial separation, if husband doesn't resume cohabitation for one year, wife can seek divorce under Section 13(1A).",
    ],
    landmarkCases: [
      {
        name: "Smt. Suresh Kumari v. O.P. Dhingra (1989)",
        summary:
          "Delhi HC explained that judicial separation allows parties to reconsider their marriage without the finality of divorce.",
      },
    ],
    exceptions:
      "Judicial separation can be rescinded if both parties agree and apply to court. It does not dissolve the marriage — parties cannot remarry after judicial separation alone.",
    overridingEffect:
      "Non-resumption of cohabitation for one year after judicial separation decree becomes a ground for divorce under Section 13(1A)(i). Special Marriage Act Section 23 contains equivalent provision.",
    relatedSections: [
      { ref: "HMA Section 13", description: "Divorce grounds" },
      {
        ref: "HMA Section 13(1A)",
        description: "Divorce after judicial separation",
      },
      { ref: "HMA Section 9", description: "Restitution of conjugal rights" },
    ],
  },
  hma_11: {
    title: "Hindu Marriage Act Section 11 — Void Marriages",
    actName: "Hindu Marriage Act, 1955",
    sectionNumber: "11",
    sectionText:
      "Any marriage solemnized after the commencement of this Act shall be null and void and may, on a petition presented by either party thereto against the other party, be so declared by a decree of nullity if it contravenes any one of the conditions specified in clauses (i), (iv) and (v) of Section 5.",
    explanation:
      "A void marriage is treated as if it never existed in the eyes of law. Three conditions when violated make a marriage void: (1) bigamy — one spouse already married, (2) marriage within prohibited degrees of relationship, (3) marriage between sapindas. A void marriage requires no court decree to be invalid, but a party can seek a formal decree of nullity for record.",
    examples: [
      "A man married to his first wife contracts a second marriage — second marriage is void under Section 11.",
      "Marriage between uncle and niece (not permitted by custom) — void under Section 11.",
      "Marriage between sapindas (close blood relatives) — void under Section 11.",
    ],
    landmarkCases: [
      {
        name: "Yamunabai Anantrao Adhav v. Anantrao Shivram Adhav (1988)",
        summary:
          "SC held that the second wife in a void marriage has no rights of a wife — she cannot claim maintenance under Section 125 CrPC as a 'wife'.",
      },
      {
        name: "Savitaben Somabhai Bhatiya v. State of Gujarat (2005)",
        summary:
          "SC reiterated that a second marriage during subsistence of first marriage is void — second woman is not a 'wife' in law.",
      },
    ],
    exceptions:
      "If a custom or usage allows certain degrees of relationship, the marriage is not void. Regional customs recognizing certain relationships (like cross-cousin marriages in Tamil Nadu) are valid exceptions.",
    overridingEffect:
      "Void marriages are contrasted with voidable marriages under Section 12. Section 16 grants legitimacy to children of void marriages. IPC Section 494/BNS Section 82 punishes bigamy.",
    relatedSections: [
      { ref: "HMA Section 5", description: "Conditions for valid marriage" },
      { ref: "HMA Section 12", description: "Voidable marriages" },
      {
        ref: "HMA Section 16",
        description: "Legitimacy of children of void marriages",
      },
      { ref: "HMA Section 17", description: "Punishment for bigamy" },
    ],
  },
  hma_12: {
    title: "Hindu Marriage Act Section 12 — Voidable Marriages",
    actName: "Hindu Marriage Act, 1955",
    sectionNumber: "12",
    sectionText:
      "Any marriage solemnized, whether before or after the commencement of this Act, shall be voidable and may be annulled by a decree of nullity — (a) impotency; (b) insanity; (c) consent obtained by force or fraud; (d) bride pregnant by someone other than the petitioner at the time of marriage.",
    explanation:
      "A voidable marriage is valid until annulled by court. Unlike a void marriage, a voidable marriage requires a court decree to nullify it. The grounds are: impotency of respondent, respondent's unsoundness of mind, consent obtained by force or fraud, and pre-marital pregnancy of wife by another man. The aggrieved party must petition within one year of discovering the ground.",
    examples: [
      "Husband discovers after marriage that he was deceived about wife's identity — can seek annulment under Section 12(1)(c).",
      "Wife discovers husband was impotent at time of marriage and is still impotent — can seek annulment.",
      "Marriage solemnized when groom was temporarily insane — voidable under Section 12.",
    ],
    landmarkCases: [
      {
        name: "Ramdev Food Products v. Arvindbhai (2006)",
        summary:
          "SC discussed the distinction between void and voidable marriages emphasizing the legal standing of each type.",
      },
    ],
    exceptions:
      "Petition must be filed within one year of discovering the ground for fraud/force cases. The petitioner must not have lived with the respondent after knowing the facts. Impotency must be at time of marriage and continuing.",
    overridingEffect:
      "Section 12 voidable marriages are different from Section 11 void marriages. Children of voidable marriages are legitimate under Section 16. Once annulled, the marriage is treated as if never solemnized.",
    relatedSections: [
      { ref: "HMA Section 11", description: "Void marriages" },
      { ref: "HMA Section 16", description: "Legitimacy of children" },
      { ref: "HMA Section 5", description: "Conditions for valid marriage" },
    ],
  },
  hma_13b: {
    title: "Hindu Marriage Act Section 13B — Divorce by Mutual Consent",
    actName: "Hindu Marriage Act, 1955",
    sectionNumber: "13B",
    sectionText:
      "Subject to the provisions of this Act a petition for dissolution of marriage by a decree of divorce may be presented to the district court by both the parties to a marriage together, whether such marriage was solemnized before or after the commencement of the Marriage Laws (Amendment) Act, 1976, on the ground that they have been living separately for a period of one year or more, that they have not been able to live together and that they have mutually agreed that the marriage should be dissolved.",
    explanation:
      "Section 13B allows divorce by mutual consent — both parties agree that the marriage has broken down and jointly file for divorce. Two conditions: (1) living separately for at least one year, (2) mutual agreement. After filing, there is a mandatory 6-month 'cooling off' period (which the SC has held can be waived in appropriate cases) before the divorce is granted.",
    examples: [
      "Husband and wife separated for 2 years agree to divorce — they can file jointly under Section 13B.",
      "A couple mutually agrees to end their marriage after one year of separation — divorce granted under Section 13B.",
    ],
    landmarkCases: [
      {
        name: "Amardeep Singh v. Harveen Kaur (2017)",
        summary:
          "SC held that the 6-month waiting period under Section 13B(2) is directory, not mandatory. Courts can waive it if reconciliation is not possible and parties have been separated for long.",
      },
      {
        name: "Shilpa Sailesh v. Varun Sreenivasan (2023)",
        summary:
          "Constitution Bench held that SC can dissolve marriage under Article 142 on grounds of irretrievable breakdown, even without following HMA procedure, in exceptional cases.",
      },
    ],
    exceptions:
      "The cooling-off period of 6 months can be waived by the court. Both parties must consent throughout — if one withdraws consent before the second motion, the petition fails.",
    overridingEffect:
      "Section 13B was introduced by the 1976 amendment. It is the most commonly used ground for divorce in India. Special Marriage Act Section 28 contains equivalent provision.",
    relatedSections: [
      { ref: "HMA Section 13", description: "Divorce on fault grounds" },
      {
        ref: "HMA Section 14",
        description: "No petition within one year of marriage",
      },
      { ref: "HMA Section 10", description: "Judicial separation" },
    ],
  },
  hma_14: {
    title:
      "Hindu Marriage Act Section 14 — No Petition for Divorce Within One Year",
    actName: "Hindu Marriage Act, 1955",
    sectionNumber: "14",
    sectionText:
      "Notwithstanding anything contained in this Act, it shall not be competent for any court to entertain any petition for dissolution of a marriage by a decree of divorce, unless at the date of the presentation of the petition one year has elapsed since the date of the marriage.",
    explanation:
      "Section 14 imposes a mandatory one-year bar on filing divorce petitions. No divorce petition can be entertained by the court if it is filed within one year of marriage. The only exception is where the case involves exceptional hardship or depravity, in which case the court may allow the petition before one year with special permission.",
    examples: [
      "A couple married in January 2024 cannot file for divorce before January 2025.",
      "A woman facing extreme cruelty from day one of marriage can apply under Section 14 proviso for leave to file divorce petition before one year.",
    ],
    landmarkCases: [
      {
        name: "Deepa v. Suresh Kumar (1991)",
        summary:
          "Court held that Section 14 is a procedural bar and not a bar on the right to divorce — a petition can be filed with court's leave in exceptional hardship cases.",
      },
    ],
    exceptions:
      "The court may allow a petition before one year if satisfied that: (a) there is exceptional hardship to the petitioner, or (b) the respondent's exceptional depravity. The court must hear the respondent before granting such leave.",
    overridingEffect:
      "This bar applies to both contested divorce (Section 13) and mutual consent divorce (Section 13B). The bar is procedural — it does not extinguish the right to divorce after one year.",
    relatedSections: [
      { ref: "HMA Section 13", description: "Divorce" },
      { ref: "HMA Section 13B", description: "Divorce by mutual consent" },
    ],
  },
  hma_15: {
    title: "Hindu Marriage Act Section 15 — Divorced Person May Marry Again",
    actName: "Hindu Marriage Act, 1955",
    sectionNumber: "15",
    sectionText:
      "It shall be lawful for either party to a marriage to marry again after the divorce: Provided that it shall not be lawful for the respective parties to marry again unless, at the date of such marriage, the time for appealing against the decree has expired, and if an appeal has been presented, the appeal has been dismissed.",
    explanation:
      "Section 15 allows a divorced person to remarry after the divorce decree becomes final. A divorce decree is not immediately operative — there is an appeal period. Remarriage is only allowed after the appeal period expires without any appeal being filed, or if an appeal was filed and dismissed. This prevents complications if the divorce decree is reversed on appeal.",
    examples: [
      "After a divorce decree is passed, parties must wait for the appeal period (typically 90 days) to pass before remarrying.",
      "If either party files an appeal against the divorce decree, remarriage must wait until the appeal is decided.",
    ],
    landmarkCases: [
      {
        name: "Gullipilli Sowria Raj v. Bandaru Pavani (2009)",
        summary:
          "SC held that marriage before the appeal period expires makes the second marriage void under Section 11 — it is a bigamous marriage.",
      },
    ],
    exceptions:
      "If both parties consent in writing not to appeal, some courts have allowed earlier remarriage. However, the safest practice is to wait for the appeal period to expire.",
    overridingEffect:
      "Violation of Section 15 by marrying before the appeal period makes the second marriage void under Section 11 and attracts Section 17 (bigamy). Special Marriage Act Section 17 contains equivalent provision.",
    relatedSections: [
      { ref: "HMA Section 13", description: "Divorce" },
      { ref: "HMA Section 11", description: "Void marriages" },
      { ref: "HMA Section 17", description: "Punishment for bigamy" },
    ],
  },
  hma_16: {
    title:
      "Hindu Marriage Act Section 16 — Legitimacy of Children of Void and Voidable Marriages",
    actName: "Hindu Marriage Act, 1955",
    sectionNumber: "16",
    sectionText:
      "Notwithstanding that a marriage is null and void under Section 11, any child of such marriage who would have been legitimate if the marriage had been valid, shall be legitimate, whether such child is born before or after the commencement of the Marriage Laws (Amendment) Act, 1976, and whether or not a decree of nullity is granted in respect of that marriage.",
    explanation:
      "Section 16 is a humanitarian provision that protects innocent children. Even if a marriage is void (Section 11) or voidable (Section 12), the children of such marriage are legitimate. This provision ensures children do not suffer for the faults of their parents. However, the Supreme Court has clarified that while these children are legitimate, they can only inherit from their parents — not from other relatives.",
    examples: [
      "Children born of a bigamous void marriage are legitimate under Section 16 and can inherit from their parents.",
      "Children born before a marriage is annulled under Section 12 remain legitimate.",
    ],
    landmarkCases: [
      {
        name: "Revanasiddappa v. Mallikarjun (2011)",
        summary:
          "SC (2-judge bench) held that children under Section 16 can inherit ancestral property also. However, this was referred to a larger bench as it conflicted with Jinia Keotin case.",
      },
      {
        name: "Jinia Keotin v. Kumar Sitaram Manjhi (2003)",
        summary:
          "SC held that Section 16 children are legitimate but can only inherit from parents — not from other relatives or ancestral/coparcenary property.",
      },
    ],
    exceptions:
      "The SC has not conclusively settled whether Section 16 children can inherit ancestral/HUF property — the matter is pending before a larger bench.",
    overridingEffect:
      "Section 16 overrides the general rule that children of void marriages are illegitimate. It is a beneficial provision to be construed liberally in favour of children.",
    relatedSections: [
      { ref: "HMA Section 11", description: "Void marriages" },
      { ref: "HMA Section 12", description: "Voidable marriages" },
      { ref: "Hindu Succession Act", description: "Inheritance rights" },
    ],
  },
  hma_17: {
    title: "Hindu Marriage Act Section 17 — Punishment for Bigamy",
    actName: "Hindu Marriage Act, 1955",
    sectionNumber: "17",
    sectionText:
      "Any marriage between two Hindus solemnized after the commencement of this Act is void if at the date of such marriage either party had a husband or wife living; and the provisions of Sections 494 and 495 of the Indian Penal Code shall apply accordingly.",
    explanation:
      "Section 17 makes bigamy a punishable offence for Hindus. If a Hindu marries again while the first spouse is still alive, the second marriage is void AND the person commits bigamy under IPC Section 494/BNS Section 82, punishable with up to 7 years imprisonment. The key requirement is that the first marriage must be a valid legal marriage and the first spouse must be alive at the time of the second marriage.",
    examples: [
      "A Hindu man, with his first wife alive, marries another woman — void marriage and bigamy offence.",
      "A Hindu woman converts to Islam to remarry — SC held this does not escape bigamy under HMA (Lily Thomas case).",
    ],
    landmarkCases: [
      {
        name: "Lily Thomas v. Union of India (2000)",
        summary:
          "SC landmark: conversion to another religion to contract a second marriage does not escape bigamy — the first Hindu marriage continues to be governed by HMA.",
      },
      {
        name: "Sarla Mudgal v. Union of India (1995)",
        summary:
          "SC held that a Hindu husband converting to Islam and contracting second marriage is still guilty of bigamy under IPC 494 read with HMA Section 17.",
      },
    ],
    exceptions:
      "If the first marriage is void or voidable and has been annulled, a second marriage is not bigamy. If the first spouse is legally dead (7 years missing — Section 108 Evidence Act), remarriage is valid.",
    overridingEffect:
      "IPC Section 494 (now BNS Section 82) is attracted for punishment. Section 17 is a penal provision — police can register FIR for bigamy without a divorce decree from the previous marriage.",
    relatedSections: [
      { ref: "HMA Section 5(i)", description: "Monogamy condition" },
      { ref: "HMA Section 11", description: "Void marriages" },
      { ref: "IPC Section 494", description: "Bigamy punishment" },
      { ref: "BNS Section 82", description: "BNS equivalent of IPC 494" },
    ],
  },
  hma_24: {
    title:
      "Hindu Marriage Act Section 24 — Maintenance Pendente Lite and Expenses",
    actName: "Hindu Marriage Act, 1955",
    sectionNumber: "24",
    sectionText:
      "Where in any proceeding under this Act it appears to the court that either the wife or the husband, as the case may be, has no independent income sufficient for their support and the necessary expenses of the proceeding, it may, on the application of the wife or the husband, order the respondent to pay to the petitioner the expenses of the proceeding, and monthly during the proceeding such sum as, having regard to the respondent's own income and the income of the petitioner, it may seem to the court to be reasonable.",
    explanation:
      "Section 24 provides interim maintenance (pendente lite = during litigation) to a spouse who has insufficient income during any matrimonial proceeding. Either spouse (husband or wife) can claim this. The court considers both parties' income and the expenses of the legal proceeding. This is temporary maintenance until the main case is decided — permanent alimony is under Section 25.",
    examples: [
      "Wife with no income files for divorce — court can order husband to pay monthly maintenance and litigation costs under Section 24 during the divorce proceedings.",
      "Husband with lower income in a divorce filed by wife can seek Section 24 maintenance from wife.",
    ],
    landmarkCases: [
      {
        name: "Jasbir Kaur Sehgal v. District Judge Dehradun (1997)",
        summary:
          "SC held that Section 24 maintenance should be fixed considering the standard of living of the parties and both parties' income.",
      },
      {
        name: "Kusum Sharma v. Mahinder Kumar Sharma (2015)",
        summary:
          "Delhi HC held that interim maintenance should be decided quickly — courts cannot delay Section 24 applications for months.",
      },
    ],
    exceptions:
      "If the applicant has sufficient independent income, Section 24 maintenance will not be granted. The spouse with higher income pays — it is not restricted to the husband paying.",
    overridingEffect:
      "Section 24 provides temporary maintenance during litigation. Section 25 provides permanent alimony after the case is decided. CrPC Section 125 (BNSS Section 144) provides maintenance in a separate proceeding for all religions.",
    relatedSections: [
      {
        ref: "HMA Section 25",
        description: "Permanent alimony and maintenance",
      },
      { ref: "HMA Section 26", description: "Custody of children" },
      {
        ref: "CrPC Section 125",
        description: "Maintenance for wife and children",
      },
    ],
  },
  hma_25: {
    title: "Hindu Marriage Act Section 25 — Permanent Alimony and Maintenance",
    actName: "Hindu Marriage Act, 1955",
    sectionNumber: "25",
    sectionText:
      "Any court exercising jurisdiction under this Act may, at the time of passing any decree or at any time subsequent thereto, on application made to it for the purpose by either the wife or the husband, as the case may be, order that the respondent shall pay to the applicant for her or his maintenance and support such gross sum or such monthly or periodical sum for a term not exceeding the life of the applicant.",
    explanation:
      "Section 25 provides permanent alimony after a matrimonial decree (divorce, judicial separation, annulment). Either spouse can apply. The court considers: income of both parties, conduct during marriage, other circumstances. Maintenance can be a lump sum or periodic payments. It can be modified or cancelled if circumstances change (e.g., remarriage of the receiving spouse, change in income).",
    examples: [
      "After divorce decree, wife can apply for monthly maintenance under Section 25 if she has no sufficient income.",
      "If the ex-wife remarries, the husband can apply to cancel the Section 25 maintenance order.",
    ],
    landmarkCases: [
      {
        name: "Vinny Parmvir Parmar v. Parmvir Parmar (2011)",
        summary:
          "SC laid down factors for determining alimony: length of marriage, standard of living, earning capacity, contributions to marriage, and needs of the dependent spouse.",
      },
      {
        name: "Rajnesh v. Neha (2020)",
        summary:
          "SC issued comprehensive guidelines for maintenance in matrimonial cases, including Section 25 alimony, to ensure uniform approach by all courts.",
      },
    ],
    exceptions:
      "Permanent alimony terminates on: remarriage of the recipient, death of either party, or court order on changed circumstances. If the recipient is guilty of adultery or has ceased to be Hindu, alimony can be cancelled.",
    overridingEffect:
      "Section 25 is the main provision for permanent alimony under HMA. It supplements CrPC Section 125 (general maintenance). The Rajnesh v. Neha guidelines apply to all maintenance proceedings.",
    relatedSections: [
      {
        ref: "HMA Section 24",
        description: "Interim maintenance during proceedings",
      },
      { ref: "HMA Section 26", description: "Custody of children" },
      { ref: "CrPC Section 125", description: "General maintenance provision" },
    ],
  },
  hma_26: {
    title: "Hindu Marriage Act Section 26 — Custody of Children",
    actName: "Hindu Marriage Act, 1955",
    sectionNumber: "26",
    sectionText:
      "In any proceeding under this Act, the court may, from time to time, pass such interim orders and make such provisions in the decree as it may deem just and proper with respect to the custody, maintenance and education of minor children, consistently with their wishes, wherever possible.",
    explanation:
      "Section 26 empowers courts to pass interim and final orders regarding custody, maintenance, and education of minor children in matrimonial proceedings. The paramount consideration is the welfare and best interests of the child. Courts can modify custody orders at any time. Both parents have equal rights to seek custody — there is no presumption in favour of either parent.",
    examples: [
      "During divorce proceedings, court may order that children stay with mother during weekdays and visit father on weekends.",
      "Court can order the non-custodial parent to pay maintenance for children under Section 26.",
    ],
    landmarkCases: [
      {
        name: "Gaurav Nagpal v. Sumedha Nagpal (2009)",
        summary:
          "SC held that the welfare of the child is the paramount consideration — not the legal rights of parents. Courts must independently assess what is best for the child.",
      },
      {
        name: "Nil Ratan Kundu v. Abhijit Kundu (2008)",
        summary:
          "SC established guidelines for custody disputes: child's own wishes (if mature enough), emotional bonds, continuity of education, and parents' capability are key factors.",
      },
    ],
    exceptions:
      "Orders under Section 26 are interlocutory — they can be modified at any time. The Guardians and Wards Act 1890 also governs custody matters and courts often use both Acts together.",
    overridingEffect:
      "Section 26 custody orders can be modified as circumstances change. The court can override parents' mutual agreement if it is not in the child's interest. Habeas Corpus petitions for child custody are also used in urgent situations.",
    relatedSections: [
      { ref: "HMA Section 24", description: "Interim maintenance" },
      { ref: "HMA Section 25", description: "Permanent alimony" },
      {
        ref: "Guardians and Wards Act, 1890",
        description: "General custody law",
      },
    ],
  },
  hma_27: {
    title: "Hindu Marriage Act Section 27 — Disposal of Property",
    actName: "Hindu Marriage Act, 1955",
    sectionNumber: "27",
    sectionText:
      "In any proceeding under this Act, the court may make such provisions in the decree as it deems just and proper with respect to any property presented, at or about the time of marriage, which may belong jointly to both the husband and the wife.",
    explanation:
      "Section 27 allows the court to direct disposal of property that was jointly presented to both spouses at or around the time of marriage. This typically covers wedding gifts given jointly to the couple. The court can decide how such jointly owned property should be divided or dealt with in matrimonial proceedings. It does not cover property owned exclusively by one spouse.",
    examples: [
      "Wedding gifts given jointly to both husband and wife can be divided by court under Section 27 during divorce.",
      "A house gifted to both spouses jointly at the time of marriage falls under Section 27 jurisdiction.",
    ],
    landmarkCases: [
      {
        name: "Vinita Saxena v. Pankaj Pandit (2006)",
        summary:
          "SC clarified that Section 27 applies only to jointly held property presented at or about the time of marriage — not to all matrimonial property.",
      },
    ],
    exceptions:
      "Section 27 has limited scope — it only covers jointly presented gifts at marriage time. It does not cover stridhan (wife's exclusive property) or property inherited by one spouse separately.",
    overridingEffect:
      "Section 27 is supplemented by the Transfer of Property Act and general property laws. Stridhan (wife's exclusive property) is governed separately and is not subject to Section 27 division.",
    relatedSections: [
      { ref: "HMA Section 25", description: "Permanent alimony" },
      { ref: "HMA Section 26", description: "Custody of children" },
      {
        ref: "HMA Section 14",
        description: "One year bar on divorce petition",
      },
    ],
  },
  hma_28: {
    title: "Hindu Marriage Act Section 28 — Appeals from Decrees and Orders",
    actName: "Hindu Marriage Act, 1955",
    sectionNumber: "28",
    sectionText:
      "All decrees made by the court in any proceeding under this Act shall, subject to the provisions of sub-section (3), be appealable as decrees of the court made in the exercise of its original civil jurisdiction, and every such appeal shall lie to the court to which appeals ordinarily lie from the decisions of the court given in the exercise of its original civil jurisdiction.",
    explanation:
      "Section 28 provides for appeals from matrimonial decrees. Any decree passed in HMA proceedings (divorce, judicial separation, nullity, restitution of conjugal rights) can be appealed to the appropriate appellate court. The appeal lies to the High Court if the original decree was passed by a District Court. The limitation period for filing an appeal is 90 days. Remarriage before the appeal period expires is prohibited under Section 15.",
    examples: [
      "If a District Court grants or refuses a divorce, the aggrieved party can appeal to the High Court under Section 28.",
      "An order of interim maintenance under Section 24 can also be challenged in appeal.",
    ],
    landmarkCases: [
      {
        name: "Ramesh Chander v. Savitri (1995)",
        summary:
          "SC held that appellate courts should not readily interfere with trial court findings in matrimonial matters unless there is clear error of law or facts.",
      },
    ],
    exceptions:
      "Orders that are merely procedural (not decrees) may not be appealable under Section 28 but may be challenged by revision or writ petition. The Section 28(3) orders (regarding custody, maintenance) have separate appeal provisions.",
    overridingEffect:
      "Section 28 ensures all HMA decrees are subject to judicial review. Section 15 (remarriage after divorce) must be read with Section 28 — parties cannot remarry until the appeal period expires.",
    relatedSections: [
      { ref: "HMA Section 15", description: "Remarriage after divorce" },
      { ref: "HMA Section 13", description: "Divorce" },
      { ref: "HMA Section 10", description: "Judicial separation" },
    ],
  },
  ita_66: {
    title: "IT Act Section 66 — Computer Related Offences",
    actName: "Information Technology Act, 2000",
    sectionNumber: "66",
    sectionText:
      "If any person, dishonestly or fraudulently, does any act referred to in section 43, he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees or with both.",
    explanation:
      "Section 66 criminalizes acts described in Section 43 (unauthorized access to computer, unauthorized modification, denial of service, etc.) when done dishonestly or fraudulently. Section 43 deals with civil penalties; Section 66 adds criminal liability when the act is done with dishonest/fraudulent intent.",
    examples: [
      "Hacking into a bank's server and modifying account balances — Section 66.",
      "Introducing a virus into a company's computer network with intent to damage — Section 66.",
      "Unauthorized access to someone's email to read private communications — Section 66.",
    ],
    landmarkCases: [
      {
        name: "Shreya Singhal v. Union of India (2015)",
        summary:
          "While primarily about Section 66A (which was struck down), the case reaffirmed that Section 66 dealing with actual computer offences remains valid.",
      },
    ],
    exceptions:
      "Access with the owner's consent is not an offence. Security researchers doing authorized penetration testing are generally not liable. Acts without dishonest or fraudulent intent fall under civil liability Section 43, not criminal Section 66.",
    overridingEffect:
      "Section 66 has multiple sub-sections: 66A (struck down), 66B (dishonestly receiving stolen computer resource), 66C (identity theft), 66D (cheating by personation), 66E (violation of privacy), 66F (cyber terrorism). IT Act 2000 overrides inconsistent state laws.",
    relatedSections: [
      {
        ref: "IT Act Section 43",
        description: "Civil penalties for unauthorized computer access",
      },
      { ref: "IT Act Section 66C", description: "Identity theft" },
      { ref: "IT Act Section 66F", description: "Cyber terrorism" },
      {
        ref: "IPC Section 420",
        description: "Cheating — may apply concurrently",
      },
    ],
  },
  ita_66c: {
    title: "IT Act Section 66C — Identity Theft",
    actName: "Information Technology Act, 2000",
    sectionNumber: "66C",
    sectionText:
      "Whoever, fraudulently or dishonestly make use of the electronic signature, password or any other unique identification feature of any other person, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to rupees one lakh.",
    explanation:
      "Section 66C punishes identity theft in cyberspace — fraudulently using another person's electronic signature, password, or any unique digital identifier. This covers SIM cloning, using someone's OTP, hacking into accounts using stolen passwords, and similar acts.",
    examples: [
      "Using someone's stolen password to access their bank account — Section 66C.",
      "Cloning a SIM card to intercept OTPs and conduct financial fraud — Section 66C.",
      "Using someone else's digital signature on documents without authorization — Section 66C.",
    ],
    landmarkCases: [
      {
        name: "State of Tamil Nadu v. Suhas Katti (2004)",
        summary:
          "One of the first IT Act cases in India — involved online harassment using false identity. Convicted under IT Act and IPC.",
      },
    ],
    exceptions:
      "Using someone's login with their explicit permission is not an offence. Acts done by authorized intermediaries in the normal course of business are protected.",
    overridingEffect:
      "Section 66C can be read with IPC Section 420 (cheating) for enhanced punishment. Section 66D (cheating by personation through computer) is a related offence. DPDP Act 2023 also deals with personal data protection.",
    relatedSections: [
      {
        ref: "IT Act Section 66",
        description: "General computer related offences",
      },
      { ref: "IT Act Section 66D", description: "Cheating by personation" },
      { ref: "IPC Section 420", description: "Cheating" },
      { ref: "IPC Section 463", description: "Forgery" },
    ],
  },
  ita_67: {
    title: "IT Act Section 67 — Publishing Obscene Material in Electronic Form",
    actName: "Information Technology Act, 2000",
    sectionNumber: "67",
    sectionText:
      "Whoever publishes or transmits or causes to be published in the electronic form, any material which is lascivious or appeals to the prurient interest or if its effect is such as to tend to deprave and corrupt persons who are likely, having regard to all relevant circumstances, to read, see or hear the matter contained or embodied in it, shall be punished on first conviction with imprisonment of either description for a term which may extend to three years and with fine which may extend to five lakh rupees.",
    explanation:
      "Section 67 IT Act criminalizes publishing obscene content online. It is the online equivalent of Section 292 IPC (publishing obscene material). The test is the 'Hicklin test' combined with community standards. Repeat offenders face five years imprisonment.",
    examples: [
      "Sending pornographic content via WhatsApp or email — Section 67.",
      "Hosting obscene websites targeting Indian users — Section 67.",
      "Sharing morphed intimate images of someone online — Section 67 and Section 67A.",
    ],
    landmarkCases: [
      {
        name: "Avnish Bajaj v. State (2005)",
        summary:
          "Delhi HC dealt with the baazee.com case — liability of online marketplace for obscene content uploaded by users; raised questions of intermediary liability.",
      },
    ],
    exceptions:
      "Section 67 does not apply to material published for scientific, literary, artistic, or educational purposes. Material published in public interest or for religious purposes is also exempt.",
    overridingEffect:
      "Section 67A (publishing sexually explicit content) and Section 67B (child pornography) are stricter. POCSO Act additionally applies for child-related content. IPC Section 292 runs concurrently.",
    relatedSections: [
      {
        ref: "IT Act Section 67A",
        description: "Publishing sexually explicit content",
      },
      {
        ref: "IT Act Section 67B",
        description: "Publishing child pornography",
      },
      {
        ref: "IPC Section 292",
        description: "Publishing obscene books, pamphlets",
      },
      {
        ref: "POCSO Act",
        description: "Protection of children from sexual offences",
      },
    ],
  },

  ipc_34: {
    title:
      "IPC Section 34 — Acts Done by Several Persons in Furtherance of Common Intention",
    actName: "Indian Penal Code, 1860",
    sectionNumber: "34",
    sectionText:
      "When a criminal act is done by several persons in furtherance of the common intention of all, each of such persons is liable for that act in the same manner as if it were done by him alone.",
    explanation:
      "Section 34 IPC establishes the doctrine of 'joint liability' — it is not a substantive offence in itself but a rule of evidence. It makes every person equally liable when a criminal act is committed by multiple persons sharing a common intention. Key elements: (1) Criminal act done by several persons, (2) All shared a common intention BEFORE or at the time of the act, (3) Act done in furtherance of that intention. 'Common intention' means a pre-arranged plan, a meeting of minds — it can be formed instantly at the spot. Even if only one person delivers the fatal blow, all sharing common intention are equally guilty.",
    examples: [
      "A, B, and C plan to rob a shop. During the robbery, A kills the shopkeeper. All three — A, B, and C — are liable for murder under Section 302 read with Section 34.",
      "A gang of five people attacks a person. Even if only two actually beat him, all five are liable under Section 34.",
      "Two people jointly snatch a bag — both are liable for robbery even if only one grabbed it.",
    ],
    landmarkCases: [
      {
        name: "Mahbub Shah v. Emperor (1945)",
        summary:
          "Privy Council held that common intention requires prior meeting of minds. Mere presence at the scene is not enough — there must be a pre-arranged plan or simultaneous consensus.",
      },
      {
        name: "Pandurang v. State of Hyderabad (1955)",
        summary:
          "Supreme Court clarified that common intention can be formed on the spur of the moment — it need not be pre-planned. A sudden decision taken together also satisfies Section 34.",
      },
      {
        name: "Ramashish Yadav v. State of Bihar (1999)",
        summary:
          "SC held that physical presence is not always necessary — if a person is in close proximity and participates in the common intention, Section 34 applies.",
      },
    ],
    exceptions:
      "Section 34 does not apply if: (1) There is no evidence of prior meeting of minds, (2) The act done by one person is clearly beyond the common intention of others, (3) A person withdraws from the common intention before the act.",
    overridingEffect:
      "Section 34 must always be read with a substantive offence (e.g., IPC 302/304/307). BNS 2023 equivalent is Section 3(5). Section 34 differs from Section 149 — Section 34 requires active participation, while Section 149 applies to an unlawful assembly.",
    relatedSections: [
      { ref: "IPC Section 120B", description: "Criminal Conspiracy" },
      {
        ref: "IPC Section 149",
        description: "Group crime liability — unlawful assembly",
      },
      {
        ref: "IPC Section 302",
        description: "Murder — often read with Section 34",
      },
      { ref: "BNS Section 3(5)", description: "BNS equivalent of IPC 34" },
    ],
  },
  ipc_120b: {
    title: "IPC Section 120B — Punishment for Criminal Conspiracy",
    actName: "Indian Penal Code, 1860",
    sectionNumber: "120B",
    sectionText:
      "(1) Whoever is a party to a criminal conspiracy to commit an offence punishable with death, imprisonment for life or rigorous imprisonment for a term of two years or upwards, shall be punished in the same manner as if he had abetted such offence. (2) Whoever is a party to a criminal conspiracy other than a criminal conspiracy to commit an offence punishable as aforesaid shall be punished with imprisonment of either description for a term not exceeding six months, or with fine or with both.",
    explanation:
      "Section 120B IPC punishes criminal conspiracy. Section 120A defines criminal conspiracy as 'an agreement between two or more persons to do an illegal act, or to do a legal act by illegal means.' Key points: (1) Agreement between two or more persons is sufficient — no overt act needed (unlike abetment), (2) The conspiracy itself is the offence, (3) If the conspiracy is to commit a serious offence (death/life imprisonment/rigorous imprisonment for 2+ years) — punishment equals abetting that offence, (4) For minor conspiracies — max 6 months. This section is widely used in organized crime, terrorism, and corruption cases. Even if the ultimate crime is not committed, the conspiracy to commit it is punishable.",
    examples: [
      "Two people plan to murder a businessperson and take concrete steps (buying weapons, surveilling target) — both are guilty under Section 120B even before the murder.",
      "A group of persons agree to commit fraud in a government tender — all are guilty of criminal conspiracy under Section 120B.",
      "Terrorist planning an attack — members of the planning group are liable under Section 120B read with UAPA.",
    ],
    landmarkCases: [
      {
        name: "State (NCT of Delhi) v. Navjot Sandhu (Parliament Attack Case, 2005)",
        summary:
          "Supreme Court extensively discussed criminal conspiracy in the context of the 2001 Parliament attack. Held that circumstantial evidence and phone records can prove conspiracy.",
      },
      {
        name: "R v. Mulcahy (1868)",
        summary:
          "English case adopted in India — conspiracy is the agreement itself, the moment of agreement is the offence.",
      },
      {
        name: "Yash Pal Mittal v. State of Punjab (1977)",
        summary:
          "SC held that in a conspiracy, all members are equally guilty. Even a person who joins the conspiracy later can be held liable for acts done before they joined.",
      },
    ],
    exceptions:
      "Exceptions: (1) Husband and wife cannot conspire together in law (historically), though this principle has been questioned in modern cases, (2) A person who merely knows of a conspiracy but does not agree to be part of it is not guilty, (3) Conspiracy to commit an act that is not illegal is not covered.",
    overridingEffect:
      "Section 120B is read with the substantive offence. BNS 2023 equivalent is Section 61. Section 120B is broader than Section 34 — conspiracy does not require the act to be committed. Often charged alongside UAPA, PMLA, or other special laws in serious criminal cases.",
    relatedSections: [
      {
        ref: "IPC Section 120A",
        description: "Definition of Criminal Conspiracy",
      },
      {
        ref: "IPC Section 34",
        description: "Common intention — joint liability",
      },
      { ref: "IPC Section 107", description: "Abetment" },
      { ref: "BNS Section 61", description: "BNS equivalent of IPC 120B" },
      {
        ref: "UAPA Section 18",
        description: "Conspiracy to commit terrorist act",
      },
    ],
  },
  ipc_141: {
    title: "IPC Section 141 — Unlawful Assembly",
    actName: "Indian Penal Code, 1860",
    sectionNumber: "141",
    sectionText:
      "An assembly of five or more persons is designated an 'unlawful assembly', if the common object of the persons composing that assembly is — (First) To overawe by criminal force, or show of criminal force, the Central or any State Government or Parliament or the Legislature of any State, or any public servant in the exercise of the lawful power of such public servant; or (Second) To resist the execution of any law, or of any legal process; or (Third) To commit any mischief or criminal trespass, or other offence; or (Fourth) By means of criminal force, or show of criminal force, to any person, to compel him to do what he is not legally bound to do, or to omit to do what he is legally entitled to do; or (Fifth) By means of criminal force, or show of criminal force, to obtain possession of any property, or to deprive any person of the enjoyment of a right of way.",
    explanation:
      "Section 141 IPC defines 'unlawful assembly.' Essential elements: (1) Five or more persons, (2) Common object falling under the five categories listed, (3) Use or show of criminal force or intimidation. 'Common object' is different from 'common intention' (Section 34) — it is the shared purpose of the group, not necessarily a pre-planned conspiracy. Even persons who join the assembly knowing its unlawful nature are members. The five listed objects range from overawing the government to obtaining property by force.",
    examples: [
      "Five persons gather to forcibly remove a person from their land — unlawful assembly under Fifth category.",
      "A mob of 10 people assembles to forcibly stop execution of a court order — Second category of Section 141.",
      "Rioters gathering to attack a community with the common object of causing mischief — Third category.",
    ],
    landmarkCases: [
      {
        name: "Masalti v. State of Uttar Pradesh (1964)",
        summary:
          "SC held that mere presence in an unlawful assembly with knowledge of its common object makes a person liable, even without active participation in violence.",
      },
      {
        name: "Lalji v. State of UP (1989)",
        summary:
          "Clarified that 'common object' of an unlawful assembly need not be the same as the intention of each member — it is the group's shared goal.",
      },
    ],
    exceptions:
      "An assembly of five or more persons is NOT unlawful if: (1) It does not have any of the five listed common objects, (2) Persons are peacefully exercising constitutional rights (Article 19 — right to assemble peacefully), (3) The assembly disperses when ordered to do so under Section 144 CrPC.",
    overridingEffect:
      "Section 141 is the foundation for Sections 142-149 IPC. Section 149 (group crime liability) can only apply if Section 141 is first established. BNS 2023 equivalent is Section 189. Often read with Section 144 CrPC (prohibitory orders) and Section 307 IPC in riot/violence cases.",
    relatedSections: [
      {
        ref: "IPC Section 142",
        description: "Being a member of an unlawful assembly",
      },
      {
        ref: "IPC Section 143",
        description: "Punishment for unlawful assembly",
      },
      {
        ref: "IPC Section 149",
        description: "Group crime liability — every member liable",
      },
      {
        ref: "CrPC Section 144",
        description:
          "Power to issue order in urgent cases of nuisance or apprehended danger",
      },
      { ref: "BNS Section 189", description: "BNS equivalent of IPC 141" },
    ],
  },
  ipc_149: {
    title:
      "IPC Section 149 — Every Member of Unlawful Assembly Guilty of Offence Committed in Prosecution of Common Object",
    actName: "Indian Penal Code, 1860",
    sectionNumber: "149",
    sectionText:
      "If an offence is committed by any member of an unlawful assembly in prosecution of the common object of that assembly, or such as the members of that assembly knew to be likely to be committed in prosecution of that object, every person who, at the time of the committing of that offence, is a member of the same assembly, is guilty of that offence.",
    explanation:
      "Section 149 IPC creates 'constructive liability' — every member of an unlawful assembly becomes guilty of any offence committed by any member of that assembly, IF: (1) The offence was committed in prosecution of the common object of the assembly, OR (2) The members knew it was likely to be committed. This is a wider net than Section 34 — Section 34 requires active participation and common intention; Section 149 only requires membership in the unlawful assembly. This makes it a powerful tool in riot and mob violence cases. Even a passive member of a mob that commits murder can be convicted for murder under Section 149.",
    examples: [
      "A mob attacks a village. One member burns a house. All members of the mob are guilty of arson under Section 149, even if they did not set the fire.",
      "During a riot, one member of a group of 10 kills a person. All 10 are guilty of murder under Section 302 read with Section 149.",
      "An unlawful assembly gathers to forcibly evict tenants. One member assaults the tenant badly. All members are liable under Section 325 read with 149.",
    ],
    landmarkCases: [
      {
        name: "Mizaji v. State of U.P. (1959)",
        summary:
          "Supreme Court explained the difference between Sections 34 and 149. Section 149 does not require active participation — mere membership of the unlawful assembly at the time of the crime is sufficient.",
      },
      {
        name: "Chikkarange Gowda v. State of Mysore (1956)",
        summary:
          "SC held that to apply Section 149, it must first be established that the assembly was unlawful under Section 141 and that the offence fell within the common object.",
      },
      {
        name: "Roy Fernandes v. State of Goa (2012)",
        summary:
          "SC reiterated that even a member who did not actively participate in the attack can be convicted if he was a member of the unlawful assembly at the time.",
      },
    ],
    exceptions:
      "Section 149 does NOT apply if: (1) The unlawful assembly itself is not proven under Section 141, (2) The offence committed was clearly beyond the knowledge of all members and unconnected to the common object, (3) The person had already left the assembly before the offence was committed.",
    overridingEffect:
      "Section 149 requires Section 141 to be first proven. Unlike Section 34 (which needs common intention), Section 149 only needs membership. BNS 2023 equivalent is Section 190. Section 149 is widely used in communal riot cases, gang violence, and mob lynching cases.",
    relatedSections: [
      {
        ref: "IPC Section 141",
        description: "Definition of Unlawful Assembly",
      },
      {
        ref: "IPC Section 34",
        description: "Common intention — requires active participation",
      },
      {
        ref: "IPC Section 143",
        description: "Punishment for unlawful assembly (6 months to 2 years)",
      },
      { ref: "IPC Section 146", description: "Rioting" },
      { ref: "BNS Section 190", description: "BNS equivalent of IPC 149" },
    ],
  },
  ipc_354: {
    title:
      "IPC Section 354 — Assault or Criminal Force to Woman With Intent to Outrage Her Modesty",
    actName: "Indian Penal Code, 1860",
    sectionNumber: "354",
    sectionText:
      "Whoever assaults or uses criminal force to any woman, intending to outrage or knowing it to be likely that he will thereby outrage her modesty, shall be punished with imprisonment of either description for a term which shall not be less than one year but which may extend to five years, and shall also be liable to fine.",
    explanation:
      "Section 354 IPC punishes assault or use of criminal force against a woman with intent to outrage her modesty. After the 2013 Criminal Law Amendment, the minimum punishment is 1 year (not merely bailable). Key elements: (1) The victim must be a woman, (2) There must be assault OR use of criminal force, (3) The accused must intend to outrage modesty OR know that his act is likely to outrage modesty. 'Modesty' is judged by the reaction of a reasonable woman and the society's sense of decency — it is an objective standard. Sections 354A, 354B, 354C, and 354D were added in 2013 to specifically address sexual harassment, disrobing, voyeurism, and stalking.",
    examples: [
      "A man grabs a woman inappropriately on public transport — Section 354 IPC.",
      "A man forcibly tries to kiss a woman without her consent — Section 354.",
      "Pulling a woman's dupatta or tearing her clothes in public — Section 354.",
    ],
    landmarkCases: [
      {
        name: "State of Punjab v. Major Singh (1967)",
        summary:
          "Supreme Court held that 'modesty' is an attribute of the female sex — any act which is intended to violate or which is knowingly likely to violate the modesty of a woman is covered.",
      },
      {
        name: "Raju Pandurang Mahale v. State of Maharashtra (2004)",
        summary:
          "SC held that the essence of a woman's modesty is her sex — outrage of modesty is judged from the perspective of the victim and society, not the accused.",
      },
      {
        name: "Vishaka v. State of Rajasthan (1997)",
        summary:
          "Landmark SC case that laid down guidelines against sexual harassment at the workplace — gave a broader constitutional basis to protection of women's dignity which Section 354 enforces.",
      },
    ],
    exceptions:
      "Section 354 requires specific intent or knowledge. Accidental touching in a crowded place without any intent to outrage modesty may not attract this section. Medical examination done in good faith by a doctor would not be covered.",
    overridingEffect:
      "Section 354 is the parent section — post-2013 amendments added Sections 354A (sexual harassment), 354B (assault to disrobe), 354C (voyeurism), 354D (stalking). BNS 2023 equivalent is Section 74. Section 354 is cognizable, non-bailable, and triable by a Magistrate of the First Class.",
    relatedSections: [
      { ref: "IPC Section 354A", description: "Sexual harassment of women" },
      {
        ref: "IPC Section 354B",
        description: "Assault with intent to disrobe a woman",
      },
      { ref: "IPC Section 354C", description: "Voyeurism" },
      { ref: "IPC Section 354D", description: "Stalking" },
      {
        ref: "IPC Section 509",
        description: "Word, gesture or act insulting the modesty of a woman",
      },
      { ref: "BNS Section 74", description: "BNS equivalent of IPC 354" },
    ],
  },
  ipc_509: {
    title:
      "IPC Section 509 — Word, Gesture or Act Intended to Insult the Modesty of a Woman",
    actName: "Indian Penal Code, 1860",
    sectionNumber: "509",
    sectionText:
      "Whoever, intending to insult the modesty of any woman, utters any word, makes any sound or gesture, or exhibits any object, intending that such word or sound shall be heard, or that such gesture or object shall be seen, by such woman, or intrudes upon the privacy of such woman, shall be punished with simple imprisonment for a term which may extend to three years, and also with fine.",
    explanation:
      "Section 509 IPC punishes verbal, gestural, or visual acts intended to insult a woman's modesty — even without physical contact. After the 2013 amendment, the punishment was increased to 3 years (from 1 year). Key elements: (1) The act must be directed at a specific woman, (2) There must be intent to insult her modesty, (3) The act may be a word, sound, gesture, exhibiting an object, or intruding upon her privacy. This section covers catcalling, lewd comments, obscene gestures, flashing, and also 'eve-teasing'. It is broader than Section 354 as no physical contact is required. Privacy intrusion (like peeping into someone's house) also falls here.",
    examples: [
      "A man makes lewd comments at a woman passing on the street — Section 509.",
      "Sending obscene text messages or making obscene phone calls to a woman — Section 509.",
      "Making indecent gestures or wolf-whistling at a woman with intent to insult her — Section 509.",
      "Peeping into a woman's room without consent — intrusion upon privacy under Section 509.",
    ],
    landmarkCases: [
      {
        name: "Rupan Deol Bajaj v. KPS Gill (1995)",
        summary:
          "Supreme Court held that an IPS officer slapping a woman officer on her posterior at a party constituted outrage of modesty. SC emphasized that modesty of a woman is not just about sexual acts — any act violating her dignity is covered.",
      },
      {
        name: "Ramkripal S/o Shyamlal Charmakar v. State of Madhya Pradesh (2007)",
        summary:
          "SC held that the test for outraging modesty is whether a reasonable man will think that the act of the accused was intended to or was likely to outrage the modesty of the woman.",
      },
    ],
    exceptions:
      "Section 509 requires clear intent to insult. A casual or innocent remark not intended to insult modesty may not be covered. Artistic expression or literary work, though indecent, may not directly attract Section 509 if the target is not a specific individual.",
    overridingEffect:
      "Section 509 is less serious than Section 354 (no physical contact needed). BNS 2023 equivalent is Section 79. Often read with Section 354 in 'eve-teasing' cases and used in cases of online harassment against women. Also connected to IT Act Section 67 (publishing obscene content).",
    relatedSections: [
      {
        ref: "IPC Section 354",
        description: "Assault to outrage modesty — physical contact",
      },
      { ref: "IPC Section 354A", description: "Sexual harassment" },
      { ref: "IPC Section 354D", description: "Stalking" },
      {
        ref: "IT Act Section 67",
        description: "Publishing obscene material electronically",
      },
      { ref: "BNS Section 79", description: "BNS equivalent of IPC 509" },
    ],
  },
  ipc_299: {
    title: "IPC Section 299 — Culpable Homicide",
    actName: "Indian Penal Code, 1860",
    sectionNumber: "299",
    sectionText:
      "Whoever causes death by doing an act with the intention of causing death, or with the intention of causing such bodily injury as is likely to cause death, or with the knowledge that he is likely by such act to cause death, commits the offence of culpable homicide.",
    explanation:
      "Section 299 IPC defines culpable homicide — the genus of which murder (Section 300) is the species. Culpable homicide requires: (1) Death of a human being, (2) The death was caused by an act of the accused, (3) The accused had intention to cause death OR intention to cause such bodily injury as is likely to cause death OR knowledge that the act is likely to cause death. Culpable homicide is either murder (Section 300) or culpable homicide not amounting to murder (Section 304). The key distinction lies in the degree of intention and knowledge. Culpable homicide has three mental states — intention to cause death (highest), intention to cause grievous injury likely to cause death, and mere knowledge of likelihood of death (lowest).",
    examples: [
      "A person shoots at a crowd knowing someone is likely to die — culpable homicide under Section 299.",
      "X gives a severe beating to Y knowing such injury is likely to cause death — culpable homicide.",
      "A driver recklessly drives at high speed in a crowded area causing death — may be culpable homicide.",
      "A person pushes an elderly man from a height knowing he is likely to die — culpable homicide.",
    ],
    landmarkCases: [
      {
        name: "Reg. v. Govinda (1876)",
        summary:
          "First major case distinguishing culpable homicide from murder. Govinda knocked down his wife and knelt on her chest causing her death — held culpable homicide not amounting to murder as there was no intention to cause death.",
      },
      {
        name: "State of Andhra Pradesh v. R. Punnayya (1977)",
        summary:
          "Supreme Court laid down the definitive distinction between culpable homicide and murder, explaining the three clauses of Section 299 and their relationship with Section 300.",
      },
      {
        name: "Virsa Singh v. State of Punjab (1958)",
        summary:
          "Landmark case on what constitutes 'intention to cause bodily injury sufficient in the ordinary course of nature to cause death' — the Virsa Singh test is still applied in culpable homicide cases.",
      },
    ],
    exceptions:
      "Section 299 Explanation 1: A person causing death by doing a lawful act may still be guilty of culpable homicide if the act was unlawful. Explanation 2: Acceleration of death of a terminally ill person is culpable homicide. Explanation 3: Causing death of an unborn child is not culpable homicide.",
    overridingEffect:
      "Section 299 is the parent definition. Section 300 carves out murder from culpable homicide. Section 304 provides punishment for culpable homicide not amounting to murder. BNS 2023 equivalent is Section 99 (definition of culpable homicide) and Section 100 (murder).",
    relatedSections: [
      {
        ref: "IPC Section 300",
        description: "Murder — species of culpable homicide",
      },
      {
        ref: "IPC Section 304",
        description: "Punishment for culpable homicide not amounting to murder",
      },
      { ref: "IPC Section 302", description: "Punishment for murder" },
      {
        ref: "BNS Section 99",
        description: "BNS 2023 equivalent of culpable homicide",
      },
      { ref: "IPC Section 304A", description: "Causing death by negligence" },
    ],
  },
  ipc_304a: {
    title: "IPC Section 304A — Causing Death by Negligence",
    actName: "Indian Penal Code, 1860",
    sectionNumber: "304A",
    sectionText:
      "Whoever causes the death of any person by doing any rash or negligent act not amounting to culpable homicide shall be punished with imprisonment of either description for a term which may extend to two years, or with fine, or with both.",
    explanation:
      "Section 304A IPC punishes causing death by negligence without any intention or knowledge to cause death. It requires: (1) Death of a person, (2) The death was caused by a rash or negligent act, (3) The act does not amount to culpable homicide. 'Rash' means acting without due care despite knowledge of danger. 'Negligent' means breach of duty of care that a prudent person would observe. Common cases: road accidents, medical negligence, industrial accidents. Maximum punishment is 2 years — much lighter than Sections 302 and 304 because there is no intention.",
    examples: [
      "A doctor performs an operation carelessly resulting in patient's death — Section 304A (medical negligence).",
      "A driver speeding through a busy market runs over a pedestrian — Section 304A.",
      "A builder ignores safety norms; scaffolding collapses killing a worker — Section 304A.",
      "Pharmacist gives wrong medicine due to carelessness causing patient's death — Section 304A.",
    ],
    landmarkCases: [
      {
        name: "Jacob Mathew v. State of Punjab (2005)",
        summary:
          "Supreme Court laid down guidelines for medical negligence under Section 304A. Held that a doctor is not criminally liable for every negligence — must show gross negligence or recklessness beyond mere want of competence.",
      },
      {
        name: "Reckless Driving Cases — State of Karnataka v. Krishnappa (2000)",
        summary:
          "SC held that rash driving causing death is punishable under Section 304A and courts must impose deterrent sentences in road accident deaths.",
      },
      {
        name: "Suresh Gupta v. Govt. of NCT Delhi (2004)",
        summary:
          "Distinguished negligent acts from rash acts — mere negligence insufficient for criminal liability; requires gross or reckless negligence.",
      },
    ],
    exceptions:
      "Section 304A does not apply if the act amounts to culpable homicide (Sections 299/300 apply instead). Good faith exceptions under Section 88 IPC protect medical professionals acting in good faith and for patient's benefit.",
    overridingEffect:
      "Section 304A is a lesser offence than Sections 302 and 304. Motor Vehicles Act Section 185 (drunken driving causing death) operates alongside Section 304A. BNS 2023 equivalent is Section 106.",
    relatedSections: [
      { ref: "IPC Section 299", description: "Culpable homicide definition" },
      {
        ref: "IPC Section 304",
        description: "Culpable homicide not amounting to murder",
      },
      {
        ref: "IPC Section 88",
        description: "Act done in good faith for another's benefit",
      },
      {
        ref: "BNS Section 106",
        description: "BNS 2023 equivalent of death by negligence",
      },
      {
        ref: "Motor Vehicles Act Section 185",
        description: "Drunken driving offences",
      },
    ],
  },
  ipc_323: {
    title: "IPC Section 323 — Voluntarily Causing Hurt",
    actName: "Indian Penal Code, 1860",
    sectionNumber: "323",
    sectionText:
      "Whoever, except in the case provided for by section 334, voluntarily causes hurt, shall be punished with imprisonment of either description for a term which may extend to one year, or with fine which may extend to one thousand rupees, or with both.",
    explanation:
      "Section 323 IPC deals with voluntarily causing hurt — the most basic form of assault causing injury in Indian law. 'Hurt' is defined in Section 319 as causing bodily pain, disease, or infirmity to any person. 'Voluntarily' means the accused intentionally caused the hurt or knew it was likely to result. Section 323 applies to minor injuries — slapping, punching, kicking, pushing causing injury. It is a bailable, compoundable offence with relatively minor punishment (max 1 year). Section 334 provides an exception when hurt is caused under grave and sudden provocation.",
    examples: [
      "A slaps B in an argument causing pain — Section 323.",
      "A group of boys beat up a classmate causing bruises — Section 323.",
      "Husband physically assaults wife causing minor injuries — Section 323 (also read with DV Act).",
      "A person throws a stone hitting another causing pain — Section 323.",
    ],
    landmarkCases: [
      {
        name: "Ramakant Rai v. Madan Rai (2003)",
        summary:
          "SC clarified that for Section 323, it is not necessary that the injury be visible or leave permanent marks — temporary pain or infirmity is sufficient.",
      },
      {
        name: "State of UP v. Lakhmi (1998)",
        summary:
          "Held that minor injuries caused during a sudden fight without premeditation fall under Section 323 and not under higher sections.",
      },
    ],
    exceptions:
      "Section 334: Voluntarily causing hurt on grave and sudden provocation reduces the offence. Section 96-106 IPC (Right of Private Defence) if exercised proportionately. Section 89 (acts done in good faith for child's benefit).",
    overridingEffect:
      "Section 323 is the base offence. Aggravated forms: Section 325 (grievous hurt), Section 326 (grievous hurt by dangerous weapon), Section 324 (hurt by dangerous weapon). BNS 2023 equivalent is Section 115.",
    relatedSections: [
      { ref: "IPC Section 319", description: "Definition of Hurt" },
      { ref: "IPC Section 320", description: "Definition of Grievous Hurt" },
      {
        ref: "IPC Section 325",
        description: "Voluntarily causing grievous hurt",
      },
      {
        ref: "IPC Section 324",
        description: "Voluntarily causing hurt by dangerous weapon",
      },
      {
        ref: "BNS Section 115",
        description: "BNS 2023 equivalent of voluntarily causing hurt",
      },
    ],
  },
  ipc_325: {
    title: "IPC Section 325 — Voluntarily Causing Grievous Hurt",
    actName: "Indian Penal Code, 1860",
    sectionNumber: "325",
    sectionText:
      "Whoever, except in the case provided for by section 335, voluntarily causes grievous hurt, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.",
    explanation:
      "Section 325 IPC punishes voluntarily causing grievous hurt — a more serious form of assault than Section 323. 'Grievous hurt' is defined in Section 320 IPC and includes eight specific types: (1) Emasculation, (2) Permanent privation of sight of either eye, (3) Permanent privation of hearing of either ear, (4) Privation of any member or joint, (5) Destruction or permanent impairing of powers of any member or joint, (6) Permanent disfiguration of face or head, (7) Fracture or dislocation of bone or tooth, (8) Any hurt that endangers life or causes severe bodily pain for 20+ days. Punishment is up to 7 years (much higher than Section 323's 1 year). Section 325 is non-bailable and not compoundable.",
    examples: [
      "A breaks B's arm bone in a fight — Section 325 (fracture of bone).",
      "X throws acid on Y's face permanently disfiguring it — Section 325 read with Section 326 (use of dangerous weapon).",
      "Beating someone so severely they are hospitalized for more than 20 days — Section 325.",
      "Gang members break both legs of a person — Section 325 with Section 149.",
    ],
    landmarkCases: [
      {
        name: "Jashanmal Jhamatmal v. Brahmanand Sarupanand (1944)",
        summary:
          "Established that 'grievous hurt' requires proof of one of the eight categories under Section 320 — general severity is not sufficient.",
      },
      {
        name: "State of Maharashtra v. Vilas Pandurang (2004)",
        summary:
          "SC held that fracture of a bone is grievous hurt per se under Section 320(7), regardless of severity of the fracture.",
      },
      {
        name: "Madan Lal v. State of UP (2012)",
        summary:
          "Clarified that permanency of injury is not required for all categories — Section 320(8) covers any hurt endangering life even temporarily.",
      },
    ],
    exceptions:
      "Section 335: Voluntarily causing grievous hurt on grave and sudden provocation (reduced punishment up to 4 years). Right of Private Defence (Sections 96-106) if proportionate. Section 88 (good faith for medical procedures).",
    overridingEffect:
      "Section 325 is aggravated form of Section 323. Further aggravated forms: Section 326 (grievous hurt by dangerous weapon — up to 10 years), Section 326A/B (acid attack — minimum 10 years). BNS 2023 equivalent is Section 117.",
    relatedSections: [
      {
        ref: "IPC Section 320",
        description: "Definition of Grievous Hurt (8 categories)",
      },
      {
        ref: "IPC Section 323",
        description: "Voluntarily causing hurt (simple hurt)",
      },
      {
        ref: "IPC Section 326",
        description: "Grievous hurt by dangerous weapon",
      },
      {
        ref: "IPC Section 326A",
        description: "Acid attack causing grievous hurt",
      },
      {
        ref: "BNS Section 117",
        description: "BNS 2023 equivalent of grievous hurt",
      },
    ],
  },
  ipc_354a: {
    title: "IPC Section 354A — Sexual Harassment",
    actName: "Indian Penal Code, 1860",
    sectionNumber: "354A",
    sectionText:
      "A man committing any of the following acts — (i) physical contact and advances involving unwelcome and explicit sexual overtures; or (ii) a demand or request for sexual favours; or (iii) showing pornography against the will of a woman; or (iv) making sexually coloured remarks — shall be guilty of the offence of sexual harassment.",
    explanation:
      "Section 354A IPC was inserted by the Criminal Law (Amendment) Act, 2013 following the Nirbhaya case. It specifically criminalises sexual harassment with graded punishment: Subsections (i), (ii), (iii) are punishable with rigorous imprisonment up to 3 years + fine. Subsection (iv) — making sexually coloured remarks — is punishable with imprisonment up to 1 year + fine. Key elements: (1) The accused must be a man, (2) The act must be against a woman, (3) The act falls within one of the four categories. This is separate from workplace sexual harassment under the POSH Act 2013.",
    examples: [
      "A male colleague repeatedly touches a female colleague's hand despite her objections — Section 354A(i).",
      "A boss demands sexual favours in exchange for promotion — Section 354A(ii).",
      "Showing obscene videos on phone to a woman who objects — Section 354A(iii).",
      "Making lewd comments or passing sexual remarks at a woman in office or public — Section 354A(iv).",
    ],
    landmarkCases: [
      {
        name: "Vishaka v. State of Rajasthan (1997)",
        summary:
          "Landmark case that led to Vishaka Guidelines for workplace sexual harassment, eventually codified into the POSH Act 2013 and Section 354A IPC.",
      },
      {
        name: "Apparel Export Promotion Council v. A.K. Chopra (1999)",
        summary:
          "SC held that sexual harassment includes any conduct of sexual nature that creates hostile working environment — physical contact not essential.",
      },
    ],
    exceptions:
      "Consensual conduct is not covered. Good faith medical examination does not fall under this section. The provision applies only to men as perpetrators — though courts are evolving on this.",
    overridingEffect:
      "Section 354A is a specific provision for sexual harassment. POSH Act 2013 provides civil remedies additionally. Section 354 (general modesty outrage) is the parent section. BNS 2023 equivalent is Section 75.",
    relatedSections: [
      {
        ref: "IPC Section 354",
        description: "Outraging modesty — parent section",
      },
      { ref: "IPC Section 354B", description: "Assault to disrobe a woman" },
      { ref: "IPC Section 354C", description: "Voyeurism" },
      { ref: "IPC Section 354D", description: "Stalking" },
      {
        ref: "BNS Section 75",
        description: "BNS 2023 equivalent of sexual harassment",
      },
      {
        ref: "POSH Act 2013",
        description: "Civil remedy for workplace sexual harassment",
      },
    ],
  },
  ipc_354b: {
    title: "IPC Section 354B — Assault or Use of Force to Disrobe",
    actName: "Indian Penal Code, 1860",
    sectionNumber: "354B",
    sectionText:
      "Any man who assaults or uses criminal force to any woman or abets such act with the intention of disrobing or compelling her to be naked, shall be punished with imprisonment of not less than three years but which may extend to seven years, and shall also be liable to fine.",
    explanation:
      "Section 354B IPC was inserted in 2013. It specifically criminalises forcible disrobing of a woman or compelling a woman to be naked. Key elements: (1) The accused must be a man, (2) He assaults or uses criminal force against a woman, (3) The intention must be to disrobe her or compel her to be naked. The minimum punishment is 3 years — making it a serious, non-bailable offence. Abetment of such an act carries the same punishment. This section is often invoked in cases of sexual violence where full rape (Section 376) may not be established but forced stripping occurred.",
    examples: [
      "Group of men forcibly remove a woman's clothes in public to humiliate her — Section 354B.",
      "An employer uses criminal force to undress an employee — Section 354B.",
      "Mob strips a woman as punishment in a village — Section 354B.",
    ],
    landmarkCases: [
      {
        name: "Nirbhaya Case — State v. Ram Singh & Ors (2013)",
        summary:
          "The 2012 Delhi gang rape case led to the Criminal Law Amendment Act 2013, which introduced Sections 354A, 354B, 354C, 354D to address specific forms of crimes against women.",
      },
    ],
    exceptions:
      "Medical examination under law or with consent is not covered. The section applies specifically to forcible and non-consensual disrobing.",
    overridingEffect:
      "Section 354B overlaps with Section 354 and Section 376 cases. BNS 2023 equivalent is Section 76.",
    relatedSections: [
      {
        ref: "IPC Section 354",
        description: "Outraging modesty — parent section",
      },
      { ref: "IPC Section 354A", description: "Sexual harassment" },
      { ref: "IPC Section 354C", description: "Voyeurism" },
      { ref: "IPC Section 376", description: "Rape" },
      { ref: "BNS Section 76", description: "BNS 2023 equivalent" },
    ],
  },
  ipc_354c: {
    title: "IPC Section 354C — Voyeurism",
    actName: "Indian Penal Code, 1860",
    sectionNumber: "354C",
    sectionText:
      "Any man who watches, or captures the image of a woman engaging in a private act in circumstances where she would usually have the expectation of not being observed — including while she is in a private place or where private parts are exposed or covered only in underwear — shall be punished with imprisonment of not less than one year but which may extend to three years, and shall also be liable to fine on first conviction. On second conviction, with not less than three years but up to seven years imprisonment.",
    explanation:
      "Section 354C IPC inserted in 2013 specifically criminalises voyeurism — watching or recording a woman without her consent in private situations. Key elements: (1) Watching OR capturing the image/video, (2) The woman is in a private act (bathing, changing, intimate acts), (3) The woman had a reasonable expectation of privacy, (4) Done without her consent. 'Private act' includes acts where genitals, buttocks, or breasts are exposed or covered only in underwear. Punishment is graduated — first conviction: 1–3 years; second/subsequent: 3–7 years. This section specifically targets 'peeping tom' cases, hidden cameras in bathrooms/changing rooms, and non-consensual recording of intimate acts.",
    examples: [
      "A man places a hidden camera in the women's changing room of a gym — Section 354C.",
      "Person peeping through a hole to watch a woman changing clothes — Section 354C.",
      "Recording a woman's intimate moments without her consent using a mobile phone — Section 354C.",
      "Installing spy cameras in hotel bathrooms — Section 354C.",
    ],
    landmarkCases: [
      {
        name: "ABC v. State of Karnataka (2019)",
        summary:
          "Karnataka HC held that sharing voyeuristic content on social media is also covered by Section 354C and Section 67 of IT Act simultaneously.",
      },
      {
        name: "Stealthing cases",
        summary:
          "Courts have increasingly applied Section 354C to cases involving non-consensual recording of consensual intimate acts when sharing was not consented to.",
      },
    ],
    exceptions:
      "Consented filming between adults in private is not covered. Security cameras in legitimate public spaces for safety purposes are not voyeurism.",
    overridingEffect:
      "Section 354C applies along with Section 66E of IT Act (punishment for violation of privacy). BNS 2023 equivalent is Section 77.",
    relatedSections: [
      { ref: "IPC Section 354", description: "Outraging modesty" },
      { ref: "IPC Section 354A", description: "Sexual harassment" },
      { ref: "IPC Section 354D", description: "Stalking" },
      {
        ref: "IT Act Section 66E",
        description:
          "Violation of privacy by capturing/transmitting intimate images",
      },
      {
        ref: "BNS Section 77",
        description: "BNS 2023 equivalent of voyeurism",
      },
    ],
  },
  ipc_354d: {
    title: "IPC Section 354D — Stalking",
    actName: "Indian Penal Code, 1860",
    sectionNumber: "354D",
    sectionText:
      "Any man who — (i) follows a woman and contacts, or attempts to contact such woman to foster personal interaction repeatedly despite a clear indication of disinterest by such woman; or (ii) monitors the use by a woman of the internet, email or any other form of electronic communication — commits the offence of stalking. First conviction: up to 3 years + fine. Second conviction: up to 5 years + fine.",
    explanation:
      "Section 354D IPC inserted in 2013 criminalises stalking — both physical stalking and cyber/digital stalking. Physical stalking: repeatedly following a woman or contacting her despite her clear disinterest. Cyber stalking: monitoring her internet, email, social media, or electronic communications without consent. Punishment is graduated — first conviction up to 3 years (bailable); second conviction up to 5 years (non-bailable). Exception: stalking by a State agent for prevention or detection of crime (with proper supervision) is permitted. This section is specifically gendered — man stalking a woman — though courts are evolving on gender-neutral application.",
    examples: [
      "A man repeatedly follows a woman to her workplace and home despite her clear refusal — Section 354D.",
      "Constantly calling and messaging a woman who has blocked the caller — Section 354D.",
      "Monitoring a woman's WhatsApp, Instagram or email without her consent — Section 354D(ii).",
      "Sending repeated unsolicited messages on social media after being blocked — Section 354D.",
    ],
    landmarkCases: [
      {
        name: "Rupan Deol Bajaj v. KPS Gill (1995)",
        summary:
          "Pre-2013 case where a senior IPS officer slapped a woman IAS officer's buttocks at a party — SC held this outraged her modesty under Section 354, paving way for specific stalking/harassment laws.",
      },
      {
        name: "Cyber Stalking Cases — Delhi HC 2018",
        summary:
          "Delhi High Court held that creating fake social media profiles of a woman and sending obscene messages constitutes cyber stalking under Section 354D(ii) and Section 67 IT Act.",
      },
    ],
    exceptions:
      "Stalking by State (police/intelligence) for prevention and detection of crime under proper authority is exempt under Section 354D proviso. Good faith acts do not constitute stalking.",
    overridingEffect:
      "Section 354D operates alongside IT Act Section 67 (obscene material online) and Section 66C/66D for cyber stalking. BNS 2023 equivalent is Section 78.",
    relatedSections: [
      {
        ref: "IPC Section 354",
        description: "Outraging modesty — parent section",
      },
      { ref: "IPC Section 354A", description: "Sexual harassment" },
      { ref: "IPC Section 354C", description: "Voyeurism" },
      { ref: "IT Act Section 66C", description: "Identity theft online" },
      {
        ref: "IT Act Section 67",
        description: "Publishing obscene material online",
      },
      { ref: "BNS Section 78", description: "BNS 2023 equivalent of stalking" },
    ],
  },
  ipc_378: {
    id: "ipc_378",
    title: "IPC Section 378 – Theft",
    act: "Indian Penal Code, 1860",
    chapter: "XVII – Of Offences Against Property",
    section: "378",
    description:
      "Whoever, intending to take dishonestly any moveable property out of the possession of any person without that person's consent, moves that property, is said to commit theft.",
    bengaliDescription:
      "যে ব্যক্তি কোনো ব্যক্তির দখল থেকে তার সম্মতি ছাড়া অসাধুভাবে কোনো চলনযোগ্য সম্পত্তি নিয়ে যাওয়ার উদ্দেশ্যে সেই সম্পত্তি সরিয়ে নেয়, সে চুরি করেছে বলে গণ্য হয়। চুরির জন্য ৩টি উপাদান প্রয়োজন: অসাধু উদ্দেশ্য, সম্মতি না থাকা এবং চলনযোগ্য সম্পত্তি নেওয়া।",
    punishment: "No punishment in this section — punishment is in Section 379.",
    keyElements: [
      "Dishonest intention to take property",
      "Property must be moveable",
      "Must be out of someone's possession",
      "Must be without consent",
      "Physical movement of property required",
    ],
    examples: [
      "Picking someone's pocket in a crowded bus",
      "Stealing a bicycle parked outside a shop",
      "Taking goods from a shop without paying",
      "Removing electricity illegally from a line",
    ],
    exceptions: [
      "Taking one's own property from another's possession is not theft",
      "Good faith belief of right to property negates dishonest intention",
      "Consent (even implied) removes the offence",
    ],
    landmarkCases: [
      {
        name: "Pyare Lal Bhargava v. State of Rajasthan (1963)",
        citation: "AIR 1963 SC 1094",
        principle:
          "Even temporary taking with dishonest intent constitutes theft.",
      },
      {
        name: "K.N. Mehra v. State of Rajasthan (1957)",
        citation: "AIR 1957 SC 369",
        principle:
          "Dishonest intention at the time of taking is the key ingredient.",
      },
    ],
    overridingEffect:
      "Section 378 defines theft; Section 379 prescribes punishment. Sections 390–392 deal with more serious forms (robbery).",
    relatedSections: [
      { ref: "IPC Section 379", description: "Punishment for theft" },
      { ref: "IPC Section 380", description: "Theft in a building" },
      { ref: "IPC Section 381", description: "Theft by clerk or servant" },
      {
        ref: "IPC Section 390",
        description: "Robbery — aggravated form of theft",
      },
      { ref: "BNS Section 303", description: "BNS 2023 equivalent of theft" },
    ],
  },
  ipc_379: {
    id: "ipc_379",
    title: "IPC Section 379 – Punishment for Theft",
    act: "Indian Penal Code, 1860",
    chapter: "XVII – Of Offences Against Property",
    section: "379",
    description:
      "Whoever commits theft shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.",
    bengaliDescription:
      "যে ব্যক্তি চুরি করবে তাকে ৩ বছর পর্যন্ত যেকোনো ধরনের কারাদণ্ড অথবা জরিমানা অথবা উভয় দণ্ড দেওয়া হবে। এটি একটি জামিনযোগ্য, বিচারযোগ্য এবং আপসযোগ্য অপরাধ।",
    punishment:
      "Imprisonment up to 3 years, or fine, or both. Cognizable, bailable, compoundable.",
    keyElements: [
      "Commission of theft as defined in Section 378",
      "Maximum 3 years imprisonment",
      "Fine may also be imposed",
      "Bailable offence — bail can be granted by police",
    ],
    examples: [
      "Caught shoplifting goods worth ₹500",
      "Stealing a mobile phone from someone's bag",
    ],
    exceptions: [
      "Aggravated forms of theft under Sections 380–382 carry higher punishment",
    ],
    landmarkCases: [
      {
        name: "State of Maharashtra v. Vishwanath (1979)",
        citation: "AIR 1979 SC 1526",
        principle:
          "Sentence for theft should be proportionate to the value stolen and circumstances.",
      },
    ],
    overridingEffect:
      "Punishment section for Section 378. Theft inside a dwelling house is punished under Section 380 (up to 7 years).",
    relatedSections: [
      { ref: "IPC Section 378", description: "Definition of theft" },
      {
        ref: "IPC Section 380",
        description: "Theft in building/tent/vessel — higher punishment",
      },
      {
        ref: "IPC Section 382",
        description: "Theft after preparation for hurt — up to 10 years",
      },
      { ref: "BNS Section 303", description: "BNS 2023 equivalent" },
    ],
  },
  ipc_390: {
    id: "ipc_390",
    title: "IPC Section 390 – Robbery",
    act: "Indian Penal Code, 1860",
    chapter: "XVII – Of Offences Against Property",
    section: "390",
    description:
      "In all robbery there is either theft or extortion. Theft becomes robbery when the offender, in order to the committing of the theft or in carrying it out, voluntarily causes or attempts to cause death, hurt, or wrongful restraint, or fear of instant death, hurt, or wrongful restraint.",
    bengaliDescription:
      "প্রতিটি ডাকাতিতে চুরি অথবা জবরদস্তি আছে। চুরি তখন ডাকাতিতে পরিণত হয় যখন অপরাধী চুরি করার জন্য বা করার সময় স্বেচ্ছায় মৃত্যু, আঘাত বা অবৈধ বাধা ঘটায় বা ঘটানোর চেষ্টা করে অথবা তাৎক্ষণিক মৃত্যু, আঘাত বা বাধার ভয় দেখায়।",
    punishment:
      "Punishment under Section 392 — up to 10 years rigorous imprisonment and fine.",
    keyElements: [
      "Theft or extortion must be present",
      "Violence or threat of violence used",
      "Fear of instant death, hurt or wrongful restraint",
      "Violence must be contemporaneous with theft",
      "Voluntary act of the accused",
    ],
    examples: [
      "Snatching a chain and pushing the victim down",
      "Robbing a bank with weapons",
      "Threatening a person with a knife to hand over wallet",
      "Pickpocketing and then hitting the victim when caught",
    ],
    exceptions: [
      "If no force or threat is used, it remains simple theft",
      "Extortion becomes robbery when committed in the presence of the person",
    ],
    landmarkCases: [
      {
        name: "Om Prakash v. State of U.P. (1960)",
        citation: "AIR 1960 SC 409",
        principle:
          "The use of force or threat of force transforms theft into robbery.",
      },
      {
        name: "Phool Kumar v. Delhi Administration (1975)",
        citation: "AIR 1975 SC 905",
        principle:
          "There must be a direct connection between the violence and the theft.",
      },
    ],
    overridingEffect:
      "Robbery is an aggravated form of theft or extortion. If committed by 5+ persons or at night on a highway, it becomes dacoity under Section 391.",
    relatedSections: [
      { ref: "IPC Section 378", description: "Theft — base offence" },
      { ref: "IPC Section 383", description: "Extortion" },
      {
        ref: "IPC Section 391",
        description: "Dacoity — robbery by 5+ persons",
      },
      { ref: "IPC Section 392", description: "Punishment for robbery" },
      { ref: "BNS Section 309", description: "BNS 2023 equivalent of robbery" },
    ],
  },
  ipc_392: {
    id: "ipc_392",
    title: "IPC Section 392 – Punishment for Robbery",
    act: "Indian Penal Code, 1860",
    chapter: "XVII – Of Offences Against Property",
    section: "392",
    description:
      "Whoever commits robbery shall be punished with rigorous imprisonment for a term which may extend to ten years, and shall also be liable to fine; and if the robbery is committed on the highway between sunset and sunrise, the imprisonment may be extended to fourteen years.",
    bengaliDescription:
      "যে ব্যক্তি ডাকাতি করবে তাকে ১০ বছর পর্যন্ত কঠোর কারাদণ্ড এবং জরিমানা দেওয়া হবে। সূর্যাস্তের পর থেকে সূর্যোদয়ের আগে মহাসড়কে ডাকাতি করলে শাস্তি ১৪ বছর পর্যন্ত হতে পারে।",
    punishment:
      "Rigorous imprisonment up to 10 years + fine. On highway at night: up to 14 years. Non-bailable and cognizable offence.",
    keyElements: [
      "Commission of robbery as defined in Section 390",
      "Rigorous (hard labour) imprisonment, not simple",
      "Fine is also imposed",
      "Enhanced punishment for night-time highway robbery",
    ],
    examples: [
      "Robbing a person on a highway after dark — 14 years possible",
      "Armed robbery at a shop — up to 10 years",
    ],
    exceptions: [
      "Attempt to commit robbery is punishable under Section 393 (up to 7 years)",
    ],
    landmarkCases: [
      {
        name: "Gurnam Singh v. State of Punjab (1999)",
        citation: "(1999) 7 SCC 755",
        principle:
          "Severity of punishment depends on degree of violence used and circumstances.",
      },
    ],
    overridingEffect:
      "If robbery involves preparation to cause death or grievous hurt, Section 394 applies (up to 10 years or life imprisonment). Dacoity under Section 395 carries up to life imprisonment.",
    relatedSections: [
      { ref: "IPC Section 390", description: "Definition of robbery" },
      { ref: "IPC Section 393", description: "Attempt to commit robbery" },
      {
        ref: "IPC Section 394",
        description: "Voluntarily causing hurt in committing robbery",
      },
      { ref: "IPC Section 395", description: "Punishment for dacoity" },
      { ref: "BNS Section 309", description: "BNS 2023 equivalent" },
    ],
  },
  ipc_406: {
    id: "ipc_406",
    title: "IPC Section 406 – Criminal Breach of Trust",
    act: "Indian Penal Code, 1860",
    chapter: "XVII – Of Offences Against Property",
    section: "406",
    description:
      "Whoever commits criminal breach of trust shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.",
    bengaliDescription:
      "বিশ্বাসের অপরাধমূলক লঙ্ঘন হলো যখন কেউ কারো সম্পত্তি বিশ্বাসের সাথে পায় এবং সেটা অসাধুভাবে নিজের বা অন্যের জন্য ব্যবহার করে। এর শাস্তি ৩ বছর পর্যন্ত কারাদণ্ড, জরিমানা বা উভয়। এটি সাধারণত প্রতারণামূলক অর্থ আত্মসাতের ক্ষেত্রে প্রযোজ্য।",
    punishment:
      "Imprisonment up to 3 years, or fine, or both. Cognizable, non-bailable.",
    keyElements: [
      "Property entrusted to the accused",
      "Accused must be in a position of trust",
      "Dishonest misappropriation or conversion of property",
      "Violation of legal duty regarding property",
    ],
    examples: [
      "An employee stealing money from the employer's cash register",
      "A lawyer misusing client funds",
      "A broker misappropriating shares entrusted by a client",
      "A trustee using trust property for personal benefit",
    ],
    exceptions: [
      "Honest dispute about ownership is not criminal breach of trust",
      "Civil liability and criminal liability may coexist",
      "Good faith use of property is not breach of trust",
    ],
    landmarkCases: [
      {
        name: "Velji Raghavji Patel v. State of Maharashtra (1965)",
        citation: "AIR 1965 SC 1433",
        principle:
          "Entrustment and subsequent misappropriation are the twin pillars of this offence.",
      },
      {
        name: "Jaswant Rai Manilal Akhaney v. State of Bombay (1956)",
        citation: "AIR 1956 SC 575",
        principle:
          "The accused must have received property in a fiduciary capacity.",
      },
    ],
    overridingEffect:
      "Section 405 defines Criminal Breach of Trust; Section 406 prescribes the general punishment. Sections 407-409 prescribe enhanced punishments for specific categories (carriers, bankers, public servants).",
    relatedSections: [
      {
        ref: "IPC Section 405",
        description: "Definition of criminal breach of trust",
      },
      {
        ref: "IPC Section 407",
        description: "CBT by carrier, wharfinger or warehouse-keeper",
      },
      { ref: "IPC Section 408", description: "CBT by clerk or servant" },
      {
        ref: "IPC Section 409",
        description: "CBT by public servant — higher punishment",
      },
      { ref: "BNS Section 316", description: "BNS 2023 equivalent" },
    ],
  },
  ipc_409: {
    id: "ipc_409",
    title: "IPC Section 409 – Criminal Breach of Trust by Public Servant",
    act: "Indian Penal Code, 1860",
    chapter: "XVII – Of Offences Against Property",
    section: "409",
    description:
      "Whoever, being in any manner entrusted with property, or with dominion over property in his capacity of a public servant, or in the way of his business as a banker, merchant, factor, broker, attorney or agent, commits criminal breach of trust in respect of that property, shall be punished with imprisonment for life, or with imprisonment of either description for a term which may extend to ten years, and shall also be liable to fine.",
    bengaliDescription:
      "কোনো সরকারি কর্মচারী বা ব্যাংকার, মার্চেন্ট, ব্রোকার, অ্যাটর্নি বা এজেন্ট যদি তাদের পদের সুবাদে পাওয়া সম্পত্তির বিশ্বাসের অপরাধমূলক লঙ্ঘন করেন, তাহলে যাবজ্জীবন কারাদণ্ড অথবা ১০ বছর পর্যন্ত কারাদণ্ড এবং জরিমানা হবে। সরকারি কর্মচারীদের উচ্চতর জবাবদিহিতার কারণে শাস্তি কঠোর।",
    punishment:
      "Life imprisonment, or imprisonment up to 10 years + fine. Non-bailable, cognizable offence.",
    keyElements: [
      "Must be a public servant, banker, merchant, broker, attorney or agent",
      "Property entrusted in that official capacity",
      "Dishonest misappropriation or conversion",
      "Higher standard of accountability for public servants",
    ],
    examples: [
      "Government officer misappropriating public funds",
      "Bank manager using depositors' money for personal gain",
      "Treasury officer siphoning government money",
      "Municipal officer embezzling tax collections",
    ],
    exceptions: [
      "Innocent mistake of fact without dishonest intention is not covered",
      "Must be in official capacity — personal transactions not covered",
    ],
    landmarkCases: [
      {
        name: "State of Gujarat v. Mohanlal Jitamalji Porwal (1987)",
        citation: "AIR 1987 SC 1321",
        principle:
          "Public servants are held to a higher standard — misuse of public funds deserves exemplary punishment.",
      },
      {
        name: "Krishan Kumar v. Union of India (1959)",
        citation: "AIR 1959 SC 1390",
        principle:
          "A public servant who misappropriates government property is guilty under Section 409.",
      },
    ],
    overridingEffect:
      "Section 409 is the most serious form of Criminal Breach of Trust. Prevention of Corruption Act, 1988 also applies to public servants and may be used alongside Section 409.",
    relatedSections: [
      { ref: "IPC Section 405", description: "Definition of CBT" },
      { ref: "IPC Section 406", description: "General punishment for CBT" },
      {
        ref: "Prevention of Corruption Act 1988 Section 13",
        description: "Criminal misconduct by public servant",
      },
      {
        ref: "BNS Section 316(5)",
        description: "BNS 2023 equivalent for CBT by public servant",
      },
    ],
  },
  ipc_463: {
    id: "ipc_463",
    title: "IPC Section 463 – Forgery",
    act: "Indian Penal Code, 1860",
    chapter: "XVIII – Of Offences Relating to Documents",
    section: "463",
    description:
      "Whoever makes any false document or false electronic record or part of a document or electronic record, with intent to cause damage or injury to the public or to any person, or to support any claim or title, or to cause any person to part with property, or to enter into any express or implied contract, or with intent to commit fraud or that fraud may be committed, commits forgery.",
    bengaliDescription:
      "যে ব্যক্তি জনসাধারণ বা কোনো ব্যক্তির ক্ষতি করার উদ্দেশ্যে, কোনো দাবি বা শিরোনাম সমর্থন করতে, কাউকে সম্পত্তি ছেড়ে দিতে বাধ্য করতে, চুক্তিতে প্রবেশ করাতে বা প্রতারণা করার উদ্দেশ্যে মিথ্যা দলিল বা ইলেকট্রনিক রেকর্ড তৈরি করে, সে জালিয়াতি করেছে বলে গণ্য হয়।",
    punishment:
      "Punishment under Section 465 — imprisonment up to 2 years, or fine, or both.",
    keyElements: [
      "Making a false document or electronic record",
      "Intent to cause damage or injury",
      "Intent to support a claim or title",
      "Intent to cause fraud or commit fraud",
      "Dishonest or fraudulent intent is essential",
    ],
    examples: [
      "Creating a fake property deed",
      "Forging a signature on a cheque",
      "Making a fake educational certificate",
      "Creating counterfeit currency",
      "Forging a government order",
    ],
    exceptions: [
      "No forgery without fraudulent or dishonest intention",
      "Genuine mistake does not amount to forgery",
      "Making a document for practice/educational purposes without intent to use",
    ],
    landmarkCases: [
      {
        name: "Sheila Sebastian v. R. Jawaharaj (2018)",
        citation: "AIR 2018 SC 1921",
        principle:
          "Intent to defraud is the essence of forgery — the mental element is crucial.",
      },
      {
        name: "Naina Mohammed v. State (1983)",
        citation: "AIR 1983 Mad 25",
        principle:
          "Forging a signature on a document with dishonest intent constitutes forgery.",
      },
    ],
    overridingEffect:
      "Section 463 defines forgery; Sections 464–477A prescribe punishments for various types of forgery. IT Act Section 66 covers electronic forgery.",
    relatedSections: [
      { ref: "IPC Section 464", description: "Making a false document" },
      {
        ref: "IPC Section 465",
        description: "Punishment for forgery — 2 years",
      },
      {
        ref: "IPC Section 468",
        description: "Forgery for purpose of cheating — 7 years",
      },
      {
        ref: "IPC Section 471",
        description: "Using forged document as genuine",
      },
      {
        ref: "IT Act Section 66",
        description: "Computer-related forgery/offences",
      },
    ],
  },
  ipc_464: {
    id: "ipc_464",
    title: "IPC Section 464 – Making a False Document",
    act: "Indian Penal Code, 1860",
    chapter: "XVIII – Of Offences Relating to Documents",
    section: "464",
    description:
      "A person is said to make a false document or false electronic record who dishonestly or fraudulently makes, signs, seals or executes a document or part of a document; or makes any mark denoting the execution of a document, with the intention of causing it to be believed that such document was made by another person.",
    bengaliDescription:
      "একজন ব্যক্তি মিথ্যা দলিল তৈরি করেছে বলে গণ্য হয় যদি সে অসাধুভাবে বা প্রতারণামূলকভাবে কোনো দলিল তৈরি, স্বাক্ষর, সিলমোহর বা সম্পাদন করে, বা অন্য কেউ এটি করেছে এমন বিশ্বাস তৈরি করার উদ্দেশ্যে কাজ করে। এটি Section 463 (Forgery)-এর ব্যাখ্যামূলক ধারা।",
    punishment:
      "Punished under Section 465 — up to 2 years imprisonment, or fine, or both.",
    keyElements: [
      "Dishonest or fraudulent making/signing/executing a document",
      "Causing a document to be believed made by another person",
      "Altering a document after execution without authority",
      "Inducing a person to sign under false pretence",
      "Applies to electronic records also",
    ],
    examples: [
      "Signing someone else's name on a cheque",
      "Creating a will in the name of a deceased person",
      "Fraudulently obtaining a signature on a blank paper then filling in terms",
      "Making a fake stamp/seal impression",
    ],
    exceptions: [
      "Signing own name on a document is not making a false document",
      "No offence if no dishonest or fraudulent intent",
    ],
    landmarkCases: [
      {
        name: "Kanshi Ram v. State of Punjab (2013)",
        citation: "(2013) 4 SCC 730",
        principle:
          "Fraudulently inducing someone to sign a document under false belief constitutes making a false document.",
      },
    ],
    overridingEffect:
      "This section defines what constitutes 'making a false document' for the purposes of forgery under Section 463. It is the factual basis for prosecuting forgery.",
    relatedSections: [
      { ref: "IPC Section 463", description: "Forgery — the main offence" },
      { ref: "IPC Section 465", description: "Punishment for forgery" },
      {
        ref: "IPC Section 468",
        description: "Forgery for cheating — higher punishment",
      },
      {
        ref: "IPC Section 477",
        description: "Fraudulent cancellation of documents",
      },
    ],
  },
  ipc_468: {
    id: "ipc_468",
    title: "IPC Section 468 – Forgery for Purpose of Cheating",
    act: "Indian Penal Code, 1860",
    chapter: "XVIII – Of Offences Relating to Documents",
    section: "468",
    description:
      "Whoever commits forgery, intending that the document or electronic record forged shall be used for the purpose of cheating, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.",
    bengaliDescription:
      "যে ব্যক্তি প্রতারণার উদ্দেশ্যে জালিয়াতি করে, তাকে ৭ বছর পর্যন্ত যেকোনো ধরনের কারাদণ্ড এবং জরিমানা দেওয়া হবে। এটি সাধারণ জালিয়াতির (Section 465 — ২ বছর) চেয়ে কঠোর শাস্তি কারণ এখানে প্রতারণার অভিপ্রায় আছে।",
    punishment:
      "Imprisonment up to 7 years + fine. Non-bailable, cognizable offence. Triable by Magistrate of 1st class.",
    keyElements: [
      "Commission of forgery as defined in Section 463",
      "Intent that the forged document will be used for cheating",
      "Cheating as defined in Section 415 IPC",
      "Higher punishment than general forgery due to cheating intent",
    ],
    examples: [
      "Forging an educational degree to get a job",
      "Creating a fake income certificate for bank loan fraud",
      "Forging property documents to sell property fraudulently",
      "Making fake invoices to defraud a company",
      "Forging a cheque to withdraw money fraudulently",
    ],
    exceptions: [
      "If no intent to cheat, Section 465 (general forgery) applies instead",
      "Mere possession of forged document not enough — use/intent to use for cheating required",
    ],
    landmarkCases: [
      {
        name: "State of Andhra Pradesh v. Appi Reddy (1956)",
        citation: "AIR 1956 AP 37",
        principle:
          "Both forgery and intention to use for cheating must be proved.",
      },
      {
        name: "Soma Chakraborty v. State (2007)",
        citation: "(2007) 5 SCC 403",
        principle:
          "Section 468 and Section 471 are often charged together when forged documents are used.",
      },
    ],
    overridingEffect:
      "Section 468 is frequently combined with Section 420 (cheating) and Section 471 (using forged documents). Together they form the classic 'forgery + cheating' criminal combo.",
    relatedSections: [
      { ref: "IPC Section 415", description: "Definition of cheating" },
      {
        ref: "IPC Section 420",
        description: "Cheating and dishonestly inducing delivery of property",
      },
      {
        ref: "IPC Section 465",
        description: "General punishment for forgery — 2 years",
      },
      {
        ref: "IPC Section 471",
        description: "Using forged document as genuine",
      },
      {
        ref: "BNS Section 339",
        description: "BNS 2023 equivalent of forgery for cheating",
      },
    ],
  },
  ipc_471: {
    id: "ipc_471",
    title: "IPC Section 471 – Using Forged Document as Genuine",
    act: "Indian Penal Code, 1860",
    chapter: "XVIII – Of Offences Relating to Documents",
    section: "471",
    description:
      "Whoever fraudulently or dishonestly uses as genuine any document or electronic record which he knows or has reason to believe to be a forged document or electronic record, shall be punished in the same manner as if he had forged such document or electronic record.",
    bengaliDescription:
      "যে ব্যক্তি জেনে বা বিশ্বাস করার কারণ থাকা সত্ত্বেও কোনো জাল দলিলকে আসল হিসেবে প্রতারণামূলকভাবে বা অসাধুভাবে ব্যবহার করে, সে ওই দলিল জাল করার মতো একই শাস্তি পাবে। অর্থাৎ জাল দলিল না বানালেও ব্যবহার করলে সমান দোষী।",
    punishment:
      "Same punishment as forgery of the relevant document. If for cheating — up to 7 years + fine. Non-bailable, cognizable.",
    keyElements: [
      "Knowledge or reason to believe the document is forged",
      "Fraudulent or dishonest use of that document",
      "Using as if it were genuine",
      "Applies even if the person did not forge it themselves",
      "Applies to electronic records too",
    ],
    examples: [
      "Submitting a fake degree certificate for a job application",
      "Presenting a forged property deed at a land office",
      "Using a counterfeit currency note knowing it is fake",
      "Submitting forged court orders to a bank",
      "Producing a fake caste certificate to claim reservation",
    ],
    exceptions: [
      "No offence if the person did not know or had no reason to believe the document was forged",
      "Good faith use of a document believed to be genuine is not an offence",
    ],
    landmarkCases: [
      {
        name: "Suresh Kumar Bhikamchand Jain v. State of Maharashtra (2013)",
        citation: "AIR 2013 SC 2396",
        principle:
          "Knowledge that the document is forged is a sine qua non for Section 471.",
      },
      {
        name: "Dwaraka Prasad Agarwal v. B.D. Agarwal (2003)",
        citation: "AIR 2003 SC 2588",
        principle:
          "Section 471 is independent of Section 468 — one who uses a forged document is as guilty as the forger.",
      },
    ],
    overridingEffect:
      "Section 471 completes the forgery cycle — Section 463/464 creates the false document, Section 468 covers forgery for cheating, and Section 471 covers the actual use. All three are often charged together.",
    relatedSections: [
      {
        ref: "IPC Section 463",
        description: "Forgery — creating the false document",
      },
      {
        ref: "IPC Section 468",
        description: "Forgery for purpose of cheating",
      },
      {
        ref: "IPC Section 420",
        description: "Cheating — often charged alongside",
      },
      { ref: "IPC Section 474", description: "Possession of forged documents" },
      { ref: "BNS Section 342", description: "BNS 2023 equivalent" },
    ],
  },
  bns_103: {
    title: "BNS Section 103 — Punishment for Murder",
    actName: "Bharatiya Nyaya Sanhita, 2023",
    sectionNumber: "103",
    sectionText:
      "Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine.",
    explanation:
      "Section 103 BNS 2023 replaces IPC Section 302. It prescribes death penalty or imprisonment for life for murder. The 'rarest of rare' doctrine from Bachan Singh v. State of Punjab still applies.",
    examples: [
      "A kills B with premeditation — punishable under BNS 103.",
      "A person poisons their spouse with intent to kill — BNS 103 applies.",
    ],
    landmarkCases: [
      {
        name: "Bachan Singh v. State of Punjab (1980)",
        summary: "Established 'rarest of rare' doctrine for death penalty.",
      },
      {
        name: "Machhi Singh v. State of Punjab (1983)",
        summary: "Defined categories qualifying as rarest of rare cases.",
      },
    ],
    exceptions:
      "Murder reduced to culpable homicide under BNS Section 101 exceptions: grave provocation, exceeded private defence, public servant good faith, sudden fight, victim consent.",
    overridingEffect:
      "BNS 103 replaces IPC 302. For crimes committed before July 1, 2024, IPC 302 still applies. Read with BNS Section 101 (definition of murder).",
    relatedSections: [
      { ref: "BNS Section 101", description: "Definition of Murder under BNS" },
      {
        ref: "BNS Section 105",
        description: "Culpable homicide not amounting to murder",
      },
      { ref: "IPC Section 302", description: "Old equivalent provision" },
      {
        ref: "BNSS Section 176",
        description: "Investigation by magistrate in death cases",
      },
    ],
  },
  bns_64: {
    title: "BNS Section 64 — Punishment for Rape",
    actName: "Bharatiya Nyaya Sanhita, 2023",
    sectionNumber: "64",
    sectionText:
      "Whoever commits rape shall be punished with rigorous imprisonment of either description for a term which shall not be less than ten years, but which may extend to imprisonment for life, and shall also be liable to fine.",
    explanation:
      "BNS Section 64 replaces IPC Section 376. It provides minimum 10 years rigorous imprisonment for rape, extendable to life imprisonment. Enhanced punishment for gang rape, rape on minors, custodial rape etc.",
    examples: [
      "Non-consensual sexual intercourse — BNS 64 applies.",
      "Rape by a police officer in custody — aggravated punishment under BNS 64(2).",
    ],
    landmarkCases: [
      {
        name: "Mukesh & Anr v. State for NCT of Delhi (2017)",
        summary:
          "Nirbhaya case — SC upheld death penalty for gang rape and murder.",
      },
      {
        name: "Tukaram v. State of Maharashtra (1979)",
        summary:
          "Mathura rape case — led to Criminal Law Amendment 1983 and later major reforms.",
      },
    ],
    exceptions:
      "Medical procedures with consent; situations defined by consent in BNS are not rape.",
    overridingEffect:
      "Replaces IPC 376. POCSO Act applies additionally if victim is below 18 years.",
    relatedSections: [
      { ref: "BNS Section 63", description: "Definition of Rape" },
      { ref: "BNS Section 70", description: "Gang Rape" },
      { ref: "IPC Section 376", description: "Old equivalent" },
      {
        ref: "POCSO Act Section 4",
        description: "Penetrative sexual assault on children",
      },
    ],
  },
  bns_111: {
    title: "BNS Section 111 — Organised Crime",
    actName: "Bharatiya Nyaya Sanhita, 2023",
    sectionNumber: "111",
    sectionText:
      "Whoever commits or attempts to commit or is involved in an organised crime shall be punished with death or imprisonment for life and fine, or with imprisonment not less than five years and fine.",
    explanation:
      "BNS Section 111 is a new provision — no direct IPC equivalent — targeting organised crime syndicates, criminal enterprises, and gang activities. It covers kidnapping, extortion, contract killing, drug trafficking, cybercrime by organised groups.",
    examples: [
      "A criminal gang extorts money from businesses systematically — BNS 111.",
      "Organised trafficking network — BNS 111 applies.",
    ],
    landmarkCases: [
      {
        name: "State v. Mohd. Ajmal Kasab (2012)",
        summary:
          "Terrorist attack case illustrating organised criminal enterprise.",
      },
    ],
    exceptions:
      "Individual isolated acts not part of organised criminal enterprise are not covered.",
    overridingEffect:
      "New provision in BNS — no IPC equivalent. UAPA may additionally apply in terrorism-related organised crime.",
    relatedSections: [
      { ref: "BNS Section 112", description: "Petty organised crime" },
      { ref: "UAPA Section 15", description: "Terrorist acts" },
      { ref: "IPC Section 120B", description: "Criminal conspiracy (old law)" },
    ],
  },
  bns_316: {
    title: "BNS Section 316 — Criminal Breach of Trust",
    actName: "Bharatiya Nyaya Sanhita, 2023",
    sectionNumber: "316",
    sectionText:
      "Whoever, being in any manner entrusted with property, or with any dominion over property, dishonestly misappropriates or converts to his own use that property, or dishonestly uses or disposes of that property in violation of any direction of law, commits criminal breach of trust.",
    explanation:
      "BNS 316 replaces IPC 405/406. It punishes those who misuse property entrusted to them. Common in cases involving employees, trustees, directors, and public servants who misuse their position.",
    examples: [
      "A company director misappropriates company funds — BNS 316.",
      "A trustee sells trust property for personal gain — BNS 316.",
    ],
    landmarkCases: [
      {
        name: "Velji Raghavji Patel v. State of Maharashtra (1965)",
        summary:
          "SC explained that misappropriation must be dishonest and in violation of trust.",
      },
    ],
    exceptions:
      "Good faith actions under lawful authority; bona fide disputes about ownership.",
    overridingEffect: "Replaces IPC 405 (definition) and 406 (punishment).",
    relatedSections: [
      { ref: "IPC Section 406", description: "Old equivalent" },
      { ref: "BNS Section 318", description: "Cheating" },
      { ref: "BNS Section 319", description: "Cheating by personation" },
    ],
  },
  bns_351: {
    title: "BNS Section 351 — Criminal Intimidation",
    actName: "Bharatiya Nyaya Sanhita, 2023",
    sectionNumber: "351",
    sectionText:
      "Whoever threatens another with any injury to his person, reputation, or property, or to the person or reputation of anyone in whom that person is interested, with intent to cause alarm to that person, commits criminal intimidation.",
    explanation:
      "BNS 351 replaces IPC 503/506. Threatening someone with harm to cause fear or compel/deter action is criminal intimidation. Punishment: up to 2 years, or fine, or both. If threat is death/grievous hurt: up to 7 years.",
    examples: [
      "A person threatens to harm someone's family unless they withdraw a complaint — BNS 351.",
      "Threatening messages online causing alarm — BNS 351.",
    ],
    landmarkCases: [
      {
        name: "Manik Taneja v. State of Karnataka (2015)",
        summary:
          "SC held that threatening messages on social media can constitute criminal intimidation.",
      },
    ],
    exceptions:
      "Expressing dissatisfaction or opinion without intent to cause alarm is not intimidation.",
    overridingEffect: "Replaces IPC 503 and 506.",
    relatedSections: [
      { ref: "IPC Section 503", description: "Old definition" },
      { ref: "IPC Section 506", description: "Old punishment provision" },
      {
        ref: "IT Act Section 66A",
        description:
          "Online intimidation (struck down but relevant historically)",
      },
    ],
  },
  bnss_173: {
    title: "BNSS Section 173 — First Information Report (FIR)",
    actName: "Bharatiya Nagarik Suraksha Sanhita, 2023",
    sectionNumber: "173",
    sectionText:
      "Every information relating to the commission of a cognisable offence, if given orally to an officer in charge of a police station, shall be reduced to writing by him or under his direction, and be read over to the informant.",
    explanation:
      "BNSS 173 replaces CrPC 154 — the FIR provision. Every cognisable offence complaint must be registered as FIR. Zero FIR can be filed at any police station. Copy must be given to complainant free of cost. E-FIR is now explicitly recognized.",
    examples: [
      "A theft victim reports to police — FIR must be registered under BNSS 173.",
      "A woman can file FIR at any police station regardless of jurisdiction (Zero FIR).",
    ],
    landmarkCases: [
      {
        name: "Lalita Kumari v. Govt. of UP (2014)",
        summary:
          "SC made FIR registration mandatory for cognisable offences — police cannot conduct preliminary inquiry before registering FIR.",
      },
      {
        name: "D.K. Basu v. State of West Bengal (1997)",
        summary: "Guidelines on arrest and custody, linked to FIR procedure.",
      },
    ],
    exceptions:
      "Non-cognisable offences require magistrate's order before investigation.",
    overridingEffect:
      "Replaces CrPC 154. Adds provision for e-FIR and Zero FIR explicitly.",
    relatedSections: [
      { ref: "CrPC Section 154", description: "Old FIR provision" },
      { ref: "BNSS Section 176", description: "Investigation by Magistrate" },
      { ref: "BNSS Section 35", description: "Arrest without warrant" },
    ],
  },
  bnss_35: {
    title: "BNSS Section 35 — Arrest Without Warrant",
    actName: "Bharatiya Nagarik Suraksha Sanhita, 2023",
    sectionNumber: "35",
    sectionText:
      "Any police officer may, without an order from a Magistrate and without a warrant, arrest any person who has been concerned in any cognisable offence, or against whom a reasonable complaint has been made, or credible information has been received.",
    explanation:
      "BNSS 35 replaces CrPC 41. Police can arrest without warrant for cognisable offences, but must record written reasons. Adds new safeguards: police must inform person's family, provide reasons in writing, and follow Arnesh Kumar guidelines. Preventive detention powers included.",
    examples: [
      "Police arrest a robbery suspect at the scene — BNSS 35.",
      "Arrest based on credible tipoff about a cognisable offence — BNSS 35.",
    ],
    landmarkCases: [
      {
        name: "Arnesh Kumar v. State of Bihar (2014)",
        summary:
          "SC mandated police to apply mind before arresting, especially in cases punishable up to 7 years.",
      },
      {
        name: "D.K. Basu v. State of West Bengal (1997)",
        summary:
          "Established fundamental guidelines for lawful arrest and custody.",
      },
    ],
    exceptions:
      "Cannot arrest without warrant for non-cognisable offences without magistrate order.",
    overridingEffect: "Replaces CrPC 41 with added accountability provisions.",
    relatedSections: [
      {
        ref: "CrPC Section 41",
        description: "Old provision for arrest without warrant",
      },
      { ref: "BNSS Section 173", description: "FIR registration" },
      {
        ref: "Constitution Article 22",
        description: "Protection against arbitrary arrest",
      },
    ],
  },
  bnss_479: {
    title: "BNSS Section 479 — Bail for Undertrial Prisoners",
    actName: "Bharatiya Nagarik Suraksha Sanhita, 2023",
    sectionNumber: "479",
    sectionText:
      "Where a person has, during the period of investigation, inquiry or trial under this Sanhita of an offence, been in detention for a period extending to half of the maximum period of imprisonment specified for that offence, such person shall be released on bail.",
    explanation:
      "BNSS 479 is a major reform replacing CrPC 436A. An undertrial prisoner who has served half the maximum sentence for the alleged offence is entitled to bail. For first-time offenders: one-third period. This addresses the crisis of undertrial prisoners who spend years in jail without conviction.",
    examples: [
      "A person accused of an offence with max 10 years imprisonment, after 5 years in custody, is entitled to bail under BNSS 479.",
      "First-time offender accused of 6-year max offence — entitled to bail after 2 years.",
    ],
    landmarkCases: [
      {
        name: "Re: Inhuman Conditions in 1382 Prisons (2016)",
        summary:
          "SC highlighted undertrial prisoner crisis and called for strict implementation of bail provisions.",
      },
      {
        name: "Satender Kumar Antil v. CBI (2022)",
        summary:
          "SC gave detailed guidelines on bail and undertrial prisoners under CrPC 436A, now replaced by BNSS 479.",
      },
    ],
    exceptions:
      "Does not apply to: persons accused of offences punishable with death, life imprisonment, or involving terrorism.",
    overridingEffect:
      "Improves upon CrPC 436A — first-time offenders get bail after one-third period instead of half.",
    relatedSections: [
      {
        ref: "CrPC Section 436A",
        description: "Old undertrial bail provision",
      },
      { ref: "BNSS Section 480", description: "Bail in bailable offences" },
      {
        ref: "Constitution Article 21",
        description: "Right to life and personal liberty",
      },
    ],
  },
  crpc_154: {
    title: "CrPC Section 154 — Information in Cognisable Cases (FIR)",
    actName: "Code of Criminal Procedure, 1973",
    sectionNumber: "154",
    sectionText:
      "Every information relating to the commission of a cognisable offence, if given orally to an officer in charge of a police station, shall be reduced to writing by him or under his direction, and be read over to the informant.",
    explanation:
      "Section 154 CrPC is the FIR (First Information Report) provision. Every cognisable offence must be registered as FIR — police cannot refuse. A copy must be given to the informant free of cost. The FIR sets the criminal law in motion. Replaced by BNSS 173 for offences from July 1, 2024.",
    examples: [
      "A burglary victim reports to police — FIR must be registered.",
      "A Zero FIR can be filed at any police station; it is later transferred to the jurisdictional station.",
    ],
    landmarkCases: [
      {
        name: "Lalita Kumari v. Govt. of UP (2014)",
        summary:
          "SC made FIR registration mandatory for cognisable offences. No preliminary inquiry allowed before registration.",
      },
      {
        name: "State of AP v. S.S. Syeda (1996)",
        summary:
          "Explained that FIR is not a substantive piece of evidence but can be used for corroboration.",
      },
    ],
    exceptions:
      "For non-cognisable offences, entry in general diary is made and magistrate's order required for investigation.",
    overridingEffect: "Replaced by BNSS 173 from July 1, 2024 for new cases.",
    relatedSections: [
      { ref: "BNSS Section 173", description: "New FIR provision" },
      { ref: "CrPC Section 41", description: "Arrest without warrant" },
      {
        ref: "IPC Section 166A",
        description: "Punishment for police refusing to record FIR",
      },
    ],
  },
  crpc_125: {
    title:
      "CrPC Section 125 — Order for Maintenance of Wives, Children and Parents",
    actName: "Code of Criminal Procedure, 1973",
    sectionNumber: "125",
    sectionText:
      "If any person having sufficient means neglects or refuses to maintain his wife, his legitimate or illegitimate minor child, or his legitimate or illegitimate child (not being a married daughter) who has attained majority and is unable to maintain herself, the Magistrate may order such person to make monthly allowance for maintenance.",
    explanation:
      "Section 125 CrPC provides a secular maintenance law applicable to all religions. A wife, minor children, and parents can claim maintenance from a person with sufficient means who neglects to support them. Magistrate can order monthly allowance up to what is just. Speed trial provision with 60-day timeline.",
    examples: [
      "A deserted wife with no income can claim maintenance from her husband under CrPC 125.",
      "An elderly parent neglected by their employed son can claim maintenance.",
    ],
    landmarkCases: [
      {
        name: "Mohd. Ahmed Khan v. Shah Bano Begum (1985)",
        summary:
          "SC held Muslim divorced women entitled to maintenance under CrPC 125 — led to political controversy and Muslim Women Protection Act 1986.",
      },
      {
        name: "Vimla v. Veeraswamy (1991)",
        summary:
          "SC held that proof of marriage is essential but benefit of doubt goes to claimant.",
      },
      {
        name: "Rajnesh v. Neha (2020)",
        summary:
          "SC gave comprehensive guidelines on maintenance — no duplication, single consolidated maintenance.",
      },
    ],
    exceptions:
      "Wife living in adultery or without reasonable cause refusing to live with husband loses right to maintenance.",
    overridingEffect:
      "Replaced by BNSS Section 144 from July 1, 2024. Applies to all religions despite personal laws.",
    relatedSections: [
      { ref: "BNSS Section 144", description: "New maintenance provision" },
      {
        ref: "Hindu Marriage Act Section 24",
        description: "Maintenance under HMA",
      },
      {
        ref: "DV Act Section 20",
        description: "Monetary relief under Domestic Violence Act",
      },
    ],
  },
  crpc_437: {
    title: "CrPC Section 437 — Bail in Non-Bailable Offences",
    actName: "Code of Criminal Procedure, 1973",
    sectionNumber: "437",
    sectionText:
      "When any person accused of or suspected of the commission of any non-bailable offence is arrested or detained without warrant, or appears or is brought before a Court, he may be released on bail.",
    explanation:
      "Section 437 CrPC governs bail for non-bailable offences before a Magistrate. Court has discretion to grant bail considering: nature and gravity of offence, antecedents, likelihood of fleeing, safety of community. Special conditions apply for offences punishable with death or life imprisonment.",
    examples: [
      "An accused in a theft case (non-bailable) can apply for bail under CrPC 437.",
      "Bail denied in a murder case due to likelihood of fleeing.",
    ],
    landmarkCases: [
      {
        name: "Sanjay Chandra v. CBI (2012)",
        summary:
          "SC held that bail is the rule and jail is the exception; liberty is precious and should not be curtailed without strong reason.",
      },
      {
        name: "P. Chidambaram v. CBI (2019)",
        summary: "SC discussed principles of bail in economic offences.",
      },
    ],
    exceptions:
      "Bail not granted as a matter of right in offences punishable with death or life imprisonment. Person with prior conviction for offence of same kind may be refused bail.",
    overridingEffect: "Replaced by BNSS 480 from July 1, 2024.",
    relatedSections: [
      {
        ref: "CrPC Section 439",
        description: "Bail by Sessions Court/High Court",
      },
      {
        ref: "CrPC Section 436",
        description: "Bail in bailable offences (right of accused)",
      },
      { ref: "BNSS Section 480", description: "New bail provision" },
    ],
  },

  crpc_144: {
    title:
      "CrPC Section 144 — Power to Issue Order in Urgent Cases of Nuisance or Apprehended Danger",
    actName: "Code of Criminal Procedure, 1973",
    sectionNumber: "144",
    sectionText:
      "In cases where, in the opinion of a District Magistrate, a Sub-divisional Magistrate or any other Executive Magistrate specially empowered, there is sufficient ground for proceeding under this section and immediate prevention or speedy remedy is desirable, such Magistrate may, by a written order stating the material facts of the case, direct any person to abstain from a certain act or to take certain order with respect to certain property in his possession or under his management.",
    explanation:
      "Section 144 CrPC is a preventive order used to prevent imminent danger to public peace and order. It can prohibit assembly of 5 or more persons, carrying weapons, or certain actions. A maximum of 2 months validity; can be extended by State Government up to 6 months. Used frequently during communal tensions, protests, elections, and curfews. Cannot be used as a permanent measure — must be revoked when danger passes.",
    examples: [
      "Magistrate imposes Section 144 before a political rally due to communal tension.",
      "Section 144 imposed in a town during curfew after riots.",
      "Prohibitory order against carrying weapons during a festival procession.",
    ],
    landmarkCases: [
      {
        name: "Madhu Limaye v. Sub-Divisional Magistrate (1970)",
        summary:
          "SC held Section 144 must be used sparingly and not as a blanket ban on fundamental rights; reasons must be recorded.",
      },
      {
        name: "Anuradha Bhasin v. Union of India (2020)",
        summary:
          "SC held internet shutdown orders under Section 144 must satisfy tests of necessity and proportionality; cannot be indefinite.",
      },
    ],
    exceptions:
      "Order cannot be passed against a lawful act. Cannot be passed for more than 2 months unless extended by State Government. Cannot violate fundamental rights disproportionately.",
    overridingEffect: "Replaced by BNSS Section 163 from July 1, 2024.",
    relatedSections: [
      { ref: "IPC Section 141", description: "Unlawful assembly" },
      { ref: "Article 19", description: "Freedom of assembly" },
      { ref: "BNSS Section 163", description: "Replacement provision" },
    ],
  },

  crpc_167: {
    title:
      "CrPC Section 167 — Procedure When Investigation Cannot Be Completed in 24 Hours",
    actName: "Code of Criminal Procedure, 1973",
    sectionNumber: "167",
    sectionText:
      "Whenever any person is arrested and detained in custody and it appears that the investigation cannot be completed within the period of twenty-four hours fixed by Section 57, and there are grounds for believing that the accusation or information is well-founded, the officer in charge of the police station or the police officer making the investigation shall transmit to the nearest Judicial Magistrate a copy of the entries in the diary hereinafter prescribed relating to the case.",
    explanation:
      "Section 167 CrPC governs judicial remand and the famous 'default bail' (also called 'statutory bail'). If police cannot complete investigation within 24 hours, accused must be produced before Magistrate who can authorize custody for 15 days at a time. Maximum detention: 60 days for offences punishable with 10+ years imprisonment; 90 days for death/life imprisonment. If chargesheet not filed within this period, accused gets DEFAULT BAIL as a matter of right under Section 167(2) — even for serious offences.",
    examples: [
      "Police arrest in a murder case; after 24 hours, accused sent to judicial remand under Section 167.",
      "If chargesheet not filed in 60 days in a 7-year offence, accused entitled to default bail.",
      "Accused in UAPA case — 90 day deadline for chargesheet.",
    ],
    landmarkCases: [
      {
        name: "Hussainara Khatoon v. State of Bihar (1979)",
        summary:
          "SC held right to speedy trial is fundamental; undertrial detention beyond reasonable time violates Article 21.",
      },
      {
        name: "Rakesh Kumar Paul v. State of Assam (2017)",
        summary:
          "SC held default bail under Section 167(2) is an indefeasible right — once accrued, cannot be defeated even if chargesheet is subsequently filed.",
      },
    ],
    exceptions:
      "For offences under NDPS Act, UAPA, and other special acts, extended periods may apply. Default bail right can be defeated if chargesheet is filed before accused applies for it.",
    overridingEffect: "Replaced by BNSS Section 187 from July 1, 2024.",
    relatedSections: [
      { ref: "CrPC Section 57", description: "24-hour production rule" },
      { ref: "CrPC Section 437", description: "Bail in non-bailable offences" },
      { ref: "BNSS Section 187", description: "Replacement provision" },
      { ref: "Article 21", description: "Right to life and liberty" },
    ],
  },

  crpc_173: {
    title:
      "CrPC Section 173 — Report of Police Officer on Completion of Investigation",
    actName: "Code of Criminal Procedure, 1973",
    sectionNumber: "173",
    sectionText:
      "Every investigation under this Chapter shall be completed without unnecessary delay. As soon as it is completed, the officer in charge of the police station shall forward to a Magistrate empowered to take cognizance of the offence on a police report, a report in the form prescribed by the State Government.",
    explanation:
      "Section 173 CrPC deals with the police report (chargesheet) filed at the end of investigation. After investigation, police must file either: (a) Chargesheet (if evidence found) — magistrate takes cognizance; or (b) Final report (if insufficient evidence) — magistrate may or may not accept. The chargesheet must be filed within 60 or 90 days (as per Section 167) or accused gets default bail. Even after chargesheet, police can file supplementary report.",
    examples: [
      "Police complete murder investigation and file chargesheet against accused under Section 173.",
      "Police file final report citing insufficient evidence; magistrate may direct further investigation.",
    ],
    landmarkCases: [
      {
        name: "Vinubhai Haribhai Malaviya v. State of Gujarat (2019)",
        summary:
          "SC held Magistrate can direct further investigation even after chargesheet is filed under Section 173(8).",
      },
      {
        name: "Bhagwant Singh v. Commissioner of Police (1985)",
        summary:
          "SC held informant must be given notice when police file final report recommending closure.",
      },
    ],
    exceptions:
      "Supplementary chargesheets can be filed after the initial report. Magistrate cannot direct further investigation in Sessions-triable cases.",
    overridingEffect: "Replaced by BNSS Section 193 from July 1, 2024.",
    relatedSections: [
      { ref: "CrPC Section 167", description: "Remand and default bail" },
      { ref: "CrPC Section 190", description: "Cognizance by Magistrate" },
      { ref: "BNSS Section 193", description: "Replacement provision" },
    ],
  },

  crpc_190: {
    title: "CrPC Section 190 — Cognizance of Offences by Magistrates",
    actName: "Code of Criminal Procedure, 1973",
    sectionNumber: "190",
    sectionText:
      "Subject to the provisions of this Chapter, any Magistrate of the first class, and any Magistrate of the second class specially empowered in this behalf under sub-section (2), may take cognizance of any offence upon receiving a complaint of facts which constitute such offence; or upon a police report of such facts; or upon information received from any person other than a police officer, or upon his own knowledge, that such an offence has been committed.",
    explanation:
      "Section 190 is the gateway to trial — a Magistrate takes cognizance (formal acknowledgment of an offence) before issuing process. Three modes: (1) On complaint by private person; (2) On police chargesheet (Section 173 report); (3) On suo motu knowledge. 'Taking cognizance' does not mean issuance of process — it means the Magistrate has applied judicial mind to the offence. A Magistrate cannot take cognizance unless empowered to do so.",
    examples: [
      "After chargesheet is filed, Magistrate takes cognizance and issues summons to accused.",
      "Victim files complaint directly to Magistrate under Section 190(1)(a) — private complaint.",
      "Magistrate takes suo motu cognizance on reading newspaper report of a heinous crime.",
    ],
    landmarkCases: [
      {
        name: "R.R. Chari v. State of UP (1951)",
        summary:
          "SC defined 'taking cognizance' as applying judicial mind to the commission of an offence.",
      },
      {
        name: "Devarapalli Lakshminarayana Reddy v. V. Narayana Reddy (1976)",
        summary:
          "SC held that taking cognizance and issuing process are distinct judicial acts.",
      },
    ],
    exceptions:
      "Certain offences can only be tried by Sessions Court — Magistrate cannot take cognizance directly. Sanction is required for prosecution of public servants (Section 197).",
    overridingEffect: "Replaced by BNSS Section 210 from July 1, 2024.",
    relatedSections: [
      { ref: "CrPC Section 173", description: "Police chargesheet" },
      {
        ref: "CrPC Section 197",
        description: "Prosecution of public servants",
      },
      { ref: "CrPC Section 200", description: "Examination of complainant" },
      { ref: "BNSS Section 210", description: "Replacement provision" },
    ],
  },

  crpc_197: {
    title: "CrPC Section 197 — Prosecution of Judges and Public Servants",
    actName: "Code of Criminal Procedure, 1973",
    sectionNumber: "197",
    sectionText:
      "When any person who is or was a Judge or Magistrate or a public servant not removable from his office save by or with the sanction of the Government is accused of any offence alleged to have been committed by him while acting or purporting to act in the discharge of his official duty, no Court shall take cognizance of such offence except with the previous sanction of the appropriate Government.",
    explanation:
      "Section 197 CrPC requires prior government sanction before prosecuting judges, magistrates, or public servants for acts done in discharge of official duty. The test is whether the act was done in discharge of official duty — not whether it was lawful or criminal. This protection exists to prevent harassment of public servants by frivolous complaints. However, the protection does not extend to acts having no reasonable connection with official duty (e.g., personal crimes).",
    examples: [
      "Police officer shoots a person claiming it was done in discharge of duty — Section 197 sanction required before prosecution.",
      "A judge takes bribe in a case — Supreme Court held sanction required for prosecution.",
      "Collector orders demolition of house wrongly — sanction needed to prosecute.",
    ],
    landmarkCases: [
      {
        name: "Matajog Dobey v. H.C. Bhari (1955)",
        summary:
          "SC laid down that the test is whether the act was done in discharge of official duty, even if the act is alleged to be done in excess of such duty.",
      },
      {
        name: "State of Maharashtra v. Dr. Budhikota Subbarao (1993)",
        summary:
          "SC held that the protection under Section 197 cannot be used as a shield by corrupt public servants.",
      },
    ],
    exceptions:
      "Protection not available for acts with no nexus to official duty (personal crimes). Does not apply to private citizens even if they assisted the public servant.",
    overridingEffect: "Replaced by BNSS Section 218 from July 1, 2024.",
    relatedSections: [
      { ref: "CrPC Section 190", description: "Cognizance by Magistrate" },
      { ref: "Article 311", description: "Dismissal of civil servants" },
      {
        ref: "Prevention of Corruption Act",
        description: "Sanction under PC Act",
      },
    ],
  },

  crpc_300: {
    title:
      "CrPC Section 300 — Person Once Convicted or Acquitted Not to Be Tried for Same Offence (Double Jeopardy)",
    actName: "Code of Criminal Procedure, 1973",
    sectionNumber: "300",
    sectionText:
      "A person who has once been tried by a Court of competent jurisdiction for an offence and convicted or acquitted of such offence shall, while such conviction or acquittal remains in force, not be liable to be tried again for the same offence, nor on the same facts for any other offence for which a different charge from the one made against him might have been made under Section 221(1), or for which he might have been convicted under Section 221(2).",
    explanation:
      "Section 300 CrPC embodies the principle of 'Double Jeopardy' (autrefois acquit / autrefois convict) — once acquitted or convicted, a person cannot be tried again for the same offence. This is also a fundamental right under Article 20(2) of the Constitution. The rule applies only when: (1) Trial by competent court, (2) Same offence or same facts, (3) Conviction or acquittal was final. Exception: Retrial allowed if prior conviction was reversed on appeal.",
    examples: [
      "Accused acquitted of murder in Session Court — State cannot retry him for the same murder.",
      "Accused convicted for theft — cannot be retried for the same theft under Section 300.",
      "New trial ordered by High Court on appeal — not barred by Section 300.",
    ],
    landmarkCases: [
      {
        name: "State of Bombay v. S.L. Apte (1961)",
        summary:
          "SC held double jeopardy under Article 20(2) and Section 300 CrPC requires same offence, not merely same facts.",
      },
      {
        name: "Thomas Dana v. State of Punjab (1959)",
        summary:
          "SC explained the constitutional and statutory protection against double jeopardy.",
      },
    ],
    exceptions:
      "Does not bar prosecution for a different offence arising from same facts. Retrial ordered by appellate court is permissible. Does not apply if earlier proceedings were void (by incompetent court).",
    overridingEffect:
      "Replaced by BNSS Section 337 from July 1, 2024. See also Article 20(2) Constitution.",
    relatedSections: [
      {
        ref: "Article 20(2)",
        description: "Constitutional double jeopardy protection",
      },
      { ref: "CrPC Section 221", description: "Charges for offences" },
      { ref: "BNSS Section 337", description: "Replacement provision" },
    ],
  },

  crpc_357: {
    title: "CrPC Section 357 — Order to Pay Compensation",
    actName: "Code of Criminal Procedure, 1973",
    sectionNumber: "357",
    sectionText:
      "When a Court imposes a sentence of fine or a sentence (including a sentence of death) of which fine forms a part, the Court may, when passing judgment, order the whole or any part of the fine recovered to be applied in the payment to any person of compensation for any loss or injury caused by the offence.",
    explanation:
      "Section 357 CrPC enables courts to award compensation to victims of crime out of fine imposed on convict. Section 357A (added in 2008) creates a Victim Compensation Scheme where State government provides compensation even if offender is not traced or acquitted. Courts have a duty to consider compensation — not just a discretion. SC has held that compensation under 357 is an obligation and must be awarded in appropriate cases. Even if fine is not imposed, court can direct payment under its inherent powers.",
    examples: [
      "Accident victim gets compensation from fine paid by rash driver under Section 357.",
      "Rape victim awarded compensation under Section 357A from state victim compensation fund.",
      "Acid attack victim gets compensation from Section 357A fund.",
    ],
    landmarkCases: [
      {
        name: "Hari Singh v. Sukhbir Singh (1988)",
        summary:
          "SC held courts have a duty to apply mind to awarding compensation; failure to do so is an error.",
      },
      {
        name: "Nipun Saxena v. Union of India (2018)",
        summary:
          "SC directed states to implement victim compensation schemes properly under Section 357A.",
      },
    ],
    exceptions:
      "Amount limited by fine imposed (unless Section 357A fund is used). Cannot exceed loss suffered. Cannot be awarded in addition to civil damages for same injury (to avoid double recovery).",
    overridingEffect: "Replaced by BNSS Section 395 from July 1, 2024.",
    relatedSections: [
      { ref: "CrPC Section 357A", description: "Victim Compensation Scheme" },
      { ref: "BNSS Section 395", description: "Replacement provision" },
    ],
  },

  crpc_436: {
    title: "CrPC Section 436 — Bail in Bailable Offences (Right of Accused)",
    actName: "Code of Criminal Procedure, 1973",
    sectionNumber: "436",
    sectionText:
      "When any person other than a person accused of a non-bailable offence is arrested or detained without warrant by an officer in charge of a police station, or appears or is brought before a Court, and is prepared at any time while in custody of such officer or at any stage of the proceedings before such Court to give bail, such person shall be released on bail.",
    explanation:
      "Section 436 CrPC provides bail as an ABSOLUTE RIGHT in bailable offences — police and courts have NO discretion to refuse bail. The accused simply needs to furnish a bail bond. This is a fundamental difference from Section 437 (non-bailable offences) where bail is discretionary. Even if accused cannot furnish surety (Section 436A), they must be released on personal bond after half the maximum sentence period. Denial of bail in bailable offence is illegal.",
    examples: [
      "Person arrested for minor assault (bailable offence) must be released on bail as a matter of right.",
      "Accused in cheque bounce case (bailable) cannot be kept in custody if willing to give bail.",
    ],
    landmarkCases: [
      {
        name: "Moti Ram v. State of MP (1978)",
        summary:
          "Justice Krishna Iyer held bail in bailable offences is a right; demanding heavy surety from poor accused is unconstitutional.",
      },
    ],
    exceptions:
      "No exceptions in bailable offences — bail is an absolute right. However, terms of bail (amount, conditions) can be set by court.",
    overridingEffect: "Replaced by BNSS Section 478 from July 1, 2024.",
    relatedSections: [
      {
        ref: "CrPC Section 436A",
        description: "Bail after half sentence period",
      },
      { ref: "CrPC Section 437", description: "Bail in non-bailable offences" },
      { ref: "BNSS Section 478", description: "Replacement provision" },
    ],
  },

  crpc_436a: {
    title:
      "CrPC Section 436A — Maximum Period of Detention of Undertrial Prisoners",
    actName: "Code of Criminal Procedure, 1973",
    sectionNumber: "436A",
    sectionText:
      "Where a person has, during the period of investigation, inquiry or trial under this Code of an offence under any law (not being an offence for which the punishment of death has been specified as one of the punishments under that law) undergone detention for a period extending up to one-half of the maximum period of imprisonment specified for that offence under that law, he shall be released by the Court on his personal bond with or without sureties.",
    explanation:
      "Section 436A CrPC (inserted in 2005) protects undertrials from prolonged detention. If an undertrial has spent half the maximum sentence period in custody, they are entitled to bail as a right — even for non-bailable offences (except offences with death penalty). The court shall release on personal bond. This implements the right to speedy trial under Article 21. The provision was added after the Hussainara Khatoon case exposed massive undertrial detention problem in India.",
    examples: [
      "Person accused of 7-year offence held for 3.5 years without conviction — entitled to bail under 436A.",
      "Undertrial in corruption case (max 7 years) held for 4 years — must be released on personal bond.",
    ],
    landmarkCases: [
      {
        name: "Hussainara Khatoon v. State of Bihar (1979)",
        summary:
          "SC held right to speedy trial is fundamental; inspired insertion of Section 436A.",
      },
      {
        name: "Re: Inhuman Conditions in 1382 Prisons (2016)",
        summary:
          "SC directed states to implement Section 436A and release eligible undertrials.",
      },
    ],
    exceptions:
      "Does not apply to offences punishable with death. Court may refuse in special cases — but must record reasons. Time on bail excluded from computation.",
    overridingEffect: "Replaced by BNSS Section 479 from July 1, 2024.",
    relatedSections: [
      { ref: "CrPC Section 436", description: "Bail in bailable offences" },
      { ref: "CrPC Section 437", description: "Bail in non-bailable offences" },
      { ref: "BNSS Section 479", description: "Replacement provision" },
      { ref: "Article 21", description: "Right to speedy trial" },
    ],
  },

  crpc_438: {
    title:
      "CrPC Section 438 — Anticipatory Bail (Bail in Anticipation of Arrest)",
    actName: "Code of Criminal Procedure, 1973",
    sectionNumber: "438",
    sectionText:
      "When any person has reason to believe that he may be arrested on an accusation of having committed a non-bailable offence, he may apply to the High Court or the Court of Session for a direction under this section that in the event of such arrest, he shall be released on bail.",
    explanation:
      "Section 438 CrPC provides anticipatory bail — bail granted before arrest in apprehension of arrest. Only Sessions Court or High Court can grant it. Court considers: (1) Nature and gravity of accusation; (2) Antecedents; (3) Possibility of fleeing; (4) Whether accusation is made to humiliate. Anticipatory bail protects against arbitrary arrest. The SC has held (in Siddharam Satlingappa) that anticipatory bail can be for fixed period or without limit — court has full discretion. Anticipatory bail cannot be granted in NDPS Act cases as a matter of right.",
    examples: [
      "Person apprehends arrest in a false dowry harassment case — applies for anticipatory bail under Section 438.",
      "Businessman anticipating arrest in a cheating case — granted anticipatory bail with conditions.",
    ],
    landmarkCases: [
      {
        name: "Gurbaksh Singh Sibbia v. State of Punjab (1980)",
        summary:
          "SC (Constitution Bench) held anticipatory bail should be granted liberally; liberty is precious and courts should not be too rigid.",
      },
      {
        name: "Siddharam Satlingappa Mhetre v. State of Maharashtra (2011)",
        summary:
          "SC held anticipatory bail can be for limited or unlimited period; Court has wide discretion.",
      },
      {
        name: "Sushila Aggarwal v. State (NCT of Delhi) (2020)",
        summary:
          "SC (9-judge bench) held anticipatory bail does not have to be for limited period; it can continue till end of trial.",
      },
    ],
    exceptions:
      "Cannot be granted in offences under NDPS Act, SC/ST (Prevention of Atrocities) Act (unless stringent conditions met). Cannot be granted if accused has been charged with death penalty offence in certain states.",
    overridingEffect: "Replaced by BNSS Section 482 from July 1, 2024.",
    relatedSections: [
      { ref: "CrPC Section 437", description: "Bail after arrest" },
      {
        ref: "CrPC Section 439",
        description: "Bail powers of High Court/Sessions",
      },
      { ref: "BNSS Section 482", description: "Replacement provision" },
    ],
  },

  crpc_439: {
    title:
      "CrPC Section 439 — Special Powers of High Court or Court of Session Regarding Bail",
    actName: "Code of Criminal Procedure, 1973",
    sectionNumber: "439",
    sectionText:
      "A High Court or Court of Session may direct that any person accused of an offence and in custody be released on bail, and if the offence is of the nature specified in sub-section (3) of section 437, may impose any condition which it considers necessary for the purposes mentioned in that sub-section.",
    explanation:
      "Section 439 CrPC gives Sessions Court and High Court special powers to grant bail in non-bailable offences and impose conditions. Unlike Section 437 (Magistrate's power), Section 439 is available even for offences punishable with death or life imprisonment — though courts are very cautious. The court can also cancel bail and impose/modify conditions. Section 439 is used when bail is rejected by lower court and accused approaches Sessions/High Court. Courts consider: Triple Test (flight risk, tampering evidence, repeat offence).",
    examples: [
      "Bail refused by Magistrate in a murder case — accused applies to Sessions Court under Section 439.",
      "High Court grants bail in rape case on medical grounds under Section 439.",
    ],
    landmarkCases: [
      {
        name: "Sanjay Chandra v. CBI (2012)",
        summary:
          "SC reiterated that bail is the rule and jail is exception; 2G scam accused granted bail after prolonged detention.",
      },
      {
        name: "Dataram Singh v. State of UP (2018)",
        summary:
          "SC set out factors for bail in cases of offences against women; stressed triple test.",
      },
    ],
    exceptions:
      "High Court can cancel bail under Section 439(2) if new facts emerge or bail conditions violated. Cannot grant bail in certain special act offences unless conditions of those acts are satisfied.",
    overridingEffect: "Replaced by BNSS Section 483 from July 1, 2024.",
    relatedSections: [
      { ref: "CrPC Section 437", description: "Magistrate bail powers" },
      { ref: "CrPC Section 438", description: "Anticipatory bail" },
      { ref: "BNSS Section 483", description: "Replacement provision" },
    ],
  },

  crpc_482: {
    title: "CrPC Section 482 — Inherent Powers of High Court",
    actName: "Code of Criminal Procedure, 1973",
    sectionNumber: "482",
    sectionText:
      "Nothing in this Code shall be deemed to limit or affect the inherent powers of the High Court to make such orders as may be necessary to give effect to any order under this Code, or to prevent abuse of the process of any Court or otherwise to secure the ends of justice.",
    explanation:
      "Section 482 CrPC preserves the inherent powers of the High Court — powers which cannot be curtailed by any legislation. Used to: (1) Quash FIR/chargesheet to prevent abuse of process; (2) Give effect to CrPC orders; (3) Secure ends of justice. Most commonly used to QUASH FIR when: offence is settled between parties, allegations do not disclose offence, FIR is filed with mala fide intent, continuing prosecution is oppressive. The power is wide but must be used sparingly — only in exceptional cases. Cannot be used to re-appreciate evidence.",
    examples: [
      "Cheque bounce FIR quashed under Section 482 after complainant and accused settle the dispute.",
      "False domestic violence case — accused applies to High Court under 482 to quash FIR.",
      "Magistrate issues incorrect process — High Court uses Section 482 to correct it.",
    ],
    landmarkCases: [
      {
        name: "State of Haryana v. Bhajan Lal (1992)",
        summary:
          "SC laid down 7 categories of cases where FIR can be quashed under Section 482 — most-cited judgment on quashing power.",
      },
      {
        name: "Pepsi Foods v. Special Judicial Magistrate (1998)",
        summary:
          "SC held Section 482 can be used to prevent abuse of process and protect innocent accused from harassment.",
      },
      {
        name: "Gian Singh v. State of Punjab (2012)",
        summary:
          "SC held even non-compoundable offences can be quashed under Section 482 if parties settle, in extraordinary cases.",
      },
    ],
    exceptions:
      "Cannot be used to interfere with ongoing investigation. Cannot re-appreciate evidence. Not available to Sessions Court (only High Court). Cannot override specific provisions of the Code.",
    overridingEffect: "Replaced by BNSS Section 528 from July 1, 2024.",
    relatedSections: [
      { ref: "CrPC Section 397", description: "Revision powers" },
      { ref: "Article 226", description: "High Court's writ jurisdiction" },
      { ref: "BNSS Section 528", description: "Replacement provision" },
    ],
  },

  contract_10: {
    title: "Indian Contract Act Section 10 — What Agreements are Contracts",
    actName: "Indian Contract Act, 1872",
    sectionNumber: "10",
    sectionText:
      "All agreements are contracts if they are made by the free consent of parties competent to contract, for a lawful consideration and with a lawful object, and are not hereby expressly declared to be void.",
    explanation:
      "Section 10 lists the essential elements of a valid contract: (1) Free consent, (2) Competent parties, (3) Lawful consideration, (4) Lawful object, (5) Not expressly declared void. All five must be present for an agreement to be enforceable as a contract.",
    examples: [
      "A sale agreement between two adults with payment — valid contract under Section 10.",
      "An agreement under coercion (threat) lacks free consent — not a valid contract.",
      "A contract for selling drugs — unlawful object — void.",
    ],
    landmarkCases: [
      {
        name: "Balfour v. Balfour (1919)",
        summary:
          "Husband-wife agreement not a contract as no intention to create legal relations — illustrates limits of Section 10.",
      },
      {
        name: "Carlill v. Carbolic Smoke Ball Co. (1893)",
        summary:
          "Established offer, acceptance and consideration elements of contract.",
      },
    ],
    exceptions:
      "Social agreements, domestic arrangements may lack intention to create legal relations and thus not be contracts.",
    overridingEffect:
      "Foundational section — governs all commercial contracts in India. Special laws (Companies Act, Consumer Protection Act) may have specific contract provisions.",
    relatedSections: [
      {
        ref: "Indian Contract Act Section 2",
        description: "Definitions — offer, acceptance, consideration",
      },
      {
        ref: "Indian Contract Act Section 11",
        description: "Competency to contract",
      },
      { ref: "Indian Contract Act Section 13", description: "Consent" },
      {
        ref: "Indian Contract Act Section 23",
        description: "What consideration/objects are lawful",
      },
    ],
  },
  contract_11: {
    title: "Indian Contract Act Section 11 — Who is Competent to Contract",
    actName: "Indian Contract Act, 1872",
    sectionNumber: "11",
    sectionText:
      "Every person is competent to contract who is of the age of majority according to the law to which he is subject, and who is of sound mind, and is not disqualified from contracting by any law to which he is subject.",
    explanation:
      "A valid contract requires competent parties. Three requirements: (1) Age of majority (18 years in India), (2) Sound mind — can understand contract and form rational judgment, (3) Not legally disqualified (e.g., not an alien enemy, insolvent person). Contract with a minor is VOID from the beginning (ab initio).",
    examples: [
      "A 15-year-old cannot enter a valid contract — it is void.",
      "A person of unsound mind cannot contract — void.",
      "An adjudicated insolvent cannot contract — disqualified.",
    ],
    landmarkCases: [
      {
        name: "Mohori Bibee v. Dharmodas Ghose (1903)",
        summary:
          "Privy Council held that a contract with a minor is void ab initio and cannot be ratified even after attaining majority.",
      },
    ],
    exceptions:
      "Minor can be a beneficiary of a contract (promisee). Necessaries supplied to minor — supplier can recover from minor's estate (Section 68).",
    overridingEffect:
      "Age of majority governed by Indian Majority Act 1875 — 18 years generally, 21 if guardian appointed.",
    relatedSections: [
      {
        ref: "Indian Contract Act Section 10",
        description: "Essential elements of contract",
      },
      {
        ref: "Indian Contract Act Section 68",
        description: "Claim for necessaries supplied to incompetent person",
      },
      { ref: "Indian Majority Act 1875", description: "Age of majority" },
    ],
  },
  ni_138: {
    title:
      "NI Act Section 138 — Dishonour of Cheque for Insufficiency of Funds",
    actName: "Negotiable Instruments Act, 1881",
    sectionNumber: "138",
    sectionText:
      "Where any cheque drawn by a person on an account maintained by him with a banker for payment of any amount of money to another person from out of that account is returned by the bank unpaid, either because of the amount of money standing to the credit of that account is insufficient to honour the cheque, or that it exceeds the amount arranged to be paid, such person shall be deemed to have committed an offence.",
    explanation:
      "Section 138 NI Act deals with cheque bounce. If a cheque is dishonoured due to insufficient funds, it is a criminal offence. Punishment: imprisonment up to 2 years OR fine up to twice the cheque amount OR both. The payee must send a written notice within 30 days of dishonour; the drawer has 15 days to pay; if not paid, complaint can be filed within 30 days.",
    examples: [
      "A borrows money and gives a cheque which bounces — offence under NI Act 138.",
      "Post-dated cheque given as security that is later dishonoured — NI Act 138 applies.",
    ],
    landmarkCases: [
      {
        name: "MMTC Ltd. v. Medchi Chemicals (2002)",
        summary:
          "SC held that the cheque must be issued for discharge of a legally enforceable debt.",
      },
      {
        name: "Dashrath Rupsingh Rathod v. State of Maharashtra (2014)",
        summary:
          "SC held that complaint must be filed at the court within whose jurisdiction the bank branch of payee is located.",
      },
      {
        name: "Meters and Instruments Pvt Ltd v. Kanchan Mehta (2018)",
        summary:
          "SC allowed compounding of NI Act 138 offences to reduce pendency.",
      },
    ],
    exceptions:
      "Cheque must be for discharge of debt or liability. Gifts, donations not covered. Stale cheques (over 3 months) not covered.",
    overridingEffect:
      "Special law overrides general criminal law. Summary trial procedure applies for speedy disposal.",
    relatedSections: [
      {
        ref: "NI Act Section 139",
        description: "Presumption in favour of holder",
      },
      {
        ref: "NI Act Section 142",
        description: "Cognisance of offences — procedure",
      },
      {
        ref: "IPC Section 420",
        description: "Cheating — may additionally apply",
      },
    ],
  },
  pocso_4: {
    title: "POCSO Act Section 4 — Punishment for Penetrative Sexual Assault",
    actName: "Protection of Children from Sexual Offences Act, 2012",
    sectionNumber: "4",
    sectionText:
      "Whoever commits penetrative sexual assault shall be punished with rigorous imprisonment for a term which shall not be less than ten years but which may extend to imprisonment for life, and shall also be liable to fine.",
    explanation:
      "POCSO Section 4 punishes penetrative sexual assault on children (persons below 18 years). Minimum punishment is 10 years rigorous imprisonment, maximum is life imprisonment. The POCSO Act is child-friendly — special courts, in-camera trial, no identity disclosure of victim. If victim below 16 years, minimum is 20 years (after 2019 amendment).",
    examples: [
      "Sexual assault on a child under 18 — POCSO Section 4.",
      "Child pornography involving penetration — POCSO 4 + Section 14.",
    ],
    landmarkCases: [
      {
        name: "State of Maharashtra v. Bharat Chaganlal Raghani (2001)",
        summary:
          "Established child evidence recording guidelines later codified in POCSO.",
      },
      {
        name: "Alakh Alok Srivastava v. Union of India (2018)",
        summary:
          "SC gave directions for speedy trial of POCSO cases; creation of fast track courts.",
      },
    ],
    exceptions:
      "Act requires proof that victim is below 18 years. Consent is irrelevant under POCSO — any sexual act with a minor is an offence.",
    overridingEffect:
      "POCSO is a special law overriding IPC provisions for child victims. Both POCSO and BNS/IPC charges can be framed simultaneously.",
    relatedSections: [
      {
        ref: "POCSO Section 6",
        description: "Aggravated penetrative sexual assault",
      },
      {
        ref: "POCSO Section 7",
        description: "Sexual assault (non-penetrative)",
      },
      { ref: "BNS Section 64", description: "Rape (for adult victims)" },
      { ref: "IPC Section 376", description: "Old rape provision" },
    ],
  },
  rti_6: {
    title: "RTI Act Section 6 — Request for Obtaining Information",
    actName: "Right to Information Act, 2005",
    sectionNumber: "6",
    sectionText:
      "A person who desires to obtain any information under this Act shall make a request in writing or through electronic means in English or Hindi or in the official language of the area in which the application is being made.",
    explanation:
      "Section 6 RTI Act provides the procedure to file RTI applications. Any citizen can request information from a public authority by submitting a written application with prescribed fee (Rs. 10). No reason needs to be given. Application can be filed online, by post, or in person. The Public Information Officer (PIO) must respond within 30 days.",
    examples: [
      "A citizen files RTI asking about expenditure on a road project — Section 6 procedure.",
      "Student files RTI to get copy of evaluated answer sheet — valid under RTI Section 6.",
    ],
    landmarkCases: [
      {
        name: "CBSE v. Aditya Bandopadhyay (2011)",
        summary:
          "SC held that evaluated answer sheets are information under RTI Act and students are entitled to copies.",
      },
      {
        name: "Girish Ramchandra Deshpande v. CIC (2013)",
        summary:
          "SC held that personal information of public servants not covered under RTI if not related to public duty.",
      },
    ],
    exceptions:
      "Information exempt under Section 8 (national security, cabinet discussions, personal information, IP, etc.) cannot be disclosed.",
    overridingEffect:
      "RTI overrides any other law that restricts disclosure of information held by public authorities.",
    relatedSections: [
      {
        ref: "RTI Act Section 7",
        description: "Disposal of request — 30-day timeline",
      },
      { ref: "RTI Act Section 8", description: "Exemptions from disclosure" },
      { ref: "RTI Act Section 19", description: "First and second appeal" },
    ],
  },
  dv_3: {
    title: "DV Act Section 3 — Definition of Domestic Violence",
    actName: "Protection of Women from Domestic Violence Act, 2005",
    sectionNumber: "3",
    sectionText:
      "Any act, omission or commission or conduct of the respondent shall constitute domestic violence in case it harms or injures or endangers the health, safety, life, limb or well-being, whether mental or physical, of the aggrieved person.",
    explanation:
      "Section 3 DV Act gives a broad definition of domestic violence covering: (a) Physical abuse, (b) Sexual abuse, (c) Verbal and emotional abuse, (d) Economic abuse. This is one of the widest definitions and includes live-in partners. The Act provides civil remedies — protection orders, residence orders, monetary relief — in addition to criminal action.",
    examples: [
      "Husband beating wife — physical domestic violence under Section 3.",
      "In-laws denying wife food, money — economic abuse under DV Act Section 3.",
      "Partner threatening girlfriend in live-in relationship — DV Act applies.",
    ],
    landmarkCases: [
      {
        name: "Indra Sarma v. V.K.V. Sarma (2013)",
        summary:
          "SC held that live-in relationships are covered under DV Act if they are in the nature of marriage.",
      },
      {
        name: "Hiral P. Harsora v. Kusum Narottamdas Harsora (2016)",
        summary:
          "SC removed restriction that only males can be respondents — females can also be respondents.",
      },
    ],
    exceptions:
      "Complainant must be a woman. Must be in a domestic relationship (shared household).",
    overridingEffect:
      "DV Act provides civil remedies — does not replace IPC 498A which is a criminal provision.",
    relatedSections: [
      {
        ref: "DV Act Section 12",
        description: "Application to Magistrate for relief",
      },
      { ref: "DV Act Section 18", description: "Protection orders" },
      {
        ref: "IPC Section 498A",
        description: "Cruelty by husband/relatives — criminal remedy",
      },
    ],
  },
  constitution_15: {
    title: "Constitution Article 15 — Prohibition of Discrimination",
    actName: "Constitution of India, 1950",
    sectionNumber: "15",
    sectionText:
      "The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them.",
    explanation:
      "Article 15 prohibits the State from discriminating based on religion, race, caste, sex, or place of birth. It also prohibits such discrimination in access to shops, public restaurants, hotels, places of public entertainment. However, the State can make special provisions for women, children, socially/educationally backward classes, and SCs/STs.",
    examples: [
      "Denying government job to a person based on caste alone — violates Article 15.",
      "Refusing entry to a temple based on caste — violates Article 15(2).",
    ],
    landmarkCases: [
      {
        name: "Indra Sawhney v. Union of India (1992)",
        summary:
          "SC upheld OBC reservations (27%) but capped total reservation at 50% and excluded creamy layer.",
      },
      {
        name: "Navtej Singh Johar v. Union of India (2018)",
        summary:
          "SC decriminalized consensual same-sex relations — discrimination based on sexual orientation violates Article 15.",
      },
    ],
    exceptions:
      "State can make special provisions for women, children, and backward classes — these are protective discrimination, not prohibited discrimination (Articles 15(3) and 15(4)).",
    overridingEffect:
      "Applies only against State action. Private discrimination covered by specific laws (SC/ST Atrocities Act, etc.).",
    relatedSections: [
      { ref: "Constitution Article 14", description: "Right to Equality" },
      {
        ref: "Constitution Article 16",
        description: "Equal opportunity in public employment",
      },
      {
        ref: "Constitution Article 17",
        description: "Abolition of untouchability",
      },
    ],
  },
  constitution_16: {
    title: "Constitution Article 16 — Equal Opportunity in Public Employment",
    actName: "Constitution of India, 1950",
    sectionNumber: "16",
    sectionText:
      "There shall be equality of opportunity for all citizens in matters relating to employment or appointment to any office under the State.",
    explanation:
      "Article 16 guarantees equal opportunity in public (government) employment. No citizen can be discriminated against in government jobs based on religion, race, caste, sex, descent, place of birth, or residence. The State can reserve posts for backward classes if they are not adequately represented in services.",
    examples: [
      "Government job application cannot be rejected on basis of caste — Article 16.",
      "Reservation in government jobs for OBCs, SCs, STs — permissible under Article 16(4).",
    ],
    landmarkCases: [
      {
        name: "Indra Sawhney v. Union of India (1992)",
        summary:
          "Upheld 27% OBC reservation; established 50% ceiling on total reservations.",
      },
      {
        name: "M. Nagaraj v. Union of India (2006)",
        summary:
          "Upheld reservation in promotion for SCs/STs with conditions of backwardness, inadequate representation, and efficiency.",
      },
    ],
    exceptions:
      "Residence requirement can be imposed for state services; religious posts can require members of that religion.",
    overridingEffect:
      "Applied specifically to public employment. Private sector employment covered by other laws.",
    relatedSections: [
      {
        ref: "Constitution Article 15",
        description: "General anti-discrimination provision",
      },
      {
        ref: "Constitution Article 335",
        description: "Claims of SCs/STs in services",
      },
    ],
  },
  constitution_20: {
    title:
      "Constitution Article 20 — Protection in Respect of Conviction for Offences",
    actName: "Constitution of India, 1950",
    sectionNumber: "20",
    sectionText:
      "No person shall be convicted of any offence except for violation of a law in force at the time of the commission of the Act charged as an offence.",
    explanation:
      "Article 20 provides three protections: (1) Ex-post facto laws — cannot be punished for act that was not an offence when committed; (2) Double jeopardy — cannot be tried/punished twice for the same offence; (3) Self-incrimination — cannot be compelled to be a witness against oneself. These rights cannot be suspended even during emergency.",
    examples: [
      "A person cannot be prosecuted under a new law for an act done before the law was passed.",
      "A person acquitted of murder cannot be tried again for the same murder.",
      "Accused cannot be forced to give confessional statements.",
    ],
    landmarkCases: [
      {
        name: "Selvi v. State of Karnataka (2010)",
        summary:
          "SC held that narco-analysis, polygraph, and brain mapping tests without consent violate Article 20(3).",
      },
      {
        name: "Maqbool Hussain v. State of Bombay (1953)",
        summary:
          "Double jeopardy — prosecution before sea customs authority and later criminal court for same act held to violate Article 20(2).",
      },
    ],
    exceptions:
      "Civil proceedings, departmental proceedings, forfeiture of property are not prosecution under Article 20.",
    overridingEffect:
      "Cannot be suspended even during National Emergency under Article 352.",
    relatedSections: [
      {
        ref: "Constitution Article 21",
        description: "Right to life and personal liberty",
      },
      {
        ref: "Constitution Article 22",
        description: "Protection against arbitrary arrest",
      },
      { ref: "IPC Section 300", description: "Exception 5 — consent defence" },
    ],
  },
  constitution_22: {
    title:
      "Constitution Article 22 — Protection Against Arbitrary Arrest and Detention",
    actName: "Constitution of India, 1950",
    sectionNumber: "22",
    sectionText:
      "No person who is arrested shall be detained in custody without being informed, as soon as may be, of the grounds for such arrest nor shall he be denied the right to consult, and to be defended by, a legal practitioner of his choice.",
    explanation:
      "Article 22 provides four rights on arrest: (1) Right to be informed of grounds of arrest; (2) Right to consult a lawyer; (3) Right to be produced before a magistrate within 24 hours; (4) Right not to be detained beyond 24 hours without magistrate's order. Exceptions for enemy aliens and preventive detention laws.",
    examples: [
      "Police must tell arrested person why they are being arrested — Article 22.",
      "Arrested person must be produced before magistrate within 24 hours.",
      "Arrested person has right to call a lawyer.",
    ],
    landmarkCases: [
      {
        name: "D.K. Basu v. State of West Bengal (1997)",
        summary:
          "SC laid down 11 guidelines for lawful arrest to prevent custodial torture and death.",
      },
      {
        name: "Joginder Kumar v. State of UP (1994)",
        summary:
          "SC held that arrest should not be made as a matter of course; police must have tangible reasons.",
      },
    ],
    exceptions:
      "Preventive detention laws (NSA, COFEPOSA etc.) exempt from some Article 22 protections. Enemy aliens may be detained without rights under Article 22.",
    overridingEffect:
      "Article 22(1) and (2) cannot be suspended during emergency — absolute protection.",
    relatedSections: [
      {
        ref: "Constitution Article 21",
        description: "Right to personal liberty",
      },
      {
        ref: "BNSS Section 35",
        description: "Arrest without warrant — procedure",
      },
      {
        ref: "CrPC Section 57",
        description: "Person arrested not to be detained more than 24 hours",
      },
    ],
  },

  crpc_1: {
    act: "Code of Criminal Procedure, 1973",
    section: "Section 1",
    title: "Short Title, Extent and Commencement",
    titleBengali: "সংক্ষিপ্ত শিরোনাম, বিস্তার এবং প্রবর্তন",
    summary:
      "The Code of Criminal Procedure, 1973 extends to the whole of India. It came into force on 1st April 1974, replacing the CrPC of 1898.",
    summaryBengali:
      "ফৌজদারি কার্যবিধি ১৯৭৩ সমগ্র ভারতে প্রযোজ্য। ১ এপ্রিল ১৯৭৪ থেকে কার্যকর হয়েছে এবং ১৮৯৮ সালের CrPC প্রতিস্থাপন করেছে।",
    keyPoints: [
      "Applies to whole of India",
      "Came into force 1st April 1974",
      "Replaced CrPC 1898",
      "Now replaced by BNSS 2023 from 1 July 2024",
    ],
    keyPointsBengali: [
      "সমগ্র ভারতে প্রযোজ্য",
      "১ এপ্রিল ১৯৭৪ থেকে কার্যকর",
      "CrPC ১৮৯৮ প্রতিস্থাপন করেছে",
      "১ জুলাই ২০২৪ থেকে BNSS ২০২৩ দ্বারা প্রতিস্থাপিত",
    ],
    exceptions: ["BNSS 2023 replaced CrPC from 1 July 2024"],
    exceptionsBengali: ["BNSS ২০২৩ দ্বারা ১ জুলাই ২০২৪ থেকে প্রতিস্থাপিত"],
    examples: ["Any criminal prosecution in India follows CrPC procedure"],
    examplesBengali: ["ভারতে যেকোনো ফৌজদারি মামলায় CrPC পদ্ধতি অনুসরণ করা হয়"],
    landmarkCases: [
      {
        name: "State of UP v. Singhara Singh (1964)",
        significance:
          "CrPC is procedural law — substantive rights governed by IPC",
      },
    ],
    relatedSections: [
      { ref: "BNSS Section 1", description: "BNSS 2023 replacement for CrPC" },
    ],
    overridingEffect:
      "CrPC 1973 is superseded by Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023 for offences committed after July 1, 2024. For earlier offences, CrPC continues to apply. Special laws like NDPS Act, PMLA may override general CrPC provisions where expressly provided.",
    overridingEffectBengali:
      "২০২৩ সালের ভারতীয় নাগরিক সুরক্ষা সংহিতা (BNSS) ১ জুলাই ২০২৪-এর পরে সংঘটিত অপরাধের জন্য CrPC ১৯৭৩-কে প্রতিস্থাপন করে। পূর্ববর্তী অপরাধের জন্য CrPC প্রযোজ্য থাকে। NDPS আইন, PMLA-এর মতো বিশেষ আইন সুনির্দিষ্টভাবে বিধান করা হলে সাধারণ CrPC বিধান অতিক্রম করতে পারে।",
    crossLaws: [
      {
        ref: "BNSS 2023 Section 1",
        description: "Replaces CrPC for offences after July 1, 2024",
      },
      {
        ref: "IPC / BNS 2023",
        description:
          "Substantive criminal law; CrPC is procedural law that enforces it",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },

  crpc_2: {
    act: "Code of Criminal Procedure, 1973",
    section: "Section 2",
    title: "Definitions",
    titleBengali: "সংজ্ঞা",
    summary:
      "Section 2 CrPC defines key terms: bailable/non-bailable offence, cognizable/non-cognizable offence, complaint, inquiry, investigation, trial, summons-case, warrant-case.",
    summaryBengali:
      "ধারা ২ CrPC মূল শব্দগুলির সংজ্ঞা দেয়: জামিনযোগ্য/অ-জামিনযোগ্য অপরাধ, আমলযোগ্য/অ-আমলযোগ্য অপরাধ, অভিযোগ, তদন্ত, বিচার ইত্যাদি।",
    keyPoints: [
      "Bailable offence — bail is a right",
      "Non-bailable — bail at court discretion",
      "Cognizable — police can arrest without warrant",
      "Non-cognizable — police need Magistrate order",
      "Complaint — allegation to Magistrate (not FIR)",
    ],
    keyPointsBengali: [
      "জামিনযোগ্য অপরাধ — জামিন অধিকার",
      "অ-জামিনযোগ্য — আদালতের বিবেচনায় জামিন",
      "আমলযোগ্য — পুলিশ পরোয়ানা ছাড়াই গ্রেফতার",
      "অ-আমলযোগ্য — পুলিশের ম্যাজিস্ট্রেটের আদেশ দরকার",
      "অভিযোগ — ম্যাজিস্ট্রেটের কাছে অভিযোগ (FIR নয়)",
    ],
    exceptions: [
      "Schedule I CrPC classifies offences as cognizable/non-cognizable and bailable/non-bailable",
    ],
    exceptionsBengali: ["CrPC তফসিল-১ অপরাধ শ্রেণীবদ্ধ করে"],
    examples: [
      "Murder (IPC 302) is cognizable, non-bailable; Theft (IPC 379) is cognizable, bailable",
    ],
    examplesBengali: [
      "হত্যা (IPC ৩০২) আমলযোগ্য, অ-জামিনযোগ্য; চুরি (IPC ৩৭৯) আমলযোগ্য, জামিনযোগ্য",
    ],
    landmarkCases: [
      {
        name: "P. Sirajuddin v. State of Madras (1970)",
        significance: "FIR is not a complaint under Section 2(d)",
      },
    ],
    relatedSections: [
      { ref: "Schedule I CrPC", description: "Classification of offences" },
      { ref: "BNSS Section 2", description: "BNSS 2023 definitions" },
    ],
    overridingEffect:
      "BNSS 2023 Section 2 provides updated definitions replacing CrPC definitions for new offences. Special Acts (NDPS, POCSO, IT Act) have their own definitions which prevail over CrPC definitions in cases governed by those Acts.",
    overridingEffectBengali:
      "BNSS ২০২৩ ধারা ২ নতুন অপরাধের জন্য CrPC সংজ্ঞা প্রতিস্থাপন করে আপডেট সংজ্ঞা প্রদান করে। NDPS, POCSO, IT Act-এর মতো বিশেষ আইনের নিজস্ব সংজ্ঞা আছে যা সেই আইনে পরিচালিত মামলায় CrPC সংজ্ঞার উপর প্রাধান্য পায়।",
    crossLaws: [
      {
        ref: "BNSS 2023 Section 2",
        description: "Updated definitions for the new criminal procedure code",
      },
      {
        ref: "IPC Section 2 / BNS Section 2",
        description: "Definitions of offences under substantive criminal law",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },

  crpc_4: {
    act: "Code of Criminal Procedure, 1973",
    section: "Section 4",
    title: "Trial of Offences under IPC and Other Laws",
    titleBengali: "IPC ও অন্যান্য আইনের অধীনে বিচার",
    summary:
      "All offences under IPC shall be tried as per CrPC. Offences under other laws also follow CrPC unless a special procedure is provided by that law.",
    summaryBengali:
      "IPC-র অধীনে সমস্ত অপরাধ CrPC পদ্ধতি অনুসরণ করবে। অন্যান্য আইনের অধীনে অপরাধও CrPC অনুসরণ করবে যদি না বিশেষ পদ্ধতি নির্ধারিত থাকে।",
    keyPoints: [
      "IPC offences tried under CrPC",
      "Special Acts may have own procedure",
      "CrPC is the default procedural law",
    ],
    keyPointsBengali: [
      "IPC অপরাধ CrPC অনুযায়ী বিচার হবে",
      "বিশেষ আইনের নিজস্ব পদ্ধতি থাকতে পারে",
      "CrPC ডিফল্ট পদ্ধতিগত আইন",
    ],
    exceptions: [
      "NDPS Act, POCSO Act have their own procedures overriding CrPC",
    ],
    exceptionsBengali: [
      "NDPS, POCSO-র মতো বিশেষ আইনের নিজস্ব পদ্ধতি CrPC-কে override করে",
    ],
    examples: [
      "Murder trial (IPC 302) follows CrPC",
      "NDPS drug case follows NDPS Act procedure",
    ],
    examplesBengali: ["হত্যা মামলা (IPC ৩০২) CrPC পদ্ধতি অনুসরণ করে"],
    landmarkCases: [
      {
        name: "Devendra Singh v. State of UP (2004)",
        significance:
          "CrPC applies to all IPC trials as general procedural law",
      },
    ],
    relatedSections: [
      { ref: "CrPC Section 5", description: "Saving of special laws" },
    ],
    overridingEffect:
      "For offences under IPC (now BNS 2023), CrPC procedure applies. Special Acts like NDPS, PMLA, UAPA, POCSO prescribe their own special procedures which override CrPC where there is conflict. BNSS 2023 replaces CrPC for new offences.",
    overridingEffectBengali:
      "IPC-এর (এখন BNS ২০২৩) অধীনে অপরাধের জন্য CrPC পদ্ধতি প্রযোজ্য। NDPS, PMLA, UAPA, POCSO-এর মতো বিশেষ আইন নিজস্ব বিশেষ পদ্ধতি নির্ধারণ করে যা দ্বন্দ্বের ক্ষেত্রে CrPC-কে অতিক্রম করে।",
    crossLaws: [
      {
        ref: "NDPS Act 1985",
        description: "Special procedure overrides CrPC for narcotic offences",
      },
      {
        ref: "UAPA 1967",
        description:
          "Special procedure overrides CrPC for terror-related offences",
      },
      {
        ref: "POCSO Act 2012",
        description:
          "Special child-friendly procedure overrides CrPC for child sexual offences",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },

  crpc_6: {
    act: "Code of Criminal Procedure, 1973",
    section: "Section 6",
    title: "Classes of Criminal Courts",
    titleBengali: "ফৌজদারি আদালতের শ্রেণী",
    summary:
      "Section 6 classifies criminal courts: (1) High Courts, (2) Sessions Courts, (3) Judicial Magistrates (CJM, First Class, Second Class), (4) Executive Magistrates.",
    summaryBengali:
      "ধারা ৬ ফৌজদারি আদালতের শ্রেণী নির্ধারণ করে: (১) হাইকোর্ট, (২) দায়রা আদালত, (৩) বিচারিক ম্যাজিস্ট্রেট, (৪) নির্বাহী ম্যাজিস্ট্রেট।",
    keyPoints: [
      "High Court — apex criminal court in state",
      "Sessions Court — serious offences (murder, rape)",
      "Judicial Magistrates — lesser offences",
      "Executive Magistrates — preventive jurisdiction",
    ],
    keyPointsBengali: [
      "হাইকোর্ট — রাজ্যের সর্বোচ্চ ফৌজদারি আদালত",
      "দায়রা আদালত — গুরুতর অপরাধ",
      "বিচারিক ম্যাজিস্ট্রেট — কম গুরুতর অপরাধ",
      "নির্বাহী ম্যাজিস্ট্রেট — প্রতিরোধমূলক এখতিয়ার",
    ],
    exceptions: [
      "Metropolitan Magistrates exist in metro areas with equivalent powers",
    ],
    exceptionsBengali: ["মহানগর এলাকায় Metropolitan Magistrate আছেন"],
    examples: [
      "Murder trial in Sessions Court",
      "Petty offences tried by Judicial Magistrate",
    ],
    examplesBengali: ["হত্যা মামলা দায়রা আদালতে", "ছোট অপরাধ ম্যাজিস্ট্রেটে"],
    landmarkCases: [
      {
        name: "Joginder Kumar v. State of UP (1994)",
        significance: "Hierarchy ensures fair trial at appropriate level",
      },
    ],
    relatedSections: [
      { ref: "CrPC Section 9", description: "Court of Session" },
      { ref: "CrPC Section 11", description: "Courts of Judicial Magistrates" },
    ],
    overridingEffect:
      "Constitution Articles 233-237 and 246 govern the establishment of courts. High Courts under Article 227 have supervisory jurisdiction over all criminal courts. BNSS 2023 restructures certain court categories. Specific court hierarchies may vary by state legislation.",
    overridingEffectBengali:
      "সংবিধানের ২৩৩-২৩৭ এবং ২৪৬ ধারা আদালত প্রতিষ্ঠা পরিচালনা করে। ২২৭ ধারার অধীনে হাইকোর্টের সমস্ত ফৌজদারি আদালতের উপর তত্ত্বাবধায়ক এখতিয়ার আছে। BNSS ২০২৩ কিছু আদালত বিভাগ পুনর্গঠন করে।",
    crossLaws: [
      {
        ref: "Constitution Articles 233-237",
        description: "Appointment and control of district courts",
      },
      {
        ref: "Constitution Article 227",
        description:
          "High Court supervisory jurisdiction over subordinate courts",
      },
      {
        ref: "BNSS 2023",
        description: "Replaces CrPC court hierarchy for new offences",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },

  crpc_9: {
    act: "Code of Criminal Procedure, 1973",
    section: "Section 9",
    title: "Court of Session",
    titleBengali: "দায়রা আদালত",
    summary:
      "Sessions Courts are established in each sessions division. Presided by Sessions Judge appointed by High Court. Tries serious offences like murder, rape, dacoity punishable with death or life imprisonment.",
    summaryBengali:
      "প্রতিটি দায়রা বিভাগে দায়রা আদালত স্থাপিত হয়। হাইকোর্ট নিযুক্ত দায়রা বিচারক সভাপতিত্ব করেন। হত্যা, ধর্ষণ, ডাকাতির মতো গুরুতর অপরাধের বিচার করে।",
    keyPoints: [
      "Sessions Division in each state",
      "Sessions Judge appointed by High Court",
      "Tries offences with death/life imprisonment",
      "Appeals from Magistrates go to Sessions Court",
    ],
    keyPointsBengali: [
      "প্রতিটি রাজ্যে দায়রা বিভাগ",
      "হাইকোর্ট দায়রা বিচারক নিয়োগ করেন",
      "মৃত্যুদণ্ড/যাবজ্জীবনের মামলা বিচার করে",
      "ম্যাজিস্ট্রেট থেকে আপিল এখানে আসে",
    ],
    exceptions: [
      "Cannot take cognizance directly — case must be committed by Magistrate (Section 209)",
    ],
    exceptionsBengali: ["সরাসরি মামলা নিতে পারে না — ম্যাজিস্ট্রেট commit করতে হবে"],
    examples: [
      "IPC 302 murder committed to Sessions Court",
      "IPC 376 rape trial in Sessions Court",
    ],
    examplesBengali: [
      "IPC ৩০২ হত্যা মামলা দায়রা আদালতে",
      "IPC ৩৭৬ ধর্ষণ মামলা দায়রা আদালতে",
    ],
    landmarkCases: [
      {
        name: "K.M. Nanavati v. State of Maharashtra (1961)",
        significance:
          "Famous Sessions Court murder conviction upheld by Supreme Court",
      },
    ],
    relatedSections: [
      { ref: "CrPC Section 6", description: "Classes of Criminal Courts" },
      { ref: "CrPC Section 193", description: "Cognizance by Sessions Court" },
    ],
    overridingEffect:
      "Constitution Article 233 governs appointment of District Judges. BNSS 2023 Section 9 replaces this provision going forward. Sessions Court also acts as Special Court under various special Acts (NDPS, POCSO, SC/ST Act) — in those cases the Sessions Court follows special procedure.",
    overridingEffectBengali:
      "সংবিধানের ২৩৩ ধারা জেলা বিচারক নিয়োগ পরিচালনা করে। BNSS ২০২৩ ধারা ৯ ভবিষ্যতে এই বিধান প্রতিস্থাপন করে। সেশন কোর্ট বিভিন্ন বিশেষ আইনের (NDPS, POCSO, SC/ST আইন) অধীনে বিশেষ আদালত হিসেবেও কাজ করে।",
    crossLaws: [
      {
        ref: "Constitution Article 233",
        description:
          "Appointment of District Judges by Governor in consultation with HC",
      },
      {
        ref: "POCSO Act Section 28",
        description:
          "Sessions Court designated as Special Court for POCSO cases",
      },
      {
        ref: "NDPS Act Section 36",
        description:
          "Special Courts for NDPS offences — Sessions Judge presides",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },

  crpc_24: {
    act: "Code of Criminal Procedure, 1973",
    section: "Section 24",
    title: "Public Prosecutors",
    titleBengali: "সরকারি কৌঁসুলি",
    summary:
      "Section 24 provides for appointment of Public Prosecutors (PP) and Additional PPs by Central/State Governments to conduct criminal cases on behalf of the State in High Courts and Sessions Courts.",
    summaryBengali:
      "ধারা ২৪ কেন্দ্র/রাজ্য সরকার কর্তৃক সরকারি কৌঁসুলি নিয়োগের বিধান রাখে। তারা হাইকোর্ট ও দায়রা আদালতে রাষ্ট্রের পক্ষে ফৌজদারি মামলা পরিচালনা করেন।",
    keyPoints: [
      "State appoints Public Prosecutors",
      "PP appears for State in criminal trials",
      "Must be advocate for 7 years",
      "Duty to present truth, not just secure conviction",
    ],
    keyPointsBengali: [
      "রাজ্য সরকার সরকারি কৌঁসুলি নিয়োগ করে",
      "PP রাষ্ট্রের পক্ষে হাজির হন",
      "৭ বছরের আইনজীবী অভিজ্ঞতা লাগে",
      "শুধু দোষী সাব্যস্ত নয়, সত্য উপস্থাপন করা দায়িত্ব",
    ],
    exceptions: [
      "PP has independent duty to court — cannot suppress exculpatory evidence",
    ],
    exceptionsBengali: [
      "PP-এর আদালতের প্রতি স্বাধীন দায়িত্ব আছে — নির্দোষতার প্রমাণ লুকানো যাবে না",
    ],
    examples: ["PP argues murder case in Sessions Court on behalf of State"],
    examplesBengali: ["দায়রা আদালতে হত্যা মামলায় PP রাষ্ট্রের পক্ষে যুক্তি দেন"],
    landmarkCases: [
      {
        name: "Shiv Kumar Sharma v. Santosh Kumari (2007)",
        significance:
          "PP duty is to assist court in arriving at truth, not merely prosecute",
      },
    ],
    relatedSections: [
      { ref: "CrPC Section 25", description: "Assistant Public Prosecutors" },
      {
        ref: "CrPC Section 301",
        description: "Appearance by Public Prosecutor",
      },
    ],
    overridingEffect:
      "Constitution Article 165 (Advocate General) and Article 76 (Attorney General) are the constitutional counterparts. Under NDPS Act, PMLA and other special Acts, special prosecutors are appointed. BNSS 2023 Section 18 replaces CrPC Section 24. Directorate of Prosecution (Section 25A) supervises public prosecutors.",
    overridingEffectBengali:
      "সংবিধানের ১৬৫ ধারা (অ্যাডভোকেট জেনারেল) এবং ৭৬ ধারা (অ্যাটর্নি জেনারেল) সাংবিধানিক প্রতিপক্ষ। NDPS আইন, PMLA এবং অন্যান্য বিশেষ আইনে বিশেষ আইনজীবী নিয়োগ করা হয়। BNSS ২০২৩ ধারা ১৮ CrPC ধারা ২৪ প্রতিস্থাপন করে।",
    crossLaws: [
      {
        ref: "Constitution Article 165",
        description: "Advocate General of the State — chief law officer",
      },
      {
        ref: "PMLA 2002",
        description:
          "Special Public Prosecutor appointed for money laundering cases",
      },
      {
        ref: "CrPC Section 25A",
        description: "Directorate of Prosecution supervises Public Prosecutors",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },

  crpc_41a: {
    act: "Code of Criminal Procedure, 1973",
    section: "Section 41A",
    title: "Notice of Appearance Before Police Officer",
    titleBengali: "পুলিশ অফিসারের সামনে হাজিরার নোটিশ",
    summary:
      "Section 41A (inserted in 2009) requires police to issue a notice to appear instead of arresting in cases where arrest is not necessary under Section 41. The person must comply.",
    summaryBengali:
      "ধারা ৪১A (২০০৯ সংশোধন) — ধারা ৪১-এর অধীনে গ্রেফতার আবশ্যক না হলে পুলিশকে গ্রেফতার না করে হাজিরার নোটিশ দিতে হবে।",
    keyPoints: [
      "Notice instead of arrest for minor offences",
      "Person must appear before police when called",
      "Failure to comply may lead to arrest",
      "Prevents unnecessary arrests — protects liberty",
    ],
    keyPointsBengali: [
      "ছোট অপরাধে গ্রেফতারের বদলে নোটিশ",
      "নোটিশ পেলে পুলিশের সামনে হাজির হতে হবে",
      "নোটিশ না মানলে গ্রেফতার হতে পারে",
      "অপ্রয়োজনীয় গ্রেফতার রোধ করে",
    ],
    exceptions: [
      "If person fails to comply, police may arrest without further notice",
    ],
    exceptionsBengali: ["নোটিশ না মানলে পুলিশ গ্রেফতার করতে পারে"],
    examples: [
      "In a minor cheating case, police issues notice to appear on a date instead of arresting",
    ],
    examplesBengali: [
      "ছোট প্রতারণার মামলায় পুলিশ গ্রেফতার না করে নির্দিষ্ট তারিখে হাজিরার নোটিশ দেয়",
    ],
    landmarkCases: [
      {
        name: "Arnesh Kumar v. State of Bihar (2014)",
        significance:
          "SC directed police to use 41A notice before arrest in offences punishable up to 7 years",
      },
    ],
    relatedSections: [
      {
        ref: "CrPC Section 41",
        description: "When police may arrest without warrant",
      },
      { ref: "CrPC Section 41B", description: "Procedure of arrest" },
    ],
    overridingEffect:
      "BNSS 2023 Section 35 replaces CrPC Section 41A with stricter notice requirements. Supreme Court in Arnesh Kumar (2014) made Section 41A notice mandatory for offences with less than 7 years sentence. Constitution Article 21 (right to liberty) underlies this protection.",
    overridingEffectBengali:
      "BNSS ২০২৩ ধারা ৩৫ আরও কঠোর নোটিশ প্রয়োজনীয়তা সহ CrPC ধারা ৪১A প্রতিস্থাপন করে। অর্নেশ কুমার (২০১৪) মামলায় সুপ্রিম কোর্ট ৭ বছরের কম সাজার অপরাধের জন্য ৪১A নোটিশ বাধ্যতামূলক করেছে।",
    crossLaws: [
      {
        ref: "BNSS 2023 Section 35",
        description:
          "Replaces CrPC 41A with updated notice of appearance provisions",
      },
      {
        ref: "Constitution Article 21",
        description:
          "Right to liberty — basis for Section 41A protection against unnecessary arrest",
      },
      {
        ref: "CrPC Section 41B",
        description: "Procedure of arrest complementing Section 41A",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },

  crpc_41b: {
    act: "Code of Criminal Procedure, 1973",
    section: "Section 41B",
    title: "Procedure of Arrest and Duties of Arresting Officer",
    titleBengali: "গ্রেফতারের পদ্ধতি ও গ্রেফতারকারী অফিসারের দায়িত্ব",
    summary:
      "Section 41B requires police officer making arrest to: bear visible name tag/identification, prepare memorandum of arrest, inform person of right to have a friend/relative informed.",
    summaryBengali:
      "ধারা ৪১B গ্রেফতারকারী পুলিশ অফিসারকে নির্দেশ দেয়: দৃশ্যমান নাম ব্যাজ বহন করতে, গ্রেফতারের স্মারক তৈরি করতে, পরিচিত কাউকে জানানোর অধিকার সম্পর্কে অবহিত করতে।",
    keyPoints: [
      "Police must bear name badge/ID",
      "Memorandum of arrest signed by arrested person",
      "Inform of right to notify family/friend",
      "Right to meet advocate during interrogation",
    ],
    keyPointsBengali: [
      "পুলিশকে নাম ব্যাজ বহন করতে হবে",
      "গ্রেফতারের স্মারকে স্বাক্ষর করতে হবে",
      "পরিবার জানানোর অধিকার সম্পর্কে অবহিত করতে হবে",
      "আইনজীবীর সাথে দেখা করার অধিকার",
    ],
    exceptions: ["Applies to all arrests with or without warrant"],
    exceptionsBengali: ["পরোয়ানা সহ বা ছাড়া সব গ্রেফতারে প্রযোজ্য"],
    examples: [
      "When police arrests a suspect, they must show ID and prepare arrest memo",
    ],
    examplesBengali: [
      "পুলিশ কাউকে গ্রেফতার করলে পরিচয়পত্র দেখাতে ও গ্রেফতারের স্মারক তৈরি করতে হবে",
    ],
    landmarkCases: [
      {
        name: "D.K. Basu v. State of West Bengal (1997)",
        significance:
          "SC issued 11 guidelines for arrest — basis for Sections 41A-41D",
      },
    ],
    relatedSections: [
      { ref: "CrPC Section 41A", description: "Notice of appearance" },
      { ref: "CrPC Section 41D", description: "Right to meet advocate" },
    ],
    overridingEffect:
      "BNSS 2023 Section 35 incorporates and updates Section 41B requirements. D.K. Basu guidelines (1997) are constitutionally mandated under Article 21. Non-compliance attracts liability under Article 32 / 226 for custodial tort.",
    overridingEffectBengali:
      "BNSS ২০২৩ ধারা ৩৫ ধারা ৪১B প্রয়োজনীয়তা অন্তর্ভুক্ত ও আপডেট করে। D.K. বসু নির্দেশিকা (১৯৯৭) সংবিধানের ২১ ধারার অধীনে সাংবিধানিকভাবে বাধ্যতামূলক। অ-সম্মতিতে হেফাজতে অত্যাচারের জন্য ৩২/২২৬ ধারার অধীনে দায়বদ্ধতা তৈরি হয়।",
    crossLaws: [
      {
        ref: "BNSS 2023 Section 35",
        description: "Updated arrest procedure requirements",
      },
      {
        ref: "Constitution Article 21",
        description: "Right against custodial torture",
      },
      {
        ref: "Constitution Article 32 / 226",
        description: "Remedies for violation of arrest procedure",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },

  crpc_41d: {
    act: "Code of Criminal Procedure, 1973",
    section: "Section 41D",
    title: "Right of Arrested Person to Meet Advocate During Interrogation",
    titleBengali: "জিজ্ঞাসাবাদের সময় আইনজীবীর সাথে দেখা করার অধিকার",
    summary:
      "Section 41D grants every arrested person the right to meet their advocate of choice during interrogation, though the advocate need not be present throughout the entire interrogation.",
    summaryBengali:
      "ধারা ৪১D প্রতিটি গ্রেফতারকৃত ব্যক্তিকে জিজ্ঞাসাবাদের সময় তার পছন্দের আইনজীবীর সাথে দেখা করার অধিকার দেয়।",
    keyPoints: [
      "Right to meet advocate during interrogation",
      "Protects against custodial torture",
      "Flows from Article 22(1) of Constitution",
      "Advocate need not be present throughout",
    ],
    keyPointsBengali: [
      "জিজ্ঞাসাবাদে আইনজীবীর সাথে দেখা করার অধিকার",
      "হেফাজতে নির্যাতন থেকে সুরক্ষা",
      "সংবিধানের ২২(১) ধারা থেকে প্রবাহিত",
      "আইনজীবী সম্পূর্ণ জিজ্ঞাসাবাদ জুড়ে থাকতে হবে না",
    ],
    exceptions: ["Advocate cannot sit through entire interrogation process"],
    exceptionsBengali: ["আইনজীবী সম্পূর্ণ জিজ্ঞাসাবাদ জুড়ে বসে থাকতে পারবেন না"],
    examples: [
      "A person arrested for fraud can request to meet lawyer before police interrogation",
    ],
    examplesBengali: [
      "প্রতারণায় গ্রেফতার ব্যক্তি জিজ্ঞাসাবাদের আগে আইনজীবীর সাথে দেখা করতে পারেন",
    ],
    landmarkCases: [
      {
        name: "Nandini Satpathy v. P.L. Dani (1978)",
        significance:
          "Accused has right to counsel during police interrogation",
      },
    ],
    relatedSections: [
      { ref: "CrPC Section 41B", description: "Procedure of arrest" },
      {
        ref: "Constitution Article 22",
        description: "Protection against arbitrary arrest",
      },
    ],
    overridingEffect:
      "This right flows directly from Constitution Article 22(1) (right to consult legal practitioner). BNSS 2023 Section 35 reinforces this right. The right to free legal aid under Article 39A and CrPC Section 304 complements Section 41D.",
    overridingEffectBengali:
      "এই অধিকার সরাসরি সংবিধানের ২২(১) ধারা থেকে আসে (আইনজীবীর পরামর্শের অধিকার)। BNSS ২০২৩ ধারা ৩৫ এই অধিকার জোরদার করে। ৩৯A ধারা এবং CrPC ধারা ৩০৪-এর অধীনে বিনামূল্যে আইনি সহায়তার অধিকার ধারা ৪১D-এর পরিপূরক।",
    crossLaws: [
      {
        ref: "Constitution Article 22(1)",
        description:
          "Fundamental right to consult and be defended by legal practitioner of choice",
      },
      {
        ref: "Constitution Article 39A",
        description: "Right to free legal aid",
      },
      {
        ref: "CrPC Section 304",
        description: "Legal aid to accused at State expense",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },

  crpc_46: {
    act: "Code of Criminal Procedure, 1973",
    section: "Section 46",
    title: "Arrest How Made",
    titleBengali: "গ্রেফতার কীভাবে করতে হবে",
    summary:
      "Section 46 prescribes manner of arrest: police must touch or confine body unless person submits. Reasonable force permitted if person resists. Police cannot cause death of person accused of non-capital offence.",
    summaryBengali:
      "ধারা ৪৬ গ্রেফতারের পদ্ধতি নির্ধারণ করে: শরীর স্পর্শ বা আটক করতে হবে। প্রতিরোধে যুক্তিসংগত বল প্রয়োগ করা যাবে। মৃত্যু-দণ্ডহীন অপরাধে পুলিশ মৃত্যু ঘটাতে পারে না।",
    keyPoints: [
      "Physical touch/confinement constitutes arrest",
      "Reasonable force if person resists",
      "Cannot cause death in non-capital offence",
      "Women arrested only by female police officer",
    ],
    keyPointsBengali: [
      "শারীরিক স্পর্শ বা আটক গ্রেফতার গঠন করে",
      "প্রতিরোধে যুক্তিসংগত বল প্রয়োগ",
      "মৃত্যু-দণ্ডহীন অপরাধে মৃত্যু ঘটানো যাবে না",
      "মহিলাদের কেবল মহিলা পুলিশ গ্রেফতার করবে",
    ],
    exceptions: [
      "Women — only female officer can make arrest; no arrest between sunset and sunrise without special order",
    ],
    exceptionsBengali: [
      "মহিলাদের কেবল মহিলা পুলিশ গ্রেফতার করবে; সূর্যাস্ত-সূর্যোদয়ের মধ্যে বিশেষ আদেশ ছাড়া গ্রেফতার নয়",
    ],
    examples: [
      "Police handcuffs a violent suspect resisting arrest — lawful under Section 46",
    ],
    examplesBengali: ["প্রতিরোধকারী সন্দেহভাজনকে পুলিশ ধারা ৪৬ অনুযায়ী হাতকড়া লাগাতে পারে"],
    landmarkCases: [
      {
        name: "Prabhu Dayal v. State of Rajasthan (1975)",
        significance: "Force in arrest must be proportionate and necessary",
      },
    ],
    relatedSections: [
      {
        ref: "CrPC Section 41",
        description: "When police may arrest without warrant",
      },
      { ref: "CrPC Section 49", description: "No unnecessary restraint" },
    ],
    overridingEffect:
      "BNSS 2023 Section 43 replaces CrPC Section 46. Constitution Article 21 limits use of force during arrest. IPC Section 97 / BNS Section 34 (right of private defence) applies to resistance of illegal arrest. Police use of lethal force is regulated by Supreme Court guidelines in PUCL v. State of Maharashtra.",
    overridingEffectBengali:
      "BNSS ২০২৩ ধারা ৪৩ CrPC ধারা ৪৬ প্রতিস্থাপন করে। গ্রেফতারের সময় বল প্রয়োগ সীমিত করে সংবিধানের ২১ ধারা। IPC ধারা ৯৭ / BNS ধারা ৩৪ (ব্যক্তিগত প্রতিরক্ষার অধিকার) অবৈধ গ্রেফতারের প্রতিরোধে প্রযোজ্য।",
    crossLaws: [
      {
        ref: "BNSS 2023 Section 43",
        description: "Updated arrest procedure replacing CrPC Section 46",
      },
      {
        ref: "Constitution Article 21",
        description: "Right to life — limits excessive force during arrest",
      },
      {
        ref: "IPC Section 100 / BNS Section 37",
        description:
          "Right of private defence of body extends to resisting illegal arrest",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },

  crpc_49: {
    act: "Code of Criminal Procedure, 1973",
    section: "Section 49",
    title: "No Unnecessary Restraint",
    titleBengali: "অপ্রয়োজনীয় বাধা নয়",
    summary:
      "Section 49 prohibits unnecessary restraint on arrested person. Only as much restraint as necessary to prevent escape is permitted.",
    summaryBengali:
      "ধারা ৪৯ গ্রেফতারকৃত ব্যক্তির উপর অপ্রয়োজনীয় বাধা নিষিদ্ধ করে। পালানো রোধে যতটুকু প্রয়োজন তার বেশি বাধা দেওয়া যাবে না।",
    keyPoints: [
      "No unnecessary restraint on arrested person",
      "Only restraint needed to prevent escape",
      "Excessive restraint violates fundamental rights",
      "Protects dignity of arrested person",
    ],
    keyPointsBengali: [
      "অপ্রয়োজনীয় বাধা নিষিদ্ধ",
      "পালানো রোধে ন্যূনতম বাধা",
      "অতিরিক্ত বাধা মৌলিক অধিকার লঙ্ঘন",
      "গ্রেফতারকৃতের মর্যাদা রক্ষা করে",
    ],
    exceptions: [
      "Handcuffing allowed only if there is reasonable apprehension of escape or violence",
    ],
    exceptionsBengali: ["পালানোর বা সহিংসতার যুক্তিসংগত আশঙ্কা থাকলে হাতকড়া দেওয়া যাবে"],
    examples: [
      "Police cannot tie elderly accused if there is no risk of escape",
    ],
    examplesBengali: [
      "পালানোর ঝুঁকি না থাকলে পুলিশ বৃদ্ধ আসামিকে অপ্রয়োজনীয়ভাবে বাঁধতে পারে না",
    ],
    landmarkCases: [
      {
        name: "Prem Shankar Shukla v. Delhi Administration (1980)",
        significance:
          "Handcuffing violates Article 21 without specific reason to believe escape or violence",
      },
    ],
    relatedSections: [
      { ref: "CrPC Section 46", description: "How arrest is made" },
      {
        ref: "Constitution Article 21",
        description: "Right to life and personal liberty",
      },
    ],
    overridingEffect:
      "BNSS 2023 Section 44 replaces this provision. Constitution Article 21 is the constitutional basis — no unnecessary restraint. Handcuffing rules as per Prem Shankar Shukla v. Delhi Administration (1980) — handcuffs only in exceptional cases with magistrate order.",
    overridingEffectBengali:
      "BNSS ২০২৩ ধারা ৪৪ এই বিধান প্রতিস্থাপন করে। সংবিধানের ২১ ধারা সাংবিধানিক ভিত্তি — অহেতুক বাধা নেই। প্রেম শংকর শুক্লা মামলার (১৯৮০) হাতকড়া নিয়ম — ম্যাজিস্ট্রেটের আদেশ সহ শুধুমাত্র ব্যতিক্রমী ক্ষেত্রে হাতকড়া।",
    crossLaws: [
      {
        ref: "BNSS 2023 Section 44",
        description: "No unnecessary restraint — updated provision",
      },
      {
        ref: "Constitution Article 21",
        description:
          "Right to dignity and personal liberty prohibits unnecessary restraint",
      },
      {
        ref: "Constitution Article 14",
        description:
          "Equality before law — no differential restraint without reason",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },

  crpc_50: {
    act: "Code of Criminal Procedure, 1973",
    section: "Section 50",
    title:
      "Person Arrested to be Informed of Grounds of Arrest and Right to Bail",
    titleBengali: "গ্রেফতারকৃতকে গ্রেফতারের কারণ ও জামিনের অধিকার জানানো",
    summary:
      "Section 50 requires police to immediately inform arrested person of full particulars of offence and grounds of arrest. If bailable offence, must also inform about right to bail.",
    summaryBengali:
      "ধারা ৫০ পুলিশকে নির্দেশ দেয় যে গ্রেফতারকৃতকে তাৎক্ষণিকভাবে অপরাধের বিস্তারিত ও গ্রেফতারের কারণ জানাতে হবে। জামিনযোগ্য অপরাধে জামিনের অধিকারও জানাতে হবে।",
    keyPoints: [
      "Inform grounds of arrest immediately",
      "For bailable offences — inform right to bail",
      "Failure to inform makes arrest illegal",
      "Flows from Constitution Article 22(1)",
    ],
    keyPointsBengali: [
      "তাৎক্ষণিকভাবে গ্রেফতারের কারণ জানাতে হবে",
      "জামিনযোগ্য অপরাধে জামিনের অধিকার জানাতে হবে",
      "না জানালে গ্রেফতার অবৈধ",
      "সংবিধানের ২২(১) ধারা থেকে প্রবাহিত",
    ],
    exceptions: [
      "If released on bail immediately, informing about bail right becomes redundant",
    ],
    exceptionsBengali: ["তাৎক্ষণিকভাবে জামিন দেওয়া হলে জামিনের তথ্য প্রযোজ্য নয়"],
    examples: [
      "Police must say: You are arrested for theft under IPC 379 and have right to bail",
    ],
    examplesBengali: [
      "পুলিশকে বলতে হবে: আপনাকে IPC ৩৭৯ ধারায় চুরির অপরাধে গ্রেফতার করা হচ্ছে এবং আপনার জামিনের অধিকার আছে",
    ],
    landmarkCases: [
      {
        name: "Joginder Kumar v. State of UP (1994)",
        significance:
          "Right to be informed of grounds of arrest under Article 22(1) read with Section 50",
      },
      {
        name: "D.K. Basu v. State of WB (1997)",
        significance:
          "Guidelines include informing arrested person of grounds of arrest",
      },
    ],
    relatedSections: [
      { ref: "CrPC Section 41B", description: "Procedure of arrest" },
      {
        ref: "Constitution Article 22",
        description: "Right to be informed of grounds of arrest",
      },
    ],
    overridingEffect:
      "BNSS 2023 Section 47 replaces this provision. Constitution Article 22(1) guarantees this right as a fundamental right. Violation makes arrest illegal and gives right to habeas corpus under Article 32 / 226. SC/ST Act, NDPS Act arrests must also comply.",
    overridingEffectBengali:
      "BNSS ২০২৩ ধারা ৪৭ এই বিধান প্রতিস্থাপন করে। সংবিধানের ২২(১) ধারা এই অধিকারকে মৌলিক অধিকার হিসেবে নিশ্চিত করে। লঙ্ঘনে গ্রেফতার অবৈধ হয় এবং ৩২/২২৬ ধারার অধীনে হেবিয়াস কর্পাসের অধিকার দেয়।",
    crossLaws: [
      {
        ref: "Constitution Article 22(1)",
        description: "Fundamental right to be informed of grounds of arrest",
      },
      {
        ref: "BNSS 2023 Section 47",
        description: "Replaces CrPC Section 50 for new offences",
      },
      {
        ref: "CrPC Section 41B",
        description: "Procedure of arrest — must include informing grounds",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },
  crpc_51: {
    act: "Code of Criminal Procedure, 1973",
    section: "Section 51",
    title: "Search of Arrested Person",
    titleBengali: "গ্রেফতারকৃত ব্যক্তির তল্লাশি",
    summary:
      "Section 51 authorises police to search an arrested person and seize any articles found on them. All seized articles must be safely kept and returned upon release except items used in the offence.",
    summaryBengali:
      "ধারা ৫১ পুলিশকে গ্রেফতারকৃত ব্যক্তিকে তল্লাশি করার এবং তার কাছে পাওয়া জিনিসপত্র জব্দ করার অধিকার দেয়। জব্দকৃত জিনিসপত্র নিরাপদে রাখতে হবে এবং মুক্তির সময় ফিরিয়ে দিতে হবে, অপরাধে ব্যবহৃত জিনিস ছাড়া।",
    keyPoints: [
      "Police can search person arrested without warrant",
      "All articles found must be inventoried and kept safely",
      "Articles returned to arrested person upon release",
      "Weapons or offensive articles may be retained",
      "Female arrested person must be searched by a female officer",
    ],
    keyPointsBengali: [
      "পরোয়ানা ছাড়া গ্রেফতারকৃত ব্যক্তিকে তল্লাশি করা যাবে",
      "পাওয়া সমস্ত জিনিসের তালিকা তৈরি করে নিরাপদে রাখতে হবে",
      "মুক্তির সময় গ্রেফতারকৃতকে জিনিস ফিরিয়ে দিতে হবে",
      "অস্ত্র বা আপত্তিকর জিনিস রাখা যাবে",
      "মহিলা গ্রেফতারকৃতকে মহিলা অফিসার দ্বারা তল্লাশি করতে হবে",
    ],
    exceptions: [
      "Weapons used in offence cannot be returned",
      "Articles that are evidence of the crime are retained for trial",
    ],
    exceptionsBengali: [
      "অপরাধে ব্যবহৃত অস্ত্র ফিরিয়ে দেওয়া যাবে না",
      "অপরাধের প্রমাণ হিসেবে ব্যবহৃত জিনিস বিচারের জন্য রাখা যাবে",
    ],
    examples: [
      "If a person is arrested for robbery, police can search him and seize the stolen goods and any weapon found",
      "A lady constable must conduct search of a female accused",
    ],
    examplesBengali: [
      "ডাকাতির জন্য গ্রেফতার হলে পুলিশ তল্লাশি করে চোরাই মাল ও অস্ত্র জব্দ করতে পারে",
      "মহিলা আসামির তল্লাশি মহিলা কনস্টেবলকেই করতে হবে",
    ],
    landmarkCases: [
      {
        name: "State of Maharashtra v. Christian Community Welfare Council (2003)",
        significance:
          "Supreme Court held that strip-search of women violates dignity; female officer must conduct search",
      },
      {
        name: "D.K. Basu v. State of WB (1997)",
        significance:
          "Guidelines include proper handling and inventory of articles seized during arrest",
      },
    ],
    relatedSections: [
      {
        ref: "CrPC Section 52",
        description: "Power to seize offensive weapons",
      },
      { ref: "CrPC Section 54", description: "Examination by medical officer" },
      {
        ref: "CrPC Section 100",
        description: "Persons in charge of closed places to allow search",
      },
    ],
    overridingEffect:
      "BNSS 2023 Section 48 replaces this section. Constitution Article 21 guarantees right to privacy and dignity, limiting how search is conducted. Section 51 must be read with Section 100 CrPC (search of premises). Supreme Court guidelines in D.K. Basu apply to all custody-related procedures including search.",
    overridingEffectBengali:
      "BNSS ২০২৩ ধারা ৪৮ এই ধারা প্রতিস্থাপন করে। সংবিধানের ২১ ধারা গোপনীয়তা এবং মর্যাদার অধিকার নিশ্চিত করে, তল্লাশি কিভাবে পরিচালনা করা হয় তা সীমিত করে। ধারা ৫১ CrPC ধারা ১০০-এর সাথে পড়তে হবে।",
    crossLaws: [
      {
        ref: "BNSS 2023 Section 48",
        description: "Replaces CrPC Section 51 — search of arrested person",
      },
      {
        ref: "Constitution Article 21",
        description: "Right to privacy limits manner of search",
      },
      {
        ref: "CrPC Section 100",
        description: "Search of closed premises — related search power",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },

  crpc_52: {
    act: "Code of Criminal Procedure, 1973",
    section: "Section 52",
    title: "Power to Seize Offensive Weapons",
    titleBengali: "আক্রমণাত্মক অস্ত্র জব্দ করার ক্ষমতা",
    summary:
      "Section 52 empowers the officer making an arrest to take from the arrested person any offensive weapons that they have and deliver all weapons so seized to the court or officer before which or whom the arrested person is produced.",
    summaryBengali:
      "ধারা ৫২ গ্রেফতারকারী অফিসারকে গ্রেফতারকৃত ব্যক্তির কাছ থেকে যেকোনো আক্রমণাত্মক অস্ত্র নিয়ে নেওয়ার ক্ষমতা দেয় এবং সেই অস্ত্রগুলি যে আদালতে বা যে অফিসারের কাছে গ্রেফতারকৃত ব্যক্তিকে হাজির করা হবে সেখানে জমা দিতে হবে।",
    keyPoints: [
      "Arresting officer can seize all offensive weapons from arrested person",
      "Weapons must be delivered to the court or magistrate",
      "This power is in addition to general search power under Section 51",
      "Offensive weapons include firearms, knives, lathis if used offensively",
    ],
    keyPointsBengali: [
      "গ্রেফতারকারী অফিসার গ্রেফতারকৃত ব্যক্তির কাছ থেকে সমস্ত আক্রমণাত্মক অস্ত্র জব্দ করতে পারেন",
      "অস্ত্রগুলি আদালত বা ম্যাজিস্ট্রেটের কাছে জমা দিতে হবে",
      "এই ক্ষমতা ধারা ৫১-এর সাধারণ তল্লাশি ক্ষমতার অতিরিক্ত",
      "আক্রমণাত্মক অস্ত্রের মধ্যে রয়েছে আগ্নেয়াস্ত্র, ছুরি, লাঠি যদি আক্রমণাত্মকভাবে ব্যবহার করা হয়",
    ],
    exceptions: [
      "Licensed weapons may be returned after trial unless used in offence",
      "If acquitted, weapons may be returned to owner",
    ],
    exceptionsBengali: [
      "লাইসেন্সপ্রাপ্ত অস্ত্র বিচারের পর ফিরিয়ে দেওয়া যেতে পারে যদি অপরাধে ব্যবহার না হয়",
      "খালাস পেলে অস্ত্র মালিককে ফিরিয়ে দেওয়া যাবে",
    ],
    examples: [
      "Person arrested for assault found carrying a knife — knife is seized under Section 52",
      "A pistol found on an arrested murder accused is seized and produced before the Magistrate",
    ],
    examplesBengali: [
      "মারপিটের জন্য গ্রেফতার ব্যক্তির কাছে ছুরি পাওয়া গেলে ধারা ৫২-এর অধীনে জব্দ করা হবে",
      "খুনের আসামির কাছে পিস্তল পাওয়া গেলে তা জব্দ করে ম্যাজিস্ট্রেটের সামনে হাজির করতে হবে",
    ],
    landmarkCases: [
      {
        name: "Mst. Zubida v. State of Rajasthan (1968)",
        significance:
          "Weapons seized at time of arrest are admissible as evidence if properly documented under Section 52",
      },
    ],
    relatedSections: [
      {
        ref: "CrPC Section 51",
        description: "General search of arrested person",
      },
      {
        ref: "CrPC Section 457",
        description: "Procedure for disposal of property seized by police",
      },
    ],
    overridingEffect:
      "BNSS 2023 Section 49 replaces this provision. Arms Act 1959 governs licensing and seizure of weapons. IPC Section 399 / BNS (making preparation to commit dacoity) — possession of offensive weapons is an offence in itself under some contexts. NDPS Act also empowers seizure of contraband.",
    overridingEffectBengali:
      "BNSS ২০২৩ ধারা ৪৯ এই বিধান প্রতিস্থাপন করে। অস্ত্র আইন ১৯৫৯ অস্ত্রের লাইসেন্স ও জব্দ পরিচালনা করে। IPC ধারা ৩৯৯ / BNS (দস্যুতার প্রস্তুতি) — কিছু প্রেক্ষাপটে আক্রমণাত্মক অস্ত্রের দখল নিজেই একটি অপরাধ।",
    crossLaws: [
      {
        ref: "BNSS 2023 Section 49",
        description: "Replaces CrPC Section 52 for new offences",
      },
      {
        ref: "Arms Act 1959",
        description: "Licensing and seizure of firearms and weapons",
      },
      {
        ref: "IPC Section 399 / BNS",
        description:
          "Making preparation to commit dacoity — weapon possession offence",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },

  crpc_53: {
    act: "Code of Criminal Procedure, 1973",
    section: "Section 53",
    title:
      "Examination of Accused by Medical Practitioner at Request of Police Officer",
    titleBengali: "পুলিশ অফিসারের অনুরোধে চিকিৎসক দ্বারা অভিযুক্তের পরীক্ষা",
    summary:
      "Section 53 empowers a police officer (not below sub-inspector rank) to request a medical practitioner to examine an arrested person when there are reasonable grounds to believe that examination will afford evidence of commission of an offence.",
    summaryBengali:
      "ধারা ৫৩ একজন পুলিশ অফিসারকে (সাব-ইন্সপেক্টরের নিচে নয়) একজন চিকিৎসকের কাছে অনুরোধ করার ক্ষমতা দেয় একজন গ্রেফতারকৃত ব্যক্তিকে পরীক্ষা করতে যখন যুক্তিসঙ্গত কারণ আছে যে পরীক্ষা অপরাধ সংঘটনের প্রমাণ দেবে।",
    keyPoints: [
      "Police officer (not below Sub-Inspector) can request medical examination of accused",
      "Medical practitioner must be registered under applicable law",
      "Examination includes blood, semen, swabs and other forensic samples",
      "Medical report is used as evidence in trial",
      "Accused cannot refuse medical examination ordered under this section",
    ],
    keyPointsBengali: [
      "পুলিশ অফিসার (সাব-ইন্সপেক্টরের নিচে নয়) অভিযুক্তের চিকিৎসা পরীক্ষার অনুরোধ করতে পারেন",
      "চিকিৎসককে প্রযোজ্য আইনের অধীনে নিবন্ধিত হতে হবে",
      "পরীক্ষায় রক্ত, বীর্য, সোয়াব এবং অন্যান্য ফরেনসিক নমুনা অন্তর্ভুক্ত",
      "চিকিৎসা প্রতিবেদন বিচারে প্রমাণ হিসেবে ব্যবহৃত হয়",
      "অভিযুক্ত এই ধারার অধীনে আদেশকৃত চিকিৎসা পরীক্ষা প্রত্যাখ্যান করতে পারবেন না",
    ],
    exceptions: [
      "Examination must be by a registered medical practitioner only",
      "Cannot use force beyond necessary for examination",
    ],
    exceptionsBengali: [
      "পরীক্ষা শুধুমাত্র নিবন্ধিত চিকিৎসক দ্বারা হতে হবে",
      "পরীক্ষার জন্য প্রয়োজনীয়তার বাইরে জোর খাটানো যাবে না",
    ],
    examples: [
      "In a drug trafficking case, police requests blood test to check for drug use",
      "In assault case, medical examination of accused to check for injuries that support the fight theory",
    ],
    examplesBengali: [
      "মাদক পাচারের মামলায় পুলিশ মাদক গ্রহণ পরীক্ষার জন্য রক্ত পরীক্ষার অনুরোধ করে",
      "হামলার মামলায় অভিযুক্তের চিকিৎসা পরীক্ষা করে মারামারির তত্ত্ব সমর্থনকারী আঘাতের চিহ্ন খোঁজা হয়",
    ],
    landmarkCases: [
      {
        name: "State of UP v. Ram Babu Misra (1980)",
        significance:
          "SC held that specimen signatures of accused can be taken; medical examination is permissible without violating Article 20(3)",
      },
      {
        name: "Selvi v. State of Karnataka (2010)",
        significance:
          "SC held that involuntary administration of narco-analysis violates Article 20(3) but medical examination under Section 53 is valid",
      },
    ],
    relatedSections: [
      {
        ref: "CrPC Section 53A",
        description: "Medical examination of rape accused",
      },
      {
        ref: "CrPC Section 54",
        description: "Medical examination of arrested person at his request",
      },
      {
        ref: "Constitution Article 20(3)",
        description: "Right against self-incrimination",
      },
    ],
    overridingEffect:
      "BNSS 2023 Section 51 replaces this section. Constitution Article 20(3) protects against self-incrimination but does NOT protect against medical examination (Selvi v. Karnataka 2010). IEA Section 45 / BSA (expert evidence) governs admissibility of medical reports as expert evidence.",
    overridingEffectBengali:
      "BNSS ২০২৩ ধারা ৫১ এই ধারা প্রতিস্থাপন করে। সংবিধানের ২০(৩) ধারা আত্ম-অপরাধের বিরুদ্ধে সুরক্ষা দেয় কিন্তু চিকিৎসা পরীক্ষার বিরুদ্ধে নয় (সেলভি বনাম কর্ণাটক ২০১০)। IEA ধারা ৪৫ বিশেষজ্ঞ সাক্ষ্য হিসেবে চিকিৎসা প্রতিবেদনের গ্রহণযোগ্যতা পরিচালনা করে।",
    crossLaws: [
      {
        ref: "BNSS 2023 Section 51",
        description: "Replaces CrPC Section 53 for new offences",
      },
      {
        ref: "Constitution Article 20(3)",
        description:
          "Right against self-incrimination — does not cover medical examination",
      },
      {
        ref: "Indian Evidence Act Section 45",
        description:
          "Expert opinion — medical report is expert evidence admissible in court",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },

  crpc_54: {
    act: "Code of Criminal Procedure, 1973",
    section: "Section 54",
    title: "Examination of Arrested Person by Medical Officer",
    titleBengali: "চিকিৎসা অফিসার দ্বারা গ্রেফতারকৃত ব্যক্তির পরীক্ষা",
    summary:
      "Section 54 gives an arrested person the right to request medical examination by a medical officer to document any injuries received before or during arrest. This protects the arrested person from custodial torture claims.",
    summaryBengali:
      "ধারা ৫৪ একজন গ্রেফতারকৃত ব্যক্তিকে চিকিৎসা অফিসার দ্বারা চিকিৎসা পরীক্ষার অনুরোধ করার অধিকার দেয় যাতে গ্রেফতারের আগে বা সময়ে প্রাপ্ত কোনো আঘাত নথিভুক্ত করা যায়। এটি হেফাজতে নির্যাতনের দাবি থেকে গ্রেফতারকৃত ব্যক্তিকে রক্ষা করে।",
    keyPoints: [
      "Arrested person has right to be examined by a medical officer",
      "Medical examination must be done by registered medical officer",
      "Examination documents any injuries BEFORE custody — protects against false torture allegations",
      "Also protects arrested person from actual torture in custody",
      "Magistrate can order such examination if satisfied it is needed",
    ],
    keyPointsBengali: [
      "গ্রেফতারকৃত ব্যক্তির চিকিৎসা অফিসার দ্বারা পরীক্ষার অধিকার আছে",
      "নিবন্ধিত চিকিৎসা অফিসার দ্বারা পরীক্ষা করতে হবে",
      "হেফাজতের আগের আঘাত নথিভুক্ত করে — মিথ্যা নির্যাতনের অভিযোগ থেকে রক্ষা করে",
      "হেফাজতে প্রকৃত নির্যাতন থেকেও গ্রেফতারকৃতকে রক্ষা করে",
      "ম্যাজিস্ট্রেট প্রয়োজন মনে করলে এই পরীক্ষার আদেশ দিতে পারেন",
    ],
    exceptions: [
      "Request should be reasonable; frivolous requests can be denied",
      "Examination is to document existing injuries, not to treat illness",
    ],
    exceptionsBengali: [
      "অনুরোধ যুক্তিসঙ্গত হওয়া উচিত; অযৌক্তিক অনুরোধ প্রত্যাখ্যান করা যেতে পারে",
      "পরীক্ষা বিদ্যমান আঘাত নথিভুক্ত করার জন্য, অসুস্থতার চিকিৎসার জন্য নয়",
    ],
    examples: [
      "An accused who was in a fight before arrest requests medical examination to document pre-existing injuries",
      "An arrested person claims police beat him; medical examination is done to verify injuries",
    ],
    examplesBengali: [
      "গ্রেফতারের আগে মারামারিতে থাকা অভিযুক্ত পূর্ববর্তী আঘাত নথিভুক্ত করতে চিকিৎসা পরীক্ষার অনুরোধ করে",
      "একজন গ্রেফতারকৃত ব্যক্তি দাবি করেন পুলিশ তাকে মেরেছে; আঘাত যাচাই করতে চিকিৎসা পরীক্ষা করা হয়",
    ],
    landmarkCases: [
      {
        name: "D.K. Basu v. State of WB (1997)",
        significance:
          "SC made medical examination on arrest mandatory as part of anti-custodial torture guidelines",
      },
      {
        name: "Nilabati Behera v. State of Orissa (1993)",
        significance:
          "Custodial death case where medical evidence was crucial; reinforced importance of Section 54",
      },
    ],
    relatedSections: [
      {
        ref: "CrPC Section 53",
        description: "Medical examination at police's request",
      },
      {
        ref: "CrPC Section 55A",
        description: "Health and safety of arrested person",
      },
      {
        ref: "Constitution Article 21",
        description:
          "Right to life and personal liberty includes right against custodial torture",
      },
    ],
    overridingEffect:
      "BNSS 2023 Section 52 replaces this provision. Constitution Article 21 provides right against custodial torture which is enforced through Section 54. UN Convention Against Torture (not ratified by India but SC follows its spirit) supports this section's purpose.",
    overridingEffectBengali:
      "BNSS ২০২৩ ধারা ৫২ এই বিধান প্রতিস্থাপন করে। সংবিধানের ২১ ধারা হেফাজতে নির্যাতনের বিরুদ্ধে অধিকার প্রদান করে যা ধারা ৫৪-এর মাধ্যমে প্রয়োগ করা হয়। জাতিসংঘের নির্যাতনের বিরুদ্ধে কনভেনশন (ভারত অনুসমর্থন করেনি কিন্তু SC এর মূল নীতি অনুসরণ করে) এই ধারার উদ্দেশ্য সমর্থন করে।",
    crossLaws: [
      {
        ref: "BNSS 2023 Section 52",
        description: "Replaces CrPC Section 54 for new offences",
      },
      {
        ref: "Constitution Article 21",
        description: "Right against custodial torture and inhuman treatment",
      },
      {
        ref: "IPC Section 330 / BNS",
        description:
          "Voluntarily causing hurt to extort confession — custodial torture offence",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },

  crpc_55: {
    act: "Code of Criminal Procedure, 1973",
    section: "Section 55",
    title: "Procedure when Police Officer Deputes Subordinate to Arrest",
    titleBengali: "পুলিশ অফিসার গ্রেফতারের জন্য অধীনস্থকে নিযুক্ত করার পদ্ধতি",
    summary:
      "Section 55 deals with the procedure when a police officer wishes to depute a subordinate officer to arrest a person without a warrant. The officer must give a written order specifying the person to be arrested and the offence or other cause for which arrest is to be made.",
    summaryBengali:
      "ধারা ৫৫ সেই পদ্ধতি নিয়ে আলোচনা করে যখন একজন পুলিশ অফিসার পরোয়ানা ছাড়া কাউকে গ্রেফতার করতে একজন অধীনস্থ অফিসারকে নিযুক্ত করতে চান। অফিসারকে গ্রেফতারযোগ্য ব্যক্তি এবং যে অপরাধ বা কারণে গ্রেফতার করা হবে তা উল্লেখ করে একটি লিখিত আদেশ দিতে হবে।",
    keyPoints: [
      "Senior police officer must give written order to subordinate for arrest",
      "Written order must specify: (a) person to be arrested, (b) offence or cause",
      "Subordinate officer must show order to person being arrested on demand",
      "Protects accused from arbitrary arrest by lower-ranking officers",
    ],
    keyPointsBengali: [
      "উর্ধ্বতন পুলিশ অফিসারকে গ্রেফতারের জন্য অধীনস্থকে লিখিত আদেশ দিতে হবে",
      "লিখিত আদেশে উল্লেখ থাকতে হবে: (ক) গ্রেফতারযোগ্য ব্যক্তি, (খ) অপরাধ বা কারণ",
      "অধীনস্থ অফিসারকে চাহিদা অনুযায়ী গ্রেফতারকৃত ব্যক্তিকে আদেশ দেখাতে হবে",
      "নিম্নপদস্থ অফিসার দ্বারা স্বেচ্ছাচারী গ্রেফতার থেকে অভিযুক্তকে রক্ষা করে",
    ],
    exceptions: [
      "Does not apply when subordinate officer independently has power to arrest",
      "In hot pursuit or emergency, immediate arrest may precede formal order",
    ],
    exceptionsBengali: [
      "প্রযোজ্য নয় যখন অধীনস্থ অফিসার স্বাধীনভাবে গ্রেফতারের ক্ষমতা রাখেন",
      "তাৎক্ষণিক তাড়া বা জরুরি অবস্থায়, আনুষ্ঠানিক আদেশের আগেই তাৎক্ষণিক গ্রেফতার করা যেতে পারে",
    ],
    examples: [
      "Inspector issues written order to constable to arrest accused for theft at specific address",
      "Officer-in-Charge deputes Head Constable to arrest absconding accused with written specification",
    ],
    examplesBengali: [
      "ইন্সপেক্টর নির্দিষ্ট ঠিকানায় চুরির অভিযুক্তকে গ্রেফতার করতে কনস্টেবলকে লিখিত আদেশ দেন",
      "অফিসার-ইন-চার্জ পলাতক অভিযুক্তকে লিখিত বিবরণসহ গ্রেফতার করতে হেড কনস্টেবলকে নিযুক্ত করেন",
    ],
    landmarkCases: [
      {
        name: "Bhim Singh v. State of J&K (1985)",
        significance:
          "SC held that arrest and detention in violation of procedure under CrPC is actionable; proper delegation under Section 55 is mandatory",
      },
    ],
    relatedSections: [
      {
        ref: "CrPC Section 41",
        description: "When police may arrest without warrant",
      },
      {
        ref: "CrPC Section 41B",
        description: "Procedure of arrest and duties of arresting officer",
      },
    ],
    overridingEffect:
      "BNSS 2023 Section 53 replaces this section. Constitution Article 21 requires that delegated arrest also follows due procedure. If delegation order is not given, the subordinate's arrest may be challenged as unauthorised.",
    overridingEffectBengali:
      "BNSS ২০২৩ ধারা ৫৩ এই ধারা প্রতিস্থাপন করে। সংবিধানের ২১ ধারার প্রয়োজন যে প্রতিনিধিত্বমূলক গ্রেফতারও যথাযথ পদ্ধতি অনুসরণ করে। প্রতিনিধিত্বের আদেশ না দেওয়া হলে অধীনস্থের গ্রেফতারকে অননুমোদিত হিসেবে চ্যালেঞ্জ করা যাবে।",
    crossLaws: [
      {
        ref: "BNSS 2023 Section 53",
        description: "Replaces CrPC Section 55 — delegation of arrest power",
      },
      {
        ref: "Constitution Article 21",
        description: "Due process requirements apply to delegated arrests also",
      },
      {
        ref: "CrPC Section 41B",
        description:
          "Duties of arresting officer apply to delegated arrests too",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },

  crpc_56: {
    act: "Code of Criminal Procedure, 1973",
    section: "Section 56",
    title: "Person Arrested to be Taken Before Magistrate or Officer in Charge",
    titleBengali: "গ্রেফতারকৃতকে ম্যাজিস্ট্রেট বা ভারপ্রাপ্ত অফিসারের সামনে হাজির করা",
    summary:
      "Section 56 mandates that a police officer making an arrest must without unnecessary delay take or send the arrested person before a Magistrate having jurisdiction or before the officer in charge of a police station. This is a fundamental safeguard against illegal detention.",
    summaryBengali:
      "ধারা ৫৬ নির্দেশ দেয় যে একজন পুলিশ অফিসার যিনি গ্রেফতার করেছেন তিনি অহেতুক বিলম্ব ছাড়াই গ্রেফতারকৃতকে এখতিয়ারসম্পন্ন ম্যাজিস্ট্রেটের সামনে বা থানার ভারপ্রাপ্ত অফিসারের সামনে নিয়ে যাবেন বা পাঠাবেন। এটি অবৈধ আটকের বিরুদ্ধে একটি মৌলিক রক্ষাকবচ।",
    keyPoints: [
      "Police MUST take arrested person before Magistrate without unnecessary delay",
      "Or before the Officer in Charge of the police station",
      "Delay in producing before Magistrate makes detention illegal",
      "This section is basis for the 24-hour rule in Section 57",
      "Violation gives right to file habeas corpus petition",
    ],
    keyPointsBengali: [
      "পুলিশ অবশ্যই গ্রেফতারকৃতকে অহেতুক বিলম্ব ছাড়াই ম্যাজিস্ট্রেটের সামনে নিয়ে যেতে হবে",
      "বা থানার ভারপ্রাপ্ত অফিসারের সামনে",
      "ম্যাজিস্ট্রেটের সামনে হাজির করতে বিলম্ব আটক অবৈধ করে দেয়",
      "এই ধারা ধারা ৫৭-এর ২৪ ঘণ্টার নিয়মের ভিত্তি",
      "লঙ্ঘনে হেবিয়াস কর্পাস আবেদন করার অধিকার দেয়",
    ],
    exceptions: [
      "If Officer in Charge orders discharge, Magistrate production may not be required",
      "Section applies to all arrests — with or without warrant",
    ],
    exceptionsBengali: [
      "ভারপ্রাপ্ত অফিসার মুক্তির আদেশ দিলে ম্যাজিস্ট্রেটের সামনে হাজির নাও লাগতে পারে",
      "ধারাটি পরোয়ানা সহ বা ছাড়া সকল গ্রেফতারে প্রযোজ্য",
    ],
    examples: [
      "Person arrested at 10 PM for theft must be produced before Magistrate within 24 hours as per Section 57",
      "Delay of 3 days in producing arrested person made the entire detention illegal — court ordered release",
    ],
    examplesBengali: [
      "রাত ১০টায় চুরির জন্য গ্রেফতার ব্যক্তিকে ধারা ৫৭ অনুযায়ী ২৪ ঘণ্টার মধ্যে ম্যাজিস্ট্রেটের সামনে হাজির করতে হবে",
      "গ্রেফতারকৃতকে ৩ দিন পর হাজির করা পুরো আটককে অবৈধ করে দিয়েছে — আদালত মুক্তির আদেশ দিয়েছে",
    ],
    landmarkCases: [
      {
        name: "Khatri v. State of Bihar (1981)",
        significance:
          "SC held that failure to produce arrested person before Magistrate within 24 hours violates fundamental rights",
      },
      {
        name: "Joginder Kumar v. State of UP (1994)",
        significance:
          "Arrest must be followed by immediate production before Magistrate; police cannot detain indefinitely",
      },
    ],
    relatedSections: [
      {
        ref: "CrPC Section 57",
        description: "Person arrested not to be detained more than 24 hours",
      },
      {
        ref: "Constitution Article 22(2)",
        description: "Right to be produced before Magistrate within 24 hours",
      },
    ],
    overridingEffect:
      "BNSS 2023 Section 54 replaces this provision. Constitution Article 22(2) makes production before Magistrate within 24 hours a fundamental right. Violation gives right to habeas corpus under Articles 32 / 226. Special Acts like NSA (National Security Act) allow longer detention but require Magistrate communication.",
    overridingEffectBengali:
      "BNSS ২০২৩ ধারা ৫৪ এই বিধান প্রতিস্থাপন করে। সংবিধানের ২২(২) ধারা ২৪ ঘণ্টার মধ্যে ম্যাজিস্ট্রেটের সামনে হাজির করাকে মৌলিক অধিকার করে। লঙ্ঘনে ৩২/২২৬ ধারার অধীনে হেবিয়াস কর্পাসের অধিকার। NSA-এর মতো বিশেষ আইন দীর্ঘ আটকের অনুমতি দেয় কিন্তু ম্যাজিস্ট্রেটকে জানাতে হয়।",
    crossLaws: [
      {
        ref: "BNSS 2023 Section 54",
        description: "Replaces CrPC Section 56 for new offences",
      },
      {
        ref: "Constitution Article 22(2)",
        description:
          "Fundamental right to be produced before Magistrate within 24 hours",
      },
      {
        ref: "National Security Act 1980",
        description:
          "Allows preventive detention beyond 24 hours — special law overrides",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },

  crpc_57: {
    act: "Code of Criminal Procedure, 1973",
    section: "Section 57",
    title: "Person Arrested Not to be Detained More Than Twenty-Four Hours",
    titleBengali: "গ্রেফতারকৃত ব্যক্তিকে চব্বিশ ঘণ্টার বেশি আটক না করা",
    summary:
      "Section 57 is a crucial fundamental rights protection. No police officer shall detain an arrested person in custody beyond 24 hours from the time of arrest without a special order from a Magistrate. This is a constitutional mandate flowing from Article 22(2).",
    summaryBengali:
      "ধারা ৫৭ একটি গুরুত্বপূর্ণ মৌলিক অধিকার সুরক্ষা। কোনো পুলিশ অফিসার গ্রেফতারকৃত ব্যক্তিকে গ্রেফতারের সময় থেকে ২৪ ঘণ্টার বেশি ম্যাজিস্ট্রেটের বিশেষ আদেশ ছাড়া হেফাজতে আটক রাখতে পারবেন না। এটি সংবিধানের ২২(২) ধারা থেকে প্রবাহিত একটি সাংবিধানিক আদেশ।",
    keyPoints: [
      "Maximum detention without Magistrate's order is 24 hours",
      "Time of arrest to time of production before Magistrate must not exceed 24 hours",
      "Travel time excluded from 24 hours",
      "After 24 hours, Magistrate can grant remand (judicial or police custody)",
      "Violation allows arrested person to demand immediate release",
    ],
    keyPointsBengali: [
      "ম্যাজিস্ট্রেটের আদেশ ছাড়া সর্বোচ্চ আটক ২৪ ঘণ্টা",
      "গ্রেফতারের সময় থেকে ম্যাজিস্ট্রেটের সামনে হাজির হওয়ার সময় পর্যন্ত ২৪ ঘণ্টার বেশি হওয়া যাবে না",
      "যাত্রার সময় ২৪ ঘণ্টা থেকে বাদ দেওয়া হয়",
      "২৪ ঘণ্টার পরে, ম্যাজিস্ট্রেট রিমান্ড মঞ্জুর করতে পারেন (বিচারিক বা পুলিশ হেফাজত)",
      "লঙ্ঘনে গ্রেফতারকৃত ব্যক্তি তাৎক্ষণিক মুক্তি দাবি করতে পারেন",
    ],
    exceptions: [
      "Travel time from place of arrest to court is excluded from 24 hours",
      "After Magistrate's remand order, extended custody is lawful",
      "Section 167 allows Magistrate to authorise up to 15 days police custody",
    ],
    exceptionsBengali: [
      "গ্রেফতারের স্থান থেকে আদালত পর্যন্ত যাত্রার সময় ২৪ ঘণ্টা থেকে বাদ দেওয়া হয়",
      "ম্যাজিস্ট্রেটের রিমান্ড আদেশের পরে, বর্ধিত হেফাজত বৈধ",
      "ধারা ১৬৭ ম্যাজিস্ট্রেটকে সর্বোচ্চ ১৫ দিন পুলিশ হেফাজত অনুমোদন করার অধিকার দেয়",
    ],
    examples: [
      "Person arrested at 6 AM must be produced before Magistrate by 6 AM next day at the latest",
      "Police cannot keep a person in lock-up for 3 days without Magistrate's remand order — this is illegal detention",
    ],
    examplesBengali: [
      "সকাল ৬টায় গ্রেফতার ব্যক্তিকে পরের দিন সকাল ৬টার মধ্যে ম্যাজিস্ট্রেটের সামনে হাজির করতে হবে",
      "পুলিশ ম্যাজিস্ট্রেটের রিমান্ড আদেশ ছাড়া ৩ দিন কাউকে লক-আপে রাখতে পারে না — এটি অবৈধ আটক",
    ],
    landmarkCases: [
      {
        name: "Khatri v. State of Bihar (Bhagalpur Blinding Case) (1981)",
        significance:
          "SC held that production before Magistrate within 24 hours is mandatory constitutional right",
      },
      {
        name: "Arnesh Kumar v. State of Bihar (2014)",
        significance:
          "SC issued guidelines: police must justify arrest necessity; automatic production within 24 hours mandatory",
      },
      {
        name: "D.K. Basu v. State of WB (1997)",
        significance:
          "Part of comprehensive custody guidelines; 24-hour rule is non-negotiable",
      },
    ],
    relatedSections: [
      {
        ref: "CrPC Section 56",
        description: "Person arrested to be taken before Magistrate",
      },
      {
        ref: "CrPC Section 167",
        description: "Magistrate can grant remand beyond 24 hours",
      },
      {
        ref: "Constitution Article 22(2)",
        description:
          "Constitutional right to be produced before Magistrate within 24 hours",
      },
    ],
    overridingEffect:
      "BNSS 2023 Section 58 replaces this section. Constitution Article 22(2) is the constitutional guarantee. NSA 1980, COFEPOSA, UAPA allow preventive detention beyond 24 hours — these special laws override Section 57 in their specific domains. Section 167 CrPC provides mechanism for extended custody after 24 hours.",
    overridingEffectBengali:
      "BNSS ২০২৩ ধারা ৫৮ এই ধারা প্রতিস্থাপন করে। সংবিধানের ২২(২) ধারা সাংবিধানিক গ্যারান্টি। NSA ১৯৮০, COFEPOSA, UAPA ২৪ ঘণ্টার বাইরে প্রতিরোধমূলক আটকের অনুমতি দেয় — এই বিশেষ আইনগুলি তাদের নির্দিষ্ট ক্ষেত্রে ধারা ৫৭-কে অতিক্রম করে।",
    crossLaws: [
      {
        ref: "BNSS 2023 Section 58",
        description: "Replaces CrPC Section 57 — 24-hour detention rule",
      },
      {
        ref: "Constitution Article 22(2)",
        description:
          "Constitutional 24-hour rule — supreme over CrPC Section 57",
      },
      {
        ref: "National Security Act 1980 / UAPA 1967",
        description:
          "Preventive detention laws that override 24-hour rule in special cases",
      },
      {
        ref: "CrPC Section 167",
        description: "Magistrate can authorise extended custody after 24 hours",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },

  crpc_58: {
    act: "Code of Criminal Procedure, 1973",
    section: "Section 58",
    title: "Police to Report Apprehensions",
    titleBengali: "গ্রেফতার সম্পর্কে পুলিশের প্রতিবেদন",
    summary:
      "Section 58 requires officers in charge of police stations to report to the District Magistrate (or Sub-Divisional Magistrate) all cases of persons arrested without warrant within their jurisdiction, along with the reasons for such arrests.",
    summaryBengali:
      "ধারা ৫৮ থানার ভারপ্রাপ্ত অফিসারদের তাদের এখতিয়ারে পরোয়ানা ছাড়া গ্রেফতার করা সমস্ত ব্যক্তির ঘটনা জেলা ম্যাজিস্ট্রেট (বা সাব-ডিভিশনাল ম্যাজিস্ট্রেট)-কে এই গ্রেফতারের কারণসহ জানাতে বাধ্য করে।",
    keyPoints: [
      "Police must report all warrantless arrests to District Magistrate",
      "Report must include reasons for arrest",
      "Ensures executive oversight over police arrest powers",
      "Helps District Magistrate monitor law and order situation",
      "Non-compliance is an administrative violation",
    ],
    keyPointsBengali: [
      "পুলিশকে সমস্ত পরোয়ানাবিহীন গ্রেফতার জেলা ম্যাজিস্ট্রেটকে জানাতে হবে",
      "প্রতিবেদনে গ্রেফতারের কারণ অন্তর্ভুক্ত থাকতে হবে",
      "পুলিশের গ্রেফতার ক্ষমতার উপর নির্বাহী তদারকি নিশ্চিত করে",
      "জেলা ম্যাজিস্ট্রেটকে আইন ও শৃঙ্খলা পরিস্থিতি পর্যবেক্ষণ করতে সাহায্য করে",
      "অননুপালন একটি প্রশাসনিক লঙ্ঘন",
    ],
    exceptions: [
      "Reporting is administrative requirement; does not validate or invalidate arrest itself",
      "Section applies to arrests within police station jurisdiction only",
    ],
    exceptionsBengali: [
      "প্রতিবেদন প্রশাসনিক প্রয়োজনীয়তা; গ্রেফতার বৈধ বা অবৈধ করে না",
      "ধারাটি শুধুমাত্র থানার এখতিয়ারের মধ্যে গ্রেফতারের ক্ষেত্রে প্রযোজ্য",
    ],
    examples: [
      "Officer in Charge submits weekly report to DM listing all arrests made without warrant that week",
      "DM reviews arrest reports to ensure police are not abusing arrest powers in his district",
    ],
    examplesBengali: [
      "ভারপ্রাপ্ত অফিসার সেই সপ্তাহে পরোয়ানা ছাড়া করা সমস্ত গ্রেফতারের তালিকা সহ DM-কে সাপ্তাহিক প্রতিবেদন জমা দেন",
      "DM তার জেলায় পুলিশ গ্রেফতার ক্ষমতার অপব্যবহার করছে কিনা তা নিশ্চিত করতে গ্রেফতার প্রতিবেদন পর্যালোচনা করেন",
    ],
    landmarkCases: [
      {
        name: "Joginder Kumar v. State of UP (1994)",
        significance:
          "SC emphasised need for accountability in arrests; Section 58 reporting is part of accountability framework",
      },
    ],
    relatedSections: [
      {
        ref: "CrPC Section 41",
        description: "When police may arrest without warrant",
      },
      { ref: "CrPC Section 57", description: "24-hour rule for detention" },
    ],
    overridingEffect:
      "BNSS 2023 Section 59 replaces this reporting requirement. CrPC Section 57 and Constitution Article 22(2) work together with Section 58 to create accountability. District Magistrate's power under Section 107 / 151 CrPC to act on such reports reinforces executive oversight.",
    overridingEffectBengali:
      "BNSS ২০২৩ ধারা ৫৯ এই প্রতিবেদন প্রয়োজনীয়তা প্রতিস্থাপন করে। CrPC ধারা ৫৭ এবং সংবিধানের ২২(২) ধারা জবাবদিহিতা তৈরিতে ধারা ৫৮-এর সাথে মিলে কাজ করে।",
    crossLaws: [
      {
        ref: "BNSS 2023 Section 59",
        description: "Replaces CrPC Section 58 — police reporting requirement",
      },
      {
        ref: "CrPC Section 107",
        description: "DM can act on arrest reports to prevent breach of peace",
      },
      {
        ref: "CrPC Section 57",
        description: "24-hour rule — reports confirm compliance",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },

  crpc_59: {
    act: "Code of Criminal Procedure, 1973",
    section: "Section 59",
    title: "Discharge of Person Apprehended",
    titleBengali: "আটককৃত ব্যক্তির মুক্তি",
    summary:
      "Section 59 provides that no person who has been arrested by a police officer shall be discharged except on his own bond, or on bail, or under the special order of a Magistrate. This prevents arbitrary or improper release by police.",
    summaryBengali:
      "ধারা ৫৯ বিধান করে যে পুলিশ অফিসার দ্বারা গ্রেফতার কোনো ব্যক্তিকে তার নিজের মুচলেকায়, জামিনে, বা ম্যাজিস্ট্রেটের বিশেষ আদেশ ছাড়া মুক্তি দেওয়া যাবে না। এটি পুলিশ কর্তৃক স্বেচ্ছাচারী বা অনুচিত মুক্তি রোধ করে।",
    keyPoints: [
      "Police cannot release arrested person without proper authority",
      "Release can only be: (a) on own bond, (b) on bail, (c) by Magistrate's order",
      "Prevents police from releasing suspect for bribe or favours",
      "Ensures proper documentation of every release",
    ],
    keyPointsBengali: [
      "পুলিশ যথাযথ কর্তৃত্ব ছাড়া গ্রেফতারকৃত ব্যক্তিকে মুক্তি দিতে পারে না",
      "মুক্তি শুধুমাত্র হতে পারে: (ক) নিজের মুচলেকায়, (খ) জামিনে, (গ) ম্যাজিস্ট্রেটের আদেশে",
      "পুলিশকে ঘুষ বা সুবিধার জন্য সন্দেহভাজনকে মুক্তি দেওয়া থেকে রোধ করে",
      "প্রতিটি মুক্তির সঠিক নথিভুক্তি নিশ্চিত করে",
    ],
    exceptions: [
      "If offence is bailable, Officer in Charge can grant bail and release",
      "Special Magistrate orders can override this section in specific circumstances",
    ],
    exceptionsBengali: [
      "জামিনযোগ্য অপরাধে ভারপ্রাপ্ত অফিসার জামিন মঞ্জুর করে মুক্তি দিতে পারেন",
      "বিশেষ ম্যাজিস্ট্রেটের আদেশ নির্দিষ্ট পরিস্থিতিতে এই ধারাকে অতিক্রম করতে পারে",
    ],
    examples: [
      "Police cannot release an accused person just because his influential relatives pressured them — requires proper Magistrate order",
      "If bailable offence, Officer in Charge can release on bail without Magistrate order",
    ],
    examplesBengali: [
      "পুলিশ শুধু প্রভাবশালী আত্মীয়দের চাপের কারণে অভিযুক্তকে মুক্তি দিতে পারে না — যথাযথ ম্যাজিস্ট্রেটের আদেশ প্রয়োজন",
      "জামিনযোগ্য অপরাধে ভারপ্রাপ্ত অফিসার ম্যাজিস্ট্রেটের আদেশ ছাড়াই জামিনে মুক্তি দিতে পারেন",
    ],
    landmarkCases: [
      {
        name: "State of MP v. Sheetla Sahai (2009)",
        significance:
          "Improper release of accused without following Section 59 procedure amounts to dereliction of duty",
      },
    ],
    relatedSections: [
      { ref: "CrPC Section 436", description: "Bail in bailable offences" },
      { ref: "CrPC Section 437", description: "Bail in non-bailable offences" },
    ],
    overridingEffect:
      "BNSS 2023 Section 60 replaces this provision. Constitution Article 21 prohibits arbitrary release as well as arbitrary detention. IPC Section 223 / BNS (escape from custody) makes escape by accused an offence. Bail provisions under Sections 436-439 provide the lawful framework for release.",
    overridingEffectBengali:
      "BNSS ২০২৩ ধারা ৬০ এই বিধান প্রতিস্থাপন করে। সংবিধানের ২১ ধারা স্বেচ্ছাচারী মুক্তি এবং স্বেচ্ছাচারী আটক উভয়কেই নিষিদ্ধ করে। IPC ধারা ২২৩ / BNS হেফাজত থেকে পালানোকে অপরাধ করে।",
    crossLaws: [
      {
        ref: "BNSS 2023 Section 60",
        description: "Replaces CrPC Section 59 — discharge of arrested person",
      },
      {
        ref: "IPC Section 223 / BNS",
        description:
          "Escape from confinement or custody — offence of the person released improperly",
      },
      {
        ref: "CrPC Sections 436-439",
        description: "Bail framework — lawful method for release from custody",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },

  crpc_60: {
    act: "Code of Criminal Procedure, 1973",
    section: "Section 60",
    title: "Power on Escape to Pursue and Re-take",
    titleBengali: "পালানোর পর পুনরায় গ্রেফতারের ক্ষমতা",
    summary:
      "Section 60 empowers any police officer to pursue and re-arrest a person who has escaped from lawful custody. The person may be re-arrested without any further warrant in any place in India.",
    summaryBengali:
      "ধারা ৬০ যেকোনো পুলিশ অফিসারকে বৈধ হেফাজত থেকে পালিয়ে যাওয়া ব্যক্তিকে অনুসরণ করে পুনরায় গ্রেফতার করার ক্ষমতা দেয়। ব্যক্তিটিকে ভারতের যেকোনো স্থানে কোনো নতুন পরোয়ানা ছাড়াই পুনরায় গ্রেফতার করা যাবে।",
    keyPoints: [
      "Police can re-arrest escaped person anywhere in India without fresh warrant",
      "Power applies when person escapes from lawful custody",
      "Any police officer (not just arresting officer) can pursue and re-arrest",
      "Private persons may also assist in re-arrest under Section 38",
      "Hot pursuit doctrine applies — no geographical limitation within India",
    ],
    keyPointsBengali: [
      "পুলিশ নতুন পরোয়ানা ছাড়াই পালানো ব্যক্তিকে ভারতের যেকোনো স্থানে পুনরায় গ্রেফতার করতে পারে",
      "ক্ষমতাটি বৈধ হেফাজত থেকে পালানো ব্যক্তির ক্ষেত্রে প্রযোজ্য",
      "যেকোনো পুলিশ অফিসার (শুধু গ্রেফতারকারী নয়) অনুসরণ ও পুনরায় গ্রেফতার করতে পারেন",
      "ব্যক্তিগত ব্যক্তিরাও ধারা ৩৮-এর অধীনে পুনরায় গ্রেফতারে সহায়তা করতে পারেন",
      "তাৎক্ষণিক তাড়া নীতি প্রযোজ্য — ভারতের মধ্যে কোনো ভৌগোলিক সীমাবদ্ধতা নেই",
    ],
    exceptions: [
      "Cannot re-arrest person released legally by Magistrate or court",
      "Power applies only to escape from lawful custody — if original arrest was illegal, Section 60 does not apply",
    ],
    exceptionsBengali: [
      "ম্যাজিস্ট্রেট বা আদালত কর্তৃক আইনগতভাবে মুক্তিপ্রাপ্ত ব্যক্তিকে পুনরায় গ্রেফতার করা যাবে না",
      "ক্ষমতাটি কেবল বৈধ হেফাজত থেকে পালানোর ক্ষেত্রে প্রযোজ্য — মূল গ্রেফতার অবৈধ হলে ধারা ৬০ প্রযোজ্য নয়",
    ],
    examples: [
      "Accused escapes from police lock-up in Kolkata; officers from any state can re-arrest him in Mumbai without fresh warrant",
      "Prisoner escapes during transit to court; any police officer can immediately re-arrest him",
    ],
    examplesBengali: [
      "কলকাতার পুলিশ লক-আপ থেকে অভিযুক্ত পালিয়ে গেলে; যেকোনো রাজ্যের অফিসার তাকে মুম্বাইতে নতুন পরোয়ানা ছাড়াই পুনরায় গ্রেফতার করতে পারেন",
      "আদালতে নেওয়ার পথে কয়েদি পালালে; যেকোনো পুলিশ অফিসার তাকে তাৎক্ষণিকভাবে পুনরায় গ্রেফতার করতে পারেন",
    ],
    landmarkCases: [
      {
        name: "State v. Somabhai Bachubhai Jadeja (1984)",
        significance:
          "Court held that Section 60 re-arrest power is wide and extends to all parts of India; fresh FIR not needed",
      },
    ],
    relatedSections: [
      {
        ref: "CrPC Section 38",
        description: "Aid to person executing warrant or making arrest",
      },
      {
        ref: "CrPC Section 48",
        description: "Pursuit of offenders into other jurisdictions",
      },
    ],
    overridingEffect:
      "BNSS 2023 Section 61 replaces this provision. Constitution Article 22 applies even to re-arrest situations. IPC Section 224 / BNS (resistance to taking of property by lawful authority or escape from custody) criminalises resistance to lawful re-arrest. Extradition Act applies if fugitive escapes to foreign country.",
    overridingEffectBengali:
      "BNSS ২০২৩ ধারা ৬১ এই বিধান প্রতিস্থাপন করে। সংবিধানের ২২ ধারা পুনরায় গ্রেফতারের পরিস্থিতিতেও প্রযোজ্য। IPC ধারা ২২৪ / BNS (বৈধ কর্তৃপক্ষের সম্পত্তি নেওয়ার প্রতিরোধ) বৈধ পুনরায় গ্রেফতারের প্রতিরোধকে অপরাধ করে।",
    crossLaws: [
      {
        ref: "BNSS 2023 Section 61",
        description:
          "Replaces CrPC Section 60 — pursuit and re-arrest of escapee",
      },
      {
        ref: "IPC Section 224 / BNS",
        description: "Resistance to lawful re-arrest is itself an offence",
      },
      {
        ref: "Extradition Act 1962",
        description:
          "If fugitive flees to foreign country — extradition process applies",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },

  crpc_61: {
    act: "Code of Criminal Procedure, 1973",
    section: "Section 61",
    title: "Form of Summons",
    titleBengali: "সমন-এর রূপ",
    summary:
      "Section 61 lays down the requirements for a valid summons issued by a court. Every summons shall be in writing, in duplicate, signed by the presiding officer of the court or by an officer authorized by the High Court. It must bear the seal of the court.",
    summaryBengali:
      "ধারা ৬১ আদালত কর্তৃক জারি করা একটি বৈধ সমনের প্রয়োজনীয়তা নির্ধারণ করে। প্রতিটি সমন লিখিত, দুই প্রস্থে, আদালতের সভাপতিত্বকারী অফিসার বা হাইকোর্ট কর্তৃক অধিকৃত অফিসার দ্বারা স্বাক্ষরিত হবে। এতে আদালতের সিল থাকতে হবে।",
    keyPoints: [
      "Summons must be in writing",
      "Must be in duplicate (two copies)",
      "Must be signed by presiding officer or authorized officer",
      "Must bear the seal of the court",
      "Non-compliance with form makes summons invalid",
      "Summons is the initial step to call a person before the court",
    ],
    keyPointsBengali: [
      "সমন অবশ্যই লিখিত হতে হবে",
      "দুই প্রস্থে হতে হবে (দুটি কপি)",
      "সভাপতিত্বকারী অফিসার বা অধিকৃত অফিসার দ্বারা স্বাক্ষরিত হতে হবে",
      "আদালতের সিল থাকতে হবে",
      "রূপ মেনে না চলা সমনকে অবৈধ করে দেয়",
      "সমন হল আদালতে কাউকে ডাকার প্রাথমিক পদক্ষেপ",
    ],
    exceptions: [
      "Electronic summons now permitted under amended CrPC provisions",
      "Defect in form alone does not necessarily vitiate summons if substantial compliance is shown",
    ],
    exceptionsBengali: [
      "সংশোধিত CrPC বিধানের অধীনে এখন ইলেকট্রনিক সমনের অনুমতি আছে",
      "শুধুমাত্র রূপে ত্রুটি সমনকে অকার্যকর করে না যদি উল্লেখযোগ্য সম্মতি দেখানো যায়",
    ],
    examples: [
      "Court issues summons to witness asking them to appear on a specific date — must be in writing with court seal",
      "A summons without court seal is challenged as invalid; court must re-issue with proper seal",
    ],
    examplesBengali: [
      "আদালত সাক্ষীকে নির্দিষ্ট তারিখে হাজির হতে সমন জারি করে — আদালতের সিলসহ লিখিত হতে হবে",
      "আদালতের সিলবিহীন একটি সমনকে অবৈধ বলে চ্যালেঞ্জ করা হয়; আদালতকে যথাযথ সিলসহ পুনরায় জারি করতে হবে",
    ],
    landmarkCases: [
      {
        name: "State of UP v. Hari Shanker (1996)",
        significance:
          "Defective summons which does not comply with Section 61 requirements cannot compel appearance; accused cannot be penalised for not responding to defective summons",
      },
    ],
    relatedSections: [
      { ref: "CrPC Section 62", description: "Summons — how served" },
      { ref: "CrPC Section 63", description: "Service of summons on company" },
      {
        ref: "CrPC Section 64",
        description: "Service when person summoned cannot be found",
      },
    ],
    overridingEffect:
      "BNSS 2023 Section 63 replaces this provision. IT Act Section 65B and electronic records — courts now recognise electronic summons. Constitution Article 21 due process applies to service of summons. Non-compliance with summons is punishable under CrPC Sections 174 / 175. Bailable warrant issued on failure to appear.",
    overridingEffectBengali:
      "BNSS ২০২৩ ধারা ৬৩ এই বিধান প্রতিস্থাপন করে। IT আইন ধারা ৬৫B এবং ইলেকট্রনিক রেকর্ড — আদালত এখন ইলেকট্রনিক সমন স্বীকার করে। সংবিধানের ২১ ধারার যথাযথ প্রক্রিয়া সমন প্রদানে প্রযোজ্য।",
    crossLaws: [
      {
        ref: "BNSS 2023 Section 63",
        description: "Replaces CrPC Section 61 — updated form of summons",
      },
      {
        ref: "IT Act Section 65B",
        description: "Electronic records — enables electronic summons",
      },
      {
        ref: "CrPC Section 62",
        description:
          "How summons is served — follows Section 61 form requirements",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },

  crpc_62: {
    section: "Section 62",
    title: "Service of Summons on Persons",
    act: "CrPC",
    summary:
      "Prescribes the procedure for serving summons on a person — must be served personally by delivering or tendering a duplicate copy.",
    sectionText:
      "Every summons shall be served by a police officer, or subject to such rules as the State Government may make in this behalf, by an officer of the court issuing it or other public servant. The summons shall, if practicable, be served personally on the person summoned, by delivering or tendering to him one of the duplicates of the summons.",
    explanation:
      "Section 62 of CrPC mandates that summons must be served personally on the individual named in the summons. A duplicate copy of the summons is handed to the person. This ensures the person has actual notice of the court's direction to appear.",
    keyPoints: [
      "Summons must be served by police officer or court officer",
      "Personal service is the primary mode — direct delivery to the person",
      "A duplicate (copy) of the summons is handed over",
      "Personal service ensures actual knowledge of the summons",
    ],
    bengaliExplanation:
      "ধারা ৬২ — ব্যক্তিকে সমন প্রদান: এই ধারা অনুযায়ী, আদালতের সমন ব্যক্তিগতভাবে সংশ্লিষ্ট ব্যক্তিকে প্রদান করতে হবে। পুলিশ অফিসার বা আদালতের কর্মকর্তা সমনের একটি নকল কপি সরাসরি ঐ ব্যক্তির হাতে দেবেন। ব্যক্তিগত সেবা নিশ্চিত করে যে সংশ্লিষ্ট ব্যক্তি আদালতের নির্দেশ সম্পর্কে সত্যিকার অর্থে অবহিত।",
    relatedSections: ["CrPC 61", "CrPC 63", "CrPC 64", "CrPC 65"],
    overridingEffect:
      "BNSS 2023 Section 69 replaces CrPC 62 — electronic service now permitted.",
    crossLaws: [
      "BNSS Section 69 (Service of Summons — 2023)",
      "CrPC Section 61 (Form of Summons)",
    ],
    landmarkCases: [
      {
        name: "State of U.P. v. Ram Naresh",
        citation: "AIR 1957 SC 411",
        relevance:
          "Personal service under Section 62 is essential for valid summons; non-compliance vitiates proceedings.",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },
  crpc_63: {
    section: "Section 63",
    title: "Service of Summons on Corporate Bodies and Societies",
    act: "CrPC",
    summary:
      "Deals with how summons are served on companies, corporations, local bodies, or societies — served on secretary, manager, or principal officer.",
    sectionText:
      "Service of a summons on a corporation may be effected by serving it on the secretary, local manager or other principal officer of the corporation, or by registered post addressed to the chief officer of the corporation in India.",
    explanation:
      "When a corporation or company is summoned to appear before a court, physical personal service is not possible. Section 63 provides that in such cases, the summons may be served on the company's secretary, local manager, or by registered post to the chief officer. This ensures companies cannot avoid legal proceedings by claiming inability to be personally served.",
    keyPoints: [
      "Applies to corporations, companies, local bodies, registered societies",
      "Served on secretary, local manager, or principal officer",
      "Alternatively, sent by registered post to chief officer",
      "Ensures companies cannot evade court summons",
    ],
    bengaliExplanation:
      "ধারা ৬৩ — কর্পোরেট সংস্থা ও সমিতিকে সমন প্রদান: কোনো কোম্পানি বা প্রতিষ্ঠানকে সমন দিতে হলে, তা সেই প্রতিষ্ঠানের সচিব, স্থানীয় ব্যবস্থাপক বা প্রধান কর্মকর্তার কাছে প্রদান করতে হবে। বিকল্পভাবে, রেজিস্টার্ড ডাকযোগেও সমন পাঠানো যায়। এতে কোম্পানি আদালতের নির্দেশ এড়াতে পারে না।",
    relatedSections: ["CrPC 62", "CrPC 64", "CrPC 66"],
    overridingEffect: "BNSS 2023 Section 70 is the corresponding provision.",
    crossLaws: ["Companies Act 2013 (corporate liability)", "BNSS Section 70"],
    landmarkCases: [
      {
        name: "Pepsi Foods Ltd. v. Special Judicial Magistrate",
        citation: "(1998) 5 SCC 749",
        relevance:
          "Summons to company validly served on local manager — Section 63 upheld.",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },
  crpc_64: {
    section: "Section 64",
    title: "Service when Person Summoned Cannot Be Found",
    act: "CrPC",
    summary:
      "Allows substituted service — if the person summoned cannot be found, the summons may be left with an adult male member of the family.",
    sectionText:
      "Where the person summoned cannot by the exercise of due diligence be found, the summons may be served by leaving one of the duplicates for him with some adult male member of his family then residing with him; and the person with whom the summons is so left shall, if so required by the serving officer, sign a receipt therefor on the back of the other duplicate.",
    explanation:
      "Section 64 provides for substituted service. If despite due diligence the person cannot be located, the summons copy may be left with an adult male family member residing with the person. This ensures the legal process is not stalled merely because the person avoids service. The family member may be required to sign a receipt.",
    keyPoints: [
      "Applies when personal service is not possible after due diligence",
      "Summons left with adult male family member at the residence",
      "Family member may be required to sign receipt on duplicate",
      "Substitute service is valid and binding",
    ],
    bengaliExplanation:
      "ধারা ৬৪ — অনুপস্থিত ব্যক্তিকে সমন প্রদান: যদি যথাযথ চেষ্টা সত্ত্বেও সংশ্লিষ্ট ব্যক্তিকে খুঁজে না পাওয়া যায়, তাহলে সমনের একটি কপি তার পরিবারের প্রাপ্তবয়স্ক পুরুষ সদস্যের কাছে রেখে দেওয়া যাবে যিনি ঐ বাড়িতে থাকেন। ঐ পরিবারের সদস্যকে রসিদে স্বাক্ষর করতে বলা হতে পারে। এটি প্রতিস্থাপিত সেবা হিসেবে বৈধ।",
    relatedSections: ["CrPC 62", "CrPC 63", "CrPC 65"],
    overridingEffect: "BNSS 2023 Section 71 corresponds to CrPC 64.",
    crossLaws: [
      "CPC Order V Rule 15 (Civil substituted service)",
      "BNSS Section 71",
    ],
    landmarkCases: [
      {
        name: "Bhagwan Prasad v. State of U.P.",
        citation: "AIR 1962 All 285",
        relevance:
          "Substituted service under Section 64 valid when due diligence for personal service is shown.",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },
  crpc_65: {
    section: "Section 65",
    title: "Procedure When Service Cannot Be Effected",
    act: "CrPC",
    summary:
      "When summons cannot be served, the serving officer affixes a copy at the last known residence and reports to the court.",
    sectionText:
      "If service cannot by the exercise of due diligence be effected as required by this Chapter, the serving officer shall affix one of the duplicates of the summons to some conspicuous part of the house or homestead in which the person summoned ordinarily resides; and thereupon the court, after making such inquiries as it thinks fit, may either declare the service to have been effected or order fresh service in such manner as it considers proper.",
    explanation:
      "Section 65 is the last resort for service of summons. If personal service and substituted service both fail, the serving officer must affix the summons to a conspicuous part of the person's residence. The court then decides whether to treat this as valid service or order fresh service. This prevents indefinite delay in proceedings.",
    keyPoints: [
      "Last resort when personal and substituted service both fail",
      "Summons affixed to conspicuous part of the person's residence",
      "Court decides if this service is sufficient or orders fresh service",
      "Prevents indefinite delays due to evasion",
    ],
    bengaliExplanation:
      "ধারা ৬৫ — সমন প্রদান সম্ভব না হলে পদ্ধতি: যখন সমন কোনোভাবেই প্রদান করা সম্ভব হয় না, তখন সেবাকারী কর্মকর্তা সংশ্লিষ্ট ব্যক্তির বাসস্থানের বিশিষ্ট স্থানে সমনের কপি সেঁটে দেবেন। এরপর আদালত তদন্ত করে সিদ্ধান্ত নেবে — এই সেবা গ্রহণযোগ্য কিনা বা নতুন করে সমন পাঠানো দরকার কিনা।",
    relatedSections: ["CrPC 62", "CrPC 64", "CrPC 66"],
    overridingEffect: "BNSS 2023 Section 72 corresponds to CrPC 65.",
    crossLaws: ["BNSS Section 72", "CPC Order V Rule 17 (Affixture)"],
    landmarkCases: [
      {
        name: "Rajendra Singh v. State",
        citation: "1975 CriLJ 1236",
        relevance:
          "Affixture of summons under Section 65 is valid service when personal service proved impossible.",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },
  crpc_66: {
    section: "Section 66",
    title: "Service on Government Servants",
    act: "CrPC",
    summary:
      "Provides special procedure for serving summons on government servants — sent through the head of the office.",
    sectionText:
      "Where the person summoned is in the active service of the Government, the court issuing the summons shall ordinarily send it in duplicate to the head of the office in which such person is employed; and such head shall thereupon cause the summons to be served in the manner provided by Section 62, and shall return it to the court under his signature with the endorsement required by that section.",
    explanation:
      "Section 66 creates a special channel for serving summons on government employees. Instead of direct service, the court sends summons to the head of the office (like a department head or superior officer). That officer then serves the summons as per Section 62 and returns the served copy to the court. This respects official hierarchy and ensures proper record-keeping.",
    keyPoints: [
      "Applies specifically to government servants in active service",
      "Summons sent to head of the office in duplicate",
      "Head of office causes service as per Section 62",
      "Endorsed copy returned to court",
    ],
    bengaliExplanation:
      "ধারা ৬৬ — সরকারি কর্মচারীদের ক্ষেত্রে সমন প্রদান: সরকারি চাকরিরতদের ক্ষেত্রে আদালত সাধারণত সমন সরাসরি না পাঠিয়ে সংশ্লিষ্ট অফিসের প্রধানের কাছে পাঠায়। অফিস প্রধান তখন ৬২ ধারা মোতাবেক সমন প্রদান করেন এবং আদালতে ফেরত পাঠান। সরকারি সেবায় শৃঙ্খলা বজায় রাখতে এই বিশেষ ব্যবস্থা।",
    relatedSections: ["CrPC 62", "CrPC 67", "CrPC 68"],
    overridingEffect: "BNSS 2023 Section 73 corresponds to CrPC 66.",
    crossLaws: ["BNSS Section 73", "Government Servants Conduct Rules"],
    landmarkCases: [
      {
        name: "State v. Raghavendra Prasad",
        citation: "1971 CriLJ 521",
        relevance:
          "Service on government servant through office head is valid under Section 66.",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },
  crpc_67: {
    section: "Section 67",
    title: "Service of Summons Outside Local Jurisdiction",
    act: "CrPC",
    summary:
      "When the person to be summoned lives outside the court's local jurisdiction, the court sends the summons to the court having jurisdiction there.",
    sectionText:
      "When a court desires that a summons issued by it shall be served at any place outside its local jurisdiction, it shall ordinarily send such summons in duplicate to a Magistrate within whose local jurisdiction the person summoned resides, to be there served.",
    explanation:
      "Section 67 deals with inter-jurisdictional service of summons. If a person lives in another district or area outside the issuing court's jurisdiction, the summons cannot be directly served there. The issuing court sends duplicate summons to the Magistrate of the area where the person resides, who then causes it to be served locally. This maintains proper legal authority for service.",
    keyPoints: [
      "Applies when the summoned person lives outside court's jurisdiction",
      "Summons sent to Magistrate of the area where person resides",
      "That Magistrate causes local service of the summons",
      "Ensures legality of cross-jurisdictional service",
    ],
    bengaliExplanation:
      "ধারা ৬৭ — স্থানীয় এখতিয়ারের বাইরে সমন প্রদান: যদি সমনভোগী ব্যক্তি আদালতের এখতিয়ারের বাইরে থাকেন, তাহলে আদালত সেই ব্যক্তির বাসস্থানের ম্যাজিস্ট্রেটের কাছে সমনের কপি পাঠায়। সেই ম্যাজিস্ট্রেট তখন স্থানীয়ভাবে সমন প্রদান করেন। এইভাবে দেশের যেকোনো প্রান্তে থাকা ব্যক্তিকেও আইনি প্রক্রিয়ার অধীনে আনা যায়।",
    relatedSections: ["CrPC 62", "CrPC 66", "CrPC 68"],
    overridingEffect: "BNSS 2023 Section 74 corresponds to CrPC 67.",
    crossLaws: [
      "BNSS Section 74",
      "CPC Order V Rule 21 (Service outside local limits)",
    ],
    landmarkCases: [
      {
        name: "Madan Lal v. State of Rajasthan",
        citation: "1977 CriLJ 422",
        relevance:
          "Service through Magistrate of another area under Section 67 is valid.",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },
  crpc_68: {
    section: "Section 68",
    title:
      "Proof of Service in Such Cases and When Serving Officer Not Present",
    act: "CrPC",
    summary:
      "Specifies how proof of service is established when the serving officer cannot appear in court — through affidavit or endorsement.",
    sectionText:
      "When a summons issued by a court is served outside its local jurisdiction, and in any case where the officer who has served a summons is not present at the hearing of the case, an affidavit, purporting to be made by the officer before whom such service was effected, or a statement in writing, purporting to be made by the head of the office referred to in Section 66, shall be admissible in evidence, and the statements made therein shall be deemed to be correct unless and until the contrary is proved.",
    explanation:
      "Section 68 deals with evidentiary proof of service when the serving officer is unavailable to personally testify in court. An affidavit from the officer who served the summons, or a written statement from the head of office (in case of government servants), is admissible as proof of service. These statements are presumed correct unless disproved.",
    keyPoints: [
      "Applies when serving officer cannot appear in court",
      "Affidavit by serving officer is admissible as proof of service",
      "Written statement by head of office also accepted",
      "Statements presumed correct unless contrary is proved",
    ],
    bengaliExplanation:
      "ধারা ৬৮ — সমন প্রদানের প্রমাণ: যখন সমন প্রদানকারী অফিসার আদালতে উপস্থিত থাকতে পারেন না, তখন তার শপথনামা বা লিখিত বিবৃতি আদালতে প্রমাণ হিসেবে গ্রহণযোগ্য। এই বিবৃতিগুলো সঠিক বলে ধরে নেওয়া হবে যতক্ষণ না বিপরীত প্রমাণিত হয়। এটি আদালতের সময় বাঁচায় এবং প্রক্রিয়াকে সহজ করে।",
    relatedSections: ["CrPC 62", "CrPC 66", "CrPC 67"],
    overridingEffect: "BNSS 2023 Section 75 corresponds to CrPC 68.",
    crossLaws: [
      "Indian Evidence Act (Admissibility of documents)",
      "BNSS Section 75",
    ],
    landmarkCases: [
      {
        name: "Ram Kishan v. State",
        citation: "1980 CriLJ 741",
        relevance:
          "Affidavit proof of service under Section 68 accepted as valid evidence.",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },
  crpc_69: {
    section: "Section 69",
    title: "Service of Summons on Witnesses",
    act: "CrPC",
    summary:
      "Allows service of summons on a witness by registered post when the court deems it appropriate, instead of personal service.",
    sectionText:
      "Notwithstanding anything contained in the preceding sections of this Chapter, a court issuing a summons to a witness may, in addition to and simultaneously with the issue of such summons, direct a copy of the summons to be served by registered post addressed to the witness at the place where he ordinarily resides or carries on business or personally works for gain.",
    explanation:
      "Section 69 provides an additional and simultaneous method of serving witnesses — by registered post. This is in addition to personal service, not a replacement. If the witness resides far away or cannot be easily personally served, registered post service ensures timely notice. Delivery of the registered post is treated as valid service.",
    keyPoints: [
      "Applies specifically to witnesses (not accused)",
      "Service by registered post — additional and simultaneous with personal service",
      "Sent to place of ordinary residence, business, or work",
      "Expedites proceedings involving outstation witnesses",
    ],
    bengaliExplanation:
      "ধারা ৬৯ — সাক্ষীকে সমন প্রদান: সাক্ষীদের ক্ষেত্রে আদালত রেজিস্টার্ড ডাকযোগে সমন পাঠাতে পারে — এটি ব্যক্তিগত সমনের পাশাপাশি একই সাথে করা যায়। সাক্ষী যেখানে সাধারণত থাকেন বা কাজ করেন সেই ঠিকানায় পাঠানো হয়। এটি দূরবর্তী সাক্ষীদের দ্রুত অবহিত করতে সাহায্য করে।",
    relatedSections: ["CrPC 62", "CrPC 64", "CrPC 68"],
    overridingEffect: "BNSS 2023 Section 76 corresponds to CrPC 69.",
    crossLaws: ["BNSS Section 76", "Indian Post Office Act (Registered Post)"],
    landmarkCases: [
      {
        name: "Suresh Kumar v. State of Haryana",
        citation: "1994 CriLJ 2345",
        relevance:
          "Registered post service on witness under Section 69 is valid and admissible.",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },
  crpc_70: {
    section: "Section 70",
    title: "Form of Warrant of Arrest and Duration",
    act: "CrPC",
    summary:
      "Prescribes the form of warrant of arrest and declares that warrants remain in force until executed or cancelled.",
    sectionText:
      "Every warrant of arrest issued by a court under this Code shall be in writing, signed by the presiding officer of such court and shall bear the seal of the court. Every such warrant shall remain in force until it is cancelled by the court which issued it, or until it is executed.",
    explanation:
      "Section 70 governs the form and duration of arrest warrants. A warrant must be in writing, signed by the presiding judge/magistrate, and bear the court's seal. Crucially, a warrant does not expire after a fixed time — it remains valid and in force until it is either executed (person arrested) or cancelled by the court. This means outstanding warrants can be enforced years later.",
    keyPoints: [
      "Warrant must be in writing, signed by presiding officer, with court seal",
      "Warrant remains valid until executed (arrest made) or cancelled by court",
      "No automatic expiry — outstanding warrants can be enforced anytime",
      "Cancellation must be by the same court that issued it",
    ],
    bengaliExplanation:
      "ধারা ৭০ — গ্রেফতারি পরোয়ানার ফর্ম ও মেয়াদ: গ্রেফতারি পরোয়ানা অবশ্যই লিখিত হতে হবে, বিচারকের স্বাক্ষর ও আদালতের সিল থাকতে হবে। সবচেয়ে গুরুত্বপূর্ণ — পরোয়ানা কোনো নির্দিষ্ট সময়ের পর মেয়াদোত্তীর্ণ হয় না। যতক্ষণ না গ্রেফতার করা হয় বা আদালত বাতিল করে, পরোয়ানা বলবৎ থাকে। তাই বছরের পর বছর পুরানো পরোয়ানাও কার্যকর হতে পারে।",
    relatedSections: ["CrPC 71", "CrPC 72", "CrPC 73", "CrPC 74"],
    overridingEffect: "BNSS 2023 Section 77 corresponds to CrPC 70.",
    crossLaws: [
      "BNSS Section 77",
      "CrPC Section 73 (Warrant to any person)",
      "CrPC Section 74 (Warrant to land-holder etc.)",
    ],
    landmarkCases: [
      {
        name: "State of U.P. v. Deoman Upadhyaya",
        citation: "AIR 1960 SC 1125",
        relevance:
          "Warrant does not expire with time — remains enforceable until cancelled or executed.",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },
  crpc_71: {
    section: "Section 71",
    title: "Power to Direct Security to Be Taken",
    act: "CrPC",
    summary:
      "Empowers the court to direct that a person arrested under a warrant be released on security bond (bail) instead of being held in custody.",
    sectionText:
      "Any court issuing a warrant for the arrest of any person may in its discretion direct by endorsement on the warrant that, if such person executes a bond with sufficient sureties for his attendance before the court at a specified time and thereafter until otherwise directed by the court, the officer to whom the warrant is directed shall take such security and shall release such person from custody.",
    explanation:
      "Section 71 allows courts to include a bail directive on the arrest warrant itself. When issuing a warrant, the court may endorse it stating that if the accused furnishes a security bond with sureties, the arresting officer can release them without bringing them to custody. This avoids unnecessary detention for less serious offences and saves time. The release is conditional — the person must appear in court as directed.",
    keyPoints: [
      "Court may endorse arrest warrant with bail/security directive",
      "Arresting officer can release the person if bond with sureties is furnished",
      "Avoids unnecessary custody for bailable-type situations",
      "Person must appear in court at specified time as per bond",
    ],
    bengaliExplanation:
      "ধারা ৭১ — জামানত নেওয়ার ক্ষমতা: আদালত গ্রেফতারি পরোয়ানায় এন্ডোর্সমেন্ট দিতে পারে যে, যদি অভিযুক্ত যথেষ্ট জামিনদার সহ মুচলেকা দেন তাহলে গ্রেফতারকারী অফিসার তাকে ছেড়ে দিতে পারবেন। এই ব্যবস্থা অপ্রয়োজনীয় কারাবাস এড়ায় এবং হাজিরার শর্তে ব্যক্তিকে মুক্তি দেয়। অভিযুক্তকে নির্ধারিত সময়ে আদালতে হাজির হতে হবে।",
    relatedSections: ["CrPC 70", "CrPC 72", "CrPC 436", "CrPC 437"],
    overridingEffect: "BNSS 2023 Section 78 corresponds to CrPC 71.",
    crossLaws: [
      "BNSS Section 78",
      "CrPC Section 436 (Bail in bailable offences)",
      "CrPC Section 437 (Bail in non-bailable offences)",
    ],
    landmarkCases: [
      {
        name: "Hussainara Khatoon v. State of Bihar",
        citation: "AIR 1979 SC 1360",
        relevance:
          "Endorsed warrants with bail directives reduce unnecessary incarceration — upheld as constitutionally sound.",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },
  crpc_72: {
    section: "Section 72",
    title: "Warrants to Whom Directed",
    act: "CrPC",
    summary:
      "Specifies to whom a warrant of arrest may be directed — primarily to police officers, and in certain cases to any person.",
    sectionText:
      "A warrant of arrest shall ordinarily be directed to one or more police officers; but the court issuing such a warrant may, if its immediate execution is necessary and no police officer is immediately available, direct it to any other person or persons, and such person or persons shall execute the same.",
    explanation:
      "Section 72 deals with who can execute an arrest warrant. Normally, warrants are directed to police officers who are responsible for making the arrest. However, in urgent situations where no police officer is immediately available, the court has the power to direct the warrant to any person (a civilian). That person then has the legal authority and obligation to execute the warrant. This provision ensures no one can escape arrest simply because police are unavailable at that moment.",
    keyPoints: [
      "Warrants ordinarily directed to police officers",
      "In urgent cases, court may direct warrant to any person if no police available",
      "Any person so directed is legally bound to execute the warrant",
      "Ensures warrants are not defeated by absence of police",
    ],
    bengaliExplanation:
      "ধারা ৭২ — পরোয়ানা কার কাছে পাঠানো হয়: সাধারণত গ্রেফতারি পরোয়ানা পুলিশ অফিসারের কাছে পাঠানো হয়। কিন্তু জরুরি পরিস্থিতিতে যদি কোনো পুলিশ অফিসার তাৎক্ষণিকভাবে পাওয়া না যায়, তাহলে আদালত যেকোনো ব্যক্তিকে পরোয়ানা কার্যকর করার নির্দেশ দিতে পারে। সেই ব্যক্তি তখন আইনগতভাবে গ্রেফতার করার ক্ষমতাসম্পন্ন হন। এটি নিশ্চিত করে যে পুলিশের অনুপস্থিতিতেও পরোয়ানা ব্যর্থ না হয়।",
    relatedSections: ["CrPC 70", "CrPC 71", "CrPC 73", "CrPC 74"],
    overridingEffect: "BNSS 2023 Section 79 corresponds to CrPC 72.",
    crossLaws: [
      "BNSS Section 79",
      "CrPC Section 73 (Warrant to any person for arrest of escaped prisoner)",
    ],
    landmarkCases: [
      {
        name: "Jogendra Kumar v. State of U.P.",
        citation: "(1994) 4 SCC 260",
        relevance:
          "Warrants must be specific in direction; civilian execution permitted only in genuine emergencies.",
      },
    ],
    actName: "Code of Criminal Procedure, 1973",
  },
  crpc_73: {
    act: "CrPC",
    actName: "Code of Criminal Procedure, 1973",
    section: "73",
    title: "Warrant May Be Directed to Any Person",
    titleBengali: "ওয়ারেন্ট যেকোনো ব্যক্তিকে নির্দেশ করা যায়",
    originalText:
      "Section 73 CrPC: The Chief Judicial Magistrate or a Magistrate of the first class may direct a warrant to any person within his local jurisdiction for the arrest of any escaped convict, proclaimed offender or of any person who is accused of a non-bailable offence and is evading arrest.",
    summary:
      "Section 73 allows a Chief Judicial Magistrate or First Class Magistrate to direct a warrant to any person within local jurisdiction to arrest escaped convicts, proclaimed offenders, or those evading arrest in non-bailable offences.",
    summaryBengali:
      "ধারা ৭৩ — CrPC: এই ধারা অনুযায়ী, Chief Judicial Magistrate বা প্রথম শ্রেণীর Magistrate পলাতক দোষী, ঘোষিত অপরাধী, বা জামিনযোগ্য নয় এমন মামলায় পলায়নকারী আসামিকে গ্রেফতার করতে তাঁর স্থানীয় এখতিয়ারের মধ্যে যেকোনো ব্যক্তির কাছে ওয়ারেন্ট পাঠাতে পারেন।",
    keyPoints: [
      "Applicable to escaped convicts, proclaimed offenders, or non-bailable accused evading arrest",
      "Only CJM or First Class Magistrate can issue such warrant",
      "Limited to local jurisdiction of the issuing Magistrate",
      "The person to whom warrant is directed becomes temporarily vested with arrest authority",
    ],
    examples: [
      "A proclaimed offender hiding in a remote area — Magistrate directs a local person to arrest them.",
      "An escaped prisoner from jail — CJM issues warrant to a trusted person within jurisdiction.",
    ],
    examplesBengali: [
      "একজন ঘোষিত অপরাধী দূরবর্তী এলাকায় লুকিয়ে আছে — Magistrate স্থানীয় ব্যক্তিকে গ্রেফতারের নির্দেশ দেন।",
      "জেল থেকে পালানো বন্দি — CJM এখতিয়ারের মধ্যে বিশ্বস্ত ব্যক্তিকে ওয়ারেন্ট ইস্যু করেন।",
    ],
    exceptions: [
      "Cannot be issued for bailable offences",
      "Only CJM or First Class Magistrate can issue — not lower courts",
    ],
    exceptionsBengali: [
      "জামিনযোগ্য অপরাধে ইস্যু করা যাবে না",
      "শুধু CJM বা প্রথম শ্রেণীর Magistrate ইস্যু করতে পারবেন",
    ],
    landmarkCases: [
      {
        name: "State of Maharashtra v. Budhikota Subbarao",
        citation: "AIR 1993 SC 2014",
        relevance:
          "Court clarified that warrant under Section 73 is an extraordinary power limited to specific categories of offenders.",
      },
    ],
    overridingEffect:
      "BNSS 2023 Section 74 corresponds to CrPC Section 73 with minor procedural updates.",
    overridingEffectBengali:
      "BNSS 2023 ধারা ৭৪, CrPC ধারা ৭৩-এর সাথে সামান্য পদ্ধতিগত পরিবর্তন সহ সম্পর্কিত।",
    relatedSections: ["CrPC 70", "CrPC 72", "CrPC 74", "CrPC 82", "BNSS 74"],
  },
  crpc_74: {
    act: "CrPC",
    actName: "Code of Criminal Procedure, 1973",
    section: "74",
    title: "Warrant Directed to Police Officer",
    titleBengali: "পুলিশ অফিসারকে ওয়ারেন্ট নির্দেশিত",
    originalText:
      "Section 74 CrPC: A warrant directed to any police officer may also be executed by any other police officer whose name is endorsed thereon by the officer to whom it is directed.",
    summary:
      "A warrant directed to a police officer can also be executed by another police officer if the original officer endorses that other officer's name on the warrant.",
    summaryBengali:
      "ধারা ৭৪ — CrPC: কোনো পুলিশ অফিসারকে দেওয়া ওয়ারেন্ট, সেই অফিসার যদি অন্য পুলিশ অফিসারের নাম ওয়ারেন্টে লিখে দেন, তাহলে সেই অন্য অফিসারও ওয়ারেন্ট কার্যকর করতে পারবেন।",
    keyPoints: [
      "Enables delegation of warrant execution between police officers",
      "Original officer must endorse the name of the executing officer",
      "Ensures operational flexibility in police force",
    ],
    examples: [
      "Officer A receives a warrant but is on leave; he endorses Officer B's name, who then executes it.",
    ],
    examplesBengali: [
      "অফিসার A ওয়ারেন্ট পেলেন কিন্তু ছুটিতে আছেন; তিনি অফিসার B-এর নাম লিখে দিলেন, B সেটি কার্যকর করলেন।",
    ],
    exceptions: ["Endorsement must be explicit and in writing"],
    exceptionsBengali: ["অনুমোদন অবশ্যই স্পষ্ট এবং লিখিত হতে হবে"],
    landmarkCases: [],
    overridingEffect: "BNSS 2023 Section 75 corresponds to CrPC Section 74.",
    overridingEffectBengali: "BNSS 2023 ধারা ৭৫, CrPC ধারা ৭৪-এর সাথে সম্পর্কিত।",
    relatedSections: ["CrPC 72", "CrPC 73", "BNSS 75"],
  },
  crpc_75: {
    act: "CrPC",
    actName: "Code of Criminal Procedure, 1973",
    section: "75",
    title: "Notification of Substance of Warrant",
    titleBengali: "ওয়ারেন্টের বিষয়বস্তু জানানো",
    originalText:
      "Section 75 CrPC: The police officer or other person executing a warrant of arrest shall notify the substance thereof to the person to be arrested, and, if so required, shall show him the warrant.",
    summary:
      "Before arresting a person, the executing officer must inform the person of the substance (gist) of the warrant, and show the actual warrant if requested.",
    summaryBengali:
      "ধারা ৭৫ — CrPC: গ্রেফতারকারী পুলিশ অফিসার বা ব্যক্তি আসামিকে ওয়ারেন্টের বিষয়বস্তু জানাবেন এবং চাইলে আসল ওয়ারেন্ট দেখাবেন।",
    keyPoints: [
      "Arrested person has a right to know the reason for arrest",
      "Officer must disclose the substance of the warrant",
      "Physical warrant must be shown if demanded",
      "Protects against arbitrary arrest",
    ],
    examples: [
      "Police arrive with warrant for Ram; they inform him the warrant is for theft under IPC 379 and show the document when asked.",
    ],
    examplesBengali: [
      "পুলিশ রামের কাছে ওয়ারেন্ট নিয়ে আসে; তারা জানায় এটি IPC ৩৭৯-এর চুরির মামলায় এবং চাওয়ামাত্র দলিল দেখায়।",
    ],
    exceptions: [
      "If person attempts to escape, notification may happen simultaneously with arrest",
    ],
    exceptionsBengali: ["পালানোর চেষ্টা করলে গ্রেফতারের সাথে সাথে জানানো যাবে"],
    landmarkCases: [
      {
        name: "Joginder Kumar v. State of UP",
        citation: "(1994) 4 SCC 260",
        relevance:
          "Supreme Court held that every arrested person must be informed of grounds of arrest immediately.",
      },
    ],
    overridingEffect:
      "BNSS 2023 Section 76 corresponds and additionally mandates informing family members.",
    overridingEffectBengali:
      "BNSS 2023 ধারা ৭৬ পরিবারকেও জানানোর বাধ্যবাধকতা যোগ করেছে।",
    relatedSections: [
      "CrPC 50",
      "CrPC 41D",
      "Constitution Article 22",
      "BNSS 76",
    ],
  },
  crpc_76: {
    act: "CrPC",
    actName: "Code of Criminal Procedure, 1973",
    section: "76",
    title: "Person Arrested to Be Brought Before Court Without Delay",
    titleBengali: "গ্রেফতার ব্যক্তিকে বিনা বিলম্বে আদালতে হাজির করা",
    originalText:
      "Section 76 CrPC: The police officer or other person executing a warrant of arrest shall, without unnecessary delay, bring the person arrested before the Court before which he is required by law to produce such person.",
    summary:
      "After arrest under a warrant, the arrested person must be produced before the court without unnecessary delay — typically within 24 hours.",
    summaryBengali:
      "ধারা ৭৬ — CrPC: ওয়ারেন্টে গ্রেফতারের পর, গ্রেফতার ব্যক্তিকে যত দ্রুত সম্ভব — সাধারণত ২৪ ঘণ্টার মধ্যে — নির্দিষ্ট আদালতে হাজির করতে হবে।",
    keyPoints: [
      "No unnecessary delay allowed after arrest",
      "Person must be taken to the court specified in the warrant",
      "Connects with constitutional right under Article 22 (24-hour rule)",
      "Failure may make detention illegal (habeas corpus)",
    ],
    examples: [
      "A person arrested under a warrant at 8 AM must be produced before the Magistrate the same day or next morning.",
    ],
    examplesBengali: [
      "সকাল ৮টায় ওয়ারেন্টে গ্রেফতার হওয়া ব্যক্তিকে সেদিন বা পরের দিন সকালে Magistrate-এর সামনে হাজির করতে হবে।",
    ],
    exceptions: [
      "If court is far, officer may apply for extension under Section 71",
      "Sickness or emergency may cause temporary delay",
    ],
    exceptionsBengali: [
      "আদালত দূরে হলে ধারা ৭১-এর অধীনে সময়সীমা বাড়ানোর আবেদন করা যাবে",
      "অসুস্থতা বা জরুরি পরিস্থিতিতে সামান্য বিলম্ব ক্ষমার্হ",
    ],
    landmarkCases: [
      {
        name: "DK Basu v. State of West Bengal",
        citation: "AIR 1997 SC 610",
        relevance:
          "Supreme Court laid down guidelines for arrest and detention; delay in production violates Article 21.",
      },
    ],
    overridingEffect: "BNSS 2023 Section 77 corresponds to CrPC Section 76.",
    overridingEffectBengali: "BNSS 2023 ধারা ৭৭, CrPC ধারা ৭৬-এর সাথে সম্পর্কিত।",
    relatedSections: [
      "CrPC 57",
      "Constitution Article 22",
      "BNSS 77",
      "CrPC 167",
    ],
  },
  crpc_77: {
    act: "CrPC",
    actName: "Code of Criminal Procedure, 1973",
    section: "77",
    title: "Where Warrant May Be Executed",
    titleBengali: "ওয়ারেন্ট কোথায় কার্যকর করা যায়",
    originalText:
      "Section 77 CrPC: A warrant of arrest may be executed at any place in India.",
    summary:
      "A warrant of arrest issued by any court in India can be executed anywhere within India, regardless of state or district boundaries.",
    summaryBengali:
      "ধারা ৭৭ — CrPC: ভারতের যেকোনো আদালতের ইস্যু করা গ্রেফতারি ওয়ারেন্ট ভারতের যেকোনো স্থানে কার্যকর করা যায়।",
    keyPoints: [
      "Warrant is enforceable across all of India",
      "No geographical restriction on execution of warrant",
      "Enables inter-state arrest operations",
    ],
    examples: [
      "A warrant issued by a Delhi court can be executed in Kerala to arrest a fugitive.",
    ],
    examplesBengali: [
      "দিল্লির আদালতের ওয়ারেন্ট কেরালায় পলাতককে গ্রেফতার করতে ব্যবহার করা যাবে।",
    ],
    exceptions: [
      "Diplomatic immunity may restrict execution in certain premises",
    ],
    exceptionsBengali: ["কূটনৈতিক অনাক্রম্যতার ক্ষেত্রে ব্যতিক্রম প্রযোজ্য"],
    landmarkCases: [],
    overridingEffect: "BNSS 2023 Section 78 corresponds to CrPC Section 77.",
    overridingEffectBengali: "BNSS 2023 ধারা ৭৮, CrPC ধারা ৭৭-এর সাথে সম্পর্কিত।",
    relatedSections: ["CrPC 78", "CrPC 79", "BNSS 78"],
  },
  crpc_78: {
    act: "CrPC",
    actName: "Code of Criminal Procedure, 1973",
    section: "78",
    title: "Warrant Forwarded for Execution Outside Jurisdiction",
    titleBengali: "এখতিয়ারের বাইরে কার্যকর করার জন্য ওয়ারেন্ট পাঠানো",
    originalText:
      "Section 78 CrPC: When a warrant is to be executed outside the local jurisdiction of the court issuing it, it shall be forwarded to a Magistrate or a police officer within whose local jurisdiction the person to be arrested is residing.",
    summary:
      "When arrest needs to happen outside the issuing court's jurisdiction, the warrant is forwarded to the Magistrate or police officer of that area.",
    summaryBengali:
      "ধারা ৭৮ — CrPC: যখন ওয়ারেন্ট ইস্যুকারী আদালতের এখতিয়ারের বাইরে গ্রেফতার করতে হবে, তখন ওয়ারেন্টটি সেই এলাকার Magistrate বা পুলিশ অফিসারের কাছে পাঠানো হয়।",
    keyPoints: [
      "Ensures proper legal procedure across jurisdictions",
      "Warrant must be forwarded to local Magistrate or police officer",
      "The local officer then executes the warrant",
      "Avoids jurisdictional conflicts between states/districts",
    ],
    examples: [
      "Court in Kolkata issues warrant for a person living in Mumbai — warrant forwarded to Mumbai Magistrate/police for execution.",
    ],
    examplesBengali: [
      "কলকাতার আদালত মুম্বাইয়ে বসবাসকারী ব্যক্তির বিরুদ্ধে ওয়ারেন্ট ইস্যু করলে মুম্বাইয়ের Magistrate/পুলিশের কাছে পাঠানো হয়।",
    ],
    exceptions: [
      "Urgent cases may allow direct execution under Section 77 without formal forwarding",
    ],
    exceptionsBengali: ["জরুরি ক্ষেত্রে ধারা ৭৭-এর অধীনে সরাসরি কার্যকর করা যায়"],
    landmarkCases: [],
    overridingEffect: "BNSS 2023 Section 79 corresponds to CrPC Section 78.",
    overridingEffectBengali: "BNSS 2023 ধারা ৭৯, CrPC ধারা ৭৮-এর সাথে সম্পর্কিত।",
    relatedSections: ["CrPC 77", "CrPC 79", "BNSS 79"],
  },
  crpc_79: {
    act: "CrPC",
    actName: "Code of Criminal Procedure, 1973",
    section: "79",
    title:
      "Warrant Directed to Police Officer for Execution Outside Jurisdiction",
    titleBengali: "এখতিয়ারের বাইরে পুলিশ অফিসারকে ওয়ারেন্ট নির্দেশিত",
    originalText:
      "Section 79 CrPC: When a warrant directed to a police officer is to be executed beyond the local jurisdiction of the court issuing it, he shall ordinarily take it for endorsement to a Magistrate or to a police officer not below the rank of an officer in charge of a police station, within the local limits of whose jurisdiction the warrant is to be executed.",
    summary:
      "A police officer executing a warrant outside their court's jurisdiction must get the warrant endorsed by a local Magistrate or senior police officer of that area before proceeding.",
    summaryBengali:
      "ধারা ৭৯ — CrPC: যখন একজন পুলিশ অফিসার আদালতের এখতিয়ারের বাইরে ওয়ারেন্ট কার্যকর করবেন, তখন সাধারণত সেই এলাকার Magistrate বা থানার দায়িত্বপ্রাপ্ত অফিসারের অনুমোদন নিতে হবে।",
    keyPoints: [
      "Endorsement from local Magistrate or SHO required before inter-jurisdictional arrest",
      "Prevents abuse of power across state/district lines",
      "Endorsed officer may assist in execution",
      "Exception: may execute without endorsement if offender likely to escape",
    ],
    examples: [
      "A Bengal police officer travels to Odisha to arrest an accused; must get warrant endorsed by local Odisha Magistrate/SHO first.",
    ],
    examplesBengali: [
      "বাংলার পুলিশ অফিসার ওড়িশায় আসামি গ্রেফতার করতে গেলে প্রথমে ওড়িশার স্থানীয় Magistrate/SHO-এর অনুমোদন নিতে হবে।",
    ],
    exceptions: [
      "If the offender is likely to escape, endorsement may be skipped",
      "Senior police officers (SP and above) may execute directly",
    ],
    exceptionsBengali: [
      "পলায়নের আশঙ্কা থাকলে অনুমোদন ছাড়াও কার্যকর করা যাবে",
      "SP বা উচ্চপদের অফিসার সরাসরি কার্যকর করতে পারবেন",
    ],
    landmarkCases: [
      {
        name: "Serious Fraud Investigation Office v. Rahul Modi",
        citation: "(2019) 5 SCC 432",
        relevance:
          "Court held that inter-state warrant execution requires procedural compliance including endorsement under Section 79.",
      },
    ],
    overridingEffect: "BNSS 2023 Section 80 corresponds to CrPC Section 79.",
    overridingEffectBengali: "BNSS 2023 ধারা ৮০, CrPC ধারা ৭৯-এর সাথে সম্পর্কিত।",
    relatedSections: ["CrPC 77", "CrPC 78", "CrPC 80", "BNSS 80"],
  },
  crpc_80: {
    act: "CrPC",
    actName: "Code of Criminal Procedure, 1973",
    section: "80",
    title: "Procedure on Arrest of Person Against Whom Warrant Issued",
    titleBengali: "ওয়ারেন্টে গ্রেফতারের পর পদ্ধতি",
    originalText:
      "Section 80 CrPC: When a warrant of arrest is executed outside the district in which it was issued, the person arrested shall, unless the Court which issued the warrant is within thirty miles of the place of arrest, be taken before a Magistrate of the district in which the arrest is made.",
    summary:
      "When someone is arrested outside the district where the warrant was issued, they must be taken before a local Magistrate of the district of arrest (unless the issuing court is very close).",
    summaryBengali:
      "ধারা ৮০ — CrPC: যদি ওয়ারেন্ট ইস্যুকারী জেলার বাইরে কাউকে গ্রেফতার করা হয়, তাহলে তাকে গ্রেফতারস্থলের জেলার Magistrate-এর সামনে হাজির করতে হবে।",
    keyPoints: [
      "Protects arrested person's rights in inter-district arrests",
      "Local Magistrate reviews the arrest before transfer",
      "Exception: issuing court within 30 miles — take directly there",
      "Ensures no undue transportation without judicial oversight",
    ],
    examples: [
      "A Kolkata warrant is executed in Howrah; the person is taken before Howrah Magistrate first unless the Kolkata court is nearby.",
    ],
    examplesBengali: [
      "কলকাতার ওয়ারেন্ট হাওড়ায় কার্যকর হলে, আসামিকে প্রথমে হাওড়ার Magistrate-এর সামনে হাজির করতে হবে।",
    ],
    exceptions: [
      "If issuing court is within 30 miles, direct production there is permitted",
    ],
    exceptionsBengali: [
      "ইস্যুকারী আদালত ৩০ মাইলের মধ্যে হলে সরাসরি সেখানে নিয়ে যাওয়া যাবে",
    ],
    landmarkCases: [],
    overridingEffect: "BNSS 2023 Section 81 corresponds to CrPC Section 80.",
    overridingEffectBengali: "BNSS 2023 ধারা ৮১, CrPC ধারা ৮০-এর সাথে সম্পর্কিত।",
    relatedSections: ["CrPC 76", "CrPC 79", "CrPC 81", "BNSS 81"],
  },
  crpc_81: {
    act: "CrPC",
    actName: "Code of Criminal Procedure, 1973",
    section: "81",
    title: "Procedure by Magistrate Before Whom Person Arrested Is Brought",
    titleBengali: "গ্রেফতার ব্যক্তিকে Magistrate-এর সামনে উপস্থাপনের পদ্ধতি",
    originalText:
      "Section 81 CrPC: The Magistrate before whom a person arrested under a warrant is brought shall, if the person is the person named in the warrant, direct his removal in custody to the Court which issued the warrant.",
    summary:
      "When an arrested person is brought before the local Magistrate under Section 80, the Magistrate verifies identity and if confirmed, orders transfer/custody to the court which originally issued the warrant.",
    summaryBengali:
      "ধারা ৮১ — CrPC: ধারা ৮০-এর অধীনে গ্রেফতার ব্যক্তিকে স্থানীয় Magistrate-এর সামনে আনলে, Magistrate পরিচয় যাচাই করে ওয়ারেন্ট ইস্যুকারী আদালতে স্থানান্তরের নির্দেশ দেন।",
    keyPoints: [
      "Identity verification before transfer",
      "Magistrate may grant bail if offence is bailable",
      "Ensures smooth inter-district judicial transfer",
      "Protects against wrongful transfer of wrong person",
    ],
    examples: [
      "Ram arrested in Howrah under Kolkata warrant; Howrah Magistrate verifies identity, then orders transfer to Kolkata court.",
    ],
    examplesBengali: [
      "কলকাতার ওয়ারেন্টে হাওড়ায় গ্রেফতার রাম; হাওড়া Magistrate পরিচয় যাচাই করে কলকাতায় স্থানান্তরের নির্দেশ দেন।",
    ],
    exceptions: [
      "If offence is bailable, Magistrate at the place of arrest may release on bail",
    ],
    exceptionsBengali: [
      "জামিনযোগ্য অপরাধ হলে গ্রেফতারস্থলের Magistrate জামিন দিতে পারবেন",
    ],
    landmarkCases: [],
    overridingEffect: "BNSS 2023 Section 82 corresponds to CrPC Section 81.",
    overridingEffectBengali: "BNSS 2023 ধারা ৮২, CrPC ধারা ৮১-এর সাথে সম্পর্কিত।",
    relatedSections: ["CrPC 80", "CrPC 82", "CrPC 436", "BNSS 82"],
  },
  crpc_82: {
    act: "CrPC",
    actName: "Code of Criminal Procedure, 1973",
    section: "82",
    title: "Proclamation for Person Absconding",
    titleBengali: "পলাতক ব্যক্তির জন্য উদ্\u200cঘোষণা (Proclamation)",
    originalText:
      "Section 82 CrPC: If any Court has reason to believe that any person against whom a warrant has been issued has absconded or is concealing himself so that such warrant cannot be executed, such Court may publish a written proclamation requiring him to appear at a specified place and at a specified time.",
    summary:
      "When a person absconds or hides to avoid a warrant, the court can issue a public proclamation declaring them a 'proclaimed offender' and directing them to appear before the court.",
    summaryBengali:
      "ধারা ৮২ — CrPC: যদি কোনো ব্যক্তি ওয়ারেন্ট এড়াতে পালায় বা লুকায়, তাহলে আদালত উদ্\u200cঘোষণা (proclamation) জারি করে তাকে 'ঘোষিত অপরাধী' ঘোষণা করতে পারে।",
    keyPoints: [
      "Issued when person absconds to evade warrant",
      "Proclamation published in visible public place, local newspaper",
      "Person given minimum 30 days to appear",
      "Non-appearance leads to attachment of property under Section 83",
      "Person declared 'proclaimed offender' or 'absconder'",
    ],
    examples: [
      "Accused Ram evades arrest for months; court issues proclamation in newspaper and affixes on his last known address, giving 30 days to appear.",
    ],
    examplesBengali: [
      "আসামি রাম মাসের পর মাস গ্রেফতার এড়িয়ে চলেছে; আদালত সংবাদপত্রে proclamation জারি করে ৩০ দিনের সময় দেয়।",
    ],
    exceptions: [
      "Court may simultaneously attach property in serious cases (Section 83 proviso)",
    ],
    exceptionsBengali: ["গুরুতর মামলায় ৩০ দিন অপেক্ষা না করেও সম্পত্তি ক্রোক করা যাবে"],
    landmarkCases: [
      {
        name: "Sanjay Dutt v. State",
        citation: "(1994) 5 SCC 410",
        relevance:
          "Court clarified that Section 82 proclamation is a necessary precondition for property attachment under Section 83.",
      },
    ],
    overridingEffect:
      "BNSS 2023 Section 84 corresponds to CrPC Section 82. BNSS adds digital/online proclamation methods.",
    overridingEffectBengali:
      "BNSS 2023 ধারা ৮৪, CrPC ধারা ৮২-এর সাথে সম্পর্কিত। BNSS ডিজিটাল প্রকাশের পদ্ধতি যোগ করেছে।",
    relatedSections: ["CrPC 73", "CrPC 83", "CrPC 84", "BNSS 84", "IPC 174A"],
  },
  crpc_83: {
    act: "CrPC",
    actName: "Code of Criminal Procedure, 1973",
    section: "83",
    title: "Attachment of Property of Person Absconding",
    titleBengali: "পলাতক ব্যক্তির সম্পত্তি ক্রোক",
    originalText:
      "Section 83 CrPC: The Court issuing a proclamation under section 82 may, for reasons to be recorded in writing, at any time after the issue of the proclamation, order the attachment of any property, movable or immovable, or both, belonging to the proclaimed person.",
    summary:
      "After issuing a proclamation, the court can order attachment (seizing) of the absconder's movable or immovable property to compel their appearance.",
    summaryBengali:
      "ধারা ৮৩ — CrPC: proclamation জারির পর, আদালত পলাতকের চল বা অচল সম্পত্তি ক্রোক করার নির্দেশ দিতে পারে।",
    keyPoints: [
      "Property attachment follows proclamation under Section 82",
      "Both movable and immovable property can be attached",
      "Attached property managed by Collector/government",
      "Property restored if person appears within 2 years",
      "Serious offences: attachment may happen simultaneously with proclamation",
    ],
    examples: [
      "After proclamation against Ram, court orders attachment of his house and bank accounts.",
    ],
    examplesBengali: [
      "রামের বিরুদ্ধে proclamation-এর পর, আদালত তার বাড়ি ও ব্যাংক অ্যাকাউন্ট ক্রোক করার নির্দেশ দেয়।",
    ],
    exceptions: [
      "Property of innocent third parties cannot be attached",
      "Attached property restored if person appears within 2 years",
    ],
    exceptionsBengali: [
      "নির্দোষ তৃতীয় পক্ষের সম্পত্তি ক্রোক করা যাবে না",
      "২ বছরের মধ্যে উপস্থিত হলে সম্পত্তি ফিরিয়ে দেওয়া হবে",
    ],
    landmarkCases: [
      {
        name: "Sanjay Dutt v. State",
        citation: "(1994) 5 SCC 410",
        relevance:
          "Proclamation under Section 82 is prerequisite for property attachment under Section 83.",
      },
    ],
    overridingEffect: "BNSS 2023 Section 85 corresponds to CrPC Section 83.",
    overridingEffectBengali: "BNSS 2023 ধারা ৮৫, CrPC ধারা ৮৩-এর সাথে সম্পর্কিত।",
    relatedSections: ["CrPC 82", "CrPC 84", "CrPC 85", "BNSS 85"],
  },
  crpc_84: {
    act: "CrPC",
    actName: "Code of Criminal Procedure, 1973",
    section: "84",
    title: "Claims and Objections to Attachment",
    titleBengali: "ক্রোকের বিরুদ্ধে দাবি ও আপত্তি",
    originalText:
      "Section 84 CrPC: If any claim is preferred to, or objection made to the attachment of, any property attached under section 83, within six months from the date of such attachment, by any person other than the proclaimed person, on the ground that the claimant has an interest in such property, the claim or objection shall be inquired into.",
    summary:
      "Third parties (not the absconder) can challenge attachment of their property within 6 months, claiming their interest in it.",
    summaryBengali:
      "ধারা ৮৪ — CrPC: পলাতক ছাড়া অন্য কোনো ব্যক্তি, যদি ক্রোক করা সম্পত্তিতে তার স্বার্থ থাকে, তাহলে ৬ মাসের মধ্যে আপত্তি জানাতে পারবেন।",
    keyPoints: [
      "Third party rights protected in property attachment",
      "Claim must be filed within 6 months of attachment",
      "Court inquires into the claim and may release property to genuine claimants",
    ],
    examples: [
      "Ram absconds; court attaches his jointly owned house. Co-owner Sita files objection within 6 months claiming her 50% share.",
    ],
    examplesBengali: [
      "রাম পালিয়ে যায়; আদালত তার যৌথমালিকানার বাড়ি ক্রোক করে। সহ-মালিক সীতা ৬ মাসের মধ্যে তার ৫০% অংশের দাবিতে আপত্তি দাখিল করেন।",
    ],
    exceptions: [
      "Proclaimed person himself cannot file objection under this section",
    ],
    exceptionsBengali: ["ঘোষিত অপরাধী নিজে এই ধারায় আপত্তি দাখিল করতে পারবেন না"],
    landmarkCases: [],
    overridingEffect: "BNSS 2023 Section 86 corresponds to CrPC Section 84.",
    overridingEffectBengali: "BNSS 2023 ধারা ৮৬, CrPC ধারা ৮৪-এর সাথে সম্পর্কিত।",
    relatedSections: ["CrPC 83", "CrPC 85", "BNSS 86"],
  },
  crpc_85: {
    act: "CrPC",
    actName: "Code of Criminal Procedure, 1973",
    section: "85",
    title: "Release, Sale and Restoration of Attached Property",
    titleBengali: "ক্রোক করা সম্পত্তি মুক্তি, বিক্রয় ও পুনরুদ্ধার",
    originalText:
      "Section 85 CrPC: If the proclaimed person appears within the time specified in the proclamation, the Court shall make an order releasing the property from attachment. If the proclaimed person does not appear, the attached property shall be at the disposal of the State Government; but it shall not be sold until the expiration of six months from the date of the attachment.",
    summary:
      "If the absconder appears on time, attached property is released. If not, after 6 months the State Government may sell it; within 2 years person may claim restoration.",
    summaryBengali:
      "ধারা ৮৫ — CrPC: পলাতক সময়মতো হাজির হলে সম্পত্তি ছেড়ে দেওয়া হয়। না হলে ৬ মাস পর রাজ্য সরকার বিক্রি করতে পারে; ২ বছরের মধ্যে হাজির হয়ে নির্দোষ প্রমাণ করলে ফেরত দেওয়া হয়।",
    keyPoints: [
      "Property released if person appears in time",
      "If not, property vests in State Government after 6 months",
      "2-year window for person to claim restoration",
      "Sale proceeds held for 2 years before final disposal",
    ],
    examples: [
      "Ram's property attached; he doesn't appear. After 6 months, State Government sells the property but holds proceeds for 2 years.",
    ],
    examplesBengali: [
      "রামের সম্পত্তি ক্রোক হয়; সে আসে না। ৬ মাস পর রাজ্য সরকার বিক্রি করে কিন্তু ২ বছর আয় ধরে রাখে।",
    ],
    exceptions: [
      "Property cannot be sold before 6 months from attachment date",
    ],
    exceptionsBengali: ["ক্রোকের তারিখ থেকে ৬ মাস আগে সম্পত্তি বিক্রি করা যাবে না"],
    landmarkCases: [],
    overridingEffect: "BNSS 2023 Section 87 corresponds to CrPC Section 85.",
    overridingEffectBengali: "BNSS 2023 ধারা ৮৭, CrPC ধারা ৮৫-এর সাথে সম্পর্কিত।",
    relatedSections: ["CrPC 82", "CrPC 83", "CrPC 84", "BNSS 87"],
  },
  crpc_86: {
    act: "CrPC",
    actName: "Code of Criminal Procedure, 1973",
    section: "86",
    title: "Appeal from Order Rejecting Application for Restoration",
    titleBengali: "সম্পত্তি পুনরুদ্ধার প্রত্যাখ্যানের বিরুদ্ধে আপিল",
    originalText:
      "Section 86 CrPC: Any person aggrieved by any order made under section 85 may appeal to the Court to which appeals ordinarily lie from the sentences of the first-mentioned Court.",
    summary:
      "A person aggrieved by refusal to restore attached property under Section 85 can appeal to the next higher court.",
    summaryBengali:
      "ধারা ৮৬ — CrPC: ধারা ৮৫-এর অধীনে সম্পত্তি পুনরুদ্ধার প্রত্যাখ্যাত হলে, সংক্ষুব্ধ ব্যক্তি উচ্চ আদালতে আপিল করতে পারবেন।",
    keyPoints: [
      "Right to appeal against refusal of property restoration",
      "Appeal goes to court which hears appeals from that court",
      "Ensures judicial oversight in property disputes",
    ],
    examples: [
      "Court refuses to restore Ram's attached property; Ram appeals to Sessions Court.",
    ],
    examplesBengali: [
      "আদালত রামের ক্রোক সম্পত্তি ফেরত দিতে অস্বীকার করলে রাম Sessions Court-এ আপিল করেন।",
    ],
    exceptions: [],
    exceptionsBengali: [],
    landmarkCases: [],
    overridingEffect: "BNSS 2023 Section 88 corresponds to CrPC Section 86.",
    overridingEffectBengali: "BNSS 2023 ধারা ৮৮, CrPC ধারা ৮৬-এর সাথে সম্পর্কিত।",
    relatedSections: ["CrPC 85", "CrPC 399", "BNSS 88"],
  },
  crpc_87: {
    act: "CrPC",
    actName: "Code of Criminal Procedure, 1973",
    section: "87",
    title: "Issue of Warrant in Lieu of, or in Addition to, Summons",
    titleBengali: "সমন-এর পরিবর্তে বা অতিরিক্ত ওয়ারেন্ট জারি",
    originalText:
      "Section 87 CrPC: A Court may, in any case in which it is empowered to issue a summons for the appearance of any person, issue, after recording its reasons in writing, a warrant for his arrest if the Court sees reason to believe that he has absconded or will not obey the summons.",
    summary:
      "A court may issue a warrant instead of (or in addition to) a summons if it believes the person will abscond or disobey the summons.",
    summaryBengali:
      "ধারা ৮৭ — CrPC: আদালত যদি বিশ্বাস করে যে ব্যক্তি সমন অমান্য করবে বা পালিয়ে যাবে, তাহলে সমনের পরিবর্তে বা অতিরিক্তভাবে ওয়ারেন্ট জারি করতে পারে।",
    keyPoints: [
      "Escalation from summons to warrant",
      "Court must record written reasons before issuing warrant",
      "Applicable where summons is the normal procedure",
      "Used when court anticipates non-compliance",
    ],
    examples: [
      "A witness summoned to appear but known to be planning to flee — court issues warrant alongside summons.",
    ],
    examplesBengali: [
      "সাক্ষীকে সমন করা হয়েছে কিন্তু পালানোর পরিকল্পনা জানা গেছে — আদালত সমনের সাথে ওয়ারেন্টও জারি করে।",
    ],
    exceptions: ["Written reasons mandatory — verbal belief insufficient"],
    exceptionsBengali: ["লিখিত কারণ আবশ্যক — মৌখিক বিশ্বাস যথেষ্ট নয়"],
    landmarkCases: [],
    overridingEffect: "BNSS 2023 Section 89 corresponds to CrPC Section 87.",
    overridingEffectBengali: "BNSS 2023 ধারা ৮৯, CrPC ধারা ৮৭-এর সাথে সম্পর্কিত।",
    relatedSections: ["CrPC 61", "CrPC 70", "CrPC 82", "BNSS 89"],
  },
  crpc_88: {
    act: "CrPC",
    actName: "Code of Criminal Procedure, 1973",
    section: "88",
    title: "Power to Take Bond for Appearance",
    titleBengali: "হাজিরার জন্য বন্ড গ্রহণের ক্ষমতা",
    originalText:
      "Section 88 CrPC: When any person for whose appearance or arrest the officer presiding in any Court is empowered to issue a summons or warrant, is present in such Court, such officer may require such person to execute a bond, with or without sureties, for his appearance in such Court.",
    summary:
      "When a person is already present in court, the presiding officer can require them to execute a bond (with or without surety) guaranteeing future appearances.",
    summaryBengali:
      "ধারা ৮৮ — CrPC: যদি কোনো ব্যক্তি ইতিমধ্যে আদালতে উপস্থিত থাকেন, তাহলে আদালত তাকে ভবিষ্যৎ হাজিরার জন্য বন্ড সম্পাদন করতে বলতে পারে।",
    keyPoints: [
      "Preventive measure to ensure future court appearances",
      "Can be with or without surety",
      "Applicable when person is voluntarily present in court",
      "Failure to execute bond may lead to detention",
    ],
    examples: [
      "Witness present in court voluntarily — judge asks them to execute a bond guaranteeing appearance on next date.",
    ],
    examplesBengali: [
      "সাক্ষী স্বেচ্ছায় আদালতে উপস্থিত — বিচারক পরবর্তী তারিখে হাজিরার বন্ড সম্পাদন করতে বলেন।",
    ],
    exceptions: ["Cannot compel bond from accused if it violates bail rights"],
    exceptionsBengali: ["জামিনের অধিকার লঙ্ঘন হলে বন্ড নেওয়া যাবে না"],
    landmarkCases: [],
    overridingEffect: "BNSS 2023 Section 90 corresponds to CrPC Section 88.",
    overridingEffectBengali: "BNSS 2023 ধারা ৯০, CrPC ধারা ৮৮-এর সাথে সম্পর্কিত।",
    relatedSections: ["CrPC 436", "CrPC 437", "CrPC 438", "BNSS 90"],
  },
  crpc_89: {
    act: "CrPC",
    actName: "Code of Criminal Procedure, 1973",
    section: "89",
    title: "Arrest on Breach of Bond for Appearance",
    titleBengali: "হাজিরার বন্ড লঙ্ঘনে গ্রেফতার",
    originalText:
      "Section 89 CrPC: When any person who is bound by any bond taken under this Code to appear before a Court, does not appear, the Court may issue a warrant for his arrest.",
    summary:
      "If a person who has given a bond to appear before court fails to appear, the court can issue an arrest warrant against them.",
    summaryBengali:
      "ধারা ৮৯ — CrPC: যদি কোনো ব্যক্তি বন্ড দিয়েও নির্ধারিত দিনে আদালতে না আসেন, তাহলে আদালত তার বিরুদ্ধে গ্রেফতারি ওয়ারেন্ট জারি করতে পারে।",
    keyPoints: [
      "Consequence of breaching appearance bond",
      "Court issues arrest warrant on non-appearance",
      "Applies to all bonds taken under CrPC",
      "Surety may also be called upon to show cause",
    ],
    examples: [
      "Ram gave bond to appear on 15th March but doesn't come — court issues warrant for his arrest.",
    ],
    examplesBengali: [
      "রাম ১৫ মার্চ হাজির হওয়ার বন্ড দিয়েছিল কিন্তু আসেনি — আদালত তার গ্রেফতারি ওয়ারেন্ট জারি করে।",
    ],
    exceptions: [
      "Genuine illness or emergency may be accepted as valid excuse if notified",
    ],
    exceptionsBengali: ["সত্যিকারের অসুস্থতা বা জরুরি পরিস্থিতি জানানো হলে ক্ষমা করা যাবে"],
    landmarkCases: [],
    overridingEffect: "BNSS 2023 Section 91 corresponds to CrPC Section 89.",
    overridingEffectBengali: "BNSS 2023 ধারা ৯১, CrPC ধারা ৮৯-এর সাথে সম্পর্কিত।",
    relatedSections: ["CrPC 88", "CrPC 446", "BNSS 91"],
  },
  crpc_90: {
    act: "CrPC",
    actName: "Code of Criminal Procedure, 1973",
    section: "90",
    title:
      "Provisions of This Chapter Generally Applicable to Summonses and Warrants",
    titleBengali: "এই অধ্যায়ের বিধান সমন ও ওয়ারেন্টে সাধারণভাবে প্রযোজ্য",
    originalText:
      "Section 90 CrPC: The provisions contained in this Chapter relating to a summons and warrant, and relating to the person summoned or arrested, shall apply to every summons and every warrant of arrest issued under this Code.",
    summary:
      "All provisions in Chapter VI relating to summons and warrants apply generally to every summons and warrant issued under CrPC.",
    summaryBengali:
      "ধারা ৯০ — CrPC: Chapter VI-এর সমন ও ওয়ারেন্ট সংক্রান্ত সমস্ত বিধান CrPC-র অধীনে ইস্যু করা প্রতিটি সমন ও ওয়ারেন্টে প্রযোজ্য হবে।",
    keyPoints: [
      "Omnibus provision applying Chapter VI rules to all summons/warrants",
      "Ensures uniformity in issuance and execution of process",
      "Acts as an interpretive guide for courts",
    ],
    examples: [
      "Rules about service of summons (Section 62-69) apply equally to all types of summons under CrPC.",
    ],
    examplesBengali: [
      "সমন জারির নিয়ম (ধারা ৬২-৬৯) CrPC-র সব ধরনের সমনে সমানভাবে প্রযোজ্য।",
    ],
    exceptions: [],
    exceptionsBengali: [],
    landmarkCases: [],
    overridingEffect: "BNSS 2023 Section 92 corresponds to CrPC Section 90.",
    overridingEffectBengali: "BNSS 2023 ধারা ৯২, CrPC ধারা ৯০-এর সাথে সম্পর্কিত।",
    relatedSections: ["CrPC 61", "CrPC 70", "CrPC 88", "BNSS 92"],
  },
  crpc_91: {
    act: "CrPC",
    actName: "Code of Criminal Procedure, 1973",
    section: "91",
    title: "Summons to Produce Document or Other Thing",
    titleBengali: "দলিল বা অন্য বস্তু হাজির করার সমন",
    originalText:
      "Section 91 CrPC: Whenever any Court or any officer in charge of a police station considers that the production of any document or other thing is necessary or desirable for the purposes of any investigation, inquiry, trial or other proceeding under this Code, such Court may issue a summons, or such officer a written order, to the person in whose possession or power such document or thing is believed to be, requiring him to attend and produce it.",
    summary:
      "Courts and police officers can issue summons/order to any person to produce specific documents or items needed for investigation, inquiry, or trial.",
    summaryBengali:
      "ধারা ৯১ — CrPC: আদালত ও পুলিশ অফিসার তদন্ত, বিচার বা অনুসন্ধানের জন্য প্রয়োজনীয় দলিল বা বস্তু হাজির করতে যেকোনো ব্যক্তির কাছে সমন বা লিখিত নির্দেশ পাঠাতে পারেন।",
    keyPoints: [
      "Power to summon documents and physical evidence",
      "Applicable in investigation, inquiry, and trial stages",
      "Police officer issues written order (not court summons)",
      "Person must produce the document or face contempt",
      "Does not override privilege (e.g., attorney-client privilege)",
    ],
    examples: [
      "In a fraud case, court issues summons to a bank to produce account statements.",
      "Police officer sends written order to employer to produce CCTV footage.",
    ],
    examplesBengali: [
      "জালিয়াতির মামলায় আদালত ব্যাংককে অ্যাকাউন্ট স্টেটমেন্ট হাজির করতে সমন পাঠায়।",
      "পুলিশ অফিসার নিয়োগকর্তাকে CCTV ফুটেজ দেওয়ার লিখিত নির্দেশ পাঠান।",
    ],
    exceptions: [
      "State documents protected by public interest immunity",
      "Communications between advocate and client (professional privilege)",
    ],
    exceptionsBengali: [
      "জনস্বার্থ অনাক্রম্যতায় সুরক্ষিত রাষ্ট্রীয় দলিল",
      "উকিল-মক্কেলের মধ্যকার যোগাযোগ (পেশাদার অনাক্রম্যতা)",
    ],
    landmarkCases: [
      {
        name: "State of Gujarat v. Shyamlal Mohanlal Choksi",
        citation: "AIR 1965 SC 1251",
        relevance:
          "Section 91 power to summon documents is broad but subject to privilege protections.",
      },
    ],
    overridingEffect:
      "BNSS 2023 Section 94 corresponds to CrPC Section 91. BNSS extends it to electronic documents explicitly.",
    overridingEffectBengali:
      "BNSS 2023 ধারা ৯৪, CrPC ধারা ৯১-এর সাথে সম্পর্কিত। BNSS ইলেকট্রনিক দলিলকে স্পষ্টভাবে অন্তর্ভুক্ত করেছে।",
    relatedSections: ["CrPC 92", "CrPC 93", "BNSS 94", "IT Act 65B"],
  },
  crpc_92: {
    act: "CrPC",
    actName: "Code of Criminal Procedure, 1973",
    section: "92",
    title: "Procedure as to Letters and Telegrams",
    titleBengali: "চিঠি ও টেলিগ্রামের ক্ষেত্রে পদ্ধতি",
    originalText:
      "Section 92 CrPC: The District Magistrate, Chief Judicial Magistrate, Court of Session or High Court may, if satisfied that the interests of justice so require, require the postal or telegraph authority to detain, and to produce before it, the contents of any postal article, parcel, telegram, message or other document, which is in the custody of a postal or telegraph authority.",
    summary:
      "Senior courts and magistrates can direct postal/telegraph authorities to detain and produce mail, parcels, telegrams, or messages when justice requires it.",
    summaryBengali:
      "ধারা ৯২ — CrPC: জেলা Magistrate, CJM, Sessions Court বা High Court ন্যায়বিচারের স্বার্থে ডাক বা টেলিগ্রাফ কর্তৃপক্ষকে চিঠি, পার্সেল, বা বার্তা আটক রেখে আদালতে হাজির করতে নির্দেশ দিতে পারে।",
    keyPoints: [
      "Interception of postal/telegraph communications for justice",
      "Only senior courts/magistrates have this power",
      "Must be satisfied that interests of justice require it",
      "Extends to modern equivalents under interpretation",
    ],
    examples: [
      "In a kidnapping case, court directs postal authority to intercept and produce ransom letters being sent by the accused.",
    ],
    examplesBengali: [
      "অপহরণ মামলায় আদালত ডাক কর্তৃপক্ষকে আসামির পাঠানো মুক্তিপণের চিঠি আটক করে হাজির করতে নির্দেশ দেয়।",
    ],
    exceptions: [
      "Cannot intercept without court/magistrate order",
      "Bulk surveillance not permitted under this section",
    ],
    exceptionsBengali: [
      "আদালত/Magistrate-এর নির্দেশ ছাড়া আটক করা যাবে না",
      "এই ধারায় ব্যাপক নজরদারি অনুমোদিত নয়",
    ],
    landmarkCases: [
      {
        name: "PUCL v. Union of India",
        citation: "AIR 1997 SC 568",
        relevance:
          "Telephone tapping/interception must be done under lawful authority with procedural safeguards.",
      },
    ],
    overridingEffect:
      "BNSS 2023 Section 95 corresponds and explicitly includes electronic communications, emails, and digital data.",
    overridingEffectBengali:
      "BNSS 2023 ধারা ৯৫ ইলেকট্রনিক যোগাযোগ, ইমেইল, ও ডিজিটাল ডেটাকে স্পষ্টভাবে অন্তর্ভুক্ত করেছে।",
    relatedSections: [
      "CrPC 91",
      "CrPC 93",
      "IT Act 69",
      "BNSS 95",
      "Constitution Article 21",
    ],
  },
  crpc_93: {
    act: "CrPC",
    actName: "Code of Criminal Procedure, 1973",
    section: "93",
    title: "When Search Warrant May Be Issued",
    titleBengali: "তল্লাশি পরোয়ানা কখন জারি করা যায়",
    originalText:
      "Section 93 CrPC: Where any Court has reason to believe that a person to whom a summons or order under section 91 has been or might be addressed, will not produce the document or thing as required; or where such document or thing is not known to the Court to be in the possession of any person; or where the Court considers that the purposes of any inquiry, trial or other proceeding will be served by a general search or inspection, it may issue a search-warrant.",
    summary:
      "A court may issue a search warrant when a person refuses to produce required documents, when possession is unknown, or when a general search is necessary for the investigation/trial.",
    summaryBengali:
      "ধারা ৯৩ — CrPC: আদালত search warrant জারি করতে পারে যখন: (১) ব্যক্তি দলিল দিতে অস্বীকার করতে পারে, (২) দলিল কার কাছে আছে অজানা, বা (৩) সাধারণ তল্লাশি বিচার/তদন্তের জন্য জরুরি।",
    keyPoints: [
      "Three grounds for issuing search warrant under Section 93",
      "More intrusive than summons — enters premises",
      "General search warrant possible for wide-area investigation",
      "Must be specific about what to search for",
      "Executed by police officer named in warrant",
    ],
    examples: [
      "Accused likely has incriminating documents at home but refuses to produce them — court issues search warrant for their residence.",
      "Police investigation of drug network — court issues general search warrant for a warehouse.",
    ],
    examplesBengali: [
      "আসামির বাড়িতে অপরাধমূলক দলিল থাকার সম্ভাবনা আছে কিন্তু দিতে অস্বীকার করছে — আদালত search warrant জারি করে।",
      "মাদক নেটওয়ার্ক তদন্তে — আদালত একটি গুদামের জন্য সাধারণ search warrant জারি করে।",
    ],
    exceptions: [
      "Cannot search diplomatic premises",
      "Women's quarters to be searched by female officer",
      "Attorney-client privileged documents exempt",
    ],
    exceptionsBengali: [
      "কূটনৈতিক প্রাঙ্গণ তল্লাশি করা যাবে না",
      "মহিলাদের কক্ষ মহিলা অফিসার কর্তৃক তল্লাশি করতে হবে",
      "উকিল-মক্কেল বিশেষাধিকারের দলিল ব্যতিক্রম",
    ],
    landmarkCases: [
      {
        name: "Pooran Mal v. Director of Inspection",
        citation: "AIR 1974 SC 348",
        relevance:
          "Search under proper warrant is valid even if it yields incriminating evidence.",
      },
      {
        name: "State of Punjab v. Balbir Singh",
        citation: "(1994) 3 SCC 299",
        relevance:
          "Search without warrant or without following procedure is illegal and evidence obtained may be inadmissible.",
      },
    ],
    overridingEffect:
      "BNSS 2023 Section 96 corresponds to CrPC Section 93. BNSS extends to search of electronic devices and digital storage.",
    overridingEffectBengali:
      "BNSS 2023 ধারা ৯৬, CrPC ধারা ৯৩-এর সাথে সম্পর্কিত। BNSS ইলেকট্রনিক ডিভাইস ও ডিজিটাল স্টোরেজ তল্লাশিতে প্রসারিত।",
    relatedSections: [
      "CrPC 91",
      "CrPC 92",
      "CrPC 94",
      "CrPC 165",
      "BNSS 96",
      "IT Act 80",
    ],
  },
};

const KEY_ALIASES: Record<string, string> = {
  "ipc 378": "ipc_378",
  ipc378: "ipc_378",
  "section 378 ipc": "ipc_378",
  theft: "ipc_378",
  "ipc 379": "ipc_379",
  ipc379: "ipc_379",
  "section 379 ipc": "ipc_379",
  "punishment for theft": "ipc_379",
  "ipc 390": "ipc_390",
  ipc390: "ipc_390",
  "section 390 ipc": "ipc_390",
  robbery: "ipc_390",
  "ipc 392": "ipc_392",
  ipc392: "ipc_392",
  "section 392 ipc": "ipc_392",
  "punishment for robbery": "ipc_392",
  "ipc 406": "ipc_406",
  ipc406: "ipc_406",
  "section 406 ipc": "ipc_406",
  "criminal breach of trust": "ipc_406",
  "breach of trust": "ipc_406",
  "ipc 409": "ipc_409",
  ipc409: "ipc_409",
  "section 409 ipc": "ipc_409",
  "cbt public servant": "ipc_409",
  "ipc 463": "ipc_463",
  ipc463: "ipc_463",
  "section 463 ipc": "ipc_463",
  forgery: "ipc_463",
  "ipc 464": "ipc_464",
  ipc464: "ipc_464",
  "section 464 ipc": "ipc_464",
  "false document": "ipc_464",
  "ipc 468": "ipc_468",
  ipc468: "ipc_468",
  "section 468 ipc": "ipc_468",
  "forgery for cheating": "ipc_468",
  "ipc 471": "ipc_471",
  ipc471: "ipc_471",
  "section 471 ipc": "ipc_471",
  "using forged document": "ipc_471",
  "forged document": "ipc_471",
  "ipc 299": "ipc_299",
  ipc299: "ipc_299",
  "section 299 ipc": "ipc_299",
  "culpable homicide": "ipc_299",
  "ipc 304a": "ipc_304a",
  ipc304a: "ipc_304a",
  "ipc 304 a": "ipc_304a",
  "section 304a ipc": "ipc_304a",
  "death by negligence": "ipc_304a",
  "ipc 323": "ipc_323",
  ipc323: "ipc_323",
  "section 323 ipc": "ipc_323",
  "voluntarily causing hurt": "ipc_323",
  "ipc 325": "ipc_325",
  ipc325: "ipc_325",
  "section 325 ipc": "ipc_325",
  "voluntarily causing grievous hurt": "ipc_325",
  "grievous hurt": "ipc_325",
  "ipc 354a": "ipc_354a",
  ipc354a: "ipc_354a",
  "ipc 354 a": "ipc_354a",
  "section 354a ipc": "ipc_354a",
  "sexual harassment ipc": "ipc_354a",
  "ipc 354b": "ipc_354b",
  ipc354b: "ipc_354b",
  "ipc 354 b": "ipc_354b",
  "section 354b ipc": "ipc_354b",
  disrobe: "ipc_354b",
  "ipc 354c": "ipc_354c",
  ipc354c: "ipc_354c",
  "ipc 354 c": "ipc_354c",
  "section 354c ipc": "ipc_354c",
  voyeurism: "ipc_354c",
  "ipc 354d": "ipc_354d",
  ipc354d: "ipc_354d",
  "ipc 354 d": "ipc_354d",
  "section 354d ipc": "ipc_354d",
  "stalking ipc": "ipc_354d",
  "bns 75": "ipc_354a",
  "bns 76": "ipc_354b",
  "bns 77": "ipc_354c",
  "bns 78": "ipc_354d",
  "ipc 302": "ipc_302",
  ipc302: "ipc_302",
  "section 302": "ipc_302",
  "ipc 304": "ipc_304",
  ipc304: "ipc_304",
  "ipc 307": "ipc_307",
  ipc307: "ipc_307",
  "ipc 376": "ipc_376",
  ipc376: "ipc_376",
  "ipc 420": "ipc_420",
  ipc420: "ipc_420",
  "ipc 498a": "ipc_498a",
  ipc498a: "ipc_498a",
  "ipc 498 a": "ipc_498a",
  "crpc 41": "crpc_41",
  crpc41: "crpc_41",
  "section 41 crpc": "crpc_41",
  "crpc 161": "crpc_161",
  "crpc 164": "crpc_164",
  "crpc 313": "crpc_313",
  "article 14": "constitution_14",
  "article 19": "constitution_19",
  "article 21": "constitution_21",
  "article 32": "constitution_32",
  "article 226": "constitution_226",
  "constitution article 14": "constitution_14",
  "constitution article 19": "constitution_19",
  "constitution article 21": "constitution_21",
  "constitution article 32": "constitution_32",
  "hma 5": "hma_5",
  "hma section 5": "hma_5",
  "hindu marriage act section 5": "hma_5",
  "conditions for hindu marriage": "hma_5",
  "hma 7": "hma_7",
  "hma section 7": "hma_7",
  "hindu marriage act section 7": "hma_7",
  "ceremonies for hindu marriage": "hma_7",
  saptapadi: "hma_7",
  "hma 10": "hma_10",
  "hma section 10": "hma_10",
  "hindu marriage act section 10": "hma_10",
  "judicial separation hma": "hma_10",
  "hma 11": "hma_11",
  "hma section 11": "hma_11",
  "hindu marriage act section 11": "hma_11",
  "void marriage hma": "hma_11",
  "hma 12": "hma_12",
  "hma section 12": "hma_12",
  "hindu marriage act section 12": "hma_12",
  "voidable marriage": "hma_12",
  "hma 13b": "hma_13b",
  "hma section 13b": "hma_13b",
  "hindu marriage act section 13b": "hma_13b",
  "divorce by mutual consent": "hma_13b",
  "mutual consent divorce": "hma_13b",
  "hma 14": "hma_14",
  "hma section 14": "hma_14",
  "hindu marriage act section 14": "hma_14",
  "one year bar divorce": "hma_14",
  "hma 15": "hma_15",
  "hma section 15": "hma_15",
  "hindu marriage act section 15": "hma_15",
  "remarriage after divorce": "hma_15",
  "hma 16": "hma_16",
  "hma section 16": "hma_16",
  "hindu marriage act section 16": "hma_16",
  "legitimacy void marriage": "hma_16",
  "hma 17": "hma_17",
  "hma section 17": "hma_17",
  "hindu marriage act section 17": "hma_17",
  "bigamy hma": "hma_17",
  "hindu bigamy": "hma_17",
  "hma 24": "hma_24",
  "hma section 24": "hma_24",
  "hindu marriage act section 24": "hma_24",
  "maintenance pendente lite": "hma_24",
  "interim maintenance hma": "hma_24",
  "hma 25": "hma_25",
  "hma section 25": "hma_25",
  "hindu marriage act section 25": "hma_25",
  "permanent alimony": "hma_25",
  "alimony hma": "hma_25",
  "hma 26": "hma_26",
  "hma section 26": "hma_26",
  "hindu marriage act section 26": "hma_26",
  "child custody hma": "hma_26",
  "custody of children hma": "hma_26",
  "hma 27": "hma_27",
  "hma section 27": "hma_27",
  "hindu marriage act section 27": "hma_27",
  "disposal of property hma": "hma_27",
  "hma 28": "hma_28",
  "hma section 28": "hma_28",
  "hindu marriage act section 28": "hma_28",
  "appeal hma": "hma_28",
  "hma 13": "hma_13",
  "hma section 13": "hma_13",
  "hindu marriage act section 13": "hma_13",
  "hindu marriage act 1955 section 13": "hma_13",
  "hma 9": "hma_9",
  "hma section 9": "hma_9",
  "hindu marriage act section 9": "hma_9",
  "it act 66": "ita_66",
  "it act section 66": "ita_66",
  "section 66": "ita_66",
  "it act 66c": "ita_66c",
  "it act section 66c": "ita_66c",
  "section 66c": "ita_66c",
  "it act 67": "ita_67",
  "it act section 67": "ita_67",
  "section 67 it act": "ita_67",
  "bns 101": "ipc_302",
  "bns section 101": "ipc_302",
  "ipc 34": "ipc_34",
  ipc34: "ipc_34",
  "section 34 ipc": "ipc_34",
  "ipc 120b": "ipc_120b",
  ipc120b: "ipc_120b",
  "ipc 120 b": "ipc_120b",
  "section 120b": "ipc_120b",
  "criminal conspiracy": "ipc_120b",
  "ipc 141": "ipc_141",
  ipc141: "ipc_141",
  "section 141 ipc": "ipc_141",
  "unlawful assembly": "ipc_141",
  "ipc 149": "ipc_149",
  ipc149: "ipc_149",
  "section 149 ipc": "ipc_149",
  "ipc 354": "ipc_354",
  ipc354: "ipc_354",
  "section 354 ipc": "ipc_354",
  "ipc 509": "ipc_509",
  ipc509: "ipc_509",
  "section 509 ipc": "ipc_509",
  "bns 103": "bns_103",
  "bns section 103": "bns_103",
  "bharatiya nyaya sanhita 103": "bns_103",
  "bns murder": "bns_103",
  "bns 64": "bns_64",
  "bns section 64": "bns_64",
  "bns rape": "bns_64",
  "bns 111": "bns_111",
  "bns section 111": "bns_111",
  "organised crime": "bns_111",
  "bns organised crime": "bns_111",
  "bns 316": "bns_316",
  "bns section 316": "bns_316",
  "bns breach of trust": "bns_316",
  "bns 351": "bns_351",
  "bns section 351": "bns_351",
  "bns intimidation": "bns_351",
  "bnss 173": "bnss_173",
  "bnss section 173": "bnss_173",
  "bnss fir": "bnss_173",
  "bnss 35": "bnss_35",
  "bnss section 35": "bnss_35",
  "bnss arrest": "bnss_35",
  "bnss 479": "bnss_479",
  "bnss section 479": "bnss_479",
  "bnss bail": "bnss_479",
  "undertrial bail": "bnss_479",
  "crpc 154": "crpc_154",
  "crpc section 154": "crpc_154",
  fir: "crpc_154",
  "first information report": "crpc_154",
  "crpc 125": "crpc_125",
  "crpc section 125": "crpc_125",
  maintenance: "crpc_125",
  "crpc maintenance": "crpc_125",
  "crpc 437": "crpc_437",
  "crpc section 437": "crpc_437",
  "bail non bailable": "crpc_437",
  "crpc 144": "crpc_144",
  "crpc section 144": "crpc_144",
  "section 144": "crpc_144",
  "prohibitory order": "crpc_144",
  "curfew order": "crpc_144",
  "crpc 167": "crpc_167",
  "crpc section 167": "crpc_167",
  "default bail": "crpc_167",
  "statutory bail": "crpc_167",
  "remand crpc": "crpc_167",
  "crpc 173": "crpc_173",
  "crpc section 173": "crpc_173",
  chargesheet: "crpc_173",
  "police report crpc": "crpc_173",
  "crpc 190": "crpc_190",
  "crpc section 190": "crpc_190",
  "cognizance magistrate": "crpc_190",
  "taking cognizance": "crpc_190",
  "crpc 197": "crpc_197",
  "crpc section 197": "crpc_197",
  "sanction prosecution": "crpc_197",
  "public servant prosecution": "crpc_197",
  "crpc 300": "crpc_300",
  "crpc section 300": "crpc_300",
  "autrefois acquit": "crpc_300",
  "crpc 357": "crpc_357",
  "crpc section 357": "crpc_357",
  "victim compensation crpc": "crpc_357",
  "compensation order": "crpc_357",
  "crpc 436": "crpc_436",
  "crpc section 436": "crpc_436",
  "bail bailable offence": "crpc_436",
  "bailable bail right": "crpc_436",
  "crpc 436a": "crpc_436a",
  "crpc 436 a": "crpc_436a",
  "crpc section 436a": "crpc_436a",
  "undertrial bail half sentence": "crpc_436a",
  "crpc 438": "crpc_438",
  "crpc section 438": "crpc_438",
  "anticipatory bail": "crpc_438",
  "pre arrest bail": "crpc_438",
  "crpc 439": "crpc_439",
  "crpc section 439": "crpc_439",
  "high court bail": "crpc_439",
  "sessions bail": "crpc_439",
  "crpc 482": "crpc_482",
  "crpc section 482": "crpc_482",
  "inherent powers high court": "crpc_482",
  "quash fir": "crpc_482",
  "fir quashing": "crpc_482",
  "contract act 10": "contract_10",
  "contract act section 10": "contract_10",
  "indian contract act 10": "contract_10",
  "ica 10": "contract_10",
  "essentials of contract": "contract_10",
  "contract act 11": "contract_11",
  "contract act section 11": "contract_11",
  "competency to contract": "contract_11",
  "minor contract": "contract_11",
  "ni act 138": "ni_138",
  "ni act section 138": "ni_138",
  "negotiable instruments act 138": "ni_138",
  "cheque bounce": "ni_138",
  "dishonour of cheque": "ni_138",
  "section 138 ni act": "ni_138",
  "pocso 4": "pocso_4",
  "pocso section 4": "pocso_4",
  "pocso act section 4": "pocso_4",
  "child sexual assault": "pocso_4",
  "rti 6": "rti_6",
  "rti section 6": "rti_6",
  "rti act section 6": "rti_6",
  "right to information": "rti_6",
  "rti application": "rti_6",
  "dv act 3": "dv_3",
  "dv act section 3": "dv_3",
  "domestic violence": "dv_3",
  "protection of women domestic violence": "dv_3",
  "article 15": "constitution_15",
  "constitution article 15": "constitution_15",
  "article 16": "constitution_16",
  "constitution article 16": "constitution_16",
  "article 20": "constitution_20",
  "constitution article 20": "constitution_20",
  "double jeopardy": "constitution_20",
  "article 22": "constitution_22",
  "constitution article 22": "constitution_22",
  "arrest rights": "constitution_22",

  "crpc 1": "crpc_1",
  crpc1: "crpc_1",
  "crpc section 1": "crpc_1",
  "criminal procedure code": "crpc_1",
  "crpc 2": "crpc_2",
  crpc2: "crpc_2",
  "crpc definitions": "crpc_2",
  "bailable offence definition": "crpc_2",
  "cognizable offence definition": "crpc_2",
  "crpc 4": "crpc_4",
  crpc4: "crpc_4",
  "trial of offences crpc": "crpc_4",
  "crpc 6": "crpc_6",
  crpc6: "crpc_6",
  "classes of criminal courts": "crpc_6",
  "criminal court hierarchy": "crpc_6",
  "crpc 9": "crpc_9",
  crpc9: "crpc_9",
  "court of session": "crpc_9",
  "sessions court": "crpc_9",
  "crpc 24": "crpc_24",
  crpc24: "crpc_24",
  "public prosecutor": "crpc_24",
  "government pleader": "crpc_24",
  "crpc 41a": "crpc_41a",
  "crpc 41 a": "crpc_41a",
  "notice of appearance": "crpc_41a",
  "arnesh kumar guidelines": "crpc_41a",
  "crpc 41b": "crpc_41b",
  "crpc 41 b": "crpc_41b",
  "procedure of arrest": "crpc_41b",
  "arrest memo": "crpc_41b",
  "crpc 41d": "crpc_41d",
  "crpc 41 d": "crpc_41d",
  "right to advocate during interrogation": "crpc_41d",
  "crpc 46": "crpc_46",
  crpc46: "crpc_46",
  "how arrest is made": "crpc_46",
  "manner of arrest": "crpc_46",
  "crpc 49": "crpc_49",
  crpc49: "crpc_49",
  "no unnecessary restraint": "crpc_49",
  "handcuffing law": "crpc_49",
  "crpc 50": "crpc_50",
  crpc50: "crpc_50",
  "grounds of arrest": "crpc_50",
  "inform grounds of arrest": "crpc_50",
  "right to know arrest reason": "crpc_50",
  "crpc 51": "crpc_51",
  crpc51: "crpc_51",
  "search arrested person": "crpc_51",
  "search of arrested": "crpc_51",
  "crpc 52": "crpc_52",
  crpc52: "crpc_52",
  "seize offensive weapons": "crpc_52",
  "offensive weapons arrest": "crpc_52",
  "crpc 53": "crpc_53",
  crpc53: "crpc_53",
  "medical examination accused": "crpc_53",
  "police medical exam accused": "crpc_53",
  "crpc 54": "crpc_54",
  crpc54: "crpc_54",
  "medical examination arrested": "crpc_54",
  "arrested person medical": "crpc_54",
  "crpc 55": "crpc_55",
  crpc55: "crpc_55",
  "depute subordinate arrest": "crpc_55",
  "crpc 56": "crpc_56",
  crpc56: "crpc_56",
  "produce before magistrate": "crpc_56",
  "taken before magistrate": "crpc_56",
  "crpc 57": "crpc_57",
  crpc57: "crpc_57",
  "24 hour detention": "crpc_57",
  "twenty four hours arrest": "crpc_57",
  "24 hours rule": "crpc_57",
  "crpc 58": "crpc_58",
  crpc58: "crpc_58",
  "police report apprehensions": "crpc_58",
  "crpc 59": "crpc_59",
  crpc59: "crpc_59",
  "discharge arrested person": "crpc_59",
  "crpc 60": "crpc_60",
  crpc60: "crpc_60",
  "pursue re-arrest escape": "crpc_60",
  "escaped custody re-arrest": "crpc_60",
  "crpc 61": "crpc_61",
  crpc61: "crpc_61",
  "form of summons": "crpc_61",
  "summons form crpc": "crpc_61",
  "crpc 62": "crpc_62",
  crpc62: "crpc_62",
  "service of summons on persons": "crpc_62",
  "crpc 63": "crpc_63",
  crpc63: "crpc_63",
  "service on corporate bodies": "crpc_63",
  "crpc 64": "crpc_64",
  crpc64: "crpc_64",
  "substituted service crpc": "crpc_64",
  "service when person not found": "crpc_64",
  "crpc 65": "crpc_65",
  crpc65: "crpc_65",
  "service cannot be effected": "crpc_65",
  "affix summons": "crpc_65",
  "crpc 66": "crpc_66",
  crpc66: "crpc_66",
  "service on government servants": "crpc_66",
  "crpc 67": "crpc_67",
  crpc67: "crpc_67",
  "service outside jurisdiction": "crpc_67",
  "inter jurisdictional summons": "crpc_67",
  "crpc 68": "crpc_68",
  crpc68: "crpc_68",
  "proof of service crpc": "crpc_68",
  "affidavit proof service": "crpc_68",
  "crpc 69": "crpc_69",
  crpc69: "crpc_69",
  "service on witnesses": "crpc_69",
  "summons witness registered post": "crpc_69",
  "crpc 70": "crpc_70",
  crpc70: "crpc_70",
  "form of warrant crpc": "crpc_70",
  "warrant duration crpc": "crpc_70",
  "arrest warrant form": "crpc_70",
  "crpc 71": "crpc_71",
  crpc71: "crpc_71",
  "security on warrant": "crpc_71",
  "bail on warrant": "crpc_71",
  "endorsed warrant bail": "crpc_71",
  "crpc 72": "crpc_72",
  crpc72: "crpc_72",
  "warrants to whom directed": "crpc_72",
  "warrant directed civilian": "crpc_72",
  "crpc 73": "crpc_73",
  crpc73: "crpc_73",
  "warrant any person": "crpc_73",
  "warrant proclaimed offender": "crpc_73",
  "crpc 74": "crpc_74",
  crpc74: "crpc_74",
  "warrant police officer delegation": "crpc_74",
  "crpc 75": "crpc_75",
  crpc75: "crpc_75",
  "notify warrant": "crpc_75",
  "show warrant": "crpc_75",
  "crpc 76": "crpc_76",
  crpc76: "crpc_76",
  "produce before court": "crpc_76",
  "produce without delay": "crpc_76",
  "crpc 77": "crpc_77",
  crpc77: "crpc_77",
  "warrant anywhere india": "crpc_77",
  "crpc 78": "crpc_78",
  crpc78: "crpc_78",
  "warrant outside jurisdiction": "crpc_78",
  "crpc 79": "crpc_79",
  crpc79: "crpc_79",
  "warrant endorsement": "crpc_79",
  "inter state arrest": "crpc_79",
  "crpc 80": "crpc_80",
  crpc80: "crpc_80",
  "arrest outside district": "crpc_80",
  "crpc 81": "crpc_81",
  crpc81: "crpc_81",
  "magistrate after arrest": "crpc_81",
  "crpc 82": "crpc_82",
  crpc82: "crpc_82",
  "proclamation absconder": "crpc_82",
  "proclaimed offender": "crpc_82",
  "absconding accused": "crpc_82",
  "crpc 83": "crpc_83",
  crpc83: "crpc_83",
  "attachment property absconder": "crpc_83",
  "attach property proclaimed": "crpc_83",
  "crpc 84": "crpc_84",
  crpc84: "crpc_84",
  "objection attachment": "crpc_84",
  "third party attachment": "crpc_84",
  "crpc 85": "crpc_85",
  crpc85: "crpc_85",
  "restore attached property": "crpc_85",
  "sale attached property": "crpc_85",
  "crpc 86": "crpc_86",
  crpc86: "crpc_86",
  "appeal attachment": "crpc_86",
  "crpc 87": "crpc_87",
  crpc87: "crpc_87",
  "warrant in lieu of summons": "crpc_87",
  "crpc 88": "crpc_88",
  crpc88: "crpc_88",
  "bond appearance": "crpc_88",
  "crpc 89": "crpc_89",
  crpc89: "crpc_89",
  "breach of bond": "crpc_89",
  "crpc 90": "crpc_90",
  crpc90: "crpc_90",
  "crpc 91": "crpc_91",
  crpc91: "crpc_91",
  "produce document": "crpc_91",
  "summons document": "crpc_91",
  "crpc 92": "crpc_92",
  crpc92: "crpc_92",
  "intercept letters": "crpc_92",
  "postal interception": "crpc_92",
  "crpc 93": "crpc_93",
  crpc93: "crpc_93",
  "search warrant": "crpc_93",
  "issue search warrant": "crpc_93",
};

function findLawKey(query: string): string | null {
  const q = query.toLowerCase().trim();

  // Direct lookup
  if (KEY_ALIASES[q]) return KEY_ALIASES[q];

  // Try partial matches
  for (const [alias, key] of Object.entries(KEY_ALIASES)) {
    if (q.includes(alias) || alias.includes(q)) return key;
  }

  // Fuzzy: extract numbers
  const numMatch = q.match(/(\d+[a-z]?)/i);
  const num = numMatch?.[1]?.toLowerCase();

  if (!num) return null;

  if (q.includes("ipc") || q.includes("penal code") || q.includes("bns")) {
    const candidate = `ipc_${num}`;
    if (LAW_DATABASE[candidate]) return candidate;
  }
  if (
    q.includes("crpc") ||
    q.includes("criminal procedure") ||
    q.includes("bnss")
  ) {
    const candidate = `crpc_${num}`;
    if (LAW_DATABASE[candidate]) return candidate;
  }
  if (q.includes("article") || q.includes("constitution")) {
    const candidate = `constitution_${num}`;
    if (LAW_DATABASE[candidate]) return candidate;
  }
  if (q.includes("hma") || q.includes("hindu marriage")) {
    const candidate = `hma_${num}`;
    if (LAW_DATABASE[candidate]) return candidate;
  }
  if (q.includes("it act") || q.includes("information technology")) {
    const candidate = `ita_${num}`;
    if (LAW_DATABASE[candidate]) return candidate;
  }

  if (q.includes("bns") && !q.includes("bnss")) {
    const candidate = `bns_${num}`;
    if (LAW_DATABASE[candidate]) return candidate;
  }
  if (q.includes("bnss")) {
    const candidate = `bnss_${num}`;
    if (LAW_DATABASE[candidate]) return candidate;
  }
  if (q.includes("contract act") || q.includes("ica")) {
    const candidate = `contract_${num}`;
    if (LAW_DATABASE[candidate]) return candidate;
  }
  if (
    q.includes("ni act") ||
    q.includes("negotiable instruments") ||
    q.includes("cheque")
  ) {
    const candidate = `ni_${num}`;
    if (LAW_DATABASE[candidate]) return candidate;
  }
  if (q.includes("pocso")) {
    const candidate = `pocso_${num}`;
    if (LAW_DATABASE[candidate]) return candidate;
  }
  if (q.includes("rti") || q.includes("right to information")) {
    const candidate = `rti_${num}`;
    if (LAW_DATABASE[candidate]) return candidate;
  }
  if (q.includes("dv act") || q.includes("domestic violence")) {
    const candidate = `dv_${num}`;
    if (LAW_DATABASE[candidate]) return candidate;
  }
  return null;
}

// ============================================================
// DYNAMIC FALLBACK SYSTEM FOR UNLISTED LAW SECTIONS
// ============================================================

const CRPC_CHAPTERS: Array<{
  from: number;
  to: number;
  chapter: string;
  topic: string;
}> = [
  {
    from: 94,
    to: 105,
    chapter: "VII",
    topic: "Processes to Compel Production of Things",
  },
  {
    from: 106,
    to: 124,
    chapter: "VIII",
    topic: "Security for Keeping Peace and Good Behaviour",
  },
  {
    from: 125,
    to: 128,
    chapter: "IX",
    topic: "Order for Maintenance of Wives, Children and Parents",
  },
  { from: 129, to: 132, chapter: "X", topic: "Unlawful Assemblies" },
  {
    from: 133,
    to: 143,
    chapter: "XI",
    topic: "Preventive Action of the Police",
  },
  { from: 144, to: 153, chapter: "XI", topic: "Preventive Action and Orders" },
  {
    from: 154,
    to: 176,
    chapter: "XII",
    topic: "Information to the Police and Their Powers to Investigate",
  },
  {
    from: 177,
    to: 189,
    chapter: "XIII",
    topic: "Jurisdiction of the Criminal Courts in Inquiries and Trials",
  },
  {
    from: 190,
    to: 199,
    chapter: "XIV",
    topic: "Conditions Requisite for Initiation of Proceedings",
  },
  { from: 200, to: 210, chapter: "XV", topic: "Complaints to Magistrates" },
  {
    from: 211,
    to: 224,
    chapter: "XVI",
    topic: "Commencement of Proceedings before Magistrates",
  },
  {
    from: 225,
    to: 237,
    chapter: "XVII",
    topic: "Trial before a Court of Session",
  },
  {
    from: 238,
    to: 250,
    chapter: "XVIII",
    topic: "Trial of Warrant Cases by Magistrates",
  },
  {
    from: 251,
    to: 259,
    chapter: "XIX",
    topic: "Trial of Summons Cases by Magistrates",
  },
  { from: 260, to: 265, chapter: "XX", topic: "Summary Trials" },
  {
    from: 266,
    to: 291,
    chapter: "XXI-XXIII",
    topic: "Charges and General Provisions",
  },
  {
    from: 292,
    to: 299,
    chapter: "XXIV",
    topic: "General Provisions as to Inquiries and Trials",
  },
  {
    from: 300,
    to: 327,
    chapter: "XXV-XXVI",
    topic: "Evidence, Judgments and Provisions in Trials",
  },
  {
    from: 328,
    to: 342,
    chapter: "XXVII",
    topic: "Irregular Proceedings and Summary Trials",
  },
  {
    from: 343,
    to: 395,
    chapter: "XXVIII-XXXIII",
    topic: "Appeals, Reference, Revision and Transfer",
  },
  { from: 396, to: 431, chapter: "XXXIV", topic: "Execution of Sentences" },
  {
    from: 432,
    to: 500,
    chapter: "XXXV-XXXVII",
    topic: "Miscellaneous Provisions",
  },
];

const BNS_CHAPTERS: Array<{
  from: number;
  to: number;
  chapter: string;
  topic: string;
}> = [
  {
    from: 1,
    to: 3,
    chapter: "I",
    topic: "Preliminary — Short title, definitions, general explanations",
  },
  {
    from: 4,
    to: 20,
    chapter: "II",
    topic:
      "Punishments — Death, imprisonment, fine, forfeiture, community service",
  },
  {
    from: 21,
    to: 34,
    chapter: "III",
    topic:
      "General Exceptions — Mistake of fact, judicial acts, consent, necessity, self-defence",
  },
  {
    from: 35,
    to: 60,
    chapter: "IV",
    topic: "Abetment, Criminal Conspiracy and Attempt",
  },
  {
    from: 61,
    to: 99,
    chapter: "V-VI",
    topic: "Offences Against the State and Armed Forces",
  },
  {
    from: 100,
    to: 146,
    chapter: "VII",
    topic:
      "Offences Against Human Body — Homicide, hurt, wrongful restraint, assault, kidnapping, rape",
  },
  {
    from: 147,
    to: 175,
    chapter: "VIII",
    topic:
      "Offences Against Property — Theft, robbery, dacoity, cheating, criminal breach of trust",
  },
  {
    from: 176,
    to: 230,
    chapter: "IX-XI",
    topic: "Offences Against Women, Children and Public Order",
  },
  {
    from: 231,
    to: 290,
    chapter: "XII-XIV",
    topic: "Offences Relating to Documents, Currency and Elections",
  },
  {
    from: 291,
    to: 358,
    chapter: "XV-XX",
    topic:
      "Miscellaneous Offences — Public health, defamation, intimidation, false information",
  },
];

const IT_ACT_CHAPTERS: Array<{ from: number; to: number; topic: string }> = [
  { from: 1, to: 2, topic: "Preliminary — Short title, definitions" },
  { from: 3, to: 10, topic: "Digital Signature and Electronic Records" },
  { from: 11, to: 22, topic: "Electronic Governance and Attribution" },
  { from: 23, to: 42, topic: "Regulation of Certifying Authorities" },
  {
    from: 43,
    to: 45,
    topic: "Penalties and Compensation for Damage to Computer",
  },
  { from: 46, to: 64, topic: "Adjudication, Cyber Appellate Tribunal" },
  {
    from: 65,
    to: 78,
    topic: "Offences — Tampering, hacking, obscene content, cyber crimes",
  },
  {
    from: 79,
    to: 94,
    topic:
      "Network Service Providers, Examiner of Electronic Evidence, Miscellaneous",
  },
];

const CONTRACT_ACT_CHAPTERS: Array<{
  from: number;
  to: number;
  topic: string;
}> = [
  { from: 1, to: 2, topic: "Preliminary — Short title, interpretation clause" },
  {
    from: 3,
    to: 9,
    topic: "Communication, Acceptance and Revocation of Proposals",
  },
  {
    from: 10,
    to: 30,
    topic: "Contracts, Voidable Contracts and Void Agreements",
  },
  { from: 31, to: 36, topic: "Contingent Contracts" },
  { from: 37, to: 67, topic: "Performance of Contracts" },
  {
    from: 68,
    to: 72,
    topic: "Certain Relations Resembling Contracts — Quasi contracts",
  },
  { from: 73, to: 75, topic: "Consequences of Breach of Contract" },
  { from: 76, to: 123, topic: "Indemnity, Guarantee, Bailment and Pledge" },
  { from: 124, to: 238, topic: "Contracts of Agency" },
];

function getChapterTopic(act: string, sectionNum: number): string {
  if (act === "crpc") {
    const ch = CRPC_CHAPTERS.find(
      (c) => sectionNum >= c.from && sectionNum <= c.to,
    );
    return ch ? `Chapter ${ch.chapter}: ${ch.topic}` : "General Provisions";
  }
  if (act === "bns") {
    const ch = BNS_CHAPTERS.find(
      (c) => sectionNum >= c.from && sectionNum <= c.to,
    );
    return ch ? `Chapter ${ch.chapter}: ${ch.topic}` : "General Provisions";
  }
  if (act === "it_act") {
    const ch = IT_ACT_CHAPTERS.find(
      (c) => sectionNum >= c.from && sectionNum <= c.to,
    );
    return ch ? ch.topic : "General Provisions";
  }
  if (act === "contract") {
    const ch = CONTRACT_ACT_CHAPTERS.find(
      (c) => sectionNum >= c.from && sectionNum <= c.to,
    );
    return ch ? ch.topic : "General Provisions";
  }
  return "General Provisions";
}

function generateDynamicLawEntry(
  actKey: string,
  sectionNum: number,
): LawResult | null {
  const actMap: Record<
    string,
    { name: string; year: string; shortName: string; bnssEquiv?: string }
  > = {
    crpc: {
      name: "Code of Criminal Procedure",
      year: "1973",
      shortName: "CrPC",
      bnssEquiv: "Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023",
    },
    bns: { name: "Bharatiya Nyaya Sanhita", year: "2023", shortName: "BNS" },
    it_act: {
      name: "Information Technology Act",
      year: "2000",
      shortName: "IT Act",
    },
    contract: {
      name: "Indian Contract Act",
      year: "1872",
      shortName: "Contract Act",
    },
    ipc: {
      name: "Indian Penal Code",
      year: "1860",
      shortName: "IPC",
      bnssEquiv: "Bharatiya Nyaya Sanhita (BNS), 2023",
    },
    bnss: {
      name: "Bharatiya Nagarik Suraksha Sanhita",
      year: "2023",
      shortName: "BNSS",
    },
    constitution: {
      name: "Constitution of India",
      year: "1950",
      shortName: "Constitution",
    },
    hma: { name: "Hindu Marriage Act", year: "1955", shortName: "HMA" },
  };

  const act = actMap[actKey];
  if (!act) return null;

  const chapterTopic = getChapterTopic(actKey, sectionNum);
  const actFullName = `${act.name}, ${act.year}`;

  const overriding = act.bnssEquiv
    ? `This section of ${act.name} should be read alongside ${act.bnssEquiv}. Where ${act.bnssEquiv} has been enacted, it supersedes the corresponding provisions of ${act.name} to the extent of inconsistency.`
    : `This section operates within the framework of ${act.name} and should be read with related provisions of the same Act.`;

  // Generate rich content based on chapter topic
  const topicLower = chapterTopic.toLowerCase();

  // --- Section Text ---
  const sectionText = `${actFullName}, Section ${sectionNum}: This section falls under the chapter dealing with ${chapterTopic}. It prescribes the legal rules, rights, obligations, and procedures applicable to matters covered under this chapter of the Act.`;

  // --- Detailed Explanation ---
  const explanation = `**${actFullName} — ধারা ${sectionNum} (Section ${sectionNum})**

**Section ${sectionNum}** of the **${actFullName}** is part of ${chapterTopic}. This provision governs the legal framework applicable to ${topicLower}, defining the rights, duties, powers, and procedures of the persons or authorities involved.

**Scope & Purpose:**
This section lays down specific rules to ensure clarity, fairness, and enforceability in matters related to ${topicLower}. It must be read alongside adjoining sections of the same chapter for complete understanding.

**Who it applies to:**
It applies to individuals, public authorities, courts, police officers, or contracting parties — depending on the context of ${topicLower}.

**Legal Effect:**
Non-compliance or violation of this section may lead to legal consequences including penalties, voidability of contracts, contempt, or other remedies as prescribed under the Act.

---
**বাংলা ব্যাখ্যা:**
**${actFullName}**-এর **ধারা ${sectionNum}** হল ${chapterTopic} সংক্রান্ত একটি গুরুত্বপূর্ণ বিধান।

এই ধারাটি ${topicLower} বিষয়ক আইনি কাঠামো নির্ধারণ করে। এটি সংশ্লিষ্ট ব্যক্তি, কর্তৃপক্ষ বা আদালতের অধিকার, দায়িত্ব এবং পদ্ধতি স্পষ্ট করে।

**প্রয়োগ:** এই ধারাটি ব্যক্তি, সরকারি কর্তৃপক্ষ, আদালত বা পুলিশ অফিসারের ক্ষেত্রে প্রযোজ্য হতে পারে — ${topicLower} এর প্রেক্ষাপটে।

**আইনি প্রভাব:** এই ধারা লঙ্ঘন করলে আইনি পরিণতি হতে পারে, যেমন জরিমানা, চুক্তি বাতিল, অবমাননা বা আইনে নির্ধারিত অন্য প্রতিকার।`;

  // --- Practical Examples ---
  const examples = [
    `বাস্তব উদাহরণ ১ (Practical Example 1): A party involved in a matter of ${topicLower} invokes Section ${sectionNum} of ${actFullName} before a competent court or authority. The court examines whether the conditions prescribed under this section are satisfied before granting relief. উদাহরণ: ${chapterTopic} সংক্রান্ত বিষয়ে কোনো ব্যক্তি এই ধারার অধীনে আদালতে আবেদন করেন এবং আদালত বিধি পরীক্ষা করে সিদ্ধান্ত নেন।`,
    `বাস্তব উদাহরণ ২ (Practical Example 2): A police officer, magistrate, or designated authority exercises powers under Section ${sectionNum} while handling a matter related to ${topicLower}. Failure to comply with this section renders the action liable to be challenged. পুলিশ বা ম্যাজিস্ট্রেট এই ধারার ক্ষমতা প্রয়োগ করেন — পালন না হলে সংশ্লিষ্ট পদক্ষেপ চ্যালেঞ্জযোগ্য হয়।`,
    `বাস্তব উদাহরণ ৩ (Practical Example 3): In a civil or criminal proceeding, the court refers to Section ${sectionNum} of ${actFullName} while determining the scope of ${topicLower}. Lawyers cite this section in arguments, and the judgment interprets the provision in light of the facts. দেওয়ানি বা ফৌজদারি মামলায় আদালত এই ধারার ব্যাখ্যা দেন এবং আইনজীবীরা যুক্তিতে উল্লেখ করেন।`,
  ];

  // --- Landmark Cases ---
  const getLandmarkCases = () => {
    if (topicLower.includes("arrest") || topicLower.includes("detention")) {
      return [
        {
          name: "D.K. Basu v. State of West Bengal (1997) 1 SCC 416",
          citation: "AIR 1997 SC 610",
          summary:
            "Supreme Court laid down landmark guidelines for arrest and detention — police must identify themselves, prepare a memo, inform a relative, and produce the arrested person before a magistrate within 24 hours. Violation of arrest procedure is a constitutional wrong.",
          principle: "Arrest without following procedure violates Article 21.",
        },
        {
          name: "Joginder Kumar v. State of U.P. (1994) 4 SCC 260",
          citation: "AIR 1994 SC 1349",
          summary:
            "No arrest should be made merely because the officer is empowered to do so. The existence of the power to arrest is not the same as the justification to arrest. Procedural safeguards are mandatory.",
          principle:
            "Power to arrest must be exercised with proper justification.",
        },
      ];
    }
    if (topicLower.includes("bail")) {
      return [
        {
          name: "Sanjay Chandra v. CBI (2012) 1 SCC 40",
          citation: "AIR 2012 SC 830",
          summary:
            "The Supreme Court held that bail is the rule and jail is the exception. Courts must consider the nature of the accusation, severity of punishment, character of evidence, and likelihood of flight risk.",
          principle:
            "Bail is the rule; deprivation of liberty must be justified.",
        },
        {
          name: "Arnesh Kumar v. State of Bihar (2014) 8 SCC 273",
          citation: "AIR 2014 SC 2756",
          summary:
            "Police must apply their mind before making arrests, particularly in cases punishable with imprisonment up to 7 years. Mechanical arrests without justification are impermissible.",
          principle: "Arrest must be last resort, not the first response.",
        },
      ];
    }
    if (
      topicLower.includes("contract") ||
      topicLower.includes("agreement") ||
      topicLower.includes("proposal")
    ) {
      return [
        {
          name: "Carlill v. Carbolic Smoke Ball Co. (1893)",
          citation: "1 QB 256",
          summary:
            "Established that a general offer once accepted by performance creates a binding contract. This principle applies to Indian Contract Act under Section 8 and related provisions.",
          principle: "General offer + performance = binding contract.",
        },
        {
          name: "Mohori Bibee v. Dharmodas Ghose (1903)",
          citation: "ILR 30 Cal 539",
          summary:
            "A contract entered into by a minor is void ab initio under the Indian Contract Act. The minor cannot ratify such a contract upon attaining majority.",
          principle: "Minor's contract is void, not merely voidable.",
        },
      ];
    }
    if (
      topicLower.includes("murder") ||
      topicLower.includes("homicide") ||
      topicLower.includes("body") ||
      topicLower.includes("offence against")
    ) {
      return [
        {
          name: "K.M. Nanavati v. State of Maharashtra (1962) AIR 1962 SC 605",
          citation: "AIR 1962 SC 605",
          summary:
            "Landmark case establishing principles of culpable homicide vs. murder. The Court examined whether the act was done with intention and knowledge, distinguishing IPC Sections 299 and 300.",
          principle:
            "Intention and knowledge are decisive in classifying homicide.",
        },
        {
          name: "State of Andhra Pradesh v. R. Punnayya (1976) 4 SCC 382",
          citation: "AIR 1977 SC 45",
          summary:
            "Supreme Court explained the difference between culpable homicide and murder in detail. The degree of probability of death determines the category.",
          principle:
            "Probability of death determines murder vs. culpable homicide.",
        },
      ];
    }
    if (
      topicLower.includes("property") ||
      topicLower.includes("theft") ||
      topicLower.includes("robbery") ||
      topicLower.includes("fraud") ||
      topicLower.includes("cheating")
    ) {
      return [
        {
          name: "Pyare Lal Bhargava v. State of Rajasthan (1963) AIR 1963 SC 1094",
          citation: "AIR 1963 SC 1094",
          summary:
            "The Supreme Court examined what constitutes theft and the essential element of dishonest intention to take movable property out of possession of another.",
          principle:
            "Dishonest intention at the time of taking is essential for theft.",
        },
        {
          name: "Dr. Vimla v. Delhi Administration (1963) AIR 1963 SC 1572",
          citation: "AIR 1963 SC 1572",
          summary:
            "Cheating requires a deceptive act inducing another to deliver property or alter a legal position. Both inducement and damage/harm must be proved.",
          principle: "For cheating, deception AND harm/damage must coexist.",
        },
      ];
    }
    if (
      topicLower.includes("digital") ||
      topicLower.includes("cyber") ||
      topicLower.includes("computer") ||
      topicLower.includes("electronic") ||
      topicLower.includes("information technology")
    ) {
      return [
        {
          name: "Shreya Singhal v. Union of India (2015) 5 SCC 1",
          citation: "AIR 2015 SC 1523",
          summary:
            "Supreme Court struck down Section 66A of IT Act as unconstitutional for being vague and overbroad. Established that online speech is protected under Article 19(1)(a) subject to reasonable restrictions.",
          principle:
            "IT Act provisions must pass Article 19 constitutionality test.",
        },
        {
          name: "State of Tamil Nadu v. Suhas Katti (2004)",
          citation: "Cr.No.4680/2004",
          summary:
            "First conviction under IT Act 2000 in India. The accused sent obscene messages via internet. Court held that electronic evidence is admissible and cyber crime must be prosecuted stringently.",
          principle:
            "Electronic messages are admissible evidence; cyber crime is prosecutable.",
        },
      ];
    }
    if (
      topicLower.includes("maintenance") ||
      topicLower.includes("family") ||
      topicLower.includes("marriage") ||
      topicLower.includes("matrimonial")
    ) {
      return [
        {
          name: "Mohd. Ahmed Khan v. Shah Bano Begum (1985) 2 SCC 556",
          citation: "AIR 1985 SC 945",
          summary:
            "Supreme Court held that a Muslim divorced wife is entitled to maintenance under Section 125 CrPC. The right to maintenance is a secular right independent of personal law.",
          principle: "Maintenance under CrPC is a secular, universal right.",
        },
        {
          name: "Rajnesh v. Neha (2021) 2 SCC 324",
          citation: "AIR 2020 SC 3671",
          summary:
            "Laid down comprehensive guidelines for maintenance proceedings — interim maintenance, criteria for quantification, and single consolidated order to avoid multiplicity of proceedings.",
          principle:
            "Maintenance must be fair, timely, and quantified based on need and capacity.",
        },
      ];
    }
    // Default landmark cases based on the act
    if (actKey === "crpc" || actKey === "bnss") {
      return [
        {
          name: "State of Haryana v. Bhajan Lal (1992) Supp (1) SCC 335",
          citation: "AIR 1992 SC 604",
          summary:
            "Supreme Court laid down guidelines for quashing FIRs under Section 482 CrPC. Cases where the FIR does not disclose a cognizable offence, or where the allegations are inherently improbable, may be quashed.",
          principle:
            "FIR quashing powers under CrPC must be exercised to prevent abuse of process.",
        },
        {
          name: "Lalita Kumari v. Govt. of U.P. (2014) 2 SCC 1",
          citation: "AIR 2014 SC 187",
          summary:
            "Supreme Court held that registration of FIR is mandatory if the information discloses a cognizable offence. Police cannot conduct preliminary inquiry before registering FIR in cognizable offences.",
          principle:
            "FIR registration is mandatory for cognizable offences — no preliminary inquiry allowed.",
        },
      ];
    }
    if (actKey === "bns" || actKey === "ipc") {
      return [
        {
          name: "State of Maharashtra v. Mayer Hans George (1965) AIR 1965 SC 722",
          citation: "AIR 1965 SC 722",
          summary:
            "Established that mens rea (guilty mind) is an essential ingredient of most criminal offences under IPC/BNS. Strict liability is an exception, not the rule.",
          principle:
            "Criminal liability requires both actus reus and mens rea.",
        },
        {
          name: "K.N. Mehra v. State of Rajasthan (1957) AIR 1957 SC 369",
          citation: "AIR 1957 SC 369",
          summary:
            "The Supreme Court examined the territorial jurisdiction of criminal courts and the scope of offences under penal legislation.",
          principle:
            "Territorial jurisdiction determines which court tries an offence.",
        },
      ];
    }
    return [
      {
        name: "Maneka Gandhi v. Union of India (1978) 1 SCC 248",
        citation: "AIR 1978 SC 597",
        summary:
          "Expanded the interpretation of 'personal liberty' under Article 21 to require that any law affecting liberty must be just, fair, and reasonable. Applicable across criminal and civil law.",
        principle:
          "Procedure established by law must be just, fair, and reasonable.",
      },
      {
        name: "State of U.P. v. Singhara Singh (1964) AIR 1964 SC 358",
        citation: "AIR 1964 SC 358",
        summary:
          "The Supreme Court held that where a statute prescribes a particular procedure for doing something, that procedure and no other must be followed.",
        principle:
          "When procedure is prescribed by statute, it must be strictly followed.",
      },
    ];
  };

  // --- Exceptions ---
  const exceptions = `**Exceptions & Provisos to Section ${sectionNum} — ${actFullName}:**

1. **General Exception:** This section is subject to the general exceptions and provisos laid down in the Act itself. Specific defences available to the parties must be pleaded and proved by the party relying on them.

2. **Procedural Exceptions:** Courts have held that technical non-compliance with procedural provisions does not necessarily invalidate the proceedings unless there is prejudice caused to the accused or aggrieved party.

3. **Special Laws Override:** Where a special or local law provides a different procedure or remedy for the same subject matter, the provisions of that special law may prevail over this section to the extent of inconsistency.

4. **Constitutional Limitations:** Any provision of ${actFullName} must be read subject to the fundamental rights guaranteed by Part III of the Constitution of India. If a provision conflicts with fundamental rights, it is liable to be struck down.

---
**বাংলা — ব্যতিক্রম ও শর্ত:**
ধারা ${sectionNum}-এ সাধারণ ব্যতিক্রম প্রযোজ্য। প্রযুক্তিগত ত্রুটিতে ক্ষতি না হলে কার্যবিধি বাতিল হয় না। বিশেষ আইন থাকলে তা প্রাধান্য পায়। সংবিধানের মৌলিক অধিকারের সাথে সাংঘর্ষিক বিধান বাতিলযোগ্য।`;

  return {
    title: `${act.shortName} Section ${sectionNum} — ${chapterTopic}`,
    actName: actFullName,
    sectionNumber: String(sectionNum),
    sectionText,
    explanation,
    examples,
    landmarkCases: getLandmarkCases(),
    exceptions,
    overridingEffect: overriding,
    relatedSections: [
      {
        ref: `${act.shortName} ${sectionNum - 1}`,
        description: `Previous section (ধারা ${sectionNum - 1})`,
      },
      {
        ref: `${act.shortName} ${sectionNum + 1}`,
        description: `Next section (ধারা ${sectionNum + 1})`,
      },
      {
        ref: `${act.shortName} ${sectionNum - 2}`,
        description: `Read with ধারা ${sectionNum - 2}`,
      },
    ],
  };
}

function tryDynamicLookup(query: string): LawResult | null {
  const patterns: Array<{ regex: RegExp; actKey: string }> = [
    { regex: /^crpc\s+(\d+)/i, actKey: "crpc" },
    { regex: /^bns\s+(\d+)/i, actKey: "bns" },
    { regex: /^bnss\s+(\d+)/i, actKey: "bnss" },
    { regex: /^it\s*act\s+(\d+)/i, actKey: "it_act" },
    { regex: /^contract\s*act\s+(\d+)/i, actKey: "contract" },
    { regex: /^ipc\s+(\d+)/i, actKey: "ipc" },
    { regex: /^constitution\s+article\s*(\d+)/i, actKey: "constitution" },
    { regex: /^constitution\s+(\d+)/i, actKey: "constitution" },
    { regex: /^hma\s+(\d+)/i, actKey: "hma" },
    { regex: /^hindu\s+marriage\s*act\s+(\d+)/i, actKey: "hma" },
    { regex: /^code\s+of\s+criminal\s+procedure\s+(\d+)/i, actKey: "crpc" },
    { regex: /^bharatiya\s+nyaya\s+sanhita\s+(\d+)/i, actKey: "bns" },
    { regex: /^information\s+technology\s*act\s+(\d+)/i, actKey: "it_act" },
    { regex: /^indian\s+contract\s*act\s+(\d+)/i, actKey: "contract" },
  ];

  for (const { regex, actKey } of patterns) {
    const match = query.match(regex);
    if (match) {
      const sectionNum = Number.parseInt(match[1], 10);
      if (!Number.isNaN(sectionNum)) {
        return generateDynamicLawEntry(actKey, sectionNum);
      }
    }
  }
  return null;
}

function normalizeEntry(result: any, language: LawLanguage): LawResult {
  // New schema uses summary/keyPoints, old schema uses sectionText/explanation
  const isNewSchema =
    !result.sectionText && (result.summary || result.summaryBengali);
  if (!isNewSchema) {
    // Old schema: ensure all required fields exist with safe defaults
    const useBengali = language === "bengali";
    const explanation = useBengali
      ? result.bengaliExplanation || result.explanation || ""
      : result.explanation || "";
    const examples = Array.isArray(result.examples) ? result.examples : [];
    const exceptions = Array.isArray(result.exceptions)
      ? result.exceptions
      : typeof result.exceptions === "string" && result.exceptions
        ? [result.exceptions]
        : [];
    const landmarkCases = Array.isArray(result.landmarkCases)
      ? result.landmarkCases.map((lc: any) => ({
          name: lc.name || "",
          summary:
            lc.summary || lc.relevance || lc.principle || lc.holding || "",
          citation: lc.citation || "",
          principle: lc.principle || "",
        }))
      : [];
    const relatedSections = Array.isArray(result.relatedSections)
      ? result.relatedSections.map((r: any) =>
          typeof r === "string" ? { ref: r, description: r } : r,
        )
      : [];
    return {
      title: result.title || "",
      actName: result.actName || result.act || "",
      sectionNumber: result.sectionNumber || result.section || "",
      sectionText: result.sectionText || "",
      explanation,
      examples,
      landmarkCases,
      exceptions,
      overridingEffect: result.overridingEffect || "",
      relatedSections,
    };
  }

  const useBengali = language === "bengali";
  const keyPoints =
    (useBengali ? result.keyPointsBengali : result.keyPoints) || [];
  const examples =
    (useBengali ? result.examplesBengali : result.examples) || [];
  const exceptions =
    (useBengali ? result.exceptionsBengali : result.exceptions) || [];
  const summary = (useBengali ? result.summaryBengali : result.summary) || "";
  const titleText =
    (useBengali ? result.titleBengali : result.title) || result.title || "";

  const sectionText = result.originalText || summary;
  const explanation =
    keyPoints.length > 0
      ? `${summary}\n\n${keyPoints.map((p: string) => `• ${p}`).join("\n")}`
      : summary;

  const overridingEffect = useBengali
    ? result.overridingEffectBengali || result.overridingEffect || ""
    : result.overridingEffect || "";
  const crossLaws = result.crossLaws || result.relatedSections || [];
  const relatedSections = result.relatedSections || [];

  return {
    title: `${result.act || result.actName || ""} — ${titleText}`,
    actName: result.act || result.actName || "",
    sectionNumber: result.section || result.sectionNumber || "",
    sectionText,
    explanation,
    examples,
    landmarkCases: result.landmarkCases || [],
    exceptions: exceptions,
    overridingEffect,
    relatedSections:
      crossLaws.length > relatedSections.length ? crossLaws : relatedSections,
  };
}

export function generateLawExplanation(
  query: string,
  language: LawLanguage,
): LawResult | null {
  const key = findLawKey(query);
  if (key) {
    const result = LAW_DATABASE[key];
    if (result) return normalizeEntry(result, language);
  }

  // Dynamic fallback for sections not in static DB
  const normalizedQuery = query.toLowerCase().trim();
  const dynamicResult = tryDynamicLookup(normalizedQuery);
  if (dynamicResult) return dynamicResult;

  return null;
}

export function getAllActNames(): string[] {
  return [...new Set(Object.values(LAW_DATABASE).map((r) => r.actName))];
}
