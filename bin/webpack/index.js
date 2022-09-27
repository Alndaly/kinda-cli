import { getWebpackPlugins } from '../webpack/configure/plugins/index.js';
const defaultConfigure = {
    mode: 'development'
};
export const getWebpackConfigure = () => {
    let configure = {};
    configure = {
        plugins: getWebpackPlugins()
    };
    return Object.assign(defaultConfigure, configure);
};
