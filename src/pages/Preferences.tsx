import React from "react";
import { useTheme } from "../components/theme-provider";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import {
  Moon,
  Sun,
  Bell,
  Mail,
  Languages,
  Calendar,
} from "lucide-react";

export const Preferences = () => {
  const { theme, setTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [pushNotifications, setPushNotifications] = React.useState(true);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Preferences</h2>

      {/* Theme Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Appearance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {theme === "dark" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <div>
                <Label>Dark Mode</Label>
                <p className="text-sm text-gray-500">
                  Switch between light and dark theme
                </p>
              </div>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Bell className="h-5 w-5" />
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive push notifications for important updates
                </p>
              </div>
            </div>
            <Switch
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Mail className="h-5 w-5" />
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive email notifications for weekly summaries
                </p>
              </div>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
        </div>
      </Card>

      {/* Calendar Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Calendar</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Calendar className="h-5 w-5" />
              <div>
                <Label>Health Calendar Integration</Label>
                <p className="text-sm text-gray-500">
                  Sync health events with your calendar
                </p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Language Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Language & Region</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Languages className="h-5 w-5" />
            <div>
              <Label>Language</Label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Preferences;
