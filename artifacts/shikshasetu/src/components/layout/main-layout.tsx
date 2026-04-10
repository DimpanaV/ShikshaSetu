import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { useAppStore } from "@/lib/store";

export function MainLayout({ children }: { children: ReactNode }) {
  const { fontSize } = useAppStore();

  return (
    <div 
      className="flex h-screen overflow-hidden bg-background"
      style={{ fontSize: `${fontSize}px` }}
    >
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
