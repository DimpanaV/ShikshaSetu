import { Link, useLocation } from "wouter";
import { BookOpen, LayoutDashboard, BrainCircuit, PenTool, TrendingUp, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/", icon: BookOpen },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Learn", href: "/learn", icon: BrainCircuit },
  { name: "Practice", href: "/practice", icon: PenTool },
  { name: "Progress", href: "/progress", icon: TrendingUp },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-sidebar-primary tracking-tight">
          <BookOpen className="h-8 w-8 text-sidebar-primary" />
          <span>ShikshaSetu</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map((item) => {
          const isActive = location === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                  isActive ? "text-sidebar-primary" : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground/80"
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-sidebar-border/20">
        <div className="rounded-xl bg-sidebar-accent/30 p-4 text-center">
          <h4 className="text-sm font-semibold mb-1 text-sidebar-accent-foreground">Need help?</h4>
          <p className="text-xs text-sidebar-foreground/70 mb-3">Ask Shiksha Mentor anytime during your learning.</p>
          <Link href="/learn" className="text-xs font-medium text-sidebar-primary hover:underline">
            Start Learning &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
