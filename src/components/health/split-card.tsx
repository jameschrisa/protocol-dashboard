import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Bot, User, MessageSquare, Paperclip, Check } from 'lucide-react';
import { createSplitCardData } from "../../data/split-card-data";
import { cn } from "../../lib/utils";
import { getSplitCardVisibility } from "../../pages/Settings";
import { Textarea } from "../../components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../components/theme-provider";
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
  const { theme } = useTheme();
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
  const [isSending, setIsSending] = useState(false);
  const [sendComplete, setSendComplete] = useState(false);

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
    localStorage.setItem("openNewAppointmentDialog", "true");
    navigate("/calendar");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSendMessage = async () => {
    setIsSending(true);
    
    // Simulate sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSendComplete(true);
    
    // Wait for completion animation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Reset and close
    setMessage("");
    setSelectedFile(null);
    setIsSending(false);
    setSendComplete(false);
    setIsMessageDialogOpen(false);
  };

  const handleDialogClose = (open: boolean) => {
    if (!isSending) {
      setIsMessageDialogOpen(open);
      if (!open) {
        setMessage("");
        setSelectedFile(null);
        setSendComplete(false);
      }
    }
  };

  // Function to ensure image URLs work in both development and production
  const getImageUrl = (imageUrl?: string) => {
    if (!imageUrl) return undefined;
    
    // If it's already an absolute URL or a data URL, return as is
    if (imageUrl.startsWith('http') || imageUrl.startsWith('data:')) {
      return imageUrl;
    }
    
    // If it's an imported image (object), return as is
    if (typeof imageUrl === 'object') {
      return imageUrl;
    }
    
    // For relative paths, ensure they work in both dev and production
    // Remove leading slash if present
    const cleanPath = imageUrl.startsWith('/') ? imageUrl.substring(1) : imageUrl;
    
    // Check if we're in a production environment (like Vercel)
    const isProduction = process.env.NODE_ENV === 'production' || 
                         window.location.hostname !== 'localhost';
    
    // In production (Vercel), use the public path
    if (isProduction) {
      // For Vercel, the images should be in the /avatars directory
      return `${window.location.origin}/avatars/${cleanPath}`;
    } else {
      // For development, use the src/assets path
      return `${window.location.origin}/src/assets/${cleanPath}`;
    }
  };

  const renderAvatar = (icon: 'bot' | 'user', imageUrl?: string) => {
    const IconComponent = icon === 'bot' ? Bot : User;
    const processedImageUrl = getImageUrl(imageUrl);
    
    // Log the image URL for debugging
    console.log(`Avatar image URL (${icon}): ${imageUrl} -> ${processedImageUrl}`);
    
    // Try multiple fallback paths for Vercel deployment
    const fallbackPaths = [
      processedImageUrl,
      `${window.location.origin}/avatars/${imageUrl}`,
      `${window.location.origin}/public/avatars/${imageUrl}`,
      `${window.location.origin}/assets/${imageUrl}`
    ];
    
    return (
      <Avatar className="h-12 w-12">
        {processedImageUrl ? (
          <>
            {/* Primary image attempt */}
            <AvatarImage 
              src={processedImageUrl} 
              alt="Avatar" 
              className="object-cover"
              onError={(e) => {
                // If image fails to load, try fallbacks
                console.warn(`Failed to load primary avatar image: ${processedImageUrl}`);
                
                // Hide the failed image
                e.currentTarget.style.display = 'none';
                
                // Try to find a fallback image element
                const fallbackImg = e.currentTarget.parentElement?.querySelector('[data-fallback-img]');
                if (fallbackImg) {
                  fallbackImg.removeAttribute('hidden');
                } else {
                  // If no fallback image, show the icon fallback
                  e.currentTarget.parentElement?.querySelector('[data-fallback]')?.removeAttribute('hidden');
                }
              }}
            />
            
            {/* Fallback images (hidden initially) */}
            {fallbackPaths.slice(1).map((path, index) => (
              <AvatarImage 
                key={index}
                src={path} 
                alt="Avatar" 
                className="object-cover"
                data-fallback-img
                hidden
                onError={(e) => {
                  // If this fallback fails, try the next one or show icon
                  console.warn(`Failed to load fallback avatar image ${index + 1}: ${path}`);
                  e.currentTarget.style.display = 'none';
                  
                  // If this is the last fallback, show the icon fallback
                  if (index === fallbackPaths.length - 2) {
                    e.currentTarget.parentElement?.querySelector('[data-fallback]')?.removeAttribute('hidden');
                  }
                }}
              />
            ))}
          </>
        ) : (
          <AvatarFallback className="bg-gray-100">
            <IconComponent className="h-6 w-6" />
          </AvatarFallback>
        )}
        <AvatarFallback className="bg-gray-100" data-fallback hidden={!!processedImageUrl}>
          <IconComponent className="h-6 w-6" />
        </AvatarFallback>
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
              <p className={cn(
                "text-sm mb-2 leading-relaxed",
                theme === "dark" ? "text-white/90" : "text-gray-700"
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

      <Dialog open={isMessageDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message {rightSection.title.split(' ')[0]}</DialogTitle>
            <DialogDescription>
              Send a message to your healthcare provider
            </DialogDescription>
          </DialogHeader>
          <AnimatePresence mode="wait">
            {!sendComplete ? (
              <motion.div
                key="message-form"
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4 py-4"
              >
                <Textarea
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[150px]"
                  disabled={isSending}
                />
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*,.pdf,.doc,.docx"
                    disabled={isSending}
                  />
                  <label
                    htmlFor="file-upload"
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-accent cursor-pointer",
                      isSending && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Paperclip className="h-4 w-4" />
                    {selectedFile ? selectedFile.name : "Attach file"}
                  </label>
                  {selectedFile && !isSending && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedFile(null)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4"
                >
                  <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg font-medium text-center"
                >
                  Message Sent Successfully
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => handleDialogClose(false)}
              disabled={isSending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || isSending}
            >
              {isSending ? "Sending..." : "Send"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SplitCard;
