import React, { createContext, useContext, useState, ReactNode } from "react";
import { Lesson, QuizQuestion } from "@workspace/api-client-react";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

interface AppState {
  currentLesson: Lesson | null;
  setCurrentLesson: (lesson: Lesson | null) => void;
  currentTopic: string;
  setCurrentTopic: (topic: string) => void;
  quizQuestions: QuizQuestion[] | null;
  setQuizQuestions: (questions: QuizQuestion[] | null) => void;
  quizAnswers: Record<number, string>;
  setQuizAnswers: (answers: Record<number, string>) => void;
  quizSubmitted: boolean;
  setQuizSubmitted: (submitted: boolean) => void;
  chatHistory: ChatMessage[];
  setChatHistory: (history: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentTopic, setCurrentTopic] = useState<string>("");
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[] | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const [fontSize, setFontSize] = useState<number>(16);

  return (
    <AppContext.Provider
      value={{
        currentLesson,
        setCurrentLesson,
        currentTopic,
        setCurrentTopic,
        quizQuestions,
        setQuizQuestions,
        quizAnswers,
        setQuizAnswers,
        quizSubmitted,
        setQuizSubmitted,
        chatHistory,
        setChatHistory,
        selectedLanguage,
        setSelectedLanguage,
        fontSize,
        setFontSize,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppStore must be used within an AppProvider");
  }
  return context;
}
