const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

/* config-overrides.js */
module.exports = function override(config, env) {
    //do stuff with the webpack config...
    config.plugins = [
        ...config.plugins,
        new MonacoWebpackPlugin([ 'javascript','typescript','css','html','json' ])
    ]

    if (env === 'production') {
        // remove console in production
        const TerserPlugin = config.optimization.minimizer.find((i) => i.constructor.name === 'TerserPlugin');
        if (TerserPlugin) {
            TerserPlugin.options.terserOptions.compress['drop_console'] = false;
            console.log('TerserPlugin>>', TerserPlugin);
        }
    }

    return config;
}