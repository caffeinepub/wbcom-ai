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
    actName: "Code of Criminal Procedure, 1973",
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

export function generateLawExplanation(
  query: string,
  language: LawLanguage,
): LawResult | null {
  const key = findLawKey(query);
  if (!key) return null;
  const result = LAW_DATABASE[key];
  if (!result) return null;

  if (language === "bengali") {
    return translateToBengali(result);
  }
  return result;
}

function translateToBengali(result: LawResult): LawResult {
  const titleMap: Record<string, string> = {
    Overview: "সংক্ষিপ্ত বিবরণ",
    "Section Text": "ধারার পাঠ",
  };
  void titleMap;

  return {
    ...result,
    explanation: toBengaliExplanation(
      result.actName,
      result.sectionNumber,
      result.explanation,
    ),
    examples: result.examples.map((e) => toBengaliExample(e)),
    exceptions: result.exceptions,
    overridingEffect: result.overridingEffect,
  };
}

function toBengaliExplanation(
  actName: string,
  sec: string,
  english: string,
): string {
  const intro = getBengali(actName, sec);
  return intro ? `${intro}\n\n(English: ${english})` : english;
}

function getBengali(actName: string, sec: string): string {
  const benDict: Record<string, string> = {
    "indian penal code, 1860_302":
      "ধারা ৩০২ IPC হত্যার শাস্তি নির্ধারণ করে। যে ব্যক্তি হত্যা করে, তাকে মৃত্যুদণ্ড বা যাবজ্জীবন কারাদণ্ড দেওয়া হবে এবং জরিমানাও করা হবে। 'বিরলতম' মামলায় মৃত্যুদণ্ড দেওয়া হয়, অন্যথায় যাবজ্জীবন কারাদণ্ড স্বাভাবিক শাস্তি।",
    "indian penal code, 1860_304":
      "ধারা ৩০৪ IPC অনিচ্ছাকৃত নরহত্যার (হত্যা নয়) শাস্তি দেয়। Part I-এ মৃত্যু ঘটানোর উদ্দেশ্য থাকলে যাবজ্জীবন কারাদণ্ড পর্যন্ত এবং Part II-এ শুধু জ্ঞান থাকলে ১০ বছর পর্যন্ত কারাদণ্ড হতে পারে।",
    "indian penal code, 1860_307":
      "ধারা ৩০৭ IPC হত্যার চেষ্টার শাস্তি নির্ধারণ করে। হত্যার চেষ্টা করা হলে ১০ বছর পর্যন্ত কারাদণ্ড হতে পারে; যদি আঘাত লাগে তাহলে যাবজ্জীবন কারাদণ্ডও হতে পারে।",
    "indian penal code, 1860_376":
      "ধারা ৩৭৬ IPC ধর্ষণের শাস্তি নির্ধারণ করে। ২০১৩ সালের সংশোধনীর পর ন্যূনতম শাস্তি ১০ বছরের কঠোর কারাদণ্ড এবং সর্বোচ্চ যাবজ্জীবন কারাদণ্ড বা মৃত্যুদণ্ড।",
    "indian penal code, 1860_420":
      "ধারা ৪২০ IPC প্রতারণার মাধ্যমে সম্পত্তি হস্তান্তর করানোর শাস্তি দেয়। ৭ বছর পর্যন্ত কারাদণ্ড এবং জরিমানা। প্রতারণার মাধ্যমে অর্থ বা সম্পত্তি নেওয়া হলে এই ধারা প্রযোজ্য।",
    "indian penal code, 1860_498a":
      "ধারা ৪৯৮A IPC বিবাহিত মহিলার উপর স্বামী বা শ্বশুরবাড়ির লোকদের নির্যাতনের শাস্তি দেয়। ৩ বছর পর্যন্ত কারাদণ্ড এবং জরিমানা। যৌতুকের জন্য নির্যাতন এবং মানসিক নির্যাতন এর আওতায় পড়ে।",
    "code of criminal procedure, 1973_41":
      "ধারা ৪১ CrPC পুলিশকে পরোয়ানা ছাড়া গ্রেফতারের ক্ষমতা দেয় — তবে Arnesh Kumar মামলার পর পুলিশকে গ্রেফতারের কারণ লিখিতভাবে রেকর্ড করতে হবে এবং গ্রেফতারের প্রয়োজনীয়তা যাচাই করতে হবে।",
    "code of criminal procedure, 1973_161":
      "ধারা ১৬১ CrPC তদন্তে সাক্ষীদের পুলিশি জিজ্ঞাসাবাদের বিধান রাখে। এই জবানবন্দি আদালতে প্রমাণ হিসেবে সরাসরি গ্রহণযোগ্য নয়, তবে সাক্ষীকে অসংগত করতে ব্যবহার করা যায়।",
    "code of criminal procedure, 1973_164":
      "ধারা ১৬৪ CrPC বিচারিক ম্যাজিস্ট্রেটের সামনে স্বীকারোক্তি ও জবানবন্দি রেকর্ডের বিধান রাখে। এই জবানবন্দি আদালতে প্রমাণ হিসেবে গ্রহণযোগ্য — পুলিশি জবানবন্দির চেয়ে অনেক বেশি মূল্যবান।",
    "code of criminal procedure, 1973_313":
      "ধারা ৩১৩ CrPC আসামীকে তার বিরুদ্ধে সাক্ষ্যের ব্যাখ্যা দেওয়ার সুযোগ দেয়। এটি বাধ্যতামূলক — এই পরীক্ষা না করলে বিচার ত্রুটিপূর্ণ হয়। আসামী শপথ নেবেন না এবং সমস্ত অভিযোগ অস্বীকার করতে পারেন।",
    "constitution of india_article 14":
      "অনুচ্ছেদ ১৪ সংবিধান সকলকে আইনের সামনে সমতা এবং আইনের সমান সুরক্ষার নিশ্চয়তা দেয়। রাষ্ট্র যুক্তিসংগত শ্রেণীবিভাগ করতে পারে কিন্তু স্বেচ্ছাচারীভাবে বৈষম্য করতে পারে না।",
    "constitution of india_article 19":
      "অনুচ্ছেদ ১৯ ভারতীয় নাগরিকদের ছয়টি স্বাধীনতার গ্যারান্টি দেয়: বাক স্বাধীনতা, সভা-সমাবেশের অধিকার, সংগঠন গঠনের অধিকার, চলাচলের অধিকার, বসবাসের অধিকার, এবং পেশা বেছে নেওয়ার অধিকার।",
    "constitution of india_article 21":
      "অনুচ্ছেদ ২১ সংবিধানের সবচেয়ে গুরুত্বপূর্ণ অধিকার — জীবন ও ব্যক্তি স্বাধীনতার অধিকার। ড. আম্বেদকর এটিকে সংবিধানের 'হৃদয় ও আত্মা' বলেছেন। এর মধ্যে গোপনীয়তার অধিকার, মর্যাদায় বেঁচে থাকার অধিকার, দ্রুত বিচারের অধিকার সব অন্তর্ভুক্ত।",
    "constitution of india_article 32":
      "অনুচ্ছেদ ৩২ মৌলিক অধিকার বলবৎ করার জন্য সুপ্রিম কোর্টে সরাসরি যাওয়ার অধিকার দেয়। SC পাঁচটি রিট জারি করতে পারে: Habeas Corpus, Mandamus, Prohibition, Certiorari এবং Quo Warranto।",
    "hindu marriage act, 1955_5":
      "ধারা ৫ হিন্দু বিবাহ আইন বিবাহের শর্তাবলি নির্ধারণ করে: উভয় পক্ষ অবিবাহিত, প্রাপ্তবয়স্ক (বর ২১, কনে ১৮), নিষিদ্ধ সম্পর্কের মধ্যে নয়, এবং সাপিন্ড নয়। শর্ত লঙ্ঘনে বিবাহ বাতিল বা দণ্ডনীয় হয়।",
    "hindu marriage act, 1955_7":
      "ধারা ৭ হিন্দু বিবাহের অনুষ্ঠানের বিধান রাখে। সপ্তপদী (পবিত্র অগ্নির সামনে সাতটি পদক্ষেপ) সহ যেকোনো প্রচলিত আচার-অনুষ্ঠানে বিবাহ সম্পন্ন হতে পারে। সপ্তম পদক্ষেপে বিবাহ সম্পূর্ণ ও বাধ্যকর হয়।",
    "hindu marriage act, 1955_10":
      "ধারা ১০ বিচারিক বিচ্ছেদের বিধান রাখে — বিবাহ বিচ্ছিন্ন না করে পৃথকভাবে বসবাসের অধিকার। তালাকের মতো একই কারণে আবেদন করা যায়। এক বছর ধরে একত্রে না থাকলে তালাকের ভিত্তি হয়।",
    "hindu marriage act, 1955_11":
      "ধারা ১১ বাতিল বিবাহের বিধান রাখে — দ্বিবিবাহ, নিষিদ্ধ সম্পর্ক, বা সাপিন্ড বিবাহ সম্পূর্ণ বাতিল। এই বিবাহ কখনই আইনি দৃষ্টিতে বৈধ ছিল না।",
    "hindu marriage act, 1955_12":
      "ধারা ১২ খণ্ডযোগ্য বিবাহের বিধান রাখে — পুরুষত্বহীনতা, অসুস্থতা, জবরদস্তি বা প্রতারণায় সম্মতি, বা বিয়ের সময় অন্যের সন্তান গর্ভে থাকলে বিবাহ বাতিল করা যায়।",
    "hindu marriage act, 1955_13b":
      "ধারা ১৩B পারস্পরিক সম্মতিতে বিবাহবিচ্ছেদের বিধান রাখে। উভয় পক্ষ একমত হলে এবং এক বছর আলাদা থাকলে যৌথভাবে আবেদন করতে পারেন। ৬ মাসের বিচার্যকাল আছে।",
    "hindu marriage act, 1955_14":
      "ধারা ১৪ বিবাহের এক বছর পূর্ণ না হলে তালাকের আবেদন নিষিদ্ধ করে। ব্যতিক্রম: অসাধারণ কষ্ট বা চরম নীচতার ক্ষেত্রে আদালতের অনুমতিতে আগেও আবেদন করা যায়।",
    "hindu marriage act, 1955_15":
      "ধারা ১৫ তালাকের পর পুনর্বিবাহের অধিকার দেয় — তবে আপিলের মেয়াদ শেষ হওয়ার আগে পুনর্বিবাহ করা যাবে না। আগে বিয়ে করলে ধারা ১১ অনুযায়ী বাতিল বিবাহ হবে।",
    "hindu marriage act, 1955_16":
      "ধারা ১৬ বাতিল বিবাহের সন্তানদের বৈধতা দেয় — মা-বাবার দোষে সন্তান ক্ষতিগ্রস্ত হবে না। এই সন্তানরা বৈধ এবং পিতামাতার সম্পত্তি উত্তরাধিকার পেতে পারে।",
    "hindu marriage act, 1955_17":
      "ধারা ১৭ হিন্দুদের জন্য দ্বিবিবাহকে শাস্তিযোগ্য করে। প্রথম স্ত্রী/স্বামী জীবিত থাকতে পুনর্বিবাহ করলে দ্বিতীয় বিবাহ বাতিল এবং IPC ধারা ৪৯৪ অনুযায়ী দণ্ডনীয়।",
    "hindu marriage act, 1955_24":
      "ধারা ২৪ মামলা চলাকালীন অন্তর্বর্তী ভরণপোষণ দেয় — স্বামী বা স্ত্রী যে কেউ আবেদন করতে পারেন। মামলার খরচ এবং মাসিক ভরণপোষণ উভয় পক্ষের আয় বিবেচনা করে নির্ধারিত হয়।",
    "hindu marriage act, 1955_25":
      "ধারা ২৫ স্থায়ী ভরণপোষণ ও রক্ষণাবেক্ষণের বিধান রাখে — তালাক বা বিচ্ছেদের পরে আবেদন করা যায়। পুনর্বিবাহ করলে বা মারা গেলে ভরণপোষণ বন্ধ হয়।",
    "hindu marriage act, 1955_26":
      "ধারা ২৬ নাবালক সন্তানের হেফাজত, ভরণপোষণ ও শিক্ষার বিষয়ে আদেশের ক্ষমতা দেয়। সন্তানের কল্যাণ সর্বোচ্চ বিবেচনা — বাবা-মায়ের আইনি অধিকার নয়।",
    "hindu marriage act, 1955_27":
      "ধারা ২৭ বিবাহের সময় উভয়কে যৌথভাবে দেওয়া সম্পত্তির বিষয়ে আদেশের ক্ষমতা দেয়। শুধুমাত্র যৌথ উপহার — এক পক্ষের নিজস্ব সম্পত্তি এর আওতায় পড়ে না।",
    "hindu marriage act, 1955_28":
      "ধারা ২৮ হিন্দু বিবাহ আইনের সকল ডিক্রির বিরুদ্ধে আপিলের অধিকার দেয়। জেলা আদালতের ডিক্রির বিরুদ্ধে হাইকোর্টে আপিল করা যায়। আপিলের মেয়াদ ৯০ দিন।",
    "hindu marriage act, 1955_13":
      "ধারা ১৩ হিন্দু বিবাহ আইন বিবাহবিচ্ছেদের কারণগুলি নির্ধারণ করে। পরকীয়া, নিষ্ঠুরতা, পরিত্যাগ (২+ বছর), ধর্মান্তর, মানসিক অসুস্থতা ইত্যাদি কারণে বিবাহবিচ্ছেদ পাওয়া যায়।",
    "hindu marriage act, 1955_9":
      "ধারা ৯ হিন্দু বিবাহ আইন দাম্পত্য অধিকার পুনরুদ্ধারের বিধান রাখে। স্বামী বা স্ত্রী কারণ ছাড়া চলে গেলে অপর পক্ষ আদালতে ফিরিয়ে আনার আবেদন করতে পারেন।",
    "information technology act, 2000_66":
      "ধারা ৬৬ IT আইন কম্পিউটার সম্পর্কিত অপরাধের শাস্তি নির্ধারণ করে। অসৎ উদ্দেশ্যে হ্যাকিং, ভাইরাস ছড়ানো, ডেটা চুরি ইত্যাদি কাজে ৩ বছর পর্যন্ত কারাদণ্ড হতে পারে।",
    "information technology act, 2000_66c":
      "ধারা ৬৬C IT আইন পরিচয় চুরির শাস্তি দেয়। কারও পাসওয়ার্ড, ডিজিটাল স্বাক্ষর বা ইউনিক ID প্রতারণামূলকভাবে ব্যবহার করলে ৩ বছর পর্যন্ত কারাদণ্ড এবং ১ লক্ষ টাকা জরিমানা।",
    "information technology act, 2000_67":
      "ধারা ৬৭ IT আইন অশ্লীল বিষয়বস্তু ইলেকট্রনিক মাধ্যমে প্রকাশ বা প্রেরণের শাস্তি দেয়। প্রথমবার ৩ বছর কারাদণ্ড ও ৫ লক্ষ টাকা জরিমানা; দ্বিতীয়বার ৫ বছর কারাদণ্ড।",
    "bharatiya nyaya sanhita, 2023_103":
      "BNS ধারা ১০৩ হত্যার শাস্তি নির্ধারণ করে — মৃত্যুদণ্ড বা যাবজ্জীবন কারাদণ্ড। এটি IPC ধারা ৩০২-এর প্রতিস্থাপন। 'বিরলতম' মামলায় মৃত্যুদণ্ড দেওয়া হয়।",
    "bharatiya nyaya sanhita, 2023_64":
      "BNS ধারা ৬৪ ধর্ষণের শাস্তি নির্ধারণ করে — ন্যূনতম ১০ বছরের কঠোর কারাদণ্ড থেকে যাবজ্জীবন পর্যন্ত। IPC ৩৭৬-এর প্রতিস্থাপন।",
    "bharatiya nagarik suraksha sanhita, 2023_173":
      "BNSS ধারা ১৭৩ FIR (প্রথম তথ্য রিপোর্ট) নিবন্ধনের বিধান রাখে। পুলিশ FIR নিতে অস্বীকার করতে পারে না — Lalita Kumari মামলা অনুযায়ী এটি বাধ্যতামূলক।",
    "bharatiya nagarik suraksha sanhita, 2023_479":
      "BNSS ধারা ৪৭৯ বিচারাধীন বন্দীদের জামিনের অধিকার দেয় — সর্বোচ্চ কারাদণ্ডের অর্ধেক সময় কাটালে জামিন পাওয়ার যোগ্য হবে। প্রথমবারের অপরাধীর জন্য এক-তৃতীয়াংশ সময়।",
    "code of criminal procedure, 1973_154":
      "ধারা ১৫৪ CrPC FIR নিবন্ধনের মূল বিধান — পুলিশ কোনো জ্ঞাত অপরাধের অভিযোগ অস্বীকার করতে পারে না। ১ জুলাই ২০২৪ থেকে BNSS ১৭৩ দ্বারা প্রতিস্থাপিত।",
    "code of criminal procedure, 1973_125":
      "ধারা ১২৫ CrPC ভরণপোষণ প্রদান করে — স্ত্রী, অপ্রাপ্তবয়স্ক সন্তান এবং পিতামাতা দাবি করতে পারেন। সব ধর্মের জন্য প্রযোজ্য ধর্মনিরপেক্ষ আইন।",
    "negotiable instruments act, 1881_138":
      "NI Act ধারা ১৩৮ চেক বাউন্সকে অপরাধ হিসেবে ঘোষণা করে। ২ বছর পর্যন্ত কারাদণ্ড বা চেকের দ্বিগুণ জরিমানা। ৩০ দিনের নোটিস দিতে হবে, ১৫ দিনে পেমেন্ট না হলে মামলা করা যাবে।",
    "protection of children from sexual offences act, 2012_4":
      "POCSO ধারা ৪ শিশুর উপর (১৮ বছরের নিচে) যৌন হামলার শাস্তি দেয় — ন্যূনতম ১০ বছরের কঠোর কারাদণ্ড থেকে যাবজ্জীবন পর্যন্ত। শিশুর সম্মতি অপ্রাসঙ্গিক।",
    "right to information act, 2005_6":
      "RTI ধারা ৬ তথ্য চাওয়ার পদ্ধতি নির্ধারণ করে — যেকোনো নাগরিক ১০ টাকার ফি দিয়ে তথ্য চাইতে পারেন। ৩০ দিনের মধ্যে উত্তর দিতে হবে।",
    "protection of women from domestic violence act, 2005_3":
      "DV Act ধারা ৩ গার্হস্থ্য হিংসার সংজ্ঞা দেয় — শারীরিক, যৌন, মানসিক এবং অর্থনৈতিক নির্যাতন সবই অন্তর্ভুক্ত। লিভ-ইন সম্পর্কেও প্রযোজ্য।",
    "constitution of india, 1950_15":
      "সংবিধানের ১৫ অনুচ্ছেদ ধর্ম, জাতি, বর্ণ, লিঙ্গ বা জন্মস্থানের ভিত্তিতে বৈষম্য নিষিদ্ধ করে। তবে মহিলা, শিশু এবং পিছিয়ে পড়া শ্রেণির জন্য বিশেষ বিধান করা যায়।",
    "constitution of india, 1950_20":
      "অনুচ্ছেদ ২০ তিনটি সুরক্ষা দেয়: (১) কৃতকার্যের পূর্ববর্তী আইনে শাস্তি নয়, (২) একই অপরাধে দ্বিবার শাস্তি নয়, (৩) নিজের বিরুদ্ধে সাক্ষী হতে বাধ্য করা যাবে না।",
    "constitution of india, 1950_22":
      "অনুচ্ছেদ ২২ গ্রেফতারের বিরুদ্ধে সুরক্ষা দেয়: গ্রেফতারের কারণ জানানো, আইনজীবীর সাথে পরামর্শ, ২৪ ঘণ্টার মধ্যে ম্যাজিস্ট্রেটের সামনে হাজির করা।",
  };

  const matchKey = Object.keys(benDict).find(
    (k) =>
      k.includes(sec.toLowerCase()) ||
      k.includes(actName.toLowerCase().substring(0, 10)),
  );
  return matchKey ? benDict[matchKey] : "";
}

function toBengaliExample(e: string): string {
  return e;
}

export function getAllActNames(): string[] {
  return [...new Set(Object.values(LAW_DATABASE).map((r) => r.actName))];
}
