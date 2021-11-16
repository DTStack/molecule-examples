import { IExtension } from '@dtinsight/molecule/esm/model';
import { DataSourceExtension } from './data-source';
import { FirstExtension } from './the-first-extension'

const extensions: IExtension[] = [
    new FirstExtension(),
    new DataSourceExtension(),
];

export default extensions;