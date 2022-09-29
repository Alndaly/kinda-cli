import { createRequire } from 'module';
export const getModuleConfig = () => {
    const module = {
        rules: [
            { test: /\.json$/, use: 'json-loader' },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // 将 JS 字符串生成为 style 节点
                    'style-loader',
                    // 将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    // 自定义css文件前缀
                    'postcss-loader',
                    // 将 Sass 编译成 CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.tsx?$/,
                use: createRequire(import.meta.url)('ts-loader'),
                exclude: /node_modules/,
            },
        ]
    };
    return module;
};
