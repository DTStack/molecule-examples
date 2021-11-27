import { getCookie } from '@/utils';
import { useLayoutEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const blue = (str: string) => `\x1b[34m${str}\x1b[0m`;
const green = (str: string) => `\x1b[32m${str}\x1b[0m`;

export default () => {
  const terminal = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const repo = getCookie('repo');
    const PREFIX = `${green('admin')}:~/${blue(repo)}\n$ `;
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
      fontFamily: 'monospace',
      theme: {
        background: bgColor,
      },
    });

    term.loadAddon(fit);

    term.open(terminal.current!);
    term.write(PREFIX);
    fit.fit();
    term.onKey((e) => {
      const { domEvent, key } = e;
      switch (key) {
        case '\x7F': {
          //   term.write('\x1b[?K');
          //   console.log(term.buffer.normal.cursorX);
          //   console.log(term.buffer.normal.cursorY);
          //   if (term.buffer.normal.cursorX > 2) {
          //     const orinalText =
          //       term.buffer.normal.getLine(1)?.translateToString(true) || '';
          //     term.write(
          //       '\x1b[?2K',
          //       // '$ ' +
          //       // orinalText.slice(0, term.buffer.normal.cursorX - 1),
          //     );
          //     term.buffer.normal.getLine()
          //   }
        }
        default: {
          term.write(e.key);
        }
      }
    });
  }, []);
  return <div ref={terminal} style={{ margin: '0 18px' }}></div>;
};
