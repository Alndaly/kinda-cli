import { Environement } from './../types/index.js';
import { UserConfig } from 'vite';
export declare const viteServer: (viteConfig?: UserConfig, environment?: Environement) => Promise<import("vite").ViteDevServer>;
