import type { Configuration } from 'webpack';
export interface KindaConfiguration {
    structure: 'vite' | 'webpack';
    webpackConfiguration: Configuration;
}
export declare const getDefaultKindaConfig: () => KindaConfiguration;
