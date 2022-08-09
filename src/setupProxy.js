const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8081',
            changeOrigin: true,
            pathRewrite: {
                "^/api": "",
            },
        })
    );
    app.use(
        '/cloudinary',
        createProxyMiddleware({
            target: 'https://api.cloudinary.com/v1_1/cloverteamfinal',
            changeOrigin: true,
            pathRewrite: {
                "^/cloudinary": "",
            },
        })
    );
};