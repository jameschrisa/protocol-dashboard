import React, { useEffect, useState } from "react";
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
  Bird,
  BookOpenCheck,
  ArrowRight,
  Bot,
  Check,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { Card } from "./card";
import { Button } from "./button";
import { navigation, footerNavigation } from "../../config/navigation";

interface SidebarProps {
  isVisible?: boolean;
  onToggle?: () => void;
}

export const Sidebar = ({ isVisible = true, onToggle }: SidebarProps) => {
  const location = useLocation();
  const [isActivated, setIsActivated] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem("healthPilotActivated") === "true";
  });

  useEffect(() => {
    // Event handler for activation
    const handleActivation = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        setIsActivated(true);
      }
    };

    // Event handler for deactivation
    const handleDeactivation = () => {
      setIsActivated(false);
    };

    // Add event listeners
    window.addEventListener("healthPilotActivated", handleActivation);
    window.addEventListener("healthPilotDeactivated", handleDeactivation);

    // Cleanup
    return () => {
      window.removeEventListener("healthPilotActivated", handleActivation);
      window.removeEventListener("healthPilotDeactivated", handleDeactivation);
    };
  }, []);

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
          {navigation.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                isActive(item.href) && "bg-accent",
                !isVisible && "justify-center"
              )}
            >
              <item.icon className="h-4 w-4" />
              {isVisible && <span>{item.name}</span>}
            </Link>
          ))}
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
              <div className="block pt-2">
                {isActivated ? (
                  <Button
                    className="w-full justify-between bg-[#10B981] hover:bg-[#10B981] text-white cursor-not-allowed"
                    size="sm"
                    disabled
                  >
                    Activated
                    <Check className="h-4 w-4" />
                  </Button>
                ) : (
                  <Link to="/health-pilot" className="block w-full">
                    <Button
                      className="w-full justify-between bg-[#C81E78] hover:bg-[#C81E78]/90 text-white"
                      size="sm"
                    >
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4">
        {footerNavigation.map((item) => (
          item.external ? (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                !isVisible && "justify-center"
              )}
            >
              <item.icon className="h-4 w-4" />
              {isVisible && <span>{item.name}</span>}
            </a>
          ) : (
            <Link
              key={item.id}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                isActive(item.href) && "bg-accent",
                !isVisible && "justify-center"
              )}
            >
              <item.icon className="h-4 w-4" />
              {isVisible && <span>{item.name}</span>}
            </Link>
          )
        ))}
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
