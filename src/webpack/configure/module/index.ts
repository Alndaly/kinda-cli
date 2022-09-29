import type { ModuleOptions } from 'webpack';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = fileURLToPath(new URL('.', import.meta.url));

export const getModuleConfig = () => {
    const module: ModuleOptions = {
        rules: [
            {
                test: /\.json$/,
                use: path.resolve(__dirname, '../../../../node_modules/json-loader/index.js')
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // 将 JS 字符串生成为 style 节点
                    path.resolve(__dirname, '../../../../node_modules/style-loader/dist/index.js'),
                    // 将 CSS 转化成 CommonJS 模块
                    path.resolve(__dirname, '../../../../node_modules/css-loader/dist/index.js'),
                    // 自定义css文件前缀
                    path.resolve(__dirname, '../../../../node_modules/postcss-loader/dist/index.js'),
                    // 将 Sass 编译成 CSS
                    path.resolve(__dirname, '../../../../node_modules/sass-loader/dist/index.js'),
                ],
            },
            {
                test: /\.tsx?$/,
                use: path.resolve(__dirname, '../../../../node_modules/ts-loader/dist/index.js'),
                exclude: /node_modules/,
            },
        ]
    };
    return module;
}