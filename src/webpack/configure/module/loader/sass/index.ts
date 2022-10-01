import path from 'path'
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));

const getStyle = () => {
    // 将 JS 字符串生成为 style 节点
    return path.resolve(__dirname, '../../../../../../node_modules/style-loader/dist/cjs.js')
}

const getPostCss = () => {
    // 自定义css文件前缀
    return path.resolve(__dirname, '../../../../../../node_modules/postcss-loader/dist/index.js')
}

const getCss = () => {
    // 将 CSS 转化成 CommonJS 模块
    return path.resolve(__dirname, '../../../../../../node_modules/css-loader/dist/index.js')
}

const getSass = () => {
    // 将 Sass 编译成 CSS
    return path.resolve(__dirname, '../../../../../../node_modules/sass-loader/dist/index.js')
}

export const getSassLoader = () => {
    return [
        {
            loader: getStyle(),
            options: {}
        },
        {
            loader: getCss(),
            options: {}
        },
        {
            loader: getPostCss(),
            options: {}
        },
        {
            loader: getSass(),
            options: {}
        },
    ]
}
