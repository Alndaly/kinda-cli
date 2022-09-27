import { Environement } from './../types/index.js';
import { getDevServer } from './configure/devServer/index.js';
import { getWebpackPlugins } from '../webpack/configure/plugins/index.js';
import type { Configuration } from 'webpack';
import path from 'path';
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { getModuleConfig } from './configure/module/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getDefaultConfigure = (environment: Environement) => {
    const defaultConfigure: Configuration = {
        mode: environment == 'production' ? 'production' : 'development',
        devtool: 'inline-source-map',
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        module: getModuleConfig(),
        devServer: getDevServer(),
        plugins: getWebpackPlugins()
    };
    return defaultConfigure;

}

export const getWebpackConfigure = (webpackConfig: Configuration, environment: Environement) => {
    // 配置文件优先级 webpackConfig > defaultConfigure
    return Object.assign(getDefaultConfigure(environment), webpackConfig)
}