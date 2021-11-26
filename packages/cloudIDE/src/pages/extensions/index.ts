import { IExtension } from '@dtinsight/molecule/esm/model';
import { InitExtension } from './init';
import { TerminalExtension } from './terminal';

const extensions: IExtension[] = [new InitExtension(), new TerminalExtension()];

export default extensions;
