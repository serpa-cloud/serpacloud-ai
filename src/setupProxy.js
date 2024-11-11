const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function proxyRules(app) {
  app.use(
    '/_graphql',
    createProxyMiddleware({
      target: 'http://localhost:7100',
      changeOrigin: true,
      headers: {
        Connection: 'keep-alive',
      },
    }),
  );
  app.use(
    createProxyMiddleware('/media/upload', {
      target: 'https://alpha.serpa.cloud',
      changeOrigin: true,
      headers: {
        Connection: 'keep-alive',
      },
    }),
  );
};
