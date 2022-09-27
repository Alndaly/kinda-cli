import { getWebpackPlugins } from '../webpack/configure/plugins/index.js';
import path from 'path';
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const defaultConfigure = {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        port: 3000,
    }
};
export const getWebpackConfigure = () => {
    let configure = {};
    configure = {
        plugins: getWebpackPlugins()
    };
    return Object.assign(defaultConfigure, configure);
};
