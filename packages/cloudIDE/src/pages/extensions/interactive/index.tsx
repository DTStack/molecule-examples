import { getLanguageByExt, getFileExt, convertToTreeModel } from '@/utils';
import molecule from '@dtinsight/molecule';
import {
  IEditorTab,
  IExtension,
  IFolderTreeNodeProps,
  TreeNodeModel,
} from '@dtinsight/molecule/esm/model';
import { IExtensionService } from '@dtinsight/molecule/esm/services';
import { TreeViewUtil } from '@dtinsight/molecule/esm/common/treeUtil';

function getFileContent(file: IFolderTreeNodeProps) {
  return fetch('/api/mo/getFileContent', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ fileId: file.id }),
  }).then((res) => res.body);
}

function getStreamContent(body: ReadableStream<Uint8Array>): Promise<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder('utf-8');
  let content = '';
  const processData: any = (result: any) => {
    if (result.done) {
      return content;
    }
    const value = result.value;
    content += decoder.decode(value, { stream: true });
    // 读取下一个文件片段，重复处理步骤
    return reader.read().then(processData);
  };
  return reader.read().then(processData);
}

function createNode() {
  molecule.folderTree.onCreate((type, id) => {
    if (type !== 'RootFolder') {
      molecule.folderTree.add(
        new TreeNodeModel({
          id: 'input',
          name: '',
          fileType: type,
          icon: 'file-code',
          isLeaf: type === 'File',
          isEditable: true,
        }),
        id,
      );
    }
  });

  molecule.folderTree.onUpdateFileName((file) => {
    if (file.id === 'input') {
      const { folderTree } = molecule.folderTree.getState();
      const treeHelp = new TreeViewUtil(folderTree!.data![0]!);
      const hashMap = treeHelp.getHashMap('input')!;
      fetch('/api/mo/createFileOrFolder', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          name: file.name,
          type: file.fileType,
          parentId: hashMap.parent?.endsWith('-root')
            ? undefined
            : hashMap.parent,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            molecule.folderTree.remove('input');
            const data = convertToTreeModel([res.data]);
            molecule.folderTree.add(data[0], hashMap.parent);
          }
        });
    }
  });
}

export default class InteractiveExtension implements IExtension {
  id: string = 'interactive';
  name: string = 'interactive';
  activate(extensionCtx: IExtensionService): void {
    molecule.folderTree.onSelectFile(async (file) => {
      const body = await getFileContent(file);
      const IMAGES_EXTS = ['jpg', 'gif', 'jpeg', 'png'];
      const isImages = IMAGES_EXTS.some((ext) => file.name?.endsWith(ext));
      if (body) {
        if (isImages) {
          const response = new Response(body);
          const blob = await response.blob();
          const url = await URL.createObjectURL(blob);
          const tab: IEditorTab<any> = {
            ...file,
            data: {
              language: getLanguageByExt(getFileExt(file.name)),
              path: file.location,
              value: url,
              ...(file.data || {}),
            },
            renderPane: () => <img src={url} />,
          };
          molecule.editor.open(tab);
        } else {
        const content = await getStreamContent(body);
        molecule.editor.open({
          ...file,
          data: {
            language: getLanguageByExt(getFileExt(file.name)),
            path: file.location,
            value: content,
            ...(file.data || {}),
          },
        });
        }
      }
    });

    createNode();
  }
  dispose(extensionCtx: IExtensionService): void {
    throw new Error('Method not implemented.');
  }
}
