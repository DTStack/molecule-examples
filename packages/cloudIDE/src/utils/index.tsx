import Icon, { getIconByName } from '@/pages/components/icon';
import molecule from '@dtinsight/molecule';
import { TreeNodeModel, FileTypes } from '@dtinsight/molecule/esm/model';

export function getCookie(cname: string) {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export function getFileExt(fileName: string = '') {
  const names = fileName.split('.');
  return names.pop();
}

export function getLanguageByExt(extName?: string) {
  switch (extName) {
    case 'js':
      return 'javascript';
    case 'jsx':
      return 'javascriptreact';
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'md':
      return 'markdown';
    case 'json':
      return 'json';
    default:
      if (extName?.endsWith('ignore')) {
        return 'ignore';
      }
      return null;
  }
}

/**
 * 判断 editor 中是否有打开的文件
 * @returns
 */
export function isOpenFile() {
  const { current } = molecule.editor.getState();
  if (current) {
    return typeof current.activeTab === 'undefined' ? false : current.activeTab;
  }
  return false;
}

/**
 * 当前文件是否编辑过
 */
export function isCurrentFileEditing() {
  if (isOpenFile()) {
    const { current } = molecule.editor.getState();
    const tab = molecule.editor.getTabById(current!.activeTab!, current!.id);
    return tab?.status === 'edited';
  }
  return false;
}

export interface IDirProps {
  uid: string;
  isLeaf: boolean;
  name: string;
  children: IDirProps[];
}

export function convertToTreeModel(
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
