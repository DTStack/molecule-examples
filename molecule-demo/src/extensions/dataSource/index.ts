
import molecule from '@dtinsight/molecule';
import { IExtension } from '@dtinsight/molecule/esm/model/extension';
import { IExtensionService } from '@dtinsight/molecule/esm/services';
import { DATA_SOURCE_ID, dataSourceActivityBar, dataSourceSidebar, createDataSourceMenuItem } from './base';

export class DataSourceExtension implements IExtension {

    id: string = DATA_SOURCE_ID;
    name: string = 'Data Source';

    activate(extensionCtx: IExtensionService): void {
        this.initUI();
    }

    initUI() {
        molecule.sidebar.add(dataSourceSidebar);
        molecule.activityBar.add(dataSourceActivityBar);

        setTimeout(() => { // TODO: upgrade the Molecule and remove it.
            molecule.menuBar.append(createDataSourceMenuItem, 'File');
        })
    }

    dispose(extensionCtx: IExtensionService): void {
        molecule.sidebar.remove(dataSourceSidebar.id);
        molecule.activityBar.remove(dataSourceActivityBar.id);
    }
}