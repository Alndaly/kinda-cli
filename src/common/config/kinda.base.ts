import { KindaConfiguration } from '../../types/index.js'

export const getDefaultKindaConfig = () => {
    const defaultConfiguration: KindaConfiguration = {
        structure: 'webpack',
        webpackConfiguration: {}
    };
    return defaultConfiguration;
}