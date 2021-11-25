import { IExtension } from '@dtinsight/molecule/esm/model';
import { DataSourceExtension } from './dataSource';
import { FirstExtension } from './theFirstExtension';
import { TerminalExtension } from './terminal';
import { ProblemsExtension } from './problems';
import { RunningExtension } from './running';
import { OneDarkPro } from './oneDarkPro/index';
import { ExtendLocales } from './i18n';
import { SettingsExtension } from './settings';
import { MenuBarExtension } from './menubar/index';

const extensions: IExtension[] = [
    new FirstExtension(),
    new DataSourceExtension(),
    new TerminalExtension(),
    new ProblemsExtension(),
    new RunningExtension(),
    new SettingsExtension(),
    new MenuBarExtension(),
    OneDarkPro,
    ExtendLocales,

];

export default extensions;