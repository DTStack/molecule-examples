import { IPanelItem } from "@dtinsight/molecule/esm/model";
import { Terminal } from '../../views/terminal/terminalPanelView';

export const TERMINAL_ID = 'terminalID';

export const terminalPanel: IPanelItem = {
    id: TERMINAL_ID,
    name: 'Terminal',
    title: 'Terminal',
    sortIndex: 1,
    renderPane: () => {
        return (<Terminal />)
    }
}