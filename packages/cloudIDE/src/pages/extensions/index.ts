import { IExtension } from '@dtinsight/molecule/esm/model';
import { ActionExtension } from './actions';
import EditorExtension from './editor';
import InteractiveExtension from './interactive';
import LanguageExtension from './language';
import LayoutExtension from './layout';
import TerminalExtension from './terminal';

const extensions: IExtension[] = [
  new LayoutExtension(),
  new TerminalExtension(),
  new InteractiveExtension(),
  new LanguageExtension(),
  new EditorExtension(),
  new ActionExtension(),
];

export default extensions;
