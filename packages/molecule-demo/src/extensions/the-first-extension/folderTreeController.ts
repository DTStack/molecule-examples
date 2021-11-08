import molecule from '@dtinsight/molecule';
import { IFolderTreeNodeProps } from '@dtinsight/molecule/esm/model';
import { transformToEditorTab } from '../../common';

import { cloneDeep } from 'lodash';
import API from '../../api';

export async function initFolderTree () {
    const res = await API.getFolderTree();
    if (res.message === 'success') {
        const folderTreeData = cloneDeep(res.data);
        molecule.folderTree.add(folderTreeData);
    }
}

export function handleSelectFolderTree() {
    molecule.folderTree.onSelectFile((file: IFolderTreeNodeProps) => {
        molecule.editor.open(transformToEditorTab(file))
    });
}
