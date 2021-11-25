import molecule from '@dtinsight/molecule';
import API from '../../api';
import { transformToEditorTab } from '../../common';

export function handleSelectSearchResult() {
    molecule.search.onResultClick((item) => {
        molecule.editor.open(transformToEditorTab(item));
    });
}

export function handleSearchEvent() {
    molecule.search.onSearch(async (value, replaceValue, config) => {
        if (!value) return;

        const res = await API.search(value);
        if (res.message === 'success') {
            molecule.search.setResult(res.data.children);
        }
    });
}