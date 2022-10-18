import { getDefaultDevServer } from './configure/devServer/index.js';
import { getDefaultWebpackPlugins } from '../webpack/configure/plugins/index.js';
import path from 'path';
import { getDefaultModuleConfig } from './configure/module/index.js';
import TerserPlugin from 'terser-webpack-plugin';
const configurations = {
    'development': () => {
        const defaultConfigure = {
            mode: 'development',
            devtool: false,
            output: {
                filename: '[name].[fullhash].js',
                path: path.resolve('dist'),
                pathinfo: true,
                sourceMapFilename: "sourcemaps/[file].map",
                crossOriginLoading: "use-credentials", // 枚举
            },
            resolve: {
                extensions: ['.tsx', 'jsx', '.ts', '.js'],
                alias: {
                    '@': '/src'
                },
            },
            optimization: {
                usedExports: true,
                chunkIds: 'named',
                minimizer: [
                    new TerserPlugin({
                        parallel: true,
                        terserOptions: {
                        // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                        },
                    }),
                ],
                splitChunks: {
                    automaticNameDelimiter: '~',
                    chunks: 'all',
                    minSize: 30000,
                    maxSize: 100000,
                    cacheGroups: {
                        defaultVendors: {
                            test: /[\\/]node_modules[\\/]/,
                            priority: -10,
                            reuseExistingChunk: true,
                        },
                        default: {
                            minChunks: 2,
                            priority: -20,
                            reuseExistingChunk: true,
                        },
                    }
                }
            },
            module: getDefaultModuleConfig('development'),
            devServer: getDefaultDevServer(),
            plugins: getDefaultWebpackPlugins('development'),
            performance: {
                hints: "warning",
                //入口起点的最大体积
                maxEntrypointSize: 400000,
                //生成文件的最大体积
                maxAssetSize: 100000,
            },
            stats: {
                assets: true,
                colors: true,
                errors: true,
                errorDetails: true,
                hash: true,
                publicPath: true,
                modules: true,
                builtAt: true,
                performance: true,
                reasons: true,
                version: true,
                timings: true,
                warnings: true,
            },
        };
        return defaultConfigure;
    },
    'production': () => {
        const defaultConfigure = {
            mode: 'production',
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
                alias: {
                    '@': '/src'
                }
            },
            optimization: {
                usedExports: true,
                chunkIds: 'named',
                minimizer: [
                    new TerserPlugin({
                        parallel: true,
                        terserOptions: {
                        // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                        },
                    }),
                ],
                splitChunks: {
                    automaticNameDelimiter: '~',
                    chunks: 'all',
                    minSize: 30000,
                    maxSize: 100000,
                    cacheGroups: {
                        defaultVendors: {
                            test: /[\\/]node_modules[\\/]/,
                            priority: -10,
                            reuseExistingChunk: true,
                        },
                        default: {
                            minChunks: 2,
                            priority: -20,
                            reuseExistingChunk: true,
                        },
                    }
                }
            },
            performance: {
                assetFilter: function (assetFilename) {
                    return !/\.map$/.test(assetFilename);
                },
                hints: "warning",
                //入口起点的最大体积
                maxEntrypointSize: 400000,
                //生成文件的最大体积
                maxAssetSize: 100000,
            },
            stats: {
                assets: true,
                colors: true,
                errors: true,
                errorDetails: true,
                hash: true,
                publicPath: true,
                modules: true,
                builtAt: true,
                performance: true,
                reasons: true,
                version: true,
                timings: true,
                warnings: true,
            },
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
