import molecule from '@dtinsight/molecule';
import { IExtension } from '@dtinsight/molecule/esm/model/extension';
import { IExtensionService } from '@dtinsight/molecule/esm/services';
import { EDITOR_ACTION_RUNNING, EDITOR_ACTION_GITHUB } from './base';

export class RunningExtension implements IExtension {

    id: string = '';
    name: string = '';
    
    private _timer!: any;

    constructor(
        id: string = 'EditorRunning', 
        name: string = 'EditorRunning'
    ) {
        this.id = id;
        this.name = name;
    }

    activate(extensionCtx: IExtensionService): void {
        this.initUI();
        this.onClickAction();
    }

    initUI() {
        // TODO 
        this._timer = setTimeout(() => {
            const builtInEditorInitialActions = molecule.builtin.getModule('builtInEditorInitialActions');
            molecule.editor.setDefaultActions([ 
                {...EDITOR_ACTION_RUNNING }, 
                {...EDITOR_ACTION_GITHUB }, 
                ...builtInEditorInitialActions?.value
            ]);
        });
    }

    onClickAction() {
        molecule.editor.onActionsClick(async (menuId, current) => {
            switch (menuId) {
                case EDITOR_ACTION_RUNNING.id: {
                    molecule.editor.updateActions([
                        {
                            id: EDITOR_ACTION_RUNNING.id,
                            icon: 'loading~spin',
                            disabled: true,
                        }
                    ]);

                    molecule.panel.appendOutput('Start running...\n');
                    molecule.panel.appendOutput('Running success!!!\n');
                    this._timer = setTimeout(() => {
                        molecule.editor.updateActions([
                            {
                                ...EDITOR_ACTION_RUNNING,
                                disabled: false,
                            }
                        ]);
                        molecule.panel.appendOutput('Running end.');
                    }, 600);
                    break;
                }
                case EDITOR_ACTION_GITHUB.id: {
                   window.open('https://github.com/DTStack/molecule', '_blank');
                   break;
                }
                default: {
                    //
                }
            }
        });
    }

    dispose(extensionCtx: IExtensionService): void {
        clearTimeout(this._timer);
    }
}