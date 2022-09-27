import { getWebpackPlugins } from '../webpack/configure/plugins/index.js';
import type { Configuration } from 'webpack';
import path from 'path';
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const defaultConfigure: Configuration = {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        port: 3000,
    }
}

export const getWebpackConfigure = () => {
    let configure: Configuration = {}
    configure = {
        plugins: getWebpackPlugins()
    }
    return Object.assign(defaultConfigure, configure)
}