import { IEditorActionsProps } from "@dtinsight/molecule/esm/model";

export const EDITOR_ACTION_RUNNING_ID = 'runningTab';
export const EDITOR_ACTION_RUNNING_GITHUB = 'githubAction';

export const EDITOR_ACTION_RUNNING: IEditorActionsProps = {
    id: EDITOR_ACTION_RUNNING_ID,
    name: 'Run',
    icon: 'play',
    place: 'outer',
    disabled: false,
    title: 'Running',
}


export const EDITOR_ACTION_GITHUB: IEditorActionsProps = {
    id: EDITOR_ACTION_RUNNING_GITHUB,
    name: 'View in Github',
    icon: 'github',
    place: 'inner',
    title: 'View in Github',
}