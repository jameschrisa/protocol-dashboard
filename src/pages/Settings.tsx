import { Settings as SettingsIcon, User, Bell, Shield, Database, Globe, Terminal, AlertTriangle, Bot } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Switch } from "../components/ui/switch"
import { Label } from "../components/ui/label"
import { useState } from "react"
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
}

type SettingSection = {
  title: string;
  icon: React.ElementType;
} & (
  | { settings: SettingItem[] }
  | { content: (onReset: () => void) => React.ReactNode }
);

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
    title: "Health Pilot Settings",
    icon: Bot,
    content: (onReset: () => void) => (
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Health Pilot Status</h3>
          <p className="text-sm text-muted-foreground">
            Reset Health Pilot activation state
          </p>
        </div>
        <Button
          variant="outline"
          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={onReset}
        >
          Reset Health Pilot
        </Button>
      </div>
    )
  }
]

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
                      />
                    </div>
                  ))}
                </div>
              ) : (
                section.content(() => setShowResetDialog(true))
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
