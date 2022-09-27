import path from 'path'
import fs from 'fs-extra'

export const getConfigFile = async (root: string) => {
    if (fs.existsSync(path.resolve(root, 'docusaurus.config.js'))) {
        let configInfo = await import(path.resolve(root, './docusaurus.config.js'));
        return configInfo;
    } else {
        return null;
    }
}