import { IExtension } from "@dtinsight/molecule/esm/model";

const OneDarkPro: IExtension = require('./package.json');
const themes = [
    require('./themes/OneDark-Pro.json'),
    require('./themes/OneDark-Pro-flat.json'),
    require('./themes/OneDark-Pro-darker.json'),
];

const packageThemes = OneDarkPro.contributes?.themes || [];

OneDarkPro.contributes!.themes = packageThemes.map((theme, index) => {
    theme.id = theme.label;
    theme = Object.assign({}, theme, themes[index]);
    return theme;
});

OneDarkPro.id = 'OneDarkPro';

export { OneDarkPro };
