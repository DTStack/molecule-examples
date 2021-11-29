
import { IExtension } from '@dtinsight/molecule/esm/model/extension';
import { IExtensionService } from '@dtinsight/molecule/esm/services';
import * as folderTreeController from './folderTreeController';
import * as searchPaneController from './searchPaneController';
import { QuickOpenAction } from './quickOpenAction';
import molecule from '@dtinsight/molecule';

export class FirstExtension implements IExtension {

    id: string = '';
    name: string = '';

    constructor(
        id: string = 'TheFirstExtension', 
        name: string = 'The First Extension'
    ) {
        this.id = id;
        this.name = name;
    }

    activate(extensionCtx: IExtensionService): void {
        folderTreeController.initFolderTree();
        folderTreeController.handleSelectFolderTree();
        folderTreeController.handleStatusBarLanguage();
        searchPaneController.handleSearchEvent();
        searchPaneController.handleSelectSearchResult();
        // Register the Action
        molecule.extension.registerAction(QuickOpenAction);
    }

    dispose(extensionCtx: IExtensionService): void {
        throw new Error('Method not implemented.');
    }
}