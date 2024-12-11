import type { FileSystemDirectoryHandle } from "../types/file-system"

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  details?: Record<string, any>;
}

class Logger {
  private logDirectory?: FileSystemDirectoryHandle;

  constructor() {
    this.logDirectory = undefined;
  }

  private async log(level: string, message: string, details?: Record<string, any>) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      details
    };
    
    // In a real application, this would write to a file or send to a logging service
    console.log(entry);
  }

  async info(message: string, details?: Record<string, any>) {
    await this.log('info', message, details);
  }

  async debug(message: string, details?: Record<string, any>) {
    await this.log('debug', message, details);
  }

  async warn(message: string, details?: Record<string, any>) {
    await this.log('warn', message, details);
  }

  async error(message: string, details?: Record<string, any>) {
    await this.log('error', message, details);
  }

  async logActivity(message: string, details?: Record<string, any>) {
    await this.log('activity', message, details);
  }

  async logSystemError(error: Error, context: string) {
    await this.log('system_error', context, {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
  }

  async logAppState(state: string, details?: Record<string, any>) {
    await this.log('app_state', state, details);
  }

  async setLogDirectory(directory: FileSystemDirectoryHandle) {
    this.logDirectory = directory;
  }

  getLogDirectory(): FileSystemDirectoryHandle | undefined {
    return this.logDirectory;
  }
}

export const logger = new Logger();
