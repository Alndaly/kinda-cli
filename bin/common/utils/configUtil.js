import path from 'path';
import fs from 'fs-extra';
export const getConfigFile = async (root) => {
    if (fs.existsSync(path.resolve(root, 'docusaurus.config.js'))) {
        let configInfo = await import(path.resolve(root, './docusaurus.config.js'));
        console.log('配置文件:', configInfo);
        return configInfo;
    }
    else {
        console.log('没有配置文件');
        return null;
    }
};
