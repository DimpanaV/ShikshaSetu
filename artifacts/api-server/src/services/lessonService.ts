import { findCurriculumContent } from "../data/curriculum.js";

const LANG_LABELS: Record<string, string> = {
  English: "English",
  Hindi: "Hindi (हिंदी)",
  Kannada: "Kannada (ಕನ್ನಡ)",
  Tamil: "Tamil (தமிழ்)",
  Bengali: "Bengali (বাংলা)",
  Hinglish: "Hinglish (English with Hindi terms)",
};

const HINDI_TERMS: Record<string, string> = {
  "photosynthesis": "प्रकाश संश्लेषण (Prakash Sanshleshan)",
  "force": "बल (Bal)",
  "energy": "ऊर्जा (Urja)",
  "velocity": "वेग (Veg)",
  "atom": "परमाणु (Paramanu)",
  "cell": "कोशिका (Koshika)",
  "evolution": "विकास (Vikas)",
  "gravity": "गुरुत्वाकर्षण (Gurutvakarshan)",
  "equation": "समीकरण (Samikaran)",
  "function": "फलन (Phalan)",
  "derivative": "अवकलज (Avkalaj)",
  "integral": "समाकल (Samakal)",
  "triangle": "त्रिभुज (Tribhuj)",
  "angle": "कोण (Kon)",
  "reaction": "अभिक्रिया (Abhikriya)",
  "acid": "अम्ल (Amla)",
  "base": "क्षार (Kshar)",
  "bond": "बंध (Bandh)",
};

function buildLessonContent(subject: string, topic: string, grade: string, mode: string, curriculumBase: string | null): {
  explanation: string;
  bullets: string[];
  example: string;
  simplified: string;
  detailed: string;
} {
  const baseContent = curriculumBase || `This is a foundational topic in ${subject}. Understanding ${topic} is essential for ${grade} students.`;
  
  const modePrefix: Record<string, string> = {
    "Explain Like I'm 5": "Let's explain this simply, as if you're just starting to learn: ",
    "Student Mode": "Here's a clear explanation for your level: ",
    "Exam Mode": "Key exam points — memorize these: ",
  };
  
  const prefix = modePrefix[mode] || "";
  
  const explanation = `${prefix}${baseContent.slice(0, 400)}`;
  
  const sentences = baseContent.split(". ").filter(s => s.trim().length > 10);
  const bullets: string[] = [];
  for (let i = 0; i < Math.min(5, sentences.length); i++) {
    const sentence = sentences[i].trim();
    if (sentence) bullets.push(sentence.endsWith(".") ? sentence : sentence + ".");
  }
  if (bullets.length < 3) {
    bullets.push(`${topic} is an important concept in ${subject}.`);
    bullets.push(`Understanding ${topic} helps in solving real-world problems.`);
    bullets.push(`Practice these concepts regularly to master ${topic}.`);
  }
  
  const example = generateExample(subject, topic, grade);
  
  const simplified = generateSimplified(subject, topic, mode);
  
  const detailed = generateDetailed(subject, topic, grade, baseContent);
  
  return { explanation, bullets, example, simplified, detailed };
}

function generateExample(subject: string, topic: string, grade: string): string {
  const examples: Record<string, string> = {
    math: `Example: If you need to solve 2x² + 5x - 3 = 0, use the quadratic formula with a=2, b=5, c=-3. Calculate discriminant: b²-4ac = 25+24 = 49. Then x = (-5 ± 7)/4, giving x = 0.5 or x = -3.`,
    science: `Real-world example: During the day, plants in your garden absorb sunlight and CO₂ from the air, and water from the soil. Through photosynthesis, they produce glucose (their food) and release oxygen — the very oxygen you breathe!`,
    history: `Historical example: In 1930, when the British imposed a salt tax, Gandhi led 78 followers on a 240-mile march to Dandi coast, where he picked up a handful of salt from the sea — a simple act that sparked nationwide civil disobedience and made headlines worldwide.`,
    physics: `Practical example: When you throw a ball upward, gravity continuously decelerates it (F = mg downward). At maximum height, velocity = 0. Then it accelerates back down. The total energy (kinetic + potential) remains constant throughout.`,
    chemistry: `Lab example: When you add vinegar (acetic acid, pH ≈ 2.4) to baking soda (sodium bicarbonate), you see bubbling. This is a neutralization reaction producing CO₂ gas, water, and sodium acetate. This is why it's used in baking to make cakes rise!`,
    biology: `Observation example: Look at your own hand. The opposable thumb is a key evolutionary adaptation that allows humans to grip tools with precision. Fossil evidence shows our ancestors developed this adaptation about 2-3 million years ago, enabling toolmaking and complex behavior.`,
    english: `Writing example: Instead of "The dog ran fast" (weak), write "The golden retriever bolted across the dewy grass, ears flapping wildly" (vivid). Adding specific details, strong verbs, and sensory language transforms ordinary writing into memorable prose.`,
  };
  
  return examples[subject.toLowerCase()] || `Example for ${topic}: Consider a practical scenario in your daily life where ${topic} concepts apply. Identify the variables, apply the principles you've learned, and solve step by step.`;
}

function generateSimplified(subject: string, topic: string, mode: string): string {
  if (mode === "Explain Like I'm 5") {
    return `Think of it this way: Imagine ${topic} is like... a puzzle. Each piece represents a different part of the concept. When you put all the pieces together, you see the complete picture. The most important thing to remember is: look for patterns, and always ask "why does this work?" Start with the simplest case, then build up to harder problems.`;
  }
  return `Quick summary: ${topic} in ${subject} can be understood through these core ideas: (1) Understand the fundamental definition, (2) Learn the key formula or principle, (3) Practice with simple examples first, then move to complex ones. Connect this concept to things you already know from previous chapters.`;
}

function generateDetailed(subject: string, topic: string, grade: string, baseContent: string): string {
  return `Advanced analysis for ${grade}: ${baseContent.slice(0, 600)}

Key applications and extensions:
- This concept appears frequently in competitive exams (JEE, NEET, UPSC) and board exams
- Connect this to related topics in ${subject} for deeper understanding
- Historical context: This theory was developed over centuries of observation and experimentation
- Common exam traps: Students often make sign errors or unit conversion mistakes — always double-check
- For ${grade}: Focus on the derivation, not just the formula. Understanding the "why" makes problem-solving intuitive

Advanced problem approach: Read the problem carefully → identify given information → choose the right formula → solve step-by-step → verify units and reasonableness of answer`;
}

export interface LessonContent {
  explanation: string;
  bullets: string[];
  example: string;
  simplified: string;
  detailed: string;
  subject: string;
  topic: string;
  grade: string;
  language: string;
  mode: string;
}

export function generateLesson(
  subject: string,
  topic: string,
  grade: string,
  language: string,
  mode: string
): LessonContent {
  const curriculumBase = findCurriculumContent(subject, topic);
  const content = buildLessonContent(subject, topic, grade, mode, curriculumBase);
  
  let { explanation, bullets, example, simplified, detailed } = content;
  
  if (language === "Hinglish") {
    const topicLower = topic.toLowerCase();
    const hindiTerm = Object.entries(HINDI_TERMS).find(([key]) => topicLower.includes(key));
    if (hindiTerm) {
      explanation += `\n\nKey term in Hindi: ${hindiTerm[1]}`;
      detailed += `\n\nYaad rakhein (Remember): Ye concept bahut important hai ${grade} ke liye.`;
    }
  }
  
  return {
    explanation,
    bullets,
    example,
    simplified,
    detailed,
    subject,
    topic,
    grade,
    language,
    mode,
  };
}
