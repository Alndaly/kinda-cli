import { kindaConfig } from '../cli.js';
import webpack from 'webpack';
import { getWebpackConfigure } from '../webpack/index.js';
import webpackDevServer from 'webpack-dev-server';
const webpackConfigure = getWebpackConfigure(kindaConfig.webpackConfiguration);
const compiler = webpack(webpackConfigure);
const devServerOptions = { ...(webpackConfigure.devServer) };
const runServer = async (server) => {
    console.log('Starting server...');
    server.startCallback(() => {
        const localIPv4 = webpackDevServer.internalIPSync('v4');
        const localIPv6 = webpackDevServer.internalIPSync('v6');
        //@ts-ignore
        // console.log(`Successfully started server on http://localhost:${webpackConfigure.devServer.port}`);
    });
    process.on('SIGINT', () => {
        stopServer(server);
    });
};
const stopServer = async (server) => {
    console.log('\nStopping server...');
    server.stopCallback(() => {
        console.log('Server stopped.');
    });
};
const getFinalOptions = (options) => {
    const { port } = options;
    if (port) {
        return { ...devServerOptions, ...options };
    }
    return devServerOptions;
};
export default async function (options) {
    const server = new webpackDevServer(getFinalOptions(options), compiler);
    runServer(server);
}
