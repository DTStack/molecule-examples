import { IExtension } from '@dtinsight/molecule/esm/model';
import { DataSourceExtension } from './data-source';
import { FirstExtension } from './the-first-extension';
import { TerminalExtension } from './terminal';
import { ProblemsExtension } from './problems';
import { RunningExtension } from './running';
import { OneDarkPro } from './onedark-pro/index';
import { ExtendLocales } from './i18n';
import { SettingsExtension } from './settings';

const extensions: IExtension[] = [
    new FirstExtension(),
    new DataSourceExtension(),
    new TerminalExtension(),
    new ProblemsExtension(),
    new RunningExtension(),
    new SettingsExtension(),
    OneDarkPro,
    ExtendLocales,

];

export default extensions;