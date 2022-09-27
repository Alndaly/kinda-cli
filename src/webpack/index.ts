import { getWebpackPlugins } from '../webpack/configure/plugins/index.js';
import type { Configuration } from 'webpack'

const defaultConfigure: Configuration = {
    mode: 'development'
}

export const getWebpackConfigure = () => {
    let configure: Configuration = {}
    configure = {
        plugins: getWebpackPlugins()
    }
    return Object.assign(defaultConfigure, configure)
}