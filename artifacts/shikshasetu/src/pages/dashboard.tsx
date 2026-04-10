import { motion } from "framer-motion";
import { useGetDashboardSummary, useGetWeeklyProgress, useGetRecentActivity } from "@workspace/api-client-react";
import { BookOpen, Trophy, Flame, BrainCircuit, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

export default function Dashboard() {
  const { data: summary, isLoading: loadingSummary } = useGetDashboardSummary();
  const { data: weekly, isLoading: loadingWeekly } = useGetWeeklyProgress();
  const { data: activity, isLoading: loadingActivity } = useGetRecentActivity();

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Your Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's how you're doing.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loadingSummary ? (
          Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-[120px] rounded-xl" />)
        ) : summary ? (
          <>
            <MetricCard title="Topics Studied" value={summary.topicsStudied} icon={BookOpen} color="text-blue-500" />
            <MetricCard title="Average Score" value={`${summary.avgScore}%`} icon={Trophy} color="text-yellow-500" />
            <MetricCard title="Day Streak" value={summary.streak} icon={Flame} color="text-orange-500" />
            <MetricCard title="Total Quizzes" value={summary.totalQuizzes} icon={BrainCircuit} color="text-purple-500" />
          </>
        ) : (
          <div className="col-span-4 p-4 text-center text-muted-foreground border rounded-lg bg-card">Failed to load metrics</div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-md overflow-hidden">
          <CardHeader className="bg-card pb-2">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Weekly Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {loadingWeekly ? (
              <Skeleton className="w-full h-[300px]" />
            ) : weekly && weekly.length > 0 ? (
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weekly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No activity data available for this week.
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-none shadow-md overflow-hidden flex flex-col">
          <CardHeader className="bg-card pb-2 border-b">
            <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-auto">
            {loadingActivity ? (
              <div className="p-6 space-y-4">
                {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : activity && activity.length > 0 ? (
              <div className="divide-y divide-border/50">
                {activity.map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={item.id} 
                    className="p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-sm">{item.description}</h4>
                      <span className="text-xs font-semibold px-2 py-1 bg-secondary/10 text-secondary rounded-full">
                        {item.score}%
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{item.topic}</span>
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-muted-foreground h-full flex items-center justify-center">
                No recent activity. Time to learn!
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, color }: any) {
  return (
    <Card className="border shadow-sm hover:shadow-md transition-all overflow-hidden relative group">
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-muted/30 group-hover:bg-muted/50 transition-colors pointer-events-none" />
      <CardContent className="p-6 relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
          </div>
          <div className={`p-3 rounded-xl bg-card border ${color} bg-opacity-10`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
