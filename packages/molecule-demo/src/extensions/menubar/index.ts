
import molecule from '@dtinsight/molecule';
import { IExtension, IMenuBarItem } from '@dtinsight/molecule/esm/model';
import { IExtensionService } from '@dtinsight/molecule/esm/services';

export const vscodeMenuItem: IMenuBarItem = {
    id: 'menu.vscode',
    name: 'VSCode',
    icon: '',
}

export class MenuBarExtension implements IExtension {

    id: string = 'MyMenubar';
    name: string = 'MyMenu Bar';

    activate(extensionCtx: IExtensionService): void {
        this.initUI();
    }

    initUI() {
        // TODO: upgrade the Molecule and remove it.
        const { builtInMenuBarData } = molecule.builtin.getModules();
        setTimeout(() => { 
            molecule.menuBar.setMenus([...builtInMenuBarData, vscodeMenuItem ]);
        });

        molecule.menuBar.onSelect((menuId) => {
            if (menuId === vscodeMenuItem.id) {
                window.location.href = '/vscode';
            }
        })
    }

    dispose() {
        molecule.menuBar.reset();
    }
}