import { localize } from "@dtinsight/molecule/esm/i18n/localize";
import { IPanelItem } from "@dtinsight/molecule/esm/model";
import { Terminal } from '../../views/terminal/terminalPanelView';

export const TERMINAL_ID = 'terminalID';

export const terminalPanel: IPanelItem = {
    id: TERMINAL_ID,
    name: localize('demo.terminal', 'Terminal'),
    title: 'Terminal',
    sortIndex: 1,
    renderPane: () => {
        return (<Terminal />)
    }
}