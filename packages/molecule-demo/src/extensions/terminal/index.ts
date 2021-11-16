import molecule from '@dtinsight/molecule';
import { IExtension } from '@dtinsight/molecule/esm/model/extension';
import { IExtensionService } from '@dtinsight/molecule/esm/services';
import { terminalPanel } from './base';

export class TerminalExtension implements IExtension {

    id: string = '';
    name: string = '';

    constructor(
        id: string = 'Terminal', 
        name: string = 'Terminal'
    ) {
        this.id = id;
        this.name = name;
    }

    activate(extensionCtx: IExtensionService): void {
        molecule.panel.add(terminalPanel);
    }

    dispose(extensionCtx: IExtensionService): void {
        molecule.panel.remove(terminalPanel.id);
    }
}