import { IExtension } from '@dtinsight/molecule/esm/model/extension';
import { IExtensionService } from '@dtinsight/molecule/esm/services';
import { QuickSaveAction } from './quickSaveAction';

export class ActionExtension implements IExtension {
  id: string = 'actionExtension';
  name: string = 'Action Extension';

  activate(extensionCtx: IExtensionService): void {
    // Register the Action
    extensionCtx.registerAction(QuickSaveAction);
  }

  dispose(extensionCtx: IExtensionService): void {
    throw new Error('Method not implemented.');
  }
}
