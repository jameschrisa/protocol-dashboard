interface CommandOutput {
  output: string;
  isError?: boolean;
}

interface FileSystem {
  [key: string]: {
    type: 'file' | 'directory';
    content?: string;
    children?: { [key: string]: any };
  };
}

// Simulated file system
const fileSystem: FileSystem = {
  home: {
    type: 'directory',
    children: {
      user: {
        type: 'directory',
        children: {
          documents: {
            type: 'directory',
            children: {
              'health-report.txt': {
                type: 'file',
                content: 'Latest health metrics and analysis...'
              }
            }
          },
          'config.json': {
            type: 'file',
            content: '{\n  "theme": "dark",\n  "notifications": true\n}'
          }
        }
      }
    }
  }
};

let currentPath = '/home/user';

export const executeCommand = (command: string): CommandOutput => {
  const parts = command.trim().split(' ');
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (cmd) {
    case 'help':
      return {
        output: `Available commands:
  System:
    help      - Show this help message
    clear     - Clear terminal screen
    whoami    - Display current user
    date      - Show current date and time
    uname     - Show system information
    
  File Operations:
    ls        - List directory contents
    pwd       - Print working directory
    cd        - Change directory
    mkdir     - Create directory
    touch     - Create empty file
    cat       - Display file contents
    rm        - Remove file`
      };

    case 'pwd':
      return { output: currentPath };

    case 'ls':
      try {
        const path = args[0] || currentPath;
        const parts = path.split('/').filter(Boolean);
        let current = fileSystem;
        for (const part of parts) {
          if (!current[part] || current[part].type !== 'directory') {
            throw new Error(`Directory not found: ${path}`);
          }
          current = current[part].children || {};
        }
        const items = Object.entries(current).map(([name, item]) => {
          const prefix = item.type === 'directory' ? 'd' : '-';
          return `${prefix}rw-r--r--  ${name}`;
        });
        return { output: items.join('\n') };
      } catch (err) {
        const error = err as Error;
        return { output: error.message, isError: true };
      }

    case 'cd':
      if (!args.length) {
        currentPath = '/home/user';
        return { output: '' };
      }
      if (args[0] === '..') {
        const parts = currentPath.split('/').filter(Boolean);
        parts.pop();
        currentPath = '/' + parts.join('/');
        return { output: '' };
      }
      // Simplified CD logic
      currentPath = args[0].startsWith('/')
        ? args[0]
        : `${currentPath}/${args[0]}`;
      return { output: '' };

    case 'whoami':
      return { output: 'admin' };

    case 'date':
      return { output: new Date().toString() };

    case 'uname':
      return { output: 'Protocol Health OS v1.0.0 x86_64' };

    case 'cat':
      if (!args.length) {
        return { output: 'Usage: cat <filename>', isError: true };
      }
      try {
        const filename = args[0];
        const parts = currentPath.split('/').filter(Boolean);
        let current = fileSystem;
        for (const part of parts) {
          current = current[part].children || {};
        }
        if (!current[filename] || current[filename].type !== 'file') {
          throw new Error(`File not found: ${filename}`);
        }
        return { output: current[filename].content || '' };
      } catch (err) {
        const error = err as Error;
        return { output: error.message, isError: true };
      }

    case 'mkdir':
      if (!args.length) {
        return { output: 'Usage: mkdir <directory>', isError: true };
      }
      return { output: `Created directory: ${args[0]}` };

    case 'touch':
      if (!args.length) {
        return { output: 'Usage: touch <filename>', isError: true };
      }
      return { output: `Created file: ${args[0]}` };

    case 'rm':
      if (!args.length) {
        return { output: 'Usage: rm <filename>', isError: true };
      }
      return { output: `Removed: ${args[0]}` };

    case 'clear':
      return { output: 'CLEAR' };

    default:
      return { output: `Command not found: ${cmd}`, isError: true };
  }
};
