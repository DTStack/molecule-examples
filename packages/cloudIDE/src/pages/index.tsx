import { MoleculeProvider, Workbench } from '@dtinsight/molecule';
import '@dtinsight/molecule/esm/style/mo.css';
import extensions from './extensions';
import styles from './index.less';

(window as any).__DEVELOPMENT__ = false;

export default function IndexPage() {
  return (
    <MoleculeProvider extensions={extensions}>
      <Workbench />
    </MoleculeProvider>
  );
}
