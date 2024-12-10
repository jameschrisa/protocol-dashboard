import { Settings as SettingsIcon, User, Bell, Shield, Database, Globe, Terminal, AlertTriangle, Bot, Layout } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Switch } from "../components/ui/switch"
import { Label } from "../components/ui/label"
import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"
import { TerminalWindow } from "../components/settings/terminal"

interface SettingItem {
  id: string;
  label: string;
  defaultChecked: boolean;
  onChange?: (checked: boolean) => void;
}

type SettingSection = {
  title: string;
  icon: React.ElementType;
} & (
  | { settings: SettingItem[] }
  | { content: (onReset: () => void, isEnabled: boolean) => React.ReactNode }
);

const SPLIT_CARD_VISIBILITY_KEY = "splitCardVisibility";

export const getSplitCardVisibility = (healthSpace: string): boolean => {
  const visibility = localStorage.getItem(SPLIT_CARD_VISIBILITY_KEY);
  if (!visibility) return true; // Default to visible
  try {
    const settings = JSON.parse(visibility);
    return settings[healthSpace] ?? true; // Default to visible if not set
  } catch {
    return true;
  }
};

export const setSplitCardVisibility = (healthSpace: string, isVisible: boolean) => {
  const visibility = localStorage.getItem(SPLIT_CARD_VISIBILITY_KEY);
  let settings = {};
  try {
    settings = visibility ? JSON.parse(visibility) : {};
  } catch {
    settings = {};
  }
  settings = { ...settings, [healthSpace]: isVisible };
  localStorage.setItem(SPLIT_CARD_VISIBILITY_KEY, JSON.stringify(settings));
  // Dispatch event to notify components
  window.dispatchEvent(new CustomEvent("splitCardVisibilityChanged", {
    detail: { healthSpace, isVisible }
  }));
};

