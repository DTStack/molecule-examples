import molecule from '@dtinsight/molecule';
import { IExtension } from '@dtinsight/molecule/esm/model/extension';
import { IExtensionService } from '@dtinsight/molecule/esm/services';

const GoToGithubExtensionID = 'GoToGithubExtension';

export const GoToGithubExtension: IExtension = {

    id: GoToGithubExtensionID,
    name: 'Go To Github',

    activate(extensionCtx: IExtensionService): void {
        molecule.activityBar.add({
            id: GoToGithubExtensionID,
            icon: 'github',
        });

        molecule.activityBar.onClick((id) => {
            if (id === GoToGithubExtensionID) {
                window.open('https://github.com/DTStack/molecule-examples')
            }
        })
    },

    dispose(extensionCtx: IExtensionService): void {
        molecule.activityBar.remove(GoToGithubExtensionID);
    }
}