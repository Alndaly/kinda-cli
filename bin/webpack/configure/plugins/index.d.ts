import WebpackBar from 'webpackbar';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
export declare const getDefaultWebpackPlugins: () => (WebpackBar | HtmlWebpackPlugin | webpack.HotModuleReplacementPlugin | CleanWebpackPlugin)[];
