import { IExtension } from '@dtinsight/molecule/esm/model';
import InteractiveExtension from './interactive';
import LanguageExtension from './language';
import LayoutExtension from './layout';
import TerminalExtension from './terminal';

const extensions: IExtension[] = [
  new LayoutExtension(),
  new TerminalExtension(),
  new InteractiveExtension(),
  new LanguageExtension()
];

export default extensions;
