import WebpackBar from 'webpackbar';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
export const getWebpackPlugins = () => {
    const plugins = [];
    let progressPlugin = new WebpackBar({
        color: "#85d",
        basic: false,
        profile: false, // 默认false，启用探查器。
    });
    plugins.push(progressPlugin);
    let htmlPlugin = new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../templates/index.template.html'),
    });
    plugins.push(htmlPlugin);
    let hotModeulePlugin = new webpack.HotModuleReplacementPlugin();
    plugins.push(hotModeulePlugin);
    let CleanPlugin = new CleanWebpackPlugin();
    plugins.push(CleanPlugin);
    return plugins;
};
