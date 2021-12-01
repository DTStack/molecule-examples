import molecule from '@dtinsight/molecule';
import { UniqueId } from '@dtinsight/molecule/esm/common/types';
import { IExtension } from '@dtinsight/molecule/esm/model';
import { IExtensionService } from '@dtinsight/molecule/esm/services';

export default class EditorExtension implements IExtension {
  id: UniqueId = 'editor';
  name: string = 'editor';
  activate(extensionCtx: IExtensionService): void {
    molecule.editor.onUpdateTab((tab) => {
      tab.status = 'edited';
      molecule.editor.updateTab(tab);
    });
  }
  dispose(extensionCtx: IExtensionService): void {
    throw new Error('Method not implemented.');
  }
}
