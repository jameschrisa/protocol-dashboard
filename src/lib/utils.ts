import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function execute_command(command: string): Promise<string> {
  try {
    // In a real implementation, this would connect to a backend service
    // For now, we'll simulate some basic command outputs
    const parts = command.trim().split(" ")
    const cmd = parts[0]
    const args = parts.slice(1)

    switch (cmd) {
      case "ls":
        // Simulate ls output
        return `
README.md
package.json
src/
  components/
  pages/
  lib/
  assets/
public/
node_modules/`.trim()

      case "cat":
        if (args[0] === "README.md") {
          return "# Supply Chain Dashboard\n\nA modern dashboard for supply chain management."
        }
        if (args[0] === "package.json") {
          return JSON.stringify({
            name: "supply-chain-dashboard",
            version: "1.0.0",
            private: true
          }, null, 2)
        }
        throw new Error("File not found")

      default:
        // For other commands, just echo back the command
        return `Executing: ${command}`
    }
  } catch (error) {
    throw new Error(`Failed to execute command: ${command}`)
  }
}
