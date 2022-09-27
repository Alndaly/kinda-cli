import { KindaConfiguration } from '../config/kinda.base.js';
declare type Configuration = (root: string) => Promise<KindaConfiguration>;
export declare const getConfigFile: Configuration;
export {};
