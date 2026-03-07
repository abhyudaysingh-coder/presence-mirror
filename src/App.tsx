import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import CaptureStudio from "./pages/CaptureStudio";
import InsightDashboard from "./pages/InsightDashboard";
import ImprovementLab from "./pages/ImprovementLab";
import ProgressTracker from "./pages/ProgressTracker";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<CaptureStudio />} />
          <Route path="/app/insights" element={<InsightDashboard />} />
          <Route path="/app/improve" element={<ImprovementLab />} />
          <Route path="/app/progress" element={<ProgressTracker />} />
          <Route path="/app/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
