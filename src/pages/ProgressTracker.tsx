import { motion } from "framer-motion";
import { Calendar, TrendingUp, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { cn } from "@/lib/utils";

const scans = [
  { date: "Mar 5, 2026", score: 78, change: 0 },
  { date: "Feb 28, 2026", score: 75, change: 3 },
  { date: "Feb 20, 2026", score: 71, change: 4 },
  { date: "Feb 12, 2026", score: 68, change: -1 },
  { date: "Feb 5, 2026", score: 69, change: 5 },
  { date: "Jan 28, 2026", score: 64, change: 0 },
];

const metrics = [
  { label: "Symmetry", current: 87, previous: 82, trend: "up" as const },
  { label: "Posture", current: 64, previous: 58, trend: "up" as const },
  { label: "Grooming", current: 78, previous: 80, trend: "down" as const },
  { label: "Eye Balance", current: 91, previous: 89, trend: "up" as const },
];

const ProgressTracker = () => {
  return (
    <AppLayout>
      <div className="p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-semibold">Progress Tracker</h1>
          <p className="text-sm text-muted-foreground mt-1">Your presence evolution over time</p>
        </div>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Overall Growth</p>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="font-display text-4xl font-bold text-gradient-primary">+14</span>
                <span className="text-sm text-muted-foreground">points since first scan</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-strength/10 text-strength text-xs font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              Improving
            </div>
          </div>

          {/* Simple bar chart visualization */}
          <div className="flex items-end gap-3 h-24">
            {scans.slice().reverse().map((scan, i) => (
              <div key={scan.date} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(scan.score / 100) * 80}px` }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={cn(
                    "w-full rounded-t-md",
                    i === scans.length - 1 ? "bg-primary" : "bg-secondary"
                  )}
                />
                <span className="text-[9px] text-muted-foreground">{scan.date.split(",")[0].split(" ")[1]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="glass-panel p-4"
            >
              <p className="text-xs text-muted-foreground mb-2">{m.label}</p>
              <div className="flex items-end justify-between">
                <span className="font-display text-2xl font-bold">{m.current}</span>
                <div className={cn(
                  "flex items-center gap-0.5 text-xs font-medium",
                  m.trend === "up" ? "text-strength" : "text-opportunity"
                )}>
                  {m.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(m.current - m.previous)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scan Timeline */}
        <h2 className="font-display text-lg font-medium mb-4">Scan History</h2>
        <div className="space-y-3">
          {scans.map((scan, i) => (
            <motion.div
              key={scan.date}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="glass-panel-hover p-4 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{scan.date}</p>
                  <p className="text-xs text-muted-foreground">Presence Score: {scan.score}</p>
                </div>
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium",
                scan.change > 0 ? "text-strength" : scan.change < 0 ? "text-opportunity" : "text-muted-foreground"
              )}>
                {scan.change > 0 ? <ArrowUpRight className="w-3 h-3" /> : scan.change < 0 ? <ArrowDownRight className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                {scan.change !== 0 ? `${Math.abs(scan.change)} pts` : "No change"}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default ProgressTracker;
