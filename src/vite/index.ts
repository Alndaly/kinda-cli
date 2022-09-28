import { Environement } from './../types/index.js';
import { getVitePlugins } from '../vite/configure/plugins/index.js';
import path from 'path';
import { UserConfig } from 'vite'
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getDefaultConfigure = (environment: Environement) => {
    const defaultConfigure: UserConfig = {

    };
    return defaultConfigure;
}

export const getViteConfigure = (viteConfig: UserConfig, environment: Environement) => {
    // 配置文件优先级 webpackConfig > defaultConfigure
    return Object.assign(getDefaultConfigure(environment), viteConfig)
}