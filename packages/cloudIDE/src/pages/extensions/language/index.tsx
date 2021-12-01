import { useMemo } from 'react';
import molecule from '@dtinsight/molecule';
import { Float, IExtension } from '@dtinsight/molecule/esm/model';
import { connect } from '@dtinsight/molecule/esm/react';
import { IExtensionService } from '@dtinsight/molecule/esm/services';
import { getLanguageByExt } from '@/utils';

const Language = connect(molecule.editor, function ({ current }) {
  const language = useMemo(() => {
    if (current?.activeTab) {
      const language = getLanguageByExt(current.tab.name.split('.').pop());
      return language;
    }
    return null;
  }, [current?.activeTab]);
  return language ? <div>{language.toLocaleUpperCase()}</div> : null;
});

export default class LanguageExtension implements IExtension {
  id: string = 'language';
  name: string = 'language';
  activate(extensionCtx: IExtensionService): void {
    molecule.statusBar.add(
      { id: 'language', sortIndex: 3, render: () => <Language /> },
      Float.right,
    );
  }
  dispose(extensionCtx: IExtensionService): void {
    throw new Error('Method not implemented.');
  }
}
