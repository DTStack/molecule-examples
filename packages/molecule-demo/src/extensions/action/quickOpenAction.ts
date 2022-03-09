import { KeybindingWeight } from "@dtinsight/molecule/esm/monaco/common";
import { KeyCode, KeyMod } from "@dtinsight/molecule/esm/monaco";
import { Action2 } from '@dtinsight/molecule/esm/monaco/action';
import {
    IQuickInputService,
    //@ts-ignore
} from 'monaco-editor/esm/vs/platform/quickinput/common/quickInput';
//@ts-ignore
import { KeyChord } from 'monaco-editor/esm/vs/base/common/keyCodes';

import molecule from '@dtinsight/molecule';
import { debounce } from "lodash";

import API from '../../api';
import { transformToEditorTab } from '../../common';

export class QuickOpenAction extends Action2 {

    static readonly ID = 'QuickOpenFile';
    static readonly LABEL = 'Search files by name';

    constructor() {
        super({
            id: QuickOpenAction.ID,
            label: QuickOpenAction.LABEL,
            title: QuickOpenAction.LABEL,
            alias: QuickOpenAction.LABEL,
            precondition: undefined,
            f1: true, // Whether show the QuickOpenFile in Command Palette
            keybinding: {
                weight: KeybindingWeight.WorkbenchContrib,
                when: undefined,
                primary: KeyChord(KeyMod.CtrlCmd | KeyCode.KeyP)
            },
        })
    }

    run(accessor: any, ...args: any[]) {
        const quickInputService = accessor.get(IQuickInputService);

        const quickPick = quickInputService.createQuickPick();
        quickPick.items = [];
        quickPick.placeholder = QuickOpenAction.LABEL;

        quickPick.activeItems = [];
        quickPick.canSelectMany = false;

        const queryPick = debounce((value) => {
            API.query(value).then(res => {
                quickPick.items = res.map(item => {
                    item.label = item.name;
                    return item;
                });
            });
        }, 300);

        quickPick.onDidChangeValue(queryPick);

        quickPick.onDidAccept((i: any) => {
            const item = quickPick.activeItems[0];
            if (item) {
                molecule.editor.open(transformToEditorTab(item));
            }
            quickPick.hide();
        });
        quickPick.show();
    }
}