const settingSections: SettingSection[] = [
  {
    title: "User Preferences",
    icon: User,
    settings: [
      { id: "notifications", label: "Enable Notifications", defaultChecked: true },
      { id: "darkMode", label: "Dark Mode", defaultChecked: true },
      { id: "soundEffects", label: "Sound Effects", defaultChecked: false }
    ]
  },
  {
    title: "Notifications",
    icon: Bell,
    settings: [
      { id: "emailAlerts", label: "Email Alerts", defaultChecked: true },
      { id: "pushNotifications", label: "Push Notifications", defaultChecked: true },
      { id: "smsAlerts", label: "SMS Alerts", defaultChecked: false }
    ]
  },
  {
    title: "Security",
    icon: Shield,
    settings: [
      { id: "twoFactor", label: "Two-Factor Authentication", defaultChecked: true },
      { id: "sessionTimeout", label: "Auto Session Timeout", defaultChecked: true },
      { id: "ipWhitelist", label: "IP Whitelist", defaultChecked: false }
    ]
  },
  {
    title: "Data Management",
    icon: Database,
    settings: [
      { id: "autoBackup", label: "Automatic Backups", defaultChecked: true },
      { id: "dataRetention", label: "Data Retention", defaultChecked: true },
      { id: "compression", label: "Data Compression", defaultChecked: true }
    ]
  },
  {
    title: "Localization",
    icon: Globe,
    settings: [
      { id: "autoTimezone", label: "Automatic Timezone", defaultChecked: true },
      { id: "dateFormat", label: "24-Hour Time Format", defaultChecked: false },
      { id: "metrics", label: "Metric System", defaultChecked: true }
    ]
  },
  {
    title: "Split Card Visibility",
    icon: Layout,
    settings: [
      {
        id: "generalHealth",
        label: "General Health Split Card",
        defaultChecked: true,
        onChange: (checked) => setSplitCardVisibility("generalHealth", checked)
      },
      {
        id: "mentalHealth",
        label: "Mental Health Split Card",
        defaultChecked: true,
        onChange: (checked) => setSplitCardVisibility("mentalHealth", checked)
      },
      {
        id: "nutrition",
        label: "Nutrition Split Card",
        defaultChecked: true,
        onChange: (checked) => setSplitCardVisibility("nutrition", checked)
      },
      {
        id: "fitness",
        label: "Fitness Split Card",
        defaultChecked: true,
        onChange: (checked) => setSplitCardVisibility("fitness", checked)
      },
      {
        id: "sleepRecovery",
        label: "Sleep Recovery Split Card",
        defaultChecked: true,
        onChange: (checked) => setSplitCardVisibility("sleepRecovery", checked)
      },
      {
        id: "socialConnections",
        label: "Social Connections Split Card",
        defaultChecked: true,
        onChange: (checked) => setSplitCardVisibility("socialConnections", checked)
      },
      {
        id: "lifestyle",
        label: "Lifestyle Split Card",
        defaultChecked: true,
        onChange: (checked) => setSplitCardVisibility("lifestyle", checked)
      }
    ]
  },
  {
    title: "Health Pilot Settings",
    icon: Bot,
    content: (onReset: () => void, isEnabled: boolean) => (
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Health Pilot Status</h3>
          <p className="text-sm text-muted-foreground">
            {isEnabled 
              ? "Reset Health Pilot activation state"
              : "Health Pilot is not activated"}
          </p>
        </div>
        <Button
          variant="outline"
          className={isEnabled 
            ? "border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            : "border-gray-200 text-gray-400 cursor-not-allowed"}
          onClick={onReset}
          disabled={!isEnabled}
        >
          Reset Health Pilot
        </Button>
      </div>
    )
  }
];

const ResetHealthPilotDialog = ({
  open,
  onOpenChange,
  onConfirm
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          Disable Health Pilot
        </DialogTitle>
      </DialogHeader>
      <DialogDescription className="space-y-3">
        <p>
          Are you sure you want to disable Health Pilot? This action will:
        </p>
        <ul className="list-disc pl-4 space-y-2">
          <li>Deactivate your Health Pilot assistance</li>
          <li>Stop receiving personalized health recommendations</li>
          <li>Disable AI-powered health insights</li>
          <li>Reduce the overall effectiveness of your health monitoring</li>
        </ul>
        <p className="text-yellow-500 font-medium">
          Warning: This will significantly diminish your user experience and limit access to personalized health guidance.
        </p>
      </DialogDescription>
      <DialogFooter className="gap-2">
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            onConfirm();
            onOpenChange(false);
          }}
        >
          Disable Health Pilot
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default function Settings() {
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [isHealthPilotActivated, setIsHealthPilotActivated] = useState(false);
  const [splitCardVisibility, setSplitCardVisibility] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Initialize state from localStorage
    const checkActivationState = () => {
      const isActivated = localStorage.getItem("healthPilotActivated") === "true";
      setIsHealthPilotActivated(isActivated);
    };

    // Initialize split card visibility state
    const visibility = localStorage.getItem(SPLIT_CARD_VISIBILITY_KEY);
    if (visibility) {
      try {
        setSplitCardVisibility(JSON.parse(visibility));
      } catch {
        setSplitCardVisibility({});
      }
    }

    // Check initial state
    checkActivationState();

    // Listen for activation/deactivation events
    const handleActivation = () => setIsHealthPilotActivated(true);
    const handleDeactivation = () => setIsHealthPilotActivated(false);

    window.addEventListener("healthPilotActivated", handleActivation);
    window.addEventListener("healthPilotDeactivated", handleDeactivation);

    return () => {
      window.removeEventListener("healthPilotActivated", handleActivation);
      window.removeEventListener("healthPilotDeactivated", handleDeactivation);
    };
  }, []);

  const handleResetHealthPilot = () => {
    // Reset Health Pilot activation state
    localStorage.removeItem("healthPilotActivated");
    // Dispatch a custom event to notify components of the change
    window.dispatchEvent(new CustomEvent("healthPilotDeactivated"));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <SettingsIcon className="h-8 w-8 text-blue-600" strokeWidth={1.5} />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {settingSections.map((section) => (
          <Card key={section.title}>
            <CardHeader className="flex flex-row items-center space-y-0">
              <section.icon className="h-5 w-5 text-blue-500 mr-2" />
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {'settings' in section ? (
                <div className="space-y-4">
                  {section.settings.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between">
                      <Label htmlFor={setting.id} className="flex-1">
                        {setting.label}
                      </Label>
                      <Switch
                        id={setting.id}
                        defaultChecked={setting.defaultChecked}
                        onCheckedChange={setting.onChange}
                        checked={
                          section.title === "Split Card Visibility" 
                            ? splitCardVisibility[setting.id] ?? true
                            : undefined
                        }
                      />
                    </div>
                  ))}
                </div>
              ) : (
                section.content(() => setShowResetDialog(true), isHealthPilotActivated)
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Advanced Settings */}
      <Card>
        <CardHeader className="flex flex-row items-center space-y-0">
          <Terminal className="h-5 w-5 text-blue-500 mr-2" />
          <CardTitle>Advanced Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <TerminalWindow />
        </CardContent>
      </Card>

      <ResetHealthPilotDialog
        open={showResetDialog}
        onOpenChange={setShowResetDialog}
        onConfirm={handleResetHealthPilot}
      />
    </div>
  )
}
