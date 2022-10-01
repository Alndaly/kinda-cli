import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const getBabel = () => {
    return path.resolve(__dirname, '../../../../../../node_modules/babel-loader/lib/index.js');
};
const getBabelOptions = () => {
    const options = {
        presets: [
            path.resolve(__dirname, '../../../../../../node_modules/@babel/preset-env/lib/index.js'),
            path.resolve(__dirname, '../../../../../../node_modules/@babel/preset-react/lib/index.js')
        ]
    };
    return options;
};
export const getBabelLoader = () => {
    return [
        {
            loader: getBabel(),
            options: getBabelOptions()
        }
    ];
};
