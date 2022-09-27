import { createRequire } from 'module';
import chalk from 'chalk';
export const getConfigFile = () => {
    //@ts-ignore
    const configInfo = createRequire(process.cwd())('./kinda.config.json');
    if (!configInfo) {
        console.log(`${chalk.red('当前目录下没有kinda.config.json配置文件')}`);
        process.exit(1);
    }
    console.log(configInfo);
};
