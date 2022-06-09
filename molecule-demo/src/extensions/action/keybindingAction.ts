import { KeybindingWeight } from "@dtinsight/molecule/esm/monaco/common";
import { KeyCode, KeyMod } from "@dtinsight/molecule/esm/monaco";
import { Action2 } from '@dtinsight/molecule/esm/monaco/action';
//@ts-ignore
import { KeyChord } from 'monaco-editor/esm/vs/base/common/keyCodes';

export class KeybindingAction extends Action2 {

    static readonly ID = 'AutoSave';

    constructor() {
        super({
            id: KeybindingAction.ID,
            precondition: undefined,
            f1: false, // Not show in the Command Palette
            keybinding: {
                weight: KeybindingWeight.WorkbenchContrib,
                when: undefined,
                primary: KeyChord(KeyMod.CtrlCmd | KeyCode.KeyS)
            },
        })
    }

    run(accessor: any, ...args: any[]) {
        alert('Save success!');
        // do something
    }
}