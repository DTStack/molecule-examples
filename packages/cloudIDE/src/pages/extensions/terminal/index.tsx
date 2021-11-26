import { useState } from 'react';
import molecule from '@dtinsight/molecule';
import { IExtension } from '@dtinsight/molecule/esm/model';
import { Component, connect } from '@dtinsight/molecule/esm/react';
import { IExtensionService } from '@dtinsight/molecule/esm/services';

interface ITerminal {
  logs: string[];
  basePath: string | null;
}

class TerminalService extends Component<any> {
  protected state: ITerminal;
  private sockets: WebSocket | null = null;

  constructor() {
    super();
    this.state = {
      logs: [],
      basePath: null,
    };
  }

  public setLogs(logs: string[]) {
    this.setState({
      logs,
    });
  }

  public setBasePath(basePath: string) {
    this.setState({
      basePath,
    });
  }

  public createWebsocket(commands: string) {
    if (!this.sockets) {
      const ws = new WebSocket('ws://localhost:3000/websocket');
      const that = this;

      ws.onopen = function (evt) {
        console.log('Connection open ...', commands);
        that.sockets = ws;
        // ws.send(JSON.stringify(commands));
      };

      ws.onmessage = function (evt) {
        console.log('Received Message: ' + evt.data);
        that.setLogs(JSON.parse(evt.data));
      };

      ws.onclose = function (evt) {
        console.log('Connection closed.', evt);
        that.sockets = null;
      };

      ws.onerror = function (err) {
        console.log('err:', err);
      };
    }
  }

  public stopWebSocket() {
    if (this.sockets) {
      this.sockets.close();
      this.sockets = null;
    }
  }
}

export const terminalService = new TerminalService();
const Terminal = connect(terminalService, ({ logs, basePath }: ITerminal) => {
  const [value, setValue] = useState('');
  //   if (!basePath) return <div>Please choose a repo first</div>;

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDonw = (e) => {
    if (e.code === 'KeyC' && e.ctrlKey) {
      // cancel
      if (value) {
        setValue('');
      } else {
        fetch('/api/mo/cancelTask', {
          method: 'POST',
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              const nextLogs = logs.concat();
              nextLogs.push('Canceled by user');
              terminalService.setLogs(nextLogs);
              terminalService.stopWebSocket();
            }
          });
      }
    }
    console.log('e:', e);
  };

  return (
    <div style={{ height: '100%', overflow: 'scroll' }}>
      {logs.map((log) => (
        <pre key={log}>{log}</pre>
      ))}
      <div style={{ display: 'flex' }}>
        <pre>$[~{basePath}]:</pre>
        <pre
          style={{ flex: 1, outline: 'none' }}
          contentEditable
          onChange={handleChange}
          onKeyDown={handleKeyDonw}
        >
          {value}
        </pre>
      </div>
    </div>
  );
});

export class TerminalExtension implements IExtension {
  id: string = 'terminal';
  name: string = 'terminal';

  activate(extensionCtx: IExtensionService): void {
    molecule.panel.add({
      id: 'terminal',
      name: 'Terminal',
      renderPane: () => <Terminal />,
    });
  }

  dispose(extensionCtx: IExtensionService): void {}
}
