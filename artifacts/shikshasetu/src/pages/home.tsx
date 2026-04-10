import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, BrainCircuit, Globe, LineChart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-8 lg:p-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-8 border border-primary/20">
          <Sparkles className="w-4 h-4" />
          AI-Powered Learning Platform
        </div>
        
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6">
          Learn anything in <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">your native language.</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          ShikshaSetu is your friendly AI tutor. From Class 6 basics to competitive exams, master concepts with personalized lessons, instant quizzes, and a mentor who always understands you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/learn" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 h-14 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              Start Learning Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 h-14 rounded-full border-2">
              View Dashboard
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24 max-w-6xl w-full z-10"
      >
        {[
          {
            icon: BrainCircuit,
            title: "AI Lessons",
            desc: "Complex topics broken down into simple, digestible explanations.",
            color: "text-primary",
            bg: "bg-primary/10"
          },
          {
            icon: Globe,
            title: "Multilingual",
            desc: "Learn in Hindi, English, Kannada, Tamil, Bengali, or Hinglish.",
            color: "text-secondary",
            bg: "bg-secondary/10"
          },
          {
            icon: BookOpen,
            title: "Mentor Chat",
            desc: "Stuck? Ask Shiksha Mentor for examples, tips, or translations.",
            color: "text-pink-500",
            bg: "bg-pink-500/10"
          },
          {
            icon: LineChart,
            title: "Analytics",
            desc: "Track your mastery, streak, and scores across all subjects.",
            color: "text-green-500",
            bg: "bg-green-500/10"
          }
        ].map((feature, i) => (
          <div key={i} className="p-6 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.bg}`}>
              <feature.icon className={`w-6 h-6 ${feature.color}`} />
            </div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
