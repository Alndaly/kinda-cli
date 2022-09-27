import path from 'path'
import fs from 'fs-extra'

export const getConfigFile = async (root: string) => {
    if (fs.existsSync(path.resolve(root, 'kinda.config.js'))) {
        let configInfo = await import(path.resolve(root, './kinda.config.js'));
        return configInfo;
    } else {
        return null;
    }
}