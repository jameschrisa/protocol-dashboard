import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Check, Settings2, X, AlertCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface ConnectionStep {
  id: number;
  label: string;
  completed: boolean;
  inProgress: boolean;
}

interface ConnectionProgressDialogProps {
  isOpen: boolean;
  onClose: () => void;
  deviceName: string;
}

const initialSteps: ConnectionStep[] = [
  { id: 1, label: "Initializing connection", completed: false, inProgress: true },
  { id: 2, label: "Authenticating device", completed: false, inProgress: false },
  { id: 3, label: "Verifying permissions", completed: false, inProgress: false },
  { id: 4, label: "Establishing secure channel", completed: false, inProgress: false },
  { id: 5, label: "Syncing device data", completed: false, inProgress: false },
];

export const ConnectionProgressDialog: React.FC<ConnectionProgressDialogProps> = ({
  isOpen,
  onClose,
  deviceName,
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [steps, setSteps] = useState<ConnectionStep[]>(initialSteps);
  const [progressInterval, setProgressInterval] = useState<NodeJS.Timeout | null>(null);
  const [initTimeout, setInitTimeout] = useState<NodeJS.Timeout | null>(null);

  // Reset state when dialog opens or retries
  const resetState = () => {
    setProgress(0);
    setCurrentStepIndex(0);
    setConnectionFailed(false);
    setShowAdvancedSettings(false);
    setSteps(initialSteps);
    
    // Clear any existing intervals/timeouts
    if (progressInterval) {
      clearInterval(progressInterval);
      setProgressInterval(null);
    }
    if (initTimeout) {
      clearTimeout(initTimeout);
      setInitTimeout(null);
    }
  };

  // Handle dialog open/close
  useEffect(() => {
    if (isOpen) {
      resetState();
      // Start progress after a short delay to ensure animation starts from 0
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 1;
          });
        }, 50);
        setProgressInterval(interval);
      }, 100);
      setInitTimeout(timeout);

      return () => {
        clearTimeout(timeout);
        if (progressInterval) {
          clearInterval(progressInterval);
        }
      };
    }
  }, [isOpen]);

  // Update steps based on progress
  useEffect(() => {
    if (progress >= 100) {
      if (progressInterval) {
        clearInterval(progressInterval);
        setProgressInterval(null);
      }
      // Simulate random success/failure
      const failed = Math.random() < 0.3; // 30% chance of failure
      setConnectionFailed(failed);
      return;
    }

    const stepIndex = Math.floor((progress / 100) * steps.length);
    if (stepIndex !== currentStepIndex && stepIndex < steps.length) {
      setCurrentStepIndex(stepIndex);
      setSteps(steps.map((step, index) => ({
        ...step,
        completed: index < stepIndex,
        inProgress: index === stepIndex,
      })));
    }
  }, [progress, steps.length, currentStepIndex]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
      if (initTimeout) {
        clearTimeout(initTimeout);
      }
    };
  }, []);

  const handleRetry = () => {
    resetState();
    // Start progress after a short delay to ensure animation starts from 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
      setProgressInterval(interval);
    }, 100);
    setInitTimeout(timeout);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {connectionFailed ? (
              <AlertCircle className="h-5 w-5 text-red-500" />
            ) : progress === 100 ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : null}
            Connecting to {deviceName}
          </DialogTitle>
          <DialogDescription>
            {connectionFailed
              ? "Connection failed. Please try again or use advanced settings."
              : progress === 100
              ? "Device connected successfully!"
              : "Please wait while we establish a connection to your device."}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Progress value={progress} className="h-2 mb-6" />
          
          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  {step.completed ? (
                    <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-green-500" />
                    </div>
                  ) : step.inProgress ? (
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse" />
                  ) : (
                    <div className="w-2.5 h-2.5 bg-muted rounded-full" />
                  )}
                </div>
                <span className={`text-sm ${
                  step.inProgress 
                    ? 'text-blue-500 font-medium' 
                    : step.completed 
                    ? 'text-muted-foreground' 
                    : 'text-muted-foreground/60'
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="flex items-center justify-between gap-2">
          {connectionFailed ? (
            <>
              <div className="flex items-center gap-2">
                <X className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-500">Connection failed</span>
              </div>
              <div className="flex items-center gap-2">
                <Popover open={showAdvancedSettings} onOpenChange={setShowAdvancedSettings}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Settings2 className="h-4 w-4" />
                      Advanced
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Manual Configuration</h4>
                        <p className="text-sm text-muted-foreground">
                          Configure advanced device settings
                        </p>
                      </div>
                      <div className="grid gap-3">
                        <div className="grid gap-1.5">
                          <Label htmlFor="deviceId">Device ID</Label>
                          <Input id="deviceId" placeholder="Enter device ID" />
                        </div>
                        <div className="grid gap-1.5">
                          <Label htmlFor="apiKey">API Key</Label>
                          <Input id="apiKey" placeholder="Enter API key" />
                        </div>
                        <div className="grid gap-1.5">
                          <Label htmlFor="endpoint">Endpoint</Label>
                          <Input id="endpoint" placeholder="Enter endpoint URL" />
                        </div>
                      </div>
                      <Button size="sm" className="w-full">Apply Settings</Button>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button onClick={handleRetry} size="sm">
                  Retry
                </Button>
              </div>
            </>
          ) : progress === 100 ? (
            <Button onClick={onClose} size="sm" className="ml-auto">
              Done
            </Button>
          ) : (
            <Button onClick={onClose} variant="ghost" size="sm" className="ml-auto">
              Cancel
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
