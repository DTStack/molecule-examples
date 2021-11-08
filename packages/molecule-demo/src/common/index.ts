import { IEditorTab, IFolderTreeNodeProps } from '@dtinsight/molecule/esm/model';

export function transformToEditorTab(item: IFolderTreeNodeProps): IEditorTab {
    const tabData: IEditorTab = item;
    tabData.breadcrumb = item.location 
        ? 
        item.location.split('/')
            .map((local: string) => ({ id: local, name: local }) )
        : 
        []
    return tabData;
}