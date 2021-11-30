import molecule from '@dtinsight/molecule';
import { Float, IExtension } from '@dtinsight/molecule/esm/model';
import { connect } from '@dtinsight/molecule/esm/react';
import { IExtensionService } from '@dtinsight/molecule/esm/services';

const Language = connect(molecule.editor, function ({ current }) {
  console.log('current:', current);

  return <div>123</div>;
});

export default class LanguageExtension implements IExtension {
  id: string = 'language';
  name: string = 'language';
  activate(extensionCtx: IExtensionService): void {
    molecule.statusBar.add(
      { id: 'language', render: () => <Language /> },
      Float.right,
    );
  }
  dispose(extensionCtx: IExtensionService): void {
    throw new Error('Method not implemented.');
  }
}
