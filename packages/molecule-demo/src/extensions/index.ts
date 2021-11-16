import { IExtension } from '@dtinsight/molecule/esm/model';
import { DataSourceExtension } from './data-source';
import { FirstExtension } from './the-first-extension';
import { TerminalExtension } from './terminal';
import { ProblemsExtension } from './problems';

const extensions: IExtension[] = [
    new FirstExtension(),
    new DataSourceExtension(),
    new TerminalExtension(),
    new ProblemsExtension(),
];

export default extensions;