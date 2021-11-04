import molecule from '@dtinsight/molecule';
import { IExtension } from '@dtinsight/molecule/esm/model/extension';
import { editor as MonacoEditor } from '@dtinsight/molecule/esm/monaco';

const leftPane = 1;
const rightPane = 2;

const sourceEditor = {
    id: '1',
    name: 'Source Code',
    closable: false,
    data: {
        language: 'json',
    },
};

const formattedEditor =  {
    id: '2',
    closable: false,
    name: 'Formatted',
    data: {
        language: 'json',
    },
}

export const ExtendsMonacoSync: IExtension = {
    id: 'ExtendDataSync',
    name: 'Data Sync',
    activate: async () => {
        molecule.editor.open(sourceEditor, leftPane);
        molecule.editor.open(formattedEditor, rightPane);
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
