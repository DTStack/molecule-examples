import { convertToTreeModel, getCookie } from '@/utils';
import molecule from '@dtinsight/molecule';
import {
  FileTypes,
  Float,
  IExtension,
  TreeNodeModel,
} from '@dtinsight/molecule/esm/model';
import { message } from 'antd';
import { IExtensionService } from '@dtinsight/molecule/esm/services';
import { history } from 'umi';
import Icon from '@/pages/components/icon';
import { mdiSourceBranch } from '@mdi/js';

export function getTreeData() {
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
        const rootNode = molecule.folderTree.get(`${repo}-root`);
        if (rootNode) {
          molecule.folderTree.update(root);
        } else {
          molecule.folderTree.add(root);
        }
      } else {
        message.error(res.message);
      }
    });
}

function getBranch() {
  fetch('/api/mo/getBranch', { method: 'GET' })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        molecule.statusBar.add(
          {
            id: 'branch',
            sortIndex: 0,
            render: () => (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Icon type={mdiSourceBranch} size="16px" color="#fff" />
                {res.data}
              </div>
            ),
          },
          Float.left,
        );
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
    getBranch();
  }
  dispose(extensionCtx: IExtensionService): void {
    throw new Error('Method not implemented.');
  }
}
