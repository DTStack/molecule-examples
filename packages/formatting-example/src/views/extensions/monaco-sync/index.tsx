import molecule from '@dtinsight/molecule';
import { IExtension } from '@dtinsight/molecule/esm/model/extension';
import { editor as MonacoEditor } from '@dtinsight/molecule/esm/monaco';

export const ExtendsMonacoSync: IExtension = {
    id: 'ExtendDataSync',
    name: 'Data Sync',
    activate: async () => {
        molecule.editor.open(
            {
                id: '1',
                name: 'resource',
                data: {
                    language: 'json',
                },
            },
            1
        );
        molecule.editor.open(
            {
                id: '2',
                name: 'formatting',
                data: {
                    language: 'json',
                },
            },
            2
        );
        molecule.layout.toggleMenuBarVisibility();
        /**
         * TODO: it can cooperate with Pane to make some error prompts
         */
        // molecule.layout.togglePanelVisibility();
        molecule.layout.toggleSidebarVisibility();
        molecule.layout.toggleActivityBarVisibility();

        const editor = await new Promise<MonacoEditor.IStandaloneCodeEditor>(
            (resolve) => {
                setTimeout(() => {
                    resolve(molecule.editor.getGroupById(1).editorInstance);
                });
            }
        );
        const formattingEditor =
            await new Promise<MonacoEditor.IStandaloneCodeEditor>((resolve) => {
                setTimeout(() => {
                    resolve(molecule.editor.getGroupById(2).editorInstance);
                });
            });

        editor.onDidChangeModelContent(() => {
            const value = editor.getValue();
            let formatting = '';

            try {
                formatting = JSON.stringify(JSON.parse(value), null, 2);
            } catch (e) {
                formatting = value;
            }
            formattingEditor.setValue(formatting);
        }) as any;
    },
    dispose() {},
};
