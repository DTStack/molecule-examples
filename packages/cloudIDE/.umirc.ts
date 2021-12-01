import { defineConfig } from 'umi';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    {
      path: '/workspace',
      component: '@/pages/workspace',
    },
  ],
  fastRefresh: {},
  antd: {
    dark: true,
  },
  chainWebpack(memo, { env, webpack, createCSSRule }) {
    memo.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        languages: [
          'json',
          'scss',
          'less',
          'css',
          'javascript',
          'typescript',
          'markdown',
        ],
      },
    ]);
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
