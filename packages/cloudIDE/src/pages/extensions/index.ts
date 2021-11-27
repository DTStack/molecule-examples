import { IExtension } from '@dtinsight/molecule/esm/model';
import LayoutExtension from './layout';
import TerminalExtension from './terminal';

const extensions: IExtension[] = [
  new LayoutExtension(),
  new TerminalExtension(),
];

export default extensions;
