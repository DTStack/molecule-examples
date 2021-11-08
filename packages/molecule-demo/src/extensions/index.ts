import { IExtension } from '@dtinsight/molecule/esm/model';
import { FirstExtension } from './the-first-extension'

const extensions: IExtension[] = [ 
    new FirstExtension(),
];

export default extensions;