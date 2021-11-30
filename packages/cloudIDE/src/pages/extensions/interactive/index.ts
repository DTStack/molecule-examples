import { getLanguageByExt, getFileExt } from '@/utils';
import molecule from '@dtinsight/molecule';
import {
  IExtension,
  IFolderTreeNodeProps,
} from '@dtinsight/molecule/esm/model';
import { IExtensionService } from '@dtinsight/molecule/esm/services';

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

export default class InteractiveExtension implements IExtension {
  id: string = 'interactive';
  name: string = 'interactive';
  activate(extensionCtx: IExtensionService): void {
    molecule.folderTree.onSelectFile(async (file) => {
      const body = await getFileContent(file);
      if (body) {
        const content = await getStreamContent(body);
        molecule.editor.open({
          ...file,
          data: {
            language: getLanguageByExt(getFileExt(file.name)),
            value: content,
          },
        });
      }
    });
  }
  dispose(extensionCtx: IExtensionService): void {
    throw new Error('Method not implemented.');
  }
}
