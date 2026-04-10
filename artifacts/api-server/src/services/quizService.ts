export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

const QUIZ_BANKS: Record<string, QuizQuestion[]> = {
  math: [
    {
      question: "What is the discriminant of ax² + bx + c = 0?",
      options: ["b² - 4ac", "b² + 4ac", "-b² + 4ac", "4ac - b²"],
      answer: "b² - 4ac",
      explanation: "The discriminant D = b² - 4ac determines the nature of roots. D>0: two real roots, D=0: one repeated root, D<0: complex roots.",
    },
    {
      question: "If sin θ = 3/5, what is cos θ?",
      options: ["4/5", "3/4", "5/3", "1/5"],
      answer: "4/5",
      explanation: "Using Pythagorean identity: sin²θ + cos²θ = 1. So cos²θ = 1 - 9/25 = 16/25, thus cos θ = 4/5.",
    },
    {
      question: "What is d/dx(x³)?",
      options: ["3x²", "x²", "3x³", "x⁴/4"],
      answer: "3x²",
      explanation: "Using the power rule: d/dx(xⁿ) = nxⁿ⁻¹. So d/dx(x³) = 3x².",
    },
    {
      question: "The sum of angles in a triangle is:",
      options: ["180°", "360°", "90°", "270°"],
      answer: "180°",
      explanation: "The sum of interior angles of any triangle is always 180°. This is a fundamental theorem of Euclidean geometry.",
    },
    {
      question: "What is the value of sin 90°?",
      options: ["1", "0", "√2/2", "√3/2"],
      answer: "1",
      explanation: "sin 90° = 1. At 90°, the opposite side equals the hypotenuse in a right triangle definition.",
    },
    {
      question: "Solve: 2x + 5 = 13",
      options: ["x = 4", "x = 9", "x = 3", "x = 6"],
      answer: "x = 4",
      explanation: "2x + 5 = 13 → 2x = 8 → x = 4. Check: 2(4) + 5 = 13 ✓",
    },
    {
      question: "Area of a circle with radius r is:",
      options: ["πr²", "2πr", "πr", "2πr²"],
      answer: "πr²",
      explanation: "Area = πr². The circumference is 2πr. Don't confuse area with circumference.",
    },
    {
      question: "What is the LCM of 12 and 18?",
      options: ["36", "24", "72", "6"],
      answer: "36",
      explanation: "12 = 2² × 3, 18 = 2 × 3². LCM = 2² × 3² = 36.",
    },
    {
      question: "If f(x) = x² + 3x, then f(2) = ?",
      options: ["10", "8", "7", "14"],
      answer: "10",
      explanation: "f(2) = (2)² + 3(2) = 4 + 6 = 10.",
    },
    {
      question: "The Pythagorean theorem states:",
      options: ["a² + b² = c²", "a + b = c", "a² - b² = c²", "a³ + b³ = c³"],
      answer: "a² + b² = c²",
      explanation: "In a right triangle, the square of the hypotenuse (c) equals the sum of squares of the other two sides.",
    },
  ],
  
  science: [
    {
      question: "What gas do plants release during photosynthesis?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      answer: "Oxygen",
      explanation: "Plants absorb CO₂ and water, and using sunlight, produce glucose and release oxygen as a byproduct.",
    },
    {
      question: "Newton's second law states F = ?",
      options: ["ma", "mv", "mg", "m/a"],
      answer: "ma",
      explanation: "Force equals mass times acceleration (F = ma). A larger mass needs more force for the same acceleration.",
    },
    {
      question: "Which organelle is the powerhouse of the cell?",
      options: ["Mitochondria", "Nucleus", "Ribosome", "Chloroplast"],
      answer: "Mitochondria",
      explanation: "Mitochondria produce ATP (energy currency of the cell) through cellular respiration.",
    },
    {
      question: "What is the unit of electric current?",
      options: ["Ampere", "Volt", "Ohm", "Watt"],
      answer: "Ampere",
      explanation: "Current is measured in Amperes (A). Voltage in Volts, Resistance in Ohms, Power in Watts.",
    },
    {
      question: "Ohm's Law is expressed as:",
      options: ["V = IR", "V = I/R", "I = VR", "R = VI"],
      answer: "V = IR",
      explanation: "Voltage = Current × Resistance. This is Ohm's Law, fundamental to circuit analysis.",
    },
    {
      question: "Which of these is NOT a renewable energy source?",
      options: ["Coal", "Solar", "Wind", "Hydroelectric"],
      answer: "Coal",
      explanation: "Coal is a fossil fuel — non-renewable. Solar, wind, and hydroelectric are renewable sources.",
    },
    {
      question: "DNA stands for:",
      options: ["Deoxyribonucleic Acid", "Diribonucleic Acid", "Deoxyribonitric Acid", "Dinitronucleic Acid"],
      answer: "Deoxyribonucleic Acid",
      explanation: "DNA (Deoxyribonucleic Acid) is the molecule that carries genetic information in living organisms.",
    },
    {
      question: "The speed of light in vacuum is approximately:",
      options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10¹⁰ m/s", "3 × 10⁴ m/s"],
      answer: "3 × 10⁸ m/s",
      explanation: "Light travels at approximately 299,792,458 m/s (≈ 3 × 10⁸ m/s) in vacuum.",
    },
    {
      question: "What type of lens can converge light?",
      options: ["Convex", "Concave", "Plane", "Biconcave"],
      answer: "Convex",
      explanation: "Convex (converging) lenses focus light to a point. Concave (diverging) lenses spread light out.",
    },
    {
      question: "Acids have a pH value:",
      options: ["Less than 7", "Greater than 7", "Equal to 7", "Greater than 14"],
      answer: "Less than 7",
      explanation: "Acids have pH < 7, neutral substances pH = 7, bases pH > 7. Strong acids like HCl have pH near 0.",
    },
  ],

  history: [
    {
      question: "India gained independence on:",
      options: ["August 15, 1947", "January 26, 1950", "August 15, 1945", "July 4, 1947"],
      answer: "August 15, 1947",
      explanation: "India became independent on August 15, 1947. January 26, 1950 is Republic Day when the Constitution came into effect.",
    },
    {
      question: "Who led the Salt March (Dandi March) in 1930?",
      options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Subhas Chandra Bose", "B.R. Ambedkar"],
      answer: "Mahatma Gandhi",
      explanation: "Gandhi led the 240-mile Dandi March to protest the British salt tax, sparking widespread civil disobedience.",
    },
    {
      question: "World War I began in:",
      options: ["1914", "1939", "1918", "1941"],
      answer: "1914",
      explanation: "WWI began in 1914 following the assassination of Archduke Franz Ferdinand and ended in 1918.",
    },
    {
      question: "The Taj Mahal was built by which Mughal emperor?",
      options: ["Shah Jahan", "Akbar", "Aurangzeb", "Babur"],
      answer: "Shah Jahan",
      explanation: "Shah Jahan built the Taj Mahal as a mausoleum for his wife Mumtaz Mahal between 1632-1653.",
    },
    {
      question: "The Jallianwala Bagh massacre occurred in:",
      options: ["1919", "1930", "1857", "1942"],
      answer: "1919",
      explanation: "On April 13, 1919, British troops under General Dyer fired on a peaceful gathering at Jallianwala Bagh, Amritsar.",
    },
    {
      question: "Which movement was launched in 1942 to remove British from India?",
      options: ["Quit India Movement", "Non-Cooperation Movement", "Civil Disobedience", "Swadeshi Movement"],
      answer: "Quit India Movement",
      explanation: "The Quit India Movement (August Kranti) was launched by Gandhi on August 8, 1942, demanding immediate independence.",
    },
    {
      question: "Akbar was known for which policy?",
      options: ["Religious tolerance (Din-i-Ilahi)", "Forced conversion", "Temple destruction", "Foreign alliance only"],
      answer: "Religious tolerance (Din-i-Ilahi)",
      explanation: "Akbar promoted religious harmony and established Din-i-Ilahi, a syncretic religion blending elements of Islam, Hinduism, and other faiths.",
    },
    {
      question: "The United Nations was formed after:",
      options: ["World War II", "World War I", "The Cold War", "The Korean War"],
      answer: "World War II",
      explanation: "The UN was founded in 1945 after WWII to promote international peace and cooperation, replacing the League of Nations.",
    },
    {
      question: "Who wrote the Indian National Anthem?",
      options: ["Rabindranath Tagore", "Bankim Chandra Chatterjee", "Sarojini Naidu", "Subramanya Bharati"],
      answer: "Rabindranath Tagore",
      explanation: "Jana Gana Mana was written by Rabindranath Tagore. Bankim Chandra Chatterjee wrote Vande Mataram.",
    },
    {
      question: "The First Battle of Panipat (1526) was fought between:",
      options: ["Babur and Ibrahim Lodi", "Akbar and Hemu", "Aurangzeb and Shivaji", "Babur and Rana Sanga"],
      answer: "Babur and Ibrahim Lodi",
      explanation: "Babur defeated Ibrahim Lodi at the First Battle of Panipat in 1526, establishing the Mughal Empire in India.",
    },
  ],
};

