import React, { useState } from "react";
import { executeCommand } from "./terminal-commands";

export const TerminalWindow = () => {
  const [commands, setCommands] = useState<Array<{input?: string, output: string, isError?: boolean}>>([{
    output: "Welcome to Protocol Health Terminal\nType 'help' for available commands"
  }]);
  const [currentCommand, setCurrentCommand] = useState("");

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentCommand.trim()) {
      if (currentCommand.toLowerCase() === "clear") {
        setCommands([{
          output: "Welcome to Protocol Health Terminal\nType 'help' for available commands"
        }]);
      } else {
        const result = executeCommand(currentCommand);
        setCommands([...commands, {
          input: currentCommand,
          ...result
        }]);
      }
      setCurrentCommand("");
    }
  };

  return (
    <div className="bg-[#1E1E1E] rounded-lg overflow-hidden font-mono text-sm">
      <div className="bg-[#2D2D2D] px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
        </div>
        <span className="text-white/60 text-xs ml-2">Terminal</span>
      </div>
      <div className="p-4 h-[300px] overflow-y-auto space-y-2">
        {commands.map((cmd, index) => (
          <div key={index}>
            {cmd.input && (
              <div className="flex items-center text-white">
                <span className="text-green-400">$ </span>
                <span className="ml-2">{cmd.input}</span>
              </div>
            )}
            <div className={`ml-0 whitespace-pre-wrap ${cmd.isError ? 'text-red-400' : 'text-gray-400'}`}>
              {cmd.output}
            </div>
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-green-400">$ </span>
          <input
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent text-white outline-none ml-2"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};
