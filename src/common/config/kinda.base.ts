import type { Configuration } from 'webpack';

export interface KindaConfiguration {
    structure: 'vite' | 'webpack',
    webpackConfiguration: Configuration
}

export const getDefaultKindaConfig = () => {
    const defaultConfiguration: KindaConfiguration = {
        structure: 'webpack',
        webpackConfiguration: {}
    };
    return defaultConfiguration;
}