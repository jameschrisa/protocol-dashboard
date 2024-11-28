import React, { useRef } from "react";
import { Card } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  HelpCircle,
  Plus,
  Smartphone,
  Watch,
  Activity,
  Heart,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ConnectionProgressDialog } from "./connection-progress-dialog";

const popularDevices = [
  { name: "Apple Health Kit", icon: Watch },
  { name: "Google Fitbit", icon: Activity },
  { name: "Garmin Connect", icon: Heart },
  { name: "Samsung Health", icon: Smartphone },
  { name: "Oura Ring", icon: Activity },
  { name: "Whoop", icon: Watch },
  { name: "Withings", icon: Heart },
  { name: "Dexcom", icon: Activity },
] as const;

const ConnectionHelp = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-4 right-4 hover:bg-muted text-muted-foreground hover:text-foreground"
      >
        <HelpCircle className="h-5 w-5" />
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>How to Connect Your Device</DialogTitle>
        <DialogDescription>
          Follow these steps to connect your health device:
          <ol className="mt-2 space-y-2 list-decimal list-inside">
            <li>Select your device from the dropdown menu</li>
            <li>Click "Connect Device" to start the connection process</li>
            <li>Follow the device-specific authentication steps</li>
            <li>Grant necessary permissions for data sharing</li>
            <li>Your device will appear in the connected devices list below</li>
          </ol>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);

export const DeviceConnectionForm = () => {
  const [selectedDevice, setSelectedDevice] = React.useState<string>("");
  const [showConnectionProgress, setShowConnectionProgress] = React.useState(false);
  const [isConnecting, setIsConnecting] = React.useState(false);
  const connectButtonRef = useRef<HTMLButtonElement>(null);

  const handleDeviceSelect = (value: string) => {
    setSelectedDevice(value);
    // Focus the connect button after selection
    if (connectButtonRef.current) {
      setTimeout(() => {
        connectButtonRef.current?.focus();
      }, 0);
    }
  };

  const handleConnect = () => {
    if (!selectedDevice || isConnecting) return;
    setIsConnecting(true);
    setShowConnectionProgress(true);
  };

  const handleConnectionComplete = () => {
    setShowConnectionProgress(false);
    setIsConnecting(false);
    setSelectedDevice(""); // Reset selection after successful connection
  };

  return (
    <>
      <Card className="w-full p-6 mb-6 relative bg-card border-border hover:border-border/80 transition-colors">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold mb-1">Connect a New Device</h2>
              <p className="text-sm text-muted-foreground">
                Select your health device to begin the connection process
              </p>
            </div>
            <ConnectionHelp />
          </div>

          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <Select 
                value={selectedDevice} 
                onValueChange={handleDeviceSelect}
                onOpenChange={(open) => {
                  // If closing and we have a selection, focus the connect button
                  if (!open && selectedDevice && connectButtonRef.current) {
                    connectButtonRef.current.focus();
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your device" />
                </SelectTrigger>
                <SelectContent>
                  {popularDevices.map(({ name, icon: Icon }) => (
                    <SelectItem key={name} value={name}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span>{name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-4 pl-1">
                <p className="text-sm text-muted-foreground/80 hover:text-muted-foreground transition-colors">
                  Don't see your device? <span className="underline cursor-pointer hover:text-foreground">Contact support</span> for assistance.
                </p>
              </div>
            </div>

            <Button
              ref={connectButtonRef}
              onClick={handleConnect}
              className="bg-[#BF0F73] hover:bg-[#BF0F73]/90 text-white flex items-center gap-2 min-w-[160px] justify-center focus:ring-2 focus:ring-[#BF0F73] focus:ring-offset-2 focus:ring-offset-background"
              disabled={!selectedDevice || isConnecting}
            >
              <Plus className="h-4 w-4" />
              {isConnecting ? "Connecting..." : "Connect Device"}
            </Button>
          </div>
        </div>
      </Card>

      <ConnectionProgressDialog
        isOpen={showConnectionProgress}
        onClose={handleConnectionComplete}
        deviceName={selectedDevice}
      />
    </>
  );
};
