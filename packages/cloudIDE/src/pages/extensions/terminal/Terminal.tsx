import { getCookie } from '@/utils';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { getTreeData } from '../layout';

const blue = (str: string) => `\x1b[34m${str}\x1b[0m`;
const green = (str: string) => `\x1b[32m${str}\x1b[0m`;

export default () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const commandQueen = useRef<string[]>([]);
  const queenPointer = useRef(0);
  const ws = useRef<WebSocket>();
  const terminal = useRef<Terminal>();
  const executing = useRef(false);
  const currentLine = useRef<{ value: string[]; index: number }>({
    value: [],
    index: 0,
  });

  const repo = useMemo(() => getCookie('repo'), []);
  const PREFIX = `${green('admin')}:~/${blue(repo)}\n$ `;

  function executeCommand(command?: string) {
    if (command && ws.current) {
      executing.current = true;

      ws.current.send(command);
    } else {
      terminal.current?.write(PREFIX);
    }
  }

  function initWebsocket() {
    const webSocket = new WebSocket('ws://localhost:3000/websocket');

    webSocket.onopen = function (e) {
      ws.current = webSocket;
      if (terminal.current) {
        terminal.current.write('连接成功！\n');
        terminal.current.write(PREFIX);
        terminal.current.options.disableStdin = true;
      }
    };

    webSocket.onmessage = function (e) {
      if (terminal.current) {
        if (e.data === 'molecule-EOL') {
          executing.current = false;
          terminal.current.write(PREFIX);
          getTreeData();
        } else {
          terminal.current.write(e.data);
        }
      }
    };

    webSocket.onclose = function (e) {
      console.log('close:', e);
    };

    webSocket.onerror = function (e) {
      console.log('onmessage:', e);
    };
  }

  function cancelTask() {
    if (executing) {
      ws.current?.send('molecule-EOL');
    }
  }

  function initTerminal() {
    const bgColor = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--panel-background');

    const fit = new FitAddon();
    const term = new Terminal({
      rendererType: 'canvas',
      convertEol: true,
      cursorStyle: 'block',
      cursorBlink: true,
      fontSize: 13,
      fontFamily: 'Consolas, "Courier New", monospace',
      disableStdin: true,
      theme: {
        background: bgColor,
      },
    });

    terminal.current = term;
    term.loadAddon(fit);

    term.open(terminalRef.current!);
    fit.fit();
    term.focus();

    term.write('请稍后，正在连接服务端中...\n');

    term.onKey((e) => {
      const { key } = e;
      switch (key) {
        // up
        case '\x1B[A': {
          if (queenPointer.current === 0) break;
          const command = commandQueen.current[--queenPointer.current];
          if (command) {
            term.write('\r');
            term.write('\x1b[?K');
            term.write('$ ');
            term.write(command);
          }
          break;
        }
        // down
        case '\x1B[B': {
          if (queenPointer.current === commandQueen.current.length - 1) break;
          const command = commandQueen.current[++queenPointer.current];
          if (command) {
            term.write('\r');
            term.write('\x1b[?K');
            term.write('$ ');
            term.write(command);
          }
          break;
        }
        // 回车
        case '\r': {
          const command = currentLine.current.value.join('');
          term.write('\n');
          currentLine.current = {
            value: [],
            index: 0,
          };
          executeCommand(command);
          if (command) {
            commandQueen.current.push(command);
            queenPointer.current = commandQueen.current.length;
          }

          break;
        }
        // backspace
        case '\x7F': {
          if (term.buffer.normal.cursorX > 2) {
            currentLine.current.value[currentLine.current.index] = '';
            currentLine.current.index -= 1;
            term.write('\b \b');
          }
          break;
        }
        // ctrl+c
        case '\u0003': {
          term.write('\n');
          term.write('\x1b[?K');
          term.write(PREFIX);
          currentLine.current = {
            value: [],
            index: 0,
          };
          cancelTask();
          break;
        }
        default: {
          currentLine.current.value[currentLine.current.index] = e.key;
          currentLine.current.index += 1;
          term.write(e.key);
        }
      }
    });
  }

  useLayoutEffect(() => {
    initTerminal();
    initWebsocket();
    return () => {
      terminal.current?.dispose();
      ws.current?.close();
    };
  }, []);
  return (
    <div ref={terminalRef} style={{ margin: '0 18px', height: '100%' }}></div>
  );
};
