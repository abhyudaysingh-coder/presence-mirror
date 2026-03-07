import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Upload, Video, Circle, RotateCcw, ArrowRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AppLayout from "@/components/AppLayout";
import { useNavigate } from "react-router-dom";

type CaptureMode = "camera" | "photo" | "video";

const CaptureStudio = () => {
  const [mode, setMode] = useState<CaptureMode>("camera");
  const [captured, setCaptured] = useState(false);
  const navigate = useNavigate();

  const modes = [
    { id: "camera" as const, icon: Camera, label: "Camera" },
    { id: "photo" as const, icon: Upload, label: "Upload Photo" },
    { id: "video" as const, icon: Video, label: "Upload Video" },
  ];

  return (
    <AppLayout>
      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-semibold">Capture Studio</h1>
          <p className="text-sm text-muted-foreground mt-1">Position yourself naturally for the best analysis results</p>
        </div>

        <div className="grid lg:grid-cols-[200px_1fr] gap-6">
          {/* Mode Selector */}
          <div className="space-y-2">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => { setMode(m.id); setCaptured(false); }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  mode === m.id
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <m.icon className="w-4 h-4" />
                {m.label}
              </button>
            ))}

            {/* Tips */}
            <div className="mt-6 p-4 glass-panel space-y-3">
              <div className="flex items-center gap-2 text-xs font-medium text-primary/80">
                <Lightbulb className="w-3.5 h-3.5" />
                Quick Tips
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>• Face the camera directly</li>
                <li>• Use even, natural lighting</li>
                <li>• Keep shoulders relaxed</li>
                <li>• Neutral expression works best</li>
              </ul>
            </div>
          </div>

          {/* Camera View */}
          <div className="glass-panel p-1 relative overflow-hidden">
            <div className="aspect-[4/3] bg-secondary/30 rounded-lg relative flex items-center justify-center">
              {/* Guide overlays */}
              {!captured && (
                <>
                  {/* Face oval guide */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-48 h-64 border-2 border-dashed border-primary/15 rounded-[50%]" />
                  </div>
                  {/* Crosshairs */}
                  <div className="absolute left-1/2 top-8 w-px h-6 bg-primary/10" />
                  <div className="absolute left-1/2 bottom-8 w-px h-6 bg-primary/10" />
                  <div className="absolute top-1/2 left-8 w-6 h-px bg-primary/10" />
                  <div className="absolute top-1/2 right-8 w-6 h-px bg-primary/10" />

                  {/* Placeholder content */}
                  <div className="text-center space-y-3 z-10">
                    <div className="w-16 h-16 rounded-full bg-primary/5 border border-primary/15 flex items-center justify-center mx-auto">
                      <Camera className="w-6 h-6 text-primary/40" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {mode === "camera" ? "Camera feed will appear here" : "Drop an image or click to upload"}
                    </p>
                  </div>
                </>
              )}

              {captured && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="text-center space-y-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto"
                    >
                      <Circle className="w-6 h-6 text-primary fill-primary/20" />
                    </motion.div>
                    <p className="text-sm font-medium">Captured successfully</p>
                    <p className="text-xs text-muted-foreground">Ready for analysis</p>
                  </div>
                </motion.div>
              )}

              {/* Scan line animation */}
              {!captured && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div
                    className="w-full h-px animate-scan-line"
                    style={{ background: "linear-gradient(90deg, transparent 0%, hsl(174 62% 47% / 0.15) 50%, transparent 100%)" }}
                  />
                </div>
              )}
            </div>

            {/* Bottom controls */}
            <div className="flex items-center justify-center gap-4 py-4">
              {!captured ? (
                <Button
                  size="lg"
                  className="px-8 glow-ring font-display"
                  onClick={() => setCaptured(true)}
                >
                  <Circle className="w-4 h-4 mr-2" />
                  Capture
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setCaptured(false)}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retake
                  </Button>
                  <Button
                    className="glow-ring font-display"
                    onClick={() => navigate("/app/insights")}
                  >
                    Analyze
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CaptureStudio;
