import { getCookie } from '@/utils';
import molecule from '@dtinsight/molecule';
import {
  FileTypes,
  IExtension,
  TreeNodeModel,
} from '@dtinsight/molecule/esm/model';
import { message } from 'antd';
import { IExtensionService } from '@dtinsight/molecule/esm/services';
import { history } from 'umi';
import Icon, { getIconByName } from '@/pages/components/icon';

interface IDirProps {
  uid: string;
  isLeaf: boolean;
  name: string;
  children: IDirProps[];
}

function convertToTreeModel(
  data: IDirProps[],
  level: number = 0,
): TreeNodeModel[] {
  return data.map((item) => {
    return new TreeNodeModel({
      id: item.uid,
      name: item.name,
      isLeaf: item.isLeaf,
      fileType: item.isLeaf ? FileTypes.File : FileTypes.Folder,
      icon: <Icon {...getIconByName(item.name)} />,
      children: convertToTreeModel(item.children, level + 1),
    });
  });
}

function getTreeData() {
  fetch('/api/mo/getRepoDir', { method: 'GET' })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        const repo = getCookie('repo');
        const root = new TreeNodeModel({
          id: `${repo}-root`,
          name: repo,
          fileType: FileTypes.RootFolder,
          isLeaf: false,
          children: convertToTreeModel(res.data),
        });
        molecule.folderTree.add(root);
      } else {
        message.error(res.message);
      }
    });
}

export default class LayoutExtension implements IExtension {
  id: string = 'layout';
  name: string = 'layout';
  activate(extensionCtx: IExtensionService): void {
    // 获取 cookie 中的 repo 值
    const repo = getCookie('repo');
    if (!repo) {
      history.replace('/');
    }

    getTreeData();
  }
  dispose(extensionCtx: IExtensionService): void {
    throw new Error('Method not implemented.');
  }
}
