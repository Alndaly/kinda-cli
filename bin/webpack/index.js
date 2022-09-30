import { getDevServer } from './configure/devServer/index.js';
import { getWebpackPlugins } from '../webpack/configure/plugins/index.js';
import path from 'path';
import { fileURLToPath } from "node:url";
import { getModuleConfig } from './configure/module/index.js';
const __filename = fileURLToPath(import.meta.url);
const getDefaultConfigure = (environment) => {
    const defaultConfigure = {
        mode: environment == 'production' ? 'production' : 'development',
        devtool: 'inline-source-map',
        output: {
            filename: '[name].bundle.js',
            path: path.resolve('dist'),
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        module: getModuleConfig(),
        devServer: getDevServer(),
        plugins: getWebpackPlugins()
    };
    return defaultConfigure;
};
export const getWebpackConfigure = (webpackConfig, environment) => {
    // 配置文件优先级 webpackConfig > defaultConfigure
    return Object.assign(getDefaultConfigure(environment), webpackConfig);
};
