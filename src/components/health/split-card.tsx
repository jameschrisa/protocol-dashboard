import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Bot, User } from 'lucide-react';
import { splitCardData } from "../../data/split-card-data";
import { cn } from "../../lib/utils";

const SplitCard = () => {
  const { leftSection, rightSection } = splitCardData;
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
      <Button 
        variant="outline" 
        size="sm" 
        className={cn(
          "mt-4 pointer-events-none",
          isEnabled ? "text-green-600" : "text-red-600"
        )}
      >
        <div className={cn(
          "h-2 w-2 rounded-full mr-2",
          isEnabled ? "bg-green-600" : "bg-red-600"
        )} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Button>
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
            <p className="text-sm text-gray-500 mb-2">
              {rightSection.caption}
            </p>
            {/* Tags */}
            {rightSection.tags && rightSection.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {rightSection.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
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
              <Button size="sm">
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
