import molecule from '@dtinsight/molecule';
import { IExtension } from '@dtinsight/molecule/esm/model/extension';
import { IExtensionService } from '@dtinsight/molecule/esm/services';
import { terminalPanel } from './base';

export class TerminalExtension implements IExtension {

    id: string = 'Terminal';
    name: string = 'Terminal';

    activate(extensionCtx: IExtensionService): void {
        molecule.panel.add(terminalPanel);
    }

    dispose(extensionCtx: IExtensionService): void {
        molecule.panel.remove(terminalPanel.id);
    }
}