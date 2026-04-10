import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { useGenerateQuiz, useSaveProgress } from "@workspace/api-client-react";
import { useAppStore } from "@/lib/store";
import { motion } from "framer-motion";
import { 
  PenTool, Loader2, CheckCircle2, XCircle, ArrowRight, Brain, RotateCcw
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MentorChat } from "@/components/mentor-chat";
import { useToast } from "@/hooks/use-toast";
import { getGetProgressQueryKey } from "@workspace/api-client-react";

const LANGUAGES = ["English", "Hindi", "Kannada", "Tamil", "Bengali", "Hinglish"];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];

export default function Practice() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { 
    currentTopic, setCurrentTopic,
    selectedLanguage, setSelectedLanguage,
    quizQuestions, setQuizQuestions,
    quizAnswers, setQuizAnswers,
    quizSubmitted, setQuizSubmitted,
    currentLesson
  } = useAppStore();

  const [topicInput, setTopicInput] = useState(currentTopic);
  const [difficulty, setDifficulty] = useState(DIFFICULTIES[1]);
  const [score, setScore] = useState(0);

  const generateQuiz = useGenerateQuiz();
  const saveProgress = useSaveProgress();

  // Auto-generate if navigated from learn page with topic but no questions
  useEffect(() => {
    if (currentTopic && !quizQuestions && !generateQuiz.isPending) {
      handleGenerateQuiz(currentTopic);
    }
  }, []);

  const handleGenerateQuiz = async (topicToUse: string) => {
    if (!topicToUse.trim()) {
      toast({ title: "Topic required", description: "Please enter a topic for the quiz." });
      return;
    }

    setQuizAnswers({});
    setQuizSubmitted(false);
    setScore(0);
    setCurrentTopic(topicToUse);

    try {
      const response = await generateQuiz.mutateAsync({
        data: {
          topic: topicToUse,
          language: selectedLanguage,
          difficulty
        }
      });
      setQuizQuestions(response.questions);
      toast({ title: "Quiz ready!", description: "Answer the questions below." });
    } catch (error) {
      toast({ 
        title: "Generation failed", 
        description: "Could not generate the quiz. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const handleSubmitQuiz = async () => {
    if (!quizQuestions) return;
    
    // Check if all questions answered
    if (Object.keys(quizAnswers).length < quizQuestions.length) {
      toast({ 
        title: "Incomplete Quiz", 
        description: "Please answer all questions before submitting." 
      });
      return;
    }

    // Calculate score
    let newScore = 0;
    quizQuestions.forEach((q, i) => {
      if (quizAnswers[i] === q.answer) {
        newScore++;
      }
    });

    setScore(newScore);
    setQuizSubmitted(true);

    // Save progress
    try {
      await saveProgress.mutateAsync({
        data: {
          topic: currentTopic,
          subject: currentLesson?.subject || "General",
          score: newScore,
          total: quizQuestions.length,
          language: selectedLanguage
        }
      });
      
      // Invalidate progress queries
      queryClient.invalidateQueries({ queryKey: getGetProgressQueryKey() });
      
      toast({ 
        title: "Quiz submitted!", 
        description: `You scored ${newScore} out of ${quizQuestions.length}.` 
      });
    } catch (error) {
      console.error("Failed to save progress", error);
    }
  };

  const handleRestart = () => {
    setQuizQuestions(null);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setScore(0);
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <PenTool className="text-primary w-8 h-8" />
          Practice Quizzes
        </h1>
        <p className="text-muted-foreground">Test your knowledge and track your mastery.</p>
      </div>

      {!quizQuestions && (
        <Card className="border-border/50 shadow-sm bg-card/50 backdrop-blur-sm max-w-2xl mx-auto mt-12">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Generate a Practice Quiz</h2>
              <p className="text-muted-foreground mt-2">Get 10 multiple choice questions to test your understanding.</p>
            </div>

            <form 
              onSubmit={(e) => { e.preventDefault(); handleGenerateQuiz(topicInput); }} 
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Input 
                  id="topic" 
                  placeholder="What do you want to practice?" 
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  className="bg-background"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {DIFFICULTIES.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full rounded-full font-bold h-12"
                disabled={generateQuiz.isPending}
              >
                {generateQuiz.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Generating Quiz...
                  </>
                ) : (
                  "Start Practice"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {generateQuiz.isPending && !quizQuestions && (
        <div className="flex justify-center py-20">
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
            <p className="text-lg font-medium text-muted-foreground">Crafting questions...</p>
          </div>
        </div>
      )}

      {quizQuestions && (
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-2xl font-bold">Quiz: {currentTopic}</h2>
            {quizSubmitted && (
              <div className="flex items-center gap-4">
                <div className="text-lg font-bold px-4 py-2 bg-primary/10 text-primary rounded-xl">
                  Score: {score} / {quizQuestions.length}
                </div>
                <Button variant="outline" size="sm" onClick={handleRestart} className="gap-2">
                  <RotateCcw className="w-4 h-4" /> New Quiz
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {quizQuestions.map((q, i) => {
              const isCorrect = quizAnswers[i] === q.answer;
              const isAnswered = quizAnswers[i] !== undefined;

              return (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={i}
                >
                  <Card className={`border shadow-sm overflow-hidden transition-colors ${
                    quizSubmitted 
                      ? isCorrect 
                        ? 'border-green-500/50 bg-green-500/5' 
                        : 'border-red-500/50 bg-red-500/5'
                      : isAnswered ? 'border-primary/50' : 'border-border'
                  }`}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 flex gap-3">
                        <span className="text-muted-foreground shrink-0">{i + 1}.</span> 
                        {q.question}
                      </h3>
                      
                      <RadioGroup 
                        value={quizAnswers[i] || ""} 
                        onValueChange={(val) => handleAnswerChange(i, val)}
                        className="space-y-3 pl-8"
                        disabled={quizSubmitted}
                      >
                        {q.options.map((opt, j) => {
                          let labelClass = "text-foreground font-medium";
                          let bgClass = "bg-card";
                          let borderClass = "border-border";

                          if (quizSubmitted) {
                            if (opt === q.answer) {
                              labelClass = "text-green-700 dark:text-green-400 font-bold";
                              bgClass = "bg-green-100 dark:bg-green-900/20";
                              borderClass = "border-green-500";
                            } else if (opt === quizAnswers[i]) {
                              labelClass = "text-red-700 dark:text-red-400 font-semibold";
                              bgClass = "bg-red-100 dark:bg-red-900/20";
                              borderClass = "border-red-500";
                            }
                          } else if (opt === quizAnswers[i]) {
                            borderClass = "border-primary";
                            bgClass = "bg-primary/5";
                          }

                          return (
                            <div 
                              key={j} 
                              className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${bgClass} ${borderClass} ${!quizSubmitted && 'hover:bg-muted/50'}`}
                            >
                              <RadioGroupItem value={opt} id={`q${i}-opt${j}`} />
                              <Label htmlFor={`q${i}-opt${j}`} className={`flex-1 cursor-pointer ${labelClass} text-base`}>
                                {opt}
                              </Label>
                              {quizSubmitted && opt === q.answer && (
                                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
                              )}
                              {quizSubmitted && opt === quizAnswers[i] && opt !== q.answer && (
                                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
                              )}
                            </div>
                          );
                        })}
                      </RadioGroup>

                      {quizSubmitted && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className={`mt-4 pl-8 pt-4 border-t ${isCorrect ? 'border-green-500/20' : 'border-red-500/20'}`}
                        >
                          <p className="text-sm font-medium text-muted-foreground mb-1">Explanation:</p>
                          <p className="text-base">{q.explanation}</p>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {!quizSubmitted && (
            <div className="sticky bottom-6 flex justify-center z-10 pt-4">
              <Button 
                size="lg" 
                onClick={handleSubmitQuiz}
                className="rounded-full h-14 px-12 text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                disabled={saveProgress.isPending}
              >
                {saveProgress.isPending ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "Submit Quiz"}
              </Button>
            </div>
          )}

          {quizSubmitted && (
            <div className="pt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-card border rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold">{score}/{quizQuestions.length}</span>
                </div>
                <h3 className="text-xl font-bold">Quiz Completed</h3>
                <p className="text-muted-foreground max-w-sm">
                  {score >= 8 ? "Excellent work! You have a strong grasp of this topic." 
                    : score >= 5 ? "Good job! Review the explanations to master the topic." 
                    : "Keep practicing! Review the lesson and try again."}
                </p>
                <div className="flex gap-4 w-full mt-4">
                  <Button variant="outline" className="flex-1" onClick={handleRestart}>Try Again</Button>
                  <Button className="flex-1" onClick={() => setLocation("/progress")}>View Progress</Button>
                </div>
              </div>
              <div className="h-[400px]">
                <MentorChat />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
