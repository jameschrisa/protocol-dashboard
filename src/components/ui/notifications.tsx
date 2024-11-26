import { Bell } from "lucide-react"
import { Button } from "./button"
import { toast } from "sonner"

// Flare-specific notifications
const notifications = [
  {
    id: 1,
    title: "High Flare Temperature Alert",
    message: "Flare tip temperature exceeding optimal range in Unit FLR-201. Adjusting steam flow rate.",
    time: "2 minutes ago"
  },
  {
    id: 2,
    title: "Emissions Threshold Warning",
    message: "NOx emissions approaching regulatory limit. Initiating combustion optimization sequence.",
    time: "1 hour ago"
  },
  {
    id: 3,
    title: "Steam Injection Optimization",
    message: "Auto-tuning steam injection rates based on flow variations. Expected efficiency gain: 2.3%",
    time: "3 hours ago"
  },
  {
    id: 4,
    title: "Preventive Maintenance Alert",
    message: "Scheduled maintenance due for pilot ignition system. Current reliability: 98.5%",
    time: "5 hours ago"
  }
]

export function NotificationButton() {
  const showNotifications = () => {
    // Show notifications in reverse order (newest first)
    [...notifications].reverse().forEach((notification) => {
      toast(notification.title, {
        description: notification.message,
        duration: 5000,
      })
    })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 relative"
      onClick={showNotifications}
    >
      <Bell className="h-5 w-5" />
      <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500" />
      <span className="sr-only">Show notifications</span>
    </Button>
  )
}
