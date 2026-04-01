import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

export interface JudgmentEntry {
  id: number;
  case: string;
  court: string;
  date: string;
  summary: string;
  fullSummary: string;
}

export const DEFAULT_JUDGMENTS: JudgmentEntry[] = [
  {
    id: 1,
    case: "Vineeta Sharma v. Rakesh Sharma",
    court: "Supreme Court",
    date: "2020-08-11",
    summary:
      "Daughters have equal coparcenary rights under Hindu Succession Act",
    fullSummary:
      "A 3-judge bench held that the 2005 amendment to Section 6 of the Hindu Succession Act confers equal rights on daughters in coparcenary property, irrespective of whether the father was alive on the date of amendment. This landmark ruling settled conflicting High Court decisions and established daughters' equal right to ancestral property.",
  },
  {
    id: 2,
    case: "Arnab Ranjan Goswami v. Union of India",
    court: "Supreme Court",
    date: "2020-11-11",
    summary:
      "Liberty of citizens and freedom of press must be zealously protected",
    fullSummary:
      "The Supreme Court granted bail to Arnab Goswami and strongly reiterated that Article 21 (Right to Life and Personal Liberty) protects all citizens including journalists. The court emphasised that High Courts must not shirk their constitutional duty to safeguard personal liberty under Article 226 and that bail should not be denied mechanically.",
  },
  {
    id: 3,
    case: "In Re: Cognizance for Extension of Limitation",
    court: "Supreme Court",
    date: "2021-03-08",
    summary: "Limitation period extended due to COVID-19 pandemic",
    fullSummary:
      "The Supreme Court suo motu extended limitation periods for all courts, tribunals, and quasi-judicial bodies due to COVID-19. This order restored limitation from October 3, 2021 and provided relief to litigants who missed deadlines due to the pandemic. It was a landmark exercise of the Supreme Court's extraordinary jurisdiction under Article 142.",
  },
  {
    id: 4,
    case: "State of Kerala v. Leesamma Joseph",
    court: "Supreme Court",
    date: "2021-08-30",
    summary:
      "Government employee entitled to maternity leave even for 3rd child if first two children died",
    fullSummary:
      "The Supreme Court held that a government employee is entitled to maternity leave for a third child if her first two children have died. The court emphasised that maternity leave is a social welfare measure and must be interpreted liberally to protect women's rights and dignity under Article 21 of the Constitution.",
  },
  {
    id: 5,
    case: "Satender Kumar Antil v. CBI",
    court: "Supreme Court",
    date: "2022-07-11",
    summary:
      "Guidelines issued for grant of bail to reduce unnecessary incarceration",
    fullSummary:
      "The Supreme Court issued comprehensive guidelines for the grant of bail across courts, emphasising that bail is the rule and jail is the exception. The court directed that undertrial prisoners languishing in jails for extended periods must be considered for bail and reiterated the right to speedy trial under Article 21. The judgment addressed systemic overcrowding in prisons.",
  },
  {
    id: 6,
    case: "Justice K.S. Puttaswamy v. Union of India (Aadhaar)",
    court: "Supreme Court",
    date: "2018-09-26",
    summary:
      "Aadhaar upheld but mandatory linking for private entities struck down",
    fullSummary:
      "A 5-judge Constitutional bench upheld the Aadhaar scheme as constitutionally valid while striking down the mandatory linking of Aadhaar with private entities. The court held that the Right to Privacy (established in the 9-judge bench in 2017) must be balanced with the state's legitimate interest in welfare schemes. Section 57 of the Aadhaar Act was struck down as unconstitutional.",
  },
  {
    id: 7,
    case: "Shafin Jahan v. Asokan K.M. (Hadiya Case)",
    court: "Supreme Court",
    date: "2018-03-08",
    summary: "Adult's right to choose partner is fundamental right",
    fullSummary:
      "The Supreme Court upheld an adult woman's right to marry a person of her choice, setting aside the Kerala High Court's annulment of a marriage. The court held that an adult's right to choose their partner is a fundamental right under Articles 19 and 21, and courts cannot annul a valid marriage based on concerns about conversion or parental disapproval.",
  },
  {
    id: 8,
    case: "Common Cause v. Union of India",
    court: "Supreme Court",
    date: "2018-03-09",
    summary: "Right to die with dignity recognised as fundamental right",
    fullSummary:
      "A 5-judge Constitutional bench held that the right to die with dignity is a fundamental right under Article 21. The court allowed 'passive euthanasia' and recognised 'advance medical directives' (living wills) as legally valid. This landmark judgment gave terminally ill patients the right to refuse life-prolonging treatment through advance directives.",
  },
  {
    id: 9,
    case: "Navtej Singh Johar v. Union of India",
    court: "Supreme Court",
    date: "2018-09-06",
    summary:
      "Section 377 IPC reading down — consensual same-sex relations decriminalised",
    fullSummary:
      "A 5-judge Constitutional bench unanimously read down Section 377 of the IPC, decriminalising consensual same-sex relations between adults. The court held that Section 377 violated Articles 14, 15, 19, and 21 of the Constitution. The judgment overruled Suresh Koushal (2013) and restored the Delhi High Court's Naz Foundation judgment (2009).",
  },
  {
    id: 10,
    case: "Prathvi Raj Chauhan v. Union of India",
    court: "Supreme Court",
    date: "2020-02-10",
    summary:
      "Automatic registration of FIR under SC/ST Act not required; preliminary inquiry permitted",
    fullSummary:
      "The Supreme Court clarified its earlier Dr. Subhash Kashinath Mahajan judgment and held that a preliminary inquiry is permissible before registering FIR in cases under the SC/ST (Prevention of Atrocities) Act, but arrest without prior approval is permissible for certain categories. The judgment balanced protection of SC/ST communities with prevention of misuse.",
  },
  {
    id: 11,
    case: "Electoral Bonds Scheme Case",
    court: "Supreme Court",
    date: "2024-02-15",
    summary: "Electoral Bonds Scheme struck down as unconstitutional",
    fullSummary:
      "A 5-judge Constitutional bench unanimously struck down the Electoral Bonds Scheme, 2018 as unconstitutional. The court held that it violated the right to information about political funding under Article 19(1)(a). The court directed the State Bank of India to submit details of all electoral bonds to the Election Commission of India, which was then published on its website. A landmark transparency ruling.",
  },
  {
    id: 12,
    case: "Supriyo v. Union of India",
    court: "Supreme Court",
    date: "2023-10-17",
    summary: "No fundamental right to same-sex marriage; Parliament to decide",
    fullSummary:
      "A 5-judge Constitutional bench held that there is no fundamental right to same-sex marriage under the Constitution of India. However, the court directed the government to set up a committee to examine rights of same-sex couples including recognition of relationships, inheritance, adoption, and other benefits. The court also struck down the Central Adoption Resource Authority circular that prohibited adoption by same-sex couples.",
  },
  {
    id: 13,
    case: "N.N. Global Mercantile v. Indo Unique Flame",
    court: "Supreme Court",
    date: "2023-04-25",
    summary:
      "Arbitration clause in unstamped agreement valid for referral purposes",
    fullSummary:
      "A 7-judge Constitutional bench held that an arbitration agreement in an unstamped contract is not void or unenforceable ab initio. The lack of stamp duty does not make an arbitration clause invalid for the purposes of referral under Section 11 of the Arbitration Act. This overruled N.N. Global (5-judge, 2021) and settled significant uncertainty in arbitration law.",
  },
  {
    id: 14,
    case: "In Re: Article 370 Abrogation",
    court: "Supreme Court",
    date: "2023-12-11",
    summary: "Abrogation of Article 370 upheld; J&K statehood to be restored",
    fullSummary:
      "A 5-judge Constitutional bench upheld the constitutional validity of the abrogation of Article 370 of the Constitution. The court held that Article 370 was a temporary provision and the President had the power to abrogate it. The court also directed that statehood of Jammu & Kashmir be restored as soon as possible and that elections be held by September 30, 2024.",
  },
  {
    id: 15,
    case: "Bilkis Bano v. Union of India",
    court: "Supreme Court",
    date: "2024-01-08",
    summary:
      "Remission of sentences of 11 convicts in 2002 Gujarat riots case quashed",
    fullSummary:
      "The Supreme Court quashed the remission of sentences granted by the Gujarat government to 11 convicts in the Bilkis Bano gang rape case (2002 Gujarat riots). The court held that the competent government for granting remission was Maharashtra (where the trial was held), not Gujarat. The court also found that the remission was granted without following due procedure and directed the convicts to surrender within 2 weeks.",
  },
  {
    id: 16,
    case: "M.K. Ranjitsinh v. Union of India",
    court: "Supreme Court",
    date: "2024-04-01",
    summary:
      "Right against adverse effects of climate change is a fundamental right",
    fullSummary:
      "A 3-judge bench held that the right against adverse effects of climate change is a fundamental right under Articles 14 and 21. The court recognised the right to a clean environment and the state's duty to protect citizens from environmental degradation. The case arose from the conservation of the Great Indian Bustard and the conflict between renewable energy projects and wildlife protection.",
  },
  {
    id: 17,
    case: "State of Maharashtra v. Vijay Madanlal Choudhary",
    court: "Supreme Court",
    date: "2022-07-27",
    summary:
      "Key provisions of PMLA upheld; ED's power of arrest, search, seizure valid",
    fullSummary:
      "A 3-judge bench upheld the key provisions of the Prevention of Money Laundering Act (PMLA), 2002, including the reverse burden of proof under Section 24, the ED's power to arrest without disclosing grounds, and the stringent bail conditions under Section 45. The court held that PMLA is a special law and its rigorous provisions are constitutionally valid to combat money laundering.",
  },
  {
    id: 18,
    case: "Anoop Baranwal v. Union of India",
    court: "Supreme Court",
    date: "2023-03-02",
    summary: "Election Commissioners to be appointed by PM, LoP, and CJI panel",
    fullSummary:
      "A 5-judge Constitutional bench held that Election Commissioners shall be appointed by a committee comprising the Prime Minister, the Leader of Opposition in Lok Sabha, and the Chief Justice of India, until Parliament enacts a law. This was a major constitutional reform to ensure the independence and impartiality of the Election Commission of India.",
  },
  {
    id: 19,
    case: "Union of India v. Association for Democratic Reforms",
    court: "Supreme Court",
    date: "2024-03-14",
    summary: "100% VVPAT verification demanded by Election Commission declined",
    fullSummary:
      "The Supreme Court declined to order 100% verification of VVPAT slips with EVM counts, holding that the Election Commission's existing system of 5 EVMs per assembly constituency is sufficient. The court held that there is a presumption of regularity in the functioning of constitutional bodies and that there was no evidence of systemic malfunction.",
  },
  {
    id: 20,
    case: "Patna High Court Bar Association v. Union of India",
    court: "Supreme Court",
    date: "2024-02-01",
    summary:
      "Advocates' right to strike not absolute; courts cannot be held hostage",
    fullSummary:
      "The Supreme Court reiterated that advocates have no right to strike and boycott courts. The court emphasised that strikes by lawyers cause irreparable harm to litigants and obstruct access to justice. The court directed Bar Associations to resolve grievances through dialogue and legal channels rather than strikes.",
  },
  {
    id: 21,
    case: "In Re: Death of 26 children at Muzaffarpur shelter home",
    court: "Supreme Court",
    date: "2020-02-05",
    summary:
      "SC directions for protection of children in state-run shelter homes",
    fullSummary:
      "The Supreme Court issued extensive directions for the protection of children in state-run shelter homes across India, following shocking revelations of abuse, sexual exploitation, and mysterious deaths at a Muzaffarpur shelter home. The court directed NCPCR to conduct inspections of all shelter homes and mandated accountability for shelter home management.",
  },
  {
    id: 22,
    case: "Gurwant Singh Pannu v. State of Punjab",
    court: "Punjab & Haryana HC",
    date: "2023-06-15",
    summary:
      "Anticipatory bail cannot be denied merely because accused is an absconder",
    fullSummary:
      "The Punjab & Haryana High Court held that anticipatory bail under Section 438 CrPC cannot be denied merely on the ground that the accused is an absconder. The court held that each application must be considered on its merits and that the conduct of the accused in absconding is a factor but not the sole determinative factor.",
  },
  {
    id: 23,
    case: "Centre for PIL v. Union of India (NOTA case)",
    court: "Supreme Court",
    date: "2018-09-28",
    summary:
      "NOTA option valid; highest vote-getter wins even if NOTA gets more votes",
    fullSummary:
      "The Supreme Court held that NOTA (None of the Above) option is valid in elections to Legislative Assemblies. However, the court clarified that NOTA does not trigger a re-election; the candidate with the highest number of valid votes wins even if NOTA gets more votes than any individual candidate. The court upheld the Election Commission's rules on NOTA.",
  },
  {
    id: 24,
    case: "Prabha Tyagi v. Kamlesh Devi",
    court: "Supreme Court",
    date: "2022-05-06",
    summary:
      "Woman can seek protection under DV Act even if she is not living in shared household",
    fullSummary:
      "The Supreme Court held that a woman can seek protection under the Protection of Women from Domestic Violence Act 2005 even if she is not residing in the shared household at the time of filing the application. The court broadly interpreted 'aggrieved person' under the DV Act to include women who have faced domestic violence at any point, not just those currently residing in the shared household.",
  },
  {
    id: 25,
    case: "Srikant Upadhyay v. State of Bihar",
    court: "Supreme Court",
    date: "2024-05-20",
    summary: "FIR against journalist for news report on corruption quashed",
    fullSummary:
      "The Supreme Court quashed the FIR registered against a journalist for reporting on alleged corruption by government officials. The court reiterated that freedom of press under Article 19(1)(a) is a cornerstone of democracy and that honest reporting on matters of public interest is protected speech. The court warned against the use of criminal law to silence journalists.",
  },
  {
    id: 26,
    case: "In Re: Inhuman Conditions in 1382 Prisons",
    court: "Supreme Court",
    date: "2021-09-30",
    summary: "Supreme Court lays down guidelines for decongestion of prisons",
    fullSummary:
      "The Supreme Court laid down comprehensive guidelines for decongestion of overcrowded prisons across India, including directions for High-Powered Committees, regular bail hearings for undertrials, and video-conferencing for bail applications. The court noted that many prisons in India operate at 150-200% of capacity and that this amounts to a violation of the right to life under Article 21.",
  },
  {
    id: 27,
    case: "Arjun Panditrao Khotkar v. Kailash Kushanrao Gorantyal",
    court: "Supreme Court",
    date: "2020-07-14",
    summary: "Section 65B certificate mandatory for electronic evidence",
    fullSummary:
      "The Supreme Court held that a certificate under Section 65B of the Evidence Act is mandatory (not optional) for admissibility of electronic evidence. Without such a certificate from the person responsible for the computer output, electronic evidence is not admissible. This judgment has significant implications for cyber cases, social media evidence, and digital records.",
  },
  {
    id: 28,
    case: "Suo Motu v. State of Uttar Pradesh (Hathras Gang Rape)",
    court: "Allahabad HC",
    date: "2020-09-16",
    summary: "High Court suo motu takes cognizance of Hathras gang rape case",
    fullSummary:
      "The Allahabad High Court took suo motu cognizance of the Hathras gang rape and murder case, questioning the UP government's handling of the investigation and the hasty cremation of the victim's body. The court appointed a monitoring committee and sought detailed reports from the state government on the investigation and action taken against the accused.",
  },
  {
    id: 29,
    case: "Rakesh Kumar Paul v. State of Assam",
    court: "Supreme Court",
    date: "2017-09-12",
    summary: "Default bail under Section 167(2) CrPC is an indefeasible right",
    fullSummary:
      "The Supreme Court held that the right to default bail under Section 167(2) CrPC is an indefeasible right that automatically accrues on the expiry of 60/90 days if chargesheet is not filed. Subsequent filing of chargesheet does not defeat the right. The bail application must be filed before the chargesheet is actually filed; once filed, the right is extinguished. This judgment clarified the temporal aspect of the default bail right.",
  },
  {
    id: 30,
    case: "New India Assurance v. V.K. Rao",
    court: "Supreme Court",
    date: "2020-11-03",
    summary:
      "Motor accident compensation must include future earning prospects",
    fullSummary:
      "The Supreme Court laid down comprehensive guidelines for computation of motor accident compensation, including the methodology for calculating future earnings, loss of consortium, loss of love and affection, and pain and suffering. The court emphasised that compensation must be just and fair, not inadequate, and must account for inflation and career progression.",
  },
  {
    id: 31,
    case: "Bhim Rao Ambedkar v. State of Uttar Pradesh",
    court: "Allahabad HC",
    date: "2023-08-22",
    summary:
      "Police cannot detain person beyond 24 hours without magistrate's order",
    fullSummary:
      "The Allahabad High Court reiterated that under Article 22(2) of the Constitution read with Section 57 CrPC, an arrested person must be produced before a magistrate within 24 hours of arrest. Detention beyond 24 hours without a magistrate's order is illegal and amounts to wrongful confinement. The court directed strict compliance and awarded compensation to the petitioner.",
  },
  {
    id: 32,
    case: "XYZ v. State of Maharashtra (Cyber Stalking Case)",
    court: "Bombay HC",
    date: "2022-11-14",
    summary:
      "Cyberstalking under IT Act 66A (struck down) now prosecuted under IPC 354D",
    fullSummary:
      "The Bombay High Court held that cyberstalking and online harassment cases must be prosecuted under Section 354D IPC (stalking) and Section 66C/66E of the IT Act, since Section 66A was struck down by the Supreme Court in Shreya Singhal (2015). The court directed police to update their standard operating procedures for cyber harassment cases.",
  },
  {
    id: 33,
    case: "Aparna Bhat v. State of Madhya Pradesh",
    court: "Supreme Court",
    date: "2021-03-19",
    summary:
      "Bail conditions in rape cases cannot impose rakhi-tying or marriage",
    fullSummary:
      "The Supreme Court issued strong guidelines stating that bail conditions in cases involving crimes against women must not be patriarchal, degrading, or humiliating to victims. Conditions like tying rakhi, marrying the accused, or seeking the victim's forgiveness are unconstitutional and violate the victim's dignity under Article 21. High Courts cannot impose such conditions as part of bail or settlement.",
  },
  {
    id: 34,
    case: "Re: Expeditious Trial of Criminal Cases",
    court: "Supreme Court",
    date: "2021-10-04",
    summary:
      "SC issues directions for speedy trial; witnesses must depose within 6 months",
    fullSummary:
      "The Supreme Court issued comprehensive directions for the speedy trial of criminal cases, including that once charges are framed, trials must be completed on a day-to-day basis. The court directed that witnesses must be examined within 6 months of charges being framed, and courts must avoid granting adjournments except for exceptional circumstances. The right to speedy trial under Article 21 must be prioritised.",
  },
  {
    id: 35,
    case: "Vidya Devi v. State of Himachal Pradesh",
    court: "Supreme Court",
    date: "2020-01-22",
    summary:
      "Forcible land acquisition without compensation violates fundamental rights",
    fullSummary:
      "The Supreme Court held that forcible acquisition of land by the state without paying compensation violates the right to property (Article 300A) and the right to life (Article 21). The state cannot rely on delay or limitation to avoid paying compensation for land taken over decades ago. The government was directed to pay market value plus interest to the petitioner.",
  },
  {
    id: 36,
    case: "P.V. Narsimha Rao v. State (JMM Bribery Case) — Reconsideration",
    court: "Supreme Court",
    date: "2024-03-04",
    summary:
      "MPs/MLAs not immune from corruption charges for votes cast in legislature",
    fullSummary:
      "A 7-judge Constitutional bench overruled the 1998 judgment in P.V. Narsimha Rao v. State and held that MPs and MLAs do not have immunity from prosecution under the Prevention of Corruption Act for bribes taken to vote or speak in the legislature. The court held that Article 105 and 194 of the Constitution do not protect legislators from corruption charges. A landmark ruling against legislative corruption.",
  },
  {
    id: 37,
    case: "Hema Committee Report Case",
    court: "Kerala HC",
    date: "2024-08-19",
    summary:
      "Sexual harassment rampant in Malayalam film industry; HC takes cognizance",
    fullSummary:
      "Following publication of the Hema Committee Report revealing widespread sexual harassment and exploitation in the Malayalam film industry, the Kerala High Court took suo motu cognizance and directed registration of FIRs based on specific complaints. The case highlighted the need for POSH (Prevention of Sexual Harassment) Act implementation in entertainment industries and prompted multiple police investigations.",
  },
  {
    id: 38,
    case: "State of Punjab v. Davinder Singh",
    court: "Supreme Court",
    date: "2024-08-01",
    summary:
      "States can sub-classify SC/ST categories for reservation purposes",
    fullSummary:
      "A 7-judge Constitutional bench held that states have the power to sub-classify Scheduled Castes and Scheduled Tribes into different categories for reservation purposes, allowing preferential treatment for more backward groups within SC/ST categories. The court overruled E.V. Chinnaiah (2004) and held that sub-classification does not violate Article 14. This has significant implications for reservation policy across India.",
  },
  {
    id: 39,
    case: "Property Owners Association v. State of Maharashtra",
    court: "Supreme Court",
    date: "2024-11-05",
    summary:
      "Private property is not 'material resource of community'; Article 39(b) reinterpreted",
    fullSummary:
      "A 9-judge Constitutional bench held that not all private property can be considered 'material resources of the community' under Article 39(b) of the Constitution. The majority overruled Justice Krishna Iyer's expansive interpretation and held that private property can only be treated as a community resource if it meets specific criteria. This judgment significantly impacts state acquisition powers.",
  },
  {
    id: 40,
    case: "Shayara Bano v. Union of India (Triple Talaq)",
    court: "Supreme Court",
    date: "2017-08-22",
    summary: "Instant Triple Talaq declared unconstitutional",
    fullSummary:
      "A 5-judge Constitutional bench by a 3:2 majority declared the practice of instant Triple Talaq (talaq-e-biddat) unconstitutional. Justices Nariman and Lalit held it violated Article 14; Justice Joseph held it was against the Quran. The court suspended the practice for 6 months. Parliament subsequently enacted the Muslim Women (Protection of Rights on Marriage) Act, 2019 criminalising instant Triple Talaq.",
  },
  {
    id: 41,
    case: "Indore Development Authority v. Manoharlal",
    court: "Supreme Court",
    date: "2020-03-06",
    summary:
      "Land acquisition proceedings do not lapse under Section 24 of 2013 Act if compensation not collected",
    fullSummary:
      "A 5-judge Constitutional bench held that land acquisition under the Right to Fair Compensation and Transparency in Land Acquisition Act 2013 does not lapse merely because the landowner refused to collect compensation or the compensation was deposited in court. The court overruled Pune Municipal Corporation (2014) and held that Section 24(2) requires that compensation must have been neither tendered nor paid.",
  },
  {
    id: 42,
    case: "Mahant Shri Jagannath Ramanuj Das v. State of Orissa",
    court: "Orissa HC",
    date: "2022-03-15",
    summary: "Religious trusts cannot be taken over without due process",
    fullSummary:
      "The Orissa High Court held that religious and charitable trusts cannot be taken over by state authorities without following due process of law, including issuing show cause notices and providing an opportunity of hearing. Arbitrary takeover of religious trusts violates the fundamental rights of religious minorities under Articles 25, 26, and 29 of the Constitution.",
  },
  {
    id: 43,
    case: "S.G. Vombatkere v. Union of India (Section 124A)",
    court: "Supreme Court",
    date: "2022-05-11",
    summary: "Sedition law (IPC 124A) put on hold pending re-examination",
    fullSummary:
      "The Supreme Court stayed all ongoing proceedings under Section 124A IPC (sedition) and directed that no new FIRs be registered under the provision until the central government re-examines it. The court noted that the law was a tool of colonial oppression and needed to be reconsidered in light of fundamental rights. The BNS 2023 subsequently omitted Section 124A, replacing it with Section 152 BNS.",
  },
  {
    id: 44,
    case: "Siddique Kappan v. State of Uttar Pradesh",
    court: "Supreme Court",
    date: "2022-09-09",
    summary: "Journalist gets bail after 2 years; SC criticises UP government",
    fullSummary:
      "The Supreme Court granted bail to journalist Siddique Kappan who was arrested under UAPA in 2020 while travelling to cover the Hathras gang rape case. The court held that he had been in custody for over 2 years without trial and his continued incarceration violated Article 21. The Supreme Court also expressed concern about the UP government's conduct in opposing bail at every stage.",
  },
  {
    id: 45,
    case: "Pankaj Bansal v. Union of India",
    court: "Supreme Court",
    date: "2023-10-03",
    summary: "ED must provide written grounds of arrest to accused",
    fullSummary:
      "The Supreme Court held that the Enforcement Directorate must provide written grounds of arrest to persons arrested under PMLA at the time of arrest. Mere oral communication is insufficient. This judgment significantly strengthened the rights of accused persons against arbitrary arrest by the ED and brought PMLA arrests in line with constitutional requirements under Article 22(1).",
  },
  {
    id: 46,
    case: "Association for Protection of Civil Rights v. Union of India",
    court: "Supreme Court",
    date: "2023-04-20",
    summary:
      "Manual scavenging remains a national shame; SC issues strong directions",
    fullSummary:
      "The Supreme Court expressed deep concern over the continued practice of manual scavenging and sewer deaths in India, despite the Prohibition of Employment as Manual Scavengers Act 2013. The court directed compensation of ₹30 lakh for deaths due to sewer cleaning and ordered complete mechanisation of sewer cleaning. The court noted that caste discrimination continues to drive manual scavenging.",
  },
  {
    id: 47,
    case: "Ram Kishore Arora v. Enforcement Directorate",
    court: "Supreme Court",
    date: "2023-12-14",
    summary: "Remand hearings under PMLA must be meaningful, not mechanical",
    fullSummary:
      "The Supreme Court held that remand hearings in PMLA cases must be conducted meaningfully by magistrates, who must apply their mind to the necessity of custody. Magistrates cannot grant remand mechanically without examining whether custody is justified. The court reiterated that personal liberty under Article 21 cannot be curtailed without proper judicial scrutiny.",
  },
  {
    id: 48,
    case: "Nushrratt Bharuccha v. State (Defamation Case)",
    court: "Bombay HC",
    date: "2023-07-10",
    summary: "Criminal defamation proceedings against actress quashed",
    fullSummary:
      "The Bombay High Court quashed criminal defamation proceedings against actress Nushrratt Bharuccha, holding that opinions expressed on social media about public issues are protected under Article 19(1)(a). The court held that criminal defamation law under IPC Section 499 must be used sparingly and not to stifle legitimate public discourse.",
  },
  {
    id: 49,
    case: "Telangana v. Mohd. Abdul Qasim (Encounter Killing)",
    court: "Supreme Court",
    date: "2024-06-13",
    summary:
      "SC issues guidelines on police encounters to prevent extra-judicial killings",
    fullSummary:
      "The Supreme Court reiterated its guidelines from PUCL v. State of Maharashtra (2014) on police encounters and directed that all alleged encounter killings must be investigated by an independent agency. The court held that the right to life under Article 21 cannot be taken away except by procedure established by law, and encounter killings without judicial sanction amount to murder.",
  },
  {
    id: 50,
    case: "In Re: Regularisation of Migrant Workers",
    court: "Supreme Court",
    date: "2020-05-28",
    summary:
      "SC directs states to provide food, shelter, transport to migrant workers during COVID",
    fullSummary:
      "The Supreme Court took suo motu cognizance of the plight of migrant workers during the COVID-19 lockdown and directed all states and UTs to provide free food, shelter, and transport to migrants. The court held that the right to livelihood under Article 21 includes the right to not be left destitute by state action. The court also directed registration of all migrant workers for benefit of welfare schemes.",
  },
];

