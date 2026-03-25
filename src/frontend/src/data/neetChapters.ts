export interface NeetChapter {
  id: string;
  name: string;
  bengali: string;
  topics: string[];
}

export const NEET_CHAPTERS: Record<string, NeetChapter[]> = {
  biology: [
    {
      id: "diversity",
      name: "Diversity in Living World",
      bengali: "জীবজগতের বৈচিত্র্য",
      topics: [
        "Taxonomy & Classification",
        "Five Kingdom Classification",
        "Monera, Protista, Fungi",
        "Plant Kingdom (Algae, Bryophyta, Pteridophyta, Gymnosperms, Angiosperms)",
        "Animal Kingdom (Non-chordates, Chordates)",
      ],
    },
    {
      id: "structural_org",
      name: "Structural Organisation",
      bengali: "গঠনগত সংগঠন",
      topics: [
        "Morphology of Flowering Plants",
        "Anatomy of Flowering Plants",
        "Structural Organisation in Animals",
        "Cockroach, Earthworm, Frog",
      ],
    },
    {
      id: "cell",
      name: "Cell Structure & Function",
      bengali: "কোষের গঠন ও কার্যাবলি",
      topics: [
        "Cell Theory",
        "Prokaryotic vs Eukaryotic Cell",
        "Cell Organelles",
        "Cell Membrane & Cell Wall",
        "Cell Cycle & Cell Division (Mitosis, Meiosis)",
      ],
    },
    {
      id: "plant_physiology",
      name: "Plant Physiology",
      bengali: "উদ্ভিদ শরীরবিদ্যা",
      topics: [
        "Transport in Plants",
        "Mineral Nutrition",
        "Photosynthesis",
        "Respiration in Plants",
        "Plant Growth & Development",
      ],
    },
    {
      id: "human_physiology",
      name: "Human Physiology",
      bengali: "মানব শরীরবিদ্যা",
      topics: [
        "Digestion & Absorption",
        "Breathing & Exchange of Gases",
        "Body Fluids & Circulation",
        "Excretory Products & Elimination",
        "Locomotion & Movement",
        "Neural Control & Coordination",
        "Chemical Coordination & Integration",
      ],
    },
    {
      id: "reproduction",
      name: "Reproduction",
      bengali: "জনন",
      topics: [
        "Reproduction in Organisms",
        "Sexual Reproduction in Flowering Plants",
        "Human Reproduction",
        "Reproductive Health",
      ],
    },
    {
      id: "genetics",
      name: "Genetics & Evolution",
      bengali: "জিনতত্ত্ব ও বিবর্তন",
      topics: [
        "Heredity & Variation",
        "Molecular Basis of Inheritance (DNA, RNA)",
        "Evolution",
        "Mendelian Genetics",
        "Chromosomal Theory",
      ],
    },
    {
      id: "bio_welfare",
      name: "Biology & Human Welfare",
      bengali: "জীববিজ্ঞান ও মানব কল্যাণ",
      topics: [
        "Human Health & Disease",
        "Improvement in Food Production",
        "Microbes in Human Welfare",
      ],
    },
    {
      id: "biotech",
      name: "Biotechnology",
      bengali: "জৈবপ্রযুক্তি",
      topics: [
        "Principles & Processes of Biotechnology",
        "Biotechnology & its Applications",
        "Recombinant DNA Technology",
      ],
    },
    {
      id: "ecology",
      name: "Ecology & Environment",
      bengali: "পরিবেশ বিদ্যা",
      topics: [
        "Organisms & Populations",
        "Ecosystem",
        "Biodiversity & Conservation",
        "Environmental Issues",
      ],
    },
  ],
  chemistry: [
    {
      id: "physical_chem",
      name: "Physical Chemistry",
      bengali: "ভৌত রসায়ন",
      topics: [
        "Mole Concept & Stoichiometry",
        "Atomic Structure",
        "Chemical Bonding & Molecular Structure",
        "States of Matter",
        "Thermodynamics",
        "Equilibrium",
        "Redox Reactions",
        "Electrochemistry",
        "Chemical Kinetics",
        "Surface Chemistry",
      ],
    },
    {
      id: "inorganic_chem",
      name: "Inorganic Chemistry",
      bengali: "অজৈব রসায়ন",
      topics: [
        "Periodic Table & Periodicity",
        "Hydrogen",
        "s-Block Elements (Alkali & Alkaline)",
        "p-Block Elements",
        "d-Block & f-Block Elements",
        "Coordination Compounds",
      ],
    },
    {
      id: "organic_chem",
      name: "Organic Chemistry",
      bengali: "জৈব রসায়ন",
      topics: [
        "General Organic Chemistry (GOC)",
        "Hydrocarbons",
        "Haloalkanes & Haloarenes",
        "Alcohols, Phenols & Ethers",
        "Aldehydes, Ketones & Carboxylic Acids",
        "Amines",
        "Biomolecules",
        "Polymers",
        "Chemistry in Everyday Life",
      ],
    },
  ],
  physics: [
    {
      id: "mechanics",
      name: "Mechanics",
      bengali: "বলবিদ্যা",
      topics: [
        "Units & Measurement",
        "Motion in a Straight Line",
        "Motion in a Plane",
        "Laws of Motion",
        "Work, Energy & Power",
        "Rotational Motion",
        "Gravitation",
      ],
    },
    {
      id: "thermodynamics",
      name: "Thermodynamics",
      bengali: "তাপগতিবিদ্যা",
      topics: [
        "Thermal Properties of Matter",
        "Thermodynamics Laws",
        "Kinetic Theory of Gases",
      ],
    },
    {
      id: "oscillations",
      name: "Oscillations & Waves",
      bengali: "দোলন ও তরঙ্গ",
      topics: ["Oscillations (SHM)", "Wave Motion", "Superposition of Waves"],
    },
    {
      id: "electrostatics",
      name: "Electrostatics",
      bengali: "স্থির বিদ্যুৎ",
      topics: [
        "Electric Charges & Fields",
        "Electrostatic Potential & Capacitance",
        "Gauss's Law",
      ],
    },
    {
      id: "current_electricity",
      name: "Current Electricity",
      bengali: "তড়িৎ প্রবাহ",
      topics: [
        "Current, Resistance, Ohm's Law",
        "Kirchhoff's Laws",
        "Wheatstone Bridge",
        "Potentiometer",
      ],
    },
    {
      id: "magnetism",
      name: "Magnetism",
      bengali: "চুম্বকত্ব",
      topics: [
        "Moving Charges & Magnetism",
        "Magnetism & Matter",
        "Magnetic Force & Field",
      ],
    },
    {
      id: "emi",
      name: "EM Induction & AC",
      bengali: "তড়িচ্চুম্বকীয় আবেশ",
      topics: [
        "Electromagnetic Induction",
        "Alternating Current",
        "Transformers",
      ],
    },
    {
      id: "optics",
      name: "Optics",
      bengali: "আলোকবিদ্যা",
      topics: [
        "Ray Optics & Optical Instruments",
        "Wave Optics",
        "Reflection & Refraction",
        "Lenses & Mirrors",
      ],
    },
    {
      id: "modern_physics",
      name: "Modern Physics",
      bengali: "আধুনিক পদার্থবিজ্ঞান",
      topics: [
        "Dual Nature of Radiation & Matter",
        "Atoms & Nuclei",
        "Radioactivity",
        "Nuclear Reactions",
      ],
    },
    {
      id: "semiconductors",
      name: "Semiconductor Electronics",
      bengali: "অর্ধপরিবাহী বিদ্যুৎ",
      topics: [
        "Semiconductors",
        "p-n Junction Diode",
        "Transistors",
        "Logic Gates",
      ],
    },
  ],
};
