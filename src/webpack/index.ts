import { Environement } from './../types/index.js';
import { getDefaultDevServer } from './configure/devServer/index.js';
import { getDefaultWebpackPlugins } from '../webpack/configure/plugins/index.js';
import type { Configuration } from 'webpack';
import path from 'path';
import { getDefaultModuleConfig } from './configure/module/index.js';

const configurations = {
    'development': () => {
        const defaultConfigure: Configuration = {
            mode: 'development',
            devtool: 'inline-source-map',
            output: {
                filename: '[name].[fullhash].js',
                path: path.resolve('dist'),
            },
            resolve: {
                extensions: ['.tsx', 'jsx', '.ts', '.js'],
            },
            module: getDefaultModuleConfig('development'),
            devServer: getDefaultDevServer(),
            plugins: getDefaultWebpackPlugins('development'),
            optimization: {
                usedExports: true,
            }
        };
        return defaultConfigure;
    },
    'production': () => {
        const defaultConfigure: Configuration = {
            mode: 'production',
            devtool: 'inline-source-map',
            output: {
                filename: '[name].[fullhash].js',
                path: path.resolve('dist'),
                publicPath: '/'
            },
            resolve: {
                extensions: ['.tsx', '.ts', '.js'],
            },
            module: getDefaultModuleConfig('production'),
            plugins: getDefaultWebpackPlugins('production')
        };
        return defaultConfigure;
    }
}

const getDefaultConfigure = (environment: Environement) => {
    return configurations[environment]();
}

export const getWebpackConfiguration = (webpackConfig: Configuration, environment: Environement) => {
    // 配置文件优先级 webpackConfig > defaultConfigure
    return Object.assign(getDefaultConfigure(environment), webpackConfig)
}