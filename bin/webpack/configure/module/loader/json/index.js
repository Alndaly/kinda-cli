import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const getJson = () => {
    return path.resolve(__dirname, '../../../../../../node_modules/json-loader/index.js');
};
export const getJsonLoader = () => {
    return [
        {
            loader: getJson(),
            options: {}
        }
    ];
};
