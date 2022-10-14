import { getDefaultDevServer } from './configure/devServer/index.js';
import { getDefaultWebpackPlugins } from '../webpack/configure/plugins/index.js';
import path from 'path';
import { getDefaultModuleConfig } from './configure/module/index.js';
const configurations = {
    'development': () => {
        const defaultConfigure = {
            mode: 'development',
            devtool: 'inline-source-map',
            output: {
                filename: '[name].[fullhash].js',
                path: path.resolve('dist'),
                pathinfo: true,
                sourceMapFilename: "sourcemaps/[file].map",
                crossOriginLoading: "use-credentials", // 枚举
            },
            resolve: {
                extensions: ['.tsx', 'jsx', '.ts', '.js'],
                alias: {},
            },
            module: getDefaultModuleConfig('development'),
            devServer: getDefaultDevServer(),
            plugins: getDefaultWebpackPlugins('development'),
            optimization: {
                usedExports: true,
            },
            performance: {
                hints: "warning", // 枚举
            },
            stats: 'errors-only',
        };
        return defaultConfigure;
    },
    'production': () => {
        const defaultConfigure = {
            mode: 'production',
            devtool: 'inline-source-map',
            output: {
                filename: '[name].[fullhash].js',
                path: path.resolve('dist'),
                publicPath: '/',
                pathinfo: true,
                sourceMapFilename: "sourcemaps/[file].map",
                crossOriginLoading: "use-credentials", // 枚举
            },
            resolve: {
                extensions: ['.tsx', '.ts', '.js'],
                alias: {}
            },
            performance: {
                hints: "warning", // 枚举
            },
            stats: 'errors-only',
            module: getDefaultModuleConfig('production'),
            plugins: getDefaultWebpackPlugins('production')
        };
        return defaultConfigure;
    }
};
const getDefaultConfigure = (environment) => {
    return configurations[environment]();
};
export const getWebpackConfiguration = (webpackConfig, environment) => {
    // 配置文件优先级 webpackConfig > defaultConfigure
    return Object.assign(getDefaultConfigure(environment), webpackConfig);
};