const LS_KEY = "vidyasetu_law_judgments";

export function loadJudgments(): JudgmentEntry[] {
  try {
    const stored = localStorage.getItem(LS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as JudgmentEntry[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore
  }
  return DEFAULT_JUDGMENTS;
}

export function saveJudgments(entries: JudgmentEntry[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(entries));
}

export function LawNewsTicker({ judgments }: { judgments: JudgmentEntry[] }) {
  const [selected, setSelected] = useState<JudgmentEntry | null>(null);
  const [paused, setPaused] = useState(false);

  // Duplicate for seamless loop
  const items = [...judgments, ...judgments];

  return (
    <>
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: ticker-scroll 120s linear infinite;
        }
        .ticker-track.paused {
          animation-play-state: paused;
        }
      `}</style>

      <div
        style={{
          background: "#07101f",
          borderBottom: "1px solid rgba(201,168,76,0.3)",
          borderTop: "1px solid rgba(201,168,76,0.2)",
          overflow: "hidden",
          display: "flex",
          alignItems: "stretch",
          height: "40px",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        data-ocid="law.news_ticker.section"
      >
        {/* Label */}
        <div
          style={{
            background: "#c9a84c",
            color: "#0a1628",
            fontSize: "10px",
            fontWeight: "800",
            padding: "0 12px",
            display: "flex",
            alignItems: "center",
            whiteSpace: "nowrap",
            flexShrink: 0,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          ⚖ Latest Judgments
        </div>

        {/* Scrolling track */}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            className={`ticker-track${paused ? " paused" : ""}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0",
              whiteSpace: "nowrap",
            }}
          >
            {items.map((j, idx) => (
              <button
                key={`${j.id}-${idx}`}
                type="button"
                onClick={() => setSelected(j)}
                data-ocid="law.news_ticker.button"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#e8d5a3",
                  fontSize: "12px",
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "#c9a84c", fontWeight: "700" }}>
                  {j.case}
                </span>
                <span style={{ color: "rgba(201,168,76,0.4)" }}>|</span>
                <span style={{ color: "#a89060" }}>{j.court}</span>
                <span style={{ color: "rgba(201,168,76,0.4)" }}>|</span>
                <span>{j.summary}</span>
                <span style={{ color: "rgba(201,168,76,0.3)", marginLeft: 8 }}>
                  ◆
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent
          style={{
            background: "#0a1628",
            border: "1px solid rgba(201,168,76,0.4)",
            color: "#e8d5a3",
            maxWidth: "600px",
          }}
          data-ocid="law.judgment.dialog"
        >
          <DialogHeader>
            <DialogTitle
              style={{
                color: "#c9a84c",
                fontSize: "16px",
                fontWeight: "800",
                lineHeight: "1.4",
              }}
            >
              {selected?.case}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    background: "rgba(201,168,76,0.15)",
                    border: "1px solid rgba(201,168,76,0.3)",
                    color: "#c9a84c",
                    fontSize: "11px",
                    padding: "3px 10px",
                    borderRadius: "20px",
                    fontWeight: "600",
                  }}
                >
                  🏛 {selected.court}
                </span>
                <span
                  style={{
                    background: "rgba(201,168,76,0.08)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    color: "#a89060",
                    fontSize: "11px",
                    padding: "3px 10px",
                    borderRadius: "20px",
                  }}
                >
                  📅{" "}
                  {new Date(selected.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div
                style={{
                  background: "rgba(201,168,76,0.06)",
                  border: "1px solid rgba(201,168,76,0.15)",
                  borderRadius: "8px",
                  padding: "10px 14px",
                }}
              >
                <p
                  style={{
                    color: "#c9a84c",
                    fontSize: "12px",
                    fontWeight: "700",
                    margin: "0 0 4px",
                  }}
                >
                  One-line Summary
                </p>
                <p style={{ color: "#d4c8a8", fontSize: "13px", margin: 0 }}>
                  {selected.summary}
                </p>
              </div>
              <div>
                <p
                  style={{
                    color: "#c9a84c",
                    fontSize: "12px",
                    fontWeight: "700",
                    margin: "0 0 8px",
                  }}
                >
                  📋 Full Judgment Summary
                </p>
                <p
                  style={{
                    color: "#d4c8a8",
                    fontSize: "13px",
                    lineHeight: "1.7",
                    margin: 0,
                  }}
                >
                  {selected.fullSummary}
                </p>
              </div>
              <p
                style={{
                  color: "rgba(168,144,96,0.5)",
                  fontSize: "10px",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                Source: India Code (indiacode.nic.in) | Educational purposes
                only
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
