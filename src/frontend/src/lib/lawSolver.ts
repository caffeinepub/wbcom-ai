export type LawLanguage = "bengali" | "english";

export interface LawResult {
  title: string;
  actName: string;
  sectionNumber: string;
  sectionText: string;
  explanation: string;
  examples: string[];
  landmarkCases: Array<{ name: string; summary: string }>;
  exceptions: string;
  overridingEffect: string;
  relatedSections: Array<{ ref: string; description: string }>;
}

type LawDB = Record<string, LawResult>;

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
};

const KEY_ALIASES: Record<string, string> = {
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
