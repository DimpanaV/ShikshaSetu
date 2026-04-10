import { useState } from "react";
import { useLocation } from "wouter";
import { useGenerateLesson } from "@workspace/api-client-react";
import { useAppStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, PlayCircle, Loader2, Sparkles, 
  ChevronDown, Layers, Lightbulb, Target, Book, AlignLeft 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  Accordion, AccordionContent, AccordionItem, AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { MentorChat } from "@/components/mentor-chat";
import { useToast } from "@/hooks/use-toast";

const SUBJECTS = ["Math", "Science", "History", "Physics", "Chemistry", "Biology", "English Literature"];
const GRADES = ["Class 6-8", "Class 9-10", "Class 11-12", "Engineering", "Competitive Exams"];
const LANGUAGES = ["English", "Hindi", "Kannada", "Tamil", "Bengali", "Hinglish"];
const MODES = ["Explain Like I'm 5", "Student Mode", "Exam Mode"];

export default function Learn() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const { 
    currentLesson, setCurrentLesson, 
    currentTopic, setCurrentTopic,
    selectedLanguage, setSelectedLanguage 
  } = useAppStore();

  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [grade, setGrade] = useState(GRADES[1]);
  const [mode, setMode] = useState(MODES[1]);

  const generateLesson = useGenerateLesson();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTopic.trim()) {
      toast({ title: "Topic required", description: "Please enter a topic to learn." });
      return;
    }

    try {
      const lesson = await generateLesson.mutateAsync({
        data: {
          subject,
          topic: currentTopic,
          grade,
          language: selectedLanguage,
          mode
        }
      });
      setCurrentLesson(lesson);
      toast({ title: "Lesson ready!", description: "Your personalized lesson has been generated." });
    } catch (error) {
      toast({ 
        title: "Generation failed", 
        description: "Could not generate the lesson. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleTakeQuiz = () => {
    setLocation("/practice");
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <BookOpen className="text-primary w-8 h-8" />
          Learn Something New
        </h1>
        <p className="text-muted-foreground">Tell ShikshaSetu what you want to learn today.</p>
      </div>

      <Card className="border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <form onSubmit={handleGenerate} className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-foreground font-semibold">Subject</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger id="subject" className="bg-background">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="topic" className="text-foreground font-semibold">Topic</Label>
                <Input 
                  id="topic" 
                  placeholder="e.g., Photosynthesis, Calculus, World War 2" 
                  value={currentTopic}
                  onChange={(e) => setCurrentTopic(e.target.value)}
                  className="bg-background"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="grade" className="text-muted-foreground">Grade Level</Label>
                <Select value={grade} onValueChange={setGrade}>
                  <SelectTrigger id="grade" className="bg-background border-dashed">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADES.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language" className="text-muted-foreground">Language</Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger id="language" className="bg-background border-dashed">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mode" className="text-muted-foreground">Learning Mode</Label>
                <Select value={mode} onValueChange={setMode}>
                  <SelectTrigger id="mode" className="bg-background border-dashed">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    {MODES.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-border/50">
              <Button 
                type="submit" 
                size="lg" 
                className="w-full md:w-auto px-8 gap-2 rounded-full font-semibold shadow-md"
                disabled={generateLesson.isPending}
              >
                {generateLesson.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
                Generate Lesson
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {generateLesson.isPending && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col items-center justify-center py-16 space-y-4"
          >
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h3 className="text-lg font-medium text-foreground">Preparing your lesson...</h3>
            <p className="text-muted-foreground">Translating to {selectedLanguage} and formatting for {grade}</p>
          </motion.div>
        )}

        {currentLesson && !generateLesson.isPending && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground border-b pb-2 flex items-center justify-between">
                <span>{currentTopic}</span>
                <span className="text-sm font-normal px-3 py-1 bg-secondary/10 text-secondary rounded-full">
                  {selectedLanguage} • {mode}
                </span>
              </h2>

              <Accordion type="single" collapsible defaultValue="explanation" className="w-full space-y-4">
                <AccordionItem value="explanation" className="border rounded-xl bg-card overflow-hidden shadow-sm">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors data-[state=open]:bg-muted/50 data-[state=open]:border-b">
                    <div className="flex items-center gap-3 font-semibold text-lg">
                      <div className="p-2 bg-primary/10 text-primary rounded-lg"><AlignLeft className="w-5 h-5" /></div>
                      Explanation
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-base leading-relaxed text-foreground/90 whitespace-pre-wrap">
                    {currentLesson.explanation}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="key-points" className="border rounded-xl bg-card overflow-hidden shadow-sm">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors data-[state=open]:bg-muted/50 data-[state=open]:border-b">
                    <div className="flex items-center gap-3 font-semibold text-lg">
                      <div className="p-2 bg-green-500/10 text-green-600 rounded-lg"><Target className="w-5 h-5" /></div>
                      Key Points
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4">
                    <ul className="space-y-3">
                      {currentLesson.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
                          <span className="text-base text-foreground/90">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="example" className="border rounded-xl bg-card overflow-hidden shadow-sm">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors data-[state=open]:bg-muted/50 data-[state=open]:border-b">
                    <div className="flex items-center gap-3 font-semibold text-lg">
                      <div className="p-2 bg-yellow-500/10 text-yellow-600 rounded-lg"><Lightbulb className="w-5 h-5" /></div>
                      Example
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-base leading-relaxed text-foreground/90 whitespace-pre-wrap">
                    {currentLesson.example}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="simplified" className="border rounded-xl bg-card overflow-hidden shadow-sm">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors data-[state=open]:bg-muted/50 data-[state=open]:border-b">
                    <div className="flex items-center gap-3 font-semibold text-lg">
                      <div className="p-2 bg-pink-500/10 text-pink-600 rounded-lg"><Book className="w-5 h-5" /></div>
                      Simplified Version
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-base leading-relaxed text-foreground/90 whitespace-pre-wrap">
                    {currentLesson.simplified}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="detailed" className="border rounded-xl bg-card overflow-hidden shadow-sm">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors data-[state=open]:bg-muted/50 data-[state=open]:border-b">
                    <div className="flex items-center gap-3 font-semibold text-lg">
                      <div className="p-2 bg-indigo-500/10 text-indigo-600 rounded-lg"><Layers className="w-5 h-5" /></div>
                      Detailed Dive
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-base leading-relaxed text-foreground/90 whitespace-pre-wrap">
                    {currentLesson.detailed}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <MentorChat />
              </div>
              
              <div className="flex flex-col justify-center items-center p-8 bg-secondary/5 rounded-2xl border border-secondary/20 text-center space-y-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-2">
                  <PlayCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Ready to test?</h3>
                <p className="text-muted-foreground text-sm max-w-[200px]">
                  Check your understanding of {currentTopic} with a quick quiz.
                </p>
                <Button 
                  size="lg" 
                  className="w-full mt-4 rounded-full font-bold shadow-md bg-secondary hover:bg-secondary/90 text-white"
                  onClick={handleTakeQuiz}
                >
                  Take Quiz
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
