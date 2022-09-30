import path from 'path';
// import chalk from 'chalk';
import fs from 'fs-extra';
import { getDefaultKindaConfig } from '../config/kinda.base.js';
export const getConfigFile = async (root) => {
    if (fs.existsSync(path.resolve(root, 'kinda.config.js'))) {
        let configInfo = (await import(path.resolve(root, './kinda.config.js'))).default;
        return configInfo;
    }
    else {
        // console.log(`${chalk.red('没有找到配置文件，使用默认配置。')}`)
        const defaultKindaConfig = getDefaultKindaConfig();
        return defaultKindaConfig;
    }
};
