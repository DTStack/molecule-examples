import molecule from '@dtinsight/molecule';
import { IExtension } from '@dtinsight/molecule/esm/model/extension';

export const ExtendsMonacoSync: IExtension = {
    id: 'ExtendDataSync',
    name: 'Data Sync',
    activate() {
        molecule.editor.open({ id: '1', name: 'resource' }, 1);
        molecule.editor.open({ id: '2', name: 'formatting' }, 2);
        molecule.layout.toggleMenuBarVisibility();
        molecule.layout.togglePanelVisibility();
        molecule.layout.toggleSidebarVisibility();
        molecule.layout.toggleActivityBarVisibility();
    },
    dispose() {},
};