function getDefaultQuestions(topic: string): QuizQuestion[] {
  return [
    {
      question: `What is the primary definition of ${topic}?`,
      options: [
        `${topic} is a fundamental concept with specific properties`,
        `${topic} has no real-world applications`,
        `${topic} was discovered in the 20th century only`,
        `${topic} applies only in theoretical situations`,
      ],
      answer: `${topic} is a fundamental concept with specific properties`,
      explanation: `${topic} is indeed a core concept with practical applications. Understanding its definition helps solve related problems.`,
    },
    {
      question: `Which of the following best describes a key property of ${topic}?`,
      options: ["It follows predictable patterns and rules", "It is completely random", "It has no mathematical basis", "It only applies in space"],
      answer: "It follows predictable patterns and rules",
      explanation: `Like all scientific concepts, ${topic} follows consistent patterns that can be studied, measured, and applied.`,
    },
    {
      question: `How is ${topic} applied in real life?`,
      options: [
        "In engineering, technology, and everyday phenomena",
        "Only in laboratory experiments",
        "Only in theoretical textbooks",
        "It has no practical applications",
      ],
      answer: "In engineering, technology, and everyday phenomena",
      explanation: `${topic} has numerous real-world applications from engineering to everyday technology we use.`,
    },
    {
      question: `What is the correct approach to solving problems involving ${topic}?`,
      options: [
        "Identify given data, apply relevant formula, solve step-by-step",
        "Guess the answer randomly",
        "Use any formula available",
        "Skip it if difficult",
      ],
      answer: "Identify given data, apply relevant formula, solve step-by-step",
      explanation: `The systematic approach: read carefully, identify knowns and unknowns, choose the right formula, solve step-by-step, verify the answer.`,
    },
    {
      question: `Which formula or principle is most associated with ${topic}?`,
      options: [
        "The core principle specific to this topic",
        "An unrelated formula",
        "There are no formulas",
        "Only experimental data matters",
      ],
      answer: "The core principle specific to this topic",
      explanation: `Every topic in science and math has key principles. Memorizing and understanding these principles helps solve exam questions efficiently.`,
    },
    {
      question: `In which field is ${topic} most prominently studied?`,
      options: ["In its primary academic discipline", "In cooking only", "In sports only", "In music only"],
      answer: "In its primary academic discipline",
      explanation: `${topic} is studied primarily in its core discipline but also has cross-disciplinary applications.`,
    },
    {
      question: `What is a common misconception about ${topic}?`,
      options: [
        "That it has no exceptions or edge cases",
        "That it is important",
        "That it has applications",
        "That it is worth studying",
      ],
      answer: "That it has no exceptions or edge cases",
      explanation: `Most concepts have exceptions and boundary conditions. Always understand when a principle applies and when it doesn't.`,
    },
    {
      question: `How does ${topic} connect to other concepts in the subject?`,
      options: [
        "It builds on prerequisite concepts and enables advanced topics",
        "It is completely isolated",
        "It has no connections",
        "It contradicts other concepts",
      ],
      answer: "It builds on prerequisite concepts and enables advanced topics",
      explanation: `Knowledge is interconnected. Understanding ${topic} requires prior concepts and enables you to understand more advanced material.`,
    },
    {
      question: `What level of understanding is needed for exams on ${topic}?`,
      options: [
        "Conceptual understanding + problem-solving ability",
        "Only memorization",
        "Only calculations",
        "No preparation needed",
      ],
      answer: "Conceptual understanding + problem-solving ability",
      explanation: `Board exams and competitive exams test both conceptual clarity (why) and problem-solving (how). Pure memorization is insufficient.`,
    },
    {
      question: `Which study strategy works best for mastering ${topic}?`,
      options: [
        "Understand concepts, practice problems, review mistakes",
        "Read once and move on",
        "Memorize formulas without understanding",
        "Study only the night before the exam",
      ],
      answer: "Understand concepts, practice problems, review mistakes",
      explanation: `Effective learning: understand the concept deeply, practice varied problems, analyze mistakes to avoid repeating them, and revise regularly.`,
    },
  ];
}

export function generateQuiz(topic: string, language: string, difficulty = "medium"): QuizQuestion[] {
  const topicLower = topic.toLowerCase();
  
  let questions: QuizQuestion[] = [];
  
  for (const [key, bank] of Object.entries(QUIZ_BANKS)) {
    if (topicLower.includes(key) || key.includes(topicLower)) {
      questions = [...bank];
      break;
    }
  }
  
  if (questions.length === 0) {
    questions = getDefaultQuestions(topic);
  }
  
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 10);
}
