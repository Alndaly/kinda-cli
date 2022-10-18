import { Environement } from './../../../types/index.js';
import WebpackBar from 'webpackbar';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
export declare const getDefaultWebpackPlugins: (environement: Environement) => (WebpackBar | HtmlWebpackPlugin | MiniCssExtractPlugin | webpack.HotModuleReplacementPlugin | CleanWebpackPlugin | webpack.SourceMapDevToolPlugin)[];
