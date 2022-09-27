import type { Configuration } from 'webpack';
export declare const clientDir: string;
export declare function excludeJS(modulePath: string): boolean;
export declare function createBaseConfig(props: any, isServer: boolean, minify?: boolean): Promise<Configuration>;
