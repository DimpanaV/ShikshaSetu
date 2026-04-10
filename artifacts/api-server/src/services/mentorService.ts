const MENTOR_RESPONSES: Record<string, string[]> = {
  explain: [
    "Let me explain this more clearly. The key idea here is to break the problem into smaller parts. Start with what you know, identify what you need to find, then apply the relevant principle step by step.",
    "Sure! Think of it this way: every complex concept is built from simpler building blocks. Let's go back to basics. What part specifically is confusing you?",
    "Great question! Here's a clearer way to think about it: focus on the core definition first, then understand how it behaves, and finally learn when to apply it.",
  ],
  example: [
    "Here's a practical example from real life: this concept appears everywhere around you — in the technology you use, in nature, and in engineering. Try to observe it in your daily experience.",
    "Let me give you a concrete example: take a simple scenario, identify the variables, apply the formula, and check if your answer makes physical/mathematical sense.",
    "Real examples help! In exams, they often give you word problems based on everyday situations. Practice converting those descriptions into equations or diagrams.",
  ],
  hindi: [
    "यह विषय बहुत महत्वपूर्ण है। मुख्य बिंदु: (1) मूल परिभाषा याद करें, (2) सूत्र को समझें, (3) उदाहरण हल करें। इसे नियमित रूप से अभ्यास करें।",
    "हिंदी में समझाएं: यह अवधारणा वास्तव में सरल है जब आप इसे चरण-दर-चरण देखते हैं। पहले परिभाषा, फिर सूत्र, फिर अभ्यास।",
    "इस topic को याद रखने का तरीका: एक मनमोहक कहानी या उदाहरण से जोड़ें। जो आप देखते या अनुभव करते हैं, उससे connect करें।",
  ],
  exam: [
    "For exam preparation on this topic: (1) Memorize the key formula or definition. (2) Know 2-3 typical question types. (3) Practice at least 10 problems. (4) Understand common mistakes to avoid. (5) Review past year papers.",
    "Exam strategy: Most questions test either conceptual understanding (direct definition questions) or application (word problems). Practice both types. Time management: don't spend more than 3 minutes on any single question.",
    "Top exam tips: Write clearly, show all steps for partial credit, underline the key values given in the problem, always check units, and verify your answer makes logical sense.",
  ],
  simplify: [
    "Let's make this simpler: imagine you're explaining to a 10-year-old. The core idea is just this — break it down to the most essential concept, remove all the jargon, and see if the basic logic makes sense.",
    "Simplified version: think of this concept as a recipe. You have ingredients (given values), a method (formula or process), and a result (answer). Follow the recipe and you'll get there.",
    "The simplest way to think about this: what is it doing? What's the input and what's the output? Understanding the 'what' before the 'how' makes complex concepts much more approachable.",
  ],
  default: [
    "That's a thoughtful question! The key to understanding this is to connect it to what you already know. What concepts from previous chapters does this remind you of?",
    "Good thinking! Let me help you work through this. Start by clearly stating what you know and what you need to find. Then we can pick the right approach together.",
    "Here's how I'd approach this: first, understand the question completely. Then recall related concepts. Apply the most appropriate method. And always verify your answer at the end.",
    "This is a common question that comes up in exams! The answer becomes clear once you understand the underlying principle. Focus on the concept, not just the formula.",
    "Let me guide you: every problem in science or math has a systematic solution path. Identify the type of problem, recall the relevant theory, apply it carefully, and double-check your work.",
  ],
};

export function generateMentorResponse(question: string, contextTopic: string, language: string): string {
  const q = question.toLowerCase();
  
  let category = "default";
  if (q.includes("explain") || q.includes("explain again") || q.includes("what is") || q.includes("why")) {
    category = "explain";
  } else if (q.includes("example") || q.includes("give example") || q.includes("show me")) {
    category = "example";
  } else if (q.includes("hindi") || q.includes("translate") || q.includes("हिंदी")) {
    category = "hindi";
  } else if (q.includes("exam") || q.includes("tip") || q.includes("trick") || q.includes("remember")) {
    category = "exam";
  } else if (q.includes("simplif") || q.includes("easier") || q.includes("simpler") || q.includes("simple")) {
    category = "simplify";
  }
  
  const responses = MENTOR_RESPONSES[category] || MENTOR_RESPONSES["default"];
  const base = responses[Math.floor(Math.random() * responses.length)];
  
  const topicNote = contextTopic ? ` For "${contextTopic}" specifically, focus on understanding the core concept before moving to practice problems.` : "";
  
  return base + topicNote;
}
