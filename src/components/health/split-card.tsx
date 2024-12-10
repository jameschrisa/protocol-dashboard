import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Bot, User, MessageSquare } from 'lucide-react';
import { createSplitCardData } from "../../data/split-card-data";
import { cn } from "../../lib/utils";
import { getSplitCardVisibility } from "../../pages/Settings";

interface SplitCardProps {
  healthSpaceKey: string;
  teamMemberIndex?: number;
}

const SplitCard: React.FC<SplitCardProps> = ({ healthSpaceKey, teamMemberIndex = 0 }) => {
  const navigate = useNavigate();
  const { leftSection, rightSection } = createSplitCardData(healthSpaceKey, teamMemberIndex);
  const [isActivated, setIsActivated] = useState(() => {
    return localStorage.getItem("healthPilotActivated") === "true";
  });
  const [isVisible, setIsVisible] = useState(() => {
    return getSplitCardVisibility(healthSpaceKey);
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

    // Event handler for visibility changes
    const handleVisibilityChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail.healthSpace === healthSpaceKey) {
        setIsVisible(customEvent.detail.isVisible);
      }
    };

    // Add event listeners
    window.addEventListener("healthPilotActivated", handleActivation);
    window.addEventListener("healthPilotDeactivated", handleDeactivation);
    window.addEventListener("splitCardVisibilityChanged", handleVisibilityChange);

    // Cleanup
    return () => {
      window.removeEventListener("healthPilotActivated", handleActivation);
      window.removeEventListener("healthPilotDeactivated", handleDeactivation);
      window.removeEventListener("splitCardVisibilityChanged", handleVisibilityChange);
    };
  }, [healthSpaceKey]);

  if (!isVisible) {
    return null;
  }

  const handleScheduleAppointment = () => {
    // Store a flag to indicate we want to open the dialog
    localStorage.setItem("openNewAppointmentDialog", "true");
    // Navigate to the calendar page
    navigate("/calendar");
  };

  const renderAvatar = (icon: 'bot' | 'user', imageUrl?: string) => {
    const IconComponent = icon === 'bot' ? Bot : User;
    return (
      <Avatar className="h-12 w-12">
        {imageUrl ? (
          <AvatarImage src={imageUrl} alt="Avatar" className="object-cover" />
        ) : (
          <AvatarFallback className="bg-gray-100">
            <IconComponent className="h-6 w-6" />
          </AvatarFallback>
        )}
      </Avatar>
    );
  };

  const renderStatus = () => {
    const status = isActivated ? 'enabled' : 'disabled';
    const isEnabled = status === 'enabled';
    
    return (
      <div className="flex items-center gap-2 mt-4">
        <Button 
          variant="outline" 
          size="sm" 
          className={cn(
            "pointer-events-none",
            isEnabled ? "text-green-600" : "text-red-600"
          )}
        >
          <div className={cn(
            "h-2 w-2 rounded-full mr-2",
            isEnabled ? "bg-green-600" : "bg-red-600"
          )} />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "gap-2",
            isEnabled 
              ? "hover:bg-primary/10" 
              : "opacity-50 cursor-not-allowed"
          )}
          disabled={!isEnabled}
        >
          <MessageSquare className="h-4 w-4" />
          Chat with Pilot
        </Button>
      </div>
    );
  };

  return (
    <Card className="w-full mb-4">
      <CardContent className="p-0">
        <div className="grid grid-cols-2 divide-x">
          {/* Left Section - Bot */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              {renderAvatar('bot', leftSection.avatarImage)}
              <h3 className="font-semibold text-lg">{leftSection.title}</h3>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              {leftSection.caption}
            </p>
            {renderStatus()}
          </div>
          
          {/* Right Section - User */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              {renderAvatar('user', rightSection.avatarImage)}
              <h3 className="font-semibold text-lg">{rightSection.title}</h3>
            </div>
            <p className={cn(
              "text-sm mb-2 leading-relaxed",
              isActivated ? "text-white/90" : "text-gray-500"
            )}>
              {rightSection.caption}
            </p>
            {/* Tags */}
            {rightSection.tags && rightSection.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {rightSection.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium border border-primary text-primary rounded-full bg-transparent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Connect
              </Button>
              <Button size="sm" onClick={handleScheduleAppointment}>
                Schedule Appointment
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SplitCard;
