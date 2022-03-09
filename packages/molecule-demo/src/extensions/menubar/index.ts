
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
        const { data } = molecule.menuBar.getState();
        const nextData = data.concat();
        nextData.push(vscodeMenuItem);

        molecule.menuBar.setState({ data: nextData });
        molecule.menuBar.onSelect((menuId) => {
            if (menuId === vscodeMenuItem.id) {
                window.location.href = '#/vscode';
            }
        });
        molecule.layout.setMenuBarMode('horizontal');
    }

    dispose() {
        molecule.menuBar.reset();
    }
}