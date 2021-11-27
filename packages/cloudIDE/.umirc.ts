import { defineConfig } from 'umi';

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
  proxy: {
    '/api': {
      target: 'http://localhost:3000/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
