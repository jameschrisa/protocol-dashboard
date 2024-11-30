import { Settings as SettingsIcon, User, Bell, Shield, Database, Globe, Palette, Terminal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Switch } from "../components/ui/switch"
import { Label } from "../components/ui/label"
import { useState } from "react"

const settingSections = [
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
    title: "Appearance",
    icon: Palette,
    settings: [
      { id: "animations", label: "Enable Animations", defaultChecked: true },
      { id: "compactView", label: "Compact View", defaultChecked: false },
      { id: "highContrast", label: "High Contrast", defaultChecked: false }
    ]
  }
]

interface TerminalCommand {
  command: string;
  output: string;
  timestamp: string;
}

const TerminalWindow = () => {
  const [commands, setCommands] = useState<TerminalCommand[]>([
    {
      command: "help",
      output: "Available commands: help, version, status, clear",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [currentCommand, setCurrentCommand] = useState("");

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentCommand.trim()) {
      const newCommand: TerminalCommand = {
        command: currentCommand,
        output: getCommandOutput(currentCommand),
        timestamp: new Date().toLocaleTimeString()
      };

      if (currentCommand === "clear") {
        setCommands([]);
      } else {
        setCommands([...commands, newCommand]);
      }
      setCurrentCommand("");
    }
  };

  const getCommandOutput = (cmd: string): string => {
    const command = cmd.toLowerCase().trim();
    switch (command) {
      case "help":
        return "Available commands: help, version, status, clear";
      case "version":
        return "Protocol Health CLI v1.0.0";
      case "status":
        return "All systems operational";
      default:
        return `Command not found: ${command}`;
    }
  };

  return (
    <div className="bg-[#1E1E1E] rounded-lg overflow-hidden font-mono text-sm">
      {/* Terminal Header */}
      <div className="bg-[#2D2D2D] px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
        </div>
        <span className="text-white/60 text-xs ml-2">Protocol Health CLI</span>
      </div>

      {/* Terminal Content */}
      <div className="p-4 h-[300px] overflow-y-auto space-y-2">
        {commands.map((cmd, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[#27C93F]">➜</span>
              <span className="text-[#4D9DE0]">~</span>
              <span className="text-white">{cmd.command}</span>
            </div>
            <div className="text-white/70 pl-6">{cmd.output}</div>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-[#27C93F]">➜</span>
          <span className="text-[#4D9DE0]">~</span>
          <input
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleCommand}
            className="bg-transparent text-white focus:outline-none flex-1"
            placeholder="Type a command..."
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};

export default function Settings() {
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
    </div>
  )
}
