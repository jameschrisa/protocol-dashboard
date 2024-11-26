import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { ScrollArea } from "../ui/scroll-area"
import { Terminal as TerminalIcon } from "lucide-react"
import { execute_command } from "../../lib/utils"

interface CommandHistory {
  command: string
  output?: string
}

const HELP_TEXT = `
Available commands:
  ls [path]     - List directory contents
  pwd           - Print working directory
  cd [path]     - Change directory
  rm [path]     - Remove file
  cp [src] [dst]- Copy file
  cat [file]    - Display file contents
  clear         - Clear terminal
  help          - Show this help message
`

export function Terminal() {
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([
    { command: "help", output: HELP_TEXT.trim() }
  ])
  const [currentCommand, setCurrentCommand] = useState("")
  const [currentPath, setCurrentPath] = useState("/Users/jchrisa/CODE/SCD")
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [commandHistory])

  const handleTerminalClick = () => {
    inputRef.current?.focus()
  }

  const executeCommand = async (command: string) => {
    const parts = command.trim().split(" ")
    const cmd = parts[0]
    const args = parts.slice(1)

    switch (cmd) {
      case "clear":
        setCommandHistory([])
        return ""
      
      case "help":
        return HELP_TEXT.trim()
      
      case "pwd":
        return currentPath
      
      case "cd":
        if (args.length === 0) {
          return "Usage: cd [path]"
        }
        // In a real implementation, we would validate the path
        setCurrentPath(args[0])
        return ""
      
      case "ls":
        try {
          const path = args[0] || currentPath
          const result = await execute_command(`ls ${path}`)
          return result
        } catch (error) {
          return `ls: cannot access '${args[0]}': No such file or directory`
        }
      
      case "cat":
        if (args.length === 0) {
          return "Usage: cat [file]"
        }
        try {
          const result = await execute_command(`cat ${args[0]}`)
          return result
        } catch (error) {
          return `cat: ${args[0]}: No such file or directory`
        }
      
      case "cp":
        if (args.length !== 2) {
          return "Usage: cp [source] [destination]"
        }
        try {
          const result = await execute_command(`cp ${args[0]} ${args[1]}`)
          return result || "File copied successfully"
        } catch (error) {
          return `cp: cannot copy '${args[0]}' to '${args[1]}'`
        }
      
      case "rm":
        if (args.length === 0) {
          return "Usage: rm [file]"
        }
        try {
          const result = await execute_command(`rm ${args[0]}`)
          return result || "File removed successfully"
        } catch (error) {
          return `rm: cannot remove '${args[0]}'`
        }
      
      default:
        return `Command not found: ${cmd}. Type 'help' for available commands.`
    }
  }

  const handleCommand = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentCommand.trim()) {
      // Add command to history immediately
      setCommandHistory(prev => [...prev, { command: currentCommand }])
      
      try {
        const output = await executeCommand(currentCommand)
        
        // Update the last command with its output
        setCommandHistory(prev => [
          ...prev.slice(0, -1),
          { 
            command: currentCommand, 
            output: output || undefined // Don't show undefined for empty outputs
          }
        ])
      } catch (error) {
        setCommandHistory(prev => [
          ...prev.slice(0, -1),
          { command: currentCommand, output: "Error executing command" }
        ])
      }
      
      setCurrentCommand("")
    }
  }

  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-5 w-5" />
          <CardTitle>Terminal</CardTitle>
        </div>
        <CardDescription>
          Execute commands directly in the dashboard. Type 'help' for available commands.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div 
          className="min-h-[400px] rounded-md border bg-muted p-4 font-mono"
          onClick={handleTerminalClick}
        >
          <ScrollArea className="h-[360px]" ref={scrollAreaRef}>
            {commandHistory.map((item, index) => (
              <div key={index} className="mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">$</span>
                  <span>{item.command}</span>
                </div>
                {item.output && (
                  <div className="mt-1 whitespace-pre-wrap text-muted-foreground">
                    {item.output}
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-2">
              <span className="text-green-500">$</span>
              <Input
                ref={inputRef}
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleCommand}
                className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                placeholder="Type a command..."
              />
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}
