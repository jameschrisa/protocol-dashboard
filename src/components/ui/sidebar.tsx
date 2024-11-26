import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import {
  LayoutDashboard,
  Heart,
  Brain,
  UtensilsCrossed,
  Dumbbell,
  Moon,
  Users,
  Settings,
  LifeBuoy,
  PanelLeftClose,
  PanelLeftOpen,
  ArrowRight,
  Bot,
} from "lucide-react";
import { Card } from "./card";
import { Button } from "./button";

interface SidebarProps {
  isVisible?: boolean;
  onToggle?: () => void;
}

export const Sidebar = ({ isVisible = true, onToggle }: SidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={cn(
      "fixed left-0 top-16 bottom-0 z-40 flex flex-col border-r border-border bg-background transition-all duration-300",
      isVisible ? "w-60" : "w-16"
    )}>
      {/* Border Line */}
      <div className="absolute inset-y-0 right-0 w-px bg-border" />

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-4 top-6 flex h-8 w-8 items-center justify-center rounded-full border bg-background shadow-sm hover:bg-accent"
      >
        {isVisible ? (
          <PanelLeftClose className="h-4 w-4" />
        ) : (
          <PanelLeftOpen className="h-4 w-4" />
        )}
      </button>

      {/* Content */}
      <div className="flex-1 space-y-1 py-4">
        <div className="px-3">
          <div className="flex items-center px-2 py-2">
            <span className={cn(
              "text-muted-foreground font-medium text-sm",
              isVisible ? "" : "sr-only"
            )}>
              Health Spaces
            </span>
          </div>
        </div>

        <nav className="space-y-1 px-3">
          <Link
            to="/"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
              isActive("/") && "bg-accent",
              !isVisible && "justify-center"
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className={cn("text-sm", !isVisible && "hidden")}>Overview</span>
          </Link>

          <Link
            to="/general-health"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
              isActive("/general-health") && "bg-accent",
              !isVisible && "justify-center"
            )}
          >
            <Heart className="h-4 w-4" />
            <span className={cn("text-sm", !isVisible && "hidden")}>General Health</span>
          </Link>

          <Link
            to="/mental-health"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
              isActive("/mental-health") && "bg-accent",
              !isVisible && "justify-center"
            )}
          >
            <Brain className="h-4 w-4" />
            <span className={cn("text-sm", !isVisible && "hidden")}>Mental Health</span>
          </Link>

          <Link
            to="/nutrition"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
              isActive("/nutrition") && "bg-accent",
              !isVisible && "justify-center"
            )}
          >
            <UtensilsCrossed className="h-4 w-4" />
            <span className={cn("text-sm", !isVisible && "hidden")}>Nutrition</span>
          </Link>

          <Link
            to="/fitness"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
              isActive("/fitness") && "bg-accent",
              !isVisible && "justify-center"
            )}
          >
            <Dumbbell className="h-4 w-4" />
            <span className={cn("text-sm", !isVisible && "hidden")}>Fitness</span>
          </Link>

          <Link
            to="/sleep"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
              isActive("/sleep") && "bg-accent",
              !isVisible && "justify-center"
            )}
          >
            <Moon className="h-4 w-4" />
            <span className={cn("text-sm", !isVisible && "hidden")}>Sleep & Recovery</span>
          </Link>

          <Link
            to="/social"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
              isActive("/social") && "bg-accent",
              !isVisible && "justify-center"
            )}
          >
            <Users className="h-4 w-4" />
            <span className={cn("text-sm", !isVisible && "hidden")}>Social Connections</span>
          </Link>

          <Link
            to="/lifestyle"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
              isActive("/lifestyle") && "bg-accent",
              !isVisible && "justify-center"
            )}
          >
            <Settings className="h-4 w-4" />
            <span className={cn("text-sm", !isVisible && "hidden")}>Lifestyle</span>
          </Link>
        </nav>

        {/* Health Pilot Card */}
        <div className={cn("px-3 mt-6", !isVisible && "hidden")}>
          <Card className="p-3">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                <h4 className="text-sm font-medium">Health Pilot (Beta)</h4>
              </div>
              <p className="text-xs text-muted-foreground">
                AI agent trained on your health data to provide personalized insights and recommendations.
              </p>
              <Button
                className="w-full justify-between bg-[#C81E78] hover:bg-[#C81E78]/90 text-white"
                size="sm"
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4">
        <Link
          to="https://protocol.health"
          target="_blank"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
            !isVisible && "justify-center"
          )}
        >
          <LifeBuoy className="h-4 w-4" />
          <span className={cn("text-sm", !isVisible && "hidden")}>Visit Protocol Health</span>
        </Link>
        <div className={cn(
          "mt-2 text-xs text-muted-foreground text-center",
          !isVisible && "hidden"
        )}>
          Version 1.1.13
        </div>
      </div>
    </div>
  );
};
