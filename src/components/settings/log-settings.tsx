import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { FolderOpen, FileText } from "lucide-react"
import { useLocalStorage } from "../../hooks/use-local-storage"
import { toast } from "sonner"
import { logger } from "../../lib/logger"

export function LogSettings() {
  const [logPath, setLogPath] = useLocalStorage<string>(
    "dashboard-log-path",
    ""
  )
  const [isTestingLogs, setIsTestingLogs] = useState(false)

  const handleSelectDirectory = async () => {
    try {
      // Check if the API is available
      if (!('showDirectoryPicker' in window)) {
        toast.error("Directory selection is not supported in your browser")
        return
      }

      // Use the native directory picker API
      const dirHandle = await window.showDirectoryPicker({
        mode: 'readwrite',
      })
      
      // Verify permissions
      try {
        const verifyPermission = await dirHandle.requestPermission({
          mode: 'readwrite'
        })
        
        if (verifyPermission !== 'granted') {
          toast.error("Permission to access directory was denied")
          setLogPath("")
          return
        }

        // Initialize logger with the new directory
        await logger.setLogDirectory(dirHandle)
        
        // Store the directory path
        setLogPath(dirHandle.name)
        toast.success("Log directory updated successfully")

        // Log the directory change
        await logger.logActivity('Updated log directory', { path: dirHandle.name })

      } catch (permError) {
        console.error("Permission error:", permError)
        toast.error("Failed to get directory permissions")
        setLogPath("")
        return
      }

    } catch (error) {
      // User cancelled or other error occurred
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error("Directory selection error:", error)
        toast.error("Failed to select directory. Please try again.")
      }
    }
  }

  const handleTestLogs = async () => {
    if (!logPath) {
      toast.error("Please select a log directory first")
      return
    }

    setIsTestingLogs(true)
    try {
      // Write example logs
      await logger.info("Application initialized")
      await logger.debug("Configuration loaded", { theme: "dark", logPath })
      await logger.warn("Low disk space warning", { availableSpace: "1.2GB" })
      await logger.error("Failed to connect to service", { 
        service: "api", 
        error: "Connection timeout" 
      })
      await logger.logActivity("User logged in", { userId: "123" })
      await logger.logSystemError(
        new Error("Network request failed"), 
        "API Client"
      )
      await logger.logAppState("Dashboard loaded", { 
        components: ["overview", "charts"] 
      })

      toast.success("Test logs written successfully")
    } catch (error) {
      console.error("Error writing test logs:", error)
      toast.error("Failed to write test logs")
    } finally {
      setIsTestingLogs(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log Settings</CardTitle>
        <CardDescription>
          Configure where system logs are stored. Logs include application activities, errors, and system events.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="log-path">Log Directory</Label>
            <div className="flex gap-2">
              <Input
                id="log-path"
                value={logPath}
                placeholder="Select a directory for logs..."
                readOnly
                className="flex-1"
              />
              <Button
                onClick={handleSelectDirectory}
                className="flex items-center gap-2"
                title="Select log directory"
              >
                <FolderOpen className="h-4 w-4" />
                Select
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              All application logs will be written to 'dashboard.log' in the selected directory.
            </p>
          </div>

          {logPath && (
            <div>
              <Button
                onClick={handleTestLogs}
                variant="outline"
                className="flex items-center gap-2"
                disabled={isTestingLogs}
              >
                <FileText className="h-4 w-4" />
                {isTestingLogs ? "Writing test logs..." : "Write test logs"}
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Click to write sample logs to test the logging system.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
