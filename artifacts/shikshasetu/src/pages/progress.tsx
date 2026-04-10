import { useGetProgress } from "@workspace/api-client-react";
import { TrendingUp, Award, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Progress() {
  const { data: progressData, isLoading } = useGetProgress();

  // Process data for charts
  const barChartData = progressData 
    ? [...progressData].reverse().slice(0, 10).map(p => ({
        topic: p.topic.length > 15 ? p.topic.substring(0, 15) + '...' : p.topic,
        fullTopic: p.topic,
        score: p.percent,
        date: new Date(p.createdAt).toLocaleDateString()
      }))
    : [];

  // Heatmap generation
  const generateHeatmap = () => {
    // 6x6 grid = 36 cells
    const totalCells = 36;
    const cells = [];
    
    // Group progress by topic to find mastery
    const topicMastery: Record<string, number[]> = {};
    if (progressData) {
      progressData.forEach(p => {
        if (!topicMastery[p.topic]) topicMastery[p.topic] = [];
        topicMastery[p.topic].push(p.percent);
      });
    }

    const uniqueTopics = Object.keys(topicMastery);
    
    for (let i = 0; i < totalCells; i++) {
      if (i < uniqueTopics.length) {
        const topic = uniqueTopics[i];
        const scores = topicMastery[topic];
        const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
        
        // Map 0-100 to 1-4 intensity levels
        let intensity = 1;
        if (avg > 80) intensity = 4;
        else if (avg > 60) intensity = 3;
        else if (avg > 40) intensity = 2;

        cells.push({ id: i, topic, score: avg, intensity });
      } else {
        // Empty cells
        cells.push({ id: i, topic: null, score: null, intensity: 0 });
      }
    }
    return cells;
  };

  const heatmapCells = generateHeatmap();

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <TrendingUp className="text-primary w-8 h-8" />
          Learning Progress
        </h1>
        <p className="text-muted-foreground">Track your mastery and review past performances.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <Card className="lg:col-span-2 border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-secondary" />
              Recent Quiz Scores
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {isLoading ? (
              <Skeleton className="w-full h-[300px]" />
            ) : barChartData.length > 0 ? (
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData} margin={{ top: 20, right: 20, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="topic" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                      dy={10} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      domain={[0, 100]}
                    />
                    <Tooltip 
                      cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
                      contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      formatter={(value) => [`${value}%`, 'Score']}
                      labelFormatter={(label, payload) => payload[0]?.payload?.fullTopic || label}
                    />
                    <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                      {barChartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.score >= 80 ? 'hsl(var(--primary))' : entry.score >= 50 ? 'hsl(var(--secondary))' : 'hsl(var(--muted-foreground))'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground bg-muted/20 rounded-xl">
                Take some practice quizzes to see your scores here.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Heatmap */}
        <Card className="border-border shadow-sm flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Topic Mastery
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-1 flex flex-col justify-center">
            {isLoading ? (
              <Skeleton className="w-full aspect-square rounded-xl" />
            ) : (
              <div className="w-full aspect-square relative">
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-2">
                  {heatmapCells.map((cell) => {
                    let bgClass = "bg-muted"; // intensity 0
                    if (cell.intensity === 1) bgClass = "bg-primary/20";
                    if (cell.intensity === 2) bgClass = "bg-primary/50";
                    if (cell.intensity === 3) bgClass = "bg-primary/80";
                    if (cell.intensity === 4) bgClass = "bg-primary";

                    return (
                      <div 
                        key={cell.id} 
                        className={`rounded-md ${bgClass} transition-all hover:scale-105 cursor-default relative group`}
                        title={cell.topic ? `${cell.topic}: ${Math.round(cell.score!)}%` : "Not learned yet"}
                      >
                        {cell.topic && (
                          <div className="absolute opacity-0 group-hover:opacity-100 z-50 -top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs p-2 rounded shadow-lg whitespace-nowrap pointer-events-none transition-opacity">
                            {cell.topic} ({Math.round(cell.score!)}%)
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <span>Novice</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-muted"></div>
                <div className="w-3 h-3 rounded-sm bg-primary/20"></div>
                <div className="w-3 h-3 rounded-sm bg-primary/50"></div>
                <div className="w-3 h-3 rounded-sm bg-primary/80"></div>
                <div className="w-3 h-3 rounded-sm bg-primary"></div>
              </div>
              <span>Master</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h4 className="font-bold mb-2">Keep It Up!</h4>
          <p className="text-sm text-muted-foreground">You've consistently improved your Math scores this week. Focus on Calculus next to round out the subject.</p>
        </div>
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h4 className="font-bold mb-2">Area of Focus</h4>
          <p className="text-sm text-muted-foreground">Your Science quiz scores dipped slightly. Try reading the "Detailed Dive" sections in the Learn tab.</p>
        </div>
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h4 className="font-bold mb-2">Language Benefit</h4>
          <p className="text-sm text-muted-foreground">You score 15% higher when taking complex quizzes in Hindi. Consider using native language for new topics.</p>
        </div>
      </div>
    </div>
  );
}
