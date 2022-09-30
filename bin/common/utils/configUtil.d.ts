import { KindaConfiguration } from '../../types/index.js';
type Configuration = (root: string) => Promise<KindaConfiguration>;
export declare const getConfigFile: Configuration;
export {};
