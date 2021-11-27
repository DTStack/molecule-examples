import { MoleculeProvider, Workbench } from '@dtinsight/molecule';
import '@dtinsight/molecule/esm/style/mo.css';
import extensions from './extensions';

(window as any).__DEVELOPMENT__ = false;

export default () => {
  return (
    <MoleculeProvider extensions={extensions}>
      <Workbench />
    </MoleculeProvider>
  );
};
