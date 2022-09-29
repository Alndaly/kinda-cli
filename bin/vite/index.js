import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getDefaultConfigure = (environment) => {
    const defaultConfigure = {};
    return defaultConfigure;
};
export const getViteConfigure = (viteConfig, environment) => {
    // 配置文件优先级 webpackConfig > defaultConfigure
    return Object.assign(getDefaultConfigure(environment), viteConfig);
};
