import { IActivityBarItem, IEditorTab, ISidebarPane } from '@dtinsight/molecule/esm/model';
import DataSourceView from '../../views/dataSource/dataSourceSidebar';
import CreateDataSourceView from '../../views/dataSource/createDataSource';
import molecule from '@dtinsight/molecule';

export const DATA_SOURCE_ID = 'DataSource';

export const dataSourceActivityBar: IActivityBarItem = {
    id: DATA_SOURCE_ID,
    sortIndex: 1, // sorting the dataSource to the first position
    name: 'Data Source',
    title: 'Data Source Management',
    icon: 'database'
}

export const dataSourceSidebar: ISidebarPane = {
    id: DATA_SOURCE_ID,
    title: 'DataSourcePane',
    render: () => {
        return <DataSourceView />;
    }
}

export const createDataSourceTab: IEditorTab = {
    id: DATA_SOURCE_ID,
    name: 'Create Data Source',
    renderPane: () => {
        return <CreateDataSourceView />;
    }
}

export function openCreateDataSourceView() {
    molecule.editor.open(createDataSourceTab);
}

export function existCreateDataSourceView() {
    const group = molecule.editor.getState().current;
    if (group) {
        molecule.editor.closeTab(createDataSourceTab.id!, group.id!);
    }
}