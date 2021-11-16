import { IContributeType, IExtension } from "@dtinsight/molecule/esm/model";

const zhCN = require('./zh-CN.json');
const locales = [zhCN];

export const ExtendLocales: IExtension = {
    id: 'ExtendLocales',
    name: 'Extend locales',
    contributes: {
        [IContributeType.Languages]: locales,
    },
    activate() {},
    dispose() {},
};