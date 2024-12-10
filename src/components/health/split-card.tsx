import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Bot, User, MessageSquare, Paperclip } from 'lucide-react';
import { createSplitCardData } from "../../data/split-card-data";
import { cn } from "../../lib/utils";
import { getSplitCardVisibility } from "../../pages/Settings";
import { Textarea } from "../../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

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
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSendMessage = () => {
    // Here you would typically send the message and file to your backend
    console.log('Sending message:', message);
    if (selectedFile) {
      console.log('With attachment:', selectedFile.name);
    }
    // Reset form and close dialog
    setMessage("");
    setSelectedFile(null);
    setIsMessageDialogOpen(false);
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
    <>
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
              <p className="text-sm mb-2 leading-relaxed text-white/90">
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
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsMessageDialogOpen(true)}
                >
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

      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message {rightSection.title.split(' ')[0]}</DialogTitle>
            <DialogDescription>
              Send a message to your healthcare provider
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[150px]"
            />
            <div className="flex items-center gap-2">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-accent cursor-pointer"
              >
                <Paperclip className="h-4 w-4" />
                {selectedFile ? selectedFile.name : "Attach file"}
              </label>
              {selectedFile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFile(null)}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setIsMessageDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SplitCard;
