import path from 'path';
export const getDefaultDevServer = () => {
    const devServer = {
        historyApiFallback: true,
        port: 3000,
        open: false,
        hot: true,
        host: 'local-ip',
        watchFiles: ['src/**/*', 'public/**/*'],
        allowedHosts: 'auto',
        static: {
            publicPath: '/',
            directory: path.join(process.cwd(), 'public'),
            watch: true, //默认启用，文件更改将触发整个页面重新加载。
        },
        server: 'http',
        proxy: {},
        client: {
            logging: 'info',
            overlay: true,
            progress: true,
            reconnect: 5, // 告诉 dev-server 它应该尝试重新连接客户端的次数。当为 true 时，它将无限次尝试重新连接。
        }
    };
    return devServer;
};
