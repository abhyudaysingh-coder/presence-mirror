import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Scan, Eye, Lightbulb, TrendingUp, User } from "lucide-react";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/lookslens-logo.png";

const navItems = [
  { icon: Scan, label: "Capture", path: "/app" },
  { icon: Eye, label: "Insights", path: "/app/insights" },
  { icon: Lightbulb, label: "Improve", path: "/app/improve" },
  { icon: TrendingUp, label: "Progress", path: "/app/progress" },
  { icon: User, label: "Profile", path: "/app/profile" },
];

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Nav Rail */}
      <motion.nav
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed left-0 top-0 h-screen w-16 flex flex-col items-center py-6 border-r border-border/50 bg-card/40 backdrop-blur-xl z-50"
      >
        {/* Logo */}
        <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-8 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Eye className="w-4 h-4 text-primary" />
        </div>

        {/* Nav Items */}
        <div className="flex-1 flex flex-col items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 group relative",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <item.icon className="w-[18px] h-[18px]" />
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute left-0 w-0.5 h-5 bg-primary rounded-r-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {/* Tooltip */}
                <div className="absolute left-full ml-3 px-2.5 py-1 rounded-md bg-card border border-border text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {item.label}
                </div>
              </button>
            );
          })}
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="flex-1 ml-16">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default AppLayout;
