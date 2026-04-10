import { useState, useRef, useEffect } from "react";
import { useMentorAsk } from "@workspace/api-client-react";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppStore } from "@/lib/store";
import { motion } from "framer-motion";

export function MentorChat() {
  const { chatHistory, setChatHistory, currentTopic, selectedLanguage } = useAppStore();
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const mentorAsk = useMentorAsk();

  const handleSend = async (content: string) => {
    if (!content.trim()) return;

    const newMsg = { role: "user" as const, content };
    setChatHistory([...chatHistory, newMsg]);
    setMessage("");

    try {
      const response = await mentorAsk.mutateAsync({
        data: {
          question: content,
          contextTopic: currentTopic || "General",
          language: selectedLanguage,
        }
      });

      setChatHistory(prev => [...prev, { role: "assistant", content: response.response }]);
    } catch (error) {
      console.error("Mentor error:", error);
      setChatHistory(prev => [...prev, { role: "assistant", content: "Sorry, I had trouble answering that. Could you try asking again?" }]);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current;
      setTimeout(() => {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }, 100);
    }
  }, [chatHistory, mentorAsk.isPending]);

  const quickPrompts = [
    "Explain again",
    "Give example",
    "Translate to Hindi",
    "Exam tips",
    "Simplify"
  ];

  return (
    <div className="flex flex-col h-[500px] border rounded-2xl bg-card shadow-sm overflow-hidden">
      <div className="bg-primary/5 border-b p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-foreground flex items-center gap-2">
            Shiksha Mentor
            <Sparkles className="w-4 h-4 text-secondary" />
          </h3>
          <p className="text-xs text-muted-foreground">Always here to help you understand</p>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4 pb-4">
          {chatHistory.length === 0 ? (
            <div className="text-center text-muted-foreground py-8 px-4">
              <Bot className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
              <p>Hi! I'm your Shiksha Mentor.</p>
              <p className="text-sm mt-1">Ask me anything about {currentTopic || 'what you are learning'}.</p>
            </div>
          ) : (
            chatHistory.map((msg, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={i} 
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "user" ? "bg-secondary text-white" : "bg-primary/10 text-primary"
                }`}>
                  {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`rounded-2xl px-4 py-2.5 max-w-[80%] text-sm ${
                  msg.role === "user" 
                    ? "bg-secondary text-white rounded-tr-none" 
                    : "bg-muted text-foreground rounded-tl-none"
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))
          )}
          {mentorAsk.isPending && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-2.5 text-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                Thinking...
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-background">
        <div className="flex flex-wrap gap-2 mb-3">
          {quickPrompts.map(prompt => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/20"
              disabled={mentorAsk.isPending}
            >
              {prompt}
            </button>
          ))}
        </div>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(message);
          }}
          className="flex gap-2"
        >
          <Input 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 rounded-full border-muted-foreground/30 focus-visible:ring-primary"
            disabled={mentorAsk.isPending}
          />
          <Button 
            type="submit" 
            size="icon" 
            className="rounded-full shrink-0 w-10 h-10 bg-primary hover:bg-primary/90"
            disabled={!message.trim() || mentorAsk.isPending}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
