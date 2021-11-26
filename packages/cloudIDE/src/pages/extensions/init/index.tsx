import { gotoLogin } from '@/pages/components/login';
import molecule from '@dtinsight/molecule';
import { Button } from '@dtinsight/molecule/esm/components';
import {
  FileTypes,
  IExtension,
  TreeNodeModel,
} from '@dtinsight/molecule/esm/model';
import { IExtensionService } from '@dtinsight/molecule/esm/services';

function NoLogin() {
  return (
    <div style={{ textAlign: 'center' }}>
      Go to Login
      <Button onClick={gotoLogin}>Login</Button>
    </div>
  );
}

interface ITreeNode {
  fileName: string;
  children: ITreeNode[];
  isLeaf: boolean;
}

function convertTreeData(
  data: ITreeNode[],
  level: number = 0,
): TreeNodeModel[] {
  return data.map((item) => {
    return new TreeNodeModel({
      id: `${item.fileName}-${level}`,
      name: item.fileName,
      isLeaf: item.isLeaf,
      fileType: item.isLeaf ? FileTypes.File : FileTypes.Folder,
      children: convertTreeData(item.children, level + 1),
    });
  });
}

export class InitExtension implements IExtension {
  id: string = 'init';
  name: string = 'init';

  activate(extensionCtx: IExtensionService): void {
    const { ACTIVITY_BAR_GLOBAL_ACCOUNT } = molecule.builtin.getConstants();
    molecule.activityBar.onClick((key) => {
      if (key === ACTIVITY_BAR_GLOBAL_ACCOUNT) {
        gotoLogin();
      }
    });

    molecule.folderTree.setEntry(<NoLogin />);

    fetch('/api/users/isLogin', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        return res.success && res.isLogin && res.repo;
      })
      .then((res) => {
        if (res) {
          return fetch('/api/mo/getTree', { method: 'GET' });
        } else {
          throw new Error();
        }
      })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          const treeData = convertTreeData(res.data);
          const rootNode = new TreeNodeModel({
            id: new Date().getTime(),
            name: 'molecule',
            isLeaf: false,
            fileType: FileTypes.RootFolder,
            children: treeData,
          });
          molecule.folderTree.add(rootNode);
        }
      })
      .catch(() => {});
  }

  dispose(extensionCtx: IExtensionService): void {}
}
