import webpack from 'webpack';
import { getWebpackConfiguration } from '../webpack/index.js';
import webpackDevServer from 'webpack-dev-server';
import { viteServer } from '../vite/index.js';
export default (options, kindaConfig) => {
    const webpackConfiguration = getWebpackConfiguration(kindaConfig.webpackConfiguration, 'development');
    const compiler = webpack(webpackConfiguration);
    const runServer = async (server) => {
        console.log('Starting server...');
        if (kindaConfig.structure === 'webpack') {
            server.startCallback(() => {
                const localIPv4 = webpackDevServer.internalIPSync('v4');
                const localIPv6 = webpackDevServer.internalIPSync('v6');
                //@ts-ignore
                // console.log(`Successfully started server on http://localhost:${webpackConfigure.devServer.port}`);
            });
            process.on('SIGINT', () => {
                stopServer(server);
            });
        }
        else if (kindaConfig.structure === 'vite') {
            const server = viteServer({}, 'development');
            await server.listen();
            server.printUrls();
        }
        else {
            console.log('请在配置文件中写明打包框架！');
        }
    };
    const stopServer = async (server) => {
        console.log('\nStopping server...');
        server.stopCallback(() => {
            console.log('Server stopped.');
        });
    };
    const getFinalOptions = (options) => {
        const { port } = options;
        const devServerOptions = webpackConfiguration.devServer;
        if (port) {
            return { ...devServerOptions, ...options };
        }
        return devServerOptions;
    };
    const webpackServer = new webpackDevServer(getFinalOptions(options), compiler);
    runServer(webpackServer);
};
