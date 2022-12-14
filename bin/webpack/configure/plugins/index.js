import WebpackBar from 'webpackbar';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
export const getDefaultWebpackPlugins = (environement) => {
    const plugins = [];
    let progressPlugin = new WebpackBar({
        color: "#85d",
        basic: true,
        profile: false, // 默认false，启用探查器。
    });
    environement && plugins.push(progressPlugin);
    let htmlPlugin = new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../templates/index.template.html'),
        meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' }
    });
    environement && plugins.push(htmlPlugin);
    let hotModeulePlugin = new webpack.HotModuleReplacementPlugin();
    environement && plugins.push(hotModeulePlugin);
    let CleanPlugin = new CleanWebpackPlugin();
    environement === 'production' && plugins.push(CleanPlugin);
    let MiniCssPlugin = new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
    });
    environement === 'production' && plugins.push(MiniCssPlugin);
    return plugins;
};
