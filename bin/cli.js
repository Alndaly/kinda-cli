#! /usr/bin/env node
import { program, Option } from 'commander';
import create from './create/create.js';
import server from './server/server.js';
import logger from './logger/index.js';
import build from './build/build.js';
import semver from 'semver';
import { createRequire } from 'module';
import { template_list } from './config/config.js';
const packageJson = createRequire(import.meta.url)('../package.json');
const requiredVersion = packageJson.engines.node;
// 检验node版本
if (!semver.satisfies(process.version, requiredVersion)) {
    logger.error('Minimum Node.js version not met :(');
    logger.info `You are using Node.js number=${process.version}, Requirement: Node.js number=${requiredVersion}.`;
    process.exit(1);
}
program
    .name('kinda-cli')
    .description(`CLI to make developers' life easy.`)
    // 配置版本号信息
    .version(`v${packageJson.version}`)
    .usage('<command> [option]');
// 项目创建命令
program
    // 定义命令和参数
    .command('create <app-name>')
    // init命令介绍
    .description('create program')
    // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
    .addOption(new Option('-f, --force', 'overwrite target directory if it exist'))
    .addOption(new Option('-t --type <type>', 'choose the type of your application', 'web-app').choices(template_list.map((item) => item.value)))
    .action((name, options) => {
    create(name, options);
});
// 本地开启服务命令
// TODO 待完善
program
    // 定义命令和参数
    .command('server')
    // init命令介绍
    .description('local server port')
    .addOption(new Option('-p --port <port>', 'choose the port of your local server'))
    .action((options) => {
    server(options);
});
// 打包命令
// TODO 待完善
program
    // 定义命令和参数
    .command('build')
    // init命令介绍
    .description('build optimized project')
    .action((options) => {
    build(options);
});
program.parse(process.argv);