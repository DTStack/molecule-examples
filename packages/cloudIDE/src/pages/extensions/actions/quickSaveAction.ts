import {
  Action2,
  KeybindingWeight,
} from '@dtinsight/molecule/esm/monaco/common';
import { KeyCode, KeyMod } from '@dtinsight/molecule/esm/monaco';
import { IQuickInputService } from 'monaco-editor/esm/vs/platform/quickinput/common/quickInput';
import { KeyChord } from 'monaco-editor/esm/vs/base/common/keyCodes';

import molecule from '@dtinsight/molecule';
import { isCurrentFileEditing } from '@/utils';

export class QuickSaveAction extends Action2 {
  static readonly ID = 'Quick Save File';
  static readonly LABEL = 'Quick Save File';

  constructor() {
    super({
      id: QuickSaveAction.ID,
      label: QuickSaveAction.LABEL,
      title: QuickSaveAction.LABEL,
      alias: QuickSaveAction.LABEL,
      precondition: undefined,
      f1: true,
      keybinding: {
        weight: KeybindingWeight.WorkbenchContrib,
        when: undefined,
        primary: KeyChord(KeyMod.CtrlCmd | KeyCode.KeyS),
      },
    });
  }

  run(accessor: any, ...args: any[]) {
    if (isCurrentFileEditing()) {
      console.log('isEditingFile:');
      const { current } = molecule.editor.getState();
      const tab = molecule.editor.getTabById<any>(
        current!.activeTab!,
        current!.id,
      )!;
      const nextValue = tab.data.value;
      fetch('/api/mo/saveFile', {
        method: 'POST',
        body: JSON.stringify({ id: tab.id, value: nextValue }),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            tab.status = undefined;
            molecule.editor.updateTab(tab, current!.id);
          }
        });
    }
  }
}
