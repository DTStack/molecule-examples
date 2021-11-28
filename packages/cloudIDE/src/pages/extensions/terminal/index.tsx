import molecule from '@dtinsight/molecule';
import { IExtension } from '@dtinsight/molecule/esm/model';
import { IExtensionService } from '@dtinsight/molecule/esm/services';
import Terminal from './Terminal';

export default class TerminalExtension implements IExtension {
  id: string = 'terminal';
  name: string = 'terminal';
  activate(extensionCtx: IExtensionService): void {
    molecule.panel.add({
      id: 'terminal',
      name: 'terminal',
      renderPane: () => <Terminal />,
    });
  }
  dispose(extensionCtx: IExtensionService): void {
    throw new Error('Method not implemented.');
  }
}
